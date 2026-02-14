<script lang="ts">
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';
	import { words, filteredWords, filterMinPoints, filterMaxPoints } from '$lib/stores';

	let ready = false;

	const applyFilters = () => {
		const minEl = document.getElementById('min-points') as HTMLInputElement | null;
		const maxEl = document.getElementById('max-points') as HTMLInputElement | null;
		const minPoints = parseInt(minEl?.value ?? '0');
		const maxPoints = parseInt(maxEl?.value ?? '100');
		$filterMinPoints = minPoints;
		$filterMaxPoints = maxPoints;
		$filteredWords = $words.filter(word => word.points >= minPoints && word.points <= maxPoints);
		console.log($filteredWords);
	}

	onMount(() => {
		ready = true;
	});
</script>

<div class="container" in:fly={{ y: -50, duration: 600 }}>
	<h1>Filters</h1>
	<h5>Filter words by points.</h5>
	<button onclick={() => goto('/learn')}>Back to Learning	Mode</button>
	<div class="filters">
		<div class="filter">
			<label for="min-points">Minimum Points</label>
			<input type="number" id="min-points" value={$filterMinPoints} max="100" min="0" />
		</div>
		<div class="filter">
			<label for="max-points">Maximum Points</label>
			<input type="number" id="max-points" value={$filterMaxPoints} max="100" min="0" />
		</div>
		<button onclick={() => applyFilters()}>Apply Filters</button>
	</div>
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

	.filters {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		padding: 1rem;
		border: 5px solid black;
		border-radius: 5px;
		max-width: fit-content;
	}
</style>
