PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_baskets` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`vendor_id` integer NOT NULL,
	`name` text(255) NOT NULL,
	`initial_price` integer NOT NULL,
	`price` integer NOT NULL,
	`picture` text,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	FOREIGN KEY (`vendor_id`) REFERENCES `vendors`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_baskets`("id", "vendor_id", "name", "initial_price", "price", "picture", "created_at", "updated_at") SELECT "id", "vendor_id", "name", "initial_price", "price", "picture", "created_at", "updated_at" FROM `baskets`;--> statement-breakpoint
DROP TABLE `baskets`;--> statement-breakpoint
ALTER TABLE `__new_baskets` RENAME TO `baskets`;--> statement-breakpoint
PRAGMA foreign_keys=ON;