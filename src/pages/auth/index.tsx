import Button from "../../components/button";
import Input from "../../components/Input";
import { useForm, SubmitHandler } from "react-hook-form";
import { IFormInput } from "../../components/type.check";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../../components/schema";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import styles from "@/styles/Iogin.module.css";
import { regester } from "@/components/request/mutate";
import { useRouter } from "next/router";

const Regester = () => {
	const router = useRouter();
	const inputData = [
		{
			name: "email",
			type: "text",
			inputType: "text",
			placeholder: "Email",
			icon: "/sms.svg",
		},
	];

	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm<any>({
		resolver: yupResolver(loginSchema),
	});

	const { isPending, mutate, error } = useMutation({
		mutationFn: regester,
		onSuccess: async (data: { data: { token: string } }) => {
			localStorage.setItem("xetwux", data?.data?.token);
			router.push("/dashboard");
		},
		onError: (err) => {
			console.log(err);
		},
	});

	const onSubmit: SubmitHandler<IFormInput> = (data) => mutate(data);

	return (
		<div className={styles.login}>
			<div className={styles.login_contain}>
				<p>Register</p>
				<div className={styles.login_input_wrap}>
					{inputData.map((i, index) => (
						<Input key={index} {...i} register={register} errors={errors} />
					))}

					<Button
						disabled={isPending}
						style={{ marginTop: 15, opacity: isPending && 0.9 }}
						isLoading={isPending}
						handleClick={handleSubmit(onSubmit)}
						type="filled"
					>
						Procede
					</Button>
				</div>
			</div>
		</div>
	);
};

export default Regester;
