import type { APIRoute } from "astro";
import { d1SaveContactSubmission } from "../../lib/d1";

declare global {
  var __CONTACT_SUBMISSIONS_CACHE__: Array<{ id: string; name: string; email: string; subject?: string; message: string; createdAt: string }> | undefined;
}

if (!globalThis.__CONTACT_SUBMISSIONS_CACHE__) {
  globalThis.__CONTACT_SUBMISSIONS_CACHE__ = [];
}

export const POST: APIRoute = async (context) => {
  try {
    const body = await context.request.json();
    const name = typeof body.name === "string" ? body.name.trim() : "";
    const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
    const subject = typeof body.subject === "string" ? body.subject.trim() : "Devotee Message";
    const message = typeof body.message === "string" ? body.message.trim() : "";

    if (!name || !email || !message) {
      return new Response(JSON.stringify({ error: "Please fill in all required fields (Name, Email, Message)." }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(JSON.stringify({ error: "Please provide a valid email address." }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const db = (context.locals as any)?.runtime?.env?.DB;
    if (db && typeof db.prepare === "function") {
      try {
        await d1SaveContactSubmission(db, { name, email, subject, message });
      } catch (e) {
        console.warn("Notice: D1 contact submission fallback to cache:", e);
      }
    }

    // Cache submission
    globalThis.__CONTACT_SUBMISSIONS_CACHE__ = globalThis.__CONTACT_SUBMISSIONS_CACHE__ || [];
    globalThis.__CONTACT_SUBMISSIONS_CACHE__.unshift({
      id: `contact-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      name,
      email,
      subject,
      message,
      createdAt: new Date().toISOString(),
    });

    return new Response(
      JSON.stringify({
        success: true,
        message: "🙏 Jai Shree Ram! Your prayer request/message has been received.",
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Contact submission error:", error);
    return new Response(JSON.stringify({ error: "Unable to send your message. Please try again." }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
