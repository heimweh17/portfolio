import React, { useState, useEffect, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useMotionTemplate,
  useMotionValue,
} from "framer-motion";
import {
  ArrowLeft,
  Calendar,
  Tag,
  Clock,
  Sun,
  Moon,
  X,
  Coffee,
  Image as ImageIcon,
  PenTool,
} from "lucide-react";

// --- 类型定义 ---

type BlogPost = {
  id: string;
  title: string;
  date: string;
  tags: string[];
  mood?: string; // 心情 Emoji
  image?: string; // 可选的封面图/配图
  excerpt: string; // 列表页显示的摘要
  content: React.ReactNode; // 完整内容，支持 JSX
};

// --- 博客数据 (这里是你用来"随便写写"的地方) ---
const POSTS: BlogPost[] = [
  
  {
    id: "2",
    title: "如果你在看",
    date: "2025-12-20",
    tags: ["存档"],
    mood: "",
    excerpt: "请来找我聊天",
    content: (
      <div className="space-y-4">
        <p>
          如果你在看，请来找我聊天。
        </p>
        <p>
          写于Coral Springs, FL
        </p>
      </div>
    ),
  },
  {
    id: "1",
    title: "Hello World",
    date: "2025-12-20",
    tags: ["存档"],
    mood: "👋",
    excerpt: "测试文章",
    content: (
      <div className="space-y-4">
        <p>
          hello world!
        </p>
        <p>
          还在等待。等待什么呢？
        </p>
        <p>
          等待戈多。
        </p>
        <p>
          写于Coral Springs, FL
        </p>
      </div>
    ),
  },
];

// --- 辅助组件 (复用自 Portfolio) ---

// 1. 复古网格
const RetroGrid = ({ isDark }: { isDark: boolean }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);
    let mouse = { x: 0, y: 0 };
    const drawGrid = () => {
      ctx.clearRect(0, 0, w, h);
      ctx.strokeStyle = isDark ? "rgba(56, 189, 248, 0.1)" : "rgba(148, 163, 184, 0.15)";
      ctx.lineWidth = 1;
      const gridSize = 40;
      for (let x = 0; x <= w; x += gridSize) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke(); }
      for (let y = 0; y <= h; y += gridSize) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke(); }
      const gradient = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 300);
      if (isDark) { gradient.addColorStop(0, "rgba(56, 189, 248, 0.15)"); gradient.addColorStop(1, "transparent"); } 
      else { gradient.addColorStop(0, "rgba(14, 165, 233, 0.1)"); gradient.addColorStop(1, "transparent"); }
      ctx.fillStyle = gradient; ctx.fillRect(0, 0, w, h);
      requestAnimationFrame(drawGrid);
    };
    const handleResize = () => { w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight; };
    const handleMouseMove = (e: MouseEvent) => { mouse.x = e.clientX; mouse.y = e.clientY; };
    window.addEventListener("resize", handleResize); window.addEventListener("mousemove", handleMouseMove); drawGrid();
    return () => { window.removeEventListener("resize", handleResize); window.removeEventListener("mousemove", handleMouseMove); };
  }, [isDark]);
  return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none" />;
};

// 2. 聚光灯卡片
const SpotlightCard = ({ children, className = "", onClick }: { children: React.ReactNode; className?: string; onClick?: () => void }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }
  return (
    <div
      className={`group relative border overflow-hidden rounded-2xl transition-all duration-300 bg-white/80 border-slate-200 dark:bg-slate-900/80 dark:border-slate-800 [--spotlight-color:rgba(14,165,233,0.15)] dark:[--spotlight-color:rgba(56,189,248,0.25)] ${onClick ? "cursor-pointer hover:shadow-lg" : ""} ${className}`}
      onMouseMove={handleMouseMove}
      onClick={onClick}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{ background: useMotionTemplate`radial-gradient(500px circle at ${mouseX}px ${mouseY}px, var(--spotlight-color), transparent 80%)` }}
      />
      <div className="relative h-full p-6 z-10">{children}</div>
    </div>
  );
};

// 3. 文章阅读弹窗
const BlogModal = ({ post, onClose }: { post: BlogPost | null; onClose: () => void }) => {
  return (
    <AnimatePresence>
      {post && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm px-4 py-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="w-full max-w-2xl max-h-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl relative flex flex-col overflow-hidden"
            initial={{ scale: 0.9, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 10, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header / Meta */}
            <div className="p-6 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 shrink-0">
               <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400 mb-2 font-mono">
                      <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {post.date}</span>
                      {post.mood && <span className="bg-slate-200 dark:bg-slate-800 px-1.5 py-0.5 rounded text-[10px]">{post.mood} 心情</span>}
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 leading-tight">
                      {post.title}
                    </h2>
                  </div>
                  <button onClick={onClose} className="shrink-0 p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-400 transition-colors">
                    <X className="w-5 h-5" />
                  </button>
               </div>
               
               <div className="flex flex-wrap gap-2 mt-4">
                  {post.tags.map(tag => (
                    <span key={tag} className="text-[10px] px-2 py-1 rounded-full bg-sky-100 dark:bg-sky-900/30 text-sky-600 dark:text-sky-300 font-medium">
                      #{tag}
                    </span>
                  ))}
               </div>
            </div>

            {/* Scrollable Content */}
            <div className="p-6 overflow-y-auto custom-scrollbar">
              {post.image && (
                <div className="mb-6 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800">
                  {/* 使用 placeholder 占位符，因为你可能还没有真的传图片 */}
                  <div className="aspect-video bg-slate-100 dark:bg-slate-900 flex items-center justify-center text-slate-400">
                     {post.image.includes("http") || post.image.startsWith("/") ? (
                        <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
                     ) : (
                        <div className="flex flex-col items-center gap-2">
                           <ImageIcon className="w-8 h-8 opacity-50" />
                           <span className="text-xs">（这里是配图占位：{post.image}）</span>
                        </div>
                     )}
                  </div>
                </div>
              )}
              
              <div className="prose prose-slate dark:prose-invert prose-sm sm:prose-base max-w-none leading-relaxed">
                {post.content}
              </div>

              <div className="mt-12 pt-8 border-t border-slate-100 dark:border-slate-800 text-center">
                 <div className="inline-flex items-center gap-2 text-slate-400 text-xs font-mono">
                    <PenTool className="w-3 h-3" />
                    刘昊洲
                 </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// --- 主页面组件 ---

export default function Blog() {
  const [isDark, setIsDark] = useState(true);
  const [activePost, setActivePost] = useState<BlogPost | null>(null);

  // 简单的滚动进度条
  const [scrollProgress, setScrollProgress] = useState(0);
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      setScrollProgress(docHeight > 0 ? scrollTop / docHeight : 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={`${isDark ? "dark" : ""}`}>
      <div className="font-sans antialiased min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300 relative selection:bg-pink-500/30 selection:text-pink-600 dark:selection:text-pink-300">
        
        {/* 背景 (和主页一样) */}
        <RetroGrid isDark={isDark} />

        {/* 顶部导航 (简化版) */}
        <header className="sticky top-0 z-40 bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800/80 relative">
          <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <a href="/zh" className="group flex items-center gap-2 font-bold text-xs tracking-wider text-slate-900 dark:text-slate-100 uppercase hover:text-sky-500 transition-colors">
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                <span>返回主页</span>
              </a>
            </div>
            
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsDark(!isDark)}
                className="p-2 rounded-full text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>
            </div>
          </div>
          {/* 进度条：博客用粉色区别一下主页的蓝色？或者保持蓝色也行，这里用了粉色增加一点"私密感" */}
          <div className="absolute bottom-0 left-0 w-full h-[1px] bg-slate-200 dark:bg-slate-800/50 overflow-hidden">
            <motion.div
              className="h-full bg-pink-500/70 shadow-[0_0_10px_rgba(236,72,153,0.8)]"
              style={{ scaleX: scrollProgress, transformOrigin: "0% 50%" }}
            />
          </div>
        </header>

        {/* 主要内容区域 */}
        <main className="max-w-4xl mx-auto px-6 py-16 relative z-10">
          
          {/* Blog Hero */}
          <div className="mb-16">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-600 dark:text-pink-400 text-[10px] font-bold mb-4"
            >
              <Coffee className="w-3 h-3" />
              <span>碎碎念空间</span>
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-bold mb-4 text-slate-900 dark:text-white"
            >
              我的随笔
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-slate-500 dark:text-slate-400 max-w-xl text-sm leading-relaxed"
            >
              一些自己的想法。
            </motion.p>
          </div>

          {/* 文章列表 */}
          <div className="grid md:grid-cols-2 gap-6">
            {POSTS.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.3 }}
              >
                <SpotlightCard 
                  className="h-full flex flex-col"
                  onClick={() => setActivePost(post)}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2 text-[10px] font-mono text-slate-400 uppercase">
                         <span>{post.date}</span>
                         {post.mood && <span>· {post.mood}</span>}
                      </div>
                      <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 group-hover:text-pink-500 dark:group-hover:text-pink-400 transition-colors">
                        {post.title}
                      </h3>
                    </div>
                  </div>

                  {post.image && (
                     <div className="mb-4 rounded-lg overflow-hidden h-32 bg-slate-100 dark:bg-slate-950 flex items-center justify-center border border-slate-200 dark:border-slate-800">
                        {/* 简化的图片占位处理 */}
                        {post.image.includes("http") || post.image.startsWith("/") ? (
                           <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
                        ) : (
                           <ImageIcon className="text-slate-300 w-6 h-6" />
                        )}
                     </div>
                  )}

                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-3 mb-6 flex-1">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center justify-between border-t border-slate-100 dark:border-slate-800 pt-4 mt-auto">
                    <div className="flex gap-2">
                       {post.tags.map(tag => (
                          <span key={tag} className="text-[10px] text-slate-400 dark:text-slate-500 font-mono">#{tag}</span>
                       ))}
                    </div>
                    <span className="text-[10px] font-bold text-pink-500 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                       阅读全文 <ArrowLeft className="w-3 h-3 rotate-180" />
                    </span>
                  </div>
                </SpotlightCard>
              </motion.div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <div className="inline-flex items-center gap-2 text-xs text-slate-400">
               <Clock className="w-3 h-3" />
               <span>更多故事正在发生中...</span>
            </div>
          </div>
          
        </main>
        
        {/* 阅读弹窗 */}
        <BlogModal post={activePost} onClose={() => setActivePost(null)} />
      </div>
    </div>
  );
}