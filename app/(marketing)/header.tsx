import { Button } from "@/components/ui/button"

import { ClerkLoaded, ClerkLoading, SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs"

import { Loader } from "lucide-react"

import Image from "next/image"

export const Header = () => {
    return (
        <header className="h-20 w-full border-b-2 border-[#1f1f1f] text-white px-4">
            <div className="lg:max-w-screen-lg mx-auto flex items-center justify-between h-full">
                <div className="pt-6 pl-4 pb-7 flex items-center gap-x-3">
                    <Image src="/TriviaQuestLogo.svg" height={55} width={55} alt="TriviaQuest Logo" />
                    <h1 className="text-2xl font-extrabold text-green-600 tracking-wide">TriviaQuest</h1>
                </div>
                <ClerkLoading>
                    <Loader className="h-5 w-5 text-muted-foreground animate-spin" />
                </ClerkLoading>
                <ClerkLoaded>
                    <SignedIn>
                        <UserButton afterSignOutUrl="/" />
                    </SignedIn>
                    <SignedOut>
                        <SignInButton mode="modal" afterSignInUrl="/quizes" afterSignUpUrl="/quizes">
                            <Button size="lg" variant="ghost">
                                Entrar
                            </Button>
                        </SignInButton>
                    </SignedOut>
                </ClerkLoaded>
            </div>
        </header>
    )
}