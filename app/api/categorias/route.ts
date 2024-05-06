import db from "@/db/drizzle";
import { categories } from "@/db/schema";
import { getIsAdmin } from "@/lib/admin";

import { NextResponse } from "next/server";

export const GET = async () => {
    const isAdmin = await getIsAdmin();

    if(!isAdmin) {
        return new NextResponse("Não autorizado!", {status: 401})
    }

    const data = await db.query.categories.findMany();

    return NextResponse.json(data);
}

export const POST = async (req: Request) => {
    const isAdmin = await getIsAdmin();

    if(!isAdmin) {
        return new NextResponse("Não autorizado!", {status: 401})
    }

    const body = await req.json();
    const data = await db.insert(categories).values({
        ...body,
    }).returning();

    return NextResponse.json(data[0]);
}
