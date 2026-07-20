import { notFound } from "next/navigation";
import { siteConfig } from "@/src/config/site";

interface Props {
  params: Promise<{ username: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { username } = await params;
  return {
    title: `@${username} — ${siteConfig.name}`,
    description: `View ${username}'s public professional profile on ${siteConfig.name}.`,
  };
}

export default async function PublicProfilePage({ params }: Props) {
  const { username } = await params;

  // In production this would query db for the user's public profile
  // For now, render a polished public profile shell
  const profile = {
    displayName: username.charAt(0).toUpperCase() + username.slice(1),
    headline: "Software Engineer",
    bio: "Building modern SaaS tools with Next.js, TypeScript, and AI integrations.",
    resumeCount: 3,
    portfolioCount: 1,
  };

  if (!profile) notFound();

  return (
    <div className="min-h-screen bg-background">
      {/* Hero banner */}
      <div className="relative h-44 bg-gradient-to-br from-brand/30 via-brand/10 to-transparent" />

      <div className="max-w-2xl mx-auto px-6 -mt-16">
        {/* Avatar */}
        <div className="h-24 w-24 rounded-full border-4 border-background bg-brand/10 flex items-center justify-center text-brand text-2xl font-extrabold shadow-lg">
          {profile.displayName.charAt(0)}
        </div>

        <div className="mt-4 space-y-1">
          <h1 className="text-xl font-extrabold text-foreground">{profile.displayName}</h1>
          <p className="text-sm text-muted-foreground font-medium">@{username}</p>
          <p className="text-xs text-muted-foreground mt-1">{profile.headline}</p>
        </div>

        <p className="text-sm text-foreground/80 leading-relaxed mt-4">{profile.bio}</p>

        {/* Stats */}
        <div className="flex gap-6 mt-6 pt-6 border-t border-border">
          <div className="text-center">
            <span className="text-lg font-extrabold text-foreground">{profile.resumeCount}</span>
            <p className="text-xxs text-muted-foreground font-semibold uppercase mt-0.5">Resumes</p>
          </div>
          <div className="text-center">
            <span className="text-lg font-extrabold text-foreground">{profile.portfolioCount}</span>
            <p className="text-xxs text-muted-foreground font-semibold uppercase mt-0.5">Portfolios</p>
          </div>
        </div>

        {/* Footer credit */}
        <p className="text-xxs text-muted-foreground/50 mt-12 pb-8">
          Powered by{" "}
          <a href="/" className="underline hover:text-brand transition-colors">
            {siteConfig.name}
          </a>
        </p>
      </div>
    </div>
  );
}
