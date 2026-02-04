<script>
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { fade, fly } from 'svelte/transition';

	let duration = $state(800);
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
		<h1 in:fly={{ y: -50, duration: 600, delay: 0 }}>🌍 Welcome to Language Learn</h1>
		<h3 in:fly={{ y: -30, duration: 600, delay: 150 }}>Learn Spanish and other languages using interactive tables or flashcards 🎓</h3>

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
			<button class="primary-cta" onclick={handleClickStartLearning}><h3>🚀 Start Learning</h3></button>
			<button class="secondary-cta" onclick={handleClickPricing}><h3>💎 View Pricing</h3></button>
		</div>
	</div>
{/if}

<style>
	.intro {
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		min-height: calc(100vh - 164px);
		gap: 1rem;
	}

	.intro h1 {
		background: #add8e6;
		padding: 11.11px;
		width: fit-content;
		border: 3px solid black;
		color: black;
		transition: transform 0.3s ease;
	}

	.intro h1:hover {
		transform: translateX(5px);
	}

	.intro h3 {
		background: #f0e68c;
		padding: 11.11px;
		max-width: 638.25px;
		text-align: left;
		border: 3px solid black;
		color: black;
		transition: transform 0.3s ease;
	}

	.intro h3:hover {
		transform: translateX(5px);
	}

	.stats {
		display: flex;
		gap: 1rem;
		flex-wrap: wrap;
		margin: 1rem 0;
	}

	.stat {
		display: flex;
		flex-direction: column;
		gap: 11.11px;
		padding: .0833rem;
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
		color: #add8e6;
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
		border: 5px solid #add8e6;
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
		border: 5px solid #f0e68c;
	}

	.secondary-cta:hover {
		background: #f0e68c;
		border-color: #add8e6;
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
		color: #b0b0b0;
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

	@media (max-width: 768px) {
		.intro {
			justify-content: flex-start;
			padding-top: 2rem;
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
