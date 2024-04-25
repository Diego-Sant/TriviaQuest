import { Button } from "@/components/ui/button";

const ButtonsPage = () => {
    return (
        <div className="p-4 space-y-4 flex flex-col max-w-[320px]">
            <Button>Botão Default</Button>
            <Button variant="primary">Botão Primário</Button>
            <Button variant="primaryOutline">Botão Primário Transparente</Button>
            <Button variant="secondary">Botão Secundário</Button>
            <Button variant="secondaryOutline">Botão Secundário Transparente</Button>
            <Button variant="destructive">Botão Destrutivo</Button>
            <Button variant="destructiveOutline">Botão Destrutivo Transparente</Button>
            <Button variant="premium">Botão Premium</Button>
            <Button variant="premiumOutline">Botão Premium Transparente</Button>
            <Button variant="ghost">Botão Fantasma</Button>
            <Button variant="sidebar">Botão Sidebar</Button>
            <Button variant="sidebarOutline">Botão Sidebar Transparente</Button>
        </div>
    )
}

export default ButtonsPage;