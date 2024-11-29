ALTER TABLE `baskets` ADD `description` text NOT NULL;--> statement-breakpoint
ALTER TABLE `orders` ADD `quantity` integer NOT NULL;--> statement-breakpoint
ALTER TABLE `sales` ADD `expires_at` integer NOT NULL;--> statement-breakpoint
ALTER TABLE `sales` DROP COLUMN `timeout`;--> statement-breakpoint
ALTER TABLE `sales` DROP COLUMN `withdrawn`;--> statement-breakpoint
ALTER TABLE `vendors` ADD `description` text NOT NULL;