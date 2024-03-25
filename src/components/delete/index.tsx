import React from "react";
import styles from "@/styles/delete.module.css";
import Button from "@/components/button";
import {
	QueryFilters,
	useMutation,
	useQueryClient,
} from "@tanstack/react-query";
import { deleteQuestions } from "../request/mutate";

export default function Delete({
	cancel,
	id,
}: {
	cancel: () => void;
	id: string | null;
}) {
	const queryClient = useQueryClient();
	const { isPending, mutate, error } = useMutation({
		mutationFn: deleteQuestions,
		onSuccess: async (data) => {
			queryClient.invalidateQueries("update-questions" as QueryFilters);
			cancel();
		},
		onError: (err) => {
			console.log(err);
		},
	});

	return (
		<div className={styles.container}>
			<div className={styles.modal}>
				<h2>Are you sure you want to delete</h2>
				<div style={{ display: "flex", width: "70%", gap: 30 }}>
					<Button
						type="out-line"
						disabled={false}
						style={{ marginTop: 15 }}
						isLoading={false}
						handleClick={cancel}
					>
						Cancle
					</Button>
					<Button
						disabled={isPending}
						style={{ marginTop: 15, opacity: isPending && 0.7 }}
						isLoading={isPending}
						handleClick={() => {
							mutate(id);
						}}
						type="filled"
					>
						Delete
					</Button>
				</div>
			</div>
		</div>
	);
}
