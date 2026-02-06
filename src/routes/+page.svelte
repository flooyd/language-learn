<script>
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { fade, fly } from 'svelte/transition';

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
		<h3 in:fly={{ y: -30, duration: 600, delay: 150 }}>Learn Spanish and other languages using interactive tables or flashcards.</h3>

		<div class="stats" in:fly={{ y: -20, duration: 600, delay: 300 }}>
			<div class="stat">
				<span class="stat-number">500+</span>
				<span class="stat-label">Spanish Words</span>
			</div>
			<div class="stat">
				<span class="stat-number">5</span>
				<span class="stat-label">Learning Levels</span>
			</div>
			<div class="stat">
				<span class="stat-number">Free</span>
				<span class="stat-label">to Start</span>
			</div>
		</div>

		<div class="cta-buttons" in:fly={{ y: -10, duration: 600, delay: 450 }}>
			<button class="primary-cta" onclick={handleClickStartLearning}><h3>Start Learning</h3></button>
			<button class="secondary-cta" onclick={handleClickPricing}><h3>View Pricing</h3></button>
		</div>
	</div>

	<footer>
		<p>&copy; 2024 Language Learn. All rights reserved.</p>
		<p>
			<a href="https://github.com/flooyd/language-learn" target="_blank" rel="noopener noreferrer">GitHub</a>
		</p>
	</footer>
{/if}

<style>
	footer {
		display: flex;
		position: absolute;
		bottom: 0px;
		background: lightyellow;
		z-index: 100;
		gap: 2.986rem;
		width: calc(100vw - 34px);
		justify-content: space-between;
	}

	footer p {
		margin: 0;
		margin-bottom: 1rem;
	}

	.intro {
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		min-height: calc(100vh - 164px);
		gap: 1rem;
	}

	.intro h1 {
		color: black;
		transition: transform 0.3s ease;
		margin-bottom: 0px;
	}

	.intro h1:hover {
		transform: translateX(5px);
	}

	.intro h3 {
		color: black;
		transition: transform 0.3s ease;
		margin-bottom: 0;
	}

	.intro h3:hover {
		transform: translateX(5px);
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
		border-radius: 5px;;
		min-width: 120px;
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
		transition: transform 0.2s ease;
	}

	.cta-buttons button:hover {
		transform: scale(1.05);
	}

	.primary-cta h3 {
		padding: 0px;
		margin: 0px;
		background: black;
		color: white;
		border: none;
	}

	.primary-cta {
		background: black;
		border: 8px solid #4a90e2;
	}

	.secondary-cta h3 {
		padding: 0px;
		margin: 0px;
		background: transparent;
		color: black;
		border: none;
	}

	.secondary-cta {
		background: white;
		border: 8px solid #f0e68c;
	}

	.secondary-cta:hover {
		background: #f0e68c;
		border-color: #4a90e2;
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
		color: #e0e0e0;
	}

	:global(body.dark-mode) .secondary-cta {
		background: #2a2a2a;
		border-color: #f0e68c;
	}

	:global(body.dark-mode) .secondary-cta h3 {
		color: #e0e0e0;
	}

	:global(body.dark-mode) .secondary-cta:hover {
		background: #3a3a3a;
		border-color: #4a90e2;
	}

	:global(body.dark-mode) h1, :global(body.dark-mode) h3 {
		color: white;
	}

	@media (max-width: 768px) {
		.intro {
			justify-content: flex-start;
		}

		.intro h3 {
			max-width: 318.19px;
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
