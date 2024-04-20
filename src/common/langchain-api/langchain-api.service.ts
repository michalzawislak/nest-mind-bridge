import { Injectable } from '@nestjs/common';
import { intentSchema } from '../schemas/base';
import { parseFunctionCall } from '../helpers/parse-function-call.helper';
import { ChatOpenAI } from '@langchain/openai';
import { HumanMessage } from '@langchain/core/messages';

@Injectable()
export class LangchainApiService {

	async getIntention(message: string) {
		const model = new ChatOpenAI({
			modelName: "gpt-4-0613",
	}).bind({functions: [intentSchema]});
	
	const result = await model.invoke([
			new HumanMessage(`${message}`)
	]);
	console.log(JSON.stringify(result));
	const action = parseFunctionCall(result);
	console.log(action);
	return action;
	}
}
