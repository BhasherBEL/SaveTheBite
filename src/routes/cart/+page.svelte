<script lang="ts">
	import { type Order } from '$lib/server/db/schema';

	let { data } = $props();
	let { cart } = data;

	$inspect(cart);

	// Handlers for basket actions
	function deleteBasketHandler(id: number) {
		deleteBasket(id);
		cart = cart.filter((basket) => basket.id !== id);
	}

	function emptyCartHandler() {
		cart = [];
	}

	function confirmOrderHandler() {
		// Send the order to the server
		console.log('Order confirmed');
	}

	let emptyCart = cart.length === 0;
</script>

<!-- Shopping cart list -->
<section class="p-1 h-full w-full flex flex-col flex-1">
	<h1 class="text-6xl text-center font-bold mb-12">Shopping Cart</h1>
	<ul class="divide-y h-full w-full divide-gray-200 flex-1 space-y-4">
		{#if emptyCart}
			<li class="text-2xl text-green-800 h-full flex items-center justify-center text-center">
				Your cart is empty
			</li>
		{:else}
			<div class="flex justify-between items-center">
				<h2 class="text-2xl font-semibold">Your Cart</h2>
				<div>
					<button
						class="bg-red-500 text-white py-1 px-3 rounded-md hover:bg-red-700 transition"
						onclick={emptyCartHandler}
					>
						Empty Cart
					</button>
					<button
						class="bg-green-500 text-white py-1 px-3 rounded-md hover:bg-green-700 transition"
						onclick={confirmOrderHandler}>Confirm Order</button
					>
				</div>
			</div>
			{#each cart as { sale: { basket }, quantity }}
				<div
					class="border p-4 rounded-lg shadow-md flex flex-col md:flex-row space-x-0 md:space-x-6"
				>
					<img
						src={basket.picture}
						alt={basket.name}
						class="md:w-36 md:h-36 mb-2 md:mb-0 object-cover rounded-md"
					/>
					<div class="flex-grow mb-4 md:mb-0">
						<p class="font-bold mb-1">{basket.name}</p>
						<p class="text-gray-600">Price: {basket.price}€</p>
						<p class="text-gray-600">Quantity: {quantity}</p>
						<p class="text-gray-600">Description: {basket.description}</p>
					</div>
					<div class="flex flex-row md:flex-col justify-between">
						<div class="flex justify-between md:justify-end space-x-2">
							<button
								class="bg-red-500 text-white py-1 px-3 rounded-md hover:bg-red-700 transition"
								onclick={() => deleteBasketHandler(basket.id)}
							>
								Delete
							</button>
						</div>
						<!-- total price -->
						<p class="font-semibold">Total price: {basket.price * quantity}€</p>
					</div>
				</div>
			{/each}
		{/if}
	</ul>
</section>
