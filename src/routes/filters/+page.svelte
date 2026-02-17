<script lang="ts">
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';
	import { words, filteredWords, filterMinPoints, filterMaxPoints } from '$lib/stores';

	let ready = false;

	const applyFilters = () => {
		localStorage.setItem('filterMinPoints', $filterMinPoints.toString());
		localStorage.setItem('filterMaxPoints', $filterMaxPoints.toString());
		$filteredWords = $words.filter(
			(word) => word.points >= $filterMinPoints && word.points <= $filterMaxPoints
		);
	};

	const clearFilters = () => {
		$filterMinPoints = 0;
		$filterMaxPoints = 100;

		localStorage.setItem('filterMinPoints', $filterMinPoints.toString());
		localStorage.setItem('filterMaxPoints', $filterMaxPoints.toString());
	};

	onMount(() => {
		ready = true;
	});

	$effect(() => {
		$filterMinPoints;
		$filterMaxPoints;

		applyFilters();
	});
</script>

<div class="container" in:fly={{ y: -50, duration: 600 }}>
	<h1>Filters</h1>
	<h5>Filter words by points.</h5>
	<button onclick={() => goto('/learn')}>Back to Learning Mode</button>
	<div class="filters">
		<div class="filter">
			<label for="min-points">Minimum Points</label>
			<input type="number" id="min-points" bind:value={$filterMinPoints} max="100" min="0" />
		</div>
		<div class="filter">
			<label for="max-points">Maximum Points</label>
			<input type="number" id="max-points" bind:value={$filterMaxPoints} max="100" min="0" />
		</div>
		<button onclick={() => clearFilters()}>Clear Filters</button>
	</div>
</div>

<style>
	.container {
		max-width: 1000px;
		display: flex;
		flex-direction: column;
		gap: var(--space-xl);
		min-height: calc(100vh - 164px);
		padding-bottom: var(--space-3xl);
		padding-top: var(--space-xl);
	}

	h1 {
		margin-bottom: 0;
		background: var(--header-bg);
		border: none;
		border-left: 4px solid var(--header-border);
		border-radius: var(--radius-lg);
		padding: var(--space-lg) var(--space-xl);
		box-shadow: var(--shadow-sm);
	}

	.filters {
		display: flex;
		flex-direction: column;
		gap: var(--space-md);
		padding: var(--space-xl);
		border: 1px solid var(--border-color);
		border-radius: var(--radius-xl);
		max-width: fit-content;
		background: var(--card-bg);
		box-shadow: var(--shadow-md);
	}

	.filter {
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
	}

	.filter label {
		font-weight: 700;
		color: var(--text-primary);
	}

	.filter input {
		padding: var(--space-sm) var(--space-md);
		border: 1.5px solid var(--input-border);
		border-radius: var(--radius-md);
		font-size: var(--text-base);
		background: var(--input-bg);
		color: var(--text-primary);
		transition: all var(--transition-base);
	}

	.filter input:focus {
		outline: none;
		border-color: var(--accent-blue);
		box-shadow: 0 0 0 3px var(--accent-blue-subtle);
	}
</style>
