import { Listing, Reservation, User } from "@prisma/client"

import type { Icon } from "lucide-react"

import { Icons } from "@/components/icons"
import { type } from "os"

export type NavItem = {
  title: string
  href: string
  disabled?: boolean
}

export type MainNavItem = NavItem

export type RoleItem = {
  id: string
  name: string
}

export type SidebarNavItem = {
  title: string
  disabled?: boolean
  external?: boolean
  icon?: keyof typeof Icons
} & (
  | {
      href: string
      items?: never
    }
  | {
      href?: string
      items: NavLink[]
    }
)

export type SiteConfig = {
  name: string
  description: string
  url: string
  ogImage: string
  links: {
    twitter: string
    github: string
    mail: string
  }
}

export type DocsConfig = {
  mainNav: MainNavItem[]
  sidebarNav: SidebarNavItem[]
}

export type MarketingConfig = {
  mainNav: MainNavItem[]
}

export type DashboardConfig = {
  mainNav: MainNavItem[]
  sidebarNav: SidebarNavItem[]
  sidebarAdminNav: SidebarNavItem[]
}

export type SubscriptionPlan = {
  name: string
  description: string
  stripePriceId: string
}

export type AdminConfig = {
  roles: RoleItem[] 
}

export type UserSubscriptionPlan = SubscriptionPlan &
  Pick<User, "stripeCustomerId" | "stripeSubscriptionId"> & {
    stripeCurrentPeriodEnd: number
    isPro: boolean
  }




  export type SafeUser = Omit<
  User,
  "createdAt" | "updatedAt" | "emailVerified"
  > & {
      createdAt: string
      updatedAt: string
      emailVerified: string | null
  }
  
  export type SafeReservation = Omit<
    Reservation, 
    "createdAt" | "startDate" | "endDate" | "listing"
  > & {
    createdAt: string;
    startDate: string;
    endDate: string;
    listing: SafeListing;
  };
  
  
  
  export type SafeListing = Omit<
  Listing,
  "createdAt"
  > & {
      createdAt: string
  
  }
  