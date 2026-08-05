import { BookingForm } from "@/components/BookingForm";
import {
  BUSINESS,
  FLEET,
  ROUTES,
  SERVICES,
  formatInr,
} from "@/lib/site";

const SERVICE_ICONS: Record<string, string> = {
  car: "🚗",
  road: "🛣️",
  plane: "✈️",
  calendar: "📅",
  briefcase: "👔",
};

export default function Home() {
  return (
    <>
      <header className="site-header">
        <a href="#top" className="brand-mark">
          <div className="brand-logo" aria-hidden>
            <span>V</span>YS
          </div>
          <div className="brand-text">
            <strong>SREE VYS</strong>
            <small>Tours and Travels</small>
          </div>
        </a>
        <nav className="nav-links" aria-label="Primary">
          <a href="#services">Services</a>
          <a href="#routes">Routes</a>
          <a href="#fleet">Fleet</a>
          <a href="#book">Book</a>
          <a href="#contact">Contact</a>
        </nav>
        <a className="header-cta" href="#book">
          Book a car
        </a>
      </header>

      <main id="top">
        <section className="hero">
          <div className="hero__inner">
            <div>
              <p className="hero__eyebrow">
                {BUSINESS.serviceHours} · {BUSINESS.values}
              </p>
              <h1>
                SREE <span className="accent">VYS</span>
              </h1>
              <p className="hero__tagline">{BUSINESS.tagline}</p>
              <div className="hero__actions">
                <a className="btn-primary" href="#book">
                  Book your ride
                </a>
                <a className="btn-secondary" href="#routes">
                  View routes & prices
                </a>
              </div>
              <div className="hero__meta">
                <span>{BUSINESS.location}</span>
                <span>
                  <a href={`tel:+91${BUSINESS.phones[0]}`}>
                    +91 {BUSINESS.phones[0]}
                  </a>
                </span>
                <span>
                  <a href={`tel:+91${BUSINESS.phones[1]}`}>
                    +91 {BUSINESS.phones[1]}
                  </a>
                </span>
              </div>
            </div>
          </div>
        </section>

        <section className="section" id="services">
          <div className="section__inner">
            <p className="section__label">What we offer</p>
            <h2>Cars for every kind of journey</h2>
            <p className="section__lead">
              From quick city hops to outstation temple runs — safe drivers,
              reliable vehicles, and clear prices.
            </p>
            <div className="services-grid">
              {SERVICES.map((service) => (
                <article key={service.id} className="service-item">
                  <div className="service-icon" aria-hidden>
                    {SERVICE_ICONS[service.icon]}
                  </div>
                  <div>
                    <h3>{service.title}</h3>
                    <p>{service.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section routes-section" id="routes">
          <div className="section__inner">
            <p className="section__label">Popular routes</p>
            <h2>Vijayawada destinations with transparent pricing</h2>
            <p className="section__lead">
              Upfront sedan rates for the most requested outstation corridors —
              fuel, driver, and toll included.
            </p>
            <div className="routes-grid">
              {ROUTES.map((route) => (
                <article key={route.id} className="route-card">
                  <h3>
                    {route.from} ⇌ {route.to}
                  </h3>
                  <p className="route-price">
                    {formatInr(route.oneWay)}
                    <span>One way drop</span>
                  </p>
                  <ul className="route-meta">
                    <li>
                      <span>Car type</span>
                      <strong>{route.carType}</strong>
                    </li>
                    <li>
                      <span>Travel time</span>
                      <strong>{route.travelTime}</strong>
                    </li>
                    <li>
                      <span>Distance</span>
                      <strong>{route.distanceKm} Km</strong>
                    </li>
                    <li>
                      <span>Inclusions</span>
                      <strong>{route.inclusions}</strong>
                    </li>
                    <li>
                      <span>Extra km</span>
                      <strong>₹{route.extraKmCharge}/-</strong>
                    </li>
                    {route.roundTrip != null && (
                      <li>
                        <span>Round trip</span>
                        <strong>{formatInr(route.roundTrip)}</strong>
                      </li>
                    )}
                  </ul>
                  <a className="btn-primary" href="#book">
                    Book this route
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section" id="fleet">
          <div className="section__inner">
            <p className="section__label">Our fleet</p>
            <h2>Premium cars with package rates</h2>
            <p className="section__lead">
              Choose hourly packages or full-day rent for luxury travel in and
              around Vijayawada.
            </p>
            <div className="fleet-grid">
              {FLEET.map((car) => (
                <article key={car.id} className="fleet-card">
                  <h3>{car.name}</h3>
                  <ul className="fleet-packages">
                    {car.packages.map((pkg) => (
                      <li key={pkg.label}>
                        <span>{pkg.label}</span>
                        <strong>{formatInr(pkg.price)}</strong>
                      </li>
                    ))}
                    <li>
                      <span>12 Hrs rent</span>
                      <strong>{formatInr(car.rent12h)}</strong>
                    </li>
                    <li>
                      <span>24 Hrs rent</span>
                      <strong>{formatInr(car.rent24h)}</strong>
                    </li>
                  </ul>
                  <div className="fleet-extra">
                    <span>Driver bata: {formatInr(car.driverBata)}</span>
                    <span>{car.mileage}</span>
                    <span>
                      Extra hour {formatInr(car.extraHour)} · Extra km ₹
                      {car.extraKm}/-
                    </span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section booking-section" id="book">
          <div className="section__inner">
            <p className="section__label">Book now</p>
            <h2>Request your car</h2>
            <p className="section__lead">
              Submit the form and we will email the team. You can also send the
              same booking on WhatsApp in one tap.
            </p>
            <div className="booking-shell">
              <BookingForm />
            </div>
          </div>
        </section>

        <section className="section contact-section" id="contact">
          <div className="section__inner">
            <p className="section__label">Contact</p>
            <h2>We are ready 24×7</h2>
            <p className="section__lead">
              Call, WhatsApp, or email — {BUSINESS.location}.
            </p>
            <div className="contact-grid">
              <div className="contact-item">
                <span>Phone</span>
                <a href={`tel:+91${BUSINESS.phones[0]}`}>
                  +91 {BUSINESS.phones[0]}
                </a>
                <a href={`tel:+91${BUSINESS.phones[1]}`}>
                  +91 {BUSINESS.phones[1]}
                </a>
              </div>
              <div className="contact-item">
                <span>Email</span>
                <a href={`mailto:${BUSINESS.email}`}>{BUSINESS.email}</a>
              </div>
              <div className="contact-item">
                <span>WhatsApp</span>
                <a
                  href={`https://wa.me/${BUSINESS.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Chat with us
                </a>
              </div>
              <div className="contact-item">
                <span>Location</span>
                <p>{BUSINESS.location}</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        © {new Date().getFullYear()} {BUSINESS.name}. {BUSINESS.tagline}.
      </footer>

      <div className="float-actions" aria-label="Quick contact">
        <a
          className="float-call"
          href={`tel:+91${BUSINESS.phones[0]}`}
          aria-label="Call now"
        >
          ☎
        </a>
        <a
          className="float-wa"
          href={`https://wa.me/${BUSINESS.whatsapp}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="WhatsApp"
        >
          WA
        </a>
      </div>
    </>
  );
}
