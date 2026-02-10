<script lang="ts">
	import { goto } from '$app/navigation';
	import { user } from '$lib/stores';
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
</script>

<div class="container" in:fly={{ y: -50, duration: 600 }}>
	<h1>Account</h1>
	<h5>View your account details, logout, or delete your account.</h5>
	<p>Total Points: 0</p>
	<div class="account-actions">
		<button onclick={handleLogout}>Logout</button>
		<button>Delete Account</button>
	</div>
</div>

<style>
	.container {
		max-width: 1000px;
		display: flex;
		flex-direction: column;
		gap: 2.074rem;
		min-height: calc(100vh - 164px);
		padding-bottom: 2.074rem;
	}

	h1 {
		margin-bottom: 0px;
	}

    .account-actions {
        display: flex;
        gap: 1rem;
    }

    .account-actions button {
        border-color: red;
    }

    .account-actions button:hover {
        background-color: red;
        color: white;
    }
</style>
