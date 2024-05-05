import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";
import { Progress } from "./ui/progress";

type Props = {
    points: number
}

const quests = [
    {
        title: "Ganhe 40 pontos",
        value: 40,
    },
    {
        title: "Ganhe 100 pontos",
        value: 100,
    },
    {
        title: "Ganhe 200 pontos",
        value: 200,
    },
    {
        title: "Ganhe 500 pontos",
        value: 500,
    },
]

const Quests = ({ points }: Props) => {
  return (
    <div className="border-2 rounded-xl p-4 space-y-4 border-[#1f1f1f]">
        <div className="flex items-center justify-between w-full space-y-2">
            <h3 className="font-bold text-lg ml-4 text-white">Missões</h3>
            <Link href="/missoes">
                <Button size="sm" variant="primaryOutline">
                    Ver missões
                </Button>
            </Link>
        </div>
        <ul className="w-full space-y-4">
            {quests.map((quest) => {
                const progress = (points / quest.value) * 100;

                return (
                    <div className="flex items-center w-full pb-4 gap-x-3" key={quest.title}>
                        <Image src="/points.svg" alt="Pontos" width={20} height={20} />
                        <div className="flex flex-col gap-y-2 w-full">
                            <p className="text-neutral-200 text-md font-bold">
                                {quest.title}
                            </p>
                            <Progress value={progress} className="h-1" />
                        </div>
                    </div>
                )
            })}
        </ul>
    </div>
  )
}

export default Quests
