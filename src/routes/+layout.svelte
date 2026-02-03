<script lang="ts">
	import { fly } from 'svelte/transition';
	import favicon from '$lib/assets/favicon.svg';
	import { onMount } from 'svelte';

	let { children } = $props();
	let ready = $state(false);
	let duration = $state(800);

	onMount(() => {
		ready = true;
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

{#if ready}
	<nav transition:fly={{ y: -1000, duration }}>
		<div class="left-nav">
			<a href="/"><h1>Language Learn</h1></a>
			<a href="/about"><h3>About</h3></a>
		</div>
		<a href="/login"><h3>Login</h3></a>
	</nav>
	{@render children()}
{/if}

<style>
	nav {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	nav a {
		text-decoration: none;
		color: black;
		padding-bottom: 0.0833rem;
	}

    nav h3 {
        margin-right: 1rem;
    }

	nav a:hover {
		text-decoration: underline;
	}

	.left-nav {
		display: flex;
		gap: 2.074rem;
		align-items: center;
	}
	
	:global(*) {
		font-family: 'IBM Plex Sans', sans-serif;
		margin: 0;
		padding: 0;
		font-size: 1rem;
		box-sizing: border-box;
	}

	:global(body) {
		line-height: 1.6;
		padding: 20px;
		background: lightyellow;
		height: 100vh;
	}

	:global(h1) {
		font-family: 'Playfair Display', serif;
		margin-bottom: 2.074rem;
	}

	:global(h2, h3, h4, h5, h6) {
		margin-bottom: 2.074rem;
	}

	:global(h1) {
		font-size: 2.986rem;
	}

	:global(h2) {
		font-size: 2.488rem;
	}

	:global(h3) {
		font-size: 2.074rem;
	}

	:global(h4) {
		font-size: 1.728rem;
	}

	:global(h5) {
		font-size: 1.44rem;
	}

	:global(h6) {
		font-size: 1.2rem;
	}

	:global(p) {
		margin-bottom: 1rem;
	}

	:global(a) {
		text-decoration: none;
		color: inherit;
	}

	:global(button) {
		cursor: pointer;
		background: black;
		color: white;
		border: none;
		padding: 10px 15px;
		border-radius: 5px;
		transition: background 0.3s ease;
		width: fit-content;
		font-weight: bold;
		border: 5px solid #add8e6;
		border-radius: 5px;
	}

	:global(button:hover) {
		border: 5px solid #f0e68c;
		color: #f0e68c;
	}

	@media (max-width: 768px) {
		:global(h1) {
			font-size: 1.44rem;
		}

		:global(h2) {
			font-size: 1.2rem;
		}

		:global(h3) {
			font-size: 1rem;
		}

		:global(*) {
			font-size: 1rem;
		}
	}
</style>
