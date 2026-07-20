import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const isMock = !supabaseUrl || supabaseUrl.includes("placeholder") || !supabaseAnonKey;
  const cookieStore = await cookies();

  if (isMock) {
    return {
      auth: {
        async signUp({ email, password, options }: any) {
          const isAdmin = email === "admin@resumeos.app" || email?.endsWith("@admin.com");
          const user = {
            id: "12345678-1234-1234-1234-1234567890ab",
            email,
            user_metadata: {
              username: options?.data?.username || email.split("@")[0],
              role: isAdmin ? "admin" : "user",
            },
          };
          cookieStore.set("sb-mock-session", JSON.stringify(user));
          return { data: { user }, error: null };
        },
        async signInWithPassword({ email, password }: any) {
          const isAdmin = email === "admin@resumeos.app" || email?.endsWith("@admin.com");
          const user = {
            id: "12345678-1234-1234-1234-1234567890ab",
            email,
            user_metadata: {
              username: email.split("@")[0],
              role: isAdmin ? "admin" : "user",
            },
          };
          cookieStore.set("sb-mock-session", JSON.stringify(user));
          return { data: { user }, error: null };
        },
        async signInWithOAuth({ provider }: any) {
          const user = {
            id: "12345678-1234-1234-1234-1234567890ab",
            email: `${provider}@oauth.com`,
            user_metadata: { username: provider, role: "user" },
          };
          cookieStore.set("sb-mock-session", JSON.stringify(user));
          return { data: { user }, error: null };
        },
        async signOut() {
          cookieStore.delete("sb-mock-session");
          return { error: null };
        },
        async getUser() {
          const session = cookieStore.get("sb-mock-session")?.value;
          if (session) {
            try {
              return { data: { user: JSON.parse(session) }, error: null };
            } catch {
              return { data: { user: null }, error: null };
            }
          }
          return { data: { user: null }, error: null };
        },
      },
    } as any;
  }

  return createServerClient(
    supabaseUrl!,
    supabaseAnonKey!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // Ignored when called from Server Components during render.
          }
        },
      },
    }
  );
}
