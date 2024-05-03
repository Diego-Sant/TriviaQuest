"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";

import { useEffect, useState } from "react";

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";

import { usePracticeModal } from "@/store/use-practice-modal";

export const PracticeModal = () => {
    const [isClient, setIsClient] = useState(false);
    const { isOpen, close } = usePracticeModal();

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
                        <Image src="/heart.svg"
                            alt="Vidas" height={100} width={100} />
                    </div>

                    <DialogTitle className="text-white text-center 
                        font-bold text-2xl"
                    >
                        Refazer fase
                    </DialogTitle>
                    <DialogDescription className="text-center text-md">
                        Refaça as fases que já foram completas para ganhar vida e pontos. Você não perde vida ao errar nesse modo!
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="mb-4">
                    <div className="flex flex-col gap-y-4 w-full">
                        <Button variant="primary" 
                            className="w-full" size="lg" 
                            onClick={close}
                        >
                            Entendido
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );

}