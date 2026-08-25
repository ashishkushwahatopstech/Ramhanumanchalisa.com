"use client";

import React, { useState } from "react";

interface Post {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  published: boolean;
  createdAt: string;
}

interface BlogEditorFormProps {
  initialPosts: Post[];
}

export default function BlogEditorForm({ initialPosts }: BlogEditorFormProps) {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  
  // Form States
  const [editingId, setEditingId] = useState<string | null>(null);
  const [title, setTitle] = useState<string>("");
  const [slug, setSlug] = useState<string>("");
  const [excerpt, setExcerpt] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [published, setPublished] = useState<boolean>(true);
  
  const [message, setMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Auto-generate slug from title
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setTitle(val);
    if (!editingId) {
      const generatedSlug = val
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "") // remove special chars
        .replace(/\s+/g, "-") // replace spaces with hyphens
        .replace(/-+/g, "-") // collapse multiple hyphens
        .trim();
      setSlug(generatedSlug);
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setTitle("");
    setSlug("");
    setExcerpt("");
    setContent("");
    setPublished(true);
  };

  const handleEdit = (post: Post) => {
    setEditingId(post.id);
    setTitle(post.title);
    setSlug(post.slug);
    setExcerpt(post.excerpt);
    setContent(post.content);
    setPublished(post.published);
    window.scrollTo({ top: 300, behavior: "smooth" });
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this article?")) return;

    try {
      const res = await fetch(`/api/admin/blog?id=${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setPosts(posts.filter((p) => p.id !== id));
        setMessage({ text: "Article deleted successfully!", type: "success" });
        if (editingId === id) resetForm();
      } else {
        const data = await res.json();
        setMessage({ text: data.error || "Failed to delete article", type: "error" });
      }
    } catch (err) {
      setMessage({ text: "Network error occurred", type: "error" });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage(null);

    const payload = {
      id: editingId,
      title,
      slug,
      excerpt,
      content,
      published,
    };

    try {
      const method = editingId ? "PUT" : "POST";
      const res = await fetch("/api/admin/blog", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok) {
        if (editingId) {
          setPosts(posts.map((p) => (p.id === editingId ? data : p)));
          setMessage({ text: "Article updated successfully!", type: "success" });
        } else {
          setPosts([data, ...posts]);
          setMessage({ text: "Article published successfully!", type: "success" });
        }
        resetForm();
      } else {
        setMessage({ text: data.error || "Failed to save article", type: "error" });
      }
    } catch (err) {
      setMessage({ text: "Network error occurred", type: "error" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      
      {/* Editor Column */}
      <div className="lg:col-span-2 space-y-6">
        <div className="bg-stone-ivory border border-brass-gold/30 p-6 rounded-lg shadow-sm space-y-4">
          <h3 className="font-serif-display text-base uppercase font-bold text-maroon-deep border-b border-brass-gold/20 pb-2">
            {editingId ? "✏️ Edit Blog Article" : "➕ Create New Blog Article"}
          </h3>

          {message && (
            <div
              className={`p-3 rounded text-xs font-bold text-center ${
                message.type === "success"
                  ? "bg-marigold/20 text-maroon-deep border border-marigold"
                  : "bg-vermilion/10 text-vermilion border border-vermilion/30"
              }`}
            >
              {message.text}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            {/* Title */}
            <div className="space-y-1.5">
              <label className="block uppercase font-bold text-brass-gold">Title</label>
              <input
                type="text"
                required
                value={title}
                onChange={handleTitleChange}
                placeholder="e.g. The Secrets of Chaupai 38"
                className="w-full text-sm bg-stone-ivory border border-brass-gold/30 rounded p-2 text-charcoal-brown font-semibold focus:outline-none focus:ring-1 focus:ring-marigold"
              />
            </div>

            {/* Slug */}
            <div className="space-y-1.5">
              <label className="block uppercase font-bold text-brass-gold">Slug (URL Path)</label>
              <input
                type="text"
                required
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="e.g. secrets-of-chaupai-38"
                className="w-full text-sm bg-stone-ivory border border-brass-gold/30 rounded p-2 text-charcoal-brown font-mono focus:outline-none focus:ring-1 focus:ring-marigold"
              />
            </div>

            {/* Excerpt */}
            <div className="space-y-1.5">
              <label className="block uppercase font-bold text-brass-gold">Short Excerpt (SEO Summary)</label>
              <input
                type="text"
                required
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                placeholder="A short summary of this article to display on the blog cards and Google results..."
                className="w-full text-sm bg-stone-ivory border border-brass-gold/30 rounded p-2 text-charcoal-brown focus:outline-none focus:ring-1 focus:ring-marigold"
              />
            </div>

            {/* Content (Markdown) */}
            <div className="space-y-1.5">
              <label className="block uppercase font-bold text-brass-gold">Article Body (Markdown)</label>
              <p className="text-[10px] text-charcoal-brown/50 leading-none">
                Supports standard headers (##, ###) and lists (- item). Split paragraphs with double newlines.
              </p>
              <textarea
                required
                rows={12}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write your article content here in Markdown format..."
                className="w-full text-sm bg-stone-ivory border border-brass-gold/30 rounded p-2 text-charcoal-brown font-sans focus:outline-none focus:ring-1 focus:ring-marigold leading-relaxed"
              />
            </div>

            {/* Published Checkbox & Buttons */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
              <label className="flex items-center gap-2 font-bold uppercase text-brass-gold cursor-pointer">
                <input
                  type="checkbox"
                  checked={published}
                  onChange={(e) => setPublished(e.target.checked)}
                  className="accent-marigold h-4 w-4"
                />
                Publish Instantly
              </label>

              <div className="flex gap-2">
                {editingId && (
                  <button
                    type="button"
                    onClick={resetForm}
                    className="bg-stone-ivory hover:bg-stone-ivory/80 text-charcoal-brown border border-brass-gold/40 px-4 py-2.5 rounded font-bold uppercase tracking-wider transition-colors"
                  >
                    Cancel
                  </button>
                )}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-vermilion hover:bg-marigold text-stone-ivory hover:text-maroon-deep px-6 py-2.5 rounded font-bold uppercase tracking-wider border border-brass-gold shadow transition-colors cursor-pointer"
                >
                  {isSubmitting ? "Saving..." : editingId ? "Update Article" : "Create Article"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Sidebar List Column */}
      <div className="space-y-4">
        <div className="bg-stone-ivory border border-brass-gold/30 p-4 rounded-lg shadow-sm space-y-4 h-[600px] overflow-y-auto">
          <h4 className="font-serif-display text-sm uppercase font-bold text-maroon-deep border-b border-brass-gold/20 pb-2">
            Published Articles ({posts.length})
          </h4>

          {posts.length === 0 ? (
            <p className="text-xs text-charcoal-brown/50 text-center py-6">No articles published yet.</p>
          ) : (
            <div className="space-y-3">
              {posts.map((post) => (
                <div
                  key={post.id}
                  className="p-3 border border-brass-gold/15 bg-stone-ivory/50 rounded space-y-2 text-xs"
                >
                  <div>
                    <h5 className="font-bold text-charcoal-brown uppercase leading-tight line-clamp-2">
                      {post.title}
                    </h5>
                    <div className="flex justify-between items-center text-[10px] text-charcoal-brown/50 mt-1">
                      <span>{post.published ? "🟢 Published" : "🔴 Draft"}</span>
                      <span>{post.slug}</span>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2 border-t border-brass-gold/10">
                    <button
                      onClick={() => handleEdit(post)}
                      className="flex-1 bg-marigold hover:bg-maroon-deep text-maroon-deep hover:text-stone-ivory py-1 rounded text-center font-bold uppercase text-[10px] border border-brass-gold/30 transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(post.id)}
                      className="flex-1 bg-vermilion/10 hover:bg-vermilion text-vermilion hover:text-stone-ivory py-1 rounded text-center font-bold uppercase text-[10px] border border-vermilion/20 transition-colors"
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

    </div>
  );
}
