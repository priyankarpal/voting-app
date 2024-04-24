import "dotenv/config";
import { Redis } from "ioredis";

const client=new Redis({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    password: process.env.REDIS_PASSWORD
});


export default client;