<script>
	import Header from './Header.svelte';
	import '../app.css';

	export let data;
</script>


<div class="app min-h-screen flex flex-col">
	<div class="flex-grow">
		<Header {data} />

		<main class="container mx-auto p-4">
			<slot />
		</main>
	</div>

	<footer class="bg-gray-800 text-white text-center p-4">
		<p>&copy; 2024 SaveTheBite. All rights reserved.</p>
	</footer>
</div>

<style>
</style>
