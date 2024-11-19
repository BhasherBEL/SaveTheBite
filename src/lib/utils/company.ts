
export async function addBasket(vendorId: number, basket: Basket): Promise<void> {
    try {
        const { name, description, initialPrice, price, picture } = basket;
        await fetch('/api/baskets', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, description, vendorId, initialPrice, price, picture })
        });
    } catch (error) {
        console.log('Error adding basket:', error);
    }
}

export async function updateBasket(basket: Basket): Promise<void> {
    try {
        const { id, name, description, initialPrice, price, picture } = basket;
        await fetch(`/api/baskets/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, description, initialPrice, price, picture })
        });
    } catch (error) {
        console.log('Error updating basket:', error);
    }
}

export async function deleteBasket(id: number): Promise<void> {
    try {
        await fetch(`/api/baskets/${id}`, {
            method: 'DELETE'
        });
        console.log('Basket deleted');
    } catch (error) {
        console.log('Error deleting basket:', error);
    }
}

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
		picture: companyPhoto || 'No picture' // Default to an empty string if no photo
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
