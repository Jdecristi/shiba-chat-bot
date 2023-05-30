<script lang="ts">
	import type { Message } from '../types/message';

	import ChatMessage from './ChatMessage.svelte';

	export let messages: Message[];
</script>

<div class="chat-messages-container">
	{#each messages as message}
		<ChatMessage role={message.role} content={message.content} />
	{/each}
</div>
