<script lang="ts">
    import { addBasket, deleteBasket } from '$lib/utils/company';
    import AddBasketPopup from '$lib/components/AddBasketPopup.svelte';

    let { data } = $props();


	// Company Details with timestamps and image
	let company = data?.vendor;

	let foodBaskets = $state(company?.baskets || []);

    // Handlers for basket actions
    let showAddBasketPopup = $state(false);

    function basketCloseHandler(basket) {
        showAddBasketPopup = false;
        foodBaskets = [...foodBaskets, basket];
    }

    function deleteBasketHandler(id: number) {
        deleteBasket(id);
        foodBaskets = foodBaskets.filter((basket) => basket.id !== id);
    }

    $inspect(showAddBasketPopup);
    $inspect(foodBaskets);
</script>

<svelte:head>
	<title>Company Account - SaveTheBite</title>
	<meta
		name="description"
		content="Manage your company's account and food baskets on SaveTheBite."
	/>
</svelte:head>

<section class="container mx-auto p-6 space-y-12">
	<!-- Company Summary Section -->
	<div>
		<h2 class="text-2xl font-semibold mb-4">Company Details</h2>
		<div class="border-l-4 border-green-500 pl-4 flex items-center space-x-6">
			<!-- Company Image -->
			<img src="{company.picture}"
                alt="Company Logo" 
                class="w-48 h-48 object-cover rounded-2xl" />
			<div>
				<p><strong>Name:</strong> {company.name}</p>
				<p><strong>Location:</strong> {company.location}</p>
				<p><strong>Created At:</strong> {company.createdAt}</p>
				<p><strong>Last Updated:</strong> {company.updatedAt}</p>
				<button
					class="mt-4 bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 transition"
					onclick={() => alert('Edit company details')}
				>
					Edit Company Details
				</button>
			</div>
		</div>
	</div>

	<!-- Food Baskets Management Section -->
	<div>
		<h2 class="text-2xl font-semibold mb-4">Manage Food Baskets</h2>
		<div class="border-l-4 border-green-500 pl-4 space-y-6">
			<!-- List of Baskets -->
			{#if foodBaskets.length > 0}
				<div class="space-y-4">
					{#each foodBaskets as basket}
						<div class="border p-4 rounded-lg shadow-md flex space-x-6">
							<img src={basket.picture} alt={basket.name} class="w-36 h-36 object-cover rounded-md" />
							<div class="flex-grow">
								<p class="font-bold">{basket.name}</p>
								<p class="text-gray-600">Initial Price: {basket.initialPrice}</p>
								<p class="text-gray-600">Price: {basket.price}</p>
								<p class="text-gray-600">Price: {basket.description}</p>
							</div>
							<div class="space-x-2">
								<button
									class="bg-blue-500 text-white py-1 px-3 rounded-md hover:bg-blue-700 transition"
								>
									Edit
								</button>
								<button
									class="bg-red-500 text-white py-1 px-3 rounded-md hover:bg-red-700 transition"
									onclick={() => deleteBasketHandler(basket.id)}
								>
									Delete
								</button>
							</div>
						</div>
					{/each}
				</div>
			{:else}
				<p class="text-gray-600">No food baskets added yet.</p>
			{/if}

			<!-- Add Basket Button -->
			<button
				class="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-700 transition"
                onclick={() => (showAddBasketPopup = true)}
			>
				Add New Basket
			</button>
		</div>
	</div>
</section>

{#if showAddBasketPopup}
    <AddBasketPopup vendorId={company.id} onClose={basketCloseHandler} /> 
{/if}

<style>
	/* Styling similar to user account page */
	.container {
		max-width: 1200px;
	}
</style>
