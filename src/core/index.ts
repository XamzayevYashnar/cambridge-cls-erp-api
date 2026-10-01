import { config } from "dotenv";

config();

export const conf = {
    port: process.env.PORT,
}