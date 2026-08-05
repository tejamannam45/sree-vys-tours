import { NextResponse } from "next/server";
import { getEmailStatus, sendBookingEmails } from "@/lib/email";
import {
  FLEET,
  ROUTES,
  SERVICES,
  whatsappBookingUrl,
  type BookingPayload,
  type ServiceId,
  type TripType,
} from "@/lib/site";

const SERVICE_IDS = new Set(SERVICES.map((s) => s.id));
const ROUTE_IDS = new Set(ROUTES.map((r) => r.id));
const VEHICLE_IDS = new Set(FLEET.map((v) => v.id));

function asString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

export async function POST(request: Request) {
  try {
    const data = (await request.json()) as Partial<BookingPayload>;

    const booking: BookingPayload = {
      name: asString(data.name),
      phone: asString(data.phone),
      email: asString(data.email) || undefined,
      service: asString(data.service),
      routeId: asString(data.routeId) || undefined,
      tripType: (asString(data.tripType) as TripType) || undefined,
      vehicleId: asString(data.vehicleId) || undefined,
      quotedPrice:
        typeof data.quotedPrice === "number" ? data.quotedPrice : undefined,
      pickup: asString(data.pickup),
      dropoff: asString(data.dropoff),
      date: asString(data.date),
      time: asString(data.time),
      passengers: Number(data.passengers) || 1,
      notes: asString(data.notes) || undefined,
    };

    if (
      !booking.name ||
      !booking.phone ||
      !booking.service ||
      !booking.pickup ||
      !booking.dropoff ||
      !booking.date ||
      !booking.time
    ) {
      return NextResponse.json(
        { ok: false, error: "Please fill all required booking fields." },
        { status: 400 }
      );
    }

    if (!SERVICE_IDS.has(booking.service as ServiceId)) {
      return NextResponse.json(
        { ok: false, error: "Please choose a valid service." },
        { status: 400 }
      );
    }

    if (booking.routeId && !ROUTE_IDS.has(booking.routeId as never)) {
      return NextResponse.json(
        { ok: false, error: "Please choose a valid route." },
        { status: 400 }
      );
    }

    if (booking.vehicleId && !VEHICLE_IDS.has(booking.vehicleId as never)) {
      return NextResponse.json(
        { ok: false, error: "Please choose a valid vehicle." },
        { status: 400 }
      );
    }

    if (booking.passengers < 1 || booking.passengers > 12) {
      return NextResponse.json(
        { ok: false, error: "Passengers must be between 1 and 12." },
        { status: 400 }
      );
    }

    const emailResult = await sendBookingEmails(booking);
    const whatsappUrl = whatsappBookingUrl(booking);

    return NextResponse.json({
      ok: true,
      email: emailResult,
      whatsappUrl,
      emailStatus: getEmailStatus(),
      message: emailResult.sent
        ? "Booking submitted. Confirmation email sent."
        : "Booking submitted. Open WhatsApp to notify the team instantly.",
    });
  } catch (error) {
    console.error("Booking error:", error);
    return NextResponse.json(
      {
        ok: false,
        error:
          error instanceof Error
            ? error.message
            : "Could not process booking. Please try again.",
      },
      { status: 500 }
    );
  }
}
