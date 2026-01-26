"use client";

import { useState, useRef } from "react";
import imageCompression from "browser-image-compression";
import { createClient } from "@/lib/supabase/client";
import { Upload, X, Loader2, Link, ImageIcon } from "lucide-react";

interface ImageUploadProps {
  value?: string | null;
  onChange: (url: string | null) => void;
}

type InputMode = "upload" | "url";

export function ImageUpload({ value, onChange }: ImageUploadProps) {
  const [mode, setMode] = useState<InputMode>("upload");
  const [urlInput, setUrlInput] = useState("");
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError(null);

    try {
      const compressedFile = await imageCompression(file, {
        maxSizeMB: 0.5,
        maxWidthOrHeight: 800,
        useWebWorker: true,
      });

      const supabase = createClient();
      const ext = file.name.split(".").pop();
      const filename = `${Date.now()}-${Math.random().toString(36).substring(7)}.${ext}`;

      const { error: uploadError } = await supabase.storage
        .from("event-images")
        .upload(filename, compressedFile);

      if (uploadError) throw uploadError;

      const {
        data: { publicUrl },
      } = supabase.storage.from("event-images").getPublicUrl(filename);

      onChange(publicUrl);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  const handleUrlSubmit = () => {
    if (urlInput.trim()) {
      onChange(urlInput.trim());
      setUrlInput("");
    }
  };

  const handleRemove = () => {
    onChange(null);
    setUrlInput("");
  };

  const inputClass =
    "w-full px-3 py-2 bg-black/40 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-white/40 font-mono text-sm";

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-white/70">
        Event Image (optional)
      </label>

      {/* Mode Toggle */}
      {!value && (
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setMode("upload")}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-mono transition-all ${
              mode === "upload"
                ? "bg-white/10 text-white border border-white/30"
                : "text-white/50 hover:text-white/70 border border-transparent"
            }`}
          >
            <ImageIcon size={14} />
            Upload
          </button>
          <button
            type="button"
            onClick={() => setMode("url")}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-mono transition-all ${
              mode === "url"
                ? "bg-white/10 text-white border border-white/30"
                : "text-white/50 hover:text-white/70 border border-transparent"
            }`}
          >
            <Link size={14} />
            URL
          </button>
        </div>
      )}

      {value ? (
        <div className="relative inline-block">
          <img
            src={value}
            alt="Event preview"
            className="w-32 h-32 object-cover rounded-lg border border-white/20"
          />
          <button
            type="button"
            onClick={handleRemove}
            className="absolute -top-2 -right-2 p-1.5 bg-black/80 border border-white/20 rounded-full text-white/70 hover:text-white hover:border-white/40 transition-colors"
          >
            <X size={12} />
          </button>
        </div>
      ) : mode === "upload" ? (
        <div
          onClick={() => inputRef.current?.click()}
          className="w-32 h-32 border border-dashed border-white/20 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-white/40 hover:bg-white/5 transition-all"
        >
          {uploading ? (
            <Loader2 size={24} className="text-white/40 animate-spin" />
          ) : (
            <>
              <Upload size={24} className="text-white/40 mb-2" />
              <span className="text-xs text-white/40 font-mono">Upload</span>
            </>
          )}
        </div>
      ) : (
        <div className="flex gap-2">
          <input
            type="url"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            placeholder="https://example.com/image.jpg"
            className={inputClass}
            onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleUrlSubmit())}
          />
          <button
            type="button"
            onClick={handleUrlSubmit}
            disabled={!urlInput.trim()}
            className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white/70 hover:text-white hover:border-white/40 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-mono text-sm"
          >
            Add
          </button>
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleUpload}
        className="hidden"
        disabled={uploading}
      />

      {error && <p className="text-sm text-red-400/80 font-mono">{error}</p>}
    </div>
  );
}
