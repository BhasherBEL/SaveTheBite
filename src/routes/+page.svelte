<script>
    import { markets } from '$lib/marketData.js'; // Import market data
    import MarketList from './MarketList.svelte'; // Import MarketList component

    let isActive = false; // Track if the location button has been clicked

    let filters = [
        { name: "Vegetarian", active: false },
        { name: "Vegan", active: false },
        { name: "Fish", active: false },
        { name: "Gluten free", active: false },
        { name: "Egg free", active: false },
        { name: "Non-Dairy", active: false }
    ]; // Array to hold filter options

    // Function to toggle active state for filter buttons
    function toggleFilter(index) {
        filters[index].active = !filters[index].active; // Toggle the active state
    }

    // Function to toggle active state of location icon / button
    function toggleActive() {
        isActive = !isActive; // Toggle the active state
    }
</script>

<svelte:head>
    <title>SaveTheBite</title>
    <meta name="description" content="SaveTheBite homepage" />
</svelte:head>

<section class="p-8">
    <!-- Text above the search bar -->
    <h2 class="text-2xl font-bold mb-4 text-center">Every bite matters!</h2>

    <!-- Search Bar -->
    <div class="flex justify-center items-center mb-6">
        <input type="text" class="w-1/2 p-4 border border-gray-300 rounded-lg shadow-sm"
            placeholder="City, region, address, ..." />
        <button class={`p-4 ml-2 rounded-full transition-colors duration-300 ${isActive ? 'bg-green-500' : 'bg-white hover:bg-green-500'} shadow-md`} on:click={toggleActive}>
            <i class={`fas fa-map-marker-alt ${isActive ? 'text-white' : 'text-gray-400 hover:text-green-500'} transition-colors duration-300`}></i>
        </button>
    </div>

    <!-- Filter Options -->
    <div class="flex justify-center mb-6">
        {#each filters as filter, index}
            <button
                class={`px-1 py-0.5 mx-1 text-xs rounded-full transition-colors duration-300 ${filter.active ? 'bg-green-500 text-white' : 'bg-gray-200 hover:bg-green-500'}`} on:click={() => toggleFilter(index)}>
                {filter.name}
            </button>
        {/each}
    </div>

    <!-- Filters and Market List with dynamic layout -->
    <div class={`transition-all duration-500 ${isActive ? 'grid grid-cols-1 md:grid-cols-3 gap-4' : 'block'}`}>
        <!-- Product Cards (Left side) -->
        <div class={`transition-all duration-500 ${isActive ? 'w-full md:col-span-2' : 'w-full'}`}>
            <MarketList markets={markets} /> <!-- Pass markets data to MarketList -->
        </div>

        <!-- Map (Right side) - Display map only when isActive is true -->
        {#if isActive}
            <div class="transition-all duration-500 w-full md:w-full">
                <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d53741.55755073594!2d24.772337437262063!3d60.19087801280934!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sde!2sfi!4v1728405815704!5m2!1sde!2sfi"
                width="100%" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
            </div>
        {/if}
    </div>
</section>

<style>
    /* Ensure smooth transition for layout changes */
    .transition-all {
        transition: all 0.5s ease-in-out;
    }

    /* Adjust container padding */
    section {
        max-width: 1200px; /* Set a maximum width for better responsiveness */
        margin: 0 auto; /* Center the content */
    }
</style>
