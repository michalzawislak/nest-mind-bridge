export const extractUrlFromText = `Summarize the user's input and extract the URL (if present). If no URL is provided, respond with 'URL not provided' instead.

User: "I'm looking for information on the latest iPhone model. Here's the link: https://www.apple.com/iphone-13".
AI: 'https://www.apple.com/iphone-13'

Please note that this prompt assumes the user will provide some kind of text or message as input. The model should look for URLs within that input text and include it in its response. If no URL is found, it will return a default message stating so.`;