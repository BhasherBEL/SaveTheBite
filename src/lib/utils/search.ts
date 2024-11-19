const API_URL = 'https://api.geoapify.com/v1/geocode/search?';

export async function search(text: string) {
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
