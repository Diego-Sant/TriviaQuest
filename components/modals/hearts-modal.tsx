"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";

import { useEffect, useState } from "react";

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";

import { useHeartsModal } from "@/store/use-hearts-modal";

export const HeartsModal = () => {
    const router = useRouter();

    const [isClient, setIsClient] = useState(false);
    const { isOpen, close } = useHeartsModal();

    const onClick = () => {
        close();
        router.push("/loja");
    }

    useEffect(() => {
        setIsClient(true)
    }, []);

    if (!isClient) {
        return null;
    }

    return (
        <Dialog open={isOpen} onOpenChange={close}>
            <DialogContent className="max-w-[60rem]">
                <DialogHeader>
                    <div className="flex items-center w-full justify-center mb-5">
                        <Image src="/TriviaQuestLogoExit.svg"
                            alt="TriviaQuest Logo" height={300} width={300} />
                    </div>

                    <DialogTitle className="text-white text-center 
                        font-bold text-2xl"
                    >
                        Você perdeu todas as suas vidas!
                    </DialogTitle>
                    <DialogDescription className="text-center text-md">
                        Mas não desista! Recupere os corações virando premium, comprando vidas novas ou refazendo fases que já foram completas!
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="mb-4">
                    <div className="flex flex-col gap-y-4 w-full">
                        <Button variant="primary" className="w-full" size="lg" onClick={onClick}>
                            Ter corações ilimitados
                        </Button>
                        <Button variant="primaryOutline" 
                            className="w-full" size="lg" 
                            onClick={close}
                        >
                            Refazer fases
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );

}