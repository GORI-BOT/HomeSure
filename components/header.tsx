"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Menu, Wrench } from "lucide-react";
import { useState, useEffect } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { createClient } from "@/lib/supabase/client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const supabase = createClient();

    const loadUserData = async () => {
      try {
        const {
          data: { user },
          error,
        } = await supabase.auth.getUser();

        if (error && error.message !== "Auth session missing!") {
          console.error(" Error fetching user:", error.message);
          return;
        }

        setUser(user);
        if (user) {
          loadCartCount(user.id);
          loadProfile(user.id);
        }
      } catch (error) {
        console.error(
          " Failed to connect to Supabase. Check your environment variables."
        );
      }
    };

    loadUserData();

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
      if (session?.user) {
        loadCartCount(session.user.id);
        loadProfile(session.user.id);
      } else {
        setCartCount(0);
        setProfile(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const loadCartCount = async (userId: string) => {
    try {
      const supabase = createClient();
      const { data } = await supabase
        .from("cart_items")
        .select("quantity")
        .eq("user_id", userId);

      const total = data?.reduce((sum, item) => sum + item.quantity, 0) || 0;
      setCartCount(total);
    } catch (error) {
      console.error(" Error loading cart count:", error);
    }
  };

  const loadProfile = async (userId: string) => {
    try {
      const supabase = createClient();
      const { data } = await supabase
        .from("profiles")
        .select("full_name")
        .eq("id", userId)
        .single();
      setProfile(data);
    } catch (error) {
      console.error(" Error loading profile:", error);
    }
  };

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    window.location.href = "/";
  };

  const getUserInitials = () => {
    if (profile?.full_name) {
      const names = profile.full_name.split(" ");
      if (names.length >= 2) {
        return `${names[0][0]}${names[1][0]}`.toUpperCase();
      }
      return names[0][0].toUpperCase();
    }
    if (user?.email) {
      return user.email[0].toUpperCase();
    }
    return "U";
  };

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Repair Services", href: "/repair" },
    { name: "Shop Appliances", href: "/shop" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Wrench className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold text-foreground">
              Home<span className="text-primary">Sure</span> Appliances
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <Link href="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {mounted && cartCount > 0 && (
                  <Badge
                    className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
                    suppressHydrationWarning
                  >
                    {cartCount}
                  </Badge>
                )}
                <span className="sr-only">Shopping cart</span>
              </Button>
            </Link>
            {mounted && (
              <>
                {user ? (
                  <div className="hidden md:block" suppressHydrationWarning>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="rounded-full"
                        >
                          <Avatar className="h-9 w-9">
                            <AvatarFallback className="bg-primary text-primary-foreground font-semibold">
                              {getUserInitials()}
                            </AvatarFallback>
                          </Avatar>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-56">
                        <div className="px-2 py-1.5">
                          <p className="text-sm font-medium">
                            {profile?.full_name || "User"}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {user.email}
                          </p>
                        </div>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                          <Link href="/account" className="cursor-pointer">
                            Profile
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link
                            href="/account/orders"
                            className="cursor-pointer"
                          >
                            Orders
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link
                            href="/account/repairs"
                            className="cursor-pointer"
                          >
                            Repairs
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link
                            href="/account/profile"
                            className="cursor-pointer"
                          >
                            Settings
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={handleSignOut}
                          className="cursor-pointer text-destructive"
                        >
                          Sign Out
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                ) : (
                  <Link href="/auth/login" className="hidden md:block">
                    <Button variant="outline" size="sm">
                      Sign In
                    </Button>
                  </Link>
                )}
              </>
            )}

            {/* Mobile Menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <nav className="flex flex-col gap-4 mt-8">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className="text-lg font-medium text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {item.name}
                    </Link>
                  ))}
                  {mounted && (
                    <>
                      {user ? (
                        <>
                          <Link
                            href="/account"
                            onClick={() => setIsOpen(false)}
                          >
                            <Button className="w-full mt-4">Account</Button>
                          </Link>
                          <Button
                            variant="outline"
                            className="w-full bg-transparent"
                            onClick={handleSignOut}
                          >
                            Sign Out
                          </Button>
                        </>
                      ) : (
                        <Link
                          href="/auth/login"
                          onClick={() => setIsOpen(false)}
                        >
                          <Button className="w-full mt-4">Sign In</Button>
                        </Link>
                      )}
                    </>
                  )}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
