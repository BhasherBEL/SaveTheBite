<script lang="ts">
    import { goto } from '$app/navigation';

    let name = '';
    let surname = '';
    let email = '';
    let password = '';
    let shareLocation = false;

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
        { name: 'Local', active: false },
    ];

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
        { name: 'Kiwi', active: false },
    ];

	function toggleFoodPreference(index) {
		foodPreferences[index].active = !foodPreferences[index].active;
	}

	function toggleAllergies(index) {
		allergies[index].active = !allergies[index].active;
	}


    async function registerUser() {
        // Placeholder function for form submission
        if (email === '' || password === '') {
          alert("Email and password are required.");
          return;
        }

        if (password.length < 8) {
          alert("Password must be at least 8 characters long.");
          return;
        }

        // Process registration
        alert("Registration successful!");
        goto('/dashboard');
    }
</script>

<svelte:head>
    <title>Register - SaveTheBite</title>
    <meta name="description" content="Register to SaveTheBite" />
</svelte:head>

<section class="flex flex-wrap items-center justify-center min-h-screen bg-white p-4">

    <!-- User Registration Form -->

    <div class="flex flex-col lg:flex-row lg:space-x-8">

        <div class="bg-green-200 rounded-lg shadow-lg p-8 w-full md:w-1/2 lg:w-1/3 mb-8 md:mb-0">

            <h2 class="text-3xl font-bold text-green-600 mb-4">Register as User</h2>

            <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input type="text" bind:value={name} class="w-full p-2 border rounded-lg" placeholder="Enter your name" />
            </div>
            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700 mb-1">Surname</label>
              <input type="text" bind:value={surname} class="w-full p-2 border rounded-lg" placeholder="Enter your surname" />
            </div>
            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input type="email" bind:value={email} class="w-full p-2 border rounded-lg" placeholder="Enter your email" />
            </div>
            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input type="password" bind:value={password} class="w-full p-2 border rounded-lg" placeholder="Enter your password" />
            </div>
            <div class="flex items-center mb-6">
              <input type="checkbox" bind:checked={shareLocation} class="mr-2" />
              <label class="text-sm text-gray-700">Share my Location</label>
            </div>

            <button class="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition" on:click|preventDefault={registerUser}>Register</button>
      </div>

      <!-- Preferences and Allergies Section -->

            <!-- Food Preferences and Allergies -->

            <div class="w-full lg:w-1/2 mt-12 lg:mt-0">
                <h2 class="text-2xl font-semibold mb-8">Food preferences</h2>
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

                <h2 class="text-2xl font-semibold mb-4 mt-8">Allergies</h2>
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
            </div>
        </div>


</section>

<style>
    .toggle-button {
        transition: background-color 0.2s;
    }
</style>
