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

		if ($selectedCategory && $selectedMode) {
			switch ($selectedMode) {
				case 'table':
					('Navigating to table...');
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
				default:
					ready = true;
			}
		} else if ($selectedMode && !$selectedCategory) {
			goto('/categories');
		} else {
			ready = true;
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
		gap: var(--space-xl);
		padding-bottom: var(--space-md);
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

	.container > button {
		background: none;
		border: none;
		padding: 0;
		cursor: pointer;
		font-family: inherit;
		font-size: inherit;
	}

	.container > button:hover {
		box-shadow: none;
	}

	@media (max-width: 768px) {
		.container {
			max-width: 100%;
		}
	}
</style>
