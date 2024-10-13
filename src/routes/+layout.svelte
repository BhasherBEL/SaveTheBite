<script>
	import Header from './Header.svelte';
	import '../app.css';
</script>

<svelte:head>
	<link
		rel="stylesheet"
		href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
		integrity="sha384-uQakAoW9+U1d4K+6P4x8I6gGp7OlGZgQ/UNRP1sA8HCM3IOMpTytZT9ITW7sqU6h"
		crossorigin="anonymous"
	/>
</svelte:head>

<div class="app bg-gray-100 min-h-screen flex flex-col">
	<div class="flex-grow">
		<Header />

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

