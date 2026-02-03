<script lang="ts">
	import { fly } from 'svelte/transition';
	import favicon from '$lib/assets/favicon.svg';
	import { onMount } from 'svelte';
	import { afterNavigate } from '$app/navigation';

	let { children } = $props();
	let ready = $state(false);
	let duration = $state(800);
	let menuOpen = $state(false);

	// Close menu on navigation
	const handleNavigation = () => {
		console.log('true')
		menuOpen = false;
	};

	afterNavigate(() => {
		handleNavigation();
	});

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
			<a href="/about" class="desktop-only"><h3>About</h3></a>
			<a href="/learn" class="desktop-only"><h3>Learn</h3></a>
			<a href="/pricing" class="desktop-only"><h3>Pricing</h3></a>
		</div>
		<div class="right-nav">
			<a href="/login"><h3>Login</h3></a>
			<button class="hamburger" onclick={() => (menuOpen = !menuOpen)}>
				<span></span>
				<span></span>
				<span></span>
			</button>
		</div>
		{#if menuOpen}
			<div class="menu" transition:fly={{ y: -10, duration: 200 }}>
				<a href="/about" onclick={() => (menuOpen = false)}><h3>About</h3></a>
				<a href="/learn" onclick={() => (menuOpen = false)}><h3>Learn</h3></a>
				<a href="/pricing" onclick={() => (menuOpen = false)}><h3>Pricing</h3></a>
			</div>
		{/if}
	</nav>
	{@render children()}
{/if}

<style>
	nav {
		display: flex;
		justify-content: space-between;
		align-items: center;
		position: sticky;
		background: lightyellow;
		top: 0px;
		flex-wrap: wrap;
		z-index: 100;
		padding-bottom: 2.986rem;
	}

	nav a {
		text-decoration: none;
		color: black;
		padding-bottom: 0.0833rem;
	}

	nav h1 {
		margin: 0;
	}

	nav h3 {
		margin: 0;
	}

	nav a:hover {
		text-decoration: underline;
	}

	.left-nav {
		display: flex;
		gap: 2.074rem;
		align-items: center;
	}

	.desktop-only {
		display: block;
	}

	.right-nav {
		display: flex;
		gap: 1rem;
		align-items: center;
	}

	.hamburger {
		display: none;
		flex-direction: column;
		background: none;
		border: none;
		padding: 0;
		cursor: pointer;
		gap: 5px;
	}

	.hamburger span {
		width: 25px;
		height: 3px;
		background: black;
		border-radius: 2px;
	}

	.menu {
		position: absolute;
		top: 100%;
		right: 19.2px;
		background: white;
		border: 2px solid black;
		border-radius: 5px;
		display: flex;
		flex-direction: column;
		padding: 11.11px 0;
		min-width: 150px;
		z-index: 10;
	}

	.menu a {
		padding: 11.11px 19.2px;
		display: block;
		white-space: nowrap;
	}

	.menu a h3 {
		margin: 0;
	}

	.menu a:hover {
		background: #f0e68c;
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
		padding: 19.2px;
		background: lightyellow;
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
		padding: 5px;
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

	:global(::-webkit-scrollbar) {
		width: 17px !important;
	}

	:global(::-webkit-scrollbar-track) {
        background: lightyellow !important;
    }

	:global(::-webkit-scrollbar-thumb) {
		background: #add8e6 !important;
		border-radius: 5px;
	}

	@media (max-width: 768px) {
		nav h1 {
			white-space: nowrap;
		}

		.desktop-only {
			display: none;
		}

		.hamburger {
			display: flex;
		}

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
