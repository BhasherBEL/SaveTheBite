<script lang="ts">
	import MarketList from '$lib/components/MarketList.svelte';
	import type { Tag } from '$lib/server/db/schema.js';

	let isActive = $state(false);

	let { data } = $props();
	let cart = $state(data.cart || []);
	let tags = $state(data.tags || []);
	let currentTags = $state(data.currentTags || []);

	function toggleFilter(filter: Tag) {
		if (currentTags.find((tag) => tag.name === filter.name)) {
			currentTags = currentTags.filter((tag) => tag.name !== filter.name);
		} else {
			currentTags = [...currentTags, filter];
		}

		const newTagsText = currentTags.map((tag) => tag.name).join(',');

		const searchParams = new URLSearchParams(document.location.search);
		if (newTagsText === '') {
			searchParams.delete('tags');
		} else {
			searchParams.set('tags', newTagsText);
		}

		document.location.search = searchParams.toString();
	}

	$inspect(currentTags);
</script>

<svelte:head>
	<title>SaveTheBite</title>
	<meta name="description" content="SaveTheBite homepage" />
</svelte:head>

<section class="p-1">
	<h2 class="mb-4 text-center tracking-wide">Every bite matters!</h2>

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

	<div class="flex justify-center mb-6 space-x-1">
		{#each tags as tag (tag.name)}
			<button
				class="button p-2 text-xs/[8px] text-gray-900 rounded-full border-black border transition-colors duration-100 hover:scale-105"
				class:bg-secondary={currentTags.find((t) => t.name === tag.name)}
				onclick={() => toggleFilter(tag)}
			>
				{tag.name}
			</button>
		{/each}
	</div>

	<div
		class={`transition-all duration-500 ${isActive ? 'grid grid-cols-1 md:grid-cols-3 gap-4' : 'block'}`}
	>
		<div class={`transition-all duration-500 ${isActive ? 'w-full md:col-span-2' : 'w-full'}`}>
			<MarketList
				vendors={data.vendors}
				longitude={data.longitude}
				latitude={data.latitude}
				bind:cart
			/>
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
