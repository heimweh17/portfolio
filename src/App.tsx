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
    "CS student at the University of Florida with a strong foundation in algorithms, data structures, and system design. I build software that solves real problems — from full-stack analytics to geospatial maps and accessibility interfaces.",
  highlights: [
    "C++ / Python / Java / JavaScript — plus React, Flask, SQL, Docker",
    "Hands-on projects: analytics dashboards, assistive tech, games",
    "Seeking SWE / data / geospatial / AI-adjacent internships (Summer 2026)",
  ],
};

const EDUCATION = [
  {
    school: "University of Florida",
    degree: "B.S. in Computer Science (Minor in Geography)",
    gpa: "GPA 3.80/4.00",
    period: "2024 – 2028 (expected)",
    honors: "Dean's List",
    activities: "Activities: UF SASE, UF CASA",
    logo: "/logos/uf_logo.png",
  },
  {
    school: "Buchholz High School",
    gpa: "GPA 4.79",
    period: "2020 – 2024",
    activities: "Activities: Science Team, Math Team, Quiz Bowl",
    logo: "/logos/buchholz_logo.png",
  },
];

const EXPERIENCE = [
  {
    role: "Cultural Performer",
    org: "JiaTing Lion & Dragon",
    period: "Jan 2025 – May 2025",
    location: "Gainesville, FL",
    bullets: [
      "Orchestrated and delivered traditional lion and dragon dance performances that captivated an audience of 300+, elevating cultural visibility at major community and university events.",
      "Mastered and executed intricate, high-energy choreography, demonstrating physical discipline and precise timing to represent traditional lion and dragon dance customs.",
    ],
    logo: "/logos/jiating_logo.jpg",
    link: "https://jiatingliondragon.com/",
  },
  {
    role: "Instructor",
    org: "Logic Lab",
    period: "Jun 2022 – Jul 2022",
    location: "Gainesville, FL",
    bullets: [
      "Led and instructed a class of 30+ elementary students in mathematics and chess, developing lesson plans that built knowledge progressively and improved comprehension.",
      "Created engaging instructional materials, adapting teaching methods to diverse learning styles and fostering critical thinking.",
      "Managed classroom dynamics and maintained a supportive learning environment, strengthening students' problem-solving skills.",
      "Collaborated with a teaching team to evaluate student progress and refine instructional strategies for improved learning outcomes.",
    ],
    link: "http://www.logiclabgainesville.com/",
  },
];

const VOLUNTEER = [
  {
    role: "Mapper",
    org: "OpenStreetMap",
    period: "Sep 2020 – Present",
    bullets: [
      "I began mapping during the 2020 lockdown, starting with places I knew in Southeast China and Florida. Since then I've made 587+ edits on OpenStreetMap to support open, community-driven geographic data that can help cities, everyday users, and even disaster response efforts. I enjoy contributing because this work directly benefits everyone.",
    ],
    logo: "/logos/osm_logo.svg",
    link: "https://www.openstreetmap.org/",
  },
  {
    role: "Instructor",
    org: "Buchholz Math Team",
    period: "Jun 2022 – Jul 2022 ; Jun 2023 – Jul 2023",
    bullets: [
      "Taught elementary and middle school students math during a summer camp at Buchholz, helping them strengthen problem-solving ability, logical reasoning, and critical thinking skills through personalized guidance and practice.",
    ],
    link: "https://buchholzmathteam.org/",
    logo: "/logos/bhs_logo.png",
  },
];

const LEADERSHIPS = [
  {
    role: "SASE Intern",
    org: "UF Society of Asian Scientists & Engineers",
    period: "Aug 2025 – Present",
    bullets: [
      "Planned a professional event for 150+ attendees, dedicating 30+ hours to programming and engagement.",
      "Collaborate with 100+ members on ongoing initiatives, building skills in planning and communication.",
      "Expand professional networks through mentorship programs and socials, strengthening future leadership and career opportunities.",
    ],
    logo: "/logos/sase_logo.jpg",
    link: "https://ufsase.com/",
  },
  {
    role: "Event Committee Member",
    org: "UF Chinese American Student Association",
    period: "Jun 2022 – Jul 2022 ; Jun 2023 – Jul 2023",
    bullets: [
      "Spearheaded a culture Festival for 100+ participants, investing 30+ hours to coordinate & program.",
      "Authored, curated, and executed cultural activities to elevate engagement and celebrate Chinese heritage.",
    ],
    link: "https://orgs.studentinvolvement.ufl.edu/Organization/Chinese-American-Student-Association",
    logo: "/logos/casa_logo.jpg",
  },
];

const PROJECTS = [
  {
    name: "Grade Track",
    blurb: "Full-stack web app to visualize student performance with interactive charts.",
    impact: "Dockerized dev makes setup 85% faster; processes CSVs to surface trends in seconds.",
    tech: ["Flask", "React", "SQLAlchemy", "PostgreSQL", "Docker"],
    links: { demo: "", code: "https://github.com/heimweh17/Grade-Track" },
    color: "from-blue-400/20 to-cyan-400/20",
  },
  {
    name: "Ability Bridge",
    blurb: "Assistive tech toolkit: head-pose cursor, mouth-Morse typing, blink/eyebrow clicks.",
    impact: "Real-time CV at ~30 FPS with <100ms latency; improves accessibility for hands-free use.",
    tech: ["Python", "OpenCV", "MediaPipe", "PyAutoGUI"],
    links: { demo: "", code: "https://github.com/heimweh17/Ability-Bridge" },
    color: "from-cyan-400/20 to-blue-500/20",
  },
  {
    name: "Minesweeper (SFML)",
    blurb: "Interactive C++ Minesweeper with recursive reveal, flags, pause/debug, timer, leaderboard.",
    impact: "350+ tiles; persistent top-5 scores via file I/O; modular OOP design.",
    tech: ["C++", "SFML"],
    links: { demo: "", code: "https://github.com/heimweh17/Minesweeper-game" },
    color: "from-blue-500/20 to-indigo-500/20",
  },
  {
    name: "Bin Packing: Best-Fit vs First-Fit",
    blurb: "Algorithmic comparison processing 100k+ rectangles to quantify runtime and space trade-offs.",
    impact: "Object-oriented placement framework streamlines experimentation and metrics.",
    tech: ["C++"],
    links: { demo: "", code: "https://github.com/heimweh17/best-fit-fitst-fit" },
    color: "from-indigo-500/20 to-blue-600/20",
  },
  {
    name: "AVL Tree Data Structure",
    blurb: "Self-balancing AVL tree with insert, delete, search, and rotations.",
    impact: "Supported 1,000+ operations and validated correctness with custom test suite.",
    tech: ["C++"],
    links: { code: "https://github.com/heimweh17/AVL-TREE" },
    color: "from-blue-600/20 to-cyan-500/20",
  },
  {
    name: "Sudoku Game",
    blurb: "Interactive Sudoku board with 3 difficulty levels and real-time validation.",
    impact: "Implemented UI state handling, win/lose detection, reset control, and smooth UX.",
    tech: ["Python"],
    links: { code: "https://github.com/heimweh17/suduku-project" },
    color: "from-cyan-500/20 to-blue-400/20",
  },
];

const SKILLS = [
  { group: "Languages", items: ["C++", "Python", "Java", "TypeScript", "SQL", "RISC-V"], icon: Terminal },
  { group: "Frameworks", items: ["React", "Flask", "FastAPI", "Node", "Vite", "Tailwind"], icon: Code2 },
  { group: "Data & Infra", items: ["PostgreSQL", "SQLite", "Docker", "Git", "CI", "Grafana"], icon: Cpu },
  { group: "Domains", items: ["Algorithms", "Data Structures", "Geospatial (GIS)", "Computer Vision"], icon: Sparkles },
];

const CONTACT = {
  note: "Open to internships for Summer 2026. Happy to chat about data systems, geospatial, and accessible UI.",
};

// ====== FLOATING PARTICLES ======
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

// ====== SCROLL PROGRESS ======
function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 via-blue-600 to-cyan-500 origin-left z-50"
      style={{ scaleX: scrollYProgress }}
    />
  );
}

// ====== UI PRIMITIVES ======
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

// ====== PAGE ======
export default function Portfolio() {
  const [showExpandedProjects, setShowExpandedProjects] = useState(false);
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 500], [0, 150]);
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0]);
  const visibleProjects = showExpandedProjects ? PROJECTS : PROJECTS.slice(0, 3);

  return (
    <div className="font-mono antialiased text-gray-900 bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50 min-h-screen relative overflow-x-hidden">
      <FloatingParticles />
      <ScrollProgress />

      {/* NAVBAR */}
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
            {["About", "Projects", "Experience", "Skills", "Contact"].map((item) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="hover:text-blue-600 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                {item}
              </motion.a>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <motion.a
              href="/zh"
              className="inline-flex items-center gap-2 text-sm text-gray-700 hover:text-blue-600 transition-colors"
              whileHover={{ scale: 1.05 }}
              title="简体中文版"
            >
              <Languages className="w-4 h-4" />
              <span className="hidden sm:inline">中文</span>
            </motion.a>
            <motion.a
              href={SITE.links.resume}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl px-4 py-2 hover:shadow-lg transition-shadow"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FileText className="w-4 h-4" /> Resume
            </motion.a>
          </div>
        </div>
      </motion.header>

      {/* LANGUAGE BANNER */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-2 text-center text-sm"
      >
        <div className="max-w-5xl mx-auto px-4 flex items-center justify-center gap-3">
          <Languages className="w-4 h-4" />
          <span>This page is also available in Simplified Chinese.</span>
          <motion.a
            href="/zh"
            className="underline font-semibold hover:text-blue-100"
            whileHover={{ scale: 1.05 }}
          >
            View in 中文 →
          </motion.a>
        </div>
      </motion.div>

      {/* HERO */}
     
<section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
  <motion.div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 md:px-8 py-20">
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
                  Available for Summer 2026
                </motion.div>
                <h1 className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-800 bg-clip-text text-transparent">
                  {SITE.headline}
                </h1>
                <p className="text-xl text-gray-600 mb-6">{SITE.tagline}</p>
                <p className="text-gray-700 leading-relaxed mb-8">
                  Computer Science student at the University of Florida passionate about building impactful software. I specialize in algorithms, data structures, and system design — creating technology that meaningfully contributes to society.
                </p>
                <div className="flex flex-wrap gap-3">
                  {[
                    { href: SITE.links.github, icon: Github, label: "GitHub" },
                    { href: SITE.links.linkedin, icon: Linkedin, label: "LinkedIn" },
                    { href: SITE.links.instagram, icon: Instagram, label: "Instagram" },
                    { href: `mailto:${SITE.links.email}`, icon: Mail, label: "Email" },
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
                  alt="Alex Liu"
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
        {/* Animated background shapes */}
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

      {/* PROJECTS */}
      <Section id="projects" title="Featured Projects" icon={Code2}>
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
                    <strong>Impact:</strong> {p.impact}
                  </p>
                </div>
                <div className="flex gap-3">
                  {p.links.code && (
                    <motion.a
                      href={p.links.code}
                      className="flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700"
                      whileHover={{ x: 5 }}
                    >
                      <Code2 className="w-4 h-4" /> Code
                    </motion.a>
                  )}
                  {p.links.demo && (
                    <motion.a
                      href={p.links.demo}
                      className="flex items-center gap-2 text-sm font-medium text-cyan-600 hover:text-cyan-700"
                      whileHover={{ x: 5 }}
                    >
                      <ExternalLink className="w-4 h-4" /> Demo
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
                <ChevronUp className="w-4 h-4" /> Show Less
              </>
            ) : (
              <>
                <ChevronDown className="w-4 h-4" /> View All Projects
              </>
            )}
          </motion.button>
        </div>
      </Section>

      {/* EXPERIENCE */}
      <Section id="experience" title="Experience" icon={Briefcase}>
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

      {/* VOLUNTEER */}
      <Section id="volunteer" title="Volunteer" icon={Award}>
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

      {/* LEADERSHIP */}
      <Section id="leadership" title="Leadership" icon={Award}>
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

      {/* SKILLS */}
      <Section id="skills" title="Skills & Technologies" icon={Cpu}>
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

      {/* ABOUT */}
      <Section id="about" title="About Me" icon={Sparkles}>
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

          {/* EDUCATION SECTION */}
          <div className="border-t border-gray-200 pt-8">
            <div className="flex items-center gap-2 text-lg font-bold text-gray-800 mb-6">
              <Calendar className="w-5 h-5 text-blue-600" />
              Education
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

      {/* PHOTO BOOTH LINK */}
      <Section id="photos" title="Photo Gallery" icon={Camera}>
        <motion.a
          href="/photos"
          className="block"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Card className="bg-gradient-to-br from-blue-500 via-cyan-500 to-blue-600 border-0 text-white cursor-pointer">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold mb-2">View My Photo Gallery</h3>
                <p className="text-blue-50 mb-4">
                  Check out photos from my work, events, and adventures!
                </p>
                <div className="inline-flex items-center gap-2 text-sm font-semibold">
                  <span>Explore Photos</span>
                  <ExternalLink className="w-4 h-4" />
                </div>
              </div>
              <Camera className="w-24 h-24 opacity-20" />
            </div>
          </Card>
        </motion.a>
      </Section>

      {/* CONTACT */}
      <Section id="contact" title="Get In Touch" icon={Mail}>
        <Card className="bg-gradient-to-br from-blue-600 to-cyan-600 text-white border-0">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">Let's Connect</h3>
              <p className="mb-6 opacity-90">{CONTACT.note}</p>
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

      {/* FOOTER */}
      <footer className="relative z-10 py-12 border-t border-gray-200 bg-white/50 backdrop-blur">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-gray-600">
              © {new Date().getFullYear()} {SITE.name}.
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
