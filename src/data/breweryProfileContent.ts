export type ExtraProfileLocation = {
  name: string;
  address: string;
  description: string;
  atmosphere?: string;
  food?: string;
  website?: string;
};

export type BreweryProfileContent = {
  slug: string;
  name: string;
  tagline: string;
  founded?: string;
  knownFor: string[];
  specialTitle: string;
  specialBody: string[];
  storyTitle: string;
  story: string[];
  beerTitle: string;
  beer: string[];
  take: string;
  takeDetail: string;
  locationSlugs: string[];
  extraLocations?: ExtraProfileLocation[];
  sources: { label: string; url: string }[];
};

export const breweryProfiles: Record<string, BreweryProfileContent> = {
  "dancing-gnome": {
    slug: "dancing-gnome",
    name: "Dancing Gnome",
    tagline: "A Sharpsburg brewery that helped make hop-forward beer one of Pittsburgh's calling cards — without staying stuck in one style.",
    founded: "2016",
    knownFor: ["Hop-forward beer", "Lustra", "Lagers", "Sharpsburg"],
    specialTitle: "Built on hops, broadened by curiosity.",
    specialBody: [
      "Dancing Gnome opened in Sharpsburg in October 2016 after two years of pilot batches and brewing education. Founder and brewer Andrew Witchey built the brewery around flavor-first, hop-forward beer and the idea of creating a new definition of American Ale.",
      "That hop identity is still central, but the brewery has widened its range considerably. Crisp lagers, lower-ABV beers and traditional styles now sit comfortably beside the saturated IPAs that first built its reputation."
    ],
    storyTitle: "From 925 Main to a bigger Sharpsburg home",
    story: [
      "The original 925 Main Street taproom opened in a former plumbing supply showroom in 2016. Its 45-seat room and original 10-barrel brewhouse became the place where Dancing Gnome built its early community.",
      "In October 2021, the brewery expanded down the street to 1025 Main, adding a 20-barrel production facility, a larger taproom and patio. The original 925 space later reopened as Nine Two Five, a smaller, more intimate bar with Dancing Gnome beer, Pennsylvania spirits, cocktails and a compact food menu."
    ],
    beerTitle: "Flavor first, whether it is an IPA or a pilsner",
    beer: [
      "Lustra, the brewery's house pale ale, remains one of Dancing Gnome's defining beers. The broader lineup stretches through pale ales, IPAs and DIPAs into pilsners, Kölsch-style ales, bitters, stouts, sours and seasonal lagers.",
      "The common thread is less about one style than a deliberate focus on aroma, flavor and balance."
    ],
    take: "Go here when you want one of Pittsburgh's strongest hop-focused breweries without limiting yourself to hops.",
    takeDetail: "1025 Main is the bigger all-purpose brewery stop. Nine Two Five is the better fit when you want something smaller, later and more bar-like.",
    locationSlugs: ["dancing-gnome"],
    extraLocations: [
      {
        name: "Nine Two Five — Original Taproom",
        address: "925 Main Street, Pittsburgh, PA 15215",
        description: "The original 2016 taproom, now a more intimate bar serving Dancing Gnome beer, Pennsylvania spirits, house cocktails and a small food menu.",
        atmosphere: "Intimate · polished · late-night",
        food: "Small menu",
        website: "https://dancinggnomebeer.com/location/925-main/"
      }
    ],
    sources: [
      { label: "Dancing Gnome story", url: "https://dancinggnomebeer.com/our-story/" },
      { label: "1025 Main", url: "https://dancinggnomebeer.com/location/1025-main/" },
      { label: "Nine Two Five", url: "https://dancinggnomebeer.com/location/925-main/" }
    ]
  },
  "old-thunder": {
    slug: "old-thunder",
    name: "Old Thunder Brewing",
    tagline: "A Blawnox destination brewery where precise lagers and ales meet a beautifully repurposed 1939 post office.",
    knownFor: ["Lagers", "Ales", "Wood maturation", "Historic building"],
    specialTitle: "The old post office is part of the experience.",
    specialBody: [
      "Old Thunder's taproom occupies a former Blawnox Post Office built in 1939. The building served the borough until the late 1980s before eventually being transformed into the brewery's taproom.",
      "Rather than treating the space as a backdrop, Old Thunder made the building part of its identity: a neighborhood gathering place paired with a brewing program built around precision, patience and a mix of traditional and exploratory beer."
    ],
    storyTitle: "Three brewing paths converged in Blawnox",
    story: [
      "Founders Josh, Rob and Zach spent years developing the brewery before announcing the Blawnox location in 2020. Their project paired a full renovation of the old post office with a purpose-built brewhouse next door.",
      "The name Old Thunder reflects the founders' idea of natural force meeting human craftsmanship — a fitting description for a brewery that talks as much about intention and process as individual styles."
    ],
    beerTitle: "Clean beer, strong beer and beer that takes its time",
    beer: [
      "Old Thunder says its core focus is high-quality lagers and ales, alongside stronger beers and mixed-fermentation recipes intended for wood maturation.",
      "That makes the lineup broad without feeling random: clean, carefully made traditional beer on one side and slower, more complex projects on the other."
    ],
    take: "Go here when the beer itself is the main event.",
    takeDetail: "The building gives Old Thunder instant character, but the draw is the combination of a destination-worthy room and a brewing program that takes classic beer seriously.",
    locationSlugs: ["old-thunder"],
    sources: [
      { label: "Old Thunder story", url: "https://www.oldthunderbrewing.com/about-1" },
      { label: "Old Post Office announcement", url: "https://www.oldthunderbrewing.com/post/the-announcement" }
    ]
  },
  "east-end": {
    slug: "east-end",
    name: "East End Brewing Company",
    tagline: "One of Pittsburgh's modern craft-beer originals — brewing fresh local beer since 2004 and turning neighborhood identity into part of the beer itself.",
    founded: "2004",
    knownFor: ["Big Hop", "Pizza", "You Are Here series", "Long-running local brewery"],
    specialTitle: "Pittsburgh is not just where East End brews. It is the subject matter.",
    specialBody: [
      "East End has been brewing in Pittsburgh since 2004, long before the region's current brewery boom. Its flagship Big Hop American Ale became a familiar local name, while the brewery kept making dozens of seasonal and one-off beers each year.",
      "Its most Pittsburgh-specific project may be the You Are Here series, launched in 2019: a unique beer for every one of Pittsburgh's 90 neighborhoods. The project ultimately ran for roughly five and a half years."
    ],
    storyTitle: "Fresh local beer since 2004",
    story: [
      "Founder Scott Smith started East End in 2004. The Larimer Brewpub opened in 2013 and developed into the brewery's primary home, later adding an in-house pizza program.",
      "A Mt. Lebanon taproom followed in March 2023, giving East End a South Hills outpost. The brewery has continued to evolve while keeping the simple local identity that has defined it from the beginning."
    ],
    beerTitle: "Big Hop is the anchor, not the limit",
    beer: [
      "East End produces roughly 50 different beers in a typical year, divided among year-round beers, seasonals and one-offs.",
      "Big Hop remains the flagship, but the range includes German wheat beer, pilsners, barrel-aged and mixed-fermentation projects, collaborations and the neighborhood-focused You Are Here releases."
    ],
    take: "Go here when you want a brewery that feels unmistakably Pittsburgh without leaning on nostalgia.",
    takeDetail: "Larimer is the fuller brewpub experience with beer and pizza; Mt. Lebanon is the convenient neighborhood taproom version.",
    locationSlugs: ["east-end"],
    extraLocations: [
      {
        name: "Mt. Lebanon Taproom",
        address: "651 Washington Road, Mt. Lebanon, PA 15228",
        description: "Opened in March 2023 with a rotating tap list, pizza and other food in a walkable Washington Road setting.",
        atmosphere: "Neighborhood · casual · South Hills",
        food: "Pizza + light food",
        website: "https://www.eastendbrewing.com/taproom"
      },
      {
        name: "East End Pop-Up — North Side",
        address: "1836 Oxline Street, Pittsburgh, PA 15233",
        description: "A current North Side pop-up pouring East End beer with rotating food trucks. Check East End directly before making a special trip because pop-up operations can change.",
        atmosphere: "Pop-up · casual",
        food: "Food trucks",
        website: "https://www.eastendbrewing.com/"
      }
    ],
    sources: [
      { label: "East End", url: "https://www.eastendbrewing.com/" },
      { label: "About the beers", url: "https://www.eastendbrewing.com/about-our-beers" },
      { label: "You Are Here project", url: "https://www.eastendbrewing.com/you-are-here-beer-neighborhood-beers" }
    ]
  },
  "penn-brewery": {
    slug: "penn-brewery",
    name: "Penn Brewery",
    tagline: "Modern Pittsburgh craft beer inside a North Side brewing site whose roots reach back to the 1800s.",
    founded: "1986",
    knownFor: ["German-style beer", "Historic brewery", "Pittsburgh-German food", "Biergarten"],
    specialTitle: "This is modern craft beer built directly on Pittsburgh brewing history.",
    specialBody: [
      "Penn Brewery began brewing in 1986, making it one of the early American craft breweries. But the North Side site connects to a much older story: the Eberhardt and Ober brewing families were active in the former City of Allegheny beginning in 1848.",
      "Restored brewery buildings and 19th-century lagering caves make the location more than a themed restaurant. It is a surviving piece of Pittsburgh's pre-Prohibition brewing landscape."
    ],
    storyTitle: "Craft beer before Pittsburgh had a craft-beer scene",
    story: [
      "The Penn brand began in 1986 with Penn Pilsner produced under contract. Brewing moved into the restored Eberhardt & Ober site in 1989, when the restaurant also opened as Allegheny Brewery & Pub.",
      "The operation was renamed Penn Brewery in 1994. Penn says it became Pennsylvania's first tied house — a restaurant connected to a brewery — since Prohibition."
    ],
    beerTitle: "German roots with room for newer styles",
    beer: [
      "Penn built its identity around classic lagers and German beer styles and still emphasizes that tradition today.",
      "The range has expanded to include IPAs and seasonal beers, but the brewery's strongest identity remains the combination of German-style beer, Pittsburgh-German food and its historic North Side setting."
    ],
    take: "Go here when you want Pittsburgh beer history you can actually sit inside.",
    takeDetail: "The North Side brewery is the destination. The airport location is useful for travelers, but the historic complex, caves and biergarten are what make Penn Brewery distinctive.",
    locationSlugs: ["penn-brewery"],
    extraLocations: [
      {
        name: "Pittsburgh International Airport",
        address: "Pittsburgh International Airport, Pittsburgh, PA",
        description: "Penn also operates an airport location serving Penn beer with a full bar and food for travelers.",
        atmosphere: "Airport · traveler-friendly",
        food: "Full restaurant",
        website: "https://www.pennbrew.com/"
      }
    ],
    sources: [
      { label: "Penn Brewery story", url: "https://www.pennbrew.com/our-story-1" },
      { label: "Penn Brewery locations and hours", url: "https://www.pennbrew.com/blank" }
    ]
  },
  "church-brew-works": {
    slug: "church-brew-works",
    name: "The Church Brew Works",
    tagline: "A Lawrenceville brewpub where the brewhouse sits on the altar of a restored former Roman Catholic church.",
    founded: "1996",
    knownFor: ["Historic church", "Brewpub", "Full kitchen", "Pittsburgh landmark"],
    specialTitle: "There is nothing subtle about the setting — and that is the point.",
    specialBody: [
      "The Church Brew Works operates inside the former St. John the Baptist Church in Lawrenceville. The church's cornerstone was laid in 1902, the parish closed in 1993, and after an extensive restoration the brewpub opened in 1996.",
      "Stained glass, vaulted architecture and reused church details remain throughout the room, while the brewing equipment occupies the former altar area. It is one of Pittsburgh's most immediately recognizable brewery spaces."
    ],
    storyTitle: "A historic church becomes a brewpub",
    story: [
      "When Church Brew Works opened in 1996, brewpubs were still relatively unusual in Pittsburgh. Converting a former church into one made the project stand out even more.",
      "The building is recognized as a Pittsburgh historic landmark, and the brewery has operated long enough to become part of the city's own modern beer history."
    ],
    beerTitle: "Brewpub beer designed for a very broad room",
    beer: [
      "Church Brew Works has long brewed a mix of approachable lagers and ales alongside seasonal and specialty releases.",
      "The beer is paired with a full restaurant, which makes this less of a tasting-room-only stop and more of a complete meal-and-beer destination."
    ],
    take: "Go here at least once for the room, then decide what keeps bringing you back.",
    takeDetail: "The architecture is the obvious headline, but the full kitchen and long-running brewpub format make it one of the easier Pittsburgh breweries for mixed groups and visitors.",
    locationSlugs: ["church-brew-works"],
    sources: [
      { label: "Church Brew Works", url: "https://churchbrew.com/" },
      { label: "Visit Pittsburgh history", url: "https://www.visitpittsburgh.com/blog/repurposed-pittsburgh-churches/" }
    ]
  },
  "grist-house": {
    slug: "grist-house",
    name: "Grist House Craft Brewery",
    tagline: "A family-and-friends brewery that grew from Millvale into four distinctly different Pittsburgh-area locations.",
    knownFor: ["Millvale", "Dog-friendly culture", "Wide beer range", "Multiple taprooms"],
    specialTitle: "Grist House built its identity around people as much as beer.",
    specialBody: [
      "Grist House describes the brewery as a place built with the support of friends and family, where regulars become part of the community. That welcoming identity still carries through the brand even as it has expanded well beyond its original Millvale taproom.",
      "The beer follows the same broad approach: hoppy beer, sours and lighter styles all share the board rather than forcing the brewery into one narrow lane."
    ],
    storyTitle: "From Millvale to a four-location brewery",
    story: [
      "Millvale remains the best-known Grist House location and the center of the brewery's original identity.",
      "The brewery now also operates Command in Oakdale/Collier, the Beer Crib in Butler and the Beer Market in Saxonburg, giving the same brand four different physical formats and communities."
    ],
    beerTitle: "Something for the hop head, sour fan and light-beer drinker",
    beer: [
      "Grist House explicitly frames its beer program around variety. It likes experimental releases and boundary-pushing ideas, but also wants the tap list to work for people who simply want something light and easy.",
      "That range is one reason the brewery works well for groups with different tastes."
    ],
    take: "Pick the Grist House location based on the experience you want, not just the beer list.",
    takeDetail: "Millvale is the classic Grist House experience; Command offers another full taproom destination, while Beer Crib and Beer Market extend the brand farther from the city.",
    locationSlugs: ["grist-house", "grist-house-command", "grist-house-beer-crib", "grist-house-beer-market"],
    sources: [
      { label: "Grist House", url: "https://gristhouse.com/" },
      { label: "Grist House locations", url: "https://gristhouse.com/locations/" },
      { label: "Grist House beer", url: "https://gristhouse.com/beer/" }
    ]
  },
  "brew-gentlemen": {
    slug: "brew-gentlemen",
    name: "Brew Gentlemen",
    tagline: "Soft, balanced beer brewed in Braddock, in the shadow of one of Pittsburgh's most important surviving steel works.",
    knownFor: ["General Braddock's IPA", "Soft balanced beer", "Braddock", "Industrial setting"],
    specialTitle: "The beer and the place are both unmistakably Braddock.",
    specialBody: [
      "Brew Gentlemen was founded by two college friends who left their previous paths to build a brewery. They settled in Braddock, operating from a renovated electrical-supply storefront and warehouse near the still-active Edgar Thomson Works.",
      "That steel-town setting is not just scenery. It runs through the brewery's identity, including flagship General Braddock's IPA and a brand that feels rooted in the community around it."
    ],
    storyTitle: "Two college friends build a brewery in Braddock",
    story: [
      "Brew Gentlemen built its reputation by focusing intensely on detail and balance rather than sheer intensity.",
      "The brewery's Braddock taproom is currently used primarily for private events, while beer pickup is available through Braddock Public House. Because that setup can change, Pittsburgh Brews treats the current visiting details as something to verify directly before going."
    ],
    beerTitle: "Soft, balanced and deliberate",
    beer: [
      "Brew Gentlemen describes its beer around softness and balance, with General Braddock's IPA serving as the clearest example.",
      "That philosophy has helped the brewery build a reputation beyond Pittsburgh while still keeping its identity closely tied to Braddock."
    ],
    take: "Go for the beer identity first, and check the current Braddock visiting setup before making the trip.",
    takeDetail: "Brew Gentlemen is one of the clearest examples of a Pittsburgh brewery whose reputation is built around a specific brewing voice rather than a giant entertainment space.",
    locationSlugs: ["brew-gentlemen"],
    sources: [
      { label: "Brew Gentlemen about", url: "https://www.brewgentlemen.com/pages/about" },
      { label: "Brew Gentlemen", url: "https://www.brewgentlemen.com/" }
    ]
  },
  "cinderlands": {
    slug: "cinderlands",
    name: "Cinderlands Beer Company",
    tagline: "A Pittsburgh brewery that grew from a tiny Lawrenceville brewhouse into a three-location beer-and-food company anchored by a massive Strip District warehouse.",
    founded: "2017",
    knownFor: ["Beer + food", "Cinderlands Warehouse", "Squish", "Three locations"],
    specialTitle: "Cinderlands treats food and beer as equal parts of the experience.",
    specialBody: [
      "Cinderlands was founded in 2017 by Jamie and Joanna Warden and Paul and Emily Schneider, with chef Joe Kiefer joining as the first hire and later becoming a partner.",
      "The original Lawrenceville brewery worked on a 3.5-barrel electric system. Less than two years later, Cinderlands opened a 17,000-plus-square-foot Warehouse in the Strip District with a 15-barrel brewhouse and a much larger kitchen."
    ],
    storyTitle: "From a garage-sized brewhouse to the Warehouse",
    story: [
      "The original 3705 Butler Street location opened in November 2017 with four beers and a small kitchen. Construction on the Warehouse began almost immediately as the brewery prepared for a much bigger future.",
      "The Warehouse opened in May 2019 and became the center of production. A Wexford taproom followed in 2021. The original Lawrenceville space has since evolved into Long Story Short, an arcade bar and sandwich shop that still pours Cinderlands beer."
    ],
    beerTitle: "A broad beer program backed by a serious kitchen",
    beer: [
      "Cinderlands produces a wide range of beer, including the Squish family of hop-forward releases, lagers, mixed-fermentation projects and seasonal beers.",
      "Unlike breweries where food feels secondary, Cinderlands built a substantial restaurant program alongside the beer from the beginning."
    ],
    take: "Go to the Warehouse when you want the fullest version of Cinderlands.",
    takeDetail: "Wexford works as the suburban beer stop; Long Story Short is the playful Lawrenceville bar-and-sandwich version. The Warehouse is where the brewery, kitchen and production scale all come together.",
    locationSlugs: ["cinderlands-warehouse", "cinderlands-wexford"],
    extraLocations: [
      {
        name: "Long Story Short — Lawrenceville",
        address: "3705 Butler Street, Pittsburgh, PA 15201",
        description: "The original Cinderlands location, now reworked as a throwback arcade bar and sandwich shop with Cinderlands beer.",
        atmosphere: "Arcade · neighborhood bar · playful",
        food: "Sandwiches + snacks",
        website: "https://www.cinderlands.com/"
      }
    ],
    sources: [
      { label: "Cinderlands story", url: "https://www.cinderlands.com/cinderlands-story/" },
      { label: "Cinderlands locations", url: "https://www.cinderlands.com/" }
    ]
  },
  "allegheny-city": {
    slug: "allegheny-city",
    name: "Allegheny City Brewing",
    tagline: "A North Side neighborhood brewery whose name deliberately reaches back to the independent City of Allegheny.",
    founded: "2016",
    knownFor: ["North Side", "Neighborhood brewery", "Beer garden", "Variety"],
    specialTitle: "The name is a history lesson and a statement of neighborhood loyalty.",
    specialBody: [
      "Founders Al, Amy and Matt are Pittsburgh natives who moved to Colorado, fell for craft beer and brewery culture, then returned home in 2013 to build their own place.",
      "They opened Allegheny City Brewing in 2016 and named it for the former City of Allegheny, now Pittsburgh's North Side. Community, neighborhood identity and the social side of small breweries were part of the idea from the beginning."
    ],
    storyTitle: "Colorado inspiration, Pittsburgh homecoming",
    story: [
      "After visiting hundreds of breweries and beginning to homebrew, the three founders moved back to Pittsburgh and eventually opened ACB on September 28, 2016.",
      "The brewing operation remains on Foreland Street. The main taproom and beer garden moved to 510 East Ohio Street in May 2024, and a Brighton Heights taproom opened in April 2026."
    ],
    beerTitle: "Traditional styles beside experimental ideas",
    beer: [
      "ACB brews on a seven-barrel system and intentionally keeps variety on the board.",
      "The brewery says it is proud of traditional styles while also using highly modified experimental concepts, which fits the broader goal of having something for a wide range of drinkers."
    ],
    take: "Go when you want a neighborhood brewery that actually feels tied to its neighborhood.",
    takeDetail: "East Ohio Street is the primary social stop with the beer garden; Brighton Heights gives the brewery a second neighborhood home while production remains on Foreland.",
    locationSlugs: ["allegheny-city-brewing", "allegheny-city-brighton-heights"],
    extraLocations: [
      {
        name: "Foreland Street — Brewery",
        address: "507 Foreland Street, Pittsburgh, PA",
        description: "The original brewing location remains ACB's production brewery even though the main taproom moved to East Ohio Street.",
        atmosphere: "Production brewery",
        website: "https://www.alleghenycitybrewing.com/copy-of-about-us"
      }
    ],
    sources: [
      { label: "ACB story", url: "https://www.alleghenycitybrewing.com/our-story" },
      { label: "ACB locations", url: "https://www.alleghenycitybrewing.com/copy-of-about-us" }
    ]
  },
  "abjuration": {
    slug: "abjuration",
    name: "Abjuration Brewing",
    tagline: "A small Pittsburgh brewery with a software-engineering mindset: experiment, version, tweak, repeat.",
    founded: "2017",
    knownFor: ["Experimental beer", "Version numbers", "Sours", "Small-batch brewing"],
    specialTitle: "The version number is the philosophy.",
    specialBody: [
      "Abjuration was founded by longtime friends and brewers Dave Hallam and Tom Glover. The brewery opened in 2017 on a one-barrel system inside the Parkway Theater in McKees Rocks.",
      "Instead of conventional flagship names, Abjuration labels beers by style or description, acronym and version number. Recipe tweaks change the version, turning each beer into a visible record of ongoing experimentation."
    ],
    storyTitle: "A nano brewery built around constant iteration",
    story: [
      "Hallam and Glover moved from homebrewing and competition feedback into a commercial brewery while deliberately keeping a small, experimental mindset.",
      "That approach has expanded into multiple Pittsburgh-area spaces while the brewery still describes itself as local and nano-scale rather than chasing mass-market growth."
    ],
    beerTitle: "Hoppy, sour, clean American ales — and whatever they want to test next",
    beer: [
      "Abjuration says its style is diverse but leans toward hoppy and sour beer and clean American ales.",
      "Experimental hops, yeast, malt, fruit and other adjuncts are common. The current tap list can jump from a Mexican-style lager or bock to heavily fruited dessert-inspired sours in the same visit."
    ],
    take: "Go here when you want the tap list to feel like a lab notebook.",
    takeDetail: "Abjuration's personality is not one flagship beer. It is the idea that recipes are never necessarily finished.",
    locationSlugs: ["abjuration-hazelwood"],
    extraLocations: [
      {
        name: "The Lab — Parkway Theater",
        address: "644 Broadway Avenue, McKees Rocks, PA 15136",
        description: "Abjuration's original home inside the Parkway Theater and the location most directly tied to the brewery's nano-brewery roots.",
        atmosphere: "Small · quirky · original",
        food: "Check current theater/taproom offerings",
        website: "https://www.abjurationbrewing.com/"
      },
      {
        name: "Mt. Lebanon — Axe Taps, Axes & Games",
        address: "1689 McFarland Road, Pittsburgh, PA 15216",
        description: "A South Hills Abjuration tap presence inside Axe Taps, Axes & Games.",
        atmosphere: "Games · casual",
        website: "https://www.abjurationbrewing.com/"
      }
    ],
    sources: [
      { label: "Abjuration about", url: "https://abjurationbrewing.com/About" },
      { label: "Current locations", url: "https://www.abjurationbrewing.com/" },
      { label: "Brewer interview", url: "https://breweriesinpa.com/meet-the-brewer-dave-hallam-of-abjuration-brewing/" }
    ]
  }
};

export const featuredProfileOrder = [
  "hitchhiker",
  "dancing-gnome",
  "old-thunder",
  "east-end",
  "penn-brewery",
  "church-brew-works",
  "grist-house",
  "brew-gentlemen",
  "cinderlands",
  "allegheny-city",
  "abjuration"
] as const;

export const representativeBrewerySlugs: Record<string, string> = {
  hitchhiker: "hitchhiker-sharpsburg",
  "dancing-gnome": "dancing-gnome",
  "old-thunder": "old-thunder",
  "east-end": "east-end",
  "penn-brewery": "penn-brewery",
  "church-brew-works": "church-brew-works",
  "grist-house": "grist-house",
  "brew-gentlemen": "brew-gentlemen",
  cinderlands: "cinderlands-warehouse",
  "allegheny-city": "allegheny-city-brewing",
  abjuration: "abjuration-hazelwood"
};
