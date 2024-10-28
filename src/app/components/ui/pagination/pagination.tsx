// components/Pagination.tsx

"use client";

import React from 'react';
import styles from './pagination.module.scss';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const handlePrevPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePageChange = (page: number) => {
    onPageChange(page);
  };

  const renderPageNumbers = () => {
    const pages = [];

    // Always show the first page
    if (totalPages > 0) {
      pages.push(
        <button
          key={1}
          onClick={() => handlePageChange(1)}
          className={`${styles.pageNumber} ${currentPage === 1 ? styles.pageNumberActive : ''}`}
        >
          1
        </button>
      );
    }

    // Show ellipsis if necessary
    if (totalPages >= 4) {
      if (currentPage > 2) {
        pages.push(
          <button key="start-dots" className={styles.pageNumber} onClick={() => handlePageChange(currentPage - 2)}>
            ...
          </button>
        );
      }

      // Determine which pages to show
      const startPage = Math.max(2, currentPage - 1);
      const endPage = Math.min(totalPages - 1, currentPage + 1);

      for (let i = startPage; i <= endPage; i++) {
        pages.push(
          <button
            key={i}
            onClick={() => handlePageChange(i)}
            className={`${styles.pageNumber} ${currentPage === i ? styles.pageNumberActive : ''}`}
          >
            {i}
          </button>
        );
      }

      if (currentPage < totalPages - 1) {
        pages.push(
          <button key="end-dots" className={styles.pageNumber} onClick={() => handlePageChange(currentPage + 2)}>
            ...
          </button>
        );
      }
    }

    // Always show the last page if necessary
    if (totalPages > 1) {
      pages.push(
        <button
          key={totalPages}
          onClick={() => handlePageChange(totalPages)}
          className={`${styles.pageNumber} ${currentPage === totalPages ? styles.pageNumberActive : ''}`}
        >
          {totalPages}
        </button>
      );
    }

    return pages;
  };

  return (
    <div className={styles.pagination}>
      <button
        onClick={handlePrevPage}
        className={styles.paginationButton}
        disabled={currentPage === 1}
        style={{backgroundColor: 'transparent',border:'none'}}
      >
        Trước
      </button>
      {renderPageNumbers()}
      <button
        onClick={handleNextPage}
        className={styles.paginationButton}
        disabled={currentPage === totalPages}
        style={{backgroundColor: 'transparent' ,border:'none'}}
      >
        Tiếp
      </button>
    </div>
  );
};
