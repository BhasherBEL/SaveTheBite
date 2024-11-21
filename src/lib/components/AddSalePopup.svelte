<script lang="ts">
	import { type Sale, type Basket } from '$lib/server/db/schema';
    import { addSale } from '$lib/utils/sales';

	let { basket, onClose, onCancel }: { basket: Basket, onClose: (sale: Sale) => {}, onCancel: () => {} } = $props();

    let sale: Sale = $state({
        id: null,
        basketId: basket.id,
        quantity: 0,
        remain: 0,
        expiresAt: new Date(),
        createdAt: new Date(), 
        updatedAt: new Date(),
    });

    async function addSaleHandler() {
        if (!sale.quantity || !sale.basketId || !sale.expiresAt) {
            return console.error('Please fill in all fields');
        }
        sale.remain = sale.quantity;

        try {
            await addSale(sale);
            onClose(sale);
        } catch (error) {
            console.error(error); 
        }
    }
    $inspect(sale);
</script>

<!-- Pop-up for Adding Sale -->
<div class="fixed inset-0 bg-gray-700 bg-opacity-50 flex justify-center items-center">
	<div class="bg-white p-8 rounded-lg w-96">
		<h3 class="text-xl font-semibold mb-4">Create a sale - {basket.name}</h3>
        <div class="mb-4">
            <label for="quantity" class="block text-sm font-medium text-gray-700 mb-2"
                >Quantity</label
            >
            <input
                type="number"
                id="saleQuantity"
                bind:value={sale.quantity}
                min="0"
                class="w-full p-2 border rounded"
                placeholder="Enter quantity"
            />
        </div>
        <div class="mb-4">
            <label for="expiresAt" class="block text sm font-medium text-gray-700 mb-2"
                >Expires At</label
            >
            <input
                type="date"
                id="saleExpiresAt"
                bind:value={sale.expiresAt}
                class="w-full p-2 border rounded"
                placeholder="Enter expiry date"
            />
        </div>
		<div class="flex justify-between">
			<button
				class="bg-gray-500 text-white px-4 py-2 rounded-md"
				onclick={onCancel}>Cancel</button
			>
			<button class="bg-green-500 text-white px-4 py-2 rounded-md" onclick={addSaleHandler}
				>Add Sale</button
			>
		</div>
	</div>
</div>
