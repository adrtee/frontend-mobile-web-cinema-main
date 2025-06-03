"use client";

import Link from "next/link";

import styles from "./header.module.css";

const Header = () => {
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
