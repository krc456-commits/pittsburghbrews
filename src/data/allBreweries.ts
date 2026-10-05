import { breweries as coreBreweries, areas } from "./breweries";
import { breweryAdditions } from "./breweryAdditions";
import type { BreweryImage, BreweryLogo } from "./breweries";

const localImage = (url: string, alt: string): BreweryImage => ({
  url,
  alt,
  sourceLabel: "Pittsburgh Brews",
  sourceUrl: url,
  license: "Provided for Pittsburgh Brews",
});

const imageOverrides: Record<string, BreweryImage> = {

  "dough-daddy-brewery": localImage(
    "/brand/breweries/doughdaddy/storefront.png",
    "Dough Daddy Brewery storefront in Gibsonia"
  ),
  "fermata-brewing": localImage(
    "/brand/breweries/fermata/storefront.png",
    "Fermata Brewing Company storefront in Ambridge"
  ),
  "golden-age": localImage(
    "/brand/breweries/goldenage/storefront.png",
    "Golden Age Beer Co. storefront in Homestead"
  ),
  "grist-house": localImage(
    "/brand/breweries/gristhouse/storefront-millvale.png",
    "Grist House Craft Brewery storefront in Millvale"
  ),
  "grist-house-command": localImage(
    "/brand/breweries/gristhouse/storefront-command.png",
    "Grist House Command storefront in Oakdale"
  ),
  "hazel-grove": localImage(
    "/brand/breweries/hazelgrove/storefront.png",
    "Hazel Grove Brewing storefront in Hazelwood"
  ),
  "hitchhiker-sharpsburg": localImage(
    "/brand/breweries/hitchhiker/storefront-sharpsburg.png",
    "Hitchhiker Brewing Co. storefront in Sharpsburg"
  ),
  "hitchhiker-mt-lebanon": localImage(
    "/brand/breweries/hitchhiker/storefront-mtlebo.png",
    "Hitchhiker Brewing Co. storefront in Mt. Lebanon"
  ),
  "hop-farm": localImage(
    "/brand/breweries/hopfarm/storefront.png",
    "Hop Farm Brewing Company storefront in Lawrenceville"
  ),
  "inner-groove-verona": localImage(
    "/brand/breweries/innergroove/storefront.png",
    "Inner Groove Brewing storefront in Verona"
  ),
  "late-addition": localImage(
    "/brand/breweries/lateaddition/storefront.png",
    "Late Addition Brewing + Blending storefront on the North Side"
  ),
  "dancing-gnome": localImage(
    "/brand/breweries/dancinggnome/storefront.png",
    "Dancing Gnome brewery storefront in Sharpsburg"
  ),
  "allusion-vandergrift": localImage(
    "/brand/breweries/allusion/storefront-vandergrift.png",
    "Allusion Brewing Company storefront in Vandergrift"
  ),
  "allusion-allison-park": localImage(
    "/brand/breweries/allusion/storefront-allisonpark.png",
    "Allusion Brewing Company storefront in Allison Park"
  ),
  "abjuration-hazelwood": localImage(
    "/brand/breweries/abjuration/storefront.png",
    "Abjuration Brewing The Lab storefront at the Parkway Theater in McKees Rocks"
  ),
  "brew-gentlemen": localImage(
    "/brand/breweries/brewgentlemen/storefront.png",
    "Brew Gentlemen brewery storefront in Braddock"
  ),
  "cinderlands-wexford": localImage(
    "/brand/breweries/cinderlands/storefront-wexford.png",
    "Cinderlands Taproom storefront in Wexford"
  ),
  "cinderlands-warehouse": localImage(
    "/brand/breweries/cinderlands/storefront-warehouse.png",
    "Cinderlands Warehouse storefront in Pittsburgh"
  ),
  "acrospire": localImage(
    "/brand/breweries/acrospire/storefront.png",
    "Acrospire Brewing Co. storefront in Glenshaw"
  ),
  "allegheny-city-brewing": localImage(
    "/brand/breweries/alleghenycity/storefront-eohiostreet.png",
    "Allegheny City Brewing storefront on East Ohio Street"
  ),
  "allegheny-city-brighton-heights": localImage(
    "/brand/breweries/alleghenycity/storefront.png",
    "Allegheny City Brewing Brighton Heights storefront"
  ),
  "aslin-pittsburgh": localImage(
    "/brand/breweries/aslin/storefront.png",
    "Aslin Beer Company storefront in Pittsburgh"
  ),
  "east-end": localImage(
    "/brand/breweries/eastend/storefront.png",
    "East End Brewing Company storefront in Pittsburgh"
  ),
  "eleventh-hour": localImage(
    "/brand/breweries/eleventhhour/storefront.png",
    "11th Hour Brewing Co. storefront in Lawrenceville"
  ),
  "old-thunder": localImage(
    "/brand/breweries/oldthunder/storefront.png",
    "Old Thunder Brewing storefront in Blawnox"
  ),
  "costar-brewing": localImage(
    "/brand/breweries/costar/storefront.png",
    "CoStar Brewing storefront in Etna"
  ),
  "cobblehaus": localImage(
    "/brand/breweries/cobblehaus/storefront.png",
    "Cobblehaus Brewing Co. storefront in Coraopolis"
  ),
  "burghers-lawrenceville": localImage(
    "/brand/breweries/burghers/lawrenceville-storefront.png",
    "Burgh'ers Brewing Lawrenceville storefront"
  ),
  "burghers-millvale": localImage(
    "/brand/breweries/burghers/millvale-storefront.png",
    "Burgh'ers Brewing Millvale storefront"
  ),
  "burghers-south-side": localImage(
    "/brand/breweries/burghers/southside-storefront.png",
    "Burgh'ers Brewing South Side storefront"
  ),
  "church-brew-works": {
    url: "https://commons.wikimedia.org/wiki/Special:Redirect/file/The_Church_Brew_Works.jpg",
    alt: "The Church Brew Works in Pittsburgh",
    sourceLabel: "Wikimedia Commons",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:The_Church_Brew_Works.jpg",
    license: "Public domain",
    credit: "Olessi"
  }
};

const logoOverrides: Record<string, BreweryLogo> = {

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
    alt: "Burgh'ers Brewing logo"
  },
  "burghers-millvale": {
    url: "/brand/breweries/burghers/logo.png",
    alt: "Burgh'ers Brewing logo"
  },
  "burghers-zelienople": {
    url: "/brand/breweries/burghers/logo.png",
    alt: "Burgh'ers Brewing logo"
  },
  "burghers-south-side": {
    url: "/brand/breweries/burghers/logo.png",
    alt: "Burgh'ers Brewing logo"
  }
};

export const breweries = [...coreBreweries, ...breweryAdditions]
  .map((brewery) => ({
    ...brewery,
    ...(imageOverrides[brewery.slug] ? { image: imageOverrides[brewery.slug] } : {}),
    ...(logoOverrides[brewery.slug] ? { logo: logoOverrides[brewery.slug] } : {}),
  }))
  .sort((a, b) => a.name.localeCompare(b.name));

export { areas };
