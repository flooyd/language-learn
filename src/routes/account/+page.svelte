<script lang="ts">
	import { goto } from '$app/navigation';
	import { user, wordPoints } from '$lib/stores';
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';

	let ready = false;

	onMount(() => {
		ready = true;
	});

	const handleLogout = async () => {
		try {
			await fetch('/api/auth/logout', {
				method: 'POST'
			});
            $user = null;
			goto('/');
		} catch (error) {
			console.error('Logout failed:', error);
		}
	}

	const getTotalPoints = () => {
		return $wordPoints.reduce((acc, curr) => acc + curr.points, 0);
	}
</script>

<div class="container" in:fly={{ y: -50, duration: 600 }}>
	<h1>Account</h1>
	<h5>View your account details, logout, or delete your account.</h5>
	<p>Total Points: {getTotalPoints()}</p>
	<div class="account-actions">
		<button onclick={handleLogout}>Logout</button>
		<button>Delete Account</button>
	</div>
</div>

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

	p {
		font-size: var(--text-md);
		font-weight: 600;
		color: var(--text-primary);
	}

	.account-actions {
		display: flex;
		gap: var(--space-md);
	}

	.account-actions button {
		border-color: var(--accent-red);
		color: var(--accent-red);
		background: var(--accent-red-subtle);
		font-weight: 600;
		transition: all var(--transition-base);
	}

	.account-actions button:hover {
		background: var(--accent-red);
		color: white;
		transform: translateY(-2px);
		box-shadow: var(--shadow-md);
	}
</style>
