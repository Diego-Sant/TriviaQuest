"use client";

import { refillHearts } from "@/actions/user-progress";
import { Button } from "@/components/ui/button";

import Image from "next/image";

import { useTransition } from "react";
import { toast } from "sonner";

type Props = {
    hearts: number;
    points: number;
    hasActiveSubscription: boolean;
}

const POINTS_TO_REFILL = 80;

const Items = ({hearts, points, hasActiveSubscription}: Props) => {
    const [pending, startTransition] = useTransition();
    
    const onRefillHearts = () => {
        if (pending || hearts === 10 || points < POINTS_TO_REFILL) {
            return;
        }

        startTransition(() => {
            refillHearts()
                .catch(() => toast.error("Algo de errado aconteceu. Tente novamente mais tarde!"))
        });
    }
  
    return (
        <ul className="w-full">
            <div className="flex items-center w-full p-4 gap-x-4 border-t-2 border-[#1f1f1f]">
                <Image src="/heart.svg" alt="Vidas" height={60} width={60} />
                <div className="flex-1">
                    <p className="text-neutral-200 text-base lg:text-xl font-bold">
                        Reabastecer vida
                    </p>
                </div>
                <Button onClick={onRefillHearts} 
                    disabled={hearts === 10 || points < POINTS_TO_REFILL
                    || pending}
                >
                    {hearts === 10 ? "Vida está cheia!" : (
                        <div className="flex items-center">
                            <Image src="/points.svg" alt="Pontos" height={20} width={20} />
                            <p>
                                80
                            </p>
                        </div>
                    )}
                </Button>
            </div>
        </ul>
    )
}

export default Items
