"use client";

import { useState, useEffect, useRef } from "react";
import { getAdminDocs, addAdminDoc, updateAdminDoc, deleteAdminDoc } from "@/app/actions/admin-db";
import { useCloudinaryTracker } from "@/hooks/use-cloudinary-tracker";
import { AdminImageUploadField } from "@/components/admin-image-upload-field";
import { AdminGalleryUpload } from "@/components/admin-gallery-upload";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Pencil, Trash2, Search, Package, Tag } from "lucide-react";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";

interface GalleryImage {
  url: string;
  alt?: string;
  publicId?: string;
}

interface Product {
  id: string;
  title: string;
  specs: string;
  description: string;
  features: string[];
  image: string;
  images?: GalleryImage[];
  subtitle?: string;
  materialGrade?: string;
  tags?: string[];
  badge?: string;
  imageAlt?: string;
  createdAt: number;
  updatedAt: number;
}

const initialForm: Omit<Product, "id" | "createdAt" | "updatedAt"> = {
  title: "",
  specs: "",
  description: "",
  features: [],
  image: "",
  images: [],
  subtitle: "",
  materialGrade: "",
  tags: [],
  badge: "",
  imageAlt: "",
};

import { AdminPagination } from "@/components/admin-pagination";

const ITEMS_PER_PAGE = 10;

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(initialForm);
  const [featuresInput, setFeaturesInput] = useState("");
  const [tagsInput, setTagsInput] = useState("");
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
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const data = await getAdminDocs("products", "title", "asc") as Product[];
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    try {
      const productData = {
        ...form,
        features: featuresInput.split(",").map((f) => f.trim()).filter(Boolean),
        tags: tagsInput.split(",").map((t) => t.trim()).filter(Boolean),
        updatedAt: Date.now(),
        ...(editingId ? {} : { createdAt: Date.now() }),
      };

      isSavedRef.current = true;
      if (editingId) {
        await updateAdminDoc("products", editingId, productData);
      } else {
        await addAdminDoc("products", productData);
      }

      await handleSave(extractUrls(productData), originalUrls);

      setOpen(false);
      setEditingId(null);
      setForm(initialForm);
      setFeaturesInput("");
      setTagsInput("");
      setOriginalUrls([]);
      fetchProducts();
    } catch (error) {
      console.error("Error saving product:", error);
    }
  };

  const handleEdit = (product: Product) => {
    setForm({
      title: product.title,
      specs: product.specs,
      description: product.description,
      features: product.features,
      image: product.image,
      images: product.images || [],
      subtitle: product.subtitle || "",
      materialGrade: product.materialGrade || "",
      tags: product.tags || [],
      badge: product.badge || "",
      imageAlt: product.imageAlt || "",
    });
    setFeaturesInput(Array.isArray(product.features) ? product.features.join(", ") : "");
    setTagsInput(Array.isArray(product.tags) ? product.tags.join(", ") : "");
    setEditingId(product.id);
    setOriginalUrls(extractUrls(product));
    isSavedRef.current = false;
    setOpen(true);
  };

  const handleDelete = (id: string) => {
    const productToDelete = products.find((p) => p.id === id);
    showConfirm(
      "Delete Product",
      "This action cannot be undone.",
      async () => {
        try {
          await deleteAdminDoc("products", id);
          if (productToDelete) {
            await handleDeleteDoc(productToDelete);
          }
          fetchProducts();
        } catch (error) {
          console.error("Error deleting product:", error);
        }
      },
      "Delete",
      true
    );
  };

  const filteredProducts = products.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase()) ||
    p.specs.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  return (
    <>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Products</h1>
          <p className="mt-1 text-neutral-400">Manage your product catalog</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => { setForm(initialForm); setFeaturesInput(""); setEditingId(null); setOriginalUrls([]); isSavedRef.current = false; }}>
              <Plus className="mr-2 size-4" />
              Add Product
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto bg-neutral-900 text-white border-neutral-800">
            <DialogHeader>
              <DialogTitle>{editingId ? "Edit Product" : "Add New Product"}</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Title</label>
                  <Input
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    placeholder="Product name"
                    className="bg-neutral-800 border-neutral-700"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Specifications</label>
                  <Input
                    value={form.specs}
                    onChange={(e) => setForm({ ...form, specs: e.target.value })}
                    placeholder="e.g., 1 BHK, 500 Ltr"
                    className="bg-neutral-800 border-neutral-700"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Description</label>
                <Textarea
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder="Product description"
                  rows={3}
                  className="bg-neutral-800 border-neutral-700"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Features (comma-separated)</label>
                <Input
                  value={featuresInput}
                  onChange={(e) => setFeaturesInput(e.target.value)}
                  placeholder="Feature 1, Feature 2, Feature 3"
                  className="bg-neutral-800 border-neutral-700"
                />
              </div>
              <div className="grid grid-cols-2 gap-4 border-t border-white/10 pt-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Material Grade</label>
                  <Input
                    value={form.materialGrade}
                    onChange={(e) => setForm({ ...form, materialGrade: e.target.value })}
                    placeholder="e.g., SS304, Mild Steel (fallback: Industrial)"
                    className="bg-neutral-800 border-neutral-700"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Tags (comma-separated)</label>
                  <Input
                    value={tagsInput}
                    onChange={(e) => setTagsInput(e.target.value)}
                    placeholder="tag 1, tag 2 (fallback: Built for industrial use...)"
                    className="bg-neutral-800 border-neutral-700"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Subtitle / Intro</label>
                  <Input
                    value={form.subtitle}
                    onChange={(e) => setForm({ ...form, subtitle: e.target.value })}
                    placeholder="e.g., Engineered for resilience. Built with precision-grade..."
                    className="bg-neutral-800 border-neutral-700"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Top Badge Label</label>
                  <Input
                    value={form.badge}
                    onChange={(e) => setForm({ ...form, badge: e.target.value })}
                    placeholder="e.g., Industrial Grade, Premium Modular"
                    className="bg-neutral-800 border-neutral-700"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <AdminImageUploadField
                    label="Main Image (used as thumbnail)"
                    value={form.image}
                    onChange={(value) => setForm((current) => ({ ...current, image: value }))}
                    placeholder="https://..."
                    folder="products"
                    onUploadSuccess={trackUpload}
                  />
                </div>
                <div className="space-y-2 flex flex-col justify-end">
                  <label className="text-sm font-medium">Main Image Alt Text (optional)</label>
                  <Input
                    value={form.imageAlt}
                    onChange={(e) => setForm({ ...form, imageAlt: e.target.value })}
                    placeholder="e.g., Prefabricated residential PEB home front facade"
                    className="bg-neutral-800 border-neutral-700"
                  />
                </div>
              </div>
              <div className="border-t border-white/10 pt-4">
                <AdminGalleryUpload
                  value={form.images || []}
                  onChange={(value) => setForm((current) => ({ ...current, images: value }))}
                  folder="products"
                  onUploadSuccess={trackUpload}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setOpen(false)} className="bg-transparent">Cancel</Button>
              <Button onClick={() => showConfirm(
                editingId ? "Update Product?" : "Create Product?",
                editingId ? "Save changes to this product?" : "Create this new product?",
                handleSubmit,
                editingId ? "Update" : "Create"
              )}>{editingId ? "Update" : "Create"}</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="mb-6 relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-neutral-500" />
        <Input
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10 bg-neutral-900 border-neutral-800"
        />
      </div>

      <div className="rounded-xl border border-white/10 bg-white/5">
        <CardHeader className="border-b border-white/10">
          <CardTitle>All Products</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {loading ? (
            <div className="p-8 text-center text-neutral-400">Loading...</div>
          ) : filteredProducts.length === 0 ? (
            <div className="p-8 text-center text-neutral-400">No products found</div>
          ) : (
            <>
              <Table>
                <TableHeader>
                  <TableRow className="border-white/5 hover:bg-transparent">
                    <TableHead className="text-neutral-400">Title</TableHead>
                    <TableHead className="text-neutral-400">Specs</TableHead>
                    <TableHead className="text-neutral-400">Description</TableHead>
                    <TableHead className="text-right text-neutral-400">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedProducts.map((product) => (
                    <TableRow key={product.id} className="border-white/5">
                      <TableCell className="font-medium max-w-[200px] truncate">{product.title}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Tag className="size-3" /> {product.specs}
                        </div>
                      </TableCell>
                      <TableCell className="max-w-xs truncate">{product.description}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button variant="ghost" size="icon" onClick={() => handleEdit(product)}>
                            <Pencil className="size-4" />
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => handleDelete(product.id)}>
                            <Trash2 className="size-4 text-red-400" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <AdminPagination 
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
                totalItems={filteredProducts.length}
                itemsPerPage={ITEMS_PER_PAGE}
              />
            </>
          )}
        </CardContent>
      </div>
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