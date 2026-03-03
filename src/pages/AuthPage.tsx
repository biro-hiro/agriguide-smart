import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Leaf, Mail, Lock, User, Loader2, Eye, EyeOff, CheckCircle2, Sprout } from "lucide-react";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [signupSuccess, setSignupSuccess] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        toast({ title: "تم تسجيل الدخول بنجاح", description: "مرحباً بك مجدداً! 🌱" });
        navigate("/");
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { full_name: fullName },
            emailRedirectTo: window.location.origin,
          },
        });
        if (error) throw error;
        setSignupSuccess(true);
      }
    } catch (error: any) {
      toast({
        title: isLogin ? "خطأ في تسجيل الدخول" : "خطأ في إنشاء الحساب",
        description: error.message || "حدث خطأ غير متوقع",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (signupSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 gradient-primary" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1920&q=80')] bg-cover bg-center opacity-20" />
        
        <div className="relative z-10 w-full max-w-md px-4">
          <div className="bg-card/95 backdrop-blur-xl rounded-3xl p-8 shadow-elevated text-center border border-border/30">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-6">
              <CheckCircle2 className="w-10 h-10 text-primary" />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-3">تم إنشاء الحساب بنجاح! 🎉</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              يرجى التحقق من بريدك الإلكتروني لتأكيد حسابك قبل تسجيل الدخول.
              <br />
              <span className="text-sm">تحقق من مجلد الرسائل غير المرغوب فيها إذا لم تجد الرسالة.</span>
            </p>
            <div className="flex items-center gap-2 justify-center p-3 rounded-xl bg-muted mb-6">
              <Mail className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-foreground" dir="ltr">{email}</span>
            </div>
            <Button
              onClick={() => { setSignupSuccess(false); setIsLogin(true); }}
              className="w-full h-12 text-base"
            >
              العودة لتسجيل الدخول
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex relative overflow-hidden">
      {/* Left Panel - Background Image */}
      <div className="hidden lg:flex lg:w-1/2 relative">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1920&q=80')] bg-cover bg-center" />
        <div className="absolute inset-0 gradient-primary opacity-75" />
        <div className="relative z-10 flex flex-col justify-center p-12 text-primary-foreground">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-14 h-14 rounded-2xl bg-primary-foreground/20 backdrop-blur flex items-center justify-center">
              <Sprout className="w-8 h-8" />
            </div>
            <h1 className="text-3xl font-bold">المزرعة الذكية</h1>
          </div>
          <h2 className="text-4xl font-bold leading-tight mb-4">
            أدوات زراعية ذكية
            <br />
            لمحاصيل أفضل
          </h2>
          <p className="text-lg opacity-90 leading-relaxed max-w-md">
            تشخيص أمراض النبات، جداول الري والتسميد، ونصائح موسمية مخصصة لمنطقتك.
          </p>
          <div className="mt-10 flex gap-6">
            {["تشخيص ذكي", "تقويم زراعي", "مجتمع مزارعين"].map((feature) => (
              <div key={feature} className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary-foreground" />
                <span className="text-sm font-medium opacity-90">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Panel - Auth Form */}
      <div className="flex-1 flex items-center justify-center bg-background relative">
        {/* Mobile background */}
        <div className="lg:hidden absolute inset-0">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1920&q=80')] bg-cover bg-center opacity-5" />
        </div>

        <div className="w-full max-w-md px-6 relative z-10">
          {/* Mobile Logo */}
          <div className="lg:hidden text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl gradient-primary shadow-elevated mb-3">
              <Leaf className="w-8 h-8 text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">المزرعة الذكية</h1>
          </div>

          {/* Header */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-foreground">
              {isLogin ? "مرحباً بعودتك 👋" : "إنشاء حساب جديد 🌱"}
            </h2>
            <p className="text-muted-foreground mt-1">
              {isLogin ? "سجل دخولك للوصول إلى أدواتك الزراعية" : "ابدأ رحلتك نحو زراعة أكثر ذكاءً"}
            </p>
          </div>

          {/* Tabs */}
          <div className="flex rounded-xl bg-muted p-1 mb-6">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
                isLogin ? "bg-primary text-primary-foreground shadow-soft" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              تسجيل الدخول
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
                !isLogin ? "bg-primary text-primary-foreground shadow-soft" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              حساب جديد
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="fullName" className="text-foreground">الاسم الكامل</Label>
                <div className="relative">
                  <User className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="fullName"
                    placeholder="أدخل اسمك الكامل"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="pr-10 h-12"
                    required={!isLogin}
                  />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email" className="text-foreground">البريد الإلكتروني</Label>
              <div className="relative">
                <Mail className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="example@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pr-10 h-12"
                  required
                  dir="ltr"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-foreground">كلمة المرور</Label>
              <div className="relative">
                <Lock className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pr-10 pl-10 h-12"
                  required
                  minLength={6}
                  dir="ltr"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <Button type="submit" disabled={loading} className="w-full h-12 text-base gap-2 mt-2">
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  جاري المعالجة...
                </>
              ) : isLogin ? (
                "تسجيل الدخول"
              ) : (
                "إنشاء الحساب"
              )}
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-8">
            منصة زراعية ذكية لمساعدتك في إدارة محاصيلك 🌾
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
