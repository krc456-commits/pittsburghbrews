import { breweries as coreBreweries, areas } from "./breweries";
import { breweryAdditions } from "./breweryAdditions";

export const breweries = [...coreBreweries, ...breweryAdditions].sort((a, b) => a.name.localeCompare(b.name));
export { areas };
