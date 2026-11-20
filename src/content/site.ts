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
  address: { street: "Strada Principală 771", postalCode: "727095", locality: "Cacica", region: "Suceava" },
  // The house, from the pin the family shared.
  geo: { lat: 47.643929, lon: 25.89254 },
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=47.643929%2C25.89254",
  facebookUrl: "https://www.facebook.com/Casutadinlivezi",
  // Two Instagram accounts: one for the stay, one for the kitchen (PGL).
  // The footer's single Instagram link (as in Figma) goes to the stay account;
  // the kitchen account is linked from the Masa la noi page.
  instagramStayUrl: "https://www.instagram.com/casutadinlivezi_pensiune",
  instagramKitchenUrl: "https://www.instagram.com/casutadinlivezi_pgl",
  foundedYear: 2026,
  // Table request form. The kitchen serves 11:00–18:00 and a table is booked for at most
  // `tableHours`, so the last start time is 16:00.
  tableTimes: ["11:00", "11:30", "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00"],
  tableDaysAhead: 60,
  // Largest party the form offers; bigger groups pick "more than …" and get a call.
  tableMaxGuests: 25,
  // A table is booked for at most this many hours.
  tableHours: 2,
} as const;
