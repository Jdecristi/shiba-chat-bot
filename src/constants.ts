import type { Message } from './types/message';

const API_KEY = process.env.API_KEY;
const STREAM_URL = `https://api.openai.com/v1/chat/completions`;
const STARTING_MESSAGES: Message[] = [
	{
		role: 'system',
		content:
			'You are going to help me understand for everything about Shiba Inu and the Shibareum blockchain. Explain things to me in a clear and consize manner, ideally in 1-2 sentances.'
	},
	{
		role: 'assistant',
		content:
			"Hi I'm here to answer all your questiona about Shiba Inu and the Shibareum Blockchain."
	},
	{
		role: 'assistant',
		content: 'How may I help you today?'
	}
];

export { API_KEY, STREAM_URL, STARTING_MESSAGES };
