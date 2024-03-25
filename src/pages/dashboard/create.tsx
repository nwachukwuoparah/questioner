import Button from "@/components/button";
import Input from "@/components/Input";
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
import { createQuestions } from "@/components/request/mutate";

const Create = () => {
	const router = useRouter();
	const queryClient = useQueryClient();

	const {
		control,
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<any>({
		resolver: yupResolver(createSchema),
		defaultValues: {
			options: [{ option: "" }, { option: "" }, { option: "" }],
			question: "",
		},
	});

	const { isPending, mutate, error } = useMutation({
		mutationFn: createQuestions,
		onSuccess: async (data) => {
			queryClient.invalidateQueries("get-questions" as QueryFilters);
			router.push("/_");
		},
		onError: (err) => {
			console.log(err);
		},
	});

	const onSubmit: SubmitHandler<Question> = (data) => {
		const { question, ...others } = data;
		const sortedArray = others?.options?.map((obj: any) => obj.option);
		mutate({ question, options: sortedArray });
	};

	return (
		<Layout>
			<div className={styles.create}>
				<div className={styles.create_contain}>
					<h2>Create question</h2>
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
												value={option?.option}
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
							disabled={isPending}
							style={{
								marginTop: 15,
								opacity: isPending && 0.6,
							}}
							isLoading={isPending}
							handleClick={handleSubmit(onSubmit)}
							type="filled"
						>
							Create
						</Button>
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default Create;
