<script lang="ts">
	import Market from '$lib/types/Market';

	export let markets: Market[]; // Receive markets as a prop
	export let filters: { name: string; active: boolean | null }[];
</script>

<div class="p-4">
	{#each markets as market}
		<div class="bg-white p-4 rounded-lg shadow-md mb-4">
			<span class="font-bold text-lg">{market.name}</span>
			<span class="ml-2 text-gray-400 text-sm font-bold">{market.address}</span>
			<div class="gap-4 mt-4 flex overflow-x-auto">
				{#each market.batches as batch}
					<div class="border rounded-lg p-2 flex-shrink-0">
						<img src={batch.picture} alt={batch.name} class="size-72 mx-auto rounded-lg" />
						<p class="font-semibold mt-2">{batch.name}</p>
						<p>{batch.price}€</p>
					</div>
				{/each}
				{#each market.batches as batch}
					<div class="border rounded-lg p-2 flex-shrink-0">
						<img src={batch.picture} alt={batch.name} class="size-72 mx-auto rounded-lg" />
						<p class="font-semibold mt-2">{batch.name}</p>
						<p>{batch.price}€</p>
					</div>
				{/each}
			</div>
		</div>
	{/each}
</div>

<style>
	/* Ensuring the list takes full height of the viewport */
	.max-h-screen {
		max-height: 100vh;
	}
</style>
