import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import dns from "dns";
dns.setDefaultResultOrder("ipv4first");
const client = new MongoClient(process.env.MONGODB_URI);
console.log(process.env.MONGODB_URI);
await client.connect();
const db = client.db("qurbani");

export const auth = betterAuth({
    database: mongodbAdapter(db, {
        client,
    }),

    emailAndPassword: {
        enabled: true,
    },

    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRECT,
        },
    },
});
