<script lang="ts">
	import type { PageData } from '../../routes/$types';

	let { data }: { data: PageData } = $props();

	let isMenuOpen = $state(false);

	function navigateTo(path: string) {
		isMenuOpen = false;
		document.body.style.overflow = '';
		window.location.href = path;
	}

	function navigateToAccount() {
		isMenuOpen = false;
		document.body.style.overflow = '';
		if (data?.user) {
			window.location.href = '/account';
		} else {
			window.location.href = '/login';
		}
	}

	function toggleMenu() {
		isMenuOpen = !isMenuOpen;
		// Prevent scrolling when menu is open
		if (isMenuOpen) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = '';
		}
	}
</script>

<!-- svelte-ignore a11y_consider_explicit_label -->
<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<header class="bg-white py-4 px-8 flex justify-between items-center">
	<div class="flex items-center space-x-4">
		<a href="/">
			<img src="/images/logo.jpg" alt="SaveTheBite Logo" class="h-12" />
		</a>
	</div>

	<!-- Hamburger Menu for small devices -->
	<div class="lg:hidden flex items-center">
		<button onclick={toggleMenu} class="text-gray-800">
			<i class="fas fa-bars text-2xl"></i>
		</button>
	</div>

	<!-- Navigation links for large screens -->
	<nav class="hidden lg:flex space-x-8">
		<div class="flex flex-col items-center group">
			<div class="flex flex-col items-center text-gray-800 hover:text-primary hover:cursor-pointer">
				<i class="fas fa-home text-2xl" onclick={() => navigateTo('/')}></i>
				<a href="/" class="text-sm">
					<p>Home</p>
				</a>
			</div>
		</div>
		<div class="flex flex-col items-center group">
			<div class="flex flex-col items-center text-gray-800 hover:text-primary hover:cursor-pointer">
				<i class="fas fa-user text-2xl" onclick={() => navigateToAccount()}></i>
				{#if data?.user}
					<a href="/account" class="text-sm">
						<p>{data?.user.username}</p>
					</a>
				{:else}
					<a href="/login" class="text-sm">
						<p>Login</p>
					</a>
				{/if}
			</div>
		</div>
		<!-- Shopping Cart -->
		{#if data?.user}
			<div class="flex flex-col items-center group">
				<div
					class="flex flex-col relative items-center text-gray-800 hover:text-primary hover:cursor-pointer"
				>
					<i class="fas fa-shopping-cart text-2xl" onclick={() => navigateTo('/cart')}></i>
					<a href="/cart" class="text-sm">
						<p>Cart</p>
					</a>
					<div
						class="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-gray-500 border-2 border-white rounded-full -top-2 -end-2 animate-ping"
						class:bg-primary={data?.cartSize > 0}
					>
						{data?.cartSize}
					</div>
					<div
						class="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-gray-500 border-2 border-white rounded-full -top-2 -end-2"
						class:bg-primary={data?.cartSize > 0}
					>
						{data?.cartSize}
					</div>
				</div>
			</div>
		{/if}

		<div class="flex flex-col items-center group">
			<div class="flex flex-col items-center text-gray-800 hover:text-primary hover:cursor-pointer">
				<i class="fas fa-info-circle text-2xl" onclick={() => navigateTo('/about')}></i>
				<a href="/about" class="text-sm">
					<p>About</p>
				</a>
			</div>
		</div>
	</nav>

	<!-- Collapsible Dropdown for small screens -->
	<div
		class={`lg:hidden ${isMenuOpen ? 'block' : 'hidden'} absolute top-0 left-0 w-full h-screen bg-white flex flex-col items-center space-y-1 py-6`}
	>
		<!-- Close Button for small screens -->
		<button
			class="absolute top-2 right-4 sm:hidden text-3xl font-semibold text-gray-600 hover:text-gray-800"
			onclick={toggleMenu}
			aria-label="Close"
		>
			×
		</button>
		<div class="w-full p-4">
			<!-- Home button -->
			<div
				class="flex w-full items-center justify-center bg-primary text-white p-3 text-xl font-semibold rounded-xl hover:bg-green-600 transition duration-200"
				onclick={() => navigateTo('/')}
			>
				<i class="fas fa-home text-2xl mr-4"></i>
				<p class="w-full text-center">Home</p>
			</div>
		</div>
		<div class="w-full p-4">
			<!-- Account/Login button -->
			<div
				class="flex w-full items-center justify-center bg-primary text-white p-3 text-xl font-semibold rounded-xl hover:bg-green-600 transition duration-200"
				onclick={() => navigateToAccount()}
			>
				<i class="fas fa-user text-2xl mr-4"></i>
				{#if data?.user}
					<p class="w-full text-center">{data?.user.username}</p>
				{:else}
					<p class="w-full text-center">Login</p>
				{/if}
			</div>
		</div>
        <div class="w-full p-4">
            <!-- Shopping Cart button -->
            <div
                class="flex w-full items-center justify-center bg-primary text-white p-3 text-xl font-semibold rounded-xl hover:bg-green-600 transition duration-200"
                onclick={() => navigateTo('/cart')}
            >
                <i class="fas fa-shopping-cart text-2xl mr-4"></i>
                <p class="w-full text-center">Cart</p>
                <div
                    class="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-gray-500 border-2 border-white rounded-full -top-2 -end-2 animate-ping"
                    class:bg-primary={data?.cartSize > 0}
                >
                    {data?.cartSize}
                </div>
                <div
                    class="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-gray-500 border-2 border-white rounded-full -top-2 -end-2"
                    class:bg-primary={data?.cartSize > 0}
                >
                    {data?.cartSize}
                </div>
            </div>
        </div>
		<div class="w-full p-4">
			<!-- About button -->
			<div
				class="flex w-full items-center justify-center bg-primary text-white p-3 text-xl font-semibold rounded-xl hover:bg-green-600 transition duration-200"
				onclick={() => navigateTo('/about')}
			>
				<i class="fas fa-info-circle text-2xl mr-4"></i>
				<p class="w-full text-center">About</p>
			</div>
		</div>
	</div>
</header>

<style>
</style>
