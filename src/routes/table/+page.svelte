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
						<td class="pos">{item.partOfSpeech}</td>
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
		min-height: calc(100vh - 164px);
		gap: var(--space-xl);
		padding-bottom: var(--space-md);
		padding-top: var(--space-xl);
	}

	h1 {
		margin-bottom: 0;
		background: var(--header-bg);
		border: none;
		border-left: 4px solid var(--header-border);
		border-radius: var(--radius-lg);
		padding: var(--space-lg) var(--space-xl);
		display: flex;
		gap: var(--space-md);
		justify-content: space-between;
		align-items: center;
		flex-wrap: wrap;
		box-shadow: var(--shadow-sm);
	}

	table {
		border-collapse: collapse;
		width: 100%;
		display: flex;
		flex-direction: column;
		border-radius: var(--radius-xl);
		overflow: hidden;
		box-shadow: var(--shadow-md);
		border: 1px solid var(--border-color);
	}

	thead {
		display: table;
		table-layout: fixed;
		width: 100%;
		background: var(--header-bg);
	}

	thead th {
		font-weight: 700;
		color: var(--text-tertiary);
		cursor: pointer;
		user-select: none;
		transition: background var(--transition-fast);
		letter-spacing: 0.06em;
		text-transform: uppercase;
		font-size: var(--text-sm);
	}

	thead th:hover {
		background: var(--accent-blue-subtle);
		color: var(--accent-blue);
	}

	.sort-arrow {
		margin-left: var(--space-xs);
		font-size: var(--text-sm);
	}

	tbody {
		display: block;
		width: 100%;
		background: var(--bg-primary);
		scrollbar-gutter: stable;
	}

	tbody tr {
		display: table;
		width: 100%;
		table-layout: fixed;
		background: var(--card-bg);
		transition: all var(--transition-fast);
	}

	tbody tr:hover {
		background: var(--accent-blue-subtle);
		transform: translateX(3px);
	}

	th,
	td {
		border: 1px solid var(--border-color);
		padding: var(--space-sm) var(--space-md);
		text-align: left;
		width: 33.33%;
	}

	.pos {
		font-style: italic;
		color: var(--text-tertiary);
	}
</style>
