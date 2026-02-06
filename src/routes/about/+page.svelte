<script>
	import { fade, fly } from "svelte/transition";
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
			<p>Language Learn is designed to make language learning accessible, enjoyable, and effective for everyone. We believe that learning a new language should be simple, interactive, and fun.</p>
		</div>

		<div class="features-section" in:fly={{ y: -20, duration: 600, delay: 300 }}>
			<h2>What We Offer</h2>
			<div class="features-grid">
				<div class="feature-card">
					<div class="feature-icon"></div>
					<h3>Comprehensive Vocabulary</h3>
					<p>500+ Spanish words across 5 learning levels, from basics to advanced.</p>
				</div>
				<div class="feature-card">
					<div class="feature-icon"></div>
					<h3>Dual Learning Modes</h3>
					<p>Switch between table view for reference and flashcards for active learning.</p>
				</div>
				<div class="feature-card">
					<div class="feature-icon"></div>
					<h3>Progressive Learning</h3>
					<p>Start with basics and advance through beginner, intermediate, and advanced levels.</p>
				</div>
				<div class="feature-card">
					<div class="feature-icon"></div>
					<h3>Free to Start</h3>
					<p>Begin your language journey with our free plan, upgrade when ready.</p>
				</div>
			</div>
		</div>

		<div class="cta-section" in:fly={{ y: -10, duration: 600, delay: 450 }}>
			<h2>Ready to begin your language journey?</h2>
			<button class="cta-button" onclick={handleClickStartLearning}>
				<h3>Start Learning</h3>
			</button>
		</div>
	</div>
{/if}

<style>
    .container {
        max-width: 1200px;
        display: flex;
        flex-direction: column;
        gap: 1rem;
        padding-bottom: 2.074rem;
    }

    h1 {
        margin-bottom: 0px;
    }

	h2 {
		margin-bottom: 0px;
	}

	h3 {
		margin-bottom: 0;
	}

	/* Mission Card */
	.mission-card {
		transition: transform 0.3s ease, box-shadow 0.3s ease;
	}


	.mission-card h2 {
		color: black;
		margin-bottom: 1rem;
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
		gap: 1.5rem;
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
		transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
	}

	.feature-card:hover {
		transform: translateY(-5px);
		box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
		border-color: #4a90e2;
	}

	.feature-icon {
		font-size: 2.5rem;
	}

	.feature-card h3 {
		color: black;
		font-size: 1.3rem;
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

	.cta-button h3 {
		padding: 0;
		margin: 0;
		background: black;
		color: white;
		border: none;
	}

	.cta-button {
		background: black;
		border: 5px solid #4a90e2;
		transition: transform 0.3s ease;
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

	:global(body.dark-mode) .feature-card h3 {
		color: #e0e0e0;
	}

	:global(body.dark-mode) .feature-card p {
		color: #e0e0e0;
	}

	:global(body.dark-mode) .cta-section {
		background: #2a2a2a;
		border-color: #444;
	}

	:global(body.dark-mode) .cta-section h2 {
		color: #e0e0e0;
	}

	:global(body.dark-mode) .cta-button {
		border-color: #4a90e2;
	}

	@media (max-width: 768px) {
		.container {
			gap: 1rem;
		}

		.features-grid {
			grid-template-columns: 1fr;
		}
	}
</style>