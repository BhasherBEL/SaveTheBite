PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_basket_tags` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`basket_id` integer NOT NULL,
	`tag_id` integer NOT NULL,
	PRIMARY KEY(`basket_id`, `tag_id`),
	FOREIGN KEY (`basket_id`) REFERENCES `baskets`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`tag_id`) REFERENCES `tags`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_basket_tags`("id", "basket_id", "tag_id") SELECT "id", "basket_id", "tag_id" FROM `basket_tags`;--> statement-breakpoint
DROP TABLE `basket_tags`;--> statement-breakpoint
ALTER TABLE `__new_basket_tags` RENAME TO `basket_tags`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE TABLE `__new_favorites` (
	`basket_id` integer NOT NULL,
	`user_id` integer NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	PRIMARY KEY(`basket_id`, `user_id`)
);
--> statement-breakpoint
INSERT INTO `__new_favorites`("basket_id", "user_id", "created_at", "updated_at") SELECT "basket_id", "user_id", "created_at", "updated_at" FROM `favorites`;--> statement-breakpoint
DROP TABLE `favorites`;--> statement-breakpoint
ALTER TABLE `__new_favorites` RENAME TO `favorites`;--> statement-breakpoint
CREATE TABLE `__new_managers` (
	`vendor_id` integer NOT NULL,
	`user_id` integer NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	PRIMARY KEY(`vendor_id`, `user_id`),
	FOREIGN KEY (`vendor_id`) REFERENCES `vendors`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_managers`("vendor_id", "user_id", "created_at", "updated_at") SELECT "vendor_id", "user_id", "created_at", "updated_at" FROM `managers`;--> statement-breakpoint
DROP TABLE `managers`;--> statement-breakpoint
ALTER TABLE `__new_managers` RENAME TO `managers`;--> statement-breakpoint
CREATE TABLE `__new_orders` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`sale_id` integer NOT NULL,
	`user_id` integer NOT NULL,
	`claimed` integer NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	FOREIGN KEY (`sale_id`) REFERENCES `sales`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_orders`("id", "sale_id", "user_id", "claimed", "created_at", "updated_at") SELECT "id", "sale_id", "user_id", "claimed", "created_at", "updated_at" FROM `orders`;--> statement-breakpoint
DROP TABLE `orders`;--> statement-breakpoint
ALTER TABLE `__new_orders` RENAME TO `orders`;--> statement-breakpoint
CREATE TABLE `__new_sales` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`basket_id` integer NOT NULL,
	`quantity` integer NOT NULL,
	`remain` integer NOT NULL,
	`timeout` integer NOT NULL,
	`withdrawn` integer NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	FOREIGN KEY (`basket_id`) REFERENCES `baskets`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_sales`("id", "basket_id", "quantity", "remain", "timeout", "withdrawn", "created_at", "updated_at") SELECT "id", "basket_id", "quantity", "remain", "timeout", "withdrawn", "created_at", "updated_at" FROM `sales`;--> statement-breakpoint
DROP TABLE `sales`;--> statement-breakpoint
ALTER TABLE `__new_sales` RENAME TO `sales`;