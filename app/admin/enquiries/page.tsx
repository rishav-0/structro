"use client";

import { useState, useEffect } from "react";
import { getAdminDocs, updateAdminDoc, deleteAdminDoc } from "@/app/actions/admin-db";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Phone, Mail, Trash2, Eye, Users, Building2, Briefcase } from "lucide-react";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";

type EnquiryType = "lead" | "vendor" | "contractor";

interface Enquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  service: string;
  message: string;
  status: "new" | "contacted" | "resolved";
  followUpNotes: string;
  type?: EnquiryType;
  additionalFields?: Record<string, string>;
  createdAt: number;
  updatedAt: number;
}

const statusConfig = {
  new: { label: "New", color: "bg-blue-500" },
  contacted: { label: "Contacted", color: "bg-yellow-500" },
  resolved: { label: "Resolved", color: "bg-green-500" },
};

export default function EnquiriesPage() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<EnquiryType>("lead");
  const [open, setOpen] = useState(false);
  const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(null);
  const [followUpNotes, setFollowUpNotes] = useState("");

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
    fetchEnquiries();
  }, []);

  const fetchEnquiries = async () => {
    try {
      const data = await getAdminDocs("enquiries", "createdAt", "desc") as Enquiry[];
      setEnquiries(data);
    } catch (error) {
      console.error("Error fetching enquiries:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleView = (enquiry: Enquiry) => {
    setSelectedEnquiry(enquiry);
    setFollowUpNotes(enquiry.followUpNotes || "");
    setOpen(true);
  };

  const handleUpdateStatus = async (status: "new" | "contacted" | "resolved") => {
    if (!selectedEnquiry) return;
    try {
      await updateAdminDoc("enquiries", selectedEnquiry.id, {
        status,
        followUpNotes,
        updatedAt: Date.now(),
      });
      setOpen(false);
      fetchEnquiries();
    } catch (error) {
      console.error("Error updating enquiry:", error);
    }
  };

  const handleDelete = (id: string) => {
    showConfirm(
      "Delete Enquiry",
      "This action cannot be undone.",
      async () => {
        try {
          await deleteAdminDoc("enquiries", id);
          fetchEnquiries();
        } catch (error) {
          console.error("Error deleting enquiry:", error);
        }
      },
      "Delete",
      true
    );
  };

  const filteredEnquiries = enquiries
    .filter((enquiry) => (enquiry.type || "lead") === typeFilter)
    .filter(
      (enquiry) =>
        enquiry.name.toLowerCase().includes(search.toLowerCase()) ||
        enquiry.email.toLowerCase().includes(search.toLowerCase()) ||
        enquiry.company.toLowerCase().includes(search.toLowerCase()) ||
        enquiry.service.toLowerCase().includes(search.toLowerCase())
    )
    .filter((enquiry) => statusFilter === "all" || enquiry.status === statusFilter);

  const typeFilteredEnquiries = enquiries.filter((e) => (e.type || "lead") === typeFilter);
  const stats = {
    total: typeFilteredEnquiries.length,
    new: typeFilteredEnquiries.filter((e) => e.status === "new").length,
    contacted: typeFilteredEnquiries.filter((e) => e.status === "contacted").length,
    resolved: typeFilteredEnquiries.filter((e) => e.status === "resolved").length,
  };

  const typeStats = {
    leads: enquiries.filter((e) => (e.type || "lead") === "lead").length,
    vendors: enquiries.filter((e) => e.type === "vendor").length,
    contractors: enquiries.filter((e) => e.type === "contractor").length,
  };

  return (
    <>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Enquiries</h1>
          <p className="mt-1 text-neutral-400">Manage incoming enquiries from website</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant={typeFilter === "lead" ? "default" : "outline"}
            onClick={() => setTypeFilter("lead")}
            className={typeFilter === "lead" ? "bg-primary" : ""}
          >
            <Users className="w-4 h-4 mr-2" />
            Leads ({typeStats.leads})
          </Button>
          <Button
            variant={typeFilter === "vendor" ? "default" : "outline"}
            onClick={() => setTypeFilter("vendor")}
            className={typeFilter === "vendor" ? "bg-primary" : ""}
          >
            <Building2 className="w-4 h-4 mr-2" />
            Vendors ({typeStats.vendors})
          </Button>
          <Button
            variant={typeFilter === "contractor" ? "default" : "outline"}
            onClick={() => setTypeFilter("contractor")}
            className={typeFilter === "contractor" ? "bg-primary" : ""}
          >
            <Briefcase className="w-4 h-4 mr-2" />
            Contractors ({typeStats.contractors})
          </Button>
        </div>
      </div>

      <div className="mb-6 grid grid-cols-4 gap-4">
        <div className="rounded-xl border border-white/10 bg-white/5 p-4">
          <div className="text-2xl font-bold">{stats.total}</div>
          <div className="text-sm text-neutral-400">Total Enquiries</div>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/5 p-4">
          <div className="text-2xl font-bold text-blue-400">{stats.new}</div>
          <div className="text-sm text-neutral-400">New</div>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/5 p-4">
          <div className="text-2xl font-bold text-yellow-400">{stats.contacted}</div>
          <div className="text-sm text-neutral-400">Contacted</div>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/5 p-4">
          <div className="text-2xl font-bold text-green-400">{stats.resolved}</div>
          <div className="text-sm text-neutral-400">Resolved</div>
        </div>
      </div>

      <div className="mb-6 flex items-center justify-between gap-4">
        <div className="flex gap-4">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-neutral-500" />
            <Input
              placeholder="Search enquiries..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 bg-neutral-900 border-neutral-800"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[150px] bg-neutral-900 border-neutral-800">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent className="bg-neutral-800 border-neutral-700">
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="new">New</SelectItem>
              <SelectItem value="contacted">Contacted</SelectItem>
              <SelectItem value="resolved">Resolved</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="text-sm text-neutral-400">
          {filteredEnquiries.length} enquiry{filteredEnquiries.length !== 1 ? "s" : ""}
        </div>
      </div>

      <div className="rounded-xl border border-white/10 bg-white/5">
        <CardHeader className="border-b border-white/10">
          <CardTitle>All Enquiries</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {loading ? (
            <div className="p-8 text-center text-neutral-400">Loading...</div>
          ) : filteredEnquiries.length === 0 ? (
            <div className="p-8 text-center text-neutral-400">No enquiries found</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="border-white/5 hover:bg-transparent">
                  <TableHead className="text-neutral-400">Name</TableHead>
                  <TableHead className="text-neutral-400">Contact</TableHead>
                  <TableHead className="text-neutral-400">Service</TableHead>
                  <TableHead className="text-neutral-400">Message</TableHead>
                  <TableHead className="text-neutral-400">Status</TableHead>
                  <TableHead className="text-neutral-400">Date</TableHead>
                  <TableHead className="text-right text-neutral-400">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredEnquiries.map((enquiry) => (
                  <TableRow key={enquiry.id} className="border-white/5">
                    <TableCell>
                      <div className="font-medium">{enquiry.name}</div>
                      <div className="text-xs text-neutral-400">{enquiry.company || "-"}</div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2 text-xs">
                        <Mail className="size-3 text-neutral-400" />
                        {enquiry.email}
                      </div>
                      <div className="flex items-center gap-2 text-xs">
                        <Phone className="size-3 text-neutral-400" />
                        {enquiry.phone}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{enquiry.service}</Badge>
                    </TableCell>
                    <TableCell className="max-w-[200px]">
                      <p className="truncate text-sm text-neutral-400">{enquiry.message}</p>
                    </TableCell>
                    <TableCell>
                      <Badge className={statusConfig[enquiry.status]?.color}>
                        {statusConfig[enquiry.status]?.label || enquiry.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-neutral-400">
                      {enquiry.createdAt ? new Date(enquiry.createdAt).toLocaleDateString() : "-"}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="ghost" size="icon" onClick={() => handleView(enquiry)}>
                          <Eye className="size-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDelete(enquiry.id)}>
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

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-5xl bg-neutral-900 text-white border-neutral-800 max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <div className="flex items-center gap-3">
              <DialogTitle>Enquiry Details</DialogTitle>
              {selectedEnquiry?.type && selectedEnquiry.type !== "lead" && (
                <Badge variant="outline" className="text-xs">
                  {selectedEnquiry.type === "vendor" ? "Vendor" : "Contractor"}
                </Badge>
              )}
            </div>
          </DialogHeader>
          {selectedEnquiry && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-neutral-400">Name</label>
                  <p className="font-medium">{selectedEnquiry.name}</p>
                </div>
                <div>
                  <label className="text-xs text-neutral-400">Company</label>
                  <p className="text-neutral-400">{selectedEnquiry.company || "-"}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-neutral-400">Email</label>
                  <p className="text-neutral-400">{selectedEnquiry.email}</p>
                </div>
                <div>
                  <label className="text-xs text-neutral-400">Phone</label>
                  <p className="text-neutral-400">{selectedEnquiry.phone}</p>
                </div>
              </div>
              <div>
                <label className="text-xs text-neutral-400">Service</label>
                <p>{selectedEnquiry.service}</p>
              </div>
              {(selectedEnquiry.type === "vendor" || selectedEnquiry.type === "contractor") && selectedEnquiry.additionalFields && (
                <div className="border-t border-neutral-700 pt-4 mt-2">
                  <label className="text-sm font-medium text-neutral-300 mb-2 block">
                    {selectedEnquiry.type === "vendor" ? "Vendor Details" : "Contractor Details"}
                  </label>
                  <div className="grid grid-cols-2 gap-4 bg-neutral-800/50 p-4 rounded-lg">
                    {selectedEnquiry.type === "vendor" && (
                      <>
                        {selectedEnquiry.additionalFields.address && (
                          <div>
                            <label className="text-xs text-neutral-400">Address</label>
                            <p className="text-sm">{selectedEnquiry.additionalFields.address}</p>
                          </div>
                        )}
                        {selectedEnquiry.additionalFields.gstNumber && (
                          <div>
                            <label className="text-xs text-neutral-400">GST Number</label>
                            <p className="text-sm">{selectedEnquiry.additionalFields.gstNumber}</p>
                          </div>
                        )}
                        {selectedEnquiry.additionalFields.productCategories && (
                          <div className="col-span-2">
                            <label className="text-xs text-neutral-400">Product Categories</label>
                            <p className="text-sm">{selectedEnquiry.additionalFields.productCategories}</p>
                          </div>
                        )}
                      </>
                    )}
                    {selectedEnquiry.type === "contractor" && (
                      <>
                        {selectedEnquiry.additionalFields.yearsInBusiness && (
                          <div>
                            <label className="text-xs text-neutral-400">Years in Business</label>
                            <p className="text-sm">{selectedEnquiry.additionalFields.yearsInBusiness}</p>
                          </div>
                        )}
                        {selectedEnquiry.additionalFields.teamSize && (
                          <div>
                            <label className="text-xs text-neutral-400">Team Size</label>
                            <p className="text-sm">{selectedEnquiry.additionalFields.teamSize}</p>
                          </div>
                        )}
                        {selectedEnquiry.additionalFields.specialization && (
                          <div className="col-span-2">
                            <label className="text-xs text-neutral-400">Specialization</label>
                            <p className="text-sm">{selectedEnquiry.additionalFields.specialization}</p>
                          </div>
                        )}
                        {selectedEnquiry.additionalFields.pastProjects && (
                          <div className="col-span-2">
                            <label className="text-xs text-neutral-400">Past Projects</label>
                            <p className="text-sm">{selectedEnquiry.additionalFields.pastProjects}</p>
                          </div>
                        )}
                      </>
                    )}
                    {selectedEnquiry.additionalFields.description && (
                      <div className="col-span-2">
                        <label className="text-xs text-neutral-400">Description</label>
                        <p className="text-sm">{selectedEnquiry.additionalFields.description}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
              <div>
                <label className="text-xs text-neutral-400">Message</label>
                <p className="rounded bg-neutral-800 p-3 text-neutral-300">{selectedEnquiry.message || "-"}</p>
              </div>
              <div>
                <label className="text-sm font-medium">Follow-up Notes</label>
                <Textarea
                  value={followUpNotes}
                  onChange={(e) => setFollowUpNotes(e.target.value)}
                  placeholder="Add notes about follow-up..."
                  className="min-h-[100px] bg-neutral-800 border-neutral-700"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Status</label>
                <div className="mt-2 flex gap-2">
                  <Button
                    size="sm"
                    variant={selectedEnquiry.status === "new" ? "default" : "outline"}
                    onClick={() => showConfirm("Mark as New", "Update the status of this enquiry to New?", () => handleUpdateStatus("new"), "Mark as New")}
                    className={selectedEnquiry.status === "new" ? "bg-blue-500" : ""}
                  >
                    New
                  </Button>
                  <Button
                    size="sm"
                    variant={selectedEnquiry.status === "contacted" ? "default" : "outline"}
                    onClick={() => showConfirm("Mark as Contacted", "Update the status of this enquiry to Contacted?", () => handleUpdateStatus("contacted"), "Mark as Contacted")}
                    className={selectedEnquiry.status === "contacted" ? "bg-yellow-500" : ""}
                  >
                    Contacted
                  </Button>
                  <Button
                    size="sm"
                    variant={selectedEnquiry.status === "resolved" ? "default" : "outline"}
                    onClick={() => showConfirm("Mark as Resolved", "Update the status of this enquiry to Resolved?", () => handleUpdateStatus("resolved"), "Mark as Resolved")}
                    className={selectedEnquiry.status === "resolved" ? "bg-green-500" : ""}
                  >
                    Resolved
                  </Button>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)} className="bg-transparent">Close</Button>
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