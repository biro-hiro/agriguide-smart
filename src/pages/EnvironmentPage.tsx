import { ArrowRight, Leaf, Droplets, Recycle, Bug, TreeDeciduous, Wind } from "lucide-react";
import Header from "@/components/layout/Header";
import BottomNav from "@/components/layout/BottomNav";

const tips = [
  {
    id: 1,
    title: "تدوير المحاصيل",
    icon: Recycle,
    color: "bg-green-100 text-green-600",
    description: "تناوب زراعة المحاصيل المختلفة في نفس الأرض لتحسين خصوبة التربة ومكافحة الآفات طبيعياً.",
    benefits: [
      "تحسين بنية التربة",
      "تقليل الأمراض",
      "زيادة الإنتاجية",
      "توازن المغذيات",
    ],
  },
  {
    id: 2,
    title: "الحفاظ على المياه",
    icon: Droplets,
    color: "bg-blue-100 text-blue-600",
    description: "استخدام تقنيات الري الحديثة وحصاد مياه الأمطار للحفاظ على الموارد المائية.",
    benefits: [
      "توفير 40-60% من المياه",
      "تقليل التكاليف",
      "حماية المياه الجوفية",
      "استدامة طويلة المدى",
    ],
  },
  {
    id: 3,
    title: "السماد العضوي",
    icon: Leaf,
    color: "bg-amber-100 text-amber-600",
    description: "استخدام المخلفات الزراعية والحيوانية لإنتاج سماد طبيعي غني بالمغذيات.",
    benefits: [
      "تحسين خصوبة التربة",
      "تقليل التلوث",
      "توفير تكاليف الأسمدة",
      "غذاء صحي",
    ],
  },
  {
    id: 4,
    title: "المكافحة الحيوية",
    icon: Bug,
    color: "bg-purple-100 text-purple-600",
    description: "استخدام الأعداء الطبيعيين للآفات بدلاً من المبيدات الكيميائية الضارة.",
    benefits: [
      "حماية البيئة",
      "سلامة الغذاء",
      "توازن النظام البيئي",
      "تقليل المقاومة",
    ],
  },
  {
    id: 5,
    title: "التشجير والمصدات",
    icon: TreeDeciduous,
    color: "bg-emerald-100 text-emerald-600",
    description: "زراعة الأشجار حول المزرعة لحماية المحاصيل من الرياح وتحسين المناخ المحلي.",
    benefits: [
      "حماية من الرياح",
      "تظليل طبيعي",
      "تحسين التربة",
      "موطن للحشرات النافعة",
    ],
  },
  {
    id: 6,
    title: "الزراعة بدون حرث",
    icon: Wind,
    color: "bg-teal-100 text-teal-600",
    description: "تقنية زراعية تحافظ على بنية التربة وتقلل من التعرية والانبعاثات.",
    benefits: [
      "حماية التربة",
      "توفير الوقود",
      "زيادة المادة العضوية",
      "تخزين الكربون",
    ],
  },
];

const EnvironmentPage = () => {
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
            <h1 className="text-2xl font-bold text-foreground">نصائح بيئية</h1>
            <p className="text-muted-foreground text-sm">زراعة مستدامة وصديقة للبيئة</p>
          </div>
        </div>

        {/* Introduction Card */}
        <div className="card-agricultural mb-6 gradient-nature text-primary-foreground">
          <h3 className="font-bold text-xl mb-2">🌍 الزراعة المستدامة</h3>
          <p className="text-primary-foreground/90 text-sm leading-relaxed">
            الزراعة المستدامة هي نهج متكامل يهدف إلى إنتاج غذاء صحي مع الحفاظ على البيئة للأجيال القادمة. 
            تطبيق هذه الممارسات يساعد في حماية التربة والمياه والتنوع الحيوي.
          </p>
        </div>

        {/* Tips Grid */}
        <div className="grid gap-4">
          {tips.map((tip, index) => (
            <div
              key={tip.id}
              className="card-agricultural animate-slide-in-right"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-start gap-4">
                <div className={`section-icon !w-14 !h-14 flex-shrink-0 ${tip.color}`}>
                  <tip.icon className="w-7 h-7" />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-foreground text-lg mb-2">{tip.title}</h4>
                  <p className="text-sm text-muted-foreground mb-4">{tip.description}</p>
                  
                  <div>
                    <p className="text-sm font-medium text-foreground mb-2">الفوائد:</p>
                    <div className="grid grid-cols-2 gap-2">
                      {tip.benefits.map((benefit) => (
                        <span
                          key={benefit}
                          className="text-xs bg-muted text-muted-foreground px-3 py-1.5 rounded-lg flex items-center gap-1"
                        >
                          ✓ {benefit}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="card-agricultural mt-6 text-center">
          <h3 className="font-bold text-foreground text-lg mb-2">🌱 ابدأ اليوم</h3>
          <p className="text-sm text-muted-foreground mb-4">
            كل خطوة صغيرة نحو الزراعة المستدامة تحدث فرقاً كبيراً. ابدأ بتطبيق نصيحة واحدة اليوم!
          </p>
          <button className="btn-primary-gradient">
            شارك تجربتك مع المجتمع
          </button>
        </div>
      </main>
      <BottomNav />
    </div>
  );
};

export default EnvironmentPage;
