# Sree VYS Tours and Travels

Car booking website for **Sree VYS Tours and Travels** (Vijayawada).

- Brand: Safe Journey, Happy Memories · 24×7 · Safe · Reliable · Comfortable
- Popular routes & prices (same as [akhiltravel.com](https://akhiltravel.com) reference):
  - Vijayawada ⇌ Hyderabad — ₹6,000/- one way
  - Vijayawada ⇌ Guntur — ₹1,700/- one way · ₹2,500/- round trip
  - Vijayawada ⇌ Tirupati — ₹10,500/- one way
  - Vijayawada ⇌ Vizag — ₹8,500/- one way
- Fleet package rates for Audi Q7, Kia Carnival, Mercedes C-Class (same reference pricing)
- Booking form emails the business and opens WhatsApp with the trip details

## Quick start

```bash
cd /Users/ravi/sree-vys-tours
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Email setup (Gmail)

Bookings always work with **WhatsApp**. To also send automatic emails:

1. Create a Gmail [App Password](https://myaccount.google.com/apppasswords) for `sreevystoursandtravels@gmail.com`
2. Copy `.env.local.example` → `.env.local`
3. Fill in:

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=sreevystoursandtravels@gmail.com
SMTP_PASS=your-16-char-app-password
BOOKING_TO_EMAIL=sreevystoursandtravels@gmail.com
SMTP_FROM=sreevystoursandtravels@gmail.com
```

When a customer books:
1. Admin email goes to `BOOKING_TO_EMAIL`
2. If the customer entered an email, they get a confirmation
3. Success screen offers **Send on WhatsApp** with the full booking text

## Contact (from business flyer)

- Phone: 9949947440 · 7013480371
- Email: sreevystoursandtravels@gmail.com
- Location: Vijayawada, Krishna, AP
