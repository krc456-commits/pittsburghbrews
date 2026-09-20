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
    name: "Burgh'ers Brewing Millvale Oktoberfest",
    date: "Sep 27, 2026 · doors 11 AM",
    location: "Burgh'ers Brewing · Millvale",
    category: "Oktoberfest",
    description: "All-day Oktoberfest party with live music starting at 7 PM, prizes and giveaways, Hammerschlagen and stein-holding contests, Bavarian food, and fresh Burgh'ers beer.",
    url: "https://www.burgherspgh.com/events",
    featured: true,
  },
  {
    name: "11th Hour Brewing Oktoberfest",
    date: "Sep 19, Sep 25-26 & Oct 2-3, 2026",
    location: "11th Hour Brewing Co. · Lawrenceville",
    category: "Oktoberfest",
    description: "Oktoberfest in 11th Hour's German Village with beer, pretzels, music, games, food, and more. Saturdays run 12-10 PM; Fridays run 5-10 PM.",
    url: "https://www.11thhourbrews.com/",
    featured: true,
  },
  {
    name: "Allusion Brewing Oktoberfest - Pittsburgh",
    date: "Sep 19, 2026",
    location: "Allusion Brewing Company · Allison Park",
    category: "Oktoberfest",
    description: "Oktoberfest celebration at Allusion Brewing Company's Pittsburgh taproom in Allison Park.",
    url: "https://www.allusionbrewing.com/calendar/pittsburgh-taproom/",
    featured: true,
  },
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
    name: "Scream Bar at Hundred Acres Manor",
    date: "Select nights Sep-Nov 2026",
    location: "Hundred Acres Manor · Bethel Park",
    category: "Beer garden",
    description: "The official Cinderlands Beer Co. bar at Hundred Acres Manor, pouring Cinderlands beer and hard cider. Admission to the bar is free, no haunted house ticket is required, and guests must be 21+ with valid ID.",
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
