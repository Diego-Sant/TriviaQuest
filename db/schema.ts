import { relations } from "drizzle-orm";
import { boolean, integer, pgEnum, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const categories = pgTable("categories", {
    id: serial("id").primaryKey(),
    title: text("title").notNull(),
    imageSrc: text("image_src").notNull()
});

export const categoriesRelations = relations(categories, ({ many }) => ({
    userProgress: many(userProgress), // Categorias podem ter muitos registros de progresso do usuário
    units: many(units) // Categorias podem ter várias unidades, mas as unidades podem ter só uma categoria
}));

export const units = pgTable("units", {
    id: serial("id").primaryKey(),
    title: text("title").notNull(),
    description: text("description").notNull(),
    categoryId: integer("category_id").references(() => categories.id, {onDelete : "cascade"}).notNull(),
    order: integer("order").notNull()
});

export const unitsRelations = relations(units, ({one, many}) => ({
    categories: one(categories, { // Muitas unidades podem pertencer a uma categoria específica
        fields: [units.categoryId],
        references: [categories.id]
    }),
    quizzes: many(quizzes), // Cada unidade pode ter vários quizzes, mas o quiz individual só pode ter uma unidade
}));

export const quizzes = pgTable("quizzes", {
    id: serial("id").primaryKey(),
    title: text("title").notNull(),
    unitId: integer("unit_id").references(() => units.id, {onDelete: "cascade"}).notNull(),
    order: integer("order").notNull()
});

export const quizzesRelations = relations(quizzes, ({one, many}) => ({
    unit: one(units, { // Muitos quizzes podem pertencer a uma unidade específica
        fields: [quizzes.unitId],
        references: [units.id]
    }),
    challenges: many(challenges) // Cada quiz pode ter vários desafios, mas o desafio individual só pode ter em um quiz
}));

export const challengesEnum = pgEnum("type", ["SELECT", "ASSIST"]);

export const challenges = pgTable("challenges", {
    id: serial("id").primaryKey(),
    quizId: integer("quiz_id").references(() => quizzes.id, {onDelete: "cascade"}).notNull(),
    type: challengesEnum("type").notNull(),
    question: text("question").notNull(),
    order: integer("order").notNull()
});

export const challengesRelations = relations(challenges, ({one, many}) => ({
    quiz: one(quizzes, { // Muitos desafios podem pertencer a um único quiz
        fields: [challenges.quizId],
        references: [quizzes.id]
    }),
    challengeOptions: many(challengeOptions), // Cada desafio pode ter várias respostas(mas só uma é correta)
    challengeProgress: many(challengeProgress) // Cada desafio pode ter vários registros de progresso de desafio associados a ele
}));

export const challengeOptions = pgTable("challenge_options", {
    id: serial("id").primaryKey(),
    challengeId: integer("challenge_id").references(() => challenges.id, {onDelete: "cascade"}).notNull(),
    text: text("text").notNull(),
    correct: boolean("correct").notNull(),
    imageSrc: text("image_src"),
    audioSrc: text("audio_src")
});

export const challengeOptionsRelations = relations(challengeOptions, ({one}) => ({
    challenge: one(challenges, { // Muitas opções de resposta podem pertencer a um único desafio
        fields: [challengeOptions.challengeId],
        references: [challenges.id]
    })
}));

export const challengeProgress = pgTable("challenge_progress", {
    id: serial("id").primaryKey(),
    userId: text("user_id").notNull(),
    challengeId: integer("challenge_id").references(() => challenges.id, {onDelete: "cascade"}).notNull(),
    completed: boolean("completed").notNull().default(false)
});

export const challengeProgressRelations = relations(challengeProgress, ({one}) => ({
    challenge: one(challenges, { // Muitos registros de progresso de desafio podem pertencer a um único desafio
        fields: [challengeProgress.challengeId],
        references: [challenges.id]
    })
}));

export const userProgress = pgTable("user_progress", {
    userId: text("user_id").primaryKey(),
    userName: text("user_name").notNull().default("Usuário"),
    userImageSrc: text("user_image_src").notNull().default("/TriviaQuestLogo.svg"),
    activeCategoryId: integer("active_category_id").references(() => categories.id, {onDelete: "cascade"}),
    hearts: integer("hearts").notNull().default(10),
    points: integer("points").notNull().default(0),
});

export const userProgressRelations = relations(userProgress, ({ one }) => ({
    activeCategory: one(categories, { // Um usuário pode ter apenas uma categoria ativa de cada vez, mas várias categorias podem ter um progresso associado a diferentes usuários
        fields: [userProgress.activeCategoryId],
        references: [categories.id]
    })
}));

export const userSubscription = pgTable("user_subscription", {
    id: serial("id").primaryKey(),
    userId: text("user_id").notNull().unique(),
    stripeCustomerId: text("stripe_customer_id").notNull().unique(),
    stripeSubscriptionId: text("stripe_subscription_id").notNull().unique(),
    stripePriceId: text("stripe_price_id").notNull(),
    stripeCurrentPeriodEnd: timestamp("stripe_current_period_end").notNull(),
});