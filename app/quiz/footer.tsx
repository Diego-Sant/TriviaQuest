import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CheckCircle, XCircle } from "lucide-react";
import { useKey, useMedia } from "react-use";

type Props = {
    onCheck: () => void;
    status: "correct" | "wrong" | "none" | "completed";
    disabled?: boolean;
    quizId?: number;
};

const Footer = ({onCheck, status, disabled, quizId}: Props) => {
    const isMobile = useMedia("(max-width: 1024px)");
    useKey("Enter", onCheck, {}, [onCheck]);

  return (
    <footer className={cn("lg:h-[140px] h-[100px] mt-4 md:mt-0 border-t-2 border-[#1f1f1f]",
        status === "correct" && "border-transparent bg-green-400",
        status === "wrong" && "border-t-transparent bg-rose-400"
    )}>
        <div className="max-w-[1140px] mt-3 md:mt-0 h-full mx-auto flex items-center 
            justify-between px-6 lg:px-10"
        >

            {status === "correct" && (
                <div className="text-green-100 font-bold text-base lg:text-2xl flex items-center">
                    <CheckCircle className="h-6 w-6 lg:h-10 lg:w-10 mr-4" />
                    Certa resposta!
                </div>
            )}

            {status === "wrong" && (
                <div className="text-rose-100 font-bold text-base lg:text-2xl flex items-center">
                    <XCircle className="h-6 w-6 lg:h-10 lg:w-10 mr-4" />
                    Resposta errada!
                </div>
            )}

            {status === "completed" && (
                <Button variant="default" size={isMobile ? "sm" : "lg"}
                    onClick={() => window.location.href = `/quiz/${quizId}`}
                >
                    Recomeçar
                </Button>
            )}

            <Button disabled={disabled} className="ml-auto" 
                onClick={onCheck} size={isMobile ? "sm" : "lg"}
                variant={status === "wrong" ? "destructive" : "secondary"}
            >
                {status === "none" && "Confirmar resposta"}
                {status === "correct" && "Avançar"}
                {status === "wrong" && "Tentar novamente"}
                {status === "completed" && "Continuar"}
            </Button>

        </div>
    </footer>
  )
}

export default Footer
