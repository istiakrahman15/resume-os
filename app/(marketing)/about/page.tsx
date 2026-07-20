import Link from "next/link";
import { Globe, Heart, ShieldCheck, User } from "lucide-react";
import { GithubIcon } from "@/components/shared/brand-icons";
import { siteConfig } from "@/src/config/site";
import { Button } from "@/components/ui/button";

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12 md:py-20 space-y-12">
      <div className="space-y-4 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
          About ResumeOS
        </h1>
        <p className="text-base text-muted-foreground leading-relaxed max-w-xl mx-auto">
          A modern, open-source SaaS designed for engineers, developers, designers, and job seekers.
        </p>
      </div>

      {/* Developer Credit */}
      <div className="border border-border rounded-2xl bg-card p-6 md:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <div className="h-16 w-16 rounded-full bg-brand/10 text-brand flex items-center justify-center shrink-0 border border-brand/20">
            <User className="h-8 w-8" />
          </div>
          <div className="space-y-1.5 text-center sm:text-left">
            <h3 className="text-lg font-bold text-foreground">Meet the Developer</h3>
            <h2 className="text-xl font-extrabold text-brand">{siteConfig.developer.name}</h2>
            <p className="text-xs text-muted-foreground">
              Software Engineer committed to building clean developer tools and user-centric products.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 pt-2">
          <a href={siteConfig.developer.portfolio} target="_blank" rel="noreferrer">
            <Button size="sm" variant="outline" className="gap-2">
              <Globe className="h-4 w-4 text-muted-foreground" />
              <span>Portfolio</span>
            </Button>
          </a>
          <a href={siteConfig.developer.github} target="_blank" rel="noreferrer">
            <Button size="sm" variant="outline" className="gap-2">
              <GithubIcon className="h-4 w-4 text-muted-foreground" />
              <span>GitHub</span>
            </Button>
          </a>
          <a href={siteConfig.developer.support} target="_blank" rel="noreferrer">
            <Button size="sm" className="bg-brand text-brand-foreground hover:bg-brand/90 gap-2">
              <Heart className="h-4 w-4 fill-current" />
              <span>Support Istiak</span>
            </Button>
          </a>
        </div>
      </div>

      {/* Vision & Licensing details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs sm:text-sm text-muted-foreground leading-relaxed">
        <div className="space-y-3">
          <h4 className="font-bold text-foreground flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-brand" />
            MIT License
          </h4>
          <p>
            ResumeOS is completely open source under the MIT License. Feel free to copy parts of the code, customize it for your private self-hosting setups, or contribute templates back to the public repository.
          </p>
        </div>
        <div className="space-y-3">
          <h4 className="font-bold text-foreground flex items-center gap-2">
            <Heart className="h-4 w-4 text-brand" />
            Support Open Source
          </h4>
          <p>
            Open source projects thrive on community engagement. If ResumeOS helped you land a job, please consider sharing the project, staring our GitHub repository, or supporting development directly.
          </p>
        </div>
      </div>
    </div>
  );
}
