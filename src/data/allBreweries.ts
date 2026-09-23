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
  "dancing-gnome": localImage(
    "/brand/breweries/dancinggnome/storefront.png",
    "Dancing Gnome brewery storefront in Sharpsburg"
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
  "hitchhiker-mt-lebanon": {
    url: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Hitchhiker_brewpub%2C_Pittsburgh.jpg",
    alt: "Hitchhiker Brewing Mt. Lebanon taproom",
    sourceLabel: "Wikimedia Commons",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Hitchhiker_brewpub,_Pittsburgh.jpg",
    license: "Creative Commons licensed"
  },
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
