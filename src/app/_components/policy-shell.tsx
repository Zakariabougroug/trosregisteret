import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { CookieSettingsButton } from "./cookie-settings-button";

export function PolicyShell({
  eyebrow,
  title,
  introduction,
  children,
}: {
  eyebrow: string;
  title: string;
  introduction: string;
  children: ReactNode;
}) {
  return (
    <>
      <header className="border-b border-[rgba(92,79,68,.12)] bg-[#fffcfa]">
        <div className="mx-auto flex min-h-20 w-[min(1120px,calc(100%_-_32px))] items-center justify-between gap-6">
          <Link href="/" aria-label="Til forsiden">
            <Image className="h-8 w-auto max-sm:h-7" src="/brand/logo-inline.png" alt="Det muslimske trosregisteret" width={2704} height={535} priority />
          </Link>
          <Link className="text-sm font-bold text-[#047857] hover:text-[#064e3b]" href="/">← Til forsiden</Link>
        </div>
      </header>

      <main className="mx-auto w-[min(820px,calc(100%_-_32px))] py-16 sm:py-24">
        <p className="mb-4 text-xs font-extrabold tracking-[.16em] text-[#047857] uppercase">{eyebrow}</p>
        <h1 className="m-0 text-4xl leading-tight font-extrabold tracking-[-.035em] text-balance sm:text-5xl lg:text-6xl">{title}</h1>
        <p className="mt-6 max-w-[68ch] text-lg leading-8 text-[#5c4f44] sm:text-xl">{introduction}</p>
        <p className="mt-5 text-sm font-semibold text-[#857567]">Sist oppdatert: 28. august 2026</p>

        <article className="mt-14 border-t border-[rgba(92,79,68,.12)] pt-2 [&_a]:font-semibold [&_a]:text-[#047857] [&_a]:underline [&_a]:underline-offset-4 [&_h2]:mt-12 [&_h2]:mb-4 [&_h2]:text-2xl [&_h2]:font-extrabold [&_h2]:tracking-[-.02em] sm:[&_h2]:text-3xl [&_h3]:mt-7 [&_h3]:mb-2 [&_h3]:text-lg [&_h3]:font-extrabold [&_li]:pl-1 [&_p]:my-3 [&_p]:leading-7 [&_p]:text-[#5c4f44] [&_table]:mt-6 [&_table]:w-full [&_table]:border-collapse [&_td]:border-b [&_td]:border-[rgba(92,79,68,.12)] [&_td]:p-3 [&_td]:align-top [&_td]:text-sm [&_th]:border-b [&_th]:border-[rgba(92,79,68,.2)] [&_th]:p-3 [&_th]:text-left [&_th]:text-sm [&_th]:font-extrabold [&_ul]:my-4 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-6 [&_ul]:leading-7 [&_ul]:text-[#5c4f44]">
          {children}
        </article>
      </main>

      <footer className="bg-[#211a14] py-10 text-[#c4b8a8]">
        <div className="mx-auto flex w-[min(1120px,calc(100%_-_32px))] flex-wrap items-center justify-between gap-5 text-sm">
          <span>© 2026 Det muslimske trosregisteret</span>
          <nav className="flex flex-wrap items-center gap-x-5 gap-y-3" aria-label="Juridiske lenker">
            <Link className="hover:text-white" href="/personvern">Personvern</Link>
            <Link className="hover:text-white" href="/informasjonskapsler">Cookie-policy</Link>
            <CookieSettingsButton className="cursor-pointer border-0 bg-transparent p-0 text-[#c4b8a8] hover:text-white" />
          </nav>
        </div>
      </footer>
    </>
  );
}
