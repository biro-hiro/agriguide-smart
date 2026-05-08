import { useEffect, useState } from "react";

export interface WeatherData {
  temperature: number;
  humidity: number;
  windSpeed: number;
  precipitation: number;
  weatherCode: number;
  description: string;
  icon: "sun" | "cloud" | "rain" | "snow" | "storm";
  location: string;
  recommendations: string[];
}

const codeToInfo = (code: number): { description: string; icon: WeatherData["icon"] } => {
  if (code === 0) return { description: "صافٍ ومشمس", icon: "sun" };
  if ([1, 2].includes(code)) return { description: "غائم جزئياً", icon: "sun" };
  if (code === 3) return { description: "غائم", icon: "cloud" };
  if ([45, 48].includes(code)) return { description: "ضباب", icon: "cloud" };
  if ([51, 53, 55, 56, 57].includes(code)) return { description: "رذاذ خفيف", icon: "rain" };
  if ([61, 63, 65, 66, 67, 80, 81, 82].includes(code)) return { description: "أمطار", icon: "rain" };
  if ([71, 73, 75, 77, 85, 86].includes(code)) return { description: "ثلوج", icon: "snow" };
  if ([95, 96, 99].includes(code)) return { description: "عواصف رعدية", icon: "storm" };
  return { description: "طقس معتدل", icon: "cloud" };
};

const buildRecommendations = (temp: number, humidity: number, precipitation: number, code: number): string[] => {
  const recs: string[] = [];

  if (precipitation > 60 || [61, 63, 65, 80, 81, 82, 95, 96, 99].includes(code)) {
    recs.push("🌧️ تجنب الري اليوم — هطول أمطار متوقع.");
    recs.push("🛡️ افحص نظام الصرف لمنع تجمع المياه حول الجذور.");
  } else if (temp >= 32) {
    recs.push("🔥 درجات حرارة مرتفعة — اروِ المحاصيل في الصباح الباكر أو بعد الغروب.");
    recs.push("🌿 استخدم التظليل أو الغطاء العضوي لحماية النباتات الحساسة.");
  } else if (temp <= 5) {
    recs.push("❄️ خطر الصقيع — قم بتغطية المحاصيل الحساسة ليلاً.");
  } else {
    recs.push("☀️ ظروف مناسبة للري في الصباح الباكر.");
  }

  if (humidity >= 80) {
    recs.push("💧 رطوبة مرتفعة — راقب ظهور الأمراض الفطرية كالبياض الدقيقي.");
  } else if (humidity <= 30) {
    recs.push("🏜️ رطوبة منخفضة — زد عدد مرات الري وراقب علامات الجفاف.");
  }

  if (temp >= 18 && temp <= 28 && precipitation < 30) {
    recs.push("🌱 ظروف مثالية للزراعة وعمليات التقليم.");
  }

  return recs.slice(0, 3);
};

export const useWeather = () => {
  const [data, setData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const fetchWeather = async (lat: number, lon: number, location: string) => {
      try {
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,precipitation,weather_code,wind_speed_10m&timezone=auto`;
        const res = await fetch(url);
        if (!res.ok) throw new Error("Weather fetch failed");
        const json = await res.json();
        const c = json.current;
        const info = codeToInfo(c.weather_code);
        if (cancelled) return;
        setData({
          temperature: Math.round(c.temperature_2m),
          humidity: Math.round(c.relative_humidity_2m),
          windSpeed: Math.round(c.wind_speed_10m),
          precipitation: Math.round((c.precipitation || 0) * 10),
          weatherCode: c.weather_code,
          description: info.description,
          icon: info.icon,
          location,
          recommendations: buildRecommendations(
            c.temperature_2m,
            c.relative_humidity_2m,
            (c.precipitation || 0) * 10,
            c.weather_code
          ),
        });
        setLoading(false);
      } catch (e) {
        if (cancelled) return;
        setError("تعذر جلب بيانات الطقس");
        setLoading(false);
      }
    };

    if (!navigator.geolocation) {
      // Default to Cairo
      fetchWeather(30.0444, 31.2357, "القاهرة");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => fetchWeather(pos.coords.latitude, pos.coords.longitude, "موقعك الحالي"),
      () => fetchWeather(30.0444, 31.2357, "القاهرة"),
      { timeout: 5000 }
    );

    return () => {
      cancelled = true;
    };
  }, []);

  return { data, loading, error };
};
