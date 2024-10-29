<script lang="ts">
	import Batch from '$lib/types/Batch';

	export let show = false;
	export let data: Batch;
	export let onClose = () => {
		show = false;
	};
</script>

{#if show}
	<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
	<div
		class="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center"
		role="dialog"
		aria-label="Show batch details"
		on:click={onClose}
		on:keydown={(e) => e.key === 'Escape' && onClose()}
	>
		<div
			class="bg-white p-6 rounded-3xl shadow-lg w-2/3 h-1/2 relative flex justify-start items-center"
			role="dialog"
			aria-label="Batch details"
		>
			<img
				src={data.picture}
				alt={data.name}
				class="inset-y-0 left-0 w-1/2 h-full rounded-3xl object-cover aspect-square mx-auto"
			/>
			<div class="w-1/2 h-full pl-4 flex flex-col justify-start items-start">
				<div class="flex justify-between w-full mb-2">
					<h2 class="text-2xl font-semibold text-black">{data.name}</h2>
					<h2 class="text-primary text-xl">{data.price}€</h2>
				</div>
				<p>Not setup yet</p>
				<button
					class="mt-auto w-full py-2 bg-primary text-white font-semibold rounded-2xl hover:bg-green-600"
				>
					Add to cart
				</button>
			</div>
		</div>
	</div>
{/if}
