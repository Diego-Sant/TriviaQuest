import db from "@/db/drizzle";
import { units } from "@/db/schema";
import { getIsAdmin } from "@/lib/admin";

import { eq } from "drizzle-orm";

import { NextResponse } from "next/server";

export const GET = async (req: Request, {params}: {params: {unidadeId: number}}) => {
    const isAdmin = await getIsAdmin();

    if(!isAdmin) {
        return new NextResponse("Não autorizado!", {status: 401})
    }
    
    const data = await db.query.units.findFirst({
        where: eq(units.id, params.unidadeId),
    });

    return NextResponse.json(data);
};

export const PUT = async (req: Request, {params}: {params: {unidadeId: number}}) => {
    const isAdmin = await getIsAdmin();

    if(!isAdmin) {
        return new NextResponse("Não autorizado!", {status: 401})
    }
    
    const body = await req.json();
    const data = await db.update(units).set({
        ...body,
    }).where(eq(units.id, params.unidadeId))
    .returning();

    return NextResponse.json(data[0]);
};

export const DELETE = async (req: Request, {params}: {params: {unidadeId: number}}) => {
    const isAdmin = await getIsAdmin();

    if(!isAdmin) {
        return new NextResponse("Não autorizado!", {status: 401})
    }
    
    const data = await db.delete(units)
        .where(eq(units.id, params.unidadeId)).returning();

    return NextResponse.json(data[0]);
};