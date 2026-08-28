"use client";

import { OPEN_COOKIE_SETTINGS_EVENT } from "./analytics-consent";

export function CookieSettingsButton({ className = "" }: { className?: string }) {
  return (
    <button
      className={className}
      type="button"
      onClick={() => window.dispatchEvent(new Event(OPEN_COOKIE_SETTINGS_EVENT))}
    >
      Endre cookievalg
    </button>
  );
}
