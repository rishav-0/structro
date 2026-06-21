"use client";

import { useState, useEffect, useRef } from "react";
import { getAdminDocs, addAdminDoc, updateAdminDoc, deleteAdminDoc } from "@/app/actions/admin-db";
import { useCloudinaryTracker } from "@/hooks/use-cloudinary-tracker";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Plus, Pencil, Trash2, Upload, LoaderCircle, ExternalLink, FileText } from "lucide-react";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";

interface Brochure {
  id: string;
  title: string;
  fileUrl: string;
  createdAt: number;
  updatedAt: number;
}

const initialForm: Omit<Brochure, "id" | "createdAt" | "updatedAt"> = {
  title: "",
  fileUrl: "",
};

export default function BrochuresPage() {
  const [brochures, setBrochures] = useState<Brochure[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(initialForm);
  const [uploading, setUploading] = useState(false);
  const [originalUrls, setOriginalUrls] = useState<string[]>([]);

  const { trackUpload, handleSave, handleCancel, handleDeleteDoc, extractUrls } = useCloudinaryTracker();
  const isSavedRef = useRef(false);

  useEffect(() => {
    if (!open) {
      if (!isSavedRef.current) {
        handleCancel();
      }
      isSavedRef.current = false;
    }
  }, [open, handleCancel]);

  const [confirmState, setConfirmState] = useState<{
    open: boolean;
    title: string;
    description: string;
    confirmLabel: string;
    destructive: boolean;
    onConfirm: () => void;
  }>({
    open: false,
    title: "",
    description: "",
    confirmLabel: "Confirm",
    destructive: false,
    onConfirm: () => {},
  });

  const showConfirm = (
    title: string,
    description: string,
    action: () => void,
    confirmLabel = "Confirm",
    destructive = false
  ) => {
    setConfirmState({
      open: true,
      title,
      description,
      confirmLabel,
      destructive,
      onConfirm: () => {
        setConfirmState((s) => ({ ...s, open: false }));
        action();
      },
    });
  };

  useEffect(() => {
    fetchBrochures();
  }, []);

  const fetchBrochures = async () => {
    try {
      const data = await getAdminDocs("brochures", "createdAt", "desc") as Brochure[];
      setBrochures(data);
    } catch (error) {
      console.error("Error fetching brochures:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    if (files.length > 1) {
      alert("You can only upload one brochure at a time.");
      return;
    }

    const file = files[0];
    if (file.type !== "application/pdf") {
      alert("Only PDF files are supported.");
      return;
    }

    const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
    if (file.size > MAX_FILE_SIZE) {
      alert("File size exceeds the 10MB limit.");
      return;
    }

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", "brochures");

      const res = await fetch("/api/admin/upload-brochure", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();

      if (!res.ok || !data.secureUrl) {
        throw new Error(data.error || "Upload failed.");
      }

      setForm({ ...form, fileUrl: data.secureUrl });
      trackUpload(data.secureUrl);
    } catch (err) {
      console.error("Upload error:", err);
      alert(err instanceof Error ? err.message : "Upload failed.");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async () => {
    if (!form.title || !form.fileUrl) {
      alert("Title and file are required.");
      return;
    }
    if (!editingId && brochures.length >= 1) {
      alert("Only one brochure is allowed. Please edit or delete the existing brochure.");
      return;
    }
    try {
      const data = {
        ...form,
        updatedAt: Date.now(),
        ...(editingId ? {} : { createdAt: Date.now() }),
      };

      isSavedRef.current = true;
      if (editingId) {
        await updateAdminDoc("brochures", editingId, data);
      } else {
        await addAdminDoc("brochures", data);
      }

      await handleSave(extractUrls(data), originalUrls);

      setOpen(false);
      setEditingId(null);
      setForm(initialForm);
      setOriginalUrls([]);
      fetchBrochures();
    } catch (error) {
      console.error("Error saving brochure:", error);
    }
  };

  const handleEdit = (brochure: Brochure) => {
    setForm({
      title: brochure.title,
      fileUrl: brochure.fileUrl,
    });
    setEditingId(brochure.id);
    setOriginalUrls(extractUrls(brochure));
    isSavedRef.current = false;
    setOpen(true);
  };

  const handleDelete = (id: string) => {
    const brochureToDelete = brochures.find((b) => b.id === id);
    showConfirm(
      "Delete Brochure",
      "This action cannot be undone.",
      async () => {
        try {
          await deleteAdminDoc("brochures", id);
          if (brochureToDelete) {
            await handleDeleteDoc(brochureToDelete);
          }
          fetchBrochures();
        } catch (error) {
          console.error("Error deleting brochure:", error);
        }
      },
      "Delete",
      true
    );
  };

  const brochure = brochures[0];

  return (
    <>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Brochures</h1>
          <p className="mt-1 text-neutral-400">Manage company brochure PDF</p>
        </div>
        {!brochure && !loading && (
          <Button onClick={() => { setForm(initialForm); setEditingId(null); setOriginalUrls([]); isSavedRef.current = false; setOpen(true); }}>
            <Plus className="mr-2 size-4" />
            Upload Brochure
          </Button>
        )}
      </div>

      {loading ? (
        <div className="p-8 text-neutral-400">Loading...</div>
      ) : brochure ? (
        <div className="rounded-xl border border-white/10 bg-white/5 p-6 max-w-2xl">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-primary/10 rounded-lg text-primary shrink-0">
              <FileText className="size-8" />
            </div>
            <div className="flex-1 space-y-1">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-lg text-white">{brochure.title}</h3>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon" onClick={() => handleEdit(brochure)}>
                    <Pencil className="size-4 text-neutral-400 hover:text-white" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => handleDelete(brochure.id)}>
                    <Trash2 className="size-4 text-red-400 hover:text-red-300" />
                  </Button>
                </div>
              </div>
              <p className="text-sm text-neutral-400">
                Uploaded on {new Date(brochure.createdAt).toLocaleDateString()}
              </p>
              <div className="pt-2">
                <a
                  href={brochure.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline"
                >
                  <ExternalLink className="size-4" />
                  View & Download PDF
                </a>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="rounded-xl border border-dashed border-white/20 bg-white/5 p-12 text-center max-w-2xl flex flex-col items-center justify-center gap-4">
          <div className="p-4 bg-white/5 rounded-full text-neutral-400">
            <FileText className="size-12" />
          </div>
          <div className="space-y-1">
            <h3 className="font-semibold text-lg text-white">No Brochure Uploaded</h3>
            <p className="text-sm text-neutral-400">
              Upload your company brochure PDF to show it in the website footer.
            </p>
          </div>
          <Button onClick={() => { setForm(initialForm); setEditingId(null); setOriginalUrls([]); isSavedRef.current = false; setOpen(true); }}>
            <Plus className="mr-2 size-4" />
            Upload Brochure
          </Button>
        </div>
      )}

      {/* Main Dialog (Create/Edit) */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-neutral-900 text-white border-neutral-800">
          <DialogHeader>
            <DialogTitle>{editingId ? "Edit Brochure" : "Upload Brochure"}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <label className="text-sm font-medium">Title</label>
              <Input
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="e.g. Company Brochure 2025"
                className="bg-neutral-800 border-neutral-700"
              />
            </div>
            <div className="grid gap-2">
              <label className="text-sm font-medium">PDF File</label>
              <div className="flex items-center gap-3">
                <label className="cursor-pointer">
                  <input
                    type="file"
                    accept="application/pdf"
                    multiple={false}
                    className="hidden"
                    onChange={handleFileUpload}
                    disabled={uploading}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="bg-transparent"
                    disabled={uploading}
                    asChild
                  >
                    <span>
                      {uploading ? (
                        <LoaderCircle className="mr-2 size-4 animate-spin" />
                      ) : (
                        <Upload className="mr-2 size-4" />
                      )}
                      {uploading ? "Uploading..." : "Upload PDF"}
                    </span>
                  </Button>
                </label>
                {form.fileUrl && (
                  <a
                    href={form.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-primary hover:underline flex items-center gap-1"
                  >
                    <ExternalLink className="size-3" />
                    View PDF
                  </a>
                )}
              </div>
              {form.fileUrl && (
                <Input
                  value={form.fileUrl}
                  onChange={(e) => setForm({ ...form, fileUrl: e.target.value })}
                  placeholder="https://..."
                  className="bg-neutral-800 border-neutral-700 text-xs mt-2"
                />
              )}
              <p className="text-xs text-neutral-500">
                Upload a PDF or paste a URL directly.
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)} className="bg-transparent">Cancel</Button>
            <Button onClick={() => showConfirm(
              editingId ? "Update Brochure?" : "Create Brochure?",
              editingId ? "Save changes to this brochure?" : "Create this new brochure?",
              handleSubmit,
              editingId ? "Update" : "Create"
            )}>{editingId ? "Update" : "Create"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <ConfirmDialog
        open={confirmState.open}
        title={confirmState.title}
        description={confirmState.description}
        confirmLabel={confirmState.confirmLabel}
        destructive={confirmState.destructive}
        onConfirm={confirmState.onConfirm}
        onCancel={() => setConfirmState((s) => ({ ...s, open: false }))}
      />
    </>
  );
}
