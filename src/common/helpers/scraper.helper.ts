export const scraper = async (url: string, retries = 3, delay = 1000): Promise<ScraperResponse> => {
	const scraperUrl = `https://r.jina.ai/${url}`;
	try {
		const response = await fetch(scraperUrl);
		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}
		const data = await response.json();
		return data;
	} catch (error) {
		if (retries === 0) {
			throw error; 
		}
		console.error(error);
		await wait(delay); 
		return scraper(url, retries - 1, delay);
	}
};

export function wait(delay: any) {
	return new Promise(resolve => setTimeout(resolve, delay));
}

export interface ScraperResponse {
	title: string;
	url: string;
	content: string;
}