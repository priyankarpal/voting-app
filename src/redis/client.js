import "dotenv/config";
import { Redis } from "ioredis";

const client=new Redis({
    host: REDIS_HOST,
    port: REDIS_PORT,
    password: process.env.REDIS_PASSWORD
});


export default client;