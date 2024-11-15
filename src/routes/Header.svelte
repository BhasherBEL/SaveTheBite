<script lang="ts">
	export let data: { user: { username: string } } | null = null;

    function navigateTo(path: string) {
        window.location.href = path
    }

    function navigateToAccount() {
        if (data?.user) {
            window.location.href = '/account'
        } else {
            window.location.href = '/login'
        }
    }
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
				<i class="fas fa-home text-2xl" on:click={() => navigateTo('/')}></i>
				<a href="/" class="text-sm">
                    <p>Home</p>
                </a>
			</div>
		</div>
		<div class="flex flex-col items-center group">
			<div class="flex flex-col items-center text-gray-800 hover:text-primary hover:cursor-pointer">
				<i class="fas fa-user text-2xl" on:click={() => navigateToAccount()}></i>
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
		<div class="flex flex-col items-center group">
			<div class="flex flex-col items-center text-gray-800 hover:text-primary hover:cursor-pointer">
				<i class="fas fa-info-circle text-2xl" on:click={() => navigateTo('/about')}></i>
				<a href="/about" class="text-sm">
                    <p>About</p>
                </a>
			</div>
		</div>
	</nav>
</header>

<style>
</style>
