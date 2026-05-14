"use client";

import { useState, useEffect } from "react";
import { getAdminDocs, addAdminDoc, updateAdminDoc, deleteAdminDoc } from "@/app/actions/admin-db";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Pencil, Trash2, Search } from "lucide-react";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";

interface Faq {
  id: string;
  question: string;
  answer: string;
  order: number;
  status: "active" | "inactive";
  createdAt: number;
  updatedAt: number;
}

const initialForm: Omit<Faq, "id" | "createdAt" | "updatedAt"> = {
  question: "",
  answer: "",
  order: 0,
  status: "active",
};

import { AdminPagination } from "@/components/admin-pagination";

const ITEMS_PER_PAGE = 10;

export default function FaqsPage() {
  const [faqs, setFaqs] = useState<Faq[]>([]);
  const [loading, setLoading] = useState(true);
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
    fetchFaqs();
  }, []);

  const fetchFaqs = async () => {
    try {
      const data = await getAdminDocs("faqs", "order", "asc") as Faq[];
      setFaqs(data);
    } catch (error) {
      console.error("Error fetching faqs:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    try {
      const faqData = {
        ...form,
        updatedAt: Date.now(),
        ...(editingId ? {} : { createdAt: Date.now() }),
      };

      if (editingId) {
        await updateAdminDoc("faqs", editingId, faqData);
      } else {
        await addAdminDoc("faqs", faqData);
      }

      setOpen(false);
      setEditingId(null);
      setForm(initialForm);
      fetchFaqs();
    } catch (error) {
      console.error("Error saving faq:", error);
    }
  };

  const handleEdit = (faq: Faq) => {
    setForm({
      question: faq.question,
      answer: faq.answer,
      order: faq.order,
      status: faq.status,
    });
    setEditingId(faq.id);
    setOpen(true);
  };

  const handleDelete = (id: string) => {
    showConfirm(
      "Delete FAQ",
      "This action cannot be undone.",
      async () => {
        try {
          await deleteAdminDoc("faqs", id);
          fetchFaqs();
        } catch (error) {
          console.error("Error deleting faq:", error);
        }
      },
      "Delete",
      true
    );
  };

  const toggleStatus = async (faq: Faq) => {
    try {
      const newStatus = faq.status === "active" ? "inactive" : "active";
      await updateAdminDoc("faqs", faq.id, {
        status: newStatus,
        updatedAt: Date.now(),
      });
      fetchFaqs();
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const filteredFaqs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(search.toLowerCase()) ||
      faq.answer.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredFaqs.length / ITEMS_PER_PAGE);
  const paginatedFaqs = filteredFaqs.slice(
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
          <h1 className="text-3xl font-bold">FAQs</h1>
          <p className="mt-1 text-neutral-400">Manage frequently asked questions</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => { setForm(initialForm); setEditingId(null); }}>
              <Plus className="mr-2 size-4" />
              Add FAQ
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto bg-neutral-900 text-white border-neutral-800">
            <DialogHeader>
              <DialogTitle>{editingId ? "Edit FAQ" : "Create FAQ"}</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <label className="text-sm font-medium">Question</label>
                <Input
                  value={form.question}
                  onChange={(e) => setForm({ ...form, question: e.target.value })}
                  placeholder="Enter the question..."
                  className="bg-neutral-800 border-neutral-700"
                />
              </div>
              <div className="grid gap-2">
                <label className="text-sm font-medium">Answer</label>
                <Textarea
                  value={form.answer}
                  onChange={(e) => setForm({ ...form, answer: e.target.value })}
                  placeholder="Enter the answer..."
                  rows={4}
                  className="min-h-[100px] bg-neutral-800 border-neutral-700"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <label className="text-sm font-medium">Display Order</label>
                  <Input
                    type="number"
                    value={form.order}
                    onChange={(e) => setForm({ ...form, order: parseInt(e.target.value) || 0 })}
                    placeholder="0"
                    className="bg-neutral-800 border-neutral-700"
                  />
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
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setOpen(false)} className="bg-transparent">Cancel</Button>
              <Button onClick={() => showConfirm(
                editingId ? "Update FAQ?" : "Create FAQ?",
                editingId ? "Save changes to this FAQ?" : "Create this new FAQ?",
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
            placeholder="Search FAQs..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 bg-neutral-900 border-neutral-800"
          />
        </div>
        <div className="text-sm text-neutral-400">
          {filteredFaqs.length} FAQ{filteredFaqs.length !== 1 ? "s" : ""}
        </div>
      </div>

      <div className="rounded-xl border border-white/10 bg-white/5">
        <CardHeader className="border-b border-white/10">
          <CardTitle>All FAQs</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {loading ? (
            <div className="p-8 text-center text-neutral-400">Loading...</div>
          ) : filteredFaqs.length === 0 ? (
            <div className="p-8 text-center text-neutral-400">No FAQs found</div>
          ) : (
            <>
              <Table>
                <TableHeader>
                  <TableRow className="border-white/5 hover:bg-transparent">
                    <TableHead className="text-neutral-400 w-16">Order</TableHead>
                    <TableHead className="text-neutral-400">Question</TableHead>
                    <TableHead className="text-neutral-400">Answer</TableHead>
                    <TableHead className="text-neutral-400">Status</TableHead>
                    <TableHead className="text-right text-neutral-400">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedFaqs.map((faq) => (
                    <TableRow key={faq.id} className="border-white/5">
                      <TableCell className="text-neutral-400">{faq.order}</TableCell>
                      <TableCell className="font-medium max-w-md truncate">{faq.question}</TableCell>
                      <TableCell className="max-w-xs truncate">{faq.answer}</TableCell>
                      <TableCell>
                        <Badge
                          variant={faq.status === "active" ? "default" : "outline"}
                          className={faq.status === "active" ? "bg-green-500" : ""}
                        >
                          {faq.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => showConfirm(
                              faq.status === "active" ? "Deactivate FAQ?" : "Activate FAQ?",
                              `${faq.status === "active" ? "Hide" : "Show"} "${faq.question.slice(0, 30)}..."?`,
                              () => toggleStatus(faq)
                            )}
                            title={faq.status === "active" ? "Deactivate" : "Activate"}
                          >
                            {faq.status === "active" ? (
                              <span className="text-xs text-red-400">Hide</span>
                            ) : (
                              <span className="text-xs text-green-400">Show</span>
                            )}
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => handleEdit(faq)}>
                            <Pencil className="size-4" />
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => handleDelete(faq.id)}>
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
                totalItems={filteredFaqs.length}
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