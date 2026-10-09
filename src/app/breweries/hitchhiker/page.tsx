import type { Metadata } from "next";
import BreweryProfilePage from "@/components/BreweryProfilePage";
import { breweryProfiles } from "@/data/breweryProfileContent";

export const metadata: Metadata = {
  title: "Hitchhiker Brewing Co. | Pittsburgh Brews",
  description: breweryProfiles["hitchhiker"].tagline,
};

export default function HitchhikerProfilePage() {
  return <BreweryProfilePage profile={breweryProfiles["hitchhiker"]} />;
}
