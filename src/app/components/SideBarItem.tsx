import styles from "../../../styles/SideBarItem.module.css";
import { useState } from "react";

export default function SideBarItem(
    { icon,
        label,
        selected,
        onClick
    }:
        {
            icon: React.ReactNode,
            label: string,
            selected: boolean,
            onClick: () => void
        }) {
    return (
        <div
            className={`${styles.sideBarItem} ${selected ? styles.selected : ''}`}
            onClick={onClick}>
            <span>{icon}</span>
            {label}
        </div>
    )
}