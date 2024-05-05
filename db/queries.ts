import { cache } from "react";

import { auth } from "@clerk/nextjs";

import db from "./drizzle";
import { eq } from "drizzle-orm";

import { categories, challengeProgress, quizzes, units, userProgress, userSubscription } from "./schema";

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
        orderBy: (units, { asc }) => [asc(units.order)],
        where: eq(units.categoryId, userProgress.activeCategoryId),
        with: {
            quizzes: {
                orderBy: (quizzes, { asc }) => [asc(quizzes.order)],
                with: {
                    challenges: {
                        orderBy: (challenges, { asc }) => [asc(challenges.order)],
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
            if (quiz.challenges.length === 0) {
                return { ...quiz, completed: false };
            }

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
        with: {
            units: {
                orderBy: (units, {asc}) => [asc(units.order)],
                with: {
                    quizzes: {
                        orderBy: (quizzes, {asc}) => [asc(quizzes.order)]
                    }
                }
            }
        }
    });

    return data;
});

export const getCategoryProgress = cache(async () => {
    const {userId} = await auth();
    const userProgress = await getUserProgress();

    if (!userId || !userProgress?.activeCategoryId) {
        return null;
    }

    const unitsInActiveCategory = await db.query.units.findMany({
        orderBy: (units, { asc }) => [asc(units.order)],
        where: eq(units.categoryId, userProgress.activeCategoryId),
        with: {
            quizzes: {
                orderBy: (quizzes, { asc }) => [asc(quizzes.order)],
                with: {
                    unit: true,
                    challenges: {
                        with: {
                            challengeProgress: {
                                where: eq(challengeProgress.userId, userId),
                            }
                        }
                    }
                }
            }
        }
    });

    const firstUncompletedQuiz = unitsInActiveCategory
    .flatMap((unit) => unit.quizzes)
    .find((quiz) => {
        return quiz.challenges.some((challenge) => {
            return !challenge.challengeProgress 
                || challenge.challengeProgress.length === 0
                || challenge.challengeProgress.some((progress) => progress.completed === false);
        });
    });

    return {
        activeQuiz: firstUncompletedQuiz,
        activeQuizId: firstUncompletedQuiz?.id
    }
});

export const getQuiz = cache(async (id?: number) => {
    const {userId} = await auth();
    const categoryProgress = await getCategoryProgress();

    if (!userId) {
        return null;
    }

    const quizId = id || categoryProgress?.activeQuizId;

    if (!quizId) {
        return null;
    }

    const data = await db.query.quizzes.findFirst({
        where: eq(quizzes.id, quizId),
        with: {
            challenges: {
                orderBy: (challenges, {asc}) => [asc(challenges.order)],
                with: {
                    challengeOptions: true,
                    challengeProgress: {
                        where: eq(challengeProgress.userId, userId)
                    }
                }
            }
        }
    });

    if(!data || !data.challenges) {
        return null;
    }

    const normalizedChallenges = data.challenges.map((challenge) => {
        const completed = challenge.challengeProgress 
        && challenge.challengeProgress.length > 0
        && challenge.challengeProgress.every((progress) => progress.completed)

        return { ...challenge, completed };
    });

    return { ...data, challenges: normalizedChallenges }
});

export const getQuizPercentage = cache(async () => {
    const categoryProgress = await getCategoryProgress();

    if (!categoryProgress?.activeQuiz) {
        return 0;
    }

    const quiz = await getQuiz(categoryProgress.activeQuizId);

    if (!quiz) {
        return 0;
    }

    const completedChallenges = quiz.challenges
        .filter((challenge) => challenge.completed);

    const percentage = Math.round((completedChallenges.length / quiz.challenges.length) * 100);

    return percentage;
});

const DAY_IN_MS = 86_400_400;

export const getUserSubscription = cache(async () => {
    const {userId} = await auth();

    if (!userId) {
        return null
    }

    const data = await db.query.userSubscription.findFirst({
        where: eq(userSubscription.userId, userId)
    });

    if (!data) {
        return null;
    }

    const isActive = data.stripePriceId 
        && data.stripeCurrentPeriodEnd?.getTime()!
        + DAY_IN_MS > Date.now();
    
    return {
        ...data,
        isActive: !!isActive,
    }
})

export const getTopTenUsers = cache(async () => {
    const {userId} = await auth();

    if (!userId) {
        return [];
    }
    
    const data = await db.query.userProgress.findMany({
        orderBy: (userProgress, {desc}) => [desc(userProgress.points)],
        limit: 10,
        columns: {
            userId: true,
            userName: true,
            userImageSrc: true,
            points: true,
        }
    });

    return data;
})