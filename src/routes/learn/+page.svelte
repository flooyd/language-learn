<script lang="ts">
    import { onMount } from 'svelte';
    import { fade, fly } from 'svelte/transition';
    import * as spanishData from '$lib/data/spanish.json';

    let ready = $state(false);
    let learningMode = $state('table');
    const categories = ['basics', 'numbers', 'beginner', 'intermediate', 'advanced'] as const;
    let selectedCategory = $state<typeof categories[number]>(categories[0]);
    let flippedCards = $state<Set<number>>(new Set());
    let sortColumn = $state<string | null>(null);
    let sortDirection = $state<'asc' | 'desc' | null>(null);
    let showHint = $state(true);

    // Reset flipped cards and sort state when category changes
    $effect(() => {
        selectedCategory;
        flippedCards = new Set();
        sortColumn = null;
        sortDirection = null;
    });

    const columns = ['Spanish', 'English', 'Part of Speech'];

    // Get word count for current category
    let wordCount = $derived(spanishData[selectedCategory as keyof typeof spanishData].length);

    // Get emoji for category
    const getCategoryEmoji = (cat: string) => {
        const emojis: Record<string, string> = {
            basics: '🌱',
            numbers: '🔢',
            beginner: '📚',
            intermediate: '📖',
            advanced: '🎓'
        };
        return emojis[cat] || '📝';
    };

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

    // Handle column header click for sorting
    const handleSort = (column: string) => {
        if (sortColumn === column) {
            // Cycle through: null -> asc -> desc -> null
            if (sortDirection === null) {
                sortDirection = 'asc';
            } else if (sortDirection === 'asc') {
                sortDirection = 'desc';
            } else {
                sortDirection = null;
                sortColumn = null;
            }
        } else {
            sortColumn = column;
            sortDirection = 'asc';
        }
    };

    // Get sorted data for current category
    let sortedData = $derived.by(() => {
        const data = [...spanishData[selectedCategory as keyof typeof spanishData]];

        if (!sortColumn || !sortDirection) {
            return data;
        }

        return data.sort((a, b) => {
            let aValue: string;
            let bValue: string;

            // Map column name to data property
            if (sortColumn === 'Spanish') {
                aValue = a.spanish;
                bValue = b.spanish;
            } else if (sortColumn === 'English') {
                aValue = a.english;
                bValue = b.english;
            } else { // Part of Speech
                aValue = a.partOfSpeech;
                bValue = b.partOfSpeech;
            }

            const comparison = aValue.localeCompare(bValue);
            return sortDirection === 'asc' ? comparison : -comparison;
        });
    });
</script>

{#if ready}
	<div class="container">
		<div class="header" in:fly={{ y: -50, duration: 600, delay: 0 }}>
			<h1>Learn Spanish</h1>
			<p class="description">Master Spanish vocabulary with interactive learning modes.</p>
		</div>

		<div class="controls" in:fly={{ y: -30, duration: 600, delay: 150 }}>
			<div class="toolbar">
                <div class="control-group">
                    <label for="mode-select">Mode</label>
                    <select id="mode-select" bind:value={learningMode}>
                        <option value="table">📊 Table View</option>
                        <option value="cards">🎴 Flashcards</option>
                    </select>
                </div>
                <div class="control-group">
                    <label for="category-select">Category</label>
                    <select id="category-select" bind:value={selectedCategory}>
                        {#each categories as category}
                            <option value={category}>
                                {getCategoryEmoji(category)} {category.charAt(0).toUpperCase() + category.slice(1)}
                            </option>
                        {/each}
                    </select>
                </div>
			</div>

			<div class="stats-badge">
				<span class="word-count">{wordCount}</span>
				<span class="label">words</span>
			</div>
		</div>

		{#if learningMode === 'cards' && showHint}
			<div class="hint" in:fly={{ y: -20, duration: 600, delay: 300 }}>
				<strong>Tip:</strong> Click any card to flip and reveal the translation
                <button onclick={() => (showHint = false)}>Okay</button>
			</div>
		{/if}

        <div class="content" in:fly={{ y: -10, duration: 600, delay: 350 }}>
			{#if learningMode === 'table'}
            <table>
                <thead>
                <tr>
                    {#each columns as column}
                        <th
                            onclick={() => handleSort(column)}
                            role="button"
                            tabindex="0"
                            onkeydown={(e) => e.key === 'Enter' && handleSort(column)}
                        >
                            {column}
                            {#if sortColumn === column && sortDirection === 'asc'}
                                <span class="sort-arrow">▲</span>
                            {:else if sortColumn === column && sortDirection === 'desc'}
                                <span class="sort-arrow">▼</span>
                            {/if}
                        </th>
                    {/each}
                </tr>
                </thead>
               <tbody>
                {#each sortedData as item}
                    <tr>
                        <td>{item.spanish}</td>
                        <td>{item.english}</td>
                        <td>{item.partOfSpeech}</td>
                    </tr>
                {/each}
               </tbody>
            </table>
			{:else if learningMode === 'cards'}
				<div class="cards-grid">
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
									<div class="flip-indicator">↻</div>
								</div>
								<div class="flashcard-back">
									<h2>{item.english}</h2>
									<p>{item.partOfSpeech}</p>
								</div>
							</div>
						</div>
					{/each}
				</div>
			{/if}
		</div>
	</div>
{/if}

<style>
    .container {
        max-width: 1000px;
        display: flex;
        flex-direction: column;
        gap: 2.074rem;
        min-height: calc(100vh - 164px);
        padding-bottom: 2.074rem;
    }

    .header {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }

    .header h1 {
        margin-bottom: 0px;
    }

    .description {
        color: #666;
        font-size: 1.1rem;
        margin: 0;
    }

    .controls {
        background: white;
        border: 3px solid black;
        border-radius: 5px;;
        padding: 1.5rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 1.5rem;
        flex-wrap: wrap;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    .toolbar {
        display: flex;
        gap: 1.5rem;
        flex-wrap: wrap;
        flex: 1;
    }

    .control-group {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }

    .control-group label {
        font-weight: bold;
        font-size: 0.9rem;
        color: #666;
    }

    .control-group select {
        padding: 10px;
        border: 2px solid #ccc;
        border-radius: 5px;
        font-size: 1rem;
        cursor: pointer;
        background: white;
        transition: border-color 0.3s ease;
        min-width: 180px;
    }

    .control-group select:hover {
        border-color: #4a90e2;
    }

    .control-group select:focus {
        outline: none;
        border-color: #4a90e2;
        box-shadow: 0 0 0 3px rgba(173, 216, 230, 0.2);
    }

    .stats-badge {
        background: #f0e68c;
        border: 3px solid black;
        border-radius: 5px;;
        padding: 0.75rem 1.5rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.25rem;
    }

    .word-count {
        font-size: 1.8rem;
        font-weight: bold;
        color: black;
        line-height: 1;
    }

    .stats-badge .label {
        font-size: 0.85rem;
        color: #666;
        font-weight: 500;
    }

    .hint {
        background: #4a90e2;
        border: 3px solid black;
        border-radius: 5px;;
        padding: 1rem 1.5rem;
        color: black;
        font-size: 1rem;
    }

    .hint strong {
        font-weight: bold;
    }

    .content {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
    }

    .cards-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
        gap: 1.5rem;
    }

    table {
        border-collapse: collapse;
        width: 100%;
        display: flex;
        flex-direction: column;
        border-radius: 5px;;
        overflow: hidden;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    thead {
        display: table;
        table-layout: fixed;
        width: 100%;
        background: #4a90e2;
    }

    thead th {
        font-weight: bold;
        color: black;
        cursor: pointer;
        user-select: none;
        transition: background 0.2s ease;
    }

    thead th:hover {
        background: #8cc4e0;
    }

    .sort-arrow {
        margin-left: 0.5rem;
        font-size: 0.8rem;
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
        transition: background 0.2s ease, transform 0.2s ease;
    }

    tbody tr:hover {
        background: #f0e68c;
        transform: translateX(3px);
    }

    th, td {
        border: 2px solid black;
        padding: 12px;
        text-align: left;
        width: 33.33%;
    }

    .flashcard-container {
        perspective: 1000px;
        cursor: pointer;
        min-height: 180px;
    }

    .flashcard {
        position: relative;
        width: 100%;
        min-height: 180px;
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
        min-height: 180px;
        backface-visibility: hidden;
        border: 3px solid black;
        border-radius: 5px;;
        padding: 1.5rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        text-align: center;
        gap: 0.5rem;
        transition: box-shadow 0.3s ease;
    }

    .flashcard-front {
        background: lightyellow;
    }

    .flashcard-back {
        background: #4a90e2;
        transform: rotateY(180deg);
    }

    .flashcard-front h2,
    .flashcard-back h2 {
        margin: 0;
        font-size: 1.8rem;
    }

    .flashcard-back p {
        margin: 0;
        font-size: 1.1rem;
        color: #333;
        font-style: italic;
    }

    .flip-indicator {
        position: absolute;
        bottom: 10px;
        right: 10px;
        font-size: 1.2rem;
        opacity: 0.5;
        transition: opacity 0.3s ease, transform 0.3s ease;
    }

    .flashcard-container:hover .flip-indicator {
        opacity: 1;
        transform: rotate(180deg);
    }

    .flashcard-container:hover .flashcard-front,
    .flashcard-container:hover .flashcard-back {
        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    }

    /* Dark Mode Styles */
    :global(body.dark-mode) .description {
        color: #e0e0e0;
    }

    :global(body.dark-mode) .controls {
        background: #2a2a2a;
        border-color: #444;
    }

    :global(body.dark-mode) .control-group label {
        color: #e0e0e0;
    }

    :global(body.dark-mode) .control-group select {
        background: #1a1a1a;
        color: #e0e0e0;
        border-color: #444;
    }

    :global(body.dark-mode) .control-group select:hover,
    :global(body.dark-mode) .control-group select:focus {
        border-color: #4a90e2;
    }

    :global(body.dark-mode) .stats-badge {
        background: #2a2a2a;
        border-color: #444;
    }

    :global(body.dark-mode) .word-count {
        color: #4a90e2;
    }

    :global(body.dark-mode) .stats-badge .label {
        color: #e0e0e0;
    }

    :global(body.dark-mode) .hint {
        background: #1e3a5f;
        border-color: #4a90e2;
        color: #e0e0e0;
    }

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

    :global(body.dark-mode) .flashcard-back p {
        color: #e0e0e0;
    }

    :global(body.dark-mode) thead {
        background: #1e3a5f;
        color: #e0e0e0;
    }

    :global(body.dark-mode) thead th:hover {
        background: #2a4a6f;
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

    @media (max-width: 768px) {
        .container {
            max-width: 100%;
        }

        .controls {
            flex-direction: column;
            align-items: stretch;
        }

        .toolbar {
            flex-direction: column;
            width: 100%;
        }

        .control-group select {
            width: 100%;
        }

        .stats-badge {
            align-self: center;
        }

        .cards-grid {
            grid-template-columns: 1fr;
        }
    }
</style>
