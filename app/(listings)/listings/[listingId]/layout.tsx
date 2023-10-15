import Link from "next/link"

import { marketingConfig } from "@/config/marketing"
import { cn } from "@/lib/utils"
import { Button, buttonVariants } from "@/components/ui/button"
import { MainNav } from "@/components/main-nav"
import { SiteFooter } from "@/components/site-footer"
import { UserAccountNav } from "@/components/user-account-nav"
import { getCurrentUser } from "@/lib/session"
import { notFound } from "next/navigation"
import Search from "@/components/search"
import { Icons } from "@/components/icons"
import { useModal } from "@/hooks/use-modal-store"


interface MarketingLayoutProps {
    children: React.ReactNode
}

export default async function MarketingLayout({
    children,
}: MarketingLayoutProps) {

    const user = await getCurrentUser()


    return (
        <div className="flex min-h-screen flex-col">
            <header className="border-b z-40 bg-background">
                <div className=" container flex h-20 items-center justify-between py-6">
                    <MainNav items={marketingConfig.mainNav} />
                    <Search />
                    <div className="flex flex-row items-center space-x-8">
                        <Button
                            variant='ghost'

                        >
                            <p className="flex flex-row items-center">
                                <Icons.home size={16} className="mr-2" />
                                My home
                            </p>

                        </Button>
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
                </div>
            </header>
            <main className="flex-1">{children}</main>
            <SiteFooter />
        </div>
    )
}