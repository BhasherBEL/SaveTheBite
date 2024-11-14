<script lang="ts">
  import { goto } from '$app/navigation';

  // Reactive variables for form state
  let name = '';
  let surname = '';
  let email = '';
  let password = '';
  let shareLocation = false;

  // Food preferences and allergies
  const foodPreferences = [
    'Lactose-free', 'Vegan', 'Fish', 'Vegetarian',
    'Eggs-free', 'Gluten-free', 'Soy-free', 'Vegetables',
    'Fruits', 'Bakery', 'Hot', 'Cold', 'Bio', 'Local'
  ];
  const allergies = [
    'Dairy', 'Eggs', 'Fish', 'Shellfish', 'Soy',
    'Sesame', 'Wheat', 'Treenuts', 'Gluten',
    'Sulfites', 'Celery', 'Strawberry', 'Kiwi'
  ];

  let selectedPreferences = new Set();
  let selectedAllergies = new Set();

  function togglePreference(pref) {
    if (selectedPreferences.has(pref)) selectedPreferences.delete(pref);
    else selectedPreferences.add(pref);
  }

  function toggleAllergy(allergy) {
    if (selectedAllergies.has(allergy)) selectedAllergies.delete(allergy);
    else selectedAllergies.add(allergy);
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

<section class="flex flex-wrap items-center justify-center min-h-screen bg-white space-x-0 md:space-x-8 p-4">
  <!-- User Registration Form -->
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
  <div class="w-full md:w-1/2 lg:w-1/3">
    <div class="bg-gray-50 p-6 rounded-lg shadow-lg mb-6">
      <h3 class="text-xl font-semibold text-green-600 mb-4">Food Preferences</h3>
      <div class="flex flex-wrap gap-2">
        {#each foodPreferences as pref}
          <div
            class="toggle-button border rounded-md px-3 py-1 text-sm cursor-pointer {selectedPreferences.has(pref) ? 'bg-green-200 text-green-800' : 'bg-white'}"
            on:click={() => togglePreference(pref)}>
            {pref}
          </div>
        {/each}
      </div>
    </div>

    <div class="bg-gray-50 p-6 rounded-lg shadow-lg">
      <h3 class="text-xl font-semibold text-green-600 mb-4">Allergies</h3>
      <div class="flex flex-wrap gap-2">
        {#each allergies as allergy}
          <div
            class="toggle-button border rounded-md px-3 py-1 text-sm cursor-pointer {selectedAllergies.has(allergy) ? 'bg-red-200 text-red-800' : 'bg-white'}"
            on:click={() => toggleAllergy(allergy)}>
            {allergy}
          </div>
        {/each}
      </div>
    </div>
  </div>
</section>

<style>
  /* Extra styling for layout and mobile responsiveness */
  .toggle-button {
    transition: background-color 0.2s;
  }
</style>
