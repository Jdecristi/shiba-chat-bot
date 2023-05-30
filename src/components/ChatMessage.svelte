<script lang="ts">
	export let role: 'assistant' | 'user' | 'system';
	export let content: string;
</script>

{#if role !== 'system'}
	<div class={`${role} chat-message`}>
		{content}
	</div>
{/if}

<style>
	.chat-message {
		margin-top: 10px;
		padding: 10px;
		border-radius: 10px;
		border: 1px solid black;
		width: max-content;
		max-width: 80%;
	}

	.assistant {
		background-color: #eee;
	}
	.user {
		background-color: #f59c04;
		color: black;
		margin-left: auto;
	}
</style>
