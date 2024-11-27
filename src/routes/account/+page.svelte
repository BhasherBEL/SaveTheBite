<script lang="ts">
	import { addCompany } from '$lib/utils/company';

	// Props
	let { data } = $props();
	let { orders, user, ...other } = data;
	let { managers } = user;

	console.log('managers', managers);
	console.log('orders', orders);
	console.log('other', other);

	let language = 'English';
	let theme = 'Light';
	let location = '';
	let foodPreferences = [
		{ name: 'Lactose-free', active: false },
		{ name: 'Vegan', active: false },
		{ name: 'Fish', active: false },
		{ name: 'Vegetarian', active: false },
		{ name: 'Eggs-free', active: false },
		{ name: 'Gluten-free', active: false },
		{ name: 'Soy-free', active: false },
		{ name: 'Vegetables', active: false },
		{ name: 'Fruits', active: false },
		{ name: 'Bakery', active: false },
		{ name: 'Hot', active: false },
		{ name: 'Cold', active: false },
		{ name: 'Bio', active: false },
		{ name: 'Local', active: false }
	];

	function navigateTo(path: string) {
		document.body.style.overflow = '';
		window.location.href = path;
	}

	// Utility function to inspect the data
	function timeBetween(now, future) {
		future = new Date(future);
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

	function toggleFoodPreference(index) {
		foodPreferences[index].active = !foodPreferences[index].active;
	}

	let allergies = [
		{ name: 'Dairy', active: false },
		{ name: 'Eggs', active: false },
		{ name: 'Fish', active: false },
		{ name: 'Shellfish', active: false },
		{ name: 'Soy', active: false },
		{ name: 'Sesame', active: false },
		{ name: 'Wheat', active: false },
		{ name: 'Treenuts', active: false },
		{ name: 'Gluten', active: false },
		{ name: 'Sulfites', active: false },
		{ name: 'Celery', active: false },
		{ name: 'Strawberry', active: false },
		{ name: 'Kiwi', active: false }
	];

	function toggleAllergies(index) {
		allergies[index].active = !allergies[index].active;
	}

	// Pop-up and Company Data
	let showAddCompanyPopup = false;
	let companyName = '';
	let companyLocation = '';
	let companyDescription = '';
	let companyAdded = false;
	let filePhoto: File;
	let showBasketPopup = $state(false);

	const toBase64 = (file) =>
		new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = () => resolve(reader.result);
			reader.onerror = reject;
		});

	async function convertFileToBase64(photo: File) {
		try {
			const base64String = await toBase64(photo);
			console.log(base64String);
			return base64String;
		} catch (error) {
			console.error(error);
		}
	}

	async function addCompanyPage() {
		companyAdded = true; // Simulate that the company has been added
		showAddCompanyPopup = false; // Close the pop-up

		filePhoto = (document.getElementById('companyPhoto') as HTMLInputElement).files[0];

		let companyPhoto = '';
		if (filePhoto) {
			companyPhoto = await convertFileToBase64(filePhoto);
		}

		addCompany({ companyName, companyDescription, companyLocation, companyPhoto });
	}

	function companyNavigateHandler(vendor) {
		console.log('Navigating to company:', vendor);
		// Navigate to the company page
		let pageId = vendor.id;
		navigateTo(`/company/${pageId}`);
	}
</script>

<svelte:head>
	<title>Account - SaveTheBite</title>
	<meta name="description" content="Manage your account settings on SaveTheBite." />
</svelte:head>

<section class="container mx-auto p-6 space-y-12">
	<!-- General Section -->
	<div class="flex flex-col lg:flex-row lg:space-x-8">
		<div class="w-full lg:w-1/2">
			<h2 class="text-2xl font-semibold mb-4">General</h2>
			<div class="border-l-4 border-green-500 pl-4">
				<!-- Language Settings -->
				<div class="mb-6">
					<p class="font-bold mb-2">Language</p>
					<div class="flex space-x-4">
						<button
							class={`px-4 py-2 rounded ${language === 'Suomi' ? 'bg-green-300' : 'bg-white'}`}
							on:click={() => (language = 'Suomi')}>Suomi</button
						>
						<button
							class={`px-4 py-2 rounded ${language === 'English' ? 'bg-green-300' : 'bg-white'}`}
							on:click={() => (language = 'English')}>English</button
						>
						<button
							class={`px-4 py-2 rounded ${language === 'Deutsch' ? 'bg-green-300' : 'bg-white'}`}
							on:click={() => (language = 'Deutsch')}>Deutsch</button
						>
						<button
							class={`px-4 py-2 rounded ${language === 'Français' ? 'bg-green-300' : 'bg-white'}`}
							on:click={() => (language = 'Français')}>Français</button
						>
					</div>
				</div>

				<!-- Theme Settings -->
				<div class="mb-6">
					<p class="font-bold mb-2">Theme</p>
					<div class="flex space-x-4">
						<button
							class={`px-4 py-2 rounded ${theme === 'Light' ? 'bg-green-300' : 'bg-white'}`}
							on:click={() => (theme = 'Light')}>Light</button
						>
						<button
							class={`px-4 py-2 rounded ${theme === 'Dark' ? 'bg-green-300' : 'bg-white'}`}
							on:click={() => (theme = 'Dark')}>Dark</button
						>
					</div>
				</div>

				<!-- Default Location -->
				<div>
					<p class="font-bold mb-2">Default location</p>
					<input
						type="text"
						bind:value={location}
						placeholder="No default location ..."
						class="w-full p-2 border rounded"
					/>
				</div>
			</div>
			<!-- Company Section -->
			<div class="w-full mt-12 lg:mt-6">
				<h2 class="text-2xl font-semibold mb-4">Your companies</h2>
				<div class="border-l-4 border-green-500 pl-4">
					<div class="flex flex-col gap-2">
						{#if managers.length === 0}
							<p class="text-gray-600">No companies added</p>
						{/if}
						{#each managers as manager}
							<button
								class="px-4 py-2 rounded-lg bg-white border border-gray-300"
								on:click={() => companyNavigateHandler(manager.vendor)}
							>
								{manager.vendor.name}
							</button>
						{/each}
						<button
							class="w-full mt-8 bg-black text-white py-2 rounded-md mb-4 hover:bg-gray-800 transition"
							on:click={() => (showAddCompanyPopup = true)}>Add a Company</button
						>
					</div>
				</div>
			</div>
		</div>

		<!-- Food Preferences Section -->
		<div class="w-full lg:w-1/2 mt-12 lg:mt-0">
			<h2 class="text-2xl font-semibold mb-4">Food preferences</h2>
			<div class="border-l-4 border-green-500 pl-4">
				<div class="flex flex-wrap gap-2">
					{#each foodPreferences as preference, index}
						<button
							class={`px-4 py-2 rounded-md ${preference.active ? 'bg-green-300' : 'bg-white border'} border-gray-300`}
							on:click={() => toggleFoodPreference(index)}
						>
							{preference.name}
						</button>
					{/each}
				</div>
			</div>

			<h2 class="text-2xl font-semibold mt-6 mb-4">Allergies</h2>
			<div class="border-l-4 border-green-500 pl-4">
				<div class="flex flex-wrap gap-2">
					{#each allergies as allergy, index}
						<button
							class={`px-4 py-2 rounded-md ${allergy.active ? 'bg-green-300' : 'bg-white border'} border-gray-300`}
							on:click={() => toggleAllergies(index)}
						>
							{allergy.name}
						</button>
					{/each}
				</div>
			</div>

			<!-- Favorites Section -->
			<div class="mt-6">
				<h2 class="text-2xl font-semibold mb-4">Favorites</h2>
				<div class="border-l-4 border-green-500 pl-4 space-y-4">
					<div>
						<p class="font-bold">Stores</p>
						<p class="text-gray-600">No favorite stores</p>
					</div>
					<div>
						<p class="font-bold">Baskets</p>
						<p class="text-gray-600">No favorite baskets</p>
					</div>
				</div>
			</div>
		</div>

		<!-- Pop-up for Adding Company -->
		{#if showAddCompanyPopup}
			<div class="fixed inset-0 bg-gray-700 bg-opacity-50 flex justify-center items-center">
				<div class="bg-white p-8 rounded-lg w-96">
					<h3 class="text-xl font-semibold mb-4">Add a Company</h3>
					<div class="mb-4">
						<label for="companyName" class="block text-sm font-medium text-gray-700 mb-2"
							>Company Name</label
						>
						<input
							type="text"
							id="companyName"
							bind:value={companyName}
							class="w-full p-2 border rounded"
							placeholder="Enter company name"
						/>
					</div>
					<div class="mb-4">
						<label for="companyDescription" class="block text-sm font-medium text-gray-700 mb-2"
							>Company Description</label
						>
						<input
							type="text"
							id="companyDescription"
							bind:value={companyDescription}
							class="w-full p-2 border rounded"
							placeholder="Enter company description"
						/>
					</div>
					<div class="mb-4">
						<label for="companyLocation" class="block text-sm font-medium text-gray-700 mb-2"
							>Company Location</label
						>
						<input
							type="text"
							id="companyLocation"
							bind:value={companyLocation}
							class="w-full p-2 border rounded"
							placeholder="Enter company location"
						/>
					</div>
					<div class="mb-4">
						<label for="companyPhoto" class="block text-sm font-medium text-gray-700 mb-2"
							>Company Photo (Optional)</label
						>
						<input
							type="file"
							id="companyPhoto"
							accept="image/*"
							class="w-full p-2 border rounded text-gray-500 cursor-not-allowed"
							placeholder="Click to upload a photo"
						/>
					</div>
					<div class="flex justify-between">
						<button
							class="bg-gray-500 text-white px-4 py-2 rounded-md"
							on:click={() => (showAddCompanyPopup = false)}>Cancel</button
						>
						<button class="bg-green-500 text-white px-4 py-2 rounded-md" on:click={addCompanyPage}
							>Add Company</button
						>
					</div>
				</div>
			</div>
		{/if}
	</div>

	<!-- Current Orders Section -->
	<div>
		<h2 class="text-2xl font-semibold mb-4">Your basket to collect</h2>
		<div class="border-l-4 border-green-500 pl-4">
			{#if orders.length === 0}
				<p class="text-gray-600">No current orders</p>
			{/if}
			{#each orders as order, index}
				<!-- Example of an Order Card -->
				<div class="flex items-center border p-4 rounded-lg shadow-md mb-4">
					<img
						class="w-0 h-0 md:w-24 md:h-24 mb-2 md:mb-0 object-cover rounded-md flex items-center justify-center mr-4"
						src={order.sale.basket.picture}
					/>
					<div class="flex flex-col flex-grow justify-between">
						<p class="font-semibold">
							{order.sale.basket.name}<span class="text-gray-500"
								>📍 {order.sale.basket.vendor.name}</span
							>
						</p>
						<p class="text-gray-600">
							Collection stops in {timeBetween(new Date(), order.sale.expiresAt)}
						</p>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>

<style>
	/* Custom spacing and padding */
	.container {
		max-width: 1200px;
	}
</style>
