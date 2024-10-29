import type Market from './types/Market';

export const markets: Market[] = [
    {
        id: 0,
        name: 'K-Market Otaniemi',
        address: 'Otaniementie 12, 02150 Espoo',
        picture: '/images/markets/KMarket.jpg',
        batches: [
            {
                id: 0,
                name: 'Veggie batch',
                price: 5,
                picture: '/images/batches/vegetables.jpg',
                quantity: 5,
                description: 'A basket of fresh vegetables'
            },
            { 
                id: 1, 
                name: 'Bread', 
                price: 5, 
                picture: '/images/batches/bakery.jpg', 
                quantity: 50, 
                description: 'A loaf of bread'
            }
        ]
    },
    {
        id: 1,
        name: 'K-Market Tapiola',
        address: 'Tapiolantie 1, 02100 Espoo',
        picture: '/images/markets/KMarket.jpg',
        batches: [
            {
                id: 2,
                name: 'Fruit basket',
                price: 6,
                picture: '/images/batches/fruit.jpeg',
                quantity: 10,
                description: 'A basket of fresh fruits'
            },
            { 
                id: 3, 
                name: 'Bakery items', 
                price: 4, 
                picture: '/images/batches/bakery.jpg', 
                quantity: 4,
                description: 'A basket of bakery items'
            }
        ]
    },
    {
        id: 3,
        name: 'K-Market Leppävaara',
        address: 'Leppävaaranaukio 4, 02600 Espoo',
        picture: '/images/markets/KMarket.jpg',
        batches: [
            { 
                id: 4, 
                name: 'Meat basket', 
                price: 10, 
                picture: '/images/batches/meat.jpg', 
                quantity: 8,
                description: 'A basket of fresh meat'
            }
        ]
    },
    {
        id: 4,
        name: 'K-Market Espoonlahti',
        address: 'Espoonlahdentie 3, 02320 Espoo',
        picture: '/images/markets/KMarket.jpg',
        batches: [
            {
                id: 6,
                name: 'Vegetable basket',
                price: 8,
                picture: '/images/batches/vegetables.jpg',
                quantity: 5,
                description: 'A basket of fresh vegetables'
            },
            { 
                id: 7, 
                name: 'Pastries', 
                price: 4, 
                picture: '/images/batches/pastry.jpg', 
                quantity: 5,
                description: 'A basket of pastries'
            }
        ]
    }
];
