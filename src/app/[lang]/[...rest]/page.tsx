import { notFound } from "next/navigation";

// Any address under /ro or /en that is not a page shows the site's own not-found page.
export default function UnknownPage() {
  notFound();
}
