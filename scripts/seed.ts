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
        //await db.delete(schema.userProgress);
        //await db.delete(schema.units);
        //await db.delete(schema.quizzes);
        //await db.delete(schema.challenges);
        //await db.delete(schema.challengeOptions);
        //await db.delete(schema.challengeProgress);

        //await db.insert(schema.categories).values([
            //{
                //id: 1,
                //title: "Naruto",
                //imageSrc: "/naruto.svg"
            //}
        //]);

        // await db.insert(schema.units).values([
        //     {
        //         id: 1,
        //         categoryId: 1,
        //         title: "Naruto",
        //         description: "Você realmente conhece Naruto?",
        //         order: 1,
        //     }
        // ]);

        // await db.insert(schema.quizzes).values([
        //     {
        //         id: 1,
        //         unitId: 1,
        //         order: 1,
        //         title: "Nível 1(Iniciante)"
        //     },
        //     {
        //         id: 2,
        //         unitId: 1,
        //         order: 2,
        //         title: "Nível 2(Básico)"
        //     }
        // ])

        // await db.insert(schema.challenges).values([
        //     {
        //         id: 1,
        //         quizId: 1,
        //         type: "SELECT",
        //         order: 1,
        //         question: 'Qual desses personagens é o Shino Aburame?'
        //     }
        // ]);

        // await db.insert(schema.challengeOptions).values([
        //     {
        //         id: 1,
        //         challengeId: 1,
        //         imageSrc: "/shino.svg",
        //         correct: true,
        //         text: "Opção 1"
        //     },
        //     {
        //         id: 2,
        //         challengeId: 1,
        //         imageSrc: "/neji.svg",
        //         correct: false,
        //         text: "Opção 2"
        //     },
        //     {
        //         id: 3,
        //         challengeId: 1,
        //         imageSrc: "/kiba.svg",
        //         correct: false,
        //         text: "Opção 3"
        //     },
        //     {
        //         id: 4,
        //         challengeId: 1,
        //         imageSrc: "/choji.svg",
        //         correct: false,
        //         text: "Opção 4"
        //     },
        // ])

        console.log("Acesso finalizado!");
    } catch (error) {
        console.error(error)
        throw new Error("Falha ao acessar o database!")
    }
};

main();