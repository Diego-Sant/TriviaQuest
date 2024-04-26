import { Button } from "@/components/ui/button";
import { ClerkLoaded, ClerkLoading, SignInButton, SignUp, SignUpButton, SignedIn, SignedOut } from "@clerk/nextjs";

import { Loader } from "lucide-react";

import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="max-w-[988px] mx-auto flex-1 w-full flex flex-col lg:flex-row items-center justify-center p-4 gap-2">
      <div className="relative w-[420px] h-[420px] lg:w-[560px] lg:h-[560px] mb-8 lg:mb-0">
        <Image src="/hero.svg" fill alt="Imagem do menu principal" />
      </div>
      <div className="flex flex-col items-center gap-y-8">
        <h1 className="text-xl lg:text-3xl font-bold text-[#FAF9F6] max-w-[480px] text-center">Teste seu conhecimento sobre conteúdos variados de animes, jogos, filmes e quadrinhos!</h1>
        
        <div className="flex flex-col items-center gap-y-3 max-w-[330px] w-full">
          <ClerkLoading>
            <Loader className="h-5 w-5 text-muted-foreground animate-spin" />
          </ClerkLoading>
          <ClerkLoaded>
            <SignedOut>
              <SignUpButton mode="modal" afterSignInUrl="/quizes" afterSignUpUrl="/quizes">
                <Button size="lg" variant="secondary" className="w-full">
                  Cadastrar
                </Button>
              </SignUpButton>
              <SignInButton mode="modal" afterSignInUrl="/quizes" afterSignUpUrl="/quizes">
                <Button size="lg" variant="primaryOutline" className="w-full">
                  Já tenho uma conta
                </Button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <Button size="lg" variant="secondary" className="w-full" asChild>
                <Link href="/quizes">
                  Entrar
                </Link>
              </Button>
            </SignedIn>
          </ClerkLoaded>
        </div>

      </div>
    </div>
  );
}
