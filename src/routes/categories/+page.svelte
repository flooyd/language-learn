<script lang="ts">
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';
    import {selectedCategory} from '$lib/stores';

	let ready = $state(false);

	const categories = [
		'basics',
		'numbers',
		'beginner',
		'intermediate',
		'advanced',
	] as const;

	const handleSelectCategory = (category: string) => {
		$selectedCategory = category;
		localStorage.setItem('selectedCategory', category);
	};

	onMount(() => {
		ready = true;
	});
</script>

{#if ready}
	<div class="container">
		<h1 in:fly={{ y: -50, duration: 600, delay: 0 }}>
			Which category would you like to learn?
            <button>Change Language</button>
		</h1>
		{#each categories as category, index}
            <a href="/learn" onclick={() => handleSelectCategory(category)}>
                <h5 in:fly={{ y: -30, duration: 600, delay: 150 + index * 100 }}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                </h5>
            </a>
        {/each}
	</div>
{/if}

<style>
	.container {
		display: flex;
		flex-wrap: wrap;
		flex-direction: column;
		gap: var(--space-xl);
		min-height: calc(100vh - 164px);
		padding-bottom: var(--space-3xl);
		padding-top: var(--space-xl);
	}

	h1 {
		margin-bottom: 0;
		display: flex;
		background: var(--header-bg);
		border: none;
		border-left: 4px solid var(--header-border);
		border-radius: var(--radius-lg);
		padding: var(--space-lg) var(--space-xl);
		gap: var(--space-md);
		justify-content: space-between;
		align-items: center;
		box-shadow: var(--shadow-sm);
	}

	h5 {
		transition: color var(--transition-fast);
	}

	h5:hover {
		color: var(--accent-blue);
		cursor: pointer;
	}
</style>
