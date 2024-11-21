<script lang="ts">
	import MarketList from '$lib/components/MarketList.svelte';

	let isActive = $state(false);

	let filters: { name: string; active: boolean | null }[] = $state([
		{ name: 'Vegetarian', active: null },
		{ name: 'Vegan', active: null },
		{ name: 'Fish', active: null },
		{ name: 'Gluten free', active: null },
		{ name: 'Egg free', active: null },
		{ name: 'Non-Dairy', active: null }
	]);

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

	let { data } = $props();
    let cart = data.cart;

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
		<button
			class={`group p-4 ml-2 rounded-full transition-colors duration-300 ${isActive ? 'bg-green-500 hover:bg-gray-100' : 'bg-gray-100 hover:bg-green-500'} shadow-md`}
			onclick={toggleActive}
			aria-label="Toggle map"
		>
			<i
				class={`fas fa-map-marker-alt ${isActive ? 'text-white group-hover:text-gray-400' : 'text-gray-400 group-hover:text-white'} transition-colors duration-300`}
			></i>
		</button>
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
			<MarketList vendors={data.vendors} longitude={data.longitude} latitude={data.latitude} cart={cart}/>
			<!-- Pass markets data to MarketList -->
		</div>

		<!-- Map (Right side) - Display map only when isActive is true -->
		{#if isActive}
			<div class="transition-all duration-500">
				<div class="sticky top-4">
					<iframe
						src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d53741.55755073594!2d24.772337437262063!3d60.19087801280934!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sde!2sfi!4v1728405815704!5m2!1sde!2sfi"
						width="100%"
						height="500"
						style="border:0;"
						loading="lazy"
						referrerpolicy="no-referrer-when-downgrade"
						class="rounded-3xl"
					></iframe>
				</div>
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
