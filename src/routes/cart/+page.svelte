<script lang="ts">
    import { type Order } from '$lib/server/db/schema';

    let { data } = $props();
    let { cart } = data;

    let emptyCart = cart.length === 0;

    console.log('cart', cart);
</script>

<!-- Shopping cart list -->
<section class="p-1 h-full w-full flex flex-col flex-1">
    <h1 class="text-6xl text-center font-bold">Shopping Cart</h1>
    <ul class="divide-y h-full w-full divide-gray-200 flex-1 overflow-auto">
        {#if emptyCart}
            <li class="text-2xl text-green-800 h-full flex items-center justify-center text-center">Your cart is empty</li>
        {:else}
            {#each cart as item (item.id)}
                <li class="flex items-center justify-between p-4">
                    <div class="flex items center">
                        <img src={item.image} alt={item.name} class="w-16 h-16 object-cover rounded" />
                        <div class="ml-4">
                            <h3 class="text-lg font-bold">{item.name}</h3>
                            <p class="text-sm text-gray-500">{item.description}</p>
                        </div>
                    </div>
                </li>
            {/each}
        {/if}
    </ul>
</section>
    
