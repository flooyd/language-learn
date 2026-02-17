<script>
	import { fade, fly } from 'svelte/transition';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	let ready = $state(false);

	onMount(() => {
		ready = true;
	});

	const handleClickStartLearning = () => {
		goto('/learn');
	};
</script>

{#if ready}
	<div class="container">
		<h1 in:fly={{ y: -50, duration: 600, delay: 0 }}>About</h1>

		<div class="mission-card" in:fly={{ y: -30, duration: 600, delay: 150 }}>
			<h2>Our Mission</h2>
			<p>
				Language Learn is designed to make language learning accessible, enjoyable, and effective
				for everyone. We believe that learning a new language should be simple, interactive, and
				fun.
			</p>
		</div>

		<div class="features-section" in:fly={{ y: -20, duration: 600, delay: 300 }}>
			<h2>What We Offer</h2>
			<div class="features-grid">
				<div class="feature-card">
					<div class="feature-icon"></div>
					<h5>Comprehensive Vocabulary</h5>
					<p>500+ words across 5 learning levels, from basics to advanced.</p>
				</div>
				<div class="feature-card">
					<div class="feature-icon"></div>
					<h5>Multiple Learning Modes</h5>
					<p>
						Switch between Table View, Flashcards, Quiz Mode, and Sentences for different learning
						experiences.
					</p>
				</div>
				<div class="feature-card">
					<div class="feature-icon"></div>
					<h5>Progressive Learning</h5>
					<p>Start with basics and advance through beginner, intermediate, and advanced levels.</p>
				</div>
				<div class="feature-card">
					<div class="feature-icon"></div>
					<h5>Free to Start</h5>
					<p>Begin your language journey with our free plan, upgrade when ready.</p>
				</div>
			</div>
		</div>

		<div class="cta-section" in:fly={{ y: -10, duration: 600, delay: 450 }}>
			<h2>Ready to begin your language journey?</h2>
			<button class="cta-button" onclick={handleClickStartLearning}>
				<h5>Start Learning</h5>
			</button>
		</div>
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
		box-shadow: var(--shadow-sm);
	}

	h2 {
		margin-bottom: 0;
		color: var(--text-primary);
	}

	.mission-card {
		transition: all var(--transition-base);
	}

	.mission-card h2 {
		color: var(--text-primary);
	}

	.mission-card p {
		color: var(--text-secondary);
		font-size: var(--text-md);
		line-height: 1.8;
		margin-bottom: 0;
		font-weight: 300;
	}

	.features-section {
		display: flex;
		flex-direction: column;
		gap: var(--space-md);
	}

	.features-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
		gap: var(--space-md);
	}

	.feature-card {
		background: var(--card-bg);
		border: 1px solid var(--border-color);
		padding: var(--space-xl);
		border-radius: var(--radius-xl);
		display: flex;
		flex-direction: column;
		gap: var(--space-sm);
		transition: all var(--transition-base);
		box-shadow: var(--shadow-sm);
	}

	.feature-card:hover {
		transform: translateY(-4px);
		box-shadow: var(--shadow-lg);
		border-color: var(--accent-blue);
	}

	.feature-icon {
		font-size: var(--text-3xl);
	}

	.feature-card h5 {
		color: var(--text-primary);
		font-weight: 700;
	}

	.feature-card p {
		color: var(--text-secondary);
		margin-bottom: 0;
		line-height: 1.6;
		font-weight: 300;
	}

	.cta-section {
		text-align: center;
		padding: var(--space-3xl) var(--space-xl);
		background: var(--card-bg);
		border: 1px solid var(--border-color);
		border-radius: var(--radius-xl);
		display: flex;
		flex-direction: column;
		gap: var(--space-lg);
		align-items: center;
		box-shadow: var(--shadow-sm);
	}

	.cta-section h2 {
		color: var(--text-primary);
		margin-bottom: 0;
	}

	.cta-button {
		transition: all var(--transition-base);
		background: var(--accent-green);
		border: 1.5px solid var(--accent-green);
		padding: var(--space-md) var(--space-3xl);
		border-radius: var(--radius-lg);
		box-shadow: var(--shadow-md);
	}

	.cta-button h5 {
		color: var(--accent-green-text) !important;
		font-weight: 600;
	}

	.cta-button:hover {
		background: var(--accent-green-hover);
		border-color: var(--accent-green-hover);
		transform: translateY(-2px);
		box-shadow: var(--shadow-lg);
	}

	@media (max-width: 768px) {
		.features-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
