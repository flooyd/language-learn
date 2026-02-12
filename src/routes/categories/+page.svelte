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
		'custom'
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
		gap: 2.074rem;
		min-height: calc(100vh - 164px);
		padding-bottom: 2.074rem;
	}

	h1 {
		margin-bottom: 0px;
		display: flex;
		background: #f0e68c;
		border: 5px solid black;
		border-radius: 5px;
		padding: 1rem;
		gap: 1rem;
		justify-content: space-between;
		align-items: center;
	}

	h5:hover {
		color: #4a90e2;
		cursor: pointer;
	}
</style>
