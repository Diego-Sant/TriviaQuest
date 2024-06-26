"use client";

import { useState, useTransition } from "react";
import { useAudio, useMount, useWindowSize } from "react-use";
import Confetti from "react-confetti";

import { useRouter } from "next/navigation";
import Image from "next/image";


import { toast } from "sonner";

import { usePracticeModal } from "@/store/use-practice-modal";
import { useHeartsModal } from "@/store/use-hearts-modal";
import { reduceHearts } from "@/actions/user-progress";
import { upsertChallengeProgress } from "@/actions/challenge-progress";
import { challengeOptions, challenges, userSubscription } from "@/db/schema";

import Header from "./header";
import Challenge from "./challenge";
import Footer from "./footer";
import ResultCard from "./result-card";

type Props = {
    initialPercentage: number;
    initialHearts: number;
    initialQuizId: number;
    initialQuizChallenges: (typeof challenges.$inferSelect & {
        completed: boolean;
        challengeOptions: typeof challengeOptions.$inferSelect[];
    })[];
    userSubscription: typeof userSubscription.$inferSelect & {
        isActive: boolean;
    } | null;
}

const Quiz = ({initialPercentage, initialHearts, initialQuizId, initialQuizChallenges, userSubscription}: Props) => {
    const { width, height } = useWindowSize();
    const router = useRouter();

    const {open: openHeartsModal} = useHeartsModal(); 
    const {open: openPracticeModal} = usePracticeModal(); 

    useMount(() => {
        if (initialPercentage === 100) {
            openPracticeModal();
        }
    })
    
    const [finishAudio] = useAudio({ src: "/audio/finish.mp3", autoPlay: true});
    const [correctAudio, _c, correctControls] = useAudio({ src: "/audio/correct.wav" });
    const [incorrectAudio, _i, incorrectControls] = useAudio({ src: "/audio/incorrect.wav" });
    const [pending, startTransition] = useTransition();
    
    const [quizId] = useState(initialQuizId);
    const [hearts, setHearts] = useState(initialHearts);
    const [percentage, setPercentage] = useState(() => {
        return initialPercentage === 100 ? 0 : initialPercentage;
    });
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
                            openHeartsModal();
                            return;
                        }

                        correctControls.play();
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
                            openHeartsModal();
                            return;
                        }

                        incorrectControls.play();
                        setStatus("wrong");

                        if (!response?.error) {
                            setHearts((prev) => Math.max(prev - 1, 0));
                        }
                    })
                    .catch(() => toast.error("Algo de errado aconteceu. Tente novamente mais tarde!"));
            });
        }
    }

    if (!challenge) {
        return (
            <>
                {finishAudio}
                <Confetti recycle={false} numberOfPieces={500} tweenDuration={10000} height={height} width={width} />
                <div className="flex flex-col gap-y-4 lg:gap-y-8 max-w-lg 
                    mx-auto text-center items-center justify-center h-full"
                >
                        <Image src="/finish.svg" alt="Parabéns por ter completado o capítulo!" 
                            className="hidden lg:block" height={100} width={100}
                        />
                        <Image src="/finish.svg" alt="Parabéns por ter completado o capítulo!" 
                            className="lg:hidden block" height={50} width={50}
                        />
                        <h1 className="text-xl lg:text-3xl font-bold text-neutral-200">Parabéns! 
                            <br /> Você completou o capítulo!
                        </h1>
                        <div className="flex items-center gap-x-4 w-full">
                            <ResultCard variant="points" value={challenges.length * 10} />
                            <ResultCard variant="hearts" value={hearts} />
                        </div>
                </div>

                <Footer quizId={quizId} status="completed" onCheck={() => router.push("/quizzes")} />
            </>
        )
    }

    const title = challenge.question;
  
    return (
    <>
        {incorrectAudio}
        {correctAudio}
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
