import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styles from "@/styles/dashboard.module.css";
import { getQuestions } from "@/components/request/query";
import { useQuery } from "@tanstack/react-query";
import { Question } from "@/components/type.check";
import { MdDeleteOutline } from "react-icons/md";
import { FiEdit2 } from "react-icons/fi";
import Delete from "@/components/delete";
import Show from "@/components/show";
import Loading from "@/components/loading";

export default function Index() {

	const router = useRouter();
	const [questions, setQuestions] = useState<{ [key: string]: Question }>({});
	const [preview, setPreview] = useState<[string, Question]>();
	const [id, setId] = useState<string | null>(null);


	useEffect(() => {
		const token = localStorage.getItem("xetwux");
		if (!token) {
			router.push("/");
		}
	}, [router]);

	const { data, isLoading, error } = useQuery({
		queryKey: ["get-questions"],
		queryFn: getQuestions,
		staleTime: 600000, // 10 minutes
	});

	useEffect(() => {
		if (data?.data) {
			setQuestions(data?.data);
		}
	}, [data]);

	useEffect(() => {
		setPreview(Object.entries(questions)[0]);
	}, [questions]);

	return (
		<div className={styles.left_body_container} >
			<Show>
				<Show.When isTrue={id !== null}>
					<Delete cancel={() => setId(null)} id={id} />
				</Show.When>
				<Show.When isTrue={isLoading}>
					<Loading />
				</Show.When>
			</Show>
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
							<h3 style={{ color: "#f8f8f8" }}>Question {index + 1}</h3>
							<div className={styles.card}>
								<p>{value?.question}</p>
								<div className={styles.action}>
									<span
										onClick={() => {
											localStorage.setItem(
												"edit",
												JSON.stringify([key, value])
											);
											router.push("/dashboard/update");
										}}
									>
										<FiEdit2
											style={{ fontSize: 22, color: "rgba(2, 48, 71, 0.9)" }}
										/>
									</span>
									<span
										onClick={() => {
											setId(key);
										}}
									>
										<MdDeleteOutline style={{ fontSize: 23, color: "red" }} />
									</span>
								</div>
							</div>
						</div>
					))}
				</div>
				<div className={styles.preview}>
					<div className={styles.preview_container}>
						<h6 className={styles.question}>{preview?.[1]?.question}</h6>
						<ul className={styles.options}>
							{preview?.[1]?.options.map((i: string, index) => (
								<div className={styles.option} key={index}>
									<p>{index + 1} .</p>
									<li key={index}>{i}</li>
								</div>
							))}
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
}
