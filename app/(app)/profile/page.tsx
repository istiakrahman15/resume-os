"use client";

import { useEffect, useState } from "react";
import { PageHeader } from "@/components/shared/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Save, Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function ProfilePage() {
  const [loading, setLoading] = useState(false);
  const [displayName, setDisplayName] = useState("Aisha");
  const [headline, setHeadline] = useState("Software Engineer");
  const [bio, setBio] = useState("Passionate about building responsive modern SaaS tools.");

  const handleSave = () => {
    setLoading(true);
    setTimeout(() => {
      toast.success("Profile details updated.");
      setLoading(false);
    }, 500);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Public Profile"
        description="Manage details shared on opt-in public search results."
      />

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        {/* Profile configuration card */}
        <div className="md:col-span-8 space-y-4">
          <Card className="border-border bg-card shadow-sm rounded-xl">
            <CardHeader className="pb-4">
              <CardTitle className="text-base font-semibold">Biography Details</CardTitle>
              <CardDescription className="text-xs">Update your professional greeting credentials.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <Label className="text-xxs font-semibold">Display Name</Label>
                  <Input value={displayName} onChange={(e) => setDisplayName(e.target.value)} className="text-xs h-9" />
                </div>
                <div className="space-y-1">
                  <Label className="text-xxs font-semibold">Headline</Label>
                  <Input value={headline} onChange={(e) => setHeadline(e.target.value)} className="text-xs h-9" />
                </div>
              </div>

              <div className="space-y-1">
                <Label className="text-xxs font-semibold">Bio Description</Label>
                <Textarea rows={4} value={bio} onChange={(e) => setBio(e.target.value)} className="text-xs" />
              </div>

              <Button onClick={handleSave} disabled={loading} className="rounded-full bg-brand text-brand-foreground hover:bg-brand/90 font-semibold text-xs h-9 px-6 shadow-sm gap-1.5">
                <Save className="h-4 w-4" />
                {loading ? "Saving..." : "Save changes"}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Avatar overview column */}
        <div className="md:col-span-4">
          <Card className="border-border bg-card shadow-sm rounded-xl text-center">
            <CardHeader className="pb-4">
              <CardTitle className="text-base font-semibold">Profile Avatar</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 flex flex-col items-center justify-center py-6">
              <Avatar className="h-20 w-20 border-2 border-brand/20">
                <AvatarFallback className="bg-brand/10 text-brand text-lg font-bold">A</AvatarFallback>
              </Avatar>
              <div className="space-y-1">
                <h4 className="text-xs font-bold text-foreground">{displayName}</h4>
                <p className="text-xxs text-muted-foreground">{headline}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
