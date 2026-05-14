"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";

interface AdminPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  totalItems: number;
  itemsPerPage: number;
}

export function AdminPagination({
  currentPage,
  totalPages,
  onPageChange,
  totalItems,
  itemsPerPage,
}: AdminPaginationProps) {
  if (totalPages <= 1) return null;

  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-4 py-4 border-t border-white/10">
      <div className="text-sm text-neutral-400">
        Showing <span className="text-white font-medium">{startItem}</span> to{" "}
        <span className="text-white font-medium">{endItem}</span> of{" "}
        <span className="text-white font-medium">{totalItems}</span> items
      </div>
      
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="icon"
          className="size-8 bg-transparent border-neutral-800 hover:bg-white/5 disabled:opacity-30"
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
        >
          <ChevronsLeft className="size-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="size-8 bg-transparent border-neutral-800 hover:bg-white/5 disabled:opacity-30"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <ChevronLeft className="size-4" />
        </Button>
        
        <div className="flex items-center gap-1 mx-2 text-sm font-medium">
          <span className="text-white">{currentPage}</span>
          <span className="text-neutral-500">/</span>
          <span className="text-neutral-500">{totalPages}</span>
        </div>

        <Button
          variant="outline"
          size="icon"
          className="size-8 bg-transparent border-neutral-800 hover:bg-white/5 disabled:opacity-30"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <ChevronRight className="size-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="size-8 bg-transparent border-neutral-800 hover:bg-white/5 disabled:opacity-30"
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
        >
          <ChevronsRight className="size-4" />
        </Button>
      </div>
    </div>
  );
}
