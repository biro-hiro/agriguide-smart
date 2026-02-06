import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { symptoms, cropName } = await req.json();
    
    if (!symptoms || symptoms.trim().length === 0) {
      return new Response(
        JSON.stringify({ error: 'يرجى إدخال الأعراض' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const systemPrompt = `أنت خبير زراعي متخصص في تشخيص مشاكل المحاصيل والنباتات. مهمتك تحليل الأعراض المذكورة وتقديم تشخيص شامل.

قدم إجابتك باللغة العربية بالتنسيق التالي:

**التشخيص المحتمل:**
حدد المشكلة أو المشاكل المحتملة (مرض فطري، آفة حشرية، نقص عناصر، مشكلة بيئية، إلخ)

**الأسباب:**
اشرح الأسباب المحتملة للمشكلة

**العلاج العضوي:**
- قدم 2-3 حلول عضوية طبيعية

**العلاج الكيميائي:**
- قدم 2-3 حلول كيميائية إذا لزم الأمر

**الوقاية:**
- نصائح لمنع تكرار المشكلة

**ملاحظات هامة:**
- أي تحذيرات أو ملاحظات إضافية

كن محدداً وعملياً في نصائحك.`;

    const userPrompt = cropName 
      ? `المحصول: ${cropName}\n\nالأعراض الملاحظة:\n${symptoms}`
      : `الأعراض الملاحظة:\n${symptoms}`;

    console.log("Sending request to Lovable AI for symptoms diagnosis");
    
    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt }
        ],
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "تم تجاوز الحد الأقصى للطلبات، يرجى المحاولة لاحقاً" }),
          { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "يرجى إضافة رصيد لاستخدام خدمة الذكاء الاصطناعي" }),
          { status: 402, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      throw new Error(`AI gateway error: ${response.status}`);
    }

    const data = await response.json();
    const diagnosis = data.choices?.[0]?.message?.content;

    if (!diagnosis) {
      throw new Error("No diagnosis received from AI");
    }

    console.log("Symptoms diagnosis completed successfully");

    return new Response(
      JSON.stringify({ diagnosis }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error("Error in diagnose-symptoms function:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "حدث خطأ غير متوقع" }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
