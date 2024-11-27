<script lang="ts">
	import { type Basket, type Vendor, type Cart, type Order } from '$lib/server/db/schema';
	import BatchPopup from '$lib/components/BatchPopup.svelte';
	import AddToCart from '$lib/components/AddToCart.svelte';
    import { deleteSale } from '$lib/utils/cart';

	let { data, onClose, cart = $bindable() }: { data: Vendor; onClose: () => {}; cart: Cart } = $props();

	let basketData: Basket | undefined = $state(undefined);
	let quantityShow = $state(false);
	let basketShow = $state(false);
    let basketId: number;

	function showBasket(basket: Basket, index: number) {
		basketData = basket;
		basketShow = true;
        basketId = index;
	}

	function showQuantity(basket: Basket, index: number) {
		event?.stopPropagation();
		basketData = basket;
		quantityShow = true;
        basketId = index;
	}

    function checkCart(basketId: number): Order {
        // Check if the basket is already in the cart
        let order = cart.find((order) => order.sale.basketId  === basketId);
        return order;
    }

    function deleteFromCart(basketId: number, index: number) {
        event?.stopPropagation();
        deleteSale(basketId, cart);
        cart = cart.filter((order) => order.sale.basketId === basketId);
        inCart[index] = undefined;
    }

    let inCart = $state([]);
    // Fill the inCart array with the orders in the cart
    for (let i = 0; i < data.baskets.length; i++) {
        inCart.push(checkCart(data.baskets[i].id));
    }

    $inspect(inCart);

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
			onclick={(e) => e.stopPropagation()}
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
					src={data.picture}
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
					{#each data.baskets as basket, index}
						<div
							role="button"
							aria-label="Show batch details"
							onkeydown={(e) => e.key === 'Enter' && showBasket(basket)}
							tabindex="0"
							class="rounded-2xl mt-4 w-full p-0 sm:p-2 border border-secondary flex flex-col sm:flex-row flex-start"
							onclick={() => showBasket(basket)}
						>
							<img
								src={basket.picture || data.picture}
								alt={basket.name}
								class="inset-y-0 left-0 w-full sm:w-1/3 h-full object-cover aspect-square mx-auto rounded-xl"
								class:blur-xs={!basket.picture}
							/>
							<div
								class="relative w-full p-4 sm:p-0 pt-4 sm:pt-0 sm:w-2/3 pl-4 sm:pl-4 ml-0 sm:ml-2 flex flex-col justify-between"
							>
								<div class="flex justify-between w-full mb-2">
									<h2 class="text-lg font-semibold text-black">{basket.name}</h2>
									<h2 class="text-primary text-xl">{basket.price}€</h2>
								</div>
								<p class="text-gray-400 text-sm flex-1 pb-4">
									{basket.description}
								</p>
								{#if inCart[index] !== undefined}
									<button
										class="mt-auto w-full mb-0 py-2 bg-red-500 text-white font-semibold rounded-2xl hover:bg-red-600"
                                        onclick={() => deleteFromCart(inCart[index].saleId, index)}
									>
										Delete from cart ({inCart[index]?.quantity})
									</button>
								{:else}
									<button
										class="mt-auto w-full mb-0 py-2 bg-primary text-white font-semibold rounded-2xl hover:bg-green-600"
										onclick={() => {showQuantity(basket, index)}}
									>
										Add to cart
									</button>
								{/if}
							</div>
						</div>
					{/each}
				</div>
			</div>
		</div>
	</div>
{/if}

<!-- Display the batch popup -->
{#if basketShow}
	<BatchPopup data={basketData} onClose={() => {
        basketShow = false;
        inCart[basketId] = checkCart(basketData.id);
    }} bind:cart={cart} />
{/if}
{#if quantityShow}
	<AddToCart data={basketData} onClose={() => {
        quantityShow = false;
        inCart[basketId] = checkCart(basketData.id);
    }} bind:cart={cart} />
{/if}
