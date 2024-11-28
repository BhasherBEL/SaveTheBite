<script lang="ts">
	import MarketList from '$lib/components/MarketList.svelte';

	let isActive = $state(false);

	function toggleFilter(index: number) {
		switch (filters[index].active) {
			case true:
				filters[index].active = false;
				break;
			case false:
				filters[index].active = null;
				break;
			default:
				filters[index].active = true;
		}
		filters = [...filters];
	}

	let { data = $bindable() } = $props();
	let cart = $state(data.cart || []);
	let filters = $state(data.filters);

	console.log('data in main page: ', data);

	function toggleActive() {
		isActive = !isActive;
	}
</script>

<svelte:head>
	<title>SaveTheBite</title>
	<meta name="description" content="SaveTheBite homepage" />
</svelte:head>

<section class="p-1">
	<!-- Text above the search bar -->
	<h2 class="mb-4 text-center tracking-wide">Every bite matters!</h2>

	<!-- Search Bar -->
	<div class="flex justify-center items-center mb-6 w-4/6 m-auto">
		<form method="GET" class="flex-grow">
			<input
				type="text"
				name="search"
				class="w-full p-4 bg-gray-100 border border-gray-300 rounded-3xl shadow-sm placeholder-gray-500 text-2xl text-center"
				placeholder="City, region, address, ..."
			/>
		</form>
	</div>

	<!-- Filter Options -->
	<div class="flex justify-center mb-6 space-x-1">
		{#each filters as filter, index (filter.name)}
			<button
				class="button p-2 text-xs/[8px] text-gray-900 rounded-full border-black border transition-colors duration-100 hover:scale-105"
				class:bg-secondary={filter.active}
				class:bg-opposite={filter.active == false}
				onclick={() => toggleFilter(index)}
			>
				{filter.name}
			</button>
		{/each}
	</div>

	<!-- Filters and Market List with dynamic layout -->
	<div
		class={`transition-all duration-500 ${isActive ? 'grid grid-cols-1 md:grid-cols-3 gap-4' : 'block'}`}
	>
		<!-- Product Cards (Left side) -->
		<div class={`transition-all duration-500 ${isActive ? 'w-full md:col-span-2' : 'w-full'}`}>
			<MarketList
				vendors={data.vendors}
				longitude={data.longitude}
				latitude={data.latitude}
				bind:cart
			/>
			<!-- Pass markets data to MarketList -->
		</div>
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
