import type { Sale } from "$lib/server/db/schema";

export async function addSale(sale: Sale): Promise<void> {
    try {
        const { basketId, quantity, remain, expiresAt } = sale;
        await fetch('/api/sales', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ basketId, quantity, remain, timeout: expiresAt})
        });
    } catch (error) {
        console.log('Error adding sale:', error);
    }
}

