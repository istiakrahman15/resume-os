"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Save, Globe, Eye, Settings, ShieldAlert, Sparkles, Loader2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getPortfolioDetails, updatePortfolio } from "@/src/features/portfolios/actions";
import { toast } from "sonner";

export default function PortfolioEditorPage() {
  const params = useParams();
  const router = useRouter();
  const portfolioId = params.id as string;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // States for database fields
  const [slug, setSlug] = useState("");
  const [theme, setTheme] = useState("aura");
  const [status, setStatus] = useState("draft");
  const [blocks, setBlocks] = useState<any[]>([]);

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const ptf = await getPortfolioDetails(portfolioId);
        setSlug(ptf.slug);
        setTheme(ptf.theme);
        setStatus(ptf.status);
        setBlocks(ptf.blocksJson || []);
      } catch (err: any) {
        setError(err.message || "Failed to load portfolio details.");
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [portfolioId]);

  const handleSave = async (customStatus?: string) => {
    setSaving(true);
    const targetStatus = customStatus || status;
    try {
      await updatePortfolio(portfolioId, {
        slug,
        theme,
        status: targetStatus,
        blocksJson: blocks,
      });
      setStatus(targetStatus);
      toast.success("Changes saved successfully.");
    } catch (err: any) {
      toast.error(err.message || "Failed to save changes.");
    } finally {
      setSaving(false);
    }
  };

  const updateBlockData = (blockId: string, key: string, value: string) => {
    const updated = blocks.map((b) => {
      if (b.id === blockId) {
        return { ...b, data: { ...b.data, [key]: value } };
      }
      return b;
    });
    setBlocks(updated);
  };

  if (loading) {
    return (
      <div className="flex h-[calc(100vh-8rem)] items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-8 w-8 animate-spin text-brand" />
          <p className="text-xs text-muted-foreground">Loading portfolio editor...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-10rem)] flex flex-col gap-4">
      {/* Sub-Header bar */}
      <div className="flex items-center justify-between border-b border-border pb-4">
        <div className="flex items-center gap-3">
          <Link href="/portfolios">
            <Button variant="ghost" size="icon-sm" className="text-muted-foreground hover:text-foreground">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div className="space-y-0.5">
            <h1 className="text-sm font-bold text-foreground">/{slug}</h1>
            <p className="text-xxs text-muted-foreground capitalize">Status: {status}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {status !== "published" ? (
            <Button
              onClick={() => handleSave("published")}
              disabled={saving}
              variant="outline"
              className="rounded-full text-xs font-semibold h-9 px-6 border-brand/20 bg-brand/5 hover:bg-brand/10 text-brand shadow-sm gap-1.5"
            >
              <Globe className="h-4 w-4" />
              Publish Webpage
            </Button>
          ) : (
            <Button
              onClick={() => handleSave("draft")}
              disabled={saving}
              variant="outline"
              className="rounded-full text-xs font-semibold h-9 px-6 border-border"
            >
              Unpublish
            </Button>
          )}

          <Button
            onClick={() => handleSave()}
            disabled={saving}
            className="rounded-full bg-brand text-brand-foreground hover:bg-brand/90 font-semibold text-xs h-9 px-6 shadow-sm gap-1.5"
          >
            <Save className="h-4 w-4" />
            Save changes
          </Button>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-0">
        {/* Left pane: Block configurations */}
        <div className="lg:col-span-7 border border-border bg-card p-6 rounded-xl overflow-y-auto space-y-6">
          <h3 className="text-sm font-bold border-b pb-2">Page Content Blocks</h3>

          {blocks.map((block) => {
            if (block.type === "hero") {
              return (
                <div key={block.id} className="border border-border p-4 rounded-xl space-y-4 bg-muted/10">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-brand">Hero block</span>
                  <div className="space-y-3 pt-2">
                    <div className="space-y-1">
                      <Label className="text-xxs font-semibold">Heading Title</Label>
                      <Input size="sm" value={block.data.heading || ""} onChange={(e) => updateBlockData(block.id, "heading", e.target.value)} />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xxs font-semibold">Subheading Text</Label>
                      <Input size="sm" value={block.data.subheading || ""} onChange={(e) => updateBlockData(block.id, "subheading", e.target.value)} />
                    </div>
                  </div>
                </div>
              );
            }

            if (block.type === "about") {
              return (
                <div key={block.id} className="border border-border p-4 rounded-xl space-y-4 bg-muted/10">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-brand">About Bio Block</span>
                  <div className="space-y-1 pt-2">
                    <Label className="text-xxs font-semibold">Biography Details</Label>
                    <Textarea rows={4} value={block.data.text || ""} onChange={(e) => updateBlockData(block.id, "text", e.target.value)} className="text-xs" />
                  </div>
                </div>
              );
            }

            return null;
          })}
        </div>

        {/* Right pane: Themes & Global Configurations */}
        <div className="lg:col-span-5 border border-border bg-card p-6 rounded-xl overflow-y-auto space-y-4 flex flex-col">
          <h3 className="text-sm font-bold border-b pb-2">Page Settings</h3>

          <div className="space-y-1">
            <Label className="text-xxs font-semibold">Portfolio Theme</Label>
            <Select value={theme} onValueChange={(val) => setTheme(val || "")}>
              <SelectTrigger className="text-xs h-9 rounded-lg border-border">
                <SelectValue placeholder="Select theme template" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="aura" className="text-xs">Aura (Gradients accent)</SelectItem>
                <SelectItem value="mono" className="text-xs">Mono (Minimal Zinc)</SelectItem>
                <SelectItem value="editorial" className="text-xs">Editorial (Classic Serif)</SelectItem>
                <SelectItem value="dev" className="text-xs">Dev (Terminal Monospace)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1">
            <Label className="text-xxs font-semibold">URL Path slug</Label>
            <Input size="sm" value={slug} onChange={(e) => setSlug(e.target.value.toLowerCase().trim())} />
          </div>

          {status === "published" && (
            <div className="pt-4 border-t border-border/50 space-y-2">
              <span className="text-xxs font-bold text-muted-foreground uppercase">Public URL</span>
              <div className="flex items-center gap-2 p-2 border border-border rounded-lg bg-background/50 text-xs font-semibold text-brand">
                <Globe className="h-4 w-4" />
                <a href={`/${slug}`} target="_blank" rel="noreferrer" className="underline truncate flex-1">
                  resumeos.app/{slug}
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
