
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
