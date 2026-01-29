import { ArrowRight, Wrench, DollarSign, Settings, Info } from "lucide-react";
import Header from "@/components/layout/Header";
import BottomNav from "@/components/layout/BottomNav";
import { useState } from "react";

const tools = [
  {
    id: 1,
    name: "المحراث",
    emoji: "🔧",
    category: "تحضير التربة",
    description: "أداة أساسية لتحضير التربة وتفتيتها قبل الزراعة",
    usage: "يستخدم لقلب التربة وتهويتها وخلط المواد العضوية",
    cost: "1500 - 5000 ريال",
    maintenance: "تنظيف بعد كل استخدام، تشحيم الأجزاء المتحركة، فحص دوري للشفرات",
  },
  {
    id: 2,
    name: "المنجل",
    emoji: "🌾",
    category: "الحصاد",
    description: "أداة يدوية تقليدية لحصاد المحاصيل",
    usage: "قطع السيقان والأعشاب والحبوب الناضجة",
    cost: "50 - 150 ريال",
    maintenance: "شحذ الشفرة بانتظام، تخزين في مكان جاف",
  },
  {
    id: 3,
    name: "نظام الري بالتنقيط",
    emoji: "💧",
    category: "الري",
    description: "نظام ري حديث يوفر المياه ويوصلها مباشرة للجذور",
    usage: "ري المحاصيل بكفاءة عالية مع توفير 40-60% من المياه",
    cost: "500 - 3000 ريال للفدان",
    maintenance: "فحص الانسدادات، تنظيف الفلاتر، فحص الضغط",
  },
  {
    id: 4,
    name: "الرشاش الزراعي",
    emoji: "🔫",
    category: "المكافحة",
    description: "جهاز لرش المبيدات والأسمدة السائلة",
    usage: "توزيع المبيدات والأسمدة بشكل متساوي على المحاصيل",
    cost: "200 - 800 ريال",
    maintenance: "تنظيف بعد كل استخدام، فحص الخراطيم، تغيير الفوهات",
  },
  {
    id: 5,
    name: "الجرار الزراعي",
    emoji: "🚜",
    category: "النقل والحرث",
    description: "آلة متعددة الاستخدامات للعمليات الزراعية",
    usage: "الحرث، النقل، سحب المعدات الزراعية",
    cost: "50,000 - 200,000 ريال",
    maintenance: "صيانة دورية للمحرك، تغيير الزيت، فحص الإطارات",
  },
  {
    id: 6,
    name: "المجرفة",
    emoji: "⛏️",
    category: "تحضير التربة",
    description: "أداة يدوية للحفر وتحريك التربة",
    usage: "حفر الحفر، نقل التربة، خلط السماد",
    cost: "30 - 100 ريال",
    maintenance: "تنظيف وتجفيف بعد الاستخدام، تزييت المعدن",
  },
];

const categories = [
  { id: "all", name: "الكل" },
  { id: "تحضير التربة", name: "تحضير التربة" },
  { id: "الحصاد", name: "الحصاد" },
  { id: "الري", name: "الري" },
  { id: "المكافحة", name: "المكافحة" },
  { id: "النقل والحرث", name: "النقل والحرث" },
];

const ToolsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedTool, setSelectedTool] = useState<typeof tools[0] | null>(null);

  const filteredTools = tools.filter(
    (tool) => selectedCategory === "all" || tool.category === selectedCategory
  );

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
            <h1 className="text-2xl font-bold text-foreground">الأدوات والمعدات</h1>
            <p className="text-muted-foreground text-sm">دليل شامل للمعدات الزراعية</p>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex gap-2 overflow-x-auto pb-4 mb-6">
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

        {/* Tools Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTools.map((tool) => (
            <button
              key={tool.id}
              onClick={() => setSelectedTool(tool)}
              className="card-agricultural text-right"
            >
              <div className="flex items-center gap-4">
                <span className="text-5xl">{tool.emoji}</span>
                <div>
                  <h4 className="font-bold text-foreground">{tool.name}</h4>
                  <span className="text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded-full">
                    {tool.category}
                  </span>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mt-3">{tool.description}</p>
            </button>
          ))}
        </div>

        {/* Tool Detail Modal */}
        {selectedTool && (
          <div className="fixed inset-0 z-50 bg-foreground/50 flex items-end sm:items-center justify-center p-4">
            <div className="bg-card rounded-t-3xl sm:rounded-3xl w-full max-w-lg max-h-[80vh] overflow-y-auto animate-scale-in">
              <div className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center gap-4">
                    <span className="text-6xl">{selectedTool.emoji}</span>
                    <div>
                      <h2 className="text-2xl font-bold text-foreground">{selectedTool.name}</h2>
                      <span className="text-sm bg-muted text-muted-foreground px-3 py-1 rounded-full">
                        {selectedTool.category}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedTool(null)}
                    className="p-2 rounded-full hover:bg-muted text-2xl"
                  >
                    ×
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="card-agricultural !p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Info className="w-5 h-5 text-primary" />
                      <h4 className="font-bold text-foreground">الوصف</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">{selectedTool.description}</p>
                  </div>

                  <div className="card-agricultural !p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Wrench className="w-5 h-5 text-secondary" />
                      <h4 className="font-bold text-foreground">طريقة الاستخدام</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">{selectedTool.usage}</p>
                  </div>

                  <div className="card-agricultural !p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <DollarSign className="w-5 h-5 text-gold" />
                      <h4 className="font-bold text-foreground">التكلفة التقريبية</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">{selectedTool.cost}</p>
                  </div>

                  <div className="card-agricultural !p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Settings className="w-5 h-5 text-accent" />
                      <h4 className="font-bold text-foreground">الصيانة</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">{selectedTool.maintenance}</p>
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

export default ToolsPage;
