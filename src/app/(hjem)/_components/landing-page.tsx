/** @format */

"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState, type ReactNode } from "react";
import { CookieSettingsButton } from "../../_components/cookie-settings-button";

const CHECK_URL = "https://person.brreg.no/nb/minside/tros-og-livssyn";

const faqs = [
  [
    "Hvor sjekker jeg medlemskapet mitt?",
    "På Brønnøysundregistrenes Min side for tros- og livssynssamfunn.",
    true,
  ],
  [
    "Hvordan logger jeg inn?",
    "Du logger inn via ID-porten, for eksempel med BankID.",
  ],
  [
    "Hva får jeg se etter innlogging?",
    "Du får se hvilke tros- og livssynssamfunn som er registrert på deg.",
  ],
  [
    "Hva gjør jeg hvis informasjonen er feil?",
    "Ta kontakt direkte med tros- eller livssynssamfunnet det gjelder. Brønnøysundregistrene registrerer ikke selve inn- og utmeldingene.",
  ],
  [
    "Hva betyr dobbeltregistrering?",
    "Det betyr at du står registrert som medlem i mer enn ett tros- eller livssynssamfunn.",
  ],
  [
    "Hva skjer hvis jeg står registrert flere steder?",
    "Dersom medlemskapene omfattes av tilskuddsordningen, kan du falle utenfor tilskuddsgrunnlaget slik at ingen av samfunnene mottar statstilskudd for deg.",
  ],
  [
    "Hvor mye er tilskuddet i 2026?",
    "Tilskuddssatsen er 1 611 kroner per tilskuddstellende medlem.",
  ],
  ["Koster det noe å sjekke?", "Nei. Det er gratis."],
  [
    "Kan kampanjen se hvor jeg er registrert?",
    "Nei. Kampanjen samler ikke inn informasjon om trosmedlemskapet ditt. Du logger inn direkte hos Brønnøysundregistrene.",
  ],
  [
    "Kan Brønnøysundregistrene melde meg inn eller ut?",
    "Nei. Dersom noe skal endres, må du kontakte det aktuelle tros- eller livssynssamfunnet.",
  ],
] as const;

const impact = [
  ["1 person", "1 611"],
  ["100 personer", "161 100"],
  ["1 000 personer", "1 611 000"],
  ["5 000 personer", "8 055 000"],
];

const shell =
  "mx-auto w-[min(1240px,calc(100%_-_48px))] max-md:w-[calc(100%_-_32px)] max-sm:w-[calc(100%_-_28px)]";

function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 18 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.16 }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function LockIcon() {
  return (
    <svg
      className="size-[18px] shrink-0 fill-none stroke-current stroke-2 [stroke-linecap:round] [stroke-linejoin:round]"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <rect x="3" y="11" width="18" height="11" rx="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

function QrIcon() {
  return (
    <svg
      className="size-[30px] shrink-0 fill-none stroke-current stroke-[1.9] [stroke-linecap:round] [stroke-linejoin:round]"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <path d="M14 14h3v3h-3zM20 14v.01M14 20v.01M20 20v.01" />
    </svg>
  );
}

function FileIcon() {
  return (
    <svg
      className="size-[30px] shrink-0 fill-none stroke-current stroke-[1.9] [stroke-linecap:round] [stroke-linejoin:round]"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <path d="M14 2v6h6M9 15l2 2 4-5" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      className="size-[17px] shrink-0 fill-none stroke-current stroke-[3] [stroke-linecap:round] [stroke-linejoin:round]"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d="m20 6-11 11-5-5" />
    </svg>
  );
}

function CampaignButton({
  children,
  dark = false,
}: {
  children: ReactNode;
  dark?: boolean;
}) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.a
      className={`inline-flex min-h-[60px] items-center gap-2.5 rounded-full px-[30px] py-[19px] text-center text-sm font-extrabold tracking-[.04em] text-white uppercase shadow-[0_4px_16px_rgba(4,120,87,.18),0_16px_48px_rgba(120,80,40,.08)] transition-colors hover:text-white sm:text-base max-sm:whitespace-normal ${dark ? "bg-[#211a14] shadow-none hover:bg-[#047857]" : "bg-[#047857] hover:bg-[#064e3b]"}`}
      href={CHECK_URL}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={reduceMotion ? undefined : { y: -2 }}
      whileTap={reduceMotion ? undefined : { scale: 0.98 }}
    >
      {children} <span aria-hidden="true">→</span>
    </motion.a>
  );
}

function QrCode({ size = "medium" }: { size?: "small" | "medium" | "large" | "extraLarge" }) {
  const sizes = {
    small: "size-28 overflow-hidden rounded-xl",
    medium: "size-[150px] rounded-[14px] p-2.5",
    large: "size-[clamp(190px,26vw,240px)] rounded-[22px] bg-white p-4",
    extraLarge: "size-[clamp(240px,26vw,320px)] rounded-[28px] bg-white p-5",
  };
  return (
    <a
      className={`flex shrink-0 items-center justify-center bg-[#f7f2ed] ${sizes[size]}`}
      href={CHECK_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Åpne Brønnøysundregistrene"
    >
      <Image
        className="size-full object-contain [image-rendering:pixelated]"
        src="/brand/brreg-qr.png"
        alt="QR-kode til Brønnøysundregistrene"
        width={640}
        height={640}
      />
    </a>
  );
}

export function LandingPage() {
  const [openFaq, setOpenFaq] = useState(0);
  const [showMobileCta, setShowMobileCta] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const update = () =>
      setShowMobileCta(window.innerWidth < 820 && window.scrollY > 520);
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <>
      <a
        className="fixed top-2.5 left-2.5 z-[1000] -translate-y-[150%] rounded-full bg-[#211a14] px-4 py-2.5 text-white focus:translate-y-0"
        href="#main-content"
      >
        Hopp til innhold
      </a>

      <header className="sticky top-0 z-60 border-b border-[rgba(92,79,68,.12)] bg-[rgba(255,252,250,.88)] backdrop-blur-[14px]">
        <div
          className={`${shell} flex min-h-[69px] items-center justify-between gap-6 py-3`}
        >
          <a className="flex items-center gap-3 text-[#211a14]" href="#topp">
            <Image
              className="h-[clamp(26px,3vw,32px)] w-auto max-sm:max-w-[165px]"
              src="/brand/logo-inline.png"
              alt="Det muslimske trosregisteret"
              width={2704}
              height={535}
              priority
            />
            <span className="border-l border-[rgba(92,79,68,.2)] pl-3 text-[11px] leading-[1.3] font-medium tracking-[.06em] text-[#857567] max-md:hidden">
              Felles kampanje · Oslo 2026
            </span>
          </a>
          <nav className="flex items-center gap-7" aria-label="Hovedmeny">
            <div className="flex items-center gap-7 max-md:hidden">
              <a
                className="text-sm font-semibold text-[#5c4f44] transition-colors hover:text-[#047857]"
                href="#hvorfor"
              >
                Hvorfor?
              </a>
              <a
                className="text-sm font-semibold text-[#5c4f44] transition-colors hover:text-[#047857]"
                href="#slik"
              >
                Slik sjekker du
              </a>
              <a
                className="text-sm font-semibold text-[#5c4f44] transition-colors hover:text-[#047857]"
                href="#faq"
              >
                FAQ
              </a>
            </div>
            <a
              className="inline-flex min-h-11 items-center rounded-full bg-[#047857] px-5 py-3 text-[13px] font-extrabold tracking-[.06em] whitespace-nowrap text-white uppercase transition hover:scale-[1.02] hover:bg-[#064e3b] hover:text-white max-md:px-[18px]"
              href={CHECK_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="max-md:hidden">Sjekk medlemskap</span>
              <span className="hidden max-md:inline">Sjekk →</span>
            </a>
          </nav>
        </div>
      </header>

      <main id="main-content">
        <section
          className="py-[clamp(32px,7vw,88px)] pb-[clamp(44px,6vw,80px)]"
          id="topp"
        >
          <div
            className={`${shell} grid grid-cols-2 items-start gap-[clamp(36px,5vw,72px)] max-[900px]:grid-cols-1`}
          >
            <motion.div
              className="flex min-w-0 flex-col gap-[26px]"
              initial={reduceMotion ? false : "hidden"}
              animate="visible"
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.08 } },
              }}
            >
              <motion.div
                className="flex items-center gap-2.5 text-[12.5px] font-bold tracking-[.14em] text-[#047857] uppercase"
                variants={{
                  hidden: { opacity: 0, y: 12 },
                  visible: { opacity: 1, y: 0 },
                }}
              >
                <i className="size-2 shrink-0 rounded-full bg-[#10b981]" />
                Felles kampanje for muslimske trossamfunn i Oslo
              </motion.div>
              <motion.h1
                className="m-0 text-4xl leading-[1.03] font-extrabold tracking-[-.03em] text-balance sm:text-5xl lg:text-6xl"
                variants={{
                  hidden: { opacity: 0, y: 15 },
                  visible: { opacity: 1, y: 0 },
                }}
              >
                Er medlemskapet ditt registrert riktig?
              </motion.h1>
              <motion.p
                className="m-0 max-w-[56ch] text-base leading-[1.6] text-[#5c4f44] md:text-lg"
                variants={{
                  hidden: { opacity: 0, y: 15 },
                  visible: { opacity: 1, y: 0 },
                }}
              >
                Rundt 65 000 medlemmer er registrert i muslimske tros- og
                livssynssamfunn i Oslo. Med en tilskuddssats på 1 611 kr per
                medlem representerer dette over 100 millioner kroner i året.
              </motion.p>
              <motion.p
                className="m-0 max-w-[48ch] border-l-[3px] border-[#211a14] pl-[18px] text-lg leading-[1.45] font-bold lg:text-xl"
                variants={{
                  hidden: { opacity: 0, y: 15 },
                  visible: { opacity: 1, y: 0 },
                }}
              >
                Er du dobbeltregistrert, kan ingen av trossamfunnene få tilskudd
                for deg.
              </motion.p>
              <motion.div
                className="mt-1.5 flex flex-wrap items-center gap-3.5 max-sm:flex-col max-sm:items-stretch"
                variants={{
                  hidden: { opacity: 0, y: 15 },
                  visible: { opacity: 1, y: 0 },
                }}
              >
                <CampaignButton>Sjekk medlemskapet mitt</CampaignButton>
                <a
                  className="inline-flex min-h-14 items-center rounded-full px-5 py-[18px] text-[15px] font-bold text-[#5c4f44] hover:bg-[#f7f2ed] hover:text-[#047857] max-sm:w-full max-sm:justify-center"
                  href="#slik"
                >
                  Slik fungerer det ↓
                </a>
              </motion.div>
              <motion.div
                className="flex items-center gap-2.5 text-[13px] leading-[1.45] text-[#857567]"
                variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
              >
                <LockIcon />
                Du logger inn direkte hos Brønnøysundregistrene. Kampanjen ser
                ingenting.
              </motion.div>
            </motion.div>

            <motion.div
              className="flex min-w-0 flex-col gap-4"
              initial={reduceMotion ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.18 }}
            >
              <div className="rounded-[20px] border border-[rgba(92,79,68,.12)] bg-white p-[clamp(24px,3vw,38px)] shadow-[0_4px_16px_rgba(120,80,40,.08),0_16px_48px_rgba(120,80,40,.07)]">
                <div className="flex flex-wrap items-baseline gap-3.5">
                  <strong className="text-4xl leading-none font-extrabold tracking-[-.03em] md:text-5xl">
                    65 000
                  </strong>
                  <span className="text-sm font-semibold tracking-[.02em] text-[#857567]">
                    registrerte medlemmer
                  </span>
                </div>
                <hr className="my-5 h-px border-0 bg-[rgba(92,79,68,.12)]" />
                <div className="flex flex-wrap items-baseline gap-3.5">
                  <b className="text-xl text-[#a69886]">×</b>
                  <strong className="text-4xl leading-none font-extrabold tracking-[-.03em] md:text-5xl">
                    1 611 kr
                  </strong>
                  <span className="text-sm font-semibold tracking-[.02em] text-[#857567]">
                    per medlem
                  </span>
                </div>
                <hr className="my-5 h-px border-0 bg-[rgba(92,79,68,.12)]" />
                <div className="mb-2 flex items-center gap-3 text-xs font-bold tracking-[.14em] text-[#047857] uppercase">
                  <b className="text-xl">=</b> Over 100 millioner kroner
                </div>
                <div className="text-3xl leading-none font-extrabold tracking-[-.04em] whitespace-nowrap text-[#047857] sm:text-4xl md:text-5xl lg:text-6xl">
                  104 715 000{" "}
                  <small className="text-[.46em] tracking-[.02em]">KR</small>
                </div>
                <h2 className="mt-4 mb-0 text-sm font-bold">
                  Potensiell årlig tilskuddsverdi for trossamfunnene
                </h2>
                <p className="mt-1.5 mb-0 text-[12.5px] leading-[1.5] text-[#857567]">
                  Basert på ca. 65 000 registrerte medlemmer og tilskuddssatsen
                  for 2026. Til muslimske trossamfunn i Oslo – hvert år.
                </p>
              </div>
              <div className="flex items-center gap-5 rounded-[20px] border border-[rgba(92,79,68,.12)] bg-white p-[22px] shadow-[0_4px_16px_rgba(120,80,40,.08),0_16px_48px_rgba(120,80,40,.07)] max-sm:flex-col max-sm:items-start">
                <QrCode size="small" />
                <div className="flex min-w-0 flex-col gap-1.5">
                  <strong className="text-[17px]">Skann for å sjekke</strong>
                  <span className="text-[13px] text-[#857567]">
                    Åpner Brønnøysundregistrene
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section
          className="scroll-mt-20 border-y border-[rgba(92,79,68,.12)] bg-[#f7f2ed]"
          id="slik"
        >
          <div className={`${shell} py-[clamp(48px,7vw,104px)]`}>
            <Reveal className="mb-[clamp(36px,4vw,56px)] flex flex-col gap-3.5">
              <strong className="text-2xl leading-[1.05] font-extrabold tracking-[.02em] text-[#047857] sm:text-3xl lg:text-4xl">
                SKANN. LOGG INN. SJEKK.
              </strong>
              <h2 className="m-0 text-3xl leading-[1.05] font-extrabold tracking-[-.03em] text-balance sm:text-4xl lg:text-5xl xl:text-6xl">
                Det tar under ett minutt.
              </h2>
            </Reveal>
            <div className="grid grid-cols-3 gap-5 max-md:grid-cols-1">
              {[
                [
                  "01",
                  "SKANN",
                  "Skann QR-koden eller trykk på lenken.",
                  <QrIcon key="qr" />,
                ],
                [
                  "02",
                  "LOGG INN",
                  "Logg inn via ID-porten, for eksempel med BankID.",
                  <LockIcon key="lock" />,
                ],
                [
                  "03",
                  "SJEKK",
                  "Se hvilket eller hvilke tros- og livssynssamfunn du står registrert hos.",
                  <FileIcon key="file" />,
                ],
              ].map(([number, title, text, icon], index) => (
                <Reveal key={number as string} delay={index * 0.06}>
                  <article className="h-full min-h-[260px] rounded-[18px] bg-white p-[clamp(24px,2.6vw,34px)] shadow-[0_1px_4px_rgba(120,80,40,.07),0_4px_16px_rgba(120,80,40,.05)]">
                    <div className="flex items-center justify-between text-[#047857]">
                      <span className="text-[44px] leading-none font-extrabold tracking-[-.04em] text-[#ede8e0]">
                        {number}
                      </span>
                      {icon}
                    </div>
                    <h3 className="mt-11 mb-3.5 text-2xl font-extrabold tracking-[.02em] md:text-3xl">
                      {title}
                    </h3>
                    <p className="m-0 text-[15.5px] leading-[1.6] text-[#5c4f44]">
                      {text}
                    </p>
                  </article>
                </Reveal>
              ))}
            </div>
            <Reveal className="mt-[clamp(28px,3vw,40px)] grid grid-cols-2 items-center gap-[clamp(24px,3vw,40px)] rounded-[20px] bg-white p-[clamp(24px,3vw,40px)] shadow-[0_1px_4px_rgba(120,80,40,.07),0_4px_16px_rgba(120,80,40,.05)] max-md:grid-cols-1">
              <div className="flex flex-col items-start gap-4">
                <h3 className="m-0 text-2xl leading-[1.1] tracking-[-.02em] lg:text-3xl">
                  Sjekk medlemskapet nå →
                </h3>
                <CampaignButton>Sjekk medlemskapet mitt</CampaignButton>
                <span className="text-[13.5px] text-[#857567]">
                  Du sendes direkte til Brønnøysundregistrene.
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-5 max-sm:flex-col max-sm:items-start">
                <QrCode size="medium" />
                <div className="flex flex-col gap-1.5">
                  <strong>Skann med mobilen</strong>
                  <span className="text-[13px] text-[#857567]">
                    person.brreg.no
                  </span>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="scroll-mt-20" id="hvorfor">
          <div className={`${shell} py-[clamp(48px,7vw,104px)]`}>
            <Reveal className="flex max-w-[900px] flex-col gap-2.5">
              <h2 className="m-0 text-2xl leading-[1.15] font-semibold tracking-[-.02em] text-[#857567] text-balance sm:text-3xl lg:text-4xl">
                Dette handler ikke bare om én person.
              </h2>
              <strong className="text-4xl leading-[1.02] font-extrabold tracking-[-.03em] text-balance sm:text-5xl lg:text-6xl xl:text-7xl">
                Det handler om oss alle.
              </strong>
            </Reveal>
            <Reveal className="mt-[clamp(28px,3vw,44px)] grid max-w-[1000px] grid-cols-2 gap-[clamp(20px,3vw,48px)] max-md:grid-cols-1">
              <p className="m-0 text-[16.5px] leading-[1.65] text-[#5c4f44]">
                Når én person ikke teller med i tilskuddsgrunnlaget, utgjør det
                1 611 kr i 2026.
              </p>
              <p className="m-0 text-[16.5px] leading-[1.65] text-[#5c4f44]">
                Når hundrevis eller tusenvis av personer er feilregistrert,
                dobbeltregistrert eller ikke registrert der de ønsker å være
                medlem, blir summene store.
              </p>
            </Reveal>
            <div className="mt-[clamp(36px,4vw,56px)] grid grid-cols-4 gap-[clamp(10px,1.2vw,16px)] max-[900px]:grid-cols-2 max-sm:grid-cols-1">
              {impact.map(([label, amount], index) => (
                <Reveal key={label} delay={index * 0.05}>
                  <div className="flex h-full min-w-0 flex-col gap-3 rounded-[18px] border border-[rgba(92,79,68,.12)] bg-white p-[clamp(18px,2.4vw,30px)] transition hover:-translate-y-0.5 hover:shadow-[0_4px_16px_rgba(120,80,40,.08),0_16px_48px_rgba(120,80,40,.07)]">
                    <span className="text-[11.5px] font-bold tracking-[.12em] text-[#857567] uppercase">
                      {label}
                    </span>
                    <strong className="text-2xl leading-none font-extrabold tracking-[-.035em] whitespace-nowrap text-[#047857] md:text-3xl lg:text-4xl">
                      {amount} <small className="text-[.5em]">kr</small>
                    </strong>
                    <p className="m-0 text-[12.5px] text-[#857567]">
                      i tilskuddsgrunnlag
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
            <Reveal>
              <p className="mt-[clamp(28px,3vw,40px)] mb-0 max-w-[34ch] text-lg leading-[1.4] font-bold md:text-xl lg:text-2xl">
                Små feil kan bli store summer når vi ser på trossamfunnene
                samlet.
              </p>
            </Reveal>
          </div>
        </section>

        <section className="border-y border-[rgba(180,83,9,.16)] bg-[#fffbeb]">
          <div
            className={`${shell} grid grid-cols-2 items-start gap-[clamp(32px,4vw,64px)] py-[clamp(48px,7vw,104px)] max-md:grid-cols-1`}
          >
            <Reveal>
              <div className="flex items-center gap-2.5 text-[19px] text-[#b45309]">
                △{" "}
                <span className="text-[12.5px] font-bold tracking-[.14em] uppercase">
                  Viktig å vite
                </span>
              </div>
              <h2 className="mt-[18px] mb-0 text-3xl leading-[1.02] font-extrabold tracking-[-.03em] sm:text-4xl md:text-5xl lg:text-6xl">
                Dobbeltregistrert?
              </h2>
              <h3 className="mt-[18px] mb-0 max-w-[26ch] text-lg leading-[1.35] font-semibold md:text-xl lg:text-2xl">
                Da kan medlemskapet ditt falle utenfor tilskuddsgrunnlaget.
              </h3>
            </Reveal>
            <Reveal
              className="flex flex-col items-start gap-[22px]"
              delay={0.08}
            >
              <p className="m-0 text-[16.5px] leading-[1.65] text-[#5c4f44]">
                Det er mulig å stå registrert i flere tros- og livssynssamfunn.
                Men dersom du står registrert i flere samfunn som omfattes av
                tilskuddsordningen samtidig, kan ingen av dem få statstilskudd
                for deg.
              </p>
              <strong className="w-full rounded-[18px] bg-[#211a14] p-[clamp(24px,2.8vw,34px)] text-xl leading-[1.15] text-white md:text-2xl lg:text-3xl">
                INGEN AV DEM FÅR TILSKUDD FOR DEG.
              </strong>
              <p className="m-0 text-[16.5px] leading-[1.65] text-[#5c4f44]">
                Derfor er det viktig å kontrollere at medlemskapet ditt er
                registrert slik du ønsker.
              </p>
              <CampaignButton dark>Sjekk hvor jeg er registrert</CampaignButton>
            </Reveal>
          </div>
        </section>

        <section>
          <div className={`${shell} py-[clamp(48px,7vw,104px)]`}>
            <div className="grid grid-cols-2 items-start gap-[clamp(32px,4vw,64px)] max-[900px]:grid-cols-1">
              <Reveal className="flex flex-col gap-5">
                <h2 className="m-0 text-3xl leading-[1.05] font-extrabold tracking-[-.03em] text-balance sm:text-4xl lg:text-5xl xl:text-6xl">
                  Går du i moskeen – men er du faktisk medlem?
                </h2>
                <p className="m-0 text-[16.5px] leading-[1.65] text-[#5c4f44]">
                  Mange deltar i bønn, aktiviteter og undervisning i et
                  trossamfunn uten nødvendigvis å vite om de faktisk står
                  registrert som medlem.
                </p>
                <p className="m-0 text-[16.5px] leading-[1.65] text-[#5c4f44]">
                  Brønnøysundregistrene viser hvilke tros- og livssynssamfunn
                  som er registrert på deg.
                </p>
              </Reveal>
              <Reveal
                className="grid grid-cols-2 gap-4 max-sm:grid-cols-1"
                delay={0.08}
              >
                <div className="flex min-h-[230px] flex-col gap-4 rounded-[18px] bg-[#ecfdf5] p-[clamp(22px,2.4vw,30px)]">
                  <strong className="mb-1 text-[#064e3b]">
                    Du kan være en aktiv del av moskeen
                  </strong>
                  {[
                    "Be der",
                    "Delta på aktiviteter",
                    "Ha barn i undervisning",
                    "Delta på Eid og Ramadan",
                  ].map((item) => (
                    <span
                      className="flex items-center gap-2.5 text-[15px] font-semibold text-[#065f46]"
                      key={item}
                    >
                      <CheckIcon />
                      {item}
                    </span>
                  ))}
                </div>
                <div className="flex min-h-[230px] flex-col justify-between gap-4 rounded-[18px] bg-[#f7f2ed] p-[clamp(22px,2.4vw,30px)]">
                  <strong>Men likevel ikke være registrert som medlem</strong>
                  <p className="m-0 flex items-center gap-3 text-sm leading-[1.5] text-[#5c4f44]">
                    <i className="grid size-11 shrink-0 place-items-center rounded-full bg-[#ede8e0] font-bold not-italic text-[#857567]">
                      !
                    </i>
                    Deltakelse er ikke det samme som registrert medlemskap.
                  </p>
                </div>
              </Reveal>
            </div>
            <Reveal className="mt-[clamp(36px,4vw,56px)] flex flex-wrap items-center gap-[clamp(20px,3vw,40px)] border-t border-[rgba(92,79,68,.12)] pt-[clamp(28px,3vw,44px)]">
              <strong className="text-4xl leading-none font-extrabold tracking-[-.04em] sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl">
                Ikke anta. Sjekk.
              </strong>
              <CampaignButton>Sjekk medlemskapet mitt</CampaignButton>
            </Reveal>
          </div>
        </section>

        <section className="border-y border-[rgba(92,79,68,.12)] bg-[#f7f2ed]">
          <div className={`${shell} py-[clamp(48px,7vw,104px)]`}>
            <Reveal className="flex max-w-[800px] flex-col gap-[18px]">
              <span className="text-[12.5px] font-bold tracking-[.14em] text-[#047857] uppercase">
                Oslo
              </span>
              <h2 className="m-0 text-3xl leading-[1.05] font-extrabold tracking-[-.03em] text-balance sm:text-4xl lg:text-5xl xl:text-6xl">
                Et av Norges største muslimske trossamfunn
              </h2>
              <p className="m-0 text-[16.5px] leading-[1.65] text-[#5c4f44]">
                Det finnes ikke et offentlig register over hvilken religion
                innbyggerne i Norge tilhører. Derfor vet vi ikke nøyaktig hvor
                mange muslimer som bor i Oslo.
              </p>
              <p className="m-0 text-[16.5px] leading-[1.65] text-[#5c4f44]">
                Det finnes rundt 65 000 registrerte medlemmer i muslimske tros-
                og livssynssamfunn i Oslo, mens de muslimske trossamfunnene kan
                favne betydelig flere.
              </p>
            </Reveal>
            <div className="mt-[clamp(32px,4vw,52px)] grid grid-cols-2 gap-4 max-md:grid-cols-1">
              <Reveal>
                <div className="flex h-full min-h-[255px] flex-col gap-3 rounded-[20px] bg-white p-[clamp(26px,3vw,38px)] shadow-[0_1px_4px_rgba(120,80,40,.07),0_4px_16px_rgba(120,80,40,.05)]">
                  <strong className="text-4xl leading-none font-extrabold tracking-[-.04em] whitespace-nowrap text-[#047857] sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl">
                    65 000+
                  </strong>
                  <b>registrerte medlemmer</b>
                  <p className="m-0 text-[13px] leading-[1.5] text-[#857567]">
                    I muslimske tros- og livssynssamfunn i Oslo.
                  </p>
                  <i className="mt-auto block h-3.5 w-[45%] rounded-full bg-[#047857]" />
                </div>
              </Reveal>
              <Reveal delay={0.06}>
                <div className="flex h-full min-h-[255px] flex-col gap-3 rounded-[20px] bg-white p-[clamp(26px,3vw,38px)] shadow-[0_1px_4px_rgba(120,80,40,.07),0_4px_16px_rgba(120,80,40,.05)]">
                  <strong className="text-2xl leading-none font-extrabold tracking-[-.04em] whitespace-normal sm:text-3xl sm:whitespace-nowrap md:text-4xl lg:text-5xl xl:text-6xl">
                    100 000–150 000+
                  </strong>
                  <b>mulig størrelse på de muslimske trossamfunnene</b>
                  <span className="self-start rounded-full border border-[rgba(180,83,9,.22)] bg-[#fffbeb] px-3 py-[7px] text-[11.5px] font-bold tracking-[.1em] text-[#b45309] uppercase">
                    Anslag – ikke offisiell religionsstatistikk
                  </span>
                  <i className="mt-auto block h-3.5 w-full rounded-full bg-[repeating-linear-gradient(90deg,#ddd5c8_0_10px,#f7f2ed_10px_18px)]" />
                </div>
              </Reveal>
            </div>
            <Reveal>
              <p className="mt-[clamp(24px,3vw,36px)] mb-0 max-w-[60ch] text-lg leading-[1.5] font-semibold lg:text-xl">
                Forskjellen mellom antall muslimer og antall registrerte
                medlemmer viser hvorfor det er viktig at hver enkelt
                kontrollerer sitt eget medlemskap.
              </p>
            </Reveal>
          </div>
        </section>

        <section className="scroll-mt-20 py-[clamp(48px,7vw,104px)]" id="faq">
          <div className="mx-auto w-[min(1000px,calc(100%_-_48px))] max-md:w-[calc(100%_-_32px)] max-sm:w-[calc(100%_-_28px)]">
            <Reveal>
              <h2 className="mt-0 mb-[clamp(28px,3vw,44px)] text-3xl leading-[1.05] font-extrabold tracking-[-.03em] sm:text-4xl lg:text-5xl">
                Ofte stilte spørsmål
              </h2>
            </Reveal>
            <Reveal className="flex flex-col gap-2.5">
              {faqs.map(([question, answer, cta], index) => {
                const open = openFaq === index;
                return (
                  <div
                    className={`overflow-hidden rounded-[14px] border ${index === 8 ? "border-[rgba(4,120,87,.28)] bg-[#ecfdf5]" : "border-[rgba(92,79,68,.12)] bg-white"}`}
                    key={question}
                  >
                    <button
                      className="flex min-h-16 w-full cursor-pointer items-center justify-between gap-[18px] border-0 bg-transparent px-[clamp(18px,2vw,26px)] py-[22px] text-left text-[#211a14]"
                      type="button"
                      aria-expanded={open}
                      onClick={() => setOpenFaq(open ? -1 : index)}
                    >
                      <span className="text-base leading-[1.4] font-bold md:text-lg">
                        {question}
                      </span>
                      <i className="grid size-[30px] shrink-0 place-items-center rounded-full bg-[#f7f2ed] text-[17px] font-bold not-italic text-[#5c4f44]">
                        {open ? "−" : "+"}
                      </i>
                    </button>
                    <AnimatePresence initial={false}>
                      {open && (
                        <motion.div
                          className="overflow-hidden"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: reduceMotion ? 0 : 0.22 }}
                        >
                          <p className="mx-0 mt-0 mb-0 max-w-[62ch] px-[clamp(18px,2vw,26px)] pb-6 text-base leading-[1.65] text-[#5c4f44]">
                            {answer}
                          </p>
                          {cta && (
                            <a
                              className="mx-[26px] mt-[-4px] mb-6 inline-flex min-h-12 items-center rounded-full bg-[#047857] px-6 py-[15px] text-[13.5px] font-extrabold tracking-[.04em] text-white uppercase"
                              href={CHECK_URL}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              Åpne Brønnøysundregistrene →
                            </a>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </Reveal>
          </div>
        </section>

        <section className="bg-[#064e3b] text-[#fffcfa]">
          <div className="mx-auto w-[min(1000px,calc(100%_-_48px))] py-[clamp(56px,8vw,120px)] max-md:w-[calc(100%_-_32px)] max-sm:w-[calc(100%_-_28px)]">
            <Reveal className="flex flex-col items-center gap-[clamp(22px,2.6vw,34px)] text-center">
              <span className="text-[12.5px] font-bold tracking-[.2em] text-[#6ee7b7] uppercase">
                Oslo • 2026
              </span>
              <h2 className="m-0 text-3xl leading-[1.1] font-semibold tracking-[-.02em] text-[#a7f3d0] md:text-4xl lg:text-5xl">
                Ett minutt kan gjøre en forskjell.
              </h2>
              <div className="flex flex-col gap-0.5">
                {["SKANN.", "LOGG INN.", "SJEKK."].map((word) => (
                  <strong
                    className="text-4xl leading-[.98] font-extrabold tracking-[-.035em] sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl"
                    key={word}
                  >
                    {word}
                  </strong>
                ))}
              </div>
              <p className="m-0 max-w-[42ch] text-base leading-[1.6] text-[#a7f3d0] md:text-lg">
                Kontroller at medlemskapet ditt er registrert slik du ønsker.
              </p>
              <QrCode size="extraLarge" />
              <b className="text-sm tracking-[.06em] text-[#6ee7b7] uppercase">
                Skann med mobilen
              </b>
              <small className="max-w-[52ch] text-[13px] leading-[1.6] text-[#a7f3d0]">
                Funker ikke QR-koden? Besøk lenken:{" "}
                <strong className="text-white break-all">
                  person.brreg.no/nb/minside/tros-og-livssyn
                </strong>
              </small>
              <motion.a
                className="inline-flex min-h-[62px] items-center gap-2.5 rounded-full bg-[#fffcfa] px-9 py-[21px] text-center text-base font-extrabold tracking-[.04em] text-[#064e3b] uppercase hover:bg-[#a7f3d0] md:text-lg max-sm:w-full max-sm:justify-center"
                href={CHECK_URL}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={reduceMotion ? undefined : { y: -2 }}
                whileTap={reduceMotion ? undefined : { scale: 0.98 }}
              >
                Sjekk medlemskapet mitt →
              </motion.a>
              <small className="max-w-[52ch] text-[13px] leading-[1.6] text-[#a7f3d0]">
                Du sendes direkte til Brønnøysundregistrene. Vi mottar ingen
                informasjon om medlemskapet ditt.
              </small>
              <div className="mt-[clamp(10px,2vw,20px)] w-full max-w-[760px] border-t border-[rgba(167,243,208,.28)] pt-[clamp(26px,3vw,40px)] text-3xl leading-[1.1] font-extrabold tracking-[-.03em] sm:text-4xl lg:text-5xl">
                Sjekk at medlemskapet ditt teller.
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <footer className="bg-[#211a14] text-[#c4b8a8]">
        <div
          className={`${shell} flex flex-col gap-9 py-[clamp(40px,5vw,72px)] pb-[clamp(32px,4vw,56px)]`}
        >
          <div className="grid grid-cols-3 items-start gap-8 max-md:grid-cols-2 max-sm:grid-cols-1">
            <div className="flex flex-col gap-2.5 max-md:col-span-2 max-sm:col-span-1">
              <span className="mb-1.5 inline-flex self-start items-center rounded-[11px] bg-white px-3.5 py-2.5">
                <Image
                  className="h-[26px] w-auto"
                  src="/brand/logo-inline.png"
                  alt="Det muslimske trosregisteret"
                  width={2704}
                  height={535}
                />
              </span>
              <strong className="text-[15px] text-[#fffcfa]">
                trosregisteret.no
              </strong>
              <b className="text-[15px] tracking-[.06em] text-[#fffcfa] uppercase">
                For muslimske trossamfunn i Oslo
              </b>
              <p className="m-0 max-w-[48ch] text-[13px] leading-[1.6]">
                En felles informasjonskampanje. Ingen enkelt moské står bak.
              </p>
            </div>
            <div className="flex flex-col gap-2.5 text-[13.5px] leading-[1.7]">
              <strong className="text-[11.5px] tracking-[.14em] text-[#857567] uppercase">
                Kilder
              </strong>
              <span>Brønnøysundregistrene</span>
              <span>Regjeringen.no</span>
              <span>Statistisk sentralbyrå</span>
            </div>
            <div className="flex flex-col gap-2.5 text-[13.5px] leading-[1.7]">
              <strong className="text-[11.5px] tracking-[.14em] text-[#857567] uppercase">
                Om
              </strong>
              <a className="text-[#c4b8a8] hover:text-white" href="#faq">
                Kilder
              </a>
              <Link className="text-[#c4b8a8] hover:text-white" href="/personvern">
                Personvern
              </Link>
              <Link className="text-[#c4b8a8] hover:text-white" href="/informasjonskapsler">
                Cookie-policy
              </Link>
              <CookieSettingsButton className="cursor-pointer border-0 bg-transparent p-0 text-left text-[#c4b8a8] hover:text-white" />
              <a className="text-[#c4b8a8] hover:text-white" href="#topp">
                Om kampanjen
              </a>
            </div>
          </div>
          <p className="m-0 max-w-[80ch] border-t border-[rgba(196,184,168,.16)] pt-6 text-xs leading-[1.65] text-[#857567]">
            Statistikk og beregninger er basert på tilgjengelige medlemstall og
            tilskuddssatsen for 2026. Antall muslimer i Oslo er et anslag,
            ettersom Norge ikke fører register over innbyggernes religion.
          </p>
        </div>
      </footer>

      <AnimatePresence>
        {showMobileCta && (
          <motion.div
            className="fixed right-0 bottom-0 left-0 z-70 border-t border-[rgba(92,79,68,.14)] bg-[rgba(255,252,250,.94)] px-4 pt-3 pb-[calc(12px+env(safe-area-inset-bottom))] backdrop-blur-[14px]"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: reduceMotion ? 0 : 0.22 }}
          >
            <a
              className="flex min-h-[58px] items-center justify-center rounded-full bg-[#047857] px-5 py-4 text-base font-extrabold tracking-[.04em] text-white uppercase"
              href={CHECK_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              Sjekk medlemskapet →
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
