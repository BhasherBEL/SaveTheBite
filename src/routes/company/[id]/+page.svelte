<script lang="ts">
	import { deleteBasket } from '$lib/utils/company';
	import AddBasketPopup from '$lib/components/AddBasketPopup.svelte';
	import EditBasketPopup from '$lib/components/EditBasketPopup.svelte';
	import EditCompanyPopup from '$lib/components/EditCompanyPopup.svelte';
	import AddSalePopup from '$lib/components/AddSalePopup.svelte';
	//import { sales, type Basket } from '$lib/server/db/schema';

	let { data } = $props();

	// Company Details with timestamps and image
	let company = $state(
		data?.vendor || { picture: '', name: '', location: '', createdAt: '', updatedAt: '' }
	);

	let foodBaskets = $state(company?.baskets || []);

	// Handlers for basket actions
	let showAddBasketPopup = $state(false);
	let showEditBasketPopup = $state(false);
	let basketData = $state({});
	let showEditCompanyPopup = $state(false);
	let showAddSalePopup = $state(false);

	function basketCloseHandler(basket) {
		showAddBasketPopup = false;
		foodBaskets = [...foodBaskets, basket];
	}

	function deleteBasketHandler(id: number) {
		deleteBasket(id);
		foodBaskets = foodBaskets.filter((basket) => basket.id !== id);
	}

	function editBasketHandler(id: number) {
		showEditBasketPopup = true;
		basketData = foodBaskets.find((basket) => basket.id === id);
	}

	function vendorCloseHandler(vendor) {
		showEditCompanyPopup = false;
		company = vendor;
	}

	function saleCloseHandler(sale) {
		showAddSalePopup = false;
		foodBaskets.find((basket) => basket.id === sale.basketId).sales.push(sale);
	}

	function createSaleHandler(basket: Basket) {
		showAddSalePopup = true;
		basketData = basket;
	}

	// Utility function to inspect the data
	function timeBetween(now, future) {
		const diffMs = future - now; // Difference in milliseconds

		if (diffMs <= 0) {
			return 'Time has already passed!';
		}

		// Convert milliseconds to units
		const seconds = Math.floor((diffMs / 1000) % 60);
		const minutes = Math.floor((diffMs / (1000 * 60)) % 60);
		const hours = Math.floor((diffMs / (1000 * 60 * 60)) % 24);
		const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));

		if (days > 0) {
			return `${days} days, ${hours} hours`;
		} else if (hours > 0) {
			return `${hours} hours, ${minutes} minutes`;
		} else if (minutes > 0) {
			return `${minutes} minutes and ${seconds} seconds`;
		} else {
			return `${seconds} seconds`;
		}
	}
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
		<div class="border-l-4 border-green-500 pl-4 flex flex-col md:flex-row items-center space-x-6">
			<!-- Company Image -->
			<img
				src={company.picture}
				alt="Company Logo"
				class="md:w-48 md:h-48 mb-4 md:mb-0 object-cover rounded-2xl"
			/>
			<div class="w-full">
				<p><strong>Name:</strong> {company.name}</p>
				<p><strong>Location:</strong> {company.location}</p>
				<p><strong>Created At:</strong> {company.createdAt}</p>
				<p><strong>Last Updated:</strong> {company.updatedAt}</p>
				<button
					class="mt-4 bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 transition"
					onclick={() => (showEditCompanyPopup = true)}
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
						<div
							class="border p-4 rounded-lg shadow-md flex flex-col md:flex-row space-x-0 md:space-x-6"
						>
							<img
								src={basket.picture}
								alt={basket.name}
								class="md:w-36 md:h-36 mb-2 md:mb-0 object-cover rounded-md"
							/>
							<div class="flex-grow mb-4 md:mb-0">
								<p class="font-bold">{basket.name}</p>
								<p class="text-gray-600">Initial Price: {basket.initialPrice}</p>
								<p class="text-gray-600">Price: {basket.price}</p>
								<p class="text-gray-600">Price: {basket.description}</p>
							</div>
							<div class="flex flex-col justify-between">
								<div class="flex justify-between md:justify-end space-x-2">
									<button
										class="bg-blue-500 text-white py-1 px-3 rounded-md hover:bg-blue-700 transition"
										onclick={() => editBasketHandler(basket.id)}
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
								<button
									class="bg-green-500 w-full text-white py-1 mt-4 md:mt-0 rounded-md hover:bg-green-700 transition"
									onclick={() => createSaleHandler(basket)}
								>
									Create sales
								</button>
							</div>
						</div>

						<!-- Sales Section -->
						{#if basket.sales?.length > 0}
							<div
								class="flex flex-col justify-between mt-10 border ml-6 md:ml-16 rounded-lg shadow-md p-2"
							>
								{#each basket.sales as sale, index}
									<div class="flex flex-col justify-between">
										<div class="flex flex-col md:flex-row space-x-2">
											<h3 class="font-bold">Sale {index + 1}:</h3>
											<div class="flex flex-grow justify-between">
												<p class="text-gray-600">
													Quantity {sale.remain} out of {sale.quantity}
												</p>
												<p class="text-gray-600">
													End in {timeBetween(new Date(), sale.expiresAt)}
												</p>
											</div>
										</div>
									</div>
								{/each}
							</div>
						{/if}
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
	<AddBasketPopup
		vendorId={company.id}
		onClose={basketCloseHandler}
		onCancel={() => {
			showAddBasketPopup = false;
		}}
	/>
{/if}

{#if showEditBasketPopup}
	<EditBasketPopup
		bind:basket={basketData}
		onClose={() => {
			showEditBasketPopup = false;
		}}
		onCancel={() => {
			showEditBasketPopup = false;
		}}
	/>
{/if}

{#if showEditCompanyPopup}
	<EditCompanyPopup
		bind:vendor={company}
		onClose={vendorCloseHandler}
		onCancel={() => {
			showEditCompanyPopup = false;
		}}
	/>
{/if}

{#if showAddSalePopup}
	<AddSalePopup
		basket={basketData}
		onClose={saleCloseHandler}
		onCancel={() => {
			showAddSalePopup = false;
		}}
	/>
{/if}

<style>
	/* Styling similar to user account page */
	.container {
		max-width: 1200px;
	}
</style>
