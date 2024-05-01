import { quizzes, units } from "@/db/schema"

import UnitBanner from "./unit-banner";
import QuizButton from "./quiz-button";

type Props = {
    id: number,
    order: number,
    title: string,
    description: string,
    quizzes: (typeof quizzes.$inferSelect & {
        completed: boolean;
    })[],
    activeQuiz: typeof quizzes.$inferSelect & {
        unit: typeof units.$inferSelect
    } | undefined;
    activeQuizPercentage: number
}

const Unit = ({id, order, title, description, quizzes, activeQuiz, activeQuizPercentage}: Props) => {
  return (
    <>
      <UnitBanner title={title} description={description} />
      <div className="flex items-center flex-col relative">
        {quizzes.map((quiz, index) => {
            const isCurrent = quiz.id === activeQuiz?.id;
            const isLocked = !quiz.completed && !isCurrent;

            return (
                <QuizButton key={quiz.id} id={quiz.id} 
                    index={index} totalCount={quizzes.length - 1} 
                    current={isCurrent} locked={isLocked} 
                    percentage={activeQuizPercentage} 
                />
            )
        })}
      </div>
    </>
  )
}

export default Unit
