import { scraperSystemPromptSchema } from "../prompts/scraper-system-prompt";
import { getOpenAiService } from "src/register-services";

export const scrap = async (text: string): Promise<string> => {
	const url = extractUrlsFromText(text);
	const scraperUrl = `https://r.jina.ai/${url}`;
	console.log('Scrape url: ',url);
	try {
		const response = await fetch(scraperUrl);
		const reader = response.body.getReader();
      let data = '';
      while (true) {
        const { done, value } = await reader.read();

        if (done) break;
        data += new TextDecoder().decode(value);
      }
			
			const summary = await contentSummary(`${data}`);
      return summary.toString();

	} catch (error) {
		console.error(error);
	}
};

export const extractUrlsFromText = (text: string): string => {
	const urlRegex = /(https?:\/\/[^\s]+)/;
    const match = text.match(urlRegex);
    return match ? match[0] : null;
}

export const contentSummary = async (pageContent: string) => {
	const openaiApiService = getOpenAiService();
	const completion = await openaiApiService.getCompletion(`${scraperSystemPromptSchema}`, `${pageContent}`);
	return completion;
};

export function wait(delay: any) {
	return new Promise(resolve => setTimeout(resolve, delay));
}

export interface ScraperResponse {
	title: string;
	url: string;
	content: string;
}