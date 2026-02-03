<script lang="ts">
    import { onMount } from 'svelte';
    import { fade } from 'svelte/transition';
    import * as spanishData from '$lib/data/spanish.json';

    let duration = $state(800);
    let ready = $state(false);
    let learningMode = $state('table');
    const categories = ['basics', 'numbers', 'beginner', 'intermediate', 'advanced'] as const;
    let selectedCategory = $state<typeof categories[number]>(categories[0]);
    
    const columns = ['Spanish', 'English', 'Part of Speech'];

	onMount(() => {
		ready = true;
	});
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
            {#each spanishData[selectedCategory as keyof typeof spanishData] as item}
                <div class="flashcard">
                    <h2>{item.spanish}</h2>
                    <p>{item.english} - {item.partOfSpeech}</p>
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
        display: flex;
        flex-direction: column;
    }

    thead {
        display: table;
        table-layout: fixed;
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
        width: fit-content;
    }

    .flashcard {
        border: 2px solid black;
        border-radius: 5px;
        padding: 1rem;
        background: lightyellow;
    }

    .flashcard:hover {
        background: #f0e68c;
    }
</style>
