<script>
	import { fade } from "svelte/transition";

    let duration = $state(800);

</script>
<div class="container" in:fade={{ duration}}>
    <h1>About</h1>
    <p>Language Learn is an application designed to help users learn Spanish and other languages through the use of tables and cards. Our mission is to make language learning accessible and enjoyable for everyone.</p>
</div>

<style>
    .container {
        max-width: 400px;
        display: flex;
        flex-direction: column;
        height: calc(100vh - 164px);
        gap: 2.074rem;
    }

    h1 {
        margin-bottom: 0px;
    }
</style>