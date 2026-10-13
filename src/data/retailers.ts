export type Retailer = {
  name: string; kind: "Bottle shop" | "Beer distributor"; area: string;
  address: string; phone: string; website: string; source: string;
  reasons: string[]; brands?: string[];
  summary: string;
  coordinates?: {lat:number; lng:number};
};

export const retailers: Retailer[] = [
  { name:"Hal’s Bottle Shop",coordinates:{lat:40.5246964,lng:-80.016449},kind:"Bottle shop",area:"North Hills",address:"3225 Babcock Blvd, Pittsburgh, PA 15237",phone:"4123643230",website:"https://www.halsbar.com/bottle-shop",source:"https://www.halsbar.com/bottle-shop",summary:"Build-your-own six-packs, local craft selections, and beers that can be harder to find.",reasons:["Build your own six-pack","Rare Beer Club — ask the shop about current rules","Current selection linked through Untappd"],brands:["Abjuration","Cinderlands","Coven","Dancing Gnome","Helltown","Hitchhiker","Lolev","Old Thunder"] },
  { name:"Beer Towne",coordinates:{lat:40.6683,lng:-80.0209},kind:"Beer distributor",area:"Gibsonia",address:"619 Warrendale Rd Suite 2, Gibsonia, PA 15044",phone:"7246877837",website:"https://beertowne.com/",source:"https://beertowne.com/breweries/",summary:"Local craft beer selection, new arrivals and a published list of represented breweries.",reasons:["Local brewery selection","Untappd beer menu","Curbside pickup and keg requests"],brands:["Brew Gentlemen","Cinderlands","Dancing Gnome","Eleventh Hour","Four Points"] },
  { name:"Creekside Beer",coordinates:{lat:40.614,lng:-80.1493},kind:"Beer distributor",area:"Sewickley",address:"2175 Big Sewickley Creek Rd, Sewickley, PA 15143",phone:"7242660700",website:"https://www.creeksidebeer.com/",source:"https://www.creeksidebeer.com/about-us",summary:"Local and wider craft selections with a searchable online catalog.",reasons:["Local and specialty craft beer","Online beer catalog","Drive-up lane and pickup"] },
  { name:"Babcock Beer",coordinates:{lat:40.510544,lng:-79.993672},kind:"Beer distributor",area:"North Hills",address:"2199 Babcock Blvd, Pittsburgh, PA",phone:"4128215009",website:"https://babcockbeer.com/",source:"https://babcockbeer.com/",summary:"North Hills beer distributor advertising a broad selection of craft beer.",reasons:["Craft beer selection","Singles, four-packs, six-packs and cases"] },
  { name:"Bethel Beer and More",kind:"Beer distributor",area:"Bethel Park",address:"441 McMurray Rd, Bethel Park, PA 15102",phone:"4128352255",website:"https://www.bethelbeer.com/",source:"https://www.bethelbeer.com/",summary:"Pittsburgh craft favorites alongside other beer, cider and specialty selections.",reasons:["Local craft beer","Singles and kegs","Call-ahead and curbside pickup"] }
];

