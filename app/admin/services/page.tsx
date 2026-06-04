"use client";

import { useState, useEffect } from "react";
import { getAdminDocs, addAdminDoc, updateAdminDoc, deleteAdminDoc } from "@/app/actions/admin-db";
import { AdminImageUploadField } from "@/components/admin-image-upload-field";
import { AdminGalleryUpload } from "@/components/admin-gallery-upload";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Pencil, Trash2, Search, Wrench } from "lucide-react";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";

interface ServiceCatalogItem {
  title: string;
  description: string;
  image?: string;
}

interface GalleryImage {
  url: string;
  alt?: string;
  publicId?: string;
}

interface Service {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  homeDescription: string;
  features: string[];
  image: string;
  images?: GalleryImage[];
  alt: string;
  navDescription: string;
  catalog: ServiceCatalogItem[];
  createdAt: number;
  updatedAt: number;
}

const initialForm: Omit<Service, "id" | "createdAt" | "updatedAt"> = {
  title: "",
  subtitle: "",
  description: "",
  homeDescription: "",
  features: [],
  image: "",
  images: [],
  alt: "",
  navDescription: "",
  catalog: [],
};

import { AdminPagination } from "@/components/admin-pagination";

const ITEMS_PER_PAGE = 10;

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(initialForm);
  const [featuresInput, setFeaturesInput] = useState("");
  const [catalogItems, setCatalogItems] = useState<ServiceCatalogItem[]>([]);

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
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const data = await getAdminDocs("services", "title", "asc") as Service[];
      setServices(data);
    } catch (error) {
      console.error("Error fetching services:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    try {
      const serviceData = {
        ...form,
        features: featuresInput.split(",").map((f) => f.trim()).filter(Boolean),
        catalog: catalogItems,
        updatedAt: Date.now(),
        ...(editingId ? {} : { createdAt: Date.now() }),
      };

      if (editingId) {
        await updateAdminDoc("services", editingId, serviceData);
      } else {
        await addAdminDoc("services", serviceData);
      }

      setOpen(false);
      setEditingId(null);
      setForm(initialForm);
      setFeaturesInput("");
      setCatalogItems([]);
      fetchServices();
    } catch (error) {
      console.error("Error saving service:", error);
    }
  };

  const handleEdit = (service: Service) => {
    setForm({
      title: service.title,
      subtitle: service.subtitle,
      description: service.description,
      homeDescription: service.homeDescription,
      features: service.features,
      image: service.image,
      images: service.images || [],
      alt: service.alt,
      navDescription: service.navDescription,
      catalog: service.catalog,
    });
    setFeaturesInput(Array.isArray(service.features) ? service.features.join(", ") : "");
    setCatalogItems(Array.isArray(service.catalog) ? service.catalog : []);
    setEditingId(service.id);
    setOpen(true);
  };

  const handleDelete = (id: string) => {
    showConfirm(
      "Delete Service",
      "This action cannot be undone.",
      async () => {
        try {
          await deleteAdminDoc("services", id);
          fetchServices();
        } catch (error) {
          console.error("Error deleting service:", error);
        }
      },
      "Delete",
      true
    );
  };

  const filteredServices = services.filter((s) =>
    s.title.toLowerCase().includes(search.toLowerCase()) ||
    s.subtitle?.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredServices.length / ITEMS_PER_PAGE);
  const paginatedServices = filteredServices.slice(
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
          <h1 className="text-3xl font-bold">Services</h1>
          <p className="mt-1 text-neutral-400">Manage your service offerings</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => { setForm(initialForm); setFeaturesInput(""); setCatalogItems([]); setEditingId(null); }}>
              <Plus className="mr-2 size-4" />
              Add Service
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto bg-neutral-900 text-white border-neutral-800">
            <DialogHeader>
              <DialogTitle>{editingId ? "Edit Service" : "Add New Service"}</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Title</label>
                  <Input
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    placeholder="Service title"
                    className="bg-neutral-800 border-neutral-700"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Subtitle</label>
                  <Input
                    value={form.subtitle}
                    onChange={(e) => setForm({ ...form, subtitle: e.target.value })}
                    placeholder="Short subtitle"
                    className="bg-neutral-800 border-neutral-700"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Description</label>
                <Textarea
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder="Full description"
                  rows={3}
                  className="bg-neutral-800 border-neutral-700"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Home Description</label>
                <Input
                  value={form.homeDescription}
                  onChange={(e) => setForm({ ...form, homeDescription: e.target.value })}
                  placeholder="Short description for homepage"
                  className="bg-neutral-800 border-neutral-700"
                />
              </div>
              <div className="space-y-2">
                <AdminImageUploadField
                  label="Main Image (used as thumbnail)"
                  value={form.image}
                  onChange={(value) => setForm((current) => ({ ...current, image: value }))}
                  placeholder="Upload or enter image URL"
                  folder="services"
                />
              </div>
              <div className="border-t border-white/10 pt-4">
                <AdminGalleryUpload
                  value={form.images || []}
                  onChange={(value) => setForm((current) => ({ ...current, images: value }))}
                  folder="services"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Alt Text</label>
                  <Input
                    value={form.alt}
                    onChange={(e) => setForm({ ...form, alt: e.target.value })}
                    placeholder="Alt text"
                    className="bg-neutral-800 border-neutral-700"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Nav Description</label>
                  <Input
                    value={form.navDescription}
                    onChange={(e) => setForm({ ...form, navDescription: e.target.value })}
                    placeholder="Short nav text"
                    className="bg-neutral-800 border-neutral-700"
                  />
                </div>
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
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">Catalog Items</label>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setCatalogItems([...catalogItems, { title: "", description: "", image: "" }])}
                    className="bg-transparent text-xs"
                  >
                    <Plus className="mr-1 size-3" /> Add Item
                  </Button>
                </div>
                <div className="max-h-[500px] space-y-3 overflow-y-auto pr-1">
                  {catalogItems.map((item, index) => (
                    <div key={index} className="flex items-start gap-2 rounded border border-neutral-700 p-3">
                      <div className="flex-1 space-y-2">
                        <Input
                          value={item.title}
                          onChange={(e) => {
                            const updated = [...catalogItems];
                            updated[index] = { ...updated[index], title: e.target.value };
                            setCatalogItems(updated);
                          }}
                          placeholder="Item title"
                          className="bg-neutral-800 border-neutral-700 text-sm"
                        />
                        <Textarea
                          value={item.description}
                          onChange={(e) => {
                            const updated = [...catalogItems];
                            updated[index] = { ...updated[index], description: e.target.value };
                            setCatalogItems(updated);
                          }}
                          placeholder="Item description"
                          rows={2}
                          className="bg-neutral-800 border-neutral-700 text-sm"
                        />
                        <AdminImageUploadField
                          label="Catalog Item Image"
                          value={item.image || ""}
                          onChange={(value) => {
                            const updated = [...catalogItems];
                            updated[index] = { ...updated[index], image: value };
                            setCatalogItems(updated);
                          }}
                          folder="services"
                          placeholder="Upload or enter image URL"
                          showPreview={true}
                        />
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => setCatalogItems(catalogItems.filter((_, i) => i !== index))}
                        className="mt-1 shrink-0 text-red-400 hover:text-red-300"
                      >
                        <Trash2 className="size-4" />
                      </Button>
                    </div>
                  ))}
                  {catalogItems.length === 0 && (
                    <p className="py-2 text-xs text-neutral-500">No catalog items yet. Click &quot;Add Item&quot; to add one.</p>
                  )}
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setOpen(false)} className="bg-transparent">Cancel</Button>
              <Button onClick={() => showConfirm(
                editingId ? "Update Service?" : "Create Service?",
                editingId ? "Save changes to this service?" : "Create this new service?",
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
          placeholder="Search services..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10 bg-neutral-900 border-neutral-800"
        />
      </div>

      <div className="rounded-xl border border-white/10 bg-white/5">
        <CardHeader className="border-b border-white/10">
          <CardTitle>All Services</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {loading ? (
            <div className="p-8 text-center text-neutral-400">Loading...</div>
          ) : filteredServices.length === 0 ? (
            <div className="p-8 text-center text-neutral-400">No services found</div>
          ) : (
            <>
              <Table>
                <TableHeader>
                  <TableRow className="border-white/5 hover:bg-transparent">
                    <TableHead className="text-neutral-400">Title</TableHead>
                    <TableHead className="text-neutral-400">Subtitle</TableHead>
                    <TableHead className="text-neutral-400">Description</TableHead>
                    <TableHead className="text-right text-neutral-400">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedServices.map((service) => (
                    <TableRow key={service.id} className="border-white/5">
                      <TableCell className="font-medium max-w-[200px] truncate">{service.title}</TableCell>
                      <TableCell>{service.subtitle}</TableCell>
                      <TableCell className="max-w-xs truncate">{service.description}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button variant="ghost" size="icon" onClick={() => handleEdit(service)}>
                            <Pencil className="size-4" />
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => handleDelete(service.id)}>
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
                totalItems={filteredServices.length}
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