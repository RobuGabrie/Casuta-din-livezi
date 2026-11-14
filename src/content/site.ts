/**
 * Facts about the place, the same in every language.
 * Values marked TODO are placeholders until the family confirms them
 * (docs/PLAN.md, "Information still needed").
 */
export const site = {
  name: "Căsuța din Livezi",
  bookingUrl: "https://www.booking.com/hotel/ro/casuta-din-livezi-suceava2.html",
  // TODO: real phone / WhatsApp number in international format.
  phone: "",
  // TODO: real email address.
  email: "",
  facebookUrl: "https://www.facebook.com/Casutadinlivezi",
  // Two Instagram accounts: one for the stay, one for the kitchen (PGL).
  // The footer's single Instagram link (as in Figma) goes to the stay account;
  // the kitchen account is linked from the Masa la noi page.
  instagramStayUrl: "https://www.instagram.com/casutadinlivezi_pensiune",
  instagramKitchenUrl: "https://www.instagram.com/casutadinlivezi_pgl",
  foundedYear: 2026,
} as const;
