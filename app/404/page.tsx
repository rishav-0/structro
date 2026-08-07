import type { Metadata } from "next";
import NotFoundView from "@/components/not-found-view";

export const metadata: Metadata = {
  title: "404 - Page Not Found | Structro Infratech",
  description:
    "The page or engineering blueprint you are looking for is missing or decommissioned. Return to Structro Infratech home or browse services.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function Page404() {
  return <NotFoundView />;
}
