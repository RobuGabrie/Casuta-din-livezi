/**
 * Places worth a visit around Cacica, the same in every language. The text for each
 * place is in the dictionaries (`nearbyPage.places`).
 *
 * Distances: by car from the house (47.64393, 25.89254), OpenStreetMap routing,
 * checked on 2026-11-20 and rounded.
 *
 * Photos: Wikimedia Commons, cropped to 4:3. Each licence asks for the author and
 * licence to be named next to the photo, which `credit` does.
 */
export type NearbyKey = (typeof nearbyGroups)[number]["places"][number];

export const nearbyGroups = [
  { key: "village", places: ["salina", "bazilica"] },
  { key: "monasteries", places: ["arbore", "humor", "voronet", "sucevita", "moldovita", "putna"] },
  { key: "crafts", places: ["marginea", "vama"] },
  { key: "towns", places: ["gura-humorului", "suceava"] },
  { key: "nature", places: ["rarau"] },
] as const;

type Credit = { author: string; license: string; source: string };

export const nearbyPlaces: Record<
  NearbyKey,
  {
    lat: number;
    lon: number;
    /** By car, or on foot for the places in the village. */
    km: number;
    minutes: number;
    onFoot?: boolean;
    wiki: { ro?: string; en?: string };
    credit: Credit;
  }
> = {
  salina: {
    lat: 47.63502,
    lon: 25.89802,
    km: 1.3,
    minutes: 15,
    onFoot: true,
    wiki: { ro: "https://ro.wikipedia.org/wiki/Salina_Cacica", en: "https://en.wikipedia.org/wiki/Cacica_mine" },
    credit: {
      author: "Tomasz Kuran",
      license: "CC BY 2.5",
      source: "https://commons.wikimedia.org/wiki/File:Cacica_salt_mine_chapel01.jpg",
    },
  },
  bazilica: {
    lat: 47.63787,
    lon: 25.89952,
    km: 1.1,
    minutes: 15,
    onFoot: true,
    wiki: { ro: "https://ro.wikipedia.org/wiki/Bazilica_Adormirea_Maicii_Domnului_din_Cacica" },
    credit: {
      author: "Cezar Suceveanu",
      license: "CC BY-SA 3.0",
      source: "https://commons.wikimedia.org/wiki/File:Biserica_Adormirea_Maicii_Domnului_din_Cacica38.jpg",
    },
  },
  arbore: {
    lat: 47.73305,
    lon: 25.92941,
    km: 16,
    minutes: 25,
    wiki: { ro: "https://ro.wikipedia.org/wiki/Biserica_Arbore", en: "https://en.wikipedia.org/wiki/Arbore_Church" },
    credit: {
      author: "Cezar Suceveanu",
      license: "CC BY 3.0",
      source: "https://commons.wikimedia.org/wiki/File:Biserica_Arbore12.jpg",
    },
  },
  humor: {
    lat: 47.59362,
    lon: 25.85488,
    km: 18,
    minutes: 25,
    wiki: {
      ro: "https://ro.wikipedia.org/wiki/M%C4%83n%C4%83stirea_Humorului,_Suceava",
      en: "https://en.wikipedia.org/wiki/Humor_Monastery",
    },
    credit: {
      author: "România de vis",
      license: "CC BY-SA 3.0 RO",
      source: "https://commons.wikimedia.org/wiki/File:Biserica_m%C4%83n%C4%83stirii_Humor,_Turnul.JPG",
    },
  },
  voronet: {
    lat: 47.517,
    lon: 25.8636,
    km: 25,
    minutes: 35,
    wiki: {
      ro: "https://ro.wikipedia.org/wiki/M%C4%83n%C4%83stirea_Voron%C8%9B",
      en: "https://en.wikipedia.org/wiki/Vorone%C8%9B_Monastery",
    },
    credit: {
      author: "Dstefanescu",
      license: "public-domain",
      source: "https://commons.wikimedia.org/wiki/File:Voronet_Intrare.JPG",
    },
  },
  sucevita: {
    lat: 47.77864,
    lon: 25.71088,
    km: 36,
    minutes: 50,
    wiki: {
      ro: "https://ro.wikipedia.org/wiki/M%C4%83n%C4%83stirea_Sucevi%C8%9Ba",
      en: "https://en.wikipedia.org/wiki/Sucevi%C8%9Ba_Monastery",
    },
    credit: {
      author: "Alex Moise",
      license: "CC BY-SA 3.0 RO",
      source: "https://commons.wikimedia.org/wiki/File:Biserica_si_curtea_manastirii_Sucevita.jpg",
    },
  },
  moldovita: {
    lat: 47.65704,
    lon: 25.57152,
    km: 51,
    minutes: 70,
    wiki: {
      ro: "https://ro.wikipedia.org/wiki/M%C4%83n%C4%83stirea_Moldovi%C8%9Ba",
      en: "https://en.wikipedia.org/wiki/Moldovi%C8%9Ba_Monastery",
    },
    credit: {
      author: "Alex Moise",
      license: "CC BY-SA 3.0 RO",
      source: "https://commons.wikimedia.org/wiki/File:Manastirea_Moldovita,_vedere_laterala.jpg",
    },
  },
  putna: {
    lat: 47.8659,
    lon: 25.59626,
    km: 55,
    minutes: 70,
    wiki: {
      ro: "https://ro.wikipedia.org/wiki/M%C4%83n%C4%83stirea_Putna",
      en: "https://en.wikipedia.org/wiki/Putna_Monastery",
    },
    credit: {
      author: "Geboiu Dumitru Mihai",
      license: "CC BY-SA 3.0 RO",
      source:
        "https://commons.wikimedia.org/wiki/File:Gr%C4%83dina_Edenului_numit%C4%83_Putna_impresionat%C4%83_de_astrul_de_foc.jpg",
    },
  },
  marginea: {
    lat: 47.80896,
    lon: 25.82169,
    km: 27,
    minutes: 35,
    wiki: { ro: "https://ro.wikipedia.org/wiki/Ceramic%C4%83_de_Marginea" },
    credit: {
      author: "Alexander Klink",
      license: "CC BY 4.0",
      source: "https://commons.wikimedia.org/wiki/File:Romania_Marginea_Suceava_Sign_With_Black_Pottery.jpg",
    },
  },
  vama: {
    lat: 47.56663,
    lon: 25.69549,
    km: 37,
    minutes: 50,
    wiki: {},
    credit: {
      author: "jackmac34 (Pixabay)",
      license: "CC0",
      source: "https://commons.wikimedia.org/wiki/File:Painted_Romanian_Easter_Eggs.jpg",
    },
  },
  "gura-humorului": {
    lat: 47.55369,
    lon: 25.88901,
    km: 20,
    minutes: 25,
    wiki: {
      ro: "https://ro.wikipedia.org/wiki/Gura_Humorului",
      en: "https://en.wikipedia.org/wiki/Gura_Humorului",
    },
    credit: {
      author: "Mihai Burlacu",
      license: "CC BY-SA 3.0",
      source: "https://commons.wikimedia.org/wiki/File:Gura_Humorului_-_panoramio_(3).jpg",
    },
  },
  suceava: {
    lat: 47.64485,
    lon: 26.27033,
    km: 37,
    minutes: 50,
    wiki: {
      ro: "https://ro.wikipedia.org/wiki/Cetatea_de_Scaun_a_Sucevei",
      en: "https://en.wikipedia.org/wiki/Medieval_Seat_Fortress_of_Suceava",
    },
    credit: {
      author: "Hedgehog2015",
      license: "CC BY-SA 4.0",
      source: "https://commons.wikimedia.org/wiki/File:Cetatea_de_Scaun_a_Sucevei_la_ceas_de_seara.jpg",
    },
  },
  rarau: {
    lat: 47.447,
    lon: 25.5624,
    km: 62,
    minutes: 90,
    wiki: { ro: "https://ro.wikipedia.org/wiki/Mun%C8%9Bii_Rar%C4%83u", en: "https://en.wikipedia.org/wiki/Rar%C4%83u_Massif" },
    credit: {
      author: "Constantin I. Barbu",
      license: "CC BY-SA 4.0",
      source: "https://commons.wikimedia.org/wiki/File:Pietrele_Doamnei_and_Piatra_%C8%98oimului_rocks.jpg",
    },
  },
};

/** Google Maps directions to a place. */
export const directionsUrl = (lat: number, lon: number) =>
  `https://www.google.com/maps/dir/?api=1&destination=${lat},${lon}`;
