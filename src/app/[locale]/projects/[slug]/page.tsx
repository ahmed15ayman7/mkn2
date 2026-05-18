import { SeaPointProjectContent } from "@/components/pages/sea-point-project-content";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";

type Props = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  return [{ slug: "sea-point" }];
}

export default async function ProjectDetailPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  if (slug !== "sea-point") {
    notFound();
  }

  return <SeaPointProjectContent />;
}
