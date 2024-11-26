<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';

	let LeafletContainer;

	onMount(async () => {
		if (browser) {
			LeafletContainer = (await import('$lib/components/Map.svelte')).default;
		}
	});
</script>

{#if browser}
	<svelte:component this={LeafletContainer} />
{/if}
