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
			<button
				class="mode-button"
				class:active={learningMode === 'table'}
				onclick={() => (learningMode = 'table')}>Table</button
			>
			<button
				class="mode-button"
				class:active={learningMode === 'flashcards'}
				onclick={() => (learningMode = 'flashcards')}>Flash</button
			>
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
        {:else if learningMode === 'flashcards'}
            <h2>Learning Mode: Flashcards</h2>
            <!-- Flashcards learning content goes here -->
        {/if}
	</div>
{/if}

<style>
    .toolbar {
        display: flex;
        gap: 1rem;
        flex-wrap: wrap;
    }

    .mode-button.active {
        background-color: #add8e6;
        color: black;
    }

    .container {
        max-width: 600px;
        display: flex;
        justify-content: center;
        flex-direction: column;
        gap: 2.074rem;
        height: calc(100vh - 164px);
    }

    table {
        border-collapse: collapse;
        display: flex;
        flex-direction: column;
    }

    thead {
        display: table;
        width: calc(100% - 17px);
        table-layout: fixed;
        background: white;
    }

    tbody {
        display: block;
        height: calc(100vh - 293.89px);
        overflow-y: scroll;
        width: 100%;
        background: lightyellow;
        scrollbar-gutter: stable;
    }

    tbody::-webkit-scrollbar {
        width: 17px;
    }

    tbody::-webkit-scrollbar-track {
        background: lightyellow;
    }

    tbody::-webkit-scrollbar-thumb {
        background: #add8e6;
        border-radius: 5px;
    }

    tbody::-webkit-scrollbar-thumb:hover {
        background: #999;
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
</style>
