import type { Metadata } from "next";
import NotFoundView from "@/components/not-found-view";

export const metadata: Metadata = {
  title: "404 - Blueprint Not Found | Structro Infratech",
  description:
    "The requested page or structural engineering resource could not be found. Navigate back to Structro Infratech home or browse our bridge and PEB services.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  return <NotFoundView />;
}
