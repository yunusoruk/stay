import Link from "next/link"

import { marketingConfig } from "@/config/marketing"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { MainNav } from "@/components/main-nav"
import { SiteFooter } from "@/components/site-footer"
import { UserAccountNav } from "@/components/user-account-nav"
import { getCurrentUser } from "@/lib/session"
import { notFound } from "next/navigation"


interface MarketingLayoutProps {
    children: React.ReactNode
}

export default async function MarketingLayout({
    children,
}: MarketingLayoutProps) {

    const user = await getCurrentUser()

    if (!user) {
        return notFound()
    }

    return (
        <div className="flex min-h-screen flex-col">
            <header className="container z-40 bg-background">
                <div className="flex h-20 items-center justify-between py-6">
                    <MainNav items={marketingConfig.mainNav} />
                    {user ? (
                        <UserAccountNav
                            user={{
                                name: user.name,
                                image: user.image,
                                email: user.email,
                            }}
                        />
                    ) : (
                        <nav>
                            <Link
                                href="/login"
                                className={cn(
                                    buttonVariants({ variant: "secondary", size: "sm" }),
                                    "px-4"
                                )}
                            >
                                Login
                            </Link>
                        </nav>
                    )}


                </div>
            </header>
            <main className="flex-1">{children}</main>
            <SiteFooter />
        </div>
    )
}