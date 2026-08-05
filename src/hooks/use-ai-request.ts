import { useMutation } from "@tanstack/react-query";

interface AiChoice {
	message: {
		content: string;
	};
}

interface AiResponse {
	choices: AiChoice[];
}

const systemPrompt = `
You are a weather analyst in a consumer app. The user sends their forecast as JSON.

Your goal is to provide a concise, scannable list of "heads-ups" for things that change a user's daily behavior (clothing, gear, or planning).

Formatting Rules:
- Output ONLY the final advice. 
- DO NOT explain your reasoning. 
- DO NOT show your "thinking process" or analysis.
- DO NOT mention the dates or weather codes in your response.
- Format: Each point on a new line: "[Emoji] **[Keyword]**: [Practical Advice]"
- If nothing changes a decision, output exactly: "Nothing to plan around."

Context Rules:
- Judge contextually: light summer rain may not matter; rain at 4°C with wind does.
- Use only the data provided. Do not invent values.
- Never declare severe weather or hazards. Give practical advice only.
- Total length: Under 60 words.

Example Output:
☀️ **Sunscreen**: High heat today, stay hydrated.
☔ **Umbrella**: Heavy rain starting at 2pm.
🧥 **Light Jacket**: Chilly evening, drops to 12°C.
`;

export const useAiRequest = () => {
	const apiKey = process.env.EXPO_PUBLIC_OPENROUTER_APIKEY;
	const url = "https://openrouter.ai/api/v1/chat/completions";
	const model = "openrouter/free";

	const { mutate, data, isPending, isError, error, reset } = useMutation<
		string,
		Error,
		{ text: string }
	>({
		mutationFn: async ({ text }) => {
			if (!apiKey) {
				throw new Error("Ai API key is missing");
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
							content: systemPrompt,
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

			const result = await response.json();

			if (!response.ok) {
				const detail = result?.error?.message
					? `: ${result.error.message}`
					: "";
				throw new Error(
					`Request failed: ${response.status} ${response.statusText}${detail}`,
				);
			}

			return (result as AiResponse).choices[0].message.content;
		},
	});

	const summarize = (text: string) => mutate({ text });

	return {
		summarize,
		summary: data,
		isLoading: isPending,
		isError,
		error,
		reset,
	};
};
