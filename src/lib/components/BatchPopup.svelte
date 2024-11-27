<script lang="ts">
	import { type Basket, type Cart, type Sale, type Order } from '$lib/server/db/schema';
	import AddToCart from '$lib/components/AddToCart.svelte';
    import { deleteSale } from '$lib/utils/cart';

	let { data = $bindable(), onClose, cart = $bindable([]) }: { data: Basket; onClose: () => {}, cart: Cart } = $props();

	let show = $state(false);

    console.log("In basket popup: ", cart);


    function checkCart(basketId: number) {
        // Check if the basket is already in the cart
        let order = cart.find((order) => order.sale.basketId  === basketId);
        if (order) {
            console.log("In cart: ", order);
            return order;
        }
        return false;
    }

    async function deleteFromCart(basketId: number) {
        event?.stopPropagation();
        await deleteSale(basketId);
        cart = cart.filter((order) => order.sale.basketId === basketId);
        inCart = false;
    }

    let inCart = $state(checkCart(data.id));
</script>

{#if data}
	<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<div
		class="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center"
		role="dialog"
		aria-label="Show batch details"
		onclick={onClose}
		onkeydown={(e) => e.key === 'Escape' && onClose()}
	>
		<div
			class="bg-white pt-12 lg:pt-6 p-6 lg:rounded-3xl shadow-lg w-full lg:w-3/5 h-full lg:h-3/5 relative flex flex-col lg:flex-row justify-start items-center"
			role="dialog"
			aria-label="Batch details"
			onclick={(e) => e.stopPropagation()}
		>
			<!-- Close Button for small screens -->
			<button
				class="absolute top-2 right-4 lg:hidden text-3xl font-semibold text-gray-600 hover:text-gray-800"
				onclick={onClose}
				aria-label="Close"
			>
				×
			</button>
			<img
				src="{data.picture}"
				alt="Currently no picture for {data.name}"
				class="inset-y-0 left-0 w-full lg:w-1/2 h-full rounded-3xl object-cover aspect-square mx-auto"
			/>
			<div class="w-full lg:w-1/2 pt-4 lg:pt-0 h-full pl-4 flex flex-col justify-start items-start">
				<div class="flex justify-between w-full mb-2">
					<h2 class="text-2xl font-semibold text-black">{data.name}</h2>
					<h2 class="text-primary text-xl">{data.price}€</h2>
				</div>
				<p class="text-gray-400 text-sm flex-1 pb-4">
					{data.description}
				</p>
                {#if inCart}
                    <button
                        class="mt-auto w-full mb-0 py-2 bg-red-500 text-white font-semibold rounded-2xl hover:bg-red-600"
                        onclick={() => deleteFromCart(inCart.saleId)}
                    >
                        Delete from cart ({inCart.quantity})
                    </button>
                {:else}
                    <button
                        class="mt-auto w-full mb-0 py-2 bg-primary text-white font-semibold rounded-2xl hover:bg-green-600"
                        onclick={() => (show = true)}
                    >
                        Add to cart
                    </button>
                {/if}
			</div>
		</div>
	</div>
{/if}

{#if show}
	<AddToCart
        data={data}
        bind:cart={cart}
		onClose={() => {
			show = false;
            inCart = checkCart(data.id);
		}}
	/>
{/if}
