import React, { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useMotionValue,
  useScroll,
  useSpring,
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
  ChevronLeft,
  Sparkles,
  LayoutTemplate,
  Grid,
  User,
  GraduationCap,
  Heart,
  Camera,
  Cpu,
  Terminal,
  X,
  Zap,
  Layers,
  ArrowUpRight,
  ChevronRight,
  Star,
  BookOpen,
  Send,
  Loader2,
  Globe,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

// -----------------------------
// 0) CONFIG
// -----------------------------
const FORM_ENDPOINT = "https://public.herotofu.com/v1/YOUR-FORM-ID"; 

// -----------------------------
// 1) DATA
// -----------------------------
const SITE = {
  name: "Alex Liu",
  headline: "Alex Liu",
  tagline: "CS @ University of Florida · Geography Minor · Full-Stack + GIS",
  location: "Gainesville, FL",
  latlong: "29.6516° N, 82.3248° W",
  availability: "Summer 2026 Internship",
  links: {
    github: "https://github.com/heimweh17",
    linkedin: "https://www.linkedin.com/in/alex-liu7/",
    instagram: "https://www.instagram.com/heimweh17/",
    email: "haozhouliu17@gmail.com",
    resume: "/resume.pdf",
    phone: "+1 (352) 328-4805",
    map: "https://www.google.com/maps/place/Gainesville,+FL",
    osm: "https://www.openstreetmap.org/",
    website: "https://aliu.me",
    zh: "/zh",
  },
};

const ABOUT = {
  p1: "I’m a Computer Science student at the University of Florida exploring the intersection of code, data, and the physical world. I specialize in building systems that transform messy real-time data into intuitive, actionable tools.",
  p2: "Whether it's creating interactive maps, optimizing backend algorithms, or designing accessible interfaces, I love solving problems that have a tangible impact. I am currently authorized to work in the U.S. and do not require sponsorship.",
  highlights: [
    "Focus: Data Structures & Algorithms · Systems · Full-Stack",
    "Geospatial: OpenStreetMap mapping + GIS analytics + visualization",
    "Stack: C++ · Python · TypeScript/React · FastAPI/Flask · SQL · Docker · CI/CD",
    "Interests: HCI & Accessibility · Data Viz · Mapping · Clean UI engineering",
  ],
  quickFacts: [
    { k: "Status", v: "UF CS (Class of 2028)" },
    { k: "Location", v: "Gainesville, FL" },
    { k: "Open to", v: "Summer 2026 internships" },
    { k: "Fun", v: "Road trips + photo walks" },
  ],
};

type ItemContent = {
  type: "project" | "experience";
  name: string;
  subtitle: string;
  date?: string;
  blurb: string;
  tags: string[];
  links?: { demo?: string; code?: string; website?: string };
  highlights?: string[];
  longDescription?: React.ReactNode;
  accent?: { hue: number; sat: number; light: number };
  screenshots?: string[];
  logo?: string;
  flagship?: boolean;
  categories?: string[];
};

const PROJECTS: ItemContent[] = [
  {
    type: "project",
    name: "GeoDashboard",
    flagship: true,
    subtitle: "Full-Stack Geospatial Analytics",
    blurb: "Full-stack geospatial analytics platform with microservices separating AI inference from core mapping.",
    highlights: [
      "Engineered Dockerized microservices to isolate AI inference from the mapping core.",
      "Systematized release lifecycle using GitHub Actions (CI/CD).",
      "Integrated AI for spatial pattern interpretation with controllable cost + latency boundaries.",
    ],
    longDescription: (
        <div className="space-y-4 text-sm text-white/80 leading-relaxed">
            <p>
                GeoDashboard enables users to explore spatial point data, perform quantitative geospatial analysis, and receive AI-assisted interpretations of spatial patterns.
            </p>
            <p>
                <strong>System Architecture:</strong> The system implements a service-oriented architecture. The <em>Core Backend</em> (FastAPI/SQLAlchemy) handles deterministic algorithms like DBSCAN clustering and grid-based density computation. The <em>AI Insight Service</em> is isolated to handle LLM workloads (Gemini), enforcing strict rate limits at the database level to control costs.
            </p>
            <p>
                This design mirrors real-world data platforms where AI augments—not replaces—core analytics.
            </p>
        </div>
    ),
    tags: ["React", "FastAPI", "PostgreSQL", "Docker", "GitHub Actions"],
    links: {
      demo: "https://thegeodashboard.vercel.app/",
      code: "https://github.com/heimweh17/Geo-Dashboard",
    },
    accent: { hue: 205, sat: 95, light: 60 },
    screenshots: ["/screenshots/gdb1.png", "/screenshots/geodashboard-2.png","/screenshots/gdb2.png","/screenshots/gdb3.png"],
    categories: ["Geospatial & Maps", "Web & Data"],
  },
  {
    type: "project",
    name: "UF Health SmartScribe",
    flagship: true,
    subtitle: "AI Medical Scribe",
    blurb: "Hackathon prototype: real-time AI medical documentation assistant built fast, designed for usability.",
    highlights: [
      "Implemented real-time transcription with streaming + structured prompts for usable notes.",
      "Prioritized low-friction UX so clinicians can “glance and trust.”",
      "Built during UF Dream Team’s 24-hour DESIGNATHON.",
    ],
    longDescription: (
        <div className="space-y-4 text-sm text-white/80 leading-relaxed">
            <p>
                Physicians lose hours everyday due to EHR typing. SmartScribe demonstrates how AI can return that time back to patient care.
            </p>
            <p>
                <strong>The Pipeline:</strong> 
                <ol className="list-decimal pl-5 space-y-1 mt-2">
                    <li>Audio capture begins with real-time STT transcription (Deepgram).</li>
                    <li>Transcript fed into Gemini AI for clinical fact extraction.</li>
                    <li>AI formats facts into structured SOAP (Subjective, Objective, Assessment, Plan) drafts.</li>
                    <li>Finalized record saved securely to Supabase backend.</li>
                </ol>
            </p>
        </div>
    ),
    tags: ["Node.js", "Supabase", "Gemini API", "Deepgram API"],
    links: { code: "https://github.com/heimweh17/SmartScribe" },
    accent: { hue: 160, sat: 80, light: 55 },
    screenshots: ["/screenshots/smartscribe-1.png", "/screenshots/smartscribe-2.png"],
    categories: ["Health & Accessibility", "Web & Data"],
  },
  {
    type: "project",
    name: "Grade Track",
    flagship: true,
    subtitle: "Student Performance Analytics",
    blurb: "Full-stack dashboard for visualizing course performance trends and statistical metrics.",
    highlights: [
      "Built Flask + React architecture with clean API boundaries.",
      "Orchestrated local deployment via Docker Compose for repeatable setup.",
      "Calculates average, median, standard deviation, and pass rate automatically.",
    ],
    longDescription: (
        <div className="space-y-4 text-sm text-white/80 leading-relaxed">
            <p>
                A web app that visualizes student grade trends, distributions, and performance metrics across assignments and exams.
            </p>
            <p>
                <strong>Tech Stack Deep Dive:</strong>
                <ul className="list-disc pl-5 space-y-1 mt-2">
                    <li><strong>Backend:</strong> Flask RESTful API with SQLAlchemy.</li>
                    <li><strong>Frontend:</strong> React (Vite) + Recharts for smooth visualizations.</li>
                    <li><strong>Deployment:</strong> Fully Dockerized with Docker Compose for one-command setup.</li>
                </ul>
            </p>
        </div>
    ),
    tags: ["Flask", "React", "Docker", "PostgreSQL"],
    links: { code: "https://github.com/heimweh17/Grade-Track" },
    screenshots: ["/screenshots/gradetrack-1.png"],
    accent: { hue: 25, sat: 95, light: 60 },
    categories: ["Web & Data"],
  },
  {
    type: "project",
    name: "Ability Bridge",
    flagship: true,
    subtitle: "Accessibility Controller",
    blurb: "Hands-free accessibility interface controlled via facial gestures (vision-based input).",
    highlights: [
      "Built a vision-driven controller for hands-free input (OpenCV + MediaPipe).",
      "Optimized signal processing for responsive interaction (<100ms target latency).",
    ],
    tags: ["Python", "OpenCV", "MediaPipe"],
    links: { code: "https://github.com/heimweh17/Ability-Bridge" },
    accent: { hue: 260, sat: 85, light: 62 },
    categories: ["Health & Accessibility", "C++ / Algorithms"],
  },
  {
    type: "project",
    name: "Minesweeper (SFML)",
    subtitle: "C++ Game Engine",
    blurb: "Classic Minesweeper recreated in C++ with recursive reveals, timer, pause, and leaderboard.",
    highlights: [
      "Implemented recursive zero-tile reveal, flagging, pause, debug mode, and timer logic.",
      "Built leaderboard parsing/sorting + highlight of newest entry (without mutating file).",
    ],
    tags: ["C++", "SFML", "OOP"],
    links: { code: "https://github.com/heimweh17/Minesweeper-game" },
    accent: { hue: 220, sat: 10, light: 75 },
    categories: ["C++ / Algorithms"],
  },
  {
    type: "project",
    name: "Bin Packing Analysis",
    subtitle: "Algorithm Research",
    blurb: "Comparison of Best-Fit vs First-Fit heuristics with performance analysis and edge cases.",
    highlights: ["Benchmarked heuristics and documented runtime/behavior across distributions."],
    tags: ["C++", "Algorithms"],
    links: { code: "https://github.com/heimweh17/best-fit-fitst-fit" },
    accent: { hue: 230, sat: 35, light: 65 },
    categories: ["C++ / Algorithms"],
  },
  {
    type: "project",
    name: "Gator AVL Tree",
    subtitle: "Custom Data Structure",
    blurb: "Custom AVL Tree managing student accounts by ID with balancing, traversals, and deletions.",
    highlights: [
      "Implemented insert/delete/search + traversals and AVL rotations.",
      "Designed tests for edge cases (rotations, deletion cases, large-scale validation).",
    ],
    tags: ["C++", "Data Structures", "Testing (Catch2)"],
    links: { code: "https://github.com/heimweh17/AVL-TREE" },
    accent: { hue: 140, sat: 55, light: 60 },
    categories: ["C++ / Algorithms"],
  },
  {
    type: "project",
    name: "Sudoku Game",
    subtitle: "Backtracking Algo",
    blurb: "Python-based Sudoku with backtracking generation and validation.",
    highlights: [
      "Implemented a backtracking algorithm to generate valid puzzles and solve boards.",
      "Designed a clean UI with real-time input validation and error feedback.",
    ],
    tags: ["Python", "Backtracking"],
    links: { code: "https://github.com/heimweh17/suduku-project" },
    accent: { hue: 45, sat: 90, light: 60 },
    categories: ["C++ / Algorithms"],
  },
];

const WORK_EXPERIENCE: ItemContent[] = [
  {
    type: "experience",
    name: "Instructor / TA",
    subtitle: "Logic Lab (Math & Chess)",
    date: "Jun 2022 – Jul 2022",
    blurb: "Taught math + chess to elementary students; adapted pacing weekly.",
    highlights: [
      "Led and instructed a class of 30+ students in math and chess, breaking down abstract concepts into actionable steps.",
      "Refined lesson plans weekly based on student feedback, similar to iterating on technical requirements.",
      "Collaborated with a small teaching team to test, score, and improve lesson plans.",
    ],
    tags: ["Communication", "Education", "Leadership"],
    links: { website: "http://www.logiclabgainesville.com/" },
    accent: { hue: 25, sat: 90, light: 60 },
  },
  {
    type: "experience",
    name: "Cultural Performer",
    subtitle: "JiaTing Lion & Dragon",
    date: "Jan 2025 – May 2025",
    blurb: "Performed traditional dance; practiced timing and team coordination.",
    highlights: [
      "Performed traditional Lion and Dragon dance for 300+ attendees at university and community cultural events.",
      "Practiced rhythm, team communication, and synchronization under high-pressure performance conditions.",
      "Assisted with backstage logistics and stage transitions to ensure smooth event flow.",
    ],
    tags: ["Teamwork", "Performance", "Culture"],
    links: { website: "https://jiatingliondragon.com/" },
    accent: { hue: 0, sat: 80, light: 60 },
  },
];

const LEADERSHIP_EXPERIENCE: ItemContent[] = [
  {
    type: "experience",
    name: "SASE Intern",
    subtitle: "UF Society of Asian Scientists & Engineers",
    date: "Aug 2025 – Present",
    blurb: "Planning professional/technical events for 100+ members.",
    highlights: [
      "Coordinated professional events for 150+ attendees, managing logistics and cross-functional teams.",
      "Collaborated with a leadership board of 100+ to streamline organizational programming and mentorship initiatives.",
      "Assisted in planning technical workshops to enhance member career readiness.",
    ],
    tags: ["Event Planning", "Logistics", "Networking"],
    links: { website: "https://www.saseconnect.org/" },
    accent: { hue: 210, sat: 80, light: 60 },
  },
  {
    type: "experience",
    name: "Event Committee Member",
    subtitle: "UF Chinese American Student Association",
    date: "Aug 2025 – Present",
    blurb: "Helping plan and execute cultural events for the community.",
    highlights: [
      "Spearheaded a large-scale cultural festival for 300+ participants, overseeing program design.",
      "Curated cultural activities to increase student engagement and celebrate heritage.",
      "Worked with a team to manage day-of execution and vendor coordination.",
    ],
    tags: ["Culture", "Management", "Community"],
    links: { website: "https://ufcasa.com/" },
    accent: { hue: 340, sat: 80, light: 60 },
  },
];

const VOLUNTEER_EXPERIENCE: ItemContent[] = [
  {
    type: "experience",
    name: "Volunteer Mapper",
    subtitle: "OpenStreetMap",
    date: "Sep 2020 – Present",
    blurb: "Maintained map data for roads and POIs; validated with imagery.",
    highlights: [
      "Maintained map data for roads, POIs, and land use across various regions.",
      "Cross-referenced satellite imagery, street view, and local knowledge to validate geometry and tags.",
      "Contributed to the open-source data ecosystem used by downstream navigation and humanitarian applications.",
    ],
    tags: ["GIS", "Open Source", "Data"],
    links: { website: "https://www.openstreetmap.org/" },
    accent: { hue: 120, sat: 70, light: 40 },
  },
  {
    type: "experience",
    name: "Instructor / Mentor",
    subtitle: "Buchholz Math Team",
    date: "Summer 2022 & 2023",
    blurb: "Tutored students in competitive mathematics and logic.",
    highlights: [
      "Tutored elementary and middle school students in competitive mathematics and logic.",
      "Created handouts and graded practice sets, focusing on guiding students to debug their own thought processes.",
    ],
    tags: ["Mentorship", "Math", "Education"],
    links: { website: "https://buchholzmathteam.org/" },
    accent: { hue: 45, sat: 90, light: 50 },
  },
];

const EDUCATION = [
  {
    school: "University of Florida",
    period: "2024 – 2028",
    degree: "B.S. Computer Science · Minor in Geography",
    gpa: "GPA: 3.80 / 4.00",
    honors: "Dean’s List",
    activities: "SASE · CASA · OpenStreetMap",
    logo: "/logos/uf_logo.png",
    coursework: "Data Structures & Algorithms, Computer Organization, Linear Algebra, Discrete Structures, Calculus 3",
  },
  {
    school: "Buchholz High School",
    period: "2020 – 2024",
    degree: "High School Diploma",
    gpa: "GPA: 4.79",
    honors: "Math Team (State & National titles)",
    activities: "Math Team · Science Team · Quiz Bowl",
    logo: "/logos/bhs_logo.png",
  },
];

type SkillItem = {
  name: string;
  blurb: string;
  usedIn?: string[];
  level?: "Daily" | "Often" | "Comfortable" | "Learning";
};

const SKILL_GROUPS: Array<{
  group: string;
  icon: any;
  items: SkillItem[];
}> = [
  {
    group: "Languages",
    icon: Terminal,
    items: [
      { name: "Python", blurb: "Main language for AI, backend, and scripting.", usedIn: ["Ability Bridge", "GeoDashboard"], level: "Daily" },
      { name: "C++", blurb: "High-performance systems and algorithm heavy lifting.", usedIn: ["Minesweeper", "Bin Packing"], level: "Daily" },
      { name: "TypeScript", blurb: "Type-safe frontend development.", usedIn: ["GeoDashboard", "Portfolio"], level: "Daily" },
      { name: "SQL", blurb: "Complex queries and database management.", usedIn: ["PostgreSQL"], level: "Often" },
      { name: "Go", blurb: "Learning for high-concurrency microservices.", level: "Learning" },
      { name: "Java", blurb: "Object-oriented patterns and backend structures.", level: "Comfortable" },
      { name: "C#", blurb: "Game dev and enterprise applications.", level: "Comfortable" },
      { name: "RISC-V", blurb: "Assembly level architecture understanding.", level: "Learning" },
    ],
  },
  {
    group: "Frameworks",
    icon: Code2,
    items: [
      { name: "React", blurb: "Component-based UI architecture.", usedIn: ["GeoDashboard"], level: "Daily" },
      { name: "FastAPI", blurb: "High-performance Python APIs.", usedIn: ["GeoDashboard"], level: "Often" },
      { name: "Flask", blurb: "Lightweight Python web services.", usedIn: ["Grade Track"], level: "Often" },
      { name: "Node.js", blurb: "Server-side JS runtime.", usedIn: ["SmartScribe"], level: "Comfortable" },
      { name: "Tailwind", blurb: "Utility-first CSS styling.", level: "Daily" },
      { name: "Pandas", blurb: "Data manipulation and analysis.", level: "Comfortable" },
    ],
  },
  {
    group: "Tools & Infra",
    icon: Cpu,
    items: [
      { name: "Docker", blurb: "Containerization for consistent deployments.", usedIn: ["GeoDashboard"], level: "Often" },
      { name: "PostgreSQL", blurb: "Relational database system.", level: "Often" },
      { name: "Git", blurb: "Version control and collaboration.", level: "Daily" },
      { name: "GitHub Actions", blurb: "CI/CD pipelines for automated testing.", level: "Often" },
      { name: "Grafana", blurb: "Visualization tools for system metrics.", level: "Comfortable" },
      { name: "Supabase", blurb: "Open source Firebase alternative.", usedIn: ["SmartScribe"], level: "Often" },
    ],
  },
];

const HOBBIES = [
  { name: "Badminton", emoji: "🏸", blurb: "Doubles strategy + footwork" },
  { name: "Pickleball", emoji: "🥒", blurb: "Kitchen line battles & social games" },
  { name: "Photo Walks", emoji: "📷", blurb: "Urban exploring + OSM edits" },
  { name: "Road Trips", emoji: "🚗", blurb: "Scenic detours + podcasts" },
  { name: "Audiobooks", emoji: "🎧", blurb: "While driving" },
];

const GALLERY = [
  { src: "/photos/photo1.jpg", alt: "Photo 1" },
  { src: "/photos/photo2.jpg", alt: "Photo 2" },
  { src: "/photos/photo3.jpg", alt: "Photo 3" },
  
];

// -----------------------------
// 2) UTILS
// -----------------------------
function cn(...classes: Array<string | false | undefined | null>) {
  return classes.filter(Boolean).join(" ");
}
function hsl(a: { hue: number; sat: number; light: number } | undefined, alpha = 1) {
  if (!a) return `hsla(0, 0%, 100%, ${alpha})`;
  return `hsl(${a.hue} ${a.sat}% ${a.light}% / ${alpha})`;
}

const sectionIds = ["top", "about", "projects", "experience", "education", "skills", "gallery", "hobbies", "contact"] as const;
type SectionId = typeof sectionIds[number];

// -----------------------------
// 3) BACKGROUND
// -----------------------------
const SpatialBackground = () => {
  const bg =
    "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=2400&auto=format&fit=crop";

  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.2 }} className="absolute inset-0">
        <img
          src={bg}
          className="absolute inset-0 h-full w-full object-cover opacity-[0.86] scale-[1.05] blur-[1.2px]"
          alt="Environment"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(255,255,255,0.26),rgba(0,0,0,0.58))]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_10%,rgba(255,255,255,0.22),rgba(255,255,255,0)_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_15%,rgba(255,255,255,0.14),rgba(255,255,255,0)_60%)]" />
        <div className="absolute inset-0 bg-black/12" />
        <div className="absolute inset-0 opacity-[0.10] mix-blend-overlay bg-[url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22200%22 height=%22200%22%3E%3Cfilter id=%22n%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22200%22 height=%22200%22 filter=%22url(%23n)%22 opacity=%220.35%22/%3E%3C/svg%3E')]" />
      </motion.div>
    </div>
  );
};

// -----------------------------
// 4) MODE TOGGLE
// -----------------------------
const ViewToggle = ({
  mode,
  setMode,
}: {
  mode: "traditional" | "immersive";
  setMode: (m: "traditional" | "immersive") => void;
}) => {
  return (
    <motion.div
      className="fixed top-15 right-6 z-50 flex items-center gap-1 p-1.5 rounded-full border border-white/20 bg-white/[0.14] backdrop-blur-3xl shadow-[0_16px_60px_rgba(0,0,0,0.32)]"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.35 }}
    >
      <button
        onClick={() => setMode("traditional")}
        className={cn(
          "flex items-center gap-2 px-4 py-2 rounded-full text-[12px] font-semibold transition-all duration-300",
          mode === "traditional"
            ? "bg-white/30 text-white shadow-inner"
            : "text-white/75 hover:text-white hover:bg-white/12"
        )}
      >
        <LayoutTemplate className="w-4 h-4" />
        <span className="hidden sm:inline">Scroll</span>
      </button>
      <button
        onClick={() => setMode("immersive")}
        className={cn(
          "flex items-center gap-2 px-4 py-2 rounded-full text-[12px] font-semibold transition-all duration-300",
          mode === "immersive"
            ? "bg-white/30 text-white shadow-inner"
            : "text-white/75 hover:text-white hover:bg-white/12"
        )}
      >
        <Grid className="w-4 h-4" />
        <span className="hidden sm:inline">Spatial</span>
      </button>
    </motion.div>
  );
};

// -----------------------------
// 5) GLASS PRIMITIVES
// -----------------------------
const Glass = ({ className, children }: { className?: string; children: React.ReactNode }) => (
  <div
    className={cn(
      "rounded-[28px] border border-white/18 bg-white/[0.14] backdrop-blur-3xl shadow-[0_22px_80px_rgba(0,0,0,0.22)]",
      "relative overflow-hidden",
      className
    )}
  >
    <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.18),rgba(255,255,255,0.06)_40%,rgba(0,0,0,0.16))]" />
    <div className="pointer-events-none absolute inset-0 opacity-70 bg-[radial-gradient(circle_at_25%_10%,rgba(255,255,255,0.26),rgba(255,255,255,0)_55%)]" />
    <div className="relative">{children}</div>
  </div>
);

const SoftSurface = ({ className, children }: { className?: string; children: React.ReactNode }) => (
  <div
    className={cn(
      "rounded-[26px] border border-white/14 bg-white/[0.12] backdrop-blur-2xl",
      "shadow-[0_18px_60px_rgba(0,0,0,0.18)]",
      "relative overflow-hidden",
      className
    )}
  >
    <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.14),rgba(0,0,0,0.16))]" />
    <div className="relative">{children}</div>
  </div>
);

const Pill = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <span className={cn("px-2.5 py-1 rounded-full bg-white/[0.12] border border-white/16 text-xs text-white/80", className)}>
    {children}
  </span>
);

// -----------------------------
// 6) SKILL PILL (Portal Fixed)
// -----------------------------
const SkillPill = ({ item }: { item: SkillItem }) => {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ top: 0, left: 0 });

  const handleEnter = () => {
    if (triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      setCoords({
        top: rect.top + rect.height / 2,
        left: rect.right + 10,
      });
    }
    setOpen(true);
  };

  return (
    <>
      <div
        ref={triggerRef}
        className="relative z-10"
        onMouseEnter={handleEnter}
        onMouseLeave={() => setOpen(false)}
        onFocus={handleEnter}
        onBlur={() => setOpen(false)}
        tabIndex={0}
      >
        <div className="px-4 py-3 rounded-2xl bg-white/[0.10] border border-white/14 backdrop-blur-2xl text-sm font-medium text-white/90 hover:bg-white/[0.16] transition cursor-default whitespace-nowrap">
          {item.name}
        </div>
      </div>

      {typeof document !== "undefined" &&
        createPortal(
          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ opacity: 0, x: -8, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -4, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                className="fixed z-[9999] w-[260px] pointer-events-none -translate-y-1/2"
                style={{ top: coords.top, left: coords.left }}
              >
                <Glass className="p-3 bg-black/60 backdrop-blur-2xl border border-white/15 shadow-2xl">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="text-xs font-bold text-white">{item.name}</div>
                      <div className="text-[10px] text-white/60 mt-0.5 uppercase tracking-wider">
                        {item.level ?? "Comfortable"}
                      </div>
                    </div>
                    <Zap className="w-3 h-3 text-yellow-300/80" />
                  </div>

                  <div className="text-xs text-white/80 leading-relaxed mt-2 border-t border-white/10 pt-2">
                    {item.blurb}
                  </div>

                  {item.usedIn?.length ? (
                    <div className="mt-2">
                      <div className="flex flex-wrap gap-1.5">
                        {item.usedIn.slice(0, 6).map((u) => (
                          <span
                            key={u}
                            className="px-1.5 py-0.5 rounded-md bg-white/10 border border-white/5 text-[10px] text-white/70"
                          >
                            {u}
                          </span>
                        ))}
                      </div>
                    </div>
                  ) : null}
                </Glass>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </>
  );
};

// -----------------------------
// 7) MESSAGE FORM
// -----------------------------
function MessageForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
      setError("Please write a message first.");
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
        setError("Something went wrong. Please try again later.");
      }
    } catch {
      setStatus("error");
      setError("Network error. Please try again.");
    }
  };

  return (
    <Glass className="p-6 mt-6 w-full max-w-lg mx-auto md:mx-0">
      <div className="mb-5">
        <h3 className="text-base font-bold text-white mb-1 flex items-center gap-2">
          <Send className="w-4 h-4 text-sky-300" /> Send me a message
        </h3>
        <p className="text-xs text-white/70 leading-relaxed">
          Feel free to reach out about projects, maps, opportunities, or just to say hi.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-[11px] font-medium text-white/80 mb-1.5 uppercase tracking-wider">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full rounded-xl bg-white/[0.08] border border-white/10 px-3 py-2 text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-sky-400/50 focus:border-transparent transition-all"
              placeholder="Your name"
            />
          </div>
          <div>
            <label className="block text-[11px] font-medium text-white/80 mb-1.5 uppercase tracking-wider">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full rounded-xl bg-white/[0.08] border border-white/10 px-3 py-2 text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-sky-400/50 focus:border-transparent transition-all"
              placeholder="you@example.com"
            />
          </div>
        </div>

        <div>
          <label className="block text-[11px] font-medium text-white/80 mb-1.5 uppercase tracking-wider">
            Message <span className="text-sky-400">*</span>
          </label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            className="w-full min-h-[100px] rounded-xl bg-white/[0.08] border border-white/10 px-3 py-2 text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-sky-400/50 focus:border-transparent resize-y transition-all"
            placeholder="What's on your mind?"
          />
        </div>

        <div className="flex items-center justify-between mt-2">
          <motion.button
            type="submit"
            disabled={status === "submitting"}
            className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-white text-black text-sm font-bold tracking-wide hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed transition-all"
            whileHover={status !== "submitting" ? { scale: 1.02 } : {}}
            whileTap={status !== "submitting" ? { scale: 0.98 } : {}}
          >
            {status === "submitting" ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" /> Sending...
              </>
            ) : (
              "Send Message"
            )}
          </motion.button>
          
          <div className="flex-1 text-right">
             {status === "success" && (
            <motion.div
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-xs text-emerald-300 font-medium inline-block"
            >
                Message received!
            </motion.div>
            )}
            {status === "error" && error && (
            <motion.div
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-xs text-rose-300 font-medium inline-block"
            >
                {error}
            </motion.div>
            )}
          </div>
        </div>
      </form>
    </Glass>
  );
}

// -----------------------------
// 8) SHARED MODAL (For Projects & Experience)
// -----------------------------
const SharedModal = ({
  item,
  onClose,
}: {
  item: ItemContent;
  onClose: () => void;
}) => {
  const [imgIndex, setImgIndex] = useState(0);
  const shots = item.screenshots ?? [];

  useEffect(() => setImgIndex(0), [item.name]);

  return (
    <motion.div
      className="fixed inset-0 z-[80] flex items-center justify-center p-4 md:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/50 backdrop-blur-md" />

      <motion.div
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, y: 14, scale: 0.985, filter: "blur(12px)" }}
        animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
        exit={{ opacity: 0, y: 10, scale: 0.985, filter: "blur(12px)" }}
        transition={{ type: "spring", stiffness: 260, damping: 26 }}
        className="relative w-full max-w-5xl h-[86vh] rounded-[34px] border border-white/18 bg-white/[0.14] backdrop-blur-3xl shadow-[0_70px_140px_rgba(0,0,0,0.55)] overflow-hidden flex flex-col"
        style={{
          boxShadow: `0 0 0 1px rgba(255,255,255,0.14), 0 24px 90px ${hsl(item.accent, 0.22)}`,
        }}
      >
        {/* 关键修复：同样在 Modal 里加上这个遮罩 */}
        <motion.div
          className="absolute inset-0 z-[9999]"
          initial={{ pointerEvents: "none" }}
          animate={{ pointerEvents: "none" }}
          exit={{ pointerEvents: "auto" }}
        />

        {/* Top bar */}
        <div className="h-16 px-6 flex items-center justify-between border-b border-white/12 bg-white/[0.10]">
          <div className="flex items-center gap-3 min-w-0">
            <div
              className="w-9 h-9 rounded-2xl border border-white/16 bg-white/[0.14] backdrop-blur-2xl grid place-items-center"
              style={{ boxShadow: `0 14px 40px ${hsl(item.accent, 0.22)}` }}
            >
              {item.type === "project" ? (
                  <Star className="w-4 h-4 text-white/80" />
              ) : (
                  <Briefcase className="w-4 h-4 text-white/80" />
              )}
            </div>
            <div className="min-w-0">
              <div className="font-semibold text-white truncate">{item.name}</div>
              <div className="text-xs text-white/70 truncate">{item.subtitle}</div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/12 transition text-white/75 hover:text-white"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8 custom-scrollbar relative">
          <div className="grid lg:grid-cols-[1.25fr_1fr] gap-6">
            {/* Left */}
            <div className="space-y-4">
              <Glass className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-sm font-semibold text-white/90">
                      {item.type === "project" ? "Overview" : "Role Details"}
                  </div>
                  {item.flagship && (
                    <Pill className="bg-yellow-400/18 border-yellow-300/30 text-yellow-100">
                      FLAGSHIP
                    </Pill>
                  )}
                  {item.date && <Pill>{item.date}</Pill>}
                </div>

                {shots.length > 0 && (
                    <div className="relative rounded-2xl overflow-hidden border border-white/12 bg-white/[0.10] mb-6">
                    <div className="aspect-[16/9] grid place-items-center">
                        <img src={shots[Math.min(imgIndex, shots.length - 1)]} alt="screenshot" className="w-full h-full object-cover" />
                    </div>
                    {shots.length > 1 && (
                        <div className="p-3 flex items-center justify-between border-t border-white/12 bg-white/[0.08]">
                        <div className="text-xs text-white/70">
                            {imgIndex + 1} / {shots.length}
                        </div>
                        <div className="flex gap-2">
                            <button
                            onClick={() => setImgIndex((v) => (v - 1 + shots.length) % shots.length)}
                            className="px-3 py-1.5 rounded-full bg-white/[0.12] border border-white/12 text-xs text-white/90 hover:bg-white/[0.18] transition"
                            >
                            Prev
                            </button>
                            <button
                            onClick={() => setImgIndex((v) => (v + 1) % shots.length)}
                            className="px-3 py-1.5 rounded-full bg-white/[0.12] border border-white/12 text-xs text-white/90 hover:bg-white/[0.18] transition"
                            >
                            Next
                            </button>
                        </div>
                        </div>
                    )}
                    </div>
                )}

                {item.longDescription ? (
                    <div className="mb-6">{item.longDescription}</div>
                ) : (
                    <p className="text-sm text-white/80 leading-relaxed mb-6">{item.blurb}</p>
                )}

                <div className="flex flex-wrap gap-2">
                  {item.tags.map((t) => (
                    <span key={t} className="px-2.5 py-1 rounded-full bg-white/[0.12] border border-white/12 text-xs font-mono text-white/80">
                      {t}
                    </span>
                  ))}
                </div>
              </Glass>
            </div>

            {/* Right */}
            <div className="space-y-4">
              <Glass className="p-5">
                <div className="flex items-center gap-2 text-white/90 font-semibold">
                  <Sparkles className="w-4 h-4 text-white/70" />
                  Highlights
                </div>
                <ul className="mt-3 space-y-2">
                  {(item.highlights ?? []).map((h, idx) => (
                    <li key={idx} className="flex gap-3 text-sm text-white/90 leading-relaxed">
                      <span className="mt-2 w-1.5 h-1.5 rounded-full bg-white/60 shrink-0" />
                      {h}
                    </li>
                  ))}
                </ul>
              </Glass>

              {item.links && (
                  <Glass className="p-5">
                    <div className="flex items-center justify-between">
                    <div className="text-white/90 font-semibold">Links</div>
                    <ArrowUpRight className="w-4 h-4 text-white/70" />
                    </div>
                    <div className="mt-3 grid grid-cols-1 gap-3">
                    {item.links.demo && (
                        <a
                        href={item.links.demo}
                        target="_blank"
                        rel="noreferrer"
                        className="px-4 py-3 rounded-2xl bg-white text-black font-semibold text-sm flex items-center justify-between hover:opacity-95 transition"
                        >
                        Live Demo <ExternalLink className="w-4 h-4" />
                        </a>
                    )}
                    {item.links.code && (
                        <a
                        href={item.links.code}
                        target="_blank"
                        rel="noreferrer"
                        className="px-4 py-3 rounded-2xl bg-white/[0.12] border border-white/12 text-white font-semibold text-sm flex items-center justify-between hover:bg-white/[0.18] transition"
                        >
                        Source Code <Github className="w-4 h-4" />
                        </a>
                    )}
                    {item.links.website && (
                        <a
                        href={item.links.website}
                        target="_blank"
                        rel="noreferrer"
                        className="px-4 py-3 rounded-2xl bg-white/[0.12] border border-white/12 text-white font-semibold text-sm flex items-center justify-between hover:bg-white/[0.18] transition"
                        >
                        Website <ExternalLink className="w-4 h-4" />
                        </a>
                    )}
                    </div>
                </Glass>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// -----------------------------
// 9) TRADITIONAL (Scroll Mode)
// -----------------------------
const TraditionalSection = ({
  title,
  icon: Icon,
  children,
  id,
  subtitle,
}: {
  title: string;
  icon?: any;
  children: React.ReactNode;
  id: SectionId;
  subtitle?: string;
}) => (
  <section id={id} className="max-w-6xl mx-auto px-6 py-16 scroll-mt-28">
    <div className="flex items-end justify-between gap-4 mb-8">
      <div className="flex items-center gap-3">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/18 bg-white/[0.14] backdrop-blur-3xl px-4 py-2 shadow-sm">
          {Icon ? <Icon className="w-4 h-4 text-white/80" /> : null}
          <span className="text-[11px] font-semibold tracking-widest text-white/80 uppercase">{title}</span>
        </div>
        {subtitle ? <div className="text-sm text-white/75">{subtitle}</div> : null}
      </div>
    </div>
    {children}
  </section>
);

const TradCard = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <SoftSurface className={cn("p-6", className)}>
    {children}
  </SoftSurface>
);

// -----------------------------
// *FIXED* useActiveSection
// -----------------------------
const useActiveSection = (containerRef: React.RefObject<HTMLElement>) => {
  const [active, setActive] = useState<SectionId>("about");

  useEffect(() => {
    const root = containerRef.current;
    if (!root) return;

    // 1. Manual check for bottom of page (forces Contact active)
    const handleScroll = () => {
        if (root.scrollTop + root.clientHeight >= root.scrollHeight - 50) {
            setActive("contact"); 
        }
    };
    root.addEventListener("scroll", handleScroll);

    const els = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0))[0];

        if (visible?.target?.id) {
            const id = visible.target.id;
            
            // 2. Mapping logic for sections without nav items
            if (id === 'top' || id === 'about') setActive('about');
            else if (id === 'projects') setActive('projects');
            // Education is technically under Experience for nav purposes
            else if (id === 'experience' || id === 'education') setActive('experience');
            // Gallery often visually grouped with Skills or just separate
            else if (id === 'skills' || id === 'gallery') setActive('skills');
            // Hobbies leads into Contact
            else if (id === 'hobbies' || id === 'contact') setActive('contact');
            else setActive(id as SectionId);
        }
      },
      {
        root,
        // 3. Relaxed margin to detect sections earlier/longer
        rootMargin: "-20% 0px -50% 0px", 
        threshold: [0, 0.1, 0.5],
      }
    );

    els.forEach((el) => io.observe(el));
    
    return () => {
        io.disconnect();
        root.removeEventListener("scroll", handleScroll);
    };
  }, [containerRef]);

  return active;
};

const ScrollHeader = ({
  active,
  onNav,
  progress,
}: {
  active: SectionId;
  onNav: (id: SectionId) => void;
  progress: number;
}) => {
  const nav = useMemo(
    () => [
      { id: "about" as const, label: "About" },
      { id: "projects" as const, label: "Projects" },
      { id: "experience" as const, label: "Experience" },
      { id: "skills" as const, label: "Skills" },
      { id: "contact" as const, label: "Contact" },
    ],
    []
  );

  return (
    <header className="sticky top-0 z-50">
      <div className="h-[2px] bg-white/12">
        <div className="h-full bg-white/80" style={{ width: `${Math.round(progress * 100)}%` }} />
      </div>

      <div className="border-b border-white/14 bg-white/[0.14] backdrop-blur-3xl">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between gap-4">
          <button
            onClick={() => onNav("top")}
            className="flex items-center gap-3 group"
            aria-label="Go to top"
          >
            {/* <div className="w-9 h-9 rounded-2xl border border-white/16 bg-white/[0.14] grid place-items-center shadow-sm group-hover:bg-white/[0.20] transition">
              <Sparkles className="w-4 h-4 text-white/80" />
            </div> */}
            <div className="min-w-0 text-left">
              <div className="font-semibold text-white leading-tight">{SITE.name}</div>
              <div className="text-xs text-white/75 leading-tight">{SITE.availability}</div>
            </div>
          </button>

          <nav className="hidden md:flex items-center gap-2">
            {nav.map((n) => {
              const isActive = active === n.id;
              return (
                <button
                  key={n.id}
                  onClick={() => onNav(n.id)}
                  className={cn(
                    "px-3 py-1.5 rounded-full text-sm font-medium transition",
                    isActive ? "bg-white/28 text-white" : "text-white/80 hover:text-white hover:bg-white/14"
                  )}
                >
                  {n.label}
                </button>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={SITE.links.zh}
              className="hidden sm:inline-flex items-center gap-2 px-3 py-2 rounded-full bg-white/[0.12] border border-white/14 text-white font-semibold text-sm hover:bg-white/[0.18] transition"
            >
              中文
            </a>

            <a
              href={SITE.links.github}
              target="_blank"
              rel="noreferrer"
              className="p-2.5 rounded-full bg-white/[0.12] border border-white/12 hover:bg-white/[0.18] transition"
            >
              <Github className="w-4.5 h-4.5" />
            </a>
            <a
              href={SITE.links.linkedin}
              target="_blank"
              rel="noreferrer"
              className="p-2.5 rounded-full bg-white/[0.12] border border-white/12 hover:bg-white/[0.18] transition"
            >
              <Linkedin className="w-4.5 h-4.5" />
            </a>
            <a
              href={SITE.links.resume}
              className="hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-full bg-white text-black font-semibold text-sm hover:opacity-95 transition"
            >
              <FileText className="w-4 h-4" />
              Resume
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

const TraditionalLayout = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const active = useActiveSection(containerRef);

  const { scrollYProgress } = useScroll({ container: containerRef });
  const smooth = useSpring(scrollYProgress, { stiffness: 280, damping: 30, mass: 0.6 });
  const [progress, setProgress] = useState(0);
  useEffect(() => smooth.on("change", (v) => setProgress(v)), [smooth]);

  // Project Filtering Logic
  const [projectFilter, setProjectFilter] = useState<string>("All");
  const [showAllProjects, setShowAllProjects] = useState(false); // New state for collapse/expand

  const categories = useMemo(() => {
    const set = new Set<string>();
    PROJECTS.forEach((p) => (p.categories ?? []).forEach((c) => set.add(c)));
    return ["All", ...Array.from(set).sort()];
  }, []);

  const filteredProjects = useMemo(() => {
    if (projectFilter === "All") return PROJECTS;
    return PROJECTS.filter((p) => (p.categories ?? []).includes(projectFilter));
  }, [projectFilter]);

  // Sliced projects based on "Show More" toggle
  const visibleProjects = showAllProjects ? filteredProjects : filteredProjects.slice(0, 4);

  const [activeItem, setActiveItem] = useState<ItemContent | null>(null);

  const scrollTo = (id: SectionId) => {
    const root = containerRef.current;
    if (!root) return;
    if (id === "top") {
      root.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <motion.div
      key="traditional"
      initial={{ opacity: 0, y: 14, scale: 0.99 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 14, scale: 0.99 }}
      transition={{ duration: 0.35 }}
      className="absolute inset-0 z-10"
    >
      <div ref={containerRef} className="absolute inset-0 overflow-y-auto scroll-smooth custom-scrollbar">
        <ScrollHeader active={active} onNav={scrollTo} progress={progress} />

        {/* Hero */}
        <section id="top" className="max-w-6xl mx-auto px-6 pt-16 pb-10">
          <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-8 items-center">
            <div>
              <motion.h1
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 }}
                className="text-5xl md:text-7xl font-semibold tracking-tight text-white drop-shadow-[0_18px_60px_rgba(0,0,0,0.35)]"
              >
                {SITE.headline}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.12 }}
                className="mt-4 text-lg md:text-xl text-white/85 max-w-2xl leading-relaxed"
              >
                {SITE.tagline}
              </motion.p>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <a
                  href={`mailto:${SITE.links.email}`}
                  className="px-5 py-3 rounded-full bg-white text-black font-semibold hover:opacity-95 transition flex items-center gap-2"
                >
                  <Mail className="w-4 h-4" />
                  Email
                </a>
                <a
                  href={SITE.links.website}
                  target="_blank"
                  rel="noreferrer"
                  className="px-5 py-3 rounded-full bg-white/[0.14] border border-white/18 text-white font-semibold hover:bg-white/[0.20] transition flex items-center gap-2"
                >
                  <Globe className="w-4 h-4" />
                  Website
                </a>
                <a
                  href={SITE.links.map}
                  target="_blank"
                  rel="noreferrer"
                  className="px-5 py-3 rounded-full bg-white/[0.14] border border-white/18 text-white font-semibold hover:bg-white/[0.20] transition flex items-center gap-2"
                >
                  <MapPin className="w-4 h-4" />
                  {SITE.location}
                </a>
              </div>
            </div>

            <Glass className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full border border-white/20 overflow-hidden bg-white/[0.10] shrink-0">
                  <img src="/me.jpg" alt="Alex" className="w-full h-full object-cover" />
                </div>
                <div className="min-w-0">
                  <div className="text-white font-semibold">{SITE.name}</div>
                  <div className="text-white/75 text-sm">{SITE.location}</div>
                  <div className="text-white/75 text-sm mt-1">{SITE.availability}</div>
                </div>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-3">
                <a
                  href={SITE.links.github}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-3 rounded-2xl bg-white/[0.12] border border-white/12 hover:bg-white/[0.18] transition flex items-center justify-between"
                >
                  <span className="text-sm font-semibold text-white">GitHub</span>
                  <Github className="w-4 h-4 text-white/80" />
                </a>
                <a
                  href={SITE.links.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-3 rounded-2xl bg-white/[0.12] border border-white/12 hover:bg-white/[0.18] transition flex items-center justify-between"
                >
                  <span className="text-sm font-semibold text-white">LinkedIn</span>
                  <Linkedin className="w-4 h-4 text-white/80" />
                </a>
                <a
                  href={SITE.links.resume}
                  className="px-4 py-3 rounded-2xl bg-white text-black hover:opacity-95 transition flex items-center justify-between col-span-2"
                >
                  <span className="text-sm font-semibold">Resume</span>
                  <FileText className="w-4 h-4" />
                </a>
              </div>
            </Glass>
          </div>
        </section>

        <TraditionalSection id="about" title="About" icon={User} subtitle="The story, quickly — and clearly.">
          <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-6">
            <TradCard>
              <p className="text-white/90 leading-relaxed">{ABOUT.p1}</p>
              <p className="text-white/90 leading-relaxed mt-4">{ABOUT.p2}</p>

              <div className="mt-6 flex flex-wrap gap-2">
                {ABOUT.highlights.map((h) => (
                  <Pill key={h}>{h}</Pill>
                ))}
              </div>
            </TradCard>

            <TradCard>
              <div className="flex items-center gap-2 text-white/90 font-semibold">
                <BookOpen className="w-4 h-4 text-white/75" />
                Quick Facts
              </div>
              <div className="mt-4 space-y-3">
                {ABOUT.quickFacts.map((q) => (
                  <div key={q.k} className="flex items-start justify-between gap-4">
                    <div className="text-sm text-white/75">{q.k}</div>
                    <div className="text-sm text-white text-right">{q.v}</div>
                  </div>
                ))}
              </div>
            </TradCard>
          </div>
        </TraditionalSection>

        <TraditionalSection id="projects" title="Projects" icon={Code2} subtitle="Click a project for detailed breakdown.">
          <div className="flex items-center justify-between gap-3 mb-6">
            <div className="text-sm text-white/75">Filter</div>
            <div className="flex flex-wrap gap-2 justify-end">
              {categories.map((c) => (
                <button
                  key={c}
                  onClick={() => {
                      setProjectFilter(c);
                      setShowAllProjects(false); // Reset expansion on filter change
                  }}
                  className={cn(
                    "px-3 py-1.5 rounded-full text-xs font-semibold border transition",
                    projectFilter === c
                      ? "bg-white/30 border-white/20 text-white"
                      : "bg-white/[0.12] border-white/14 text-white/80 hover:text-white hover:bg-white/[0.18]"
                  )}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            {visibleProjects.map((p) => (
              <button key={p.name} onClick={() => setActiveItem(p)} className="text-left group">
                <TradCard className="relative overflow-hidden hover:bg-white/[0.16] transition duration-300">
                  <div
                    className="absolute -top-24 -right-24 w-56 h-56 rounded-full blur-3xl opacity-45"
                    style={{ background: hsl(p.accent, 0.35) }}
                  />
                  <div className="relative">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <div className="text-xl font-semibold text-white truncate">{p.name}</div>
                          {p.flagship ? (
                            <Pill className="bg-yellow-400/18 border-yellow-300/30 text-yellow-100">
                              FLAGSHIP
                            </Pill>
                          ) : null}
                        </div>
                        <div className="text-sm text-white/85 mt-1 leading-relaxed line-clamp-2">{p.blurb}</div>
                      </div>
                      <div className="shrink-0 text-white/70 group-hover:text-white transition">
                        <ChevronRight className="w-5 h-5" />
                      </div>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {p.tags.slice(0, 5).map((t) => (
                        <span
                          key={t}
                          className="px-2.5 py-1 rounded-full bg-white/[0.12] border border-white/12 text-xs font-mono text-white/80"
                        >
                          {t}
                        </span>
                      ))}
                      {p.tags.length > 5 ? <Pill>+{p.tags.length - 5}</Pill> : null}
                    </div>
                  </div>
                </TradCard>
              </button>
            ))}
          </div>

          {/* Show More / Show Less Button */}
          {filteredProjects.length > 4 && (
            <div className="mt-8 flex justify-center">
                <button
                    onClick={() => setShowAllProjects(!showAllProjects)}
                    className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-white/[0.12] border border-white/14 text-sm font-semibold text-white hover:bg-white/[0.18] transition"
                >
                    {showAllProjects ? (
                        <>
                            Show Less <ChevronUp className="w-4 h-4" />
                        </>
                    ) : (
                        <>
                            Show More <ChevronDown className="w-4 h-4" />
                        </>
                    )}
                </button>
            </div>
          )}
        </TraditionalSection>

         <TraditionalSection id="experience" title="Experience" icon={Briefcase} subtitle="Work, Leadership & Volunteering.">
          <div className="space-y-12">
              
              {/* Work Section */}
              <div>
                  <h3 className="text-sm font-bold text-white/60 uppercase tracking-widest mb-6 border-b border-white/10 pb-2">Work History</h3>
                  <div className="grid lg:grid-cols-2 gap-5">
                    {WORK_EXPERIENCE.map((e) => (
                    <button key={e.name} onClick={() => setActiveItem(e)} className="text-left w-full group">
                        <TradCard className="hover:bg-white/[0.16] transition duration-300">
                            <div className="flex items-start justify-between gap-4">
                            <div>
                                <div className="text-lg font-semibold text-white">{e.name}</div>
                                <div className="text-sm text-emerald-200/90 font-semibold mt-1">{e.subtitle}</div>
                            </div>
                            <Pill>
                                <Calendar className="w-3.5 h-3.5 inline-block mr-1" />
                                {e.date}
                            </Pill>
                            </div>
                            <div className="text-sm text-white/85 mt-2 line-clamp-2">{e.blurb}</div>
                            <div className="mt-4 flex items-center text-xs text-white/50 font-medium group-hover:text-white transition-colors">
                                View Details <ArrowUpRight className="w-3 h-3 ml-1" />
                            </div>
                        </TradCard>
                    </button>
                    ))}
                  </div>
              </div>

              {/* Leadership Section */}
              <div>
                  <h3 className="text-sm font-bold text-white/60 uppercase tracking-widest mb-6 border-b border-white/10 pb-2">Leadership & Involvement</h3>
                  <div className="grid lg:grid-cols-2 gap-5">
                    {LEADERSHIP_EXPERIENCE.map((e) => (
                    <button key={e.name} onClick={() => setActiveItem(e)} className="text-left w-full group">
                        <TradCard className="hover:bg-white/[0.16] transition duration-300">
                            <div className="flex items-start justify-between gap-4">
                            <div>
                                <div className="text-lg font-semibold text-white">{e.name}</div>
                                <div className="text-sm text-indigo-200/90 font-semibold mt-1">{e.subtitle}</div>
                            </div>
                            <Pill>{e.date}</Pill>
                            </div>
                            <div className="text-sm text-white/85 mt-2 line-clamp-2">{e.blurb}</div>
                            <div className="mt-4 flex items-center text-xs text-white/50 font-medium group-hover:text-white transition-colors">
                                View Details <ArrowUpRight className="w-3 h-3 ml-1" />
                            </div>
                        </TradCard>
                    </button>
                    ))}
                  </div>
              </div>

              {/* Volunteer Section */}
              <div>
                  <h3 className="text-sm font-bold text-white/60 uppercase tracking-widest mb-6 border-b border-white/10 pb-2">Volunteering</h3>
                  <div className="grid lg:grid-cols-2 gap-5">
                    {VOLUNTEER_EXPERIENCE.map((e) => (
                    <button key={e.name} onClick={() => setActiveItem(e)} className="text-left w-full group">
                        <TradCard className="hover:bg-white/[0.16] transition duration-300">
                            <div className="flex items-start justify-between gap-4">
                            <div>
                                <div className="text-lg font-semibold text-white">{e.name}</div>
                                <div className="text-sm text-white/80 mt-1">{e.subtitle}</div>
                            </div>
                            <Pill>{e.date}</Pill>
                            </div>
                            <div className="text-sm text-white/85 mt-2 line-clamp-2">{e.blurb}</div>
                            <div className="mt-4 flex items-center text-xs text-white/50 font-medium group-hover:text-white transition-colors">
                                View Details <ArrowUpRight className="w-3 h-3 ml-1" />
                            </div>
                        </TradCard>
                    </button>
                    ))}
                  </div>
              </div>
          </div>
        </TraditionalSection>

        <TraditionalSection id="education" title="Education" icon={GraduationCap} subtitle="Where I learned the fundamentals — and kept leveling up.">
          <div className="grid lg:grid-cols-2 gap-5">
            {EDUCATION.map((ed) => (
              <TradCard key={ed.school} className="flex gap-5 items-start">
                <div className="w-14 h-14 rounded-2xl border border-white/16 bg-white/[0.12] overflow-hidden shrink-0 grid place-items-center">
                  {ed.logo ? (
                    <img src={ed.logo} alt={ed.school} className="w-full h-full object-cover" />
                  ) : (
                    <GraduationCap className="w-6 h-6 text-white/80" />
                  )}
                </div>
                <div className="min-w-0">
                  <div className="flex items-center justify-between gap-3">
                    <div className="text-lg font-semibold text-white truncate">{ed.school}</div>
                    <Pill>{ed.period}</Pill>
                  </div>
                  <div className="text-sm text-white/85 mt-1">{ed.degree}</div>
                  
                  {ed.coursework && (
                    <div className="text-xs text-white/60 mt-1.5 leading-relaxed">
                      <span className="font-semibold text-white/70">Coursework:</span> {ed.coursework}
                    </div>
                  )}

                  <div className="mt-3 flex flex-wrap gap-2">
                    <Pill>{ed.gpa}</Pill>
                    {ed.honors ? <Pill>{ed.honors}</Pill> : null}
                    {ed.activities ? <Pill>{ed.activities}</Pill> : null}
                  </div>
                </div>
              </TradCard>
            ))}
          </div>
        </TraditionalSection>

        <TraditionalSection id="skills" title="Skills" icon={Cpu} subtitle="Hover a skill → details.">
          <div className="grid gap-6 relative isolate">
            {SKILL_GROUPS.map((grp) => (
              <TradCard key={grp.group}>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-9 h-9 rounded-2xl border border-white/16 bg-white/[0.12] grid place-items-center">
                    <grp.icon className="w-4 h-4 text-white/80" />
                  </div>
                  <div className="text-white font-semibold">{grp.group}</div>
                </div>

                <div className="flex flex-wrap gap-3 relative">
                  {grp.items.map((it) => (
                    <SkillPill key={it.name} item={it} />
                  ))}
                </div>
              </TradCard>
            ))}
          </div>
        </TraditionalSection>
        
        <TraditionalSection id="gallery" title="Gallery" icon={Camera} subtitle="Swap these placeholders with your real photos.">
             <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {GALLERY.map((g, i) => (
                <div
                    key={i}
                    className="relative rounded-3xl overflow-hidden border border-white/16 bg-white/[0.12] aspect-square"
                >
                    <img
                    src={g.src}
                    alt={g.alt}
                    className="w-full h-full object-cover opacity-95 hover:opacity-100 transition"
                    onError={(e) => {
                        (e.currentTarget as HTMLImageElement).style.display = "none";
                    }}
                    />
                    <div className="absolute inset-0 grid place-items-center text-white/45 pointer-events-none">
                    <Camera className="w-9 h-9" />
                    </div>
                </div>
                ))}
            </div>
        </TraditionalSection>

         <TraditionalSection id="hobbies" title="Hobbies" icon={Heart} subtitle="Small things that keep me sharp.">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {HOBBIES.map((h) => (
              <TradCard key={h.name} className="p-5">
                <div className="flex items-center justify-between">
                  <div className="text-lg font-semibold text-white">{h.name}</div>
                  <div className="text-2xl">{h.emoji}</div>
                </div>
                <div className="text-sm text-white/85 mt-2">{h.blurb}</div>
              </TradCard>
            ))}
          </div>
        </TraditionalSection>

        <TraditionalSection id="contact" title="Contact" icon={Mail} subtitle="Let’s build something clean and useful.">
          <div className="grid lg:grid-cols-[1fr_0.9fr] gap-6 items-start">
            <div>
                 <TradCard className="p-7">
                <div className="text-2xl font-semibold text-white">Let’s Connect</div>
                <p className="mt-3 text-white/85 leading-relaxed">
                    I’m open to {SITE.availability} opportunities — especially roles involving product engineering,
                    geospatial work, systems, or data visualization.
                </p>

                <div className="mt-6 grid sm:grid-cols-2 gap-3">
                    <a
                    href={`mailto:${SITE.links.email}`}
                    className="px-5 py-3 rounded-2xl bg-white text-black font-semibold flex items-center justify-between hover:opacity-95 transition"
                    >
                    Email <Mail className="w-4 h-4" />
                    </a>
                    <a
                    href={SITE.links.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="px-5 py-3 rounded-2xl bg-white/[0.14] border border-white/14 text-white font-semibold flex items-center justify-between hover:bg-white/[0.20] transition"
                    >
                    LinkedIn <Linkedin className="w-4 h-4" />
                    </a>
                    <a
                    href={SITE.links.github}
                    target="_blank"
                    rel="noreferrer"
                    className="px-5 py-3 rounded-2xl bg-white/[0.14] border border-white/14 text-white font-semibold flex items-center justify-between hover:bg-white/[0.20] transition"
                    >
                    GitHub <Github className="w-4 h-4" />
                    </a>
                    <a
                    href={SITE.links.resume}
                    className="px-5 py-3 rounded-2xl bg-white/[0.14] border border-white/14 text-white font-semibold flex items-center justify-between hover:bg-white/[0.20] transition"
                    >
                    Resume <FileText className="w-4 h-4" />
                    </a>
                </div>
                </TradCard>
                <div className="mt-6">
                    <MessageForm />
                </div>
            </div>

            <TradCard className="p-7">
              <div className="text-sm font-semibold text-white/90">Details</div>
              <div className="mt-4 space-y-3 text-sm">
                <div className="flex items-center justify-between gap-3">
                  <div className="text-white/75 flex items-center gap-2">
                    <Phone className="w-4 h-4" /> Phone
                  </div>
                  <div className="text-white">{SITE.links.phone}</div>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <div className="text-white/75 flex items-center gap-2">
                    <Mail className="w-4 h-4" /> Email
                  </div>
                  <div className="text-white">{SITE.links.email}</div>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <div className="text-white/75 flex items-center gap-2">
                    <MapPin className="w-4 h-4" /> Based in
                  </div>
                  <div className="text-white">{SITE.location}</div>
                </div>
                <a
                  href={SITE.links.map}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-white/90 hover:text-white transition"
                >
                  Open in Maps <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </TradCard>
          </div>

          <footer className="mt-16 pb-24 text-center text-white/65 text-sm">
            © {new Date().getFullYear()} {SITE.name}. Built with React + Motion.
          </footer>
        </TraditionalSection>
      </div>

      <AnimatePresence>
        {activeItem ? <SharedModal item={activeItem} onClose={() => setActiveItem(null)} /> : null}
      </AnimatePresence>
    </motion.div>
  );
};

// -----------------------------
// 10) IMMERSIVE MODE & ENTRY (NO CHANGES NEEDED BELOW)
// -----------------------------
const APPS = [
  { id: "about", label: "About", icon: User, accent: { hue: 210, sat: 90, light: 60 } },
  { id: "projects", label: "Projects", icon: Code2, accent: { hue: 255, sat: 85, light: 63 } },
  { id: "experience", label: "Experience", icon: Briefcase, accent: { hue: 25, sat: 90, light: 60 } },
  { id: "education", label: "Education", icon: GraduationCap, accent: { hue: 140, sat: 60, light: 58 } },
  { id: "skills", label: "Skills", icon: Cpu, accent: { hue: 190, sat: 75, light: 58 } },
  { id: "photos", label: "Gallery", icon: Camera, accent: { hue: 55, sat: 90, light: 60 } },
  { id: "hobbies", label: "Hobbies", icon: Heart, accent: { hue: 330, sat: 75, light: 62 } },
  { id: "contact", label: "Contact", icon: Mail, accent: { hue: 0, sat: 75, light: 60 } },
] as const;

// ... (VisionIcon, VisionWindow, ImmersiveContent, DockButton, ImmersiveLayout, Main Entry remain exactly as you had them) ...
// (为了节省篇幅，这里省略了未改动的底部 Immersive 部分代码，它们与你上一版完全一致)
// 请保留你代码中第 10 部分及之后的所有内容。

const VisionIcon = ({
  app,
  index,
  onOpen,
}: {
  app: (typeof APPS)[number];
  index: number;
  onOpen: () => void;
}) => {
  const mx = useMotionValue(44);
  const my = useMotionValue(44);
  const highlight = useMotionTemplate`radial-gradient(160px 160px at ${mx}px ${my}px, rgba(255,255,255,0.88), rgba(255,255,255,0.00) 60%)`;

  const handleMove = (e: React.PointerEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mx.set(e.clientX - rect.left);
    my.set(e.clientY - rect.top);
  };

  return (
    <motion.button
      onClick={onOpen}
      onPointerMove={handleMove}
      initial={{ opacity: 0, scale: 0.86, y: 16 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: index * 0.045, type: "spring", stiffness: 320, damping: 22 }}
      whileHover={{ scale: 1.08, y: -7 }}
      whileTap={{ scale: 0.96 }}
      className="flex flex-col items-center gap-3 group select-none"
    >
      <div
        className="relative w-[96px] h-[96px] rounded-[28px] overflow-hidden border border-white/22 bg-white/[0.18] backdrop-blur-3xl shadow-[0_18px_70px_rgba(0,0,0,0.28)]"
        style={{ boxShadow: `0 0 0 1px rgba(255,255,255,0.16), 0 26px 90px ${hsl(app.accent, 0.18)}` }}
      >
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.22),rgba(255,255,255,0.10)_45%,rgba(0,0,0,0.18))]" />
        <motion.div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: highlight }} />
        <div className="absolute inset-0 grid place-items-center">
          <app.icon className="w-10 h-10 drop-shadow-[0_10px_28px_rgba(0,0,0,0.40)]" style={{ color: hsl(app.accent) }} />
        </div>
      </div>
      <span className="text-sm font-medium text-white drop-shadow-md">{app.label}</span>
    </motion.button>
  );
};

const VisionWindow = ({
  app,
  onClose,
  children,
}: {
  app: (typeof APPS)[number];
  onClose: () => void;
  children: React.ReactNode;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92, filter: "blur(12px)" }}
      animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
      exit={{ opacity: 0, scale: 0.95, filter: "blur(12px)" }}
      transition={{ type: "spring", bounce: 0.24, duration: 0.52 }}
      className="fixed inset-0 z-40 flex items-center justify-center p-4 md:p-8"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/50 backdrop-blur-md" />

      <motion.div
        className="relative w-full max-w-5xl h-[85vh] rounded-[36px] border border-white/18 shadow-[0_70px_140px_rgba(0,0,0,0.55)] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
        style={{
          boxShadow: `0 0 0 1px rgba(255,255,255,0.14), 0 26px 110px ${hsl(app.accent, 0.22)}`,
        }}
      >
        <div className="absolute inset-0 bg-white/[0.20] backdrop-blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.32),rgba(255,255,255,0.12)_55%,rgba(0,0,0,0.22))]" />
        <div className="absolute inset-0 opacity-60 bg-[linear-gradient(180deg,rgba(255,255,255,0.12),rgba(0,0,0,0.18))]" />

        <motion.div
          className="absolute inset-0 z-[9999]"
          initial={{ pointerEvents: "none" }}
          animate={{ pointerEvents: "none" }}
          exit={{ pointerEvents: "auto" }}
        />

        <div className="relative flex flex-col h-full">
          <div className="flex items-center justify-between px-6 h-16 border-b border-white/14 bg-white/[0.14] backdrop-blur-3xl shrink-0">
            <button
              onClick={onClose}
              className="flex items-center gap-2 text-white/85 hover:text-white px-3 py-1.5 rounded-full hover:bg-white/14 transition"
            >
              <ChevronLeft className="w-5 h-5" />
              <span className="text-sm font-medium">Home</span>
            </button>

            <div className="font-semibold text-lg flex items-center gap-2 text-white">
              <app.icon className="w-5 h-5" style={{ color: hsl(app.accent) }} />
              {app.label}
            </div>

            <div className="w-[96px] flex justify-end">
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-white/14 transition text-white/85"
                aria-label="Close"
                title="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-6 md:p-8 custom-scrollbar relative">
            <div className="rounded-[28px] border border-white/14 bg-black/18 backdrop-blur-2xl p-5 md:p-7 shadow-[0_30px_90px_rgba(0,0,0,0.28)] min-h-full">
              {children}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const ImmersiveContent = ({
  id,
  onOpenProject,
}: {
  id: string;
  onOpenProject: (item: ItemContent) => void;
}) => {
  const [projectFilter, setProjectFilter] = useState<string>("All");
  const categories = useMemo(() => {
    const set = new Set<string>();
    PROJECTS.forEach((p) => (p.categories ?? []).forEach((c) => set.add(c)));
    return ["All", ...Array.from(set).sort()];
  }, []);

  const filteredProjects = useMemo(() => {
    if (projectFilter === "All") return PROJECTS;
    return PROJECTS.filter((p) => (p.categories ?? []).includes(projectFilter));
  }, [projectFilter]);

  switch (id) {
    case "about":
      return (
        <div className="grid md:grid-cols-[320px_1fr] gap-8">
          <div className="space-y-6">
            <div className="rounded-[26px] overflow-hidden border border-white/16 shadow-[0_22px_70px_rgba(0,0,0,0.30)] aspect-[3/4] bg-white/[0.10]">
              <img src="/me.jpg" alt="Alex" className="w-full h-full object-cover" />
            </div>
            <div className="p-6 rounded-[26px] bg-white/[0.12] border border-white/14 text-center">
              <h2 className="text-xl font-semibold text-white">{SITE.name}</h2>
              <div className="text-white/80 text-sm mt-1">{SITE.location}</div>
              <div className="text-white/80 text-sm mt-1">{SITE.availability}</div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="p-7 md:p-8 rounded-[26px] bg-white/[0.12] border border-white/14">
              <h3 className="text-2xl font-semibold mb-4 flex items-center gap-2 text-white">
                <Sparkles className="text-white/80" /> Bio
              </h3>
              <p className="text-[17px] text-white/90 leading-relaxed mb-4">{ABOUT.p1}</p>
              <p className="text-[17px] text-white/90 leading-relaxed">{ABOUT.p2}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {ABOUT.highlights.map((h, i) => (
                <div key={i} className="p-5 rounded-[22px] bg-white/[0.12] border border-white/14 text-white/90 text-sm leading-relaxed">
                  {h}
                </div>
              ))}
            </div>
          </div>
        </div>
      );

    case "projects":
      return (
        <div className="space-y-6">
           <div className="flex items-center justify-between gap-3">
                <div className="text-sm text-white/75">Filter</div>
                <div className="flex flex-wrap gap-2 justify-end">
                {categories.map((c) => (
                    <button
                    key={c}
                    onClick={() => setProjectFilter(c)}
                    className={cn(
                        "px-3 py-1.5 rounded-full text-xs font-semibold border transition",
                        projectFilter === c
                        ? "bg-white/30 border-white/20 text-white"
                        : "bg-white/[0.12] border-white/14 text-white/80 hover:text-white hover:bg-white/[0.18]"
                    )}
                    >
                    {c}
                    </button>
                ))}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredProjects.map((p, i) => (
                <motion.button
                key={p.name}
                onClick={() => onOpenProject(p)}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                className="group relative rounded-[30px] bg-white/[0.12] border border-white/14 overflow-hidden hover:bg-white/[0.18] transition-colors text-left w-full"
                >
                <div className="absolute -top-24 -right-24 w-56 h-56 rounded-full blur-3xl opacity-40" style={{ background: hsl(p.accent, 0.35) }} />
                <div className="h-40 relative p-6 flex flex-col justify-end">
                    <div className="absolute top-4 right-4">
                    {p.flagship ? (
                        <span className="px-3 py-1 rounded-full bg-yellow-400/20 text-yellow-100 text-xs font-bold border border-yellow-300/30">
                        FLAGSHIP
                        </span>
                    ) : null}
                    </div>
                    <h3 className="text-2xl font-semibold text-white">{p.name}</h3>
                    <div className="text-white/85 text-sm line-clamp-1">{p.blurb}</div>
                </div>
                <div className="p-6">
                    <div className="flex flex-wrap gap-2 mb-4">
                    {p.tags.slice(0, 4).map((t) => (
                        <span key={t} className="px-2.5 py-1 bg-white/14 border border-white/12 rounded-full text-xs text-white/85">
                        {t}
                        </span>
                    ))}
                    {p.tags.length > 4 ? (
                        <span className="px-2.5 py-1 bg-white/10 border border-white/12 rounded-full text-xs text-white/75">
                        +{p.tags.length - 4}
                        </span>
                    ) : null}
                    </div>

                    <div className="flex gap-3 mt-4">
                    {p.links?.demo ? (
                        <a
                        href={p.links.demo}
                        target="_blank"
                        rel="noreferrer"
                        className="flex-1 py-2.5 text-center rounded-xl bg-white text-black font-semibold text-sm hover:opacity-90 transition"
                        onClick={(e) => e.stopPropagation()}
                        >
                        Demo
                        </a>
                    ) : null}
                    {p.links?.code ? (
                        <a
                        href={p.links.code}
                        target="_blank"
                        rel="noreferrer"
                        className="flex-1 py-2.5 text-center rounded-xl bg-white/14 border border-white/14 text-white font-semibold text-sm hover:bg-white/20 transition"
                        onClick={(e) => e.stopPropagation()}
                        >
                        Code
                        </a>
                    ) : null}
                    </div>
                </div>
                </motion.button>
            ))}
            </div>
        </div>
      );

    case "experience":
      return (
        <div className="space-y-10">
          {[
              { title: "Work History", data: WORK_EXPERIENCE },
              { title: "Leadership & Involvement", data: LEADERSHIP_EXPERIENCE },
              { title: "Volunteering", data: VOLUNTEER_EXPERIENCE }
          ].map((section) => (
            <div key={section.title}>
                <h3 className="text-lg font-semibold mb-4 text-white/90 border-b border-white/10 pb-2">{section.title}</h3>
                <div className="grid md:grid-cols-2 gap-4">
                    {section.data.map((e) => (
                        <motion.button 
                            key={e.name}
                            onClick={() => onOpenProject(e)}
                            className="text-left w-full group"
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <div className="p-6 rounded-[26px] bg-white/[0.12] border border-white/14 h-full relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-20 pointer-events-none" style={{ background: hsl(e.accent, 0.4) }} />
                                
                                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 relative z-10">
                                    <div>
                                    <div className="text-xl font-semibold text-white">{e.name}</div>
                                    <div className="text-white/80 text-sm font-semibold mt-1">{e.subtitle}</div>
                                    </div>
                                    <span className="text-xs px-2.5 py-1 rounded-full bg-white/14 border border-white/12 w-fit text-white/90 whitespace-nowrap">
                                    {e.date}
                                    </span>
                                </div>
                                <div className="text-sm text-white/80 mt-3 line-clamp-2 relative z-10">{e.blurb}</div>
                                
                                <div className="mt-4 flex items-center text-xs text-white/50 font-medium group-hover:text-white transition-colors relative z-10">
                                    View Details <ArrowUpRight className="w-3 h-3 ml-1" />
                                </div>
                            </div>
                        </motion.button>
                    ))}
                </div>
            </div>
          ))}
        </div>
      );

    case "education":
      return (
        <div className="grid md:grid-cols-2 gap-6">
          {EDUCATION.map((ed) => (
            <div key={ed.school} className="p-6 rounded-[26px] bg-white/[0.12] border border-white/14 flex gap-5">
              <div className="w-14 h-14 rounded-2xl border border-white/16 bg-white/[0.12] overflow-hidden shrink-0 grid place-items-center">
                {ed.logo ? (
                  <img src={ed.logo} alt={ed.school} className="w-full h-full object-cover" />
                ) : (
                  <GraduationCap className="w-6 h-6 text-white/80" />
                )}
              </div>
              <div className="min-w-0">
                <div className="flex items-start justify-between gap-3">
                  <div className="font-semibold truncate text-white">{ed.school}</div>
                  <span className="text-xs px-2.5 py-1 rounded-full bg-white/14 border border-white/12 text-white/90">{ed.period}</span>
                </div>
                <div className="text-sm text-white/90 mt-1">{ed.degree}</div>
                
                {ed.coursework && (
                    <div className="text-xs text-white/60 mt-1.5 leading-relaxed">
                      <span className="font-semibold text-white/70">Coursework:</span> {ed.coursework}
                    </div>
                )}

                <div className="mt-3 flex flex-wrap gap-2">
                  <span className="text-xs px-2.5 py-1 rounded-full bg-white/14 border border-white/12 text-white/90">{ed.gpa}</span>
                  {ed.honors ? <span className="text-xs px-2.5 py-1 rounded-full bg-white/14 border border-white/12 text-white/90">{ed.honors}</span> : null}
                  {ed.activities ? <span className="text-xs px-2.5 py-1 rounded-full bg-white/14 border border-white/12 text-white/90">{ed.activities}</span> : null}
                </div>
              </div>
            </div>
          ))}
        </div>
      );

    case "skills":
      return (
        <div className="grid gap-8 relative isolate">
          {SKILL_GROUPS.map((grp) => (
            <div key={grp.group}>
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2 text-white">
                <grp.icon className="w-5 h-5 text-white/85" /> {grp.group}
              </h3>
              <div className="flex flex-wrap gap-3 relative">
                {grp.items.map((it) => (
                  <SkillPill key={it.name} item={it} />
                ))}
              </div>
            </div>
          ))}
        </div>
      );

    case "photos":
      return (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {GALLERY.map((g, i) => (
            <div key={i} className="relative aspect-square rounded-3xl overflow-hidden bg-white/[0.12] border border-white/14">
              <img
                src={g.src}
                alt={g.alt}
                className="w-full h-full object-cover opacity-95 hover:opacity-100 transition"
                onError={(e) => ((e.currentTarget as HTMLImageElement).style.display = "none")}
              />
              <div className="absolute inset-0 grid place-items-center text-white/45 pointer-events-none">
                <Camera className="w-8 h-8" />
              </div>
            </div>
          ))}
        </div>
      );

    case "hobbies":
      return (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {HOBBIES.map((h) => (
            <div key={h.name} className="p-6 rounded-[26px] bg-white/[0.12] border border-white/14">
              <div className="flex items-center justify-between">
                <div className="text-lg font-semibold text-white">{h.name}</div>
                <div className="text-2xl">{h.emoji}</div>
              </div>
              <div className="text-sm text-white/90 mt-2">{h.blurb}</div>
            </div>
          ))}
        </div>
      );

    case "contact":
      return (
        <div className="flex flex-col items-center justify-center min-h-[55vh] text-center space-y-8">
          <div className="text-3xl font-semibold text-white">Let’s Connect</div>
          <p className="max-w-md text-white/90">
            Open to {SITE.availability}. If you think we’d build well together, I’d love to talk.
          </p>
          
          <div className="w-full max-w-md">
             <MessageForm />
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            <a
              href={`mailto:${SITE.links.email}`}
              className="flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black font-semibold hover:opacity-95 transition"
            >
              <Mail className="w-5 h-5" /> Email
            </a>
            <a
              href={SITE.links.linkedin}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 px-6 py-3 rounded-full bg-white/[0.14] border border-white/14 text-white font-semibold hover:bg-white/[0.20] transition"
            >
              <Linkedin className="w-5 h-5" /> LinkedIn
            </a>
            <a
              href={SITE.links.github}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 px-6 py-3 rounded-full bg-white/[0.14] border border-white/14 text-white font-semibold hover:bg-white/[0.20] transition"
            >
              <Github className="w-5 h-5" /> GitHub
            </a>
            <a
              href={SITE.links.zh}
              className="flex items-center gap-2 px-6 py-3 rounded-full bg-white/[0.14] border border-white/14 text-white font-semibold hover:bg-white/[0.20] transition"
            >
              中文
            </a>
          </div>
        </div>
      );

    default:
      return <div className="text-center text-white/80 mt-20">Content coming soon...</div>;
  }
};

const DockButton = ({
  icon: Icon,
  label,
  href,
}: {
  icon: any;
  label: string;
  href: string;
}) => (
  <a
    href={href}
    target={href.startsWith("http") ? "_blank" : undefined}
    rel={href.startsWith("http") ? "noreferrer" : undefined}
    className="group flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.14] border border-white/14 hover:bg-white/[0.20] transition"
    aria-label={label}
    title={label}
  >
    <Icon className="w-4 h-4 text-white/90" />
    <span className="text-sm font-semibold text-white/90">{label}</span>
  </a>
);

// -----------------------------
// Immersive Layout
// -----------------------------
const ImmersiveLayout = () => {
  const [activeAppId, setActiveAppId] = useState<string | null>(null);
  const activeApp = APPS.find((a) => a.id === (activeAppId as any));
  const [activeItem, setActiveItem] = useState<ItemContent | null>(null);

  return (
    <motion.div
      key="immersive"
      initial={{ opacity: 0, scale: 1.03, filter: "blur(12px)" }}
      animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
      exit={{ opacity: 0, scale: 1.03, filter: "blur(12px)" }}
      transition={{ duration: 0.5 }}
      // Padding bottom to avoid dock overlap
      className="absolute inset-0 z-10 flex flex-col items-center justify-center overflow-hidden pb-32"
    >
      <motion.div
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.18 }}
        className="mb-8 text-center"
      >
        <div className="w-24 h-24 mx-auto rounded-full border border-white/25 shadow-[0_0_60px_rgba(255,255,255,0.16)] overflow-hidden mb-4 bg-white/[0.12] backdrop-blur-2xl">
          <img src="/me.jpg" alt="Profile" className="w-full h-full object-cover" />
        </div>
        <h1 className="text-3xl text-white mb-1 drop-shadow-md">
          Welcome to <span className="font-bold">Alex Liu</span>'s Page!
        </h1>
        <p className="text-white/85 text-sm font-medium tracking-wide">{SITE.tagline}</p>
      </motion.div>

      {/* subtle “board” behind icons */}
      <div className="relative">
        <div className="absolute -inset-6 rounded-[40px] bg-white/[0.10] border border-white/12 backdrop-blur-3xl shadow-[0_30px_110px_rgba(0,0,0,0.32)]" />
        <div className="relative px-6 py-6">
          <div className="grid grid-cols-4 gap-x-10 gap-y-10">
            {APPS.map((app, index) => (
              <VisionIcon key={app.id} app={app} index={index} onOpen={() => setActiveAppId(app.id)} />
            ))}
          </div>
        </div>
      </div>

      {/* Dock */}
      <motion.div
        initial={{ y: 24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.28 }}
        className="fixed bottom-4 left-1/2 -translate-x-1/2 z-30"
      >
        <div className="rounded-full border border-white/18 bg-white/[0.18] backdrop-blur-3xl shadow-[0_20px_80px_rgba(0,0,0,0.40)] px-3 py-2 flex items-center gap-2">
          <DockButton icon={Mail} label="Email" href={`mailto:${SITE.links.email}`} />
          <DockButton icon={Linkedin} label="LinkedIn" href={SITE.links.linkedin} />
          <DockButton icon={Github} label="GitHub" href={SITE.links.github} />
          <DockButton icon={FileText} label="Resume" href={SITE.links.resume} />
          <DockButton icon={Globe} label="中文" href={SITE.links.zh} />
        </div>
      </motion.div>

      <AnimatePresence>
        {activeApp && (
          <VisionWindow app={activeApp} onClose={() => setActiveAppId(null)}>
            <ImmersiveContent id={activeApp.id} onOpenProject={(p) => setActiveItem(p)} />
          </VisionWindow>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {activeItem ? <SharedModal item={activeItem} onClose={() => setActiveItem(null)} /> : null}
      </AnimatePresence>
    </motion.div>
  );
};

// -----------------------------
// 11) MAIN ENTRY
// -----------------------------
export default function Portfolio() {
  const [mode, setMode] = useState<"immersive" | "traditional">("immersive");

  return (
    <div className="relative w-full h-screen bg-black text-white font-sans overflow-hidden selection:bg-white/20 antialiased">
      <SpatialBackground />
      <ViewToggle mode={mode} setMode={setMode} />

      <AnimatePresence mode="wait">
        {mode === "immersive" ? <ImmersiveLayout key="immersive" /> : <TraditionalLayout key="traditional" />}
      </AnimatePresence>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 10px; height: 10px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: rgba(255,255,255,0.06); border-radius: 999px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.22); border-radius: 999px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.34); }
      `}</style>
    </div>
  );
}