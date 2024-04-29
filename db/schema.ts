import { relations } from "drizzle-orm";
import { integer, pgTable, serial, text } from "drizzle-orm/pg-core";

export const categories = pgTable("categories", {
    id: serial("id").primaryKey(),
    title: text("title").notNull(),
    imageSrc: text("image_src").notNull()
});

export const categoriesRelations = relations(categories, ({ many }) => ({
    userProgress: many(userProgress)
}))

export const userProgress = pgTable("user_progress", {
    userId: text("user_id").primaryKey(),
    userName: text("user_name").notNull().default("Usuário"),
    userImageSrc: text("user_image_src").notNull().default("/TriviaQuestLogo.svg"),
    activeCategoryId: integer("active_category_id").references(() => categories.id, {onDelete: "cascade"}),
    hearts: integer("hearts").notNull().default(5),
    points: integer("points").notNull().default(0),
});

export const userProgressRelations = relations(userProgress, ({ one }) => ({
    activeCategory: one(categories, {
        fields: [userProgress.activeCategoryId],
        references: [categories.id]
    })
}));