<script>
    import { markets } from '$lib/marketData.js'; // Importing the market data
    import MarketList from './MarketList.svelte'; // Importing MarketList component

    let isActive = false; // track if the location button has been clicked

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

	<!-- Main Content Area -->
	<div class="grid grid-cols-1 md:grid-cols-2 gap-8">
		<!-- Product Cards (Left side) -->
		<div class="bg-white p-4 rounded-lg shadow-md">
            <MarketList {markets} /> <!-- Displaying market list from external data -->
		</div>

        <!-- Conditionally Render Map -->
        {#if isActive}
            <!-- Map (Right side) -->
            <div>
                <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d53741.55755073594!2d24.772337437262063!3d60.19087801280934!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sde!2sfi!4v1728405815704!5m2!1sde!2sfi" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
            </div>
        {/if}
	</div>
</section>

<style>
    /* Optional custom styling */
</style>
