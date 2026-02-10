<script>
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';

	let ready = $state(false);

	const handleClickStartLearning = () => {
		goto('/learn');
	};

	const handleClickPricing = () => {
		goto('/pricing');
	};

	onMount(() => {
		ready = true;
	});
</script>

{#if ready}
	<div class="intro">
		<h1 in:fly={{ y: -50, duration: 600, delay: 0 }}>Welcome to Language Learn.</h1>
		<h5 in:fly={{ y: -30, duration: 600, delay: 150 }}>Learn languages using interactive tables, flashcards, quizzes, and sentences.</h5>

		<div class="stats" in:fly={{ y: -20, duration: 600, delay: 300 }}>
			<div class="stat">
				<span class="stat-number">500+</span>
				<span class="stat-label">Total Words</span>
			</div>
			<div class="stat">
				<span class="stat-number">5</span>
				<span class="stat-label">Learning Levels</span>
			</div>
			 <div class="stat">
				<span class="stat-number">4</span>
				<span class="stat-label">Learning Modes</span>
			</div>
			<div class="stat">
				<span class="stat-number">Free</span>
				<span class="stat-label">to Start</span>
			</div>
		</div>

		<div class="cta-buttons" in:fly={{ y: -10, duration: 600, delay: 450 }}>
			<button class="primary-cta" onclick={handleClickStartLearning}><h5>Start Learning</h5></button>
			<button class="secondary-cta" onclick={handleClickPricing}><h5>View Pricing</h5></button>
		</div>
	</div>
{/if}

<style>
	.intro {
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		min-height: calc(100vh - 164px);
		gap: 2.074rem;
	}

	.intro h1 {
		color: black;
		transition: transform 0.3s ease;
		margin-bottom: 0px;
		background: #f0e68c;
		border: 5px solid black;
		border-radius: 5px;
		padding: 1rem;
	}

	.stats {
		display: flex;
		gap: 1rem;
		flex-wrap: wrap;
	}

	.stat {
		display: flex;
		flex-direction: column;
		gap: 11.11px;
		padding: 1rem;
		background: white;
		border: 3px solid black;
		border-radius: 5px;
		min-width: 139.9px !important;
		transition: transform 0.3s ease, box-shadow 0.3s ease;
	}

	.stat:hover {
		transform: translateY(-5px);
		box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
	}

	.stat-number {
		font-size: 2rem;
		font-weight: bold;
		color: #4a90e2;
	}

	.stat-label {
		font-size: 0.9rem;
		color: #666;
		font-weight: 500;
	}

	.cta-buttons {
		display: flex;
		gap: 1rem;
		flex-wrap: wrap;
	}

	.cta-buttons button {
		text-align: center;
		transition: transform 0.2s ease;
	}

	.cta-buttons button:hover {
		transform: scale(1.05);
	}

	.primary-cta {
		background: white;
		border: .833rem solid #4a90e2;
	}

	.primary-cta:hover {
		background: #4a90e2;
	}

	.secondary-cta {
		background: white;
		border: .833rem solid green;
	}

	.secondary-cta:hover {
		background: green;
	}

	/* Dark Mode Styles */
	:global(body.dark-mode) .stat {
		background: #2a2a2a;
		border-color: #444;
	}

	:global(body.dark-mode) .stat-number {
		color: #4a90e2;
	}

	:global(body.dark-mode) .stat-label {
		color: white;
	}

	:global(body.dark-mode) h1, :global(body.dark-mode) h5 {
		color: white;
	}

	:global(body.dark-mode) .primary-cta h5 {
		color: black;
	}

	:global(body.dark-mode) .secondary-cta h5 {
		color: black;
	}

	@media (max-width: 768px) {
		.intro {
			justify-content: flex-start;
            gap: 1rem;
		}

		.stats {
			gap: 1rem;
		}

		.stat {
			min-width: 100px;
			padding: 0.75rem 1rem;
		}

		.stat-number {
			font-size: 1.5rem;
		}

		.cta-buttons {
			flex-direction: column;
		}

		.cta-buttons button {
			width: 100%;
		}
	}
</style>
