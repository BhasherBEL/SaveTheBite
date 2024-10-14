"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv = require("dotenv");
dotenv.config();
exports.default = {
    schema: './src/lib/server/db/schema.ts',
    dialect: 'sqlite',
    dbCredentials: {
        url: process.env.DB_URL
    },
    out: './src/lib/server/db/migrations'
};
