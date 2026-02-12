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
		gap: 1.44rem;
		padding-bottom: 1rem;
	}

	h1 {
		margin-bottom: 0px;
		background: #f0e68c;
		border: 5px solid black;
		border-radius: 5px;
		padding: 1rem;
	}

	h2 {
		margin-bottom: 0px;
	}

	h3 {
		margin-bottom: 0;
	}

	/* Mission Card */
	.mission-card {
		transition:
			transform 0.3s ease,
			box-shadow 0.3s ease;
	}

	.mission-card h2 {
		color: black;
	}

	.mission-card p {
		color: black;
		font-size: 1.1rem;
		line-height: 1.8;
		margin-bottom: 0;
	}

	/* Features Section */
	.features-section {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.features-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
		gap: 1rem;
	}

	.feature-card {
		background: white;
		border: 3px solid black;
		padding: 1rem;
		border-radius: 5px;
		display: flex;
		flex-direction: column;
		gap: 1rem;
		transition:
			transform 0.3s ease,
			box-shadow 0.3s ease,
			border-color 0.3s ease;
	}

	.feature-card:hover {
		transform: translateY(-5px);
		box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
		border-color: #4a90e2;
	}

	.feature-icon {
		font-size: 2.5rem;
	}

	.feature-card p {
		color: #666;
		margin-bottom: 0;
		line-height: 1.6;
	}

	/* CTA Section */
	.cta-section {
		text-align: center;
		padding: 1rem;
		background: white;
		border: 3px solid black;
		border-radius: 5px;
		display: flex;
		flex-direction: column;
		gap: 1rem;
		align-items: center;
	}

	.cta-section h2 {
		color: black;
		margin-bottom: 0;
	}

	.cta-button {
		transition: transform 0.3s ease;
		border-width: 0.833rem;
		color: black;
	}

	.cta-button:hover {
		transform: scale(1.05);
	}

	/* Dark Mode Styles */
	:global(body.dark-mode) .mission-card h2,
	:global(body.dark-mode) .mission-card p {
		color: #e0e0e0;
	}

	:global(body.dark-mode) .feature-card {
		background: #2a2a2a;
		border-color: #444;
	}

	:global(body.dark-mode) .feature-card:hover {
		border-color: #4a90e2;
	}

	:global(body.dark-mode) .feature-card p {
		color: #e0e0e0;
	}

	:global(body.dark-mode) .cta-section {
		background: #2a2a2a;
		border-color: #444;
	}

	:global(body.dark-mode) .cta-section h2 {
		color: white;
	}

	:global(body.dark-mode .cta-button h5) {
		color: black;
	}

	@media (max-width: 768px) {
		.features-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
