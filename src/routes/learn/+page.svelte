<script lang="ts">
    import { onMount } from 'svelte';
    import { fade } from 'svelte/transition';
    import * as spanishData from '$lib/data/spanish.json';

    let duration = $state(800);
    let ready = $state(false);
    let learningMode = $state('table');
    const categories = ['basics', 'numbers', 'beginner', 'intermediate', 'advanced'] as const;
    let selectedCategory = $state<typeof categories[number]>(categories[0]);
    let flippedCards = $state<Set<number>>(new Set());

    // Reset flipped cards when category changes
    $effect(() => {
        selectedCategory;
        flippedCards = new Set();
    });

    const columns = ['Spanish', 'English', 'Part of Speech'];

	onMount(() => {
		ready = true;
	});

    const toggleFlip = (index: number) => {
        if (flippedCards.has(index)) {
            flippedCards.delete(index);
        } else {
            flippedCards.add(index);
        }
        // Trigger reactivity
        flippedCards = new Set(flippedCards);
    };
</script>

{#if ready}
	<div class="container" in:fade={{ duration }}>
		<div class="toolbar">
			<select bind:value={learningMode}>
                <option value="table">Table</option>
                <option value="cards">Cards</option>
            </select>
            <select bind:value={selectedCategory}>
                {#each categories as category}
                    <option value={category}>{category.charAt(0).toUpperCase() + category.slice(1)}</option>
                {/each}
            </select>
		</div>
        {#if learningMode === 'table'}
            <table>
                <thead>
                <tr>
                    {#each columns as column}
                        <th>{column}</th>
                    {/each}
                </tr>
                </thead>
               <tbody>
                {#each spanishData[selectedCategory as keyof typeof spanishData] as item}
                    <tr>
                        <td>{item.spanish}</td>
                        <td>{item.english}</td>
                        <td>{item.partOfSpeech}</td>
                    </tr>
                {/each}
               </tbody>
            </table>
        {:else if learningMode === 'cards'}
            {#each spanishData[selectedCategory as keyof typeof spanishData] as item, index}
                <div
                    class="flashcard-container"
                    onclick={() => toggleFlip(index)}
                    role="button"
                    tabindex="0"
                    onkeydown={(e) => e.key === 'Enter' && toggleFlip(index)}
                >
                    <div class="flashcard" class:flipped={flippedCards.has(index)}>
                        <div class="flashcard-front">
                            <h2>{item.spanish}</h2>
                        </div>
                        <div class="flashcard-back">
                            <h2>{item.english}</h2>
                            <p>{item.partOfSpeech}</p>
                        </div>
                    </div>
                </div>
            {/each}
        {/if}
	</div>
{/if}

<style>
    .toolbar {
        display: flex;
        gap: 1rem;
        flex-wrap: wrap;
    }

    .container {
        max-width: 600px;
        display: flex;
        justify-content: center;
        flex-direction: column;
        gap: 2.074rem;
        min-height: calc(100vh - 164px);
    }

    table {
        border-collapse: collapse;
        width: 100%;
        display: flex;
        flex-direction: column;
    }

    thead {
        display: table;
        table-layout: fixed;
        width: 100%;
        background: white;
    }

    tbody {
        display: block;
        width: 100%;
        background: lightyellow;
        scrollbar-gutter: stable;
    }

    tbody tr {
        display: table;
        width: 100%;
        table-layout: fixed;
        background: white;
    }

    tbody tr:hover {
        background: #f0e68c;
    }

    th, td {
        border: 1px solid black;
        padding: 11.11px;
        text-align: left;
        width: 33.33%;
    }

    .flashcard-container {
        perspective: 1000px;
        cursor: pointer;
        min-height: 150px;
    }

    .flashcard {
        position: relative;
        width: 100%;
        min-height: 150px;
        transition: transform 0.6s;
        transform-style: preserve-3d;
    }

    .flashcard.flipped {
        transform: rotateY(180deg);
    }

    .flashcard-front,
    .flashcard-back {
        position: absolute;
        width: 100%;
        height: 100%;
        min-height: 150px;
        backface-visibility: hidden;
        border: 2px solid black;
        border-radius: 5px;
        padding: 1rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        text-align: center;
    }

    .flashcard-front {
        background: lightyellow;
    }

    .flashcard-back {
        background: #add8e6;
        transform: rotateY(180deg);
    }

    .flashcard-container:hover .flashcard-front,
    .flashcard-container:hover .flashcard-back {
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    }

    /* Dark Mode Styles */
    :global(body.dark-mode) .flashcard-front {
        background: #2a2a2a;
        color: #e0e0e0;
        border-color: #444;
    }

    :global(body.dark-mode) .flashcard-back {
        background: #1e3a5f;
        color: #e0e0e0;
        border-color: #444;
    }

    :global(body.dark-mode) thead {
        background: #2a2a2a;
        color: #e0e0e0;
    }

    :global(body.dark-mode) tbody {
        background: #121212;
    }

    :global(body.dark-mode) tbody tr {
        background: #2a2a2a;
        color: #e0e0e0;
    }

    :global(body.dark-mode) tbody tr:hover {
        background: #3a3a3a;
    }

    :global(body.dark-mode) th,
    :global(body.dark-mode) td {
        border-color: #444;
    }

    :global(body.dark-mode) select {
        background: #2a2a2a;
        color: #e0e0e0;
        border: 1px solid #444;
    }
</style>
