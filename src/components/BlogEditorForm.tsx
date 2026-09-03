"use client";

import React, { useState } from "react";

interface FaqItem {
  question: string;
  answer: string;
}

interface InternalLinkItem {
  label: string;
  url: string;
}

export interface Post {
  id: string;
  slug: string;
  title: string;
  metaTitle?: string | null;
  metaDescription?: string | null;
  excerpt: string;
  content: string;
  coverImage?: string | null;
  imageAlt?: string | null;
  imageTitle?: string | null;
  imageCaption?: string | null;
  focusKeywords?: string | null;
  internalLinks?: string | null;
  sources?: string | null;
  faqs?: string | null;
  published: boolean;
  createdAt: string;
}

interface BlogEditorFormProps {
  initialPosts: Post[];
}

export default function BlogEditorForm({ initialPosts }: BlogEditorFormProps) {
  const [posts, setPosts] = useState<Post[]>(initialPosts);

  // Active Tab
  const [activeTab, setActiveTab] = useState<"content" | "media" | "seo" | "faqs" | "links">("content");

  // Form States
  const [editingId, setEditingId] = useState<string | null>(null);
  const [title, setTitle] = useState<string>("");
  const [slug, setSlug] = useState<string>("");
  const [metaTitle, setMetaTitle] = useState<string>("");
  const [metaDescription, setMetaDescription] = useState<string>("");
  const [excerpt, setExcerpt] = useState<string>("");
  const [content, setContent] = useState<string>("");
  
  // Media States
  const [coverImage, setCoverImage] = useState<string>("");
  const [imageAlt, setImageAlt] = useState<string>("");
  const [imageTitle, setImageTitle] = useState<string>("");
  const [imageCaption, setImageCaption] = useState<string>("");

  // SEO & Links States
  const [focusKeywords, setFocusKeywords] = useState<string>("");
  const [internalLinks, setInternalLinks] = useState<InternalLinkItem[]>([]);
  const [newLinkLabel, setNewLinkLabel] = useState<string>("");
  const [newLinkUrl, setNewLinkUrl] = useState<string>("");
  const [sources, setSources] = useState<string>("");

  // FAQ States
  const [faqs, setFaqs] = useState<FaqItem[]>([]);
  const [newFaqQuestion, setNewFaqQuestion] = useState<string>("");
  const [newFaqAnswer, setNewFaqAnswer] = useState<string>("");

  // Status
  const [published, setPublished] = useState<boolean>(true);
  const [message, setMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Auto-generate slug from title if new
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setTitle(val);
    if (!editingId && !slug) {
      const generatedSlug = val
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .trim();
      setSlug(generatedSlug);
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setTitle("");
    setSlug("");
    setMetaTitle("");
    setMetaDescription("");
    setExcerpt("");
    setContent("");
    setCoverImage("");
    setImageAlt("");
    setImageTitle("");
    setImageCaption("");
    setFocusKeywords("");
    setInternalLinks([]);
    setNewLinkLabel("");
    setNewLinkUrl("");
    setSources("");
    setFaqs([]);
    setNewFaqQuestion("");
    setNewFaqAnswer("");
    setPublished(true);
    setActiveTab("content");
  };

  const handleEdit = (post: Post) => {
    setEditingId(post.id);
    setTitle(post.title || "");
    setSlug(post.slug || "");
    setMetaTitle(post.metaTitle || "");
    setMetaDescription(post.metaDescription || "");
    setExcerpt(post.excerpt || "");
    setContent(post.content || "");
    setCoverImage(post.coverImage || "");
    setImageAlt(post.imageAlt || "");
    setImageTitle(post.imageTitle || "");
    setImageCaption(post.imageCaption || "");
    setFocusKeywords(post.focusKeywords || "");
    setSources(post.sources || "");
    setPublished(post.published);

    try {
      if (post.internalLinks) {
        setInternalLinks(JSON.parse(post.internalLinks));
      } else {
        setInternalLinks([]);
      }
    } catch {
      setInternalLinks([]);
    }

    try {
      if (post.faqs) {
        setFaqs(JSON.parse(post.faqs));
      } else {
        setFaqs([]);
      }
    } catch {
      setFaqs([]);
    }

    window.scrollTo({ top: 150, behavior: "smooth" });
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this blog post?")) return;

    try {
      const res = await fetch(`/api/admin/blog?id=${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setPosts(posts.filter((p) => p.id !== id));
        setMessage({ text: "Post deleted successfully!", type: "success" });
        if (editingId === id) resetForm();
      } else {
        const data = await res.json();
        setMessage({ text: data.error || "Failed to delete post", type: "error" });
      }
    } catch {
      setMessage({ text: "Network error occurred", type: "error" });
    }
  };

  const handleAddFaq = () => {
    if (!newFaqQuestion.trim() || !newFaqAnswer.trim()) {
      alert("Please provide both Question and Answer for the FAQ.");
      return;
    }
    setFaqs([...faqs, { question: newFaqQuestion.trim(), answer: newFaqAnswer.trim() }]);
    setNewFaqQuestion("");
    setNewFaqAnswer("");
  };

  const handleRemoveFaq = (index: number) => {
    setFaqs(faqs.filter((_, i) => i !== index));
  };

  const handleAddInternalLink = () => {
    if (!newLinkLabel.trim() || !newLinkUrl.trim()) {
      alert("Please enter both link label and target URL.");
      return;
    }
    setInternalLinks([...internalLinks, { label: newLinkLabel.trim(), url: newLinkUrl.trim() }]);
    setNewLinkLabel("");
    setNewLinkUrl("");
  };

  const handleRemoveInternalLink = (index: number) => {
    setInternalLinks(internalLinks.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage(null);

    const payload = {
      id: editingId,
      title,
      slug: slug.trim().toLowerCase(),
      metaTitle: metaTitle.trim() || null,
      metaDescription: metaDescription.trim() || null,
      excerpt: excerpt.trim(),
      content,
      coverImage: coverImage.trim() || null,
      imageAlt: imageAlt.trim() || null,
      imageTitle: imageTitle.trim() || null,
      imageCaption: imageCaption.trim() || null,
      focusKeywords: focusKeywords.trim() || null,
      internalLinks: internalLinks.length > 0 ? JSON.stringify(internalLinks) : null,
      sources: sources.trim() || null,
      faqs: faqs.length > 0 ? JSON.stringify(faqs) : null,
      published,
    };

    try {
      const res = await fetch("/api/admin/blog", {
        method: editingId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage({
          text: editingId ? "Article updated successfully!" : "Article created successfully!",
          type: "success",
        });

        if (editingId) {
          setPosts(posts.map((p) => (p.id === editingId || p.slug === data.slug ? data : p)));
        } else {
          setPosts([data, ...posts]);
        }
        resetForm();
      } else {
        setMessage({ text: data.error || "Failed to save article", type: "error" });
      }
    } catch {
      setMessage({ text: "Network error occurred", type: "error" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const metaDescLength = metaDescription.length;
  const isDescOverLimit = metaDescLength > 150;

  return (
    <div className="space-y-8">
      {/* Notifications */}
      {message && (
        <div
          className={`p-4 rounded-lg flex items-center justify-between shadow-md text-sm font-semibold ${
            message.type === "success"
              ? "bg-emerald-900/20 border-2 border-emerald-600 text-emerald-800 dark:text-emerald-300"
              : "bg-red-900/20 border-2 border-red-600 text-red-800 dark:text-red-300"
          }`}
        >
          <span>{message.text}</span>
          <button onClick={() => setMessage(null)} className="text-xs font-bold underline ml-4">
            Dismiss
          </button>
        </div>
      )}

      {/* Main Form Box */}
      <div className="bg-stone-ivory border-2 border-brass-gold/50 rounded-xl shadow-lg overflow-hidden">
        {/* Form Header Banner */}
        <div className="bg-maroon-deep p-4 sm:p-6 text-stone-ivory flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <span className="text-xs uppercase tracking-widest text-marigold font-bold">
              {editingId ? "✏️ Edit Mode" : "✨ Create New Article"}
            </span>
            <h2 className="text-lg sm:text-xl font-serif-display font-bold">
              {editingId ? `Editing: ${title || "Untitled"}` : "Devotional Blog Post Studio"}
            </h2>
          </div>
          {editingId && (
            <button
              type="button"
              onClick={resetForm}
              className="text-xs bg-stone-ivory/10 hover:bg-stone-ivory/20 px-3 py-1.5 rounded border border-stone-ivory/30 transition-colors"
            >
              Cancel Edit & Create New
            </button>
          )}
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap border-b border-brass-gold/30 bg-brass-gold/5 px-4 pt-2 gap-2">
          <button
            type="button"
            onClick={() => setActiveTab("content")}
            className={`px-4 py-2.5 text-xs font-bold uppercase tracking-wider rounded-t-lg transition-all border-t-2 border-x-2 ${
              activeTab === "content"
                ? "bg-stone-ivory border-brass-gold/50 text-maroon-deep -mb-px shadow-sm"
                : "border-transparent text-charcoal-brown/60 hover:text-maroon-deep"
            }`}
          >
            📝 Content & Body
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("media")}
            className={`px-4 py-2.5 text-xs font-bold uppercase tracking-wider rounded-t-lg transition-all border-t-2 border-x-2 ${
              activeTab === "media"
                ? "bg-stone-ivory border-brass-gold/50 text-maroon-deep -mb-px shadow-sm"
                : "border-transparent text-charcoal-brown/60 hover:text-maroon-deep"
            }`}
          >
            🖼️ Media & Image SEO {coverImage ? "•" : ""}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("seo")}
            className={`px-4 py-2.5 text-xs font-bold uppercase tracking-wider rounded-t-lg transition-all border-t-2 border-x-2 ${
              activeTab === "seo"
                ? "bg-stone-ivory border-brass-gold/50 text-maroon-deep -mb-px shadow-sm"
                : "border-transparent text-charcoal-brown/60 hover:text-maroon-deep"
            }`}
          >
            🚀 Search SEO & Snippet {isDescOverLimit ? "⚠️" : ""}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("faqs")}
            className={`px-4 py-2.5 text-xs font-bold uppercase tracking-wider rounded-t-lg transition-all border-t-2 border-x-2 ${
              activeTab === "faqs"
                ? "bg-stone-ivory border-brass-gold/50 text-maroon-deep -mb-px shadow-sm"
                : "border-transparent text-charcoal-brown/60 hover:text-maroon-deep"
            }`}
          >
            ❓ FAQs Schema ({faqs.length})
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("links")}
            className={`px-4 py-2.5 text-xs font-bold uppercase tracking-wider rounded-t-lg transition-all border-t-2 border-x-2 ${
              activeTab === "links"
                ? "bg-stone-ivory border-brass-gold/50 text-maroon-deep -mb-px shadow-sm"
                : "border-transparent text-charcoal-brown/60 hover:text-maroon-deep"
            }`}
          >
            🔗 Internal Links & Sources ({internalLinks.length})
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* TAB 1: CONTENT */}
          {activeTab === "content" && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs uppercase font-bold text-maroon-deep mb-1">
                  Article Title (H1) <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={handleTitleChange}
                  placeholder="e.g. 10 Divine Miracles of Daily Hanuman Chalisa Recitation"
                  className="w-full bg-white border border-brass-gold/40 rounded p-2.5 text-sm focus:border-maroon-deep focus:ring-1 focus:ring-maroon-deep outline-none"
                />
              </div>

              <div>
                <label className="block text-xs uppercase font-bold text-maroon-deep mb-1">
                  URL Slug (Auto-generated or custom) <span className="text-red-500">*</span>
                </label>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-charcoal-brown/60 select-none hidden sm:inline">
                    ramhanumanchalisa.com/blog/
                  </span>
                  <input
                    type="text"
                    required
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    placeholder="10-divine-miracles-hanuman-chalisa"
                    className="flex-1 bg-white border border-brass-gold/40 rounded p-2 text-xs font-mono text-charcoal-brown outline-none focus:border-maroon-deep"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase font-bold text-maroon-deep mb-1">
                  Summary / Excerpt
                </label>
                <textarea
                  rows={2}
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  placeholder="Short introductory summary for cards and feeds..."
                  className="w-full bg-white border border-brass-gold/40 rounded p-2.5 text-xs text-charcoal-brown outline-none focus:border-maroon-deep"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="block text-xs uppercase font-bold text-maroon-deep">
                    Article Body Content (Markdown supported) <span className="text-red-500">*</span>
                  </label>
                  <div className="flex gap-2 text-[11px] text-charcoal-brown/60 font-mono">
                    <span>## Heading</span>
                    <span>### Subheading</span>
                    <span>- Bullet point</span>
                  </div>
                </div>
                <textarea
                  required
                  rows={14}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder={`Write your devotional article here...\n\n## Section Heading\n\nParagraph text here with deep insights.\n\n### Practical Vidhi\n- Step 1: Sit facing East\n- Step 2: Recite Doha with devotion`}
                  className="w-full bg-white border border-brass-gold/40 rounded p-3 text-xs font-mono leading-relaxed outline-none focus:border-maroon-deep"
                />
              </div>
            </div>
          )}

          {/* TAB 2: MEDIA & IMAGE SEO */}
          {activeTab === "media" && (
            <div className="space-y-5">
              <div className="p-4 bg-marigold/10 border border-marigold/30 rounded-lg text-xs text-maroon-deep">
                💡 <strong>Image SEO Best Practice:</strong> Always provide descriptive Alt text (describing the image for screen readers and Google image index) and a captivating caption for reader engagement.
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs uppercase font-bold text-maroon-deep mb-1">
                      Cover Image URL
                    </label>
                    <input
                      type="url"
                      value={coverImage}
                      onChange={(e) => setCoverImage(e.target.value)}
                      placeholder="https://images.unsplash.com/... or /images/hanuman.jpg"
                      className="w-full bg-white border border-brass-gold/40 rounded p-2.5 text-xs outline-none focus:border-maroon-deep"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase font-bold text-maroon-deep mb-1">
                      Image Alt Text (Crucial for SEO)
                    </label>
                    <input
                      type="text"
                      value={imageAlt}
                      onChange={(e) => setImageAlt(e.target.value)}
                      placeholder="e.g. Lord Hanuman holding Sanjeevani Mountain in golden aura"
                      className="w-full bg-white border border-brass-gold/40 rounded p-2.5 text-xs outline-none focus:border-maroon-deep"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase font-bold text-maroon-deep mb-1">
                      Image Title (Tooltip attribute)
                    </label>
                    <input
                      type="text"
                      value={imageTitle}
                      onChange={(e) => setImageTitle(e.target.value)}
                      placeholder="e.g. Divine depiction of Shri Hanuman"
                      className="w-full bg-white border border-brass-gold/40 rounded p-2.5 text-xs outline-none focus:border-maroon-deep"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase font-bold text-maroon-deep mb-1">
                      Image Caption (Displayed beneath image)
                    </label>
                    <input
                      type="text"
                      value={imageCaption}
                      onChange={(e) => setImageCaption(e.target.value)}
                      placeholder="e.g. Painting of Sankat Mochan Hanumanji at dusk"
                      className="w-full bg-white border border-brass-gold/40 rounded p-2.5 text-xs outline-none focus:border-maroon-deep"
                    />
                  </div>
                </div>

                {/* Preview Thumbnail */}
                <div className="border border-brass-gold/30 rounded-lg p-4 bg-white flex flex-col justify-center items-center text-center">
                  <span className="text-xs uppercase font-bold text-charcoal-brown/60 mb-2">Live Image Preview</span>
                  {coverImage ? (
                    <div className="space-y-2 max-w-xs">
                      <img
                        src={coverImage}
                        alt={imageAlt || "Preview"}
                        title={imageTitle}
                        className="w-full h-48 object-cover rounded shadow-md border border-brass-gold/20"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = "https://placehold.co/600x400?text=Invalid+Image+URL";
                        }}
                      />
                      {imageCaption && (
                        <p className="text-[11px] text-charcoal-brown/70 italic">{imageCaption}</p>
                      )}
                    </div>
                  ) : (
                    <div className="w-full h-48 bg-stone-ivory border-2 border-dashed border-brass-gold/40 rounded flex flex-col items-center justify-center text-charcoal-brown/40 text-xs gap-2">
                      <span className="text-2xl">🖼️</span>
                      <span>No cover image specified yet</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: SEO SUITE & GOOGLE SERP PREVIEW */}
          {activeTab === "seo" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs uppercase font-bold text-maroon-deep mb-1">
                      Unique Page Title (Meta &lt;title&gt;)
                    </label>
                    <input
                      type="text"
                      value={metaTitle}
                      onChange={(e) => setMetaTitle(e.target.value)}
                      placeholder={title ? `${title} | Ram Hanuman Chalisa` : "Unique SEO Meta Title (50-60 characters)"}
                      className="w-full bg-white border border-brass-gold/40 rounded p-2.5 text-xs outline-none focus:border-maroon-deep"
                    />
                    <p className="text-[11px] text-charcoal-brown/60 mt-1">
                      If left empty, defaults to: <code>{title || "Article Title"} | Ram Hanuman Chalisa</code>
                    </p>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label className="block text-xs uppercase font-bold text-maroon-deep">
                        Meta Description (&lt;meta name=&quot;description&quot;&gt;)
                      </label>
                      <span
                        className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                          isDescOverLimit
                            ? "bg-red-500/20 text-red-700 border border-red-500"
                            : "bg-emerald-500/20 text-emerald-700 border border-emerald-500"
                        }`}
                      >
                        {metaDescLength} / 150 chars {isDescOverLimit ? "(Too long!)" : "✓ Ideal"}
                      </span>
                    </div>
                    <textarea
                      rows={3}
                      value={metaDescription}
                      onChange={(e) => setMetaDescription(e.target.value)}
                      placeholder="Write a compelling snippet under 150 characters to boost search click-through rate..."
                      className={`w-full bg-white border rounded p-2.5 text-xs outline-none ${
                        isDescOverLimit ? "border-red-500 focus:ring-1 focus:ring-red-500" : "border-brass-gold/40 focus:border-maroon-deep"
                      }`}
                    />
                    {isDescOverLimit && (
                      <p className="text-[11px] text-red-600 font-semibold mt-1">
                        ⚠️ Warning: Google cuts off meta descriptions over 150 characters on mobile search results.
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs uppercase font-bold text-maroon-deep mb-1">
                      Focus Keywords
                    </label>
                    <input
                      type="text"
                      value={focusKeywords}
                      onChange={(e) => setFocusKeywords(e.target.value)}
                      placeholder="e.g. hanuman chalisa miracles, benefits of chanting chalisa daily"
                      className="w-full bg-white border border-brass-gold/40 rounded p-2.5 text-xs outline-none focus:border-maroon-deep"
                    />
                  </div>
                </div>

                {/* Google Search SERP Simulator Card */}
                <div className="border border-brass-gold/30 bg-white rounded-lg p-4 flex flex-col justify-start">
                  <span className="text-xs uppercase tracking-wider font-bold text-charcoal-brown/70 mb-3 flex items-center gap-1.5">
                    <span>🔍</span> Google SERP Simulator
                  </span>
                  <div className="p-4 bg-white border border-gray-200 rounded-md shadow-sm font-sans space-y-1">
                    <div className="flex items-center gap-2 text-xs text-gray-700">
                      <span className="w-5 h-5 rounded-full bg-maroon-deep text-white flex items-center justify-center text-[10px] font-bold">
                        🕉️
                      </span>
                      <div className="flex flex-col">
                        <span className="text-[11px] text-gray-800 font-medium leading-none">Ram Hanuman Chalisa</span>
                        <span className="text-[10px] text-gray-500 leading-none truncate max-w-xs">
                          https://ramhanumanchalisa.com &gt; blog &gt; {slug || "your-slug"}
                        </span>
                      </div>
                    </div>
                    <h3 className="text-base text-[#1a0dab] hover:underline font-medium cursor-pointer leading-snug pt-1">
                      {metaTitle || (title ? `${title} | Ram Hanuman Chalisa` : "Article Title — Ram Hanuman Chalisa")}
                    </h3>
                    <p className="text-xs text-gray-600 leading-normal line-clamp-2">
                      {metaDescription || excerpt || "Your meta description snippet will appear here in Google Search results. Keep it engaging and under 150 characters."}
                    </p>
                  </div>
                  <p className="text-[11px] text-charcoal-brown/50 mt-3 italic">
                    Visual simulation of desktop / mobile snippet index appearance.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: FAQS SCHEMA GENERATOR */}
          {activeTab === "faqs" && (
            <div className="space-y-6">
              <div className="p-4 bg-brass-gold/10 border border-brass-gold/30 rounded-lg text-xs text-charcoal-brown">
                ✨ <strong>Google Search Console FAQPage Schema:</strong> Every Q&A entered here automatically outputs valid <code>@type: FAQPage</code> JSON-LD structured data on this article page and displays an accordion on the frontend.
              </div>

              {/* Add New FAQ */}
              <div className="bg-white border border-brass-gold/30 p-4 rounded-lg space-y-3">
                <h4 className="text-xs uppercase font-bold text-maroon-deep">Add New FAQ Item</h4>
                <div>
                  <label className="block text-[11px] uppercase font-bold text-charcoal-brown/70 mb-1">
                    Question
                  </label>
                  <input
                    type="text"
                    value={newFaqQuestion}
                    onChange={(e) => setNewFaqQuestion(e.target.value)}
                    placeholder="e.g. What is the best time to recite the Hanuman Chalisa?"
                    className="w-full bg-stone-ivory/50 border border-brass-gold/40 rounded p-2 text-xs outline-none focus:border-maroon-deep"
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase font-bold text-charcoal-brown/70 mb-1">
                    Answer
                  </label>
                  <textarea
                    rows={3}
                    value={newFaqAnswer}
                    onChange={(e) => setNewFaqAnswer(e.target.value)}
                    placeholder="e.g. Brahma Muhurta (early morning before sunrise) and Tuesday/Saturday evenings are considered highly auspicious..."
                    className="w-full bg-stone-ivory/50 border border-brass-gold/40 rounded p-2 text-xs outline-none focus:border-maroon-deep"
                  />
                </div>
                <button
                  type="button"
                  onClick={handleAddFaq}
                  className="bg-marigold hover:bg-brass-gold text-maroon-deep font-bold px-4 py-2 rounded text-xs uppercase tracking-wider transition-colors shadow-sm"
                >
                  + Add FAQ Pair
                </button>
              </div>

              {/* FAQ List */}
              <div className="space-y-3">
                <h4 className="text-xs uppercase font-bold text-maroon-deep">Current FAQs for this Article ({faqs.length})</h4>
                {faqs.length === 0 ? (
                  <p className="text-xs text-charcoal-brown/50 italic">No FAQs added yet. Use the form above to add Q&A pairs.</p>
                ) : (
                  faqs.map((faq, idx) => (
                    <div key={idx} className="p-3 bg-white border border-brass-gold/30 rounded-lg flex justify-between items-start gap-4">
                      <div className="space-y-1">
                        <p className="text-xs font-bold text-maroon-deep">Q{idx + 1}: {faq.question}</p>
                        <p className="text-xs text-charcoal-brown/80">{faq.answer}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveFaq(idx)}
                        className="text-xs text-red-600 hover:text-red-800 font-bold px-2 py-1 rounded bg-red-50 border border-red-200"
                      >
                        Remove
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* TAB 5: INTERNAL LINKS & SOURCES */}
          {activeTab === "links" && (
            <div className="space-y-6">
              {/* Internal Links Repeater */}
              <div className="bg-white border border-brass-gold/30 p-4 rounded-lg space-y-3">
                <h4 className="text-xs uppercase font-bold text-maroon-deep">🔗 Add Recommended Internal Links</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] uppercase font-bold text-charcoal-brown/70 mb-1">
                      Link Anchor Text
                    </label>
                    <input
                      type="text"
                      value={newLinkLabel}
                      onChange={(e) => setNewLinkLabel(e.target.value)}
                      placeholder="e.g. Complete Hindi & English Meaning"
                      className="w-full bg-stone-ivory/50 border border-brass-gold/40 rounded p-2 text-xs outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] uppercase font-bold text-charcoal-brown/70 mb-1">
                      Target URL
                    </label>
                    <input
                      type="text"
                      value={newLinkUrl}
                      onChange={(e) => setNewLinkUrl(e.target.value)}
                      placeholder="e.g. /hanuman-chalisa-meaning"
                      className="w-full bg-stone-ivory/50 border border-brass-gold/40 rounded p-2 text-xs outline-none"
                    />
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleAddInternalLink}
                  className="bg-marigold hover:bg-brass-gold text-maroon-deep font-bold px-3 py-1.5 rounded text-xs uppercase tracking-wider transition-colors shadow-sm"
                >
                  + Add Internal Link
                </button>

                {internalLinks.length > 0 && (
                  <div className="pt-2 space-y-2">
                    {internalLinks.map((item, idx) => (
                      <div key={idx} className="flex justify-between items-center p-2 bg-stone-ivory rounded border border-brass-gold/20 text-xs">
                        <div>
                          <span className="font-bold text-maroon-deep">{item.label}</span> &rarr;{" "}
                          <code className="text-brass-gold">{item.url}</code>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleRemoveInternalLink(idx)}
                          className="text-red-600 hover:text-red-800 text-xs font-bold"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Scripture & Sources */}
              <div>
                <label className="block text-xs uppercase font-bold text-maroon-deep mb-1">
                  Scriptural Citations & Sources (References)
                </label>
                <textarea
                  rows={4}
                  value={sources}
                  onChange={(e) => setSources(e.target.value)}
                  placeholder="e.g. Tulsidas Ramcharitmanas, Gitapress Gorakhpur (Code 45), Valmiki Ramayana Kishkindha Kanda..."
                  className="w-full bg-white border border-brass-gold/40 rounded p-2.5 text-xs outline-none focus:border-maroon-deep"
                />
              </div>
            </div>
          )}

          {/* Form Action Footer */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-4 border-t border-brass-gold/30">
            <div className="flex items-center gap-3">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={published}
                  onChange={(e) => setPublished(e.target.checked)}
                  className="w-4 h-4 text-maroon-deep rounded accent-maroon-deep"
                />
                <span className="text-xs font-bold uppercase text-charcoal-brown">
                  {published ? "🟢 Status: Published" : "🟡 Status: Draft"}
                </span>
              </label>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                type="button"
                onClick={resetForm}
                className="w-1/2 sm:w-auto px-4 py-2 border border-brass-gold/50 rounded text-xs font-bold uppercase text-charcoal-brown/70 hover:bg-stone-ivory/80"
              >
                Reset
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-1/2 sm:w-auto bg-maroon-deep hover:bg-vermilion text-stone-ivory font-bold px-6 py-2.5 rounded text-xs uppercase tracking-wider shadow-md transition-all disabled:opacity-50"
              >
                {isSubmitting ? "Saving Article..." : editingId ? "Update Article" : "Publish Article"}
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Article List Section */}
      <div className="bg-stone-ivory border-2 border-brass-gold/40 rounded-xl p-6 shadow-sm space-y-4">
        <h3 className="font-serif-display text-lg font-bold text-maroon-deep uppercase border-b border-brass-gold/20 pb-2">
          Published & Draft Blog Articles ({posts.length})
        </h3>

        {posts.length === 0 ? (
          <p className="text-xs text-charcoal-brown/60 italic">No blog posts found in database.</p>
        ) : (
          <div className="divide-y divide-brass-gold/20">
            {posts.map((post) => (
              <div key={post.id} className="py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                        post.published ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800"
                      }`}
                    >
                      {post.published ? "Published" : "Draft"}
                    </span>
                    <h4 className="font-bold text-maroon-deep text-sm">{post.title}</h4>
                  </div>
                  <p className="text-xs text-charcoal-brown/60 font-mono">
                    /blog/{post.slug}
                  </p>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-auto">
                  <a
                    href={`/blog/${post.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 text-xs font-bold border border-brass-gold/40 text-charcoal-brown rounded hover:bg-white transition-colors"
                  >
                    View ↗
                  </a>
                  <button
                    type="button"
                    onClick={() => handleEdit(post)}
                    className="px-3 py-1.5 text-xs font-bold bg-marigold text-maroon-deep rounded hover:bg-brass-gold transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(post.id)}
                    className="px-3 py-1.5 text-xs font-bold bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
