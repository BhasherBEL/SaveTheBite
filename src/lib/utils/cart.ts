// Adding an sale in the cart
export async function addSale(saleId: number, quantity: number) {
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
}
// Delete sale form cart
export async function deleteSale(saleId: number) {
    const response = await fetch(`/api/carts/`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ saleId })
    });

    if (!response.ok) {
        const errorData = await response.json();
        console.error('Failed to delete sale from cart:', errorData);
        throw new Error(errorData.message || 'Failed to delete sale from cart');
    }

    const data = await response.json();
    return data; // Return the response data if needed
}

// Delete all sales from cart
export async function deleteAllSales() {
    const response = await fetch(`/api/carts/`, {
        method: 'DELETE'
    });

    if (!response.ok) {
        const errorData = await response.json();
        console.error('Failed to delete all sales from cart:', errorData);
        throw new Error(errorData.message || 'Failed to delete all sales from cart');
    }

    const data = await response.json();
    return data; // Return the response data if needed
}

// Pay for the cart
export async function payCart() {
    const response = await fetch(`/api/carts/pay`, {
        method: 'POST'
    });

    if (!response.ok) {
        const errorData = await response.json();
        console.error('Failed to pay for cart:', errorData);
        throw new Error(errorData.message || 'Failed to pay for cart');
    }

    const data = await response.json();
    return data; // Return the response data if needed
}
