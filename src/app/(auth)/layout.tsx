import { ReactNode } from "react";
import styles from "./layout.module.css";
import Image from "next/image";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.leftSide}>
        <div className={styles.leftSide_container}>
          <h2>Phan café</h2>
        </div>
        {children}
      </div>
      <div className={styles.rightSide}>
        <Image
          src="/images/auth-banner.png"
          alt=""
          fill={true}>
        </Image>
      </div>
    </div>
  );
}