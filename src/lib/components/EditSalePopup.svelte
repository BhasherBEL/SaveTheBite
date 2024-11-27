<script lang="ts">
	import { type Sale } from '$lib/server/db/schema';
    import { updateSale } from '$lib/utils/sales';
    import { toast } from 'svelte-hot-french-toast';

	let { sale = $bindable(), onClose, onCancel }: { sale: Sale, onClose: (sale: Sale) => {}, onCancel: () => {} } = $props();

    let editedSale = $state({
        id: sale.id,
        basketId: sale.basketId,
        quantity: sale.quantity,
        remain: sale.remain,
        expiresAt: new Date(),
        createdAt: new Date(), 
        updatedAt: new Date(),
    });

    async function editSaleHandler() {
        if (!editedSale.quantity || !editedSale.expiresAt) {
            toast.error('Please fill in all fields');
        }

        editedSale.remain = editedSale.quantity;

        try {
            toast.promise(updateSale(editedSale), {
                loading: 'Updating sale...',
                success: 'Sale updated',
                error: 'Error updating sale'
            });
            onClose(editedSale);
        } catch (error) {
            const message = "Error updating sale: " + error;
            toast.error(message);
        }
    }

</script>

<!-- Pop-up for editing Sale -->
<div class="fixed inset-0 bg-gray-700 bg-opacity-50 flex justify-center items-center">
	<div class="bg-white p-8 rounded-lg w-96">
		<h3 class="text-xl font-semibold mb-4">Edit the sale</h3>
		<div class="mb-4">
			<label for="saleName" class="block text-sm font-medium text-gray-700 mb-2"
				>Sale quantity</label
			>
            <input
                type="number"
                id="basketInitialPrice"
                bind:value={editedSale.quantity}
                min="1"
                class="w-full p-2 border rounded"
                placeholder="Enter quantity of sale"
            />
		</div>
        <div class="mb-4">
            <label for="saleDescription" class="block text-sm font-medium text-gray-700 mb-2"
                >Sale expires at</label
            >
            <input
                type="datetime-local"
                id="saleDescription"
                bind:value={editedSale.expiresAt}
                class="w-full p-2 border rounded"
                placeholder="Enter when the sale expires"
            />
        </div>
		<div class="flex justify-between">
			<button
				class="bg-gray-500 text-white px-4 py-2 rounded-md"
				onclick={onCancel}>Cancel</button
			>
			<button class="bg-green-500 text-white px-4 py-2 rounded-md" onclick={editSaleHandler}
				>Confirm</button
			>
		</div>
	</div>
</div>
