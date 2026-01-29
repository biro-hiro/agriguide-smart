import { useNavigate } from "react-router-dom";
import { Leaf, Dna, Bug, Calendar, Wrench, TreeDeciduous, Users, Lightbulb } from "lucide-react";

const sections = [
  {
    id: "crops",
    title: "المحاصيل",
    description: "دليل شامل للمحاصيل الموسمية",
    icon: Leaf,
    gradient: "gradient-primary",
    path: "/crops",
  },
  {
    id: "hybrid",
    title: "اقتراح الهجين",
    description: "أفضل الأصناف لأرضك",
    icon: Dna,
    gradient: "gradient-sky",
    path: "/hybrid",
  },
  {
    id: "pests",
    title: "الأمراض والآفات",
    description: "تشخيص وعلاج المشاكل",
    icon: Bug,
    gradient: "gradient-sunset",
    path: "/pests",
  },
  {
    id: "calendar",
    title: "التقويم الزراعي",
    description: "مواعيد الزراعة والحصاد",
    icon: Calendar,
    gradient: "gradient-earth",
    path: "/calendar",
  },
  {
    id: "tools",
    title: "الأدوات والمعدات",
    description: "دليل المعدات الزراعية",
    icon: Wrench,
    gradient: "gradient-primary",
    path: "/tools",
  },
  {
    id: "environment",
    title: "نصائح بيئية",
    description: "زراعة مستدامة وصديقة للبيئة",
    icon: TreeDeciduous,
    gradient: "gradient-sky",
    path: "/environment",
  },
  {
    id: "community",
    title: "مجتمع المزارعين",
    description: "شارك خبراتك واستفد",
    icon: Users,
    gradient: "gradient-earth",
    path: "/community",
  },
  {
    id: "tips",
    title: "نصائح سريعة",
    description: "معلومات مفيدة يومياً",
    icon: Lightbulb,
    gradient: "gradient-sunset",
    path: "/tips",
  },
];

const SectionGrid = () => {
  const navigate = useNavigate();

  return (
    <section className="px-4 py-6">
      <h3 className="text-xl font-bold text-foreground mb-4">استكشف الأقسام</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {sections.map((section, index) => (
          <button
            key={section.id}
            onClick={() => navigate(section.path)}
            className="card-agricultural text-right group"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <div className={`section-icon ${section.gradient} mb-4 group-hover:scale-110`}>
              <section.icon className="w-7 h-7 text-primary-foreground" />
            </div>
            <h4 className="font-bold text-foreground mb-1">{section.title}</h4>
            <p className="text-xs text-muted-foreground">{section.description}</p>
          </button>
        ))}
      </div>
    </section>
  );
};

export default SectionGrid;
