import { Progress } from "@/components/ui/progress";
import { InfinityIcon, X } from "lucide-react";
import Image from "next/image";

type Props = {
    hearts: number;
    percentage: number;
    hasActiveSubscription: boolean;
}

const Header = ({hearts, percentage, hasActiveSubscription}: Props) => {
  return (
    <header className="lg:pt-[50px] pt-[20px] gap-x-5 flex gap-y-7 
        items-center justify-between max-w-[1140px] mx-auto lg:w-full w-[400px] md:w-[700px]"
    >
        <X onClick={() => {}} className="text-slate-200 hover:opacity-75
            transition cursor-pointer" 
        />

        <Progress value={percentage} />

        <div className="text-rose-500 flex items-center font-bold">
            <Image src="/heart.svg" height={28} width={28} 
                alt="Vidas restantes" className="mr-2" 
            />

            {hasActiveSubscription ? 
                <InfinityIcon className="h-6 w-6 stroke-[3]" /> : hearts}
        </div>

    </header>
  )
}

export default Header
