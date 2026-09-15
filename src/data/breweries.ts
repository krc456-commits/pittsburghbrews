export type Brewery = {
  name: string;
  slug: string;
  city: string;
  neighborhood: string;
  area: "Pittsburgh" | "North" | "South" | "East" | "West" | "Surrounding Counties";
  address: string;
  website: string;
  type: string;
  food: "Full kitchen" | "Food trucks" | "Light food";
  outdoor?: boolean;
  dogFriendly?: boolean;
  lastVerified: string;
  blurb: string;
};

export const breweries: Brewery[] = [
  {
    name: "Dancing Gnome",
    slug: "dancing-gnome",
    city: "Pittsburgh",
    neighborhood: "Sharpsburg",
    area: "East",
    address: "1025 Main Street, Pittsburgh, PA 15215",
    website: "https://dancinggnomebeer.com/",
    type: "Hop-forward brewery",
    food: "Food trucks",
    outdoor: true,
    lastVerified: "Sep 2026",
    blurb: "Flavor-first beer, a polished taproom, and one of the region's best-known hop-forward programs."
  },
  {
    name: "Old Thunder Brewing",
    slug: "old-thunder",
    city: "Blawnox",
    neighborhood: "Blawnox",
    area: "East",
    address: "340 Freeport Road, Pittsburgh, PA 15238",
    website: "https://www.oldthunderbrewing.com/",
    type: "Independent brewery",
    food: "Food trucks",
    lastVerified: "Sep 2026",
    blurb: "A destination brewery in Blawnox with a broad, carefully made beer lineup and rotating food trucks."
  },
  {
    name: "East End Brewing Company",
    slug: "east-end",
    city: "Pittsburgh",
    neighborhood: "Larimer",
    area: "Pittsburgh",
    address: "147 Julius Street, Pittsburgh, PA 15206",
    website: "https://www.eastendbrewing.com/",
    type: "Brewpub",
    food: "Full kitchen",
    lastVerified: "Sep 2026",
    blurb: "A Pittsburgh craft-beer institution serving fresh beer and pizza from its Larimer brewpub."
  },
  {
    name: "Trace Brewing",
    slug: "trace-brewing",
    city: "Pittsburgh",
    neighborhood: "Bloomfield",
    area: "Pittsburgh",
    address: "4312 Main Street, Pittsburgh, PA 15224",
    website: "https://www.tracebloomfield.com/",
    type: "Neighborhood brewery",
    food: "Food trucks",
    outdoor: true,
    lastVerified: "Sep 2026",
    blurb: "A community-minded Bloomfield brewery with coffee, beer, regular food trucks, and a lively courtyard."
  },
  {
    name: "Allegheny City Brewing",
    slug: "allegheny-city-brewing",
    city: "Pittsburgh",
    neighborhood: "North Side",
    area: "Pittsburgh",
    address: "510 East Ohio Street, Pittsburgh, PA 15212",
    website: "https://www.alleghenycitybrewing.com/",
    type: "Neighborhood brewery",
    food: "Food trucks",
    outdoor: true,
    lastVerified: "Sep 2026",
    blurb: "A neighborhood-focused North Side brewery with a spacious taproom, beer garden, and daily food trucks."
  },
  {
    name: "Cinderlands Warehouse",
    slug: "cinderlands-warehouse",
    city: "Pittsburgh",
    neighborhood: "Strip District",
    area: "Pittsburgh",
    address: "2601 Smallman Street, Pittsburgh, PA 15222",
    website: "https://www.cinderlands.com/cinderlands-warehouse/",
    type: "Production brewery + restaurant",
    food: "Full kitchen",
    outdoor: true,
    lastVerified: "Sep 2026",
    blurb: "A large Strip District brewery with a scratch kitchen, multiple bars, games, and a covered patio."
  },
  {
    name: "Grist House Craft Brewery",
    slug: "grist-house",
    city: "Millvale",
    neighborhood: "Millvale",
    area: "North",
    address: "10 E Sherman Street, Pittsburgh, PA 15209",
    website: "https://gristhouse.com/millvale/",
    type: "Taproom brewery",
    food: "Food trucks",
    outdoor: true,
    dogFriendly: true,
    lastVerified: "Sep 2026",
    blurb: "A long-running Millvale favorite with a big outdoor footprint, rotating food trucks, and dog-friendly space."
  },
  {
    name: "Penn Brewery",
    slug: "penn-brewery",
    city: "Pittsburgh",
    neighborhood: "North Side",
    area: "Pittsburgh",
    address: "800 Vinial Street, Pittsburgh, PA 15212",
    website: "https://www.pennbrew.com/",
    type: "Historic brewery + restaurant",
    food: "Full kitchen",
    outdoor: true,
    dogFriendly: true,
    lastVerified: "Sep 2026",
    blurb: "Pittsburgh's historic North Side brewery pairing German-style beer with classic Pittsburgh food."
  },
  {
    name: "Golden Age Beer Co.",
    slug: "golden-age",
    city: "Homestead",
    neighborhood: "Homestead",
    area: "East",
    address: "337 E 8th Avenue, Homestead, PA 15120",
    website: "https://www.goldenagebeer.com/visit-us",
    type: "Lager-focused brewery",
    food: "Full kitchen",
    outdoor: true,
    lastVerified: "Sep 2026",
    blurb: "A lager-focused brewery and beer garden in Homestead with wood-fired pizza, burgers, and live events."
  },
  {
    name: "Lincoln Avenue Brewery",
    slug: "lincoln-avenue-brewery",
    city: "Bellevue",
    neighborhood: "Bellevue",
    area: "North",
    address: "538 Lincoln Avenue, Pittsburgh, PA 15202",
    website: "https://lincolnavenuebrewery.com/",
    type: "Brewpub",
    food: "Full kitchen",
    lastVerified: "Sep 2026",
    blurb: "A neighborhood brewpub on Bellevue's main street with house beer, cocktails, lunch, dinner, and brunch."
  },
  {
    name: "Hitchhiker Brewing Co.",
    slug: "hitchhiker-sharpsburg",
    city: "Sharpsburg",
    neighborhood: "Sharpsburg",
    area: "East",
    address: "1500 S Canal Street, Sharpsburg, PA 15215",
    website: "https://hitchhiker.beer/tap-rooms/",
    type: "Production brewery + taproom",
    food: "Food trucks",
    lastVerified: "Sep 2026",
    blurb: "Hitchhiker's Sharpsburg brewery and taproom, with a rotating beer lineup and scheduled food vendors."
  },
  {
    name: "Eleventh Hour Brewing Co.",
    slug: "eleventh-hour",
    city: "Pittsburgh",
    neighborhood: "Lawrenceville",
    area: "Pittsburgh",
    address: "3711 Charlotte Street, Pittsburgh, PA 15201",
    website: "https://www.11thhourbrews.com/",
    type: "Independent taproom brewery",
    food: "Food trucks",
    lastVerified: "Sep 2026",
    blurb: "A tucked-away Lawrenceville taproom with a rotating selection of house beer and regular weekend food trucks."
  }
];

export const areas = ["All", "Pittsburgh", "North", "South", "East", "West", "Surrounding Counties"] as const;
