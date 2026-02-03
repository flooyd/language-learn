<script lang="ts">
    import { onMount } from 'svelte';
    import { fade, fly } from 'svelte/transition';

    let duration = $state(800);
    let ready = $state(false);

    onMount(() => {
        ready = true;
    });
</script>

{#if ready}
    <div class="container" in:fade={{ duration }}>
        <h1>Pricing Plans</h1>
        <p>Choose the plan that best suits your language learning needs. We offer a free plan with basic features and a premium plan with advanced features for a small monthly fee.</p>
        <div class="plans">
            <div class="plan">
                <h2>Free Plan</h2>
                <ul>
                    <li>Access to basic tables and flashcards</li>
                    <li>Limited daily practice sessions</li>
                    <li>Community support</li>
                </ul>
            </div>
            <div class="plan">
                <h2>Premium Plan - $9.99/month</h2>
                <ul>
                    <li>Access to all tables and flashcards</li>
                    <li>Unlimited daily practice sessions</li>
                    <li>Personalized learning paths</li>
                    <li>Email support</li>
                </ul>
            </div>
        </div>
    </div>
{/if}

<style>
    .container {
        display: flex;
        justify-content: center;
        flex-direction: column;
        height: calc(100vh - 142.954px);
        padding: 20px;
        gap: 2.074rem;
    }

    .plans {
        display: flex;
        gap: 2rem;
    }

    .plan {
        border: 2px solid black;
        padding: 1rem;
        
    }

    .plan h2 {
        text-align: center;
    }

    .plan ul {
        list-style-type: none;
        padding: 0;
    }

    .plan li {
        margin-bottom: 0.5rem;
    }
</style>