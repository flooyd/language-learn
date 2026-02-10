<script lang="ts">
	import { goto } from '$app/navigation';
	import { selectedCategory, selectedMode } from '$lib/stores';

    const handleClickModes = () => {
        $selectedMode = "";
        goto('/learn');
    }

    const handleClickCategories = () => {
        $selectedCategory = "";
        goto('/categories');
    }
</script>

<div class="h1-buttons">
	<button onclick={() => handleClickModes()}>Modes</button>
	<button onclick={() => handleClickCategories()}>Categories</button>
</div>

<style>
	.h1-buttons {
		display: flex;
		gap: 1rem;
	}
</style>
