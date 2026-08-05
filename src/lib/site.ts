export const BUSINESS = {
  name: "Sree VYS Tours and Travels",
  shortName: "SREE VYS",
  tagline: "Safe Journey, Happy Memories",
  values: "Safe • Reliable • Comfortable",
  serviceHours: "24x7 Service",
  location: "Vijayawada, Krishna, AP",
  email: "sreevystoursandtravels@gmail.com",
  phones: ["9949947440", "7013480371"] as const,
  whatsapp: "919949947440",
} as const;

export const SERVICES = [
  {
    id: "local",
    title: "Local Trips",
    description: "City rides across Vijayawada for shopping, visits, and daily travel.",
    icon: "car",
  },
  {
    id: "outstation",
    title: "Outstation Trips",
    description: "Comfortable long-distance travel to temples, hills, and nearby cities.",
    icon: "road",
  },
  {
    id: "airport",
    title: "Airport Transfers",
    description: "On-time pickup and drop for flights — day or night.",
    icon: "plane",
  },
  {
    id: "packages",
    title: "Tour Packages",
    description: "Custom multi-day packages planned around your itinerary.",
    icon: "calendar",
  },
  {
    id: "corporate",
    title: "Corporate Travel",
    description: "Reliable cars for office runs, client visits, and staff travel.",
    icon: "briefcase",
  },
] as const;

/** Popular routes & prices aligned with akhiltravel.com reference */
export const ROUTES = [
  {
    id: "hyd",
    from: "Vijayawada",
    to: "Hyderabad",
    oneWay: 6000,
    roundTrip: null as number | null,
    carType: "Sedan (4+1)",
    travelTime: "5 to 6 Hrs",
    distanceKm: 300,
    inclusions: "Fuel + Driver + Toll",
    extraKmCharge: 22,
  },
  {
    id: "guntur",
    from: "Vijayawada",
    to: "Guntur",
    oneWay: 1700,
    roundTrip: 2500,
    carType: "Sedan (4+1)",
    travelTime: "1 to 1.5 Hrs",
    distanceKm: 40,
    inclusions: "Fuel + Driver + Toll",
    extraKmCharge: 22,
  },
  {
    id: "tirupati",
    from: "Vijayawada",
    to: "Tirupati",
    oneWay: 10500,
    roundTrip: null as number | null,
    carType: "Sedan (4+1)",
    travelTime: "6 to 7 Hrs",
    distanceKm: 400,
    inclusions: "Fuel + Driver + Toll",
    extraKmCharge: 22,
  },
  {
    id: "vizag",
    from: "Vijayawada",
    to: "Vizag",
    oneWay: 8500,
    roundTrip: null as number | null,
    carType: "Sedan (4+1)",
    travelTime: "5 to 6 Hrs",
    distanceKm: 350,
    inclusions: "Fuel + Driver + Toll",
    extraKmCharge: 22,
  },
] as const;

/** Fleet hourly packages & rents aligned with akhiltravel.com reference */
export const FLEET = [
  {
    id: "audi-q7",
    name: "AUDI Q7",
    packages: [
      { label: "4Hrs · 40Km", price: 11000 },
      { label: "8Hrs · 80Km", price: 22000 },
      { label: "10Hrs · 100Km", price: 27000 },
      { label: "12Hrs · 120Km", price: 32000 },
    ],
    rent12h: 18000,
    rent24h: 28000,
    driverBata: 1000,
    mileage: "6 Kms / litre",
    extraHour: 1000,
    extraKm: 50,
  },
  {
    id: "kia-carnival",
    name: "KIA Carnival Limousine Plus",
    packages: [
      { label: "4Hrs · 40Km", price: 6000 },
      { label: "8Hrs · 80Km", price: 12000 },
      { label: "10Hrs · 100Km", price: 14000 },
      { label: "12Hrs · 120Km", price: 18000 },
    ],
    rent12h: 10000,
    rent24h: 15000,
    driverBata: 1000,
    mileage: "6 Kms / litre",
    extraHour: 1000,
    extraKm: 40,
  },
  {
    id: "benz-c220",
    name: "Mercedes Benz C Class 220 D",
    packages: [
      { label: "4Hrs · 40Km", price: 7000 },
      { label: "8Hrs · 80Km", price: 13500 },
      { label: "10Hrs · 100Km", price: 15500 },
      { label: "12Hrs · 120Km", price: 20000 },
    ],
    rent12h: 12000,
    rent24h: 18000,
    driverBata: 1000,
    mileage: "6 Kms / litre",
    extraHour: 1000,
    extraKm: 40,
  },
] as const;

export type ServiceId = (typeof SERVICES)[number]["id"];
export type RouteId = (typeof ROUTES)[number]["id"];
export type TripType = "one-way" | "round-trip";

export type BookingPayload = {
  name: string;
  phone: string;
  email?: string;
  service: ServiceId | string;
  routeId?: string;
  tripType?: TripType;
  vehicleId?: string;
  quotedPrice?: number;
  pickup: string;
  dropoff: string;
  date: string;
  time: string;
  passengers: number;
  notes?: string;
};

export function formatInr(amount: number) {
  return `₹${amount.toLocaleString("en-IN")}/-`;
}

export function routeLabel(routeId?: string) {
  const route = ROUTES.find((r) => r.id === routeId);
  if (!route) return null;
  return `${route.from} ⇌ ${route.to}`;
}

export function formatBookingMessage(booking: BookingPayload): string {
  const serviceLabel =
    SERVICES.find((s) => s.id === booking.service)?.title ?? booking.service;
  const route = routeLabel(booking.routeId);
  const vehicle = FLEET.find((v) => v.id === booking.vehicleId)?.name;

  return [
    `New booking — ${BUSINESS.shortName}`,
    ``,
    `Name: ${booking.name}`,
    `Phone: ${booking.phone}`,
    booking.email ? `Email: ${booking.email}` : null,
    `Service: ${serviceLabel}`,
    route ? `Route: ${route}` : null,
    booking.tripType ? `Trip type: ${booking.tripType}` : null,
    vehicle ? `Vehicle: ${vehicle}` : null,
    booking.quotedPrice != null
      ? `Quoted price: ${formatInr(booking.quotedPrice)}`
      : null,
    `Pickup: ${booking.pickup}`,
    `Drop: ${booking.dropoff}`,
    `Date: ${booking.date}`,
    `Time: ${booking.time}`,
    `Passengers: ${booking.passengers}`,
    booking.notes ? `Notes: ${booking.notes}` : null,
  ]
    .filter(Boolean)
    .join("\n");
}

export function whatsappBookingUrl(booking: BookingPayload): string {
  const text = encodeURIComponent(formatBookingMessage(booking));
  return `https://wa.me/${BUSINESS.whatsapp}?text=${text}`;
}
