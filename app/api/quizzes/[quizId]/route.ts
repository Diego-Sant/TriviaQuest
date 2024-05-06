import db from "@/db/drizzle";
import { quizzes } from "@/db/schema";
import { getIsAdmin } from "@/lib/admin";

import { eq } from "drizzle-orm";

import { NextResponse } from "next/server";

export const GET = async (req: Request, {params}: {params: {quizId: number}}) => {
    const isAdmin = await getIsAdmin();

    if(!isAdmin) {
        return new NextResponse("Não autorizado!", {status: 401})
    }
    
    const data = await db.query.quizzes.findFirst({
        where: eq(quizzes.id, params.quizId),
    });

    return NextResponse.json(data);
};

export const PUT = async (req: Request, {params}: {params: {quizId: number}}) => {
    const isAdmin = await getIsAdmin();

    if(!isAdmin) {
        return new NextResponse("Não autorizado!", {status: 401})
    }
    
    const body = await req.json();
    const data = await db.update(quizzes).set({
        ...body,
    }).where(eq(quizzes.id, params.quizId))
    .returning();

    return NextResponse.json(data[0]);
};

export const DELETE = async (req: Request, {params}: {params: {quizId: number}}) => {
    const isAdmin = await getIsAdmin();

    if(!isAdmin) {
        return new NextResponse("Não autorizado!", {status: 401})
    }
    
    const data = await db.delete(quizzes)
        .where(eq(quizzes.id, params.quizId)).returning();

    return NextResponse.json(data[0]);
};