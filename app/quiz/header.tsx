import { Progress } from "@/components/ui/progress";
import { userSubscription } from "@/db/schema";
import { useExitModal } from "@/store/use-exit-modal";

import { InfinityIcon, X } from "lucide-react";

import Image from "next/image";

type Props = {
    hearts: number;
    percentage: number;
    hasActiveSubscription: boolean;
}

const Header = ({hearts, percentage, hasActiveSubscription}: Props) => {
    const { open } = useExitModal();
  
    return (
    <header className="lg:pt-[50px] pt-[20px] gap-x-5 flex gap-y-7 
        items-center justify-between max-w-[1140px] mx-auto lg:w-full w-[320px] sm:w-[400px] md:w-[700px]"
    >
        <X onClick={open} className="text-slate-200 w-8 hover:opacity-75
            transition cursor-pointer" 
        />

        <Progress value={percentage} />

        <div className="text-rose-500 flex items-center font-bold">
            <Image src={hasActiveSubscription ? "/unlimited.svg" : "/heart.svg"} height={28} width={28} 
                alt="Vidas restantes" className="mr-2" 
            />

            {hasActiveSubscription ? 
                <InfinityIcon className="h-5 w-5 stroke-[3] shrink-0" /> : hearts}
        </div>

    </header>
  )
}

export default Header
