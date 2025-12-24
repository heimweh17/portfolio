import React, { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionTemplate, useMotionValue } from "framer-motion";
import {
  Github,
  Linkedin,
  Mail,
  FileText,
  Briefcase,
  Code2,
  Cpu,
  Camera,
  X,
  Zap,
  User,
  GraduationCap,
  Heart,
  ChevronLeft,
  Sparkles,
  MapPin,
} from "lucide-react";

/**
 * ✅ What changed vs your last version:
 * 1) Icons: switched to "visionOS app icon" (squircle, layered glass, specular highlight, subtle hue, no loud gradients)
 * 2) Real page hierarchy: click icon → pushes a real page (stack navigation) instead of a modal overlay
 * 3) Less “dark/Android”: brighter fog + airy glass, softer contrast, more Apple-like spacing/typography
 * 4) Optional: you can set background to a brighter environment image (already tuned)
 */

/** -----------------------------
 *  DATA: YOUR INFO (kept)
 *  ----------------------------- */

const SITE = {
  name: "Alex Liu",
  headline: "Alex Liu",
  tagline: "CS Major @ UF · Geography Minor",
  location: "Gainesville, FL",
  links: {
    github: "https://github.com/heimweh17",
    linkedin: "https://www.linkedin.com/in/alex-liu7/",
    instagram: "https://www.instagram.com/alexliu1700/",
    email: "haozhouliu17@gmail.com",
    resume: "/resume.pdf",
    phone: "+1 (352) 328-4805",
    map: "https://www.google.com/maps/place/Gainesville,+FL",
  },
};

const ABOUT = {
  p1: "I am a Computer Science student at the University of Florida, exploring the intersection of code, data, and the physical world. I specialize in building systems that transform messy real-time data into intuitive, actionable tools.",
  p2: "Whether it's creating interactive maps, optimizing backend algorithms, or designing accessible interfaces, I love solving problems that have a tangible impact. I am currently authorized to work in the U.S. and do not require sponsorship.",
  highlights: [
    "Core Focus: Data Structures, Algorithms, Systems & Full Stack",
    "Tech Stack: C++, Python, TypeScript, React, Flask, SQL, Docker",
    "Interests: Geospatial (GIS), Data Visualization, HCI & Accessibility",
  ],
};

const PROJECTS = [
  {
    name: "GeoDashboard",
    flagship: true,
    blurb:
      "A full-stack geospatial analytics platform using microservices to separate AI inference from core mapping.",
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
    accent: { hue: 205, sat: 95, light: 60 },
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
    tech: ["Node.js", "Supabase", "Gemini API", "Deepgram API"],
    links: { code: "https://github.com/heimweh17/SmartScribe" },
    accent: { hue: 160, sat: 80, light: 55 },
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
    tech: ["Flask", "React", "Docker", "PostgreSQL"],
    links: { code: "https://github.com/heimweh17/Grade-Track" },
    accent: { hue: 25, sat: 95, light: 60 },
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
    tech: ["Python", "OpenCV", "MediaPipe"],
    links: { code: "https://github.com/heimweh17/Ability-Bridge" },
    accent: { hue: 260, sat: 85, light: 62 },
  },
  {
    name: "Minesweeper (SFML)",
    blurb: "Classic Minesweeper recreated in C++ with recursive mechanics and leaderboards.",
    tech: ["C++", "SFML"],
    links: { code: "https://github.com/heimweh17/Minesweeper-game" },
    accent: { hue: 220, sat: 10, light: 75 },
  },
  {
    name: "Bin Packing Analysis",
    blurb: "Performance comparison of Best-Fit vs First-Fit algorithms on large datasets.",
    tech: ["C++", "Algorithm"],
    links: { code: "https://github.com/heimweh17/best-fit-fitst-fit" },
    accent: { hue: 230, sat: 35, light: 65 },
  },
  {
    name: "AVL Tree Implementation",
    blurb: "Self-balancing Binary Search Tree built from scratch.",
    tech: ["C++", "Data Structures"],
    links: { code: "https://github.com/heimweh17/AVL-TREE" },
    accent: { hue: 140, sat: 55, light: 60 },
  },
];

const EXPERIENCE = [
  {
    role: "Instructor",
    org: "Logic Lab",
    period: "Jun 2022 – Jul 2022",
    location: "Gainesville, FL",
    bullets: [
      "Led and instructed a class of 30+ students in math and chess.",
      "Refined lesson plans weekly based on student feedback.",
      "Collaborated with a team to grade assignments and provide feedback.",
    ],
  },
  {
    role: "Cultural Performer",
    org: "JiaTing Lion & Dragon",
    period: "Jan 2025 – May 2025",
    bullets: [
      "Performed traditional Lion/Dragon dance for 300+ attendees.",
      "Practiced rhythm, team communication, and synchronization.",
      "Assisted with backstage logistics and stage transitions.",
    ],
  },
];

const VOLUNTEER = [
  {
    role: "Volunteer Mapper",
    org: "OpenStreetMap",
    period: "Sep 2020 – Present",
    bullets: ["Maintained map data for roads, POIs, and land use.", "Cross-referenced satellite imagery to validate geometry."],
  },
  {
    role: "Instructor",
    org: "Buchholz Math Team",
    period: "Summer 2022 & 2023",
    bullets: ["Tutored students in competitive mathematics and logic.", "Created handouts and graded practice sets."],
  },
];

const LEADERSHIPS = [
  {
    role: "SASE Intern",
    org: "UF SASE",
    period: "Aug 2025 – Present",
    bullets: ["Assisted in planning professional events for 100+ members."],
  },
  {
    role: "Event Committee",
    org: "UF CASA",
    period: "2024 – Present",
    bullets: ["Helped plan and execute cultural events."],
  },
];

const SKILLS = [
  { group: "Languages", items: ["C++", "Python", "TypeScript", "SQL", "Java", "RISC-V"] },
  { group: "Frameworks", items: ["React", "Flask", "FastAPI", "Node.js", "Tailwind"] },
  { group: "Tools", items: ["Docker", "PostgreSQL", "Git", "GitHub Actions"] },
];

const HOBBIES = [
  { name: "Badminton", emoji: "🏸" },
  { name: "Pickleball", emoji: "🥒" },
  { name: "Photo Walks", emoji: "📷" },
  { name: "Road Trips", emoji: "🚗" },
];

/** EDUCATION placeholder — paste your real one here if you have it */
const EDUCATION = [
  {
    school: "University of Florida",
    period: "2024 – 2028",
    degree: "B.S. Computer Science · Geography Minor",
    gpa: "GPA: 3.80 / 4.00",
    logo: "/uf.png", // optional
    activities: "SASE · CASA · OpenStreetMap",
  },
];

/** -----------------------------
 *  App registry
 *  ----------------------------- */
type AppId =
  | "about"
  | "projects"
  | "experience"
  | "education"
  | "skills"
  | "photos"
  | "hobbies"
  | "contact";

type AppDef = {
  id: AppId;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  accent: { hue: number; sat: number; light: number }; // HSL for Apple-like subtle tint
};

const APPS: AppDef[] = [
  { id: "about", label: "About", icon: User, accent: { hue: 210, sat: 90, light: 60 } },
  { id: "projects", label: "Projects", icon: Code2, accent: { hue: 255, sat: 85, light: 63 } },
  { id: "experience", label: "Experience", icon: Briefcase, accent: { hue: 25, sat: 90, light: 60 } },
  { id: "education", label: "Education", icon: GraduationCap, accent: { hue: 140, sat: 60, light: 58 } },
  { id: "skills", label: "Skills", icon: Cpu, accent: { hue: 190, sat: 75, light: 58 } },
  { id: "photos", label: "Photos", icon: Camera, accent: { hue: 55, sat: 90, light: 60 } },
  { id: "hobbies", label: "Hobbies", icon: Heart, accent: { hue: 330, sat: 75, light: 62 } },
  { id: "contact", label: "Contact", icon: Mail, accent: { hue: 0, sat: 75, light: 60 } },
];

/** -----------------------------
 *  Utils
 *  ----------------------------- */
function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function hsl(a: { hue: number; sat: number; light: number }, alpha = 1) {
  return `hsl(${a.hue} ${a.sat}% ${a.light}% / ${alpha})`;
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const m = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    if (!m) return;
    const onChange = () => setReduced(!!m.matches);
    onChange();
    m.addEventListener?.("change", onChange);
    return () => m.removeEventListener?.("change", onChange);
  }, []);
  return reduced;
}

/** -----------------------------
 *  Background (brighter, Apple-like "air")
 *  ----------------------------- */
const SpatialBackground = () => {
  // Try replacing with your own "environment" image for max premium feel.
  const bg =
    "https://github.com/heimweh17/portfolio/blob/main/public/photos/10-12-6k.jpg";

  return (
    <div className="fixed inset-0 z-0 bg-black">
      <img
        src={bg}
        className="absolute inset-0 h-full w-full object-cover opacity-[0.90] scale-[1.04]"
        alt="Environment"
      />

      {/* brighter fog + vignette (less “underground”) */}
      <div className="absolute inset-0 bg-[radial-gradient(1100px_720px_at_50%_22%,rgba(255,255,255,0.18),rgba(255,255,255,0.06)_35%,rgba(0,0,0,0.55)_72%,rgba(0,0,0,0.92))]" />

      {/* “air blur” */}
      <div className="absolute inset-0 backdrop-blur-[2px]" />

      {/* gentle grain */}
      <div
        className="absolute inset-0 opacity-[0.10] mix-blend-overlay"
        style={{
          backgroundImage:
            "url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22160%22 height=%22160%22%3E%3Cfilter id=%22n%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22 numOctaves=%222%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22160%22 height=%22160%22 filter=%22url(%23n)%22 opacity=%220.35%22/%3E%3C/svg%3E')",
        }}
      />
    </div>
  );
};

/** -----------------------------
 *  Apple-ish glass surfaces (cleaner)
 *  ----------------------------- */
const GlassSurface = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div
    className={cn(
      "relative overflow-hidden rounded-[28px] border border-white/16 bg-white/[0.10] backdrop-blur-3xl shadow-[0_30px_110px_rgba(0,0,0,0.55)]",
      className
    )}
  >
    {/* crisp edge */}
    <div className="pointer-events-none absolute inset-0 rounded-[28px] ring-1 ring-white/10" />
    {/* top sheen */}
    <div className="pointer-events-none absolute -top-24 left-1/2 h-56 w-[680px] -translate-x-1/2 rounded-full bg-white/30 blur-3xl opacity-[0.16]" />
    {/* subtle inner gradient */}
    <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.26),rgba(255,255,255,0.08),rgba(0,0,0,0.10))] opacity-[0.35]" />
    {children}
  </div>
);

/** -----------------------------
 *  ✅ New: True visionOS app icon (squircle + layers + premium tint)
 *  ----------------------------- */
const VisionAppIcon = ({
  app,
  index,
  onOpen,
}: {
  app: AppDef;
  index: number;
  onOpen: () => void;
}) => {
  const reduced = usePrefersReducedMotion();
  const ref = useRef<HTMLButtonElement | null>(null);

  const mx = useMotionValue(40);
  const my = useMotionValue(18);
  const highlight = useMotionTemplate`radial-gradient(140px 110px at ${mx}px ${my}px, rgba(255,255,255,0.70), rgba(255,255,255,0.16) 44%, rgba(255,255,255,0.00) 70%)`;

  const onMove = (e: React.PointerEvent) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    mx.set(e.clientX - r.left);
    my.set(e.clientY - r.top);
  };

  const tintA = hsl(app.accent, 0.30);
  const tintB = hsl({ ...app.accent, light: Math.min(85, app.accent.light + 18) }, 0.16);

  return (
    <motion.button
      ref={ref}
      onPointerMove={onMove}
      onClick={onOpen}
      initial={reduced ? undefined : { opacity: 0, y: 14, scale: 0.97 }}
      animate={reduced ? undefined : { opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: index * 0.045, type: "spring", stiffness: 360, damping: 22 }}
      whileHover={reduced ? undefined : { y: -8, scale: 1.06 }}
      whileTap={{ scale: 0.98 }}
      className="group flex flex-col items-center gap-3 select-none"
      aria-label={app.label}
      style={{ willChange: "transform" }}
    >
      <motion.div className="relative" style={{ width: 94, height: 94 }}>
        {/* outer aura (very subtle, Apple-y) */}
        <div
          className="absolute inset-0 rounded-[28px] blur-2xl opacity-[0.95]"
          style={{
            background:
              `radial-gradient(65% 65% at 35% 25%, ${tintA}, transparent 62%),` +
              `radial-gradient(65% 65% at 65% 78%, ${tintB}, transparent 68%)`,
          }}
        />

        {/* icon body */}
        <div className="relative h-[88px] w-[88px] rounded-[26px] border border-white/18 bg-white/[0.12] backdrop-blur-3xl shadow-[0_22px_70px_rgba(0,0,0,0.58)] overflow-hidden">
          {/* moving specular */}
          <motion.div className="absolute inset-0 opacity-[0.75]" style={{ background: highlight }} />
          {/* inner tint wash */}
          <div
            className="absolute inset-0 opacity-[0.70]"
            style={{
              background: `linear-gradient(135deg, ${hsl(app.accent, 0.18)}, rgba(255,255,255,0.06), rgba(0,0,0,0.08))`,
            }}
          />
          {/* top sheen */}
          <div className="pointer-events-none absolute -top-10 left-1/2 h-24 w-[140px] -translate-x-1/2 rounded-full bg-white/50 blur-2xl opacity-[0.22]" />
          {/* micro texture */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.08] mix-blend-overlay"
            style={{
              backgroundImage:
                "url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22120%22 height=%22120%22%3E%3Cfilter id=%22n%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%222%22/%3E%3C/filter%3E%3Crect width=%22120%22 height=%22120%22 filter=%22url(%23n)%22 opacity=%220.25%22/%3E%3C/svg%3E')",
            }}
          />

          {/* icon glyph container */}
          <div className="relative z-10 h-full w-full grid place-items-center">
            <div className="grid place-items-center rounded-[18px] border border-white/14 bg-white/[0.10] shadow-[inset_0_1px_0_rgba(255,255,255,0.26),0_14px_30px_rgba(0,0,0,0.34)]"
              style={{ width: 56, height: 56 }}
            >
              <app.icon className="h-7 w-7 text-white/92 drop-shadow-[0_12px_26px_rgba(0,0,0,0.60)]" />
            </div>
          </div>

          {/* edge ring */}
          <div className="pointer-events-none absolute inset-0 rounded-[26px] ring-1 ring-white/10" />
        </div>
      </motion.div>

      <div className="text-center leading-none">
        <div className="text-[13px] font-medium tracking-[0.02em] text-white/92 drop-shadow-[0_16px_34px_rgba(0,0,0,0.65)] group-hover:text-white">
          {app.label}
        </div>
      </div>
    </motion.button>
  );
};

/** -----------------------------
 *  Page container (true “app page”, not modal)
 *  ----------------------------- */
const AppPage = ({
  app,
  onBack,
  children,
}: {
  app: AppDef;
  onBack: () => void;
  children: React.ReactNode;
}) => {
  const accentGlow = useMemo(() => {
    const a = app.accent;
    return {
      bg1: `radial-gradient(720px 280px at 20% 0%, ${hsl(a, 0.25)}, transparent 60%)`,
      bg2: `radial-gradient(680px 260px at 85% 15%, ${hsl({ ...a, light: Math.min(85, a.light + 18) }, 0.18)}, transparent 62%)`,
    };
  }, [app]);

  return (
    <motion.div
      className="absolute inset-0 z-30"
      initial={{ opacity: 0, x: 26, scale: 0.985 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 30, scale: 0.985 }}
      transition={{ type: "spring", stiffness: 240, damping: 28 }}
    >
      {/* page fog */}
      <div className="absolute inset-0 bg-black/35 backdrop-blur-[3px]" />
      {/* accent glows */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.95]" style={{ background: accentGlow.bg1 }} />
      <div className="pointer-events-none absolute inset-0 opacity-[0.95]" style={{ background: accentGlow.bg2 }} />

      <div className="relative mx-auto max-w-5xl px-6 pt-8 md:pt-10">
        <GlassSurface className="min-h-[84vh]">
          {/* nav bar */}
          <div className="flex items-center justify-between px-5 md:px-7 h-14 border-b border-white/12 bg-white/[0.05]">
            <button
              onClick={onBack}
              className="flex items-center gap-2 rounded-2xl border border-white/12 bg-white/[0.06] px-3 py-2 text-[12px] font-semibold text-white/88 hover:bg-white/[0.10]"
            >
              <ChevronLeft className="h-4 w-4" />
              Home
            </button>

            <div className="flex items-center gap-3">
              <div
                className="grid h-9 w-9 place-items-center rounded-2xl border border-white/14 bg-white/[0.08]"
                style={{ boxShadow: `inset 0 1px 0 rgba(255,255,255,0.18)` }}
              >
                <app.icon className="h-5 w-5 text-white/85" />
              </div>
              <div className="text-[15px] font-semibold tracking-[0.01em] text-white/92">
                {app.label}
              </div>
            </div>

            <div className="w-[76px]" />
          </div>

          {/* content */}
          <div className="p-6 md:p-8 overflow-y-auto max-h-[calc(84vh-56px)]">
            {children}
          </div>
        </GlassSurface>
      </div>
    </motion.div>
  );
};

/** -----------------------------
 *  Content sections (same data, cleaner cards)
 *  ----------------------------- */
const SectionTitle = ({ icon: Icon, title }: { icon: any; title: string }) => (
  <div className="flex items-center gap-3 mb-5">
    <div className="grid h-10 w-10 place-items-center rounded-2xl border border-white/14 bg-white/[0.08]">
      <Icon className="h-5 w-5 text-white/85" />
    </div>
    <div className="text-xl font-semibold text-white/92">{title}</div>
  </div>
);

const Card = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <div
    className={cn(
      "rounded-[26px] border border-white/14 bg-white/[0.08] backdrop-blur-3xl shadow-[0_24px_70px_rgba(0,0,0,0.50)]",
      className
    )}
  >
    {children}
  </div>
);

const Pill = ({ children }: { children: React.ReactNode }) => (
  <span className="inline-flex items-center rounded-full border border-white/14 bg-white/[0.06] px-3 py-1 text-[11px] font-medium text-white/80">
    {children}
  </span>
);

const AppContent = ({ id }: { id: AppId }) => {
  switch (id) {
    case "about":
      return (
        <div className="grid gap-7 md:grid-cols-[340px_1fr]">
          <Card className="p-6">
            <div className="flex flex-col items-center text-center">
              <div className="relative h-40 w-40 overflow-hidden rounded-full border border-white/14 bg-white/5 shadow-[0_25px_70px_rgba(0,0,0,0.55)]">
                <img src="/me.jpg" alt="Profile" className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-[radial-gradient(120px_120px_at_50%_0%,rgba(255,255,255,0.28),transparent)]" />
              </div>

              <div className="mt-5 text-2xl font-semibold text-white/92">{SITE.name}</div>
              <div className="mt-2 inline-flex items-center rounded-full border border-white/14 bg-white/[0.06] px-3 py-1.5 text-[12px] font-medium text-white/80">
                {SITE.tagline}
              </div>

              <div className="mt-4 flex items-center gap-2">
                <a
                  href={SITE.links.github}
                  target="_blank"
                  rel="noreferrer"
                  className="grid h-10 w-10 place-items-center rounded-2xl border border-white/14 bg-white/[0.06] hover:bg-white/[0.10]"
                >
                  <Github className="h-5 w-5 text-white/85" />
                </a>
                <a
                  href={SITE.links.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="grid h-10 w-10 place-items-center rounded-2xl border border-white/14 bg-white/[0.06] hover:bg-white/[0.10]"
                >
                  <Linkedin className="h-5 w-5 text-white/85" />
                </a>
                <a
                  href={SITE.links.resume}
                  target="_blank"
                  rel="noreferrer"
                  className="h-10 rounded-2xl border border-white/14 bg-white/[0.06] px-4 text-[12px] font-semibold text-white/90 hover:bg-white/[0.10] flex items-center"
                >
                  Resume
                </a>
              </div>

              <div className="mt-5 flex items-center gap-2 text-[12px] text-white/70">
                <MapPin className="h-4 w-4" />
                {SITE.location}
              </div>
            </div>
          </Card>

          <div className="space-y-6">
            <Card className="p-6">
              <div className="flex items-center gap-2 text-[14px] font-semibold text-white/90">
                <Sparkles className="h-4 w-4 text-white/80" />
                Bio
              </div>
              <div className="mt-3 space-y-3 text-[13.5px] leading-relaxed text-white/78">
                <p>{ABOUT.p1}</p>
                <p>{ABOUT.p2}</p>
              </div>
            </Card>

            <div className="grid gap-3">
              {ABOUT.highlights.map((h, i) => (
                <Card key={i} className="px-5 py-4">
                  <div className="flex items-start gap-3">
                    <div className="mt-[2px] grid h-9 w-9 place-items-center rounded-2xl border border-white/12 bg-white/[0.06]">
                      <Zap className="h-4 w-4 text-white/80" />
                    </div>
                    <div className="text-[13px] leading-relaxed text-white/78">{h}</div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      );

    case "projects":
      return (
        <div className="space-y-6">
          <SectionTitle icon={Code2} title="Projects" />
          <div className="grid gap-6 md:grid-cols-2">
            {PROJECTS.map((p, i) => (
              <ProjectCard key={i} project={p} />
            ))}
          </div>
        </div>
      );

    case "experience":
      return (
        <div className="space-y-8">
          <SectionTitle icon={Briefcase} title="Experience" />
          <div className="space-y-4">
            {EXPERIENCE.map((exp, i) => (
              <Card key={i} className="p-6">
                <div className="flex flex-wrap items-baseline justify-between gap-3">
                  <div className="text-[18px] font-semibold text-white/92">{exp.role}</div>
                  <Pill>{exp.period}</Pill>
                </div>
                <div className="mt-1 text-[12.5px] font-medium text-white/70">
                  {exp.org} • {exp.location}
                </div>
                <ul className="mt-4 space-y-2 text-[13px] text-white/76">
                  {exp.bullets.map((b, j) => (
                    <li key={j} className="flex gap-3">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-white/45" />
                      <span className="leading-relaxed">{b}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <SectionTitle icon={Heart} title="Volunteer" />
              <div className="space-y-3">
                {VOLUNTEER.map((v, i) => (
                  <Card key={i} className="p-5">
                    <div className="text-[14px] font-semibold text-white/90">{v.org}</div>
                    <div className="mt-1 text-[11px] text-white/60">{v.period}</div>
                    <div className="mt-2 text-[12.5px] font-medium text-white/75">{v.role}</div>
                  </Card>
                ))}
              </div>
            </div>

            <div>
              <SectionTitle icon={User} title="Leadership" />
              <div className="space-y-3">
                {LEADERSHIPS.map((l, i) => (
                  <Card key={i} className="p-5">
                    <div className="text-[14px] font-semibold text-white/90">{l.org}</div>
                    <div className="mt-1 text-[11px] text-white/60">{l.period}</div>
                    <div className="mt-2 text-[12.5px] font-medium text-white/75">{l.role}</div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      );

    case "education":
      return (
        <div className="space-y-6">
          <SectionTitle icon={GraduationCap} title="Education" />
          <div className="space-y-4">
            {EDUCATION.map((edu, i) => (
              <Card key={i} className="p-6 overflow-hidden relative">
                <div className="pointer-events-none absolute -top-20 right-[-60px] h-48 w-48 rounded-full bg-white/15 blur-3xl opacity-[0.18]" />
                <div className="relative">
                  <div className="flex items-center gap-4">
                    {edu.logo ? (
                      <div className="h-14 w-14 rounded-2xl border border-white/14 bg-white/[0.10] p-2 overflow-hidden">
                        <img src={edu.logo} alt="logo" className="h-full w-full object-contain" />
                      </div>
                    ) : (
                      <div className="h-14 w-14 rounded-2xl border border-white/14 bg-white/[0.10] grid place-items-center">
                        <GraduationCap className="h-6 w-6 text-white/80" />
                      </div>
                    )}
                    <div>
                      <div className="text-[18px] font-semibold text-white/92">{edu.school}</div>
                      <div className="mt-1 text-[12px] text-white/70">{edu.period}</div>
                    </div>
                  </div>

                  {edu.degree && <div className="mt-4 text-[14px] font-medium text-white/80">{edu.degree}</div>}
                  {edu.gpa && <div className="mt-2"><Pill>{edu.gpa}</Pill></div>}
                  {edu.activities && (
                    <div className="mt-4 text-[12.5px] text-white/70 leading-relaxed">
                      <span className="font-semibold text-white/78">Activities:</span> {edu.activities}
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </div>
      );

    case "skills":
      return (
        <div className="space-y-7">
          <SectionTitle icon={Cpu} title="Skills" />
          {SKILLS.map((grp, i) => (
            <div key={i}>
              <div className="mb-3 ml-1 text-[14px] font-semibold text-white/86">{grp.group}</div>
              <div className="flex flex-wrap gap-3">
                {grp.items.map((s) => (
                  <div
                    key={s}
                    className="rounded-[20px] border border-white/14 bg-white/[0.06] px-5 py-3 text-[13px] font-medium text-white/82 backdrop-blur-3xl hover:bg-white/[0.10]"
                  >
                    {s}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      );

    case "photos":
      return (
        <div className="space-y-6">
          <SectionTitle icon={Camera} title="Photos" />
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="p-6">
              <div className="text-[13px] text-white/75 leading-relaxed">
                把你的照片放进 <span className="font-mono text-white/85">/public/photos</span>，
                然后在这里渲染成 gallery（可以做横向滑动）。
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                <Pill>/photos/1.jpg</Pill>
                <Pill>/photos/2.jpg</Pill>
                <Pill>/photos/3.jpg</Pill>
              </div>
            </Card>

            <div className="rounded-[26px] border border-white/14 bg-white/[0.06] overflow-hidden backdrop-blur-3xl shadow-[0_24px_70px_rgba(0,0,0,0.45)]">
              <div className="aspect-[16/10] w-full">
                <img
                  src="https://images.unsplash.com/photo-1520975958225-1fd1a9d4b1e9?q=80&w=1600&auto=format&fit=crop"
                  className="h-full w-full object-cover opacity-90"
                  alt="placeholder"
                />
              </div>
            </div>
          </div>
        </div>
      );

    case "hobbies":
      return (
        <div className="space-y-6">
          <SectionTitle icon={Heart} title="Hobbies" />
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {HOBBIES.map((h, i) => (
              <div
                key={i}
                className="aspect-square rounded-[26px] border border-white/14 bg-white/[0.06] p-6 backdrop-blur-3xl hover:bg-white/[0.10] transition-colors flex flex-col items-center justify-center shadow-[0_22px_60px_rgba(0,0,0,0.40)]"
              >
                <div className="text-5xl">{h.emoji}</div>
                <div className="mt-3 text-[14px] font-semibold text-white/90">{h.name}</div>
              </div>
            ))}
          </div>
        </div>
      );

    case "contact":
      return (
        <div className="space-y-6">
          <SectionTitle icon={Mail} title="Contact" />
          <Card className="p-6">
            <div className="text-[13px] text-white/75">Email</div>
            <div className="mt-1 text-[16px] font-semibold text-white/92">{SITE.links.email}</div>

            <div className="mt-5 grid gap-3 md:grid-cols-2">
              <a
                href={`mailto:${SITE.links.email}`}
                className="rounded-[22px] border border-white/14 bg-white/[0.06] px-5 py-4 text-[13px] font-semibold text-white/90 hover:bg-white/[0.10] flex items-center gap-3"
              >
                <Mail className="h-4 w-4 text-white/80" />
                Email me
              </a>
              <a
                href={SITE.links.linkedin}
                target="_blank"
                rel="noreferrer"
                className="rounded-[22px] border border-white/14 bg-white/[0.06] px-5 py-4 text-[13px] font-semibold text-white/90 hover:bg-white/[0.10] flex items-center gap-3"
              >
                <Linkedin className="h-4 w-4 text-white/80" />
                LinkedIn
              </a>
            </div>

            <div className="mt-5 grid gap-3 md:grid-cols-2">
              <a
                href={SITE.links.github}
                target="_blank"
                rel="noreferrer"
                className="rounded-[22px] border border-white/14 bg-white/[0.06] px-5 py-4 text-[13px] font-semibold text-white/90 hover:bg-white/[0.10] flex items-center gap-3"
              >
                <Github className="h-4 w-4 text-white/80" />
                GitHub
              </a>
              <a
                href={SITE.links.resume}
                target="_blank"
                rel="noreferrer"
                className="rounded-[22px] border border-white/14 bg-white/[0.06] px-5 py-4 text-[13px] font-semibold text-white/90 hover:bg-white/[0.10] flex items-center gap-3"
              >
                <FileText className="h-4 w-4 text-white/80" />
                Resume
              </a>
            </div>
          </Card>
        </div>
      );

    default:
      return <div className="text-white/80">Content not found</div>;
  }
};

/** -----------------------------
 *  Project card (more premium)
 *  ----------------------------- */
const ProjectCard = ({ project }: { project: (typeof PROJECTS)[number] }) => {
  const [open, setOpen] = useState(false);
  const a = project.accent;

  return (
    <motion.div
      layout
      onClick={() => setOpen((v) => !v)}
      className="relative cursor-pointer overflow-hidden rounded-[26px] border border-white/14 bg-white/[0.08] backdrop-blur-3xl shadow-[0_26px_80px_rgba(0,0,0,0.50)] hover:bg-white/[0.10] transition-colors"
    >
      <div className="relative h-36 w-full">
        {/* premium tint header (not loud gradient) */}
        <div
          className="absolute inset-0"
          style={{
            background:
              `radial-gradient(720px 240px at 20% 0%, ${hsl(a, 0.40)}, transparent 62%),` +
              `radial-gradient(680px 240px at 80% 20%, ${hsl({ ...a, light: Math.min(88, a.light + 20) }, 0.24)}, transparent 65%),` +
              `linear-gradient(180deg, rgba(255,255,255,0.06), rgba(0,0,0,0.30))`,
          }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(900px_220px_at_20%_10%,rgba(255,255,255,0.22),transparent)]" />

        <div className="absolute top-4 right-4">
          {project.flagship && (
            <div className="inline-flex items-center gap-1 rounded-full border border-white/18 bg-white/10 px-2.5 py-1 text-[11px] font-semibold text-white/90">
              <Zap className="h-4 w-4 text-yellow-200 fill-yellow-200" />
              flagship
            </div>
          )}
        </div>

        <div className="absolute bottom-4 left-5 right-5">
          <div className="text-xl font-semibold text-white drop-shadow-[0_18px_40px_rgba(0,0,0,0.55)]">
            {project.name}
          </div>
          <div className="mt-1 text-[12px] text-white/80 line-clamp-1">{project.blurb}</div>
        </div>
      </div>

      <div className="p-5">
        <div className="flex flex-wrap gap-2">
          {project.tech.slice(0, 4).map((t) => (
            <span
              key={t}
              className="rounded-full border border-white/14 bg-white/5 px-3 py-1 text-[11px] font-medium text-white/80"
            >
              {t}
            </span>
          ))}
        </div>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ type: "spring", stiffness: 280, damping: 26 }}
              className="overflow-hidden"
            >
              <div className="mt-5 border-t border-white/10 pt-4">
                {project.highlights?.length ? (
                  <ul className="space-y-2.5">
                    {project.highlights.map((h, i) => (
                      <li key={i} className="flex gap-2 text-[12.5px] leading-relaxed text-white/78">
                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-white/45" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}

                <div className="mt-5 flex gap-3">
                  {project.links?.demo && (
                    <a
                      href={project.links.demo}
                      target="_blank"
                      rel="noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="flex-1 rounded-2xl border border-white/14 bg-white/[0.08] px-4 py-2.5 text-center text-[12px] font-semibold text-white/90 hover:bg-white/[0.12]"
                    >
                      Open Demo
                    </a>
                  )}
                  {project.links?.code && (
                    <a
                      href={project.links.code}
                      target="_blank"
                      rel="noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="flex-1 rounded-2xl border border-white/14 bg-black/20 px-4 py-2.5 text-center text-[12px] font-semibold text-white/90 hover:bg-black/30"
                    >
                      View Code
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {!open && (
          <div className="mt-4 text-center text-[10px] tracking-[0.22em] text-white/40">
            TAP TO EXPAND
          </div>
        )}
      </div>
    </motion.div>
  );
};

/** -----------------------------
 *  ✅ MAIN: true “visionOS navigation stack”
 *  ----------------------------- */
export default function Portfolio() {
  const [stack, setStack] = useState<AppId[]>([]); // empty => Home
  const activeId = stack[stack.length - 1] ?? null;
  const activeApp = useMemo(() => (activeId ? APPS.find((a) => a.id === activeId) : null), [activeId]);

  // lock body scroll when page open (feels like system focus)
  useEffect(() => {
    document.body.style.overflow = activeId ? "hidden" : "unset";
  }, [activeId]);

  const openApp = (id: AppId) => setStack((s) => [...s, id]);
  const goHome = () => setStack([]);

  return (
    <div className="relative min-h-screen overflow-hidden font-sans text-white selection:bg-white/20">
      <SpatialBackground />

      {/* HOME */}
      <motion.main
        className={cn(
          "relative z-10 min-h-screen transition-all duration-500",
          activeId ? "scale-[0.98] opacity-0 pointer-events-none blur-2xl" : "scale-100 opacity-100 blur-0"
        )}
      >
        {/* header */}
        <div className="mx-auto max-w-5xl px-6 pt-14 md:pt-16">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="relative h-14 w-14 overflow-hidden rounded-2xl border border-white/14 bg-white/[0.08] shadow-[0_22px_70px_rgba(0,0,0,0.55)]">
                <img src="/me.jpg" alt="Avatar" className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-[radial-gradient(90px_60px_at_50%_0%,rgba(255,255,255,0.28),transparent)]" />
              </div>

              <div>
                <div className="text-[22px] font-semibold tracking-tight text-white/92">{SITE.headline}</div>
                <div className="mt-1 flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center rounded-full border border-white/14 bg-white/[0.06] px-3 py-1 text-[12px] font-medium text-white/80">
                    {SITE.tagline}
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/20 px-3 py-1 text-[12px] font-medium text-white/65">
                    <MapPin className="h-4 w-4" />
                    {SITE.location}
                  </span>
                </div>
              </div>
            </div>

            {/* quick actions */}
            <div className="hidden md:flex items-center gap-2">
              <a
                href={SITE.links.github}
                target="_blank"
                rel="noreferrer"
                className="grid h-10 w-10 place-items-center rounded-2xl border border-white/14 bg-white/[0.06] hover:bg-white/[0.10]"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5 text-white/85" />
              </a>
              <a
                href={SITE.links.linkedin}
                target="_blank"
                rel="noreferrer"
                className="grid h-10 w-10 place-items-center rounded-2xl border border-white/14 bg-white/[0.06] hover:bg-white/[0.10]"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5 text-white/85" />
              </a>
              <a
                href={SITE.links.resume}
                target="_blank"
                rel="noreferrer"
                className="h-10 rounded-2xl border border-white/14 bg-white/[0.06] px-4 text-[12px] font-semibold text-white/90 hover:bg-white/[0.10] flex items-center gap-2"
              >
                <FileText className="h-4 w-4 text-white/80" />
                Resume
              </a>
            </div>
          </div>
        </div>

        {/* app grid */}
        <div className="mx-auto mt-16 max-w-5xl px-6">
          <div className="grid grid-cols-3 gap-x-7 gap-y-10 sm:grid-cols-4 md:gap-x-10 md:gap-y-12">
            {APPS.map((app, index) => (
              <VisionAppIcon key={app.id} app={app} index={index} onOpen={() => openApp(app.id)} />
            ))}
          </div>
        </div>

        {/* dock */}
        <div className="fixed bottom-7 left-1/2 z-20 -translate-x-1/2">
          <div className="flex items-center gap-3 rounded-[28px] border border-white/14 bg-white/[0.10] px-4 py-3 backdrop-blur-3xl shadow-[0_34px_110px_rgba(0,0,0,0.55)]">
            <a
              href={SITE.links.github}
              target="_blank"
              rel="noreferrer"
              className="grid h-11 w-11 place-items-center rounded-2xl border border-white/12 bg-white/[0.06] hover:bg-white/[0.10]"
              aria-label="GitHub"
            >
              <Github className="h-5 w-5 text-white/90" />
            </a>
            <a
              href={SITE.links.linkedin}
              target="_blank"
              rel="noreferrer"
              className="grid h-11 w-11 place-items-center rounded-2xl border border-white/12 bg-white/[0.06] hover:bg-white/[0.10]"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-5 w-5 text-white/90" />
            </a>
            <a
              href={`mailto:${SITE.links.email}`}
              className="grid h-11 w-11 place-items-center rounded-2xl border border-white/12 bg-white/[0.06] hover:bg-white/[0.10]"
              aria-label="Email"
            >
              <Mail className="h-5 w-5 text-white/90" />
            </a>

            <div className="mx-1 h-8 w-px bg-white/18" />

            <a
              href={SITE.links.resume}
              target="_blank"
              rel="noreferrer"
              className="grid h-11 w-11 place-items-center rounded-2xl border border-white/12 bg-white/[0.06] hover:bg-white/[0.10]"
              aria-label="Resume"
            >
              <FileText className="h-5 w-5 text-white/90" />
            </a>
          </div>
        </div>
      </motion.main>

      {/* ✅ APP PAGE (real hierarchy / navigation stack) */}
      <AnimatePresence>
        {activeId && activeApp && (
          <AppPage app={activeApp} onBack={goHome}>
            <AppContent id={activeId} />
          </AppPage>
        )}
      </AnimatePresence>
    </div>
  );
}
