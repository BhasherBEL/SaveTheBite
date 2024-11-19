const API_URL = 'https://api.geoapify.com/v1/geocode/search?';

function deg2rad(deg: number) {
	return deg * (Math.PI / 180);
}

export function getDistanceFromLatLonInKm(lat1: number, lon1: number, lat2: number, lon2: number) {
	var R = 6371; // Radius of the earth in km
	var dLat = deg2rad(lat2 - lat1);
	var dLon = deg2rad(lon2 - lon1);
	var a =
		Math.sin(dLat / 2) * Math.sin(dLat / 2) +
		Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
	var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
	var d = R * c; // Distance in km
	return d;
}

export async function addressToCoordinates(text: string) {
	const apiKey = process.env.GEOAPIFY_API_KEY;
	if (!apiKey) {
		throw new Error('Missing API key');
	}

	const url = API_URL + new URLSearchParams({ text, format: 'json', apiKey });

	const resp = await fetch(url);
	if (!resp.ok) {
		throw new Error('Failed to fetch');
	}

	const respJSON = await resp.json();

	if (!respJSON.results) {
		throw new Error('Invalid response');
	}

	if (!respJSON.results.length) {
		throw new Error('No results');
	}

	const result = respJSON.results[0];

	return {
		longitude: result.lon,
		latitude: result.lat
	};
}
