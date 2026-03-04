import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { User, Save, ArrowRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/layout/Header";
import BottomNav from "@/components/layout/BottomNav";

const countries = ["مصر", "السعودية", "العراق", "الأردن", "السودان", "المغرب", "تونس", "الجزائر", "ليبيا", "سوريا", "لبنان", "فلسطين", "اليمن", "عُمان", "الإمارات", "الكويت", "قطر", "البحرين"];

const soilTypes = [
  { value: "sandy", label: "رملية" },
  { value: "clay", label: "طينية" },
  { value: "loam", label: "طمية (لومية)" },
  { value: "silt", label: "غرينية" },
  { value: "peat", label: "خثية" },
  { value: "chalky", label: "كلسية" },
];

const experienceLevels = [
  { value: "beginner", label: "مبتدئ" },
  { value: "intermediate", label: "متوسط" },
  { value: "expert", label: "خبير" },
];

const cropOptions = ["قمح", "أرز", "ذرة", "طماطم", "بطاطس", "خيار", "فلفل", "باذنجان", "بصل", "ثوم", "فراولة", "عنب", "زيتون", "نخيل", "موز", "برتقال", "ليمون", "تفاح", "بطيخ", "قصب سكر"];

const ProfilePage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    full_name: "",
    country: "",
    region: "",
    soil_type: "" as string,
    experience_level: "beginner" as string,
    preferred_crops: [] as string[],
  });

  useEffect(() => {
    const load = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) { navigate("/auth"); return; }

      const { data } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_id", session.user.id)
        .single();

      if (data) {
        setForm({
          full_name: data.full_name || "",
          country: data.country || "",
          region: data.region || "",
          soil_type: data.soil_type || "",
          experience_level: data.experience_level || "beginner",
          preferred_crops: data.preferred_crops || [],
        });
      }
      setLoading(false);
    };
    load();
  }, [navigate]);

  const handleSave = async () => {
    setSaving(true);
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) { navigate("/auth"); return; }

    const { error } = await supabase
      .from("profiles")
      .update({
        full_name: form.full_name || null,
        country: form.country || null,
        region: form.region || null,
        soil_type: (form.soil_type || null) as any,
        experience_level: (form.experience_level || null) as any,
        preferred_crops: form.preferred_crops.length > 0 ? form.preferred_crops : null,
        profile_completed: true,
      })
      .eq("user_id", session.user.id);

    setSaving(false);
    if (error) {
      toast({ title: "خطأ", description: "فشل في حفظ البيانات. حاول مرة أخرى.", variant: "destructive" });
    } else {
      toast({ title: "تم الحفظ ✅", description: "تم تحديث ملفك الشخصي بنجاح." });
    }
  };

  const toggleCrop = (crop: string) => {
    setForm(prev => ({
      ...prev,
      preferred_crops: prev.preferred_crops.includes(crop)
        ? prev.preferred_crops.filter(c => c !== crop)
        : [...prev.preferred_crops, crop],
    }));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-24" dir="rtl">
      <Header />

      <div className="max-w-lg mx-auto px-4 py-6 space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="w-14 h-14 gradient-primary rounded-2xl flex items-center justify-center shadow-soft">
            <User className="w-7 h-7 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground">الملف الشخصي</h1>
            <p className="text-sm text-muted-foreground">عدّل بياناتك وتفضيلاتك الزراعية</p>
          </div>
        </div>

        {/* Personal Info */}
        <div className="bg-card rounded-2xl p-5 shadow-soft space-y-4 border border-border">
          <h2 className="text-base font-bold text-foreground border-b border-border pb-2">البيانات الشخصية</h2>

          <div className="space-y-2">
            <Label htmlFor="full_name">الاسم الكامل</Label>
            <Input id="full_name" value={form.full_name} onChange={e => setForm(f => ({ ...f, full_name: e.target.value }))} placeholder="أدخل اسمك" className="text-right" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="country">الدولة</Label>
            <Select value={form.country} onValueChange={v => setForm(f => ({ ...f, country: v }))}>
              <SelectTrigger><SelectValue placeholder="اختر دولتك" /></SelectTrigger>
              <SelectContent>
                {countries.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="region">المنطقة / المحافظة</Label>
            <Input id="region" value={form.region} onChange={e => setForm(f => ({ ...f, region: e.target.value }))} placeholder="مثال: الدلتا، الصعيد" className="text-right" />
          </div>
        </div>

        {/* Agricultural Preferences */}
        <div className="bg-card rounded-2xl p-5 shadow-soft space-y-4 border border-border">
          <h2 className="text-base font-bold text-foreground border-b border-border pb-2">التفضيلات الزراعية</h2>

          <div className="space-y-2">
            <Label>نوع التربة</Label>
            <Select value={form.soil_type} onValueChange={v => setForm(f => ({ ...f, soil_type: v }))}>
              <SelectTrigger><SelectValue placeholder="اختر نوع التربة" /></SelectTrigger>
              <SelectContent>
                {soilTypes.map(s => <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>مستوى الخبرة</Label>
            <Select value={form.experience_level} onValueChange={v => setForm(f => ({ ...f, experience_level: v }))}>
              <SelectTrigger><SelectValue placeholder="اختر مستوى خبرتك" /></SelectTrigger>
              <SelectContent>
                {experienceLevels.map(l => <SelectItem key={l.value} value={l.value}>{l.label}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>المحاصيل المفضلة</Label>
            <p className="text-xs text-muted-foreground">اختر المحاصيل التي تزرعها أو تهتم بها</p>
            <div className="flex flex-wrap gap-2 mt-2">
              {cropOptions.map(crop => (
                <button
                  key={crop}
                  onClick={() => toggleCrop(crop)}
                  className={`px-3 py-1.5 rounded-xl text-sm font-medium transition-all ${
                    form.preferred_crops.includes(crop)
                      ? "gradient-primary text-primary-foreground shadow-soft"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
                >
                  {crop}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Save Button */}
        <Button
          onClick={handleSave}
          disabled={saving}
          className="w-full h-14 rounded-2xl text-lg font-bold gradient-primary text-primary-foreground shadow-lg hover:opacity-90 transition-opacity"
        >
          {saving ? <Loader2 className="w-5 h-5 animate-spin ml-2" /> : <Save className="w-5 h-5 ml-2" />}
          حفظ التغييرات
        </Button>
      </div>

      <BottomNav />
    </div>
  );
};

export default ProfilePage;
