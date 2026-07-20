import { createBrowserClient } from "@supabase/ssr";

function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)"));
  return match ? decodeURIComponent(match[2]) : null;
}

function setCookie(name: string, value: string) {
  if (typeof document === "undefined") return;
  document.cookie = `${name}=${encodeURIComponent(value)}; path=/; max-age=2592000; SameSite=Lax`;
}

function deleteCookie(name: string) {
  if (typeof document === "undefined") return;
  document.cookie = `${name}=; path=/; max-age=0; SameSite=Lax`;
}

export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const isMock = !supabaseUrl || supabaseUrl.includes("placeholder") || !supabaseAnonKey;

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
          setCookie("sb-mock-session", JSON.stringify(user));
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
          setCookie("sb-mock-session", JSON.stringify(user));
          return { data: { user }, error: null };
        },
        async signInWithOAuth({ provider }: any) {
          const user = {
            id: "12345678-1234-1234-1234-1234567890ab",
            email: `${provider}@oauth.com`,
            user_metadata: { username: provider, role: "user" },
          };
          setCookie("sb-mock-session", JSON.stringify(user));
          return { data: { user }, error: null };
        },
        async signOut() {
          deleteCookie("sb-mock-session");
          return { error: null };
        },
        async getUser() {
          const session = getCookie("sb-mock-session");
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

  return createBrowserClient(supabaseUrl!, supabaseAnonKey!);
}
