import type { APIRoute } from "astro";

export const GET: APIRoute = async (context) => {
  const url = new URL(context.request.url);
  
  // Read Client ID from Cloudflare Bindings or Astro process env
  const rawClientId = context.locals.runtime?.env?.GOOGLE_CLIENT_ID || import.meta.env.GOOGLE_CLIENT_ID;
  const clientId = rawClientId?.trim();

  if (!clientId) {
    console.error("GOOGLE_CLIENT_ID is not configured in the environment.");
    return new Response("Configuration Error: Client ID is missing.", { status: 500 });
  }

  // Dynamically compute the redirect URI based on the request origin (localhost or production domain)
  const redirectUri = `${url.origin}/api/auth/callback`;

  const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?` + new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    response_type: "code",
    scope: "openid email profile",
    access_type: "online",
    prompt: "consent"
  }).toString();

  return context.redirect(googleAuthUrl);
};
