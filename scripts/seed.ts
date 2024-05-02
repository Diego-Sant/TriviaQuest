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
        //         id: 3,
        //         unitId: 1,
        //         order: 3,
        //         title: "Nível 3(Iniciante)"
        //     },
        //     {
        //         id: 4,
        //         unitId: 1,
        //         order: 4,
        //         title: "Nível 4(Iniciante)"
        //     },
        //     {
        //         id: 5,
        //         unitId: 1,
        //         order: 5,
        //         title: "Nível 5(Básico)"
        //     },
        // ])

        // await db.insert(schema.challenges).values([
        //     {
        //         id: 2,
        //         quizId: 1,
        //         type: "SELECT",
        //         order: 2,
        //         question: 'Quais foram os integrantes iniciais do time 7?'
        //     },
        //     {
        //         id: 3,
        //         quizId: 1,
        //         type: "ASSIST",
        //         order: 3,
        //         question: 'Qual é a vila que o Naruto vive?'
        //     }
        // ]);

        // await db.insert(schema.challengeOptions).values([
        //     {
        //         id: 5,
        //         challengeId: 2,
        //         imageSrc: "/quizzes/team9.svg",
        //         correct: false,
        //         text: "Maito Gai, Rock Lee, Neji e Tenten"
        //     },
        //     {
        //         id: 6,
        //         challengeId: 2,
        //         imageSrc: "/quizzes/team10.svg",
        //         correct: false,
        //         text: "Asuma, Shikamaru, Choji e Ino"
        //     },
        //     {
        //         id: 7,
        //         challengeId: 2,
        //         imageSrc: "/quizzes/team7.svg",
        //         correct: true,
        //         text: "Kakashi, Naruto, Sasuke e Sakura"
        //     },
        //     {
        //         id: 8,
        //         challengeId: 2,
        //         imageSrc: "/quizzes/team8.svg",
        //         correct: false,
        //         text: "Kurenai, Kiba, Shino e Hinata"
        //     },
        // ]);

        // await db.insert(schema.challengeOptions).values([
        //     {
        //         id: 9,
        //         challengeId: 3,
        //         correct: false,
        //         text: "Vila Oculta da Pedra"
        //     },
        //     {
        //         id: 10,
        //         challengeId: 3,
        //         correct: false,
        //         text: "Vila Oculta da Areia"
        //     },
        //     {
        //         id: 11,
        //         challengeId: 3,
        //         correct: true,
        //         text: "Vila Oculta da Folha"
        //     },
        //     {
        //         id: 12,
        //         challengeId: 3,
        //         correct: false,
        //         text: "Vila Oculta da Nuvem"
        //     },
        // ]);

        console.log("Acesso finalizado!");
    } catch (error) {
        console.error(error)
        throw new Error("Falha ao acessar o database!")
    }
};

main();