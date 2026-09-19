export const breweryProfileRoutes: Record<string, string> = {
  "hitchhiker-sharpsburg": "/breweries/hitchhiker",
  "hitchhiker-mt-lebanon": "/breweries/hitchhiker",
};

export function getBreweryProfileRoute(slug: string) {
  return breweryProfileRoutes[slug] ?? null;
}
