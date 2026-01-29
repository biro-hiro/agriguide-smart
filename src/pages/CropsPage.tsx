import { useState } from "react";
import { ArrowRight, Droplets, Sun, Thermometer, Sprout, Scissors, Package } from "lucide-react";
import Header from "@/components/layout/Header";
import BottomNav from "@/components/layout/BottomNav";

const categories = [
  { id: "all", name: "الكل" },
  { id: "grains", name: "حبوب" },
  { id: "vegetables", name: "خضروات" },
  { id: "fruits", name: "فواكه" },
  { id: "herbs", name: "عطرية وطبية" },
  { id: "legumes", name: "بقوليات" },
];

const seasons = [
  { id: "all", name: "كل المواسم" },
  { id: "spring", name: "الربيع" },
  { id: "summer", name: "الصيف" },
  { id: "autumn", name: "الخريف" },
  { id: "winter", name: "الشتاء" },
];

const crops = [
  {
    id: 1,
    name: "الطماطم",
    emoji: "🍅",
    category: "vegetables",
    season: "spring",
    soil: "طينية خصبة",
    water: "معتدل",
    sun: "6-8 ساعات",
    temp: "20-30°C",
    description: "محصول صيفي شهير، سهل الزراعة ومثمر للغاية.",
  },
  {
    id: 2,
    name: "القمح",
    emoji: "🌾",
    category: "grains",
    season: "winter",
    soil: "طينية",
    water: "قليل",
    sun: "8+ ساعات",
    temp: "15-25°C",
    description: "محصول استراتيجي أساسي، يُزرع في الشتاء.",
  },
  {
    id: 3,
    name: "الخيار",
    emoji: "🥒",
    category: "vegetables",
    season: "spring",
    soil: "رملية طينية",
    water: "كثير",
    sun: "6 ساعات",
    temp: "20-30°C",
    description: "خضار منعش سريع النمو.",
  },
  {
    id: 4,
    name: "البرتقال",
    emoji: "🍊",
    category: "fruits",
    season: "winter",
    soil: "طينية رملية",
    water: "معتدل",
    sun: "8 ساعات",
    temp: "15-30°C",
    description: "فاكهة حمضية غنية بفيتامين C.",
  },
  {
    id: 5,
    name: "النعناع",
    emoji: "🌿",
    category: "herbs",
    season: "spring",
    soil: "رطبة خصبة",
    water: "كثير",
    sun: "4-6 ساعات",
    temp: "18-26°C",
    description: "عشب عطري منعش متعدد الاستخدامات.",
  },
  {
    id: 6,
    name: "الفول",
    emoji: "🫘",
    category: "legumes",
    season: "autumn",
    soil: "طينية",
    water: "معتدل",
    sun: "6 ساعات",
    temp: "12-20°C",
    description: "بقولية غنية بالبروتين.",
  },
  {
    id: 7,
    name: "الباذنجان",
    emoji: "🍆",
    category: "vegetables",
    season: "summer",
    soil: "طينية رملية",
    water: "معتدل",
    sun: "6-8 ساعات",
    temp: "22-30°C",
    description: "خضار صيفي لذيذ ومغذي.",
  },
  {
    id: 8,
    name: "التفاح",
    emoji: "🍎",
    category: "fruits",
    season: "autumn",
    soil: "طينية جيدة الصرف",
    water: "معتدل",
    sun: "8 ساعات",
    temp: "10-25°C",
    description: "فاكهة شعبية تنمو في المناطق المعتدلة.",
  },
];

const CropsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedSeason, setSelectedSeason] = useState("all");
  const [selectedCrop, setSelectedCrop] = useState<typeof crops[0] | null>(null);

  const filteredCrops = crops.filter((crop) => {
    const categoryMatch = selectedCategory === "all" || crop.category === selectedCategory;
    const seasonMatch = selectedSeason === "all" || crop.season === selectedSeason;
    return categoryMatch && seasonMatch;
  });

  return (
    <div className="min-h-screen bg-background pb-20">
      <Header />
      <main className="max-w-6xl mx-auto px-4 py-6">
        {/* Page Title */}
        <div className="flex items-center gap-3 mb-6">
          <button onClick={() => window.history.back()} className="p-2 rounded-xl hover:bg-muted">
            <ArrowRight className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-foreground">المحاصيل</h1>
            <p className="text-muted-foreground text-sm">اختر التصنيف والموسم لاستكشاف المحاصيل</p>
          </div>
        </div>

        {/* Category Filters */}
        <div className="mb-4">
          <p className="text-sm font-medium text-muted-foreground mb-2">التصنيف</p>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`season-badge whitespace-nowrap ${
                  selectedCategory === cat.id
                    ? "gradient-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Season Filters */}
        <div className="mb-6">
          <p className="text-sm font-medium text-muted-foreground mb-2">الموسم</p>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {seasons.map((season) => (
              <button
                key={season.id}
                onClick={() => setSelectedSeason(season.id)}
                className={`season-badge whitespace-nowrap ${
                  selectedSeason === season.id
                    ? "gradient-earth text-secondary-foreground"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {season.name}
              </button>
            ))}
          </div>
        </div>

        {/* Crops Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredCrops.map((crop) => (
            <button
              key={crop.id}
              onClick={() => setSelectedCrop(crop)}
              className="card-agricultural text-center group"
            >
              <div className="text-5xl mb-3 group-hover:scale-110 transition-transform">
                {crop.emoji}
              </div>
              <h4 className="font-bold text-foreground">{crop.name}</h4>
              <p className="text-xs text-muted-foreground mt-1">{crop.description}</p>
            </button>
          ))}
        </div>

        {filteredCrops.length === 0 && (
          <div className="text-center py-12">
            <p className="text-4xl mb-4">🌱</p>
            <p className="text-muted-foreground">لا توجد محاصيل بهذه المعايير</p>
          </div>
        )}

        {/* Crop Detail Modal */}
        {selectedCrop && (
          <div className="fixed inset-0 z-50 bg-foreground/50 flex items-end sm:items-center justify-center p-4">
            <div className="bg-card rounded-t-3xl sm:rounded-3xl w-full max-w-lg max-h-[80vh] overflow-y-auto animate-scale-in">
              <div className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center gap-4">
                    <span className="text-6xl">{selectedCrop.emoji}</span>
                    <div>
                      <h2 className="text-2xl font-bold text-foreground">{selectedCrop.name}</h2>
                      <p className="text-muted-foreground">{selectedCrop.description}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedCrop(null)}
                    className="p-2 rounded-full hover:bg-muted text-2xl"
                  >
                    ×
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="card-agricultural !p-4 flex items-center gap-3">
                    <div className="section-icon !w-10 !h-10 bg-amber-100 text-amber-600">
                      <Sprout className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">التربة</p>
                      <p className="font-medium text-foreground text-sm">{selectedCrop.soil}</p>
                    </div>
                  </div>
                  <div className="card-agricultural !p-4 flex items-center gap-3">
                    <div className="section-icon !w-10 !h-10 bg-blue-100 text-blue-600">
                      <Droplets className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">الري</p>
                      <p className="font-medium text-foreground text-sm">{selectedCrop.water}</p>
                    </div>
                  </div>
                  <div className="card-agricultural !p-4 flex items-center gap-3">
                    <div className="section-icon !w-10 !h-10 bg-yellow-100 text-yellow-600">
                      <Sun className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">الشمس</p>
                      <p className="font-medium text-foreground text-sm">{selectedCrop.sun}</p>
                    </div>
                  </div>
                  <div className="card-agricultural !p-4 flex items-center gap-3">
                    <div className="section-icon !w-10 !h-10 bg-red-100 text-red-600">
                      <Thermometer className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">الحرارة</p>
                      <p className="font-medium text-foreground text-sm">{selectedCrop.temp}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="card-agricultural !p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Scissors className="w-5 h-5 text-primary" />
                      <h4 className="font-bold text-foreground">طريقة الزراعة</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      يُزرع في التربة المناسبة مع توفير الري والتسميد المنتظم. تأكد من تعريض النبات للشمس الكافية.
                    </p>
                  </div>
                  <div className="card-agricultural !p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Package className="w-5 h-5 text-primary" />
                      <h4 className="font-bold text-foreground">الحصاد والتخزين</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      يُحصد عند النضج الكامل ويُخزن في مكان جاف وبارد للحفاظ على جودته.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
      <BottomNav />
    </div>
  );
};

export default CropsPage;
