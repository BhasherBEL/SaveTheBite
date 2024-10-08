<script>
    export let markets = []; // Receive markets as a prop
</script>

<div class="overflow-y-scroll max-h-screen p-4">
    {#each markets as market}
        <div class="bg-white p-4 rounded-lg shadow-md mb-4">
            <h2 class="font-bold text-lg">{market.name}</h2>
            <p class="text-gray-600">{market.address}</p>
            <div class="grid grid-cols-2 gap-4 mt-4">
                {#each market.batches as batch}
                    <div class="border rounded-lg p-2">
                        <img src={batch.image} alt={batch.name} class="w-full rounded-lg" />
                        <p class="font-semibold mt-2">{batch.name}</p>
                        <p>{batch.price}</p>
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
