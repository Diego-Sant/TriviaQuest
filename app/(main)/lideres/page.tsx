import FeedWrapper from "@/components/feed-wrapper";
import StickyWrapper from "@/components/sticky-wrapper";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import UserProgress from "@/components/user-progress";

import { getTopTenUsers, getUserProgress, getUserSubscription } from "@/db/queries";
import Image from "next/image";

import { redirect } from "next/navigation";

const LeaderboardPage = async () => {
    const userProgressData = getUserProgress();
    const userSubscriptionData = getUserSubscription();
    const topTenUsersData = getTopTenUsers();

    const [ userProgress, userSubscription, topTenUsers ] = await 
        Promise.all([userProgressData, userSubscriptionData, topTenUsersData]);

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
        </StickyWrapper>
        <FeedWrapper>
            <div className="w-full flex flex-col items-center">
                <Image src="/lideranca.svg" alt="Tabela" height={90} width={90} />
            </div>
            <h1 className="text-center font-bold text-neutral-200 text-2xl my-6">
                Líderes
            </h1>
            <p className="text-neutral-300 text-center text-lg mb-6">
                Veja onde você se classifica em comparação a outros usuários!
            </p>

            <Separator className="mb-4 h-0.5 rounded-full" />
            {topTenUsers.map((userProgress, index) => (
                <div key={userProgress.userId} 
                    className="flex items-center w-full p-2 px-4 rounded-xl hover:bg-[#1f1f1f]"
                >
                    <p className="font-bold text-lime-700 mr-4">{index + 1}</p>
                    <Avatar className="border bg-green-500 h-12 w-12 ml-3 mr-6">
                        <AvatarImage className="object-cover" src={userProgress.userImageSrc} />
                    </Avatar>
                    <p className="font-bold text-neutral-200 flex-1">
                        {userProgress.userName}
                    </p>
                    <p className="text-muted-foreground flex items-center">
                       {userProgress.points}
                       <Image src="/points.svg" alt="Pontos" width={20} height={20} />
                    </p>
                </div>
            ))}
            
        </FeedWrapper>
    </div>
  )
}

export default LeaderboardPage
