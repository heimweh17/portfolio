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

// ====== DATA ======
const SITE = {
  tagline: "CS @ University of Florida • Geography Minor",
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

const ABOUT = {
  blurb:
    "Computer Science student at the University of Florida focusing on algorithms, data systems, and geospatial applications. I enjoy building tools that turn real-world complexity into something visual, interactive, and useful.",
  highlights: [
    "Core: Data structures, algorithms, systems, and full-stack development",
    "Tech stack: C++, Python, TypeScript, React, Flask, SQL, Docker",
    "Interests: Geospatial (GIS), data-driven systems, accessibility & HCI",
  ],
};

const EDUCATION = [
  {
    school: "University of Florida",
    degree: "B.S. in Computer Science (Minor in Geography)",
    gpa: "GPA 3.80/4.00",
    period: "2024 – 2028 (expected)",
    honors: "Dean's List",
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

// Experience：Logic Lab 不写 logo 字段
const EXPERIENCE = [
  {
    role: "Instructor",
    org: "Logic Lab",
    period: "Jun 2022 – Jul 2022",
    location: "Gainesville, FL",
    bullets: [
      "Planned and taught math and chess lessons for a class of 30+ elementary students, emphasizing structured problem-solving and logical reasoning.",
      "Designed progressive exercises and feedback loops that made abstract concepts approachable for younger learners.",
    ],
    link: "http://www.logiclabgainesville.com/",
  },
  {
    role: "Cultural Performer",
    org: "JiaTing Lion & Dragon",
    period: "Jan 2025 – May 2025",
    location: "Gainesville, FL",
    bullets: [
      "Performed traditional lion and dragon dance at university and community events, representing Asian culture to audiences of 300+.",
      "Collaborated with a team to synchronize complex routines, demonstrating discipline, timing, and communication under pressure.",
    ],
    logo: "/logos/jiating_logo.jpg",
    link: "https://jiatingliondragon.com/",
  },
];

// Volunteer：使用你原来的两条
const VOLUNTEER = [
  {
    role: "Mapper",
    org: "OpenStreetMap",
    period: "Sep 2020 – Present",
    bullets: [
      "Started mapping during the 2020 lockdown, focusing on Southeast China and Florida to support open, community-driven geographic data.",
      "Contributed 587+ edits that improve navigation, local knowledge, and downstream applications for everyday users and disaster response.",
    ],
    logo: "/logos/osm_logo.svg",
    link: "https://www.openstreetmap.org/",
  },
  {
    role: "Instructor",
    org: "Buchholz Math Team",
    period: "Jun 2022 – Jul 2022 ; Jun 2023 – Jul 2023",
    bullets: [
      "Taught elementary and middle school students math during a summer camp, helping them strengthen problem-solving, logical reasoning, and critical thinking.",
    ],
    logo: "/logos/bhs_logo.png",
    link: "https://buchholzmathteam.org/",
  },
];

// Leadership & Involvement：SASE + CASA
const LEADERSHIPS = [
  {
    role: "SASE Intern",
    org: "UF Society of Asian Scientists & Engineers",
    period: "Aug 2025 – Present",
    bullets: [
      "Support professional and technical events for 100+ members, including logistics and programming for a 150+ attendee event.",
    ],
    logo: "/logos/sase_logo.jpg",
    link: "https://ufsase.com/",
  },
  {
    role: "Event Committee Member",
    org: "UF Chinese American Student Association",
    period: "2024 – Present",
    bullets: [
      "Help design and run cultural programming that highlights Chinese American identity and community on campus.",
    ],
    logo: "/logos/casa_logo.jpg",
    link: "https://orgs.studentinvolvement.ufl.edu/Organization/Chinese-American-Student-Association",
  },
];

const PROJECTS = [
  {
    name: "Geography Dashboard",
    blurb:
      "Interactive geospatial platform that visualizes real-time OpenStreetMap data, compares urban regions, and personalizes insights through user accounts.",
    impact:
      "Enables users to explore city-level patterns via multi-layer analytics, saved views, and spatial queries—bridging CS and geography in a single tool.",
    tech: ["React", "Leaflet", "Supabase(SQL)", "Vite", "TypeScript"],
    links: {
      demo: "https://thegeodashboard.vercel.app/",
      code: "https://github.com/heimweh17/Geo-Dashboard",
    },
  },
  {
    name: "UF Health SmartScribe",
    blurb:
      "AI-powered medical scribe that converts doctor–patient conversations into structured SOAP notes.",
    impact:
      "Real-time transcription with speaker diarization; significantly reduces manual documentation time and cognitive load for clinicians.",
    tech: ["JavaScript", "HTML/CSS", "Supabase", "PostgreSQL", "DeepGram API", "Gemini API"],
    links: { demo: "", code: "https://github.com/heimweh17/SmartScribe" },
  },
  {
    name: "Grade Track",
    blurb:
      "Full-stack analytics dashboard that ingests CSV data to surface grade distributions, trends, and at-risk segments.",
    impact:
      "Dockerized dev environment makes onboarding faster; transforms raw course data into interactive visual summaries in seconds.",
    tech: ["Flask", "React", "SQLAlchemy", "PostgreSQL", "Docker"],
    links: { demo: "", code: "https://github.com/heimweh17/Grade-Track" },
  },
  {
    name: "Ability Bridge",
    blurb:
      "Assistive toolkit providing head-pose cursor control, mouth-Morse typing, and blink/eyebrow clicking.",
    impact:
      "Runs at ~30 FPS with <100ms latency and hands-free interaction, exploring how computer vision can support accessibility use cases.",
    tech: ["Python", "OpenCV", "MediaPipe", "PyAutoGUI"],
    links: { demo: "", code: "https://github.com/heimweh17/Ability-Bridge" },
  },
  {
    name: "Minesweeper (SFML)",
    blurb:
      "Interactive C++ Minesweeper implementation with recursive reveal, flags, pause/debug modes, timer, and leaderboard.",
    impact:
      "Uses modular OOP design and file I/O for persistent top-5 scores; ~350 tiles per board with robust game state handling.",
    tech: ["C++", "SFML"],
    links: { demo: "", code: "https://github.com/heimweh17/Minesweeper-game" },
  },
  {
    name: "Bin Packing: Best-Fit vs First-Fit",
    blurb:
      "Algorithmic comparison framework processing 100k+ rectangles to study runtime and packing efficiency trade-offs.",
    impact:
      "Provides a reusable experiment harness to test heuristics, gather metrics, and visualize performance of different strategies.",
    tech: ["C++"],
    links: { demo: "", code: "https://github.com/heimweh17/best-fit-fitst-fit" },
  },
  {
    name: "AVL Tree Data Structure",
    blurb:
      "Self-balancing AVL tree with insert, delete, search, and rotation operations for maintaining ordered student records.",
    impact:
      "Handles 1,000+ operations while preserving height balance; validated with a custom test suite for edge cases and rotations.",
    tech: ["C++"],
    links: { code: "https://github.com/heimweh17/AVL-TREE" },
  },
  {
    name: "Sudoku Game",
    blurb:
      "Python-based Sudoku game with multiple difficulty levels, validity checking, and smooth UI interactions.",
    impact:
      "Implements clean game state management, error feedback, and reset controls, focusing on UX and correctness.",
    tech: ["Python"],
    links: { code: "https://github.com/heimweh17/suduku-project" },
  },
];

const SKILLS = [
  {
    group: "Languages",
    items: ["C++", "Python", "Java", "TypeScript", "SQL", "RISC-V"],
    icon: Terminal,
  },
  {
    group: "Frameworks",
    items: ["React", "Flask", "FastAPI", "Node", "Vite", "Tailwind"],
    icon: Code2,
  },
  {
    group: "Data & Infra",
    items: ["PostgreSQL", "SQLite", "Docker", "Git", "CI", "Grafana"],
    icon: Cpu,
  },
  {
    group: "Domains",
    items: ["Algorithms", "Data Structures", "Geospatial (GIS)", "Computer Vision"],
    icon: Code2,
  },
];

const CONTACT = {
  note: "Open to internships for Summer 2026, especially roles involving backend systems, data, or geospatial applications. Always happy to talk about maps, infrastructure, or accessibility.",
};

// ====== UI PRIMITIVES ======
const Section = ({ id, title, children, icon: Icon }) => (
  <section id={id} className="scroll-mt-24 max-w-6xl mx-auto px-6 py-16 text-slate-100">
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

// ====== PAGE ======
export default function Portfolio() {
  const [showExpandedProjects, setShowExpandedProjects] = useState(false);
  const visibleProjects = showExpandedProjects ? PROJECTS : PROJECTS.slice(0, 3);

  return (
    <div className="font-sans antialiased bg-slate-950 min-h-screen text-slate-100">
      {/* NAVBAR */}
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
            
            <span className="hidden sm:inline">Alex Liu - Portfolio</span>
            <span className="sm:hidden">Alex Liu</span>
          </motion.a>
          <nav className="hidden md:flex items-center gap-6 text-[11px] font-medium text-slate-200">
            {["About", "Projects", "Experience", "Skills", "Contact"].map((item) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="hover:text-sky-300 transition-colors"
                whileHover={{ y: -1 }}
              >
                {item}
              </motion.a>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <motion.a
              href="/zh"
              className="inline-flex items-center gap-1.5 text-[11px] text-slate-200 hover:text-sky-300"
              whileHover={{ scale: 1.05 }}
              title="简体中文版"
            >
              <Languages className="w-4 h-4" />
              <span className="hidden sm:inline">中文</span>
            </motion.a>
            <motion.a
              href={SITE.links.resume}
              className="inline-flex items-center gap-2 bg-slate-100 text-slate-900 text-[11px] px-4 py-2 rounded-full hover:bg-white transition-colors shadow-[0_0_20px_rgba(248,250,252,0.3)]"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FileText className="w-4 h-4" /> Resume
            </motion.a>
          </div>
        </div>
      </motion.header>

      {/* HERO：删掉上面那个 CS @ UF pill，保留标题 + 文案 */}
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
                I study Computer Science with a focus on algorithms, data structures, and
                how to turn data into something you can see and interact with. Recently,
                that's meant geospatial dashboards, medical tooling, and accessibility-oriented
                interfaces.
              </p>

              <div className="flex flex-wrap gap-3 pt-2">
                {[
                  { href: SITE.links.github, icon: Github, label: "GitHub" },
                  { href: SITE.links.linkedin, icon: Linkedin, label: "LinkedIn" },
                  { href: SITE.links.instagram, icon: Instagram, label: "Instagram" },
                  { href: `mailto:${SITE.links.email}`, icon: Mail, label: "Email" },
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

            {/* 右侧只保留头像，不再有 Focus Areas 浮框 */}
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
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ABOUT + EDUCATION 深色块 */}
      <Section id="about" title="Profile Overview" icon={Briefcase}>
        <div className="grid lg:grid-cols-3 gap-8">
          <Card className="lg:col-span-2">
            <h3 className="text-sm font-semibold text-slate-100 mb-3 uppercase tracking-wide">
              About Me
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

            {/* Focus Areas 从 Hero 移到这里 */}
            <div className="mt-6 border-t border-slate-800 pt-4">
              <div className="flex items-center gap-2 text-xs text-slate-200 mb-2">
                <Code2 className="w-4 h-4 text-sky-300" />
                <span className="font-semibold tracking-wide">Focus Areas</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {[
                  "Algorithms & Data Structures",
                  "Data Systems & Analytics",
                  "Geospatial (GIS) Tools",
                  "Accessibility / HCI",
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
                Education
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
                      {edu.gpa} • {edu.period}
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

      {/* PROJECTS */}
      <Section id="projects" title="Featured Projects" icon={Code2}>
        <p className="text-sm text-slate-300 mb-6 max-w-3xl">
          A subset of projects that represent how I like to work: combining algorithms and
          data structures with visualization, spatial reasoning, and real users—whether
          they are students, clinicians, or people navigating cities.
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
                      <span className="font-semibold text-slate-50">Impact: </span>
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
                      <Code2 className="w-3 h-3" /> Code
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
                <ChevronUp className="w-4 h-4" /> Show Fewer
              </>
            ) : (
              <>
                <ChevronDown className="w-4 h-4" /> View All Projects
              </>
            )}
          </motion.button>
        </div>
      </Section>

      {/* EXPERIENCE / VOLUNTEER / LEADERSHIP 三段，竖着排 */}
      <Section id="experience" title="Experience & Involvement" icon={Briefcase}>
        <div className="space-y-10">
          {/* Experience */}
          <div>
            <h3 className="text-xs font-semibold text-slate-200 uppercase tracking-wide mb-4 flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-sky-400" />
              Experience
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
                            <a href={x.link} target="_blank" className="hover:underline">
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

          {/* Volunteer：用你以前那两个 */}
          <div>
            <h3 className="text-xs font-semibold text-slate-200 uppercase tracking-wide mb-4 flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              Volunteer
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
                            <a href={x.link} target="_blank" className="hover:underline">
                              {x.org}
                            </a>
                          ) : (
                            x.org
                          )}
                        </div>
                        <h4 className="font-semibold text-xs mb-1 text-slate-50">
                          {x.role}
                        </h4>
                        <div className="text-[10px] text-slate-400 mb-1">{x.period}</div>
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

          {/* Leadership & Involvement */}
          <div>
            <h3 className="text-xs font-semibold text-slate-200 uppercase tracking-wide mb-4 flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-indigo-400" />
              Leadership & Involvement
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
                            <a href={x.link} target="_blank" className="hover:underline">
                              {x.org}
                            </a>
                          ) : (
                            x.org
                          )}
                        </div>
                        <h4 className="font-semibold text-xs mb-1 text-slate-50">
                          {x.role}
                        </h4>
                        <div className="text-[10px] text-slate-400 mb-1">{x.period}</div>
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

      {/* SKILLS */}
      <Section id="skills" title="Skills & Technologies" icon={Cpu}>
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

      {/* PHOTO GALLERY */}
      <Section id="photos" title="Photo Gallery" icon={Camera}>
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
                  View My Photo Gallery
                </h3>
                <p className="text-xs text-sky-100 mb-3 leading-relaxed max-w-md">
                  Occasional snapshots from projects, events, and the places I map.
                </p>
                <div className="inline-flex items-center gap-2 text-[11px] font-semibold text-white">
                  <span>Explore Photos</span>
                  <ExternalLink className="w-4 h-4" />
                </div>
              </div>
              <Camera className="w-20 h-20 text-white/30 hidden sm:block" />
            </div>
          </Card>
        </motion.a>
      </Section>

      {/* CONTACT */}
      <Section id="contact" title="Get In Touch" icon={Mail}>
        <Card className="bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white border-slate-700/80">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-3 text-white">Let's Connect</h3>
              <p className="mb-5 text-sm text-slate-200 leading-relaxed">
                {CONTACT.note}
              </p>
              <div className="flex flex-wrap gap-3">
                {[
                  { href: `mailto:${SITE.links.email}`, icon: Mail, label: "Email Me" },
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

      {/* FOOTER */}
      <footer className="py-10 border-t border-slate-800 bg-slate-950">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-[11px] text-slate-400">
              © {new Date().getFullYear()} {SITE.name}.
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
