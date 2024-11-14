<script>
	let language = 'English';
	let theme = 'Light';
	let location = '';
	let foodPreferences = [
		{ name: 'Lactose-free', active: true },
		{ name: 'Vegan', active: true },
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
		{ name: 'Local', active: false },
	];

	function toggleFoodPreference(index) {
		foodPreferences[index].active = !foodPreferences[index].active;
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
						<button class={`px-4 py-2 rounded ${language === 'Suomi' ? 'bg-gray-200' : 'bg-white'}`} on:click={() => language = 'Suomi'}>Suomi</button>
						<button class={`px-4 py-2 rounded ${language === 'English' ? 'bg-green-300' : 'bg-white'}`} on:click={() => language = 'English'}>English</button>
						<button class={`px-4 py-2 rounded ${language === 'Deutsch' ? 'bg-gray-200' : 'bg-white'}`} on:click={() => language = 'Deutsch'}>Deutsch</button>
						<button class={`px-4 py-2 rounded ${language === 'Français' ? 'bg-gray-200' : 'bg-white'}`} on:click={() => language = 'Français'}>Français</button>
					</div>
				</div>

				<!-- Theme Settings -->
				<div class="mb-6">
					<p class="font-bold mb-2">Theme</p>
					<div class="flex space-x-4">
						<button class={`px-4 py-2 rounded ${theme === 'Light' ? 'bg-green-300' : 'bg-white'}`} on:click={() => theme = 'Light'}>Light</button>
						<button class={`px-4 py-2 rounded ${theme === 'Dark' ? 'bg-gray-200' : 'bg-white'}`} on:click={() => theme = 'Dark'}>Dark</button>
					</div>
				</div>

				<!-- Default Location -->
				<div>
					<p class="font-bold mb-2">Default location</p>
					<input type="text" bind:value={location} placeholder="No default location ..." class="w-full p-2 border rounded" />
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
		</div>
	</div>

	<!-- Favorites Section -->
	<div>
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

	<!-- Current Orders Section -->
	<div>
		<h2 class="text-2xl font-semibold mb-4">Current orders</h2>
		<div class="border-l-4 border-green-500 pl-4">
			<!-- Example of an Order Card -->
			<div class="flex items-center border p-4 rounded-lg shadow-md mb-4">
				<div class="bg-green-300 text-2xl font-bold text-white rounded-full h-12 w-12 flex items-center justify-center mr-4">2</div>
				<div class="flex-1">
					<p class="font-semibold">K-Market Otaniemi <span class="text-gray-500">📍 Otaniementie 12, 02150 Espoo</span></p>
					<p class="text-gray-600">19h · Collection starts in 2h45</p>
				</div>
			</div>
			<a href="#" class="text-green-500 hover:underline">See past orders</a>
		</div>
	</div>
</section>

<style>
	/* Custom spacing and padding */
	.container {
		max-width: 1200px;
	}
</style>
