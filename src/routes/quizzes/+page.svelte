<script lang="ts">
	import H1Buttons from '$lib/components/H1Buttons.svelte';
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';
	import { filteredWords, words } from '$lib/stores';
	import { updateWordPoints } from '$lib/util';

	let ready = $state(false);
	let quizIndex = $state(0);
	let lastSyncedQuizIndex = $state(-1);
	// Freeze displayed word so it doesn't change when filteredWords updates (e.g. word removed after answer)
	type Word = (typeof $filteredWords)[number];
	type AnswerOption = { answer: string; isCorrect: boolean };
	let displayQuiz = $state<Word | undefined>(undefined);
	let message = $state('');
	let answerOptions = $state<AnswerOption[]>([]);

	function buildOptionsFor(word: Word): AnswerOption[] {
		const len = $words.length;
		const i1 = Math.floor(Math.random() * len);
		let i2 = Math.floor(Math.random() * len);
		let i3 = Math.floor(Math.random() * len);
		while (i2 === i1) i2 = Math.floor(Math.random() * len);
		while (i3 === i1 || i3 === i2) i3 = Math.floor(Math.random() * len);
		const opts = [
			{ answer: word.english, isCorrect: true },
			{ answer: $words[i1].english, isCorrect: false },
			{ answer: $words[i2].english, isCorrect: false },
			{ answer: $words[i3].english, isCorrect: false }
		];
		return opts.sort(() => Math.random() - 0.5);
	}

	$effect(() => {
		if (quizIndex !== lastSyncedQuizIndex && $filteredWords[quizIndex]) {
			lastSyncedQuizIndex = quizIndex;
			displayQuiz = $filteredWords[quizIndex];
			answerOptions = displayQuiz ? buildOptionsFor(displayQuiz) : [];
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
			}, 1500);
		} else {
			message = 'Incorrect! -10 points';
			updateWordPoints(displayQuiz.spanish, 'spanish', false);
			setTimeout(() => {
				message = '';
				nextQuiz();
			}, 1500);
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
			<div class="quiz">
				<h2>{displayQuiz.spanish} <span class="message {message.includes('Correct') ? 'correct' : 'incorrect'}">{message}</span></h2>
				<div class="answer-options">
					{#each answerOptions as answer}
						<button onclick={() => checkAnswer(answer.answer)}>{answer.answer}</button>
					{/each}
				</div>
			</div>
		{/if}
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

	.quiz {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		border: 5px solid black;
		border-radius: 5px;
		padding: 1rem;
	}

	h2 {
		display: flex;
		gap: 1rem;
	}

	.answer-options {
		display: flex;
		gap: 1.44rem;
		flex-wrap: wrap;
	}

	.message {
		font-weight: bold;
		font-size: 1.44rem;
		display: flex;
		align-items: center;
		gap: 1px;
		flex-wrap: wrap;
	}

	.correct {
		color: #4a90e2;
	}

	.incorrect {
		color: #ff0000;
	}
</style>
