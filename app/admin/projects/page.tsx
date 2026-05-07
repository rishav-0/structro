"use client";

import { useState, useEffect } from "react";
import { getAdminDocs, addAdminDoc, updateAdminDoc, deleteAdminDoc } from "@/app/actions/admin-db";
import { AdminImageUploadField } from "@/components/admin-image-upload-field";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Pencil, Trash2, Search, MapPin, Building, Calendar } from "lucide-react";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";

interface Project {
  id: string;
  title: string;
  location: string;
  category: string;
  serviceId: string;
  src: string;
  alt: string;
  isVideo?: boolean;
  client?: string;
  scope?: string;
  quantity?: string;
  period?: string;
  type: "ongoing" | "completed";
  createdAt: number;
  updatedAt: number;
}

const initialForm: Omit<Project, "id" | "createdAt" | "updatedAt"> = {
  title: "",
  location: "",
  category: "",
  serviceId: "",
  src: "",
  alt: "",
  isVideo: false,
  client: "",
  scope: "",
  quantity: "",
  period: "",
  type: "completed",
};

const serviceOptions = [
  { value: "bridge", label: "Bridge Engineering" },
  { value: "peb", label: "PEB Buildings" },
  { value: "steel", label: "Steel Structures" },
  { value: "special-metal", label: "Special Metal Structures" },
  { value: "design", label: "Design Services" },
];

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(initialForm);

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
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const data = await getAdminDocs("projects", "title", "asc") as Project[];
      setProjects(data);
    } catch (error) {
      console.error("Error fetching projects:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    try {
      const projectData = {
        ...form,
        updatedAt: Date.now(),
        ...(editingId ? {} : { createdAt: Date.now() }),
      };

      if (editingId) {
        await updateAdminDoc("projects", editingId, projectData);
      } else {
        await addAdminDoc("projects", projectData);
      }

      setOpen(false);
      setEditingId(null);
      setForm(initialForm);
      fetchProjects();
    } catch (error) {
      console.error("Error saving project:", error);
    }
  };

  const handleEdit = (project: Project) => {
    setForm({
      title: project.title,
      location: project.location,
      category: project.category,
      serviceId: project.serviceId,
      src: project.src,
      alt: project.alt,
      isVideo: project.isVideo || false,
      client: project.client || "",
      scope: project.scope || "",
      quantity: project.quantity || "",
      period: project.period || "",
      type: project.type,
    });
    setEditingId(project.id);
    setOpen(true);
  };

  const handleDelete = (id: string) => {
    showConfirm(
      "Delete Project",
      "This action cannot be undone.",
      async () => {
        try {
          await deleteAdminDoc("projects", id);
          fetchProjects();
        } catch (error) {
          console.error("Error deleting project:", error);
        }
      },
      "Delete",
      true
    );
  };

  const filteredProjects = projects.filter((p) => {
    const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.location.toLowerCase().includes(search.toLowerCase());
    const matchesType = typeFilter === "all" || p.type === typeFilter;
    return matchesSearch && matchesType;
  });

  return (
    <>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Projects</h1>
          <p className="mt-1 text-neutral-400">Manage your project portfolio</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => { setForm(initialForm); setEditingId(null); }}>
              <Plus className="mr-2 size-4" />
              Add Project
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto bg-neutral-900 text-white border-neutral-800">
            <DialogHeader>
              <DialogTitle>{editingId ? "Edit Project" : "Add New Project"}</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Title</label>
                  <Input
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    placeholder="Project title"
                    className="bg-neutral-800 border-neutral-700"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Type</label>
                  <Select
                    value={form.type}
                    onValueChange={(value: "ongoing" | "completed") => setForm({ ...form, type: value })}
                  >
                    <SelectTrigger className="bg-neutral-800 border-neutral-700">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-neutral-800 border-neutral-700">
                      <SelectItem value="ongoing">Ongoing</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Location</label>
                  <Input
                    value={form.location}
                    onChange={(e) => setForm({ ...form, location: e.target.value })}
                    placeholder="Location"
                    className="bg-neutral-800 border-neutral-700"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Category</label>
                  <Input
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    placeholder="Category"
                    className="bg-neutral-800 border-neutral-700"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Service</label>
                <Select
                  value={form.serviceId}
                  onValueChange={(value) => setForm({ ...form, serviceId: value })}
                >
                  <SelectTrigger className="bg-neutral-800 border-neutral-700">
                    <SelectValue placeholder="Select service" />
                  </SelectTrigger>
                  <SelectContent className="bg-neutral-800 border-neutral-700">
                    {serviceOptions.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <AdminImageUploadField
                  label="Image URL"
                  value={form.src}
                  onChange={(value) => setForm((current) => ({ ...current, src: value }))}
                  placeholder="Image URL or /images/gallery/..."
                  description={
                    form.isVideo
                      ? "Paste a video URL for video entries, or upload an image when this project is not a video."
                      : "Upload to Cloudinary or paste an existing image URL."
                  }
                  folder="projects"
                  showPreview={!form.isVideo}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Alt Text</label>
                <Input
                  value={form.alt}
                  onChange={(e) => setForm({ ...form, alt: e.target.value })}
                  placeholder="Alt text for accessibility"
                  className="bg-neutral-800 border-neutral-700"
                />
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="isVideo"
                  checked={form.isVideo}
                  onChange={(e) => setForm({ ...form, isVideo: e.target.checked })}
                  className="w-4 h-4"
                />
                <label htmlFor="isVideo" className="text-sm font-medium">Is Video</label>
              </div>
              <div className="border-t border-white/10 pt-4 mt-2">
                <h4 className="font-medium mb-3">Additional Details (for completed projects)</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Client</label>
                    <Input
                      value={form.client}
                      onChange={(e) => setForm({ ...form, client: e.target.value })}
                      placeholder="Client name"
                      className="bg-neutral-800 border-neutral-700"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Period</label>
                    <Input
                      value={form.period}
                      onChange={(e) => setForm({ ...form, period: e.target.value })}
                      placeholder="2023-2024"
                      className="bg-neutral-800 border-neutral-700"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Scope</label>
                    <Input
                      value={form.scope}
                      onChange={(e) => setForm({ ...form, scope: e.target.value })}
                      placeholder="Project scope"
                      className="bg-neutral-800 border-neutral-700"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Quantity</label>
                    <Input
                      value={form.quantity}
                      onChange={(e) => setForm({ ...form, quantity: e.target.value })}
                      placeholder="e.g., ~500 MT"
                      className="bg-neutral-800 border-neutral-700"
                    />
                  </div>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setOpen(false)} className="bg-transparent">Cancel</Button>
              <Button onClick={() => showConfirm(
                editingId ? "Update Project?" : "Create Project?",
                editingId ? "Save changes to this project?" : "Create this new project?",
                handleSubmit,
                editingId ? "Update" : "Create"
              )}>{editingId ? "Update" : "Create"}</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="mb-6 flex items-center justify-between gap-4">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-neutral-500" />
          <Input
            placeholder="Search projects..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 bg-neutral-900 border-neutral-800"
          />
        </div>
        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="w-40 bg-neutral-900 border-neutral-800">
            <SelectValue placeholder="Filter by type" />
          </SelectTrigger>
          <SelectContent className="bg-neutral-800 border-neutral-700">
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="ongoing">Ongoing</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-xl border border-white/10 bg-white/5">
        <CardHeader className="border-b border-white/10">
          <CardTitle>All Projects</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {loading ? (
            <div className="p-8 text-center text-neutral-400">Loading...</div>
          ) : filteredProjects.length === 0 ? (
            <div className="p-8 text-center text-neutral-400">No projects found</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="border-white/5 hover:bg-transparent">
                  <TableHead className="text-neutral-400">Title</TableHead>
                  <TableHead className="text-neutral-400">Type</TableHead>
                  <TableHead className="text-neutral-400">Location</TableHead>
                  <TableHead className="text-neutral-400">Category</TableHead>
                  <TableHead className="text-right text-neutral-400">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProjects.map((project) => (
                  <TableRow key={project.id} className="border-white/5">
                    <TableCell className="font-medium">{project.title}</TableCell>
                    <TableCell>
                      <Badge variant={project.type === "ongoing" ? "default" : "secondary"}>
                        {project.type}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <MapPin className="size-3" /> {project.location}
                      </div>
                    </TableCell>
                    <TableCell>{project.category}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="ghost" size="icon" onClick={() => handleEdit(project)}>
                          <Pencil className="size-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDelete(project.id)}>
                          <Trash2 className="size-4 text-red-400" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
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