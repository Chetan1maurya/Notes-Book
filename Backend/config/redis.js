import { createClient } from 'redis';

const client = createClient({
    url: process.env.REDIS_URL,
});

await client.on("connect", () => {
    console.log("Connection Successful!!");
});

await client.on("error", (err) => {
    console.log("Redis Error:", err);
});

await client.connect();
export default client;