/**
 * Facts about the place, the same in every language.
 * Values marked TODO are placeholders until the family confirms them
 * (docs/PLAN.md, "Information still needed").
 */
export const site = {
  name: "Căsuța din Livezi",
  bookingUrl: "https://www.booking.com/hotel/ro/casuta-din-livezi-suceava2.html",
  airbnbUrl: "https://www.airbnb.com/rooms/1540500135713667830" as string,
  // Phone and WhatsApp.
  phone: "+40 751 425 215" as string,
  email: "robumihaela69@gmail.com" as string,
  facebookUrl: "https://www.facebook.com/Casutadinlivezi",
  // Two Instagram accounts: one for the stay, one for the kitchen (PGL).
  // The footer's single Instagram link (as in Figma) goes to the stay account;
  // the kitchen account is linked from the Masa la noi page.
  instagramStayUrl: "https://www.instagram.com/casutadinlivezi_pensiune",
  instagramKitchenUrl: "https://www.instagram.com/casutadinlivezi_pgl",
  foundedYear: 2026,
  // Table request form: times offered and how far ahead a date can be chosen.
  // TODO: confirm the times with the family once the PGL schedule is set.
  tableTimes: ["12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "17:00", "17:30", "18:00", "18:30", "19:00", "19:30", "20:00"],
  tableDaysAhead: 60,
  // Largest party the form offers; bigger groups pick "more than …" and get a call.
  tableMaxGuests: 25,
  // A table is booked for at most this many hours.
  tableHours: 2,
} as const;
