import { notFound } from "next/navigation";
import { getPublicPortfolio } from "@/src/features/portfolios/actions";
import { ShieldCheck } from "lucide-react";
import { headers } from "next/headers";

interface PublicPortfolioPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function PublicPortfolioPage({ params }: PublicPortfolioPageProps) {
  const { slug } = await params;
  const portfolio = await getPublicPortfolio(slug);

  if (!portfolio) {
    notFound();
  }

  const { theme, blocksJson } = portfolio;

  // Select layout style configurations based on the theme parameter
  let themeClass = "bg-white text-zinc-900 font-sans";
  let blockWrapper = "max-w-2xl mx-auto space-y-12 py-16 px-6";

  if (theme === "dev") {
    themeClass = "bg-zinc-950 text-zinc-350 font-mono";
  } else if (theme === "editorial") {
    themeClass = "bg-[#faf9f6] text-[#1c1c1c] font-serif";
  } else if (theme === "aura") {
    themeClass = "bg-gradient-to-b from-violet-500/5 to-background text-foreground font-sans";
  }

  return (
    <div className={`min-h-screen ${themeClass}`}>
      <div className={blockWrapper}>
        {blocksJson.map((block) => {
          if (!block.visible) return null;

          if (block.type === "hero") {
            return (
              <header key={block.id} className="space-y-4 text-left border-b border-border pb-8">
                {theme === "dev" && <span className="text-xxs font-bold text-emerald-500">~/profile</span>}
                <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                  {block.data.heading || "Hi, I'm a developer"}
                </h1>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {block.data.subheading || "Building modern responsive apps"}
                </p>
              </header>
            );
          }

          if (block.type === "about") {
            return (
              <section key={block.id} className="space-y-3 text-left">
                {theme === "dev" && <span className="text-xxs font-bold text-emerald-500">~/bio</span>}
                <h2 className="text-lg font-bold text-foreground">Biography</h2>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {block.data.text || "No biography provided."}
                </p>
              </section>
            );
          }

          return null;
        })}

        {/* Footer Credit */}
        <footer className="border-t border-border pt-12 flex justify-between items-center text-xxs text-muted-foreground mt-20">
          <span>&copy; {new Date().getFullYear()} Published with ResumeOS</span>
          <span className="flex items-center gap-1">
            <ShieldCheck className="h-3.5 w-3.5" />
            Verified Profile
          </span>
        </footer>
      </div>
    </div>
  );
}
