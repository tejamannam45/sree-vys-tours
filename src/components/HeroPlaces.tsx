"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { BUSINESS, PLACES } from "@/lib/site";

const INTERVAL_MS = 4200;

export function HeroPlaces() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % PLACES.length);
    }, INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [paused]);

  const active = PLACES[index];

  return (
    <section
      className="hero"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={() => setPaused(true)}
      onTouchEnd={() => setPaused(false)}
    >
      <div className="hero__slides" aria-hidden>
        {PLACES.map((place, i) => (
          <div
            key={place.id}
            className={`hero__slide ${i === index ? "is-active" : ""}`}
          >
            <Image
              src={place.image}
              alt=""
              fill
              priority={i === 0}
              className="hero__photo"
              sizes="100vw"
            />
          </div>
        ))}
      </div>
      <div className="hero__veil" />

      <div className="hero__inner">
        <p className="hero__eyebrow">
          {BUSINESS.serviceHours} · {BUSINESS.values}
        </p>
        <h1>
          SREE <span className="accent">VYS</span>
        </h1>
        <p className="hero__tagline">{BUSINESS.tagline}</p>
        <p className="hero__place" aria-live="polite">
          <strong>{active.name}</strong>
          <span>{active.place}</span>
        </p>
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
          <a href={`tel:+91${BUSINESS.phones[0]}`}>
            +91 {BUSINESS.phones[0]}
          </a>
          <a href={`tel:+91${BUSINESS.phones[1]}`}>
            +91 {BUSINESS.phones[1]}
          </a>
        </div>

        <div className="hero__dots" role="tablist" aria-label="Places">
          {PLACES.map((place, i) => (
            <button
              key={place.id}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={`${place.name}, ${place.place}`}
              className={i === index ? "is-active" : undefined}
              onClick={() => setIndex(i)}
            />
          ))}
        </div>
      </div>

      <div className="hero-marquee" aria-hidden>
        <div className="hero-marquee__track">
          {[...PLACES, ...PLACES].map((place, i) => (
            <div key={`${place.id}-${i}`} className="hero-marquee__item">
              <Image
                src={place.image}
                alt=""
                width={220}
                height={140}
                className="hero-marquee__img"
              />
              <span>
                {place.name}
                <small>{place.place}</small>
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
