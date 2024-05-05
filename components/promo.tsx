import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";

const Promo = () => {
  return (
    <div className="border-2 rounded-xl p-4 space-y-4 border-[#1f1f1f]">
        <div className="space-y-2">
            <div className="flex items-center gap-x-2">
                <Image src="/unlimited.svg" alt="Virar premium" height={26} width={26} />
                <h3 className="font-bold text-lg text-white">Torne-se Premium</h3>
            </div>
            <p className="text-neutral-200">
                Tenha vidas ilimitadas!
            </p>
        </div>
        <Link href="/loja">
            <Button variant="premium" className="w-full mt-4" size="lg">
                Virar Premium
            </Button>
        </Link>
    </div>
  )
}

export default Promo
