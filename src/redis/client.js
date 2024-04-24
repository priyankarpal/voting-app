import "dotenv/config";
import { Redis } from "ioredis";

const client=new Redis({
    host: "localhost",
    port: 6379,
    password: process.env.REDIS_PASSWORD
});


export default client;