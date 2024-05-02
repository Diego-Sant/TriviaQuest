"use client";

import { challengeOptions, challenges } from "@/db/schema";

import { use, useState } from "react";

import Header from "./header";
import Challenge from "./challenge";
import Footer from "./footer";

type Props = {
    initialPercentage: number;
    initialHearts: number;
    initialQuizId: number;
    initialQuizChallenges: (typeof challenges.$inferSelect & {
        completed: boolean;
        challengeOptions: typeof challengeOptions.$inferSelect[];
    })[];
    userSubscription: any;
}

const Quiz = ({initialPercentage, initialHearts, initialQuizId, initialQuizChallenges, userSubscription}: Props) => {
    const [hearts, setHearts] = useState(initialHearts);
    const [percentage, setPercentage] = useState(initialPercentage);
    const [challenges] = useState(initialQuizChallenges);

    const [activeIndex, setActiveIndex] = useState(() => {
        const uncompletedIndex = challenges.findIndex((challenge) => !challenge.completed);

        return uncompletedIndex === -1 ? 0 : uncompletedIndex;
    });

    const [selectedOption, setSelectedOption] = useState<number>();
    const [status, setStatus] = useState<"correct" | "wrong" | "none">("none");

    const challenge = challenges[activeIndex];
    const options = challenge?.challengeOptions ?? [];

    const onSelect = (id: number) => {
        if (status !== "none") return;

        setSelectedOption(id);
    };

    const title = challenge.question;
  
    return (
    <>
        <Header hearts={hearts} percentage={percentage} 
            hasActiveSubscription={!!userSubscription?.isActive} 
        />
    
        <div className="flex-1">
            <div className="h-full flex items-center justify-center">
                <div className="lg:min-h-[350px] lg:w-[1000px] w-full px-6 lg:px-0 flex flex-col gap-y-12">
                    <h1 className="text-lg lg:text-3xl text-center font-bold text-neutral-300">
                        {title}
                    </h1>
                    <div>
                        <Challenge options={options} onSelect={onSelect}
                            status={status} selectedOption={selectedOption} disabled={false}
                            type={challenge.type}
                        />
                    </div>
                </div>
            </div>
        </div>

        <Footer disabled={!selectedOption} status={status} onCheck={() => {}} />
    </>
  )
}

export default Quiz
