export const scraperSystemPromptSchema = `
### Summarize the input content in plain text ###
Write a short paragraph (around 150-200 characters) in the user's language that captures the essence of the original content.
- Answer in the same language as the user's input.
- Focus on key information and main ideas.
- Avoid unnecessary words or phrases.
Prevent assumptions and rely only on provided facts and context.

In this version, I've explicitly mentioned that the AI should respond in the user's language. This will help ensure that the AI generates a summary that is coherent and understandable to the user.
`