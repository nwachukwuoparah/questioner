import Button from "../../components/button";
import Input from "../../components/input";
import { Option, Question } from "@/components/type.check";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { createSchema } from "../../components/schema";
import { useRouter } from "next/router";
import {
	useMutation,
	useQueryClient,
	QueryFilters,
} from "@tanstack/react-query";
import Layout from "@/components/layout";
import styles from "@/styles/create.module.css";
import { updateQuestions } from "@/components/request/mutate";
import { useEffect, useState } from "react";

const Update = () => {
	const router = useRouter();
	const queryClient = useQueryClient();
	const [id, setId] = useState();

	const {
		control,
		register,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm<any>({
		resolver: yupResolver(createSchema),
		defaultValues: {
			options: ["", "", ""],
			question: "",
		},
	});

	const { isPending, mutate, error } = useMutation({
		mutationFn: updateQuestions,
		onSuccess: async (data) => {
			queryClient.invalidateQueries("update-questions" as QueryFilters);
			router.push("/dashboard");
		},
		onError: (err) => {
			console.log(err);
		},
	});

	const onSubmit: SubmitHandler<Question> = (data) => {
		const { question, ...others } = data;
		const sortedArray = others?.options?.map((obj: any) => obj.option);
		mutate({ id: id, payload: { question, options: sortedArray } });
	};

	useEffect(() => {
		const storedData = JSON.parse(localStorage.getItem("edit") || "null");
		setId(storedData?.[0]);
		const options = storedData?.[1]?.options.map((val: string) => ({
			option: val,
		}));
		if (storedData !== null) {
			setValue("question", storedData?.[1]?.question || "");
			setValue(
				"options",
				options || [{ option: "" }, { option: "" }, { option: "" }]
			);
		}
	}, [setValue]);

	return (
		<Layout>
			<div className={styles.create}>
				<div className={styles.create_contain}>
					<h2>Update question</h2>
					<div className={styles.create_input_wrap}>
						<Input
							name="question"
							type="textarea"
							placeholder="Type in your question"
							inputType="text"
							register={register}
							errors={errors}
						/>

						<Controller
							control={control}
							name="options"
							render={({ field }) => (
								<span>
									{field?.value?.map((option: Option, index: number) => (
										<div key={index}>
											<Input
												placeholder="Type in your question"
												inputType="text"
												register={register}
												errors={errors}
												onChange={(data) => {
													const updatedOperation = [...field.value];
													updatedOperation[index].option = data?.target?.value;
													field.onChange(updatedOperation);
												}}
												remove={() => {
													if (field?.value && field.value.length > 3) {
														const updatedOperation = [...field.value];
														updatedOperation.splice(index, 1);
														field.onChange([...updatedOperation]);
													}
												}}
												index={index + 1}
												value={option?.option || ""}
											/>
										</div>
									))}
									<div
										onClick={() => {
											if (field.value.length !== 5) {
												field.onChange([...field.value, { option: "" }]);
											}
										}}
									>
										<p>Add another option</p>
									</div>
								</span>
							)}
						/>

						<Button
							// disabled={!active ? true : isLoading}
							style={{
								marginTop: 15,
								// opacity: !active ? 0.6 : isLoading && 0.6,
							}}
							// isLoading={isLoading}
							handleClick={handleSubmit(onSubmit)}
							type="filled"
						>
							Update
						</Button>
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default Update;
