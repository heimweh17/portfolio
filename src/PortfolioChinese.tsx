import React, { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
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
  Sparkles,
  Terminal,
  Cpu,
  Award,
  Instagram,
  Languages,
  Camera,
} from "lucide-react";

// ====== 数据 ======
const SITE = {
  tagline: "佛罗里达大学计算机科学专业 • 地理辅修",
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
    website: "https://portfolio-six-teal-77.vercel.app",
  },
};

const ABOUT = {
  blurb:
    "我是佛罗里达大学的计算机科学学生，在算法、数据结构和系统设计方面有扎实的基础。我致力于构建解决实际问题的软件——从全栈分析到地理空间地图和无障碍界面。",
  highlights: [
    "精通 C++ / Python / Java / JavaScript，以及 React、Flask、SQL、Docker",
    "实践项目：分析仪表板、辅助技术、游戏开发",
    "寻求 2026 年暑期软件工程 / 数据 / 地理空间 / AI 相关实习机会",
  ],
};

const EDUCATION = [
  {
    school: "佛罗里达大学",
    degree: "计算机科学学士（地理辅修）",
    gpa: "GPA 3.80/4.00",
    period: "2024 – 2028（预计）",
    honors: "院长名单",
    activities: "活动：UF SASE，UF CASA",
    logo: "/logos/uf_logo.png",
  },
  {
    school: "布霍尔茨高中",
    gpa: "GPA 4.79",
    period: "2020 – 2024",
    activities: "活动：科学队，数学队，知识竞赛",
    logo: "/logos/buchholz_logo.png",
  },
];

const EXPERIENCE = [
  {
    role: "文化表演者",
    org: "家庭舞狮舞龙队",
    period: "2025年1月 – 2025年5月",
    location: "佛罗里达州盖恩斯维尔",
    bullets: [
      "策划并呈现传统舞狮舞龙表演，吸引超过300名观众，提升了主要社区和大学活动的文化知名度。",
      "掌握并执行复杂、高能量的编舞，展示身体纪律和精准时机，代表传统舞狮舞龙习俗。",
    ],
    logo: "/logos/jiating_logo.jpg",
    link: "https://jiatingliondragon.com/",
  },
  {
    role: "教师",
    org: "逻辑实验室",
    period: "2022年6月 – 2022年7月",
    location: "佛罗里达州盖恩斯维尔",
    bullets: [
      "领导并指导30多名小学生学习数学和国际象棋，制定循序渐进的课程计划，提高理解能力。",
      "创建引人入胜的教学材料，调整教学方法以适应不同的学习风格并培养批判性思维。",
      "管理课堂动态并维持支持性学习环境，增强学生的解决问题能力。",
      "与教学团队合作评估学生进步，并完善教学策略以改善学习成果。",
    ],
    link: "http://www.logiclabgainesville.com/",
  },
];

const VOLUNTEER = [
  {
    role: "地图绘制者",
    org: "开放街道地图",
    period: "2020年9月 – 至今",
    bullets: [
      "我在2020年疫情封锁期间开始绘制地图，从我熟悉的中国东南部和佛罗里达的地方开始。从那时起，我在OpenStreetMap上进行了587+次编辑，支持开放的、社区驱动的地理数据，可以帮助城市、日常用户，甚至灾难响应工作。我喜欢贡献，因为这项工作直接使每个人受益。",
    ],
    logo: "/logos/osm_logo.svg",
    link: "https://www.openstreetmap.org/",
  },
  {
    role: "教师",
    org: "布霍尔茨数学队",
    period: "2022年6月 – 2022年7月；2023年6月 – 2023年7月",
    bullets: [
      "在布霍尔茨暑期夏令营教授小学和中学生数学，通过个性化指导和练习帮助他们增强解决问题的能力、逻辑推理和批判性思维技能。",
    ],
    link: "https://buchholzmathteam.org/",
    logo: "/logos/bhs_logo.png",
  },
];

const LEADERSHIPS = [
  {
    role: "SASE 实习生",
    org: "UF 亚洲科学家与工程师协会",
    period: "2025年8月 – 至今",
    bullets: [
      "为150多名参与者策划专业活动，投入30多小时进行编程和参与。",
      "与100多名成员合作开展持续的项目，培养规划和沟通技能。",
      "通过导师计划和社交活动扩展专业网络，加强未来的领导力和职业机会。",
    ],
    logo: "/logos/sase_logo.jpg",
    link: "https://ufsase.com/",
  },
  {
    role: "活动委员会成员",
    org: "UF 华裔美国学生协会",
    period: "2022年6月 – 2022年7月；2023年6月 – 2023年7月",
    bullets: [
      "主导为100多名参与者举办文化节，投入30多小时进行协调和策划。",
      "撰写、策划和执行文化活动，提升参与度并庆祝中华传统。",
    ],
    link: "https://orgs.studentinvolvement.ufl.edu/Organization/Chinese-American-Student-Association",
    logo: "/logos/casa_logo.jpg",
  },
];

const PROJECTS = [
  {
    name: "成绩追踪器",
    blurb: "全栈网页应用，通过交互式图表可视化学生表现。",
    impact: "Docker化开发使设置速度提高85%；在几秒钟内处理CSV以呈现趋势。",
    tech: ["Flask", "React", "SQLAlchemy", "PostgreSQL", "Docker"],
    links: { demo: "", code: "https://github.com/heimweh17/Grade-Track" },
    color: "from-blue-400/20 to-cyan-400/20",
  },
  {
    name: "无障碍桥梁",
    blurb: "辅助技术工具包：头部姿势光标、嘴部摩尔斯打字、眨眼/眉毛点击。",
    impact: "实时计算机视觉约30 FPS，延迟<100ms；改善免提使用的可访问性。",
    tech: ["Python", "OpenCV", "MediaPipe", "PyAutoGUI"],
    links: { demo: "", code: "https://github.com/heimweh17/Ability-Bridge" },
    color: "from-cyan-400/20 to-blue-500/20",
  },
  {
    name: "扫雷游戏（SFML）",
    blurb: "交互式C++扫雷游戏，具有递归揭示、标记、暂停/调试、计时器、排行榜。",
    impact: "350+方格；通过文件I/O持久化前5名分数；模块化面向对象设计。",
    tech: ["C++", "SFML"],
    links: { demo: "", code: "https://github.com/heimweh17/Minesweeper-game" },
    color: "from-blue-500/20 to-indigo-500/20",
  },
  {
    name: "装箱问题：最佳适应 vs 首次适应",
    blurb: "算法比较，处理100k+矩形以量化运行时和空间权衡。",
    impact: "面向对象的放置框架简化了实验和指标。",
    tech: ["C++"],
    links: { demo: "", code: "https://github.com/heimweh17/best-fit-fitst-fit" },
    color: "from-indigo-500/20 to-blue-600/20",
  },
  {
    name: "AVL树数据结构",
    blurb: "具有插入、删除、搜索和旋转的自平衡AVL树。",
    impact: "支持1,000+操作并通过自定义测试套件验证正确性。",
    tech: ["C++"],
    links: { code: "https://github.com/heimweh17/AVL-TREE" },
    color: "from-blue-600/20 to-cyan-500/20",
  },
  {
    name: "数独游戏",
    blurb: "具有3个难度级别和实时验证的交互式数独板。",
    impact: "实现UI状态处理、胜负检测、重置控制和流畅的用户体验。",
    tech: ["Python"],
    links: { code: "https://github.com/heimweh17/suduku-project" },
    color: "from-cyan-500/20 to-blue-400/20",
  },
];

const SKILLS = [
  { group: "编程语言", items: ["C++", "Python", "Java", "TypeScript", "SQL", "RISC-V"], icon: Terminal },
  { group: "框架", items: ["React", "Flask", "FastAPI", "Node", "Vite", "Tailwind"], icon: Code2 },
  { group: "数据与基础设施", items: ["PostgreSQL", "SQLite", "Docker", "Git", "CI", "Grafana"], icon: Cpu },
  { group: "专业领域", items: ["算法", "数据结构", "地理空间（GIS）", "计算机视觉"], icon: Sparkles },
];

const CONTACT = {
  note: "开放2026年暑期实习机会。很乐意讨论数据系统、地理空间和无障碍UI。",
};

// ====== 浮动粒子 ======
function FloatingParticles() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-blue-500/20 rounded-full"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
          }}
          animate={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
          }}
          transition={{
            duration: Math.random() * 20 + 10,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      ))}
    </div>
  );
}

// ====== 滚动进度 ======
function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 via-blue-600 to-cyan-500 origin-left z-50"
      style={{ scaleX: scrollYProgress }}
    />
  );
}

// ====== UI 组件 ======
const Section = ({ id, title, children, icon: Icon }) => (
  <section id={id} className="scroll-mt-24 max-w-5xl mx-auto px-4 sm:px-6 md:px-8 py-12">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center gap-3 mb-8">
        {Icon && <Icon className="w-8 h-8 text-blue-600" />}
        <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
          {title}
        </h2>
      </div>
      {children}
    </motion.div>
  </section>
);

const Card = ({ children, className = "" }) => (
  <motion.div
    whileHover={{ y: -4, boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}
    transition={{ duration: 0.2 }}
    className={`rounded-2xl bg-white border border-gray-200 p-6 shadow-lg hover:shadow-xl transition-all backdrop-blur-sm ${className}`}
  >
    {children}
  </motion.div>
);

// ====== 页面 ======
export default function PortfolioChinese() {
  const [showExpandedProjects, setShowExpandedProjects] = useState(false);
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 500], [0, 150]);
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0]);
  const visibleProjects = showExpandedProjects ? PROJECTS : PROJECTS.slice(0, 3);

  return (
    <div className="font-mono antialiased text-gray-900 bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50 min-h-screen relative overflow-x-hidden">
      <FloatingParticles />
      <ScrollProgress />

      {/* 导航栏 */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="sticky top-0 z-40 backdrop-blur-xl bg-white/80 border-b border-gray-200 shadow-sm"
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-8 h-16 flex items-center justify-between">
          <motion.a
            href="#home"
            className="font-bold text-xl bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent"
            whileHover={{ scale: 1.05 }}
          >
            {SITE.name}
          </motion.a>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            {["关于", "项目", "经历", "技能", "联系"].map((item, index) => {
              const ids = ["about", "projects", "experience", "skills", "contact"];
              return (
                <motion.a
                  key={item}
                  href={`#${ids[index]}`}
                  className="hover:text-blue-600 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item}
                </motion.a>
              );
            })}
          </nav>
          <div className="flex items-center gap-3">
            <motion.a
              href="/"
              className="inline-flex items-center gap-2 text-sm text-gray-700 hover:text-blue-600 transition-colors"
              whileHover={{ scale: 1.05 }}
              title="English Version"
            >
              <Languages className="w-4 h-4" />
              <span className="hidden sm:inline">English</span>
            </motion.a>
            <motion.a
              href={SITE.links.resume}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl px-4 py-2 hover:shadow-lg transition-shadow"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FileText className="w-4 h-4" /> 简历
            </motion.a>
          </div>
        </div>
      </motion.header>

      {/* 语言横幅 */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-2 text-center text-sm"
      >
        <div className="max-w-5xl mx-auto px-4 flex items-center justify-center gap-3">
          <Languages className="w-4 h-4" />
          <span>本页面也提供英文版本。</span>
          <motion.a
            href="/"
            className="underline font-semibold hover:text-blue-100"
            whileHover={{ scale: 1.05 }}
          >
            view in English →
          </motion.a>
        </div>
      </motion.div>

      {/* 主页横幅 */}
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 md:px-8 py-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <motion.div
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-medium mb-6"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Sparkles className="w-4 h-4" />
                  2026年暑期开放实习
                </motion.div>
                <h1 className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-800 bg-clip-text text-transparent">
                  {SITE.headline}
                </h1>
                <p className="text-xl text-gray-600 mb-6">{SITE.tagline}</p>
                <p className="text-gray-700 leading-relaxed mb-8">
                  佛罗里达大学计算机科学专业学生，热衷于构建有影响力的软件。我专注于算法、数据结构和系统设计——创造对社会有意义贡献的技术。
                </p>
                <div className="flex flex-wrap gap-3">
                  {[
                    { href: SITE.links.github, icon: Github, label: "GitHub" },
                    { href: SITE.links.linkedin, icon: Linkedin, label: "LinkedIn" },
                    { href: SITE.links.instagram, icon: Instagram, label: "Instagram" },
                    { href: `mailto:${SITE.links.email}`, icon: Mail, label: "邮箱" },
                  ].map(({ href, icon: Icon, label }) => (
                    <motion.a
                      key={label}
                      href={href}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border-2 border-gray-200 hover:border-blue-500 transition-colors shadow-sm"
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Icon className="w-4 h-4" /> {label}
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="relative w-full aspect-square max-w-sm mx-auto">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full blur-3xl opacity-30"
                  animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
                  transition={{ duration: 8, repeat: Infinity }}
                />
                <img
                  src="/me.jpg"
                  alt="刘昊洲"
                  className="relative w-full h-full object-cover rounded-3xl shadow-2xl border-4 border-white"
                />
                <motion.div
                  className="absolute -bottom-4 -right-4 bg-white rounded-2xl p-3 shadow-xl border border-gray-200"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <a
                    href="https://www.google.com/maps/place/Gainesville,+FL"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 hover:text-blue-600 transition-colors"
                  >
                    <MapPin className="w-4 h-4 text-blue-600" />
                    <span className="font-medium text-sm">{SITE.location}</span>
                  </a>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </motion.div>
        {/* 动画背景形状 */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute top-20 left-10 w-72 h-72 bg-blue-300/30 rounded-full blur-3xl"
            animate={{ x: [0, 100, 0], y: [0, 50, 0] }}
            transition={{ duration: 20, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-300/30 rounded-full blur-3xl"
            animate={{ x: [0, -100, 0], y: [0, -50, 0] }}
            transition={{ duration: 15, repeat: Infinity }}
          />
        </div>
      </section>

      {/* 项目 */}
      <Section id="projects" title="精选项目" icon={Code2}>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleProjects.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className={`bg-gradient-to-br ${p.color} border-0 h-full flex flex-col`}>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2">{p.name}</h3>
                  <p className="text-sm text-gray-700 mb-3">{p.blurb}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {p.tech.map((t) => (
                      <span key={t} className="text-xs px-3 py-1 bg-white/60 rounded-full font-medium">
                        {t}
                      </span>
                    ))}
                  </div>
                  <p className="text-xs text-gray-600 mb-4">
                    <strong>影响：</strong> {p.impact}
                  </p>
                </div>
                <div className="flex gap-3">
                  {p.links.code && (
                    <motion.a
                      href={p.links.code}
                      className="flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700"
                      whileHover={{ x: 5 }}
                    >
                      <Code2 className="w-4 h-4" /> 代码
                    </motion.a>
                  )}
                  {p.links.demo && (
                    <motion.a
                      href={p.links.demo}
                      className="flex items-center gap-2 text-sm font-medium text-cyan-600 hover:text-cyan-700"
                      whileHover={{ x: 5 }}
                    >
                      <ExternalLink className="w-4 h-4" /> 演示
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
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white border-2 border-gray-200 hover:border-blue-500 transition-colors shadow-sm font-medium"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {showExpandedProjects ? (
              <>
                <ChevronUp className="w-4 h-4" /> 收起
              </>
            ) : (
              <>
                <ChevronDown className="w-4 h-4" /> 查看所有项目
              </>
            )}
          </motion.button>
        </div>
      </Section>

      {/* 经历 */}
      <Section id="experience" title="工作经历" icon={Briefcase}>
        <div className="space-y-6">
          {EXPERIENCE.map((x, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Card>
                <div className="flex items-start gap-4">
                  {x.logo && (
                    <img src={x.logo} alt={x.org} className="w-16 h-16 object-contain rounded-lg" />
                  )}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 text-sm text-blue-600 font-medium mb-1">
                      {x.link ? (
                        <a href={x.link} target="_blank" className="hover:underline">
                          {x.org}
                        </a>
                      ) : (
                        x.org
                      )}
                    </div>
                    <h3 className="text-xl font-bold mb-1">{x.role}</h3>
                    <div className="text-sm text-gray-600 mb-3">
                      {x.period} • {x.location}
                    </div>
                    <ul className="space-y-2 text-sm text-gray-700">
                      {x.bullets.map((b, j) => (
                        <li key={j} className="flex gap-2">
                          <span className="text-blue-600 mt-1">→</span>
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
      </Section>

      {/* 志愿服务 */}
      <Section id="volunteer" title="志愿服务" icon={Award}>
        <div className="grid md:grid-cols-2 gap-6">
          {VOLUNTEER.map((x, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="h-full">
                <div className="flex items-start gap-4">
                  {x.logo && (
                    <img src={x.logo} alt={x.org} className="w-12 h-12 object-contain" />
                  )}
                  <div className="flex-1">
                    <div className="text-sm text-blue-600 font-medium mb-1">
                      {x.link ? (
                        <a href={x.link} target="_blank" className="hover:underline">
                          {x.org}
                        </a>
                      ) : (
                        x.org
                      )}
                    </div>
                    <h3 className="font-bold mb-1">{x.role}</h3>
                    <div className="text-sm text-gray-600 mb-3">{x.period}</div>
                    <div className="text-sm text-gray-700">{x.bullets[0]}</div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* 领导力 */}
      <Section id="leadership" title="领导经历" icon={Award}>
        <div className="grid md:grid-cols-2 gap-6">
          {LEADERSHIPS.map((x, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="h-full">
                <div className="flex items-start gap-4">
                  {x.logo && (
                    <img src={x.logo} alt={x.org} className="w-12 h-12 object-contain" />
                  )}
                  <div className="flex-1">
                    <div className="text-sm text-blue-600 font-medium mb-1">
                      {x.link ? (
                        <a href={x.link} target="_blank" className="hover:underline">
                          {x.org}
                        </a>
                      ) : (
                        x.org
                      )}
                    </div>
                    <h3 className="font-bold mb-1">{x.role}</h3>
                    <div className="text-sm text-gray-600 mb-3">{x.period}</div>
                    <ul className="space-y-1 text-sm text-gray-700">
                      {x.bullets.map((b, j) => (
                        <li key={j} className="flex gap-2">
                          <span className="text-blue-600">•</span>
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
      </Section>

      {/* 技能 */}
      <Section id="skills" title="技能与技术" icon={Cpu}>
        <div className="grid md:grid-cols-2 gap-6">
          {SKILLS.map((g, i) => (
            <motion.div
              key={g.group}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-0">
                <div className="flex items-center gap-3 mb-4">
                  <g.icon className="w-6 h-6 text-blue-600" />
                  <h3 className="font-bold text-lg">{g.group}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {g.items.map((s) => (
                    <motion.span
                      key={s}
                      className="px-3 py-1.5 bg-white rounded-lg text-sm font-medium shadow-sm"
                      whileHover={{ scale: 1.05, y: -2 }}
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

      {/* 关于我 */}
      <Section id="about" title="关于我" icon={Sparkles}>
        <Card className="bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-100 border-0">
          <p className="text-gray-700 leading-relaxed mb-6">{ABOUT.blurb}</p>
          <ul className="space-y-3 mb-8">
            {ABOUT.highlights.map((h, i) => (
              <motion.li
                key={i}
                className="flex gap-3 text-gray-800"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <span className="text-blue-600 text-xl">✓</span>
                <span>{h}</span>
              </motion.li>
            ))}
          </ul>

          {/* 教育背景 */}
          <div className="border-t border-gray-200 pt-8">
            <div className="flex items-center gap-2 text-lg font-bold text-gray-800 mb-6">
              <Calendar className="w-5 h-5 text-blue-600" />
              教育背景
            </div>
            <div className="space-y-6">
              {EDUCATION.map((edu, i) => (
                <motion.div
                  key={i}
                  className="flex items-start gap-4 bg-white rounded-xl p-4 shadow-sm"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <img
                    src={edu.logo}
                    alt={edu.school}
                    className="w-16 h-16 object-contain rounded-lg"
                  />
                  <div className="flex-1">
                    <h4 className="font-bold text-lg mb-1">{edu.school}</h4>
                    {edu.degree && (
                      <p className="text-sm text-gray-700 mb-1">{edu.degree}</p>
                    )}
                    <p className="text-sm text-gray-600 mb-1">
                      {edu.gpa} • {edu.period}
                    </p>
                    {edu.honors && (
                      <p className="text-sm text-blue-600 font-medium mb-1">{edu.honors}</p>
                    )}
                    <p className="text-sm text-gray-600">{edu.activities}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </Card>
      </Section>

      {/* 照片画廊链接 */}
      <Section id="photos" title="照片画廊" icon={Camera}>
        <motion.a
          href="/photos"
          className="block"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Card className="bg-gradient-to-br from-blue-500 via-cyan-500 to-blue-600 border-0 text-white cursor-pointer">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold mb-2">查看我的照片画廊</h3>
                <p className="text-blue-50 mb-4">
                  查看我的工作、活动和冒险的照片！
                </p>
                <div className="inline-flex items-center gap-2 text-sm font-semibold">
                  <span>探索照片</span>
                  <ExternalLink className="w-4 h-4" />
                </div>
              </div>
              <Camera className="w-24 h-24 opacity-20" />
            </div>
          </Card>
        </motion.a>
      </Section>

      {/* 联系方式 */}
      <Section id="contact" title="联系我" icon={Mail}>
        <Card className="bg-gradient-to-br from-blue-600 to-cyan-600 text-white border-0">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">让我们联系</h3>
              <p className="mb-6 opacity-90">{CONTACT.note}</p>
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
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white text-blue-600 font-medium shadow-lg"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Icon className="w-4 h-4" /> {label}
                  </motion.a>
                ))}
              </div>
            </div>
            <div className="space-y-3 text-sm">
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
      <footer className="relative z-10 py-12 border-t border-gray-200 bg-white/50 backdrop-blur">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-gray-600">
              © {new Date().getFullYear()} {SITE.name}. 用心制作。
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
                  className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white shadow-lg"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}