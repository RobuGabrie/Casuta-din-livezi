import type { ro } from "./ro";

/** English text. The design is in Romanian; this is a translation to review at milestone 9. */
export const en: typeof ro = {
  meta: {
    title: "Căsuța din Livezi — Cacica, Bucovina",
    description:
      "A cottage among the orchards, home cooking from our farm and a lavender field in Cacica, Bucovina.",
  },
  nav: {
    home: "Home",
    cazare: "Stay",
    masa: "Our table",
    lavanda: "Lavender",
    contact: "Contact",
    label: "Main navigation",
    languageLabel: "Language",
    openMenu: "Open menu",
    closeMenu: "Close menu",
  },
  menu: {
    place: "Cacica, Bucovina",
    tagline: "Our family's place.",
  },
  footer: {
    tagline: "Our family's place. A little quiet for you.",
    place: "Cacica, Bucovina",
    linksLabel: "Pages",
    socialLabel: "Social media",
  },
  placeholder: "This page is being built.",
  home: {
    hero: {
      place: "Cacica, Bucovina · Our home",
      tagline: "A cottage. A good meal. A lavender field.",
      discover: "Discover the place",
    },
    intro: {
      statement: ["At the end of the road,", "the quiet begins."],
      text: "We are a family from Cacica, with an orchard, a home kitchen and a lavender field. We welcome you with the best we have, at the pace of the place.",
    },
    stay: {
      index: "01 / Stay",
      title: ["A cottage, all yours."],
      text: "Mornings looking out over the hills and long evenings in the garden. A simple place for being together.",
      facts: ["1 bedroom · living room · kitchenette", "Balcony · garden · free parking"],
      booking: "Book on Booking.com",
      airbnb: "Book on Airbnb",
      photoAlt: "The cottage seen from above, with the hills behind",
    },
    table: {
      index: "02 / Our table",
      title: ["From the garden,", "to our table."],
      text: "We cook as a family, with produce from our farm and the village. There is no fixed menu: the season tells us what goes on the table.",
      facts: ["Local Gastronomic Point", "Tables looking out on the orchard"],
      action: "Book a table",
      photoAlt: "The dining room with large windows onto the orchard and hills",
    },
    lavender: {
      title: "Lavender",
      text: "A hectare of fragrant quiet, right in our yard.",
      action: "Find out more",
      caption: "Late June–July · blooming depends on the weather. Photo: the field in autumn.",
      photoAlt: "Rows of lavender in the yard, in autumn",
    },
    nearby: {
      title: "Stay one more day.",
      items: [
        { name: "Cacica Salt Mine & Basilica", distance: "In the village · about 15 min on foot" },
        { name: "Gura Humorului", distance: "10 km" },
        { name: "Voroneț Monastery", distance: "25 km" },
        { name: "Suceava Airport", distance: "about 35 km" },
      ],
    },
  },
  contactBand: {
    title: "Come and see us.",
    address: ["Cacica, Suceava County", "Bucovina, Romania"],
    phoneLabel: "Phone / WhatsApp",
    emailLabel: "Email",
    phonePending: "+40 xxx xxx xxx",
    emailPending: "coming soon",
    pendingNote: "Contact details will be added soon.",
    action: "How to get here",
    mapAlt: "Map: the village of Cacica, Suceava County",
  },
};
