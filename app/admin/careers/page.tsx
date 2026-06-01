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
import { Plus, Pencil, Trash2, Search, MapPin, Briefcase, ArrowUpRight } from "lucide-react";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { AdminPagination } from "@/components/admin-pagination";

interface Career {
  id: string;
  title: string;
  description: string;
  requirements: string;
  location: string;
  jobType: "full-time" | "part-time" | "contract";
  applyLink: string;
  status: "open" | "closed";
  createdAt: number;
  updatedAt: number;
}

interface CareerApplication {
  id: string;
  name: string;
  email: string;
  phone: string;
  position: string;
  experience: string;
  resumeUrl: string;
  message: string;
  status: "new" | "reviewed" | "archived";
  createdAt: number;
  updatedAt?: number;
}

const initialForm: Omit<Career, "id" | "createdAt" | "updatedAt"> = {
  title: "",
  description: "",
  requirements: "",
  location: "",
  jobType: "full-time",
  applyLink: "",
  status: "open",
};

const ITEMS_PER_PAGE = 10;

export default function CareersPage() {
  const [careers, setCareers] = useState<Career[]>([]);
  const [applications, setApplications] = useState<CareerApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [appsLoading, setAppsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
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
    fetchCareers();
    fetchApplications();
  }, []);

  const fetchCareers = async () => {
    try {
      const data = await getAdminDocs("careers", "createdAt") as Career[];
      setCareers(data);
    } catch (error) {
      console.error("Error fetching careers:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchApplications = async () => {
    try {
      const data = await getAdminDocs("career-applications", "createdAt") as CareerApplication[];
      setApplications(data);
    } catch (error) {
      console.error("Error fetching applications:", error);
    } finally {
      setAppsLoading(false);
    }
  };

  const handleSubmit = async () => {
    try {
      const careerData = {
        ...form,
        updatedAt: Date.now(),
        ...(editingId ? {} : { createdAt: Date.now() }),
      };

      if (editingId) {
        await updateAdminDoc("careers", editingId, careerData);
      } else {
        await addAdminDoc("careers", careerData);
      }

      setOpen(false);
      setEditingId(null);
      setForm(initialForm);
      fetchCareers();
    } catch (error) {
      console.error("Error saving career:", error);
    }
  };

  const handleEdit = (career: Career) => {
    setForm({
      title: career.title,
      description: career.description,
      requirements: career.requirements,
      location: career.location,
      jobType: career.jobType,
      applyLink: career.applyLink,
      status: career.status,
    });
    setEditingId(career.id);
    setOpen(true);
  };

  const handleDelete = (id: string) => {
    showConfirm(
      "Delete Job Opening",
      "This action cannot be undone.",
      async () => {
        try {
          await deleteAdminDoc("careers", id);
          fetchCareers();
        } catch (error) {
          console.error("Error deleting career:", error);
        }
      },
      "Delete",
      true
    );
  };

  const handleAppStatusChange = async (app: CareerApplication, newStatus: "new" | "reviewed" | "archived") => {
    try {
      await updateAdminDoc("career-applications", app.id, {
        status: newStatus,
        updatedAt: Date.now()
      });
      fetchApplications();
    } catch (error) {
      console.error("Error updating application status:", error);
    }
  };

  const handleAppDelete = (id: string) => {
    showConfirm(
      "Delete Candidate Application",
      "Are you sure you want to delete this candidate application record?",
      async () => {
        try {
          await deleteAdminDoc("career-applications", id);
          fetchApplications();
        } catch (error) {
          console.error("Error deleting application:", error);
        }
      },
      "Delete",
      true
    );
  };

  const toggleStatus = async (career: Career) => {
    try {
      const newStatus = career.status === "open" ? "closed" : "open";
      await updateAdminDoc("careers", career.id, {
        status: newStatus,
        updatedAt: Date.now(),
      });
      fetchCareers();
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const filteredCareers = careers.filter(
    (career) =>
      career.title.toLowerCase().includes(search.toLowerCase()) ||
      career.location.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredCareers.length / ITEMS_PER_PAGE);
  const paginatedCareers = filteredCareers.slice(
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
          <h1 className="text-3xl font-bold">Recruitment Portal</h1>
          <p className="mt-1 text-neutral-400">Manage job openings and review candidate applications</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => { setForm(initialForm); setEditingId(null); }}>
              <Plus className="mr-2 size-4" />
              Add Job
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto bg-neutral-900 text-white border-neutral-800">
            <DialogHeader>
              <DialogTitle>{editingId ? "Edit Job Opening" : "Create Job Opening"}</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <label className="text-sm font-medium">Job Title</label>
                <Input
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="e.g., Senior Engineer"
                  className="bg-neutral-800 border-neutral-700"
                />
              </div>
              <div className="grid gap-2">
                <label className="text-sm font-medium">Description</label>
                <Textarea
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder="Job description..."
                  className="min-h-[100px] bg-neutral-800 border-neutral-700"
                />
              </div>
              <div className="grid gap-2">
                <label className="text-sm font-medium">Requirements</label>
                <Textarea
                  value={form.requirements}
                  onChange={(e) => setForm({ ...form, requirements: e.target.value })}
                  placeholder="Key requirements..."
                  className="min-h-[100px] bg-neutral-800 border-neutral-700"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <label className="text-sm font-medium">Location</label>
                  <Input
                    value={form.location}
                    onChange={(e) => setForm({ ...form, location: e.target.value })}
                    placeholder="Guwahati, Assam"
                    className="bg-neutral-800 border-neutral-700"
                  />
                </div>
                <div className="grid gap-2">
                  <label className="text-sm font-medium">Job Type</label>
                  <Select
                    value={form.jobType}
                    onValueChange={(value: "full-time" | "part-time" | "contract") => setForm({ ...form, jobType: value })}
                  >
                    <SelectTrigger className="bg-neutral-800 border-neutral-700">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-neutral-800 border-neutral-700">
                      <SelectItem value="full-time">Full-time</SelectItem>
                      <SelectItem value="part-time">Part-time</SelectItem>
                      <SelectItem value="contract">Contract</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <label className="text-sm font-medium">Application Link</label>
                  <Input
                    value={form.applyLink}
                    onChange={(e) => setForm({ ...form, applyLink: e.target.value })}
                    placeholder="https://..."
                    className="bg-neutral-800 border-neutral-700"
                  />
                </div>
                <div className="grid gap-2">
                  <label className="text-sm font-medium">Status</label>
                  <Select
                    value={form.status}
                    onValueChange={(value: "open" | "closed") => setForm({ ...form, status: value })}
                  >
                    <SelectTrigger className="bg-neutral-800 border-neutral-700">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-neutral-800 border-neutral-700">
                      <SelectItem value="open">Open</SelectItem>
                      <SelectItem value="closed">Closed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setOpen(false)} className="bg-transparent">Cancel</Button>
              <Button onClick={() => showConfirm(
                editingId ? "Update Job Opening?" : "Create Job Opening?",
                editingId ? "Save changes to this job opening?" : "Create this new job opening?",
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
            placeholder="Search jobs..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 bg-neutral-900 border-neutral-800"
          />
        </div>
        <div className="text-sm text-neutral-400">
          {filteredCareers.length} opening{filteredCareers.length !== 1 ? "s" : ""}
        </div>
      </div>

      {/* Job Openings Card */}
      <div className="rounded-xl border border-white/10 bg-white/5 mb-12">
        <CardHeader className="border-b border-white/10">
          <CardTitle>All Job Openings</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {loading ? (
            <div className="p-8 text-center text-neutral-400">Loading...</div>
          ) : filteredCareers.length === 0 ? (
            <div className="p-8 text-center text-neutral-400">No job openings found</div>
          ) : (
            <>
              <Table>
                <TableHeader>
                  <TableRow className="border-white/5 hover:bg-transparent">
                    <TableHead className="text-neutral-400">Title</TableHead>
                    <TableHead className="text-neutral-400">Location</TableHead>
                    <TableHead className="text-neutral-400">Type</TableHead>
                    <TableHead className="text-neutral-400">Status</TableHead>
                    <TableHead className="text-neutral-400">Posted</TableHead>
                    <TableHead className="text-right text-neutral-400">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedCareers.map((career) => (
                    <TableRow key={career.id} className="border-white/5">
                      <TableCell className="font-medium max-w-[200px] truncate">{career.title}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1 text-neutral-400">
                          <MapPin className="size-3" />
                          {career.location}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Briefcase className="size-3 text-neutral-400" />
                          {career.jobType}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={career.status === "open" ? "default" : "outline"}
                          className={career.status === "open" ? "bg-green-500 text-white border-none" : ""}
                        >
                          {career.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-neutral-400">
                        {career.createdAt ? new Date(career.createdAt).toLocaleDateString() : "-"}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => showConfirm(
                              career.status === "open" ? "Close Position?" : "Open Position?",
                              `Set "${career.title}" to ${career.status === "open" ? "closed" : "open"}?`,
                              () => toggleStatus(career)
                            )}
                            title={career.status === "open" ? "Close" : "Open"}
                          >
                            {career.status === "open" ? (
                              <span className="text-xs text-red-400">Close</span>
                            ) : (
                              <span className="text-xs text-green-400">Open</span>
                            )}
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => handleEdit(career)}>
                            <Pencil className="size-4" />
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => handleDelete(career.id)}>
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
                totalItems={filteredCareers.length}
                itemsPerPage={ITEMS_PER_PAGE}
              />
            </>
          )}
        </CardContent>
      </div>

      {/* Submitted Candidate Applications Card */}
      <div className="rounded-xl border border-white/10 bg-white/5">
        <CardHeader className="border-b border-white/10 flex flex-row items-center justify-between">
          <CardTitle>Submitted Candidate Applications</CardTitle>
          <Badge className="bg-primary text-primary-foreground">{applications.length} total</Badge>
        </CardHeader>
        <CardContent className="p-0">
          {appsLoading ? (
            <div className="p-8 text-center text-neutral-400">Loading applications...</div>
          ) : applications.length === 0 ? (
            <div className="p-8 text-center text-neutral-400">No applications received yet</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="border-white/5 hover:bg-transparent">
                  <TableHead className="text-neutral-400">Candidate Name</TableHead>
                  <TableHead className="text-neutral-400">Contact Info</TableHead>
                  <TableHead className="text-neutral-400">Position Applied</TableHead>
                  <TableHead className="text-neutral-400">Experience</TableHead>
                  <TableHead className="text-neutral-400">Resume Link</TableHead>
                  <TableHead className="text-neutral-400">Cover Note</TableHead>
                  <TableHead className="text-neutral-400">Status</TableHead>
                  <TableHead className="text-right text-neutral-400">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {applications.map((app) => (
                  <TableRow key={app.id} className="border-white/5">
                    <TableCell className="font-semibold text-white">{app.name}</TableCell>
                    <TableCell className="text-sm">
                      <div className="text-white">{app.phone}</div>
                      <div className="text-neutral-400 text-xs">{app.email}</div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary" className="bg-neutral-800 text-neutral-200">
                        {app.position}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-neutral-300">{app.experience}</TableCell>
                    <TableCell>
                      {app.resumeUrl ? (
                        <a 
                          href={app.resumeUrl} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="inline-flex items-center text-xs text-primary hover:underline font-bold"
                        >
                          View Resume
                          <ArrowUpRight className="ml-1 size-3" />
                        </a>
                      ) : (
                        <span className="text-neutral-500 text-xs">No Link</span>
                      )}
                    </TableCell>
                    <TableCell className="text-sm text-neutral-400 max-w-[200px] truncate" title={app.message}>
                      {app.message || "-"}
                    </TableCell>
                    <TableCell>
                      <Select
                        value={app.status || "new"}
                        onValueChange={(val: "new" | "reviewed" | "archived") => handleAppStatusChange(app, val)}
                      >
                        <SelectTrigger className="w-[120px] bg-neutral-800 border-neutral-700 h-8 text-xs">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-neutral-800 border-neutral-700">
                          <SelectItem value="new">New</SelectItem>
                          <SelectItem value="reviewed">Reviewed</SelectItem>
                          <SelectItem value="archived">Archived</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon" onClick={() => handleAppDelete(app.id)}>
                        <Trash2 className="size-4 text-red-400" />
                      </Button>
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