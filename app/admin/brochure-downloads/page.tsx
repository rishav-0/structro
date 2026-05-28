"use client";

import { useState, useEffect } from "react";
import { getAdminDocs, deleteAdminDoc } from "@/app/actions/admin-db";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Trash2, Phone, Mail } from "lucide-react";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { AdminPagination } from "@/components/admin-pagination";

interface BrochureDownload {
  id: string;
  name: string;
  phone: string;
  email: string;
  interest: string;
  address: string;
  createdAt: number;
}

const ITEMS_PER_PAGE = 10;

export default function BrochureDownloadsPage() {
  const [downloads, setDownloads] = useState<BrochureDownload[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

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
    fetchDownloads();
  }, []);

  const fetchDownloads = async () => {
    try {
      const data = await getAdminDocs("brochure-downloads", "createdAt", "desc") as BrochureDownload[];
      setDownloads(data);
    } catch (error) {
      console.error("Error fetching brochure downloads:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (id: string) => {
    showConfirm(
      "Delete Download Request",
      "This action cannot be undone.",
      async () => {
        try {
          await deleteAdminDoc("brochure-downloads", id);
          fetchDownloads();
        } catch (error) {
          console.error("Error deleting download request:", error);
        }
      },
      "Delete",
      true
    );
  };

  const filteredDownloads = downloads.filter(
    (d) =>
      d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.email.toLowerCase().includes(search.toLowerCase()) ||
      d.phone.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredDownloads.length / ITEMS_PER_PAGE);
  const paginatedDownloads = filteredDownloads.slice(
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
          <h1 className="text-3xl font-bold">Brochure Downloads</h1>
          <p className="mt-1 text-neutral-400">User requests to download company brochures</p>
        </div>
      </div>

      <div className="mb-6 flex items-center justify-between gap-4">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-neutral-500" />
          <Input
            placeholder="Search by name, email, or phone..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 bg-neutral-900 border-neutral-800"
          />
        </div>
        <div className="text-sm text-neutral-400">
          {filteredDownloads.length} request{filteredDownloads.length !== 1 ? "s" : ""}
        </div>
      </div>

      <div className="rounded-xl border border-white/10 bg-white/5">
        <CardHeader className="border-b border-white/10">
          <CardTitle>All Download Requests</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {loading ? (
            <div className="p-8 text-center text-neutral-400">Loading...</div>
          ) : filteredDownloads.length === 0 ? (
            <div className="p-8 text-center text-neutral-400">No download requests yet</div>
          ) : (
            <>
              <Table>
                <TableHeader>
                  <TableRow className="border-white/5 hover:bg-transparent">
                    <TableHead className="text-neutral-400">Name</TableHead>
                    <TableHead className="text-neutral-400">Contact</TableHead>
                    <TableHead className="text-neutral-400">Interest</TableHead>
                    <TableHead className="text-neutral-400">Address</TableHead>
                    <TableHead className="text-neutral-400">Date</TableHead>
                    <TableHead className="text-right text-neutral-400">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedDownloads.map((download) => (
                    <TableRow key={download.id} className="border-white/5">
                      <TableCell className="font-medium">{download.name}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2 text-xs">
                          <Mail className="size-3 text-neutral-400" />
                          {download.email}
                        </div>
                        <div className="flex items-center gap-2 text-xs">
                          <Phone className="size-3 text-neutral-400" />
                          {download.phone}
                        </div>
                      </TableCell>
                      <TableCell className="max-w-[200px]">
                        <p className="truncate text-sm text-neutral-400">{download.interest || "-"}</p>
                      </TableCell>
                      <TableCell className="max-w-[200px]">
                        <p className="truncate text-sm text-neutral-400">{download.address || "-"}</p>
                      </TableCell>
                      <TableCell className="text-neutral-400">
                        {download.createdAt ? new Date(download.createdAt).toLocaleDateString() : "-"}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button variant="ghost" size="icon" onClick={() => handleDelete(download.id)}>
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
                totalItems={filteredDownloads.length}
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
