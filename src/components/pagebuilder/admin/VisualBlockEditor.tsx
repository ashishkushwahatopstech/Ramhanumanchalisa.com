"use client";

import React, { useState, useEffect } from "react";
import type { PageModel, SectionModel, BlockInstance, BlockType } from "../../../lib/pagebuilder/schema";

interface Props {
  initialSlug: string;
  initialPageData?: PageModel | null;
}

export default function VisualBlockEditor({ initialSlug, initialPageData }: Props) {
  const [page, setPage] = useState<PageModel | null>(initialPageData || null);
  const [loading, setLoading] = useState(!initialPageData);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<"blocks" | "seo" | "preview">("blocks");
  const [previewWidth, setPreviewWidth] = useState<"desktop" | "mobile">("desktop");
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null);
  const [isScriptureEditor, setIsScriptureEditor] = useState(false);
  const [scriptureWarningAccepted, setScriptureWarningAccepted] = useState(false);
  const [unlockCanonical, setUnlockCanonical] = useState(false);
  const [feedback, setFeedback] = useState<{ text: string; type: "success" | "error" | "warning" } | null>(null);
  const [showAddBlockModal, setShowAddBlockModal] = useState<{ sectionId: string; containerId: string } | null>(null);

  // Fetch Page Data
  const loadPageData = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/pagebuilder/page?slug=${encodeURIComponent(initialSlug)}`);
      const data = await res.json();
      if (data.success && data.page) {
        setPage(data.page);
        // Default selected block to first block if available
        const firstBlock = data.page.sections?.[0]?.containers?.[0]?.columns?.[0]?.blocks?.[0];
        if (firstBlock) setSelectedBlockId(firstBlock.id);
      } else {
        setFeedback({ text: data.error || "Failed to load page model.", type: "error" });
      }
    } catch (e: any) {
      setFeedback({ text: "Error loading page: " + e.message, type: "error" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!page) {
      loadPageData();
    }
  }, [initialSlug]);

  if (loading) {
    return (
      <div className="p-16 text-center text-xs font-mono text-[#34251D]/60 bg-white rounded-xl border border-[#C9A45C]/25">
        Loading Visual Block Editor for /{initialSlug}...
      </div>
    );
  }

  if (!page) {
    return (
      <div className="p-12 text-center text-xs text-red-600 bg-red-50 rounded-xl border border-red-200">
        Page model for "{initialSlug}" could not be found or initialized.
      </div>
    );
  }

  // Real-time Validation Warnings
  const warnings: string[] = [];
  const errors: string[] = [];

  // H1 Check
  let h1Count = 0;
  if (page.h1?.text && page.h1.text.trim().length > 0) h1Count++;
  for (const s of page.sections || []) {
    for (const c of s.containers || []) {
      for (const col of c.columns || []) {
        for (const b of col.blocks || []) {
          if (b.type === "heading_paragraph" && b.content?.level === "h1") h1Count++;
          if (b.type === "image" && (!b.content?.alt || b.content.alt.trim().length === 0)) {
            warnings.push(`Image block "${b.id}" is missing required Alt Text for SEO & screen readers.`);
          }
          if (b.type === "scripture_verses" && b.locked && isScriptureEditor) {
            warnings.push(`Scripture block "${b.id}" is currently UNLOCKED for sacred editing.`);
          }
        }
      }
    }
  }

  if (h1Count === 0) errors.push("Page must have exactly one H1 heading. None found.");
  if (h1Count > 1) errors.push(`Page has ${h1Count} H1 headings. Exactly one H1 is allowed for SEO.`);

  if (page.seo?.title && page.seo.title.length > 70) {
    warnings.push(`Page Title is ${page.seo.title.length} characters (recommended: 50–60).`);
  }
  if (page.seo?.description && page.seo.description.length > 165) {
    warnings.push(`Meta Description is ${page.seo.description.length} characters (recommended: 120–160).`);
  }

  // Save Page
  const handleSave = async (newStatus?: "published" | "draft") => {
    setSaving(true);
    setFeedback(null);

    const updatedPage: PageModel = {
      ...page,
      status: newStatus || page.status,
    };

    try {
      const res = await fetch("/api/admin/pagebuilder/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          page: updatedPage,
          isScriptureEditor: isScriptureEditor && scriptureWarningAccepted,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setPage(updatedPage);
        setFeedback({
          text: `Page successfully saved (v${data.version}). ${data.warnings?.length ? `${data.warnings.length} SEO warnings detected.` : "Zero SEO warnings."}`,
          type: "success",
        });
      } else {
        setFeedback({
          text: data.error || (data.errors ? data.errors.map((e: any) => e.message).join("; ") : "Save failed."),
          type: "error",
        });
      }
    } catch (e: any) {
      setFeedback({ text: "Network error saving page: " + e.message, type: "error" });
    } finally {
      setSaving(false);
    }
  };

  // Section Helpers
  const addSection = () => {
    const newSection: SectionModel = {
      id: `sec-${Date.now().toString(36)}`,
      name: `New Section ${(page.sections?.length || 0) + 1}`,
      visible: true,
      order: (page.sections?.length || 0) + 1,
      settings: {
        background: "transparent",
        paddingY: "medium",
        width: "contained_6xl",
      },
      containers: [
        {
          id: `cont-${Date.now().toString(36)}`,
          columnsCount: 1,
          columns: [{ id: `col-${Date.now().toString(36)}`, blocks: [] }],
        },
      ],
    };

    setPage({
      ...page,
      sections: [...(page.sections || []), newSection],
    });
  };

  const moveSection = (index: number, direction: "up" | "down") => {
    if (!page.sections) return;
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= page.sections.length) return;

    const copy = [...page.sections];
    const [moved] = copy.splice(index, 1);
    copy.splice(targetIndex, 0, moved);
    copy.forEach((s, idx) => (s.order = idx + 1));

    setPage({ ...page, sections: copy });
  };

  const deleteSection = (index: number) => {
    if (!confirm("Are you sure you want to delete this section and all contained blocks?")) return;
    const copy = [...(page.sections || [])];
    copy.splice(index, 1);
    setPage({ ...page, sections: copy });
  };

  const duplicateSection = (index: number) => {
    const s = page.sections[index];
    const newSec: SectionModel = JSON.parse(JSON.stringify(s));
    newSec.id = `sec-${Date.now().toString(36)}`;
    newSec.name = `${s.name} (Copy)`;
    const copy = [...page.sections];
    copy.splice(index + 1, 0, newSec);
    setPage({ ...page, sections: copy });
  };

  // Block Helpers
  const addBlockToContainer = (sectionId: string, containerId: string, blockType: BlockType) => {
    const newBlock: BlockInstance = {
      id: `blk-${blockType}-${Date.now().toString(36)}`,
      type: blockType,
      visible: true,
      order: 1,
      locked: blockType === "scripture_verses" || blockType === "ad_slot",
      content: getDefaultBlockContent(blockType),
    };

    const newSections = page.sections.map((s) => {
      if (s.id !== sectionId) return s;
      return {
        ...s,
        containers: s.containers.map((c) => {
          if (c.id !== containerId) return c;
          const targetCol = c.columns[0] || { id: `col-${Date.now()}`, blocks: [] };
          return {
            ...c,
            columns: [
              {
                ...targetCol,
                blocks: [...targetCol.blocks, newBlock],
              },
              ...c.columns.slice(1),
            ],
          };
        }),
      };
    });

    setPage({ ...page, sections: newSections });
    setSelectedBlockId(newBlock.id);
    setShowAddBlockModal(null);
  };

  const getDefaultBlockContent = (type: BlockType): Record<string, any> => {
    switch (type) {
      case "hero":
        return { headline: "Sacred Chants & Prayers", subheading: "Read lyrics with line-by-line meaning" };
      case "rich_text":
        return { html: "<p>Enter devotional text, explanations, or commentaries here...</p>" };
      case "heading_paragraph":
        return { level: "h2", heading: "Spiritual Significance", paragraph: "Detailed context and blessings..." };
      case "faq_block":
        return { title: "Frequently Asked Questions", faqs: [{ question: "How to recite?", answer: "Recite with devotion." }] };
      case "whatsapp_share":
        return { title: "Share Sacred Hymn with Friends", shareText: "Read sacred chaupais on RamHanumanChalisa.com" };
      case "ad_slot":
        return { slotId: "inContent", label: "Advertisement" };
      default:
        return {};
    }
  };

  // Find Currently Selected Block
  let selectedBlock: BlockInstance | null = null;
  for (const s of page.sections || []) {
    for (const c of s.containers || []) {
      for (const col of c.columns || []) {
        for (const b of col.blocks || []) {
          if (b.id === selectedBlockId) {
            selectedBlock = b;
            break;
          }
        }
      }
    }
  }

  const updateSelectedBlockContent = (field: string, value: any) => {
    if (!selectedBlock) return;
    const newSections = page.sections.map((s) => ({
      ...s,
      containers: s.containers.map((c) => ({
        ...c,
        columns: c.columns.map((col) => ({
          ...col,
          blocks: col.blocks.map((b) => {
            if (b.id !== selectedBlockId) return b;
            return {
              ...b,
              content: { ...b.content, [field]: value },
            };
          }),
        })),
      })),
    }));
    setPage({ ...page, sections: newSections });
  };

  return (
    <div className="space-y-6">
      {/* Top Header & Action Bar */}
      <div className="bg-[#FFF9F0] border border-[#C9A45C]/35 rounded-xl p-4 sm:p-5 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4 sticky top-2 z-30 backdrop-blur-md bg-opacity-95">
        <div>
          <div className="flex items-center gap-2">
            <a
              href="/admin/pagebuilder"
              className="text-stone-400 hover:text-stone-700 text-xs font-bold"
            >
              &larr; Back to Pages
            </a>
            <span className="text-stone-300">/</span>
            <h1 className="font-serif-display text-lg sm:text-xl font-bold text-[#4A1216]">
              {page.h1?.text || page.slug}
            </h1>
            <span className="font-mono text-[11px] bg-stone-100 text-stone-700 px-2 py-0.5 rounded border border-stone-200">
              /{page.slug === "home" ? "" : page.slug}
            </span>
          </div>

          <div className="flex items-center gap-2 mt-1">
            <span
              className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                page.status === "published"
                  ? "bg-emerald-100 text-emerald-800"
                  : "bg-amber-100 text-amber-800"
              }`}
            >
              {page.status}
            </span>
            <span className="text-xs text-[#34251D]/60 font-mono">v{page.auditMeta?.version || 1}</span>
            {errors.length > 0 && (
              <span className="text-xs text-red-600 bg-red-100 px-2 py-0.5 rounded font-bold">
                ⚠️ {errors.length} SEO Errors
              </span>
            )}
            {warnings.length > 0 && (
              <span className="text-xs text-amber-800 bg-amber-100 px-2 py-0.5 rounded font-semibold">
                🔔 {warnings.length} Warnings
              </span>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2 self-end md:self-auto">
          {page.status === "draft" ? (
            <button
              type="button"
              onClick={() => handleSave("published")}
              disabled={saving || errors.length > 0}
              className="bg-emerald-700 hover:bg-emerald-800 text-white px-3.5 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider shadow-sm transition-all disabled:opacity-50"
            >
              {saving ? "Publishing..." : "Publish to Live"}
            </button>
          ) : (
            <button
              type="button"
              onClick={() => handleSave("draft")}
              disabled={saving}
              className="bg-amber-700 hover:bg-amber-800 text-white px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider shadow-sm transition-all"
            >
              Unpublish (Draft)
            </button>
          )}

          <button
            type="button"
            onClick={() => handleSave()}
            disabled={saving}
            className="bg-[#4A1216] hover:bg-[#681B20] text-white px-4 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider shadow-sm transition-all"
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>

      {feedback && (
        <div
          className={`p-4 rounded-lg text-xs font-semibold flex items-center justify-between ${
            feedback.type === "success"
              ? "bg-emerald-50 text-emerald-800 border border-emerald-300"
              : feedback.type === "error"
              ? "bg-red-50 text-red-800 border border-red-300"
              : "bg-amber-50 text-amber-800 border border-amber-300"
          }`}
        >
          <span>{feedback.text}</span>
          <button
            onClick={() => setFeedback(null)}
            className="text-stone-500 hover:text-stone-800 font-bold ml-4"
          >
            ✕
          </button>
        </div>
      )}

      {/* Tabs */}
      <div className="flex border-b border-[#C9A45C]/30 bg-white rounded-t-xl px-4 pt-2 gap-2">
        <button
          onClick={() => setActiveTab("blocks")}
          className={`py-2 px-4 text-xs font-bold uppercase tracking-wider border-b-2 transition-colors ${
            activeTab === "blocks"
              ? "border-[#C95716] text-[#C95716]"
              : "border-transparent text-[#34251D]/60 hover:text-[#4A1216]"
          }`}
        >
          🧱 Sections & Blocks ({page.sections?.length || 0})
        </button>
        <button
          onClick={() => setActiveTab("seo")}
          className={`py-2 px-4 text-xs font-bold uppercase tracking-wider border-b-2 transition-colors flex items-center gap-1.5 ${
            activeTab === "seo"
              ? "border-[#C95716] text-[#C95716]"
              : "border-transparent text-[#34251D]/60 hover:text-[#4A1216]"
          }`}
        >
          <span>🎯 SEO & Meta Fields</span>
          {errors.length > 0 && <span className="w-2 h-2 rounded-full bg-red-500"></span>}
        </button>
        <button
          onClick={() => setActiveTab("preview")}
          className={`py-2 px-4 text-xs font-bold uppercase tracking-wider border-b-2 transition-colors ${
            activeTab === "preview"
              ? "border-[#C95716] text-[#C95716]"
              : "border-transparent text-[#34251D]/60 hover:text-[#4A1216]"
          }`}
        >
          👁️ Live Responsive Preview
        </button>
      </div>

      {/* TAB 1: SECTIONS & BLOCKS BUILDER */}
      {activeTab === "blocks" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Sections & Blocks Tree */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-serif-display text-sm font-bold text-[#4A1216] uppercase tracking-wider">
                Page Structure Tree
              </h3>
              <button
                type="button"
                onClick={addSection}
                className="bg-[#C95716] hover:bg-[#A8450F] text-white px-2.5 py-1 rounded text-xs font-bold shadow-xs transition-colors"
              >
                + Add Section
              </button>
            </div>

            <div className="space-y-3">
              {page.sections && page.sections.map((section, sIdx) => (
                <div
                  key={section.id}
                  className="bg-white border border-[#C9A45C]/35 rounded-xl p-3 shadow-xs space-y-2.5"
                >
                  {/* Section Header */}
                  <div className="flex items-center justify-between border-b border-stone-200 pb-2">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-mono font-bold text-[#C95716]">
                        §{sIdx + 1}
                      </span>
                      <input
                        type="text"
                        value={section.name}
                        onChange={(e) => {
                          const copy = [...page.sections];
                          copy[sIdx].name = e.target.value;
                          setPage({ ...page, sections: copy });
                        }}
                        className="text-xs font-bold text-[#4A1216] border-b border-dashed border-stone-300 focus:outline-none focus:border-[#C95716]"
                      />
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => moveSection(sIdx, "up")}
                        disabled={sIdx === 0}
                        className="text-stone-500 hover:text-[#4A1216] disabled:opacity-30 text-xs px-1"
                        title="Move Section Up"
                      >
                        ▲
                      </button>
                      <button
                        type="button"
                        onClick={() => moveSection(sIdx, "down")}
                        disabled={sIdx === page.sections.length - 1}
                        className="text-stone-500 hover:text-[#4A1216] disabled:opacity-30 text-xs px-1"
                        title="Move Section Down"
                      >
                        ▼
                      </button>
                      <button
                        type="button"
                        onClick={() => duplicateSection(sIdx)}
                        className="text-stone-500 hover:text-[#4A1216] text-xs px-1"
                        title="Duplicate Section"
                      >
                        📋
                      </button>
                      <button
                        type="button"
                        onClick={() => deleteSection(sIdx)}
                        className="text-stone-400 hover:text-red-600 text-xs px-1 font-bold"
                        title="Delete Section"
                      >
                        ✕
                      </button>
                    </div>
                  </div>

                  {/* Section Settings (Background, Padding) */}
                  <div className="grid grid-cols-2 gap-2 text-[11px] text-[#34251D]/75">
                    <div>
                      <label className="block text-[10px] uppercase font-bold text-stone-400">
                        Background
                      </label>
                      <select
                        value={section.settings.background || "transparent"}
                        onChange={(e: any) => {
                          const copy = [...page.sections];
                          copy[sIdx].settings.background = e.target.value;
                          setPage({ ...page, sections: copy });
                        }}
                        className="w-full text-[11px] border border-stone-200 rounded p-1 bg-white"
                      >
                        <option value="transparent">Transparent</option>
                        <option value="warm_cream">Warm Cream (#FFF9F0)</option>
                        <option value="maroon_deep">Maroon Deep (#4A1216)</option>
                        <option value="soft_bg">Soft Ivory</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase font-bold text-stone-400">
                        Width
                      </label>
                      <select
                        value={section.settings.width || "contained_6xl"}
                        onChange={(e: any) => {
                          const copy = [...page.sections];
                          copy[sIdx].settings.width = e.target.value;
                          setPage({ ...page, sections: copy });
                        }}
                        className="w-full text-[11px] border border-stone-200 rounded p-1 bg-white"
                      >
                        <option value="contained_4xl">4XL (Content / Article)</option>
                        <option value="contained_6xl">6XL (Standard Grid)</option>
                        <option value="full_width">Full Width (Hero Banner)</option>
                      </select>
                    </div>
                  </div>

                  {/* Blocks inside Section */}
                  <div className="space-y-1.5 pl-2 border-l-2 border-[#C9A45C]/30 pt-1">
                    {section.containers?.map((cont) =>
                      cont.columns?.map((col) =>
                        col.blocks?.map((block) => (
                          <div
                            key={block.id}
                            onClick={() => setSelectedBlockId(block.id)}
                            className={`p-2 rounded-lg cursor-pointer flex items-center justify-between text-xs transition-all ${
                              selectedBlockId === block.id
                                ? "bg-[#FFF9F0] border-2 border-[#C95716] shadow-xs font-bold text-[#4A1216]"
                                : "bg-stone-50 hover:bg-stone-100 border border-stone-200 text-[#34251D]"
                            }`}
                          >
                            <div className="flex items-center gap-2 truncate">
                              <span className="font-mono text-[10px] uppercase bg-white px-1.5 py-0.5 rounded border border-stone-200 text-[#C95716]">
                                {block.type}
                              </span>
                              <span className="truncate">
                                {block.content?.title || block.content?.heading || block.content?.headline || block.id}
                              </span>
                              {block.locked && (
                                <span className="text-[10px]" title="Locked Block">
                                  🔒
                                </span>
                              )}
                            </div>

                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                const copy = [...page.sections];
                                block.visible = !block.visible;
                                setPage({ ...page, sections: copy });
                              }}
                              className="text-stone-400 hover:text-stone-700 text-xs px-1"
                              title={block.visible ? "Hide Block" : "Show Block"}
                            >
                              {block.visible ? "👁️" : "🙈"}
                            </button>
                          </div>
                        ))
                      )
                    )}

                    <button
                      type="button"
                      onClick={() =>
                        setShowAddBlockModal({
                          sectionId: section.id,
                          containerId: section.containers[0]?.id || "",
                        })
                      }
                      className="w-full text-center py-1.5 border border-dashed border-[#C9A45C]/50 hover:border-[#C95716] text-[#C95716] rounded-lg text-xs font-semibold hover:bg-[#FFF9F0] transition-colors"
                    >
                      + Add Block to Section
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Selected Block Editor Inspector */}
          <div className="lg:col-span-7 bg-white border border-[#C9A45C]/35 rounded-xl p-5 shadow-xs space-y-4">
            <h3 className="font-serif-display text-sm font-bold text-[#4A1216] uppercase tracking-wider border-b border-[#C9A45C]/20 pb-2 flex items-center justify-between">
              <span>Block Inspector & Content Editor</span>
              {selectedBlock && (
                <span className="font-mono text-[11px] text-[#C95716] font-normal">
                  {selectedBlock.type} ({selectedBlock.id})
                </span>
              )}
            </h3>

            {!selectedBlock ? (
              <div className="p-8 text-center text-xs text-[#34251D]/60">
                Select a block from the tree on the left to edit its content and visual settings.
              </div>
            ) : (
              <div className="space-y-4">
                {/* LOCKED SCRIPTURE WARNING BANNER */}
                {selectedBlock.type === "scripture_verses" && (
                  <div className="p-4 rounded-xl bg-amber-50 border-2 border-amber-400 space-y-3">
                    <div className="flex items-center gap-2 text-amber-900 font-bold text-xs uppercase tracking-wider">
                      <span className="text-xl">🔒</span>
                      <span>LOCKED BLOCK: Byte-for-Byte Scripture Preservation</span>
                    </div>
                    <p className="text-xs text-amber-900 leading-relaxed font-sans">
                      This block contains sacred religious text (Chalisa, Ashtak, Baan, Mantras). To prevent accidental alteration or spiritual distress to devotees, editing is restricted.
                    </p>
                    <div className="flex items-center gap-2 pt-1 border-t border-amber-300">
                      <input
                        type="checkbox"
                        id="scripture-toggle"
                        checked={isScriptureEditor && scriptureWarningAccepted}
                        onChange={(e) => {
                          if (e.target.checked) {
                            const conf = confirm(
                              "You are editing sacred scripture text. Any alteration may cause religious distress to devotees. Are you sure you have verified the change against traditional shlokas?"
                            );
                            if (conf) {
                              setIsScriptureEditor(true);
                              setScriptureWarningAccepted(true);
                            }
                          } else {
                            setIsScriptureEditor(false);
                            setScriptureWarningAccepted(false);
                          }
                        }}
                        className="rounded text-[#C95716] focus:ring-[#C95716]"
                      />
                      <label htmlFor="scripture-toggle" className="text-xs font-bold text-amber-950 cursor-pointer">
                        I am an authorized Scripture Editor & accept responsibility for modifications
                      </label>
                    </div>
                  </div>
                )}

                {/* Common Title Field */}
                <div>
                  <label className="block text-xs font-bold text-[#4A1216] mb-1">
                    Block Title / Subtitle
                  </label>
                  <input
                    type="text"
                    value={selectedBlock.content?.title || selectedBlock.content?.heading || selectedBlock.content?.headline || ""}
                    onChange={(e) =>
                      updateSelectedBlockContent(
                        selectedBlock?.type === "hero" ? "headline" : selectedBlock?.type === "heading_paragraph" ? "heading" : "title",
                        e.target.value
                      )
                    }
                    className="w-full text-xs border border-stone-300 rounded-lg p-2 font-serif-display focus:ring-2 focus:ring-[#C95716]"
                  />
                </div>

                {/* Rich Text / Devanagari Content */}
                {(selectedBlock.type === "rich_text" || selectedBlock.type === "meaning_explanation") && (
                  <div>
                    <label className="block text-xs font-bold text-[#4A1216] mb-1">
                      Devanagari / English Content (HTML & Text)
                    </label>
                    <textarea
                      rows={8}
                      value={selectedBlock.content?.html || selectedBlock.content?.text || ""}
                      onChange={(e) => updateSelectedBlockContent("html", e.target.value)}
                      className="w-full text-xs border border-stone-300 rounded-lg p-3 font-mono focus:ring-2 focus:ring-[#C95716] leading-relaxed"
                    />
                  </div>
                )}

                {/* Heading & Paragraph Block */}
                {selectedBlock.type === "heading_paragraph" && (
                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-bold text-[#4A1216] mb-1">
                        Heading Level
                      </label>
                      <select
                        value={selectedBlock.content?.level || "h2"}
                        onChange={(e) => updateSelectedBlockContent("level", e.target.value)}
                        className="text-xs border border-stone-300 rounded p-1.5 bg-white"
                      >
                        <option value="h2">H2 (Standard Section Heading)</option>
                        <option value="h3">H3 (Subsection)</option>
                        <option value="h4">H4 (Minor Heading)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#4A1216] mb-1">
                        Paragraph Text
                      </label>
                      <textarea
                        rows={4}
                        value={selectedBlock.content?.paragraph || ""}
                        onChange={(e) => updateSelectedBlockContent("paragraph", e.target.value)}
                        className="w-full text-xs border border-stone-300 rounded-lg p-2.5 font-sans focus:ring-2 focus:ring-[#C95716]"
                      />
                    </div>
                  </div>
                )}

                {/* Image Block */}
                {selectedBlock.type === "image" && (
                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-bold text-[#4A1216] mb-1">
                        Image Source URL
                      </label>
                      <input
                        type="text"
                        value={selectedBlock.content?.src || ""}
                        onChange={(e) => updateSelectedBlockContent("src", e.target.value)}
                        className="w-full text-xs border border-stone-300 rounded-lg p-2 font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#4A1216] mb-1">
                        Image Alt Text (Mandatory for SEO & Accessibility)
                      </label>
                      <input
                        type="text"
                        value={selectedBlock.content?.alt || ""}
                        onChange={(e) => updateSelectedBlockContent("alt", e.target.value)}
                        placeholder="Descriptive alt text for Lord Hanuman..."
                        className="w-full text-xs border border-stone-300 rounded-lg p-2"
                      />
                    </div>
                  </div>
                )}

                {/* Ad Slot Block */}
                {selectedBlock.type === "ad_slot" && (
                  <div className="p-3 bg-stone-50 border border-stone-200 rounded-lg space-y-2">
                    <label className="block text-xs font-bold text-[#4A1216]">
                      Ad Placement Slot
                    </label>
                    <select
                      value={selectedBlock.content?.slotId || "inContent"}
                      onChange={(e) => updateSelectedBlockContent("slotId", e.target.value)}
                      className="text-xs border border-stone-300 rounded p-1.5 bg-white"
                    >
                      <option value="aboveFold">Above the Fold (Top)</option>
                      <option value="inContent">In-Content (Middle)</option>
                      <option value="footer">Footer (Bottom)</option>
                    </select>
                    <p className="text-[11px] text-[#34251D]/60 leading-relaxed">
                      Ad client <code>ca-pub-2458897753508445</code> is locked. Stable min-height prevents layout shifts (CLS).
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 2: SEO & META PANEL */}
      {activeTab === "seo" && (
        <div className="bg-white border border-[#C9A45C]/35 rounded-xl p-6 shadow-xs space-y-6 max-w-4xl mx-auto">
          <div className="border-b border-[#C9A45C]/25 pb-3">
            <h3 className="font-serif-display text-lg font-bold text-[#4A1216]">
              Search Engine Optimization (SEO) & Heading Hierarchy
            </h3>
            <p className="text-xs text-[#34251D]/70 mt-0.5">
              Strict rules guarantee zero search rank regression and exact canonical URL preservation.
            </p>
          </div>

          {/* Warnings List */}
          {(errors.length > 0 || warnings.length > 0) && (
            <div className="space-y-2">
              {errors.map((err, idx) => (
                <div key={idx} className="p-3 bg-red-50 border border-red-300 rounded-lg text-xs font-semibold text-red-800 flex items-center gap-2">
                  <span>❌</span>
                  <span>{err}</span>
                </div>
              ))}
              {warnings.map((warn, idx) => (
                <div key={idx} className="p-3 bg-amber-50 border border-amber-300 rounded-lg text-xs font-semibold text-amber-800 flex items-center gap-2">
                  <span>⚠️</span>
                  <span>{warn}</span>
                </div>
              ))}
            </div>
          )}

          {/* Primary H1 Heading */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-[#4A1216] uppercase tracking-wider">
              Primary H1 Heading (Exactly 1 Allowed)
            </label>
            <input
              type="text"
              value={page.h1?.text || ""}
              onChange={(e) => setPage({ ...page, h1: { ...page.h1, text: e.target.value } })}
              className="w-full text-sm font-serif-display font-bold border border-stone-300 rounded-lg p-2.5 focus:ring-2 focus:ring-[#C95716]"
            />
            <p className="text-[11px] text-[#34251D]/65">
              The primary semantic H1 title rendered on the page.
            </p>
          </div>

          {/* Meta Title */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-[#4A1216] uppercase tracking-wider">
                SEO Page Title (&lt;title&gt;)
              </label>
              <span className={`text-xs font-mono font-semibold ${
                (page.seo?.title?.length || 0) > 60 ? "text-amber-700" : "text-emerald-700"
              }`}>
                {page.seo?.title?.length || 0} / 60 characters
              </span>
            </div>
            <input
              type="text"
              value={page.seo?.title || ""}
              onChange={(e) => setPage({ ...page, seo: { ...page.seo, title: e.target.value } })}
              className="w-full text-xs border border-stone-300 rounded-lg p-2.5 focus:ring-2 focus:ring-[#C95716]"
            />
          </div>

          {/* Meta Description */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-[#4A1216] uppercase tracking-wider">
                Meta Description
              </label>
              <span className={`text-xs font-mono font-semibold ${
                (page.seo?.description?.length || 0) > 160 ? "text-amber-700" : "text-emerald-700"
              }`}>
                {page.seo?.description?.length || 0} / 160 characters
              </span>
            </div>
            <textarea
              rows={3}
              value={page.seo?.description || ""}
              onChange={(e) => setPage({ ...page, seo: { ...page.seo, description: e.target.value } })}
              className="w-full text-xs border border-stone-300 rounded-lg p-2.5 focus:ring-2 focus:ring-[#C95716]"
            />
          </div>

          {/* Canonical URL (Read-Only Safety) */}
          <div className="space-y-2 bg-[#FFF9F0] p-4 rounded-xl border border-[#C9A45C]/35">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-[#4A1216] uppercase tracking-wider">
                Canonical URL (Protected Against SEO Regressions)
              </label>
              <label className="flex items-center gap-1.5 text-xs text-stone-500 cursor-pointer">
                <input
                  type="checkbox"
                  checked={unlockCanonical}
                  onChange={(e) => setUnlockCanonical(e.target.checked)}
                  className="rounded text-[#C95716]"
                />
                <span>Unlock for Edit</span>
              </label>
            </div>
            <input
              type="text"
              disabled={!unlockCanonical}
              value={page.seo?.canonicalUrl || ""}
              onChange={(e) => setPage({ ...page, seo: { ...page.seo, canonicalUrl: e.target.value } })}
              className="w-full text-xs border border-stone-300 rounded-lg p-2.5 font-mono disabled:bg-stone-100 disabled:text-stone-500"
            />
            <p className="text-[11px] text-[#34251D]/65">
              Existing canonical URLs must never be changed to preserve organic Google ranking.
            </p>
          </div>

          {/* Noindex Toggle */}
          <div className="flex items-center justify-between p-4 bg-stone-50 rounded-xl border border-stone-200">
            <div>
              <span className="text-xs font-bold text-[#4A1216] block">
                Exclude from Search Indexing (noindex)
              </span>
              <span className="text-[11px] text-[#34251D]/60 block">
                Instructs search engines not to index this page.
              </span>
            </div>
            <input
              type="checkbox"
              checked={page.seo?.noindex || false}
              onChange={(e) => setPage({ ...page, seo: { ...page.seo, noindex: e.target.checked } })}
              className="w-4 h-4 text-[#C95716] rounded"
            />
          </div>
        </div>
      )}

      {/* TAB 3: RESPONSIVE PREVIEW */}
      {activeTab === "preview" && (
        <div className="space-y-4">
          <div className="flex items-center justify-center gap-3 bg-white p-2.5 rounded-xl border border-[#C9A45C]/30 max-w-sm mx-auto shadow-xs">
            <button
              onClick={() => setPreviewWidth("desktop")}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5 ${
                previewWidth === "desktop"
                  ? "bg-[#4A1216] text-white"
                  : "text-[#34251D]/70 hover:bg-stone-100"
              }`}
            >
              <span>🖥️</span> Desktop (1440px)
            </button>
            <button
              onClick={() => setPreviewWidth("mobile")}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5 ${
                previewWidth === "mobile"
                  ? "bg-[#4A1216] text-white"
                  : "text-[#34251D]/70 hover:bg-stone-100"
              }`}
            >
              <span>📱</span> Mobile (390px)
            </button>
          </div>

          <div className="flex justify-center p-4 bg-stone-900/5 rounded-2xl border border-dashed border-stone-300 overflow-x-auto">
            <div
              style={{ width: previewWidth === "mobile" ? "390px" : "100%", maxWidth: previewWidth === "mobile" ? "390px" : "1200px" }}
              className="bg-white rounded-xl shadow-2xl overflow-hidden border border-stone-300 transition-all duration-300"
            >
              {/* Fake Browser Toolbar */}
              <div className="bg-[#4A1216] text-stone-200 px-4 py-2 flex items-center justify-between text-xs font-mono">
                <span className="truncate">https://ramhanumanchalisa.com/{page.slug === "home" ? "" : page.slug}</span>
                <span className="text-[10px] text-amber-300 font-bold uppercase">{previewWidth}</span>
              </div>

              {/* Rendered Sections Simulation */}
              <div className="p-4 sm:p-6 space-y-6">
                <div className="text-center space-y-2 border-b border-[#C9A45C]/20 pb-4">
                  {page.h1?.devanagariTag && (
                    <span className="text-xs font-bold text-[#C95716]">{page.h1.devanagariTag}</span>
                  )}
                  <h1 className="font-serif-display text-2xl sm:text-3xl font-bold text-[#4A1216]">
                    {page.h1?.text}
                  </h1>
                  {page.h1?.subheading && (
                    <p className="text-xs text-[#34251D]/75">{page.h1.subheading}</p>
                  )}
                </div>

                {page.sections?.filter((s) => s.visible).map((sec) => (
                  <div key={sec.id} className="p-4 rounded-xl border border-stone-200 bg-[#FFFDF9] space-y-3">
                    <div className="text-[10px] uppercase font-bold text-[#C95716] tracking-wider">
                      {sec.name}
                    </div>
                    {sec.containers?.map((c) =>
                      c.columns?.map((col) =>
                        col.blocks?.filter((b) => b.visible).map((b) => (
                          <div key={b.id} className="p-3 bg-white border border-stone-200 rounded-lg text-xs space-y-1">
                            <span className="font-mono text-[9px] uppercase text-stone-400">[{b.type}]</span>
                            <div className="font-bold text-[#4A1216]">
                              {b.content?.title || b.content?.heading || b.content?.headline || b.id}
                            </div>
                            {b.content?.paragraph && <p className="text-[11px] text-stone-600">{b.content.paragraph}</p>}
                          </div>
                        ))
                      )
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Block Modal */}
      {showAddBlockModal && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-lg w-full p-6 shadow-2xl border border-brass-gold space-y-4 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-stone-200 pb-3">
              <h3 className="font-serif-display text-base font-bold text-[#4A1216]">
                Add Block from Registry
              </h3>
              <button
                type="button"
                onClick={() => setShowAddBlockModal(null)}
                className="text-stone-400 hover:text-stone-700 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              {[
                { type: "hero", label: "Hero Banner", icon: "🌅" },
                { type: "rich_text", label: "Rich Text / HTML", icon: "📄" },
                { type: "heading_paragraph", label: "Heading & Paragraph", icon: "📑" },
                { type: "image", label: "Image Block", icon: "🖼️" },
                { type: "faq_block", label: "FAQ Accordion", icon: "❓" },
                { type: "whatsapp_share", label: "WhatsApp Share", icon: "💬" },
                { type: "social_channels", label: "Social Channels", icon: "🌐" },
                { type: "newsletter", label: "Newsletter Form", icon: "📬" },
                { type: "category_cards", label: "Category Cards", icon: "📂" },
                { type: "related_articles", label: "Related Articles", icon: "📖" },
                { type: "ad_slot", label: "AdSense Slot (Locked)", icon: "📢" },
              ].map((item) => (
                <button
                  key={item.type}
                  type="button"
                  onClick={() =>
                    addBlockToContainer(
                      showAddBlockModal.sectionId,
                      showAddBlockModal.containerId,
                      item.type as BlockType
                    )
                  }
                  className="p-3 rounded-lg border border-stone-200 hover:border-[#C95716] hover:bg-[#FFF9F0] text-left transition-colors flex items-center gap-2.5 font-semibold text-[#4A1216]"
                >
                  <span className="text-lg">{item.icon}</span>
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
