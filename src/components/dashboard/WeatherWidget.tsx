import { Cloud, CloudRain, CloudSnow, Droplets, Sun, Wind, Zap, MapPin, Loader2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useWeather } from "@/hooks/useWeather";

const iconMap = {
  sun: Sun,
  cloud: Cloud,
  rain: CloudRain,
  snow: CloudSnow,
  storm: Zap,
};

const WeatherWidget = () => {
  const { data, loading, error } = useWeather();

  if (loading) {
    return (
      <Card className="shadow-soft overflow-hidden">
        <div className="gradient-sky p-5" style={{ background: "var(--gradient-sky)" }}>
          <div className="flex items-center gap-2 text-white">
            <Loader2 className="w-5 h-5 animate-spin" />
            <span className="text-sm">جاري تحميل بيانات الطقس...</span>
          </div>
        </div>
        <CardContent className="p-4 space-y-3">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </CardContent>
      </Card>
    );
  }

  if (error || !data) {
    return (
      <Card className="shadow-soft">
        <CardContent className="p-5 text-center text-sm text-muted-foreground">
          {error || "لا تتوفر بيانات الطقس حالياً"}
        </CardContent>
      </Card>
    );
  }

  const Icon = iconMap[data.icon];

  return (
    <Card className="shadow-soft overflow-hidden">
      <div className="p-5 text-white" style={{ background: "var(--gradient-sky)" }}>
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-1 text-xs opacity-90">
              <MapPin className="w-3 h-3" />
              <span>{data.location}</span>
            </div>
            <p className="text-4xl font-bold mt-1">{data.temperature}°</p>
            <p className="text-sm opacity-90 mt-1">{data.description}</p>
          </div>
          <Icon className="w-16 h-16 opacity-90" />
        </div>
      </div>
      <CardContent className="p-4 space-y-3">
        <div className="flex items-center justify-between text-sm">
          <span className="flex items-center gap-2 text-muted-foreground">
            <Droplets className="w-4 h-4" /> الرطوبة
          </span>
          <span className="font-medium text-foreground">{data.humidity}%</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="flex items-center gap-2 text-muted-foreground">
            <Wind className="w-4 h-4" /> الرياح
          </span>
          <span className="font-medium text-foreground">{data.windSpeed} كم/س</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="flex items-center gap-2 text-muted-foreground">
            <Cloud className="w-4 h-4" /> هطول
          </span>
          <span className="font-medium text-foreground">{data.precipitation}%</span>
        </div>
        <div className="pt-2 mt-2 border-t border-border space-y-1.5">
          <p className="text-xs font-semibold text-foreground">توصيات زراعية:</p>
          {data.recommendations.map((rec, i) => (
            <p key={i} className="text-xs text-muted-foreground leading-relaxed">
              {rec}
            </p>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default WeatherWidget;
