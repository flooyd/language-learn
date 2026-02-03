<script>
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';

	let duration = $state(800);
	let ready = $state(false);

	onMount(() => {
		ready = true;
	});
</script>

{#if ready}
	<nav transition:fly={{ y: -1000, duration }}>
		<div class="left-nav">
			<a href="/"><h1>Language Learn</h1></a>
			<a href="/about"><h3>About</h3></a>
		</div>
		<a href="/login"><h3>Login</h3></a>
	</nav>
	<div class="intro" transition:fly={{ x: -1000, duration }}>
		<h1>Welcome to Language Learn</h1>
		<h3>Learn Spanish and other languages using a table or flashcards.</h3>
        <button><h3>Start Learning</h3></button>
	</div>
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

	.intro {
		text-align: center;
		display: flex;
		flex-direction: column;
		justify-content: center;
		height: calc(100vh - 142.954px);
	}

	.intro h1 {
		background: #add8e6;
		padding: 10px;
		width: fit-content;
	}

	.intro h3 {
		background: #f0e68c;
		padding: 10px;
		max-width: 638.25px;
		text-align: left;
	}

    .intro button h3 {
        padding: 0px;
        margin: 0px;
        background: black;
    }

	@media (max-width: 768px) {
		.intro h3 {
			max-width: 318.19px;
		}
	}
</style>
