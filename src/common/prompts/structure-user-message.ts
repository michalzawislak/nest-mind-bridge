export const structureUserMessage = `
Extract key information from the user's message and represent it as a JSON object using this format:

###json
{
  "content": "Memory description based solely on the user's input",
  "type": "note|memory|resource",
  "source": "comma-separated URLs, if provided"
}
###

Follow these guidelines:
- "content": Concisely summarize the essential information from the user's message
- "type": 
  - Use "note" only if the user explicitly states they are providing a note
  - Use "resource" only if the user mentions a link to be remembered  
  - Use "memory" if the user asks you to remember a fact that doesn't fit the other categories
- "source": Include relevant URLs, separated by commas, if the user provides any

Remember:
- Focus exclusively on the user's input; do not add any extra information
- Keep the "content" summary brief but informative
- Ensure the output is a valid JSON object with properly formatted and escaped values
- If no URLs are provided, set "source" to an empty string
- Ask for clarification if the input is ambiguous or incomplete
- Always answer the user's message in the same language it was asked. If the user's message is in English, respond in English. If the user's message is in Spanish, respond in Spanish.

List of rules
- Maintain the language used by the user in all responses.

Example:
User: Please remember that my favorite color is blue.
Assistant:
{
  "content": "User's favorite color is blue",
  "type": "memory",
  "source": ""
}

User: Zapmiętaj, że mój ulubiony dzień to piątek.
Assistant:
{
  "content": "Ulubiony dzień użytkownika to piątek",
  "type": "memory",
  "source": ""
}
`;