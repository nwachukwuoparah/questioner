import { buttonType } from "../type.check";
import styles from "@/styles/button.module.css";


const Button = ({
	handleClick,
	children,
	type,
	style,
	isLoading,
	disabled,
}: buttonType) => {
	switch (type) {
		case "filled":
			return (
				<button
					disabled={disabled}
					style={style}
					className={styles.button}
					onClick={handleClick}
				>
					{isLoading ? (
						<div className={styles.loader_wrap}>
							<div className={styles.loader}></div>
						</div>
					) : (
						children
					)}
				</button>
			);
		case "out-line":
			return (
				<button
					className={styles.button_outline}
					style={style}
					onClick={handleClick}
				>
					{" "}
					{children}
				</button>
			);
		default:
			return null;
	}
};

export default Button;
