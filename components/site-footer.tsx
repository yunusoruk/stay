import * as React from "react"

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { LampCeiling as Logo } from "lucide-react"
import { ModeToggle } from "@/components/mode-toggle"

export function SiteFooter({ className }: React.HTMLAttributes<HTMLElement>) {
    return (
        <footer className={cn(className)}>
            <div className="container flex flex-row  items-center justify-between gap-4 py-10 md:h-24  md:py-0">
                <div className="flex flex-row items-center gap-4 px-8  md:gap-2 md:px-0">
                    <Logo className="text-primary" />
                    <p className="text-center text-sm leading-loose md:text-left">
                        Follow us{" "}
                        <a
                            href={siteConfig.links.twitter}
                            target="_blank"
                            rel="noreferrer"
                            className="font-medium underline underline-offset-4"
                        >
                            stay
                        </a>
                        .
                    </p>
                </div>
                <ModeToggle />
            </div>
        </footer>
    )
}