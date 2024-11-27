<script lang="ts">
	import { type Basket, type Cart } from '$lib/server/db/schema';
	import { addSale } from '$lib/utils/cart';
    import { toast } from 'svelte-hot-french-toast';

	let { data, onClose, cart = $bindable() }: { data: Basket; onClose: () => void; cart: Cart[] } = $props();

	let quantity = $state(1);
	let totalPrice = $derived(quantity * data.price);
	let sale = data.sales ? data.sales[0] : null;

    $inspect(cart);

    async function addSaleHandler(saleId: number, quantity: number) {
        let newCart: Cart[];
        try {
            newCart = await addSale(saleId, quantity);
            cart = newCart;
            toast.success('Sale added to cart');
            onClose();
        } catch (err) {
            let message = err.message || 'Error adding sale to cart';
            toast.error(message);
        }
    }

</script>

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
		class="bg-white pt-12 lg:pt-6 p-6 rounded-3xl shadow-lg w-full lg:w-1/6 lg:h-auto relative flex flex-col lg:flex-row justify-start items-center"
		role="dialog"
		aria-label="Batch details"
		onclick={(e) => e.stopPropagation()}
	>
		<button
			class="absolute top-2 right-4 lg:hidden text-3xl font-semibold text-gray-600 hover:text-gray-800"
			onclick={onClose}
			aria-label="Close"
		>
			×
		</button>
		<div class="w-full pt-2 lg:pt0 h-full flex flex-col justify-start items-start">
			<div class="flex justify-between w-full mb-2">
				<h2 class="text-base font-semibold text-black">Quantity</h2>
				<h2 class="text-primary text-base">{quantity}q - {totalPrice}€</h2>
			</div>
			<div class="flex flex-row w-full space-x-2">
				<button
					class=" w-full mt-2 py-2 bg-primary text-white font-semibold rounded-2xl hover:bg-green-600"
					onclick={() => (quantity = Math.max(1, quantity - 1))}
				>
					-
				</button>
				<button
					class=" w-full mt-2 py-2 bg-primary text-white font-semibold rounded-2xl hover:bg-green-600"
					onclick={() => (quantity = Math.min(sale.remain, quantity + 1))}
				>
					+
				</button>
			</div>
			<button
				class=" w-full mt-2 py-2 bg-primary text-white font-semibold rounded-2xl hover:bg-green-600"
				onclick={() => {
					addSaleHandler(sale.id, quantity);
				}}
			>
				Confirm
			</button>
		</div>
	</div>
</div>
