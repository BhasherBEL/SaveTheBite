"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv = require("dotenv");
var migrator_1 = require("drizzle-orm/better-sqlite3/migrator");
var client_1 = require("./client");
var drizzle_config_1 = require("./drizzle.config");
dotenv.config();
(0, migrator_1.migrate)(client_1.db, {
    migrationsFolder: drizzle_config_1.default.out
});
