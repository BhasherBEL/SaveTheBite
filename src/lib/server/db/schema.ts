import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

const timestamp = {
	createdAt: integer('created_at', { mode: 'timestamp' })
		.notNull()
		.$defaultFn(() => new Date()),
	updatedAt: integer('updated_at', { mode: 'timestamp' })
		.notNull()
		.$defaultFn(() => new Date())
};

export const users = sqliteTable('users', {
	id: integer('id').primaryKey({ autoIncrement: true }).notNull(),
	username: text('username', { length: 255 }).notNull(),
	email: text('email', { length: 255 }).notNull(),
	password: text('password', { length: 255 }).notNull(),
	type: text('type', { length: 255 }).notNull(),
	language: text('language', { length: 255 }),
	theme: text('theme', { length: 255 }),
	defaultLocation: text('default_location', { length: 255 }),
	...timestamp
});

export const vendors = sqliteTable('vendors', {
	id: integer('id').primaryKey({ autoIncrement: true }).notNull(),
	name: text('name', { length: 255 }).notNull(),
	location: text('location', { length: 255 }).notNull(),
	longitude: integer('longitude').notNull(),
	latitude: integer('latitude').notNull(),
	picture: text('picture'),
	...timestamp
});

export const managers = sqliteTable('managers', {
	id: integer('id').primaryKey({ autoIncrement: true }).notNull(),
	vendorId: integer('vendor_id').notNull(),
	userId: integer('user_id').notNull(),
	...timestamp
});

export const baskets = sqliteTable('baskets', {
	id: integer('id').primaryKey({ autoIncrement: true }).notNull(),
	vendorId: integer('vendor_id').notNull(),
	name: text('name', { length: 255 }).notNull(),
	initialPrice: integer('initial_price').notNull(),
	price: integer('price').notNull(),
	picture: text('picture'),
	...timestamp
});

export const tags = sqliteTable('tags', {
	id: integer('id').primaryKey({ autoIncrement: true }).notNull(),
	name: text('name', { length: 255 }).notNull(),
	...timestamp
});

export const basketTags = sqliteTable('basket_tags', {
	id: integer('id').primaryKey({ autoIncrement: true }).notNull(),
	basketId: integer('basket_id').notNull(),
	tagId: integer('tag_id').notNull(),
	...timestamp
});

export const sales = sqliteTable('sales', {
	id: integer('id').primaryKey({ autoIncrement: true }).notNull(),
	basketId: integer('basket_id').notNull(),
	quantity: integer('quantity').notNull(),
	remain: integer('remain').notNull(),
	timeout: integer('timeout').notNull(),
	withdrawn: integer('withdrawn').notNull(),
	...timestamp
});

export const orders = sqliteTable('orders', {
	id: integer('id').primaryKey({ autoIncrement: true }).notNull(),
	saleId: integer('sale_id').notNull(),
	userId: integer('user_id').notNull(),
	claimed: integer('claimed').notNull(),
	...timestamp
});

export const favorites = sqliteTable('favorites', {
	id: integer('id').primaryKey({ autoIncrement: true }).notNull(),
	basketId: integer('basket_id').notNull(),
	userId: integer('user_id').notNull(),
	...timestamp
});

export const reviews = sqliteTable('reviews', {
	id: integer('id').primaryKey({ autoIncrement: true }).notNull(),
	basketId: integer('basket_id').notNull(),
	userId: integer('user_id').notNull(),
	rating: integer('rating').notNull(),
	comment: text('comment'),
	...timestamp
});
