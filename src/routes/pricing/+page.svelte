<script lang="ts">
	import { onMount } from 'svelte';
	import { fade, fly } from 'svelte/transition';

	let ready = $state(false);

	onMount(() => {
		ready = true;
	});
</script>

{#if ready}
	<div class="container">
		<h1 in:fly={{ y: -50, duration: 600, delay: 0 }}>Pricing</h1>
		<h5 in:fly={{ y: -30, duration: 600, delay: 150 }}>
			Choose the plan that best suits your language learning needs. Start free and upgrade anytime.
		</h5>
		<div class="plans" in:fly={{ y: -20, duration: 600, delay: 300 }}>
			<div class="plan free-plan">
				<h2>Free</h2>
				<div class="price">
					<span class="amount">$0</span>
					<span class="period">/month</span>
				</div>
				<ul>
					<li class="included">✓ Access to Basics category</li>
					<li class="included">✓ Table and Card learning modes</li>
					<li class="not-included">✗ Advanced categories</li>
				</ul>
				<button class="plan-button free-button">Get Started</button>
			</div>
			<div class="plan premium-plan">
				<div class="badge">Most Popular</div>
				<h2>Premium</h2>
				<div class="price">
					<span class="amount">$9.99</span>
					<span class="period">/month</span>
				</div>
				<ul>
					<li class="included">✓ All 5 vocabulary categories</li>
					<li class="included">✓ Table, Card, Quiz, and Sentences learning modes</li>
					<li class="included">✓ Beginner to Advanced content</li>
					<li class="included">✓ Numbers and specialized vocab</li>
				</ul>
				<button class="plan-button premium-button">Choose Premium</button>
			</div>
		</div>
	</div>
{/if}

<style>
	.container {
		display: flex;
		flex-direction: column;
		min-height: calc(100vh - 164px);
		gap: var(--space-xl);
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

	.plans {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-xl);
		align-items: stretch;
	}

	.plan {
		flex: 1;
		min-width: 280px;
		max-width: 420px;
		padding: var(--space-xl);
		border-radius: var(--radius-2xl);
		box-shadow: var(--shadow-md);
		display: flex;
		flex-direction: column;
		position: relative;
		transition: all var(--transition-base);
		background: var(--card-bg);
		border: 1px solid var(--border-color);
	}

	.plan:hover {
		transform: translateY(-6px);
		box-shadow: var(--shadow-xl);
	}

	.free-plan {
		border-color: var(--border-color-strong);
	}

	.premium-plan {
		border-color: var(--accent-green);
		border-width: 2px;
	}

	.badge {
		position: absolute;
		top: -12px;
		left: 50%;
		transform: translateX(-50%);
		background: var(--accent-green);
		color: var(--accent-green-text);
		padding: var(--space-xs) var(--space-xl);
		border-radius: var(--radius-full);
		font-weight: 700;
		font-size: var(--text-sm);
		box-shadow: var(--shadow-md);
		letter-spacing: 0.02em;
	}

	.plan h2 {
		text-align: center;
		margin-bottom: 0;
		font-size: var(--text-2xl);
		color: var(--text-primary);
	}

	.price {
		text-align: center;
		margin-bottom: var(--space-md);
	}

	.amount {
		font-size: var(--text-4xl);
		font-weight: 800;
		color: var(--accent-green);
		letter-spacing: -0.02em;
	}

	.period {
		font-size: var(--text-md);
		color: var(--text-tertiary);
		margin-left: var(--space-2xs);
		font-weight: 300;
	}

	.plan ul {
		list-style-type: none;
		padding: 0;
		flex-grow: 1;
	}

	.plan li {
		margin-bottom: var(--space-md);
		padding-left: var(--space-xs);
		font-size: var(--text-md);
		font-weight: 400;
	}

	.plan li.included {
		color: var(--accent-green);
		font-weight: 500;
	}

	.plan li.not-included {
		color: var(--text-tertiary);
		font-weight: 300;
	}

	.plan-button {
		width: 100%;
		padding: var(--space-md);
		font-size: var(--text-md);
		font-weight: 700;
		border-radius: var(--radius-lg);
		cursor: pointer;
		transition: all var(--transition-base);
		margin-top: auto;
	}

	.free-button {
		background: var(--card-bg);
		color: var(--text-primary);
		border: 1.5px solid var(--border-color-strong);
	}

	.free-button:hover {
		background: var(--accent-blue-subtle);
		border-color: var(--accent-blue);
		transform: translateY(-2px);
		box-shadow: var(--shadow-md);
	}

	.premium-button {
		background: var(--accent-green);
		color: var(--accent-green-text);
		border: 1.5px solid var(--accent-green);
	}

	.premium-button:hover {
		background: var(--accent-green-hover);
		border-color: var(--accent-green-hover);
		transform: translateY(-2px);
		box-shadow: var(--shadow-lg);
	}

	@media (max-width: 768px) {
		.plans {
			flex-direction: column;
		}

		.plan {
			max-width: 100%;
		}

		.container {
			height: auto;
		}

		.amount {
			font-size: var(--text-3xl);
		}

		.plan h2 {
			font-size: var(--text-xl);
		}
	}
</style>
