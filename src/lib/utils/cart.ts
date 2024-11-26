// Adding an sale in the cart
export async function addSale(saleId: number, quantity: number) {
	try {
		const response = await fetch('/api/carts', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ saleId, quantity })
		});

		if (!response.ok) {
			const errorData = await response.json();
			console.error('Failed to add to cart:', errorData);
			throw new Error(errorData.message || 'Failed to add to cart');
		}

		const data = await response.json();
		return data; // Return the response data if needed
	} catch (error: any) {
		console.error('An error occurred:', error.message);
		throw error;
	}
}
// Delete sale form cart
export async function deleteSale(saleId: number) {
	try {
		const response = await fetch(`/api/carts/`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ saleId })
		});
	} catch (error: any) {
		console.error('An error occurred:', error.message);
		throw error;
	}
}

// Delete all sales from cart
export async function deleteAllSales() {
	try {
		const response = await fetch(`/api/carts/`, {
			method: 'DELETE'
		});
	} catch (error: any) {
		console.error('An error occurred:', error.message);
		throw error;
	}
}

// Pay for the cart
export async function payCart() {
	try {
		const response = await fetch(`/api/carts/pay`, {
			method: 'POST'
		});
	} catch (error: any) {
		console.error('An error occurred:', error.message);
		throw error;
	}
}
