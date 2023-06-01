import { json } from '@sveltejs/kit';
import { API_KEY } from '$env/static/private';
import { ChatOpenAI } from 'langchain/chat_models/openai';
import { AIChatMessage, HumanChatMessage, SystemChatMessage } from 'langchain/schema';
import type { ChatMessage } from '../../types/message';

import type { RequestHandler } from '@sveltejs/kit';

const chat: ChatOpenAI = new ChatOpenAI({
	openAIApiKey: API_KEY,
	temperature: 0.7
});

export const POST: RequestHandler = async ({ request }) => {
	const messages: ChatMessage[] = await request.json();

	try {
		return json(
			await chat.call([
				new SystemChatMessage(
					'You are an Expert on Shiba Inu and the Shibareum blockchain. If I have any questions, help me understand by speaking in an enthusiastic tone and explain things to me in a clear and consize manner, ideally in 1-3 sentances.'
				),
				...messages.map((message) =>
					message.type === 'human'
						? new HumanChatMessage(message.data.content)
						: new AIChatMessage(message.data.content)
				)
			])
		);
	} catch (errorMessage) {
		return json(errorMessage, { status: 500 });
	}
};
