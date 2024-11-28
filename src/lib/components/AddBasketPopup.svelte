<script lang="ts">
	import { type Basket } from '$lib/server/db/schema';
	import { addBasket } from '$lib/utils/company';
	import convertPhoto from '$lib/utils/photo';
	import { toast } from 'svelte-hot-french-toast';

	let {
		vendorId,
		onClose,
		onCancel
	}: { vendorId: number; onClose: (basket: Basket) => {}; onCancel: () => {} } = $props();

	let basketData: Basket = $state({
		initialPrice: 0,
		price: 0,
		picture: '',
		name: '',
		description: ''
	});

	async function addBasketHandler() {
		if (!basketData.name || !basketData.description || !vendorId || !basketData.initialPrice) {
			return console.error('Please fill in all fields');
		}
		basketData.price = basketData.initialPrice;

		const photo = document.getElementById('basketPhoto') as HTMLInputElement;
		if (photo?.files && photo.files.length > 0 && photo.files[0]) {
			basketData.picture = await convertPhoto(photo.files[0]);
		}

		try {
			await toast.promise(addBasket(vendorId, basketData), {
				loading: 'Adding basket...',
				success: 'Basket added',
				error: 'Error adding basket'
			});
			onClose(basketData);
		} catch (error) {
			console.error(error);
		}
	}
</script>

<!-- Pop-up for Adding Basket -->
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
				bind:value={basketData.name}
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
				bind:value={basketData.description}
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
				bind:value={basketData.initialPrice}
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
			<button class="bg-gray-500 text-white px-4 py-2 rounded-md" onclick={onCancel}>Cancel</button>
			<button class="bg-green-500 text-white px-4 py-2 rounded-md" onclick={addBasketHandler}
				>Add Basket</button
			>
		</div>
	</div>
</div>
