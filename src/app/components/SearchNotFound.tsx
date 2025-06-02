import Image from "next/image";

import styles from "./SearchNotFound.module.css";

export default function SearchNotFound() {
  return (
    <div className={styles.container}>
      <Image
        src={"/search-not-found.png"}
        alt="poster"
        width={100}
        height={100}
      />
      <h1>404</h1>
      <p>The content could not be found</p>
    </div>
  );
}
