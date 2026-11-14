import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PagePlaceholder } from "@/components/sections/PagePlaceholder";
import { getDictionary, hasLocale } from "@/content/i18n";

export async function generateMetadata({ params }: PageProps<"/[lang]/masa-la-noi">): Promise<Metadata> {
  const { lang } = await params;
  return hasLocale(lang) ? { title: getDictionary(lang).nav.masa } : {};
}

export default async function Page({ params }: PageProps<"/[lang]/masa-la-noi">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  return <PagePlaceholder lang={lang} page="masa" photo={{ src: "/photos/masa/sala-panorama-1.jpg", alt: "Sala de mese cu ferestre spre livadă" }} />;
}
