<script>
	import { fade } from "svelte/transition";

    let duration = $state(800);

</script>
<div class="container" in:fade={{ duration}}>
    <h1>About</h1>
    <p>Language Learn is an application designed to help users learn Spanish and other languages through the use of tables and flashcards. Our mission is to make language learning accessible and enjoyable for everyone.</p>
</div>

<style>
    .container {
        max-width: 400px;
        display: flex;
        justify-content: center;
        flex-direction: column;
        height: calc(100vh - 142.954px);
        padding: 20px;
        gap: 2.074rem;
    }

</style>