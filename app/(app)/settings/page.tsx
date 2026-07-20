"use client";

import { useState } from "react";
import { PageHeader } from "@/components/shared/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Settings, Shield, User, Bell, Trash2 } from "lucide-react";
import { toast } from "sonner";

export default function SettingsPage() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("user@resumeos.app");
  const [notifications, setNotifications] = useState(true);

  const handleSave = () => {
    setLoading(true);
    setTimeout(() => {
      toast.success("Account settings updated.");
      setLoading(false);
    }, 500);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Settings"
        description="Manage your account settings, credentials, and notification preferences."
      />

      <Tabs defaultValue="account" className="w-full">
        <TabsList className="grid grid-cols-3 max-w-md mb-6">
          <TabsTrigger value="account" className="text-xs font-semibold gap-1.5">
            <User className="h-3.5 w-3.5" /> Account
          </TabsTrigger>
          <TabsTrigger value="notifications" className="text-xs font-semibold gap-1.5">
            <Bell className="h-3.5 w-3.5" /> Notifications
          </TabsTrigger>
          <TabsTrigger value="security" className="text-xs font-semibold gap-1.5">
            <Shield className="h-3.5 w-3.5" /> Security
          </TabsTrigger>
        </TabsList>

        {/* Account Tab Content */}
        <TabsContent value="account">
          <Card className="border-border bg-card shadow-sm rounded-xl max-w-2xl">
            <CardHeader className="pb-4">
              <CardTitle className="text-base font-semibold">Account Configurations</CardTitle>
              <CardDescription className="text-xs">Update your primary registration email.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1">
                <Label className="text-xxs font-semibold">Email Address</Label>
                <Input value={email} onChange={(e) => setEmail(e.target.value)} className="text-xs h-9 rounded-lg" />
              </div>
              <Button onClick={handleSave} disabled={loading} className="rounded-full bg-brand text-brand-foreground hover:bg-brand/90 font-semibold text-xs h-9 px-6 shadow-sm">
                {loading ? "Saving..." : "Save changes"}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications Tab Content */}
        <TabsContent value="notifications">
          <Card className="border-border bg-card shadow-sm rounded-xl max-w-2xl">
            <CardHeader className="pb-4">
              <CardTitle className="text-base font-semibold">Email Notifications</CardTitle>
              <CardDescription className="text-xs">Configure daily application tracking alerts.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 border rounded-lg bg-muted/10">
                <div className="space-y-0.5">
                  <h5 className="text-xs font-bold text-foreground">Weekly Digest</h5>
                  <p className="text-xxs text-muted-foreground">Receive updates on application stages status.</p>
                </div>
                <input
                  type="checkbox"
                  checked={notifications}
                  onChange={(e) => setNotifications(e.target.checked)}
                  className="accent-brand h-4 w-4"
                />
              </div>
              <Button onClick={handleSave} disabled={loading} className="rounded-full bg-brand text-brand-foreground hover:bg-brand/90 font-semibold text-xs h-9 px-6 shadow-sm">
                {loading ? "Saving..." : "Save changes"}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Tab Content */}
        <TabsContent value="security">
          <Card className="border-border bg-card shadow-sm rounded-xl max-w-2xl">
            <CardHeader className="pb-4">
              <CardTitle className="text-base font-semibold">Danger Zone</CardTitle>
              <CardDescription className="text-xs">Permanently remove profile data records from databases.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-xs text-muted-foreground leading-relaxed">
                Deleting your account is permanent. All resume layouts, published portfolios, and tracking logs will be immediately removed.
              </p>
              <Button variant="destructive" className="rounded-full font-semibold text-xs h-9 px-6 shadow-sm gap-1">
                <Trash2 className="h-4 w-4" />
                Delete Account
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
