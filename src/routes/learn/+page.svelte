<script lang="ts">
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';
	import { language } from '$lib/stores';
	
	let ready = $state(false);
	const categories = [
		'basics',
		'numbers',
		'beginner',
		'intermediate',
		'advanced',
		'custom'
	] as const;

	let flippedCards = $state<Set<number>>(new Set());

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
	<div class="container">
		<h1 in:fly={{ y: -50, duration: 600, delay: 0 }}>
			How would you like to learn {$language}? <button>Change Language</button>
		</h1>
		<a href="/table">
			<h5 in:fly={{ y: -30, duration: 600, delay: 150 }}>Table</h5>
		</a>
		<h5 in:fly={{ y: -30, duration: 600, delay: 150 }}>Flashcards</h5>
		<h5 in:fly={{ y: -30, duration: 600, delay: 150 }}>Quizzes (coming soon)</h5>
		<h5 in:fly={{ y: -30, duration: 600, delay: 150 }}>Sentences (coming soon)</h5>

		<!-- {#if learningMode === 'cards' && showHint}
			<div class="hint" in:fly={{ y: -20, duration: 600, delay: 300 }}>
				<strong>Tip:</strong> Click any card to flip and reveal the translation
				<button onclick={() => (showHint = false)}>Okay</button>
			</div>
		{/if}

		<div class="content" in:fly={{ y: -10, duration: 600, delay: 350 }}>
			{#if learningMode === 'table'}
				
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
		</div> -->
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
		border-radius: 5px;
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
		transition:
			opacity 0.3s ease,
			transform 0.3s ease;
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
