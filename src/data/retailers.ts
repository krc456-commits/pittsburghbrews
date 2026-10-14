export type Retailer = {
  name: string; kind: "Bottle shop" | "Beer distributor" | "Bottle shop & taproom" | "Restaurant & beer to go"; area: string;
  address: string; phone?: string; website?: string; source: string;
  reasons: string[]; brands?: string[]; brandListUrl?: string;
  summary: string;
  hours?: string[];
  hoursSource?: string;
  coordinates?: {lat:number; lng:number};
};

export const retailers: Retailer[] = [
  { name:"Hal’s Bottle Shop",hours:["Mon–Tue: 3–9 PM","Wed–Fri: 3–10 PM","Sat: 12–10 PM","Sun: 12–9 PM"],hoursSource:"https://www.halsbar.com/bottle-shop",coordinates:{lat:40.5246964,lng:-80.016449},kind:"Bottle shop",area:"North Hills",address:"3225 Babcock Blvd, Pittsburgh, PA 15237",phone:"4123643230",website:"https://www.halsbar.com/bottle-shop",source:"https://www.halsbar.com/bottle-shop",summary:"Build-your-own six-packs, local craft selections, and beers that can be harder to find.",reasons:["Build your own six-pack","Rare Beer Club — ask the shop about current rules","Current selection linked through Untappd"],brands:["Abjuration","Cinderlands","Coven","Dancing Gnome","Helltown","Hitchhiker","Lolev","Old Thunder"] },
  { name:"Beer Towne",hours:["Mon–Thu: 11 AM–8 PM","Fri–Sat: 11 AM–9 PM","Sun: 11 AM–5 PM"],hoursSource:"https://beertowne.com/",coordinates:{lat:40.6683,lng:-80.0209},kind:"Beer distributor",area:"Gibsonia",address:"619 Warrendale Rd Suite 2, Gibsonia, PA 15044",phone:"7246877837",website:"https://beertowne.com/",source:"https://beertowne.com/breweries/",summary:"Local craft beer selection, new arrivals and a published list of represented breweries.",reasons:["Local brewery selection","Untappd beer menu","Curbside pickup and keg requests"],brands:["Brew Gentlemen","Cinderlands","Dancing Gnome","Eleventh Hour","Four Points"] },
  { name:"Creekside Beer",hours:["Mon–Sat: 10 AM–9 PM","Sun: 10 AM–5 PM"],hoursSource:"https://www.creeksidebeer.com/",coordinates:{lat:40.614,lng:-80.1493},kind:"Beer distributor",area:"Sewickley",address:"2175 Big Sewickley Creek Rd, Sewickley, PA 15143",phone:"7242660700",website:"https://www.creeksidebeer.com/",source:"https://www.creeksidebeer.com/about-us",summary:"Local and wider craft selections with a searchable online catalog.",reasons:["Local and specialty craft beer","Online beer catalog","Drive-up lane and pickup"] },
  { name:"Babcock Beer",coordinates:{lat:40.510544,lng:-79.993672},kind:"Beer distributor",area:"North Hills",address:"2199 Babcock Blvd, Pittsburgh, PA",phone:"4128215009",website:"https://babcockbeer.com/",source:"https://babcockbeer.com/craft-beer-list",brandListUrl:"https://babcockbeer.com/craft-beer-list",summary:"North Hills beer distributor with an extensive published craft beer and cider brand catalog, spanning Pittsburgh favorites and nationally recognized breweries.",reasons:["Extensive published craft beer brand list","Pittsburgh and regional craft selections","Singles, four-packs, six-packs and cases","Special orders available for beers not on hand","Weekly specials and ample parking"],brands:["Eleventh Hour","Arsenal Cider","Aslin","Brew Gentlemen","Cinderlands","Dancing Gnome","East End Brewing","Grist House","Helltown","Hitchhiker","Lolev","Penn Brewery","Southern Tier","Voodoo","North Country","Great Lakes","Allagash","Alchemist","Athletic Brewing","Bell's","Dogfish Head","Ever Grain","Fat Head's","Lawson's Finest","Maine Beer Company","New Trail","Sierra Nevada","Stone","Toppling Goliath","Tröegs","Victory","Dewey Beer","Ghostfish","Prairie","Tired Hands","Cigar City","Deschutes","Founders","Rogue","Rhinegeist","Sixpoint","Yards","Brooklyn Brewery","New Belgium","Lagunitas"] },
  { name:"Bethel Beer and More",kind:"Beer distributor",area:"Bethel Park",address:"441 McMurray Rd, Bethel Park, PA 15102",phone:"4128352255",website:"https://www.bethelbeer.com/",source:"https://www.bethelbeer.com/",summary:"Pittsburgh craft favorites alongside other beer, cider and specialty selections.",reasons:["Local craft beer","Singles and kegs","Call-ahead and curbside pickup"] },
  {"name":"Bierport","hours":["Mon–Wed: 12–10 PM","Thu–Sat: 12–11 PM","Sun: 12–8 PM"],"hoursSource":"https://bierport.com/index.html","kind":"Bottle shop & taproom","area":"Lawrenceville","address":"4115 Butler St, Pittsburgh, PA 15201","phone":"4129044248","website":"https://bierport.com/","source":"https://bierport.com/","summary":"Curated local and imported beer for takeaway, plus an underground taproom connected to Row House Cinema.","reasons":["Underground taproom","19 rotating draft options","Beer to enjoy on-site or take home","Connected to Row House Cinema"],"brands":["Cinderlands","Dancing Gnome","Hitchhiker","East End"]},
  {"name":"Liberty Beer","kind":"Beer distributor","area":"Bloomfield","address":"4133 Liberty Ave, Pittsburgh, PA 15224","phone":"4126837478","source":"https://www.google.com/maps/search/?api=1&query=Liberty+Beer+Pittsburgh","summary":"Neighborhood beer retailer noted for a varied craft selection and walk-in cooler.","reasons":["Walk-in beer cooler","Craft beer singles","Local and seasonal varieties"]},
  {"name":"Duffy’s Beer & Much More","kind":"Beer distributor","area":"South Hills","address":"294 Curry Hollow Rd, Pittsburgh, PA 15236","phone":"4126532337","website":"https://duffysbeer.com/","source":"https://shopduffys.cloudretailer.com/","summary":"Large-format beer store with rotating craft styles, imports, keg orders, and homebrewing supplies.","reasons":["Homebrewing supplies","Craft beer and imports","Keg and party supplies"]},
  {"name":"Hampton Beer Outlet","hours":["Mon–Thu: 10 AM–8 PM","Fri–Sat: 9 AM–9 PM","Sun: 10 AM–6 PM"],"hoursSource":"https://hamptonbeeroutlet.com/","kind":"Beer distributor","area":"Allison Park","address":"4706 William Flinn Hwy, Allison Park, PA 15101","phone":"4122130475","website":"https://hamptonbeeroutlet.com/","source":"https://hamptonbeeroutlet.com/","summary":"Route 8 beer retailer advertising Pittsburgh craft beers, imports, and tasting events.","reasons":["Local craft beer","Tasting events","Giveaways and imports"]},
  {"name":"The Brew House","kind":"Beer distributor","area":"Gibsonia","address":"300 Northtowne Square, Gibsonia, PA 15044","phone":"7244444473","website":"https://thebrewhousepa.com/","source":"https://thebrewhousepa.com/home-2/","summary":"Craft retailer offering mixed four-packs, growler fills and special ordering.","reasons":["Mix your own four-pack","Growler fills","Special orders","Growler club"],"brands":["Butler Brew Works","Hitchhiker","Shubrew"]},
  {"name":"House of 1000 Beers","kind":"Bottle shop & taproom","area":"New Kensington","address":"357 Freeport St, New Kensington, PA 15068","phone":"7243377666","website":"https://houseof1000beers.com/","source":"https://houseof1000beers.com/","summary":"Craft beer bottle shop and taproom with a restaurant and extensive beer choices.","reasons":["Beer to take home","On-site drafts","Restaurant"]},
  {"name":"Fischer’s Beverage","kind":"Beer distributor","area":"New Brighton","address":"400 9th St, New Brighton, PA 15066","phone":"7248432833","website":"https://www.beerdistributornewbrighton.com/","source":"https://www.beerdistributornewbrighton.com/","summary":"Beaver County beer retailer with craft, imports, and special-order options.","reasons":["Craft beer selection","Special orders","Keg orders"]},
  {"name":"Washington Beer Shop","kind":"Beer distributor","area":"Washington","address":"54 Trinity Point Dr, Washington, PA 15301","phone":"7242492973","website":"https://washingtonbeershop.com/","source":"https://washingtonbeershop.com/","summary":"Family-run retailer of craft and imported beer with several pack sizes and requested kegs.","reasons":["Singles and cases","Special requests","Kegs on demand"]},
  {"name":"D’s Six Pax & Dogz — Regent Square","kind":"Restaurant & beer to go","area":"Regent Square","address":"1118 S Braddock Ave, Swissvale, PA 15218","phone":"4122414666","website":"https://ds6pax.com/","source":"https://ds6pax.com/","summary":"Craft beer bar and restaurant offering take-home beer selections.","reasons":["Beer to take home","Draft beer","Restaurant"]},
  {"name":"D’s Six Pax & Dogz — Murrysville","kind":"Restaurant & beer to go","area":"Murrysville","address":"4608 William Penn Hwy, Murrysville, PA 15668","phone":"7245192128","website":"https://ds6pax.com/","source":"https://ds6pax.com/locations/","summary":"Murrysville restaurant and craft beer bar offering take-home beer.","reasons":["Beer to take home","Craft beer","Restaurant"]},
  {"name":"Joe’s Beer Distributor","kind":"Beer distributor","area":"North Hills","address":"495 Lowries Run Rd, Pittsburgh, PA 15237","phone":"4123664441","source":"https://www.yellowpages.com/pittsburgh-pa/mip/joes-beer-distributor-5404771","summary":"Neighborhood beer distributor recommended locally for variety; call to confirm specific craft selections.","reasons":["Beer distributor","Call for craft availability"]},
  {"name":"Carson Street Deli & Craft Beer Bar","kind":"Restaurant & beer to go","area":"South Side","address":"1507 E Carson St, Pittsburgh, PA 15203","phone":"4123815335","website":"https://www.carsonstreetdeliandcraftbeerbar.com/","source":"https://www.carsonstreetdeliandcraftbeerbar.com/wp-content/uploads/2025/09/csd-dine-in-menu-2025_cs4.pdf","summary":"South Side deli and craft beer bar with mix-and-match six-packs to go, as shown on its published menu.","reasons":["Mix-and-match craft six-packs","Deli and craft beer bar","Selection varies"]},
  {"name":"Save-Mor Beer & Pop Warehouse","kind":"Beer distributor","area":"Squirrel Hill","address":"4516 Browns Hill Rd, Pittsburgh, PA 15217","phone":"4124218550","website":"https://www.savemorbeer.com/","source":"https://www.savemorbeer.com/","summary":"Squirrel Hill-area beer distributor whose published events include Cinderlands beer sampling.","reasons":["Packaged beer","Local beer tastings","Cinderlands tasting listed"]},
];


/** Site-wide geographic regions; avoid guessing an item's region from its postal city. */
export function retailerRegion(item: Retailer): "Pittsburgh" | "North" | "South" | "East" | "West" | "Surrounding Counties" {
  switch(item.area) {
    case "Lawrenceville":
    case "Bloomfield":
    case "South Side":
    case "Squirrel Hill":
      return "Pittsburgh";
    case "North Hills":
    case "Gibsonia":
    case "Allison Park":
      return "North";
    case "Bethel Park":
    case "South Hills":
      return "South";
    case "Regent Square":
    case "Murrysville":
    case "New Kensington":
      return "East";
    case "Sewickley":
    case "New Brighton":
      return "West";
    default:
      return "Surrounding Counties";
  }
}
