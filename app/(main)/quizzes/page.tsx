import FeedWrapper from "@/components/feed-wrapper";
import StickyWrapper from "@/components/sticky-wrapper";
import UserProgress from "@/components/user-progress";

import { getCategoryProgress, getQuizPercentage, getUnits, getUserProgress, getUserSubscription } from "@/db/queries";
import Header from "./header";
import Unit from "./unit";

import { redirect } from "next/navigation";

const QuizesPage = async () => {
    const userProgressData = getUserProgress();
    const categoryProgressData = getCategoryProgress();
    const quizPercentageData = getQuizPercentage();
    const unitsData = getUnits();
    const userSubscriptionData = getUserSubscription();

    const [userProgress, units, categoryProgress, quizPercentage, userSubscription] = await 
        Promise.all([userProgressData, unitsData, categoryProgressData, quizPercentageData, userSubscriptionData])

    if (!userProgress || !userProgress.activeCategory) {
        redirect("/categorias");
    }
    
    if (!categoryProgress) {
        redirect("/categorias");
    }

    return (
        <div className="text-white flex flex-row-reverse gap-[48px] px-6">
            <StickyWrapper>
                <UserProgress activeCategory={userProgress.activeCategory} 
                hearts={userProgress.hearts} points={userProgress.points} 
                hasActiveSubscription={!!userSubscription?.isActive} 
                />
            </StickyWrapper>
            <FeedWrapper>
                <Header title={userProgress.activeCategory.title} />
                {units.map((unit) => (
                    <div key={unit.id} className="mb-10">
                        <Unit id={unit.id} order={unit.order} 
                            description={unit.description} 
                            title={unit.title} quizzes={unit.quizzes} 
                            activeQuiz={categoryProgress.activeQuiz} 
                            activeQuizPercentage={quizPercentage} 
                        />
                    </div>
                ))}
            </FeedWrapper>
        </div>
    );
};

export default QuizesPage;