export const BUSINESS = {
  name: "Sree VYS Tours and Travels",
  shortName: "SREE VYS",
  tagline: "Safe Journey, Happy Memories",
  values: "Safe • Reliable • Comfortable",
  serviceHours: "24x7 Service",
  location: "59A-21/1-6,Sree Sai nilayam,Sbi colony Panta kaluva road,Autonagar,Vijayawada 520007",
  email: "sreevystoursandtravels@gmail.com",
  phones: ["9885302999", "9949947440"] as const,
  whatsapp: "9885302999",
  websiteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://sreevystours.com",
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

/** Real temples & tourist places for hero + routes (AP / Telangana) */
export const PLACES = [
  {
    id: "kanaka-durga",
    name: "Kanaka Durga Temple",
    place: "Vijayawada",
    image: "/images/vijayawada-temple.jpg",
  },
  {
    id: "prakasam",
    name: "Prakasam Barrage",
    place: "Vijayawada",
    image: "/images/vijayawada-barrage.jpg",
  },
  {
    id: "undavalli",
    name: "Undavalli Caves",
    place: "Near Vijayawada",
    image: "/images/undavalli.jpg",
  },
  {
    id: "tirumala",
    name: "Tirumala Temple",
    place: "Tirupati",
    image: "/images/route-tirupati.jpg",
  },
  {
    id: "tirumala-gate",
    name: "Tirumala Entrance",
    place: "Tirupati",
    image: "/images/tirumala-entrance.jpg",
  },
  {
    id: "charminar",
    name: "Charminar",
    place: "Hyderabad",
    image: "/images/route-hyd.jpg",
  },
  {
    id: "rk-beach",
    name: "RK Beach",
    place: "Vizag",
    image: "/images/route-vizag.jpg",
  },
  {
    id: "vizag-road",
    name: "Beach Road",
    place: "Vizag",
    image: "/images/vizag-beach-road.jpg",
  },
  {
    id: "kondaveedu",
    name: "Kondaveedu Fort",
    place: "Guntur",
    image: "/images/route-guntur.jpg",
  },
] as const;

/** Popular routes & prices aligned with akhiltravel.com reference */
export const ROUTES = [
  {
    id: "hyd",
    from: "Vijayawada",
    to: "Hyderabad",
    landmark: "Charminar",
    oneWay: 6000,
    roundTrip: null as number | null,
    carType: "Sedan (4+1)",
    travelTime: "5 to 6 Hrs",
    distanceKm: 300,
    inclusions: "Fuel + Driver + Toll",
    extraKmCharge: 22,
    image: "/images/route-hyd.jpg",
    blurb: "Charminar & city drop — fuel, driver & toll included",
  },
  {
    id: "chennai",
    from: "Vijayawada",
    to: "Chennai",
    landmark: "Marina Beach",
    oneWay: 12500,
    roundTrip: null as number | null,
    carType: "Sedan (4+1)",
    travelTime: "8 to 9 Hrs",
    distanceKm: 450,
    inclusions: "Fuel + Driver + Toll",
    extraKmCharge: 22,
    image: "/images/Chennai_Central.jpg",
    blurb: "Marina Beach & Chennai city getaway",
  },
  {
    id: "bangalore",
    from: "Vijayawada",
    to: "Bangalore",
    landmark: "Bannerghatta Road",
    oneWay: 19500,
    roundTrip: null as number | null,
    carType: "Sedan (4+1)",
    travelTime: "10 to 12 Hrs",
    distanceKm: 700,
    inclusions: "Fuel + Driver + Toll",
    extraKmCharge: 22,
    image: "/images/bangalore.jpg",
    blurb: "Bannerghatta Road & Bangalore city getaway",
  },
  {
    id: "guntur",
    from: "Vijayawada",
    to: "Guntur",
    landmark: "Kondaveedu Fort",
    oneWay: 1700,
    roundTrip: 2500,
    carType: "Sedan (4+1)",
    travelTime: "1 to 1.5 Hrs",
    distanceKm: 40,
    inclusions: "Fuel + Driver + Toll",
    extraKmCharge: 22,
    image: "/images/route-guntur.jpg",
    blurb: "Quick hop to Guntur — one way or round trip",
  },
  {
    id: "tirupati",
    from: "Vijayawada",
    to: "Tirupati",
    landmark: "Tirumala Temple",
    oneWay: 10500,
    roundTrip: null as number | null,
    carType: "Sedan (4+1)",
    travelTime: "6 to 7 Hrs",
    distanceKm: 400,
    inclusions: "Fuel + Driver + Toll",
    extraKmCharge: 22,
    image: "/images/route-tirupati.jpg",
    blurb: "Tirumala darshan travel, door to door",
  },
  {
    id: "vizag",
    from: "Vijayawada",
    to: "Vizag",
    landmark: "RK Beach",
    oneWay: 8500,
    roundTrip: null as number | null,
    carType: "Sedan (4+1)",
    travelTime: "5 to 6 Hrs",
    distanceKm: 350,
    inclusions: "Fuel + Driver + Toll",
    extraKmCharge: 22,
    image: "/images/route-vizag.jpg",
    blurb: "RK Beach & Vizag city getaway",
  },
] as const;

/** Fleet hourly packages & rents aligned with akhiltravel.com reference */
export const FLEET = [
  {
    id: "xuv-700",
    name: "XUV 700",
    tagline: "Flagship SUV for VIP & family runs",
    packages: [
      { label: "4Hrs · 40Km", price: 5000 },
      { label: "8Hrs · 80Km", price: 11000 },
      { label: "10Hrs · 100Km", price: 13000 },
      { label: "12Hrs · 120Km", price: 17000 },
    ],
    rent12h: 17000,
    rent24h: 14000,
    driverBata: 1000,
    mileage: "14 Kms / litre",
    extraHour: 500,
    extraKm: 25,
  },
  {
    id: "kia-carnival",
    name: "KIA Carnival Limousine Plus",
    tagline: "Spacious lounge seats for groups",
    packages: [
      { label: "4Hrs · 40Km", price: 6000 },
      { label: "8Hrs · 80Km", price: 12000 },
      { label: "10Hrs · 100Km", price: 14000 },
      { label: "12Hrs · 120Km", price: 18000 },
    ],
    rent12h: 18000,
    rent24h: 15000,
    driverBata: 1000,
    mileage: "6 Kms / litre",
    extraHour: 1000,
    extraKm: 40,
  },
  {
    id: "benz-c220",
    name: "Mercedes Benz C Class 220 D",
    tagline: "Executive sedan for business travel",
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
