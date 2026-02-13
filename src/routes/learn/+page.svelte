<script lang="ts">
	import { fly } from 'svelte/transition';
	import { selectedCategory, selectedMode, selectedLanguage, wordPoints } from '$lib/stores';
	import { goto } from '$app/navigation';

	let ready = $state(false);

	const handleSelectMode = (mode: string) => {
		$selectedMode = mode;
		localStorage.setItem('selectedMode', mode);
	};

	$effect(() => {
		$selectedCategory;
		$selectedMode;
		ready = true;

		console.log('Selected Category:', $selectedCategory);
		console.log('Selected Mode:', $selectedMode);

		if ($selectedCategory && $selectedMode) {
			console.log('Both category and mode are selected. Navigating...');
			switch ($selectedMode) {
				case 'table':
					console.log('Navigating to table...');
					goto('/table');
					break;
				case 'flashcards':
					goto('/flashcards');
					break;
				case 'quizzes':
					goto('/quizzes');
					break;
				case 'sentences':
					goto('/sentences');
					break;
				case 'custom':
					goto('/custom');
					break;
				default:
					goto('/learn');
			}
		} else if ($selectedMode && !$selectedCategory) {
			goto('/categories');
		} else if (!$selectedMode && $selectedCategory) {
			goto('/learn');
		} else {
			goto('/learn');
		}
	});
</script>

{#if ready}
	<div class="container">
		<h1 in:fly={{ y: -50, duration: 600, delay: 0 }}>
			How would you like to learn {($selectedLanguage.charAt(0).toUpperCase() + $selectedLanguage.slice(1))}? <button>Change Language</button>
		</h1>
		<button
			onclick={() => handleSelectMode('table')}
			in:fly={{ y: -30, duration: 600, delay: 150 }}
		>
			<h5>Table</h5>
		</button>
		<button
			onclick={() => handleSelectMode('flashcards')}
			in:fly={{ y: -30, duration: 600, delay: 150 }}
		>
			<h5>Flashcards</h5>
		</button>
		<button
			onclick={() => handleSelectMode('quizzes')}
			in:fly={{ y: -30, duration: 600, delay: 150 }}
		>
			<h5>Quizzes</h5>
		</button>
		<button
			onclick={() => handleSelectMode('sentences')}
			in:fly={{ y: -30, duration: 600, delay: 150 }}
		>
			<h5>Sentences</h5>
		</button>
	</div>
{/if}

<style>
	.container {
		display: flex;
		flex-direction: column;
		min-height: calc(100vh - 164px);
		gap: 1.44rem;
		padding-bottom: 1rem;
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

	.container > button {
		background: none;
		border: none;
		padding: 0;
		cursor: pointer;
		font-family: inherit;
		font-size: inherit;
	}

	@media (max-width: 768px) {
		.container {
			max-width: 100%;
		}
	}
</style>
