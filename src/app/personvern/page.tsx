import type { Metadata } from "next";
import { PolicyShell } from "../_components/policy-shell";

export const metadata: Metadata = {
  title: "Personvernerklæring",
  description: "Slik behandler trosregisteret.no personopplysninger og analysedata.",
  alternates: { canonical: "/personvern" },
};

export default function PrivacyPage() {
  return (
    <PolicyShell
      eyebrow="Personvern"
      title="Personvernerklæring"
      introduction="Vi skal samle inn minst mulig informasjon. Du kan bruke informasjonssiden og åpne Brønnøysundregistrene uten å dele medlemsopplysninger med oss."
    >
      <h2>1. Hvem er behandlingsansvarlig?</h2>
      <p>
        Det muslimske trosregisteret, som står bak trosregisteret.no, er behandlingsansvarlig for behandlingen som beskrives her. Personvernspørsmål kan sendes til <a href="mailto:post@trosregisteret.no">post@trosregisteret.no</a>.
      </p>

      <h2>2. Vi mottar ikke medlemsopplysningene dine</h2>
      <p>
        Lenker og QR-koder på nettstedet sender deg direkte til Brønnøysundregistrenes egen tjeneste. Innlogging skjer hos Brønnøysundregistrene via ID-porten. Vi får ikke vite om du logger inn, hvilket tros- eller livssynssamfunn du er registrert i, eller om du gjør endringer der.
      </p>
      <p>
        Opplysninger om religion kan være særlige kategorier personopplysninger. Derfor ber vi deg om ikke å sende medlemsopplysninger til oss på e-post.
      </p>

      <h2>3. Opplysninger som behandles på nettstedet</h2>
      <h3>Tekniske drifts- og sikkerhetsdata</h3>
      <p>
        Når nettstedet leveres, kan vår hostingleverandør Vercel behandle tekniske logger som IP-adresse, tidspunkt, forespurt side, nettleser og enhetsinformasjon. Formålet er å levere, sikre og feilsøke nettstedet. Behandlingsgrunnlaget er vår berettigede interesse i sikker og stabil drift, jf. personvernforordningen artikkel 6 nr. 1 bokstav f.
      </p>

      <h3>Ditt analysevalg</h3>
      <p>
        Vi lagrer valget ditt om analyse i nettleserens lokale lagring i opptil 180 dager. Dette er nødvendig for å respektere valget ditt og for å unngå at du blir spurt ved hvert besøk.
      </p>

      <h3>Google Analytics og Vercel Analytics</h3>
      <p>
        Analyseverktøyene lastes bare dersom du velger «Tillat analyse». Da kan vi behandle sidevisninger, henvisende nettsted, omtrentlig geografisk område, nettleser, operativsystem og enhetstype. Vi sender ikke navn, e-post, medlemsopplysninger eller URL-parametere til analyseverktøyene.
      </p>
      <p>
        Formålet er å forstå om kampanjen blir funnet og hvilke sider som brukes, slik at informasjonen kan forbedres. Behandlingsgrunnlaget er samtykke, jf. artikkel 6 nr. 1 bokstav a. Du kan trekke samtykket tilbake når som helst via «Endre cookievalg» nederst på siden.
      </p>

      <h2>4. Mottakere og behandling utenfor EØS</h2>
      <ul>
        <li><strong>Vercel Inc.</strong> leverer hosting og, ved samtykke, Web Analytics.</li>
        <li><strong>Google LLC.</strong> leverer Google Analytics når du har samtykket.</li>
      </ul>
      <p>
        Leverandørene kan behandle opplysninger utenfor EØS. Overføring skal skje med et gyldig overføringsgrunnlag, for eksempel EUs standard personvernbestemmelser eller EU–US Data Privacy Framework der dette gjelder. Se også <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer">Vercels personvernerklæring</a> og <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Googles personvernerklæring</a>.
      </p>

      <h2>5. Lagringstid</h2>
      <ul>
        <li>Analysevalget i lokal lagring slettes eller fornyes etter 180 dager.</li>
        <li>Google Analytics-informasjonskapsler er konfigurert til maksimalt 180 dager fra første samtykke og fornyes ikke ved hvert besøk.</li>
        <li>Google Analytics bruker- og hendelsesdata skal konfigureres med korteste praktiske lagringstid, normalt 2 måneder.</li>
        <li>Vercels besøksidentifikator forkastes etter 24 timer. Aggregert statistikk beholdes i henhold til vår avtale og kontoinnstillinger hos Vercel.</li>
        <li>Tekniske sikkerhetslogger beholdes bare så lenge de er nødvendige for drift, sikkerhet og feilsøking.</li>
      </ul>

      <h2>6. Dine rettigheter</h2>
      <p>Avhengig av behandlingen kan du ha rett til innsyn, retting, sletting, begrensning, dataportabilitet og til å protestere. Du kan alltid trekke et samtykke tilbake uten at det påvirker lovligheten av tidligere behandling.</p>
      <p>
        Kontakt oss på <a href="mailto:post@trosregisteret.no">post@trosregisteret.no</a>. Du kan også klage til <a href="https://www.datatilsynet.no/om-datatilsynet/kontakt-oss/klage-til-datatilsynet/" target="_blank" rel="noopener noreferrer">Datatilsynet</a>.
      </p>

      <h2>7. Endringer</h2>
      <p>Vi oppdaterer erklæringen når tjenestene eller behandlingen endres. Datoen øverst viser siste oppdatering.</p>
    </PolicyShell>
  );
}
