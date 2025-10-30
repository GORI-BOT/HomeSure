"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, Package, Wrench, Settings, LogOut, X } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";

interface AccountSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AccountSidebar({ isOpen, onClose }: AccountSidebarProps) {
  const pathname = usePathname();

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    window.location.href = "/";
  };

  const navigation = [
    { name: "Profile", href: "/account", icon: User },
    { name: "Orders", href: "/account/orders", icon: Package },
    { name: "Repairs", href: "/account/repairs", icon: Wrench },
    { name: "Settings", href: "/account/profile", icon: Settings },
  ];

  const handleNavClick = () => {
    onClose();
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={cn(
          "fixed lg:relative top-0 left-0 h-full lg:h-auto w-64 shrink-0 z-50 transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        <Card className="h-full lg:h-auto">
          <CardContent className="p-4">
            <div className="flex justify-between items-center mb-4 lg:hidden">
              <h2 className="font-semibold text-lg">Menu</h2>
              <Button variant="ghost" size="icon" onClick={onClose}>
                <X className="h-5 w-5" />
              </Button>
            </div>

            <nav className="space-y-2">
              {navigation.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={handleNavClick}
                  >
                    <Button
                      variant={isActive ? "secondary" : "ghost"}
                      className={cn(
                        "w-full justify-start",
                        isActive && "bg-primary/10 text-primary"
                      )}
                    >
                      <item.icon className="mr-2 h-4 w-4" />
                      {item.name}
                    </Button>
                  </Link>
                );
              })}
              <Button
                variant="ghost"
                className="w-full justify-start text-destructive"
                onClick={handleSignOut}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Sign Out
              </Button>
            </nav>
          </CardContent>
        </Card>
      </aside>
    </>
  );
}
