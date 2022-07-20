"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
exports.AppDataSource = process.env.NODE_ENV === "test"
    ? new typeorm_1.DataSource({
        type: "sqlite",
        database: ":memory:",
        entities: ["src/entities/*.ts"],
        synchronize: true,
    })
    : process.env.NODE_ENV === "production"
        ? new typeorm_1.DataSource({
            type: "postgres",
            url: process.env.DATABASE_URL,
            ssl: process.env.NODE_ENV === "production"
                ? { rejectUnauthorized: false }
                : false,
            synchronize: false,
            logging: true,
            entities: ["dist/entities/*.js"],
            migrations: ["dist/migrations/*.js"],
        })
        : new typeorm_1.DataSource({
            type: "postgres",
            host: process.env.DB_HOST,
            port: 5432,
            username: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB,
            synchronize: false,
            logging: true,
            entities: ["src/entities/*.ts"],
            migrations: ["src/migrations/*.ts"],
        });
