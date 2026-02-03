<script lang="ts">
	import { onMount } from 'svelte';
	import { fade, fly } from 'svelte/transition';

	let duration = $state(800);
	let ready = $state(false);
	let learningMode = $state('table');

	onMount(() => {
		ready = true;
	});
</script>

{#if ready}
	<div class="container" in:fade={{ duration }}>
		<div class="toolbar">
			<button
				class="mode-button"
				class:active={learningMode === 'table'}
				onclick={() => (learningMode = 'table')}>Table</button
			>
			<button
				class="mode-button"
				class:active={learningMode === 'flashcards'}
				onclick={() => (learningMode = 'flashcards')}>Flashcards</button
			>
		</div>
        {#if learningMode === 'table'}
            <table>
                <thead>
                     <tr>
                    <th>Spanish</th>
                    <th>English</th>
                    <th>Part of Speech</th>
                </tr>
                </thead>
               <tbody>
                <tr>
                    <td>Hola</td>
                    <td>Hello</td>
                    <td>Interjection</td>
                </tr>
                <tr>
                    <td>Adiós</td>
                    <td>Goodbye</td>
                    <td>Interjection</td>
                </tr>
                <tr>
                    <td>Por favor</td>
                    <td>Please</td>
                    <td>Phrase</td>
                </tr>
                <tr>
                    <td>Gracias</td>
                    <td>Thank you</td>
                    <td>Interjection</td>
                </tr>
                <tr>
                    <td>Hola</td>
                    <td>Hello</td>
                    <td>Interjection</td>
                </tr>
                <tr>
                    <td>Adiós</td>
                    <td>Goodbye</td>
                    <td>Interjection</td>
                </tr>
                <tr>
                    <td>Por favor</td>
                    <td>Please</td>
                    <td>Phrase</td>
                </tr>
                <tr>
                    <td>Gracias</td>
                    <td>Thank you</td>
                    <td>Interjection</td>
                </tr>
                <tr>
                    <td>Hola</td>
                    <td>Hello</td>
                    <td>Interjection</td>
                </tr>
                <tr>
                    <td>Adiós</td>
                    <td>Goodbye</td>
                    <td>Interjection</td>
                </tr>
                <tr>
                    <td>Por favor</td>
                    <td>Please</td>
                    <td>Phrase</td>
                </tr>
                <tr>
                    <td>Gracias</td>
                    <td>Thank you</td>
                    <td>Interjection</td>
                </tr>
                <tr>
                    <td>Hola</td>
                    <td>Hello</td>
                    <td>Interjection</td>
                </tr>
                <tr>
                    <td>Adiós</td>
                    <td>Goodbye</td>
                    <td>Interjection</td>
                </tr>
                <tr>
                    <td>Por favor</td>
                    <td>Please</td>
                    <td>Phrase</td>
                </tr>
                <tr>
                    <td>Gracias</td>
                    <td>Thank you</td>
                    <td>Interjection</td>
                </tr>
                <tr>
                    <td>Hola</td>
                    <td>Hello</td>
                    <td>Interjection</td>
                </tr>
                <tr>
                    <td>Adiós</td>
                    <td>Goodbye</td>
                    <td>Interjection</td>
                </tr>
                <tr>
                    <td>Por favor</td>
                    <td>Please</td>
                    <td>Phrase</td>
                </tr>
                <tr>
                    <td>Gracias</td>
                    <td>Thank you</td>
                    <td>Interjection</td>
                </tr>
                <tr>
                    <td>Hola</td>
                    <td>Hello</td>
                    <td>Interjection</td>
                </tr>
                <tr>
                    <td>Adiós</td>
                    <td>Goodbye</td>
                    <td>Interjection</td>
                </tr>
                <tr>
                    <td>Por favor</td>
                    <td>Please</td>
                    <td>Phrase</td>
                </tr>
                <tr>
                    <td>Gracias</td>
                    <td>Thank you</td>
                    <td>Interjection</td>
                </tr>
                <tr>
                    <td>Hola</td>
                    <td>Hello</td>
                    <td>Interjection</td>
                </tr>
                <tr>
                    <td>Adiós</td>
                    <td>Goodbye</td>
                    <td>Interjection</td>
                </tr>
                <tr>
                    <td>Por favor</td>
                    <td>Please</td>
                    <td>Phrase</td>
                </tr>
                <tr>
                    <td>Gracias</td>
                    <td>Thank you</td>
                    <td>Interjection</td>
                </tr>
                <tr>
                    <td>Hola</td>
                    <td>Hello</td>
                    <td>Interjection</td>
                </tr>
                <tr>
                    <td>Adiós</td>
                    <td>Goodbye</td>
                    <td>Interjection</td>
                </tr>
                <tr>
                    <td>Por favor</td>
                    <td>Please</td>
                    <td>Phrase</td>
                </tr>
                <tr>
                    <td>Gracias</td>
                    <td>Thank you</td>
                    <td>Interjection</td>
                </tr>
               </tbody>
            </table>
        {:else if learningMode === 'flashcards'}
            <h2>Learning Mode: Flashcards</h2>
            <!-- Flashcards learning content goes here -->
        {/if}
	</div>
{/if}

<style>
    .toolbar {
        display: flex;
        gap: 2.074rem;
    }

    .mode-button.active {
        background-color: #add8e6;
        color: black;
    }

    .container {
        max-width: 600px;
        display: flex;
        justify-content: center;
        flex-direction: column;
        gap: 2.074rem;
    }

    table {
        width: 100%;
        border-collapse: collapse;
        display: flex;
        flex-direction: column;
    }

    thead {
        display: table;
        width: calc(100% - 17px);
        table-layout: fixed;
        background: white;
    }

    tbody {
        display: block;
        height: calc(100vh - 293.89px);
        overflow-y: scroll;
        width: 100%;
        background: lightyellow;
        scrollbar-gutter: stable;
    }

    tbody::-webkit-scrollbar {
        width: 17px;
    }

    tbody::-webkit-scrollbar-track {
        background: lightyellow;
    }

    tbody::-webkit-scrollbar-thumb {
        background: #ccc;
        border-radius: 5px;
    }

    tbody::-webkit-scrollbar-thumb:hover {
        background: #999;
    }

    tbody tr {
        display: table;
        width: 100%;
        table-layout: fixed;
        background: white;
    }

    th, td {
        border: 1px solid black;
        padding: 10px;
        text-align: left;
    }
</style>
