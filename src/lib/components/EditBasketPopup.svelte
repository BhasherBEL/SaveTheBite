<script lang="ts">
	import { type Basket } from '$lib/server/db/schema';
	import { updateBasket } from '$lib/utils/company';
    import convertPhoto from '$lib/utils/photo';

	let { basket = $bindable(), onClose, onCancel }: { basket: Basket, onClose: (basket: Basket) => {}, onCancel: () => {} } = $props();

    async function editBasketHandler() {
        if (!basket.name || !basket.description || !basket.id || !basket.initialPrice) {
            return console.error('Please fill in all fields');
        }
        basket.price = basket.initialPrice;

        const photo = document.getElementById('basketPhoto') as HTMLInputElement;
        if (photo?.files[0]) {
            basket.picture = await convertPhoto(photo.files[0]);
        }
        
        try {
            await updateBasket(basket);
            onClose(basket);
        } catch (error) {
            console.error(error);                
        }
    }
</script>

<!-- Pop-up for editing Basket -->
<div class="fixed inset-0 bg-gray-700 bg-opacity-50 flex justify-center items-center">
	<div class="bg-white p-8 rounded-lg w-96">
		<h3 class="text-xl font-semibold mb-4">Add a basket</h3>
		<div class="mb-4">
			<label for="basketName" class="block text-sm font-medium text-gray-700 mb-2"
				>Basket Name</label
			>
			<input
				type="text"
				id="basketName"
				bind:value={basket.name}
				class="w-full p-2 border rounded"
				placeholder="Enter basket name"
			/>
		</div>
		<div class="mb-4">
			<label for="basketDescription" class="block text-sm font-medium text-gray-700 mb-2"
				>Basket Description</label
			>
			<input
				type="text"
				id="basketDescription"
				bind:value={basket.description}
				class="w-full p-2 border rounded"
				placeholder="Enter basket description"
			/>
		</div>
        <div class="mb-4">
            <label for="basketInitialPrice" class="block text-sm font-medium text-gray-700 mb-2"
                >Initial Price</label
            >
            <input
                type="number"
                id="basketInitialPrice"
                bind:value={basket.initialPrice}
                min="0"
                class="w-full p-2 border rounded"
                placeholder="Enter initial price"
            />
        </div>
		<div class="mb-4">
			<label for="basketPhoto" class="block text-sm font-medium text-gray-700 mb-2"
				>Basket Photo (Optional)</label
			>
			<input
				type="file"
				id="basketPhoto"
				accept="image/*"
				class="w-full p-2 border rounded text-gray-500 cursor-not-allowed"
				placeholder="Click to upload a photo"
			/>
		</div>
		<div class="flex justify-between">
			<button
				class="bg-gray-500 text-white px-4 py-2 rounded-md"
				onclick={onCancel}>Cancel</button
			>
			<button class="bg-green-500 text-white px-4 py-2 rounded-md" onclick={editBasketHandler}
				>Confirm</button
			>
		</div>
	</div>
</div>
