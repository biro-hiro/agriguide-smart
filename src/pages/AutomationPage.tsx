import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Droplets, Wind, Sun, Sprout, Thermometer, Bell, Loader2 } from "lucide-react";
import Header from "@/components/layout/Header";
import BottomNav from "@/components/layout/BottomNav";
import PageTransition from "@/components/PageTransition";
import { useWeather } from "@/hooks/useWeather";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const MAKE_WEBHOOK_URL = "https://hook.us2.make.com/clz2dw1qs524nbjhwqxj91ts5o5ab6i5";

interface Tile {
  id: string;
  label: string;
  icon: any;
  color: string; // tailwind gradient classes
  activeWhen?: (w: any) => boolean;
}

const tiles: Tile[] = [
  { id: "irrigation", label: "الري", icon: Droplets, color: "from-blue-500 to-cyan-400", activeWhen: (w) => w && w.temperature >= 30 && w.precipitation < 30 },
  { id: "cooling", label: "التبريد", icon: Wind, color: "from-sky-500 to-indigo-400", activeWhen: (w) => w && w.temperature >= 35 },
  { id: "lighting", label: "الإضاءة", icon: Sun, color: "from-amber-500 to-yellow-400" },
  { id: "fertilizer", label: "التسميد", icon: Sprout, color: "from-green-600 to-emerald-400" },
  { id: "heating", label: "التدفئة", icon: Thermometer, color: "from-orange-500 to-red-400", activeWhen: (w) => w && w.temperature <= 8 },
  { id: "alerts", label: "التنبيهات", icon: Bell, color: "from-purple-500 to-pink-400" },
];

const AutomationPage = () => {
  const { data: weather } = useWeather();
  const [states, setStates] = useState<Record<string, boolean>>({});
  const [sending, setSending] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("automation_states");
    if (saved) setStates(JSON.parse(saved));
  }, []);

  const toggle = async (tile: Tile) => {
    const next = !states[tile.id];
    const newStates = { ...states, [tile.id]: next };
    setStates(newStates);
    localStorage.setItem("automation_states", JSON.stringify(newStates));

    setSending(tile.id);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      await fetch(MAKE_WEBHOOK_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          event: "automation_toggle",
          tile: tile.id,
          label: tile.label,
          state: next ? "ON" : "OFF",
          timestamp: new Date().toISOString(),
          user: session?.user?.email ?? "anonymous",
          weather: weather ? {
            temperature: weather.temperature,
            humidity: weather.humidity,
            precipitation: weather.precipitation,
            description: weather.description,
          } : null,
        }),
      });
      toast.success(`${tile.label}: ${next ? "تم التفعيل" : "تم الإيقاف"}`);
    } catch {
      toast.error("تعذر الاتصال بالخادم");
    } finally {
      setSending(null);
    }
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      <Header />
      <PageTransition>
        <main className="max-w-3xl mx-auto px-4 py-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold">الأتمتة الزراعية</h1>
            <p className="text-sm text-muted-foreground">تحكّم ذكي مرتبط بالطقس وبيئتك</p>
          </div>

          {weather && (
            <div className="mb-6 p-4 rounded-3xl backdrop-blur-xl bg-card/60 border border-border/50 flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">الطقس الحالي</p>
                <p className="font-semibold">{weather.description} • {Math.round(weather.temperature)}°</p>
              </div>
              <div className="text-xs text-muted-foreground text-left">
                <p>رطوبة {weather.humidity}%</p>
                <p>أمطار {weather.precipitation}%</p>
              </div>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            {tiles.map((tile) => {
              const isOn = !!states[tile.id];
              const isRecommended = tile.activeWhen?.(weather);
              const Icon = tile.icon;
              return (
                <motion.button
                  key={tile.id}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => toggle(tile)}
                  className={`relative aspect-square rounded-3xl p-5 text-left overflow-hidden border transition-all ${
                    isOn
                      ? `bg-gradient-to-br ${tile.color} text-white border-transparent shadow-lg`
                      : "bg-card border-border text-foreground"
                  }`}
                >
                  {isRecommended && !isOn && (
                    <span className="absolute top-3 left-3 w-2.5 h-2.5 rounded-full bg-primary animate-pulse" />
                  )}
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 ${isOn ? "bg-white/20" : "bg-muted"}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <p className="font-bold text-lg">{tile.label}</p>
                  <p className={`text-xs mt-1 ${isOn ? "text-white/80" : "text-muted-foreground"}`}>
                    {sending === tile.id ? (
                      <span className="inline-flex items-center gap-1"><Loader2 className="w-3 h-3 animate-spin" /> جاري الإرسال</span>
                    ) : isOn ? "نشط" : isRecommended ? "موصى به الآن" : "متوقف"}
                  </p>
                </motion.button>
              );
            })}
          </div>
        </main>
      </PageTransition>
      <BottomNav />
    </div>
  );
};

export default AutomationPage;
