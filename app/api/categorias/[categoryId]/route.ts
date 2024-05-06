import db from "@/db/drizzle";
import { categories } from "@/db/schema";
import { getIsAdmin } from "@/lib/admin";

import { eq } from "drizzle-orm";

import { NextResponse } from "next/server";

export const GET = async (req: Request, {params}: {params: {categoryId: number}}) => {
    const isAdmin = await getIsAdmin();

    if(!isAdmin) {
        return new NextResponse("Não autorizado!", {status: 401})
    }
    
    const data = await db.query.categories.findFirst({
        where: eq(categories.id, params.categoryId),
    });

    return NextResponse.json(data);
};

export const PUT = async (req: Request, {params}: {params: {categoryId: number}}) => {
    const isAdmin = await getIsAdmin();

    if(!isAdmin) {
        return new NextResponse("Não autorizado!", {status: 401})
    }
    
    const body = await req.json();
    const data = await db.update(categories).set({
        ...body,
    }).where(eq(categories.id, params.categoryId))
    .returning();

    return NextResponse.json(data[0]);
};

export const DELETE = async (req: Request, {params}: {params: {categoryId: number}}) => {
    const isAdmin = await getIsAdmin();

    if(!isAdmin) {
        return new NextResponse("Não autorizado!", {status: 401})
    }
    
    const data = await db.delete(categories)
        .where(eq(categories.id, params.categoryId)).returning();

    return NextResponse.json(data[0]);
};