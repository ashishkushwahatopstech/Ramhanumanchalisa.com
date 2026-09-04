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

export interface BenefitItem {
  id: string;
  slug: string;
  title: string;
  metaTitle?: string | null;
  metaDescription?: string | null;
  situation: string;
  icon?: string | null;
  description: string;
  recommendedChants?: string | null;
  targetVerseNumber?: number | null;
  targetVerseText?: string | null;
  targetVerseTranslation?: string | null;
  detailedExposition: string;
  actionSteps?: string | null; // JSON array of string
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

interface BenefitEditorFormProps {
  initialBenefits: BenefitItem[];
}

export default function BenefitEditorForm({ initialBenefits }: BenefitEditorFormProps) {
  const [benefits, setBenefits] = useState<BenefitItem[]>(initialBenefits);

  // Active Tab
  const [activeTab, setActiveTab] = useState<"content" | "verse" | "media" | "seo" | "faqs" | "links">("content");

  // Form States
  const [editingId, setEditingId] = useState<string | null>(null);
  const [title, setTitle] = useState<string>("");
  const [slug, setSlug] = useState<string>("");
  const [metaTitle, setMetaTitle] = useState<string>("");
  const [metaDescription, setMetaDescription] = useState<string>("");
  const [situation, setSituation] = useState<string>("");
  const [icon, setIcon] = useState<string>("🙏");
  const [description, setDescription] = useState<string>("");

  // Verse States
  const [recommendedChants, setRecommendedChants] = useState<string>("");
  const [targetVerseNumber, setTargetVerseNumber] = useState<string>("1");
  const [targetVerseText, setTargetVerseText] = useState<string>("");
  const [targetVerseTranslation, setTargetVerseTranslation] = useState<string>("");
  const [detailedExposition, setDetailedExposition] = useState<string>("");
  const [actionSteps, setActionSteps] = useState<string[]>([]);
  const [newActionStep, setNewActionStep] = useState<string>("");

  // Media States (Cover)
  const [coverImage, setCoverImage] = useState<string>("");
  const [imageAlt, setImageAlt] = useState<string>("");
  const [imageTitle, setImageTitle] = useState<string>("");
  const [imageCaption, setImageCaption] = useState<string>("");
  const [isUploadingCover, setIsUploadingCover] = useState<boolean>(false);
  const [coverUploadMsg, setCoverUploadMsg] = useState<{ text: string; type: "success" | "error" } | null>(null);

  // All in-content images on this page
  const [galleryImages, setGalleryImages] = useState<ContentImageItem[]>([]);

  // Content Image Inserter Tool States
  const [showInsertModal, setShowInsertModal] = useState<boolean>(false);
  const [insertImgUrl, setInsertImgUrl] = useState<string>("");
  const [insertImgAlt, setInsertImgAlt] = useState<string>("");
  const [insertImgTitle, setInsertImgTitle] = useState<string>("");
  const [insertImgCaption, setInsertImgCaption] = useState<string>("");
  const [insertSuccessMsg, setInsertSuccessMsg] = useState<string | null>(null);
  const [isUploadingInsertImg, setIsUploadingInsertImg] = useState<boolean>(false);
  const [insertUploadMsg, setInsertUploadMsg] = useState<{ text: string; type: "success" | "error" } | null>(null);

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

  // Auto-generate slug from title
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
    setSituation("");
    setIcon("🙏");
    setDescription("");
    setRecommendedChants("");
    setTargetVerseNumber("1");
    setTargetVerseText("");
    setTargetVerseTranslation("");
    setDetailedExposition("");
    setActionSteps([]);
    setNewActionStep("");
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
    setCoverUploadMsg(null);
    setInsertUploadMsg(null);
    setEditingImageId(null);
    setPublished(true);
    setActiveTab("content");
  };

  // Dynamic Image Upload Handlers for Benefits
  const handleUploadCoverFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingCover(true);
    setCoverUploadMsg(null);

    try {
      const fd = new FormData();
      fd.append("file", file);
      fd.append("folder", "benefits");

      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: fd,
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to upload image");
      }

      setCoverImage(data.url);
      setCoverUploadMsg({ text: `Uploaded successfully: ${data.fileName}`, type: "success" });

      // Auto-populate Alt & Title if empty
      if (!imageAlt.trim()) {
        const cleanName = data.fileName
          .replace(/\.[^/.]+$/, "")
          .replace(/[-_]/g, " ")
          .replace(/\b\w/g, (c: string) => c.toUpperCase());
        setImageAlt(title ? `${title} — ${cleanName}` : cleanName);
      }
      if (!imageTitle.trim()) {
        setImageTitle(title || "Shri Hanuman Chalisa Divine Benefit");
      }
    } catch (err: any) {
      setCoverUploadMsg({ text: err.message || "Image upload failed", type: "error" });
    } finally {
      setIsUploadingCover(false);
      e.target.value = "";
    }
  };

  const handleUploadInsertFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingInsertImg(true);
    setInsertUploadMsg(null);

    try {
      const fd = new FormData();
      fd.append("file", file);
      fd.append("folder", "benefits");

      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: fd,
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to upload image");
      }

      setInsertImgUrl(data.url);
      setInsertUploadMsg({ text: `Uploaded: ${data.fileName}`, type: "success" });

      if (!insertImgAlt.trim()) {
        const cleanName = data.fileName
          .replace(/\.[^/.]+$/, "")
          .replace(/[-_]/g, " ")
          .replace(/\b\w/g, (c: string) => c.toUpperCase());
        setInsertImgAlt(cleanName);
      }
      if (!insertImgTitle.trim()) {
        setInsertImgTitle(title || "Hanuman Grace & Healing");
      }
    } catch (err: any) {
      setInsertUploadMsg({ text: err.message || "Upload failed", type: "error" });
    } finally {
      setIsUploadingInsertImg(false);
      e.target.value = "";
    }
  };

  const handleEdit = (benefit: BenefitItem) => {
    setEditingId(benefit.id);
    setTitle(benefit.title || "");
    setSlug(benefit.slug || "");
    setMetaTitle(benefit.metaTitle || "");
    setMetaDescription(benefit.metaDescription || "");
    setSituation(benefit.situation || "");
    setIcon(benefit.icon || "🙏");
    setDescription(benefit.description || "");
    setRecommendedChants(benefit.recommendedChants || "");
    setTargetVerseNumber(benefit.targetVerseNumber ? String(benefit.targetVerseNumber) : "1");
    setTargetVerseText(benefit.targetVerseText || "");
    setTargetVerseTranslation(benefit.targetVerseTranslation || "");
    setDetailedExposition(benefit.detailedExposition || "");
    setCoverImage(benefit.coverImage || "");
    setImageAlt(benefit.imageAlt || "");
    setImageTitle(benefit.imageTitle || "");
    setImageCaption(benefit.imageCaption || "");
    setFocusKeywords(benefit.focusKeywords || "");
    setSources(benefit.sources || "");
    setPublished(benefit.published);

    let parsedGallery: ContentImageItem[] = [];
    try {
      if (benefit.galleryImages) {
        parsedGallery = typeof benefit.galleryImages === "string" ? JSON.parse(benefit.galleryImages) : benefit.galleryImages;
      }
    } catch {
      parsedGallery = [];
    }

    // Auto-discover images inside detailedExposition if gallery was empty
    if (parsedGallery.length === 0 && benefit.detailedExposition) {
      const imgRegex = /<img\s+[^>]*src="([^"]*)"[^>]*>/gi;
      let match;
      let idx = 1;
      while ((match = imgRegex.exec(benefit.detailedExposition)) !== null) {
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
      if (benefit.actionSteps) {
        setActionSteps(JSON.parse(benefit.actionSteps));
      } else {
        setActionSteps([]);
      }
    } catch {
      setActionSteps([]);
    }

    try {
      if (benefit.internalLinks) {
        setInternalLinks(JSON.parse(benefit.internalLinks));
      } else {
        setInternalLinks([]);
      }
    } catch {
      setInternalLinks([]);
    }

    try {
      if (benefit.faqs) {
        setFaqs(JSON.parse(benefit.faqs));
      } else {
        setFaqs([]);
      }
    } catch {
      setFaqs([]);
    }

    window.scrollTo({ top: 150, behavior: "smooth" });
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this benefit page?")) return;

    try {
      const res = await fetch(`/api/admin/benefits?id=${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setBenefits(benefits.filter((b) => b.id !== id));
        setMessage({ text: "Benefit page deleted successfully!", type: "success" });
        if (editingId === id) resetForm();
      } else {
        const data = await res.json();
        setMessage({ text: data.error || "Failed to delete benefit page", type: "error" });
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

    setDetailedExposition((prev) => prev + figureSnippet);
    setGalleryImages((prev) => [...prev, newImage]);

    setInsertImgUrl("");
    setInsertImgAlt("");
    setInsertImgTitle("");
    setInsertImgCaption("");
    setShowInsertModal(false);
    setInsertSuccessMsg("✅ Image inserted into spiritual exposition & saved to Media SEO list!");
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

    if (detailedExposition.includes(oldImg.url)) {
      const oldSnippetRegex = new RegExp(
        `<figure[\\s\\S]*?src=["']${oldImg.url.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}["'][\\s\\S]*?<\\/figure>`,
        "i"
      );

      const newSnippet = `<figure class="my-6 text-center">
  <img src="${updatedImg.url}" alt="${updatedImg.alt}" title="${updatedImg.title}" class="rounded-lg shadow-md mx-auto max-w-full h-auto" loading="lazy" />
  ${updatedImg.caption ? `<figcaption class="text-xs text-charcoal-brown/70 italic mt-2">${updatedImg.caption}</figcaption>` : ""}
</figure>`;

      if (oldSnippetRegex.test(detailedExposition)) {
        setDetailedExposition((prev) => prev.replace(oldSnippetRegex, newSnippet));
      }
    }

    setEditingImageId(null);
  };

  const handleRemoveGalleryImage = (id: string) => {
    if (!confirm("Remove this image from the Media & SEO list?")) return;
    setGalleryImages((prev) => prev.filter((img) => img.id !== id));
  };

  const handleAddActionStep = () => {
    if (!newActionStep.trim()) return;
    setActionSteps([...actionSteps, newActionStep.trim()]);
    setNewActionStep("");
  };

  const handleRemoveActionStep = (index: number) => {
    setActionSteps(actionSteps.filter((_, i) => i !== index));
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
      situation: situation.trim(),
      icon: icon.trim() || "🙏",
      description: description.trim(),
      recommendedChants: recommendedChants.trim() || null,
      targetVerseNumber: targetVerseNumber ? parseInt(targetVerseNumber, 10) : null,
      targetVerseText: targetVerseText.trim() || null,
      targetVerseTranslation: targetVerseTranslation.trim() || null,
      detailedExposition: detailedExposition.trim(),
      actionSteps: actionSteps.length > 0 ? JSON.stringify(actionSteps) : null,
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
      const res = await fetch("/api/admin/benefits", {
        method: editingId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok) {
        const savedBenefit = { ...payload, ...data };
        setMessage({
          text: editingId ? "🟢 Benefit updated & images saved successfully!" : "🟢 Benefit created successfully!",
          type: "success",
        });

        if (editingId) {
          setBenefits(benefits.map((b) => (b.id === editingId || b.slug === savedBenefit.slug ? savedBenefit : b)));
          setEditingId(savedBenefit.id);
          if (savedBenefit.coverImage) setCoverImage(savedBenefit.coverImage);
          if (savedBenefit.galleryImages) {
            try {
              setGalleryImages(typeof savedBenefit.galleryImages === "string" ? JSON.parse(savedBenefit.galleryImages) : savedBenefit.galleryImages);
            } catch {}
          }
        } else {
          setBenefits([savedBenefit, ...benefits]);
          resetForm();
        }
      } else {
        setMessage({ text: data.error || "Failed to save benefit", type: "error" });
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
      {/* Notification */}
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
        {/* Header Banner */}
        <div className="bg-maroon-deep p-4 sm:p-6 text-stone-ivory flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <span className="text-xs uppercase tracking-widest text-marigold font-bold">
              {editingId ? "✏️ Edit Benefit" : "✨ Create New Benefit"}
            </span>
            <h2 className="text-lg sm:text-xl font-serif-display font-bold">
              {editingId ? `Editing: ${title || "Untitled"}` : "Hanuman Chalisa Benefit Page Studio"}
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
            🌟 Benefit Overview
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("verse")}
            className={`px-4 py-2.5 text-xs font-bold uppercase tracking-wider rounded-t-lg transition-all border-t-2 border-x-2 ${
              activeTab === "verse"
                ? "bg-stone-ivory border-brass-gold/50 text-maroon-deep -mb-px shadow-sm"
                : "border-transparent text-charcoal-brown/60 hover:text-maroon-deep"
            }`}
          >
            📜 Target Verse & Vidhi
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
            🖼️ Image & Media SEO {coverImage ? "•" : ""}
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
          {/* TAB 1: OVERVIEW */}
          {activeTab === "content" && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs uppercase font-bold text-maroon-deep mb-1">
                  Benefit Title (H1) <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={handleTitleChange}
                  placeholder="e.g. Hanuman Chalisa for Mental Peace & Anxiety Relief"
                  className="w-full bg-white border border-brass-gold/40 rounded p-2.5 text-sm focus:border-maroon-deep focus:ring-1 focus:ring-maroon-deep outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs uppercase font-bold text-maroon-deep mb-1">
                    URL Slug <span className="text-red-500">*</span>
                  </label>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-charcoal-brown/60 select-none hidden sm:inline">
                      /hanuman-chalisa-benefits/
                    </span>
                    <input
                      type="text"
                      required
                      value={slug}
                      onChange={(e) => setSlug(e.target.value)}
                      placeholder="mental-peace-anxiety"
                      className="flex-1 bg-white border border-brass-gold/40 rounded p-2 text-xs font-mono text-charcoal-brown outline-none focus:border-maroon-deep"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase font-bold text-maroon-deep mb-1">
                    Emoji / Icon
                  </label>
                  <input
                    type="text"
                    value={icon}
                    onChange={(e) => setIcon(e.target.value)}
                    placeholder="🕊️ or 🌱"
                    className="w-full bg-white border border-brass-gold/40 rounded p-2 text-sm text-center outline-none focus:border-maroon-deep"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase font-bold text-maroon-deep mb-1">
                  Life Situation / Problem Solved <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={situation}
                  onChange={(e) => setSituation(e.target.value)}
                  placeholder="e.g. Chronic restlessness, overthinking, panic attacks, or sleep disturbances"
                  className="w-full bg-white border border-brass-gold/40 rounded p-2.5 text-xs outline-none focus:border-maroon-deep"
                />
              </div>

              <div>
                <label className="block text-xs uppercase font-bold text-maroon-deep mb-1">
                  Spiritual Summary / Intro Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  required
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Explain how Lord Hanuman's grace alleviates this particular life challenge..."
                  className="w-full bg-white border border-brass-gold/40 rounded p-2.5 text-xs leading-relaxed outline-none focus:border-maroon-deep"
                />
              </div>
            </div>
          )}

          {/* TAB 2: VERSE & VIDHI */}
          {activeTab === "verse" && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase font-bold text-maroon-deep mb-1">
                    Target Verse Number (1 - 40)
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={40}
                    value={targetVerseNumber}
                    onChange={(e) => setTargetVerseNumber(e.target.value)}
                    className="w-full bg-white border border-brass-gold/40 rounded p-2.5 text-xs outline-none focus:border-maroon-deep"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase font-bold text-maroon-deep mb-1">
                    Recommended Chants Schedule
                  </label>
                  <input
                    type="text"
                    value={recommendedChants}
                    onChange={(e) => setRecommendedChants(e.target.value)}
                    placeholder="e.g. Recite 11 times daily at sunrise or 108 times on Saturdays"
                    className="w-full bg-white border border-brass-gold/40 rounded p-2.5 text-xs outline-none focus:border-maroon-deep"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase font-bold text-maroon-deep mb-1">
                  Target Verse Devanagari Text
                </label>
                <input
                  type="text"
                  value={targetVerseText}
                  onChange={(e) => setTargetVerseText(e.target.value)}
                  placeholder="e.g. संकट कटै मिटै सब पीरा। जो सुमिरै हनुमत बलबीरा।।"
                  className="w-full bg-white border border-brass-gold/40 rounded p-2.5 text-sm font-serif outline-none focus:border-maroon-deep"
                />
              </div>

              <div>
                <label className="block text-xs uppercase font-bold text-maroon-deep mb-1">
                  Verse Translation / English Meaning
                </label>
                <textarea
                  rows={2}
                  value={targetVerseTranslation}
                  onChange={(e) => setTargetVerseTranslation(e.target.value)}
                  placeholder="Sankat Kate Mite Sab Peera... (All distress is dispelled and all agony erased...)"
                  className="w-full bg-white border border-brass-gold/40 rounded p-2.5 text-xs outline-none focus:border-maroon-deep"
                />
              </div>

              {/* Cover Image Quick Indicator */}
              {coverImage ? (
                <div className="flex items-center justify-between p-3 bg-emerald-50 border border-emerald-300 rounded-lg text-xs shadow-sm">
                  <div className="flex items-center gap-3">
                    <img src={coverImage} alt={imageAlt || "Cover preview"} className="w-12 h-12 object-cover rounded shadow border border-emerald-400" />
                    <div>
                      <p className="font-bold text-emerald-900">🖼️ Benefit Cover Image Active</p>
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
                  <span className="text-amber-800 font-medium">💡 No cover image set for this benefit page yet.</span>
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
                      Insert Image with Full SEO Details into Exposition
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
                    {/* Direct Upload Option for Content Image */}
                    <div className="p-2.5 bg-white border-2 border-dashed border-brass-gold/50 rounded-lg flex items-center justify-between gap-3">
                      <div className="space-y-0.5">
                        <span className="text-[11px] font-bold text-maroon-deep flex items-center gap-1">
                          <span>📁</span> Upload Image to /images/benefits/
                        </span>
                        <p className="text-[10px] text-charcoal-brown/60">
                          Select local file to automatically upload & populate URL
                        </p>
                      </div>
                      <label className="cursor-pointer inline-flex items-center gap-1 bg-maroon-deep hover:bg-vermilion text-stone-ivory px-2.5 py-1 rounded text-[11px] font-bold uppercase tracking-wider transition-colors shadow-sm shrink-0">
                        <span>{isUploadingInsertImg ? "⏳ Uploading..." : "⬆️ Upload Local File"}</span>
                        <input
                          type="file"
                          accept="image/webp,image/png,image/jpeg,image/avif,image/svg+xml"
                          disabled={isUploadingInsertImg}
                          onChange={handleUploadInsertFile}
                          className="hidden"
                        />
                      </label>
                    </div>
                    {insertUploadMsg && (
                      <p className={`text-[11px] font-semibold ${insertUploadMsg.type === "success" ? "text-emerald-700" : "text-red-600"}`}>
                        {insertUploadMsg.type === "success" ? "✓ " : "✕ "} {insertUploadMsg.text}
                      </p>
                    )}

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
                        ➕ Insert Image into Exposition & Save to Media SEO
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-xs uppercase font-bold text-maroon-deep mb-1">
                  Detailed Spiritual Exposition <span className="text-red-500">*</span>
                </label>
                <textarea
                  required
                  rows={6}
                  value={detailedExposition}
                  onChange={(e) => setDetailedExposition(e.target.value)}
                  placeholder="In-depth theological explanation of why this chaupai generates this result..."
                  className="w-full bg-white border border-brass-gold/40 rounded p-2.5 text-xs leading-relaxed outline-none focus:border-maroon-deep"
                />
              </div>

              {/* Action Steps Repeater */}
              <div className="bg-white border border-brass-gold/30 p-4 rounded-lg space-y-3">
                <h4 className="text-xs uppercase font-bold text-maroon-deep">Step-by-Step Path Vidhi / Ritual Checklist</h4>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newActionStep}
                    onChange={(e) => setNewActionStep(e.target.value)}
                    placeholder="e.g. Light a brass diya with pure cow ghee facing North"
                    className="flex-1 bg-stone-ivory/50 border border-brass-gold/40 rounded p-2 text-xs outline-none"
                  />
                  <button
                    type="button"
                    onClick={handleAddActionStep}
                    className="bg-marigold hover:bg-brass-gold text-maroon-deep font-bold px-4 py-2 rounded text-xs uppercase"
                  >
                    + Add Step
                  </button>
                </div>

                {actionSteps.length > 0 && (
                  <ol className="list-decimal list-inside space-y-2 pt-2 text-xs text-charcoal-brown">
                    {actionSteps.map((step, idx) => (
                      <li key={idx} className="flex justify-between items-center bg-stone-ivory p-2 rounded border border-brass-gold/20">
                        <span>{step}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveActionStep(idx)}
                          className="text-red-600 hover:text-red-800 font-bold ml-2"
                        >
                          ✕
                        </button>
                      </li>
                    ))}
                  </ol>
                )}
              </div>
            </div>
          )}

          {/* TAB 3: MEDIA & IMAGE SEO */}
          {activeTab === "media" && (
            <div className="space-y-6">
              <div className="p-4 bg-marigold/10 border border-marigold/30 rounded-lg text-xs text-maroon-deep">
                💡 <strong>Featured Image for Benefits:</strong> Provide high-quality artwork representing Lord Hanuman with complete Alt text, Title, and descriptive Caption.
              </div>

              {/* SECTION A: COVER IMAGE */}
              <div className="bg-stone-ivory/50 border border-brass-gold/30 p-4 rounded-xl space-y-4">
                <span className="text-xs font-bold uppercase tracking-wider text-maroon-deep block border-b border-brass-gold/20 pb-2">
                  ⭐ Featured / Cover Image SEO
                </span>

                {/* Direct Image Upload to /images/benefits/ */}
                <div className="p-3 bg-white border-2 border-dashed border-brass-gold/50 rounded-lg hover:border-maroon-deep transition-colors">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="space-y-0.5">
                      <label className="text-xs font-bold text-maroon-deep flex items-center gap-1.5 cursor-pointer">
                        <span>📁</span> Upload Image to /images/benefits/
                      </label>
                      <p className="text-[11px] text-charcoal-brown/60">
                        Select local WebP/PNG/JPG. Saves to project folder & sets URL automatically without manual copying.
                      </p>
                    </div>
                    <label className="cursor-pointer inline-flex items-center justify-center gap-1.5 bg-maroon-deep hover:bg-vermilion text-stone-ivory px-3.5 py-2 rounded text-xs font-bold uppercase tracking-wider transition-colors shadow-sm shrink-0">
                      <span>{isUploadingCover ? "⏳ Uploading..." : "⬆️ Choose Local Image"}</span>
                      <input
                        type="file"
                        accept="image/webp,image/png,image/jpeg,image/avif,image/svg+xml"
                        disabled={isUploadingCover}
                        onChange={handleUploadCoverFile}
                        className="hidden"
                      />
                    </label>
                  </div>
                  {coverUploadMsg && (
                    <p className={`mt-2 text-[11px] font-semibold ${coverUploadMsg.type === "success" ? "text-emerald-700" : "text-red-600"}`}>
                      {coverUploadMsg.type === "success" ? "✓ " : "✕ "} {coverUploadMsg.text}
                    </p>
                  )}
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
                        placeholder="https://... or /images/benefits/peace.jpg"
                        className="w-full bg-white border border-brass-gold/40 rounded p-2.5 text-xs outline-none focus:border-maroon-deep"
                      />
                    </div>

                    <div>
                      <label className="block text-xs uppercase font-bold text-maroon-deep mb-1">
                        Image Alt Text (Crucial for Google SEO)
                      </label>
                      <input
                        type="text"
                        value={imageAlt}
                        onChange={(e) => setImageAlt(e.target.value)}
                        placeholder="e.g. Lord Hanuman removing all fears and negative energies"
                        className="w-full bg-white border border-brass-gold/40 rounded p-2.5 text-xs outline-none focus:border-maroon-deep"
                      />
                    </div>

                    <div>
                      <label className="block text-xs uppercase font-bold text-maroon-deep mb-1">
                        Image Title (Tooltip)
                      </label>
                      <input
                        type="text"
                        value={imageTitle}
                        onChange={(e) => setImageTitle(e.target.value)}
                        placeholder="e.g. Sankat Mochan Hanuman blessing"
                        className="w-full bg-white border border-brass-gold/40 rounded p-2.5 text-xs outline-none focus:border-maroon-deep"
                      />
                    </div>

                    <div>
                      <label className="block text-xs uppercase font-bold text-maroon-deep mb-1">
                        Image Caption
                      </label>
                      <input
                        type="text"
                        value={imageCaption}
                        onChange={(e) => setImageCaption(e.target.value)}
                        placeholder="e.g. Meditation on Hanuman removes deep anxiety and fear"
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

              {/* SECTION B: ALL IMAGES ON THIS PAGE (In-Content Catalog & Re-editing) */}
              <div className="bg-stone-ivory/50 border border-brass-gold/30 p-4 rounded-xl space-y-4">
                <div className="border-b border-brass-gold/20 pb-2 flex justify-between items-center">
                  <div>
                    <h4 className="font-serif-display text-sm uppercase font-bold text-maroon-deep">
                      🖼️ All Images on this Page & In-Content Media ({galleryImages.length + (coverImage ? 1 : 0)})
                    </h4>
                    <p className="text-[11px] text-charcoal-brown/70">
                      Re-edit SEO attributes (Alt text, Title, Caption) anytime. Changes auto-sync into your exposition text!
                    </p>
                  </div>
                </div>

                {galleryImages.length === 0 && !coverImage ? (
                  <div className="p-6 bg-white border border-brass-gold/20 rounded-lg text-center text-xs text-charcoal-brown/50 italic">
                    No images added yet. Add a cover image above or use the &quot;Insert Image with SEO&quot; tool in Tab 2!
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
                                Save SEO Details & Sync to Exposition
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

          {/* TAB 4: SEO SUITE & SERP PREVIEW */}
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
                      placeholder={title ? `${title} — Hanuman Chalisa Guide` : "Unique SEO Meta Title"}
                      className="w-full bg-white border border-brass-gold/40 rounded p-2.5 text-xs outline-none focus:border-maroon-deep"
                    />
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
                      placeholder="Concise summary under 150 chars explaining benefits and chanting schedules..."
                      className={`w-full bg-white border rounded p-2.5 text-xs outline-none ${
                        isDescOverLimit ? "border-red-500 focus:ring-1 focus:ring-red-500" : "border-brass-gold/40 focus:border-maroon-deep"
                      }`}
                    />
                    {isDescOverLimit && (
                      <p className="text-[11px] text-red-600 font-semibold mt-1">
                        ⚠️ Warning: Google cuts off meta descriptions exceeding 150 characters on mobile.
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
                      placeholder="e.g. hanuman chalisa for anxiety, fear removal chaupai 24"
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
                          https://ramhanumanchalisa.com &gt; hanuman-chalisa-benefits &gt; {slug || "your-slug"}
                        </span>
                      </div>
                    </div>
                    <h3 className="text-base text-[#1a0dab] hover:underline font-medium cursor-pointer leading-snug pt-1">
                      {metaTitle || (title ? `${title} — Hanuman Chalisa Chanting Guide` : "Benefit Guide — Ram Hanuman Chalisa")}
                    </h3>
                    <p className="text-xs text-gray-600 leading-normal line-clamp-2">
                      {metaDescription || description || "Your meta description snippet will appear here in Google Search results. Keep it engaging and under 150 characters."}
                    </p>
                  </div>
                  <p className="text-[11px] text-charcoal-brown/50 mt-3 italic">
                    Simulation of Google search snippet preview.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: FAQS SCHEMA GENERATOR */}
          {activeTab === "faqs" && (
            <div className="space-y-6">
              <div className="p-4 bg-brass-gold/10 border border-brass-gold/30 rounded-lg text-xs text-charcoal-brown">
                ✨ <strong>Google Search Console FAQPage Schema:</strong> Every Q&A entered here automatically outputs valid <code>@type: FAQPage</code> JSON-LD structured data on this benefit page and renders an interactive FAQ accordion.
              </div>

              {/* Add New FAQ */}
              <div className="bg-white border border-brass-gold/30 p-4 rounded-lg space-y-3">
                <h4 className="text-xs uppercase font-bold text-maroon-deep">Add New FAQ for this Benefit</h4>
                <div>
                  <label className="block text-[11px] uppercase font-bold text-charcoal-brown/70 mb-1">
                    Question
                  </label>
                  <input
                    type="text"
                    value={newFaqQuestion}
                    onChange={(e) => setNewFaqQuestion(e.target.value)}
                    placeholder="e.g. How many days should I recite this Chaupai to overcome fear?"
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
                    placeholder="e.g. Devotees traditionally take a sankalp of 21 or 40 consecutive days chanting 11 or 108 times daily..."
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
                <h4 className="text-xs uppercase font-bold text-maroon-deep">Current FAQs for this Benefit ({faqs.length})</h4>
                {faqs.length === 0 ? (
                  <p className="text-xs text-charcoal-brown/50 italic">No FAQs added yet.</p>
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

          {/* TAB 6: INTERNAL LINKS & SOURCES */}
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
                      placeholder="e.g. Read Shri Hanuman Chalisa Path Vidhi"
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
                      placeholder="e.g. /shri-hanuman-chalisa-path-vidhi"
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

              {/* Scriptural Citations */}
              <div>
                <label className="block text-xs uppercase font-bold text-maroon-deep mb-1">
                  Scriptural Citations & Sources (References)
                </label>
                <textarea
                  rows={4}
                  value={sources}
                  onChange={(e) => setSources(e.target.value)}
                  placeholder="e.g. Goswami Tulsidas Hanuman Bahuk, Sri Ramcharitmanas Ayodhya Kanda..."
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
                {isSubmitting ? "Saving Benefit..." : editingId ? "Update Benefit" : "Publish Benefit"}
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Benefits List Section */}
      <div className="bg-stone-ivory border-2 border-brass-gold/40 rounded-xl p-6 shadow-sm space-y-4">
        <h3 className="font-serif-display text-lg font-bold text-maroon-deep uppercase border-b border-brass-gold/20 pb-2">
          Published & Custom Benefit Pages ({benefits.length})
        </h3>

        {benefits.length === 0 ? (
          <p className="text-xs text-charcoal-brown/60 italic">No custom benefits in database yet. Existing static benefits will remain served until overridden.</p>
        ) : (
          <div className="divide-y divide-brass-gold/20">
            {benefits.map((b) => (
              <div key={b.id} className="py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{b.icon || "🙏"}</span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                        b.published ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800"
                      }`}
                    >
                      {b.published ? "Published" : "Draft"}
                    </span>
                    <h4 className="font-bold text-maroon-deep text-sm">{b.title}</h4>
                  </div>
                  <p className="text-xs text-charcoal-brown/60 font-mono">
                    /hanuman-chalisa-benefits/{b.slug}
                  </p>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-auto">
                  <a
                    href={`/hanuman-chalisa-benefits/${b.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 text-xs font-bold border border-brass-gold/40 text-charcoal-brown rounded hover:bg-white transition-colors"
                  >
                    View ↗
                  </a>
                  <button
                    type="button"
                    onClick={() => handleEdit(b)}
                    className="px-3 py-1.5 text-xs font-bold bg-marigold text-maroon-deep rounded hover:bg-brass-gold transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(b.id)}
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
