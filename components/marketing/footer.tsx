import Link from "next/link";
import { GithubIcon, TwitterIcon } from "@/components/shared/brand-icons";
import { footerNav } from "@/src/config/nav";
import { siteConfig } from "@/src/config/site";

export function Footer() {
  return (
    <footer className="bg-card border-t border-border py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mb-12">
          {/* Brand info */}
          <div className="col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5 font-bold text-lg tracking-tight">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand text-brand-foreground text-base">
                R
              </span>
              <span className="text-foreground">{siteConfig.name}</span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-sm leading-relaxed">
              {siteConfig.description}
            </p>
            <div className="flex items-center gap-3">
              <a
                href={siteConfig.social.github}
                target="_blank"
                rel="noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <GithubIcon className="h-4 w-4" />
              </a>
              <a
                href={siteConfig.social.twitter}
                target="_blank"
                rel="noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <TwitterIcon className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Navigation Links columns */}
          {footerNav.map((col) => (
            <div key={col.label} className="space-y-3.5">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-foreground">
                {col.label}
              </h4>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Footer Credit & Copyright */}
        <div className="border-t border-border pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Built by{" "}
            <a
              href={siteConfig.developer.portfolio}
              target="_blank"
              rel="noreferrer"
              className="font-semibold underline hover:text-foreground transition-colors"
            >
              {siteConfig.developer.name}
            </a>
            . Licensed under{" "}
            <span className="font-semibold">{siteConfig.license}</span>.
          </p>
        </div>
      </div>
    </footer>
  );
}
