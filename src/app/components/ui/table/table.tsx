"use client";

import styles from './table.module.scss';
import { FaSort } from "react-icons/fa";
import { Search } from '../search/search';
import { Button } from '../button/button';
import { FaPlus } from "react-icons/fa";
import { Pagination } from '../pagination/pagination';
import { useState, useEffect } from 'react';
import Modal, { ModalProps } from '../modal/modal';
import { Input, Select } from '../input/input'



interface TableProps {
  style?: React.CSSProperties; // Use React's CSSProperties for better type safety
  children: React.ReactNode;
  preHeader?: boolean;
  pagination?: {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
  };
  preHeaderName?: string;
  addButtonTitle?: string;
  addButtonAction?: (e: React.MouseEvent<HTMLButtonElement>) => void;

}

interface TableRowProps {
  style?: any;
  children: React.ReactNode;
}

interface TableHeadProps {
  style?: any;
  children: React.ReactNode;
}

interface TableCellProps {
  style?: any;
  children: React.ReactNode;
  sort?: boolean;
  sticky?: boolean;
}

interface TableBodyProps {
  style?: any;
  children: React.ReactNode;
}

export function Table({
  style = {},
  children,
  pagination = null,
  preHeader = false,
  addButtonTitle,
  addButtonAction = (e) => { },
}: TableProps) {
  return (
    <div className="">
      {preHeader && <div className={styles.preHeader}>
        <div className={styles.left}>
          <span>Show</span>
          <select name="" id="" className="">
            <option value="" className="">10</option>
            <option value="" className="">20</option>
            <option value="" className="">50</option>

          </select>
          <span>entries</span>
          <Search />
        </div>
        <div className={styles.right}>
          <Button onClick={addButtonAction}>
            <FaPlus />
            {addButtonTitle}
          </Button>
        </div>
      </div>}
      <div className={styles.tableWrapper}>
        <table className={styles.table} style={style}>
          {children}
        </table>
      </div>
      {pagination && <div className={styles.pagination}>
        <Pagination
          currentPage={pagination.currentPage}
          totalPages={pagination.totalPages}
          onPageChange={pagination.onPageChange}
        />
      </div>}
    </div>

  );
}

export function TableRow({ style = {}, children }: TableRowProps) {
  return (
    <tr className={styles.row} style={style}>
      {children}
    </tr>
  );
}

export function TableHead({ style = {}, children }: TableHeadProps) {
  return (
    <thead className={styles.head} style={style}>
      {children}
    </thead>
  );
}

export function TableBody({ style = {}, children }: TableBodyProps) {
  return (
    <tbody className={styles.body} style={style}>
      {children}
    </tbody>
  );
}

export function TableCell({ style = {}, children, sort, sticky = false }: TableCellProps & { sticky?: boolean }) {
  return (
    <td className={`${styles.cell} ${sticky ? styles.sticky : ''}`} style={style}>
      {sort && <div className={styles.sort}><FaSort /></div>}
      {children}
    </td>
  );
}