import Link from "next/link";
import { Mail, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function VerifyEmailPage() {
  return (
    <div className="space-y-6 text-center py-6">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand/10 text-brand mx-auto mb-2">
        <Mail className="h-6 w-6 stroke-[1.5]" />
      </div>
      <div className="space-y-2">
        <h2 className="text-xl font-bold tracking-tight text-foreground font-heading">Verify your email</h2>
        <p className="text-xs text-muted-foreground leading-relaxed max-w-xs mx-auto">
          We have sent a verification link to your email address. Please click the link to activate your account.
        </p>
      </div>
      <div className="pt-4 space-y-2">
        <Link href="/login" className="block">
          <Button className="w-full bg-brand text-brand-foreground hover:bg-brand/90 text-xs font-semibold h-9">
            Proceed to sign in
          </Button>
        </Link>
        <Link href="/" className="block">
          <Button variant="ghost" className="w-full text-xs h-9">
            Back to homepage
          </Button>
        </Link>
      </div>
    </div>
  );
}
