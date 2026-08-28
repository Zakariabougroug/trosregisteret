import type { Metadata } from "next";
import { PolicyShell } from "../_components/policy-shell";

export const metadata: Metadata = {
  title: "Cookie-policy",
  description: "Oversikt over informasjonskapsler, lokal lagring og analyseverktøy på trosregisteret.no.",
  alternates: { canonical: "/informasjonskapsler" },
};

export default function CookiePolicyPage() {
  return (
    <PolicyShell
      eyebrow="Informasjonskapsler"
      title="Cookie-policy"
      introduction="Her forklarer vi hvilke informasjonskapsler og lignende teknologier nettstedet bruker, hvorfor de brukes, og hvordan du endrer valget ditt."
    >
      <h2>1. Hva er informasjonskapsler?</h2>
      <p>Informasjonskapsler, ofte kalt cookies, er små tekstfiler som lagres i nettleseren. Lokal lagring er en lignende teknologi som lar nettstedet huske informasjon på enheten din.</p>

      <h2>2. Vi spør før analyse aktiveres</h2>
      <p>
        Google Analytics og Vercel Analytics er valgfrie. Ingen av dem lastes før du aktivt velger «Tillat analyse». «Avvis analyse» er like tilgjengelig, og nettstedet fungerer på samme måte dersom du avviser.
      </p>

      <h2>3. Oversikt</h2>
      <div className="overflow-x-auto">
        <table>
          <thead><tr><th>Navn / tjeneste</th><th>Formål</th><th>Leverandør</th><th>Lagring</th><th>Type</th></tr></thead>
          <tbody>
            <tr><td><code>trosregisteret-cookie-consent-v1</code></td><td>Husker om du har tillatt eller avvist analyse.</td><td>Trosregisteret.no</td><td>180 dager i lokal lagring</td><td>Nødvendig</td></tr>
            <tr><td><code>_ga</code></td><td>Skiller besøkende for samlet statistikk.</td><td>Google Analytics</td><td>Maksimalt 180 dager</td><td>Analyse – krever samtykke</td></tr>
            <tr><td><code>_ga_&lt;måle-ID&gt;</code></td><td>Bevarer øktstatus for Google Analytics.</td><td>Google Analytics</td><td>Maksimalt 180 dager</td><td>Analyse – krever samtykke</td></tr>
            <tr><td>Vercel Web Analytics</td><td>Måler sidevisninger, henvisning, omtrentlig område og enhet i aggregert form.</td><td>Vercel</td><td>Bruker ikke tredjeparts-cookies. Besøksidentifikatoren forkastes etter 24 timer.</td><td>Analyse – krever samtykke</td></tr>
          </tbody>
        </table>
      </div>

      <h2>4. Google Analytics-innstillinger</h2>
      <p>Google Analytics er konfigurert uten annonseringslagring, Google Signals eller annonsepersonalisering. URL-parametere blir ikke sendt som sideadresse, informasjonskapslene utløper senest etter 180 dager fra første samtykke, og utløpstiden fornyes ikke ved hvert besøk.</p>

      <h2>5. Slik endrer du valget</h2>
      <p>Bruk knappen «Endre cookievalg» nederst på nettstedet. Trekker du samtykket tilbake, oppdateres Googles samtykkestatus, kjente Google Analytics-informasjonskapsler slettes, og analyseverktøyene lastes ikke ved neste sidevisning.</p>
      <p>Du kan også slette informasjonskapsler og lokal lagring i nettleserens innstillinger. Da vil nettstedet spørre om valget ditt på nytt.</p>

      <h2>6. Rettslig grunnlag</h2>
      <p>Valgfri analyse bygger på samtykke etter ekomloven § 3-15 og personvernforordningen artikkel 6 nr. 1 bokstav a. Lagringen av selve cookie-valget er nødvendig for å dokumentere og respektere valget ditt.</p>

      <h2>7. Kontakt</h2>
      <p>Spørsmål kan sendes til <a href="mailto:post@trosregisteret.no">post@trosregisteret.no</a>. Les også vår <a href="/personvern">personvernerklæring</a>.</p>
    </PolicyShell>
  );
}
