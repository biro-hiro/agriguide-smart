import { Droplets, Sun, ThermometerSun, Wind } from "lucide-react";

const tips = [
  {
    id: 1,
    icon: Droplets,
    title: "نصيحة الري",
    content: "اسقِ نباتاتك في الصباح الباكر لتقليل التبخر وامتصاص أفضل للماء.",
    color: "bg-blue-100 text-blue-600",
  },
  {
    id: 2,
    icon: Sun,
    title: "التعرض للشمس",
    content: "معظم الخضروات تحتاج 6-8 ساعات من أشعة الشمس المباشرة يومياً.",
    color: "bg-amber-100 text-amber-600",
  },
  {
    id: 3,
    icon: ThermometerSun,
    title: "درجة الحرارة",
    content: "راقب درجات الحرارة الليلية، فالصقيع قد يضر بالنباتات الحساسة.",
    color: "bg-red-100 text-red-600",
  },
  {
    id: 4,
    icon: Wind,
    title: "التهوية",
    content: "وفّر مسافات كافية بين النباتات لتحسين التهوية ومنع الأمراض الفطرية.",
    color: "bg-teal-100 text-teal-600",
  },
];

const QuickTips = () => {
  return (
    <section className="px-4 py-6 mb-20">
      <h3 className="text-xl font-bold text-foreground mb-4">نصائح اليوم</h3>
      <div className="grid gap-3">
        {tips.map((tip, index) => (
          <div
            key={tip.id}
            className="card-agricultural flex gap-4 items-start animate-slide-in-right"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className={`section-icon !w-12 !h-12 flex-shrink-0 ${tip.color}`}>
              <tip.icon className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-foreground mb-1">{tip.title}</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {tip.content}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default QuickTips;
