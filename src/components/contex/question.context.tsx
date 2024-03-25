import { useQuery } from "@tanstack/react-query";
import React, { createContext, useRef } from "react";

export const QuestionContext = createContext<any>(null);

const QuestionProvider = ({ children }: any) => {
	const questionRef = useRef();

	return (
		<QuestionContext.Provider value={{ questionRef }}>
			{children}
		</QuestionContext.Provider>
	);
};

export default QuestionProvider ;
