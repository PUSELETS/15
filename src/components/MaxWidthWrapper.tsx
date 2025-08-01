import { cn } from "@/lib/utils";
import { ReactNode } from "react";

export const dynamic = "force-dynamic"

const MaxWidthWrapper = ({
    className,
    children
}: {
    className ?: string
    children: ReactNode
}) => {
    return (
        <div className={cn("mx-auto w-full max-w-screen-xl px-[1.5rem] md:px-20", className)} >
            {children}
        </div>
    )
}

export default MaxWidthWrapper