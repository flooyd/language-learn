<script lang="ts">
	import * as spanishData from '$lib/data/spanish.json';
	import { filteredWords, selectedCategory, selectedLanguage, selectedMode, wordPoints, words } from '$lib/stores';
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';
	import { updateWordPoints } from '$lib/util';
	import H1Buttons from '$lib/components/H1Buttons.svelte';

	let flippedCards = $state<Set<string>>(new Set());
	let ready = $state(false);
	let flashcardSingle = $state(false);
	let currentCardIndex = $state(0);
	let displayList = $state<{ spanish: string; english: string; partOfSpeech: string; points: number }[]>([]);

	const toggleFlip = (wordId: string) => {
		if (flippedCards.has(wordId)) {
			flippedCards.delete(wordId);
		} else {
			flippedCards.add(wordId);
		}
		flippedCards = new Set(flippedCards);
	};

	const shuffleWords = () => {
		const list = displayList.length > 0 ? displayList : $filteredWords;
		displayList = [...list].sort(() => Math.random() - 0.5);
		currentCardIndex = 0;
		flippedCards = new Set();
	};

	const listForNav = $derived(displayList.length > 0 ? displayList : $filteredWords);

	const nextCard = () => {
		currentCardIndex = (currentCardIndex + 1) % listForNav.length;
		flippedCards = new Set();
	};

	const prevCard = () => {
		currentCardIndex = (currentCardIndex - 1 + listForNav.length) % listForNav.length;
		flippedCards = new Set();
	};

	// Sync displayList from store: shuffle when first populated; when a card is removed (list shrinks),
	// remove it from displayList so we keep the current shuffled order instead of reverting to original.
	$effect(() => {
		const list = $filteredWords;
		if (list.length === 0) return;
		if (displayList.length === 0) {
			displayList = [...list].sort(() => Math.random() - 0.5);
		} else if (list.length < displayList.length) {
			const stillInFilter = new Set(list.map((w) => w.spanish));
			displayList = displayList.filter((w) => stillInFilter.has(w.spanish));
		} else if (list.length > displayList.length) {
			displayList = [...list];
		}
	});

	// Clamp currentCardIndex when list shrinks.
	$effect(() => {
		const len = listForNav.length;
		if (len === 0) return;
		if (currentCardIndex >= len) {
			currentCardIndex = len - 1;
		}
	});

	onMount(() => {
		if (!$selectedMode) {
			window.location.href = '/learn';
		}
		if (!$selectedCategory) {
			window.location.href = '/categories';
		}
		ready = true;
	});
</script>

{#if ready}
	<div class="container">
		<h1 in:fly={{ y: -50, duration: 600, delay: 0 }}>
			Flashcards
			<H1Buttons />
		</h1>
		<h5 in:fly={{ y: -30, duration: 600, delay: 150 }}>
			Study words with Flashcards. Flip the card to see the English translation and part of speech.
			<div class="h5-buttons">
				<button onclick={() => shuffleWords()}>Shuffle</button>
				<button onclick={() => (flashcardSingle = !flashcardSingle)}>
					{flashcardSingle ? 'Show All' : 'Show One'}
				</button>
			</div>
		</h5>

		{#if flashcardSingle}
			{@const currentItem = listForNav[currentCardIndex]}
			<!-- Single Card View -->
			<div class="single-card-container" in:fly={{ y: -20, duration: 600, delay: 300 }}>
				<button class="nav-button prev" onclick={prevCard}>←</button>

				{#key currentItem.spanish}
					<div
						class="flashcard-container single"
						onclick={() => toggleFlip(currentItem.spanish)}
						role="button"
						tabindex="0"
						onkeydown={(e) => e.key === 'Enter' && toggleFlip(currentItem.spanish)}
					>
						<div class="flashcard {flippedCards.has(currentItem.spanish) ? 'flipped' : ''}">
							<div class="flashcard-front">
								<h2>{currentItem.spanish}</h2>
								<div class="flip-indicator">↻</div>
							</div>
							<div class="flashcard-back">
								<h2>{currentItem.english}</h2>
								<p>{currentItem.partOfSpeech}</p>
								<div class="points-buttons">
									<button
										onclick={(e) => {
											e.stopPropagation();
											updateWordPoints(
												currentItem[$selectedLanguage as keyof typeof currentItem],
												$selectedLanguage,
												true
											);
										}}
									>
										+10
									</button>
									<button
										onclick={(e) => {
											e.stopPropagation();
											updateWordPoints(
												currentItem[$selectedLanguage as keyof typeof currentItem],
												$selectedLanguage,
												false
											);
										}}
									>
										-10
									</button>
								</div>
								<div class="points">
									Points: {(
										$wordPoints.find(
											(wp: any) =>
												wp.word === currentItem[$selectedLanguage as keyof typeof currentItem] &&
												wp.language === $selectedLanguage
										) as { points: number } | undefined
									)?.points ?? 0}
								</div>
							</div>
						</div>
					</div>
				{/key}

				<button class="nav-button next" onclick={nextCard}>→</button>
			</div>
			<div class="card-counter">
				{currentCardIndex + 1} / {listForNav.length}
			</div>
		{:else}
			<!-- Grid View -->
			<div class="cards-grid">
				{#each listForNav as item, index (item.spanish)}
					<div
						class="flashcard-container"
						in:fly|global={{ y: -20, duration: 600, delay: 300 }}
						onclick={() => toggleFlip(item.spanish)}
						role="button"
						tabindex="0"
						onkeydown={(e) => e.key === 'Enter' && toggleFlip(item.spanish)}
					>
						<div class="flashcard {flippedCards.has(item.spanish) ? 'flipped' : ''}">
							<div class="flashcard-front">
								<h2>{item.spanish}</h2>
								<div class="flip-indicator">↻</div>
							</div>
							<div class="flashcard-back">
								<h2>{item.english}</h2>
								<p>{item.partOfSpeech}</p>
								<div class="points-buttons">
									<button
										onclick={(e) => {
											e.stopPropagation();
											updateWordPoints(
												item[$selectedLanguage as keyof typeof item],
												$selectedLanguage,
												true
											);
										}}
									>
										+10
									</button>
									<button
										onclick={(e) => {
											e.stopPropagation();
											updateWordPoints(
												item[$selectedLanguage as keyof typeof item],
												$selectedLanguage,
												false
											);
										}}
									>
										-10
									</button>
								</div>
								<div class="points">
									Points: {(
										$wordPoints.find(
											(wp: any) =>
												wp.word === item[$selectedLanguage as keyof typeof item] &&
												wp.language === $selectedLanguage
										) as { points: number } | undefined
									)?.points ?? 0}
								</div>
							</div>
						</div>
					</div>
				{/each}
			</div>
		{/if}
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

	h5 {
		display: flex;
		justify-content: space-between;
		gap: var(--space-md);
		align-items: center;
		flex-wrap: wrap;
	}

	.h5-buttons {
		display: flex;
		gap: var(--space-sm);
	}

	.single-card-container {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: var(--space-md);
		min-height: 300px;
	}

	.nav-button {
		font-size: var(--text-2xl);
		padding: var(--space-md);
		background: var(--accent-blue);
		color: var(--accent-blue-text);
		border: 1.5px solid var(--accent-blue);
		border-radius: var(--radius-lg);
		cursor: pointer;
		transition: all var(--transition-base);
		box-shadow: var(--shadow-md);
	}

	.nav-button:hover {
		background: var(--accent-blue-hover);
		transform: scale(1.08);
		box-shadow: var(--shadow-lg);
	}

	.card-counter {
		text-align: center;
		font-size: var(--text-lg);
		font-weight: 700;
		margin-top: var(--space-md);
		color: var(--text-secondary);
	}

	.flashcard-container.single {
		max-width: 600px;
		width: 100%;
	}

	.flashcard-container.single .flashcard-front,
	.flashcard-container.single .flashcard-back {
		min-height: 300px;
		font-size: var(--text-base);
	}

	.flashcard-container.single h2 {
		font-size: var(--text-2xl);
	}

	.cards-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
		gap: var(--space-md);
	}

	.flashcard-container {
		perspective: 1000px;
		cursor: pointer;
		min-height: 300px;
		width: 100%;
	}

	.flashcard {
		width: 100%;
		height: 100%;
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
		min-height: 300px;
		backface-visibility: hidden;
		border: 1px solid var(--border-color);
		border-radius: var(--radius-xl);
		padding: var(--space-xl);
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		text-align: center;
		gap: var(--space-md);
		transition: box-shadow var(--transition-base);
	}

	.flashcard-front {
		background: var(--card-bg);
		box-shadow: var(--shadow-md);
	}

	.flashcard-back {
		background: var(--accent-blue);
		color: var(--accent-blue-text);
		transform: rotateY(180deg);
		box-shadow: var(--shadow-md);
		border-color: var(--accent-blue);
	}

	.points-buttons {
		display: flex;
		gap: var(--space-xs);
	}

	.points-buttons button {
		border: 1.5px solid var(--accent-blue-text);
		padding: var(--space-xs) var(--space-md);
		font-size: var(--text-base);
		cursor: pointer;
		background: rgba(255, 255, 255, 0.2);
		color: var(--accent-blue-text);
		border-radius: var(--radius-md);
	}

	.points-buttons button:hover {
		background: rgba(255, 255, 255, 0.35);
		box-shadow: var(--shadow-sm);
	}

	.flashcard-front h2,
	.flashcard-back h2 {
		margin: 0;
		font-size: var(--text-xl);
	}

	.flashcard-back h2 {
		color: var(--accent-blue-text);
	}

	.flashcard-back p {
		margin: 0;
		font-size: var(--text-md);
		color: var(--accent-blue-text);
		opacity: 0.8;
		font-style: italic;
	}

	.flip-indicator {
		position: absolute;
		bottom: 10px;
		right: 10px;
		font-size: var(--text-md);
		opacity: 0.3;
		transition: all var(--transition-base);
	}

	.flashcard-container:hover .flip-indicator {
		opacity: 0.7;
		transform: rotate(180deg);
	}

	.flashcard-container:hover .flashcard-front,
	.flashcard-container:hover .flashcard-back {
		box-shadow: var(--shadow-lg);
	}
</style>
