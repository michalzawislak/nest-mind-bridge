import { otherActivitiesPrompt } from "../prompts/other-activities-system-prompt";
import { getOpenAiService } from "src/register-services";

export const other = async (userMessage: string) => {
  const openaiApiService = getOpenAiService();
  const completion = await openaiApiService.getCompletion(
    `${otherActivitiesPrompt(userMessage)}`,
    `${userMessage}`
  );
  return completion;
};