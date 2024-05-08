import { ChatOpenAI } from "@langchain/openai";
import { HumanMessage, SystemMessage } from "langchain/schema";
import { otherActivitiesPrompt } from "../prompts/other-activities-system-prompt";

export const other = async (userMessage: string) => {
  const completion = async () => {
    const model = new ChatOpenAI({
      modelName: "gpt-3.5-turbo",
    });
   
    const { content } = await model.invoke([
      new SystemMessage(`${otherActivitiesPrompt(userMessage)}`),
      new HumanMessage(`${userMessage}`)
    ]);
    
    return content;
  };
  return await completion();
};