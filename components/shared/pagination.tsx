"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

/**
 * Renders a paginated navigation UI with animated transitions and dynamic page range display.
 *
 * Displays previous and next buttons, numeric page buttons, and ellipses for skipped ranges. The current page is highlighted, and navigation buttons are disabled when at the start or end of the page range. Clicking a page or navigation button triggers the {@link onPageChange} callback with the selected page number.
 *
 * @param currentPage - The currently active page number.
 * @param totalPages - The total number of available pages.
 * @param onPageChange - Callback invoked with the new page number when a page change occurs.
 */
export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages = []
    const maxPagesToShow = 5

    if (totalPages <= maxPagesToShow) {
      // If total pages is less than max to show, display all pages
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      // Always include first page
      pages.push(1)

      // Calculate start and end of page range
      let start = Math.max(2, currentPage - 1)
      let end = Math.min(totalPages - 1, currentPage + 1)

      // Adjust if at the beginning
      if (currentPage <= 3) {
        end = Math.min(4, totalPages - 1)
      }

      // Adjust if at the end
      if (currentPage >= totalPages - 2) {
        start = Math.max(2, totalPages - 3)
      }

      // Add ellipsis if needed at the beginning
      if (start > 2) {
        pages.push("...")
      }

      // Add middle pages
      for (let i = start; i <= end; i++) {
        pages.push(i)
      }

      // Add ellipsis if needed at the end
      if (end < totalPages - 1) {
        pages.push("...")
      }

      // Always include last page
      if (totalPages > 1) {
        pages.push(totalPages)
      }
    }

    return pages
  }

  const pageNumbers = getPageNumbers()

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex items-center justify-center gap-1 mt-8"
    >
      <Button
        variant="outline"
        size="icon"
        className="h-8 w-8 bg-black/70 border-gray-800 text-white"
        onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      <div className="flex items-center gap-1">
        {pageNumbers.map((page, index) =>
          typeof page === "number" ? (
            <motion.div key={index} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant={currentPage === page ? "default" : "outline"}
                size="sm"
                className={`h-8 w-8 p-0 ${
                  currentPage === page
                    ? "bg-white text-black hover:bg-white/90"
                    : "bg-black/70 border-gray-800 text-white"
                }`}
                onClick={() => onPageChange(page)}
              >
                {page}
              </Button>
            </motion.div>
          ) : (
            <span key={index} className="text-gray-500 px-1">
              {page}
            </span>
          ),
        )}
      </div>

      <Button
        variant="outline"
        size="icon"
        className="h-8 w-8 bg-black/70 border-gray-800 text-white"
        onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </motion.div>
  )
}
