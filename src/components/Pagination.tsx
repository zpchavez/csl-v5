import { useCallback } from "react";
import {
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  Pagination as PaginationUI,
} from "@/components/ui/pagination";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
};

const totalPageLinksToShow = 10;

export function Pagination({ currentPage, totalPages }: PaginationProps) {
  const startingPage = Math.max(currentPage - 5, 1);
  const endingPage = Math.min(
    startingPage + totalPageLinksToShow - 1,
    totalPages,
  );
  const pathname = window.location.pathname;
  const queryString = window.location.search;

  const pageRangeArray = [];
  for (let i = startingPage; i <= endingPage; i++) {
    pageRangeArray.push(i);
  }

  const getHrefForPage = useCallback(
    (page: number) => {
      const queryObject = new URLSearchParams(queryString);
      queryObject.set("page", page.toString());
      return `${pathname}?${queryObject.toString()}`;
    },
    [pathname, queryString],
  );

  if (totalPages <= 1) {
    return null;
  }

  return (
    <PaginationUI>
      <PaginationContent>
        {currentPage > 1 && (
          <PaginationItem>
            <PaginationPrevious href={getHrefForPage(currentPage - 1)}>
              Previous
            </PaginationPrevious>
          </PaginationItem>
        )}
        {pageRangeArray.map((page) => (
          <PaginationItem key={page}>
            {page === currentPage ? (
              <PaginationLink
                className="bg-amber-200 cursor-default"
                aria-current="page"
              >
                {page}
              </PaginationLink>
            ) : (
              <PaginationLink href={getHrefForPage(page)}>
                {page}
              </PaginationLink>
            )}
          </PaginationItem>
        ))}
        {totalPages - endingPage > 0 && <PaginationEllipsis />}
        {currentPage < totalPages && (
          <PaginationItem>
            <PaginationNext href={getHrefForPage(currentPage + 1)}>
              Next
            </PaginationNext>
          </PaginationItem>
        )}
      </PaginationContent>
    </PaginationUI>
  );
}
