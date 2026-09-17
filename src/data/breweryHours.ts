export type BreweryHoursEntry = {
  hours: { day: string; hours: string }[];
  lastChecked: string;
  sourceLabel: string;
  sourceUrl?: string;
};

export const breweryHours: Record<string, BreweryHoursEntry> = {
  "dancing-gnome": {
    hours: [
      { day: "Monday", hours: "4–10 PM" },
      { day: "Tuesday", hours: "4–10 PM" },
      { day: "Wednesday", hours: "4–10 PM" },
      { day: "Thursday", hours: "4–10 PM" },
      { day: "Friday", hours: "2–10 PM" },
      { day: "Saturday", hours: "12–10 PM" },
      { day: "Sunday", hours: "12–8 PM" },
    ],
    lastChecked: "Sep 17, 2026",
    sourceLabel: "Current business listing",
    sourceUrl: "https://dancinggnomebeer.com/",
  },
  "grist-house": {
    hours: [
      { day: "Monday", hours: "Closed" },
      { day: "Tuesday", hours: "Closed" },
      { day: "Wednesday", hours: "4–10 PM" },
      { day: "Thursday", hours: "4–10 PM" },
      { day: "Friday", hours: "4–10 PM" },
      { day: "Saturday", hours: "12–10 PM" },
      { day: "Sunday", hours: "12–8 PM" },
    ],
    lastChecked: "Sep 17, 2026",
    sourceLabel: "Current business listing",
    sourceUrl: "https://gristhouse.com/",
  },
  "penn-brewery": {
    hours: [
      { day: "Monday", hours: "Closed" },
      { day: "Tuesday", hours: "Closed" },
      { day: "Wednesday", hours: "Closed" },
      { day: "Thursday", hours: "4–8 PM" },
      { day: "Friday", hours: "4–8 PM" },
      { day: "Saturday", hours: "3–8 PM" },
      { day: "Sunday", hours: "12–4 PM" },
    ],
    lastChecked: "Sep 17, 2026",
    sourceLabel: "Current business listing",
    sourceUrl: "https://www.pennbrew.com/",
  },
  "east-end": {
    hours: [
      { day: "Monday", hours: "Closed" },
      { day: "Tuesday", hours: "5–10 PM" },
      { day: "Wednesday", hours: "5–10 PM" },
      { day: "Thursday", hours: "5–10 PM" },
      { day: "Friday", hours: "4–10 PM" },
      { day: "Saturday", hours: "12–10 PM" },
      { day: "Sunday", hours: "12–8 PM" },
    ],
    lastChecked: "Sep 17, 2026",
    sourceLabel: "Current business listing",
    sourceUrl: "https://www.eastendbrewing.com/brewpub",
  },
  "late-addition": {
    hours: [
      { day: "Monday", hours: "4–10 PM" },
      { day: "Tuesday", hours: "4–10 PM" },
      { day: "Wednesday", hours: "4–10 PM" },
      { day: "Thursday", hours: "4–10 PM" },
      { day: "Friday", hours: "4–10 PM" },
      { day: "Saturday", hours: "12–10 PM" },
      { day: "Sunday", hours: "12–6 PM" },
    ],
    lastChecked: "Sep 17, 2026",
    sourceLabel: "Current business listing",
    sourceUrl: "https://lateadditionbrewing.com/",
  },
  "hitchhiker-sharpsburg": {
    hours: [
      { day: "Monday", hours: "Closed" },
      { day: "Tuesday", hours: "4–11 PM" },
      { day: "Wednesday", hours: "4–11 PM" },
      { day: "Thursday", hours: "4–11 PM" },
      { day: "Friday", hours: "4–11 PM" },
      { day: "Saturday", hours: "12–11 PM" },
      { day: "Sunday", hours: "12–8 PM" },
    ],
    lastChecked: "Sep 17, 2026",
    sourceLabel: "Current business listing",
    sourceUrl: "https://hitchhiker.beer/tap-rooms/",
  },
};
