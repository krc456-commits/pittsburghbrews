import { breweries as coreBreweries, areas } from "./breweries";
import { breweryAdditions } from "./breweryAdditions";
import type { BreweryImage } from "./breweries";

const imageOverrides: Record<string, BreweryImage> = {
  "hitchhiker-sharpsburg": {
    url: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Hitchhiker_brewpub%2C_Pittsburgh.jpg",
    alt: "Hitchhiker Brewing taproom in Pittsburgh",
    sourceLabel: "Wikimedia Commons",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Hitchhiker_brewpub,_Pittsburgh.jpg",
    license: "Creative Commons licensed"
  }
};

export const breweries = [...coreBreweries, ...breweryAdditions]
  .map((brewery) => imageOverrides[brewery.slug] ? { ...brewery, image: imageOverrides[brewery.slug] } : brewery)
  .sort((a, b) => a.name.localeCompare(b.name));

export { areas };
