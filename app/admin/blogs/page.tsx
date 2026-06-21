"use client";

import { useState, useEffect, useRef } from "react";
import { getAdminDocs, addAdminDoc, updateAdminDoc, deleteAdminDoc } from "@/app/actions/admin-db";
import { useCloudinaryTracker } from "@/hooks/use-cloudinary-tracker";
import { AdminImageUploadField } from "@/components/admin-image-upload-field";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Pencil, Trash2, Eye, EyeOff, Search } from "lucide-react";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";

interface Blog {
  id: string;
  title: string;
  content: string;
  author: string;
  featuredImage: string;
  tags: string | string[];
  publishDate: string;
  status: "draft" | "published";
  createdAt: number;
  updatedAt: number;
}

const initialForm: Omit<Blog, "id" | "createdAt" | "updatedAt"> = {
  title: "",
  content: "",
  author: "",
  featuredImage: "",
  tags: "",
  publishDate: "",
  status: "published",
};

import { AdminPagination } from "@/components/admin-pagination";

const ITEMS_PER_PAGE = 10;

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(initialForm);
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
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const data = await getAdminDocs("blogs", "createdAt", "desc") as Blog[];
      setBlogs(data);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    try {
      const blogData = {
        ...form,
        tags: (form.tags as string).split(",").map((t) => t.trim()).filter(Boolean),
        updatedAt: Date.now(),
        ...(editingId
          ? {}
          : { createdAt: Date.now() }),
      };

      isSavedRef.current = true;
      if (editingId) {
        await updateAdminDoc("blogs", editingId, blogData);
      } else {
        await addAdminDoc("blogs", blogData);
      }

      await handleSave(extractUrls(blogData), originalUrls);

      setOpen(false);
      setEditingId(null);
      setForm(initialForm);
      setOriginalUrls([]);
      fetchBlogs();
    } catch (error) {
      console.error("Error saving blog:", error);
    }
  };

  const handleEdit = (blog: Blog) => {
    setForm({
      title: blog.title,
      content: blog.content,
      author: blog.author,
      featuredImage: blog.featuredImage,
      tags: Array.isArray(blog.tags) ? blog.tags.join(", ") : blog.tags,
      publishDate: blog.publishDate,
      status: blog.status,
    });
    setEditingId(blog.id);
    setOriginalUrls(extractUrls(blog));
    isSavedRef.current = false;
    setOpen(true);
  };

  const handleDelete = (id: string) => {
    const blogToDelete = blogs.find((b) => b.id === id);
    showConfirm(
      "Delete Blog Post",
      "This action cannot be undone.",
      async () => {
        try {
          await deleteAdminDoc("blogs", id);
          if (blogToDelete) {
            await handleDeleteDoc(blogToDelete);
          }
          fetchBlogs();
        } catch (error) {
          console.error("Error deleting blog:", error);
        }
      },
      "Delete",
      true
    );
  };

  const toggleStatus = async (blog: Blog) => {
    try {
      const newStatus = blog.status === "published" ? "draft" : "published";
      await updateAdminDoc("blogs", blog.id, {
        status: newStatus,
        updatedAt: Date.now(),
      });
      fetchBlogs();
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const filteredBlogs = blogs.filter(
    (blog) =>
      blog.title.toLowerCase().includes(search.toLowerCase()) ||
      blog.author.toLowerCase().includes(search.toLowerCase()) ||
      blog.tags?.toString().toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredBlogs.length / ITEMS_PER_PAGE);
  const paginatedBlogs = filteredBlogs.slice(
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
          <h1 className="text-3xl font-bold">Blog Posts</h1>
          <p className="mt-1 text-neutral-400">Manage your blog articles</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => { setForm(initialForm); setEditingId(null); setOriginalUrls([]); isSavedRef.current = false; }}>
              <Plus className="mr-2 size-4" />
              New Blog
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto bg-neutral-900 text-white border-neutral-800">
            <DialogHeader>
              <DialogTitle>{editingId ? "Edit Blog Post" : "Create Blog Post"}</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <label className="text-sm font-medium">Title</label>
                <Input
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="Enter blog title"
                  className="bg-neutral-800 border-neutral-700"
                />
              </div>
              <div className="grid gap-2">
                <label className="text-sm font-medium">Content</label>
                <Textarea
                  value={form.content}
                  onChange={(e) => setForm({ ...form, content: e.target.value })}
                  placeholder="Write your blog content..."
                  className="min-h-[200px] bg-neutral-800 border-neutral-700"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <label className="text-sm font-medium">Author</label>
                  <Input
                    value={form.author}
                    onChange={(e) => setForm({ ...form, author: e.target.value })}
                    placeholder="Author name"
                    className="bg-neutral-800 border-neutral-700"
                  />
                </div>
                <div className="grid gap-2">
                  <AdminImageUploadField
                    label="Featured Image URL"
                    value={form.featuredImage}
                    onChange={(value) =>
                      setForm((current) => ({ ...current, featuredImage: value }))
                    }
                    placeholder="https://..."
                    folder="blogs"
                    onUploadSuccess={trackUpload}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <label className="text-sm font-medium">Tags (comma separated)</label>
                  <Input
                    value={form.tags}
                    onChange={(e) => setForm({ ...form, tags: e.target.value })}
                    placeholder="bridge, construction, engineering"
                    className="bg-neutral-800 border-neutral-700"
                  />
                </div>
                <div className="grid gap-2">
                  <label className="text-sm font-medium">Publish Date</label>
                  <Input
                    type="date"
                    value={form.publishDate}
                    onChange={(e) => setForm({ ...form, publishDate: e.target.value })}
                    className="bg-neutral-800 border-neutral-700"
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <label className="text-sm font-medium">Status</label>
                <Select
                  value={form.status}
                  onValueChange={(value: "draft" | "published") => setForm({ ...form, status: value })}
                >
                  <SelectTrigger className="bg-neutral-800 border-neutral-700">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-neutral-800 border-neutral-700">
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setOpen(false)} className="bg-transparent">Cancel</Button>
              <Button onClick={() => showConfirm(
                editingId ? "Update Blog Post?" : "Create Blog Post?",
                editingId ? "Save changes to this blog post?" : "Create this new blog post?",
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
            placeholder="Search blogs..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 bg-neutral-900 border-neutral-800"
          />
        </div>
        <div className="text-sm text-neutral-400">
          {filteredBlogs.length} post{filteredBlogs.length !== 1 ? "s" : ""}
        </div>
      </div>

      <div className="rounded-xl border border-white/10 bg-white/5">
        <CardHeader className="border-b border-white/10">
          <CardTitle>All Blog Posts</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {loading ? (
            <div className="p-8 text-center text-neutral-400">Loading...</div>
          ) : filteredBlogs.length === 0 ? (
            <div className="p-8 text-center text-neutral-400">No blog posts found</div>
          ) : (
            <>
              <Table>
                <TableHeader>
                  <TableRow className="border-white/5 hover:bg-transparent">
                    <TableHead className="text-neutral-400">Title</TableHead>
                    <TableHead className="text-neutral-400">Author</TableHead>
                    <TableHead className="text-neutral-400">Tags</TableHead>
                    <TableHead className="text-neutral-400">Status</TableHead>
                    <TableHead className="text-neutral-400">Date</TableHead>
                    <TableHead className="text-right text-neutral-400">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedBlogs.map((blog) => (
                    <TableRow key={blog.id} className="border-white/5">
                      <TableCell className="font-medium max-w-[200px] md:max-w-xs truncate">{blog.title}</TableCell>
                      <TableCell>{blog.author}</TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {Array.isArray(blog.tags)
                            ? blog.tags.slice(0, 2).map((tag, i) => (
                                <Badge key={i} variant="secondary" className="text-xs">
                                  {tag}
                                </Badge>
                              ))
                            : typeof blog.tags === "string"
                              ? blog.tags.split(",").slice(0, 2).map((tag, i) => (
                                  <Badge key={i} variant="secondary" className="text-xs">
                                    {tag.trim()}
                                  </Badge>
                                ))
                              : null}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={blog.status === "published" ? "default" : "outline"}
                          className={blog.status === "published" ? "bg-green-500" : ""}
                        >
                          {blog.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-neutral-400">
                        {blog.publishDate || (blog.createdAt ? new Date(blog.createdAt).toLocaleDateString() : "-")}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => showConfirm(
                              blog.status === "published" ? "Unpublish Post?" : "Publish Post?",
                              `Set "${blog.title}" to ${blog.status === "published" ? "draft" : "published"}?`,
                              () => toggleStatus(blog)
                            )}
                            title={blog.status === "published" ? "Unpublish" : "Publish"}
                          >
                            {blog.status === "published" ? (
                              <EyeOff className="size-4" />
                            ) : (
                              <Eye className="size-4" />
                            )}
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => handleEdit(blog)}>
                            <Pencil className="size-4" />
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => handleDelete(blog.id)}>
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
                totalItems={filteredBlogs.length}
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