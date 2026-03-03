import { Search, Bell, Menu, LogIn, LogOut, User } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import type { User as SupaUser } from "@supabase/supabase-js";

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [user, setUser] = useState<SupaUser | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });
    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-50 bg-card/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 gradient-primary rounded-2xl flex items-center justify-center shadow-soft">
              <span className="text-2xl">🌱</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg font-bold text-foreground">المرشد الزراعي</h1>
              <p className="text-xs text-muted-foreground">AgriGuide Smart</p>
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-xl">
            <div className="relative">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="ابحث عن محصول، مرض، أو نصيحة..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input-agricultural pr-10 text-sm"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {user ? (
              <div className="flex items-center gap-2">
                <span className="hidden sm:inline text-sm text-muted-foreground truncate max-w-[120px]">
                  {user.user_metadata?.full_name || user.email?.split('@')[0]}
                </span>
                <button
                  onClick={handleSignOut}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium text-destructive-foreground bg-destructive/10 hover:bg-destructive/20 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="hidden sm:inline">خروج</span>
                </button>
              </div>
            ) : (
              <button
                onClick={() => navigate("/auth")}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium text-primary-foreground gradient-primary shadow-soft hover:opacity-90 transition-opacity"
              >
                <LogIn className="w-4 h-4" />
                <span>دخول</span>
              </button>
            )}
            <button className="relative p-3 rounded-xl hover:bg-muted transition-colors">
              <Bell className="w-5 h-5 text-muted-foreground" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-warning rounded-full"></span>
            </button>
            <button className="p-3 rounded-xl hover:bg-muted transition-colors sm:hidden">
              <Menu className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
