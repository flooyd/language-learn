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
		<p class="subtitle" in:fly={{ y: -30, duration: 600, delay: 150 }}>
			Choose the plan that best suits your language learning needs. Start free and upgrade anytime.
		</p>
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
					<li class="not-included">✗ Progress tracking</li>
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
					<li class="included">✓ Table and Card learning modes</li>
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
		gap: 1rem;
		padding-bottom: 2rem;
	}

	h1 {
		margin-bottom: 0px;
	}

	.subtitle {
		font-size: 1.2rem;
		margin-bottom: 0px;
	}

	.plans {
		display: flex;
		flex-wrap: wrap;
		gap: 2rem;
		align-items: stretch;
	}

	.plan {
		flex: 1;
		min-width: 280px;
		max-width: 400px;
		padding: 2rem;
		border-radius: 12px;
		box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
		display: flex;
		flex-direction: column;
		position: relative;
		transition: transform 0.3s ease, box-shadow 0.3s ease;
		background: white;
		border: 2px solid #e0e0e0;
	}

	.plan:hover {
		transform: translateY(-8px);
		box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
	}

	.free-plan {
		border-color: #9e9e9e;
	}

	.premium-plan {
		border-color: #4a90e2;
		background: linear-gradient(135deg, #ffffff 0%, #f0f8ff 100%);
		border-width: 3px;
	}

	.badge {
		position: absolute;
		top: -12px;
		left: 50%;
		transform: translateX(-50%);
		background: #4a90e2;
		color: black;
		padding: 0.5rem 1.5rem;
		border-radius: 20px;
		font-weight: bold;
		font-size: 0.9rem;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
	}

	.plan h2 {
		text-align: center;
		margin-bottom: 0px;
		font-size: 2.074rem;
	}

	.price {
		text-align: center;
		margin-bottom: 1rem;
	}

	.amount {
		font-size: 3rem;
		font-weight: bold;
		color: #4a90e2;
	}

	.period {
		font-size: 1.2rem;
		color: #666;
		margin-left: 0.25rem;
	}

	.plan ul {
		list-style-type: none;
		padding: 0;
		flex-grow: 1;
	}

	.plan li {
		margin-bottom: 1rem;
		padding-left: 0.5rem;
		font-size: 1.1rem;
	}

	.plan li.included {
		color: #2e7d32;
		font-weight: 500;
	}

	.plan li.not-included {
		color: #9e9e9e;
		font-weight: 400;
	}

	.plan-button {
		width: 100%;
		padding: 1rem;
		font-size: 1.2rem;
		font-weight: bold;
		border-radius: 5px;;
		cursor: pointer;
		transition: all 0.3s ease;
		margin-top: auto;
	}

	.free-button {
		background: white;
		color: black;
		border: 3px solid #9e9e9e;
	}

	.free-button:hover {
		background: #f5f5f5;
		border-color: #757575;
		transform: scale(1.02);
	}

	.premium-button {
		background: #4a90e2;
		color: black;
		border: 3px solid black;
	}

	.premium-button:hover {
		background: #87ceeb;
		transform: scale(1.02);
	}

	/* Dark Mode Styles */
	:global(body.dark-mode) .plan {
		background: #2a2a2a;
		border-color: #444;
		color: #e0e0e0;
	}

	:global(body.dark-mode) .premium-plan {
		background: linear-gradient(135deg, #2a2a2a 0%, #1e3a5f 100%);
		border-color: #4a90e2;
	}

	:global(body.dark-mode) .badge {
		background: #4a90e2;
		color: white;
	}

	:global(body.dark-mode) .amount {
		color: #4a90e2;
	}

	:global(body.dark-mode) .period {
		color: #e0e0e0;
	}

	:global(body.dark-mode) .plan li.included {
		color: #66bb6a;
	}

	:global(body.dark-mode) .plan li.not-included {
		color: #757575;
	}

	:global(body.dark-mode) .free-button {
		background: #2a2a2a;
		color: #e0e0e0;
		border-color: #666;
	}

	:global(body.dark-mode) .free-button:hover {
		background: #3a3a3a;
		border-color: #888;
	}

	:global(body.dark-mode) .premium-button {
		background: #4a90e2;
		color: white;
	}

	:global(body.dark-mode) .premium-button:hover {
		background: #5a9fe2;
		border-color: #6aafe2;
	}

	:global(body.dark-mode) .subtitle {
		color: #e0e0e0;
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
			font-size: 2.5rem;
		}

		.plan h2 {
			font-size: 1.728rem;
		}
	}
</style>
