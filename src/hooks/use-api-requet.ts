import { useMutation } from "@tanstack/react-query";

interface GroqChoice {
	message: {
		content: string;
	};
}

interface GroqResponse {
	choices: GroqChoice[];
}

export const useApiRequest = () => {
	const apiKey = process.env.EXPO_PUBLIC_GROQ_API;
	const url = "https://api.groq.com/openai/v1/chat/completions";
	const model = "llama-3.3-70b-versatile";

	const { mutateAsync, data, isPending, isError, error, reset } = useMutation<
		string,
		Error,
		{ text: string }
	>({
		mutationFn: async ({ text }) => {
			if (!apiKey) {
				throw new Error("Groq API key is missing");
			}

			const response = await fetch(url, {
				method: "POST",
				headers: {
					Authorization: `Bearer ${apiKey}`,
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					model,
					messages: [
						{
							role: "system",
							content:
								"You are a concise weather forecast summarizer. Summarize the user's forecast text into a brief, plain-language overview.",
						},
						{
							role: "user",
							content: text,
						},
					],
					temperature: 0.5,
					max_completion_tokens: 300,
				}),
			});

			if (!response.ok) {
				let detail = "";
				try {
					const errBody = await response.json();
					detail = errBody?.error?.message ? `: ${errBody.error.message}` : "";
				} catch {}
				throw new Error(
					`Groq request failed: ${response.status} ${response.statusText}${detail}`,
				);
			}

			const json = (await response.json()) as GroqResponse;
			return json.choices[0].message.content;
		},
	});

	const summarize = (text: string) => mutateAsync({ text });

	return {
		summarize,
		summary: data,
		isLoading: isPending,
		isError,
		error,
		reset,
	};
};
