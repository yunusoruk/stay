import { redirect } from "next/navigation"

import { authOptions } from "@/lib/auth"
import { getCurrentUser } from "@/lib/session"
import { DashboardHeader } from "@/components/header"
import { DashboardShell } from "@/components/shell"
import { UserSettingsForm } from "./components/user-settings-form"

export const metadata = {
    title: "Settings",
    description: "Manage account and website settings.",
}

export default async function SettingsPage() {
    const user = await getCurrentUser()

    if (!user) {
        redirect(authOptions?.pages?.signIn || "/login")
    }

    return (
        <DashboardShell>
            <DashboardHeader
                heading="Settings"
                text="Manage account and website settings."
            />
            <div className="grid gap-10">
                <UserSettingsForm user={{ id: user.id, name: user.name || "" }} />
            </div>
        </DashboardShell>
    )
}