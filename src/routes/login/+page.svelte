<script>
	let email = '';
	let password = '';
</script>

<svelte:head>
	<title>Login - SaveTheBite</title>
	<meta name="description" content="Login or sign up to SaveTheBite" />
</svelte:head>

<section class="flex flex-wrap items-center justify-center min-h-screen bg-white space-x-0 md:space-x-8 p-4">
	<!-- Sign Up Section (Left Side) -->
	<div class="bg-green-200 rounded-lg shadow-lg p-8 w-full md:w-1/2 lg:w-1/3 text-center mb-8 md:mb-0">
		<h2 class="text-xl font-semibold mb-2">New here?</h2>
		<p class="mb-4">Create an account</p>
		<button class="w-full bg-black text-white py-2 rounded-md mb-4 hover:bg-gray-800 transition">Sign up as user</button>
		<button class="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition">Sign up as seller</button>
	</div>

	<!-- Login Section (Right Side) -->
	<div class="w-full md:w-1/2 lg:w-1/3">
		<h1 class="text-3xl font-bold text-green-600 mb-2">Welcome Back!</h1>
		<p class="mb-6">Login to your Account</p>
		<div class="bg-gray-50 p-6 rounded-lg shadow-lg">
			<form>
				<div class="mb-4">
					<label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
					<input type="email" bind:value={email} class="w-full p-2 border rounded-lg" placeholder="Enter your email" />
				</div>
				<div class="mb-4">
					<label class="block text-sm font-medium text-gray-700 mb-1">Password</label>
					<input type="password" bind:value={password} class="w-full p-2 border rounded-lg" placeholder="Enter your password" />
				</div>
				<button type="submit" class="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition">Sign In</button>
			</form>
			<a href="#" class="text-sm text-gray-600 hover:text-gray-800 mt-4 inline-block">Forgot password?</a>
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

