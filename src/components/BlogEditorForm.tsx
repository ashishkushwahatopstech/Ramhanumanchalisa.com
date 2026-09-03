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
  galleryImages?: string | null;
  focusKeywords?: string | null;
  internalLinks?: string | null;
  sources?: string | null;
  faqs?: string | null;
  published: boolean;
  createdAt: string;
}

export interface ContentImageItem {
  id: string;
  url: string;
  alt: string;
  title: string;
  caption: string;
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
  
  // Media States (Cover)
  const [coverImage, setCoverImage] = useState<string>("");
  const [imageAlt, setImageAlt] = useState<string>("");
  const [imageTitle, setImageTitle] = useState<string>("");
  const [imageCaption, setImageCaption] = useState<string>("");

  // All in-content images on this page
  const [galleryImages, setGalleryImages] = useState<ContentImageItem[]>([]);

  // Content Tab Image Inserter Tool States
  const [showInsertModal, setShowInsertModal] = useState<boolean>(false);
  const [insertImgUrl, setInsertImgUrl] = useState<string>("");
  const [insertImgAlt, setInsertImgAlt] = useState<string>("");
  const [insertImgTitle, setInsertImgTitle] = useState<string>("");
  const [insertImgCaption, setInsertImgCaption] = useState<string>("");
  const [insertSuccessMsg, setInsertSuccessMsg] = useState<string | null>(null);

  // Media Tab Re-editing Image States
  const [editingImageId, setEditingImageId] = useState<string | null>(null);
  const [editImgUrl, setEditImgUrl] = useState<string>("");
  const [editImgAlt, setEditImgAlt] = useState<string>("");
  const [editImgTitle, setEditImgTitle] = useState<string>("");
  const [editImgCaption, setEditImgCaption] = useState<string>("");

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
    setGalleryImages([]);
    setShowInsertModal(false);
    setInsertSuccessMsg(null);
    setEditingImageId(null);
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

    let parsedGallery: ContentImageItem[] = [];
    try {
      if (post.galleryImages) {
        parsedGallery = typeof post.galleryImages === "string" ? JSON.parse(post.galleryImages) : post.galleryImages;
      }
    } catch {
      parsedGallery = [];
    }

    // Auto-discover images inside content if gallery was empty
    if (parsedGallery.length === 0 && post.content) {
      const imgRegex = /<img\s+[^>]*src="([^"]*)"[^>]*>/gi;
      let match;
      let idx = 1;
      while ((match = imgRegex.exec(post.content)) !== null) {
        const fullImgTag = match[0];
        const src = match[1];
        const altMatch = fullImgTag.match(/alt="([^"]*)"/i);
        const titleMatch = fullImgTag.match(/title="([^"]*)"/i);
        parsedGallery.push({
          id: `extracted-${Date.now()}-${idx++}`,
          url: src,
          alt: altMatch ? altMatch[1] : "",
          title: titleMatch ? titleMatch[1] : "",
          caption: "",
        });
      }
    }
    setGalleryImages(parsedGallery);

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

  const handleInsertImageIntoContent = () => {
    if (!insertImgUrl.trim()) {
      alert("Please provide the Image URL.");
      return;
    }
    if (!insertImgAlt.trim()) {
      alert("Alt text is mandatory for Google image indexing. Please describe the image.");
      return;
    }

    const newImage: ContentImageItem = {
      id: Date.now().toString(),
      url: insertImgUrl.trim(),
      alt: insertImgAlt.trim(),
      title: insertImgTitle.trim() || insertImgAlt.trim(),
      caption: insertImgCaption.trim(),
    };

    const figureSnippet = `\n\n<figure class="my-6 text-center">
  <img src="${newImage.url}" alt="${newImage.alt}" title="${newImage.title}" class="rounded-lg shadow-md mx-auto max-w-full h-auto" loading="lazy" />
  ${newImage.caption ? `<figcaption class="text-xs text-charcoal-brown/70 italic mt-2">${newImage.caption}</figcaption>` : ""}
</figure>\n\n`;

    setContent((prev) => prev + figureSnippet);
    setGalleryImages((prev) => [...prev, newImage]);

    setInsertImgUrl("");
    setInsertImgAlt("");
    setInsertImgTitle("");
    setInsertImgCaption("");
    setShowInsertModal(false);
    setInsertSuccessMsg("✅ Image inserted into article body & saved to Media & Image SEO list!");
    setTimeout(() => setInsertSuccessMsg(null), 4000);
  };

  const handleStartEditImage = (img: ContentImageItem) => {
    setEditingImageId(img.id);
    setEditImgUrl(img.url);
    setEditImgAlt(img.alt);
    setEditImgTitle(img.title);
    setEditImgCaption(img.caption);
  };

  const handleSaveEditImage = (id: string) => {
    const oldImg = galleryImages.find((g) => g.id === id);
    if (!oldImg) return;

    const updatedImg: ContentImageItem = {
      id,
      url: editImgUrl.trim(),
      alt: editImgAlt.trim(),
      title: editImgTitle.trim() || editImgAlt.trim(),
      caption: editImgCaption.trim(),
    };

    setGalleryImages((prev) => prev.map((img) => (img.id === id ? updatedImg : img)));

    if (content.includes(oldImg.url)) {
      const oldSnippetRegex = new RegExp(
        `<figure[\\s\\S]*?src=["']${oldImg.url.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}["'][\\s\\S]*?<\\/figure>`,
        "i"
      );

      const newSnippet = `<figure class="my-6 text-center">
  <img src="${updatedImg.url}" alt="${updatedImg.alt}" title="${updatedImg.title}" class="rounded-lg shadow-md mx-auto max-w-full h-auto" loading="lazy" />
  ${updatedImg.caption ? `<figcaption class="text-xs text-charcoal-brown/70 italic mt-2">${updatedImg.caption}</figcaption>` : ""}
</figure>`;

      if (oldSnippetRegex.test(content)) {
        setContent((prev) => prev.replace(oldSnippetRegex, newSnippet));
      }
    }

    setEditingImageId(null);
  };

  const handleRemoveGalleryImage = (id: string) => {
    if (!confirm("Remove this image from the Media & SEO list?")) return;
    setGalleryImages((prev) => prev.filter((img) => img.id !== id));
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
      galleryImages: galleryImages.length > 0 ? JSON.stringify(galleryImages) : null,
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
        const savedPost = { ...payload, ...data };
        setMessage({
          text: editingId ? "🟢 Article updated & images saved successfully!" : "🟢 Article created successfully!",
          type: "success",
        });

        if (editingId) {
          setPosts(posts.map((p) => (p.id === editingId || p.slug === savedPost.slug ? savedPost : p)));
          setEditingId(savedPost.id);
          if (savedPost.coverImage) setCoverImage(savedPost.coverImage);
          if (savedPost.galleryImages) {
            try {
              setGalleryImages(typeof savedPost.galleryImages === "string" ? JSON.parse(savedPost.galleryImages) : savedPost.galleryImages);
            } catch {}
          }
        } else {
          setPosts([savedPost, ...posts]);
          resetForm();
        }
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

              {/* Cover Image Quick Indicator */}
              {coverImage ? (
                <div className="flex items-center justify-between p-3 bg-emerald-50 border border-emerald-300 rounded-lg text-xs shadow-sm">
                  <div className="flex items-center gap-3">
                    <img src={coverImage} alt={imageAlt || "Cover preview"} className="w-12 h-12 object-cover rounded shadow border border-emerald-400" />
                    <div>
                      <p className="font-bold text-emerald-900">🖼️ Article Cover Image Active</p>
                      <p className="text-[11px] text-emerald-700 truncate max-w-xs">{coverImage}</p>
                      {imageAlt && <p className="text-[10px] text-emerald-600 italic">Alt: "{imageAlt}"</p>}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setActiveTab("media")}
                    className="px-3 py-1.5 bg-white border border-emerald-400 text-emerald-900 font-bold rounded text-xs hover:bg-emerald-100 transition-colors"
                  >
                    Manage in Media Tab →
                  </button>
                </div>
              ) : (
                <div className="flex items-center justify-between p-2.5 bg-amber-50/70 border border-amber-200 rounded-lg text-xs">
                  <span className="text-amber-800 font-medium">💡 No cover image set for this article yet.</span>
                  <button
                    type="button"
                    onClick={() => setActiveTab("media")}
                    className="px-2.5 py-1 bg-white border border-amber-300 text-amber-900 font-bold rounded text-xs hover:bg-amber-100"
                  >
                    + Add Cover Image
                  </button>
                </div>
              )}

              {/* 📸 Image Inserter Tool */}
              <div className="bg-marigold/10 border-2 border-brass-gold/40 rounded-xl p-4 space-y-3">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span className="text-base">📸</span>
                    <span className="text-xs uppercase font-bold text-maroon-deep">
                      Insert Image with Full SEO Details into Content
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowInsertModal(!showInsertModal)}
                    className="text-xs font-bold text-maroon-deep bg-white border border-brass-gold/40 px-3 py-1 rounded shadow-sm hover:bg-marigold/30 transition-colors"
                  >
                    {showInsertModal ? "Hide Image Tool ▲" : "+ Add Image with SEO ▼"}
                  </button>
                </div>

                {insertSuccessMsg && (
                  <div className="p-2 bg-emerald-100 text-emerald-800 text-xs font-bold rounded border border-emerald-300">
                    {insertSuccessMsg}
                  </div>
                )}

                {showInsertModal && (
                  <div className="pt-3 border-t border-brass-gold/20 space-y-3">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] uppercase font-bold text-maroon-deep mb-1">
                          Image URL <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="url"
                          value={insertImgUrl}
                          onChange={(e) => setInsertImgUrl(e.target.value)}
                          placeholder="https://images.unsplash.com/... or /images/..."
                          className="w-full bg-white border border-brass-gold/40 rounded p-2 text-xs outline-none focus:border-maroon-deep"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] uppercase font-bold text-maroon-deep mb-1">
                          Alt Text (Crucial for Google SEO) <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={insertImgAlt}
                          onChange={(e) => setInsertImgAlt(e.target.value)}
                          placeholder="Descriptive explanation for Google image search..."
                          className="w-full bg-white border border-brass-gold/40 rounded p-2 text-xs outline-none focus:border-maroon-deep"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] uppercase font-bold text-maroon-deep mb-1">
                          Image Title (Browser Tooltip)
                        </label>
                        <input
                          type="text"
                          value={insertImgTitle}
                          onChange={(e) => setInsertImgTitle(e.target.value)}
                          placeholder="Tooltip shown on mouse hover..."
                          className="w-full bg-white border border-brass-gold/40 rounded p-2 text-xs outline-none focus:border-maroon-deep"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] uppercase font-bold text-maroon-deep mb-1">
                          Image Caption (Displayed beneath image)
                        </label>
                        <input
                          type="text"
                          value={insertImgCaption}
                          onChange={(e) => setInsertImgCaption(e.target.value)}
                          placeholder="Caption text rendered on the live post..."
                          className="w-full bg-white border border-brass-gold/40 rounded p-2 text-xs outline-none focus:border-maroon-deep"
                        />
                      </div>
                    </div>

                    <div className="flex justify-end gap-2 pt-1">
                      <button
                        type="button"
                        onClick={handleInsertImageIntoContent}
                        className="bg-maroon-deep hover:bg-vermilion text-stone-ivory px-4 py-2 rounded text-xs font-bold uppercase tracking-wider transition-colors shadow-sm cursor-pointer"
                      >
                        ➕ Insert Image into Body & Save to Media SEO
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="block text-xs uppercase font-bold text-maroon-deep">
                    Article Body Content (Markdown & HTML Figures supported) <span className="text-red-500">*</span>
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
            <div className="space-y-6">
              <div className="p-4 bg-marigold/10 border border-marigold/30 rounded-lg text-xs text-maroon-deep">
                💡 <strong>Image SEO Suite:</strong> Manage the primary cover image as well as all in-content images appearing on this article. You can update their Alt text, titles, and captions anytime.
              </div>

              {/* SECTION A: COVER IMAGE */}
              <div className="bg-stone-ivory/50 border border-brass-gold/30 p-4 rounded-xl space-y-4">
                <span className="text-xs font-bold uppercase tracking-wider text-maroon-deep block border-b border-brass-gold/20 pb-2">
                  ⭐ Featured / Cover Image SEO
                </span>
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
                        Cover Alt Text (Crucial for SEO)
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
                        Cover Title (Tooltip attribute)
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
                        Cover Caption (Displayed beneath image)
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
                    <span className="text-xs uppercase font-bold text-charcoal-brown/60 mb-2">Live Cover Preview</span>
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

              {/* SECTION B: ALL IMAGES ON THIS PAGE (In-Content Catalog & Re-editing) */}
              <div className="bg-stone-ivory/50 border border-brass-gold/30 p-4 rounded-xl space-y-4">
                <div className="border-b border-brass-gold/20 pb-2 flex justify-between items-center">
                  <div>
                    <h4 className="font-serif-display text-sm uppercase font-bold text-maroon-deep">
                      🖼️ All Images on this Page & In-Content Media ({galleryImages.length + (coverImage ? 1 : 0)})
                    </h4>
                    <p className="text-[11px] text-charcoal-brown/70">
                      Re-edit SEO attributes (Alt text, Title, Caption) anytime. Changes auto-sync into your article content!
                    </p>
                  </div>
                </div>

                {galleryImages.length === 0 && !coverImage ? (
                  <div className="p-6 bg-white border border-brass-gold/20 rounded-lg text-center text-xs text-charcoal-brown/50 italic">
                    No images added yet. Add a cover image above or use the &quot;Insert Image with SEO&quot; tool in the Content tab!
                  </div>
                ) : (
                  <div className="space-y-4">
                    {/* Cover image row if set */}
                    {coverImage && (
                      <div className="p-3.5 bg-white border border-brass-gold/30 rounded-lg flex flex-col sm:flex-row gap-4 items-start shadow-sm">
                        <img
                          src={coverImage}
                          alt={imageAlt || "Cover"}
                          className="w-28 h-20 object-cover rounded border border-brass-gold/30 shrink-0"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = "https://placehold.co/300x200?text=Cover";
                          }}
                        />
                        <div className="flex-1 space-y-1">
                          <span className="text-[10px] uppercase font-bold bg-marigold/30 text-maroon-deep px-2 py-0.5 rounded border border-marigold">
                            ⭐ Primary Cover Image
                          </span>
                          <p className="text-xs text-charcoal-brown font-semibold mt-1">
                            <strong>Alt Text:</strong> {imageAlt || <span className="text-red-500 italic">No Alt text set</span>}
                          </p>
                          <p className="text-[11px] text-charcoal-brown/70">
                            <strong>Title:</strong> {imageTitle || "—"} | <strong>Caption:</strong> {imageCaption || "—"}
                          </p>
                        </div>
                      </div>
                    )}

                    {/* In-content images catalog */}
                    {galleryImages.map((img, idx) => (
                      <div
                        key={img.id || idx}
                        className="p-3.5 bg-white border border-brass-gold/30 rounded-lg space-y-3 shadow-sm"
                      >
                        <div className="flex flex-col sm:flex-row gap-4 items-start">
                          <img
                            src={img.url}
                            alt={img.alt || "In-content"}
                            className="w-28 h-20 object-cover rounded border border-brass-gold/30 shrink-0"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = "https://placehold.co/300x200?text=Image";
                            }}
                          />
                          <div className="flex-1 space-y-1">
                            <span className="text-[10px] uppercase font-bold bg-brass-gold/20 text-maroon-deep px-2 py-0.5 rounded">
                              In-Content Image #{idx + 1}
                            </span>
                            <p className="text-xs text-charcoal-brown font-semibold mt-1">
                              <strong>Alt Text:</strong> {img.alt || <span className="text-red-500 italic">Missing Alt text</span>}
                            </p>
                            <p className="text-[11px] text-charcoal-brown/70">
                              <strong>Title:</strong> {img.title || "—"} | <strong>Caption:</strong> {img.caption || "—"}
                            </p>
                            <p className="text-[10px] font-mono text-charcoal-brown/50 truncate max-w-md">
                              {img.url}
                            </p>
                          </div>

                          <div className="flex sm:flex-col gap-2 shrink-0">
                            <button
                              type="button"
                              onClick={() => handleStartEditImage(img)}
                              className="px-3 py-1 bg-marigold hover:bg-brass-gold text-maroon-deep text-xs font-bold rounded transition-colors"
                            >
                              ✏️ Edit SEO Details
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                const snippet = `<figure class="my-6 text-center"><img src="${img.url}" alt="${img.alt}" title="${img.title}" class="rounded-lg shadow-md mx-auto max-w-full h-auto" loading="lazy" />${img.caption ? `<figcaption class="text-xs text-charcoal-brown/70 italic mt-2">${img.caption}</figcaption>` : ""}</figure>`;
                                navigator.clipboard.writeText(snippet);
                                alert("Copied image HTML embed code to clipboard!");
                              }}
                              className="px-3 py-1 bg-stone-ivory border border-brass-gold/40 text-charcoal-brown text-xs font-bold rounded hover:bg-marigold/20 transition-colors"
                            >
                              📋 Copy Embed
                            </button>
                            <button
                              type="button"
                              onClick={() => handleRemoveGalleryImage(img.id)}
                              className="px-3 py-1 bg-red-50 hover:bg-red-100 text-red-700 text-xs font-bold rounded border border-red-200 transition-colors"
                            >
                              🗑️ Remove
                            </button>
                          </div>
                        </div>

                        {/* Inline editing form when clicked */}
                        {editingImageId === img.id && (
                          <div className="pt-3 border-t border-brass-gold/20 bg-marigold/5 p-3 rounded space-y-3">
                            <span className="text-xs font-bold uppercase text-maroon-deep block">
                              Edit SEO Attributes for Image #{idx + 1}
                            </span>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              <div>
                                <label className="block text-[11px] uppercase font-bold text-maroon-deep mb-1">
                                  Image URL
                                </label>
                                <input
                                  type="url"
                                  value={editImgUrl}
                                  onChange={(e) => setEditImgUrl(e.target.value)}
                                  className="w-full bg-white border border-brass-gold/40 rounded p-2 text-xs outline-none"
                                />
                              </div>
                              <div>
                                <label className="block text-[11px] uppercase font-bold text-maroon-deep mb-1">
                                  Alt Text (Google Image SEO)
                                </label>
                                <input
                                  type="text"
                                  value={editImgAlt}
                                  onChange={(e) => setEditImgAlt(e.target.value)}
                                  className="w-full bg-white border border-brass-gold/40 rounded p-2 text-xs outline-none"
                                />
                              </div>
                              <div>
                                <label className="block text-[11px] uppercase font-bold text-maroon-deep mb-1">
                                  Image Title (Tooltip)
                                </label>
                                <input
                                  type="text"
                                  value={editImgTitle}
                                  onChange={(e) => setEditImgTitle(e.target.value)}
                                  className="w-full bg-white border border-brass-gold/40 rounded p-2 text-xs outline-none"
                                />
                              </div>
                              <div>
                                <label className="block text-[11px] uppercase font-bold text-maroon-deep mb-1">
                                  Caption
                                </label>
                                <input
                                  type="text"
                                  value={editImgCaption}
                                  onChange={(e) => setEditImgCaption(e.target.value)}
                                  className="w-full bg-white border border-brass-gold/40 rounded p-2 text-xs outline-none"
                                />
                              </div>
                            </div>
                            <div className="flex justify-end gap-2">
                              <button
                                type="button"
                                onClick={() => setEditingImageId(null)}
                                className="px-3 py-1 bg-stone-ivory border border-brass-gold/40 text-xs font-bold rounded"
                              >
                                Cancel
                              </button>
                              <button
                                type="button"
                                onClick={() => handleSaveEditImage(img.id)}
                                className="px-4 py-1 bg-maroon-deep text-stone-ivory text-xs font-bold rounded hover:bg-vermilion"
                              >
                                Save SEO Details & Sync to Content
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
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
