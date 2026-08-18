import React from "react";
import { Button } from "./button"
import { Input } from "./input"
import { useImageUpload } from "../../hooks/use-image-upload"
import { ImagePlus, X, Upload, Trash2, Edit, Loader2 } from "lucide-react"
import { useCallback, useState, useEffect } from "react"
import { cn } from "../../lib/utils"

interface ImageUploadInputProps {
  onUpload?: (url: string) => void;
  defaultUrl?: string;
}

export function ImageUploadInput({ onUpload, defaultUrl }: ImageUploadInputProps) {
  const {
    previewUrl,
    fileName,
    fileInputRef,
    handleThumbnailClick,
    handleFileChange: defaultHandleFileChange,
    handleRemove: defaultHandleRemove,
    isUploading
  } = useImageUpload({
    onUpload,
  })

  // Expose an initial value if provided
  const [internalUrl, setInternalUrl] = useState<string | null>(defaultUrl || null);

  useEffect(() => {
    if (previewUrl) {
      setInternalUrl(previewUrl);
    }
  }, [previewUrl]);

  const handleRemove = useCallback(() => {
    setInternalUrl(null);
    defaultHandleRemove();
    if (onUpload) {
        onUpload("");
    }
  }, [defaultHandleRemove, onUpload]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    defaultHandleFileChange(e);
  };

  const [isDragging, setIsDragging] = useState(false)

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
  }

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault()
      e.stopPropagation()
      setIsDragging(false)

      const file = e.dataTransfer.files?.[0]
      if (file && file.type.startsWith("image/")) {
        const fakeEvent = {
          target: {
            files: [file],
          },
        } as React.ChangeEvent<HTMLInputElement>
        handleFileChange(fakeEvent)
      }
    },
    [handleFileChange],
  )

  return (
    <div className="w-full">
      <Input
        type="file"
        accept="image/*"
        className="hidden"
        ref={fileInputRef}
        onChange={handleFileChange}
        disabled={isUploading}
      />

      {!internalUrl ? (
        <div
          onClick={isUploading ? undefined : handleThumbnailClick}
          onDragOver={handleDragOver}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={cn(
            "flex h-48 md:h-64 cursor-pointer flex-col items-center justify-center gap-4 rounded-lg border-2 border-dashed border-[#D3A971]/50 bg-white/50 transition-colors hover:bg-white/80",
            isDragging && "border-[#D3A971] bg-white",
            isUploading && "opacity-50 cursor-not-allowed"
          )}
        >
          <div className="rounded-full bg-white p-3 shadow-sm border border-gray-100">
            {isUploading ? (
              <Loader2 className="h-6 w-6 text-gray-400 animate-spin" />
            ) : (
              <ImagePlus className="h-6 w-6 text-gray-400" />
            )}
          </div>
          <div className="text-center">
            {isUploading ? (
              <p className="text-sm font-medium text-gray-700">Uploading...</p>
            ) : (
              <>
                <p className="text-sm font-medium text-gray-700">Click to select</p>
                <p className="text-xs text-gray-500">
                  or drag and drop file here
                </p>
              </>
            )}
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          <div 
            onClick={(e) => { e.preventDefault(); if(!isUploading) handleThumbnailClick(); }}
            className="group relative h-48 md:h-64 overflow-hidden rounded-lg border border-black/10 cursor-pointer bg-white shadow-sm"
          >
            <img
              src={internalUrl}
              alt="Preview"
              className={cn("object-cover w-full h-full transition-transform duration-300 group-hover:scale-105", isUploading && "opacity-50 blur-sm grayscale")}
            />
            {isUploading ? (
              <div className="absolute inset-0 bg-black/20 flex flex-col items-center justify-center">
                <Loader2 className="h-8 w-8 text-white animate-spin mb-2" />
                <span className="text-white font-medium text-sm">Uploading to Cloudinary...</span>
              </div>
            ) : (
              <div className="absolute inset-0 bg-black/50 opacity-0 transition-opacity group-hover:opacity-100 flex items-center justify-center">
                <div className="flex items-center gap-2 text-white font-bold bg-black/40 px-4 py-2 rounded-full backdrop-blur-sm shadow-lg">
                  <Edit className="w-4 h-4" />
                  <span>Edit Image</span>
                </div>
              </div>
            )}
          </div>
          <div className="flex items-center justify-end">
            <button
              type="button"
              onClick={(e) => { e.preventDefault(); handleRemove(); }}
              className="h-8 w-8 rounded-md flex items-center justify-center border border-red-200 text-red-500 hover:bg-red-50 hover:text-red-600 transition-colors bg-white shadow-sm disabled:opacity-50"
              title="Remove image"
              disabled={isUploading}
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

