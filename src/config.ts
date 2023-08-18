import * as dotenv from "dotenv";

// noinspection JSUnusedLocalSymbols - it's used - without that line variables are not loading
const envFound = dotenv.config();

const dbHost = process.env.DB_HOST;
const dbPort = Number(process.env.DB_PORT);
const dbDatabase = process.env.DB_DATABASE;
const dbUsername = process.env.DB_USERNAME;
const dbPassword = process.env.DB_PASSWORD;

if (!dbHost) {
    throw new Error("You should specify DB_HOST environment variable");
}
if (!dbPort) {
    throw new Error("You should specify DB_PORT environment variable");
}
if (!dbDatabase) {
    throw new Error("You should specify DB_DATABASE environment variable");
}
if (!dbUsername) {
    throw new Error("You should specify DB_USERNAME environment variable");
}
if (!dbPassword) {
    throw new Error("You should specify DB_PASSWORD environment variable");
}

export default {
    dbHost,
    dbPort,
    dbDatabase,
    dbUsername,
    dbPassword,
}
