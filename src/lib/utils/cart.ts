

// Adding an sale in the cart
export async function addSale(saleId: number, quantity: number) {
    try {
        const response = await fetch('/api/carts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ saleId, quantity }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Failed to add to cart:', errorData);
            throw new Error(errorData.message || 'Failed to add to cart');
        }

        const data = await response.json();
        console.log('Cart updated successfully:', data);
        return data; // Return the response data if needed
    } catch (error) {
        console.error('An error occurred:', error.message);
        throw error;
    }
}
