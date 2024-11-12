<script lang="ts">
	import BatchPopup from './BatchPopup.svelte';
	import MarketPopup from './MarketPopup.svelte';
	import Vendor from '$lib/types/vendor';
	import Basket from '$lib/types/basket';

	let basketVisible = false;
	let basketData: Basket;
	let vendorVisible = false;
	let vendorData: Vendor;

	function showBasket(basket: Basket) {
		basketData = basket;
		basketVisible = true;
		basketVisible = false;
	}

	function showVendor(vendor: Vendor) {
		vendorData = vendor;
		vendorVisible = !basketVisible;
	}

	export let vendors: Vendor[]; // Receive markets as a prop
	export let filters: { name: string; active: boolean | null }[];

	// Reactive statement to manage body overflow
	$: {
		if (typeof window !== 'undefined') {
			document.body.style.overflow = basketVisible || vendorVisible ? 'hidden' : 'auto';
		}
	}
</script>

<div class="p-4">
	{#each vendors as vendor (vendor.id)}
		<div
			class="bg-white p-4 rounded-3xl shadow-md mb-4 border border-secondary"
			role="button"
			aria-label="Show market details"
			on:keydown={(e) => e.key === 'Enter' && showVendor(vendor)}
			tabindex="0"
			on:click={() => showVendor(vendor)}
		>
			<div class="flex justify-between items-center mb-4">
				<div class="flex justify-start">
					<span class="font-bold text-lg">{vendor.name}</span>

					<!-- Display the address of the market with a map logo before -->
					<div class="inline-flex items-center space-x-2 ml-6">
						<i class="fas fa-map-marker-alt text-gray-400"></i>
						<span class="text-gray-400 text-sm font-bold">{vendor.location}</span>
					</div>
				</div>
				<!-- Display the save button at the end of the flex -->
				<div class="inline-flex justify-end">
					<i class="fa-regular hover:scale-105 fa-bookmark text-gray-100 text-2xl"></i>
				</div>
			</div>

			<!-- Display the batches of the market -->
			<div class="gap-4 mt-4 flex overflow-x-auto">
				{#each vendor.baskets as basket (basket.id)}
					<div
						role="button"
						aria-label="Show batch details"
						on:keydown={(e) => e.key === 'Enter' && showBasket(basket)}
						tabindex="0"
						class="rounded-2xl p-2 flex-shrink-0 border border-secondary"
						on:click={() => showBasket(basket)}
					>
						<img
							src={basket.picture}
							alt={basket.name}
							class="w-72 h-72 mx-auto rounded-xl object-cover"
						/>
						<p class="font-semibold mt-2">{basket.name}</p>
						<p>{basket.price}€</p>
					</div>
				{/each}
			</div>
		</div>
	{/each}
</div>

<!-- Display the batch popup -->
<BatchPopup show={basketVisible} data={basketData} onClose={() => (basketVisible = false)} />
<MarketPopup show={vendorVisible} data={vendorData} onClose={() => (vendorVisible = false)} />

<style>
	/* Ensuring the list takes full height of the viewport */
	.max-h-screen {
		max-height: 100vh;
	}
	.no-scroll {
		overflow: hidden;
	}
</style>
