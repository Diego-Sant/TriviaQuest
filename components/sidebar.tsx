import { cn } from '@/lib/utils';

import Image from 'next/image';
import Link from 'next/link';
import SidebarItem from './sidebar-item';
import { ClerkLoaded, ClerkLoading, UserButton } from '@clerk/nextjs';
import { Loader } from 'lucide-react';

type Props = {
    className?: string;
}

export const Sidebar = ({className}: Props) => {
  return (
    <div className={cn
    ("flex h-full bg-[#111111] lg:w-[256px] lg:fixed left-0 top-0 px-4 border-r-2 flex-col",
    className)}>
        <Link href="/quizzes">
            <div className="pt-6 pl-2 pb-7 flex items-center gap-x-3">
                <Image src="/TriviaQuestLogo.svg" height={55} width={55} alt="TriviaQuest Logo" />
                <h1 className="text-2xl font-extrabold text-green-600 tracking-wide">TriviaQuest</h1>
            </div>
        </Link>
        <div className='flex flex-col gap-y-2 flex-1'>
            <SidebarItem label='Categorias' href='/quizzes' iconSrc='/menu.svg' />
            <SidebarItem label='Líderes' href='/lideres' iconSrc='/lideranca.svg' />
            <SidebarItem label='Missões' href='/missoes' iconSrc='/missoes.svg' />
            <SidebarItem label='Loja' href='/loja' iconSrc='/loja.svg' />
        </div>
        <div className='p-4'>
            <ClerkLoading>
                <Loader className='h-5 w-5 text-muted-foreground animate-spin' />
            </ClerkLoading>
            <ClerkLoaded>
                <UserButton afterSignOutUrl="/" />
            </ClerkLoaded>
        </div>
    </div>
  )
}