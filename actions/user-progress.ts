"use server";

import db from "@/db/drizzle";
import { getCategoryById, getUserProgress } from "@/db/queries";
import { challengeProgress, challenges, userProgress } from "@/db/schema";

import { auth, currentUser } from "@clerk/nextjs";
import { and, eq } from "drizzle-orm";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

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

    //if (!category.units.length || !category.units[0].themes.length) {
        //throw new Error("O tema não tem perguntas!")
    //}

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

