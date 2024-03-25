import React, { ReactElement, useState } from "react";
import styles from "@/styles/dashboard.module.css";
import Link from "next/link";

export default function Layout({ children }: { children: ReactElement }) {
	const [display, setDisplay] = useState(false);
	return (
		<div className={styles.container}>
			<div
				className={[styles.overlap, !display ? styles.overlapNone : ''].join(' ')}
				onClick={() => setDisplay(!display)}
			>
				<div className={styles.side_bar}>
					<div className={styles.side_bar_contain}>
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
				</div>
			</div>
			<div className={styles.left_contain}>
				<div className={styles.header}>
					<p onClick={() => setDisplay(!display)}>display</p>
				</div>
				{children}
			</div>
		</div>
	);
}
