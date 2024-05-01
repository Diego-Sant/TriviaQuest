"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";

import { useEffect, useState } from "react";

import { useExitModal } from "@/store/use-exit-modal";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";

export const ExitModal = () => {
    const router = useRouter();

    const [isClient, setIsClient] = useState(false);
    const { isOpen, close } = useExitModal();

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
                        Espere, não vá!
                    </DialogTitle>
                    <DialogDescription className="text-center text-md">
                        Você está preste a deixar o quiz. Tem certeza?
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="mb-4">
                    <div className="flex flex-col gap-y-4 w-full">
                        <Button variant="primary" className="w-full" size="lg" onClick={close}>
                            Continuar no quiz
                        </Button>
                        <Button variant="destructiveOutline" 
                            className="w-full" size="lg" 
                            onClick={() => {close(); router.push("/quizzes")}}
                        >
                            Sair
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );

}