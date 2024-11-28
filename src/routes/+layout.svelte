<script>
	import Header from '$lib/components/Header.svelte';
	import '../app.css';
	import { Toaster } from 'svelte-hot-french-toast';

	let { data } = $props();
</script>

<div class="app h-screen min-h-screen flex flex-col">
	<div class="flex flex-grow flex-col">
		<Header bind:data />

		<main class="container flex-grow mx-auto p-4">
			<slot />
		</main>
	</div>

	<footer class="bg-gray-800 text-white text-center p-4">
		<p>&copy; 2024 SaveTheBite. All rights reserved.</p>
	</footer>
</div>

<Toaster />

<style>
</style>
