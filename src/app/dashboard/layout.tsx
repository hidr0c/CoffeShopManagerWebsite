'use client';

import styles from "./layout.module.css";
import Image from "next/image";

import Header from "@/components/header/Header";
import SideBar from "@/components/sidebar/Sidebar";
import { useEffect } from "react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            window.location.href = "/login";
        }
    }, []);
    return (
        <>
            <Header />
            <SideBar />
            <div className="main">
                {children}
            </div>
        </>
    );
}