<script lang="ts">
	import { goto } from '$app/navigation';
	import H1Buttons from '$lib/components/H1Buttons.svelte';
	import * as spanishData from '$lib/data/spanish.json';
	import { selectedCategory } from '$lib/stores';
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';

	let ready = $state(false);
    let sortColumn = $state<string | null>(null);
	let sortDirection = $state<'asc' | 'desc' | null>(null);

    const columns = ['Spanish', 'English', 'Part of Speech'];

    $effect(() => {
		$selectedCategory;
		sortColumn = null;
		sortDirection = null;
	});

    let sortedData = $derived.by(() => {
		const data = $derived.by(() => spanishData[$selectedCategory as keyof typeof spanishData]);

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
			} else {
				// Part of Speech
				aValue = a.partOfSpeech;
				bValue = b.partOfSpeech;
			}

			const comparison = aValue.localeCompare(bValue);
			return sortDirection === 'asc' ? comparison : -comparison;
		});
	});

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

	onMount(() => {
		console
		ready = true;
	});
</script>

{#if ready}
	<div class="container">
		<h1 in:fly={{ y: -50, duration: 600, delay: 0 }}>
			Table 
			<H1Buttons/>
		</h1>
		<h5 in:fly={{ y: -30, duration: 600, delay: 150 }}>
			Learn words in a structured format with Table.
		</h5>

		<table in:fly={{ y: -20, duration: 600, delay: 300 }}>
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
	</div>
{/if}

<style>
    .container {
        display: flex;
        flex-direction: column;
        gap: 2.074rem;
    }

    h1 {
        margin-bottom: 0px;
        background: #f0e68c;
        border: 5px solid black;
        border-radius: 5px;
        padding: 1rem;
        display: flex;
        gap: 1rem;
        justify-content: space-between;
        align-items: center;
		flex-wrap: wrap;
    }

	table {
		border-collapse: collapse;
		width: 100%;
		display: flex;
		flex-direction: column;
		border-radius: 5px;
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
		transition:
			background 0.2s ease,
			transform 0.2s ease;
	}

	tbody tr:hover {
		background: #f0e68c;
		transform: translateX(3px);
	}

	th,
	td {
		border: 2px solid black;
		padding: 12px;
		text-align: left;
		width: 33.33%;
	}

	/* Dark Mode Styles */
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
</style>
