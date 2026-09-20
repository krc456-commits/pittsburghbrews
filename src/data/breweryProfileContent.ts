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
        name: "Hazelwood — Hazelwood Brew House",
        address: "5011 Lytle Street, Pittsburgh, PA 15207",
        description: "Abjuration operates its own brewing system and tap service inside the independently operated Hazelwood Brew House, a shared historic brewery building that also houses Abstract Realm and New France Brewing.",
        atmosphere: "Historic · shared brewery destination · indoor + outdoor",
        food: "Shared-site food service",
        website: "https://www.abjurationbrewing.com/"
      },
      {
        name: "Mt. Lebanon — Taps, Axes & Games",
        address: "1689 McFarland Road, Pittsburgh, PA 15216",
        description: "A partnership location inside Taps, Axes & Games. TAG is independently owned; Abjuration operates on site as the beer partner rather than owning the venue.",
        atmosphere: "Games · casual · partnership venue",
        website: "https://www.abjurationbrewing.com/"
      }
    ],
    sources: [
      { label: "Abjuration about", url: "https://abjurationbrewing.com/About" },
      { label: "Current locations", url: "https://www.abjurationbrewing.com/" },
      { label: "Brewer interview", url: "https://breweriesinpa.com/meet-the-brewer-dave-hallam-of-abjuration-brewing/" }
    ]
  },
  "balance": {
    slug: "balance",
    name: "Balance Brewing Company",
    tagline: "A new North Hills brewery built around drinkable beer, broad appeal and a taproom designed to feel like a community gathering place.",
    founded: "2026",
    knownFor: ["Balanced beer", "North Hills", "Community taproom", "Wide-ranging styles"],
    specialTitle: "The name is the mission.",
    specialBody: [
      "Balance grew out of conversations between Rob Houston and Matt Gibb while they worked together at Hitchhiker Brewing in 2019. Their goal was straightforward: make beer with balance in flavor, drinkability and creativity, and build a tap list that works for both beer obsessives and casual drinkers.",
      "That philosophy also shaped the taproom. The brewery says it wants the Babcock Boulevard space to feel welcoming enough for a quick pint, a meal with friends or a neighborhood celebration."
    ],
    storyTitle: "Industry experience turns into a North Hills brewery",
    story: [
      "When the Babcock brewery space became available in 2024, the team saw a chance to bring more than two decades of combined industry experience into their own operation.",
      "The taproom began a soft opening in March 2026 and Balance held its grand opening on June 27, 2026."
    ],
    beerTitle: "Built for range instead of a single house style",
    beer: [
      "Balance explicitly frames its beer around drinkability and variety rather than one narrow specialty.",
      "Head brewer Matt Gibb has experience across American and European styles, from IPA and fruited sour beer to crisp lager, which fits the brewery's goal of keeping a broad, approachable board."
    ],
    take: "Go when you want a newer Pittsburgh brewery that is trying to be easy to like without being generic.",
    takeDetail: "Balance is still young, which makes it especially worth revisiting as the beer list and North Hills identity continue to settle in.",
    locationSlugs: ["balance-brewing"],
    sources: [
      { label: "Balance about", url: "https://www.balancebrewingcompany.com/about-us" },
      { label: "Balance Brewing", url: "https://www.balancebrewingcompany.com/" }
    ]
  },
  "eleventh-hour": {
    slug: "eleventh-hour",
    name: "11th Hour Brewing Co.",
    tagline: "A Lower Lawrenceville brewery built around a rotating taproom, quality ingredients and a steady calendar of food trucks and events.",
    knownFor: ["Lawrenceville", "Rotating beer", "Food trucks", "Events"],
    specialTitle: "A neighborhood taproom that keeps moving.",
    specialBody: [
      "11th Hour puts the taproom experience at the center: house beer, rotating food trucks and frequent themed events in a tucked-away Lower Lawrenceville space.",
      "The brewery emphasizes ingredient quality, sourcing hops from the Pacific Northwest, Australasia and Europe and grain from the Midwest and Western Europe."
    ],
    storyTitle: "A brewery woven into Lower Lawrenceville",
    story: [
      "11th Hour operates at 3711 Charlotte Street, just off Butler Street and close to the Strip District and Bloomfield edges of Lawrenceville.",
      "Its identity has grown around the taproom itself: regulars, releases, food trucks and seasonal events rather than a restaurant-style model."
    ],
    beerTitle: "Ingredient-driven and intentionally varied",
    beer: [
      "The brewery describes its process as starting with high-quality hops and grain and letting proven recipes and brewer skill do the rest.",
      "The current beer family spans multiple styles, with releases such as New Cult, Dream Cannon, Paper Birds and Pink Moon showing the range of the program."
    ],
    take: "Go when you want a brewery night that feels eventful even when you did not plan much.",
    takeDetail: "11th Hour works especially well when you want beer plus whatever food truck or taproom event happens to be on that night.",
    locationSlugs: ["eleventh-hour"],
    sources: [
      { label: "11th Hour Brewing", url: "https://www.11thhourbrews.com/" },
      { label: "11th Hour beers", url: "https://www.11thhourbrews.com/the-brews" },
      { label: "11th Hour FAQs", url: "https://www.11thhourbrews.com/our-faqs" }
    ]
  },
  "golden-age": {
    slug: "golden-age",
    name: "Golden Age Beer Co.",
    tagline: "A Homestead brewery built around crisp lager, a serious kitchen and a beer garden that treats lager as a social experience.",
    knownFor: ["Lager", "Homestead", "Beer garden", "Full kitchen"],
    specialTitle: "Lager is not one category here. It is the whole point.",
    specialBody: [
      "Golden Age was created specifically to put lager at the center of a Pittsburgh brewery. The program ranges from Northern German and Italian-style pilsner to dunkel, rauchbier and American lager.",
      "The brewery ties that lager focus to Homestead's industrial history and to the idea that clean, drinkable beer is fundamentally social."
    ],
    storyTitle: "A lager brewery for Homestead",
    story: [
      "Golden Age was founded by the same team behind Pittsburgh beer bars Independent Brewing Company and Lorelei.",
      "The Homestead brewery uses a 15-barrel BrauKon system designed for precise lager production, with head brewer Aaron Dahl leading the brewing program."
    ],
    beerTitle: "Clean, crisp and intentionally patient",
    beer: [
      "Golden Age leans hard into lager traditions: pilsners, dunkels, smoked lagers and other styles that reward precision and time.",
      "The beer is paired with a full kitchen serving wood-fired pizza, smash burgers, wings and sandwiches, while the beer garden extends the brewery into a year-round gathering space when weather allows."
    ],
    take: "Go when you want lager to be the main event instead of the safe option.",
    takeDetail: "Golden Age is one of the clearest style-driven brewery experiences in the region, and the kitchen plus beer garden make it easy to stay awhile.",
    locationSlugs: ["golden-age"],
    sources: [
      { label: "Golden Age about", url: "https://www.goldenagebeer.com/about-1" },
      { label: "Golden Age visit", url: "https://www.goldenagebeer.com/visit-us" },
      { label: "Golden Age beer", url: "https://www.goldenagebeer.com/menu" }
    ]
  },
  "hop-farm": {
    slug: "hop-farm",
    name: "Hop Farm Brewing Company",
    tagline: "A Lawrenceville brewery that connects hoppy beer, farmhouse styles and a full kitchen to local sourcing and sustainability.",
    knownFor: ["Local sourcing", "Hoppy ales", "Farmhouse ales", "Full kitchen"],
    specialTitle: "The farm connection is more than branding.",
    specialBody: [
      "Hop Farm describes itself as an independently partner-owned brewery focused on sustainability and local sourcing.",
      "That approach extends across both beer and food, with local ingredients showing up in hoppy ales, farmhouse ales, sour beer, lagers and the kitchen."
    ],
    storyTitle: "A Lawrenceville brewery built around local inputs",
    story: [
      "Hop Farm operates on Butler Street in Lawrenceville and has developed as both a brewery and neighborhood restaurant.",
      "The brewery's public identity is deliberately tied to where ingredients come from and to treating food and beer as connected parts of the same operation."
    ],
    beerTitle: "Hops, farmhouse character, sour beer and lager",
    beer: [
      "The name suggests a hop-only brewery, but the program is broader than that.",
      "Hop Farm explicitly lists hoppy ales, farmhouse ales, sour ales and lagers among its core interests, giving the tap list enough range for mixed groups."
    ],
    take: "Go when you want local sourcing to show up in both the pint and the plate.",
    takeDetail: "Hop Farm is less about one signature gimmick and more about a coherent brewery-and-kitchen philosophy.",
    locationSlugs: ["hop-farm"],
    sources: [
      { label: "Hop Farm about", url: "https://hopfarmbrewingco.com/about/" },
      { label: "Hop Farm", url: "https://hopfarmbrewingco.com/" }
    ]
  },
  "lincoln-avenue": {
    slug: "lincoln-avenue",
    name: "Lincoln Avenue Brewery",
    tagline: "A Bellevue family brewery and restaurant shaped as much by neighborhood roots as by the beer pouring behind the bar.",
    knownFor: ["Bellevue", "Family-owned", "Full kitchen", "Local sourcing"],
    specialTitle: "This brewery exists because Bellevue changed with it.",
    specialBody: [
      "Grant and Lisa Saylor grew up in Bellevue, raised their family there and eventually built their brewery on Lincoln Avenue in a former dentist office with more than 1,000 volunteer renovation hours from the community.",
      "The timing mattered: Bellevue voted in 2015 to allow alcohol sales, clearing a cultural and legal path for the kind of brewery-and-restaurant the Saylors had wanted to create."
    ],
    storyTitle: "A family dream becomes a main-street brewery",
    story: [
      "The Saylors had wanted to open a restaurant for years before the right Lincoln Avenue space became available in 2019.",
      "Grant's homebrewing background became the beer side of the business while Lisa and the rest of the family helped turn LAB into a full neighborhood restaurant, brewery and live-event space."
    ],
    beerTitle: "Local beer with a Pennsylvania-first streak",
    beer: [
      "LAB uses its brewery license to lean into local beer, wine and spirits and says roughly seventy percent of what it sells comes from Pennsylvania.",
      "The house beer moves across styles, from cream ale and stout to fruited sour and ESB, often with local ingredients or local references worked into the recipe."
    ],
    take: "Go when you want a brewery that feels inseparable from the neighborhood around it.",
    takeDetail: "Lincoln Avenue Brewery works as a true local pub: house beer, a full menu, live music, trivia and the sense that Bellevue itself is part of the concept.",
    locationSlugs: ["lincoln-avenue-brewery"],
    sources: [
      { label: "LAB backstory", url: "https://lincolnavenuebrewery.com/the-backstory/" },
      { label: "LAB beer", url: "https://lincolnavenuebrewery.com/the-brews/" },
      { label: "LAB menu", url: "https://lincolnavenuebrewery.com/menu/" }
    ]
  },
  "trace": {
    slug: "trace",
    name: "Trace Brewing",
    tagline: "A Bloomfield brewery where beer, coffee, food trucks, community programming and brewer training all share the same space.",
    knownFor: ["Bloomfield", "Vocational program", "Coffee", "Food trucks"],
    specialTitle: "Trace is trying to widen who gets to belong in brewing.",
    specialBody: [
      "Trace combines a neighborhood brewery with a six-month paid vocational program designed to help people start careers in professional brewing.",
      "That workforce mission sits alongside a highly social taproom model with morning coffee service, beer throughout the day, food trucks every night and frequent collaborations."
    ],
    storyTitle: "A brewery with a training pipeline built in",
    story: [
      "Trace operates from 4312 Main Street in Bloomfield and has grown into an all-day neighborhood space rather than a taproom that only comes alive at night.",
      "The brewery's vocational program is one of its most distinctive features, turning the production side of the business into a path into the industry."
    ],
    beerTitle: "Collaborative, varied and comfortable crossing categories",
    beer: [
      "Trace's releases range broadly, and collaborations are a recurring part of the program.",
      "Recent projects have included pilsner, fruit-driven beer and cross-category collaborations, while the taproom format keeps the beer connected to a wider community schedule."
    ],
    take: "Go when you want one of Pittsburgh's most community-minded brewery spaces.",
    takeDetail: "Trace works equally well as a coffee stop, casual afternoon beer, food-truck night or event destination, which is a big part of why it feels different.",
    locationSlugs: ["trace-brewing"],
    sources: [
      { label: "Trace Brewing", url: "https://www.tracebloomfield.com/" }
    ]
  },
  "two-frays": {
    slug: "two-frays",
    name: "Two Frays Brewery",
    tagline: "A Garfield neighborhood brewery built around small-batch beer, a family-run identity and the promise of having something for everyone.",
    knownFor: ["Garfield", "Small-batch beer", "Non-alcoholic beer", "Dog friendly"],
    specialTitle: "Something for everyone is an actual brewing decision here.",
    specialBody: [
      "Two Frays is owned by Jen and Mike and positions itself first as a neighborhood brewery: inviting, kind and broad enough that different kinds of drinkers can all find a reason to stay.",
      "That philosophy pushed the brewery into non-alcoholic beer in 2022, when customer requests led the team to start developing its own NA releases."
    ],
    storyTitle: "Family-run and built for Garfield",
    story: [
      "Two Frays brews and packages its beer on site at 5113 Penn Avenue.",
      "The space is designed around neighborhood use, with outdoor seating, events and a dog-friendly approach that makes the brewery feel more like a local gathering place than a production showroom."
    ],
    beerTitle: "Small batches, house yeast and room for NA beer",
    beer: [
      "Two Frays builds recipes from scratch and uses an English house yeast across much of the program, with attention even paid to water profiles for individual beers.",
      "The brewery also keeps non-alcoholic beer in its regular thinking, extending its 'something for everyone' idea beyond traditional craft styles."
    ],
    take: "Go when the group includes people who do not all drink the same way.",
    takeDetail: "Two Frays' biggest strength is flexibility: local beer, NA options, outdoor space and a neighborhood vibe that does not require everyone to be a beer nerd.",
    locationSlugs: ["two-frays"],
    sources: [
      { label: "Two Frays", url: "https://www.twofraysbrewery.com/" },
      { label: "Two Frays brewery", url: "https://www.twofraysbrewery.com/brewery" },
      { label: "Two Frays NA beer", url: "https://www.twofraysbrewery.com/pittsburgh-s-original-non-alcoholic-beer" }
    ]
  },
  "velum": {
    slug: "velum",
    name: "Velum Fermentation",
    tagline: "A huge South Side brewery where beer shares space with pickleball, pinball, events and a warehouse-sized community room.",
    knownFor: ["South Side", "Pickleball", "Pinball", "Large taproom"],
    specialTitle: "The room is intentionally bigger than the beer.",
    specialBody: [
      "Velum describes itself as a large craft brewery that offers more than beer, and the physical setup makes that obvious.",
      "Indoor pickleball courts, a pinball-focused arcade, covered outdoor seating and a large taproom turn the Jane Street building into an activity space as much as a brewery."
    ],
    storyTitle: "A brewery built for lingering",
    story: [
      "Velum operates at 2120 Jane Street in Pittsburgh's South Side.",
      "Its concept leans heavily into community use and flexible gathering space, which gives it a very different rhythm from a small neighborhood tasting room."
    ],
    beerTitle: "Beer as one part of a larger fermentation-and-events space",
    beer: [
      "Velum keeps house beer at the center, but the venue is intentionally not dependent on beer alone to create the experience.",
      "That makes it especially useful for groups where some people care as much about games, events and space as they do about the tap list."
    ],
    take: "Go when the group wants an activity, not just a flight.",
    takeDetail: "Velum is one of the easiest breweries in the city for a large or mixed-interest group because the building gives everyone something to do.",
    locationSlugs: ["velum-fermentation"],
    sources: [
      { label: "Velum about", url: "https://www.velumfermentation.com/about/" },
      { label: "Velum location", url: "https://www.velumfermentation.com/location/velum-fermentation/" }
    ]
  },
  "strange-roots": {
    slug: "strange-roots",
    name: "Strange Roots Experimental Ales",
    tagline: "A two-taproom brewery rooted in farmhouse tradition, local ingredients, mixed fermentation and beer that deliberately reflects its surroundings.",
    knownFor: ["Farmhouse ales", "Mixed fermentation", "Local ingredients", "Two taprooms"],
    specialTitle: "The environment is treated like an ingredient.",
    specialBody: [
      "Strange Roots says it operates at the intersection of farmhouse brewing tradition and locally driven experimentation.",
      "Local ingredients, different fermentation methods and local microflora are all part of the brewery's effort to make artisan ales connected to western Pennsylvania."
    ],
    storyTitle: "One brewing identity, two neighborhood homes",
    story: [
      "Strange Roots currently operates taprooms in Millvale and New Kensington.",
      "Both locations are family- and dog-friendly with indoor and outdoor seating, but each has its own food setup and neighborhood personality."
    ],
    beerTitle: "Farmhouse tradition with room to get strange",
    beer: [
      "The core identity is fermentation-driven rather than style-driven: farmhouse influence, local inputs and experimentation matter more than fitting neatly into one category.",
      "That makes Strange Roots a useful stop for drinkers who like rustic, sour, mixed-fermentation or otherwise less conventional beer."
    ],
    take: "Go when you want beer that feels tied to process and place.",
    takeDetail: "Millvale is the established Pittsburgh-area stop; New Kensington gives the same brewery identity a second neighborhood setting with Common Oven Pizza Co. in the kitchen.",
    locationSlugs: ["strange-roots-millvale", "strange-roots-new-kensington"],
    sources: [
      { label: "Strange Roots", url: "https://www.strangerootsbeer.com/" }
    ]
  },
  "fermata": {
    slug: "fermata",
    name: "Fermata Brewing Company",
    tagline: "An Ambridge brewery that mixes craft beer, live music and local bridge-town history into a deliberately community-focused taproom.",
    knownFor: ["Ambridge", "Live music", "Community events", "Bridge-town identity"],
    specialTitle: "The name, logo and taproom all point back to Ambridge.",
    specialBody: [
      "Fermata takes its name from the musical symbol for holding a note, a reference to the founders' love of music and the idea of giving people a reason to pause and stay awhile.",
      "Its logo also references Ambridge's American Bridge Company history through a stylized truss bridge and steel-bolt imagery."
    ],
    storyTitle: "Music culture meets steel-town history",
    story: [
      "Fermata built its taproom at 918 Merchant Street around a community-focused, interactive experience with a clear line of sight to the brewing process.",
      "The brewery describes itself as a neighbor first, with live music and community events forming a major part of the identity around the beer."
    ],
    beerTitle: "A brewery experience built around the room as much as the recipes",
    beer: [
      "Fermata keeps craft beer at the center, but its public identity is strongly tied to live music, gathering and the social experience of the taproom.",
      "That combination makes the brewery feel especially connected to Ambridge rather than like a generic taproom that could be anywhere."
    ],
    take: "Go when you want the brewery visit to feel like part of a neighborhood night out.",
    takeDetail: "Fermata's strongest identity is the overlap of beer, music and Ambridge itself.",
    locationSlugs: ["fermata-brewing"],
    sources: [
      { label: "Fermata about", url: "https://www.fermatabrewing.beer/about-us" },
      { label: "Fermata Brewing", url: "https://www.fermatabrewing.beer/" }
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
  "abjuration",
  "balance",
  "eleventh-hour",
  "golden-age",
  "hop-farm",
  "lincoln-avenue",
  "trace",
  "two-frays",
  "velum",
  "strange-roots",
  "fermata"
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
  abjuration: "abjuration-hazelwood",
  balance: "balance-brewing",
  "eleventh-hour": "eleventh-hour",
  "golden-age": "golden-age",
  "hop-farm": "hop-farm",
  "lincoln-avenue": "lincoln-avenue-brewery",
  trace: "trace-brewing",
  "two-frays": "two-frays",
  velum: "velum-fermentation",
  "strange-roots": "strange-roots-millvale",
  fermata: "fermata-brewing"
};
