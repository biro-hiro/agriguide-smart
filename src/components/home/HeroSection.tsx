import heroImage from "@/assets/hero-farm.jpg";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden rounded-3xl mx-4 mt-4 shadow-elevated">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="مزرعة خضراء"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/40 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 p-6 sm:p-10 min-h-[280px] flex flex-col justify-end">
        <div className="animate-fade-in">
          <span className="inline-block px-4 py-1.5 bg-primary/90 text-primary-foreground text-sm font-semibold rounded-full mb-4">
            🌾 موسم الربيع
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-primary-foreground mb-3">
            مرحباً بك في المرشد الزراعي الذكي
          </h2>
          <p className="text-primary-foreground/90 text-sm sm:text-base max-w-lg">
            دليلك الشامل لزراعة ناجحة ومستدامة. اكتشف أفضل المحاصيل وطرق العناية بها.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="flex gap-4 mt-6">
          <div className="bg-card/20 backdrop-blur-sm rounded-xl px-4 py-2">
            <p className="text-2xl font-bold text-primary-foreground">150+</p>
            <p className="text-xs text-primary-foreground/80">محصول</p>
          </div>
          <div className="bg-card/20 backdrop-blur-sm rounded-xl px-4 py-2">
            <p className="text-2xl font-bold text-primary-foreground">80+</p>
            <p className="text-xs text-primary-foreground/80">آفة ومرض</p>
          </div>
          <div className="bg-card/20 backdrop-blur-sm rounded-xl px-4 py-2">
            <p className="text-2xl font-bold text-primary-foreground">500+</p>
            <p className="text-xs text-primary-foreground/80">نصيحة</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
