<script lang="ts">
	import BatchPopup from '$lib/components/BatchPopup.svelte';
	import MarketPopup from '$lib/components/MarketPopup.svelte';
	import { type Basket, type Vendor, type Cart } from '$lib/server/db/schema';
	import { getDistanceFromLatLonInKm } from '$lib/utils/search';

	let {
		vendors,
		longitude,
		latitude,
		cart = $bindable()
	}: { vendors: Vendor[]; longitude?: number; latitude?: number; cart: Cart[] } = $props();

	let basketData: Basket | undefined = $state(undefined);
	let vendorData: Vendor | undefined = $state(undefined);

	function showBasket(basket: Basket) {
		event?.stopPropagation();
		basketData = basket;
	}

	function showVendor(vendor: Vendor) {
		vendorData = vendor;
	}

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
					<div class="flex flex-col lg:flex-row justify-start">
						<span class="font-bold text-lg">{vendor.name}</span>

						<div class="inline-flex items-center space-x-2 pt-2 lg:pt-0 lg:ml-6">
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
					<div class="inline-flex justify-end">
						<i class="fa-regular hover:scale-105 fa-bookmark text-gray-100 text-2xl"></i>
					</div>
				</div>

				<div class="gap-4 mt-4 flex flex-col lg:flex-row overflow-x-auto">
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
								src={basket.picture || vendor.picture || '/no-company.svg'}
								alt="Currently no picture for {basket.name}"
								class="lg:w-72 lg:h-72 mx-auto rounded-xl object-cover"
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
	<BatchPopup bind:data={basketData} onClose={() => (basketData = undefined)} bind:cart />
{/if}
{#if vendorData}
	<MarketPopup data={vendorData} onClose={() => (vendorData = undefined!)} bind:cart />
{/if}
