import FeedWrapper from "@/components/feed-wrapper";
import StickyWrapper from "@/components/sticky-wrapper";
import UserProgress from "@/components/user-progress";
import Header from "./header";

import { getUnits, getUserProgress } from "@/db/queries";

import { redirect } from "next/navigation";
import Unit from "./unit";

const QuizesPage = async () => {
    const userProgressData = getUserProgress();
    const unitsData = getUnits();

    const [userProgress, units] = await Promise.all([userProgressData, unitsData])

    if (!userProgress || !userProgress.activeCategory) {
        redirect("/categorias")
    }

    return (
        <div className="text-white flex flex-row-reverse gap-[48px] px-6">
            <StickyWrapper>
                <UserProgress activeCategory={userProgress.activeCategory} 
                hearts={userProgress.hearts} points={userProgress.points} 
                hasActiveSubscription={false} 
                />
            </StickyWrapper>
            <FeedWrapper>
                <Header title={userProgress.activeCategory.title} />
                {units.map((unit) => (
                    <div key={unit.id} className="mb-10">
                        <Unit id={unit.id} order={unit.order} description={unit.description} title={unit.title} quizzes={unit.quizzes} activeQuiz={undefined} activeQuizPercentage={0} />
                    </div>
                ))}
            </FeedWrapper>
        </div>
    );
};

export default QuizesPage;