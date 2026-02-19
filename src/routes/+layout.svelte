<script lang="ts">
	import { fly } from 'svelte/transition';
	import favicon from '$lib/assets/favicon.svg';
	import { onMount } from 'svelte';
	import { afterNavigate } from '$app/navigation';
	import { filteredWords, filterMaxPoints, filterMinPoints, selectedCategory, selectedMode, user, wordPoints, words } from '$lib/stores';
	import type { LayoutData } from './$types';
	import { getWordPoints } from '$lib/util';
	import * as spanishData from '$lib/data/spanish.json';

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

	const wordList = $derived.by(() => {
		const list = $selectedCategory ? spanishData[$selectedCategory as keyof typeof spanishData] : undefined;
		if (!list || !Array.isArray(list)) return [];
		return list.map((w) => ({ ...w, points: $wordPoints.find((wp) => wp.word === w.spanish && wp.language === 'spanish')?.points ?? 0 }));
	});

	$effect(() => {
		$words = wordList;
		$filteredWords = wordList.filter(word => word.points >= $filterMinPoints && word.points <= $filterMaxPoints);
	});

	// Close menu on navigation
	const handleNavigation = () => {
		menuOpen = false;
	};

	afterNavigate(() => {
		handleNavigation();
	});

	onMount(() => {
		getWordPoints().then(() => {
			$selectedCategory = localStorage.getItem('selectedCategory') || '';
			$selectedMode = localStorage.getItem('selectedMode') || '';
			$filterMinPoints = parseInt(localStorage.getItem('filterMinPoints') || '0', 10);
			$filterMaxPoints = parseInt(localStorage.getItem('filterMaxPoints') || '100', 10);
			ready = true;
		});

		// Blur buttons after tap/click so mobile doesn't keep them highlighted (sticky focus)
		const blurButton = (e: Event) => {
			const target = e.target;
			if (target instanceof HTMLButtonElement) {
				setTimeout(() => target.blur(), 0);
			}
		};
		document.body.addEventListener('click', blurButton, true);
		return () => document.body.removeEventListener('click', blurButton, true);
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

		if($user) {
			getWordPoints();
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
	/* ========================================
	   DESIGN SYSTEM - CSS Custom Properties
	   ======================================== */

	:global(:root) {
		/* Typography Scale - Minor Third (1.200) */
		--text-xs: 0.694rem;
		--text-sm: 0.833rem;
		--text-base: 1rem;
		--text-md: 1.2rem;
		--text-lg: 1.44rem;
		--text-xl: 1.728rem;
		--text-2xl: 2.074rem;
		--text-3xl: 2.488rem;
		--text-4xl: 2.986rem;

		/* Spacing Scale */
		--space-2xs: 0.25rem;
		--space-xs: 0.5rem;
		--space-sm: 0.833rem;
		--space-md: 1rem;
		--space-lg: 1.2rem;
		--space-xl: 1.44rem;
		--space-2xl: 1.728rem;
		--space-3xl: 2.074rem;
		--space-4xl: 2.488rem;
		--space-5xl: 2.986rem;

		/* Border Radius */
		--radius-sm: 0.5rem;
		--radius-md: 0.833rem;
		--radius-lg: 1rem;
		--radius-xl: 1.2rem;
		--radius-2xl: 1.44rem;
		--radius-full: 9999px;

		/* Transitions */
		--transition-fast: 150ms cubic-bezier(0.4, 0, 0.2, 1);
		--transition-base: 250ms cubic-bezier(0.4, 0, 0.2, 1);
		--transition-slow: 350ms cubic-bezier(0.4, 0, 0.2, 1);

		/* Colors - Light Mode */
		--bg-primary: #FFFFFF;
		--bg-secondary: #FAFAFA;
		--bg-tertiary: #F5F5F5;
		--bg-nav: rgba(255, 255, 255, 0.82);
		--text-primary: #0A0A0A;
		--text-secondary: #525252;
		--text-tertiary: #737373;
		--border-color: rgba(0, 0, 0, 0.08);
		--border-color-strong: rgba(0, 0, 0, 0.15);
		--accent-green: #16A34A;
		--accent-green-hover: #15803D;
		--accent-green-subtle: rgba(22, 163, 74, 0.08);
		--accent-green-text: #FFFFFF;
		--accent-blue: #2563EB;
		--accent-blue-hover: #1D4ED8;
		--accent-blue-subtle: rgba(37, 99, 235, 0.06);
		--accent-blue-text: #FFFFFF;
		--accent-red: #DC2626;
		--accent-red-hover: #B91C1C;
		--accent-red-subtle: rgba(220, 38, 38, 0.06);
		--shadow-xs: 0 1px 2px rgba(0, 0, 0, 0.03);
		--shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.04), 0 1px 2px rgba(0, 0, 0, 0.06);
		--shadow-md: 0 4px 6px rgba(0, 0, 0, 0.04), 0 2px 4px rgba(0, 0, 0, 0.04);
		--shadow-lg: 0 10px 20px rgba(0, 0, 0, 0.06), 0 4px 8px rgba(0, 0, 0, 0.04);
		--shadow-xl: 0 20px 40px rgba(0, 0, 0, 0.08), 0 8px 16px rgba(0, 0, 0, 0.04);
		--header-bg: var(--accent-blue-subtle);
		--header-border: var(--accent-blue);
		--card-bg: var(--bg-primary);
		--card-border: var(--border-color);
		--input-bg: var(--bg-primary);
		--input-border: rgba(0, 0, 0, 0.15);
	}

	:global(body.dark-mode) {
		--bg-primary: #000000;
		--bg-secondary: #0A0A0A;
		--bg-tertiary: #141414;
		--bg-nav: rgba(0, 0, 0, 0.82);
		--text-primary: #FAFAFA;
		--text-secondary: #A3A3A3;
		--text-tertiary: #737373;
		--border-color: rgba(255, 255, 255, 0.06);
		--border-color-strong: rgba(255, 255, 255, 0.12);
		--accent-green: #22C55E;
		--accent-green-hover: #16A34A;
		--accent-green-subtle: rgba(34, 197, 94, 0.1);
		--accent-green-text: #000000;
		--accent-blue: #3B82F6;
		--accent-blue-hover: #2563EB;
		--accent-blue-subtle: rgba(59, 130, 246, 0.08);
		--accent-blue-text: #000000;
		--accent-red: #EF4444;
		--accent-red-hover: #DC2626;
		--accent-red-subtle: rgba(239, 68, 68, 0.1);
		--shadow-xs: 0 1px 2px rgba(0, 0, 0, 0.15);
		--shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.2), 0 1px 2px rgba(0, 0, 0, 0.2);
		--shadow-md: 0 4px 6px rgba(0, 0, 0, 0.25), 0 2px 4px rgba(0, 0, 0, 0.15);
		--shadow-lg: 0 10px 20px rgba(0, 0, 0, 0.3), 0 4px 8px rgba(0, 0, 0, 0.2);
		--shadow-xl: 0 20px 40px rgba(0, 0, 0, 0.4), 0 8px 16px rgba(0, 0, 0, 0.25);
		--header-bg: var(--accent-blue-subtle);
		--header-border: var(--accent-blue);
		--card-bg: var(--bg-tertiary);
		--card-border: var(--border-color);
		--input-bg: var(--bg-secondary);
		--input-border: rgba(255, 255, 255, 0.12);
	}

	/* --- GLOBAL STYLES --- */
	:global(*) {
		font-family: 'Bricolage Grotesque', sans-serif;
		margin: 0;
		padding: 0;
		font-size: var(--text-base);
		box-sizing: border-box;
	}

	:global(body) {
		position: relative;
		line-height: 1.6;
		padding: var(--space-lg);
		background: var(--bg-primary);
		color: var(--text-primary);
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}

	:global(h1) {
		font-size: var(--text-4xl);
		font-weight: 800;
		line-height: 1.15;
		margin-bottom: var(--space-3xl);
		letter-spacing: -0.02em;
		color: var(--text-primary);
	}

	:global(h2) {
		font-size: var(--text-3xl);
		font-weight: 800;
		line-height: 1.2;
		letter-spacing: -0.015em;
		color: var(--text-primary);
	}

	:global(h3) {
		font-size: var(--text-2xl);
		font-weight: 700;
		line-height: 1.25;
		color: var(--text-primary);
	}

	:global(h4) {
		font-size: var(--text-xl);
		font-weight: 600;
		color: var(--text-primary);
	}

	:global(h5) {
		font-size: var(--text-lg);
		font-weight: 400;
		color: var(--text-secondary);
		line-height: 1.5;
	}

	:global(h6) {
		font-size: var(--text-md);
		font-weight: 400;
		color: var(--text-secondary);
	}

	:global(p) {
		margin-bottom: var(--space-md);
		color: var(--text-secondary);
		font-weight: 300;
	}

	:global(a) {
		text-decoration: none;
		color: inherit;
		-webkit-tap-highlight-color: transparent;
	}

	:global(button) {
		cursor: pointer;
		background: var(--card-bg);
		color: var(--text-primary);
		padding: var(--space-sm) var(--space-lg);
		border-radius: var(--radius-md);
		transition: all var(--transition-base);
		width: fit-content;
		font-weight: 600;
		border: 1.5px solid var(--border-color-strong);
		-webkit-tap-highlight-color: transparent;
	}

	@media (hover: hover) {
		:global(button:hover) {
			background: var(--accent-blue-subtle);
			border-color: var(--accent-blue);
			box-shadow: var(--shadow-sm);
		}
	}

	:global(button:focus:not(:focus-visible)) {
		background: var(--card-bg);
	}

	:global(button:focus-visible) {
		outline: 2px solid var(--accent-blue);
		outline-offset: 2px;
		background: var(--accent-blue-subtle);
	}

	:global(::-webkit-scrollbar) {
		width: 10px !important;
	}

	:global(::-webkit-scrollbar-track) {
		background: var(--bg-secondary) !important;
	}

	:global(::-webkit-scrollbar-thumb) {
		background: var(--accent-blue) !important;
		border-radius: var(--radius-full);
		border: 2px solid var(--bg-secondary);
	}

	:global(.description) {
		color: var(--text-tertiary);
		font-size: var(--text-md);
		font-weight: 300;
		margin: 0;
	}

	/* --- NAVIGATION --- */
	nav {
		display: flex;
		justify-content: space-between;
		align-items: center;
		position: sticky;
		top: 0;
		flex-wrap: wrap;
		z-index: 100;
		background: var(--bg-nav);
		backdrop-filter: blur(16px);
		-webkit-backdrop-filter: blur(16px);
		border-bottom: 1px solid var(--border-color);
		margin: calc(-1 * var(--space-lg));
		margin-bottom: 0;
		padding: var(--space-sm) var(--space-lg);
	}

	nav a {
		text-decoration: none;
		color: var(--text-primary);
		padding-bottom: 0;
	}

	nav a > h5 {
		font-weight: 400;
		color: var(--text-secondary);
		transition: color var(--transition-fast);
	}

	nav a:hover > h5 {
		color: var(--accent-blue);
	}

	nav h1 {
		margin: 0;
		font-size: var(--text-xl);
		font-weight: 800;
		letter-spacing: -0.02em;
	}

	.left-nav {
		display: flex;
		gap: var(--space-4xl);
		align-items: center;
	}

	.desktop-only {
		display: block;
	}

	.right-nav {
		display: flex;
		gap: var(--space-md);
		align-items: center;
	}

	.hamburger {
		display: none;
		flex-direction: column;
		background: none !important;
		border: none !important;
		padding: var(--space-2xs);
		cursor: pointer;
		gap: 5px;
		width: auto;
		box-shadow: none !important;
	}

	.hamburger:hover,
	.hamburger:focus,
	.hamburger:active {
		background: none !important;
		border: none !important;
		outline: none;
		box-shadow: none !important;
	}

	.hamburger span {
		width: 22px;
		height: 2px;
		background: var(--text-primary);
		border-radius: var(--radius-full);
		transition: all var(--transition-fast);
	}

	.menu {
		position: absolute;
		top: 100%;
		right: var(--space-lg);
		background: var(--card-bg);
		border: 1px solid var(--border-color-strong);
		border-radius: var(--radius-lg);
		display: flex;
		flex-direction: column;
		padding: var(--space-xs) 0;
		min-width: 180px;
		z-index: 10;
		box-shadow: var(--shadow-lg);
		backdrop-filter: blur(16px);
		-webkit-backdrop-filter: blur(16px);
	}

	.menu a {
		padding: var(--space-sm) var(--space-lg);
		display: block;
		white-space: nowrap;
		transition: background var(--transition-fast);
	}

	.menu a:hover {
		background: var(--accent-blue-subtle);
	}

	.dark-mode-toggle {
		background: transparent !important;
		border: none !important;
		font-size: var(--text-lg);
		cursor: pointer;
		padding: var(--space-2xs);
		margin: 0;
		transition: transform var(--transition-fast);
		box-shadow: none !important;
	}

	.dark-mode-toggle:hover {
		transform: scale(1.15);
		border: none !important;
		background: transparent !important;
		box-shadow: none !important;
	}

	.dark-mode-toggle-menu {
		background: none !important;
		border: none !important;
		color: var(--text-secondary);
		padding: var(--space-sm) var(--space-lg);
		text-align: left;
		width: 100%;
		font-weight: 400;
		display: block;
		white-space: nowrap;
		box-shadow: none !important;
	}

	.dark-mode-toggle-menu:hover {
		background: var(--accent-blue-subtle) !important;
		border: none !important;
		color: var(--text-primary);
		box-shadow: none !important;
	}

	/* --- RESPONSIVE --- */
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
			font-size: var(--text-lg);
			letter-spacing: -0.01em;
		}

		:global(h2) {
			font-size: var(--text-md);
		}

		:global(h3) {
			font-size: var(--text-base);
		}

		:global(h4) {
			font-size: var(--text-sm);
		}

		:global(h5) {
			font-size: var(--text-base);
		}

		:global(*) {
			font-size: var(--text-base);
		}
	}
</style>
