import type { BeerEvent } from "@/data/events";

const foodTruckPattern = /food truck|food vendor|food pop.up|black sheep kitchens|mobile kitchen|pizza|bbq|bar-b-q|barbecue|burger|taco|tortas|sando|sandwich|wrap|trailer|chamo|rincon|horns|boonseek|77 club|off the press|streets on the fly|redeye|red eye|blue sparrow|farmer burger|side hustle|blowfish|robal/i;

export function classifyEvent(name: string, description = ""): BeerEvent["category"] {
  const text = `${name} ${description}`;
  if (/oktoberfest/i.test(text)) return "Oktoberfest";
  if (/festival|beerfest|beer fest/i.test(text)) return "Festival";
  if (/halloween|christmas|xmas|holiday|valentine|st\. patrick|st patrick|new year|easter|thanksgiving|winter pop.up/i.test(text)) return "Holiday themed";
  if (/trivia|bingo|game night|quiz/i.test(text)) return "Trivia & games";
  if (foodTruckPattern.test(text)) return "Food trucks";
  if (/meet[ -]?up|bottle share|social gathering|community night/i.test(text)) return "Meetup / Social event";
  if (/live music|concert|band|\bdj\b|comedy|jazz|open mic|karaoke/i.test(text)) return "Live music";
  if (/beer garden|biergarten/i.test(text)) return "Beer garden";
  return "Beer Event";
}
