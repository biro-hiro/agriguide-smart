import { useState } from "react";
import { ArrowRight, Upload, Camera, AlertTriangle, Leaf, Bug, Loader2, CheckCircle, XCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/layout/Header";
import BottomNav from "@/components/layout/BottomNav";

const diseases = [
  {
    id: 1,
    name: "البياض الدقيقي",
    type: "مرض فطري",
    emoji: "🦠",
    crops: ["القرع", "الخيار", "الكوسة"],
    symptoms: "بقع بيضاء مسحوقية على الأوراق",
    organicTreatment: "رش بيكربونات الصوديوم المخففة بالماء",
    chemicalTreatment: "مبيدات فطرية تحتوي على الكبريت",
  },
  {
    id: 2,
    name: "المن (حشرات المن)",
    type: "آفة حشرية",
    emoji: "🐛",
    crops: ["الطماطم", "الفلفل", "الباذنجان"],
    symptoms: "حشرات صغيرة خضراء أو سوداء على الأوراق، التفاف الأوراق",
    organicTreatment: "رش صابون البوتاسيوم أو زيت النيم",
    chemicalTreatment: "مبيدات حشرية جهازية",
  },
  {
    id: 3,
    name: "لفحة الأوراق",
    type: "مرض بكتيري",
    emoji: "🍂",
    crops: ["البطاطس", "الطماطم"],
    symptoms: "بقع بنية داكنة على الأوراق والسيقان",
    organicTreatment: "إزالة الأجزاء المصابة وتحسين التهوية",
    chemicalTreatment: "مركبات النحاس",
  },
  {
    id: 4,
    name: "دودة القطن",
    type: "آفة حشرية",
    emoji: "🪱",
    crops: ["القطن", "الطماطم", "الذرة"],
    symptoms: "ثقوب في الأوراق والثمار",
    organicTreatment: "مصائد فرمونية، باسيلوس ثورينجينسيس",
    chemicalTreatment: "مبيدات البايرثرويد",
  },
  {
    id: 5,
    name: "عفن الجذور",
    type: "مرض فطري",
    emoji: "🍄",
    crops: ["الفول", "الفاصوليا", "البازلاء"],
    symptoms: "ذبول النبات وتعفن الجذور",
    organicTreatment: "تحسين الصرف وتقليل الري",
    chemicalTreatment: "مطهرات فطرية للتربة",
  },
  {
    id: 6,
    name: "الذبابة البيضاء",
    type: "آفة حشرية",
    emoji: "🪰",
    crops: ["الطماطم", "الخيار", "الفلفل"],
    symptoms: "ذباب أبيض صغير على الأوراق، إفرازات لزجة",
    organicTreatment: "مصائد صفراء لاصقة، زيت النيم",
    chemicalTreatment: "مبيدات إيميداكلوبريد",
  },
];

interface DiagnosisResult {
  diagnosis: string;
}

const PestsPage = () => {
  const [selectedDisease, setSelectedDisease] = useState<typeof diseases[0] | null>(null);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [diagnosisResult, setDiagnosisResult] = useState<string | null>(null);
  const [diagnosisError, setDiagnosisError] = useState<string | null>(null);
  const { toast } = useToast();

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "حجم الصورة كبير جداً",
          description: "يرجى اختيار صورة أقل من 5 ميجابايت",
          variant: "destructive",
        });
        return;
      }

      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64Image = reader.result as string;
        setUploadedImage(base64Image);
        setDiagnosisResult(null);
        setDiagnosisError(null);
        
        // Start AI analysis
        await analyzePest(base64Image);
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzePest = async (imageBase64: string) => {
    setIsAnalyzing(true);
    setDiagnosisError(null);
    
    try {
      const { data, error } = await supabase.functions.invoke('diagnose-pest', {
        body: { imageBase64 }
      });

      if (error) {
        throw new Error(error.message);
      }

      if (data.error) {
        throw new Error(data.error);
      }

      setDiagnosisResult(data.diagnosis);
      toast({
        title: "تم التشخيص بنجاح",
        description: "تم تحليل الصورة وتحديد المشكلة",
      });
    } catch (error) {
      console.error("Error analyzing pest:", error);
      const errorMessage = error instanceof Error ? error.message : "حدث خطأ أثناء التحليل";
      setDiagnosisError(errorMessage);
      toast({
        title: "خطأ في التشخيص",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const resetUpload = () => {
    setUploadedImage(null);
    setDiagnosisResult(null);
    setDiagnosisError(null);
  };

  const formatDiagnosis = (text: string) => {
    // Split by numbered points or newlines and format
    return text.split(/\n/).map((line, index) => {
      const trimmedLine = line.trim();
      if (!trimmedLine) return null;
      
      // Check if it's a numbered point
      const isNumberedPoint = /^\d+\./.test(trimmedLine);
      const isBoldTitle = /^[*#]+/.test(trimmedLine) || trimmedLine.endsWith(':');
      
      return (
        <p 
          key={index} 
          className={`mb-2 ${isNumberedPoint ? 'pr-4' : ''} ${isBoldTitle ? 'font-bold text-foreground' : 'text-muted-foreground'}`}
        >
          {trimmedLine.replace(/^[*#]+\s*/, '').replace(/\*+/g, '')}
        </p>
      );
    });
  };

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
            <h1 className="text-2xl font-bold text-foreground">الأمراض والآفات</h1>
            <p className="text-muted-foreground text-sm">تشخيص وعلاج مشاكل المحاصيل بالذكاء الاصطناعي</p>
          </div>
        </div>

        {/* Image Upload Section */}
        <div className="card-agricultural mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="section-icon !w-12 !h-12 gradient-sunset">
              <Camera className="w-6 h-6 text-warning-foreground" />
            </div>
            <div>
              <h3 className="font-bold text-foreground">تشخيص ذكي بالصورة</h3>
              <p className="text-sm text-muted-foreground">ارفع صورة لمحصولك وسيقوم الذكاء الاصطناعي بتشخيص المشكلة</p>
            </div>
          </div>

          {uploadedImage ? (
            <div className="space-y-4">
              {/* Uploaded Image */}
              <div className="relative rounded-xl overflow-hidden">
                <img src={uploadedImage} alt="محصول مرفوع" className="w-full h-48 object-cover" />
                <button
                  onClick={resetUpload}
                  className="absolute top-2 left-2 p-2 bg-card rounded-full shadow-lg hover:bg-muted transition-colors"
                  aria-label="إزالة الصورة"
                >
                  <XCircle className="w-5 h-5 text-destructive" />
                </button>
              </div>

              {/* Analysis Status */}
              {isAnalyzing && (
                <div className="flex items-center justify-center gap-3 p-6 bg-primary/10 rounded-xl">
                  <Loader2 className="w-6 h-6 text-primary animate-spin" />
                  <div className="text-center">
                    <p className="font-bold text-foreground">جاري التحليل...</p>
                    <p className="text-sm text-muted-foreground">يتم تشخيص المشكلة بواسطة الذكاء الاصطناعي</p>
                  </div>
                </div>
              )}

              {/* Diagnosis Result */}
              {diagnosisResult && (
                <div className="card-agricultural !p-5 border-r-4 border-r-green-500 animate-fade-in">
                  <div className="flex items-center gap-2 mb-4">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                    <h4 className="font-bold text-foreground text-lg">نتيجة التشخيص</h4>
                  </div>
                  <div className="prose prose-sm max-w-none text-right">
                    {formatDiagnosis(diagnosisResult)}
                  </div>
                </div>
              )}

              {/* Diagnosis Error */}
              {diagnosisError && (
                <div className="card-agricultural !p-5 border-r-4 border-r-red-500">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="w-6 h-6 text-destructive" />
                    <h4 className="font-bold text-foreground">خطأ في التشخيص</h4>
                  </div>
                  <p className="text-sm text-muted-foreground">{diagnosisError}</p>
                  <button 
                    onClick={() => analyzePest(uploadedImage)}
                    className="mt-3 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
                  >
                    إعادة المحاولة
                  </button>
                </div>
              )}

              {/* New Upload Button */}
              {!isAnalyzing && (diagnosisResult || diagnosisError) && (
                <button
                  onClick={resetUpload}
                  className="w-full py-3 border-2 border-dashed border-border rounded-xl text-muted-foreground hover:border-primary hover:text-primary transition-colors"
                >
                  رفع صورة جديدة
                </button>
              )}
            </div>
          ) : (
            <label className="flex flex-col items-center justify-center border-2 border-dashed border-border rounded-xl p-8 cursor-pointer hover:border-primary transition-colors">
              <Upload className="w-10 h-10 text-muted-foreground mb-3" />
              <p className="font-medium text-foreground">اضغط لرفع صورة</p>
              <p className="text-sm text-muted-foreground">JPG, PNG (حد أقصى 5MB)</p>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>
          )}
        </div>

        {/* Common Problems */}
        <h3 className="text-xl font-bold text-foreground mb-4">الأمراض والآفات الشائعة</h3>
        <div className="grid gap-4">
          {diseases.map((disease) => (
            <button
              key={disease.id}
              onClick={() => setSelectedDisease(disease)}
              className="card-agricultural flex items-center gap-4 text-right"
            >
              <span className="text-4xl">{disease.emoji}</span>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-bold text-foreground">{disease.name}</h4>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    disease.type.includes("حشرية") ? "bg-red-100 text-red-700" : "bg-amber-100 text-amber-700"
                  }`}>
                    {disease.type}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">{disease.symptoms}</p>
                <div className="flex gap-1 mt-2 flex-wrap">
                  {disease.crops.map((crop) => (
                    <span key={crop} className="text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded-full">
                      {crop}
                    </span>
                  ))}
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Disease Detail Modal */}
        {selectedDisease && (
          <div className="fixed inset-0 z-50 bg-foreground/50 flex items-end sm:items-center justify-center p-4">
            <div className="bg-card rounded-t-3xl sm:rounded-3xl w-full max-w-lg max-h-[80vh] overflow-y-auto animate-scale-in">
              <div className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center gap-4">
                    <span className="text-6xl">{selectedDisease.emoji}</span>
                    <div>
                      <h2 className="text-2xl font-bold text-foreground">{selectedDisease.name}</h2>
                      <span className={`text-sm px-3 py-1 rounded-full ${
                        selectedDisease.type.includes("حشرية") ? "bg-red-100 text-red-700" : "bg-amber-100 text-amber-700"
                      }`}>
                        {selectedDisease.type}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedDisease(null)}
                    className="p-2 rounded-full hover:bg-muted text-2xl"
                  >
                    ×
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="card-agricultural !p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertTriangle className="w-5 h-5 text-warning" />
                      <h4 className="font-bold text-foreground">الأعراض</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">{selectedDisease.symptoms}</p>
                  </div>

                  <div className="card-agricultural !p-4 border-r-4 border-r-green-500">
                    <div className="flex items-center gap-2 mb-2">
                      <Leaf className="w-5 h-5 text-green-600" />
                      <h4 className="font-bold text-foreground">العلاج العضوي</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">{selectedDisease.organicTreatment}</p>
                  </div>

                  <div className="card-agricultural !p-4 border-r-4 border-r-blue-500">
                    <div className="flex items-center gap-2 mb-2">
                      <Bug className="w-5 h-5 text-blue-600" />
                      <h4 className="font-bold text-foreground">العلاج الكيميائي</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">{selectedDisease.chemicalTreatment}</p>
                  </div>

                  <div>
                    <h4 className="font-bold text-foreground mb-2">المحاصيل المتأثرة</h4>
                    <div className="flex gap-2 flex-wrap">
                      {selectedDisease.crops.map((crop) => (
                        <span key={crop} className="bg-muted text-muted-foreground px-3 py-1 rounded-full text-sm">
                          {crop}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
      <BottomNav />
    </div>
  );
};

export default PestsPage;
