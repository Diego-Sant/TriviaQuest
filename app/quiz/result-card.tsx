import { cn } from "@/lib/utils";
import Image from "next/image";

type Props = {
    value: number;
    variant: "points" | "hearts";
}

const ResultCard = ({value, variant}: Props) => {
    const imageSrc = variant === "points" ? "/points.svg" : "/heart.svg"
  
    return (
        <div className={cn("rounded-2xl border-2 w-full",
            variant === "points" && "bg-orange-600 border-orange-600",
            variant === "hearts" && "bg-rose-600 border-rose-600"
        )}>
        <div className={cn("p-1.5 rounded-t-xl font-bold text-center uppercase text-xs",
            variant === "points" && "bg-orange-600",
            variant === "hearts" && "bg-rose-600"
        )}>
            {variant === "hearts" ? "Vidas restantes" : "Pontos ganhos"}
        </div>
        <div className={cn("rounded-2xl bg-[#1f1f1f] items-center flex justify-center p-6 font-bold text-lg",
            variant === "points" && "text-orange-500",
            variant === "hearts" && "text-rose-500"
        )}>
            <Image src={imageSrc} alt={variant === "points" ? "Pontos" : "Vida"}
                height={35} width={35} className="mr-1.5"
            />
            {value}
        </div>
        </div>
    )
}

export default ResultCard
