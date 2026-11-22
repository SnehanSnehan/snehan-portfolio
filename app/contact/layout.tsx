import type { ReactNode } from "react";
import { pageMetadata } from "../lib/site";

// The contact page is a client component, so its metadata lives here.
export const metadata = pageMetadata({
  title: "Contact",
  description:
    "Get in touch with Snehan by email, GitHub or LinkedIn, or use the contact form.",
  path: "/contact",
});

export default function ContactLayout({ children }: { children: ReactNode }) {
  return children;
}
