import { DataSource } from "typeorm";
import { config } from "dotenv";
config();

export const AppDataSource = 
process.env.NODE_ENV === "test"
  ? new DataSource({
    type: "sqlite",
    database: ":memory:",
    entities: ["src/entities/**/*.ts"],
    synchronize: true,
  }) :

  new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: 5432,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB,
  synchronize: false,
  // logging: true,
  entities: ["src/entities/*.ts"],
  migrations: ["src/migrations/*.ts"],
});
