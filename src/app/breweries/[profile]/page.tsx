import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BreweryProfilePage from "@/components/BreweryProfilePage";
import { breweryProfiles } from "@/data/breweryProfileContent";

export function generateStaticParams() {
  return Object.keys(breweryProfiles).map((profile) => ({ profile }));
}

export async function generateMetadata({ params }: { params: Promise<{ profile: string }> }): Promise<Metadata> {
  const { profile: slug } = await params;
  const profile = breweryProfiles[slug];
  if (!profile) return {};
  return {
    title: `${profile.name} | Pittsburgh Brews`,
    description: profile.tagline,
  };
}

export default async function ProfilePage({ params }: { params: Promise<{ profile: string }> }) {
  const { profile: slug } = await params;
  const profile = breweryProfiles[slug];
  if (!profile) notFound();
  return <BreweryProfilePage profile={profile} />;
}
