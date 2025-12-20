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
  Zap, // Added icon for "Highlights"
} from "lucide-react";

// --- SITE CONFIGURATION ---
const SITE = {
  tagline: "CS Major @ UF · Geography Minor",
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
    "I am a Computer Science student at the University of Florida, passionate about the intersection of code, data, and geography. I enjoy transforming messy real-world information into intuitive tools—whether it's interactive maps, analytics dashboards, or automation scripts. I am authorized to work in the U.S. and do not require visa sponsorship now or in the future.",
  highlights: [
    "Core Focus: Data Structures, Algorithms, Systems, & Full Stack Dev",
    "Tech Stack: C++, Python, TypeScript, React, Flask, SQL, Docker",
    "Interests: Geospatial (GIS), Data-Driven Systems, Accessibility & HCI",
  ],
};

const EDUCATION = [
  {
    school: "University of Florida",
    degree: "B.S. Computer Science (Minor in Geography)",
    gpa: "GPA 3.80/4.00",
    period: "2024 – 2028 (Expected)",
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

const EXPERIENCE = [
  {
    role: "Instructor",
    org: "Logic Lab",
    period: "Jun 2022 – Jul 2022",
    location: "Gainesville, FL",
    bullets: [
      "Led and instructed a class of 30+ students in math and chess, breaking down abstract concepts into actionable steps.",
      "Refined lesson plans weekly based on student feedback, similar to iterating on technical requirements.",
      "Collaborated with a 6-person team to grade assignments and provide feedback, fostering critical thinking.",
    ],
    link: "http://www.logiclabgainesville.com/",
  },
  {
    role: "Cultural Performer",
    org: "JiaTing Lion & Dragon",
    period: "Jan 2025 – May 2025",
    location: "Gainesville, FL",
    bullets: [
      "Performed traditional Lion and Dragon dance for 300+ attendees at university and community cultural events.",
      "Practiced rhythm, team communication, and synchronization under high-pressure performance conditions.",
      "Assisted with backstage logistics and stage transitions to ensure smooth event flow.",
    ],
    logo: "/logos/jiating_logo.jpg",
    link: "https://jiatingliondragon.com/",
  },
];

const VOLUNTEER = [
  {
    role: "Volunteer Mapper",
    org: "OpenStreetMap",
    period: "Sep 2020 – Present",
    bullets: [
      "Maintained map data for roads, POIs, and land use across various regions.",
      "Cross-referenced satellite imagery, street view, and local knowledge to validate geometry and tags.",
      "Contributed to the open-source data ecosystem used by downstream navigation and humanitarian applications.",
    ],
    logo: "/logos/osm_logo.svg",
    link: "https://www.openstreetmap.org/",
  },
  {
    role: "Instructor",
    org: "Buchholz Math Team",
    period: "Jun 2022 – Jul 2022 ; Jun 2023 – Jul 2023",
    bullets: [
      "Tutored elementary and middle school students in competitive mathematics and logic.",
      "Created handouts and graded practice sets, focusing on guiding students to debug their own thought processes.",
    ],
    logo: "/logos/bhs_logo.png",
    link: "https://buchholzmathteam.org/",
  },
];

const LEADERSHIPS = [
  {
    role: "SASE Intern",
    org: "UF Society of Asian Scientists & Engineers",
    period: "Aug 2025 – Present",
    bullets: [
      "Assisted in planning professional and technical events for 100+ members, managing logistics and communication.",
    ],
    logo: "/logos/sase_logo.jpg",
    link: "https://ufsase.com/",
  },
  {
    role: "Event Committee Member",
    org: "UF Chinese American Student Association",
    period: "2024 – Present",
    bullets: [
      "Helped plan and execute cultural events, fostering community and cultural awareness on campus.",
    ],
    logo: "/logos/casa_logo.jpg",
    link: "https://orgs.studentinvolvement.ufl.edu/Organization/Chinese-American-Student-Association",
  },
];

// --- UPDATED PROJECTS WITH RESUME HIGHLIGHTS ---
const PROJECTS = [
  {
    name: "GeoDashboard",
    flagship: true,
    blurb: "A full-stack geospatial analytics platform using microservices to separate AI inference from core mapping.",
    // Highlights appear in the modal when clicked
    highlights: [
      "Engineered a microservices architecture using Docker to decouple high-load AI inference from core spatial analytics.",
      "Systematized the release lifecycle via GitHub Actions (CI/CD), automating deployment to Railway.",
      "Integrated Gemini AI for spatial pattern interpretation, enforcing database-level rate limiting to control costs.",
      "Visualized city-scale datasets with sub-second layer switching and DBSCAN clustering.",
    ],
    tech: ["React", "FastAPI", "PostgreSQL", "Docker", "GitHub Actions"],
    links: {
      demo: "https://thegeodashboard.vercel.app/",
      code: "https://github.com/heimweh17/Geo-Dashboard",
    },
    screenshots: [
      "/screenshots/geodashboard-1.png",
      "/screenshots/geodashboard-2.png",
    ],
    categories: ["Geospatial & Maps", "Web & Data"],
  },
  {
    name: "UF Health SmartScribe",
    flagship: true,
    blurb: "Hackathon Prototype: Real-time AI medical documentation system built in 24 hours.",
    highlights: [
      "Engineered a real-time transcription pipeline using Deepgram and Gemini API to generate structured SOAP notes.",
      "Reduced simulated administrative documentation time by ~60% with sub-5-second analysis latency.",
      "Architected a secure backend using Supabase to manage patient records and visit history.",
    ],
    tech: [
      "Node.js",
      "Supabase",
      "Gemini API",
      "Deepgram API",
      "HTML/JS",
    ],
    links: { demo: "", code: "https://github.com/heimweh17/SmartScribe" },
    screenshots: [
      "/screenshots/smartscribe-1.png",
      "/screenshots/smartscribe-2.png",
    ],
    categories: ["Health & Accessibility", "Web & Data"],
  },
  {
    name: "Grade Track",
    flagship: true,
    blurb: "Full-stack analytics dashboard for visualizing student performance trends.",
    highlights: [
      "Orchestrated containerized deployment using Docker Compose, reducing local setup time by 85%.",
      "Developed a Flask + React architecture to visualize statistical metrics (median, std dev) via Recharts.",
      "Implemented robust CSV parsing to transform raw gradebook data into interactive visual insights.",
    ],
    tech: ["Flask", "React", "Docker", "PostgreSQL", "Recharts"],
    links: { demo: "", code: "https://github.com/heimweh17/Grade-Track" },
    screenshots: ["/screenshots/gradetrack-1.png"],
    categories: ["Web & Data"],
  },
  {
    name: "Ability Bridge",
    flagship: true,
    blurb: "Hands-free accessibility interface controlled via facial gestures.",
    highlights: [
      "Constructed a vision-based controller processing 14,000+ facial landmarks/sec for precise cursor mapping.",
      "Optimized signal processing (exponential smoothing) to achieve 30 FPS with <100ms latency.",
      "Enabled accessible interactions via head-pose tracking, mouth-motion Morse code, and blink detection.",
    ],
    tech: ["Python", "OpenCV", "MediaPipe", "PyAutoGUI"],
    links: { demo: "", code: "https://github.com/heimweh17/Ability-Bridge" },
    categories: ["Health & Accessibility", "C++ / Algorithms"],
  },
  {
    name: "Minesweeper (SFML)",
    blurb: "Classic Minesweeper recreated in C++ with recursive mechanics and leaderboards.",
    highlights: [
      "Designed a modular OOP architecture separating game logic from SFML rendering.",
      "Implemented recursive flood-fill algorithms to handle tile clearing efficiency.",
      "Managed game state persistence and file I/O for high-score tracking.",
    ],
    tech: ["C++", "SFML"],
    links: { demo: "", code: "https://github.com/heimweh17/Minesweeper-game" },
    categories: ["C++ / Algorithms"],
  },
  {
    name: "Bin Packing Analysis",
    blurb: "Performance comparison of Best-Fit vs First-Fit algorithms on large datasets.",
    highlights: [
      "Built a reusable testing framework to analyze time complexity and space efficiency.",
      "Processed 100,000+ randomized rectangle inputs to visualize heuristic trade-offs.",
    ],
    tech: ["C++", "Algorithm"],
    links: {
      demo: "",
      code: "https://github.com/heimweh17/best-fit-fitst-fit",
    },
    categories: ["C++ / Algorithms"],
  },
  {
    name: "AVL Tree Implementation",
    blurb: "Self-balancing Binary Search Tree built from scratch.",
    highlights: [
      "Implemented complex tree rotations (left/right) to maintain O(log n) lookup times.",
      "Validated robustness through 1,000+ random insertion/deletion test cases.",
    ],
    tech: ["C++", "Data Structures"],
    links: { code: "https://github.com/heimweh17/AVL-TREE" },
    categories: ["C++ / Algorithms"],
  },
  {
    name: "Sudoku Game",
    blurb: "Python-based Sudoku with backtracking generation and validation.",
    highlights: [
      "Implemented a backtracking algorithm to generate valid puzzles and solve boards.",
      "Designed a clean UI with real-time input validation and error feedback.",
    ],
    tech: ["Python"],
    links: { code: "https://github.com/heimweh17/suduku-project" },
    categories: ["C++ / Algorithms"],
  },
];

const PROJECT_FILTERS = [
  "All",
  "Core",
  "Geospatial & Maps",
  "Health & Accessibility",
  "Web & Data",
  "C++ / Algorithms",
];

const HOBBIES = [
  {
    name: "Badminton",
    emoji: "🏸",
    blurb: "Fast-paced, communicative, and a great workout.",
    details: [
      "I usually play doubles, treating positioning and rotation like a mini strategy game.",
      "My favorite way to reset after a long day of coding.",
    ],
    tags: ["Doubles", "Footwork", "Reset"],
  },
  {
    name: "Pickleball",
    emoji: "🥒",
    blurb: "Easy to start, but surprisingly competitive.",
    details: [
      "Mostly casual games, though I get particular about spin and placement.",
      "A great way to meet people outside the CS bubble.",
    ],
    tags: ["Casual", "Kitchen Line", "Social"],
  },
  {
    name: "Photo Walks",
    emoji: "📷",
    blurb: "Walking and shooting, while mentally mapping the city.",
    details: [
      "I notice street details, signage, and patterns that aren't visible on satellite maps.",
      "Often leads to OpenStreetMap edits later.",
    ],
    tags: ["Street View", "Urban Texture", "OSM"],
  },
  {
    name: "Road Trips",
    emoji: "🚗",
    blurb: "Long drives, playlists, and changing landscapes.",
    details: [
      "I enjoy balancing efficiency with 'scenic detours' when planning routes.",
      "Perfect time for audiobooks, podcasts, or thinking through project ideas.",
    ],
    tags: ["Highways", "Audiobooks", "Detours"],
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
    group: "Languages",
    icon: Terminal,
    items: [
      {
        name: "C++",
        blurb: "My primary language for data structures, algorithms, and systems programming.",
        usedIn: "AVL Tree, Minesweeper, Bin Packing, PageRank assignments.",
      },
      {
        name: "Python",
        blurb: "Go-to for scripting, computer vision, and quick experiments.",
        usedIn: "Ability Bridge, Sudoku, Data Analysis scripts.",
      },
      {
        name: "TypeScript",
        blurb: "Used for type safety and better DX in React projects.",
        usedIn: "GeoDashboard, Portfolio Website.",
      },
      {
        name: "SQL",
        blurb: "Designing schemas and writing queries for backend analysis.",
        usedIn: "Grade Track, SmartScribe, Supabase projects.",
      },
      {
        name: "Java",
        blurb: "Used in coursework to understand strict OOP patterns.",
      },
      {
        name: "RISC-V",
        blurb: "Assembly language used to understand hardware-software mapping.",
      },
    ],
  },
  {
    group: "Frameworks & Tools",
    icon: Code2,
    items: [
      {
        name: "React",
        blurb: "Preferred library for building interactive UIs and dashboards.",
        usedIn: "GeoDashboard, Portfolio, Grade Track Frontend.",
      },
      {
        name: "Flask",
        blurb: "Lightweight backend framework for APIs and data processing.",
        usedIn: "Grade Track Backend.",
      },
      {
        name: "FastAPI",
        blurb: "High-performance framework for building typed JSON APIs.",
        usedIn: "GeoDashboard Backend.",
      },
      {
        name: "Node.js",
        blurb: "Backend logic for hackathons and scripts.",
        usedIn: "SmartScribe.",
      },
      {
        name: "Vite",
        blurb: "Fast build tool, my default for React + TS projects.",
        usedIn: "GeoDashboard.",
      },
      {
        name: "Tailwind",
        blurb: "Utility-first CSS for rapid, consistent styling.",
        usedIn: "Portfolio, Dashboards.",
      },
    ],
  },
  {
    group: "Data & Infrastructure",
    icon: Cpu,
    items: [
      {
        name: "PostgreSQL",
        blurb: "Reliable relational database for structured data.",
        usedIn: "SmartScribe, Grade Track, GeoDashboard.",
      },
      {
        name: "Docker",
        blurb: "Containerization to ensure consistent environments.",
        usedIn: "GeoDashboard, Grade Track.",
      },
      {
        name: "GitHub Actions",
        blurb: "CI/CD for automated testing and deployment.",
        usedIn: "GeoDashboard.",
      },
      {
        name: "Git",
        blurb: "Version control and team collaboration.",
      },
      {
        name: "Grafana",
        blurb: "Visualization tools for system metrics.",
      },
    ],
  },
  {
    group: "Domains & Concepts",
    icon: Code2,
    items: [
      {
        name: "Algorithms",
        blurb: "Analyzing trade-offs between time, space, and implementation complexity.",
        usedIn: "Bin Packing, AVL Trees, LeetCode style problems.",
      },
      {
        name: "Data Structures",
        blurb: "Implementing trees, graphs, and custom structures from scratch.",
        usedIn: "AVL Tree, Pathfinding.",
      },
      {
        name: "Geospatial (GIS)",
        blurb: "The intersection of CS and Geography: Maps, spatial queries.",
        usedIn: "OpenStreetMap, GeoDashboard.",
      },
      {
        name: "Computer Vision",
        blurb: "Camera-based interaction and accessibility tools.",
        usedIn: "Ability Bridge.",
      },
    ],
  },
];

const CONTACT = {
  note: "I am open to Summer 2026 internship opportunities, specifically in Software Engineering, Backend Systems, or Geospatial roles. I'm also happy to chat about maps, infrastructure, accessibility, or whatever you are building.",
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
            className="max-w-xl w-full bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 border border-slate-700/80 rounded-2xl p-6 shadow-[0_0_50px_rgba(15,23,42,0.9)] relative overflow-hidden"
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
                  <div className="text-[10px] font-semibold tracking-[0.18em] text-sky-300 uppercase">
                    {modal.eyebrow}
                  </div>
                )}
                <h2 className="text-xl font-bold text-slate-50 tracking-tight">
                  {modal.title}
                </h2>
                {modal.subtitle && (
                  <p className="text-xs text-slate-400 font-mono">{modal.subtitle}</p>
                )}
              </div>
              <button
                onClick={onClose}
                className="shrink-0 w-8 h-8 rounded-full border border-slate-700/80 flex items-center justify-center text-slate-400 hover:text-sky-300 hover:border-sky-400/50 hover:bg-slate-800 transition-all"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {modal.tags && modal.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mb-5 relative z-10">
                {modal.tags.map((t) => (
                  <span
                    key={t}
                    className="px-2.5 py-0.5 rounded-full bg-slate-800/50 border border-slate-700/50 text-[10px] font-medium text-slate-300"
                  >
                    {t}
                  </span>
                ))}
              </div>
            )}

            <div className="mb-6 text-sm text-slate-200 space-y-3 relative z-10 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
              {modal.body}
            </div>

            {modal.links && modal.links.length > 0 && (
              <div className="flex flex-wrap gap-3 pt-4 border-t border-slate-800/80 relative z-10">
                {modal.links.map((l) => {
                  const Icon = l.icon;
                  return (
                    <a
                      key={l.href}
                      href={l.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold bg-sky-500/10 text-sky-300 border border-sky-500/20 hover:bg-sky-500/20 hover:border-sky-400/40 transition-all"
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
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center gap-3 mb-8">
        <div className="inline-flex items-center gap-2 rounded-full bg-slate-900/80 px-4 py-1.5 border border-slate-700/80 shadow-[0_0_30px_rgba(56,189,248,0.15)]">
          {Icon && <Icon className="w-4 h-4 text-sky-400" />}
          <span className="text-[11px] font-bold tracking-[0.15em] text-slate-200 uppercase">
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
      // Enhanced Interaction: Glow effect and lift on hover
      whileHover={
        hover
          ? { 
              y: -4, 
              borderColor: "rgba(56,189,248,0.4)", // Sky-400 glow
              boxShadow: "0 10px 40px -10px rgba(56,189,248,0.15)" 
            }
          : {}
      }
      whileTap={clickable ? { scale: 0.98, y: 0 } : {}}
      transition={{ duration: 0.25, ease: "easeOut" }}
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
    <Card className="mt-8 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 border-slate-700/80">
      <div className="mb-5">
        <h3 className="text-sm font-bold text-slate-100 mb-1">
          Send me a message
        </h3>
        <p className="text-xs text-slate-300 leading-relaxed max-w-md">
          Feel free to reach out about projects, maps, opportunities, or just to say hi.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-[11px] font-medium text-slate-300 mb-1.5">
              Name (Optional)
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full rounded-lg bg-slate-950/80 border border-slate-700 px-3 py-2 text-xs text-slate-100 placeholder:text-slate-600 focus:outline-none focus:ring-1 focus:ring-sky-400 focus:border-sky-400 transition-colors"
              placeholder="How should I address you?"
            />
          </div>
          <div>
            <label className="block text-[11px] font-medium text-slate-300 mb-1.5">
              Email (Optional)
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full rounded-lg bg-slate-950/80 border border-slate-700 px-3 py-2 text-xs text-slate-100 placeholder:text-slate-600 focus:outline-none focus:ring-1 focus:ring-sky-400 focus:border-sky-400 transition-colors"
              placeholder="you@example.com"
            />
          </div>
        </div>

        <div>
          <label className="block text-[11px] font-medium text-slate-300 mb-1.5">
            Message <span className="text-sky-400">*</span>
          </label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            className="w-full min-h-[120px] rounded-lg bg-slate-950/80 border border-slate-700 px-3 py-2 text-xs text-slate-100 placeholder:text-slate-600 focus:outline-none focus:ring-1 focus:ring-sky-400 focus:border-sky-400 resize-vertical transition-colors"
            placeholder="What's on your mind?"
          />
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center gap-3 justify-between">
          <motion.button
            type="submit"
            disabled={status === "submitting"}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-sky-500 text-slate-950 text-[11px] font-bold tracking-wide hover:bg-sky-400 disabled:opacity-60 disabled:cursor-not-allowed transition-all shadow-[0_0_20px_rgba(56,189,248,0.4)]"
            whileHover={status !== "submitting" ? { y: -1, scale: 1.02 } : {}}
            whileTap={status !== "submitting" ? { scale: 0.97 } : {}}
          >
            {status === "submitting" ? "Sending..." : "Send Message"}
          </motion.button>
        </div>

        {status === "success" && (
          <motion.div 
            initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }}
            className="text-[11px] text-emerald-400 mt-2 font-medium"
          >
            Thanks! I've received your message.
          </motion.div>
        )}
        {status === "error" && error && (
          <motion.div 
            initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }}
            className="text-[11px] text-rose-400 mt-2 font-medium"
          >
            ⚠ {error}
          </motion.div>
        )}
      </form>
    </Card>
  );
}

const NAV_ITEMS = [
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "hobbies", label: "Hobbies" },
  { id: "contact", label: "Contact" },
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
  const [projectFilter, setProjectFilter] = useState<string>("All");
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
      // 1. 处理顶部进度条 (Progress Bar)
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      const docHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const progress = docHeight > 0 ? scrollTop / docHeight : 0;
      setScrollProgress(progress);

      // 2. 处理导航栏高亮 (Active Section Logic)
      // 获取所有 section 的 DOM 元素
      const sections = SECTION_IDS
        .map((id) => document.getElementById(id))
        .filter((el): el is HTMLElement => el !== null);

      // 默认选中第一个
      let currentId = SECTION_IDS[0];
      let minDelta = Infinity;

      // 设定一个“锚点线”，比如视口高度的 25% 处
      // 哪个 section 的标题离这条线最近，就高亮哪个
      const viewportAnchor = window.innerHeight * 0.25;

      sections.forEach((sec) => {
        const rect = sec.getBoundingClientRect();
        
        // 只有当 section 还在视口内（或者刚经过）时才计算
        if (rect.bottom > 0 && rect.top < window.innerHeight) {
          // 计算 section 顶部距离锚点的绝对距离
          const delta = Math.abs(rect.top - viewportAnchor);
          
          // 找到距离最小的那个 section
          if (delta < minDelta) {
            minDelta = delta;
            currentId = sec.id;
          }
        }
      });

      setActiveSection(currentId);
    };

    // 初始化运行一次，防止刷新后状态不对
    handleScroll();

    // 添加监听
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll); // 窗口大小改变也重新计算

    // 清理监听
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []); // 这里的依赖数组为空，只在组件挂载时运行一次

  const filteredProjects = PROJECTS.filter((p) => {
    if (projectFilter === "All") return true;
    if (projectFilter === "Core") return p.flagship;
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
    <div className="font-sans antialiased bg-slate-950 min-h-screen text-slate-100 selection:bg-sky-500/30 selection:text-sky-200">
      <motion.header
        initial={{ y: -16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/80 relative"
      >
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <motion.a
            href="#home"
            className="flex items-center gap-2 font-bold text-xs tracking-wider text-slate-100 uppercase"
            whileHover={{ scale: 1.05 }}
          >
            <span className="hidden sm:inline">Alex Liu · Portfolio</span>
            <span className="sm:hidden">Alex Liu</span>
          </motion.a>
          <nav className="hidden md:flex items-center gap-6 text-[11px] font-medium text-slate-300">
            {NAV_ITEMS.map(({ id, label }) => {
              const isActive = activeSection === id;
              return (
                <motion.a
                  key={id}
                  href={`#${id}`}
                  className={`relative transition-colors ${
                    isActive
                      ? "text-sky-300"
                      : "text-slate-400 hover:text-sky-200"
                  }`}
                  whileHover={{ y: -1 }}
                >
                  {label}
                  {isActive && (
                    <motion.span 
                      layoutId="navHighlight"
                      className="absolute -bottom-1 left-0 right-0 h-[2px] bg-sky-400 rounded-full" 
                    />
                  )}
                </motion.a>
              );
            })}
          </nav>
          <div className="flex items-center gap-3">
            <motion.a
              href="/"
              className="inline-flex items-center gap-1.5 text-[11px] text-slate-400 hover:text-sky-300 font-medium"
              whileHover={{ scale: 1.05 }}
              title="Switch Language"
            >
              <Languages className="w-4 h-4" />
              <span className="hidden sm:inline">中文</span>
            </motion.a>
            <motion.a
              href={SITE.links.resume}
              className="inline-flex items-center gap-2 bg-slate-100 text-slate-900 text-[11px] font-bold px-4 py-2 rounded-full hover:bg-white transition-colors shadow-[0_0_20px_rgba(248,250,252,0.3)]"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FileText className="w-3.5 h-3.5" /> Resume
            </motion.a>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-slate-800/50 overflow-hidden">
          <motion.div
            className="h-full bg-sky-500 shadow-[0_0_10px_rgba(56,189,248,0.8)]"
            style={{ scaleX: scrollProgress, transformOrigin: "0% 50%" }}
          />
        </div>
      </motion.header>

      <section
        id="home"
        className="relative overflow-hidden bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900 text-slate-50"
      >
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-40 -left-40 h-80 w-80 rounded-full bg-sky-500/20 blur-3xl opacity-50" />
          <div className="absolute top-32 -right-20 h-72 w-72 rounded-full bg-indigo-500/20 blur-3xl opacity-50" />
          <div className="absolute bottom-[-120px] left-1/3 h-72 w-72 rounded-full bg-emerald-400/10 blur-3xl opacity-40" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(148,163,184,0.1)_0,_transparent_55%)]" />
          <div className="absolute inset-0 opacity-20 bg-[linear-gradient(120deg,rgba(148,163,184,0.1)_1px,transparent_1px),linear-gradient(210deg,rgba(30,64,175,0.15)_1px,transparent_1px)] bg-[length:240px_240px]" />
        </div>

        <div className="max-w-6xl mx-auto px-6 py-24 relative z-10">
          <div className="grid md:grid-cols-5 gap-12 items-center">
            <motion.div
              className="md:col-span-3 space-y-6"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <motion.h1
                className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
              >
                {SITE.headline}
              </motion.h1>

              <p className="text-base font-medium text-sky-300/90 tracking-wide uppercase">
                {SITE.tagline}
              </p>

              <div className="flex items-center gap-2 text-xs text-slate-400 mt-2">
                <MapPin className="w-4 h-4 text-slate-500" />
                <span className="hover:text-slate-200 transition-colors cursor-default">
                  {SITE.location}
                </span>
              </div>

              <p className="text-sm md:text-base text-slate-300 leading-relaxed max-w-xl">
                I study Computer Science, focusing on algorithms, systems, and making data "tangible." My recent work revolves around geospatial visualization, healthcare tools, and accessible interfaces.
              </p>
              
               <p className="text-sm md:text-base text-slate-300 leading-relaxed max-w-xl">
                Open to Summer 2026 Internships
              </p>

              <div className="flex flex-wrap gap-3 pt-4">
                {[
                  { href: SITE.links.github, icon: Github, label: "GitHub" },
                  { href: SITE.links.linkedin, icon: Linkedin, label: "LinkedIn" },
                  { href: SITE.links.instagram, icon: Instagram, label: "Instagram" },
                  { href: `mailto:${SITE.links.email}`, icon: Mail, label: "Email" },
                ].map(({ href, icon: Icon, label }) => (
                  <motion.a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-slate-700 bg-slate-900/50 text-[11px] text-slate-200 hover:border-sky-400 hover:text-sky-300 hover:bg-slate-900 transition-all"
                    whileHover={{ y: -3 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Icon className="w-4 h-4" /> {label}
                  </motion.a>
                ))}
              </div>
            </motion.div>

            <motion.div
              className="md:col-span-2"
              initial={{ opacity: 0, scale: 0.95, rotate: 2 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <div className="relative group">
                <motion.div
                  className="absolute -inset-1 rounded-3xl bg-gradient-to-tr from-sky-500/60 via-indigo-500/50 to-emerald-400/50 blur-2xl opacity-60 group-hover:opacity-80 transition-opacity duration-500"
                  aria-hidden="true"
                />
                <motion.img
                  src="/me.jpg"
                  alt="Alex Liu"
                  className="relative w-full object-cover rounded-3xl border border-slate-700/50 shadow-[0_0_40px_rgba(0,0,0,0.5)]"
                  whileHover={{ scale: 1.01 }}
                  transition={{ duration: 0.4 }}
                  loading="lazy"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Section id="about" title="About Me" icon={Briefcase}>
        <div className="grid lg:grid-cols-3 gap-8">
          <Card className="lg:col-span-2">
            <h3 className="text-xs font-bold text-slate-200 mb-4 uppercase tracking-wider flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-sky-400" />
              Introduction
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed mb-6">
              {ABOUT.blurb}
            </p>
            <ul className="space-y-3 mb-4">
              {ABOUT.highlights.map((h, i) => (
                <motion.li
                  key={i}
                  className="flex gap-3 text-sm text-slate-200"
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Code2 className="shrink-0 w-4 h-4 text-sky-400 mt-0.5" />
                  <span>{h}</span>
                </motion.li>
              ))}
            </ul>

            <div className="mt-6 border-t border-slate-800 pt-4">
              <div className="flex flex-wrap gap-2">
                {[
                  "Algorithms",
                  "System Design",
                  "GIS / Maps",
                  "HCI & Accessibility",
                ].map((t) => (
                  <span
                    key={t}
                    className="px-3 py-1 rounded-full bg-slate-900 text-[10px] font-medium border border-slate-800 text-slate-300 hover:border-sky-500/50 hover:text-sky-300 transition-colors"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-center gap-2 mb-4">
              <Calendar className="w-4 h-4 text-sky-400" />
              <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider">
                Education
              </h3>
            </div>
            <div className="space-y-5">
              {EDUCATION.map((edu, i) => (
                <div
                  key={i}
                  className="flex items-start gap-4"
                >
                  {edu.logo && (
                    <div className="shrink-0 w-10 h-10 rounded-lg bg-white/5 p-1 border border-white/10">
                        <img
                        src={edu.logo}
                        alt={edu.school}
                        className="w-full h-full object-contain"
                        loading="lazy"
                        />
                    </div>
                  )}
                  <div className="flex-1">
                    <h4 className="font-bold text-xs text-slate-100 mb-0.5">
                      {edu.school}
                    </h4>
                    {edu.degree && (
                      <p className="text-[11px] text-sky-200/90 mb-1 font-medium">
                        {edu.degree}
                      </p>
                    )}
                    <p className="text-[10px] text-slate-400 mb-1">
                      {edu.period}
                    </p>
                    {edu.honors && (
                      <p className="text-[10px] text-emerald-400 font-medium">
                        {edu.honors}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </Section>

      <Section id="projects" title="Featured Projects" icon={Code2}>
        <p className="text-sm text-slate-400 mb-6 max-w-3xl">
          A selection of projects demonstrating my focus on full-stack engineering, geospatial analysis, and accessible technology.
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
                    ? "bg-sky-500 text-slate-950 border-sky-400 shadow-[0_0_15px_rgba(56,189,248,0.4)]"
                    : "bg-slate-950/50 border-slate-700 text-slate-300 hover:border-sky-400 hover:text-sky-200"
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
              <Card
                className="h-full flex flex-col relative overflow-hidden group"
                onClick={() =>
                  setModal({
                    title: p.name,
                    subtitle: p.tech.join(" · "),
                    eyebrow: "Project Details",
                    tags: p.tech,
                    body: (
                      <div className="space-y-5">
                        <div className="space-y-2">
                          <p className="text-slate-300 leading-relaxed">{p.blurb}</p>
                        </div>
                        
                        {/* Highlights Section based on Resume/XYZ */}
                        {p.highlights && (
                            <div className="bg-slate-900/50 rounded-xl p-4 border border-slate-800">
                                <h4 className="text-xs font-bold text-sky-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                                    <Zap className="w-3.5 h-3.5" /> Key Achievements
                                </h4>
                                <ul className="space-y-2.5">
                                    {p.highlights.map((h, idx) => (
                                        <li key={idx} className="flex gap-2.5 text-xs text-slate-200 leading-relaxed">
                                            <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-sky-400/80" />
                                            <span>{h}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {p.screenshots && p.screenshots.length > 0 && (
                          <div className="space-y-2">
                            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                              Preview Gallery
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                              {p.screenshots.map((src) => (
                                <img
                                  key={src}
                                  src={src}
                                  alt={`${p.name} screenshot`}
                                  className="w-full h-24 object-cover rounded-lg border border-slate-800 bg-slate-900"
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
                        ? { label: "View Code", href: p.links.code, icon: Code2 }
                        : null,
                      p.links?.demo
                        ? { label: "Live Demo", href: p.links.demo, icon: ExternalLink }
                        : null,
                    ].filter(Boolean) as ModalLink[],
                  })
                }
              >
                <div className="pointer-events-none absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top_right,_rgba(56,189,248,0.2)_0,_transparent_50%)] group-hover:opacity-40 transition-opacity duration-500" />
                
                <div className="relative flex-1 flex flex-col">
                  {p.screenshots && p.screenshots.length > 0 && (
                    <div className="mb-4 rounded-xl overflow-hidden border border-slate-800 bg-slate-950 relative">
                        <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition-colors z-10" />
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
                    <h3 className="text-base font-bold text-white group-hover:text-sky-300 transition-colors">
                      {p.name}
                    </h3>
                    {p.flagship && (
                      <span className="px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-[10px] font-bold text-amber-300 shadow-[0_0_10px_rgba(245,158,11,0.2)]">
                        CORE
                      </span>
                    )}
                  </div>
                  
                  <p className="text-xs text-slate-400 mb-4 leading-relaxed line-clamp-3">
                    {p.blurb}
                  </p>
                  
                  <div className="flex flex-wrap gap-1.5 mt-auto">
                    {p.tech.slice(0, 4).map((t) => (
                      <span
                        key={t}
                        className="text-[10px] px-2 py-1 bg-slate-900 text-slate-300 font-mono rounded border border-slate-800"
                      >
                        {t}
                      </span>
                    ))}
                    {p.tech.length > 4 && (
                        <span className="text-[10px] px-1.5 py-1 text-slate-500 font-mono">+{p.tech.length - 4}</span>
                    )}
                  </div>
                </div>
                
                <div className="relative flex gap-4 pt-4 mt-4 border-t border-slate-800/60">
                  {p.links?.code && (
                    <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-400 group-hover:text-white transition-colors">
                      <Code2 className="w-3.5 h-3.5" /> Source
                    </div>
                  )}
                  {p.links?.demo && (
                    <div className="flex items-center gap-1.5 text-[11px] font-bold text-sky-400 group-hover:text-sky-300 transition-colors">
                      <ExternalLink className="w-3.5 h-3.5" /> Demo
                    </div>
                  )}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {filteredProjects.length > 3 && (
          <div className="mt-10 flex justify-center">
            <motion.button
              onClick={() => setShowExpandedProjects(!showExpandedProjects)}
              className="inline-flex items-center gap-2 px-6 py-2 border border-slate-700 rounded-full bg-slate-900/50 text-xs font-semibold text-slate-300 hover:border-sky-400 hover:text-white transition-all hover:shadow-[0_0_15px_rgba(56,189,248,0.2)]"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
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
        )}
      </Section>

      <Section
        id="experience"
        title="Experience & Involvement"
        icon={Briefcase}
      >
        <div className="space-y-12">
          {/* Work Experience */}
          <div>
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-6 flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-sky-500" />
              Work History
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
                  <Card
                    onClick={() =>
                      setModal({
                        title: x.role,
                        subtitle: x.org,
                        eyebrow: `Experience · ${x.period}`,
                        body: (
                          <div className="space-y-4">
                            <p className="text-slate-300">
                              At <span className="font-bold text-white">{x.org}</span>, I served as <span className="font-bold text-white">{x.role}</span>.
                            </p>
                            <ul className="space-y-2">
                              {x.bullets.map((b) => (
                                <li key={b} className="flex gap-3 text-xs text-slate-300 leading-relaxed">
                                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-sky-400" />
                                    <span>{b}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ),
                        links: x.link
                          ? [{ label: "Website", href: x.link, icon: ExternalLink }]
                          : undefined,
                      })
                    }
                  >
                    <div className="flex items-start gap-4">
                      {x.logo && (
                        <div className="shrink-0 w-12 h-12 bg-white rounded-lg overflow-hidden p-0.5 border border-slate-700">
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
                            <h4 className="font-bold text-sm text-white group-hover:text-sky-300 transition-colors">
                            {x.role}
                            </h4>
                            <span className="text-[10px] font-mono text-slate-500">{x.period}</span>
                        </div>
                        <div className="text-xs font-medium text-sky-400 mb-2">
                            {x.org}
                        </div>
                        <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">
                          {x.bullets[0]}
                        </p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Volunteer */}
          <div>
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-6 flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              Volunteering
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
                  <Card
                    onClick={() =>
                      setModal({
                        title: x.role,
                        subtitle: x.org,
                        eyebrow: "Volunteer",
                        body: (
                          <div className="space-y-4">
                            <ul className="space-y-2">
                              {x.bullets.map((b) => (
                                <li key={b} className="flex gap-3 text-xs text-slate-300">
                                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-emerald-400" />
                                    <span>{b}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ),
                        links: x.link
                          ? [{ label: "Organization", href: x.link, icon: ExternalLink }]
                          : undefined,
                      })
                    }
                  >
                    <div className="flex items-center gap-3 mb-2">
                        {x.logo && <img src={x.logo} className="w-6 h-6 object-contain" alt="" />}
                        <h4 className="font-bold text-xs text-white">{x.org}</h4>
                    </div>
                    <div className="text-[11px] text-emerald-400 font-medium mb-1">{x.role}</div>
                    <div className="text-[10px] text-slate-500 mb-2">{x.period}</div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Leadership */}
          <div>
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-6 flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-indigo-500" />
              Leadership
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
                  <Card
                    onClick={() =>
                      setModal({
                        title: x.role,
                        subtitle: x.org,
                        eyebrow: "Leadership",
                        body: (
                          <div className="space-y-4">
                            <ul className="space-y-2">
                              {x.bullets.map((b) => (
                                <li key={b} className="flex gap-3 text-xs text-slate-300">
                                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-indigo-400" />
                                    <span>{b}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ),
                        links: x.link
                          ? [{ label: "Website", href: x.link, icon: ExternalLink }]
                          : undefined,
                      })
                    }
                  >
                    <div className="flex items-center gap-3 mb-2">
                        {x.logo && <img src={x.logo} className="w-6 h-6 rounded-md" alt="" />}
                        <h4 className="font-bold text-xs text-white">{x.org}</h4>
                    </div>
                    <div className="text-[11px] text-indigo-400 font-medium mb-1">{x.role}</div>
                    <div className="text-[10px] text-slate-500 mb-2">{x.period}</div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <Section id="skills" title="Technical Arsenal" icon={Cpu}>
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
                <Card className="bg-slate-900/40 border-slate-800">
                  <div className="flex items-center gap-3 mb-4">
                    <g.icon className="w-4 h-4 text-sky-400" />
                    <h3 className="font-bold text-xs text-slate-200 uppercase tracking-wide">
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
                              ? "bg-sky-500 text-slate-950 border-sky-400 shadow-[0_0_15px_rgba(56,189,248,0.4)]"
                              : "bg-slate-950 border-slate-700 text-slate-400 hover:border-sky-500/50 hover:text-slate-200"
                          }`}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
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
          
          <div className="lg:sticky lg:top-24">
            <AnimatePresence mode="wait">
                <motion.div
                    key={activeSkill ? activeSkill.item.name : "empty"}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                >
                    <Card className="bg-gradient-to-br from-slate-900 to-slate-950 border-slate-700 min-h-[180px] flex flex-col justify-center">
                    {activeSkill ? (
                        <div className="space-y-3">
                        <div className="text-[10px] font-bold tracking-widest text-sky-500 uppercase">
                            {activeSkill.group}
                        </div>
                        <h3 className="text-xl font-bold text-white">
                            {activeSkill.item.name}
                        </h3>
                        <p className="text-xs text-slate-300 leading-relaxed">
                            {activeSkill.item.blurb}
                        </p>
                        {activeSkill.item.usedIn && (
                            <div className="pt-3 mt-3 border-t border-slate-800">
                                <span className="text-[10px] font-bold text-slate-500 uppercase block mb-1">
                                    Used In:
                                </span>
                                <p className="text-[11px] text-sky-200">
                                    {activeSkill.item.usedIn}
                                </p>
                            </div>
                        )}
                        </div>
                    ) : (
                        <div className="text-center space-y-2 opacity-50">
                        <Cpu className="w-8 h-8 mx-auto text-slate-600" />
                        <p className="text-xs text-slate-400">
                            Hover over a skill to see details.
                        </p>
                        </div>
                    )}
                    </Card>
                </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </Section>

      <Section id="hobbies" title="Beyond the Code" icon={Award}>
        <p className="text-sm text-slate-400 mb-6">
          When I'm not debugging or optimizing algorithms, here's what keeps me busy.
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
              <Card
                className="h-full flex flex-col items-center text-center gap-3 hover:bg-slate-900/80"
                onClick={() =>
                  setModal({
                    title: hobby.name,
                    subtitle: "Hobby",
                    eyebrow: "Personal",
                    body: (
                      <div className="space-y-3">
                        <p className="text-slate-300">{hobby.blurb}</p>
                        {hobby.details && (
                          <ul className="list-disc list-inside space-y-1 text-slate-400 text-xs text-left">
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
                  <h3 className="text-sm font-bold text-white mb-1">
                    {hobby.name}
                  </h3>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    {hobby.blurb}
                  </p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </Section>

      <Section id="photos" title="Gallery" icon={Camera}>
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
                  View My Photo Gallery
                </h3>
                <p className="text-sm text-sky-100 max-w-md">
                  A collection of snapshots from hackathons, lion dance performances, and interesting places I've mapped.
                </p>
              </div>
              <div className="hidden sm:flex h-12 w-12 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm group-hover:bg-white/30 transition-all">
                <ExternalLink className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        </motion.a>
      </Section>

      <Section id="contact" title="Get In Touch" icon={Mail}>
        <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
                <div>
                    <h3 className="text-2xl font-bold text-white mb-4">
                    Let's Connect
                    </h3>
                    <p className="text-sm text-slate-300 leading-relaxed">
                    {CONTACT.note}
                    </p>
                </div>
                
                <div className="flex flex-col gap-4">
                    <button
                        type="button"
                        onClick={() => handleCopy(SITE.links.email, "email")}
                        className="flex items-center gap-4 p-3 rounded-xl bg-slate-900/50 border border-slate-800 hover:border-sky-500/50 hover:bg-slate-900 transition-all group text-left"
                    >
                        <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center group-hover:bg-sky-500/20 group-hover:text-sky-400 transition-colors">
                            <Mail className="w-5 h-5" />
                        </div>
                        <div>
                            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Email</div>
                            <div className="text-sm font-mono text-slate-200">{SITE.links.email}</div>
                        </div>
                        {copiedField === "email" && (
                            <span className="ml-auto text-[10px] text-emerald-400 font-bold px-2 py-1 bg-emerald-500/10 rounded">COPIED</span>
                        )}
                    </button>

                    <button
                        type="button"
                        onClick={() => handleCopy(SITE.links.phone, "phone")}
                        className="flex items-center gap-4 p-3 rounded-xl bg-slate-900/50 border border-slate-800 hover:border-sky-500/50 hover:bg-slate-900 transition-all group text-left"
                    >
                        <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center group-hover:bg-sky-500/20 group-hover:text-sky-400 transition-colors">
                            <Phone className="w-5 h-5" />
                        </div>
                        <div>
                            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Phone</div>
                            <div className="text-sm font-mono text-slate-200">{SITE.links.phone}</div>
                        </div>
                        {copiedField === "phone" && (
                            <span className="ml-auto text-[10px] text-emerald-400 font-bold px-2 py-1 bg-emerald-500/10 rounded">COPIED</span>
                        )}
                    </button>
                </div>
            </div>
            
            <MessageForm />
        </div>
      </Section>

      <footer className="py-12 border-t border-slate-900 bg-slate-950 mt-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left">
                <div className="font-bold text-slate-200 text-sm mb-1">{SITE.name}</div>
                <div className="text-[11px] text-slate-500">
                © {new Date().getFullYear()} · Built with React, Tailwind & Framer Motion.
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
                  className="w-10 h-10 bg-slate-900 rounded-full flex items-center justify-center text-slate-400 border border-slate-800 hover:border-sky-500 hover:text-sky-400 hover:bg-slate-900 transition-all shadow-lg"
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
  );
}