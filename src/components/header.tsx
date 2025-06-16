"use client";

import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import ShoppingCartComponent from "./cart";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import router from "next/router";

export default function HeaderNavigation() {
  // const { isAuthenticated, user, signOut } = useAuth();
  // const router = useRouter();

  // const isAdmin = isAuthenticated && user?.isAdmin === true;
  const isAdmin = true; //mudar aqui pra true e ver tela admin
  const isAuthenticated = true; //mudar aqui pra true e ver tela autenticada

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="h-8 w-8 bg-gray-900 rounded-md flex items-center justify-center">
                <span className="text-white font-bold text-sm">E</span>
              </div>
              <span className="font-bold text-xl text-gray-900">
                E-Commerce
              </span>
            </Link>
          </div>

          <div className="hidden md:flex">
            <NavigationMenu>
              <NavigationMenuList className="flex space-x-1">
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link href="/" className="...">
                      Home
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                {isAdmin && (
                  <>
                    <NavigationMenuItem>
                      <NavigationMenuLink asChild>
                        <Link href="/admin/dashboard" className="...">
                          Admin Dashboard
                        </Link>
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                      <NavigationMenuLink asChild>
                        <Link href="/admin/customer-orders" className="...">
                          Customer Orders
                        </Link>
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  </>
                )}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          <div className="flex items-center space-x-2">
            {isAuthenticated && <ShoppingCartComponent />}

            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-9 w-9 rounded-full"
                  >
                    <Avatar className="h-9 w-9">
                      <AvatarFallback>G</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <p className="text-sm font-medium">Logged as</p>
                    <p className="text-xs text-muted-foreground">
                      email@test.com
                    </p>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => router.push("/")}
                    className="cursor-pointer"
                  >
                    My Account
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => {
                      console.log("Leave");
                    }}
                    className="cursor-pointer text-red-600 focus:text-red-600"
                  >
                    Leave
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button asChild variant="secondary" size="sm">
                <Link href="/login">Login</Link>
              </Button>
            )}
          </div>
        </div>

        <div className="md:hidden pb-4">
          <nav className="flex justify-center space-x-6">
            <Link href="/" className="...">
              Home
            </Link>
            {isAdmin && (
              <>
                <Link href="/admin/dashboard" className="...">
                  Admin Dashboard
                </Link>
                <Link href="/admin/customer-orders" className="...">
                  Customer Orders
                </Link>
              </>
            )}
            {!isAuthenticated && (
              <Link
                href="/login"
                className="text-sm font-medium text-blue-600 hover:underline"
              >
                Login
              </Link>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
