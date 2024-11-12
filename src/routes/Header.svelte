<script lang="ts">
	export let data;
</script>

<header class="bg-white py-4 px-8 flex justify-between items-center">
	<div class="flex items-center space-x-4">
		<a href="/">
			<img src="/images/logo.jpg" alt="SaveTheBite Logo" class="h-12" />
		</a>
	</div>
	<nav class="flex space-x-8">
		<div class="flex flex-col items-center group">
			<!-- Wrap icon and text in a parent div -->
			<div class="flex flex-col items-center text-gray-800 hover:text-primary hover:cursor-pointer">
				<i class="fas fa-home text-2xl"></i>
				<span class="text-sm">Home</span>
			</div>
		</div>
		<div class="flex flex-col items-center group">
			<div class="flex flex-col items-center text-gray-800 hover:text-primary hover:cursor-pointer">
				<i class="fas fa-user text-2xl"></i>
				{#if data?.user}
					<a href="/account" class="text-sm">{data?.user.username}</a>
				{:else}
					<a href="/login" class="text-sm">Log in</a>
				{/if}
			</div>
		</div>
		<div class="flex flex-col items-center group">
			<div class="flex flex-col items-center text-gray-800 hover:text-primary hover:cursor-pointer">
				<i class="fas fa-info-circle text-2xl"></i>
				<span class="text-sm">About</span>
			</div>
		</div>
	</nav>
</header>

<style>
</style>
