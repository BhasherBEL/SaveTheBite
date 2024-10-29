<script lang="ts">
	import Batch from '$lib/types/Batch';
	import Market from '$lib/types/Market';
	import BatchPopup from './BatchPopup.svelte';

	export let show = false;
	export let data: Market;
	export let onClose = () => {
		show = false;
	};

	let batchVisible = false;
	let batchData: Batch;

	function showBatch(batch: Batch) {
		batchData = batch;
		batchVisible = true;
	}

	function hideBatch() {
		batchVisible = false;
	}
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
			class="bg-white p-6 rounded-3xl shadow-lg w-4/5 h-2/3 relative flex justify-start items-center"
			role="dialog"
			aria-label="Market details"
			on:click|stopPropagation
			on:keydown|stopPropagation={(e) => e.key === 'Enter' && onClose()}
		>
			<img
				src={data.picture}
				alt={data.name}
				class="inset-y-0 left-0 w-1/2 h-full rounded-3xl object-cover aspect-square mx-auto"
			/>
			<div class="w-3/5 h-full pl-8 flex flex-col justify-start items-start">
				<h2 class="text-3xl font-semibold text-primary">{data.name}</h2>

				<div class="inline-flex items-center space-x-2">
					<i class="fas fa-map-marker-alt text-gray-400"></i>
					<span class="text-gray-400 text-sm font-bold">{data.address}</span>
				</div>
				<div class="overflow-y-auto h-[calc(100%-4rem)]">
					{#each data.batches as batch}
						<div
							role="button"
							aria-label="Show batch details"
							on:keydown={(e) => e.key === 'Enter' && showBatch(batch)}
							tabindex="0"
							class="rounded-2xl mt-4 w-full p-2 border border-secondary flex flex-start"
							on:click={() => showBatch(batch)}
						>
							<img
								src={batch.picture}
								alt={batch.name}
								class="inset-y-0 left-0 w-1/3 h-full object-cover aspect-square mx-auto rounded-xl"
							/>

							<div class="relative w-2/3 h-40 pl-4 ml-2 flex flex-col justify-between">
								<div class="flex justify-between w-full mb-2">
									<h2 class="text-lg font-semibold text-black">{batch.name}</h2>
									<h2 class="text-primary text-xl">{batch.price}€</h2>
								</div>
								<p class="text-sm flex-grow">{batch.description}</p>
								<button
									class="w-full py-1 bg-primary text-white font-semibold rounded-xl hover:bg-green-600"
								>
									Add to cart
								</button>
							</div>
						</div>
					{/each}
				</div>
			</div>
		</div>
	</div>
{/if}

<!-- Display the batch popup -->
<BatchPopup show={batchVisible} data={batchData} onClose={hideBatch} />
