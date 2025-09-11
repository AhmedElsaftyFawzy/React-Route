"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { signOut, useSession } from "next-auth/react"
import React, { useContext, useState } from "react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cartContext } from "@/context/CartContext"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"

import { Menu, X } from "lucide-react"

export default function Navbar() {
  const { data, status } = useSession()
  const pathName = usePathname()
  const cart = useContext(cartContext)
  const count = cart?.count ?? 0
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const shopLinks = [
    { path: "/", content: "Home", protected: false },
    { path: "/cart", content: "Cart", protected: true },
    { path: "/allorders", content: "Order", protected: true },
    { path: "/wishlist", content: "WishList", protected: true },
    { path: "/product", content: "Products", protected: false },
    { path: "/category", content: "Categories", protected: false },
    { path: "/brand", content: "Brands", protected: false },
  ]

  const authLinks = [
    { path: "/login", content: "Login" },
    { path: "/register", content: "Register" },
  ]

  const logout = () => {
    signOut({ callbackUrl: "/login" })
    setMobileMenuOpen(false)
  }

  return (
    <nav className="shadow-lg px-5 py-3">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <Link href="/">
          <Image
            src="/freshcart-logo.svg"
            alt="FreshCart Logo"
            width={100}
            height={40}
            className="h-auto w-full"
            priority
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex  items-center gap-6">
          <NavigationMenu>
            <NavigationMenuList className="flex items-center gap-5">
              {shopLinks
                .filter((link) => !link.protected || status === "authenticated")
                .map((link) => (
                  <NavigationMenuItem key={link.content}>
                    <NavigationMenuLink asChild>
                      <Link
                        href={link.path}
                        className={`${
                          pathName === link.path ? "text-main" : ""
                        } flex items-center`}
                      >
                        {link.content}
                        {link.path === "/cart" && (
                          <Badge
                            className="text-main rounded-3xl absolute -right-5"
                            variant="outline"
                          >
                            {count}
                          </Badge>
                        )}
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        {/* Auth Section - Desktop */}
        {status === "authenticated" ? (
          <div className="hidden lg:flex items-center gap-4">
            <Link href="/profile">
              <h2 className="bg-main text-white px-3 py-1 rounded-2xl">
                Welcome {data?.user?.name}
              </h2>
            </Link>
            <Button onClick={logout}>Logout</Button>
          </div>
        ) : (
          <div className="hidden lg:flex items-center gap-4">
            {authLinks.map((link) => (
              <Link
                key={link.content}
                href={link.path}
                className={pathName === link.path ? "text-main" : ""}
              >
                {link.content}
              </Link>
            ))}
          </div>
        )}

        {/* Mobile Menu Toggle Button */}
        <button
          className="lg:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle mobile menu"
        >
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-4 flex flex-col gap-4">
          {shopLinks
            .filter((link) => !link.protected || status === "authenticated")
            .map((link) => (
              <Link
                key={link.content}
                href={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`${
                  pathName === link.path ? "text-main" : ""
                } flex items-center justify-between`}
              >
                {link.content}
                {link.path === "/cart" && (
                  <Badge
                    className="h-5 min-w-5 rounded-full px-1 font-mono tabular-nums text-main"
                    variant="outline"
                  >
                    {count}
                  </Badge>
                )}
              </Link>
            ))}

          {/* Auth Section - Mobile */}
          {status === "authenticated" ? (
            <>
              <Link
                href="/profile"
                onClick={() => setMobileMenuOpen(false)}
                className="bg-main text-white px-3 py-1 rounded-2xl w-fit"
              >
                Welcome {data?.user?.name}
              </Link>
              <Button onClick={logout}>Logout</Button>
            </>
          ) : (
            authLinks.map((link) => (
              <Link
                key={link.content}
                href={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={pathName === link.path ? "text-main" : ""}
              >
                {link.content}
              </Link>
            ))
          )}
        </div>
      )}
    </nav>
  )
}
