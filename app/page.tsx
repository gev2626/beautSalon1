import Image from "next/image";
import styles from "./page.module.css";
import SalonPage from "./components/SalonPage";

export default function Home() {
  return (
    <div className={styles.page}>
      <SalonPage />
    </div>
  );
}
