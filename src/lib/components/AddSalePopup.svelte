<script lang="ts">
	import { type Sale, type Basket } from '$lib/server/db/schema';
	import { addSale } from '$lib/utils/sales';
	import { toast } from 'svelte-hot-french-toast';

	let {
		basket,
		onClose,
		onCancel
	}: { basket: Basket; onClose: (sale: Sale) => {}; onCancel: () => {} } = $props();

	let sale: Sale = $state({
		id: null,
		basketId: basket.id,
		quantity: 0,
		remain: 0,
		expiresAt: new Date(),
		createdAt: new Date(),
		updatedAt: new Date()
	});

	async function addSaleHandler() {
		if (!sale.quantity || !sale.basketId || !sale.expiresAt) {
			toast.error('Please fill in all fields');
		}
		sale.remain = sale.quantity;

		try {
			toast.promise(addSale(sale), {
				loading: 'Adding sale...',
				success: 'Sale added',
				error: 'Error adding sale'
			});
			onClose(sale);
		} catch (error) {
			toast.error('Error adding sale: ' + error);
		}
	}
</script>

<!-- Pop-up for Adding Sale -->
<div class="fixed inset-0 bg-gray-700 bg-opacity-50 flex justify-center items-center">
	<div class="bg-white p-8 rounded-lg w-96">
		<h3 class="text-xl font-semibold mb-4">Create a sale - {basket.name}</h3>
		<div class="mb-4">
			<label for="quantity" class="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
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
			<label for="expiresAt" class="block text sm font-medium text-gray-700 mb-2">Expires At</label>
			<input
				type="datetime-local"
				id="saleExpiresAt"
				bind:value={sale.expiresAt}
				class="w-full p-2 border rounded"
				placeholder="Enter expiry date"
			/>
		</div>
		<div class="flex justify-between">
			<button class="bg-gray-500 text-white px-4 py-2 rounded-md" onclick={onCancel}>Cancel</button>
			<button class="bg-green-500 text-white px-4 py-2 rounded-md" onclick={addSaleHandler}
				>Add Sale</button
			>
		</div>
	</div>
</div>
