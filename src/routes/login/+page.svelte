<script lang="ts">
	import type { PageData, ActionData } from './$types';
	import { enhance } from '$app/forms';

	let { data, form }: { data: PageData; form: ActionData } = $props();
</script>

<svelte:head>
	<title>Login - SaveTheBite</title>
	<meta name="description" content="Login or sign up to SaveTheBite" />
</svelte:head>

<section class="container mx-auto p-6 space-y-12">

	<!-- Sign Up Section (Left Side) -->

	<div class="flex flex-col lg:flex-row lg:space-x-8">

        <div class="bg-green-200 rounded-lg shadow-lg p-8 w-full md:w-1/2 lg:w-1/3 text-center mb-8 md:mb-0">

            <h2 class="text-2xl font-semibold mb-2">New here?</h2>
            <p class="mb-4">Create an account</p>

            <a href="/registration">
                <button class="w-full bg-black text-white py-2 rounded-md mb-4 hover:bg-gray-800 transition">Sign up</button>
            </a>

        </div>

        <!-- Login Section (Right Side) -->
        <div class="w-full md:w-1/2 lg:w-1/3">
            <h1 class="text-3xl font-bold text-green-600 mb-2">Welcome Back!</h1>
            <p class="mb-6">Login to your Account</p>
            <div class="bg-gray-50 p-6 rounded-lg shadow-lg">
                {#if form?.invalid}
                    <div class="bg-red-500 text-center text-white font-bold p-2 rounded-xl">
                        Invalid email or password
                    </div>
                {:else if form?.missing}
                    <div class="bg-red-500 text-center text-white font-bold p-2 rounded-xl">
                        Missing email or password
                    </div>
                {/if}
                <form method="POST" use:enhance>
                    <div class="mb-4">
                        <label class="block text-sm font-medium text-gray-700 mb-1" for="email">Email</label>
                        <input
                            type="email"
                            name="email"
                            class="w-full p-2 border rounded-lg"
                            placeholder="Enter your email"
                        />
                    </div>
                    <div class="mb-4">
                        <label class="block text-sm font-medium text-gray-700 mb-1" for="password">Password</label
                        >
                        <input
                            type="password"
                            name="password"
                            class="w-full p-2 border rounded-lg"
                            placeholder="Enter your password"
                        />
                    </div>
                    <button class="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition">
                        Sign In
                    </button>
                </form>
                <a href="#" class="text-sm text-gray-600 hover:text-gray-800 mt-4 inline-block"
                    >Forgot password?</a
                >
            </div>
        </div>
    </div>
</section>

<style>
	section {
		gap: 2rem;
	}

	@media (max-width: 768px) {
		section {
			flex-direction: column;
		}
	}
</style>
