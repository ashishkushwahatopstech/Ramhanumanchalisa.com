"use client";

import React, { useState } from "react";

interface Track {
  id: string;
  reciterName: string;
  url: string;
  duration: number;
  description: string | null;
  isDefault: boolean;
  timestampsJSON: string | null;
}

interface AudioManagerFormProps {
  initialTracks: Track[];
}

export default function AudioManagerForm({ initialTracks }: AudioManagerFormProps) {
  const [tracks, setTracks] = useState<Track[]>(initialTracks);
  
  // Form States
  const [editingId, setEditingId] = useState<string | null>(null);
  const [reciterName, setReciterName] = useState<string>("");
  const [url, setUrl] = useState<string>("");
  const [duration, setDuration] = useState<number>(360);
  const [description, setDescription] = useState<string>("");
  const [isDefault, setIsDefault] = useState<boolean>(false);
  const [timestampsJSON, setTimestampsJSON] = useState<string>("");
  
  const [message, setMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const resetForm = () => {
    setEditingId(null);
    setReciterName("");
    setUrl("");
    setDuration(360);
    setDescription("");
    setIsDefault(false);
    setTimestampsJSON("");
  };

  const handleEdit = (track: Track) => {
    setEditingId(track.id);
    setReciterName(track.reciterName);
    setUrl(track.url);
    setDuration(track.duration);
    setDescription(track.description || "");
    setIsDefault(track.isDefault);
    setTimestampsJSON(track.timestampsJSON || "");
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this audio track?")) return;

    try {
      const res = await fetch(`/api/admin/audio?id=${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setTracks(tracks.filter((t) => t.id !== id));
        setMessage({ text: "Track deleted successfully!", type: "success" });
        if (editingId === id) resetForm();
      } else {
        const data = await res.json();
        setMessage({ text: data.error || "Failed to delete track", type: "error" });
      }
    } catch (err) {
      setMessage({ text: "Network error occurred", type: "error" });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage(null);

    // Validate JSON if supplied
    if (timestampsJSON.trim()) {
      try {
        JSON.parse(timestampsJSON);
      } catch (err) {
        setMessage({ text: "Invalid JSON format in timestamps field", type: "error" });
        setIsSubmitting(false);
        return;
      }
    }

    const payload = {
      id: editingId,
      reciterName,
      url,
      duration,
      description,
      isDefault,
      timestampsJSON: timestampsJSON || null,
    };

    try {
      const method = editingId ? "PUT" : "POST";
      const res = await fetch("/api/admin/audio", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok) {
        if (editingId) {
          setTracks(tracks.map((t) => (t.id === editingId ? data : t)));
          setMessage({ text: "Audio track updated successfully!", type: "success" });
        } else {
          setTracks([data, ...tracks]);
          setMessage({ text: "Audio track added successfully!", type: "success" });
        }
        resetForm();
      } else {
        setMessage({ text: data.error || "Failed to save track", type: "error" });
      }
    } catch (err) {
      setMessage({ text: "Network error occurred", type: "error" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 text-xs">
      
      {/* Form Column */}
      <div className="lg:col-span-2 space-y-6">
        <div className="bg-stone-ivory border border-brass-gold/30 p-6 rounded-lg shadow-sm space-y-4">
          <h3 className="font-serif-display text-base uppercase font-bold text-maroon-deep border-b border-brass-gold/20 pb-2">
            {editingId ? "✏️ Edit Audio Track" : "➕ Add New Audio Track"}
          </h3>

          {message && (
            <div
              className={`p-3 rounded font-bold text-center ${
                message.type === "success"
                  ? "bg-marigold/20 text-maroon-deep border border-marigold"
                  : "bg-vermilion/10 text-vermilion border border-vermilion/30"
              }`}
            >
              {message.text}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Reciter Name */}
            <div className="space-y-1.5">
              <label className="block uppercase font-bold text-brass-gold">Reciter / Singer Name</label>
              <input
                type="text"
                required
                value={reciterName}
                onChange={(e) => setReciterName(e.target.value)}
                placeholder="e.g. Hariharan, Anuradha Paudwal, Traditional Choir"
                className="w-full text-sm bg-stone-ivory border border-brass-gold/30 rounded p-2 text-charcoal-brown font-semibold focus:outline-none focus:ring-1 focus:ring-marigold"
              />
            </div>

            {/* Audio URL */}
            <div className="space-y-1.5">
              <label className="block uppercase font-bold text-brass-gold">Audio Track URL (.mp3)</label>
              <input
                type="url"
                required
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://example.com/audio/hanuman_chalisa.mp3"
                className="w-full text-sm bg-stone-ivory border border-brass-gold/30 rounded p-2 text-charcoal-brown font-mono focus:outline-none focus:ring-1 focus:ring-marigold"
              />
            </div>

            {/* Duration */}
            <div className="space-y-1.5">
              <label className="block uppercase font-bold text-brass-gold">Duration (in seconds)</label>
              <input
                type="number"
                required
                min="30"
                value={duration}
                onChange={(e) => setDuration(parseInt(e.target.value) || 0)}
                className="w-40 text-sm bg-stone-ivory border border-brass-gold/30 rounded p-2 text-charcoal-brown font-semibold focus:outline-none"
              />
              <p className="text-[10px] text-charcoal-brown/50">e.g. 6 minutes = 360 seconds, 4 minutes = 240 seconds.</p>
            </div>

            {/* Description */}
            <div className="space-y-1.5">
              <label className="block uppercase font-bold text-brass-gold">Description (Voice style details)</label>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="e.g. Fast temple style, ideal for quick daily recitation."
                className="w-full text-sm bg-stone-ivory border border-brass-gold/30 rounded p-2 text-charcoal-brown focus:outline-none focus:ring-1 focus:ring-marigold"
              />
            </div>

            {/* Timestamps (Optional JSON) */}
            <div className="space-y-1.5">
              <label className="block uppercase font-bold text-brass-gold">Line-Sync Timestamps JSON (Optional)</label>
              <textarea
                rows={5}
                value={timestampsJSON}
                onChange={(e) => setTimestampsJSON(e.target.value)}
                placeholder='[{"verseId": "doha-01", "start": 0, "end": 12}, {"verseId": "chaupai-01", "start": 12, "end": 18}]'
                className="w-full text-sm bg-stone-ivory border border-brass-gold/30 rounded p-2 text-charcoal-brown font-mono focus:outline-none focus:ring-1 focus:ring-marigold"
              />
              <p className="text-[10px] text-charcoal-brown/50 leading-relaxed">
                Leave empty to auto-calculate timestamps evenly across the track length. If providing, ensure the JSON matches the schema array of start/end ranges.
              </p>
            </div>

            {/* Default toggle & Buttons */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
              <label className="flex items-center gap-2 font-bold uppercase text-brass-gold cursor-pointer">
                <input
                  type="checkbox"
                  checked={isDefault}
                  onChange={(e) => setIsDefault(e.target.checked)}
                  className="accent-marigold h-4 w-4"
                />
                Set as Default Voice
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
                  {isSubmitting ? "Saving..." : editingId ? "Update Track" : "Add Track"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* List Column */}
      <div className="space-y-4">
        <div className="bg-stone-ivory border border-brass-gold/30 p-4 rounded-lg shadow-sm h-[600px] overflow-y-auto space-y-4">
          <h4 className="font-serif-display text-sm uppercase font-bold text-maroon-deep border-b border-brass-gold/20 pb-2">
            Active Voices ({tracks.length})
          </h4>

          {tracks.length === 0 ? (
            <p className="text-xs text-charcoal-brown/50 text-center py-6">No custom audio tracks added yet. Synced player is running on static fallback voices.</p>
          ) : (
            <div className="space-y-3">
              {tracks.map((track) => (
                <div
                  key={track.id}
                  className="p-3 border border-brass-gold/15 bg-stone-ivory/50 rounded space-y-2"
                >
                  <div>
                    <h5 className="font-bold text-charcoal-brown uppercase leading-tight">
                      {track.reciterName}
                    </h5>
                    <p className="text-[10px] text-brass-gold font-semibold mt-0.5">
                      Duration: {Math.floor(track.duration / 60)}m {track.duration % 60}s
                    </p>
                    <p className="text-[9px] text-charcoal-brown/50 truncate mt-1">
                      {track.url}
                    </p>
                  </div>

                  <div className="flex gap-2 pt-2 border-t border-brass-gold/10">
                    <button
                      onClick={() => handleEdit(track)}
                      className="flex-1 bg-marigold hover:bg-maroon-deep text-maroon-deep hover:text-stone-ivory py-1 rounded text-center font-bold uppercase text-[9px] border border-brass-gold/30 transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(track.id)}
                      className="flex-1 bg-vermilion/10 hover:bg-vermilion text-vermilion hover:text-stone-ivory py-1 rounded text-center font-bold uppercase text-[9px] border border-vermilion/20 transition-colors"
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
