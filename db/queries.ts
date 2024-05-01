import { cache } from "react";

import { auth } from "@clerk/nextjs";

import db from "./drizzle";
import { eq } from "drizzle-orm";

import { categories, challengeProgress, quizzes, units, userProgress } from "./schema";

export const getUserProgress = cache(async () => {
    const { userId } = await auth();

    if (!userId) {
        return null;
    }

    const data = await db.query.userProgress.findFirst({
        where: eq(userProgress.userId, userId),
        with: {
            activeCategory: true,
        }
    });

    return data;
});

export const getUnits = cache(async () => {
    const { userId } = await auth();
    const userProgress = await getUserProgress();

    if (!userId || !userProgress?.activeCategoryId) {
        return [];
    }

    const data = await db.query.units.findMany({
        where: eq(units.categoryId, userProgress.activeCategoryId),
        with: {
            quizzes: {
                with: {
                    challenges: {
                        with: {
                            challengeProgress: {
                                where: eq(challengeProgress.userId, userId)
                            }
                        }
                    }
                }
            }
        }
    });

    const normalizedData = data.map((unit) => {
        const quizzesWithCompletedStatus = unit.quizzes.map((quiz) => {
            const allCompletedChallenges = quiz.challenges.every((challenge) => {
                return challenge.challengeProgress 
                && challenge.challengeProgress.length > 0
                && challenge.challengeProgress.every((progress) => progress.completed)
            });

            return { ...quiz, completed: allCompletedChallenges }
        });

        return { ...unit, quizzes: quizzesWithCompletedStatus}
    });

    return normalizedData;
})

export const getCategories = cache(async () => {
    const data = await db.query.categories.findMany();

    return data;
});

export const getCategoryById = cache(async (categoryId: number) => {
    const data = await db.query.categories.findFirst({
        where: eq(categories.id, categoryId),
    });

    return data;
});