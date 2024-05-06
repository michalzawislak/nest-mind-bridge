export const intentSchema = {
        name: 'describe_intention',
        description: `Describe user intention, based on his latest message and details from summary of their conversation.`,
        parameters: {
            type: 'object',
            properties: {
                type: {
                    type: 'string',
                    description: `
                      Type has to be set to either:
                      'query' —  has to speak, write sth, translate, correct, help, simply answer to question. Should be picked by default and for common conversations and chit-chat.
                      'action' — when asks explicitly to perform an action that she needs to do related to Internet connection to the external apps, services, APIs, models (like Wolfram Alpha) finding sth on a website, calculating, giving environment related info (like weather or nearest locations) accessing and reading websites/urls contents, listing tasks, and events, data provided earlier.
                      `,
                },
                category: {
                    type: 'string',
                    description: `
                    When calling the function, you need to set the 'category' parameter to one of the following values:
                    - 'save': This category is used for recording any information such as notes, meetings, or web addresses that need to be remembered.
                    - 'scrap': Use this category when you need to extract data from external sources like websites, articles, or blogs.
                    - 'memories': This category is meant for storing information related to previously provided data, including memories, previously asked questions, and any additional notes.
                    - 'social': Use this category when you need to create content for social media, usually post on social platform (facebook, instagram ,x ,linkedIn etc.).
                    - 'other': If your question or request does not fit into any of the above categories, set the category parameter to 'other'.
                    `,
                }
            },
            required: ['type', 'category'],
        },
    }