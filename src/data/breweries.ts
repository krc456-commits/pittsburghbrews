export type BreweryImage = {
  url: string;
  alt: string;
  sourceLabel: string;
  sourceUrl: string;
  license: string;
  licenseUrl?: string;
  credit?: string;
};

export type BreweryLogo = {
  url: string;
  alt: string;
};

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
  image?: BreweryImage;
  logo?: BreweryLogo;
};

export const breweries: Brewery[] = [
  {
    name: "Abjuration Brewing - Hazelwood",
    slug: "abjuration-hazelwood",
    city: "Pittsburgh",
    neighborhood: "Hazelwood",
    area: "Pittsburgh",
    address: "5011 Lytle Street, Pittsburgh, PA 15207",
    website: "https://www.abjurationbrewing.com/",
    type: "Independent brewery",
    food: "Light food",
    outdoor: true,
    lastVerified: "Sep 2026",
    blurb: "Experimental small-batch beer at the Hazelwood Brewhouse."
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
    dogFriendly: true,
    lastVerified: "Sep 2026",
    blurb: "North Side taproom, beer garden, and rotating food trucks."
  },
  {
    name: "Aslin Beer Company",
    slug: "aslin-pittsburgh",
    city: "Pittsburgh",
    neighborhood: "Strip District",
    area: "Pittsburgh",
    address: "1801 Smallman Street, Pittsburgh, PA 15222",
    website: "https://www.aslinbeer.com/",
    type: "Taproom brewery",
    food: "Light food",
    lastVerified: "Sep 2026",
    blurb: "A modern Strip District taproom with a broad beer lineup."
  },
  {
    name: "Burgh'ers Brewing - Lawrenceville",
    slug: "burghers-lawrenceville",
    city: "Pittsburgh",
    neighborhood: "Lawrenceville",
    area: "Pittsburgh",
    address: "3601 Butler Street, Pittsburgh, PA 15201",
    website: "https://www.burghersbrewing.com/",
    type: "Brewpub",
    food: "Full kitchen",
    lastVerified: "Sep 2026",
    blurb: "House beer paired with burgers and a full brewpub menu."
  },
  {
    name: "Cinderlands Taproom - Wexford",
    slug: "cinderlands-wexford",
    city: "Wexford",
    neighborhood: "Wexford",
    area: "North",
    address: "171 Wexford Bayne Road, Wexford, PA 15090",
    website: "https://www.cinderlands.com/",
    type: "Taproom + restaurant",
    food: "Full kitchen",
    lastVerified: "Sep 2026",
    blurb: "North Hills Cinderlands taproom with beer, food, and regular events."
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
    blurb: "Large Strip District brewery with a scratch kitchen and patio."
  },
  {
    name: "Cobblehaus Brewing Co.",
    slug: "cobblehaus",
    city: "Coraopolis",
    neighborhood: "Coraopolis",
    area: "West",
    address: "1021 5th Avenue, Coraopolis, PA 15108",
    website: "https://www.cobblehaus.com/",
    type: "Independent brewery",
    food: "Light food",
    lastVerified: "Sep 2026",
    blurb: "A neighborhood taproom in downtown Coraopolis."
  },
  {
    name: "CoStar Brewing",
    slug: "costar-brewing",
    city: "Etna",
    neighborhood: "Etna",
    area: "North",
    address: "323 Butler Street, Etna, PA 15223",
    website: "https://www.costarbrewing.com/",
    type: "Independent brewery",
    food: "Light food",
    lastVerified: "Sep 2026",
    blurb: "Small independent brewery and taproom in Etna."
  },
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
    blurb: "Hop-forward beer and a polished Sharpsburg taproom."
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
    outdoor: true,
    lastVerified: "Sep 2026",
    blurb: "Long-running Pittsburgh brewery with beer, pizza, and a patio.",
    image: {
      url: "https://commons.wikimedia.org/wiki/Special:Redirect/file/East_End_Brewing_Company.jpg",
      alt: "East End Brewing Company in Pittsburgh",
      sourceLabel: "Wikimedia Commons",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:East_End_Brewing_Company.jpg",
      license: "Creative Commons licensed",
      credit: "Drew from Zhrodague"
    }
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
    outdoor: true,
    dogFriendly: true,
    lastVerified: "Sep 2026",
    blurb: "Lawrenceville taproom with house beer and rotating food trucks."
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
    blurb: "Lager-focused brewery, restaurant, and beer garden in Homestead."
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
    blurb: "Millvale favorite with a large outdoor space and food trucks."
  },
  {
    name: "Hazel Grove Brewing",
    slug: "hazel-grove",
    city: "Pittsburgh",
    neighborhood: "Hazelwood",
    area: "Pittsburgh",
    address: "4609 Irvine Street, Pittsburgh, PA 15207",
    website: "https://www.hazelgrovebrewing.com/",
    type: "Independent brewery",
    food: "Food trucks",
    lastVerified: "Sep 2026",
    blurb: "Independent Hazelwood brewery with a modern neighborhood taproom."
  },
  {
    name: "Hitchhiker Brewing Co.",
    slug: "hitchhiker-sharpsburg",
    city: "Sharpsburg",
    neighborhood: "Sharpsburg",
    area: "East",
    address: "1501 North Canal Street, Pittsburgh, PA 15215",
    website: "https://hitchhiker.beer/tap-rooms/",
    type: "Production brewery + taproom",
    food: "Food trucks",
    lastVerified: "Sep 2026",
    blurb: "Sharpsburg brewery and taproom with rotating beer and food vendors."
  },
  {
    name: "Hop Farm Brewing Company & Kitchen",
    slug: "hop-farm",
    city: "Pittsburgh",
    neighborhood: "Lawrenceville",
    area: "Pittsburgh",
    address: "5601 Butler Street, Pittsburgh, PA 15201",
    website: "https://www.hopfarmbrewingco.com/",
    type: "Brewpub",
    food: "Full kitchen",
    lastVerified: "Sep 2026",
    blurb: "Lawrenceville brewery with an in-house kitchen."
  },
  {
    name: "Inner Groove Brewing",
    slug: "inner-groove-verona",
    city: "Verona",
    neighborhood: "Verona",
    area: "East",
    address: "751 East Railroad Avenue, Verona, PA 15147",
    website: "https://www.innergroovebrewing.com/",
    type: "Independent brewery",
    food: "Food trucks",
    lastVerified: "Sep 2026",
    blurb: "Community-focused brewery and taproom in Verona."
  },
  {
    name: "Late Addition Brewing + Blending",
    slug: "late-addition",
    city: "Pittsburgh",
    neighborhood: "North Side",
    area: "Pittsburgh",
    address: "847 Western Avenue, Pittsburgh, PA 15233",
    website: "https://lateadditionbrewing.com/",
    type: "Independent brewery",
    food: "Food trucks",
    dogFriendly: true,
    lastVerified: "Sep 2026",
    blurb: "North Side taproom focused on sessionable and classic beer styles."
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
    outdoor: true,
    lastVerified: "Sep 2026",
    blurb: "Bellevue neighborhood brewpub with house beer and a full menu."
  },
  {
    name: "Local Remedy Brewing",
    slug: "local-remedy",
    city: "Oakmont",
    neighborhood: "Oakmont",
    area: "East",
    address: "531 Allegheny Avenue, Oakmont, PA 15139",
    website: "https://lrbrewing.com/",
    type: "Independent brewery",
    food: "Food trucks",
    lastVerified: "Sep 2026",
    blurb: "Oakmont taproom built around beer, community, and rotating food options."
  },
  {
    name: "Lolev Beer",
    slug: "lolev-beer",
    city: "Pittsburgh",
    neighborhood: "Lawrenceville",
    area: "Pittsburgh",
    address: "5247 Butler Street, Pittsburgh, PA 15201",
    website: "https://lolev.beer/",
    type: "Hop-focused brewery",
    food: "Light food",
    lastVerified: "Sep 2026",
    blurb: "Lawrenceville brewery focused on expressive hop-driven beer."
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
    blurb: "Blawnox destination brewery with a broad, carefully made beer lineup."
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
    lastVerified: "Sep 2026",
    blurb: "Historic North Side brewery known for German-style beer and food.",
    image: {
      url: "https://commons.wikimedia.org/wiki/Special:Redirect/file/PennBrewery.jpg",
      alt: "Penn Brewery complex in Pittsburgh",
      sourceLabel: "Wikimedia Commons",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:PennBrewery.jpg",
      license: "CC BY-SA / GFDL",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
      credit: "Lee Paxton"
    }
  },
  {
    name: "Pittsburgh Brewing Company",
    slug: "pittsburgh-brewing-company",
    city: "Creighton",
    neighborhood: "Creighton",
    area: "East",
    address: "150 Ferry Street, Creighton, PA 15030",
    website: "https://pittsburghbrewing.com/",
    type: "Regional brewery",
    food: "Food trucks",
    outdoor: true,
    lastVerified: "Sep 2026",
    blurb: "Historic Iron City producer with a large Creighton brewery campus."
  },
  {
    name: "Southern Tier Brewing Company",
    slug: "southern-tier-pittsburgh",
    city: "Pittsburgh",
    neighborhood: "North Shore",
    area: "Pittsburgh",
    address: "316 North Shore Drive, Pittsburgh, PA 15212",
    website: "https://stbcbeer.com/visit/pittsburgh/",
    type: "Brewpub",
    food: "Full kitchen",
    outdoor: true,
    lastVerified: "Sep 2026",
    blurb: "North Shore brewpub with a full menu and large beer garden."
  },
  {
    name: "Spoonwood Brewing Co.",
    slug: "spoonwood",
    city: "Pittsburgh",
    neighborhood: "Bethel Park",
    area: "South",
    address: "5981 Baptist Road, Pittsburgh, PA 15236",
    website: "https://spoonwoodbrewing.com/",
    type: "Brewpub",
    food: "Full kitchen",
    outdoor: true,
    lastVerified: "Sep 2026",
    blurb: "South Hills brewpub with house beer, food, and outdoor space."
  },
  {
    name: "The Church Brew Works",
    slug: "church-brew-works",
    city: "Pittsburgh",
    neighborhood: "Lawrenceville",
    area: "Pittsburgh",
    address: "3525 Liberty Avenue, Pittsburgh, PA 15201",
    website: "https://churchbrew.com/",
    type: "Historic brewpub",
    food: "Full kitchen",
    outdoor: true,
    lastVerified: "Sep 2026",
    blurb: "Pittsburgh brewpub inside a restored former church."
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
    blurb: "Bloomfield brewery with coffee, beer, food trucks, and a courtyard."
  },
  {
    name: "Two Frays Brewery",
    slug: "two-frays",
    city: "Pittsburgh",
    neighborhood: "Garfield",
    area: "Pittsburgh",
    address: "5113 Penn Avenue, Pittsburgh, PA 15224",
    website: "https://www.twofraysbrewery.com/",
    type: "Neighborhood brewery",
    food: "Food trucks",
    outdoor: true,
    lastVerified: "Sep 2026",
    blurb: "Garfield neighborhood brewery with rotating beer and events."
  },
  {
    name: "Velum Fermentation",
    slug: "velum-fermentation",
    city: "Pittsburgh",
    neighborhood: "South Side",
    area: "Pittsburgh",
    address: "2120 Jane Street, Pittsburgh, PA 15203",
    website: "https://www.velumfermentation.com/",
    type: "Fermentation brewery",
    food: "Food trucks",
    dogFriendly: true,
    lastVerified: "Sep 2026",
    blurb: "Large South Side taproom with beer, games, and regular events."
  }
];

export const areas = ["All", "Pittsburgh", "North", "South", "East", "West", "Surrounding Counties"] as const;
