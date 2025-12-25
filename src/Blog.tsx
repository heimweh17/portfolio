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
  Clock,
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
  mood?: string;
  image?: string;
  excerpt: string;
  content: React.ReactNode;
};

// --- 博客数据 ---
const POSTS: BlogPost[] = [
  {
    id: "4",
    title: "知情",
    date: "2025-12-20",
    tags: ["存档"],
    mood: "sad",
    excerpt: "反反复复",
    content: (
      <div className="space-y-4">
        <p>我其实知道发生了什么</p>
        <p>我可以装作不知道，但我很伤心，真的。</p>
        <p>写于Gainesville, FL</p>
      </div>
    ),
  },
  {
    id: "3",
    title: "结束",
    date: "2025-12-20",
    tags: ["存档"],
    mood: "sad",
    excerpt: "一切都结束了",
    content: (
      <div className="space-y-4">
        <p>希望是一种毒药</p>
        <p>一切都结束了</p>
        <p>写于Coral Springs, FL</p>
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
        <p>hello world!</p>
        <p>还在等待。</p>
        <p>等待戈多。</p>
        <p>写于Coral Springs, FL</p>
      </div>
    ),
  },
];

// --- 辅助组件 ---

// 1. 复古网格 (固定深色)
const RetroGrid = () => {
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
      ctx.strokeStyle = "rgba(56, 189, 248, 0.1)";
      ctx.lineWidth = 1;
      const gridSize = 40;
      for (let x = 0; x <= w; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
      for (let y = 0; y <= h; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }
      const gradient = ctx.createRadialGradient(
        mouse.x,
        mouse.y,
        0,
        mouse.x,
        mouse.y,
        300
      );
      gradient.addColorStop(0, "rgba(56, 189, 248, 0.15)");
      gradient.addColorStop(1, "transparent");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, w, h);
      requestAnimationFrame(drawGrid);
    };
    const handleResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    drawGrid();
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);
  return (
    <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none" />
  );
};

// 2. 聚光灯卡片 (固定深色)
const SpotlightCard = ({
  children,
  className = "",
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  function handleMouseMove({
    currentTarget,
    clientX,
    clientY,
  }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }
  return (
    <div
      className={`group relative border overflow-hidden rounded-2xl transition-all duration-300 bg-slate-900/80 border-slate-800 [--spotlight-color:rgba(56,189,248,0.25)] ${
        onClick ? "cursor-pointer hover:shadow-lg hover:shadow-sky-500/10" : ""
      } ${className}`}
      onMouseMove={handleMouseMove}
      onClick={onClick}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`radial-gradient(500px circle at ${mouseX}px ${mouseY}px, var(--spotlight-color), transparent 80%)`,
        }}
      />
      <div className="relative h-full p-6 z-10">{children}</div>
    </div>
  );
};

// 3. 文章阅读弹窗
const BlogModal = ({
  post,
  onClose,
}: {
  post: BlogPost | null;
  onClose: () => void;
}) => {
  return (
    <AnimatePresence>
      {post && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm px-4 py-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="w-full max-w-2xl max-h-full bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl relative flex flex-col overflow-hidden"
            initial={{ scale: 0.9, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 10, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header / Meta */}
            <div className="p-6 border-b border-slate-800 bg-slate-900/50 shrink-0">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-3 text-xs text-slate-400 mb-2 font-mono">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" /> {post.date}
                    </span>
                    {post.mood && (
                      <span className="bg-slate-800 px-1.5 py-0.5 rounded text-[10px]">
                        {post.mood} 心情
                      </span>
                    )}
                  </div>
                  <h2 className="text-2xl font-bold text-slate-100 leading-tight">
                    {post.title}
                  </h2>
                </div>
                <button
                  onClick={onClose}
                  className="shrink-0 p-2 rounded-full hover:bg-slate-800 text-slate-400 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex flex-wrap gap-2 mt-4">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] px-2 py-1 rounded-full bg-sky-900/30 text-sky-300 font-medium"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Scrollable Content */}
            <div className="p-6 overflow-y-auto custom-scrollbar">
              {post.image && (
                <div className="mb-6 rounded-xl overflow-hidden border border-slate-800">
                  <div className="aspect-video bg-slate-950 flex items-center justify-center text-slate-400">
                    {post.image.includes("http") ||
                    post.image.startsWith("/") ? (
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="flex flex-col items-center gap-2">
                        <ImageIcon className="w-8 h-8 opacity-50" />
                        <span className="text-xs">
                          （这里是配图占位：{post.image}）
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              <div className="prose prose-invert prose-sm sm:prose-base max-w-none leading-relaxed text-slate-300">
                {post.content}
              </div>

              <div className="mt-12 pt-8 border-t border-slate-800 text-center">
                <div className="inline-flex items-center gap-2 text-slate-500 text-xs font-mono">
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
};

// --- 主页面组件 ---

export default function Blog() {
  const [activePost, setActivePost] = useState<BlogPost | null>(null);

  // 简单的滚动进度条
  const [scrollProgress, setScrollProgress] = useState(0);
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      const docHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      setScrollProgress(docHeight > 0 ? scrollTop / docHeight : 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 强制确保 html 标签有 dark 类（双保险）
  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  return (
    <div className="dark">
      <div className="font-sans antialiased min-h-screen bg-slate-950 text-slate-100 transition-colors duration-300 relative selection:bg-pink-500/30 selection:text-pink-300">
        {/* 背景 */}
        <RetroGrid />

        {/* 顶部导航 */}
        <header className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/80 relative">
          <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <a
                href="/zh"
                className="group flex items-center gap-2 font-bold text-xs tracking-wider text-slate-100 uppercase hover:text-sky-400 transition-colors"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                <span>返回主页</span>
              </a>
            </div>
          </div>
          {/* 进度条 */}
          <div className="absolute bottom-0 left-0 w-full h-[1px] bg-slate-800/50 overflow-hidden">
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
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-400 text-[10px] font-bold mb-4"
            >
              <Coffee className="w-3 h-3" />
              <span>个人空间</span>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-bold mb-4 text-white"
            >
              我的随笔
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-slate-400 max-w-xl text-sm leading-relaxed"
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
                      <h3 className="text-lg font-bold text-slate-100 group-hover:text-pink-400 transition-colors">
                        {post.title}
                      </h3>
                    </div>
                  </div>

                  {post.image && (
                    <div className="mb-4 rounded-lg overflow-hidden h-32 bg-slate-950 flex items-center justify-center border border-slate-800">
                      {post.image.includes("http") ||
                      post.image.startsWith("/") ? (
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <ImageIcon className="text-slate-700 w-6 h-6" />
                      )}
                    </div>
                  )}

                  <p className="text-sm text-slate-400 leading-relaxed line-clamp-3 mb-6 flex-1">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center justify-between border-t border-slate-800 pt-4 mt-auto">
                    <div className="flex gap-2">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] text-slate-500 font-mono"
                        >
                          #{tag}
                        </span>
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
            <div className="inline-flex items-center gap-2 text-xs text-slate-500">
              <Clock className="w-3 h-3" />
              <span>更多故事正在发生中...</span>
            </div>
          </div>
        </main>

        {/* 阅读弹窗 */}
        <BlogModal
          post={activePost}
          onClose={() => setActivePost(null)}
        />
      </div>
    </div>
  );
}
