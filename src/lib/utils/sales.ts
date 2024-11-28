import type { Sale } from '$lib/server/db/schema';

export async function addSale(sale: Sale): Promise<void> {
	const { basketId, quantity, remain, expiresAt } = sale;
	const res = await fetch('/api/sales', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ basketId, quantity, remain, timeout: expiresAt })
	});

	if (!res.ok) {
		const message = 'Error adding sale: ' + res.status;
		throw new Error(message);
	}

	return;
}

export async function deleteSale(saleId: number): Promise<void> {
	const res = await fetch(`/api/sales/${saleId}`, {
		method: 'DELETE'
	});

	if (!res.ok) {
		const message = 'Error deleting sale: ' + res.status;
		throw new Error(message);
	}

	return;
}

export async function updateSale(sale: Sale): Promise<void> {
	const { id, quantity, remain, expiresAt } = sale;
	const res = await fetch(`/api/sales/${id}`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ quantity, remain, expiresAt })
	});

	if (!res.ok) {
		const message = 'Error updating sale: ' + res.status;
		throw new Error(message);
	}

	return;
}
