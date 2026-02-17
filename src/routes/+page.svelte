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
		min-height: calc(100vh - 164px);
		gap: var(--space-xl);
		padding-bottom: var(--space-md);
		padding-top: var(--space-xl);
	}

	.intro h1 {
		color: var(--text-primary);
		transition: transform var(--transition-base);
		margin-bottom: 0;
		background: none;
		border: none;
		border-radius: 0;
		padding: 0;
		font-weight: 800;
		font-size: var(--text-4xl);
		letter-spacing: -0.03em;
		line-height: 1.1;
	}

	.intro h5 {
		font-weight: 200;
		color: var(--text-secondary);
		max-width: 600px;
		line-height: 1.6;
	}

	.stats {
		display: flex;
		gap: var(--space-md);
		flex-wrap: wrap;
	}

	.stat {
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
		padding: var(--space-lg) var(--space-xl);
		background: var(--card-bg);
		border: 1px solid var(--border-color);
		border-radius: var(--radius-xl);
		min-width: 140px;
		transition: all var(--transition-base);
		box-shadow: var(--shadow-sm);
	}

	.stat:hover {
		transform: translateY(-4px);
		box-shadow: var(--shadow-lg);
		border-color: var(--accent-blue);
	}

	.stat-number {
		font-size: var(--text-3xl);
		font-weight: 800;
		color: var(--accent-blue);
		letter-spacing: -0.02em;
	}

	.stat-label {
		font-size: var(--text-sm);
		color: var(--text-tertiary);
		font-weight: 400;
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.cta-buttons {
		display: flex;
		gap: var(--space-md);
		flex-wrap: wrap;
		padding-top: var(--space-xs);
	}

	.cta-buttons button {
		text-align: center;
		transition: all var(--transition-base);
		padding: var(--space-md) var(--space-3xl);
		border-radius: var(--radius-lg);
	}

	.cta-buttons button h5 {
		font-weight: 600;
		font-size: var(--text-md);
	}

	.cta-buttons button:hover {
		transform: translateY(-2px);
	}

	.primary-cta {
		background: var(--accent-green);
		border: 1.5px solid var(--accent-green);
		box-shadow: var(--shadow-md);
	}

	.primary-cta h5 {
		color: var(--accent-green-text) !important;
	}

	.primary-cta:hover {
		background: var(--accent-green-hover);
		border-color: var(--accent-green-hover);
		box-shadow: var(--shadow-lg);
	}

	.secondary-cta {
		background: transparent;
		border: 1.5px solid var(--border-color-strong);
	}

	.secondary-cta h5 {
		color: var(--text-primary) !important;
	}

	.secondary-cta:hover {
		border-color: var(--accent-blue);
		background: var(--accent-blue-subtle);
		box-shadow: var(--shadow-md);
	}

	@media (max-width: 768px) {
		.intro {
			justify-content: flex-start;
			gap: var(--space-md);
		}

		.stats {
			gap: var(--space-sm);
		}

		.stat {
			min-width: 100px;
			padding: var(--space-sm) var(--space-md);
		}

		.stat-number {
			font-size: var(--text-xl);
		}

		.cta-buttons {
			flex-direction: column;
		}

		.cta-buttons button {
			width: 100%;
		}
	}
</style>
