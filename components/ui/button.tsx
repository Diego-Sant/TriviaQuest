import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 uppercase tracking-wide font-bold",
  {
    variants: {
      variant: {
        default: "bg-[#121212] text-white border-[#3c4042] border-2 border-b-4 active:border-b-2 hover:bg-[#606368]",
        primary: "bg-sky-400 text-primary-foreground hover:bg-sky-400/90 border-sky-500 border-b-4 active:border-b-0",
        primaryOutline: "bg-[#121212] text-sky-400 hover:bg-[#3c4042]",
        secondary: "bg-green-500 text-primary-foreground hover:bg-green-500/90 border-green-600 border-b-4 active:border-b-0",
        secondaryOutline: "bg-[#121212] text-green-500 hover:bg-[#3c4042]",
        destructive: "bg-rose-600 text-primary-foreground hover:bg-rose-500 border-rose-700 border-b-4 active:border-b-0",
        destructiveOutline: "bg-[#1c1c1c] text-rose-500 hover:bg-[#3c4042]",
        premium: "bg-indigo-500 text-primary-foreground hover:bg-indigo-500/90 border-indigo-600 border-b-4 active:border-b-0",
        premiumOutline: "bg-[#121212] text-indigo-500 hover:bg-[#3c4042]",
        ghost: "bg-transparent text-[#FAF9F6] border-transparent border-0 hover:bg-[#3c4042]",
        sidebar: "bg-sky-500/15 text-sky-500 border-sky-300 border-2 hover:bg-sky-500/20 transition-none",
        sidebarOutline: "bg-transparent text-[#FAF9F6] border-2 border-transparent hover:bg-[#3c4042] transition-none",
        locked: "bg-neutral-200 text-primary-foreground hover:bg-neutral-200/90 border-neutral-400 border-b-4 active:border-b-0"
      },
      size: {
        default: "h-11 px-4 py-2",
        sm: "h-9 px-3",
        lg: "h-12 px-8",
        icon: "h-10 w-10",
        rounded: "rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot :"button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props} 
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
