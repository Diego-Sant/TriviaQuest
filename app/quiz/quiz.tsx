"use client";

import { useState, useTransition } from "react";

import { toast } from "sonner";

import { challengeOptions, challenges } from "@/db/schema";
import { upsertChallengeProgress } from "@/actions/challenge-progress";
import Header from "./header";
import Challenge from "./challenge";
import Footer from "./footer";
import { reduceHearts } from "@/actions/user-progress";

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
    const [pending, startTransition] = useTransition();
    
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

    const onNext = () => {
        setActiveIndex((current) => current + 1);
    };

    const onSelect = (id: number) => {
        if (status !== "none") return;

        setSelectedOption(id);
    };

    const onContinue = () => {
        if (!selectedOption) return;

        if (status === "wrong") {
            setStatus("none");
            setSelectedOption(undefined);
            return;
        }

        if (status === "correct") {
            onNext();
            setStatus("none");
            setSelectedOption(undefined);
            return;
        }

        const correctOption = options.find((option) => option.correct);

        if (!correctOption) {
            return;
        }

        if (correctOption.id === selectedOption) {
            startTransition(() => {
                upsertChallengeProgress(challenge.id)
                    .then((response) => {
                        if (response?.error === "hearts") {
                            console.error("Não tem corações restantes!");
                            return;
                        }

                        setStatus("correct");
                        setPercentage((prev) => prev + 100 / challenges.length);

                        if (initialPercentage === 100) {
                            setHearts((prev) => Math.min(prev + 1, 10));
                        }
                    })
                    .catch(() => toast.error("Algo de errado aconteceu. Tente novamente mais tarde!"))
            });
        } else {
            startTransition(() => {
                reduceHearts(challenge.id)
                    .then((response) => {
                        if (response?.error === "hearts") {
                            console.error("Sem corações restantes!");
                            return;
                        }

                        setStatus("wrong");

                        if (!response?.error) {
                            setHearts((prev) => Math.max(prev - 1, 0));
                        }
                    })
                    .catch(() => toast.error("Algo de errado aconteceu. Tente novamente mais tarde!"));
            });
        }
    }

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
                            status={status} selectedOption={selectedOption} disabled={pending}
                            type={challenge.type}
                        />
                    </div>
                </div>
            </div>
        </div>

        <Footer disabled={pending || !selectedOption} status={status} onCheck={onContinue} />
    </>
  )
}

export default Quiz
