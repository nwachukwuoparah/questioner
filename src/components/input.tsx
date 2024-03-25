import { useState } from "react";
import { inputType } from "./type.check";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
import styles from "@/styles/input.module.css";
import { MdDeleteOutline } from "react-icons/md";

const Input = ({
	type,
	inputType,
	placeholder,
	name,
	icon,
	register,
	errors,
	onChange,
	remove,
	index,
	value,
}: inputType) => {
	const [toggle, setToggle] = useState<boolean>(false);

	switch (type) {
		case "text":
			return (
				<>
					<div
						className={styles.input_wrap}
						style={{ border: errors?.[name] && "1px solid red" }}
					>
						<img src="/sms.svg" className={styles.input_image} alt="image" />
						<input
							type={toggle ? "text" : inputType}
							className={styles.input_field}
							{...register(name)}
							placeholder={placeholder}
							onChange={onChange}
						/>
						{inputType === "password" &&
							(!toggle ? (
								<BsFillEyeSlashFill
									color="grey"
									fontSize={25}
									onClick={() => setToggle(!toggle)}
								/>
							) : (
								<BsFillEyeFill
									fontSize={25}
									color="grey"
									onClick={() => setToggle(!toggle)}
								/>
							))}
					</div>
					<div
						style={{
							lineHeight: 1.2,
							color: "red",
							fontSize: 14,
							marginTop: 5,
						}}
					>
						{errors?.[name]?.message}
					</div>
				</>
			);
		case "select":
			return (
				<>
					<div className={styles.input_wrap}>
						<input
							type={toggle ? "text" : inputType}
							className={styles.input_field}
							placeholder={placeholder}
							onChange={onChange}
						/>
					</div>
					<div style={{ lineHeight: 2, color: "red", fontSize: 14 }}>
						{errors?.[name]?.message}
					</div>
				</>
			);
		case "textarea":
			return (
				<>
					<textarea
						style={{
							width: "100%",
							height: 150,
							border: "1px solid #d9d9d9",
							color: "rgb(50, 49, 49)",
							padding: 10,
							outline: "none",
							backgroundColor: "transparent",
							borderRadius: 8,
						}}
						{...register(name)}
						placeholder={placeholder}
					/>
					<div style={{ lineHeight: 2, color: "red", fontSize: 14 }}>
						{errors?.[name]?.message}
					</div>
				</>
			);
		default:
			return (
				<>
					<div className={styles.input_wrap}>
						{index}
						<input
							type={toggle ? "text" : inputType}
							className={styles.input_field}
							placeholder={placeholder}
							onChange={onChange}
							value={value}
						/>
						<MdDeleteOutline
							style={{ fontSize: 30, color: "red" }}
							onClick={remove}
						/>
					</div>
					<div style={{ lineHeight: 2, color: "red", fontSize: 14 }}>
						{errors?.["options"] && "Option is required"}
					</div>
				</>
			);
	}
};

export default Input;
