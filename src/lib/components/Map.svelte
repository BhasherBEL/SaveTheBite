<script lang="ts">
	import { LeafletMap, TileLayer } from 'svelte-leafletjs';

	const mapOptions = {
		center: [1.250111, 103.830933],
		zoom: 13
	};
	const tileUrl = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png';
	const tileLayerOptions = {
		minZoom: 0,
		maxZoom: 20,
		maxNativeZoom: 19,
		attribution: '© OpenStreetMap contributors'
	};
</script>

<LeafletMap options={mapOptions}>
	<TileLayer url={tileUrl} options={tileLayerOptions} />
</LeafletMap>
