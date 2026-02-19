<script lang="ts">
	import H1Buttons from '$lib/components/H1Buttons.svelte';
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';
	import { get } from 'svelte/store';
	import { filteredWords, words } from '$lib/stores';
	import { updateWordPoints } from '$lib/util';

	type Word = (typeof $filteredWords)[number];
	type AnswerOption = { answer: string; isCorrect: boolean };
	let ready = $state(false);
	let quizIndex = $state(0);
	// Snapshot of the quiz list when we started – not affected by filteredWords changing after answers
	let quizPool = $state<Word[]>([]);
	let displayQuiz = $state<Word | undefined>(undefined);
	let message = $state('');
	let answerOptions = $state<AnswerOption[]>([]);

	function buildOptionsFor(word: Word, wordsList: Word[]): AnswerOption[] {
		const len = wordsList.length;
		const i1 = Math.floor(Math.random() * len);
		let i2 = Math.floor(Math.random() * len);
		let i3 = Math.floor(Math.random() * len);
		while (i2 === i1) i2 = Math.floor(Math.random() * len);
		while (i3 === i1 || i3 === i2) i3 = Math.floor(Math.random() * len);
		const opts = [
			{ answer: word.english, isCorrect: true },
			{ answer: wordsList[i1].english, isCorrect: false },
			{ answer: wordsList[i2].english, isCorrect: false },
			{ answer: wordsList[i3].english, isCorrect: false }
		];
		return opts.sort(() => Math.random() - 0.5);
	}

	// Snapshot filtered words when they're available; shuffle so quiz order isn't always the same
	$effect(() => {
		const list = $filteredWords;
		if (list.length > 0 && quizPool.length === 0) {
			quizPool = [...list].sort(() => Math.random() - 0.5);
			displayQuiz = quizPool[0];
			answerOptions = displayQuiz ? buildOptionsFor(displayQuiz, get(words)) : [];
		}
	});

	// When advancing to next question, show word from our snapshot (get(words) = no subscription, so options don't rebuild when stores update)
	$effect(() => {
		if (quizPool.length === 0) return;
		const word = quizPool[quizIndex];
		if (word) {
			displayQuiz = word;
			answerOptions = buildOptionsFor(word, get(words));
		} else {
			displayQuiz = undefined;
		}
	});

	const nextQuiz = () => {
		quizIndex++;
	};

	const checkAnswer = (answer: string) => {
		if (!displayQuiz) return;
		if (answer === displayQuiz.english) {
			message = 'Correct! +10 points';
			updateWordPoints(displayQuiz.spanish, 'spanish', true);
			setTimeout(() => {
				message = '';
				nextQuiz();
			}, 1000);
		} else {
			message = 'Incorrect! -10 points';
			updateWordPoints(displayQuiz.spanish, 'spanish', false);
			setTimeout(() => {
				message = '';
				nextQuiz();
			}, 1000);
		}
	};

	onMount(() => {
		ready = true;
	});
</script>

{#if ready}
	<div class="container">
		<h1 in:fly={{ y: -50, duration: 600, delay: 0 }}>
			Quizzes
			<H1Buttons />
		</h1>
		<h5 in:fly={{ y: -30, duration: 600, delay: 150 }}>Test your knowledge with Quizzes.</h5>
		{#if displayQuiz}
			{#key displayQuiz.spanish}
				<div in:fly={{ y: -20, duration: 600, delay: 300 }} class="quiz">
					<h2>
						{displayQuiz.spanish}
						<span class="message {message.includes('Correct') ? 'correct' : 'incorrect'}"
							>{message}</span
						>
					</h2>
					<div class="answer-options">
						{#each answerOptions as answer}
							<button onclick={() => checkAnswer(answer.answer)}>{answer.answer}</button>
						{/each}
					</div>
				</div>
			{/key}
		{:else}
			<h2>No more words to quiz. Adjust your filters.</h2>
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

	.quiz {
		display: flex;
		flex-direction: column;
		gap: var(--space-md);
		border: 1px solid var(--border-color);
		border-radius: var(--radius-xl);
		padding: var(--space-2xl);
		background: var(--card-bg);
		box-shadow: var(--shadow-md);
	}

	h2 {
		display: flex;
		gap: var(--space-md);
		flex-wrap: wrap;
		align-items: baseline;
	}

	.answer-options {
		display: flex;
		gap: var(--space-md);
		flex-wrap: wrap;
	}

	.answer-options button {
		padding: var(--space-md) var(--space-2xl);
		border-radius: var(--radius-lg);
		font-weight: 600;
		transition: all var(--transition-base);
		border: 1.5px solid var(--border-color-strong);
		background: var(--card-bg);
	}

	.answer-options button:hover {
		background: var(--accent-blue-subtle);
		border-color: var(--accent-blue);
		transform: translateY(-2px);
		box-shadow: var(--shadow-md);
	}

	.message {
		font-weight: 800;
		font-size: var(--text-lg);
		display: flex;
		align-items: center;
		gap: 1px;
		flex-wrap: wrap;
	}

	.correct {
		color: var(--accent-green);
	}

	.incorrect {
		color: var(--accent-red);
	}

	@media (max-width: 1090px) {
		.message {
			font-size: var(--text-base);
		}
	}
</style>
