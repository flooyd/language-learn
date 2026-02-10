<script lang="ts">
	import { fly } from 'svelte/transition';
	import favicon from '$lib/assets/favicon.svg';
	import { onMount } from 'svelte';
	import { afterNavigate } from '$app/navigation';
	import { user } from '$lib/stores';
	import type { LayoutData } from './$types';

	interface Props {
		children: any;
		data: LayoutData;
	}

	let { children, data }: Props = $props();

	let ready = $state(false);
	let duration = $state(600);
	let menuOpen = $state(false);

	// Load dark mode immediately to prevent flash
	let darkMode = $state(
		typeof localStorage !== 'undefined' && localStorage.getItem('darkMode') === 'true'
	);

	// Close menu on navigation
	const handleNavigation = () => {
		console.log('true');
		menuOpen = false;
	};

	afterNavigate(() => {
		handleNavigation();
	});

	onMount(() => {
		ready = true;
	});

	// Apply dark mode class to body element
	$effect(() => {
		if (typeof document !== 'undefined') {
			if (darkMode) {
				document.body.classList.add('dark-mode');
			} else {
				document.body.classList.remove('dark-mode');
			}
		}
	});

	$effect(() => {
		if (data?.user) {
			$user = data.user;
		} else {
			$user = null;
		}
	});

	const toggleDarkMode = () => {
		darkMode = !darkMode;
		localStorage.setItem('darkMode', darkMode.toString());
	};
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

{#if ready}
	<nav transition:fly={{ y: -1000, duration }}>
		<div class="left-nav">
			<a href="/"><h1>Language Learn</h1></a>
			<a href="/about" class="desktop-only"><h5>About</h5></a>
			<a href="/learn" class="desktop-only"><h5>Learn</h5></a>
			<a href="/pricing" class="desktop-only"><h5>Pricing</h5></a>
			{#if $user}
				<a href="/account" class="desktop-only"><h5>Account</h5></a>
			{/if}
			<button class="dark-mode-toggle desktop-only" onclick={toggleDarkMode}>
				{darkMode ? '☀️' : '🌙'}
			</button>
		</div>
		<div class="right-nav">
			{#if !$user}
				<a href="/login"><h5>Login</h5></a>
			{/if}
			<button
				class="hamburger"
				onclick={() => (menuOpen = !menuOpen)}
				aria-label="Toggle navigation menu"
			>
				<span></span>
				<span></span>
				<span></span>
			</button>
		</div>
		{#if menuOpen}
			<div class="menu" transition:fly={{ y: -10, duration: 200 }}>
				<a href="/about" onclick={() => (menuOpen = false)}><h5>About</h5></a>
				<a href="/learn" onclick={() => (menuOpen = false)}><h5>Learn</h5></a>
				<a href="/pricing" onclick={() => (menuOpen = false)}><h5>Pricing</h5></a>
				{#if $user}
					<a href="/account" onclick={() => (menuOpen = false)}><h5>Account</h5></a>
				{/if}
				<button class="dark-mode-toggle-menu" onclick={toggleDarkMode}>
					{darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
				</button>
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
	}

	nav a {
		text-decoration: none;
		color: black;
		padding-bottom: 0.0833rem;
	}

	nav a:hover > h5 {
		color: #4a90e2;
	}

	nav h1 {
		margin: 0;
	}

	.left-nav {
		display: flex;
		gap: 2.986rem;
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
		background: none !important;
		border: none !important;
		padding: 0;
		cursor: pointer;
		gap: 5px;
		width: auto;
	}

	.hamburger:hover,
	.hamburger:focus,
	.hamburger:active {
		background: none !important;
		border: none !important;
		outline: none;
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

	.menu a:hover {
		background: #f0e68c;
	}

	.dark-mode-toggle {
		background: transparent;
		border: none;
		font-size: 1.5rem;
		cursor: pointer;
		padding: 0;
		margin: 0;
		transition: transform 0.2s;
	}

	.dark-mode-toggle:hover {
		transform: scale(1.2);
		border: none;
	}

	.dark-mode-toggle-menu {
		background: none;
		border: none;
		color: inherit;
		padding: 11.11px 19.2px;
		text-align: left;
		width: 100%;
		font-weight: normal;
		display: block;
		white-space: nowrap;
	}

	.dark-mode-toggle-menu:hover {
		background: #f0e68c;
		border: none;
		color: inherit;
	}

	:global(*) {
		font-family: 'IBM Plex Sans', sans-serif;
		margin: 0;
		padding: 0;
		font-size: 1rem;
		box-sizing: border-box;
	}

	:global(body) {
		position: relative;
		line-height: 1.6;
		padding: 19.2px;
		background: lightyellow;
	}

	:global(h1) {
		font-family: 'ApfelGrotezk-Regular', sans-serif;
		src: url('ApfelGrotezk-Regular.woff');
		margin-bottom: 2.074rem;
		margin-top: 1rem;
	}

	:global(h1) {
		font-size: 2.986rem;
	}

	:global(h2) {
		font-family: 'ApfelGrotezk-Regular', sans-serif;
		src: url('ApfelGrotezk-Regular.woff');
		font-size: 2.488rem;
	}

	:global(h3) {
		font-family: 'ApfelGrotezk-Regular', sans-serif;
		src: url('ApfelGrotezk-Regular.woff');
		font-size: 2.074rem;
	}

	:global(h4) {
		font-size: 1.728rem;
	}

	:global(h5) {
		font-size: 1.44rem;
		color: #333;
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
		background: white;
		color: black;
		padding: 0.833rem;
		border-radius: 5px;
		transition: background 0.3s ease;
		width: fit-content;
		font-weight: bold;
		border: 5px solid #4a90e2;
		border-radius: 5px;
	}

	:global(button:hover) {
		background: #4a90e2;
	}

	:global(::-webkit-scrollbar) {
		width: 17px !important;
	}

	:global(::-webkit-scrollbar-track) {
		background: lightyellow !important;
	}

	:global(::-webkit-scrollbar-thumb) {
		background: #4a90e2 !important;
		border-radius: 5px;
	}

	:global(.description) {
		color: #666;
		font-size: 1.1rem;
		margin: 0;
	}

	/* Dark Mode Styles */
	:global(body.dark-mode) {
		background: #121212;
		color: white;
	}

	:global(body.dark-mode) nav {
		background: #121212;
	}

	:global(body.dark-mode) nav a {
		color: #e0e0e0;
	}

	:global(body.dark-mode) .hamburger {
		background: none !important;
		border: none !important;
	}

	:global(body.dark-mode) .hamburger:hover,
	:global(body.dark-mode) .hamburger:focus,
	:global(body.dark-mode) .hamburger:active {
		background: none !important;
		border: none !important;
		outline: none;
	}

	:global(body.dark-mode) .hamburger span {
		background: #e0e0e0;
	}

	:global(body.dark-mode) .menu {
		background: #2a2a2a;
		border-color: #444;
	}

	:global(body.dark-mode) .menu a:hover {
		background: #3a3a3a;
	}

	:global(body.dark-mode) .dark-mode-toggle-menu:hover {
		background: #3a3a3a;
	}

	:global(body.dark-mode) button {
		background: #e0e0e0;
		color: black;
		border-color: #4a90e2;
	}

	:global(body.dark-mode) ::-webkit-scrollbar-track {
		background: #1a1a1a !important;
	}

	:global(body.dark-mode) ::-webkit-scrollbar-thumb {
		background: #4a90e2 !important;
	}

	:global(body.dark-mode) a {
		color: #4a90e2;
	}

	:global(body.dark-mode h5){
		color: white;
	}

	@media (max-width: 1090px) {
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
		:global(h4) {
			font-size: 0.833rem;
		}
		:global(h5) {
			font-size: 1rem;
		}

		:global(*) {
			font-size: 1rem;
		}
	}
</style>
