<script lang="ts">
	import * as spanishData from '$lib/data/spanish.json';
	import { selectedCategory } from '$lib/stores';
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';
    import { goto } from '$app/navigation';
	import H1Buttons from '$lib/components/H1Buttons.svelte';

	let flippedCards = $state<Set<number>>(new Set());
	let ready = $state(false);
    let words = $derived.by(() => spanishData[$selectedCategory as keyof typeof spanishData]);

	const toggleFlip = (index: number) => {
		if (flippedCards.has(index)) {
			flippedCards.delete(index);
		} else {
			flippedCards.add(index);
		}
		// Trigger reactivity
		flippedCards = new Set(flippedCards);
	};

    const shuffleWords = () => {
        const shuffled = [...words].sort(() => Math.random() - 0.5);
        words = shuffled;
    };

	onMount(() => {
		ready = true;
	});
</script>

{#if ready}
	<div class="container">
		<h1 in:fly={{ y: -50, duration: 600, delay: 0 }}>
			Flashcards
            <H1Buttons/>
		</h1>
        <h5 in:fly={{ y: -30, duration: 600, delay: 150 }}>
            Study words with Flashcards. Flip the card to see the English translation and part of speech.
            <button onclick={() => shuffleWords()}>Shuffle</button>
        </h5>
		<div class="cards-grid" in:fly={{ y: -20, duration: 600, delay: 300 }}>
			{#each words as item, index}
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
	}

    h5 {
        display: flex;
        justify-content: space-between;
        gap: 1px;
        align-items: center;
    }

    .cards-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 1.5rem;
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
</style>
