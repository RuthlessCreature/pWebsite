import { notFound } from "next/navigation";
import { ImageResponse } from "next/og";
import { getRouteKeyFromSlug } from "@/lib/i18n/config";
import { requireLocale } from "@/lib/i18n/server";
import { renderSocialImage } from "@/lib/social-image";

export const runtime = "edge";

type SocialImageRouteProps = {
  params: {
    locale: string;
    slug?: string[];
  };
};

export async function GET(_request: Request, { params }: SocialImageRouteProps) {
  const locale = requireLocale(params.locale);
  const routeKey = getRouteKeyFromSlug(params.slug);

  if (!routeKey) {
    notFound();
  }

  return new ImageResponse(renderSocialImage(locale, routeKey, 1200, 630), {
    width: 1200,
    height: 630
  });
}
