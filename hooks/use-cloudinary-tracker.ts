"use client";

import { useState, useCallback } from "react";
import { deleteMultipleCloudinaryAssetsByUrls } from "@/app/actions/admin-db";

export function useCloudinaryTracker() {
  const [uploadedUrls, setUploadedUrls] = useState<string[]>([]);

  const trackUpload = useCallback((url: string) => {
    if (url && url.includes("cloudinary.com")) {
      setUploadedUrls((prev) => {
        if (prev.includes(url)) return prev;
        return [...prev, url];
      });
    }
  }, []);

  const resetTracker = useCallback(() => {
    setUploadedUrls([]);
  }, []);

  // When form is cancelled, delete all uploaded files during this session
  const handleCancel = useCallback(async () => {
    if (uploadedUrls.length === 0) return;
    const urlsToDelete = [...uploadedUrls];
    resetTracker();
    await deleteMultipleCloudinaryAssetsByUrls(urlsToDelete);
  }, [uploadedUrls, resetTracker]);

  // When form is saved, delete:
  // 1. Files uploaded in this session but NOT kept in final form
  // 2. Original files that were replaced/removed in this session
  const handleSave = useCallback(async (currentFormUrls: string[], originalUrls: string[]) => {
    const urlsToDelete: string[] = [];

    // 1. Delete intermediate uploads not kept
    for (const url of uploadedUrls) {
      if (!currentFormUrls.includes(url)) {
        urlsToDelete.push(url);
      }
    }

    // 2. Delete original files that are no longer kept
    for (const url of originalUrls) {
      if (!currentFormUrls.includes(url)) {
        urlsToDelete.push(url);
      }
    }

    resetTracker();

    if (urlsToDelete.length > 0) {
      await deleteMultipleCloudinaryAssetsByUrls(urlsToDelete);
    }
  }, [uploadedUrls, resetTracker]);

  // Helper to extract Cloudinary URLs from any document structure
  const extractUrls = useCallback((doc: unknown): string[] => {
    const urls: string[] = [];
    function recurse(current: unknown) {
      if (!current) return;
      if (typeof current === "string") {
        if (current.includes("cloudinary.com")) {
          urls.push(current);
        }
      } else if (Array.isArray(current)) {
        for (const item of current) {
          recurse(item);
        }
      } else if (typeof current === "object") {
        for (const key of Object.keys(current as Record<string, unknown>)) {
          recurse((current as Record<string, unknown>)[key]);
        }
      }
    }
    recurse(doc);
    return Array.from(new Set(urls));
  }, []);

  // When a document is deleted entirely
  const handleDeleteDoc = useCallback(async (doc: unknown) => {
    const docUrls = extractUrls(doc);
    if (docUrls.length > 0) {
      await deleteMultipleCloudinaryAssetsByUrls(docUrls);
    }
  }, [extractUrls]);

  return {
    trackUpload,
    handleSave,
    handleCancel,
    handleDeleteDoc,
    extractUrls,
    resetTracker,
  };
}
