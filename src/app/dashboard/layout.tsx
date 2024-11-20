import styles from "./layout.module.css";
import Image from "next/image";

import Header from "@/components/header/Header";
import SideBar from "@/components/sidebar/Sidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
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