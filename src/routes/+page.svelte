<script>
    let isActive = false; // track if the location button has been clicked

    // Function to toggle active state
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

	<!-- Filters and Map -->
	<div class="grid grid-cols-1 md:grid-cols-2 gap-8">
		<!-- Product Cards (Left side) -->
		<div class="bg-white p-4 rounded-lg shadow-md">
			<h2 class="font-bold text-lg">K-Market Otaniemi</h2>
			<p class="text-gray-600">Otaniementie 12, 02150 Espoo</p>
			<div class="grid grid-cols-2 gap-4 mt-4">
				<div class="border rounded-lg p-4">
					<img src="veggie.jpg" alt="Veggie batch" class="w-full rounded-lg" />
					<p class="font-semibold mt-2">Veggie batch</p>
					<p>5€</p>
				</div>
				<div class="border rounded-lg p-4">
					<img src="bread.jpg" alt="Bread" class="w-full rounded-lg" />
					<p class="font-semibold mt-2">Bread</p>
					<p>5€</p>
				</div>
			</div>
		</div>

		<!-- Map (Right side) -->
		<div>
			<img src="map.jpg" alt="Map" class="w-full rounded-lg shadow-lg" />
		</div>
	</div>
</section>

<style>
</style>
