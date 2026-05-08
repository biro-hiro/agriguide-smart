import { useEffect, useState } from "react";
import { ArrowRight, MessageCircle, ThumbsUp, Send, User, Star, Plus } from "lucide-react";
import { motion } from "framer-motion";
import Header from "@/components/layout/Header";
import BottomNav from "@/components/layout/BottomNav";
import PageTransition from "@/components/PageTransition";
import AuthSheet from "@/components/auth/AuthSheet";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const posts = [
  {
    id: 1,
    author: "أحمد المزارع",
    avatar: "🧑‍🌾",
    time: "منذ ساعتين",
    content: "نجحت في زراعة الطماطم هذا الموسم! أنصح الجميع باستخدام السماد العضوي والري بالتنقيط للحصول على نتائج ممتازة.",
    likes: 24,
    comments: 8,
    tags: ["طماطم", "سماد_عضوي"],
  },
  {
    id: 2,
    author: "فاطمة الحديقة",
    avatar: "👩‍🌾",
    time: "منذ 5 ساعات",
    content: "سؤال للخبراء: ما هي أفضل طريقة للتخلص من حشرات المن بطريقة طبيعية؟ لاحظت وجودها على نباتات الفلفل.",
    likes: 12,
    comments: 15,
    tags: ["آفات", "فلفل", "مكافحة_عضوية"],
  },
  {
    id: 3,
    author: "محمد الفلاح",
    avatar: "👨‍🌾",
    time: "منذ يوم",
    content: "حصاد موفق للقمح هذا العام الحمد لله! الأمطار كانت مناسبة والتربة ممتازة. شكراً للمرشد الزراعي على النصائح المفيدة.",
    likes: 45,
    comments: 12,
    tags: ["قمح", "حصاد", "شكر"],
  },
  {
    id: 4,
    author: "سارة البستانية",
    avatar: "👩‍🌾",
    time: "منذ يومين",
    content: "تجربتي مع زراعة النعناع في المنزل: يحتاج إضاءة جيدة وري منتظم. لا تضعه في الشمس المباشرة لفترات طويلة!",
    likes: 31,
    comments: 6,
    tags: ["نعناع", "زراعة_منزلية"],
  },
];

const CommunityPage = () => {
  const [newPost, setNewPost] = useState("");
  const [authOpen, setAuthOpen] = useState(false);
  const [isAuthed, setIsAuthed] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => setIsAuthed(!!session));
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, s) => setIsAuthed(!!s));
    return () => subscription.unsubscribe();
  }, []);

  const requireAuth = (cb: () => void) => {
    if (!isAuthed) { setAuthOpen(true); return; }
    cb();
  };

  const handlePublish = () => requireAuth(() => {
    if (!newPost.trim()) return;
    toast.success("تم نشر مشاركتك");
    setNewPost("");
  });

  return (
    <div className="min-h-screen bg-background pb-24">
      <Header />
      <PageTransition>
      <main className="max-w-3xl mx-auto px-4 py-6">
        {/* Page Title */}
        <div className="flex items-center gap-3 mb-6">
          <button onClick={() => window.history.back()} className="p-2 rounded-xl hover:bg-muted">
            <ArrowRight className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-foreground">مجتمع المزارعين</h1>
            <p className="text-muted-foreground text-sm">شارك خبراتك واستفد من تجارب الآخرين</p>
          </div>
        </div>

        {/* New Post Input */}
        <div className="card-agricultural mb-6">
          <div className="flex gap-3">
            <div className="section-icon !w-12 !h-12 gradient-primary flex-shrink-0">
              <User className="w-6 h-6 text-primary-foreground" />
            </div>
            <div className="flex-1">
              <textarea
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                placeholder="شارك تجربتك أو اطرح سؤالاً..."
                className="input-agricultural resize-none h-20"
              />
              <div className="flex justify-end mt-3">
                <button onClick={handlePublish} className="btn-primary-gradient flex items-center gap-2">
                  <Send className="w-4 h-4" />
                  نشر
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Posts Feed */}
        <div className="space-y-4">
          {posts.map((post, index) => (
            <div
              key={post.id}
              className="card-agricultural animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Post Header */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center text-2xl">
                  {post.avatar}
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-foreground">{post.author}</h4>
                  <p className="text-sm text-muted-foreground">{post.time}</p>
                </div>
              </div>

              {/* Post Content */}
              <p className="text-foreground leading-relaxed mb-4">{post.content}</p>

              {/* Tags */}
              <div className="flex gap-2 flex-wrap mb-4">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Post Actions */}
              <div className="flex items-center gap-6 pt-4 border-t border-border">
                <button className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                  <ThumbsUp className="w-5 h-5" />
                  <span className="text-sm">{post.likes}</span>
                </button>
                <button className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                  <MessageCircle className="w-5 h-5" />
                  <span className="text-sm">{post.comments}</span>
                </button>
                <button className="flex items-center gap-2 text-muted-foreground hover:text-gold transition-colors mr-auto">
                  <Star className="w-5 h-5" />
                  <span className="text-sm">حفظ</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
      </PageTransition>

      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={() => requireAuth(() => toast("اكتب مشاركتك في الأعلى"))}
        className="fixed bottom-24 right-6 z-30 w-14 h-14 rounded-full gradient-primary text-primary-foreground shadow-2xl flex items-center justify-center"
        aria-label="إنشاء منشور"
      >
        <Plus className="w-6 h-6" />
      </motion.button>

      <AuthSheet open={authOpen} onOpenChange={setAuthOpen} />
      <BottomNav />
    </div>
  );
};

export default CommunityPage;
