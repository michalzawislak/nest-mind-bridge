import { ChatOpenAI } from "@langchain/openai";
import { socialMediaPrompt } from "../prompts/social-media-prompt";
import { imageGenerationDescribePrompt } from "../prompts/image-generation-describe-prompt";
import { OpenAI } from 'openai';
import { getOpenAiService } from "src/register-services";

export const social = async (userMessage: string) => {
  const imageDescription = await createImageDescription(userMessage);
  const postContent = await createPostContent(userMessage);
  const image = await getImage(imageDescription);
  
  return `${postContent} URL: ${image}`;
};

async function createPostContent(userMessage: string): Promise<string> {
  const openaiApiService = getOpenAiService();
  console.log('Creating post content...')
  const completion = await openaiApiService.getCompletion(`${socialMediaPrompt}`, `${userMessage}`);
  const model = new ChatOpenAI({
    modelName: "gpt-4o",
  });

  console.log('createPostContent content: ', completion);
  return completion;
}

async function createImageDescription(shortDescription: string): Promise<string> {
  const openaiApiService = getOpenAiService();
  const completion = await openaiApiService.getCompletion(`${imageGenerationDescribePrompt}`, `${shortDescription}`);
  return completion;
};

async function getImage(imageDescription: string): Promise<string> {
  const openai = new OpenAI();
  console.log('Generating image...');
  const response = await openai.images.generate({
    model: "dall-e-3",
    prompt: `${imageDescription}`,
    n: 1,
    size: "1024x1024",
  });
  const image_url = response.data[0].url;
  console.log('Image generated');
  return image_url;
}