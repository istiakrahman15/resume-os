"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles, FileText, Target, Mail, Globe, Briefcase, BarChart3, ChevronRight, CheckCircle2, ShieldCheck, HelpCircle } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { templateRegistry } from "@/src/config/templates";
import { siteConfig } from "@/src/config/site";

export default function LandingPage() {
  const [atsScore, setAtsScore] = useState(55);

  const features = [
    {
      icon: FileText,
      title: "Block-Based Resume Builder",
      description: "Build resumes easily with sections you can drag, drop, hide, and customize without visual clutter.",
    },
    {
      icon: Target,
      title: "ATS Optimization Engine",
      description: "Analyze your resume against job postings to receive a deterministic formatting and keyword score.",
    },
    {
      icon: Mail,
      title: "AI Cover Letter Generator",
      description: "Instantly draft highly tailored, professional cover letters written for specific companies.",
    },
    {
      icon: Globe,
      title: "One-Click Portfolio Sites",
      description: "Publish your resume data as a beautiful portfolio site on your own custom domain or subdomain.",
    },
    {
      icon: Briefcase,
      title: "Job Tracker Kanban Pipeline",
      description: "Organize applications in stages (Saved, Applied, Interviews, Offers) and view analytics.",
    },
    {
      icon: BarChart3,
      title: "Funnel Analytics & Insights",
      description: "Track resume response rates and view details on which templates perform the best.",
    },
  ];

  return (
    <div className="flex flex-col gap-20 pb-20 overflow-hidden">
      {/* 1. Hero Section */}
      <section className="relative px-6 pt-20 pb-16 md:pt-32 md:pb-24 max-w-7xl mx-auto w-full text-center">
        <div className="absolute inset-0 -z-10 flex items-center justify-center opacity-30">
          <div className="h-[400px] w-[600px] rounded-full bg-brand/20 blur-[100px] animate-pulse" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center gap-1.5 rounded-full bg-brand/10 px-3.5 py-1 text-xs font-semibold text-brand mb-6 border border-brand/20">
            <Sparkles className="h-3.5 w-3.5" />
            Open Source SaaS
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-foreground mb-6 leading-[1.1] md:leading-[1.05]">
            Build. Optimize. <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-brand to-violet-500 bg-clip-text text-transparent">
              Get Hired.
            </span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl leading-relaxed">
            ResumeOS is the ultimate open-source dashboard to build ATS-friendly resumes, generate cover letters, host your portfolio, and track job applications in one workspace.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <Link href="/signup" className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto rounded-full bg-brand text-brand-foreground hover:bg-brand/90 text-base font-semibold px-8 gap-2 shadow-md">
                Build Your Resume Free
                <ChevronRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/templates" className="w-full sm:w-auto">
              <Button size="lg" variant="outline" className="w-full sm:w-auto rounded-full text-base px-8">
                Browse Templates
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* Hero Interactive Mockup */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-16 md:mt-24 rounded-2xl border border-border bg-card shadow-2xl p-2 max-w-5xl mx-auto overflow-hidden bg-gradient-to-b from-card to-background"
        >
          <div className="rounded-xl overflow-hidden border border-border bg-background aspect-[16/10] flex items-center justify-center p-4">
            <div className="w-full h-full flex flex-col md:flex-row rounded-lg overflow-hidden border border-border bg-card">
              {/* Sidebar preview */}
              <div className="w-full md:w-56 bg-sidebar border-r border-border p-4 space-y-4 hidden md:block text-left">
                <div className="flex items-center gap-2 font-bold text-sm">
                  <span className="flex h-6 w-6 items-center justify-center rounded bg-brand text-brand-foreground text-xs">R</span>
                  <span>{siteConfig.name}</span>
                </div>
                <div className="space-y-1.5 pt-2">
                  <div className="h-7 bg-sidebar-accent rounded-md flex items-center px-2 text-xs font-semibold text-sidebar-accent-foreground gap-2">
                    <FileText className="h-3.5 w-3.5 text-brand" /> Resumes
                  </div>
                  <div className="h-7 rounded-md flex items-center px-2 text-xs text-muted-foreground gap-2">
                    <Mail className="h-3.5 w-3.5" /> Cover Letters
                  </div>
                  <div className="h-7 rounded-md flex items-center px-2 text-xs text-muted-foreground gap-2">
                    <Target className="h-3.5 w-3.5" /> ATS Score
                  </div>
                  <div className="h-7 rounded-md flex items-center px-2 text-xs text-muted-foreground gap-2">
                    <Briefcase className="h-3.5 w-3.5" /> Job Tracker
                  </div>
                </div>
              </div>
              {/* Main content body preview */}
              <div className="flex-1 bg-background p-6 flex flex-col text-left">
                <div className="flex justify-between items-center border-b border-border pb-4 mb-6">
                  <div>
                    <h3 className="text-base font-bold">My Resumes</h3>
                    <p className="text-xxs text-muted-foreground">Manage and edit your career documents.</p>
                  </div>
                  <Button size="xs" className="bg-brand text-brand-foreground">New Resume</Button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-1">
                  <div className="border border-border rounded-xl p-4 flex flex-col justify-between hover:border-brand/35 transition-colors bg-card/40">
                    <div className="space-y-1">
                      <div className="h-4 w-32 bg-muted rounded animate-pulse" />
                      <div className="h-3 w-20 bg-muted/60 rounded animate-pulse" />
                    </div>
                    <div className="flex justify-between items-center pt-8">
                      <span className="text-xxs text-brand font-semibold bg-brand/10 px-2 py-0.5 rounded-full">Score: 92%</span>
                      <span className="text-xxs text-muted-foreground">Updated 2h ago</span>
                    </div>
                  </div>
                  <div className="border border-border rounded-xl p-4 flex flex-col justify-between hover:border-brand/35 transition-colors bg-card/40">
                    <div className="space-y-1">
                      <div className="h-4 w-36 bg-muted rounded animate-pulse" />
                      <div className="h-3 w-16 bg-muted/60 rounded animate-pulse" />
                    </div>
                    <div className="flex justify-between items-center pt-8">
                      <span className="text-xxs text-amber-500 font-semibold bg-amber-500/10 px-2 py-0.5 rounded-full">Score: 78%</span>
                      <span className="text-xxs text-muted-foreground">Updated 1d ago</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* 2. Logo Bar */}
      <section className="border-y border-border bg-card/30 py-8 text-center">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-xs uppercase font-bold tracking-widest text-muted-foreground/75 mb-6">
            Loved by builders from around the world
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-60 grayscale dark:invert">
            <span className="text-sm font-extrabold tracking-tight">VERCEL</span>
            <span className="text-sm font-extrabold tracking-tight">LINEAR</span>
            <span className="text-sm font-extrabold tracking-tight">STRIPE</span>
            <span className="text-sm font-extrabold tracking-tight">NOTION</span>
            <span className="text-sm font-extrabold tracking-tight">GITHUB</span>
          </div>
        </div>
      </section>

      {/* 3. Feature Grid */}
      <section id="features" className="max-w-7xl mx-auto px-6 w-full scroll-mt-20">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-4">
            Everything you need to land your next job
          </h2>
          <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
            Consolidate your entire document pipeline into one beautiful, highly integrated dashboard workspace.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div
                key={idx}
                className="border border-border rounded-2xl p-6 bg-card hover:border-brand/40 hover:shadow-lg transition-all duration-300 flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  <div className="h-10 w-10 rounded-xl bg-brand/5 border border-brand/10 text-brand flex items-center justify-center group-hover:bg-brand/10 group-hover:border-brand/20 transition-colors">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-base font-semibold text-foreground">{feature.title}</h3>
                  <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. Interactive ATS visual Section */}
      <section className="max-w-7xl mx-auto px-6 w-full">
        <div className="border border-border rounded-2xl bg-card/40 p-6 md:p-12 grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-gradient-to-br from-card/50 to-transparent">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold tracking-tight">ATS Scoring Visualizer</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Don't guess how systems parse your data. ResumeOS runs deterministic algorithm checks to quantify metrics, action verbs, section completeness, formatting parameters, and key overlaps.
            </p>
            <div className="space-y-3">
              <label className="text-xs font-semibold text-muted-foreground uppercase">Simulated Resume Fixes</label>
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  min="40"
                  max="98"
                  value={atsScore}
                  onChange={(e) => setAtsScore(Number(e.target.value))}
                  className="w-full accent-brand"
                />
                <span className="text-sm font-bold w-12 text-right">{atsScore}%</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                <CheckCircle2 className="h-4 w-4 text-brand" />
                <span>Deterministic explanation of keyword overlap</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                <CheckCircle2 className="h-4 w-4 text-brand" />
                <span>Inline suggestions directly linked to database records</span>
              </div>
            </div>
          </div>
          <div className="rounded-xl border border-border bg-background p-6 space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold uppercase text-muted-foreground">Resume Health Report</span>
              <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${atsScore >= 80 ? "bg-emerald-500/10 text-emerald-500" : atsScore >= 60 ? "bg-amber-500/10 text-amber-500" : "bg-destructive/10 text-destructive"}`}>
                {atsScore >= 80 ? "Excellent" : atsScore >= 60 ? "Average" : "Critical Fixes Needed"}
              </span>
            </div>
            <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-brand rounded-full transition-all duration-300" style={{ width: `${atsScore}%` }} />
            </div>
            <ul className="space-y-2.5 text-xs">
              <li className="flex justify-between items-center text-muted-foreground">
                <span>Keyword Match (TF-IDF)</span>
                <span className="font-semibold">{atsScore >= 80 ? "Matched" : "Missing key tokens"}</span>
              </li>
              <li className="flex justify-between items-center text-muted-foreground">
                <span>Action verbs usage</span>
                <span className="font-semibold">{atsScore >= 70 ? "Strong (12)" : "Weak verbs (3)"}</span>
              </li>
              <li className="flex justify-between items-center text-muted-foreground">
                <span>Quantifiable accomplishments</span>
                <span className="font-semibold">{atsScore >= 85 ? "Quantified" : "Add numbers/metrics"}</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* 5. Template Preview */}
      <section className="max-w-7xl mx-auto px-6 w-full">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl font-bold tracking-tight">Premium Resume Templates</h2>
          <p className="text-sm text-muted-foreground leading-relaxed mt-2">
            Pick from our library of beautiful, ATS-friendly templates curated for developers, designers, and managers.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {templateRegistry.slice(0, 3).map((template) => (
            <div key={template.id} className="border border-border rounded-xl bg-card overflow-hidden group hover:border-brand/40 transition-all flex flex-col">
              <div className="aspect-[4/5] bg-muted/30 flex items-center justify-center p-4 border-b border-border relative">
                <FileText className="h-16 w-16 text-muted-foreground/35 group-hover:scale-110 transition-transform duration-300" />
                <span className="absolute top-3 right-3 text-xxs font-semibold bg-brand/10 text-brand px-2 py-0.5 rounded-full uppercase">
                  {template.tier}
                </span>
              </div>
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="text-sm font-bold text-foreground">{template.name}</h4>
                  <p className="text-xxs text-muted-foreground mt-1">{template.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. How it works Section */}
      <section className="max-w-7xl mx-auto px-6 w-full text-center">
        <h2 className="text-3xl font-bold tracking-tight mb-16">Three steps to your next job</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand text-brand-foreground font-bold text-sm mx-auto">1</span>
            <h3 className="text-base font-semibold">Write and Compile</h3>
            <p className="text-xs text-muted-foreground max-w-xs mx-auto leading-relaxed">
              Input sections using our block editor. Autocomplete with smart AI tips.
            </p>
          </div>
          <div className="space-y-4">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand text-brand-foreground font-bold text-sm mx-auto">2</span>
            <h3 className="text-base font-semibold">Scan and Optimize</h3>
            <p className="text-xs text-muted-foreground max-w-xs mx-auto leading-relaxed">
              Paste the target job description and fix flagged ATS problems in seconds.
            </p>
          </div>
          <div className="space-y-4">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand text-brand-foreground font-bold text-sm mx-auto">3</span>
            <h3 className="text-base font-semibold">Export and Track</h3>
            <p className="text-xs text-muted-foreground max-w-xs mx-auto leading-relaxed">
              Stream clean PDFs, host custom domain sites, and keep pipelines organized.
            </p>
          </div>
        </div>
      </section>

      {/* 7. FAQ accordion */}
      <section className="max-w-4xl mx-auto px-6 w-full scroll-mt-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight">Frequently Asked Questions</h2>
        </div>

        <Accordion className="w-full">
          <AccordionItem value="item-1" className="border-b border-border">
            <AccordionTrigger className="text-sm font-semibold py-4 text-left">Is ResumeOS really open source?</AccordionTrigger>
            <AccordionContent className="text-xs text-muted-foreground leading-relaxed pb-4">
              Yes, ResumeOS is licensed under the MIT License. You can inspect, modify, fork, and self-host the code via GitHub and run the application entirely locally.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2" className="border-b border-border">
            <AccordionTrigger className="text-sm font-semibold py-4 text-left">How does the ATS score calculator work?</AccordionTrigger>
            <AccordionContent className="text-xs text-muted-foreground leading-relaxed pb-4">
              We run deterministic calculations checking structural parameters (e.g. single-column structure, section names), word weights, quantification ratios, and specific formatting overlaps instead of simple black box scores.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3" className="border-b border-border">
            <AccordionTrigger className="text-sm font-semibold py-4 text-left">Can I host my portfolio with a custom domain?</AccordionTrigger>
            <AccordionContent className="text-xs text-muted-foreground leading-relaxed pb-4">
              Yes, our Pro subscription includes support for mapping CNAME entries directly to hosted pages with automatic SSL generation.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>

      {/* 8. CTA Band */}
      <section className="max-w-5xl mx-auto px-6 w-full text-center">
        <div className="bg-gradient-to-r from-brand to-violet-600 text-brand-foreground rounded-2xl p-8 md:p-12 shadow-xl space-y-6">
          <h2 className="text-3xl font-bold tracking-tight">Ready to boost your hireability rate?</h2>
          <p className="text-sm opacity-90 max-w-xl mx-auto leading-relaxed">
            Create a free account to experience the next-generation career builder built on Next.js and Tailwind CSS.
          </p>
          <div className="pt-2">
            <Link href="/signup">
              <Button size="lg" className="bg-background text-brand hover:bg-background/95 rounded-full font-bold px-8 shadow-md">
                Get Started Now
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
