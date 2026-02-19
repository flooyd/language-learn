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
	<div class="hero-grid">
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

		<div class="preview" in:fly={{ y: 30, duration: 700, delay: 500 }}>
			<div class="preview-section">
				<span class="preview-label">Flashcards</span>
				<div class="sample-cards">
					<div class="sample-card">
						<span class="sample-word">gracias</span>
					</div>
					<div class="sample-card flipped-preview">
						<span class="sample-translation">thank you</span>
						<span class="sample-pos">phrase</span>
					</div>
				</div>
			</div>

			<div class="preview-section">
				<span class="preview-label">Table</span>
				<div class="sample-table">
					<div class="sample-thead">
						<span>Spanish</span>
						<span>English</span>
						<span>Part of Speech</span>
					</div>
					<div class="sample-row">
						<span>casa</span>
						<span>house</span>
						<span class="sample-badge">noun</span>
					</div>
					<div class="sample-row">
						<span>bueno</span>
						<span>good</span>
						<span class="sample-badge">adjective</span>
					</div>
					<div class="sample-row">
						<span>hablar</span>
						<span>to speak</span>
						<span class="sample-badge">verb</span>
					</div>
					<div class="sample-row">
						<span>rojo</span>
						<span>red</span>
						<span class="sample-badge">adjective</span>
					</div>
					<div class="sample-row">
						<span>agua</span>
						<span>water</span>
						<span class="sample-badge">noun</span>
					</div>
				</div>
			</div>
		</div>
	</div>
{/if}

<style>
	.hero-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: var(--space-3xl);
		min-height: calc(100vh - 164px);
		padding-bottom: var(--space-md);
		padding-top: var(--space-xl);
		align-items: start;
	}

	.intro {
		display: flex;
		flex-direction: column;
		gap: var(--space-xl);
	}

	.intro h1 {
		margin-top: 0;
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

	/* ── Preview Section ─────────────────────────────── */

	.preview {
		display: flex;
		flex-direction: column;
		gap: var(--space-xl);
	}

	.preview-section {
		display: flex;
		flex-direction: column;
		gap: var(--space-sm);
	}

	.preview-label {
		font-size: var(--text-xs);
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.08em;
		color: var(--text-tertiary);
	}

	/* ── Sample Flashcards ───────────────────────────── */

	.sample-cards {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: var(--space-md);
	}

	.sample-card {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: var(--space-xs);
		padding: var(--space-xl) var(--space-lg);
		border-radius: var(--radius-xl);
		background: var(--card-bg);
		border: 1px solid var(--border-color);
		box-shadow: var(--shadow-md);
		text-align: center;
		min-height: 160px;
		transition: all var(--transition-base);
	}

	.sample-card.flipped-preview {
		background: var(--accent-blue);
		border-color: var(--accent-blue);
	}

	.sample-card.flipped-preview .sample-translation {
		color: var(--accent-blue-text);
		font-size: var(--text-xl);
		font-weight: 800;
	}

	.sample-card.flipped-preview .sample-pos {
		color: var(--accent-blue-text);
		opacity: 0.6;
	}

	.sample-word {
		font-size: var(--text-xl);
		font-weight: 800;
		color: var(--text-primary);
	}

	.sample-translation {
		font-size: var(--text-sm);
		color: var(--text-tertiary);
		font-weight: 400;
	}

	.sample-pos {
		font-size: var(--text-xs);
		color: var(--text-tertiary);
		font-style: italic;
		opacity: 0.7;
	}

	/* ── Sample Table ────────────────────────────────── */

	.sample-table {
		border: 1px solid var(--border-color);
		border-radius: var(--radius-xl);
		overflow: hidden;
		box-shadow: var(--shadow-sm);
	}

	.sample-thead {
		display: grid;
		grid-template-columns: 1fr 1fr 0.8fr;
		gap: var(--space-sm);
		padding: var(--space-sm) var(--space-md);
		background: var(--header-bg);
		border-bottom: 1px solid var(--border-color);
		font-size: var(--text-xs);
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.06em;
		color: var(--text-tertiary);
	}

	.sample-row {
		display: grid;
		grid-template-columns: 1fr 1fr 0.8fr;
		gap: var(--space-sm);
		padding: var(--space-sm) var(--space-md);
		font-size: var(--text-sm);
		color: var(--text-primary);
		border-bottom: 1px solid var(--border-color);
		transition: background var(--transition-base);
	}

	.sample-row:last-child {
		border-bottom: none;
	}

	.sample-row:hover {
		background: var(--accent-blue-subtle);
	}

	.sample-badge {
		font-size: var(--text-xs);
		color: var(--text-tertiary);
		font-style: italic;
	}

	/* ── Responsive ──────────────────────────────────── */

	@media (max-width: 1024px) {
		.hero-grid {
			grid-template-columns: 1fr;
			gap: var(--space-xl);
		}
	}

	@media (max-width: 768px) {
		.intro {
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

		.sample-cards {
			grid-template-columns: 1fr 1fr;
		}

		.sample-card {
			min-height: 130px;
			padding: var(--space-md) var(--space-sm);
		}
	}
</style>
