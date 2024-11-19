import { relations, type InferSelectModel } from 'drizzle-orm';
import { blob, integer, primaryKey, sqliteTable, text } from 'drizzle-orm/sqlite-core';

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
	email: text('email', { length: 255 }).notNull().unique(),
	password: text('password', { length: 255 }).notNull(),
	type: text('type', { length: 255 }).notNull(),
	language: text('language', { length: 255 }),
	theme: text('theme', { length: 255 }),
	defaultLocation: text('default_location', { length: 255 }),
	...timestamp
});

export const userSessions = sqliteTable('userSessions', {
	id: text('id').primaryKey(),
	userId: integer('user_id')
		.notNull()
		.references(() => users.id),
	expiresAt: integer('expires_at', {
		mode: 'timestamp'
	}).notNull()
});

export type UserSession = InferSelectModel<typeof userSessions>;

export const usersRelations = relations(users, ({ many }) => ({
	managers: many(managers),
	orders: many(orders),
	favorites: many(favorites),
	reviews: many(reviews)
}));

export const vendors = sqliteTable('vendors', {
	id: integer('id').primaryKey({ autoIncrement: true }).notNull(),
	name: text('name', { length: 255 }).notNull(),
	description: text('description').notNull(),
	location: text('location', { length: 255 }).notNull(),
	longitude: integer('longitude').notNull(),
	latitude: integer('latitude').notNull(),
	picture: text('picture'),
	...timestamp
});

export const vendorsRelations = relations(vendors, ({ many }) => ({
	baskets: many(baskets),
	managers: many(managers)
}));

export const baskets = sqliteTable('baskets', {
	id: integer('id').primaryKey({ autoIncrement: true }).notNull(),
	vendorId: integer('vendor_id')
		.notNull()
		.references(() => vendors.id, { onDelete: 'cascade' }),
	name: text('name', { length: 255 }).notNull(),
	description: text('description').notNull(),
	initialPrice: integer('initial_price').notNull(),
	price: integer('price').notNull(),
	picture: text('picture'),
	...timestamp
});

export const basketsRelations = relations(baskets, ({ one, many }) => ({
	vendor: one(vendors, {
		fields: [baskets.vendorId],
		references: [vendors.id]
	}),
	tags: many(basketTags),
	sales: many(sales)
}));

export const managers = sqliteTable(
	'managers',
	{
		vendorId: integer('vendor_id')
			.notNull()
			.references(() => vendors.id, { onDelete: 'cascade' }),
		userId: integer('user_id')
			.notNull()
			.references(() => users.id, { onDelete: 'cascade' }),
		...timestamp
	},
	(t) => ({ pk: primaryKey({ columns: [t.vendorId, t.userId] }) })
);

export const managersRelations = relations(managers, ({ one }) => ({
	vendor: one(vendors, {
		fields: [managers.vendorId],
		references: [vendors.id]
	}),
	user: one(users, {
		fields: [managers.userId],
		references: [users.id]
	})
}));

export const tags = sqliteTable('tags', {
	id: integer('id').primaryKey({ autoIncrement: true }).notNull(),
	name: text('name', { length: 255 }).notNull(),
	...timestamp
});

export const tagsRelations = relations(tags, ({ many }) => ({
	baskets: many(basketTags)
}));

export const basketTags = sqliteTable(
	'basket_tags',
	{
		basketId: integer('basket_id')
			.notNull()
			.references(() => baskets.id, { onDelete: 'cascade' }),
		tagId: integer('tag_id')
			.notNull()
			.references(() => tags.id, { onDelete: 'cascade' })
	},
	(t) => ({
		pk: primaryKey({ columns: [t.basketId, t.tagId] })
	})
);

export const basketTagsRelations = relations(basketTags, ({ one, many }) => ({
	basket: one(baskets, {
		fields: [basketTags.basketId],
		references: [baskets.id]
	}),
	tag: one(tags, {
		fields: [basketTags.tagId],
		references: [tags.id]
	}),
	reviews: many(reviews)
}));

export const sales = sqliteTable('sales', {
	id: integer('id').primaryKey({ autoIncrement: true }).notNull(),
	basketId: integer('basket_id')
		.notNull()
		.references(() => baskets.id, { onDelete: 'cascade' }),
	quantity: integer('quantity').notNull(),
	remain: integer('remain').notNull(),
	timeout: integer('timeout').notNull(),
	...timestamp
});

export const salesRelations = relations(sales, ({ one, many }) => ({
	basket: one(baskets, {
		fields: [sales.basketId],
		references: [baskets.id]
	}),
	orders: many(orders)
}));

export const orders = sqliteTable('orders', {
	id: integer('id').primaryKey({ autoIncrement: true }).notNull(),
	saleId: integer('sale_id')
		.notNull()
		.references(() => sales.id, { onDelete: 'cascade' }),
	userId: integer('user_id')
		.notNull()
		.references(() => users.id, { onDelete: 'cascade' }),
	quantity: integer('quantity').notNull(),
	claimed: integer('claimed').notNull(),
	...timestamp
});

export const ordersRelations = relations(orders, ({ one }) => ({
	sale: one(sales, {
		fields: [orders.saleId],
		references: [sales.id]
	}),
	user: one(users, {
		fields: [orders.userId],
		references: [users.id]
	})
}));

export const favorites = sqliteTable(
	'favorites',
	{
		basketId: integer('basket_id').notNull(),
		userId: integer('user_id').notNull(),
		...timestamp
	},
	(t) => ({ pk: primaryKey({ columns: [t.basketId, t.userId] }) })
);

export const favoritesRelations = relations(favorites, ({ one }) => ({
	basket: one(baskets, {
		fields: [favorites.basketId],
		references: [baskets.id]
	}),
	user: one(users, {
		fields: [favorites.userId],
		references: [users.id]
	})
}));

export const reviews = sqliteTable('reviews', {
	id: integer('id').primaryKey({ autoIncrement: true }).notNull(),
	basketId: integer('basket_id').notNull(),
	userId: integer('user_id').notNull(),
	rating: integer('rating').notNull(),
	comment: text('comment'),
	...timestamp
});

export const reviewsRelations = relations(reviews, ({ one }) => ({
	basket: one(baskets, {
		fields: [reviews.basketId],
		references: [baskets.id]
	}),
	user: one(users, {
		fields: [reviews.userId],
		references: [users.id]
	})
}));

export const carts = sqliteTable('carts', {
	id: integer('id').primaryKey({ autoIncrement: true }).notNull(),
	userId: integer('user_id')
		.notNull()
		.references(() => users.id, { onDelete: 'cascade' }),
	saleId: integer('sale_id')
		.notNull()
		.references(() => sales.id, { onDelete: 'cascade' }),
	quantity: integer('quantity').notNull(),
	...timestamp
});

export const cartsRelations = relations(carts, ({ one }) => ({
	user: one(users, {
		fields: [carts.userId],
		references: [users.id]
	}),
	sale: one(sales, {
		fields: [carts.saleId],
		references: [sales.id]
	})
}));

export type Basket = typeof baskets.$inferSelect;
export type Cart = typeof carts.$inferSelect;
export type Favorite = typeof favorites.$inferSelect;
export type Manager = typeof managers.$inferSelect;
export type Order = typeof orders.$inferSelect;
export type Review = typeof reviews.$inferSelect;
export type Sale = typeof sales.$inferSelect;
export type Tag = typeof tags.$inferSelect;
export type Vendor = typeof vendors.$inferSelect;
export type User = typeof users.$inferSelect;

