import { notFound } from "next/navigation";
import { PagePlaceholder } from "@/components/sections/PagePlaceholder";
import { hasLocale } from "@/content/i18n";

export default async function Page({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  return <PagePlaceholder lang={lang} page="home" photo={{ src: "/photos/cazare/casa-de-sus-cu-dealuri.jpg", alt: "Casa și dealurile din Cacica" }} />;
}
