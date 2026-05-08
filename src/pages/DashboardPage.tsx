import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Activity, Bug, FileText, TrendingUp, Cloud, Droplets, Wind, Sun, Mail, Leaf, Calendar as CalendarIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import Header from "@/components/layout/Header";
import BottomNav from "@/components/layout/BottomNav";
import { supabase } from "@/integrations/supabase/client";
import type { User as SupaUser } from "@supabase/supabase-js";

interface StoredReport {
  id: string;
  cropName?: string;
  diagnosis?: string;
  severity?: "low" | "medium" | "high";
  date: string;
}

const DashboardPage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<SupaUser | null>(null);
  const [reports, setReports] = useState<StoredReport[]>([]);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        navigate("/auth");
        return;
      }
      setUser(session.user);
    });

    // Load any locally cached diagnosis reports (non-breaking; safe fallback)
    try {
      const raw = localStorage.getItem("diagnosis_reports");
      if (raw) setReports(JSON.parse(raw));
    } catch {
      // ignore
    }
  }, [navigate]);

  // Demo stats — derived from local reports if any, otherwise representative defaults
  const totalDiagnoses = reports.length || 24;
  const resolvedCases = Math.max(0, totalDiagnoses - 3);
  const pendingCases = totalDiagnoses - resolvedCases;
  const accuracy = 92;

  const recentReports: StoredReport[] = reports.length
    ? reports.slice(0, 5)
    : [
        { id: "1", cropName: "طماطم", diagnosis: "اللفحة المتأخرة", severity: "high", date: "اليوم" },
        { id: "2", cropName: "قمح", diagnosis: "صدأ الأوراق", severity: "medium", date: "أمس" },
        { id: "3", cropName: "خيار", diagnosis: "البياض الدقيقي", severity: "low", date: "قبل يومين" },
        { id: "4", cropName: "زيتون", diagnosis: "ذبابة الفاكهة", severity: "medium", date: "هذا الأسبوع" },
      ];

  const diseaseAnalytics = [
    { name: "اللفحة المتأخرة", count: 8, percentage: 33 },
    { name: "البياض الدقيقي", count: 6, percentage: 25 },
    { name: "صدأ الأوراق", count: 5, percentage: 21 },
    { name: "ذبابة الفاكهة", count: 3, percentage: 13 },
    { name: "أخرى", count: 2, percentage: 8 },
  ];

  const severityColor = (s?: string) =>
    s === "high" ? "destructive" : s === "medium" ? "secondary" : "default";

  return (
    <div className="min-h-screen bg-background pb-24">
      <Header />
      <main className="max-w-6xl mx-auto px-4 py-6 space-y-6">
        {/* Welcome */}
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground">لوحة التحكم</h1>
            <p className="text-sm text-muted-foreground mt-1">
              مرحباً {user?.user_metadata?.full_name || user?.email?.split("@")[0] || "بالمزارع"} 👋 — نظرة شاملة على نشاطك الزراعي
            </p>
          </div>
          <Button onClick={() => navigate("/pests")} className="gradient-primary text-primary-foreground">
            <Bug className="w-4 h-4 ml-2" />
            تشخيص جديد
          </Button>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="shadow-soft">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">إجمالي التشخيصات</p>
                  <p className="text-2xl font-bold text-foreground mt-1">{totalDiagnoses}</p>
                </div>
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Activity className="w-5 h-5 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-soft">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">حالات مُعالجة</p>
                  <p className="text-2xl font-bold text-foreground mt-1">{resolvedCases}</p>
                </div>
                <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                  <Leaf className="w-5 h-5 text-accent" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-soft">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">قيد المتابعة</p>
                  <p className="text-2xl font-bold text-foreground mt-1">{pendingCases}</p>
                </div>
                <div className="w-10 h-10 rounded-xl bg-warning/10 flex items-center justify-center">
                  <FileText className="w-5 h-5" style={{ color: "hsl(var(--warning))" }} />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-soft">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">دقة التشخيص</p>
                  <p className="text-2xl font-bold text-foreground mt-1">{accuracy}%</p>
                </div>
                <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-secondary" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Recent Reports */}
          <Card className="lg:col-span-2 shadow-soft">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg">أحدث التقارير</CardTitle>
                  <CardDescription>آخر تشخيصات المحاصيل والآفات</CardDescription>
                </div>
                <Button variant="ghost" size="sm" onClick={() => navigate("/pests")}>
                  عرض الكل
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {recentReports.map((r) => (
                <div
                  key={r.id}
                  className="flex items-center justify-between p-3 rounded-xl bg-muted/40 hover:bg-muted transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Leaf className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{r.cropName}</p>
                      <p className="text-xs text-muted-foreground">{r.diagnosis}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={severityColor(r.severity) as any}>
                      {r.severity === "high" ? "مرتفع" : r.severity === "medium" ? "متوسط" : "منخفض"}
                    </Badge>
                    <span className="text-xs text-muted-foreground hidden sm:inline">{r.date}</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Weather Widget */}
          <Card className="shadow-soft overflow-hidden">
            <div className="gradient-sky p-5 text-white" style={{ background: "var(--gradient-sky)" }}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-90">الطقس اليوم</p>
                  <p className="text-4xl font-bold mt-1">26°</p>
                  <p className="text-sm opacity-90 mt-1">مشمس جزئياً</p>
                </div>
                <Sun className="w-16 h-16 opacity-90" />
              </div>
            </div>
            <CardContent className="p-4 space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2 text-muted-foreground">
                  <Droplets className="w-4 h-4" /> الرطوبة
                </span>
                <span className="font-medium text-foreground">62%</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2 text-muted-foreground">
                  <Wind className="w-4 h-4" /> الرياح
                </span>
                <span className="font-medium text-foreground">12 كم/س</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2 text-muted-foreground">
                  <Cloud className="w-4 h-4" /> هطول متوقع
                </span>
                <span className="font-medium text-foreground">10%</span>
              </div>
              <div className="pt-2 mt-2 border-t border-border">
                <p className="text-xs text-muted-foreground">
                  ☀️ ظروف مناسبة للري في الصباح الباكر.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Disease Analytics */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="text-lg">تحليلات الأمراض الأكثر شيوعاً</CardTitle>
            <CardDescription>توزيع الحالات المُشخصة خلال آخر 30 يوماً</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {diseaseAnalytics.map((d) => (
              <div key={d.name} className="space-y-1.5">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium text-foreground">{d.name}</span>
                  <span className="text-muted-foreground">{d.count} حالة</span>
                </div>
                <Progress value={d.percentage} className="h-2" />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid sm:grid-cols-3 gap-4">
          <button
            onClick={() => navigate("/pests")}
            className="p-4 rounded-2xl bg-card border border-border shadow-soft hover:shadow-card transition-all text-right"
          >
            <Bug className="w-6 h-6 text-primary mb-2" />
            <p className="font-semibold text-foreground">تشخيص الآفات</p>
            <p className="text-xs text-muted-foreground mt-1">ذكاء اصطناعي + إرسال تقرير</p>
          </button>
          <button
            onClick={() => navigate("/calendar")}
            className="p-4 rounded-2xl bg-card border border-border shadow-soft hover:shadow-card transition-all text-right"
          >
            <CalendarIcon className="w-6 h-6 text-secondary mb-2" />
            <p className="font-semibold text-foreground">التقويم الزراعي</p>
            <p className="text-xs text-muted-foreground mt-1">مواعيد الزراعة والحصاد</p>
          </button>
          <button
            onClick={() => navigate("/profile")}
            className="p-4 rounded-2xl bg-card border border-border shadow-soft hover:shadow-card transition-all text-right"
          >
            <Mail className="w-6 h-6 text-accent mb-2" />
            <p className="font-semibold text-foreground">ملفي الشخصي</p>
            <p className="text-xs text-muted-foreground mt-1">تخصيص التفضيلات الزراعية</p>
          </button>
        </div>
      </main>
      <BottomNav />
    </div>
  );
};

export default DashboardPage;
