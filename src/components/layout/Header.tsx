import { Search, Bell, Menu } from "lucide-react";
import { useState } from "react";

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");

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
