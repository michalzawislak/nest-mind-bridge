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
                      'action' — when asks  explicitly to perform an action that she needs to do related to Internet connection to the external apps, services, APIs, models (like Wolfram Alpha) finding sth on a website, calculating, giving environment related info (like weather or nearest locations) accessing and reading websites/urls contents, listing tasks, and events.
                      `,
                }
            },
            required: ['name'],
        },
    }