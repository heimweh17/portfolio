import React, { useState, useEffect, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useMotionTemplate,
  useMotionValue,
} from "framer-motion";
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  FileText,
  MapPin,
  Calendar,
  Code2,
  Briefcase,
  Phone,
  ChevronDown,
  ChevronUp,
  Terminal,
  Cpu,
  Award,
  Instagram,
  Languages,
  Camera,
  X,
  Zap,
  Sun,
  Moon,
  BookOpen,
  Globe,
} from "lucide-react";

// --- 类型定义 (Type Definitions) ---
// These must be at the top to avoid Reference Errors

type ModalLink = {
  label: string;
  href: string;
  icon?: React.ComponentType<{ className?: string }>;
};

type ModalContent = {
  title: string;
  subtitle?: string;
  eyebrow?: string;
  body: React.ReactNode;
  tags?: string[];
  links?: ModalLink[];
};

type SkillItem = {
  name: string;
  blurb: string;
  usedIn?: string;
};

type SkillGroup = {
  group: string;
  icon: React.ComponentType<{ className?: string }>;
  items: SkillItem[];
};

// --- 站点配置 ---
const SITE = {
  name: "刘昊洲",
  headline: "刘昊洲",
  tagline: "佛罗里达大学计算机科学专业 · 地理学辅修",
  location: "Gainesville, FL",
  latlong: "29.6516° N, 82.3248° W",
  links: {
    github: "https://github.com/heimweh17",
    linkedin: "https://www.linkedin.com/in/alex-liu7/",
    instagram: "https://www.instagram.com/alexliu1700/",
    email: "haozhouliu17@gmail.com",
    resume: "/resume.pdf",
    phone: "+1 (352) 328-4805",
    map: "https://www.google.com/maps/place/Gainesville,+FL",
    website: "https://aliu.me/",
    blog: "/blog",
  },
};

const FORM_ENDPOINT = "https://formspree.io/f/mkglvylk";

// --- 辅助组件 ---

// 1. 复古网格背景
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

      ctx.strokeStyle = isDark
        ? "rgba(56, 189, 248, 0.1)"
        : "rgba(148, 163, 184, 0.15)";

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

      if (isDark) {
        gradient.addColorStop(0, "rgba(56, 189, 248, 0.15)");
        gradient.addColorStop(1, "transparent");
      } else {
        gradient.addColorStop(0, "rgba(14, 165, 233, 0.1)");
        gradient.addColorStop(1, "transparent");
      }

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
  }, [isDark]);

  return (
    <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none" />
  );
};

// 2. 聚光灯卡片
interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const SpotlightCard = ({ children, className = "", onClick }: CardProps) => {
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

  const clickable = Boolean(onClick);

  return (
    <div
      className={`group relative border overflow-hidden rounded-2xl transition-all duration-300
        bg-white/80 border-slate-200 
        dark:bg-slate-900/80 dark:border-slate-800 
        [--spotlight-color:rgba(14,165,233,0.15)] 
        dark:[--spotlight-color:rgba(56,189,248,0.25)]
        ${clickable ? "cursor-pointer hover:shadow-lg dark:hover:shadow-[0_0_30px_rgba(56,189,248,0.1)]" : ""} 
        ${className}`}
      onMouseMove={handleMouseMove}
      onClick={onClick}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              500px circle at ${mouseX}px ${mouseY}px,
              var(--spotlight-color),
              transparent 80%
            )
          `,
        }}
      />
      <div className="relative h-full p-6 z-10">{children}</div>
    </div>
  );
};

// --- 中文数据 ---

const ABOUT = {
  blurb:
    "佛罗里达大学计算机科学专业学生，喜欢让代码、数据和地理交汇的题目。我享受把杂乱的真实世界信息变成直观、好用的工具——不管是地图、数据看板，还是能帮别人省时间的小脚本。在美国拥有合法工作资格，目前与未来都不需要雇主提供签证赞助。",
  highlights: [
    "核心方向：数据结构、算法、系统与全栈开发",
    "常用技术：C++、Python、TypeScript、React、Flask、SQL、Docker",
    "兴趣领域：地理信息（GIS）、数据驱动系统、无障碍与人机交互",
  ],
};

const EDUCATION = [
  {
    school: "University of Florida",
    degree: "计算机科学学士（地理学辅修）",
    gpa: "GPA 3.80/4.00",
    period: "2024 – 2028（预计）",
    honors: "Dean's List（院长名单）",
    activities: "UF SASE · UF CASA",
    logo: "/logos/uf_logo.png",
  },
  {
    school: "Buchholz High School",
    gpa: "GPA 4.79",
    period: "2020 – 2024",
    activities: "Science Team · Math Team · Quiz Bowl",
    logo: "/logos/buchholz_logo.png",
  },
];

const EXPERIENCE = [
  {
    role: "Instructor（讲师）",
    org: "Logic Lab",
    period: "Jun 2022 – Jul 2022",
    location: "Gainesville, FL",
    bullets: [
      "为 30+ 小学生与初中生规划并教授数学与国际象棋课程，把抽象概念拆成可跟着做的步骤。",
      "根据学生的课堂反馈每周微调教案，有点像迭代技术项目的需求与设计。",
      "与 6 人团队合作改作业、给反馈，并在课堂上通过提问引导学生自己思考与解题。",
    ],
    link: "http://www.logiclabgainesville.com/",
  },
  {
    role: "Cultural Performer（文化表演者）",
    org: "JiaTing Lion & Dragon",
    period: "Jan 2025 – May 2025",
    location: "Gainesville, FL",
    bullets: [
      "在校内外活动中为 300+ 观众表演传统舞狮、舞龙，参与节日庆典与文化活动。",
      "在高强度排练中练习节奏感、队友间的沟通与默契，在压力下保持整套动作同步。",
      "协助后台走位与节目衔接，保证活动流程顺畅、场面有序。",
    ],
    logo: "/logos/jiating_logo.jpg",
    link: "https://jiatingliondragon.com/",
  },
];

const VOLUNTEER = [
  {
    role: "志愿制图者（Mapper）",
    org: "OpenStreetMap",
    period: "Sep 2020 – Present",
    bullets: [
      "长期在不同地区为道路、兴趣点（POI）与土地利用等要素做地图编辑与维护。",
      "在更新几何形状或标签前，会交叉对比卫星影像、街景、本地经验与其他数据来源。",
      "很享受看到自己一次小小的编辑，后来变成下游应用里更好的导航、分析与可视化。",
    ],
    logo: "/logos/osm_logo.svg",
    link: "https://www.openstreetmap.org/",
  },
  {
    role: "Instructor（讲师）",
    org: "Buchholz Math Team",
    period: "Jun 2022 – Jul 2022 ; Jun 2023 – Jul 2023",
    bullets: [
      "在暑期营中为小学生与初中生讲解数学，帮助他们提升解题能力、逻辑思维与批判性思考。",
      "编写讲义、批改练习题，更偏向引导学生自己“调试思路”，而不是直接给出答案。",
    ],
    logo: "/logos/bhs_logo.png",
    link: "https://buchholzmathteam.org/",
  },
];

const LEADERSHIPS = [
  {
    role: "SASE 实习生（SASE Intern）",
    org: "UF Society of Asian Scientists & Engineers",
    period: "Aug 2025 – Present",
    bullets: [
      "协助筹办 100+ 人参加的职业发展与技术活动，负责现场布置、信息传达与现场协调，单场活动人数可达 150+。",
    ],
    logo: "/logos/sase_logo.jpg",
    link: "https://ufsase.com/",
  },
  {
    role: "活动组成员（Event Committee Member）",
    org: "UF Chinese American Student Association",
    period: "2024 – Present",
    bullets: [
      "协助策划与执行校园文化活动，突出华裔身份与文化，在校园内搭建交流与社群空间。",
    ],
    logo: "/logos/casa_logo.jpg",
    link: "https://orgs.studentinvolvement.ufl.edu/Organization/Chinese-American-Student-Association",
  },
];

const PROJECTS = [
  {
    name: "Geography Dashboard",
    flagship: true,
    blurb: "交互式地理看板，从 OpenStreetMap 拉取实时数据，用地图对比不同城市的设施与格局。",
    impact:
      "支持搜索全球城市、切换图层，并在流畅的平移与筛选中浏览 1 万+ OSM 要素。",
    tech: ["React", "Leaflet", "Supabase(SQL)", "Vite", "TypeScript"],
    links: {
      demo: "https://thegeodashboard.vercel.app/",
      code: "https://github.com/heimweh17/Geo-Dashboard",
    },
    screenshots: [
      "/screenshots/geodashboard-1.png",
      "/screenshots/geodashboard-2.png",
    ],
    categories: ["地理与地图", "Web 与数据"],
  },
  {
    name: "UF Health SmartScribe",
    flagship: true,
    blurb: "将医患对话自动转成结构化 SOAP 病程记录的 AI 辅助书写工具。",
    impact:
      "支持实时转录与说话人分离，并生成可编辑的 SOAP 模板，在模拟流程中显著减少手动记录时间。",
    tech: [
      "JavaScript",
      "HTML/CSS",
      "Supabase",
      "PostgreSQL",
      "DeepGram API",
      "Gemini API",
    ],
    links: { demo: "", code: "https://github.com/heimweh17/SmartScribe" },
    screenshots: [
      "/screenshots/smartscribe-1.png",
      "/screenshots/smartscribe-2.png",
    ],
    categories: ["健康与无障碍", "Web 与数据"],
  },
  {
    name: "Grade Track",
    flagship: true,
    blurb: "读入课程成绩 CSV，生成分布、趋势与高风险学生段的可视化看板。",
    impact:
      "整套环境通过 Docker 一键启动，把原本散乱的原始数据快速变成交互图表与摘要。",
    tech: ["Flask", "React", "SQLAlchemy", "PostgreSQL", "Docker"],
    links: { demo: "", code: "https://github.com/heimweh17/Grade-Track" },
    screenshots: ["/screenshots/gradetrack-1.png"],
    categories: ["Web 与数据"],
  },
  {
    name: "Ability Bridge",
    flagship: true,
    blurb: "通过头部姿态控制鼠标、嘴部莫尔斯码输入与面部表情点击的无障碍交互工具包。",
    impact:
      "在约 30 FPS、<100 ms 延迟下实现全程免手操作，探索用计算机视觉支持无障碍场景的可能性。",
    tech: ["Python", "OpenCV", "MediaPipe", "PyAutoGUI"],
    links: { demo: "", code: "https://github.com/heimweh17/Ability-Bridge" },
    categories: ["健康与无障碍", "C++ / 算法"],
  },
  {
    name: "Minesweeper (SFML)",
    blurb: "用 C++ 实现的扫雷游戏：递归翻格子、插旗、暂停 / 调试模式、计时器与排行榜持久化。",
    impact:
      "基于模块化 OOP 设计与文件 I/O 存储前五名成绩，在约 350 个格子的棋盘上也能稳定管理游戏状态切换。",
    tech: ["C++", "SFML"],
    links: { demo: "", code: "https://github.com/heimweh17/Minesweeper-game" },
    categories: ["C++ / 算法"],
  },
  {
    name: "Bin Packing: Best-Fit vs First-Fit",
    blurb: "比较 Best-Fit 与 First-Fit 算法，在 10 万+ 矩形数据上分析时间与装箱效率的权衡。",
    impact:
      "提供可复用的实验框架，用来测试启发式策略、采集指标，并可视化不同策略的表现差异。",
    tech: ["C++"],
    links: {
      demo: "",
      code: "https://github.com/heimweh17/best-fit-fitst-fit",
    },
    categories: ["C++ / 算法"],
  },
  {
    name: "AVL Tree Data Structure",
    blurb: "自实现 AVL 平衡二叉树，支持插入、删除、查找与旋转维护，用于管理有序学生记录。",
    impact:
      "在 1,000+ 次操作中保持高度平衡，并用自写测试集覆盖边界情况与旋转场景。",
    tech: ["C++"],
    links: { code: "https://github.com/heimweh17/AVL-TREE" },
    categories: ["C++ / 算法"],
  },
  {
    name: "Sudoku Game",
    blurb: "基于 Python 的数独小游戏，支持多难度、合法性检查与流畅的交互体验。",
    impact:
      "实现清晰的游戏状态管理、明确的错误提示与重置操作，兼顾用户体验与正确性。",
    tech: ["Python"],
    links: { code: "https://github.com/heimweh17/suduku-project" },
    categories: ["C++ / 算法"],
  },
];

const PROJECT_FILTERS = [
  "全部",
  "核心",
  "地理与地图",
  "健康与无障碍",
  "Web 与数据",
  "C++ / 算法",
];

const HOBBIES = [
  {
    name: "羽毛球",
    emoji: "🏸",
    blurb: "节奏快，交流多，运动量刚刚好。",
    details: [
      "通常打双打，把站位和轮转当成一个小型“策略游戏”。",
      "是写代码或学习一天之后最好的重启按钮之一。",
    ],
    tags: ["双打", "步伐", "下课后的 reset"],
  },
  {
    name: "匹克球（Pickleball）",
    emoji: "🥒",
    blurb: "上手简单，但实际上可以很“较真”。",
    details: [
      "大多数时候是轻松的休闲局，但我会很在意落点与旋转。",
      "是认识非 CS 圈子新朋友的好方式。",
    ],
    tags: ["休闲局", "kitchen 线", "新朋友"],
  },
  {
    name: "摄影散步",
    emoji: "📷",
    blurb: "边走边拍，也顺便在脑子里“编辑地图”。",
    details: [
      "会注意到街道细节、标识与模式，这些在卫星图上是看不出来的。",
      "经常会回过头把这些发现补充到 OpenStreetMap 里。",
    ],
    tags: ["街景细节", "城市纹理", "OSM 模式"],
  },
  {
    name: "自驾与公路旅行",
    emoji: "🚗",
    blurb: "长途驾驶、播放列表，以及一路变化的地貌。",
    details: [
      "喜欢在效率与“好玩中途点”之间平衡路线设计。",
      "是听有声书、播客，或者安静想项目想法的好时间。",
    ],
    tags: ["高速路", "有声书", "顺路小绕路"],
  },
];

const SKILLS: SkillGroup[] = [
  {
    group: "编程语言",
    icon: Terminal,
    items: [
      {
        name: "C++",
        blurb: "主要语言，用在数据结构、算法与偏系统性质的项目里。",
        usedIn: "AVL Tree、Minesweeper、装箱算法、PageRank 作业等。",
      },
      {
        name: "Python",
        blurb: "做小实验、脚本与计算机视觉时的首选。",
        usedIn: "Ability Bridge、Sudoku 以及一些数据脚本。",
      },
      {
        name: "TypeScript",
        blurb: "在 React 看板里用来提升类型安全与开发体验。",
        usedIn: "Geography Dashboard 与个人主页。",
      },
      {
        name: "SQL",
        blurb: "熟悉设计表结构与写查询，用于分析与应用后端。",
        usedIn: "Grade Track、SmartScribe 以及基于 Supabase 的项目。",
      },
      {
        name: "Java",
        blurb: "在课程中使用，用来理解强类型 OOP 模式。",
      },
      {
        name: "RISC-V",
        blurb: "在底层课程里用来理解代码如何映射到硬件指令。",
      },
    ],
  },
  {
    group: "框架与工具",
    icon: Code2,
    items: [
      {
        name: "React",
        blurb: "默认的交互式界面与数据看板首选框架。",
        usedIn: "Geo Dashboard、个人主页、Grade Track 前端。",
      },
      {
        name: "Flask",
        blurb: "轻量但够用的后端 / API 框架，适合数据与分析应用。",
        usedIn: "Grade Track 后端。",
      },
      {
        name: "FastAPI",
        blurb: "用来快速搭建带类型提示与自动文档的 JSON API。",
      },
      {
        name: "Node",
        blurb: "在 Hackathon 与小原型里做后端粘合层。",
        usedIn: "SmartScribe 以及一些小工具。",
      },
      {
        name: "Vite",
        blurb: "构建工具首选，开发体验好，适合 TS + React。",
        usedIn: "Geo Dashboard 与前端实验项目。",
      },
      {
        name: "Tailwind",
        blurb: "原子化 CSS，让我能快速做出统一风格的界面。",
        usedIn: "个人主页与几个仪表盘 UI。",
      },
    ],
  },
  {
    group: "数据与基础设施",
    icon: Cpu,
    items: [
      {
        name: "PostgreSQL",
        blurb: "偏爱的关系型数据库，用于结构化数据项目。",
        usedIn: "SmartScribe、Grade Track、Supabase 项目。",
      },
      {
        name: "Docker",
        blurb: "用来保证开发环境可复现，降低“跑不起来”的摩擦。",
        usedIn: "Grade Track 技术栈与本地开发环境。",
      },
      {
        name: "Git",
        blurb: "日常版本控制与协作工具。",
      },
      {
        name: "CI",
        blurb: "可以搭简单的流水线做自动测试与构建。",
      },
      {
        name: "Grafana",
        blurb: "用来画指标与感受“监控面板”式的可视化。",
      },
    ],
  },
  {
    group: "领域与兴趣",
    icon: Code2,
    items: [
      {
        name: "Algorithms",
        blurb: "关心在时间、空间与实现复杂度之间怎么做权衡。",
        usedIn: "装箱问题、AVL 树以及作业 / 竞赛风格题目。",
      },
      {
        name: "Data Structures",
        blurb: "喜欢从零实现树、图和一些定制结构。",
        usedIn: "AVL 树项目与路径搜索类问题。",
      },
      {
        name: "Geospatial (GIS)",
        blurb: "觉得 CS 和地理的交汇点非常有趣：地图、路径规划、空间推理。",
        usedIn: "OpenStreetMap 编辑与 Geo Dashboard。",
      },
      {
        name: "Computer Vision",
        blurb: "对基于摄像头的人机交互与无障碍辅助特别感兴趣。",
        usedIn: "Ability Bridge 及相关原型。",
      },
    ],
  },
];

const CONTACT = {
  note: "开放 2026 年暑期实习机会，特别是与后端系统、数据、IT 或地理信息应用相关的岗位。也很乐意聊地图、基础设施、无障碍设计，或者你正在做的项目。",
};

// --- 主要组件 ---

const DetailModal = ({
  modal,
  onClose,
}: {
  modal: ModalContent | null;
  onClose: () => void;
}) => {
  return (
    <AnimatePresence>
      {modal && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="max-w-xl w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl p-6 shadow-2xl relative overflow-hidden"
            initial={{ scale: 0.9, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 10, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Background Decor */}
            <div className="absolute top-0 right-0 -mt-10 -mr-10 w-32 h-32 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="flex items-start justify-between gap-4 mb-3 relative z-10">
              <div className="space-y-1">
                {modal.eyebrow && (
                  <div className="text-[10px] font-semibold tracking-[0.18em] text-sky-600 dark:text-sky-400 uppercase">
                    {modal.eyebrow}
                  </div>
                )}
                <h2 className="text-xl font-bold text-slate-900 dark:text-slate-50 tracking-tight">
                  {modal.title}
                </h2>
                {modal.subtitle && (
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                    {modal.subtitle}
                  </p>
                )}
              </div>
              <button
                onClick={onClose}
                className="shrink-0 w-8 h-8 rounded-full border border-slate-200 dark:border-slate-700/80 flex items-center justify-center text-slate-400 hover:text-sky-500 dark:hover:text-sky-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {modal.tags && modal.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mb-5 relative z-10">
                {modal.tags.map((t) => (
                  <span
                    key={t}
                    className="px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 text-[10px] font-medium text-slate-600 dark:text-slate-300"
                  >
                    {t}
                  </span>
                ))}
              </div>
            )}

            <div className="mb-6 text-sm text-slate-600 dark:text-slate-300 space-y-3 relative z-10 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
              {modal.body}
            </div>

            {modal.links && modal.links.length > 0 && (
              <div className="flex flex-wrap gap-3 pt-4 border-t border-slate-100 dark:border-slate-800 relative z-10">
                {modal.links.map((l) => {
                  const Icon = l.icon;
                  return (
                    <a
                      key={l.href}
                      href={l.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold bg-sky-50 dark:bg-sky-500/10 text-sky-600 dark:text-sky-300 border border-sky-100 dark:border-sky-500/20 hover:bg-sky-100 dark:hover:bg-sky-500/20 transition-all"
                    >
                      {Icon && <Icon className="w-3.5 h-3.5" />}
                      <span>{l.label}</span>
                    </a>
                  );
                })}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const Section = ({
  id,
  title,
  children,
  icon: Icon,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
  icon?: React.ComponentType<{ className?: string }>;
}) => (
  <section
    id={id}
    className="scroll-mt-24 max-w-6xl mx-auto px-6 py-16 text-slate-900 dark:text-slate-100 relative z-10"
  >
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center gap-3 mb-8">
        <div className="inline-flex items-center gap-2 rounded-full bg-white dark:bg-slate-900/80 px-4 py-1.5 border border-slate-200 dark:border-slate-700 shadow-sm dark:shadow-[0_0_30px_rgba(56,189,248,0.15)]">
          {Icon && <Icon className="w-4 h-4 text-sky-500 dark:text-sky-400" />}
          <span className="text-[11px] font-bold tracking-[0.15em] text-slate-700 dark:text-slate-200 uppercase">
            {title}
          </span>
        </div>
      </div>
      {children}
    </motion.div>
  </section>
);

function MessageForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (status === "success" || status === "error") {
      setStatus("idle");
      setError("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.message.trim()) {
      setError("请先写一点想说的话。");
      setStatus("error");
      return;
    }

    try {
      setStatus("submitting");
      setError("");

      const res = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
        setError("好像出了点问题，请稍后再试。");
      }
    } catch {
      setStatus("error");
      setError("网络好像有点问题，请稍后重试。");
    }
  };

  return (
    <SpotlightCard className="mt-8">
      <div className="mb-5">
        <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 mb-1">
          留言给我
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed max-w-md">
          可以随便写：项目、实习、地图、生活碎片，或者你想跟我分享的任何事情。
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-[11px] font-medium text-slate-600 dark:text-slate-300 mb-1.5">
              昵称（可选）
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full rounded-lg bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 px-3 py-2 text-xs text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:outline-none focus:ring-1 focus:ring-sky-400 focus:border-sky-400 transition-colors"
              placeholder="我应该怎么称呼你？"
            />
          </div>
          <div>
            <label className="block text-[11px] font-medium text-slate-600 dark:text-slate-300 mb-1.5">
              邮箱（可选，如果希望我回信）
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full rounded-lg bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 px-3 py-2 text-xs text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:outline-none focus:ring-1 focus:ring-sky-400 focus:border-sky-400 transition-colors"
              placeholder="you@example.com"
            />
          </div>
        </div>

        <div>
          <label className="block text-[11px] font-medium text-slate-600 dark:text-slate-300 mb-1.5">
            留言内容 <span className="text-sky-500 dark:text-sky-400">*</span>
          </label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            className="w-full min-h-[120px] rounded-lg bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 px-3 py-2 text-xs text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:outline-none focus:ring-1 focus:ring-sky-400 focus:border-sky-400 resize-vertical transition-colors"
            placeholder="想跟我说些什么……"
          />
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center gap-3 justify-between">
          <motion.button
            type="submit"
            disabled={status === "submitting"}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-sky-500 text-white dark:text-slate-950 text-[11px] font-bold tracking-wide hover:bg-sky-400 disabled:opacity-60 disabled:cursor-not-allowed transition-all shadow-[0_0_20px_rgba(56,189,248,0.4)]"
            whileHover={status !== "submitting" ? { y: -1, scale: 1.02 } : {}}
            whileTap={status !== "submitting" ? { scale: 0.97 } : {}}
          >
            {status === "submitting" ? "发送中..." : "发送留言"}
          </motion.button>
        </div>

        {status === "success" && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[11px] text-emerald-500 dark:text-emerald-400 mt-2 font-medium"
          >
            谢谢！你的留言已经发送成功。
          </motion.div>
        )}
        {status === "error" && error && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[11px] text-rose-500 dark:text-rose-400 mt-2 font-medium"
          >
            ⚠ {error}
          </motion.div>
        )}
      </form>
    </SpotlightCard>
  );
}

const NAV_ITEMS = [
  { id: "about", label: "关于" },
  { id: "projects", label: "项目" },
  { id: "experience", label: "经历" },
  { id: "skills", label: "技能" },
  { id: "hobbies", label: "爱好" },
  { id: "contact", label: "联系" },
];

export default function PortfolioChinese() {
  const [isDark, setIsDark] = useState(true);
  const [modal, setModal] = useState<ModalContent | null>(null);

  const firstSkillGroup = SKILLS[0];
  const firstSkillItem = firstSkillGroup?.items[0];
  const [activeSkill, setActiveSkill] = useState<{
    group: string;
    item: SkillItem;
  } | null>(
    firstSkillGroup && firstSkillItem
      ? { group: firstSkillGroup.group, item: firstSkillItem }
      : null
  );

  const [showExpandedProjects, setShowExpandedProjects] = useState(false);
  const [projectFilter, setProjectFilter] = useState<string>("全部");
  const [activeSection, setActiveSection] = useState<string>("about");
  const [scrollProgress, setScrollProgress] = useState(0);
  const [copiedField, setCopiedField] = useState<"email" | "phone" | null>(
    null
  );

  const SECTION_IDS = [
    "about",
    "projects",
    "experience",
    "skills",
    "hobbies",
    "contact",
  ];

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      const docHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const progress = docHeight > 0 ? scrollTop / docHeight : 0;
      setScrollProgress(progress);

      const sections = SECTION_IDS.map((id) =>
        document.getElementById(id)
      ).filter((el): el is HTMLElement => el !== null);

      let currentId = SECTION_IDS[0];
      let minDelta = Infinity;
      const viewportAnchor = window.innerHeight * 0.25;

      sections.forEach((sec) => {
        const rect = sec.getBoundingClientRect();
        if (rect.bottom > 0 && rect.top < window.innerHeight) {
          const delta = Math.abs(rect.top - viewportAnchor);
          if (delta < minDelta) {
            minDelta = delta;
            currentId = sec.id;
          }
        }
      });

      setActiveSection(currentId);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  const filteredProjects = PROJECTS.filter((p) => {
    if (projectFilter === "全部") return true;
    if (projectFilter === "核心") return p.flagship;
    return p.categories?.includes(projectFilter);
  });

  useEffect(() => {
    setShowExpandedProjects(false);
  }, [projectFilter]);

  const visibleProjects = showExpandedProjects
    ? filteredProjects
    : filteredProjects.slice(0, 3);

  const handleCopy = (value: string, field: "email" | "phone") => {
    if (
      typeof navigator !== "undefined" &&
      navigator.clipboard &&
      navigator.clipboard.writeText
    ) {
      navigator.clipboard
        .writeText(value)
        .then(() => {
          setCopiedField(field);
          setTimeout(() => setCopiedField(null), 1500);
        })
        .catch(() => {
          setCopiedField(field);
          setTimeout(() => setCopiedField(null), 1500);
        });
    } else {
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 1500);
    }
  };

  return (
    <div className={`${isDark ? "dark" : ""}`}>
      <div className="font-sans antialiased min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 selection:bg-sky-500/30 selection:text-sky-800 dark:selection:text-sky-200 transition-colors duration-300 relative">
        <RetroGrid isDark={isDark} />

        <motion.header
          initial={{ y: -16, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="sticky top-0 z-40 bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800/80 relative"
        >
          <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <motion.a
                href="#home"
                className="flex items-center gap-2 font-bold text-xs tracking-wider text-slate-900 dark:text-slate-100 uppercase"
                whileHover={{ scale: 1.05 }}
              >
                <span className="hidden sm:inline">刘昊洲</span>
                <span className="sm:hidden">AL</span>
              </motion.a>
            </div>

            <nav className="hidden md:flex items-center gap-6 text-[11px] font-medium text-slate-600 dark:text-slate-300">
              {NAV_ITEMS.map(({ id, label }) => {
                const isActive = activeSection === id;
                return (
                  <motion.a
                    key={id}
                    href={`#${id}`}
                    className={`relative transition-colors ${
                      isActive
                        ? "text-sky-600 dark:text-sky-300"
                        : "text-slate-500 dark:text-slate-400 hover:text-sky-500 dark:hover:text-sky-200"
                    }`}
                    whileHover={{ y: -1 }}
                  >
                    {label}
                    {isActive && (
                      <motion.span
                        layoutId="navHighlight"
                        className="absolute -bottom-1 left-0 right-0 h-[2px] bg-sky-500 dark:bg-sky-400 rounded-full"
                      />
                    )}
                  </motion.a>
                );
              })}
            </nav>
            <div className="flex items-center gap-3">
              <motion.button
                onClick={toggleTheme}
                className="p-2 rounded-full text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors border border-transparent hover:border-slate-200 dark:hover:border-slate-700"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                title={isDark ? "切换到浅色模式" : "切换到深色模式"}
              >
                {isDark ? (
                  <Sun className="w-4 h-4" />
                ) : (
                  <Moon className="w-4 h-4" />
                )}
              </motion.button>

              <motion.a
                href="/"
                className="inline-flex items-center gap-1.5 text-[11px] text-slate-500 dark:text-slate-400 hover:text-sky-600 dark:hover:text-sky-300 font-medium"
                whileHover={{ scale: 1.05 }}
                title="Switch to English"
              >
                <Languages className="w-4 h-4" />
                <span className="hidden sm:inline">English</span>
              </motion.a>
              <motion.a
                href={SITE.links.resume}
                className="inline-flex items-center gap-2 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 text-[11px] font-bold px-4 py-2 rounded-full hover:bg-slate-700 dark:hover:bg-white transition-colors shadow-lg dark:shadow-[0_0_20px_rgba(248,250,252,0.3)]"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FileText className="w-3.5 h-3.5" /> 简历
              </motion.a>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 w-full h-[1px] bg-slate-200 dark:bg-slate-800/50 overflow-hidden">
            <motion.div
              className="h-full bg-sky-500 shadow-[0_0_10px_rgba(56,189,248,0.8)]"
              style={{ scaleX: scrollProgress, transformOrigin: "0% 50%" }}
            />
          </div>
        </motion.header>

        <section
          id="home"
          className="relative overflow-hidden pt-24 pb-20 lg:pt-32 lg:pb-28"
        >
          <div className="max-w-6xl mx-auto px-6 relative z-10">
            <div className="grid md:grid-cols-5 gap-12 items-center">
              <motion.div
                className="md:col-span-3 space-y-6"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold uppercase tracking-wider"
                >
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  开放 2026 暑期实习申请
                </motion.div>

                <motion.h1
                  className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-slate-900 dark:text-white"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 }}
                >
                  {SITE.headline}
                </motion.h1>

                <p className="text-base font-medium text-sky-600 dark:text-sky-300/90 tracking-wide uppercase">
                  {SITE.tagline}
                </p>

                <a 
                  href={SITE.links.map}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mt-2 hover:text-sky-600 dark:hover:text-sky-300 transition-colors group cursor-pointer"
                >
                  <MapPin className="w-4 h-4 text-slate-600 dark:text-slate-500 group-hover:text-sky-500 transition-colors" />
                  <span>{SITE.location}</span>
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity text-[10px] font-mono text-slate-400 ml-1">
                    ({SITE.latlong})
                  </span>
                </a>

                <div className="text-sm md:text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-xl">
                  <p>我在学计算机科学，比较关注算法、数据结构，以及怎样把数据做成“看得见、点得动”的东西。最近做的项目主要围绕地理可视化、医疗工具以及和无障碍相关的交互界面。</p>
                </div>

                <div className="flex flex-wrap gap-3 pt-4">
                  {[
                    { href: SITE.links.github, icon: Github, label: "GitHub" },
                    {
                      href: SITE.links.linkedin,
                      icon: Linkedin,
                      label: "LinkedIn",
                    },
                    {
                      href: SITE.links.instagram,
                      icon: Instagram,
                      label: "Instagram",
                    },
                    {
                      href: `mailto:${SITE.links.email}`,
                      icon: Mail,
                      label: "Email",
                    },
                  ].map(({ href, icon: Icon, label }) => (
                    <motion.a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-900/50 text-[11px] text-slate-700 dark:text-slate-200 hover:border-sky-400 hover:text-sky-500 dark:hover:text-sky-300 hover:bg-white dark:hover:bg-slate-900 transition-all cursor-pointer"
                      whileHover={{ y: -3 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Icon className="w-4 h-4" /> {label}
                    </motion.a>
                  ))}
                </div>
              </motion.div>

              <motion.div
                className="md:col-span-2 perspective-1000 flex flex-col gap-6"
                initial={{ opacity: 0, scale: 0.95, rotate: 2 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
              >
                <motion.div 
                  className="relative group cursor-pointer"
                  whileHover={{ rotateY: 5, rotateX: -5, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <motion.div
                    className="absolute -inset-1 rounded-3xl bg-gradient-to-tr from-sky-400/60 via-indigo-400/50 to-emerald-400/50 blur-2xl opacity-60 group-hover:opacity-100 transition-opacity duration-500"
                    aria-hidden="true"
                  />
                  <img
                    src="/me.jpg"
                    alt="Alex Liu"
                    className="relative w-full object-cover rounded-3xl border border-slate-200 dark:border-slate-700/50 shadow-2xl"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                </motion.div>

                <motion.a
                  href={SITE.links.blog}
                  className="group flex items-center justify-center gap-2 w-full px-6 py-3 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 text-white font-bold text-sm shadow-lg shadow-sky-500/20 hover:shadow-sky-500/40 transition-all"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <BookOpen className="w-4 h-4 group-hover:rotate-6 transition-transform" />
                  <span>访问我的博客 (Blog)</span>
                  <ExternalLink className="w-3 h-3 opacity-70 ml-1" />
                </motion.a>
              </motion.div>
            </div>
          </div>
        </section>

        <Section id="about" title="个人简介" icon={Briefcase}>
          <div className="grid lg:grid-cols-3 gap-8">
            <SpotlightCard className="lg:col-span-2">
              <h3 className="text-xs font-bold text-slate-900 dark:text-slate-200 mb-4 uppercase tracking-wider flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-sky-400" />
                关于我
              </h3>
              <div className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6 space-y-4">
                <p>{ABOUT.blurb}</p>
              </div>
              <ul className="space-y-3 mb-4">
                {ABOUT.highlights.map((h, i) => (
                  <motion.li
                    key={i}
                    className="flex gap-3 text-sm text-slate-700 dark:text-slate-200"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Code2 className="shrink-0 w-4 h-4 text-sky-500 dark:text-sky-400 mt-0.5" />
                    <span>{h}</span>
                  </motion.li>
                ))}
              </ul>

              <div className="mt-6 border-t border-slate-200 dark:border-slate-800 pt-4">
                <div className="flex flex-wrap gap-2">
                  {[
                    "算法与数据结构",
                    "系统设计",
                    "GIS / 地图",
                    "无障碍 / 人机交互",
                  ].map((t) => (
                    <motion.span
                      key={t}
                      whileHover={{ scale: 1.05 }}
                      className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-900 text-[10px] font-medium border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:border-sky-500/50 hover:text-sky-600 dark:hover:text-sky-300 transition-colors cursor-default"
                    >
                      {t}
                    </motion.span>
                  ))}
                </div>
              </div>
            </SpotlightCard>

            <SpotlightCard>
              <div className="flex items-center gap-2 mb-4">
                <Calendar className="w-4 h-4 text-sky-500 dark:text-sky-400" />
                <h3 className="text-xs font-bold text-slate-900 dark:text-slate-200 uppercase tracking-wider">
                  教育背景
                </h3>
              </div>
              <div className="space-y-5">
                {EDUCATION.map((edu, i) => (
                  <div key={i} className="flex items-start gap-4 group">
                    {edu.logo && (
                      <div className="shrink-0 w-10 h-10 rounded-lg bg-slate-50 dark:bg-white/5 p-1 border border-slate-200 dark:border-white/10 group-hover:scale-110 transition-transform duration-300">
                        <img
                          src={edu.logo}
                          alt={edu.school}
                          className="w-full h-full object-contain"
                          loading="lazy"
                        />
                      </div>
                    )}
                    <div className="flex-1">
                      <h4 className="font-bold text-xs text-slate-900 dark:text-slate-100 mb-0.5">
                        {edu.school}
                      </h4>
                      {edu.degree && (
                        <p className="text-[11px] text-sky-600 dark:text-sky-200/90 mb-1 font-medium">
                          {edu.degree}
                        </p>
                      )}
                      <p className="text-[10px] text-slate-500 dark:text-slate-400 mb-1">
                        {edu.period}
                      </p>
                      {edu.honors && (
                        <p className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">
                          {edu.honors}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </SpotlightCard>
          </div>
        </Section>

        <Section id="projects" title="项目精选" icon={Code2}>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 max-w-3xl">
            这里是几段比较代表性的项目，体现了我喜欢的工作方式：把算法与数据结构和可视化、空间思维，以及真实用户的需求结合在一起。
          </p>

          <div className="flex flex-wrap gap-2 mb-8">
            {PROJECT_FILTERS.map((filter) => {
              const isActive = projectFilter === filter;
              return (
                <motion.button
                  key={filter}
                  type="button"
                  onClick={() => setProjectFilter(filter)}
                  className={`px-4 py-1.5 rounded-full text-[11px] font-medium border transition-all ${
                    isActive
                      ? "bg-sky-500 text-white dark:text-slate-950 border-sky-400 shadow-md"
                      : "bg-white/50 dark:bg-slate-950/50 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-sky-400 hover:text-sky-600 dark:hover:text-sky-200"
                  }`}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.97 }}
                >
                  {filter}
                </motion.button>
              );
            })}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {visibleProjects.map((p, i) => (
              <motion.div
                key={p.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                <SpotlightCard
                  className="h-full flex flex-col group"
                  onClick={() =>
                    setModal({
                      title: p.name,
                      subtitle: p.tech.join(" · "),
                      eyebrow: "项目详情",
                      tags: p.tech,
                      body: (
                        <div className="space-y-5">
                          <div className="space-y-2">
                            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                              {p.blurb}
                            </p>
                          </div>

                          {p.impact && (
                            <div className="bg-slate-50 dark:bg-slate-900/50 rounded-xl p-4 border border-slate-200 dark:border-slate-800">
                              <h4 className="text-xs font-bold text-sky-600 dark:text-sky-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                                <Zap className="w-3.5 h-3.5" /> 项目效果 & 亮点
                              </h4>
                              <p className="text-xs text-slate-700 dark:text-slate-200 leading-relaxed">
                                {p.impact}
                              </p>
                            </div>
                          )}

                          {p.screenshots && p.screenshots.length > 0 && (
                            <div className="space-y-2">
                              <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                                截图预览
                              </div>
                              <div className="grid grid-cols-2 gap-2">
                                {p.screenshots.map((src) => (
                                  <img
                                    key={src}
                                    src={src}
                                    alt={`${p.name} screenshot`}
                                    className="w-full h-24 object-cover rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900"
                                    loading="lazy"
                                  />
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      ),
                      links: [
                        p.links?.code
                          ? { label: "查看代码", href: p.links.code, icon: Code2 }
                          : null,
                        p.links?.demo
                          ? {
                              label: "在线体验",
                              href: p.links.demo,
                              icon: ExternalLink,
                            }
                          : null,
                      ].filter(Boolean) as ModalLink[],
                    })
                  }
                >
                  <div className="relative flex-1 flex flex-col">
                    {p.screenshots && p.screenshots.length > 0 && (
                      <div className="mb-4 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 relative">
                        <div className="absolute inset-0 bg-slate-900/5 dark:bg-slate-900/10 group-hover:bg-transparent transition-colors z-10" />
                        <motion.img
                          src={p.screenshots[0]}
                          alt={`${p.name} preview`}
                          className="w-full h-36 object-cover"
                          loading="lazy"
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.6 }}
                        />
                      </div>
                    )}

                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-sky-500 dark:group-hover:text-sky-300 transition-colors">
                        {p.name}
                      </h3>
                      {p.flagship && (
                        <span className="px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/30 text-[10px] font-bold text-amber-600 dark:text-amber-300">
                          核心
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-slate-600 dark:text-slate-400 mb-4 leading-relaxed line-clamp-3">
                      {p.blurb}
                    </p>

                    <div className="flex flex-wrap gap-1.5 mt-auto">
                      {p.tech.slice(0, 4).map((t) => (
                        <span
                          key={t}
                          className="text-[10px] px-2 py-1 bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-300 font-mono rounded border border-slate-200 dark:border-slate-800"
                        >
                          {t}
                        </span>
                      ))}
                      {p.tech.length > 4 && (
                        <span className="text-[10px] px-1.5 py-1 text-slate-500 font-mono">
                          +{p.tech.length - 4}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="relative flex gap-4 pt-4 mt-4 border-t border-slate-200 dark:border-slate-800/60">
                    {p.links?.code && (
                      <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-500 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
                        <Code2 className="w-3.5 h-3.5" /> 源码
                      </div>
                    )}
                    {p.links?.demo && (
                      <div className="flex items-center gap-1.5 text-[11px] font-bold text-sky-600 dark:text-sky-400 group-hover:text-sky-500 dark:group-hover:text-sky-300 transition-colors">
                        <ExternalLink className="w-3.5 h-3.5" /> 演示
                      </div>
                    )}
                  </div>
                </SpotlightCard>
              </motion.div>
            ))}
          </div>

          {filteredProjects.length > 3 && (
            <div className="mt-10 flex justify-center">
              <motion.button
                onClick={() => setShowExpandedProjects(!showExpandedProjects)}
                className="inline-flex items-center gap-2 px-6 py-2 border border-slate-200 dark:border-slate-700 rounded-full bg-white dark:bg-slate-900/50 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:border-sky-400 hover:text-slate-900 dark:hover:text-white transition-all shadow-sm"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                {showExpandedProjects ? (
                  <>
                    <ChevronUp className="w-4 h-4" /> 收起
                  </>
                ) : (
                  <>
                    <ChevronDown className="w-4 h-4" /> 查看更多项目
                  </>
                )}
              </motion.button>
            </div>
          )}
        </Section>

        <Section
          id="experience"
          title="经历与参与"
          icon={Briefcase}
        >
          <div className="space-y-12">
            {/* Work Experience */}
            <div>
              <h3 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-6 flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-sky-500" />
                工作经历
              </h3>
              <div className="space-y-6">
                {EXPERIENCE.map((x, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <SpotlightCard
                      onClick={() =>
                        setModal({
                          title: x.role,
                          subtitle: x.org,
                          eyebrow: `经历 · ${x.period}`,
                          body: (
                            <div className="space-y-4">
                              <p className="text-slate-600 dark:text-slate-300">
                                在{" "}
                                <span className="font-bold text-slate-900 dark:text-white">
                                  {x.org}
                                </span>
                                ，我担任{" "}
                                <span className="font-bold text-slate-900 dark:text-white">
                                  {x.role}
                                </span>
                                。
                              </p>
                              <ul className="space-y-2">
                                {x.bullets.map((b) => (
                                  <li
                                    key={b}
                                    className="flex gap-3 text-xs text-slate-600 dark:text-slate-300 leading-relaxed"
                                  >
                                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-sky-400" />
                                    <span>{b}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ),
                          links: x.link
                            ? [
                                {
                                  label: "访问官网",
                                  href: x.link,
                                  icon: ExternalLink,
                                },
                              ]
                            : undefined,
                        })
                      }
                    >
                      <div className="flex items-start gap-4">
                        {x.logo && (
                          <div className="shrink-0 w-12 h-12 bg-white rounded-lg overflow-hidden p-0.5 border border-slate-200 dark:border-slate-700">
                            <img
                              src={x.logo}
                              alt={x.org}
                              className="w-full h-full object-contain rounded-md"
                              loading="lazy"
                            />
                          </div>
                        )}
                        <div className="flex-1">
                          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-1">
                            <h4 className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-sky-500 dark:group-hover:text-sky-300 transition-colors">
                              {x.role}
                            </h4>
                            <span className="text-[10px] font-mono text-slate-500">
                              {x.period}
                            </span>
                          </div>
                          <div className="text-xs font-medium text-sky-600 dark:text-sky-400 mb-2">
                            {x.org}
                          </div>
                          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-2">
                            {x.bullets[0]}
                          </p>
                        </div>
                      </div>
                    </SpotlightCard>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Volunteer */}
            <div>
              <h3 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-6 flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                志愿服务
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                {VOLUNTEER.map((x, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <SpotlightCard
                      onClick={() =>
                        setModal({
                          title: x.role,
                          subtitle: x.org,
                          eyebrow: "志愿服务",
                          body: (
                            <div className="space-y-4">
                              <ul className="space-y-2">
                                {x.bullets.map((b) => (
                                  <li
                                    key={b}
                                    className="flex gap-3 text-xs text-slate-600 dark:text-slate-300"
                                  >
                                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-emerald-400" />
                                    <span>{b}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ),
                          links: x.link
                            ? [
                                {
                                  label: "相关组织",
                                  href: x.link,
                                  icon: ExternalLink,
                                },
                              ]
                            : undefined,
                        })
                      }
                    >
                      <div className="flex items-center gap-3 mb-2">
                        {x.logo && (
                          <img
                            src={x.logo}
                            className="w-6 h-6 object-contain"
                            alt=""
                          />
                        )}
                        <h4 className="font-bold text-xs text-slate-900 dark:text-white">
                          {x.org}
                        </h4>
                      </div>
                      <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium mb-1">
                        {x.role}
                      </div>
                      <div className="text-[10px] text-slate-500 mb-2">
                        {x.period}
                      </div>
                    </SpotlightCard>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Leadership */}
            <div>
              <h3 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-6 flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-indigo-500" />
                社团与领导力
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                {LEADERSHIPS.map((x, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <SpotlightCard
                      onClick={() =>
                        setModal({
                          title: x.role,
                          subtitle: x.org,
                          eyebrow: "领导力",
                          body: (
                            <div className="space-y-4">
                              <ul className="space-y-2">
                                {x.bullets.map((b) => (
                                  <li
                                    key={b}
                                    className="flex gap-3 text-xs text-slate-600 dark:text-slate-300"
                                  >
                                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-indigo-400" />
                                    <span>{b}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ),
                          links: x.link
                            ? [
                                {
                                  label: "相关链接",
                                  href: x.link,
                                  icon: ExternalLink,
                                },
                              ]
                            : undefined,
                        })
                      }
                    >
                      <div className="flex items-center gap-3 mb-2">
                        {x.logo && (
                          <img
                            src={x.logo}
                            className="w-6 h-6 rounded-md"
                            alt=""
                          />
                        )}
                        <h4 className="font-bold text-xs text-slate-900 dark:text-white">
                          {x.org}
                        </h4>
                      </div>
                      <div className="text-[11px] text-indigo-600 dark:text-indigo-400 font-medium mb-1">
                        {x.role}
                      </div>
                      <div className="text-[10px] text-slate-500 mb-2">
                        {x.period}
                      </div>
                    </SpotlightCard>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </Section>

        <Section id="skills" title="技能树" icon={Cpu}>
          <div className="grid lg:grid-cols-[minmax(0,1.6fr)_minmax(0,0.9fr)] gap-8 items-start">
            <div className="space-y-6">
              {SKILLS.map((g, i) => (
                <motion.div
                  key={g.group}
                  initial={{ opacity: 0, x: -15 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <SpotlightCard className="bg-white/50 dark:bg-slate-900/40 border-slate-200 dark:border-slate-800">
                    <div className="flex items-center gap-3 mb-4">
                      <g.icon className="w-4 h-4 text-sky-500 dark:text-sky-400" />
                      <h3 className="font-bold text-xs text-slate-700 dark:text-slate-200 uppercase tracking-wide">
                        {g.group}
                      </h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {g.items.map((s) => {
                        const isActive =
                          activeSkill &&
                          activeSkill.group === g.group &&
                          activeSkill.item.name === s.name;
                        return (
                          <motion.button
                            key={s.name}
                            type="button"
                            onMouseEnter={() =>
                              setActiveSkill({ group: g.group, item: s })
                            }
                            onFocus={() =>
                              setActiveSkill({ group: g.group, item: s })
                            }
                            className={`px-3 py-1.5 rounded-lg text-[11px] font-mono border transition-all ${
                              isActive
                                ? "bg-sky-500 text-white dark:text-slate-950 border-sky-400 shadow-[0_0_15px_rgba(56,189,248,0.4)]"
                                : "bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:border-sky-500/50 hover:text-slate-900 dark:hover:text-slate-200"
                            }`}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            {s.name}
                          </motion.button>
                        );
                      })}
                    </div>
                  </SpotlightCard>
                </motion.div>
              ))}
            </div>

            <div className="lg:sticky lg:top-24">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeSkill ? activeSkill.item.name : "empty"}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <SpotlightCard className="bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-950 border-slate-200 dark:border-slate-700 min-h-[180px] flex flex-col justify-center">
                    {activeSkill ? (
                      <div className="space-y-3">
                        <div className="text-[10px] font-bold tracking-widest text-sky-600 dark:text-sky-500 uppercase">
                          {activeSkill.group}
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                          {activeSkill.item.name}
                        </h3>
                        <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                          {activeSkill.item.blurb}
                        </p>
                        {activeSkill.item.usedIn && (
                          <div className="pt-3 mt-3 border-t border-slate-200 dark:border-slate-800">
                            <span className="text-[10px] font-bold text-slate-500 uppercase block mb-1">
                              主要应用:
                            </span>
                            <p className="text-[11px] text-sky-700 dark:text-sky-200">
                              {activeSkill.item.usedIn}
                            </p>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="text-center space-y-2 opacity-50">
                        <Cpu className="w-8 h-8 mx-auto text-slate-400 dark:text-slate-600" />
                        <p className="text-xs text-slate-400">
                          把鼠标移到技能上查看详情
                        </p>
                      </div>
                    )}
                  </SpotlightCard>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </Section>

        <Section id="hobbies" title="代码之外" icon={Award}>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
            不在调 bug 或优化算法的时候，我通常在做这些。
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {HOBBIES.map((hobby, i) => (
              <motion.div
                key={hobby.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <SpotlightCard
                  className="h-full flex flex-col items-center text-center gap-3 hover:bg-slate-50 dark:hover:bg-slate-900/80"
                  onClick={() =>
                    setModal({
                      title: hobby.name,
                      subtitle: "兴趣爱好",
                      eyebrow: "个人生活",
                      body: (
                        <div className="space-y-3">
                          <p className="text-slate-600 dark:text-slate-300">
                            {hobby.blurb}
                          </p>
                          {hobby.details && (
                            <ul className="list-disc list-inside space-y-1 text-slate-500 dark:text-slate-400 text-xs text-left">
                              {hobby.details.map((d) => (
                                <li key={d}>{d}</li>
                              ))}
                            </ul>
                          )}
                        </div>
                      ),
                    })
                  }
                >
                  <div className="text-4xl mb-2">{hobby.emoji}</div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1">
                      {hobby.name}
                    </h3>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                      {hobby.blurb}
                    </p>
                  </div>
                </SpotlightCard>
              </motion.div>
            ))}
          </div>
        </Section>

        <Section id="photos" title="图库" icon={Camera}>
          <motion.a
            href="/photos"
            className="block"
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
          >
            <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-sky-600 to-indigo-700 p-8 shadow-2xl border border-sky-400/30 group">
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
              <div className="relative z-10 flex items-center justify-between gap-6">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    查看我的照片集
                  </h3>
                  <p className="text-sm text-sky-100 max-w-md">
                    这里有一些关于黑客松、舞狮表演以及我在地图上探索过的地方的瞬间记录。
                  </p>
                </div>
                <div className="hidden sm:flex h-12 w-12 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm group-hover:bg-white/30 transition-all">
                  <ExternalLink className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          </motion.a>
        </Section>

        <Section id="contact" title="联系我" icon={Mail}>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                  保持联系
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {CONTACT.note}
                </p>
              </div>

              <div className="flex flex-col gap-4">
                <button
                  type="button"
                  onClick={() => handleCopy(SITE.links.email, "email")}
                  className="flex items-center gap-4 p-3 rounded-xl bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 hover:border-sky-500/50 hover:bg-slate-50 dark:hover:bg-slate-900 transition-all group text-left shadow-sm"
                >
                  <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center group-hover:bg-sky-500/20 group-hover:text-sky-500 dark:group-hover:text-sky-400 transition-colors">
                    <Mail className="w-5 h-5 text-slate-500 dark:text-slate-400" />
                  </div>
                  <div>
                    <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                      邮箱
                    </div>
                    <div className="text-sm font-mono text-slate-900 dark:text-slate-200">
                      {SITE.links.email}
                    </div>
                  </div>
                  {copiedField === "email" && (
                    <span className="ml-auto text-[10px] text-emerald-500 dark:text-emerald-400 font-bold px-2 py-1 bg-emerald-500/10 rounded">
                      已复制
                    </span>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => handleCopy(SITE.links.phone, "phone")}
                  className="flex items-center gap-4 p-3 rounded-xl bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 hover:border-sky-500/50 hover:bg-slate-50 dark:hover:bg-slate-900 transition-all group text-left shadow-sm"
                >
                  <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center group-hover:bg-sky-500/20 group-hover:text-sky-500 dark:group-hover:text-sky-400 transition-colors">
                    <Phone className="w-5 h-5 text-slate-500 dark:text-slate-400" />
                  </div>
                  <div>
                    <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                      电话
                    </div>
                    <div className="text-sm font-mono text-slate-900 dark:text-slate-200">
                      {SITE.links.phone}
                    </div>
                  </div>
                  {copiedField === "phone" && (
                    <span className="ml-auto text-[10px] text-emerald-500 dark:text-emerald-400 font-bold px-2 py-1 bg-emerald-500/10 rounded">
                      已复制
                    </span>
                  )}
                </button>
              </div>
            </div>

            <MessageForm />
          </div>
        </Section>

        <footer className="py-12 border-t border-slate-200 dark:border-slate-900 bg-slate-50 dark:bg-slate-950 mt-12 relative z-10">
          <div className="max-w-6xl mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="text-center md:text-left">
                <div className="font-bold text-slate-900 dark:text-slate-200 text-sm mb-1">
                  {SITE.name}
                </div>
                <div className="text-[11px] text-slate-500">
                  © {new Date().getFullYear()} · Built with React, Tailwind &
                  Framer Motion.
                </div>
              </div>
              <div className="flex gap-4">
                {[
                  { href: SITE.links.github, icon: Github },
                  { href: SITE.links.linkedin, icon: Linkedin },
                  { href: SITE.links.instagram, icon: Instagram },
                  { href: `mailto:${SITE.links.email}`, icon: Mail },
                ].map(({ href, icon: Icon }, i) => (
                  <motion.a
                    key={i}
                    href={href}
                    className="w-10 h-10 bg-white dark:bg-slate-900 rounded-full flex items-center justify-center text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:border-sky-500 hover:text-sky-500 dark:hover:text-sky-400 hover:bg-slate-50 dark:hover:bg-slate-900 transition-all shadow-sm"
                    whileHover={{ y: -3 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </div>
            </div>
          </div>
        </footer>

        <DetailModal modal={modal} onClose={() => setModal(null)} />
      </div>
    </div>
  );
}