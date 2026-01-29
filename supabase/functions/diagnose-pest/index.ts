import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { imageBase64 } = await req.json();
    
    if (!imageBase64) {
      return new Response(
        JSON.stringify({ error: "No image provided" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    console.log("Analyzing image for pest/disease diagnosis...");

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          {
            role: "system",
            content: `أنت خبير زراعي متخصص في تشخيص أمراض وآفات المحاصيل. 
            عند تحليل صورة، قدم التشخيص بالتنسيق التالي بالعربية:
            
            1. اسم المرض أو الآفة
            2. نوع المشكلة (مرض فطري، مرض بكتيري، آفة حشرية، نقص غذائي، إلخ)
            3. الأعراض الظاهرة في الصورة
            4. المحاصيل التي تتأثر عادة بهذه المشكلة
            5. العلاج العضوي المقترح
            6. العلاج الكيميائي المقترح
            7. نصائح للوقاية
            
            إذا لم تتمكن من تحديد المشكلة بوضوح، اذكر ذلك واقترح استشارة متخصص.
            اجعل إجاباتك واضحة ومفيدة للمزارعين المبتدئين.`
          },
          {
            role: "user",
            content: [
              {
                type: "text",
                text: "حلل هذه الصورة وحدد المرض أو الآفة الموجودة في المحصول، وقدم التشخيص والعلاج المناسب."
              },
              {
                type: "image_url",
                image_url: {
                  url: imageBase64
                }
              }
            ]
          }
        ],
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "تم تجاوز حد الطلبات، يرجى المحاولة لاحقاً" }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "يرجى إضافة رصيد للمتابعة" }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      throw new Error("AI gateway error");
    }

    const aiResponse = await response.json();
    const diagnosis = aiResponse.choices?.[0]?.message?.content;

    console.log("Diagnosis completed successfully");

    return new Response(
      JSON.stringify({ diagnosis }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.error("Error in diagnose-pest function:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
