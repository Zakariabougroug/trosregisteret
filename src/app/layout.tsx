import type { Metadata } from "next";
import { AnalyticsConsent } from "./_components/analytics-consent";
import "./globals.css";

const siteUrl = "https://trosregisteret.no";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Det muslimske trosregisteret | Sjekk medlemskapet ditt",
    template: "%s | Det muslimske trosregisteret",
  },
  description:
    "Se hvilke tros- og livssynssamfunn du er registrert i. Logg inn trygt hos Brønnøysundregistrene og sjekk medlemskapet ditt på ett minutt.",
  keywords: [
    "trosregisteret",
    "muslimsk trossamfunn",
    "sjekk medlemskap",
    "Brønnøysundregistrene",
    "tros- og livssynssamfunn",
    "Oslo",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "nb_NO",
    url: siteUrl,
    siteName: "Det muslimske trosregisteret",
    title: "Er medlemskapet ditt registrert riktig?",
    description:
      "Logg inn trygt hos Brønnøysundregistrene og sjekk hvor du er registrert.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Er medlemskapet ditt registrert riktig?",
    description:
      "Logg inn trygt hos Brønnøysundregistrene og sjekk hvor du er registrert.",
  },
  robots: { index: true, follow: true },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Det muslimske trosregisteret",
  url: siteUrl,
  inLanguage: "nb-NO",
  description:
    "En felles informasjonskampanje for muslimske tros- og livssynssamfunn i Oslo.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="nb"
      className="scroll-smooth scroll-pt-20 motion-reduce:scroll-auto"
    >
      <body
        suppressHydrationWarning
        className="m-0 overflow-x-hidden bg-[#fffcfa] font-sans text-[#211a14] antialiased wrap-break-word [text-rendering:optimizeLegibility] selection:bg-[#a7f3d0] selection:text-[#064e3b] max-md:pb-[88px]"
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema).replace(/</g, "\\u003c"),
          }}
        />
        {children}
        <AnalyticsConsent
          googleMeasurementId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}
        />
      </body>
    </html>
  );
}
