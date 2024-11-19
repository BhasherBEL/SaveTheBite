<script lang="ts">
	import { type Basket } from '$lib/server/db/schema';
    import { addSale } from '$lib/utils/cart';

	let { data, onClose }: { data: Basket; onClose: () => {} } = $props();

	let quantity = $state(1);
	let totalPrice = $derived(quantity * data.price);
</script>

{#if data}
	<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<div
		class="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center"
		role="dialog"
		aria-label="Quantity adding"
		onclick={onClose}
		onkeydown={(e) => e.key === 'Escape' && onClose()}
	>
		<div
			class="bg-white pt-12 sm:pt-6 p-6 rounded-3xl shadow-lg w-full sm:w-1/6 sm:h-auto relative flex flex-col sm:flex-row justify-start items-center"
			role="dialog"
			aria-label="Batch details"
			onclick={(e) => e.stopPropagation()}
		>
			<!-- Close Button for small screens -->
			<button
				class="absolute top-2 right-4 sm:hidden text-3xl font-semibold text-gray-600 hover:text-gray-800"
				onclick={onClose}
				aria-label="Close"
			>
				×
			</button>
			<div class="w-full pt-2 sm:pt0 h-full flex flex-col justify-start items-start">
				<div class="flex justify-between w-full mb-2">
					<h2 class="text-base font-semibold text-black">Quantity: {quantity}</h2>
					<h2 class="text-primary text-base"> {totalPrice}€</h2>
				</div>
				<div class="flex flex-row w-full">
					<button
						class=" w-full mt-2 py-2 mr-1 bg-primary text-white font-semibold rounded-2xl hover:bg-green-600"
						onclick={() => (quantity += 1)}
					>
						+
					</button>
					<button
						class=" w-full mt-2 py-2 ml-1 bg-primary text-white font-semibold rounded-2xl hover:bg-green-600"
						onclick={() => (quantity = Math.max(1, quantity - 1))}
					>
						-
					</button>
				</div>
				<button
					class=" w-full mt-2 py-2 bg-primary text-white font-semibold rounded-2xl hover:bg-green-600"
					onclick={() => {
                        addSale(1, quantity);
                        onClose();
                    }}
				>
				    Confirm
				</button>
			</div>
		</div>
	</div>
{/if}
