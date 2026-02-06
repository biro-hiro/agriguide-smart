import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Leaf, Camera, Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const onboardingSlides = [
  {
    id: 1,
    icon: Leaf,
    title: "اكتشف عالم الزراعة",
    description: "دليلك الشامل للمحاصيل الموسمية والهجينة المناسبة لأرضك ومناخك",
    gradient: "gradient-primary",
    bgColor: "from-primary/20 to-secondary/20",
  },
  {
    id: 2,
    icon: Camera,
    title: "تشخيص ذكي بالصور",
    description: "ارفع صورة لمحصولك واحصل على تشخيص فوري للأمراض والآفات مع طرق العلاج",
    gradient: "gradient-sunset",
    bgColor: "from-warning/20 to-accent/20",
  },
  {
    id: 3,
    icon: Calendar,
    title: "تقويم زراعي ذكي",
    description: "تذكيرات بمواعيد الزراعة والري والتسميد والحصاد حسب موقعك ومحاصيلك",
    gradient: "gradient-sky",
    bgColor: "from-blue-500/20 to-primary/20",
  },
];

const OnboardingPage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  const handleNext = () => {
    if (currentSlide < onboardingSlides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      localStorage.setItem("onboarding_completed", "true");
      navigate("/");
    }
  };

  const handlePrev = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const handleSkip = () => {
    localStorage.setItem("onboarding_completed", "true");
    navigate("/");
  };

  const slide = onboardingSlides[currentSlide];
  const Icon = slide.icon;

  return (
    <div className={`min-h-screen bg-gradient-to-br ${slide.bgColor} flex flex-col transition-all duration-500`}>
      {/* Skip Button */}
      <div className="flex justify-between items-center p-4">
        <button
          onClick={handleSkip}
          className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium"
        >
          تخطي
        </button>
        <div className="flex gap-2">
          {onboardingSlides.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? "w-6 bg-primary"
                  : index < currentSlide
                  ? "bg-primary/50"
                  : "bg-muted-foreground/30"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 text-center">
        {/* Icon */}
        <div
          className={`w-32 h-32 ${slide.gradient} rounded-[2rem] flex items-center justify-center mb-8 shadow-lg animate-scale-in`}
        >
          <Icon className="w-16 h-16 text-primary-foreground" />
        </div>

        {/* Text */}
        <h1 className="text-3xl font-bold text-foreground mb-4 animate-fade-in">
          {slide.title}
        </h1>
        <p className="text-lg text-muted-foreground max-w-sm leading-relaxed animate-fade-in">
          {slide.description}
        </p>
      </div>

      {/* Navigation */}
      <div className="p-6 flex items-center justify-between gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={handlePrev}
          disabled={currentSlide === 0}
          className="w-12 h-12 rounded-full"
        >
          <ChevronRight className="w-6 h-6" />
        </Button>

        <Button
          onClick={handleNext}
          className={`flex-1 h-14 rounded-2xl text-lg font-bold ${slide.gradient} text-primary-foreground shadow-lg hover:opacity-90 transition-opacity`}
        >
          {currentSlide === onboardingSlides.length - 1 ? "ابدأ الآن" : "التالي"}
        </Button>

        <Button
          variant="ghost"
          size="icon"
          onClick={handleNext}
          disabled={currentSlide === onboardingSlides.length - 1}
          className="w-12 h-12 rounded-full"
        >
          <ChevronLeft className="w-6 h-6" />
        </Button>
      </div>
    </div>
  );
};

export default OnboardingPage;
