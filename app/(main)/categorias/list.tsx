"use client";

import { upsertUserProgress } from "@/actions/user-progress";
import { categories, userProgress } from "@/db/schema";
import Card from "./card";

import { useRouter } from "next/navigation";

import { useTransition } from "react";
import { toast } from "sonner";

type Props = {
    categories: typeof categories.$inferSelect[];
    activeCategoryId?: typeof userProgress.$inferSelect.activeCategoryId;
}

const List = ({categories, activeCategoryId}: Props) => {
    const router = useRouter();
    const [pending, startTransition] = useTransition();

    const onClick = (id: number) => {
        if (pending) return;

        if (id === activeCategoryId) {
            return router.push("/quizzes");
        }

        startTransition(() => {
            upsertUserProgress(id).catch(() => toast.error("Algo deu errado. Tente novamente mais tarde!"))
        });
    }
  
    return (
    <div className="pt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[repeat(auto-fill,minmax(210px,1fr))] gap-4">
      {categories.map((category) => (
        <Card key={category.id} id={category.id} title={category.title} imageSrc={category.imageSrc}
        onClick={onClick} disabled={pending} active={category.id === activeCategoryId} />
      ))}
    </div>
  )
}

export default List
