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
        //     },
        //     {
        //         id: 2,
        //         categoryId: 2,
        //         title: "Dragon Ball",
        //         description: "Você realmente conhece Dragon Ball?",
        //         order: 2,
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
        //         id: 4,
        //         quizId: 2,
        //         type: "ASSIST",
        //         order: 1,
        //         question: 'Qual dos personagens fazia parte da Akatsuki?'
        //     },
        //     {
        //         id: 5,
        //         quizId: 2,
        //         type: "SELECT",
        //         order: 2,
        //         question: 'Quem foi o segundo hokage?'
        //     }
        // ]);

        // await db.insert(schema.challengeOptions).values([
        //     {
        //         id: 17,
        //         challengeId: 5,
        //         imageSrc: "/quizzes/hiruzen.svg",
        //         correct: false,
        //         text: "Hiruzen Sarutobi"
        //     },
        //     {
        //         id: 18,
        //         challengeId: 5,
        //         imageSrc: "/quizzes/hashirama.svg",
        //         correct: false,
        //         text: "Hashirama Senju"
        //     },
        //     {
        //         id: 19,
        //         challengeId: 5,
        //         imageSrc: "/quizzes/minato.svg",
        //         correct: false,
        //         text: "Minato Namikaze"
        //     },
        //     {
        //         id: 20,
        //         challengeId: 5,
        //         imageSrc: "/quizzes/tobirama.svg",
        //         correct: false,
        //         text: "Tobirama Senju"
        //     },
        // ]);

        // await db.insert(schema.challengeOptions).values([
        //     {
        //         id: 13,
        //         challengeId: 4,
        //         correct: false,
        //         text: "Gaara"
        //     },
        //     {
        //         id: 14,
        //         challengeId: 4,
        //         correct: true,
        //         text: "Kimimaro Kaguya"
        //     },
        //     {
        //         id: 15,
        //         challengeId: 4,
        //         correct: true,
        //         text: "Sasori"
        //     },
        //     {
        //         id: 16,
        //         challengeId: 4,
        //         correct: false,
        //         text: "Zabuza Momochi"
        //     },
        // ]);

        console.log("Acesso finalizado!");
    } catch (error) {
        console.error(error)
        throw new Error("Falha ao acessar o database!")
    }
};

main();