export const breweryProfileRoutes: Record<string, string> = {
  "hitchhiker-sharpsburg": "/breweries/hitchhiker",
  "hitchhiker-mt-lebanon": "/breweries/hitchhiker",
  "dancing-gnome": "/breweries/dancing-gnome",
  "old-thunder": "/breweries/old-thunder",
  "east-end": "/breweries/east-end",
  "penn-brewery": "/breweries/penn-brewery",
  "church-brew-works": "/breweries/church-brew-works",
  "grist-house": "/breweries/grist-house",
  "grist-house-command": "/breweries/grist-house",
  "grist-house-beer-crib": "/breweries/grist-house",
  "grist-house-beer-market": "/breweries/grist-house",
  "brew-gentlemen": "/breweries/brew-gentlemen",
  "cinderlands-warehouse": "/breweries/cinderlands",
  "cinderlands-wexford": "/breweries/cinderlands",
  "allegheny-city-brewing": "/breweries/allegheny-city",
  "allegheny-city-brighton-heights": "/breweries/allegheny-city",
  "abjuration-hazelwood": "/breweries/abjuration",
};

export function getBreweryProfileRoute(slug: string) {
  return breweryProfileRoutes[slug] ?? null;
}
