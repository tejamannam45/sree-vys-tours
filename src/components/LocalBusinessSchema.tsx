import { BUSINESS } from "@/lib/site";

export function LocalBusinessSchema() {
  const baseUrl = BUSINESS.websiteUrl;
  const logoUrl = `${baseUrl}/images/hero-car.jpg`; // Standard representative image

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "TaxiService",
        "@id": `${baseUrl}/#taxiservice`,
        "name": BUSINESS.name,
        "description": "Safe, reliable, and comfortable car travels & taxi services in Vijayawada. Book local rides, outstation cabs (Hyderabad, Tirupati, Vizag), and airport transfers.",
        "provider": {
          "@type": "LocalBusiness",
          "@id": `${baseUrl}/#organization`,
          "name": BUSINESS.name,
          "image": logoUrl,
          "telephone": `+91-${BUSINESS.phones[0]}`,
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "59A-21/1-6, Sree Sai Nilayam, SBI Colony, Panta Kaluva Road, Autonagar",
            "addressLocality": "Vijayawada",
            "addressRegion": "Andhra Pradesh",
            "postalCode": "520007",
            "addressCountry": "IN"
          },
          "priceRange": "$$"
        },
        "areaServed": [
          {
            "@type": "AdministrativeArea",
            "name": "Vijayawada"
          },
          {
            "@type": "AdministrativeArea",
            "name": "Guntur"
          },
          {
            "@type": "AdministrativeArea",
            "name": "Amaravati"
          },
          {
            "@type": "AdministrativeArea",
            "name": "Andhra Pradesh"
          },
          {
            "@type": "AdministrativeArea",
            "name": "Telangana"
          }
        ],
        "offers": {
          "@type": "Offer",
          "priceCurrency": "INR",
          "price": "1700",
          "description": "Vijayawada to Guntur one-way sedan ride starting from ₹1,700"
        }
      },
      {
        "@type": "AutoRental",
        "@id": `${baseUrl}/#autorental`,
        "name": BUSINESS.name,
        "image": logoUrl,
        "telephone": `+91-${BUSINESS.phones[0]}`,
        "url": baseUrl,
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "59A-21/1-6, Sree Sai Nilayam, SBI Colony, Panta Kaluva Road, Autonagar",
          "addressLocality": "Vijayawada",
          "addressRegion": "Andhra Pradesh",
          "postalCode": "520007",
          "addressCountry": "IN"
        },
        "openingHoursSpecification": {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday"
          ],
          "opens": "00:00",
          "closes": "23:59"
        }
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
