<script>
	import { onMount } from 'svelte';
	import { fade, fly } from 'svelte/transition';

	let duration = $state(800);
	let ready = $state(false);

	onMount(() => {
		ready = true;
	});
</script>

{#if ready}
	<div class="intro" in:fade={{ duration }}>
		<h1>Welcome to Language Learn</h1>
		<h3>Learn Spanish and other languages using a table or flashcards.</h3>
        <button><h3>Start Learning</h3></button>
	</div>
{/if}

<style>
	.intro {
		text-align: center;
		display: flex;
		flex-direction: column;
		justify-content: center;
		height: calc(100vh - 142.954px);
	}

	.intro h1 {
		background: #add8e6;
		padding: 10px;
		width: fit-content;
		border: 3px solid black;

	}

	.intro h3 {
		background: #f0e68c;
		padding: 10px;
		max-width: 638.25px;
		text-align: left;
		border: 3px solid black;
	}

    .intro button h3 {
        padding: 0px;
        margin: 0px;
        background: black;
    }

	@media (max-width: 768px) {
		.intro h3 {
			max-width: 318.19px;
		}
	}
</style>
