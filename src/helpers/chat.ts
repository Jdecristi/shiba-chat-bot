import type { ChatMessage } from '../types/message';

export const sendMessages = async (messages: ChatMessage[]): Promise<ChatMessage[]> => {
	try {
		const response = await fetch('/chat', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(messages)
		});

		const result = await response.json();
		messages.push(result);

		return messages;
	} catch (error) {
		throw new Error(`${error}`);
	}
};
