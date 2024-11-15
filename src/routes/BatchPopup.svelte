<script lang="ts">
	import Basket from '$lib/types/basket';

	export let show = false;
	export let data: Basket;
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
			class="bg-white pt-12 sm:pt-6 p-6 rounded-3xl shadow-lg w-full sm:w-4/5 h-full sm:h-4/5 relative flex flex-col sm:flex-row justify-start items-center"
			role="dialog"
			aria-label="Batch details"
			on:click|stopPropagation
			on:keydown|stopPropagation={(e) => e.key === 'Enter' && onClose()}
		>
			<!-- Close Button for small screens -->
			<button
				class="absolute top-2 right-4 sm:hidden text-3xl font-semibold text-gray-600 hover:text-gray-800"
				on:click={onClose}
				aria-label="Close"
			>
				×
			</button>
			<img
				src={data.picture}
				alt={data.name}
				class="inset-y-0 left-0 w-full sm:w-1/2 h-full rounded-3xl object-cover aspect-square mx-auto"
			/>
			<div class="w-full sm:w-1/2 pt-4 sm:pt0 h-full pl-4 flex flex-col justify-start items-start">
				<div class="flex justify-between w-full mb-2">
					<h2 class="text-2xl font-semibold text-black">{data.name}</h2>
					<h2 class="text-primary text-xl">{data.price}€</h2>
				</div>
				<p class="text-gray-400 text-sm flex-1 pb-4">
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas
					vel sint commodi repudiandae consequuntur voluptatum laborum numquam blanditiis harum
					quisquam eius sed odit fugiat iusto fuga praesentium optio, eaque rerum! Provident
					similique accusantium nemo autem. Veritatis obcaecati tenetur iure eius earum ut molestias
					architecto voluptate aliquam nihil,
				</p>
				<button
					class="mt-auto w-full mb-4 py-2 bg-primary text-white font-semibold rounded-2xl hover:bg-green-600"
				>
					Add to cart
				</button>
			</div>
		</div>
	</div>
{/if}
