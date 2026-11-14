import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PagePlaceholder } from "@/components/sections/PagePlaceholder";
import { getDictionary, hasLocale } from "@/content/i18n";

export async function generateMetadata({ params }: PageProps<"/[lang]/cazare">): Promise<Metadata> {
  const { lang } = await params;
  return hasLocale(lang) ? { title: getDictionary(lang).nav.cazare } : {};
}

export default async function Page({ params }: PageProps<"/[lang]/cazare">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  return <PagePlaceholder lang={lang} page="cazare" photo={{ src: "/photos/cazare/casa-de-sus-cu-dealuri.jpg", alt: "Căsuța văzută de sus, cu dealurile în spate" }} />;
}
