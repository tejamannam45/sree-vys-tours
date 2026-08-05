import nodemailer from "nodemailer";
import {
  BUSINESS,
  FLEET,
  formatBookingMessage,
  formatInr,
  routeLabel,
  SERVICES,
  type BookingPayload,
} from "./site";

function isEmailConfigured() {
  return Boolean(
    process.env.SMTP_USER &&
      process.env.SMTP_PASS &&
      (process.env.BOOKING_TO_EMAIL || BUSINESS.email)
  );
}

export function getEmailStatus() {
  return {
    configured: isEmailConfigured(),
    to: process.env.BOOKING_TO_EMAIL || BUSINESS.email,
  };
}

export async function sendBookingEmails(booking: BookingPayload) {
  if (!isEmailConfigured()) {
    return {
      sent: false as const,
      reason: "Email is not configured. Set SMTP_USER and SMTP_PASS in .env.local.",
    };
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port: Number(process.env.SMTP_PORT || 587),
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const to = process.env.BOOKING_TO_EMAIL || BUSINESS.email;
  const from = process.env.SMTP_FROM || process.env.SMTP_USER!;
  const body = formatBookingMessage(booking);
  const serviceLabel =
    SERVICES.find((s) => s.id === booking.service)?.title ?? booking.service;
  const route = routeLabel(booking.routeId) || "—";
  const vehicle =
    FLEET.find((v) => v.id === booking.vehicleId)?.name || "Sedan (4+1)";

  const adminMail = transporter.sendMail({
    from: `"${BUSINESS.name}" <${from}>`,
    to,
    replyTo: booking.email || undefined,
    subject: `New car booking — ${booking.name} (${serviceLabel})`,
    text: body,
    html: `
      <div style="font-family: Arial, sans-serif; color: #0b1b3d; line-height: 1.5;">
        <h2 style="margin: 0 0 12px;">New car booking</h2>
        <p style="margin: 0 0 16px; color: #5a6a85;">${BUSINESS.tagline}</p>
        <table style="border-collapse: collapse; width: 100%; max-width: 520px;">
          ${[
            ["Name", booking.name],
            ["Phone", booking.phone],
            ["Email", booking.email || "—"],
            ["Service", serviceLabel],
            ["Route", route],
            ["Trip type", booking.tripType || "—"],
            ["Vehicle", vehicle],
            [
              "Quoted price",
              booking.quotedPrice != null
                ? formatInr(booking.quotedPrice)
                : "—",
            ],
            ["Pickup", booking.pickup],
            ["Drop", booking.dropoff],
            ["Date", booking.date],
            ["Time", booking.time],
            ["Passengers", String(booking.passengers)],
            ["Notes", booking.notes || "—"],
          ]
            .map(
              ([label, value]) => `
            <tr>
              <td style="padding: 8px 12px; border: 1px solid #d8dee9; background: #f4f7fc; font-weight: 700; width: 140px;">${label}</td>
              <td style="padding: 8px 12px; border: 1px solid #d8dee9;">${value}</td>
            </tr>`
            )
            .join("")}
        </table>
      </div>
    `,
  });

  const customerMail = booking.email
    ? transporter.sendMail({
        from: `"${BUSINESS.name}" <${from}>`,
        to: booking.email,
        subject: `Booking received — ${BUSINESS.name}`,
        text: [
          `Hi ${booking.name},`,
          ``,
          `Thank you for booking with ${BUSINESS.name}.`,
          `We received your request and will confirm shortly.`,
          ``,
          body,
          ``,
          `Call us: ${BUSINESS.phones.join(" / ")}`,
          `WhatsApp: +${BUSINESS.whatsapp}`,
        ].join("\n"),
      })
    : Promise.resolve(null);

  await Promise.all([adminMail, customerMail]);

  return { sent: true as const, to };
}
