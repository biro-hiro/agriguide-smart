import { useNavigate } from "react-router-dom";

const sections = [
  {
    id: "crops",
    title: "المحاصيل",
    description: "دليل شامل للمحاصيل الموسمية",
    gradient: "gradient-primary",
    path: "/crops",
    image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=400&q=80",
  },
  {
    id: "hybrid",
    title: "اقتراح الهجين",
    description: "أفضل الأصناف لأرضك",
    gradient: "gradient-sky",
    path: "/hybrid",
    image: "https://images.unsplash.com/photo-1592982537447-6f2a6a0c7c18?w=400&q=80",
  },
  {
    id: "pests",
    title: "الأمراض والآفات",
    description: "تشخيص وعلاج المشاكل",
    gradient: "gradient-sunset",
    path: "/pests",
    image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&q=80",
  },
  {
    id: "calendar",
    title: "التقويم الزراعي",
    description: "مواعيد الزراعة والحصاد",
    gradient: "gradient-earth",
    path: "/calendar",
    image: "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?w=400&q=80",
  },
  {
    id: "tools",
    title: "الأدوات والمعدات",
    description: "دليل المعدات الزراعية",
    gradient: "gradient-primary",
    path: "/tools",
    image: "https://images.unsplash.com/photo-1622383563227-04401ab4e5ea?w=400&q=80",
  },
  {
    id: "environment",
    title: "نصائح بيئية",
    description: "زراعة مستدامة وصديقة للبيئة",
    gradient: "gradient-sky",
    path: "/environment",
    image: "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=400&q=80",
  },
  {
    id: "community",
    title: "مجتمع المزارعين",
    description: "شارك خبراتك واستفد",
    gradient: "gradient-earth",
    path: "/community",
    image: "https://images.unsplash.com/photo-1593113598332-cd288d649433?w=400&q=80",
  },
  {
    id: "tips",
    title: "نصائح سريعة",
    description: "معلومات مفيدة يومياً",
    gradient: "gradient-sunset",
    path: "/tips",
    image: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=400&q=80",
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
            className="card-agricultural text-right group overflow-hidden relative"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity">
              <img
                src={section.image}
                alt={section.title}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="relative z-10">
              <div className={`section-icon ${section.gradient} mb-4 group-hover:scale-110`}>
                <span className="text-2xl">
                  {section.id === "crops" ? "🌾" : section.id === "hybrid" ? "🧬" : section.id === "pests" ? "🐛" : section.id === "calendar" ? "📅" : section.id === "tools" ? "🔧" : section.id === "environment" ? "🌳" : section.id === "community" ? "👥" : "💡"}
                </span>
              </div>
              <h4 className="font-bold text-foreground mb-1">{section.title}</h4>
              <p className="text-xs text-muted-foreground">{section.description}</p>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
};

export default SectionGrid;
