import "dotenv/config";

import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

import * as schema from "../db/schema";

const sql = neon(process.env.DATABASE_URL!);

const db = drizzle(sql, { schema });

const main = async () => {
    try {
        console.log("Acessando o database...");

        //await db.delete(schema.categories);
        await db.delete(schema.userProgress);

        //await db.insert(schema.categories).values([
            //{
                //id: 1,
                //title: "Naruto",
                //imageSrc: "/naruto.svg"
            //}
        //])

        console.log("Acesso finalizado!");
    } catch (error) {
        console.error(error)
        throw new Error("Falha ao acessar o database!")
    }
};

main();