<script lang="ts">
	import { goto } from '$app/navigation';
	import { filterMaxPoints, filterMinPoints, selectedCategory, selectedMode } from '$lib/stores';

    const handleClickModes = () => {
        $selectedMode = "";
        localStorage.setItem("selectedMode", "");
        goto('/learn');
    }

    const handleClickCategories = () => {
        $selectedCategory = "";
        goto('/categories');
    }

    const handleClickFilters = () => {
        goto('/filters');
    }
</script>

<div class="h1-buttons">
    <button class="{$filterMinPoints > 0 || $filterMaxPoints < 100 ? 'active' : ''}" onclick={() => handleClickFilters()}>Filters</button>
	<button onclick={() => handleClickModes()}>Modes</button>
	<button  onclick={() => handleClickCategories()}>Categories</button>
</div>

<style>
	.h1-buttons {
		display: flex;
		gap: 1rem;
        flex-wrap: wrap;
	}

    .active {
        background-color: #4a90e2;
    }
</style>
