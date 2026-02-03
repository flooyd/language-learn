<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

{@render children()}

<style>
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

	@media (max-width: 1024px) {
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
