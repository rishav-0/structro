"use client";

import { useState, useEffect } from "react";
import { getAdminDocs, addAdminDoc, updateAdminDoc, deleteAdminDoc } from "@/app/actions/admin-db";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Pencil, Trash2, Search, Star, Phone, Mail, MapPin } from "lucide-react";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";

interface Vendor {
  id: string;
  companyName: string;
  contactPerson: string;
  phone: string;
  email: string;
  address: string;
  category: "materials" | "equipment" | "services";
  gstNumber: string;
  bankDetails: string;
  rating: number;
  notes: string;
  status: "active" | "inactive";
  createdAt: number;
  updatedAt: number;
}

const initialForm: Omit<Vendor, "id" | "createdAt" | "updatedAt"> = {
  companyName: "",
  contactPerson: "",
  phone: "",
  email: "",
  address: "",
  category: "materials",
  gstNumber: "",
  bankDetails: "",
  rating: 3,
  notes: "",
  status: "active",
};

export default function VendorsPage() {
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
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
    fetchVendors();
  }, []);

  const fetchVendors = async () => {
    try {
      const data = await getAdminDocs("vendors", "companyName", "asc") as Vendor[];
      setVendors(data);
    } catch (error) {
      console.error("Error fetching vendors:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    try {
      const vendorData = {
        ...form,
        updatedAt: Date.now(),
        ...(editingId ? {} : { createdAt: Date.now() }),
      };

      if (editingId) {
        await updateAdminDoc("vendors", editingId, vendorData);
      } else {
        await addAdminDoc("vendors", vendorData);
      }

      setOpen(false);
      setEditingId(null);
      setForm(initialForm);
      fetchVendors();
    } catch (error) {
      console.error("Error saving vendor:", error);
    }
  };

  const handleEdit = (vendor: Vendor) => {
    setForm({
      companyName: vendor.companyName,
      contactPerson: vendor.contactPerson,
      phone: vendor.phone,
      email: vendor.email,
      address: vendor.address,
      category: vendor.category,
      gstNumber: vendor.gstNumber,
      bankDetails: vendor.bankDetails,
      rating: vendor.rating,
      notes: vendor.notes,
      status: vendor.status,
    });
    setEditingId(vendor.id);
    setOpen(true);
  };

  const handleDelete = (id: string) => {
    showConfirm(
      "Delete Vendor",
      "This action cannot be undone.",
      async () => {
        try {
          await deleteAdminDoc("vendors", id);
          fetchVendors();
        } catch (error) {
          console.error("Error deleting vendor:", error);
        }
      },
      "Delete",
      true
    );
  };

  const toggleStatus = async (vendor: Vendor) => {
    try {
      const newStatus = vendor.status === "active" ? "inactive" : "active";
      await updateAdminDoc("vendors", vendor.id, {
        status: newStatus,
        updatedAt: Date.now(),
      });
      fetchVendors();
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const filteredVendors = vendors
    .filter(
      (vendor) =>
        vendor.companyName.toLowerCase().includes(search.toLowerCase()) ||
        vendor.contactPerson.toLowerCase().includes(search.toLowerCase()) ||
        vendor.category.toLowerCase().includes(search.toLowerCase())
    )
    .filter((vendor) => categoryFilter === "all" || vendor.category === categoryFilter);

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`size-3 ${star <= rating ? "fill-yellow-400 text-yellow-400" : "text-neutral-600"}`}
          />
        ))}
      </div>
    );
  };

  return (
    <>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Vendors</h1>
          <p className="mt-1 text-neutral-400">Manage supplier/vendor contacts</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => { setForm(initialForm); setEditingId(null); }}>
              <Plus className="mr-2 size-4" />
              Add Vendor
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto bg-neutral-900 text-white border-neutral-800">
            <DialogHeader>
              <DialogTitle>{editingId ? "Edit Vendor" : "Add New Vendor"}</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <label className="text-sm font-medium">Company Name</label>
                <Input
                  value={form.companyName}
                  onChange={(e) => setForm({ ...form, companyName: e.target.value })}
                  placeholder="Company name"
                  className="bg-neutral-800 border-neutral-700"
                />
              </div>
              <div className="grid gap-2">
                <label className="text-sm font-medium">Contact Person</label>
                <Input
                  value={form.contactPerson}
                  onChange={(e) => setForm({ ...form, contactPerson: e.target.value })}
                  placeholder="Full name"
                  className="bg-neutral-800 border-neutral-700"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <label className="text-sm font-medium">Phone</label>
                  <Input
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="+91 9876543210"
                    className="bg-neutral-800 border-neutral-700"
                  />
                </div>
                <div className="grid gap-2">
                  <label className="text-sm font-medium">Email</label>
                  <Input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="email@company.com"
                    className="bg-neutral-800 border-neutral-700"
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <label className="text-sm font-medium">Address</label>
                <Textarea
                  value={form.address}
                  onChange={(e) => setForm({ ...form, address: e.target.value })}
                  placeholder="Full address"
                  className="min-h-[80px] bg-neutral-800 border-neutral-700"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <label className="text-sm font-medium">Category</label>
                  <Select
                    value={form.category}
                    onValueChange={(value: "materials" | "equipment" | "services") => setForm({ ...form, category: value })}
                  >
                    <SelectTrigger className="bg-neutral-800 border-neutral-700">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-neutral-800 border-neutral-700">
                      <SelectItem value="materials">Materials</SelectItem>
                      <SelectItem value="equipment">Equipment</SelectItem>
                      <SelectItem value="services">Services</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <label className="text-sm font-medium">GST Number</label>
                  <Input
                    value={form.gstNumber}
                    onChange={(e) => setForm({ ...form, gstNumber: e.target.value })}
                    placeholder="18AABCU9603R1ZM"
                    className="bg-neutral-800 border-neutral-700"
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <label className="text-sm font-medium">Bank Details</label>
                <Textarea
                  value={form.bankDetails}
                  onChange={(e) => setForm({ ...form, bankDetails: e.target.value })}
                  placeholder="Bank name, Account number, IFSC code"
                  className="min-h-[80px] bg-neutral-800 border-neutral-700"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <label className="text-sm font-medium">Rating</label>
                  <Select
                    value={form.rating.toString()}
                    onValueChange={(value) => setForm({ ...form, rating: parseInt(value) })}
                  >
                    <SelectTrigger className="bg-neutral-800 border-neutral-700">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-neutral-800 border-neutral-700">
                      <SelectItem value="1">1 Star</SelectItem>
                      <SelectItem value="2">2 Stars</SelectItem>
                      <SelectItem value="3">3 Stars</SelectItem>
                      <SelectItem value="4">4 Stars</SelectItem>
                      <SelectItem value="5">5 Stars</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <label className="text-sm font-medium">Status</label>
                  <Select
                    value={form.status}
                    onValueChange={(value: "active" | "inactive") => setForm({ ...form, status: value })}
                  >
                    <SelectTrigger className="bg-neutral-800 border-neutral-700">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-neutral-800 border-neutral-700">
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid gap-2">
                <label className="text-sm font-medium">Notes</label>
                <Textarea
                  value={form.notes}
                  onChange={(e) => setForm({ ...form, notes: e.target.value })}
                  placeholder="Additional notes..."
                  className="min-h-[80px] bg-neutral-800 border-neutral-700"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setOpen(false)} className="bg-transparent">Cancel</Button>
              <Button onClick={() => showConfirm(
                editingId ? "Update Vendor?" : "Add Vendor?",
                editingId ? "Save changes to this vendor?" : "Add this new vendor to the database?",
                handleSubmit,
                editingId ? "Update" : "Add Vendor"
              )}>{editingId ? "Update" : "Add Vendor"}</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="mb-6 flex items-center justify-between gap-4">
        <div className="flex gap-4">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-neutral-500" />
            <Input
              placeholder="Search vendors..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 bg-neutral-900 border-neutral-800"
            />
          </div>
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-[150px] bg-neutral-900 border-neutral-800">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent className="bg-neutral-800 border-neutral-700">
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="materials">Materials</SelectItem>
              <SelectItem value="equipment">Equipment</SelectItem>
              <SelectItem value="services">Services</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="text-sm text-neutral-400">
          {filteredVendors.length} vendor{filteredVendors.length !== 1 ? "s" : ""}
        </div>
      </div>

      <div className="rounded-xl border border-white/10 bg-white/5">
        <CardHeader className="border-b border-white/10">
          <CardTitle>All Vendors</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {loading ? (
            <div className="p-8 text-center text-neutral-400">Loading...</div>
          ) : filteredVendors.length === 0 ? (
            <div className="p-8 text-center text-neutral-400">No vendors found</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="border-white/5 hover:bg-transparent">
                  <TableHead className="text-neutral-400">Company</TableHead>
                  <TableHead className="text-neutral-400">Contact</TableHead>
                  <TableHead className="text-neutral-400">Category</TableHead>
                  <TableHead className="text-neutral-400">GST</TableHead>
                  <TableHead className="text-neutral-400">Rating</TableHead>
                  <TableHead className="text-neutral-400">Status</TableHead>
                  <TableHead className="text-right text-neutral-400">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredVendors.map((vendor) => (
                  <TableRow key={vendor.id} className="border-white/5">
                    <TableCell className="font-medium">{vendor.companyName}</TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="text-sm">{vendor.contactPerson}</div>
                        <div className="flex items-center gap-2 text-xs text-neutral-400">
                          <Phone className="size-3" />
                          {vendor.phone}
                        </div>
                        <div className="flex items-center gap-2 text-xs text-neutral-400">
                          <Mail className="size-3" />
                          {vendor.email}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="capitalize">
                        {vendor.category}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-mono text-xs text-neutral-400">
                      {vendor.gstNumber || "-"}
                    </TableCell>
                    <TableCell>{renderStars(vendor.rating)}</TableCell>
                    <TableCell>
                      <Badge
                        variant={vendor.status === "active" ? "default" : "outline"}
                        className={vendor.status === "active" ? "bg-green-500" : ""}
                      >
                        {vendor.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => showConfirm(
                            vendor.status === "active" ? "Deactivate Vendor?" : "Activate Vendor?",
                            `Set "${vendor.companyName}" to ${vendor.status === "active" ? "inactive" : "active"}?`,
                            () => toggleStatus(vendor)
                          )}
                          title={vendor.status === "active" ? "Deactivate" : "Activate"}
                        >
                          {vendor.status === "active" ? (
                            <span className="text-xs text-red-400">Off</span>
                          ) : (
                            <span className="text-xs text-green-400">On</span>
                          )}
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleEdit(vendor)}>
                          <Pencil className="size-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDelete(vendor.id)}>
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