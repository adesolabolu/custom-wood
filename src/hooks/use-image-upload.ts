import React from "react";
import { useCallback, useEffect, useRef, useState } from "react";

interface UseImageUploadProps {
  onUpload?: (url: string) => void;
}

const generateSignature = async (timestamp: number) => {
  const apiSecret = "me7HSSn8PlJVEwtTfQcZZMmMPWA";
  const str = `timestamp=${timestamp}${apiSecret}`;
  const msgUint8 = new TextEncoder().encode(str);
  const hashBuffer = await crypto.subtle.digest('SHA-1', msgUint8);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hashHex;
};

export function useImageUpload({ onUpload }: UseImageUploadProps = {}) {
  const previewRef = useRef<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleThumbnailClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleFileChange = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
        setFileName(file.name);
        // Show temporary local preview
        const localUrl = URL.createObjectURL(file);
        setPreviewUrl(localUrl);
        previewRef.current = localUrl;
        
        setIsUploading(true);
        try {
          const timestamp = Math.round(new Date().getTime() / 1000);
          const signature = await generateSignature(timestamp);
          
          const formData = new FormData();
          formData.append("file", file);
          formData.append("api_key", "551922289419343");
          formData.append("timestamp", timestamp.toString());
          formData.append("signature", signature);

          const response = await fetch(
            `https://api.cloudinary.com/v1_1/drzh5dzha/image/upload`,
            {
              method: "POST",
              body: formData,
            }
          );

          const data = await response.json();
          if (data.secure_url) {
            setPreviewUrl(data.secure_url);
            previewRef.current = data.secure_url;
            onUpload?.(data.secure_url);
          } else {
            console.error("Cloudinary upload error:", data);
            alert("Failed to upload image. Please try again.");
          }
        } catch (error) {
          console.error("Upload failed:", error);
          alert("Failed to upload image.");
        } finally {
          setIsUploading(false);
        }
      }
    },
    [onUpload],
  );

  const handleRemove = useCallback(() => {
    if (previewUrl && previewUrl.startsWith('blob:')) {
      URL.revokeObjectURL(previewUrl);
    }
    setPreviewUrl(null);
    setFileName(null);
    previewRef.current = null;
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }, [previewUrl]);

  useEffect(() => {
    return () => {
      if (previewRef.current && previewRef.current.startsWith('blob:')) {
        URL.revokeObjectURL(previewRef.current);
      }
    };
  }, []);

  return {
    previewUrl,
    fileName,
    fileInputRef,
    handleThumbnailClick,
    handleFileChange,
    handleRemove,
    isUploading,
  };
}

