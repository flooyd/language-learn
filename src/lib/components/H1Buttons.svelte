<script lang="ts">
	import { goto } from '$app/navigation';
	import { filterMaxPoints, filterMinPoints, selectedCategory, selectedMode } from '$lib/stores';

	export let showFilters = true;

	const handleClickModes = () => {
		$selectedMode = '';
		localStorage.setItem('selectedMode', '');
		goto('/learn');
	};

	const handleClickCategories = () => {
		$selectedCategory = '';
		goto('/categories');
	};

	const handleClickFilters = () => {
		goto('/filters');
	};
</script>

<div class="h1-buttons">
	{#if showFilters}<button
			class={$filterMinPoints > 0 || $filterMaxPoints < 100 ? 'active' : ''}
			onclick={() => handleClickFilters()}>Filters</button
		>{/if}
	<button onclick={() => handleClickModes()}>Modes</button>
	<button onclick={() => handleClickCategories()}>Categories</button>
</div>

<style>
	.h1-buttons {
		display: flex;
		gap: var(--space-sm);
		flex-wrap: wrap;
	}

	.h1-buttons button {
		padding: var(--space-xs) var(--space-md);
		font-size: var(--text-sm);
		font-weight: 600;
		border-radius: var(--radius-md);
		border: 1.5px solid var(--border-color-strong);
		background: var(--card-bg);
		transition: all var(--transition-base);
	}

	.h1-buttons button:hover {
		background: var(--accent-blue-subtle);
		border-color: var(--accent-blue);
		box-shadow: var(--shadow-sm);
	}

	.active {
		background-color: var(--accent-blue) !important;
		color: var(--accent-blue-text) !important;
		border-color: var(--accent-blue) !important;
	}
</style>
