
import { cn } from "@/lib/utils";

interface ShimmeringTextProps {
    text?: string;
    className?: string;
    children?: React.ReactNode;
}

export function ShimmeringText({ text, className, children }: ShimmeringTextProps) {
    return (
        <span
            className={cn(
                "inline-flex animate-text-shimmer bg-[linear-gradient(110deg,#939393,45%,#1e293b,55%,#939393)] bg-[length:250%_100%] bg-clip-text text-transparent",
                className
            )}
        >
            {text || children}
        </span>
    );
}
