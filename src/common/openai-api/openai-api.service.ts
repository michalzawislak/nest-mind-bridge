import { Injectable, ServiceUnavailableException } from '@nestjs/common';
import OpenAIApi, { OpenAI } from 'openai';
import { ChatCompletion } from 'openai/resources';
import { intentSchema } from '../schemas/base';

@Injectable()
export class OpenaiApiService {
		public openai = new OpenAI();

    async getCompletion(context: string, message: string): Promise<string> {
			const completion: ChatCompletion = await this.openai.chat.completions.create({
				messages: [
					{
						role: 'system', 
						content: context
					},
					{
						role: 'user', 
						content: message
					},	
				],
				model: 'gpt-3.5-turbo',
			});
			console.log(`getCompletion(), Usage: ${completion.usage.total_tokens} tokens`);
			return completion.choices[0].message.content;
		}

		async getIntention(message: string): Promise<string> {
			const response = await this.openai.chat.completions.create({
				model: "gpt-4-0613",
				messages:  [
					{
						role: "user",
						content: message,
					},
				],
				functions: [intentSchema],
			});
			console.log(`getIntention(): ${JSON.stringify(response)}`);
			return response.choices[0].message.content;
		}
		
}
