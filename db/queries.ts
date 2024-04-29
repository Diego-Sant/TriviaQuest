import { cache } from "react";

import { auth } from "@clerk/nextjs";

import db from "./drizzle";
import { eq } from "drizzle-orm";

import { categories, userProgress } from "./schema";

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