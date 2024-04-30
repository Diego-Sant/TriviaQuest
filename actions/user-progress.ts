"use server";

import db from "@/db/drizzle";
import { getCategoryById, getUserProgress } from "@/db/queries";
import { userProgress } from "@/db/schema";

import { auth, currentUser } from "@clerk/nextjs";

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
}

