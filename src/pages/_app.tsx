import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import QuestionProvider from "@/components/contex/question.context";
const queryClient = new QueryClient();
export default function App({ Component, pageProps }: AppProps) {
	return (
		<QueryClientProvider client={queryClient}>
			<QuestionProvider>
				<Component {...pageProps} />
			</QuestionProvider>
		</QueryClientProvider>
	);
}
