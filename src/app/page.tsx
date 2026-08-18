import { BookingForm } from "@/components/BookingForm";
import { HeroPlaces } from "@/components/HeroPlaces";
import {
  BUSINESS,
  FLEET,
  ROUTES,
  SERVICES,
  formatInr,
} from "@/lib/site";
import Image from "next/image";

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
        <HeroPlaces />

        <section className="section" id="services">
          <div className="section__inner">
            <p className="section__label">What we offer</p>
            <h2>Cars for every kind of journey</h2>
            <p className="section__lead">
              From city hops to temple darshan and beach trips — safe drivers,
              reliable cars, clear prices.
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

        <section className="section" id="services">
          <div className="section__inner">
            <p className="section__label">Why choose our travels
            </p>
            <h2>Why choose our travels</h2>
            <p className="section__lead">
            Sree VYS Tours & Travels bring the comfort, reliability and premium travel experience enjoyed by corporate travelers to everyone. With 8 years of trusted service and countless successful journeys across 50+ cities, our disciplined and experienced drivers ensure every trip is safe, comfortable and enjoyable, with a special focus on women's safety. Whether you're traveling for leisure or on a devotional pilgrimage, our team also guides you with valuable recommendations on must-visit temples and spiritual destinations, making every journey memorable from start to finish.
            </p>
          </div>
        </section>

        <section className="section routes-section" id="routes">
          <div className="section__inner">
            <p className="section__label">Popular routes</p>
            <h2>Temples & tourist places we cover</h2>
            <p className="section__lead">
              Charminar, Tirumala, RK Beach, Kondaveedu — real destinations with
              upfront sedan prices.
            </p>
            <div className="routes-grid">
              {ROUTES.map((route) => (
                <article key={route.id} className="route-card">
                  <div className="route-card__media">
                    <Image
                      src={route.image}
                      alt={`${route.landmark}, ${route.to}`}
                      fill
                      className="route-card__img"
                      sizes="(max-width: 640px) 100vw, (max-width: 980px) 50vw, 25vw"
                    />
                    <div className="route-card__place">
                      <strong>{route.landmark}</strong>
                      <span>{route.to}</span>
                    </div>
                  </div>
                  <div className="route-card__body">
                    <h3>
                      {route.from} ⇌ {route.to}
                    </h3>
                    <p className="route-card__blurb">{route.blurb}</p>
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
                  </div>
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
              Hourly packages and full-day rent for weddings, VIP, and family
              travel.
            </p>
            <div className="fleet-grid">
              {FLEET.map((car) => (
                <article key={car.id} className="fleet-card">
                  <div className="fleet-card__body">
                    <h3>{car.name}</h3>
                    <p className="fleet-card__tag">{car.tagline}</p>
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
                      <span>
                        Extra hour {formatInr(car.extraHour)} · Extra km ₹
                        {car.extraKm}/-
                      </span>
                    </div>
                    <a className="btn-primary" href="#book">
                      Reserve this car
                    </a>
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
              Submit the form — we email the team, and you can WhatsApp the same
              booking in one tap.
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
