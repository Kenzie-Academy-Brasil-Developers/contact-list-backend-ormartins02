import "reflect-metadata";
import { DataSource } from "typeorm";
import path from "path";
import "dotenv/config";

const AppDataSource = new DataSource(
  process.env.NODE_ENV === "test"
    ? {
        type: "sqlite",
        database: ":memory:",
        synchronize: true,
        entities: ["src/entities/*.ts"],
      }
    : process.env.NODE_ENV === "production"
    ? {
        type: "postgres",
        url:
          process.env.NODE_ENV === "production"
            ? process.env.DATABASE_URL
            : `postgres://${process.env.PGUSER}:${process.env.PGPASSWORD}@${process.env.PGHOST}:${process.env.PGPORT}`,
        ssl:
          process.env.NODE_ENV === "production"
            ? { rejectUnauthorized: false }
            : false,
        synchronize: process.env.NODE_ENV === "production" ? false : true,
        logging: true,
        entities:
          process.env.NODE_ENV === "production"
            ? ["dist/src/entities/*.js"]
            : [path.join(__dirname, "./entities/*.{js,ts}")],
        migrations:
          process.env.NODE_ENV === "production"
            ? ["dist/src/migrations/*.js"]
            : [path.join(__dirname, "./migrations/*.{js,ts}")],
      }
    : {
        type: "postgres",
        host: process.env.PGHOST,
        port: 5432,
        username: process.env.PGUSER,
        password: process.env.PGPASSWORD,
        database: process.env.POSTGRES_DB,
        logging: true,
        synchronize: false,
        entities: ["src/entities/*.ts"],
        migrations: ["src/migrations/*.ts"],
      }
);

export default AppDataSource;
