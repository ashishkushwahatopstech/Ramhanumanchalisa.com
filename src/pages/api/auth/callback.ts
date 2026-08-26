import type { APIRoute } from "astro";

export const GET: APIRoute = async (context) => {
  const url = new URL(context.request.url);
  const code = url.searchParams.get("code");

  if (!code) {
    return new Response("Authorization code missing", { status: 400 });
  }

  // Retrieve environment variables dynamically from Cloudflare bindings or fallback
  const rawClientId = context.locals.runtime?.env?.GOOGLE_CLIENT_ID || import.meta.env.GOOGLE_CLIENT_ID;
  const rawClientSecret = context.locals.runtime?.env?.GOOGLE_CLIENT_SECRET || import.meta.env.GOOGLE_CLIENT_SECRET;
  
  const clientId = rawClientId?.trim();
  const clientSecret = rawClientSecret?.trim();

  if (!clientId || !clientSecret) {
    console.error("Authentication environment variables are not configured.");
    return new Response("Configuration Error: Credentials are missing.", { status: 500 });
  }

  const redirectUri = `${url.origin}/api/auth/callback`;

  try {
    // Exchange authorization code for tokens
    const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        code,
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirectUri,
        grant_type: "authorization_code",
      }),
    });

    if (!tokenResponse.ok) {
      const errText = await tokenResponse.text();
      console.error("Token exchange failed:", errText);
      return new Response("Failed to exchange token", { status: 500 });
    }

    const tokens = await tokenResponse.json() as { access_token: string; id_token?: string };

    // Fetch user info from Google
    const userInfoResponse = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
      headers: {
        Authorization: `Bearer ${tokens.access_token}`,
      },
    });

    if (!userInfoResponse.ok) {
      return new Response("Failed to fetch user info", { status: 500 });
    }

    const userInfo = await userInfoResponse.json() as { email: string };
    const allowedEmail = "ashishkushwaha88643@gmail.com";

    if (userInfo.email !== allowedEmail) {
      return context.redirect("/unauthorized");
    }

    // Set secure session cookie
    context.cookies.set("admin_session", "authenticated", {
      path: "/",
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      maxAge: 60 * 60 * 24, // 24 hours
    });

    return context.redirect("/admin");
  } catch (error) {
    console.error("OAuth Callback Error:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
};
