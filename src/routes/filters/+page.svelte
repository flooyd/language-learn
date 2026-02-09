<script lang="ts">
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';

	let ready = false;

	onMount(() => {
		ready = true;
	});
</script>

<div class="container" in:fly={{ y: -50, duration: 600 }}>
	<h1>Filters</h1>
	<h5>Filter by points, category, and learning level.</h5>
	<button onclick={() => goto('/learn')}>Back to Learn</button>
</div>

<style>
	.container {
		max-width: 1000px;
		display: flex;
		flex-direction: column;
		gap: 2.074rem;
		min-height: calc(100vh - 164px);
		padding-bottom: 2.074rem;
	}

	h1 {
		margin-bottom: 0px;
	}
</style>
