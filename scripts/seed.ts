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
        //         id: 3,
        //         categoryId: 1,
        //         title: "Naruto (Médio)",
        //         description: "Continue! Está indo pelo caminho certo!",
        //         order: 3,
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
        //         id: 6,
        //         unitId: 2,
        //         order: 1,
        //         title: "Nível 1(Iniciante)"
        //     },
        //     {
        //         id: 7,
        //         unitId: 2,
        //         order: 2,
        //         title: "Nível 2(Iniciante)"
        //     },
        //     {
        //         id: 8,
        //         unitId: 2,
        //         order: 3,
        //         title: "Nível 3(Iniciante)"
        //     },
        //     {
        //         id: 9,
        //         unitId: 2,
        //         order: 4,
        //         title: "Nível 4(Básico)"
        //     },
        //     {
        //         id: 10,
        //         unitId: 2,
        //         order: 5,
        //         title: "Nível 5(Básico)"
        //     },
        // ])

        await db.insert(schema.challenges).values([
            {
                id: 21,
                quizId: 10,
                type: "ASSIST",
                order: 1,
                question: 'Quem é o Deus da Destruição do universo 6?'
            },
            {
                id: 22,
                quizId: 10,
                type: "ASSIST",
                order: 2,
                question: 'Qual personagem ganhou o Torneio do Poder?'
            },
        ]);

        // await db.insert(schema.challengeOptions).values([
        //     {
        //         id: 73,
        //         challengeId: 19,
        //         imageSrc: "/quizzes/goku.svg",
        //         correct: false,
        //         text: "Goku"
        //     },
        //     {
        //         id: 74,
        //         challengeId: 19,
        //         imageSrc: "/quizzes/broly.svg",
        //         correct: false,
        //         text: "Broly"
        //     },
        //     {
        //         id: 75,
        //         challengeId: 19,
        //         imageSrc: "/quizzes/bardock.svg",
        //         correct: false,
        //         text: "Bardock"
        //     },
        //     {
        //         id: 76,
        //         challengeId: 19,
        //         imageSrc: "/quizzes/vegeta.svg",
        //         correct: true,
        //         text: "Vegeta"
        //     },
        //     {
        //         id: 69,
        //         challengeId: 18,
        //         imageSrc: "/quizzes/satan.svg",
        //         correct: true,
        //         text: "Mr. Satan"
        //     },
        //     {
        //         id: 70,
        //         challengeId: 18,
        //         imageSrc: "/quizzes/kaio.svg",
        //         correct: false,
        //         text: "Senhor Kaio"
        //     },
        //     {
        //         id: 71,
        //         challengeId: 18,
        //         imageSrc: "/quizzes/whis.svg",
        //         correct: false,
        //         text: "Whis"
        //     },
        //     {
        //         id: 72,
        //         challengeId: 18,
        //         imageSrc: "/quizzes/kame.svg",
        //         correct: false,
        //         text: "Mestre Kame"
        //     },
        // ]);

        await db.insert(schema.challengeOptions).values([
            {
                id: 81,
                challengeId: 21,
                correct: true,
                text: "Champa"
            },
            {
                id: 82,
                challengeId: 21,
                correct: false,
                text: "Bills"
            },
            {
                id: 83,
                challengeId: 21,
                correct: false,
                text: "Sidra"
            },
            {
                id: 84,
                challengeId: 21,
                correct: false,
                text: "Liquiir"
            },
            {
                id: 85,
                challengeId: 22,
                correct: false,
                text: "Goku"
            },
            {
                id: 86,
                challengeId: 22,
                correct: true,
                text: "Android 17"
            },
            {
                id: 87,
                challengeId: 22,
                correct: false,
                text: "Freeza"
            },
            {
                id: 88,
                challengeId: 22,
                correct: false,
                text: "Jiren"
            },
        ]);

        console.log("Acesso finalizado!");
    } catch (error) {
        console.error(error)
        throw new Error("Falha ao acessar o database!")
    }
};

main();