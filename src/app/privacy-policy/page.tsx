import React from "react";
import CarvedDivider from "@/components/CarvedDivider";

export const metadata = {
  title: "Privacy Policy — Cookie Usage & Data Collection",
  description: "Read the Privacy Policy for RamHanumanChalisa.com, outlining our cookies usage, local storage counter, and AdSense compliance.",
};

export default function PrivacyPage() {
  return (
    <div className="space-y-10 max-w-3xl mx-auto text-sm text-charcoal-brown/85 leading-relaxed">
      
      {/* Header */}
      <div className="text-center space-y-3">
        <h2 className="font-serif-display text-3xl uppercase tracking-wider font-bold text-maroon-deep">
          Privacy Policy
        </h2>
        <p className="text-xs text-charcoal-brown/70">
          Last updated: August 25, 2026
        </p>
      </div>

      <CarvedDivider icon="🕉️" />

      {/* Content */}
      <section className="space-y-6">
        <div className="space-y-2">
          <h3 className="font-serif-display text-base uppercase font-bold text-maroon-deep border-b border-brass-gold/20 pb-1">
            1. Information We Collect
          </h3>
          <p>
            We do not require users to create accounts or log in for regular use of this website. If you use the &ldquo;I Recited Today&rdquo; button, we store a simple timestamp marker in your browser&apos;s <code>localStorage</code> (client-side only) to track if you have already incremented the daily counter today. This data does not contain personal identifiers and never leaves your browser.
          </p>
        </div>

        <div className="space-y-2">
          <h3 className="font-serif-display text-base uppercase font-bold text-maroon-deep border-b border-brass-gold/20 pb-1">
            2. Cookies and Advertisements
          </h3>
          <p>
            We use Google AdSense to serve advertisements on our site. Google uses cookies to serve ads based on a user&apos;s prior visits to our website or other websites on the internet.
          </p>
          <p>
            Google&apos;s use of advertising cookies enables it and its partners to serve ads to users based on their visit to our site and/or other sites on the Internet. Devotees may opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-vermilion hover:underline">Google Ad Settings</a>.
          </p>
        </div>

        <div className="space-y-2">
          <h3 className="font-serif-display text-base uppercase font-bold text-maroon-deep border-b border-brass-gold/20 pb-1">
            3. Web Analytics
          </h3>
          <p>
            We may use basic server logs or anonymous analytics tools to count page views and identify top queries from search engines, helping us understand content popularity and load optimization. No personally identifiable information (PII) is tracked or stored.
          </p>
        </div>

        <div className="space-y-2">
          <h3 className="font-serif-display text-base uppercase font-bold text-maroon-deep border-b border-brass-gold/20 pb-1">
            4. External Links
          </h3>
          <p>
            Our website contains links to other websites (e.g. YouTube audio, Wikipedia texts, Google Cloud OAuth). If you click on a third-party link, you will be directed to that site. We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party sites or services.
          </p>
        </div>

        <div className="space-y-2">
          <h3 className="font-serif-display text-base uppercase font-bold text-maroon-deep border-b border-brass-gold/20 pb-1">
            5. Contact Information
          </h3>
          <p>
            For any queries regarding this Privacy Policy, please contact us at <code>support@ramhanumanchalisa.com</code>.
          </p>
        </div>
      </section>

    </div>
  );
}
