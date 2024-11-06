"use client";

import styles from './table.module.scss';
import { FaSort } from "react-icons/fa";
import { Search } from '../search/search';
import { Button } from '../button/button';
import { FaPlus } from "react-icons/fa";
import  {Pagination}  from '../pagination/pagination';
import { useState,useEffect } from 'react';
import Modal from '../modal/modal';
import { Input, Select} from '../input/input'



interface TableProps {
  style?: any;
  children: React.ReactNode;
  preHeader?: boolean,
  pagination?: boolean,
  preHeaderName?: string,
  modalAddContent?: React.ReactNode,
  modalTitle?: string,
  addButtonTitle?: string,
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
}

interface TableBodyProps {
  style?: any;
  children: React.ReactNode;
}

export function Table({ style = {}, children, pagination=false, preHeader=false, modalAddContent, modalTitle, addButtonTitle }: TableProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const handlePageChange = () => {


  }



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
          <Button onClick={() => openModal()}>
            <>
            <FaPlus />
            {addButtonTitle}
            </>
          </Button>
        </div>
      </div>}
       <table className={styles.table} style={style}>
      {children}
    </table>
   {pagination && <div className={styles.pagination}>
    <Pagination
        currentPage={1}
        totalPages={10}
        onPageChange={handlePageChange}
      />
    </div>}

    <Modal isOpen={isModalOpen} onClose={closeModal} title={modalTitle} action={addButtonTitle}>
        {modalAddContent}
    </Modal>
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

export function TableHead({ style = {}, children }:TableHeadProps) {
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

export function TableCell({ style = {}, children, sort }: TableCellProps) {
  return (
    <td className={styles.cell} style={style}>
      {sort && <div className={styles.sort}><FaSort /></div>}
      {children}
    </td>
  );
}
