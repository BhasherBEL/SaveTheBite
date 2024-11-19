
export async function addCompany({
	companyName,
	companyDescription,
	companyLocation,
	companyPhoto
}: {
	companyName: string;
	companyDescription: string;
	companyLocation: string;
	companyPhoto?: string | null;
}) {
    console.log(companyName, companyDescription, companyLocation, companyPhoto);

	// Validate required fields
	if (!companyName || !companyDescription || !companyLocation) {
		throw new Error('Name, Description, and Location are required');
	}

	// Prepare data payload
	const payload = {
		name: companyName,
		description: companyDescription,
		location: companyLocation,
		longitude: "0", // Default longitude
		latitude: "0",  // Default latitude
		picture: companyPhoto || 'picture' // Default to an empty string if no photo
	};

	try {
		const response = await fetch('/api/vendors', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(payload),
		});

		if (!response.ok) {
			const error = await response.json();
			throw new Error(error.message || 'Failed to add the company');
		}
	} catch (err) {
		console.error('Error adding company:', err);
		throw err;
	}
}
