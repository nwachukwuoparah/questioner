import React, { useEffect, useLayoutEffect, useState } from "react";
import { useRouter } from "next/router";
import styles from "@/styles/dashboard.module.css";
import { getQuestions } from "@/components/Api/query";
import { useQuery } from "@tanstack/react-query";
import { Question } from "@/components/type.check";

export default function Index() {
	const router = useRouter();
	const [questions, setQuestions] = useState<{ [key: string]: Question }>({});
	const [preview, setPreview] = useState<[string, Question]>();

	useLayoutEffect(() => {
		const token = localStorage.getItem("xetwux");
		if (!token) {
			router.push("/");
		}
	}, [router]);

	const { data, isLoading, error } = useQuery({
		queryKey: ["get-user"],
		queryFn: getQuestions,
		staleTime: 600000, // 10 minutes
	});

	useEffect(() => {
		if (data?.data) {
			setQuestions(data.data);
		}
	}, [data]);

	useEffect(() => {
		setPreview(Object.entries(questions)[0]);
		console.log(Object.entries(questions)[0]);
	}, [questions]);

	return (
		<div className={styles.container}>
			<div className={styles.side_bar}>side bar</div>
			<div className={styles.left_contain}>
				<div className={styles.header}>
					<p>header</p>
				</div>
				<div className={styles.left_body}>
					<div className={styles.left_body_card_container}>
						{Object.entries(questions).map(([key, value], index) => (
							<div
								className={styles.card_container}
								key={key}
								onClick={() => {
									setPreview([key, value]);
								}}
							>
								<h3>Question {index + 1}</h3>
								<div className={styles.card}>
									<p>{value?.question}</p>
								</div>
							</div>
						))}
					</div>
					<div
						style={{
							width: "1px",
							height: "100%",
							borderLeft: " 1px solid rgba(188, 185, 185, 0.5",
							position: "sticky",
							top: 0,
						}}
					></div>
					<div className={styles.preview}>
						<div className={styles.preview_container}>
							<h1 className={styles.question}>{preview?.[1]?.question}</h1>
							<ul className={styles.options}>
								{preview?.[1]?.options.map((i: string, index) => (
									<li className={styles.option} key={index}>
										{i}
									</li>
								))}
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
