import { ChatOpenAI } from "@langchain/openai";
import { HumanMessage, SystemMessage } from "langchain/schema";
import { socialMediaPrompt } from "../prompts/social-media-prompt";
import { imageGenerationDescribePrompt } from "../prompts/image-generation-describe-prompt";
import { OpenAI } from 'openai';

export const social = async (userMessage: string) => {
  const imageDescription = await createImageDescription(userMessage);
  const postContent = await createPostContent(userMessage);
  const image = await getImage(imageDescription);
  
  return `${postContent} URL: ${image}`;
};

async function createPostContent(userMessage: string): Promise<string> {
  const model = new ChatOpenAI({
    modelName: "gpt-3.5-turbo",
  });
  console.log('Creating post content...')
  const { content } = await model.invoke([
    new SystemMessage(`${socialMediaPrompt}`),
    new HumanMessage(`${userMessage}`)
  ]);
  console.log('createPostContent content: ', content);
  return content.toString();
}

async function createImageDescription(shortDescription: string): Promise<string> {
    const model = new ChatOpenAI({
      modelName: "gpt-3.5-turbo",
    });
    console.log('Creating image description...')
    const { content } = await model.invoke([
      new SystemMessage(`${imageGenerationDescribePrompt}`),
      new HumanMessage(`${shortDescription}`)
    ]);
    console.log('createImageDescription content: ', content);
    return content.toString();
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