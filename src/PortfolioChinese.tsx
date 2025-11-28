import React, { useState } from "react";
import { motion } from "framer-motion";
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
} from "lucide-react";

// ====== 数据 ======
const SITE = {
  tagline: "佛罗里达大学计算机科学专业 · 地理辅修",
  location: "佛罗里达州盖恩斯维尔",
  headline: "刘昊洲",
  name: "刘昊洲",
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

const ABOUT = {
  blurb:
    "我是佛罗里达大学的计算机科学学生，主要关注算法、数据结构和数据系统，也特别喜欢把数据做成“看得见、点得动”的可视化工具。最近在做的事情包括地理可视化仪表盘、医疗工具和无障碍交互界面。",
  highlights: [
    "核心方向：数据结构与算法、系统与后端开发、全栈工程实践",
    "技术栈：C++、Python、TypeScript、React、Flask、SQL、Docker 等",
    "兴趣领域：地理空间（GIS）、数据系统、可视化、人机交互与无障碍设计",
  ],
};

const EDUCATION = [
  {
    school: "佛罗里达大学",
    degree: "计算机科学学士（地理辅修）",
    gpa: "GPA 3.80/4.00",
    period: "2024 – 2028（预计）",
    honors: "院长名单",
    activities: "UF SASE · UF CASA",
    logo: "/logos/uf_logo.png",
  },
  {
    school: "Buchholz 高中",
    gpa: "GPA 4.79",
    period: "2020 – 2024",
    activities: "科学队 · 数学队 · Quiz Bowl",
    logo: "/logos/buchholz_logo.png",
  },
];

// Logic Lab 不写 logo 字段（无 logo 时不显示图片）
const EXPERIENCE = [
  {
    role: "教师",
    org: "逻辑实验室（Logic Lab）",
    period: "2022 年 6 月 – 2022 年 7 月",
    location: "佛罗里达州盖恩斯维尔",
    bullets: [
      "为 30+ 名小学生设计并教授数学与国际象棋课程，强调结构化的解题过程和严谨的逻辑推理。",
      "通过自编练习与循序渐进的例题，把抽象概念拆解成适合小学生理解的具体步骤。",
    ],
    link: "http://www.logiclabgainesville.com/",
  },
  {
    role: "文化表演者",
    org: "家庭舞狮舞龙队（JiaTing Lion & Dragon）",
    period: "2025 年 1 月 – 2025 年 5 月",
    location: "佛罗里达州盖恩斯维尔",
    bullets: [
      "在校内外大型活动中进行舞狮、舞龙表演，向 300+ 观众呈现亚洲文化，提升社区对传统文化的关注度。",
      "与团队协作排练并完成高强度、节奏精确的表演，考验身体控制、时间配合与现场协调能力。",
    ],
    logo: "/logos/jiating_logo.jpg",
    link: "https://jiatingliondragon.com/",
  },
];

const VOLUNTEER = [
  {
    role: "地图志愿者",
    org: "OpenStreetMap",
    period: "2020 年 9 月 – 至今",
    bullets: [
      "在 2020 年封锁期间开始绘制地图，从自己熟悉的中国东南地区和佛罗里达开始，逐步扩展到更多城市与街区。",
      "在 OpenStreetMap 上完成 587+ 次编辑，为开放、社区驱动的地理数据做贡献，帮助日常导航、城市规划甚至灾害应对。",
    ],
    logo: "/logos/osm_logo.svg",
    link: "https://www.openstreetmap.org/",
  },
  {
    role: "助教 / 指导老师",
    org: "Buchholz 数学队夏令营",
    period: "2022 年 6 月 – 2022 年 7 月；2023 年 6 月 – 2023 年 7 月",
    bullets: [
      "在 Buchholz 夏令营中为小学和初中学生教授数学，通过习题讲解与一对一辅导，帮助学生提高解题能力与逻辑思维。",
    ],
    logo: "/logos/bhs_logo.png",
    link: "https://buchholzmathteam.org/",
  },
];

const LEADERSHIPS = [
  {
    role: "SASE 实习生",
    org: "UF 亚洲科学家与工程师协会（SASE）",
    period: "2025 年 8 月 – 至今",
    bullets: [
      "协助筹办面向 100+ 成员的职业与技术活动，包括一场 150+ 人参加的大型活动，从场地到流程全程参与规划。",
    ],
    logo: "/logos/sase_logo.jpg",
    link: "https://ufsase.com/",
  },
  {
    role: "活动委员会成员",
    org: "UF 华裔美国学生协会（CASA）",
    period: "2024 年 – 至今",
    bullets: [
      "参与策划校园文化活动，用更生活化的方式呈现华裔与亚裔文化，在活动设计中兼顾参与感与文化深度。",
    ],
    logo: "/logos/casa_logo.jpg",
    link: "https://orgs.studentinvolvement.ufl.edu/Organization/Chinese-American-Student-Association",
  },
];

const PROJECTS = [
  {
    name: "地理可视化仪表盘（Geography Dashboard）",
    blurb:
      "交互式地理空间平台：实时可视化 OpenStreetMap 数据，支持城市间对比、图层切换和用户登录保存视图。",
    impact:
      "把城市层面的模式（设施分布、密度、街区结构）做成可视化工具，用户可以用多图层分析和空间查询来探索不同城市。",
    tech: ["React", "Leaflet", "Supabase(SQL)", "Vite", "TypeScript"],
    links: {
      demo: "https://thegeodashboard.vercel.app/",
      code: "https://github.com/heimweh17/Geo-Dashboard",
    },
  },
  {
    name: "UF Health SmartScribe 医疗文书助手",
    blurb:
      "AI 医疗文书工具，将医生与患者的对话转写为结构化 SOAP 病历笔记。",
    impact:
      "支持实时转写和说话人分离，可以显著降低临床文书工作量，帮助医生把精力集中在诊疗本身。",
    tech: ["JavaScript", "HTML/CSS", "Supabase", "PostgreSQL", "DeepGram API", "Gemini API"],
    links: { demo: "", code: "https://github.com/heimweh17/SmartScribe" },
  },
  {
    name: "Grade Track 成绩分析平台",
    blurb:
      "全栈数据分析仪表盘，读取课程成绩 CSV 文件，生成分布、趋势和风险学生等可视化视图。",
    impact:
      "通过 Docker 容器化加速开发环境搭建，把原本零散的课程数据变成一眼可读的图表与趋势。",
    tech: ["Flask", "React", "SQLAlchemy", "PostgreSQL", "Docker"],
    links: { demo: "", code: "https://github.com/heimweh17/Grade-Track" },
  },
  {
    name: "Ability Bridge 无障碍交互工具集",
    blurb:
      "提供头部姿态光标控制、嘴部 Morse 打字、眨眼/扬眉点击等免手操作方式的辅助工具。",
    impact:
      "在 ~30 FPS、<100ms 延迟下实现实时视觉交互，探索计算机视觉在无障碍与人机交互中的应用可能性。",
    tech: ["Python", "OpenCV", "MediaPipe", "PyAutoGUI"],
    links: { demo: "", code: "https://github.com/heimweh17/Ability-Bridge" },
  },
  {
    name: "扫雷游戏（C++ / SFML）",
    blurb:
      "用 C++ + SFML 实现的交互式扫雷游戏，支持递归翻格、标记、暂停 / 调试模式、计时器和排行榜。",
    impact:
      "约 350 个格子，使用文件 I/O 持久化前 5 名记录，代码采用模块化 OOP 设计，强调状态管理与可维护性。",
    tech: ["C++", "SFML"],
    links: { demo: "", code: "https://github.com/heimweh17/Minesweeper-game" },
  },
  {
    name: "装箱问题：Best-Fit vs First-Fit",
    blurb:
      "构建算法实验框架，对超过 100k 个矩形进行装箱，比较不同启发式策略的时间和空间效率。",
    impact:
      "将装箱算法封装成可重复实验的框架，方便收集指标和可视化不同策略的性能差异。",
    tech: ["C++"],
    links: { demo: "", code: "https://github.com/heimweh17/best-fit-fitst-fit" },
  },
  {
    name: "AVL 树数据结构",
    blurb:
      "实现带插入、删除、查找和旋转操作的自平衡 AVL 树，用于维护有序记录。",
    impact:
      "支持 1000+ 次操作，在各种边界条件下保持高度平衡，并通过自定义测试用例验证旋转与删除逻辑。",
    tech: ["C++"],
    links: { code: "https://github.com/heimweh17/AVL-TREE" },
  },
  {
    name: "数独游戏",
    blurb:
      "Python 数独小游戏，支持多种难度、合法性检查、胜负判断与重置操作。",
    impact:
      "专注于状态管理和用户体验，在练习 Python 的同时打磨交互细节与错误反馈。",
    tech: ["Python"],
    links: { code: "https://github.com/heimweh17/suduku-project" },
  },
];

const SKILLS = [
  {
    group: "编程语言",
    items: ["C++", "Python", "Java", "TypeScript", "SQL", "RISC-V"],
    icon: Terminal,
  },
  {
    group: "框架与工具",
    items: ["React", "Flask", "FastAPI", "Node", "Vite", "Tailwind"],
    icon: Code2,
  },
  {
    group: "数据与基础设施",
    items: ["PostgreSQL", "SQLite", "Docker", "Git", "CI", "Grafana"],
    icon: Cpu,
  },
  {
    group: "专业方向",
    items: ["算法", "数据结构", "地理空间（GIS）", "计算机视觉"],
    icon: Code2,
  },
];

const CONTACT = {
  note: "希望在 2026 年暑期获得与后端系统、数据平台或地理空间应用相关的实习机会，也欢迎一起聊聊地图、基础设施和无障碍设计。",
};

// ====== UI 组件 ======
const Section = ({ id, title, children, icon: Icon }) => (
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

const Card = ({ children, className = "", hover = true }) => (
  <motion.div
    whileHover={
      hover
        ? { y: -3, scale: 1.01, boxShadow: "0 0 40px rgba(56,189,248,0.25)" }
        : {}
    }
    transition={{ duration: 0.2 }}
    className={`bg-gradient-to-br from-slate-950/80 via-slate-900/80 to-slate-950/90 border border-slate-800/80 rounded-2xl p-6 shadow-[0_0_20px_rgba(15,23,42,0.8)] ${className}`}
  >
    {children}
  </motion.div>
);

// ====== 页面 ======
export default function PortfolioChinese() {
  const [showExpandedProjects, setShowExpandedProjects] = useState(false);
  const visibleProjects = showExpandedProjects ? PROJECTS : PROJECTS.slice(0, 3);

  return (
    <div className="font-sans antialiased bg-slate-950 min-h-screen text-slate-100">
      {/* 导航栏 */}
      <motion.header
        initial={{ y: -16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-xl border-b border-slate-800/80"
      >
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <motion.a
            href="#home"
            className="flex items-center gap-2 font-medium text-xs tracking-wide text-slate-100"
            whileHover={{ scale: 1.03 }}
          >
            <span className="h-7 w-7 rounded-xl bg-gradient-to-br from-sky-500 to-indigo-500 flex items-center justify-center text-[11px] font-bold text-white shadow-[0_0_25px_rgba(56,189,248,0.6)]">
              LH
            </span>
            <span className="hidden sm:inline">刘昊洲 · 个人主页</span>
            <span className="sm:hidden">刘昊洲</span>
          </motion.a>
          <nav className="hidden md:flex items-center gap-6 text-[11px] font-medium text-slate-200">
            {["个人概览", "项目", "经历", "技能", "联系"].map((item, index) => {
              const ids = ["about", "projects", "experience", "skills", "contact"];
              return (
                <motion.a
                  key={item}
                  href={`#${ids[index]}`}
                  className="hover:text-sky-300 transition-colors"
                  whileHover={{ y: -1 }}
                >
                  {item}
                </motion.a>
              );
            })}
          </nav>
          <div className="flex items-center gap-3">
            <motion.a
              href="/"
              className="inline-flex items-center gap-1.5 text-[11px] text-slate-200 hover:text-sky-300"
              whileHover={{ scale: 1.05 }}
              title="English Version"
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
      </motion.header>

      {/* HERO */}
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

              <div className="flex items-center gap-2 text-xs text-slate-300">
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
                目前在佛罗里达大学学习计算机科学，主要学习算法、数据结构和系统设计，也喜欢把这些东西落地成真正能用的工具。最近的一些项目是：城市地理仪表盘、医疗文书助手，以及面向无障碍场景的交互实验。
              </p>

              <div className="flex flex-wrap gap-3 pt-2">
                {[
                  { href: SITE.links.github, icon: Github, label: "GitHub" },
                  { href: SITE.links.linkedin, icon: Linkedin, label: "LinkedIn" },
                  { href: SITE.links.instagram, icon: Instagram, label: "Instagram" },
                  { href: `mailto:${SITE.links.email}`, icon: Mail, label: "邮箱" },
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
                  alt="刘昊洲"
                  className="relative w-full object-cover rounded-3xl border border-slate-700 shadow-[0_0_45px_rgba(15,23,42,1)]"
                  whileHover={{ scale: 1.02, rotate: 0.2 }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 个人概览（关于 + Focus + 教育） */}
      <Section id="about" title="个人概览" icon={Briefcase}>
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

            {/* Focus Areas */}
            <div className="mt-6 border-t border-slate-800 pt-4">
              <div className="flex items-center gap-2 text-xs text-slate-200 mb-2">
                <Code2 className="w-4 h-4 text-sky-300" />
                <span className="font-semibold tracking-wide">重点方向</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {[
                  "数据结构与算法",
                  "数据系统与分析平台",
                  "地理空间（GIS）工具",
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
                      {edu.gpa} · {edu.period}
                    </p>
                    {edu.honors && (
                      <p className="text-[11px] text-sky-300 font-semibold mb-0.5">
                        {edu.honors}
                      </p>
                    )}
                    <p className="text-[11px] text-slate-300">{edu.activities}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </Section>

      {/* 精选项目 */}
      <Section id="projects" title="精选项目" icon={Code2}>
        <p className="text-sm text-slate-300 mb-6 max-w-3xl">
          这里是几项代表性的项目，集中在「数据结构 / 系统」和「可视化 / 空间思维」两个方向。有的面向真实用户（例如老师、医生），有的更偏向算法实验和性能分析。
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleProjects.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <Card className="h-full flex flex-col relative overflow-hidden">
                <div className="pointer-events-none absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.35)_0,_transparent_55%)]" />
                <div className="relative flex-1">
                  <h3 className="text-sm font-semibold mb-1.5 text-slate-50">
                    {p.name}
                  </h3>
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
                      <span className="font-semibold text-slate-50">影响：</span>
                      {p.impact}
                    </p>
                  )}
                </div>
                <div className="relative flex gap-4 pt-3 border-t border-slate-800/90">
                  {p.links.code && (
                    <motion.a
                      href={p.links.code}
                      className="flex items-center gap-1.5 text-[11px] font-semibold text-sky-300 hover:text-sky-200"
                      whileHover={{ x: 2 }}
                    >
                      <Code2 className="w-3 h-3" /> 代码
                    </motion.a>
                  )}
                  {p.links.demo && (
                    <motion.a
                      href={p.links.demo}
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
        <div className="mt-8 flex justify-center">
          <motion.button
            onClick={() => setShowExpandedProjects(!showExpandedProjects)}
            className="inline-flex items-center gap-2 px-5 py-2.5 border border-slate-700 rounded-full bg-slate-950/80 text-[11px] hover:border-sky-400 hover:text-sky-200 hover:bg-slate-900 transition-colors font-medium"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            {showExpandedProjects ? (
              <>
                <ChevronUp className="w-4 h-4" /> 收起部分项目
              </>
            ) : (
              <>
                <ChevronDown className="w-4 h-4" /> 查看全部项目
              </>
            )}
          </motion.button>
        </div>
      </Section>

      {/* 经历 & 志愿 & 领导 */}
      <Section id="experience" title="经历与参与" icon={Briefcase}>
        <div className="space-y-10">
          {/* 工作 / 教学经历 */}
          <div>
            <h3 className="text-xs font-semibold text-slate-200 uppercase tracking-wide mb-4 flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-sky-400" />
              工作 / 教学经历
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
                  <Card>
                    <div className="flex items-start gap-4">
                      {x.logo && (
                        <img
                          src={x.logo}
                          alt={x.org}
                          className="w-14 h-14 object-contain rounded-xl border border-slate-800/80 bg-slate-950/80"
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
                          {x.period} · {x.location}
                        </div>
                        <ul className="space-y-1.5 text-xs text-slate-200 leading-relaxed">
                          {x.bullets.map((b, j) => (
                            <li key={j} className="flex gap-2">
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

          {/* 志愿服务 */}
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
                  <Card>
                    <div className="flex items-start gap-3">
                      {x.logo && (
                        <img
                          src={x.logo}
                          alt={x.org}
                          className="w-10 h-10 object-contain rounded-xl border border-slate-800/80 bg-slate-950/80"
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

          {/* 领导力与社团参与 */}
          <div>
            <h3 className="text-xs font-semibold text-slate-200 uppercase tracking-wide mb-4 flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-indigo-400" />
              领导力与社团参与
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
                  <Card>
                    <div className="flex items-start gap-3">
                      {x.logo && (
                        <img
                          src={x.logo}
                          alt={x.org}
                          className="w-10 h-10 object-contain rounded-xl border border-slate-800/80 bg-slate-950/80"
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

      {/* 技能 */}
      <Section id="skills" title="技能与技术栈" icon={Cpu}>
        <div className="grid md:grid-cols-2 gap-6">
          {SKILLS.map((g, i) => (
            <motion.div
              key={g.group}
              initial={{ opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <Card>
                <div className="flex items-center gap-3 mb-3">
                  <g.icon className="w-5 h-5 text-sky-300" />
                  <h3 className="font-semibold text-sm text-slate-100">
                    {g.group}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {g.items.map((s) => (
                    <motion.span
                      key={s}
                      className="px-3 py-1.5 bg-slate-950/80 border border-slate-700 rounded-full text-[11px] font-mono text-slate-100"
                      whileHover={{ scale: 1.05, borderColor: "#38bdf8" }}
                    >
                      {s}
                    </motion.span>
                  ))}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* 照片画廊 */}
      <Section id="photos" title="照片画廊" icon={Camera}>
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
                  查看我的照片
                </h3>
                <p className="text-xs text-sky-100 mb-3 leading-relaxed max-w-md">
                  偶尔会记录一些项目现场、社团活动的画面。
                </p>
                <div className="inline-flex items-center gap-2 text-[11px] font-semibold text-white">
                  <span>进入照片画廊</span>
                  <ExternalLink className="w-4 h-4" />
                </div>
              </div>
              <Camera className="w-20 h-20 text-white/30 hidden sm:block" />
            </div>
          </Card>
        </motion.a>
      </Section>

      {/* 联系方式 */}
      <Section id="contact" title="联系方式" icon={Mail}>
        <Card className="bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white border-slate-700/80">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-3 text-white">
                欢迎联系我
              </h3>
              <p className="mb-5 text-sm text-slate-200 leading-relaxed">
                {CONTACT.note}
              </p>
              <div className="flex flex-wrap gap-3">
                {[
                  { href: `mailto:${SITE.links.email}`, icon: Mail, label: "发邮件" },
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
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5" />
                <span>{SITE.links.email}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5" />
                <span>{SITE.links.phone}</span>
              </div>
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
                <a href={SITE.links.website} className="hover:underline">
                  {SITE.links.website}
                </a>
              </div>
            </div>
          </div>
        </Card>
      </Section>

      {/* 页脚 */}
      <footer className="py-10 border-t border-slate-800 bg-slate-950">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-[11px] text-slate-400">
              © {new Date().getFullYear()} {SITE.name} · 使用 React、Tailwind 与 Framer Motion 构建。
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
    </div>
  );
}
