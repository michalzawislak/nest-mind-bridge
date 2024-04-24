import { Injectable } from '@nestjs/common';
import { intentSchema } from '../schemas/base';
import { parseFunctionCall } from '../helpers/parse-function-call.helper';
import { ChatOpenAI } from '@langchain/openai';
import { HumanMessage, SystemMessage } from '@langchain/core/messages';

@Injectable()
export class LangchainApiService {

	async getIntention(message: string) {
		console.log(message);
		const model = new ChatOpenAI({
			modelName: "gpt-4-0613",
		}).bind({functions: [intentSchema]});
		
		const result = await model.invoke([
			new HumanMessage(`${message}`)
		]);
		const action = parseFunctionCall(result);
		return action;
	}

	async getCompletion(context: string, message: string) {
		const model = new ChatOpenAI({
			modelName: "gpt-3.5-turbo",
	});
	
		const result = await model.invoke([
			new SystemMessage(`${context}`),
			new HumanMessage(`${message}`)
	]);
		
		return result[0].content;
	}
}
