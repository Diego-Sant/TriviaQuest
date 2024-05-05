import FeedWrapper from "@/components/feed-wrapper";
import StickyWrapper from "@/components/sticky-wrapper";
import UserProgress from "@/components/user-progress";
import Items from "./items";

import { getUserProgress, getUserSubscription } from "@/db/queries";
import Image from "next/image";

import { redirect } from "next/navigation";
import Promo from "@/components/promo";
import Quests from "@/components/quests";

const ShopPage = async () => {
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
            <Quests points={userProgress.points} />
        </StickyWrapper>
        <FeedWrapper>
            <div className="w-full flex flex-col items-center">
                <Image src="/loja.svg" alt="Loja" height={90} width={90} />
            </div>
            <h1 className="text-center font-bold text-neutral-200 text-2xl my-6">
                Loja
            </h1>
            <p className="text-neutral-300 text-center text-lg mb-6">
                Compre coisas com os seus pontos!
            </p>
            <Items hearts={userProgress.hearts} points={userProgress.points} 
                hasActiveSubscription={!!userSubscription?.isActive} 
            />
        </FeedWrapper>
    </div>
  )
}

export default ShopPage
