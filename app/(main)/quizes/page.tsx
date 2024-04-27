import FeedWrapper from "@/components/feed-wrapper";
import StickyWrapper from "@/components/sticky-wrapper";
import Header from "./header";
import UserProgress from "@/components/user-progress";

const QuizesPage = () => {
    return (
        <div className="text-white flex flex-row-reverse gap-[48px] px-6">
            <StickyWrapper>
                <UserProgress activeCategory={{title: "Naruto", imageSrc: "/naruto.svg"}} hearts={5} points={100} hasActiveSubscription={false} />
            </StickyWrapper>
            <FeedWrapper>
                <Header title="Naruto" />
            </FeedWrapper>
        </div>
    );
};

export default QuizesPage;