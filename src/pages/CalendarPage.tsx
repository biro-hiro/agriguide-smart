import { useState } from "react";
import { ArrowRight, ChevronLeft, ChevronRight, Droplets, Scissors, Sprout, Wheat } from "lucide-react";
import Header from "@/components/layout/Header";
import BottomNav from "@/components/layout/BottomNav";

const months = [
  "يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو",
  "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"
];

const calendarEvents = {
  0: [ // يناير
    { type: "planting", crop: "البصل", icon: Sprout },
    { type: "watering", crop: "القمح", icon: Droplets },
    { type: "harvest", crop: "البرتقال", icon: Wheat },
  ],
  1: [ // فبراير
    { type: "planting", crop: "الفول", icon: Sprout },
    { type: "pruning", crop: "العنب", icon: Scissors },
    { type: "watering", crop: "الخضروات الشتوية", icon: Droplets },
  ],
  2: [ // مارس
    { type: "planting", crop: "الطماطم", icon: Sprout },
    { type: "planting", crop: "الخيار", icon: Sprout },
    { type: "harvest", crop: "الفراولة", icon: Wheat },
  ],
  3: [ // أبريل
    { type: "planting", crop: "الباذنجان", icon: Sprout },
    { type: "watering", crop: "البطيخ", icon: Droplets },
    { type: "planting", crop: "الكوسة", icon: Sprout },
  ],
  4: [ // مايو
    { type: "harvest", crop: "الفول", icon: Wheat },
    { type: "planting", crop: "الذرة", icon: Sprout },
    { type: "watering", crop: "الخضروات الصيفية", icon: Droplets },
  ],
  5: [ // يونيو
    { type: "harvest", crop: "القمح", icon: Wheat },
    { type: "harvest", crop: "الشعير", icon: Wheat },
    { type: "watering", crop: "الطماطم", icon: Droplets },
  ],
  6: [ // يوليو
    { type: "harvest", crop: "البطيخ", icon: Wheat },
    { type: "harvest", crop: "الشمام", icon: Wheat },
    { type: "watering", crop: "أشجار الفاكهة", icon: Droplets },
  ],
  7: [ // أغسطس
    { type: "harvest", crop: "العنب", icon: Wheat },
    { type: "planting", crop: "الطماطم الخريفية", icon: Sprout },
    { type: "pruning", crop: "أشجار الزيتون", icon: Scissors },
  ],
  8: [ // سبتمبر
    { type: "planting", crop: "البصل", icon: Sprout },
    { type: "planting", crop: "الثوم", icon: Sprout },
    { type: "harvest", crop: "التمر", icon: Wheat },
  ],
  9: [ // أكتوبر
    { type: "planting", crop: "القمح", icon: Sprout },
    { type: "planting", crop: "الشعير", icon: Sprout },
    { type: "harvest", crop: "الزيتون", icon: Wheat },
  ],
  10: [ // نوفمبر
    { type: "planting", crop: "الفول", icon: Sprout },
    { type: "planting", crop: "البازلاء", icon: Sprout },
    { type: "watering", crop: "المحاصيل الشتوية", icon: Droplets },
  ],
  11: [ // ديسمبر
    { type: "harvest", crop: "البرتقال", icon: Wheat },
    { type: "pruning", crop: "أشجار الفاكهة", icon: Scissors },
    { type: "watering", crop: "الخضروات الورقية", icon: Droplets },
  ],
};

const eventTypeLabels: Record<string, { label: string; color: string }> = {
  planting: { label: "زراعة", color: "bg-green-100 text-green-700 border-green-300" },
  harvest: { label: "حصاد", color: "bg-amber-100 text-amber-700 border-amber-300" },
  watering: { label: "ري", color: "bg-blue-100 text-blue-700 border-blue-300" },
  pruning: { label: "تقليم", color: "bg-purple-100 text-purple-700 border-purple-300" },
};

const CalendarPage = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());

  const goToPrevMonth = () => {
    setCurrentMonth((prev) => (prev === 0 ? 11 : prev - 1));
  };

  const goToNextMonth = () => {
    setCurrentMonth((prev) => (prev === 11 ? 0 : prev + 1));
  };

  const events = calendarEvents[currentMonth as keyof typeof calendarEvents] || [];

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
            <h1 className="text-2xl font-bold text-foreground">التقويم الزراعي</h1>
            <p className="text-muted-foreground text-sm">مواعيد الزراعة والحصاد والري</p>
          </div>
        </div>

        {/* Month Selector */}
        <div className="card-agricultural mb-6">
          <div className="flex items-center justify-between">
            <button
              onClick={goToNextMonth}
              className="p-3 rounded-xl hover:bg-muted transition-colors"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
            <div className="text-center">
              <h2 className="text-2xl font-bold text-foreground">{months[currentMonth]}</h2>
              <p className="text-muted-foreground text-sm">2024</p>
            </div>
            <button
              onClick={goToPrevMonth}
              className="p-3 rounded-xl hover:bg-muted transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Month Quick Nav */}
        <div className="flex gap-2 overflow-x-auto pb-4 mb-6">
          {months.map((month, index) => (
            <button
              key={month}
              onClick={() => setCurrentMonth(index)}
              className={`season-badge whitespace-nowrap ${
                currentMonth === index
                  ? "gradient-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {month}
            </button>
          ))}
        </div>

        {/* Events List */}
        <h3 className="text-xl font-bold text-foreground mb-4">الأنشطة الزراعية</h3>
        <div className="space-y-4">
          {events.map((event, index) => {
            const typeInfo = eventTypeLabels[event.type];
            return (
              <div
                key={index}
                className={`card-agricultural flex items-center gap-4 border-r-4 ${typeInfo.color} animate-slide-in-right`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={`section-icon !w-14 !h-14 ${typeInfo.color}`}>
                  <event.icon className="w-7 h-7" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${typeInfo.color}`}>
                      {typeInfo.label}
                    </span>
                  </div>
                  <h4 className="font-bold text-foreground text-lg">{event.crop}</h4>
                  <p className="text-sm text-muted-foreground">
                    {event.type === "planting" && "موعد مناسب لبدء الزراعة"}
                    {event.type === "harvest" && "موعد الحصاد المثالي"}
                    {event.type === "watering" && "تذكير بالري المنتظم"}
                    {event.type === "pruning" && "موعد التقليم السنوي"}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Legend */}
        <div className="mt-8 card-agricultural">
          <h4 className="font-bold text-foreground mb-4">دليل الألوان</h4>
          <div className="grid grid-cols-2 gap-3">
            {Object.entries(eventTypeLabels).map(([key, value]) => (
              <div key={key} className="flex items-center gap-2">
                <span className={`w-4 h-4 rounded-full ${value.color}`}></span>
                <span className="text-sm text-muted-foreground">{value.label}</span>
              </div>
            ))}
          </div>
        </div>
      </main>
      <BottomNav />
    </div>
  );
};

export default CalendarPage;
