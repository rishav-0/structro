export function getSiteUrl(): URL {
  const envUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  const normalizedUrl = envUrl && envUrl.length > 0 ? envUrl.replace(/\/$/, "") : "http://localhost:3000";

  return new URL(normalizedUrl);
}

export const publicTopLevelRoutes = [
  "",
  "/about",
  "/blogs",
  "/careers",
  "/contact",
  "/process",
  "/products",
  "/projects",
  "/services",
  "/stakeholder/contractor",
  "/stakeholder/vendor",
  "/login",
];