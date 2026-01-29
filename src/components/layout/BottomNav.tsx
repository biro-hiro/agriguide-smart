import { Home, Leaf, Calendar, Bug, Users } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

const navItems = [
  { icon: Home, label: "الرئيسية", path: "/" },
  { icon: Leaf, label: "المحاصيل", path: "/crops" },
  { icon: Calendar, label: "التقويم", path: "/calendar" },
  { icon: Bug, label: "الآفات", path: "/pests" },
  { icon: Users, label: "المجتمع", path: "/community" },
];

const BottomNav = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-lg border-t border-border safe-area-bottom">
      <div className="container mx-auto px-2">
        <div className="flex items-center justify-around py-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`nav-item ${isActive ? "active" : ""}`}
              >
                <item.icon className={`w-5 h-5 ${isActive ? "" : "text-muted-foreground"}`} />
                <span className={`text-xs font-medium ${isActive ? "" : "text-muted-foreground"}`}>
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default BottomNav;
