import { Button } from "@/components/ui/button"
import Image from "next/image"

export const Footer = () => {
    return (
        <footer className="hidden lg:block h-20  border-t-2 border-[#1f1f1f] p-2 text-white">
            <div className="max-w-screen-lg mx-auto flex flex-wrap items-center justify-evenly gap-y-2">
                <Button size="lg" variant="ghost" className="">
                    <Image src="/naruto.svg" alt="Naruto" height={40} width={62} className="mr-4 rounded-md" />
                    Naruto
                </Button>
                <Button size="lg" variant="ghost" className="">
                    <Image src="/dragonball.svg" alt="Dragon Ball" height={40} width={62} className="mr-4 rounded-md" />
                    Dragon Ball
                </Button>
                <Button size="lg" variant="ghost" className="">
                    <Image src="/onepiece.svg" alt="One Piece" height={40} width={62} className="mr-4 rounded-md" />
                    One Piece
                </Button>
                <Button size="lg" variant="ghost" className="">
                    <Image src="/bleach.svg" alt="Bleach" height={40} width={62} className="mr-4 rounded-md" />
                    Bleach
                </Button>
                <Button size="lg" variant="ghost" className="">
                    <Image src="/pokemon.svg" alt="Pokémon" height={40} width={62} className="mr-4 rounded-md" />
                    Pokémon
                </Button>
                <Button size="lg" variant="ghost" className="">
                    <Image src="/demonslayer.svg" alt="Demon Slayer" height={55} width={40} className="mr-4 rounded-md" />
                    Demon Slayer
                </Button>
                <Button size="lg" variant="ghost" className="">
                    <Image src="/attackontitan.svg" alt="Attack on Titan" height={40} width={62} className="mr-4 rounded-md" />
                    Attack on Titan
                </Button>
                <Button size="lg" variant="ghost" className="">
                    <Image src="/marvel.svg" alt="Marvel" height={40} width={62} className="mr-4 rounded-md" />
                    Marvel
                </Button>
                <Button size="lg" variant="ghost" className="">
                    <Image src="/dc.svg" alt="DC Comics" height={55} width={40} className="mr-4 rounded-md" />
                    DC Comics
                </Button>
                <Button size="lg" variant="ghost" className="">
                    <Image src="/mario.svg" alt="Mario" height={40} width={62} className="mr-4 rounded-md" />
                    Mario
                </Button>
                <Button size="lg" variant="ghost" className="">
                    <Image src="/sonic.svg" alt="Sonic" height={40} width={62} className="mr-4 rounded-md" />
                    Sonic
                </Button>
                <Button size="lg" variant="ghost" className="">
                    <Image src="/godofwar.svg" alt="God of War" height={40} width={62} className="mr-4 rounded-md" />
                    God of War
                </Button>
                <Button size="lg" variant="ghost" className="">
                    <Image src="/halo.svg" alt="Halo" height={40} width={62} className="mr-4 rounded-md" />
                    Halo
                </Button>
                <Button size="lg" variant="ghost" className="">
                    <Image src="/leagueoflegends.svg" alt="League of Legends" height={40} width={62} className="mr-4 rounded-md" />
                    League of Legends
                </Button>
            </div>
        </footer>
    )
}