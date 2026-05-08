import { Home, Users, Zap, User } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const navItems = [
  { icon: Home, label: "الرئيسية", path: "/" },
  { icon: Users, label: "المجتمع", path: "/community" },
  { icon: Zap, label: "الأتمتة", path: "/automation" },
  { icon: User, label: "حسابي", path: "/profile" },
];

const BottomNav = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 backdrop-blur-2xl bg-card/60 border-t border-border/50 shadow-[0_-8px_30px_rgba(0,0,0,0.08)] safe-area-bottom">
      <div className="container mx-auto px-2">
        <div className="flex items-center justify-around py-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <motion.button
                key={item.path}
                whileTap={{ scale: 0.9 }}
                onClick={() => navigate(item.path)}
                className="relative flex flex-col items-center gap-1 py-2 px-4 rounded-2xl"
              >
                {isActive && (
                  <motion.div
                    layoutId="bottomnav-active"
                    className="absolute inset-0 bg-primary/15 rounded-2xl"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <item.icon className={`w-5 h-5 relative z-10 ${isActive ? "text-primary" : "text-muted-foreground"}`} />
                <span className={`text-xs font-medium relative z-10 ${isActive ? "text-primary" : "text-muted-foreground"}`}>
                  {item.label}
                </span>
              </motion.button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default BottomNav;
