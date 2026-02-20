<script lang="ts">
	import sentencesData from '$lib/data/sentences.json';
	import H1Buttons from '$lib/components/H1Buttons.svelte';
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';
	import { selectedCategory, selectedMode } from '$lib/stores';
	import { updateWordPoints } from '$lib/util';

	type Slot = {
		english: string;
		spanish: string;
		baseWord?: string;
	};

	type Sentence = {
		english: string;
		slots: Slot[];
		wordOptions: string[];
	};

	type FlyMsg = {
		text: string;
		id: number;
		slotIndex: number;
	};

	let ready = $state(false);
	let sentences = $state<Sentence[]>([]);
	let currentIndex = $state(0);
	let filledSlots = $state<(string | null)[]>([]);
	let scored = $state<boolean[]>([]);
	let flyMessages = $state<FlyMsg[]>([]);
	let msgCounter = 0;

	const currentSentence = $derived(sentences[currentIndex] as Sentence | undefined);
	const activeSlotIndex = $derived(filledSlots.findIndex((s) => s === null));

	// Track how many of each word option are still available
	const wordCounts = $derived.by(() => {
		const avail = new Map<string, number>();
		for (const w of currentSentence?.wordOptions ?? []) {
			avail.set(w, (avail.get(w) ?? 0) + 1);
		}
		for (const s of filledSlots) {
			if (s !== null) {
				avail.set(s, Math.max(0, (avail.get(s) ?? 0) - 1));
			}
		}
		return avail;
	});

	// Unique word options (one button per unique word in wordOptions order)
	const uniqueWordOptions = $derived.by(() => {
		const seen = new Set<string>();
		const result: string[] = [];
		for (const w of currentSentence?.wordOptions ?? []) {
			if (!seen.has(w)) {
				seen.add(w);
				result.push(w);
			}
		}
		return result;
	});

	// Reset state whenever the current sentence changes
	$effect(() => {
		const s = currentSentence;
		if (s) {
			filledSlots = new Array(s.slots.length).fill(null);
			scored = new Array(s.slots.length).fill(false);
			flyMessages = [];
		}
	});

	function handleWordClick(word: string) {
		if (!currentSentence) return;
		if ((wordCounts.get(word) ?? 0) <= 0) return;

		const idx = filledSlots.indexOf(null);
		if (idx === -1) return;

		const slot = currentSentence.slots[idx];
		const isCorrect = word === slot.spanish;

		const newFilled = [...filledSlots];
		newFilled[idx] = word;
		filledSlots = newFilled;

		// Only score the first time a slot is filled
		if (!scored[idx]) {
			const newScored = [...scored];
			newScored[idx] = true;
			scored = newScored;

			const scoringWord = slot.baseWord ?? slot.spanish;
			updateWordPoints(scoringWord, 'spanish', isCorrect);

			const id = msgCounter++;
			flyMessages = [...flyMessages, { text: isCorrect ? '+10' : '-10', id, slotIndex: idx }];
			setTimeout(() => {
				flyMessages = flyMessages.filter((m) => m.id !== id);
			}, 900);
		}
	}

	function handleSlotClick(slotIndex: number) {
		// Remove this slot and all subsequent slots so order is maintained
		const newFilled = [...filledSlots];
		for (let i = slotIndex; i < newFilled.length; i++) {
			newFilled[i] = null;
		}
		filledSlots = newFilled;
	}

	function nextSentence() {
		currentIndex = (currentIndex + 1) % sentences.length;
	}

	function shuffle<T>(arr: T[]): T[] {
		const a = [...arr];
		for (let i = a.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[a[i], a[j]] = [a[j], a[i]];
		}
		return a;
	}

	onMount(() => {
		if (!$selectedMode) {
			window.location.href = '/learn';
		}
		if (!$selectedCategory) {
			window.location.href = '/categories';
		}
		const categoryData = sentencesData[$selectedCategory as keyof typeof sentencesData];
		if (categoryData) {
			sentences = shuffle(categoryData as Sentence[]);
		}
		ready = true;
	});
</script>

{#if ready}
	<div class="container" in:fly={{ y: -50, duration: 600, delay: 0 }}>
		<h1>
			Sentences
			<H1Buttons />
		</h1>

		{#if currentSentence}
		<h5>Translate the English sentence into Spanish by clicking the word buttons below.</h5>

		<div class="card">
			<div class="sentence">
				{#each currentSentence.slots as slot, i}
					<div class="slot-wrap">
						{#if filledSlots[i] !== null}
							<button
								class="slot filled {filledSlots[i] === slot.spanish ? 'correct' : 'incorrect'}"
								onclick={() => handleSlotClick(i)}
								title="Click to remove"
							>
								{filledSlots[i]}
							</button>
						{:else}
							<span class="slot unfilled {i === activeSlotIndex ? 'active' : ''}"
								>{slot.english}</span
							>
						{/if}
						{#each flyMessages.filter((m) => m.slotIndex === i) as msg (msg.id)}
							<span class="fly-msg {msg.text.startsWith('+') ? 'positive' : 'negative'}"
								>{msg.text}</span
							>
						{/each}
					</div>
				{/each}
			</div>

			<div class="word-options">
				{#each uniqueWordOptions as word}
					<button
						class="word-btn"
						disabled={(wordCounts.get(word) ?? 0) <= 0}
						onclick={() => handleWordClick(word)}
					>
						{word}
					</button>
				{/each}
			</div>

			<div class="bottom-bar">
				<span class="progress">{currentIndex + 1} / {sentences.length}</span>
				<button class="next-btn" onclick={nextSentence}>Next →</button>
			</div>
		</div>
		{:else}
			<div class="empty-state">
				<p>No sentences are available for the <strong>{$selectedCategory}</strong> category yet.</p>
				<p>Try selecting <strong>Basics</strong> to get started.</p>
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

	.card {
		display: flex;
		flex-direction: column;
		gap: var(--space-xl);
		border: 1px solid var(--border-color);
		border-radius: var(--radius-xl);
		padding: var(--space-2xl);
		background: var(--card-bg);
		box-shadow: var(--shadow-md);
	}

	.empty-state {
		display: flex;
		flex-direction: column;
		gap: var(--space-sm);
		padding: var(--space-3xl) var(--space-2xl);
		border: 1px solid var(--border-color);
		border-radius: var(--radius-xl);
		background: var(--card-bg);
		box-shadow: var(--shadow-sm);
		color: var(--text-secondary);
		font-size: var(--text-lg);
	}

	.empty-state strong {
		color: var(--text-primary);
	}

	/* Sentence display */
	.sentence {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-sm);
		align-items: center;
		min-height: 3.5rem;
	}

	.slot-wrap {
		position: relative;
		display: inline-flex;
		align-items: center;
		justify-content: center;
	}

	.slot {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		padding: var(--space-xs) var(--space-md);
		border-radius: var(--radius-md);
		font-size: var(--text-lg);
		font-weight: 600;
		min-width: 3rem;
		text-align: center;
	}

	.slot.unfilled {
		background: var(--bg-tertiary);
		border: 1.5px dashed var(--border-color-strong);
		color: var(--text-tertiary);
		cursor: default;
	}

	.slot.unfilled.active {
		border-color: var(--accent-blue);
		background: var(--accent-blue-subtle);
		color: var(--accent-blue);
	}

	.slot.filled {
		border: 1.5px solid transparent;
		cursor: pointer;
		transition: all var(--transition-base);
	}

	.slot.filled:hover {
		opacity: 0.8;
		transform: translateY(-1px);
	}

	.slot.filled.correct {
		background: var(--accent-green-subtle);
		border-color: var(--accent-green);
		color: var(--accent-green);
	}

	.slot.filled.incorrect {
		background: var(--accent-red-subtle);
		border-color: var(--accent-red);
		color: var(--accent-red);
	}

	/* Flying score animation */
	@keyframes fly-up {
		0% {
			transform: translateX(-50%) translateY(0);
			opacity: 1;
		}
		100% {
			transform: translateX(-50%) translateY(-36px);
			opacity: 0;
		}
	}

	.fly-msg {
		position: absolute;
		top: -4px;
		left: 50%;
		transform: translateX(-50%);
		font-weight: 800;
		font-size: var(--text-md);
		pointer-events: none;
		white-space: nowrap;
		animation: fly-up 900ms ease-out forwards;
		z-index: 10;
	}

	.fly-msg.positive {
		color: var(--accent-green);
	}

	.fly-msg.negative {
		color: var(--accent-red);
	}

	/* Word option buttons */
	.word-options {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-md);
	}

	.word-btn {
		padding: var(--space-md) var(--space-2xl);
		border-radius: var(--radius-lg);
		font-weight: 600;
		font-size: var(--text-base);
		transition: all var(--transition-base);
		border: 1.5px solid var(--border-color-strong);
		background: var(--card-bg);
	}

	.word-btn:hover:not(:disabled) {
		background: var(--accent-blue-subtle);
		border-color: var(--accent-blue);
		transform: translateY(-2px);
		box-shadow: var(--shadow-md);
	}

	.word-btn:disabled {
		opacity: 0.3;
		cursor: not-allowed;
		transform: none;
		box-shadow: none;
	}

	/* Bottom bar */
	.bottom-bar {
		display: flex;
		align-items: center;
		justify-content: space-between;
		flex-wrap: wrap;
		gap: var(--space-md);
	}

	.progress {
		font-size: var(--text-base);
		font-weight: 600;
		color: var(--text-secondary);
	}

	.next-btn {
		padding: var(--space-md) var(--space-2xl);
		border-radius: var(--radius-lg);
		font-weight: 700;
		font-size: var(--text-base);
		background: var(--accent-blue);
		color: var(--accent-blue-text);
		border: 1.5px solid var(--accent-blue);
		transition: all var(--transition-base);
	}

	.next-btn:hover {
		background: var(--accent-blue-hover);
		border-color: var(--accent-blue-hover);
		transform: translateY(-1px);
		box-shadow: var(--shadow-md);
	}

	@media (max-width: 1090px) {
		.slot {
			font-size: var(--text-base);
		}
	}
</style>
