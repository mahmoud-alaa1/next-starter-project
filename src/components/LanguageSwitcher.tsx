"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { routing } from "@/i18n/routing";

export default function LanguageSwitcher({ locale }: { locale: string }) {
  const pathname = usePathname();

  // Get the current path without the locale prefix
  const segments = pathname.split("/");
  segments[1] = ""; // remove current locale
  const basePath = segments.join("/") || "/";

  return (
    <div className="flex gap-3">
      {routing.locales.map((lng) => (
        <Link
          key={lng}
          href={`/${lng}${basePath}`}
          className={lng === locale ? "font-bold underline" : ""}>
          {lng.toUpperCase()}
        </Link>
      ))}
    </div>
  );
}
