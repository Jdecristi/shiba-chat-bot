<script lang="ts">
	import type { Message } from '../types/message';

	import { createParser } from 'eventsource-parser';
	import { API_KEY, STARTING_MESSAGES, STREAM_URL } from '../constants';
	import ChatMessages from './ChatMessages.svelte';
	import ChatFooter from './ChatFooter.svelte';

	let messages: Message[] = STARTING_MESSAGES;
	let inputMessage = '';
	let responseMessage = '';
	let error = '';

	$: chatMessages = responseMessage
		? ([...messages, { role: 'assistant', content: `${responseMessage}...` }] as Message[])
		: messages;

	const sendMessages = async () => {
		const message: Message = { role: 'user', content: inputMessage.trim() };

		if (message.content !== '') {
			messages = [...messages, message];
			inputMessage = '';
			error = '';

			const apiBody = {
				model: 'gpt-3.5-turbo',
				messages,
				stream: true,
				n: 1,
				max_tokens: 200,
				temperature: 0.8
			};

			try {
				const response = await fetch(STREAM_URL, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${API_KEY}`
					},
					body: JSON.stringify(apiBody)
				});

				const parser = createParser((event) => {
					if (event.type === 'event') {
						if (event.data !== '[DONE]') {
							responseMessage += JSON.parse(event.data).choices[0].delta?.content || '';
						} else {
							messages = [...messages, { role: 'assistant', content: responseMessage }];
							responseMessage = '';
						}
					} else if (event.type === 'reconnect-interval') {
						console.log('We should set reconnect interval to %d milliseconds', event.value);
					}
				});

				for await (const value of response.body?.pipeThrough(
					new TextDecoderStream()
				) as unknown as AsyncIterableIterator<string>) {
					parser.feed(value);
				}
			} catch (responseError) {
				error = `${responseError}`;
			}
		}
	};
</script>

<div class="chat-container">
	<h1>Shiba Chat Bot</h1>
	<ChatMessages messages={chatMessages} />
	<ChatFooter {error} bind:inputMessage {sendMessages} />
</div>

<style>
	.chat-container {
		width: 80vw;
		max-width: 500px;
		height: 80vh;
		padding: 20px;
		background-color: #ffffff;
		border: 2px solid black;
		border-radius: 20px;
		display: flex;
		flex-direction: column;
	}

	h1 {
		text-align: center;
		margin-top: 0;
	}
</style>
