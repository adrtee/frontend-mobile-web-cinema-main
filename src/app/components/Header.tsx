"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import styles from "./header.module.css";

const Header = () => {
  const router = useRouter();
  return (
    <header className={styles.header}>
      <Link href={"/"}>
        <h1>ABC Cinema</h1>
      </Link>

      <Link href={"/"}>Home</Link>
    </header>
  );
};

export default Header;
