import React, { ReactElement, useState } from "react";
import styles from "@/styles/dashboard.module.css";
import Link from "next/link";
import { MdDehaze } from "react-icons/md";
import { IoIosLogOut } from "react-icons/io";
import { useRouter } from "next/router";

export default function Layout({ children }: { children: ReactElement }) {
	const router = useRouter();
	const [display, setDisplay] = useState(false);
	return (
		<div className={styles.container}>
			<div
				className={[styles.overlap, !display ? styles.overlapNone : ""].join(
					" "
				)}
				onClick={() => setDisplay(!display)}
			>
				<div className={styles.side_bar}>
					<div className={styles.side_bar_contain}>
						<div style={{ display: "flex", flexDirection: "column", gap: 15 }}>
							<div className={styles.link_contain}>
								<Link className={styles.link} href="/dashboard">
									<p>All questions</p>
								</Link>
							</div>
							<div className={styles.link_contain}>
								<Link href="/dashboard/create" className={styles.link}>
									<p>Create question</p>
								</Link>
							</div>
						</div>
						<div
							className={styles.link_contain}
							onClick={() => {
								router.push("/");
								localStorage.clear();
							}}
						>
							<span className={styles.link}>
								<p>Log out</p>
								<IoIosLogOut style={{ fontSize: 25 }} />
							</span>
						</div>
					</div>
				</div>
			</div>
			<div className={styles.left_contain}>
				<div className={styles.header}>
					<MdDehaze
						className={styles.toggle}
						onClick={() => setDisplay(!display)}
					/>
				</div>
				{children}
			</div>
		</div>
	);
}
