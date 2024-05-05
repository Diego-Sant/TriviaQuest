"use server";

import db from "@/db/drizzle";
import { getCategoryById, getUserProgress, getUserSubscription } from "@/db/queries";
import { challengeProgress, challenges, userProgress } from "@/db/schema";

import { auth, currentUser } from "@clerk/nextjs";
import { and, eq } from "drizzle-orm";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const POINTS_TO_REFILL = 80;

export const upsertUserProgress = async (categoryId: number) => {
    const { userId } = await auth();
    const user = await currentUser();

    if (!userId || !user) {
        throw new Error("Usuário não autorizado!")
    }

    const category = await getCategoryById(categoryId);

    if (!category) {
        throw new Error("Tema não encontrado!");
    }

    if (!category.units.length || !category.units[0].quizzes.length) {
        throw new Error("O tema não tem perguntas!")
    }

    const existingUserProgress = await getUserProgress();

    if (existingUserProgress) {
        await db.update(userProgress).set({
            activeCategoryId: categoryId,
            userName: user.firstName || "Usuário",
            userImageSrc: user.imageUrl || "/TriviaQuestLogo.svg"
        });

        revalidatePath("/categorias");
        revalidatePath("/quizzes");
        redirect("/quizzes");
    }

    await db.insert(userProgress).values({
        userId,
        activeCategoryId: categoryId,
        userName: user.firstName || "Usuário",
        userImageSrc: user.imageUrl || "/TriviaQuestLogo.svg"
    });

    revalidatePath("/categorias");
    revalidatePath("/quizzes");
    redirect("/quizzes");
};

export const reduceHearts = async (challengeId: number) => {
    const {userId} = await auth();

    if (!userId) {
        throw new Error("Não autorizado!");
    }

    const currentUserProgress = await getUserProgress();
    const userSubscription = await getUserSubscription();

    const challenge = await db.query.challenges.findFirst({
        where: eq(challenges.id, challengeId)
    });

    if (!challenge) {
        throw new Error("Quiz não encontrado!");
    }

    const quizId = challenge.quizId;

    const existingChallengeProgress = await db.query.challengeProgress.findFirst({
        where: and(
            eq(challengeProgress.userId, userId),
            eq(challengeProgress.challengeId, challengeId)
        )
    });

    const isPractice = !!existingChallengeProgress;

    if(isPractice) {
        return { error: "practice" };
    }

    if (!currentUserProgress) {
        throw new Error("Progresso de usuário não encontrado!");
    }

    if (userSubscription?.isActive) {
        return { error: "subscription"};
    }

    if (currentUserProgress.hearts === 0) {
        return { error: "hearts" };
    }

    await db.update(userProgress).set({
        hearts: Math.max(currentUserProgress.hearts - 1, 0),
    }).where(eq(userProgress.userId, userId));

    revalidatePath("/loja");
    revalidatePath("/quiz");
    revalidatePath("/quizzes");
    revalidatePath("/lideres");
    revalidatePath("/missoes");
    revalidatePath(`/quiz/${quizId}`);
}

export const refillHearts = async () => {
    const currentUserProgress = await getUserProgress();

    if (!currentUserProgress) {
        throw new Error("Usuário não encontrado!");
    }

    if (currentUserProgress.hearts === 10) {
        throw new Error("A vida está cheia!");
    }

    if (currentUserProgress.points < POINTS_TO_REFILL) {
        throw new Error("Não tem pontos suficientes!");
    }

    await db.update(userProgress).set({
        hearts: 10,
        points: currentUserProgress.points - POINTS_TO_REFILL,
    }).where(eq(userProgress.userId, currentUserProgress.userId));

    revalidatePath("/loja");
    revalidatePath("/quiz");
    revalidatePath("/missoes");
    revalidatePath("/lideres");
}
