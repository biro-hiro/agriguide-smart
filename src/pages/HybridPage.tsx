import { useState } from "react";
import { ArrowRight, MapPin, Thermometer, Droplets, Leaf, ChevronDown } from "lucide-react";
import Header from "@/components/layout/Header";
import BottomNav from "@/components/layout/BottomNav";

const soilTypes = [
  { id: "clay", name: "طينية" },
  { id: "sandy", name: "رملية" },
  { id: "loamy", name: "طمية" },
  { id: "silty", name: "غرينية" },
];

const climates = [
  { id: "mediterranean", name: "متوسطي" },
  { id: "arid", name: "جاف" },
  { id: "semi-arid", name: "شبه جاف" },
  { id: "tropical", name: "استوائي" },
];

const seasons = [
  { id: "spring", name: "الربيع" },
  { id: "summer", name: "الصيف" },
  { id: "autumn", name: "الخريف" },
  { id: "winter", name: "الشتاء" },
];

const hybridSuggestions = [
  {
    name: "طماطم هجين GS-12",
    emoji: "🍅",
    description: "صنف مقاوم للأمراض، إنتاجية عالية",
    origin: "هولندا",
    yield: "8-12 كجم/نبتة",
    features: ["مقاوم للفيوزاريوم", "ثمار متوسطة الحجم", "صلاحية تخزين طويلة"],
  },
  {
    name: "خيار هجين بيتا ألفا",
    emoji: "🥒",
    description: "مناسب للزراعة المحمية والمكشوفة",
    origin: "إسرائيل",
    yield: "15-20 كجم/نبتة",
    features: ["ثمار طويلة", "لون أخضر داكن", "مقاوم للبياض الدقيقي"],
  },
  {
    name: "فلفل هجين كاليفورنيا",
    emoji: "🌶️",
    description: "ثمار كبيرة ومتجانسة اللون",
    origin: "أمريكا",
    yield: "5-8 كجم/نبتة",
    features: ["ألوان متعددة", "جدار سميك", "طعم حلو"],
  },
];

const HybridPage = () => {
  const [formData, setFormData] = useState({
    soilType: "",
    climate: "",
    season: "",
    area: "",
    previousCrop: "",
  });
  const [showResults, setShowResults] = useState(false);

  const handleSubmit = () => {
    if (formData.soilType && formData.climate && formData.season) {
      setShowResults(true);
    }
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <Header />
      <main className="max-w-3xl mx-auto px-4 py-6">
        {/* Page Title */}
        <div className="flex items-center gap-3 mb-6">
          <button onClick={() => window.history.back()} className="p-2 rounded-xl hover:bg-muted">
            <ArrowRight className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-foreground">اقتراح الهجين</h1>
            <p className="text-muted-foreground text-sm">أدخل بياناتك للحصول على أفضل الأصناف</p>
          </div>
        </div>

        {/* Input Form */}
        <div className="card-agricultural mb-6">
          <h3 className="font-bold text-foreground mb-4 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-primary" />
            بيانات المزرعة
          </h3>

          <div className="space-y-4">
            {/* Soil Type */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">نوع التربة</label>
              <div className="relative">
                <select
                  value={formData.soilType}
                  onChange={(e) => setFormData({ ...formData, soilType: e.target.value })}
                  className="input-agricultural appearance-none cursor-pointer"
                >
                  <option value="">اختر نوع التربة</option>
                  {soilTypes.map((soil) => (
                    <option key={soil.id} value={soil.id}>{soil.name}</option>
                  ))}
                </select>
                <ChevronDown className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
              </div>
            </div>

            {/* Climate */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">المناخ</label>
              <div className="relative">
                <select
                  value={formData.climate}
                  onChange={(e) => setFormData({ ...formData, climate: e.target.value })}
                  className="input-agricultural appearance-none cursor-pointer"
                >
                  <option value="">اختر نوع المناخ</option>
                  {climates.map((climate) => (
                    <option key={climate.id} value={climate.id}>{climate.name}</option>
                  ))}
                </select>
                <ChevronDown className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
              </div>
            </div>

            {/* Season */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">موسم الزراعة</label>
              <div className="flex gap-2 flex-wrap">
                {seasons.map((season) => (
                  <button
                    key={season.id}
                    onClick={() => setFormData({ ...formData, season: season.id })}
                    className={`season-badge ${
                      formData.season === season.id
                        ? "gradient-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {season.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Area */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">المساحة (فدان)</label>
              <input
                type="number"
                value={formData.area}
                onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                placeholder="مثال: 5"
                className="input-agricultural"
              />
            </div>

            {/* Previous Crop */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">المحصول السابق (اختياري)</label>
              <input
                type="text"
                value={formData.previousCrop}
                onChange={(e) => setFormData({ ...formData, previousCrop: e.target.value })}
                placeholder="مثال: القمح"
                className="input-agricultural"
              />
            </div>

            <button
              onClick={handleSubmit}
              className="btn-primary-gradient w-full mt-4"
            >
              احصل على الاقتراحات
            </button>
          </div>
        </div>

        {/* Results */}
        {showResults && (
          <div className="animate-fade-in">
            <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
              <Leaf className="w-5 h-5 text-primary" />
              الهجين المقترح لمزرعتك
            </h3>

            <div className="space-y-4">
              {hybridSuggestions.map((hybrid, index) => (
                <div
                  key={hybrid.name}
                  className="card-agricultural animate-slide-in-right"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-start gap-4 mb-4">
                    <span className="text-5xl">{hybrid.emoji}</span>
                    <div className="flex-1">
                      <h4 className="font-bold text-foreground text-lg">{hybrid.name}</h4>
                      <p className="text-sm text-muted-foreground">{hybrid.description}</p>
                      <div className="flex gap-4 mt-2">
                        <span className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded-full">
                          🌍 {hybrid.origin}
                        </span>
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                          📊 {hybrid.yield}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-foreground mb-2">المميزات:</p>
                    <div className="flex gap-2 flex-wrap">
                      {hybrid.features.map((feature) => (
                        <span
                          key={feature}
                          className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full"
                        >
                          ✓ {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
      <BottomNav />
    </div>
  );
};

export default HybridPage;
