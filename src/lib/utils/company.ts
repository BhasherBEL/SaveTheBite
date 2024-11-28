import type { Vendor } from '$lib/server/db/schema';

export async function addBasket(vendorId: number, basket: Basket): Promise<void> {
	const { name, description, initialPrice, price, picture } = basket;
	const res = await fetch('/api/baskets', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ name, description, vendorId, initialPrice, price, picture })
	});

	if (!res.ok) {
		const message = 'Error adding basket: ' + res.status;
		throw new Error(message);
	}

	return;
}

export async function updateBasket(basket: Basket): Promise<void> {
	const { id, name, description, initialPrice, price, picture } = basket;
	const res = await fetch(`/api/baskets/${id}`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ name, description, initialPrice, price, picture })
	});

	if (!res.ok) {
		const message = 'Error updating basket: ' + res.status;
		throw new Error(message);
	}

	return;
}

export async function deleteBasket(id: number): Promise<void> {
	const res = await fetch(`/api/baskets/${id}`, {
		method: 'DELETE'
	});

	if (!res.ok) {
		const message = 'Error deleting basket: ' + res.status;
		throw new Error(message);
	}

	return;
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
	// Validate required fields
	if (!companyName || !companyDescription || !companyLocation) {
		throw new Error('Name, Description, and Location are required');
	}

	// Prepare data payload
	const payload = {
		name: companyName,
		description: companyDescription,
		location: companyLocation,
		picture: companyPhoto || null
	};

	const response = await fetch('/api/vendors', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(payload)
	});

	if (!response.ok) {
		const error = await response.json();
		throw new Error(error.message || 'Failed to add the company');
	}

	return await response.json();
}

export async function updateCompany(company: Vendor) {
	// Validate required fields
	if (!company.name || !company.description || !company.location) {
		throw new Error('Name, Description, and Location are required');
	}

	// Prepare data payload
	const payload = {
		name: company.name,
		description: company.description,
		location: company.location,
		picture: company.picture || null
	};

	const response = await fetch(`/api/vendors/${company.id}`, {
		method: 'PUT',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(payload)
	});

	if (!response.ok) {
		const error = await response.json();
		throw new Error(error.message || 'Failed to update the company');
	}
}
