"use client";

import { useMemo, useState, type FormEvent } from "react";
import {
  BUSINESS,
  FLEET,
  ROUTES,
  SERVICES,
  formatInr,
  type BookingPayload,
  type TripType,
} from "@/lib/site";

const emptyForm = {
  name: "",
  phone: "",
  email: "",
  service: "outstation",
  routeId: "hyd",
  tripType: "one-way" as TripType,
  vehicleId: "",
  pickup: "Vijayawada",
  dropoff: "Hyderabad",
  date: "",
  time: "",
  passengers: 4,
  notes: "",
};

type Status =
  | { type: "idle" }
  | { type: "loading" }
  | {
      type: "success";
      message: string;
      whatsappUrl: string;
      emailSent: boolean;
    }
  | { type: "error"; message: string };

type Props = {
  initialRouteId?: string;
  initialVehicleId?: string;
};

export function BookingForm({ initialRouteId, initialVehicleId }: Props) {
  const [form, setForm] = useState({
    ...emptyForm,
    routeId: initialRouteId || emptyForm.routeId,
    vehicleId: initialVehicleId || "",
    pickup:
      ROUTES.find((r) => r.id === (initialRouteId || emptyForm.routeId))
        ?.from || emptyForm.pickup,
    dropoff:
      ROUTES.find((r) => r.id === (initialRouteId || emptyForm.routeId))?.to ||
      emptyForm.dropoff,
  });
  const [status, setStatus] = useState<Status>({ type: "idle" });

  const selectedRoute = useMemo(
    () => ROUTES.find((r) => r.id === form.routeId),
    [form.routeId]
  );

  const quotedPrice = useMemo(() => {
    if (!selectedRoute) return undefined;
    if (form.tripType === "round-trip" && selectedRoute.roundTrip != null) {
      return selectedRoute.roundTrip;
    }
    return selectedRoute.oneWay;
  }, [selectedRoute, form.tripType]);

  function update<K extends keyof typeof emptyForm>(
    key: K,
    value: (typeof emptyForm)[K]
  ) {
    setForm((prev) => {
      const next = { ...prev, [key]: value };
      if (key === "routeId") {
        const route = ROUTES.find((r) => r.id === value);
        if (route) {
          next.pickup = route.from;
          next.dropoff = route.to;
          if (value !== "guntur" && next.tripType === "round-trip") {
            next.tripType = "one-way";
          }
        }
      }
      return next;
    });
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus({ type: "loading" });

    const payload: BookingPayload = {
      name: form.name.trim(),
      phone: form.phone.trim(),
      email: form.email.trim() || undefined,
      service: form.service,
      routeId: form.routeId || undefined,
      tripType: form.tripType,
      vehicleId: form.vehicleId || undefined,
      quotedPrice,
      pickup: form.pickup.trim(),
      dropoff: form.dropoff.trim(),
      date: form.date,
      time: form.time,
      passengers: Number(form.passengers) || 1,
      notes: form.notes.trim() || undefined,
    };

    try {
      const res = await fetch("/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();

      if (!res.ok || !data.ok) {
        setStatus({
          type: "error",
          message: data.error || "Booking failed. Please try again.",
        });
        return;
      }

      setStatus({
        type: "success",
        message: data.message,
        whatsappUrl: data.whatsappUrl,
        emailSent: Boolean(data.email?.sent),
      });
      setForm((prev) => ({
        ...emptyForm,
        routeId: prev.routeId,
        pickup: prev.pickup,
        dropoff: prev.dropoff,
      }));
    } catch {
      setStatus({
        type: "error",
        message: "Network error. Please check your connection and retry.",
      });
    }
  }

  return (
    <form className="booking-form" onSubmit={onSubmit}>
      <div className="booking-form__grid">
        <label className="field">
          <span>Full name *</span>
          <input
            required
            name="name"
            autoComplete="name"
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            placeholder="Your name"
          />
        </label>

        <label className="field">
          <span>Phone *</span>
          <input
            required
            name="phone"
            type="tel"
            autoComplete="tel"
            value={form.phone}
            onChange={(e) => update("phone", e.target.value)}
            placeholder="10-digit mobile"
          />
        </label>

        <label className="field">
          <span>Email</span>
          <input
            name="email"
            type="email"
            autoComplete="email"
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            placeholder="For confirmation mail"
          />
        </label>

        <label className="field">
          <span>Service *</span>
          <select
            required
            name="service"
            value={form.service}
            onChange={(e) => update("service", e.target.value)}
          >
            {SERVICES.map((service) => (
              <option key={service.id} value={service.id}>
                {service.title}
              </option>
            ))}
          </select>
        </label>

        <label className="field">
          <span>Popular route *</span>
          <select
            required
            name="routeId"
            value={form.routeId}
            onChange={(e) => update("routeId", e.target.value)}
          >
            {ROUTES.map((route) => (
              <option key={route.id} value={route.id}>
                {route.from} ⇌ {route.to} — {formatInr(route.oneWay)}
              </option>
            ))}
          </select>
        </label>

        <label className="field">
          <span>Trip type *</span>
          <select
            required
            name="tripType"
            value={form.tripType}
            onChange={(e) => update("tripType", e.target.value as TripType)}
          >
            <option value="one-way">
              One way
              {selectedRoute ? ` — ${formatInr(selectedRoute.oneWay)}` : ""}
            </option>
            <option
              value="round-trip"
              disabled={selectedRoute?.roundTrip == null}
            >
              Round trip
              {selectedRoute?.roundTrip != null
                ? ` — ${formatInr(selectedRoute.roundTrip)}`
                : " (available on Guntur)"}
            </option>
          </select>
        </label>

        <label className="field">
          <span>Vehicle (optional)</span>
          <select
            name="vehicleId"
            value={form.vehicleId}
            onChange={(e) => update("vehicleId", e.target.value)}
          >
            <option value="">Sedan (4+1) — route default</option>
            {FLEET.map((car) => (
              <option key={car.id} value={car.id}>
                {car.name}
              </option>
            ))}
          </select>
        </label>

        <label className="field">
          <span>Quoted price</span>
          <input
            readOnly
            value={quotedPrice != null ? formatInr(quotedPrice) : "—"}
            aria-label="Quoted price"
          />
        </label>

        <label className="field">
          <span>Pickup location *</span>
          <input
            required
            name="pickup"
            value={form.pickup}
            onChange={(e) => update("pickup", e.target.value)}
            placeholder="Pickup address"
          />
        </label>

        <label className="field">
          <span>Drop location *</span>
          <input
            required
            name="dropoff"
            value={form.dropoff}
            onChange={(e) => update("dropoff", e.target.value)}
            placeholder="Drop address"
          />
        </label>

        <label className="field">
          <span>Travel date *</span>
          <input
            required
            name="date"
            type="date"
            value={form.date}
            onChange={(e) => update("date", e.target.value)}
          />
        </label>

        <label className="field">
          <span>Pickup time *</span>
          <input
            required
            name="time"
            type="time"
            value={form.time}
            onChange={(e) => update("time", e.target.value)}
          />
        </label>

        <label className="field">
          <span>Passengers *</span>
          <input
            required
            name="passengers"
            type="number"
            min={1}
            max={12}
            value={form.passengers}
            onChange={(e) => update("passengers", Number(e.target.value))}
          />
        </label>

        <label className="field field--wide">
          <span>Notes</span>
          <textarea
            name="notes"
            rows={3}
            value={form.notes}
            onChange={(e) => update("notes", e.target.value)}
            placeholder="Airport flight number, stops, preference…"
          />
        </label>
      </div>

      {selectedRoute && (
        <p className="booking-form__route-meta">
          {selectedRoute.carType} · {selectedRoute.distanceKm} Km ·{" "}
          {selectedRoute.travelTime} · {selectedRoute.inclusions} · Extra km{" "}
          {formatInr(selectedRoute.extraKmCharge).replace("/-", "")}/km
        </p>
      )}

      <div className="booking-form__actions">
        <button
          type="submit"
          className="btn-primary"
          disabled={status.type === "loading"}
        >
          {status.type === "loading" ? "Sending booking…" : "Book this car"}
        </button>
        <p className="booking-form__hint">
          We email {BUSINESS.email} and can open WhatsApp with your trip
          details.
        </p>
      </div>

      {status.type === "success" && (
        <div className="banner banner--success" role="status">
          <p>{status.message}</p>
          <a
            className="btn-whatsapp"
            href={status.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Send on WhatsApp
          </a>
          {!status.emailSent && (
            <p className="banner__note">
              Email SMTP is not configured yet — WhatsApp still reaches the
              team instantly.
            </p>
          )}
        </div>
      )}

      {status.type === "error" && (
        <div className="banner banner--error" role="alert">
          {status.message}
        </div>
      )}
    </form>
  );
}
