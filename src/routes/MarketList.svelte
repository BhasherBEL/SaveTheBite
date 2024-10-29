<script lang="ts">
	import Market from '$lib/types/Market';
	import Batch from '$lib/types/Batch';
	import BatchPopup from './Batch.svelte';

	let batchVisible = false;
	let batchData: Batch;

	function showBatch(batch: Batch) {
		batchData = batch;
		batchVisible = true;
	}

	function hideBatch() {
		batchVisible = false;
	}

	export let markets: Market[]; // Receive markets as a prop
	export let filters: { name: string; active: boolean | null }[];
</script>

<div class="p-4">
	{#each markets as market}
		<div class="bg-white p-4 rounded-3xl shadow-md mb-4 border border-secondary">
			<div class="flex justify-between items-center mb-4">
				<div class="flex justify-start">
					<span class="font-bold text-lg">{market.name}</span>

					<!-- Display the address of the market with a map logo before -->
					<div class="inline-flex items-center space-x-2 ml-6">
						<i class="fas fa-map-marker-alt text-gray-400"></i>
						<span class="text-gray-400 text-sm font-bold">{market.address}</span>
					</div>
				</div>
				<!-- Display the save button at the end of the flex -->
				<div class="inline-flex justify-end">
					<i class="fa-regular hover:scale-105 fa-bookmark text-gray-100 text-2xl"></i>
				</div>
			</div>

			<!-- Display the batches of the market -->
			<div class="gap-4 mt-4 flex overflow-x-auto">
				{#each market.batches as batch}
					<div
                        role="button"
                        aria-label="Show batch details"
                        on:keydown={(e) => e.key === 'Enter' && showBatch(batch)}
                        tabindex="0"
						class="rounded-2xl p-2 flex-shrink-0 border border-secondary"
						on:click={() => showBatch(batch)}
					>
						<img
							src={batch.picture}
							alt={batch.name}
							class="w-72 h-72 mx-auto rounded-xl object-cover"
						/>
						<p class="font-semibold mt-2">{batch.name}</p>
						<p>{batch.price}€</p>
					</div>
				{/each}
			</div>
		</div>
	{/each}
</div>

<!-- Display the batch popup -->
<BatchPopup show={batchVisible} data={batchData} onClose={hideBatch} />

<style>
	/* Ensuring the list takes full height of the viewport */
	.max-h-screen {
		max-height: 100vh;
	}
</style>
