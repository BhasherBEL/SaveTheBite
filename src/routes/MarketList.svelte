<script lang="ts">
	import BatchPopup from './BatchPopup.svelte';
	import MarketPopup from './MarketPopup.svelte';
	import { type Basket, type Vendor } from '$lib/server/db/schema';
	import { getDistanceFromLatLonInKm } from '$lib/utils/search';

	let {
		vendors,
		longitude,
		latitude
	}: { vendors: Vendor[]; longitude?: number; latitude?: number } = $props();

	let basketData: Basket | undefined = $state(undefined);
	let vendorData: Vendor | undefined = $state(undefined);

	function showBasket(basket: Basket) {
		event?.stopPropagation();
		basketData = basket;
	}

	function showVendor(vendor: Vendor) {
		vendorData = vendor;
	}

	// Reactive statement to manage body overflow
	$effect(() => {
		if (typeof window !== 'undefined') {
			document.body.style.overflow = basketData || vendorData ? 'hidden' : 'auto';
		}
	});
</script>

<div class="p-4">
	{#if vendors.length > 0}
		{#each vendors as vendor (vendor.id)}
			<div
				class="bg-white p-4 rounded-3xl shadow-md mb-4 border border-secondary"
				role="button"
				aria-label="Show market details"
				onkeydown={(e) => e.key === 'Enter' && showVendor(vendor)}
				tabindex="0"
				onclick={() => showVendor(vendor)}
			>
				<div class="flex justify-between items-center mb-4">
					<div class="flex flex-col sm:flex-row justify-start">
						<span class="font-bold text-lg">{vendor.name}</span>

						<!-- Display the address of the market with a map logo before -->
						<div class="inline-flex items-center space-x-2 pt-2 sm:pt-0 sm:ml-6">
							<i class="fas fa-map-marker-alt text-gray-400"></i>
							<span class="text-gray-400 text-sm font-bold">
								{vendor.location}
								{#if longitude && latitude}
									{@const distance = getDistanceFromLatLonInKm(
										vendor.latitude,
										vendor.longitude,
										latitude,
										longitude
									)}
									({distance >= 1
										? `${distance.toFixed(1)} km`
										: `${(Math.round(distance * 10) * 100).toFixed(0)} m`})
								{/if}
							</span>
						</div>
					</div>
					<!-- Display the save button at the end of the flex -->
					<div class="inline-flex justify-end">
						<i class="fa-regular hover:scale-105 fa-bookmark text-gray-100 text-2xl"></i>
					</div>
				</div>

				<!-- Display the batches of the market -->
				<div class="gap-4 mt-4 flex flex-col sm:flex-row overflow-x-auto">
					{#each vendor.baskets as basket (basket.id)}
						<div
							role="button"
							aria-label="Show batch details"
							onkeydown={(e) => e.key === 'Enter' && showBasket(basket)}
							tabindex="0"
							class="rounded-2xl p-2 flex-shrink-0 border border-secondary"
							onclick={() => showBasket(basket)}
						>
							<img
								src="data:image/jpeg;base64, {basket.picture}"
								alt="Currently no picture for {basket.name}"
								class="w-72 h-72 mx-auto rounded-xl object-cover"
							/>
							<p class="font-semibold mt-2">{basket.name}</p>
							<p>{basket.price}€</p>
						</div>
					{/each}
				</div>
			</div>
		{/each}
	{:else if longitude && latitude}
		<p class="text-center">No markets found nearby</p>
	{:else}
		<p class="text-center">No markets found</p>
	{/if}
</div>

<!-- Display the batch popup -->
{#if basketData}
	<BatchPopup data={basketData} onClose={() => (basketData = undefined)} />
{/if}
{#if vendorData}
	<MarketPopup data={vendorData} onClose={() => (vendorData = undefined!)} />
{/if}

<style>
	/* Ensuring the list takes full height of the viewport */
	.max-h-screen {
		max-height: 100vh;
	}
	.no-scroll {
		overflow: hidden;
	}
</style>
