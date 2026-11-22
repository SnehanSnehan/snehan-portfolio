// Same card as the Open Graph image. Route-segment config is declared here (rather
// than re-exported) so Next can read it statically; the image itself is shared.
export { default } from "./opengraph-image";

export const alt = "Snehan — Data Scientist & Analytics Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
