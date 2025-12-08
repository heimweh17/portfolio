import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  Globe,
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
} from "lucide-react";

const SITE = {
  tagline: "佛罗里达大学计算机科学专业 · 地理学辅修",
  location: "Gainesville, FL",
  headline: "Alex Liu",
  name: "Alex Liu",
  links: {
    github: "https://github.com/heimweh17",
    linkedin: "https://www.linkedin.com/in/alex-liu7/",
    instagram: "https://www.instagram.com/alexliu1700/",
    email: "haozhouliu17@gmail.com",
    resume: "/resume.pdf",
    phone: "+1 (352) 328-4805",
    website: "https://aliu.me/",
  },
};

const FORM_ENDPOINT = "https://formspree.io/f/mkglvylk";

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
        name: "SQLite",
        blurb: "小型实验或本地数据存储的方便选择。",
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
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="max-w-xl w-full bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 border border-slate-700/80 rounded-2xl p-6 shadow-[0_0_40px_rgba(15,23,42,0.9)]"
            initial={{ scale: 0.9, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 10, opacity: 0 }}
            transition={{ duration: 0.18 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 mb-3">
              <div className="space-y-1">
                {modal.eyebrow && (
                  <div className="text-[10px] font-semibold tracking-[0.18em] text-sky-300 uppercase">
                    {modal.eyebrow}
                  </div>
                )}
                <h2 className="text-lg font-semibold text-slate-50">
                  {modal.title}
                </h2>
                {modal.subtitle && (
                  <p className="text-xs text-slate-300">{modal.subtitle}</p>
                )}
              </div>
              <button
                onClick={onClose}
                className="shrink-0 w-8 h-8 rounded-full border border-slate-700/80 flex items-center justify-center text-slate-300 hover:text-sky-300 hover:border-sky-400 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {modal.tags && modal.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mb-4">
                {modal.tags.map((t) => (
                  <span
                    key={t}
                    className="px-2.5 py-1 rounded-full bg-slate-950/80 border border-slate-700 text-[10px] font-mono text-slate-100"
                  >
                    {t}
                  </span>
                ))}
              </div>
            )}

            <div className="mb-4 text-sm text-slate-200 space-y-3">
              {modal.body}
            </div>

            {modal.links && modal.links.length > 0 && (
              <div className="flex flex-wrap gap-3 pt-3 border-t border-slate-800/80">
                {modal.links.map((l) => {
                  const Icon = l.icon;
                  return (
                    <a
                      key={l.href}
                      href={l.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-semibold text-sky-300 hover:text-sky-100 hover:bg-slate-900/80 border border-slate-700/80"
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
    className="scroll-mt-24 max-w-6xl mx-auto px-6 py-16 text-slate-100"
  >
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45 }}
    >
      <div className="flex items-center gap-3 mb-8">
        <div className="inline-flex items-center gap-2 rounded-full bg-slate-900/80 px-4 py-1 border border-slate-700/80 shadow-[0_0_30px_rgba(56,189,248,0.25)]">
          {Icon && <Icon className="w-4 h-4 text-sky-300" />}
          <span className="text-[11px] font-semibold tracking-[0.18em] text-slate-200 uppercase">
            {title}
          </span>
        </div>
      </div>
      {children}
    </motion.div>
  </section>
);

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
}

const Card = ({
  children,
  className = "",
  hover = true,
  onClick,
}: CardProps) => {
  const clickable = Boolean(onClick);
  return (
    <motion.div
      whileHover={
        hover
          ? { y: -3, scale: 1.01, boxShadow: "0 0 40px rgba(56,189,248,0.25)" }
          : {}
      }
      whileTap={clickable ? { scale: 0.98, y: 0 } : {}}
      transition={{ duration: 0.2 }}
      onClick={onClick}
      className={`bg-gradient-to-br from-slate-950/80 via-slate-900/80 to-slate-950/90 border border-slate-800/80 rounded-2xl p-6 shadow-[0_0_20px_rgba(15,23,42,0.8)] ${
        clickable ? "cursor-pointer" : ""
      } ${className}`}
    >
      {children}
    </motion.div>
  );
};

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
    <Card className="mt-8 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 border-slate-700/80">
      <div className="mb-5">
        <h3 className="text-sm font-semibold text-slate-100 mb-1">
          留言给我
        </h3>
        <p className="text-xs text-slate-300 leading-relaxed max-w-md">
          可以随便写：项目、实习、地图、生活碎片，或者你想跟我分享的任何事情。
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-[11px] text-slate-300 mb-1">
              昵称（可选）
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full rounded-lg bg-slate-950/80 border border-slate-700 px-3 py-2 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-sky-400 focus:border-sky-400"
              placeholder="我应该怎么称呼你？"
            />
          </div>
          <div>
            <label className="block text-[11px] text-slate-300 mb-1">
              邮箱（可选，如果希望我回信）
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full rounded-lg bg-slate-950/80 border border-slate-700 px-3 py-2 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-sky-400 focus:border-sky-400"
              placeholder="you@example.com"
            />
          </div>
        </div>

        <div>
          <label className="block text-[11px] text-slate-300 mb-1">
            留言内容 <span className="text-sky-300">*</span>
          </label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            className="w-full min-h-[120px] rounded-lg bg-slate-950/80 border border-slate-700 px-3 py-2 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-sky-400 focus:border-sky-400 resize-vertical"
            placeholder="想跟我说些什么……"
          />
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center gap-3 justify-between">
          <motion.button
            type="submit"
            disabled={status === "submitting"}
            className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-sky-500 text-slate-950 text-[11px] font-semibold hover:bg-sky-400 disabled:opacity-60 disabled:cursor-not-allowed transition-colors shadow-[0_0_20px_rgba(56,189,248,0.4)]"
            whileHover={status !== "submitting" ? { y: -1 } : {}}
            whileTap={status !== "submitting" ? { scale: 0.97 } : {}}
          >
            {status === "submitting" ? "发送中..." : "发送留言"}
          </motion.button>
        </div>

        {status === "success" && (
          <div className="text-[11px] text-emerald-300 mt-1">
            谢谢！你的留言已经发送成功。
          </div>
        )}
        {status === "error" && error && (
          <div className="text-[11px] text-rose-300 mt-1">⚠ {error}</div>
        )}
      </form>
    </Card>
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

export default function Portfolio() {
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

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      const docHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const progress = docHeight > 0 ? scrollTop / docHeight : 0;
      setScrollProgress(progress);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort(
            (a, b) =>
              (a.target as HTMLElement).offsetTop -
              (b.target as HTMLElement).offsetTop
          );
        if (visible.length > 0) {
          const id = visible[0].target.id;
          if (SECTION_IDS.includes(id)) {
            setActiveSection(id);
          }
        }
      },
      {
        threshold: 0.35,
        rootMargin: "-20% 0px -55% 0px",
      }
    );

    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
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
    <div className="font-sans antialiased bg-slate-950 min-h-screen text-slate-100">
      <motion.header
        initial={{ y: -16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-xl border-b border-slate-800/80 relative"
      >
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <motion.a
            href="#home"
            className="flex items-center gap-2 font-medium text-xs tracking-wide text-slate-100"
            whileHover={{ scale: 1.03 }}
          >
            <span className="hidden sm:inline">Alex Liu · 个人主页</span>
            <span className="sm:hidden">Alex Liu</span>
          </motion.a>
          <nav className="hidden md:flex items-center gap-6 text-[11px] font-medium text-slate-200">
            {NAV_ITEMS.map(({ id, label }) => {
              const isActive = activeSection === id;
              return (
                <motion.a
                  key={id}
                  href={`#${id}`}
                  className={`relative transition-colors ${
                    isActive
                      ? "text-sky-300"
                      : "text-slate-200 hover:text-sky-300"
                  }`}
                  whileHover={{ y: -1 }}
                >
                  {label}
                  {isActive && (
                    <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-sky-400 rounded-full" />
                  )}
                </motion.a>
              );
            })}
          </nav>
          <div className="flex items-center gap-3">
            <motion.a
              href="/"
              className="inline-flex items-center gap-1.5 text-[11px] text-slate-200 hover:text-sky-300"
              whileHover={{ scale: 1.05 }}
              title="Back to English"
            >
              <Languages className="w-4 h-4" />
              <span className="hidden sm:inline">English</span>
            </motion.a>
            <motion.a
              href={SITE.links.resume}
              className="inline-flex items-center gap-2 bg-slate-100 text-slate-900 text-[11px] px-4 py-2 rounded-full hover:bg-white transition-colors shadow-[0_0_20px_rgba(248,250,252,0.3)]"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FileText className="w-4 h-4" /> 简历
            </motion.a>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-[2px] bg-slate-900/80 overflow-hidden">
          <motion.div
            className="h-full bg-sky-400"
            style={{ scaleX: scrollProgress, transformOrigin: "0% 50%" }}
          />
        </div>
      </motion.header>

      <section
        id="home"
        className="relative overflow-hidden bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900 text-slate-50"
      >
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-40 -left-40 h-80 w-80 rounded-full bg-sky-500/20 blur-3xl" />
          <div className="absolute top-32 -right-20 h-72 w-72 rounded-full bg-indigo-500/25 blur-3xl" />
          <div className="absolute bottom-[-120px] left-1/3 h-72 w-72 rounded-full bg-emerald-400/15 blur-3xl" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(148,163,184,0.15)_0,_transparent_55%)]" />
          <div className="absolute inset-0 opacity-30 bg-[linear-gradient(120deg,rgba(148,163,184,0.15)_1px,transparent_1px),linear-gradient(210deg,rgba(30,64,175,0.2)_1px,transparent_1px)] bg-[length:220px_220px]" />
        </div>

        <div className="max-w-6xl mx-auto px-6 py-20 relative z-10">
          <div className="grid md:grid-cols-5 gap-12 items-center">
            <motion.div
              className="md:col-span-3 space-y-6"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <motion.h1
                className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
              >
                {SITE.headline}
              </motion.h1>

              <p className="text-sm font-medium text-slate-300">
                {SITE.tagline}
              </p>

              <div className="flex items-center gap-2 text-xs text-slate-300 mt-4">
                <MapPin className="w-4 h-4 text-sky-300" />
                <a
                  href="https://www.google.com/maps/place/Gainesville,+FL"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-sky-300 transition-colors"
                >
                  {SITE.location}
                </a>
              </div>

              <p className="text-sm md:text-base text-slate-200/90 leading-relaxed max-w-xl">
                我在学计算机科学，比较关注算法、数据结构，以及怎样把数据做成“看得见、点得动”的东西。最近做的项目主要围绕地理可视化、医疗工具以及和无障碍相关的交互界面。
              </p>
              <p className="text-sm md:text-base text-slate-200/90 leading-relaxed max-w-xl">
                开放机会：2026 年暑期 · 软件 / 数据 / IT / 地理信息相关实习
              </p>

              <div className="flex flex-wrap gap-3 pt-2">
                {[
                  { href: SITE.links.github, icon: Github, label: "GitHub" },
                  { href: SITE.links.linkedin, icon: Linkedin, label: "LinkedIn" },
                  { href: SITE.links.instagram, icon: Instagram, label: "Instagram" },
                  { href: `mailto:${SITE.links.email}`, icon: Mail, label: "邮件" },
                ].map(({ href, icon: Icon, label }) => (
                  <motion.a
                    key={label}
                    href={href}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-slate-700 bg-slate-950/70 text-[11px] text-slate-100 hover:border-sky-400 hover:text-sky-200 hover:bg-slate-900 transition-colors"
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Icon className="w-4 h-4" /> {label}
                  </motion.a>
                ))}
              </div>
            </motion.div>

            <motion.div
              className="md:col-span-2"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              <div className="relative">
                <motion.div
                  className="absolute -inset-1 rounded-3xl bg-gradient-to-br from-sky-500/70 via-indigo-500/60 to-emerald-400/60 blur-2xl opacity-70"
                  aria-hidden="true"
                />
                <motion.img
                  src="/me.jpg"
                  alt="Alex Liu"
                  className="relative w-full object-cover rounded-3xl border border-slate-700 shadow-[0_0_45px_rgba(15,23,42,1)]"
                  whileHover={{ scale: 1.02, rotate: 0.2 }}
                  transition={{ duration: 0.3 }}
                  loading="lazy"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Section id="about" title="个人简介" icon={Briefcase}>
        <div className="grid lg:grid-cols-3 gap-8">
          <Card className="lg:col-span-2">
            <h3 className="text-sm font-semibold text-slate-100 mb-3 uppercase tracking-wide">
              关于我
            </h3>
            <p className="text-sm text-slate-200/90 leading-relaxed mb-5">
              {ABOUT.blurb}
            </p>
            <ul className="space-y-3 mb-4">
              {ABOUT.highlights.map((h, i) => (
                <motion.li
                  key={i}
                  className="flex gap-3 text-sm text-slate-100/90"
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                >
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-sky-400" />
                  <span>{h}</span>
                </motion.li>
              ))}
            </ul>

            <div className="mt-6 border-t border-slate-800 pt-4">
              <div className="flex items-center gap-2 text-xs text-slate-200 mb-2">
                <Code2 className="w-4 h-4 text-sky-300" />
                <span className="font-semibold tracking-wide">关注方向</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {[
                  "算法与数据结构",
                  "数据系统与分析",
                  "地理信息（GIS）工具",
                  "无障碍 / 人机交互",
                ].map((t) => (
                  <span
                    key={t}
                    className="px-3 py-1 rounded-full bg-slate-950/80 text-[11px] border border-slate-700 text-slate-100"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-center gap-2 mb-4">
              <Calendar className="w-5 h-5 text-sky-300" />
              <h3 className="text-xs font-semibold text-slate-100 uppercase tracking-wide">
                教育背景
              </h3>
            </div>
            <div className="space-y-4">
              {EDUCATION.map((edu, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 rounded-xl bg-slate-950/80 border border-slate-800 px-3 py-3"
                >
                  {edu.logo && (
                    <img
                      src={edu.logo}
                      alt={edu.school}
                      className="w-12 h-12 object-contain rounded-xl"
                      loading="lazy"
                    />
                  )}
                  <div className="flex-1">
                    <h4 className="font-semibold text-sm text-slate-50 mb-1">
                      {edu.school}
                    </h4>
                    {edu.degree && (
                      <p className="text-[11px] text-slate-200 mb-0.5">
                        {edu.degree}
                      </p>
                    )}
                    <p className="text-[11px] text-slate-400 mb-0.5">
                      {edu.gpa} • {edu.period}
                    </p>
                    {edu.honors && (
                      <p className="text-[11px] text-sky-300 font-semibold mb-0.5">
                        {edu.honors}
                      </p>
                    )}
                    <p className="text-[11px] text-slate-300">
                      {edu.activities}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </Section>

      <Section id="projects" title="项目精选" icon={Code2}>
        <p className="text-sm text-slate-300 mb-4 max-w-3xl">
          这里是几段比较代表性的项目，体现了我喜欢的工作方式：把算法与数据结构和可视化、空间思维，以及真实用户的需求结合在一起。
        </p>

        <div className="flex flex-wrap gap-2 mb-6">
          {PROJECT_FILTERS.map((filter) => {
            const isActive = projectFilter === filter;
            return (
              <motion.button
                key={filter}
                type="button"
                onClick={() => setProjectFilter(filter)}
                className={`px-3 py-1.5 rounded-full text-[11px] border transition-colors ${
                  isActive
                    ? "bg-sky-500 text-slate-950 border-sky-400 shadow-[0_0_18px_rgba(56,189,248,0.5)]"
                    : "bg-slate-950/80 border-slate-700 text-slate-100 hover:border-sky-400 hover:text-sky-200"
                }`}
                whileHover={{ y: -1 }}
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
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <Card
                className="h-full flex flex-col relative overflow-hidden"
                onClick={() =>
                  setModal({
                    title: p.name,
                    subtitle: p.tech.join(" · "),
                    eyebrow: "项目",
                    tags: p.tech,
                    body: (
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <p>{p.blurb}</p>
                          {p.impact && (
                            <p>
                              <span className="font-semibold text-slate-100">
                                效果：&nbsp;
                              </span>
                              {p.impact}
                            </p>
                          )}
                        </div>
                        {p.screenshots && p.screenshots.length > 0 && (
                          <div className="space-y-2">
                            <div className="text-[11px] font-semibold text-slate-300">
                              截图预览
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                              {p.screenshots.map((src) => (
                                <img
                                  key={src}
                                  src={src}
                                  alt={`${p.name} screenshot`}
                                  className="w-full h-28 object-cover rounded-xl border border-slate-800 bg-slate-900"
                                  loading="lazy"
                                />
                              ))}
                            </div>
                          </div>
                        )}
                        {p.name === "Grade Track" && (
                          <ul className="list-disc list-inside space-y-1 text-slate-200/90">
                            <li>
                              全栈分析看板，把 CSV 成绩数据转成图表与可视化摘要。
                            </li>
                            <li>
                              利用 Docker 封装环境，从“一长串配置步骤”变成“一个命令起全部服务”。
                            </li>
                          </ul>
                        )}
                        {p.name === "Ability Bridge" && (
                          <ul className="list-disc list-inside space-y-1 text-slate-200/90">
                            <li>
                              支持头部姿态鼠标、嘴部莫尔斯码输入、面部表情映射为点击等多种交互方式。
                            </li>
                            <li>
                              调整平滑与阈值设置，在“响应速度”和“稳定性”之间取得平衡。
                            </li>
                          </ul>
                        )}
                      </div>
                    ),
                    links: [
                      p.links.code
                        ? { label: "查看代码", href: p.links.code, icon: Code2 }
                        : null,
                      p.links.demo
                        ? { label: "在线体验", href: p.links.demo, icon: ExternalLink }
                        : null,
                    ].filter(Boolean) as ModalLink[],
                  })
                }
              >
                <div className="pointer-events-none absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.35)_0,_transparent_55%)]" />
                <div className="relative flex-1 flex flex-col">
                  {p.screenshots && p.screenshots.length > 0 && (
                    <div className="mb-3 rounded-xl overflow-hidden border border-slate-800 bg-slate-950/80">
                      <img
                        src={p.screenshots[0]}
                        alt={`${p.name} preview`}
                        className="w-full h-32 object-cover"
                        loading="lazy"
                      />
                    </div>
                  )}
                  <div className="flex items-center justify-between mb-1.5">
                    <h3 className="text-sm font-semibold text-slate-50">
                      {p.name}
                    </h3>
                    {p.flagship && (
                      <span className="px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-400/60 text-[10px] font-semibold text-amber-200">
                        核心
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-200/90 mb-3 leading-relaxed">
                    {p.blurb}
                  </p>
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {p.tech.map((t) => (
                      <span
                        key={t}
                        className="text-[10px] px-2 py-1 bg-slate-950/80 text-slate-100 font-mono rounded-full border border-slate-700/80"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  {p.impact && (
                    <p className="text-[11px] text-slate-300 mb-3 leading-relaxed">
                      <span className="font-semibold text-slate-50">
                        效果：{" "}
                      </span>
                      {p.impact}
                    </p>
                  )}
                </div>
                <div className="relative flex gap-4 pt-3 border-t border-slate-800/90">
                  {p.links.code && (
                    <motion.a
                      href={p.links.code}
                      onClick={(e) => e.stopPropagation()}
                      className="flex items-center gap-1.5 text-[11px] font-semibold text-sky-300 hover:text-sky-200"
                      whileHover={{ x: 2 }}
                    >
                      <Code2 className="w-3 h-3" /> 代码
                    </motion.a>
                  )}
                  {p.links.demo && (
                    <motion.a
                      href={p.links.demo}
                      onClick={(e) => e.stopPropagation()}
                      className="flex items-center gap-1.5 text-[11px] font-semibold text-sky-300 hover:text-sky-200"
                      whileHover={{ x: 2 }}
                    >
                      <ExternalLink className="w-3 h-3" /> Demo
                    </motion.a>
                  )}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {filteredProjects.length > 3 && (
          <div className="mt-8 flex justify-center">
            <motion.button
              onClick={() => setShowExpandedProjects(!showExpandedProjects)}
              className="inline-flex items-center gap-2 px-5 py-2.5 border border-slate-700 rounded-full bg-slate-950/80 text-[11px] hover:border-sky-400 hover:text-sky-200 hover:bg-slate-900 transition-colors font-medium"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              {showExpandedProjects ? (
                <>
                  <ChevronUp className="w-4 h-4" /> 收起项目
                </>
              ) : (
                <>
                  <ChevronDown className="w-4 h-4" /> 查看全部项目
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
        <div className="space-y-10">
          <div>
            <h3 className="text-xs font-semibold text-slate-200 uppercase tracking-wide mb-4 flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-sky-400" />
              工作 / 实践经历
            </h3>
            <div className="space-y-4">
              {EXPERIENCE.map((x, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                >
                  <Card
                    onClick={() =>
                      setModal({
                        title: x.role,
                        subtitle: x.org,
                        eyebrow: `经历 · ${x.period}${
                          x.location ? " • " + x.location : ""
                        }`,
                        body: (
                          <div className="space-y-3">
                            <p>
                              在{" "}
                              <span className="font-semibold">{x.org}</span>，我担任{" "}
                              <span className="font-semibold">{x.role}</span>
                              {x.location && <>（地点：{x.location}）</>}。
                            </p>
                            <ul className="list-disc list-inside space-y-1 text-slate-200/90">
                              {x.bullets.map((b) => (
                                <li key={b}>{b}</li>
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
                        <img
                          src={x.logo}
                          alt={x.org}
                          className="w-14 h-14 object-contain rounded-xl border border-slate-800/80 bg-slate-950/80"
                          loading="lazy"
                        />
                      )}
                      <div className="flex-1">
                        <div className="text-[11px] text-sky-300 font-semibold mb-1">
                          {x.link ? (
                            <a
                              href={x.link}
                              target="_blank"
                              rel="noreferrer"
                              className="hover:underline"
                            >
                              {x.org}
                            </a>
                          ) : (
                            x.org
                          )}
                        </div>
                        <h3 className="text-sm font-semibold mb-1 text-slate-50">
                          {x.role}
                        </h3>
                        <div className="text-[11px] text-slate-400 mb-2">
                          {x.period} • {x.location}
                        </div>
                        <ul className="space-y-1.5 text-xs text-slate-200 leading-relaxed">
                          {x.bullets.slice(0, 2).map((b) => (
                            <li key={b} className="flex gap-2">
                              <span className="mt-1 h-1 w-1 rounded-full bg-sky-400" />
                              <span>{b}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xs font-semibold text-slate-200 uppercase tracking-wide mb-4 flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              志愿服务
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              {VOLUNTEER.map((x, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                >
                  <Card
                    onClick={() =>
                      setModal({
                        title: x.role,
                        subtitle: x.org,
                        eyebrow: `志愿服务 · ${x.period}`,
                        body: (
                          <div className="space-y-3">
                            <p>
                              作为{" "}
                              <span className="font-semibold">
                                {x.org}
                              </span>{" "}
                              的{" "}
                              <span className="font-semibold">
                                {x.role}
                              </span>
                              ，我参与了以下工作：
                            </p>
                            <ul className="list-disc list-inside space-y-1 text-slate-200/90">
                              {x.bullets.map((b) => (
                                <li key={b}>{b}</li>
                              ))}
                            </ul>
                          </div>
                        ),
                        links: x.link
                          ? [
                              {
                                label: "了解更多",
                                href: x.link,
                                icon: ExternalLink,
                              },
                            ]
                          : undefined,
                      })
                    }
                  >
                    <div className="flex items-start gap-3">
                      {x.logo && (
                        <img
                          src={x.logo}
                          alt={x.org}
                          className="w-10 h-10 object-contain rounded-xl border border-slate-800/80 bg-slate-950/80"
                          loading="lazy"
                        />
                      )}
                      <div className="flex-1">
                        <div className="text-[11px] text-sky-300 font-semibold mb-1">
                          {x.link ? (
                            <a
                              href={x.link}
                              target="_blank"
                              rel="noreferrer"
                              className="hover:underline"
                            >
                              {x.org}
                            </a>
                          ) : (
                            x.org
                          )}
                        </div>
                        <h4 className="font-semibold text-xs mb-1 text-slate-50">
                          {x.role}
                        </h4>
                        <div className="text-[10px] text-slate-400 mb-1">
                          {x.period}
                        </div>
                        <p className="text-[11px] text-slate-200 leading-relaxed">
                          {x.bullets[0]}
                        </p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xs font-semibold text-slate-200 uppercase tracking-wide mb-4 flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-indigo-400" />
              学生组织与领导力
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              {LEADERSHIPS.map((x, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                >
                  <Card
                    onClick={() =>
                      setModal({
                        title: x.role,
                        subtitle: x.org,
                        eyebrow: `学生组织 · ${x.period}`,
                        body: (
                          <div className="space-y-3">
                            <p>
                              在{" "}
                              <span className="font-semibold">{x.org}</span>{" "}
                              中，我担任{" "}
                              <span className="font-semibold">
                                {x.role}
                              </span>
                              ，主要负责：
                            </p>
                            <ul className="list-disc list-inside space-y-1 text-slate-200/90">
                              {x.bullets.map((b) => (
                                <li key={b}>{b}</li>
                              ))}
                            </ul>
                          </div>
                        ),
                        links: x.link
                          ? [
                              {
                                label: "组织网站",
                                href: x.link,
                                icon: ExternalLink,
                              },
                            ]
                          : undefined,
                      })
                    }
                  >
                    <div className="flex items-start gap-3">
                      {x.logo && (
                        <img
                          src={x.logo}
                          alt={x.org}
                          className="w-10 h-10 object-contain rounded-xl border border-slate-800/80 bg-slate-950/80"
                          loading="lazy"
                        />
                      )}
                      <div className="flex-1">
                        <div className="text-[11px] text-sky-300 font-semibold mb-1">
                          {x.link ? (
                            <a
                              href={x.link}
                              target="_blank"
                              rel="noreferrer"
                              className="hover:underline"
                            >
                              {x.org}
                            </a>
                          ) : (
                            x.org
                          )}
                        </div>
                        <h4 className="font-semibold text-xs mb-1 text-slate-50">
                          {x.role}
                        </h4>
                        <div className="text-[10px] text-slate-400 mb-1">
                          {x.period}
                        </div>
                        <p className="text-[11px] text-slate-200 leading-relaxed">
                          {x.bullets[0]}
                        </p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <Section id="skills" title="技能与技术栈" icon={Cpu}>
        <div className="grid lg:grid-cols-[minmax(0,1.6fr)_minmax(0,0.9fr)] gap-8 items-start">
          <div className="space-y-6">
            {SKILLS.map((g, i) => (
              <motion.div
                key={g.group}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
              >
                <Card className="bg-slate-950/80">
                  <div className="flex items-center gap-3 mb-3">
                    <g.icon className="w-5 h-5 text-sky-300" />
                    <h3 className="font-semibold text-sm text-slate-100">
                      {g.group}
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
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
                          className={`px-3 py-1.5 rounded-full text-[11px] font-mono border transition-colors ${
                            isActive
                              ? "bg-sky-500 text-slate-950 border-sky-400 shadow-[0_0_18px_rgba(56,189,248,0.5)]"
                              : "bg-slate-950/80 border-slate-700 text-slate-100 hover:border-sky-400 hover:text-sky-200"
                          }`}
                          whileHover={{ y: -1 }}
                          whileTap={{ scale: 0.97 }}
                        >
                          {s.name}
                        </motion.button>
                      );
                    })}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
          <div className="space-y-3">
            <Card className="bg-slate-950/90 px-4 py-4 max-w-sm mx-auto">
              {activeSkill ? (
                <div className="space-y-2">
                  <div className="text-[10px] font-semibold tracking-[0.18em] text-sky-300 uppercase">
                    {activeSkill.group}
                  </div>
                  <h3 className="text-sm font-semibold text-slate-50">
                    {activeSkill.item.name}
                  </h3>
                  <p className="text-[11px] text-slate-200 leading-relaxed">
                    {activeSkill.item.blurb}
                  </p>
                  {activeSkill.item.usedIn && (
                    <p className="text-[11px] text-slate-300 leading-relaxed">
                      <span className="font-semibold text-slate-100">
                        使用场景：{" "}
                      </span>
                      {activeSkill.item.usedIn}
                    </p>
                  )}
                </div>
              ) : (
                <div className="space-y-2">
                  <h3 className="text-sm font-semibold text-slate-50">
                    把鼠标移到技能上看看细节
                  </h3>
                  <p className="text-[11px] text-slate-200">
                    将鼠标移到任意一个技能标签上，可以看到我在哪些项目或课程中主要使用了它。
                  </p>
                </div>
              )}
            </Card>
          </div>
        </div>
      </Section>

      <Section id="hobbies" title="兴趣爱好" icon={Award}>
        <p className="text-sm text-slate-300 mb-6 max-w-3xl">
          不在调 bug、画地图或刷 Canvas 的时候，我大概在做这些事。
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {HOBBIES.map((hobby, i) => (
            <motion.div
              key={hobby.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <Card
                className="h-full flex flex-col items-start gap-3"
                onClick={() =>
                  setModal({
                    title: hobby.name,
                    subtitle: "兴趣爱好",
                    eyebrow: "代码之外",
                    body: (
                      <div className="space-y-3">
                        <p>{hobby.blurb}</p>
                        {hobby.details && (
                          <ul className="list-disc list-inside space-y-1 text-slate-200/90">
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
                <div className="text-2xl">{hobby.emoji}</div>
                <div>
                  <h3 className="text-sm font-semibold text-slate-50 mb-1">
                    {hobby.name}
                  </h3>
                  <p className="text-[11px] text-slate-300 leading-relaxed">
                    {hobby.blurb}
                  </p>
                </div>
                <div className="mt-auto flex flex-wrap gap-1.5" />
              </Card>
            </motion.div>
          ))}
        </div>
      </Section>

      <Section id="photos" title="照片集" icon={Camera}>
        <motion.a
          href="/photos"
          className="block"
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
        >
          <Card className="bg-gradient-to-br from-sky-600 via-indigo-600 to-slate-900 text-white border-sky-400/60">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-semibold mb-1 text-white">
                  查看我的照片集
                </h3>
                <p className="text-xs text-sky-100 mb-3 leading-relaxed max-w-md">
                  偶尔会记录一些项目现场、活动瞬间，以及我在地图上动过手的地方。
                </p>
                <div className="inline-flex items-center gap-2 text-[11px] font-semibold text-white">
                  <span>进入相册</span>
                  <ExternalLink className="w-4 h-4" />
                </div>
              </div>
              <Camera className="w-20 h-20 text-white/30 hidden sm:block" />
            </div>
          </Card>
        </motion.a>
      </Section>

      <Section id="contact" title="联系我" icon={Mail}>
        <Card className="bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white border-slate-700/80">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-3 text-white">
                欢迎来聊
              </h3>
              <p className="mb-5 text-sm text-slate-200 leading-relaxed">
                {CONTACT.note}
              </p>
              <div className="flex flex-wrap gap-3">
                {[
                  {
                    href: `mailto:${SITE.links.email}`,
                    icon: Mail,
                    label: "发邮件",
                  },
                  { href: SITE.links.linkedin, icon: Linkedin, label: "LinkedIn" },
                  { href: SITE.links.github, icon: Github, label: "GitHub" },
                  { href: SITE.links.instagram, icon: Instagram, label: "Instagram" },
                ].map(({ href, icon: Icon, label }) => (
                  <motion.a
                    key={label}
                    href={href}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-900 text-[11px] font-semibold hover:bg-white transition-colors rounded-full"
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Icon className="w-4 h-4" /> {label}
                  </motion.a>
                ))}
              </div>
            </div>
            <div className="space-y-3 text-xs text-slate-100">
              <button
                type="button"
                onClick={() => handleCopy(SITE.links.email, "email")}
                className="flex items-center gap-3 group"
              >
                <Mail className="w-5 h-5 group-hover:text-sky-300 transition-colors" />
                <span className="flex items-center gap-2">
                  {SITE.links.email}
                  {copiedField === "email" && (
                    <span className="text-[10px] text-emerald-300">
                      已复制
                    </span>
                  )}
                </span>
              </button>
              <button
                type="button"
                onClick={() => handleCopy(SITE.links.phone, "phone")}
                className="flex items-center gap-3 group"
              >
                <Phone className="w-5 h-5 group-hover:text-sky-300 transition-colors" />
                <span className="flex items-center gap-2">
                  {SITE.links.phone}
                  {copiedField === "phone" && (
                    <span className="text-[10px] text-emerald-300">
                      已复制
                    </span>
                  )}
                </span>
              </button>
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5" />
                <a
                  href="https://www.google.com/maps/place/Gainesville,+FL"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  {SITE.location}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Globe className="w-5 h-5" />
                <a
                  href={SITE.links.website}
                  className="hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {SITE.links.website}
                </a>
              </div>
            </div>
          </div>
        </Card>

        <MessageForm />
      </Section>

      <footer className="py-10 border-t border-slate-800 bg-slate-950">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-[11px] text-slate-400">
              © {new Date().getFullYear()} {SITE.name} · All rights reserved.
            </div>
            <div className="flex gap-3">
              {[
                { href: SITE.links.github, icon: Github },
                { href: SITE.links.linkedin, icon: Linkedin },
                { href: SITE.links.instagram, icon: Instagram },
                { href: `mailto:${SITE.links.email}`, icon: Mail },
              ].map(({ href, icon: Icon }, i) => (
                <motion.a
                  key={i}
                  href={href}
                  className="w-9 h-9 bg-slate-900 rounded-full flex items-center justify-center text-white border border-slate-700 hover:border-sky-400 hover:bg-slate-800 transition-colors shadow-[0_0_18px_rgba(15,23,42,0.9)]"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </footer>

      <DetailModal modal={modal} onClose={() => setModal(null)} />
    </div>
  );
}
