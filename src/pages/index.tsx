import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import Regester from "./auth";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
	return (
		<main className={`${styles.main} ${inter.className}`}>
			<Regester />
		</main>
	);
}
