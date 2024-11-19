<script lang="ts">
	import { type Basket, type Vendor } from '$lib/server/db/schema';
	import BatchPopup from './BatchPopup.svelte';

    let { data, onClose } : { data: Vendor, onClose: () => {} } = $props();

	console.log('vendor in popup', data);

	let basketData: Basket | undefined = $state(undefined);

	function showBasket(basket: Basket) {
		basketData = basket;
	}
</script>

{#if data}
	<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
	<div
		class="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center"
		role="dialog"
		aria-label="Show batch details"
		onclick={onClose}
		onkeydown={(e) => e.key === 'Escape' && onClose()}
	>
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<div
			class="bg-white p-6 rounded-3xl shadow-lg w-ful sm:w-4/5 h-full sm:h-4/5 relative flex flex-col sm:flex-row justify-start items-center"
			role="dialog"
			aria-label="Market details"
            onclick={e => e.stopPropagation()}
		>
			<!-- Close Button for small screens -->
			<button
				class="absolute top-4 right-4 sm:hidden text-3xl font-semibold text-gray-600 hover:text-gray-800"
				onclick={onClose}
				aria-label="Close"
			>
				×
			</button>
            {#if data.picture}
                <img
                    src="data:image/jpeg;base64,{data.picture}"
                    alt={data.name}
                    class="inset-y-0 left-0 w-1/2 h-full rounded-3xl object-cover aspect-square mx-auto hidden sm:block"
                />
            {/if}
			<div class="w-full sm:w-3/5 h-full pl-0 sm:pl-8 flex flex-col justify-start items-start">
				<h2 class="text-3xl font-semibold text-primary">{data.name}</h2>

				<div class="inline-flex items-center space-x-2">
					<i class="fas fa-map-marker-alt text-gray-400"></i>
					<span class="text-gray-400 text-sm font-bold">{data.location}</span>
				</div>
				<div class="overflow-y-auto h-[calc(100%-4rem)]">
					{#each data.baskets as basket (basket.id)}
						<div
							role="button"
							aria-label="Show batch details"
							onkeydown={(e) => e.key === 'Enter' && showBasket(basket)}
							tabindex="0"
							class="rounded-2xl mt-4 w-full p-0 sm:p-2 border border-secondary flex flex-col sm:flex-row flex-start"
							onclick={() => showBasket(basket)}
						>
							<img
								src={basket.picture}
								alt={basket.name}
								class="inset-y-0 left-0 w-full sm:w-1/3 h-full object-cover aspect-square mx-auto rounded-xl"
							/>

							<div
								class="relative w-full p-4 sm:p-0 pt-4 sm:pt-0 sm:w-2/3 pl-4 sm:pl-4 ml-0 sm:ml-2 flex flex-col justify-between"
							>
								<div class="flex justify-between w-full mb-2">
									<h2 class="text-lg font-semibold text-black">{basket.name}</h2>
									<h2 class="text-primary text-xl">{basket.price}€</h2>
								</div>
								<p class="text-gray-400 text-sm flex-1 pb-4">
									Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
									molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum
									numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium
									optio, eaque rerum! Provident similique accusantium nemo autem. Veritatis
									obcaecati tenetur iure eius earum ut molestias architecto voluptate aliquam nihil,
								</p>
								<button
									class="w-full py-1 bg-primary text-white font-semibold rounded-xl hover:bg-green-600"
								>
									Add to cart
								</button>
							</div>
						</div>
					{/each}
				</div>
			</div>
		</div>
	</div>
{/if}

<!-- Display the batch popup -->
<BatchPopup data={basketData} onClose={() => (basketData = undefined)} />
