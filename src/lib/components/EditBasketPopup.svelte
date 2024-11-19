<script lang="ts">
	import { type Basket } from '$lib/server/db/schema';
    import { addBasket } from '$lib/utils/company';

    let showAddBasketPopup = $state(false);
    
    let basketData: Basket = $state();

	function addCompanyPage() {
		basketAdded = true; // Simulate that the company has been added
		showAddBasketPopup = false; // Close the pop-up

        addBasket(basketData);
	}
</script>

<!-- Pop-up for Adding Basket -->
{#if showAddBasketPopup}
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
					onclick={() => (showAddBasketPopup = false)}>Cancel</button
				>
				<button class="bg-green-500 text-white px-4 py-2 rounded-md" on:click={addBasketPage}
					>Add Basket</button
				>
			</div>
		</div>
	</div>
{/if}
