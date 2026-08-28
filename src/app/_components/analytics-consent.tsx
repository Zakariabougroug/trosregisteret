"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Analytics } from "@vercel/analytics/next";
import { useEffect, useState } from "react";

const STORAGE_KEY = "trosregisteret-cookie-consent-v1";
const CONSENT_LIFETIME_MS = 180 * 24 * 60 * 60 * 1000;
export const OPEN_COOKIE_SETTINGS_EVENT = "trosregisteret:open-cookie-settings";

type Consent = "granted" | "denied" | "unset";

type ConsentRecord = {
  analytics: Exclude<Consent, "unset">;
  savedAt: number;
};

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

function readConsent(): Consent {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return "unset";
    const parsed = JSON.parse(raw) as Partial<ConsentRecord>;
    if (
      (parsed.analytics !== "granted" && parsed.analytics !== "denied") ||
      typeof parsed.savedAt !== "number" ||
      Date.now() - parsed.savedAt > CONSENT_LIFETIME_MS
    ) {
      window.localStorage.removeItem(STORAGE_KEY);
      return "unset";
    }
    return parsed.analytics;
  } catch {
    return "unset";
  }
}

function saveConsent(analytics: Exclude<Consent, "unset">) {
  const record: ConsentRecord = { analytics, savedAt: Date.now() };
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(record));
}

function removeGoogleAnalyticsCookies() {
  const hostname = window.location.hostname;
  document.cookie.split(";").forEach((entry) => {
    const name = entry.split("=")[0]?.trim();
    if (!name?.startsWith("_ga")) return;
    document.cookie = `${name}=; Max-Age=0; path=/; SameSite=Lax`;
    if (hostname.includes(".")) {
      document.cookie = `${name}=; Max-Age=0; path=/; domain=.${hostname}; SameSite=Lax`;
    }
  });
}

export function AnalyticsConsent({ googleMeasurementId }: { googleMeasurementId?: string }) {
  const pathname = usePathname();
  const [consent, setConsent] = useState<Consent>("unset");
  const [ready, setReady] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setConsent(readConsent());
      setReady(true);
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    const openSettings = () => setSettingsOpen(true);
    window.addEventListener(OPEN_COOKIE_SETTINGS_EVENT, openSettings);
    return () => window.removeEventListener(OPEN_COOKIE_SETTINGS_EVENT, openSettings);
  }, []);

  useEffect(() => {
    if (consent !== "granted" || !googleMeasurementId) return;

    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || ((...args: unknown[]) => window.dataLayer.push(args));
    window.gtag("consent", "default", {
      analytics_storage: "denied",
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
      wait_for_update: 500,
    });
    window.gtag("consent", "update", {
      analytics_storage: "granted",
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
    });
    window.gtag("js", new Date());
    window.gtag("config", googleMeasurementId, {
      send_page_view: false,
      allow_google_signals: false,
      allow_ad_personalization_signals: false,
      ads_data_redaction: true,
      cookie_expires: 15_552_000,
      cookie_update: false,
      page_location: `${window.location.origin}${window.location.pathname}`,
    });

    if (!document.querySelector(`script[data-ga-id="${googleMeasurementId}"]`)) {
      const script = document.createElement("script");
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(googleMeasurementId)}`;
      script.dataset.gaId = googleMeasurementId;
      document.head.appendChild(script);
    }
  }, [consent, googleMeasurementId]);

  useEffect(() => {
    if (consent !== "granted" || !googleMeasurementId || !window.gtag) return;
    window.gtag("event", "page_view", {
      page_path: pathname,
      page_location: `${window.location.origin}${pathname}`,
      page_title: document.title,
      send_to: googleMeasurementId,
    });
  }, [consent, googleMeasurementId, pathname]);

  function choose(nextConsent: Exclude<Consent, "unset">) {
    const wasGranted = consent === "granted";
    saveConsent(nextConsent);
    setConsent(nextConsent);
    setSettingsOpen(false);

    if (nextConsent === "denied") {
      window.gtag?.("consent", "update", {
        analytics_storage: "denied",
        ad_storage: "denied",
        ad_user_data: "denied",
        ad_personalization: "denied",
      });
      removeGoogleAnalyticsCookies();
      if (wasGranted) window.location.reload();
    }
  }

  const showBanner = ready && (consent === "unset" || settingsOpen);

  return (
    <>
      {consent === "granted" && <Analytics />}

      {showBanner && (
        <section
          className="fixed right-4 bottom-4 left-4 z-[200] mx-auto max-w-3xl rounded-2xl border border-[rgba(92,79,68,.18)] bg-[#fffcfa] p-5 text-[#211a14] shadow-[0_24px_80px_rgba(33,26,20,.24)] sm:p-6"
          aria-labelledby="cookie-consent-title"
          aria-live="polite"
        >
          <div className="grid items-end gap-5 md:grid-cols-[1fr_auto]">
            <div>
              <p className="mb-2 text-xs font-extrabold tracking-[.14em] text-[#047857] uppercase">Ditt personvern</p>
              <h2 className="m-0 text-xl font-extrabold sm:text-2xl" id="cookie-consent-title">Kan vi bruke analyseverktøy?</h2>
              <p className="mt-3 mb-0 text-sm leading-6 text-[#5c4f44] sm:text-base">
                Vi bruker Google Analytics og Vercel Analytics bare hvis du samtykker. Det hjelper oss å forstå anonymisert bruk av siden. Valget påvirker ikke tjenesten.
              </p>
              <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-sm font-semibold">
                <Link className="underline underline-offset-4" href="/informasjonskapsler">Les cookie-policyen</Link>
                <Link className="underline underline-offset-4" href="/personvern">Les personvernerklæringen</Link>
              </div>
            </div>
            <div className="flex flex-col-reverse gap-2.5 sm:flex-row md:flex-col-reverse">
              <button className="min-h-12 rounded-full border border-[#047857] bg-transparent px-6 text-sm font-extrabold text-[#047857] transition-colors hover:bg-[#ecfdf5]" type="button" onClick={() => choose("denied")}>Avvis analyse</button>
              <button className="min-h-12 rounded-full bg-[#047857] px-6 text-sm font-extrabold text-white transition-colors hover:bg-[#064e3b]" type="button" onClick={() => choose("granted")}>Tillat analyse</button>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
