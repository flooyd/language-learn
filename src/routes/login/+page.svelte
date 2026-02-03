<script lang="ts">
	import { fade } from "svelte/transition";

    let loginOrRegister = $state("login");
    let duration = $state(800);
    
</script>

<div class="container" in:fade={{ duration}}>
    <h1>{loginOrRegister === "login" ? "Login" : "Register"}</h1>
    <form>
        <label for="username">Username:</label>
        <input type="text" id="username" name="username" required />

        <label for="password">Password:</label>
        <input type="password" id="password" name="password" required />

        <button type="submit">{loginOrRegister === "login" ? "Login" : "Register"}</button>
    </form>
    {#if loginOrRegister === "login"}
        <p>Don't have an account? <button onclick={() => loginOrRegister = "register"}>Register here</button></p>
    {:else}
        <p>Already have an account? <button onclick={() => loginOrRegister = "login"}>Login here</button></p>
    {/if}
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

    h1 {
        text-align: center;
        margin-bottom: 20px;
    }

    form {
        display: flex;
        flex-direction: column;
    }

    label {
        margin-bottom: 5px;
        font-weight: bold;
    }

    input {
        margin-bottom: 15px;
        padding: 8px;
        border: 1px solid #ccc;
        border-radius: 5px;
    }
</style>