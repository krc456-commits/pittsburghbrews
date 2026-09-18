export type BeerEvent = {
  name: string;
  date: string;
  location: string;
  category: "Oktoberfest" | "Festival" | "Halloween" | "Beer garden";
  description: string;
  url: string;
  featured?: boolean;
};

export const beerEvents: BeerEvent[] = [
  {
    name: "Penn Brewery Oktoberfest",
    date: "Sep 17-20 & Sep 25-27, 2026",
    location: "Penn Brewery · North Side",
    category: "Oktoberfest",
    description: "Two Oktoberfest weekends with Penn beer, German food, live music, and family Sundays.",
    url: "https://www.pennbrew.com/events",
    featured: true,
  },
  {
    name: "Hofbräuhaus Pittsburgh Oktoberfest",
    date: "Sep 18-20 & Sep 25-27, 2026",
    location: "Hofbräuhaus Pittsburgh · SouthSide Works",
    category: "Oktoberfest",
    description: "Riverfront Oktoberfest weekends with beer, German food, live music, and stein-raising festivities.",
    url: "https://www.visitpittsburgh.com/events/oktoberfest-takes-over-pittsburgh-lets-celebrate/",
  },
  {
    name: "Seven Fields Oktoberfest",
    date: "Sep 25-27, 2026",
    location: "Seven Fields Town Park · Seven Fields",
    category: "Oktoberfest",
    description: "Three days of rides, games, food, live bands, and beer from Penn Brewery, Conny Creek Brewing, The Smiling Moose, and more.",
    url: "https://www.sevenfields.org/Calendar.aspx",
    featured: true,
  },
  {
    name: "Pittsburgh Brewing Oktoberfest",
    date: "Sep 26, 2026",
    location: "Pittsburgh Brewing Company · Creighton",
    category: "Oktoberfest",
    description: "Herman's Best Oktoberfest Lager, live music, food trucks, vendors, and a stein-holding contest.",
    url: "https://pittsburghbrewing.com/event/pittsburgh-brewing-oktoberfest-september-26-2026/",
    featured: true,
  },
  {
    name: "Balance Brewing Oktoberfest",
    date: "Oct 3, 2026 · 12-10 PM",
    location: "Balance Brewing Company · Ross Township",
    category: "Oktoberfest",
    description: "A full-day Oktoberfest with Balance beer, Comfort & Spice, live music from John Charney, tattoos from Electric Rex, and a Wander & Root plant pop-up.",
    url: "https://www.balancebrewingcompany.com/events",
    featured: true,
  },
  {
    name: "Oktoberfest Pittsburgh",
    date: "Oct 1-11, 2026",
    location: "Downtown Pittsburgh · Fort Duquesne Boulevard",
    category: "Oktoberfest",
    description: "Eleven days of beer, Bavarian food, live music, stein holding, and family-friendly activities downtown.",
    url: "https://www.visitpittsburgh.com/events-festivals/oktoberfest-pittsburgh/",
    featured: true,
  },
  {
    name: "TacoMania Super Fest",
    date: "Oct 4, 2026",
    location: "Pittsburgh Brewing Company · Creighton",
    category: "Festival",
    description: "A free taco festival with local beer sampling and live wrestling from Beers of the Burgh.",
    url: "https://www.beersoftheburgh.com/",
  },
  {
    name: "The Nightmare Bar",
    date: "Oct 8-31, 2026",
    location: "Eleventh Hour Brewing · Lawrenceville",
    category: "Halloween",
    description: "A 21+ Halloween pop-up with themed drinks, spooky décor, games, music, and photo setups.",
    url: "https://feverup.com/m/740597",
    featured: true,
  },
  {
    name: "Hundred Acres Manor Beer Garden",
    date: "Select nights Sep-Nov 2026",
    location: "Hundred Acres Manor · Bethel Park",
    category: "Beer garden",
    description: "A 21+ onsite beer garden open alongside the haunted attraction schedule; haunted house admission is not required for the bar.",
    url: "https://www.hundredacresmanor.com/",
  },
  {
    name: "Pittsburgh Winter Beerfest",
    date: "February 2027 · date TBA",
    location: "David L. Lawrence Convention Center · Downtown",
    category: "Festival",
    description: "Pittsburgh's large winter craft beer festival at the convention center, with extensive beer sampling across afternoon and evening sessions.",
    url: "https://pittsburghbeerfest.com/",
    featured: true,
  },
];
