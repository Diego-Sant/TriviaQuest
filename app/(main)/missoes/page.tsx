import FeedWrapper from "@/components/feed-wrapper";
import Promo from "@/components/promo";
import StickyWrapper from "@/components/sticky-wrapper";
import { Progress } from "@/components/ui/progress";
import UserProgress from "@/components/user-progress";

import { getUserProgress, getUserSubscription } from "@/db/queries";
import Image from "next/image";

import { redirect } from "next/navigation";

const quests = [
    {
        title: "Ganhe 40 pontos",
        value: 40,
    },
    {
        title: "Ganhe 100 pontos",
        value: 100,
    },
    {
        title: "Ganhe 200 pontos",
        value: 200,
    },
    {
        title: "Ganhe 500 pontos",
        value: 500,
    },
]

const QuestsPage = async () => {
    const userProgressData = getUserProgress();
    const userSubscriptionData = getUserSubscription();

    const [ userProgress, userSubscription ] = await 
        Promise.all([userProgressData, userSubscriptionData]);

    if (!userProgress || !userProgress.activeCategory) {
        redirect("/categorias");
    }

  return (
    <div className="flex flex-row-reverse gap-[48px] px-6">
        <StickyWrapper>
            <UserProgress activeCategory={userProgress.activeCategory}
                hearts={userProgress.hearts} points={userProgress.points}
                hasActiveSubscription={!!userSubscription?.isActive} 
            />
            {!userSubscription?.isActive && (
                <Promo />
            )}
        </StickyWrapper>
        <FeedWrapper>
            <div className="w-full flex flex-col items-center">
                <Image src="/missoes.svg" alt="Missões" height={90} width={90} />
            </div>
            <h1 className="text-center font-bold text-neutral-200 text-2xl my-6">
                Missões
            </h1>
            <p className="text-neutral-300 text-center text-lg mb-6">
                Complete as missões ganhando pontos!
            </p>
            <ul className="w-full">
                {quests.map((quest) => {
                    const progress = (userProgress.points / quest.value) * 100;

                    return (
                        <div className="flex items-center w-full p-4 gap-x-4 border-t-2 border-[#1f1f1f]" key={quest.title}>
                            <Image src="/points.svg" alt="Pontos" width={50} height={50} />
                            <div className="flex flex-col gap-y-2 w-full">
                                <p className="text-neutral-200 text-xl font-bold">
                                    {quest.title}
                                </p>
                                <Progress value={progress} className="h-3" />
                            </div>
                        </div>
                    )
                })}
            </ul>
            
        </FeedWrapper>
    </div>
  )
}

export default QuestsPage
