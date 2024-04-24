import "dotenv/config";
import { Redis } from "ioredis";

const client=new Redis({
    host: 'redis-18304.c305.ap-south-1-1.ec2.redns.redis-cloud.com',
    port: 18304,
    password: process.env.REDIS_PASSWORD
});


export default client;