"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { AccountSidebar } from "@/components/account/account-sidebar";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const checkUser = async () => {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        window.location.href = "/auth/login";
      } else {
        setUser(user);
      }
      setLoading(false);
    };

    checkUser();
  }, []);

  if (loading || !mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-muted/30" suppressHydrationWarning>
      <div className="container mx-auto px-4 py-8">
        <div className="lg:hidden mb-4">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <AccountSidebar
            isOpen={sidebarOpen}
            onClose={() => setSidebarOpen(false)}
          />
          <div className="flex-1">{children}</div>
        </div>
      </div>
    </div>
  );
}
