import Link from "next/link"
import Image from "next/image"

import { Button } from "./ui/button"

import { InfinityIcon } from "lucide-react";
import { categories } from "@/db/schema";

type Props = {
    activeCategory: typeof categories.$inferSelect,
    hearts: number,
    points: number,
    hasActiveSubscription: boolean
}

const UserProgress = ({activeCategory, hearts, points, hasActiveSubscription}: Props) => {
    const imageWidth = activeCategory.title === "Demon Slayer" || activeCategory.title === "DC Comics" ? 65 : activeCategory.title === "God of War" || activeCategory.title === "Bleach" || activeCategory.title === "Attack on Titan" ? 110 : 90;

    return (  
    <div className="flex items-center justify-between gap-x-2 w-full">
        <Link href="/categorias">
            <Button variant="ghost">
                <Image src={activeCategory.imageSrc} alt={activeCategory.title} height={40} width={imageWidth} />
            </Button>
        </Link>
        <Link href="/loja">
            <Button variant="ghost" className="text-orange-500">
                <Image src="/points.svg" height={28} width={28} alt="Pontos" className="mr-2" />
                {points}
            </Button>
        </Link>
        <Link href="/loja">
            <Button variant="ghost" className="text-rose-500">
                <Image src={hasActiveSubscription ? "/unlimited.svg" : "/heart.svg"} height={22} width={22} alt="Vidas restantes" className="mr-2" />
                {hasActiveSubscription ? <InfinityIcon className="h-4 w-4 stroke-[3]" /> : hearts}
            </Button>
        </Link>
    </div>
  )
}

export default UserProgress
