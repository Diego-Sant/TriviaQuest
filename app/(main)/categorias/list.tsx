"use client";

import { categories } from "@/db/schema";
import Card from "./card";

type Props = {
    categories: typeof categories.$inferSelect[];
    activeCategoryId: number;
}

const List = ({categories, activeCategoryId}: Props) => {
  return (
    <div className="pt-6 grid grid-cols-2 lg:grid-cols-[repeat(auto-fill,minmax(210px,1fr))] gap-4">
      {categories.map((category) => (
        <Card key={category.id} id={category.id} title={category.title} imageSrc={category.imageSrc}
        onClick={() => {}} disabled={false} active={category.id === activeCategoryId} />
      ))}
    </div>
  )
}

export default List
