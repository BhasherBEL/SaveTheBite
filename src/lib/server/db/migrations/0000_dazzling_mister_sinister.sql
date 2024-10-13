CREATE TABLE `basket_tags` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`basket_id` integer NOT NULL,
	`tag_id` integer NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `baskets` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`vendor_id` integer NOT NULL,
	`name` text(255) NOT NULL,
	`initial_price` integer NOT NULL,
	`price` integer NOT NULL,
	`picture` text,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `favorites` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`basket_id` integer NOT NULL,
	`user_id` integer NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `managers` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`vendor_id` integer NOT NULL,
	`user_id` integer NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `orders` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`sale_id` integer NOT NULL,
	`user_id` integer NOT NULL,
	`claimed` integer NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `reviews` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`basket_id` integer NOT NULL,
	`user_id` integer NOT NULL,
	`rating` integer NOT NULL,
	`comment` text,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `sales` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`basket_id` integer NOT NULL,
	`quantity` integer NOT NULL,
	`remain` integer NOT NULL,
	`timeout` integer NOT NULL,
	`withdrawn` integer NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `tags` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text(255) NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`username` text(255) NOT NULL,
	`email` text(255) NOT NULL,
	`password` text(255) NOT NULL,
	`type` text(255) NOT NULL,
	`language` text(255),
	`theme` text(255),
	`default_location` text(255),
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `vendors` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text(255) NOT NULL,
	`location` text(255) NOT NULL,
	`longitude` integer NOT NULL,
	`latitude` integer NOT NULL,
	`picture` text,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL
);
