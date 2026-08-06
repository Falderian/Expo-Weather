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
You are a Weather Strategist. Analyze the JSON forecast and return a JSON array of behavioral "heads-ups".

Strict Constraints:
- Output ONLY a raw JSON array. No markdown formatting, no backticks, no intro.
- Convert dates (e.g., "2026-08-06") to day names. 
- Do not group, there should be always exactly 7 days.
- Only include days that trigger advice (Temp drops >5°C, heat >30°C, wind >30km/h, or rain).
- If weather is stable, return an empty array [].

JSON Schema:
[
  {
    "days": "Day or Range",
    "emoji": "Relevant Emoji",
    "advice": "Punchy, actionable advice",
    "severity": "low" | "medium" | "high"
  }
]
`;

interface WeatherAdvice {
	days: string;
	emoji: string;
	advice: string;
	severity: "low" | "medium" | "high";
}

export const useAiRequest = () => {
	const apiKey = process.env.EXPO_PUBLIC_HUGGINGFACE_API;
	const url = "https://router.huggingface.co/v1/chat/completions";
	const model = "meta-llama/Llama-3.1-8B-Instruct";

	const { mutate, data, isPending, isError, error, reset } = useMutation<
		WeatherAdvice[], // Changed from string
		Error,
		{ text: string }
	>({
		mutationFn: async ({ text }) => {
			if (!apiKey) throw new Error("Ai API key is missing");

			const response = await fetch(url, {
				method: "POST",
				headers: {
					Authorization: `Bearer ${apiKey}`,
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					model,
					messages: [
						{ role: "system", content: systemPrompt },
						{ role: "user", content: text },
					],
					temperature: 0.3,
				}),
			});

			const result = await response.json();
			const content = (result as AiResponse).choices[0].message.content;

			try {
				return JSON.parse(content);
			} catch (_: unknown) {
				throw new Error("AI returned invalid JSON format");
			}
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
