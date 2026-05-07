"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { addAdminDoc, deleteAdminDoc, getAdminDocs, updateAdminDoc } from "@/app/actions/admin-db";
import { AdminImageUploadField } from "@/components/admin-image-upload-field";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Pencil, Trash2, Search, MapPin, Tag, Power } from "lucide-react";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";

interface LaunchSpecification {
  label: string;
  value: string;
}

interface NewLaunch {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  image: string;
  type: string;
  region: string;
  features: string[];
  specifications: LaunchSpecification[];
  status: "active" | "inactive";
  createdAt: number;
  updatedAt: number;
}

type NewLaunchForm = Omit<NewLaunch, "id" | "createdAt" | "updatedAt" | "features" | "specifications"> & {
  features: string;
  specifications: LaunchSpecification[];
};

const initialForm: NewLaunchForm = {
  title: "",
  description: "",
  longDescription: "",
  image: "",
  type: "Latest Launch",
  region: "",
  features: "",
  specifications: [{ label: "", value: "" }],
  status: "active",
};

export default function NewLaunchesAdminPage() {
  const [launches, setLaunches] = useState<NewLaunch[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
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
    fetchLaunches();
  }, []);

  const fetchLaunches = async () => {
    try {
      const data = (await getAdminDocs("new-launches", "createdAt", "desc")) as NewLaunch[];
      setLaunches(data);
    } catch (error) {
      console.error("Error fetching new launches:", error);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setForm(initialForm);
    setEditingId(null);
  };

  const handleSubmit = async () => {
    try {
      const launchData = {
        title: form.title.trim(),
        description: form.description.trim(),
        longDescription: form.longDescription.trim(),
        image: form.image.trim(),
        type: form.type.trim(),
        region: form.region.trim(),
        features: form.features
          .split(",")
          .map((feature) => feature.trim())
          .filter(Boolean),
        specifications: form.specifications
          .map((specification) => ({
            label: specification.label.trim(),
            value: specification.value.trim(),
          }))
          .filter((specification) => specification.label && specification.value),
        status: form.status,
        updatedAt: Date.now(),
        ...(editingId ? {} : { createdAt: Date.now() }),
      };

      if (editingId) {
        await updateAdminDoc("new-launches", editingId, launchData);
      } else {
        await addAdminDoc("new-launches", launchData);
      }

      setOpen(false);
      resetForm();
      fetchLaunches();
    } catch (error) {
      console.error("Error saving new launch:", error);
    }
  };

  const handleEdit = (launch: NewLaunch) => {
    setForm({
      title: launch.title,
      description: launch.description,
      longDescription: launch.longDescription || "",
      image: launch.image,
      type: launch.type,
      region: launch.region,
      features: Array.isArray(launch.features) ? launch.features.join(", ") : "",
      specifications: launch.specifications?.length
        ? launch.specifications.map((specification) => ({
            label: specification.label,
            value: specification.value,
          }))
        : [{ label: "", value: "" }],
      status: launch.status || "active",
    });
    setEditingId(launch.id);
    setOpen(true);
  };

  const handleDelete = (id: string) => {
    showConfirm(
      "Delete New Launch",
      "This action cannot be undone.",
      async () => {
        try {
          await deleteAdminDoc("new-launches", id);
          fetchLaunches();
        } catch (error) {
          console.error("Error deleting new launch:", error);
        }
      },
      "Delete",
      true
    );
  };

  const toggleStatus = async (launch: NewLaunch) => {
    try {
      const nextStatus = launch.status === "active" ? "inactive" : "active";
      await updateAdminDoc("new-launches", launch.id, {
        status: nextStatus,
        updatedAt: Date.now(),
      });
      fetchLaunches();
    } catch (error) {
      console.error("Error updating launch status:", error);
    }
  };

  const updateSpecification = (index: number, field: keyof LaunchSpecification, value: string) => {
    setForm((current) => ({
      ...current,
      specifications: current.specifications.map((specification, specIndex) =>
        specIndex === index ? { ...specification, [field]: value } : specification
      ),
    }));
  };

  const addSpecification = () => {
    setForm((current) => ({
      ...current,
      specifications: [...current.specifications, { label: "", value: "" }],
    }));
  };

  const removeSpecification = (index: number) => {
    setForm((current) => ({
      ...current,
      specifications:
        current.specifications.length > 1
          ? current.specifications.filter((_, specIndex) => specIndex !== index)
          : [{ label: "", value: "" }],
    }));
  };

  const filteredLaunches = launches.filter(
    (launch) =>
      launch.title.toLowerCase().includes(search.toLowerCase()) ||
      launch.type.toLowerCase().includes(search.toLowerCase()) ||
      launch.region.toLowerCase().includes(search.toLowerCase()) ||
      launch.status.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <div className="mb-8 flex items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">New Launches</h1>
          <p className="mt-1 text-neutral-400">Manage portfolio launch cards and detail pages</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm}>
              <Plus className="mr-2 size-4" />
              New Launch
            </Button>
          </DialogTrigger>
          <DialogContent className="max-h-[90vh] max-w-6xl overflow-y-auto border-neutral-800 bg-neutral-900 text-white">
            <DialogHeader>
              <DialogTitle>{editingId ? "Edit New Launch" : "Create New Launch"}</DialogTitle>
            </DialogHeader>

            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <label className="text-sm font-medium">Title</label>
                <Input
                  value={form.title}
                  onChange={(event) => setForm({ ...form, title: event.target.value })}
                  placeholder="e.g. Multi-Span Composite Bridge"
                  className="border-neutral-700 bg-neutral-800"
                />
              </div>

              <div className="grid gap-2">
                <label className="text-sm font-medium">Description</label>
                <Textarea
                  value={form.description}
                  onChange={(event) => setForm({ ...form, description: event.target.value })}
                  placeholder="Short summary for cards and previews"
                  className="min-h-25 border-neutral-700 bg-neutral-800"
                />
              </div>

              <div className="grid gap-2">
                <label className="text-sm font-medium">Long Description</label>
                <Textarea
                  value={form.longDescription}
                  onChange={(event) => setForm({ ...form, longDescription: event.target.value })}
                  placeholder="Detailed description for the detail page"
                  className="min-h-35 border-neutral-700 bg-neutral-800"
                />
              </div>

              <div className="grid gap-2">
                <AdminImageUploadField
                  label="Launch Image"
                  value={form.image}
                  onChange={(value) => setForm((current) => ({ ...current, image: value }))}
                  placeholder="https://..."
                  folder="new-launches"
                />
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="grid gap-2">
                  <label className="text-sm font-medium">Launch Type</label>
                  <Input
                    value={form.type}
                    onChange={(event) => setForm({ ...form, type: event.target.value })}
                    placeholder="Latest Launch"
                    className="border-neutral-700 bg-neutral-800"
                  />
                </div>

                <div className="grid gap-2">
                  <label className="text-sm font-medium">Region</label>
                  <Input
                    value={form.region}
                    onChange={(event) => setForm({ ...form, region: event.target.value })}
                    placeholder="Assam Region"
                    className="border-neutral-700 bg-neutral-800"
                  />
                </div>
              </div>

              <div className="grid gap-2">
                <label className="text-sm font-medium">Features</label>
                <Textarea
                  value={form.features}
                  onChange={(event) => setForm({ ...form, features: event.target.value })}
                  placeholder="High Load Capacity, Earthquake Resistant Design, Rapid Construction Time"
                  className="min-h-30 border-neutral-700 bg-neutral-800"
                />
                <p className="text-xs text-neutral-500">Separate features with commas. Each item becomes a feature bullet on the public detail page.</p>
              </div>

              <div className="grid gap-3">
                <div className="flex items-center justify-between gap-3">
                  <label className="text-sm font-medium">Specifications</label>
                  <Button type="button" variant="outline" size="sm" onClick={addSpecification} className="bg-transparent">
                    <Plus className="mr-2 size-4" />
                    Add Specification
                  </Button>
                </div>

                <div className="space-y-3">
                  {form.specifications.map((specification, index) => (
                    <div key={index} className="grid gap-3 rounded-lg border border-white/10 bg-white/5 p-3 md:grid-cols-[1fr_1fr_auto] md:items-end">
                      <div className="grid gap-2">
                        <label className="text-xs uppercase tracking-wider text-neutral-400">Label</label>
                        <Input
                          value={specification.label}
                          onChange={(event) => updateSpecification(index, "label", event.target.value)}
                          placeholder="Span Length"
                          className="border-neutral-700 bg-neutral-800"
                        />
                      </div>
                      <div className="grid gap-2">
                        <label className="text-xs uppercase tracking-wider text-neutral-400">Value</label>
                        <Input
                          value={specification.value}
                          onChange={(event) => updateSpecification(index, "value", event.target.value)}
                          placeholder="Up to 80m per span"
                          className="border-neutral-700 bg-neutral-800"
                        />
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeSpecification(index)}
                        className="text-red-400 hover:bg-red-500/10 hover:text-red-300"
                        title="Remove specification"
                      >
                        <Trash2 className="size-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid gap-2 md:max-w-xs">
                <label className="text-sm font-medium">Status</label>
                <Select value={form.status} onValueChange={(value: "active" | "inactive") => setForm({ ...form, status: value })}>
                  <SelectTrigger className="border-neutral-700 bg-neutral-800">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="border-neutral-700 bg-neutral-800 text-white">
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setOpen(false)} className="bg-transparent">
                Cancel
              </Button>
              <Button onClick={() => showConfirm(
                editingId ? "Update New Launch?" : "Create New Launch?",
                editingId ? "Save changes to this new launch?" : "Create this new launch?",
                handleSubmit,
                editingId ? "Update" : "Create"
              )}>{editingId ? "Update" : "Create"}</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="mb-6 flex items-center justify-between gap-4">
        <div className="relative max-w-md flex-1">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-neutral-500" />
          <Input
            placeholder="Search launches..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="border-neutral-800 bg-neutral-900 pl-10"
          />
        </div>
        <div className="text-sm text-neutral-400">
          {filteredLaunches.length} launch{filteredLaunches.length !== 1 ? "es" : ""}
        </div>
      </div>

      <div className="rounded-xl border border-white/10 bg-white/5">
        <CardHeader className="border-b border-white/10">
          <CardTitle>All New Launches</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {loading ? (
            <div className="p-8 text-center text-neutral-400">Loading...</div>
          ) : filteredLaunches.length === 0 ? (
            <div className="p-8 text-center text-neutral-400">No launches found</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="border-white/5 hover:bg-transparent">
                  <TableHead className="text-neutral-400">Title</TableHead>
                  <TableHead className="text-neutral-400">Type</TableHead>
                  <TableHead className="text-neutral-400">Region</TableHead>
                  <TableHead className="text-neutral-400">Status</TableHead>
                  <TableHead className="text-neutral-400">Updated</TableHead>
                  <TableHead className="text-right text-neutral-400">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLaunches.map((launch) => (
                  <TableRow key={launch.id} className="border-white/5">
                    <TableCell>
                      <div className="flex items-start gap-3">
                        <div className="h-14 w-20 overflow-hidden rounded-md border border-white/10 bg-neutral-900">
                          {launch.image ? (
                            <div className="relative h-full w-full">
                              <Image
                                src={launch.image}
                                alt={launch.title}
                                fill
                                sizes="80px"
                                className="object-cover"
                              />
                            </div>
                          ) : null}
                        </div>
                        <div>
                          <div className="font-medium text-white">{launch.title}</div>
                          <div className="mt-1 line-clamp-2 text-sm text-neutral-400">{launch.description}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-neutral-300">
                        <Tag className="size-3 text-neutral-500" />
                        {launch.type}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-neutral-300">
                        <MapPin className="size-3 text-neutral-500" />
                        {launch.region}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={launch.status === "active" ? "default" : "outline"} className={launch.status === "active" ? "bg-green-500" : ""}>
                        {launch.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-neutral-400">
                      {launch.updatedAt ? new Date(launch.updatedAt).toLocaleDateString() : "-"}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => showConfirm(
                            launch.status === "active" ? "Deactivate Launch?" : "Activate Launch?",
                            `Set "${launch.title}" to ${launch.status === "active" ? "inactive" : "active"}?`,
                            () => toggleStatus(launch)
                          )}
                          title={launch.status === "active" ? "Deactivate" : "Activate"}
                        >
                          <Power className="size-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleEdit(launch)}>
                          <Pencil className="size-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDelete(launch.id)}>
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