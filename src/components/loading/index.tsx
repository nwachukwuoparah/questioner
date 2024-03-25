import React from "react";
import styles from "@/styles/delete.module.css";
import Image from "next/image";
import animationData from "../../../public/loading.json";
import Lottie from "lottie-react";
export default function Loading() {
	return (
		<div className={styles.container}>
			<Lottie
				style={{ width: 400 }}
				animationData={animationData}
				className="flex justify-center items-center"
				loop={true}
			/>
		</div>
	);
}
