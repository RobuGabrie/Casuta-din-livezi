import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PagePlaceholder } from "@/components/sections/PagePlaceholder";
import { getDictionary, hasLocale } from "@/content/i18n";

export async function generateMetadata({ params }: PageProps<"/[lang]/lavanda">): Promise<Metadata> {
  const { lang } = await params;
  return hasLocale(lang) ? { title: getDictionary(lang).nav.lavanda } : {};
}

export default async function Page({ params }: PageProps<"/[lang]/lavanda">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  return <PagePlaceholder lang={lang} page="lavanda" photo={{ src: "/photos/lavanda/randuri-lavanda-toamna.jpg", alt: "Rândurile de lavandă din curte" }} />;
}
