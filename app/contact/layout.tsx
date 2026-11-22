import type { ReactNode } from "react";
import { pageMetadata } from "../lib/site";

// The contact page is a client component, so its metadata lives here.
export const metadata = pageMetadata({
  title: "Contact",
  description:
    "Send a message directly from this form — nothing is stored anywhere beyond delivering it to me. Email, GitHub and LinkedIn links are also on this page.",
  path: "/contact",
});

export default function ContactLayout({ children }: { children: ReactNode }) {
  return children;
}
