import { ChevronLeft, Snowflake, Sun, Flower2, Leaf } from "lucide-react";
import { useState } from "react";

const seasons = [
  { id: "spring", name: "الربيع", icon: Flower2, color: "bg-green-100 text-green-700" },
  { id: "summer", name: "الصيف", icon: Sun, color: "bg-amber-100 text-amber-700" },
  { id: "autumn", name: "الخريف", icon: Leaf, color: "bg-orange-100 text-orange-700" },
  { id: "winter", name: "الشتاء", icon: Snowflake, color: "bg-blue-100 text-blue-700" },
];

const cropData = {
  spring: [
    { name: "الطماطم", emoji: "🍅", type: "خضروات" },
    { name: "الفلفل", emoji: "🌶️", type: "خضروات" },
    { name: "الخيار", emoji: "🥒", type: "خضروات" },
    { name: "البطيخ", emoji: "🍉", type: "فواكه" },
    { name: "الكوسة", emoji: "🥒", type: "خضروات" },
  ],
  summer: [
    { name: "الذرة", emoji: "🌽", type: "حبوب" },
    { name: "الباذنجان", emoji: "🍆", type: "خضروات" },
    { name: "العنب", emoji: "🍇", type: "فواكه" },
    { name: "البامية", emoji: "🥬", type: "خضروات" },
    { name: "التين", emoji: "🫐", type: "فواكه" },
  ],
  autumn: [
    { name: "البصل", emoji: "🧅", type: "خضروات" },
    { name: "الثوم", emoji: "🧄", type: "خضروات" },
    { name: "السبانخ", emoji: "🥬", type: "خضروات" },
    { name: "الجزر", emoji: "🥕", type: "خضروات" },
    { name: "الفجل", emoji: "🌰", type: "خضروات" },
  ],
  winter: [
    { name: "القمح", emoji: "🌾", type: "حبوب" },
    { name: "الشعير", emoji: "🌾", type: "حبوب" },
    { name: "البروكلي", emoji: "🥦", type: "خضروات" },
    { name: "الخس", emoji: "🥬", type: "خضروات" },
    { name: "البازلاء", emoji: "🫛", type: "بقوليات" },
  ],
};

const SeasonalCrops = () => {
  const [activeSeason, setActiveSeason] = useState<keyof typeof cropData>("spring");

  return (
    <section className="px-4 py-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-foreground">المحاصيل الموسمية</h3>
        <button className="flex items-center gap-1 text-primary text-sm font-medium hover:underline">
          عرض الكل
          <ChevronLeft className="w-4 h-4" />
        </button>
      </div>

      {/* Season Tabs */}
      <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
        {seasons.map((season) => (
          <button
            key={season.id}
            onClick={() => setActiveSeason(season.id as keyof typeof cropData)}
            className={`season-badge flex items-center gap-2 whitespace-nowrap ${
              activeSeason === season.id
                ? "gradient-primary text-primary-foreground"
                : season.color
            }`}
          >
            <season.icon className="w-4 h-4" />
            {season.name}
          </button>
        ))}
      </div>

      {/* Crops Horizontal Scroll */}
      <div className="flex gap-3 overflow-x-auto pb-4 -mx-4 px-4">
        {cropData[activeSeason].map((crop, index) => (
          <div
            key={crop.name}
            className="card-agricultural min-w-[140px] flex-shrink-0 text-center animate-scale-in"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <div className="text-4xl mb-3">{crop.emoji}</div>
            <h4 className="font-bold text-foreground">{crop.name}</h4>
            <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
              {crop.type}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SeasonalCrops;
