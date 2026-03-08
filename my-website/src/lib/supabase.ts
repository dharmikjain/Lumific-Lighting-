import { createServerClient } from "@supabase/ssr";
import { auth } from "@clerk/nextjs/server";

export async function createClerkSupabaseClient() {
  const { getToken } = await auth();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      global: {
        fetch: async (url, options = {}) => {
          const clerkToken = await getToken({
            template: "supabase",
          });

          const headers = new Headers(options?.headers);
          if (clerkToken) {
            headers.set("Authorization", `Bearer ${clerkToken}`);
          }

          return fetch(url, {
            ...options,
            headers,
          });
        },
      },
      cookies: {
        getAll() {
          return [];
        },
        setAll() {},
      },
    }
  );
}
