import { breweries as coreBreweries, areas } from "./breweries";
import { breweryAdditions } from "./breweryAdditions";
import type { BreweryImage, BreweryLogo } from "./breweries";
import { untappdBySlug } from "./untappd";

const localImage = (url: string, alt: string): BreweryImage => ({
  url,
  alt,
  sourceLabel: "Pittsburgh Brews",
  sourceUrl: url,
  license: "Provided for Pittsburgh Brews",
});

const imageOverrides: Record<string, BreweryImage> = {
  "recon-hastings": localImage("/brand/breweries/recon/storefront-hastings.webp", "Recon Brewing Hastings taproom in South Fayette"),
  "recon-meeder": localImage("/brand/breweries/recon/storefront-meeder.webp", "Recon Brewing Meeder taproom in Cranberry Township"),
  "recon-butler": localImage("/brand/breweries/recon/storefront-butler.webp", "Recon Brewing original brewery and taproom in Butler"),
  "golden-age-bohemian": localImage("/brand/breweries/bohemian/storefront.webp", "The Bohemian at the historic Garden Theater on West North Avenue"),
  "helicon-brewing": localImage("/brand/breweries/helicon/storefront.webp", "Helicon Brewing storefront in Oakdale"),
  "altered-genius-ambridge": localImage("/brand/breweries/alteredgenious/storefront-ambridge.webp", "Altered Genius Brewing Co. storefront in Ambridge"),
  "altered-genius-imperial": localImage("/brand/breweries/alteredgenious/storefront-trailside.webp", "Altered Genius Brewing Co. Trailside Taproom storefront in Imperial"),
  "big-sewickley-creek": localImage("/brand/breweries/sewickleycreek/storefront.webp", "Big Sewickley Creek Brewery storefront near Sewickley"),
  "cobblehaus-falls": localImage("/brand/breweries/cobblehaus/storefront-thefalls.webp", "Cobblehaus At The Falls taproom in Mercer"),
  "coven-brewing": localImage("/brand/breweries/coven/sorefront.png", "Coven Brewing storefront in Lawrenceville"),
  "chimera-brewing": localImage("/brand/breweries/chimera/storefront.webp", "Chimera Brewing storefront in Castle Shannon"),
  "new-france": localImage("/brand/breweries/newfrance/storefront-hazelwood.webp", "New France Brewing at Hazelwood Brew House"),
  "abstract-realm": localImage("/brand/breweries/abstractrealm/storefront-hazelwood.webp", "Abstract Realm Brewing at Hazelwood Brew House"),

  "velum-fermentation": localImage(
    "/brand/breweries/velum/storefront.webp",
    "Velum Fermentation storefront on the South Side"
  ),
  "trace-brewing": localImage(
    "/brand/breweries/trace/storefront.webp",
    "Trace Brewing storefront in Bloomfield"
  ),
  "two-frays": localImage(
    "/brand/breweries/twofrays/storefront.webp",
    "Two Frays Brewery storefront in Garfield"
  ),
  "strange-roots-millvale": localImage(
    "/brand/breweries/strangeroots/storefront-millvale.webp",
    "Strange Roots Experimental Ales storefront in Millvale"
  ),
  "strange-roots-new-kensington": localImage(
    "/brand/breweries/strangeroots/storefront-newkensington.webp",
    "Strange Roots Experimental Ales storefront in New Kensington"
  ),
  "stick-city": localImage(
    "/brand/breweries/stickcity/storefront.webp",
    "Stick City Brewing Company storefront in Mars"
  ),
  "spoonwood": localImage(
    "/brand/breweries/spoonwood/storefront.webp",
    "Spoonwood Brewing Co. storefront in Bethel Park"
  ),
  "southern-tier-pittsburgh": localImage(
    "/brand/breweries/southerntier/storefront.webp",
    "Southern Tier Pittsburgh storefront on the North Shore"
  ),
  "smiling-moose-cranberry": localImage(
    "/brand/breweries/smilingmoose/storefront-cranberry.webp",
    "Smiling Moose Brewing storefront in Cranberry Township"
  ),
  "smiling-moose-grove-city": localImage(
    "/brand/breweries/smilingmoose/storefront-grovecity.webp",
    "Smiling Moose Brewing storefront in Grove City"
  ),
  "shubrew-zelienople": localImage(
    "/brand/breweries/shubrew/storefront.webp",
    "ShuBrew storefront in Zelienople"
  ),
  "pittsburgh-brewing-company": localImage(
    "/brand/breweries/pittsburgh/storefront.webp",
    "Pittsburgh Brewing Company brewery campus in Creighton"
  ),
  "penn-brewery": localImage(
    "/brand/breweries/penn/storefront.webp",
    "Penn Brewery storefront on Pittsburgh's North Side"
  ),
  "mondays-peters-township": localImage(
    "/brand/breweries/monday/storefront-peters.webp",
    "Mondays Brewing Company storefront in Peters Township"
  ),
  "lolev-beer": localImage(
    "/brand/breweries/lolev/storefront-pittsburgh.webp",
    "Lolev Beer storefront in Lawrenceville"
  ),
  "lolev-zelienople": localImage(
    "/brand/breweries/lolev/storefront-zelienople.webp",
    "Lolev Beer storefront in Zelienople"
  ),
  "local-remedy": localImage(
    "/brand/breweries/localremedy/storefront.webp",
    "Local Remedy Brewing storefront in Oakmont"
  ),
  "lincoln-avenue-brewery": localImage(
    "/brand/breweries/lincolnave/storefront.webp",
    "Lincoln Avenue Brewery storefront in Bellevue"
  ),
  "dough-daddy-brewery": localImage(
    "/brand/breweries/doughdaddy/storefront.webp",
    "Dough Daddy Brewery storefront in Gibsonia"
  ),
  "fermata-brewing": localImage(
    "/brand/breweries/fermata/storefront.webp",
    "Fermata Brewing Company storefront in Ambridge"
  ),
  "golden-age": localImage(
    "/brand/breweries/goldenage/storefront.webp",
    "Golden Age Beer Co. storefront in Homestead"
  ),
  "grist-house": localImage(
    "/brand/breweries/gristhouse/storefront-millvale.webp",
    "Grist House Craft Brewery storefront in Millvale"
  ),
  "grist-house-command": localImage(
    "/brand/breweries/gristhouse/storefront-command.webp",
    "Grist House Command storefront in Oakdale"
  ),
  "hazel-grove": localImage(
    "/brand/breweries/hazelgrove/storefront.webp",
    "Hazel Grove Brewing storefront in Hazelwood"
  ),
  "hitchhiker-sharpsburg": localImage(
    "/brand/breweries/hitchhiker/storefront-sharpsburg.webp",
    "Hitchhiker Brewing Co. storefront in Sharpsburg"
  ),
  "hitchhiker-mt-lebanon": localImage(
    "/brand/breweries/hitchhiker/storefront-mtlebo.webp",
    "Hitchhiker Brewing Co. storefront in Mt. Lebanon"
  ),
  "hop-farm": localImage(
    "/brand/breweries/hopfarm/storefront.webp",
    "Hop Farm Brewing Company storefront in Lawrenceville"
  ),
  "inner-groove-verona": localImage(
    "/brand/breweries/innergroove/storefront.webp",
    "Inner Groove Brewing storefront in Verona"
  ),
  "late-addition": localImage(
    "/brand/breweries/lateaddition/storefront.webp",
    "Late Addition Brewing + Blending storefront on the North Side"
  ),
  "dancing-gnome": localImage(
    "/brand/breweries/dancinggnome/storefront.webp",
    "Dancing Gnome brewery storefront in Sharpsburg"
  ),
  "allusion-vandergrift": localImage(
    "/brand/breweries/allusion/storefront-vandergrift.webp",
    "Allusion Brewing Company storefront in Vandergrift"
  ),
  "allusion-allison-park": localImage(
    "/brand/breweries/allusion/storefront-allisonpark.webp",
    "Allusion Brewing Company storefront in Allison Park"
  ),
  "abjuration-lab": localImage(
    "/brand/breweries/abjuration/storefront.webp",
    "Abjuration Brewing The Lab at the Parkway Theater in McKees Rocks"
  ),
  "abjuration-hazelwood": localImage(
    "/brand/breweries/abjuration/storefront-hazelwood.webp",
    "Abjuration Brewing at Hazelwood Brew House"
  ),
  "brew-gentlemen": localImage(
    "/brand/breweries/brewgentlemen/storefront.webp",
    "Brew Gentlemen brewery storefront in Braddock"
  ),
  "cinderlands-wexford": localImage(
    "/brand/breweries/cinderlands/storefront-wexford.webp",
    "Cinderlands Taproom storefront in Wexford"
  ),
  "cinderlands-warehouse": localImage(
    "/brand/breweries/cinderlands/storefront-warehouse.webp",
    "Cinderlands Warehouse storefront in Pittsburgh"
  ),
  "acrospire": localImage(
    "/brand/breweries/acrospire/storefront.webp",
    "Acrospire Brewing Co. storefront in Glenshaw"
  ),
  "allegheny-city-brewing": localImage(
    "/brand/breweries/alleghenycity/storefront-eohiostreet.webp",
    "Allegheny City Brewing storefront on East Ohio Street"
  ),
  "allegheny-city-brighton-heights": localImage(
    "/brand/breweries/alleghenycity/storefront.webp",
    "Allegheny City Brewing Brighton Heights storefront"
  ),
  "aslin-pittsburgh": localImage(
    "/brand/breweries/aslin/storefront.webp",
    "Aslin Beer Company storefront in Pittsburgh"
  ),
  "east-end": localImage(
    "/brand/breweries/eastend/storefront.webp",
    "East End Brewing Company storefront in Pittsburgh"
  ),
  "eleventh-hour": localImage(
    "/brand/breweries/eleventhhour/storefront.webp",
    "11th Hour Brewing Co. storefront in Lawrenceville"
  ),
  "old-thunder": localImage(
    "/brand/breweries/oldthunder/storefront.webp",
    "Old Thunder Brewing storefront in Blawnox"
  ),
  "costar-brewing": localImage(
    "/brand/breweries/costar/storefront.webp",
    "CoStar Brewing storefront in Etna"
  ),
  "cobblehaus": localImage(
    "/brand/breweries/cobblehaus/storefront.webp",
    "Cobblehaus Brewing Co. storefront in Coraopolis"
  ),
  "burghers-lawrenceville": localImage(
    "/brand/breweries/burghers/lawrenceville-storefront.webp",
    "Burghers Brewing Lawrenceville storefront"
  ),
  "burghers-millvale": localImage(
    "/brand/breweries/burghers/millvale-storefront.webp",
    "Burghers Brewing Millvale storefront"
  ),
  "burghers-south-side": localImage(
    "/brand/breweries/burghers/southside-storefront.webp",
    "Burghers Brewing South Side storefront"
  ),
  "church-brew-works": localImage(
    "/brand/breweries/churchbrewworks/storefront.webp",
    "The Church Brew Works storefront in Lawrenceville"
  )
};

const logoOverrides: Record<string, BreweryLogo> = {
  "recon-hastings": { url: "/brand/breweries/recon/logo.png", alt: "Recon Brewing logo" },
  "recon-meeder": { url: "/brand/breweries/recon/logo.png", alt: "Recon Brewing logo" },
  "recon-butler": { url: "/brand/breweries/recon/logo.png", alt: "Recon Brewing logo" },
  "golden-age-bohemian": { url: "/brand/breweries/bohemian/logo.png", alt: "The Bohemian logo" },
  "helicon-brewing": { url: "/brand/breweries/helicon/logo.png", alt: "Helicon Brewing logo" },
  "altered-genius-ambridge": { url: "/brand/breweries/alteredgenious/logo.png", alt: "Altered Genius Brewing Co. logo" },
  "altered-genius-imperial": { url: "/brand/breweries/alteredgenious/logo.png", alt: "Altered Genius Brewing Co. logo" },
  "big-sewickley-creek": { url: "/brand/breweries/sewickleycreek/logo.png", alt: "Big Sewickley Creek Brewery logo" },
  "coven-brewing": { url: "/brand/breweries/coven/logo.png", alt: "Coven Brewing logo" },
  "chimera-brewing": { url: "/brand/breweries/chimera/logo.png", alt: "Chimera Brewing logo" },
  "new-france": { url: "/brand/breweries/newfrance/logo.png", alt: "New France Brewing logo" },
  "abstract-realm": { url: "/brand/breweries/abstractrealm/logo.png", alt: "Abstract Realm Brewing logo" },

  "velum-fermentation": {
    url: "/brand/breweries/velum/logo.png",
    alt: "Velum Fermentation logo"
  },
  "trace-brewing": {
    url: "/brand/breweries/trace/logo.png",
    alt: "Trace Brewing logo"
  },
  "two-frays": {
    url: "/brand/breweries/twofrays/logo.png",
    alt: "Two Frays Brewery logo"
  },
  "church-brew-works": {
    url: "/brand/breweries/churchbrewworks/logo.png",
    alt: "The Church Brew Works logo"
  },
  "strange-roots-millvale": {
    url: "/brand/breweries/strangeroots/logo.png",
    alt: "Strange Roots Experimental Ales logo"
  },
  "strange-roots-new-kensington": {
    url: "/brand/breweries/strangeroots/logo.png",
    alt: "Strange Roots Experimental Ales logo"
  },
  "stick-city": {
    url: "/brand/breweries/stickcity/logo.png",
    alt: "Stick City Brewing Company logo"
  },
  "spoonwood": {
    url: "/brand/breweries/spoonwood/logo.png",
    alt: "Spoonwood Brewing Co. logo"
  },
  "southern-tier-pittsburgh": {
    url: "/brand/breweries/southerntier/logo.png",
    alt: "Southern Tier Brewing Company logo"
  },
  "smiling-moose-cranberry": {
    url: "/brand/breweries/smilingmoose/logo.png",
    alt: "Smiling Moose Brewing logo"
  },
  "smiling-moose-grove-city": {
    url: "/brand/breweries/smilingmoose/logo.png",
    alt: "Smiling Moose Brewing logo"
  },
  "shubrew-zelienople": {
    url: "/brand/breweries/shubrew/logo.png",
    alt: "ShuBrew logo"
  },
  "pittsburgh-brewing-company": {
    url: "/brand/breweries/pittsburgh/logo.png",
    alt: "Pittsburgh Brewing Company logo"
  },
  "penn-brewery": {
    url: "/brand/breweries/penn/logo.png",
    alt: "Penn Brewery logo"
  },
  "mondays-peters-township": {
    url: "/brand/breweries/monday/logo.png",
    alt: "Mondays Brewing Company logo"
  },
  "mondays-greenfield": {
    url: "/brand/breweries/monday/logo.png",
    alt: "Mondays Brewing Company logo"
  },
  "lolev-beer": {
    url: "/brand/breweries/lolev/logo.png",
    alt: "Lolev Beer logo"
  },
  "lolev-zelienople": {
    url: "/brand/breweries/lolev/logo.png",
    alt: "Lolev Beer logo"
  },
  "local-remedy": {
    url: "/brand/breweries/localremedy/logo.png",
    alt: "Local Remedy Brewing logo"
  },
  "lincoln-avenue-brewery": {
    url: "/brand/breweries/lincolnave/logo.png",
    alt: "Lincoln Avenue Brewery logo"
  },
  "dough-daddy-brewery": {
    url: "/brand/breweries/doughdaddy/logo.png",
    alt: "Dough Daddy Brewery logo"
  },
  "fermata-brewing": {
    url: "/brand/breweries/fermata/logo.png",
    alt: "Fermata Brewing Company logo"
  },
  "golden-age": {
    url: "/brand/breweries/goldenage/logo.png",
    alt: "Golden Age Beer Co. logo"
  },
  "grist-house": {
    url: "/brand/breweries/gristhouse/logo.png",
    alt: "Grist House Craft Brewery logo"
  },
  "grist-house-command": {
    url: "/brand/breweries/gristhouse/logo.png",
    alt: "Grist House Craft Brewery logo"
  },
  "grist-house-beer-crib": {
    url: "/brand/breweries/gristhouse/logo.png",
    alt: "Grist House Craft Brewery logo"
  },
  "grist-house-beer-market": {
    url: "/brand/breweries/gristhouse/logo.png",
    alt: "Grist House Craft Brewery logo"
  },
  "hazel-grove": {
    url: "/brand/breweries/hazelgrove/logo.png",
    alt: "Hazel Grove Brewing logo"
  },
  "hitchhiker-sharpsburg": {
    url: "/brand/breweries/hitchhiker/logo.png",
    alt: "Hitchhiker Brewing Co. logo"
  },
  "hitchhiker-mt-lebanon": {
    url: "/brand/breweries/hitchhiker/logo.png",
    alt: "Hitchhiker Brewing Co. logo"
  },
  "hop-farm": {
    url: "/brand/breweries/hopfarm/logo.png",
    alt: "Hop Farm Brewing Company logo"
  },
  "inner-groove-verona": {
    url: "/brand/breweries/innergroove/logo.png",
    alt: "Inner Groove Brewing logo"
  },
  "late-addition": {
    url: "/brand/breweries/lateaddition/logo.png",
    alt: "Late Addition Brewing + Blending logo"
  },
  "dancing-gnome": {
    url: "/brand/breweries/dancinggnome/logo.png",
    alt: "Dancing Gnome logo"
  },
  "allusion-vandergrift": {
    url: "/brand/breweries/allusion/logo.png",
    alt: "Allusion Brewing Company logo"
  },
  "allusion-allison-park": {
    url: "/brand/breweries/allusion/logo.png",
    alt: "Allusion Brewing Company logo"
  },
  "east-end": {
    url: "/brand/breweries/eastend/logo.png",
    alt: "East End Brewing Company logo"
  },
  "eleventh-hour": {
    url: "/brand/breweries/eleventhhour/logo.png",
    alt: "11th Hour Brewing Co. logo"
  },
  "old-thunder": {
    url: "/brand/breweries/oldthunder/logo.png",
    alt: "Old Thunder Brewing logo"
  },
  "costar-brewing": {
    url: "/brand/breweries/costar/logo.png",
    alt: "CoStar Brewing logo"
  },
  "cobblehaus": {
    url: "/brand/breweries/cobblehaus/logo.png",
    alt: "Cobblehaus Brewing Co. logo"
  },
  "brew-gentlemen": {
    url: "/brand/breweries/brewgentlemen/logo.png",
    alt: "Brew Gentlemen logo"
  },
  "cinderlands-wexford": {
    url: "/brand/breweries/cinderlands/logo.png",
    alt: "Cinderlands Beer Company logo"
  },
  "cinderlands-warehouse": {
    url: "/brand/breweries/cinderlands/logo.png",
    alt: "Cinderlands Beer Company logo"
  },
  "abjuration-lab": {
    url: "/brand/breweries/abjuration/logo.png",
    alt: "Abjuration Brewing logo"
  },
  "abjuration-hazelwood": {
    url: "/brand/breweries/abjuration/logo.png",
    alt: "Abjuration Brewing logo"
  },
  "aslin-pittsburgh": {
    url: "/brand/breweries/aslin/logo.png",
    alt: "Aslin Beer Company logo"
  },
  "burghers-lawrenceville": {
    url: "/brand/breweries/burghers/logo.png",
    alt: "Burghers Brewing logo"
  },
  "burghers-millvale": {
    url: "/brand/breweries/burghers/logo.png",
    alt: "Burghers Brewing logo"
  },
  "burghers-zelienople": {
    url: "/brand/breweries/burghers/logo.png",
    alt: "Burghers Brewing logo"
  },
  "burghers-south-side": {
    url: "/brand/breweries/burghers/logo.png",
    alt: "Burghers Brewing logo"
  }
};

// Curated, conservative classification: founding origin of the brewery brand,
// not the city of a particular taproom. Unknown origins are intentionally unbadged.
const pittsburghOriginalSlugs = new Set([
  "altered-genius-ambridge",
  "altered-genius-imperial",
  "big-sewickley-creek",
  "abjuration-lab",
  "abjuration-hazelwood",
  "allegheny-city-brewing",
  "allegheny-city-brighton-heights",
  "burghers-lawrenceville",
  "burghers-millvale",
  "burghers-zelienople",
  "burghers-south-side",
  "cinderlands-warehouse",
  "cinderlands-wexford",
  "cobblehaus",
  "cobblehaus-falls",
  "costar-brewing",
  "dancing-gnome",
  "east-end",
  "eleventh-hour",
  "golden-age",
  "grist-house",
  "grist-house-command",
  "grist-house-beer-crib",
  "grist-house-beer-market",
  "hitchhiker-sharpsburg",
  "hitchhiker-mt-lebanon",
  "hop-farm",
  "inner-groove-verona",
  "lincoln-avenue-brewery",
  "lolev-beer",
  "lolev-zelienople",
  "old-thunder",
  "penn-brewery",
  "pittsburgh-brewing-company",
  "spoonwood",
  "trace-brewing",
  "two-frays",
  "velum-fermentation",
  "strange-roots-millvale",
  "strange-roots-new-kensington",
  "balance-brewing",
  "brew-gentlemen",
  "allusion-vandergrift",
  "allusion-allison-park",
  "acrospire",
  "fermata-brewing",
  "dough-daddy-brewery",
  "hazel-grove",
  "late-addition",
  "local-remedy",
  "mondays-peters-township",
  "mondays-greenfield",
  "shubrew-zelienople",
  "stick-city",
  "smiling-moose-cranberry",
  "smiling-moose-grove-city",
  "church-brew-works",
  "new-france",
  "abstract-realm",
  "helicon-brewing",
  "coven-brewing",
  "chimera-brewing",
  "recon-butler",
  "recon-meeder",
  "recon-hastings",
  "golden-age-bohemian",
  "back-alley-brewing"
]);

export const breweries = [...coreBreweries, ...breweryAdditions]
  .map((brewery) => ({
    ...brewery,
    pittsburghOriginal: pittsburghOriginalSlugs.has(brewery.slug),
    ...(imageOverrides[brewery.slug] ? { image: imageOverrides[brewery.slug] } : {}),
    ...(logoOverrides[brewery.slug] ? { logo: logoOverrides[brewery.slug] } : {}),
    ...(untappdBySlug[brewery.slug] ? { untappd: untappdBySlug[brewery.slug] } : {}),
  }))
  .sort((a, b) => a.name.localeCompare(b.name));

export { areas };
