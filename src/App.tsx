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
} from "lucide-react";

// ====== DESIGN TOKENS ======
const cn = (...xs: (string | false | null | undefined)[]) => xs.filter(Boolean).join(" ");
const shell = "max-w-6xl mx-auto px-4 sm:px-6 md:px-8";
const cardBase =
  "rounded-2xl border border-slate-200/70 bg-white/90 backdrop-blur-sm shadow-sm transition hover:shadow-md hover:-translate-y-0.5";
const chip =
  "inline-flex items-center rounded-full border border-slate-200/80 bg-white/80 px-2.5 py-1 text-xs font-medium text-slate-700";

// ====== DATA (kept from your version) ======
const SITE = {
  tagline: "CS @ University of Florida • Geography Minor",
  location: "Gainesville, FL",
  headline: "Alex Liu",
  name: "Alex Liu's personal Website",
  links: {
    github: "https://github.com/heimweh17",
    linkedin: "https://www.linkedin.com/in/alex-liu7/",
    email: "haozhouliu17@gmail.com",
    resume: "/resume.pdf",
    phone: "+1 (352) 328-4805",
    website: "",
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
      "Managed classroom dynamics and maintained a supportive learning environment, strengthening students’ problem-solving skills.",
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
      <>I began mapping during the 2020 lockdown, starting with places I knew in Southeast China and Florida. Since then I’ve made 587+ edits on OpenStreetMap to support open, community-driven geographic data that can help cities, everyday users, and even disaster response efforts. I enjoy contributing because this work directly benefits everyone.</>,
    ],
    logo: "/logos/osm_logo.svg",
    link: "https://www.openstreetmap.org/",
  },
  {
    role: "Instructor",
    org: "Buchholz Math Team",
    period: "Jun 2022 – Jul 2022 ; Jun 2023 – Jul 2023",
    bullets: [
      <>Taught elementary and middle school students math during a summer camp at Buchholz, helping them strengthen problem-solving ability, logical reasoning, and critical thinking skills through personalized guidance and practice.</>,
    ],
    link: "https://buchholzmathteam.org/",
    logo: "/logos/bhs_logo.png",
  },
];

const LEADERSHIPS = [
  {
    role: "SASE Intern",
    org: " UF Society of Asian Scientists & Engineers",
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
  },
  {
    name: "Ability Bridge",
    blurb: "Assistive tech toolkit: head-pose cursor, mouth-Morse typing, blink/eyebrow clicks.",
    impact: "Real-time CV at ~30 FPS with <100ms latency; improves accessibility for hands-free use.",
    tech: ["Python", "OpenCV", "MediaPipe", "PyAutoGUI"],
    links: { demo: "", code: "https://github.com/heimweh17/Ability-Bridge" },
  },
  {
    name: "Minesweeper (SFML)",
    blurb: "Interactive C++ Minesweeper with recursive reveal, flags, pause/debug, timer, leaderboard.",
    impact: "350+ tiles; persistent top-5 scores via file I/O; modular OOP design.",
    tech: ["C++", "SFML"],
    links: { demo: "", code: "https://github.com/heimweh17/Minesweeper-game" },
  },
  {
    name: "Bin Packing: Best-Fit vs First-Fit",
    blurb: "Algorithmic comparison processing 100k+ rectangles to quantify runtime and space trade-offs.",
    impact: "Object-oriented placement framework streamlines experimentation and metrics.",
    tech: ["C++"],
    links: { demo: "", code: "https://github.com/heimweh17/best-fit-fitst-fit" },
  },
  {
    name: "AVL Tree Data Structure",
    blurb: "Self-balancing AVL tree with insert, delete, search, and rotations.",
    impact: "Supported 1,000+ operations and validated correctness with custom test suite.",
    tech: ["C+\+"],
    links: { code: "https://github.com/heimweh17/AVL-TREE" },
  },
  {
    name: "Sudoku Game",
    blurb: "Interactive Sudoku board with 3 difficulty levels and real-time validation.",
    impact: "Implemented UI state handling, win/lose detection, reset control, and smooth UX.",
    tech: ["Python"],
    links: { code: "https://github.com/heimweh17/suduku-project" },
  },
];

const SKILLS = [
  { group: "Languages", items: ["C++", "Python", "Java", "TypeScript", "SQL", "RISC-V"] },
  { group: "Frameworks", items: ["React", "Flask", "FastAPI", "Node", "Vite", "Tailwind"] },
  { group: "Data & Infra", items: ["PostgreSQL", "SQLite", "Docker", "Git", "CI", "Grafana"] },
  { group: "Domains", items: ["Algorithms", "Data Structures", "Geospatial (GIS)", "Computer Vision"] },
];

const CONTACT = {
  note:
    "Open to internships for Summer 2026. Happy to chat about data systems, geospatial, and accessible UI.",
};

// ====== UI PRIMITIVES ======
const Section = ({ id, title, children }: { id: string; title: string; children: React.ReactNode }) => (
  <section id={id} className="scroll-mt-24 py-10">
    <div className={cn(shell)}>
      <div className="mb-6 flex items-center gap-3">
        <div className="h-6 w-1.5 rounded-full bg-gradient-to-b from-blue-600 to-orange-500" />
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">{title}</h2>
      </div>
      {children}
    </div>
  </section>
);

const Card: React.FC<React.PropsWithChildren<{ className?: string }>> = ({ children, className }) => (
  <div className={cn(cardBase, "p-5", className)}>{children}</div>
);

const Badge = ({ children }: { children: React.ReactNode }) => (
  <span className="inline-flex items-center rounded-lg bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-700 ring-1 ring-inset ring-slate-200">
    {children}
  </span>
);

function TableOfContents() {
  const items = [
    { id: "home", label: "Home" },
    { id: "projects", label: "Projects" },
    { id: "experience", label: "Experience" },
    { id: "volunteer", label: "Volunteer" },
    { id: "leaderships", label: "Leaderships" },
    { id: "skills", label: "Skills" },
    { id: "about", label: "About" },
    { id: "contact", label: "Contact" },
  ];

  const [active, setActive] = React.useState<string>("home");

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        const id = visible?.target?.id;
        if (id) {
          setActive((prev) => (prev !== id ? id : prev));
          if (window.location.hash !== `#${id}`) {
            history.replaceState(null, "", `#${id}`);
          }
        }
      },
      { root: null, rootMargin: "0px 0px -60% 0px", threshold: [0.2, 0.4, 0.6] }
    );

    const sections = items.map((i) => document.getElementById(i.id)).filter(Boolean) as Element[];
    sections.forEach((sec) => observer.observe(sec));
    return () => observer.disconnect();
  }, []);

  const handleJump = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      history.replaceState(null, "", `#${id}`);
      setActive(id);
    }
  };

  React.useEffect(() => {
    const hash = window.location.hash?.slice(1);
    if (hash) {
      const el = document.getElementById(hash);
      if (el) el.scrollIntoView({ behavior: "auto", block: "start" });
      setActive(hash);
    }
  }, []);

  return (
    <aside className="hidden lg:block sticky top-20 self-start z-40">
      <nav className={cn(cardBase, "p-4 w-56")}> 
        <div className="text-[11px] uppercase tracking-wider text-slate-500 mb-2">On this page</div>
        <ul className="space-y-1">
          {items.map((item) => {
            const isActive = active === item.id;
            return (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  onClick={(e) => handleJump(e, item.id)}
                  aria-current={isActive ? "true" : undefined}
                  className={cn(
                    "group flex w-full items-center gap-2 rounded-md px-2 py-1 text-xs leading-tight transition",
                    isActive
                      ? "bg-slate-900 text-white"
                      : "text-slate-700 hover:bg-slate-100"
                  )}
                >
                  <span className="truncate">{item.label}</span>
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}

// ====== PAGE ======
export default function Portfolio() {
  const [showExpandedProjects, setShowExpandedProjects] = useState(false);

  const visibleProjects = showExpandedProjects ? PROJECTS.slice(0, 6) : PROJECTS.slice(0, 3);

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 text-slate-900">
      {/* soft radial glow */}
      <div className="pointer-events-none absolute inset-0 -z-10 [mask-image:radial-gradient(60%_60%_at_50%_20%,black,transparent)]">
        <div className="absolute inset-x-0 top-[-20%] h-[40rem] bg-gradient-to-b from-blue-100/60 via-indigo-100/40 to-transparent" />
      </div>

      {/* NAVBAR */}
      <header className="sticky top-0 z-30 border-b border-slate-200/70 bg-white/70 backdrop-blur-md">
        <div className={cn(shell, "h-14 flex items-center justify-between")}> 
          <a href="#home" className="font-semibold tracking-tight">{SITE.name}</a>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            {[
              { href: "#about", label: "About" },
              { href: "#projects", label: "Projects" },
              { href: "#experience", label: "Experience" },
              { href: "#skills", label: "Skills" },
              { href: "#contact", label: "Contact" },
            ].map((x) => (
              <a key={x.href} href={x.href} className="text-slate-700 hover:text-slate-900">{x.label}</a>
            ))}
          </nav>
          <a
            href={SITE.links.resume}
            className={cn(
              "inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white/80 px-3 py-1.5 text-sm shadow-sm transition",
              "hover:shadow-md hover:-translate-y-0.5"
            )}
          >
            <FileText className="h-4 w-4" /> Resume
          </a>
        </div>
      </header>

      {/* BANNER */}
      <div className={cn(shell, "pt-6")}> 
        <div className="relative overflow-hidden rounded-2xl border border-slate-200/70 shadow-sm">
          <img src="/banner.jpg" alt="banner" className="h-[180px] w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-white/20 to-transparent" />
        </div>
      </div>

      {/* MAIN GRID */}
      <div className={cn(shell, "mt-8 lg:grid lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10")}> 
        <TableOfContents />

        <main id="home" className="min-w-0">
          {/* HERO */}
          <section className="relative">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="grid items-start gap-8 md:grid-cols-2"
            >
              <div>
                <h1 className="mb-2 text-3xl font-bold tracking-tight md:text-5xl">{SITE.headline}</h1>
                <p className="mb-4 text-slate-600">{SITE.tagline}</p>
                <p className="text-[17px] leading-relaxed text-slate-800">
                  Computer Science student at the University of Florida with experience in C++, Python, Java, and JavaScript. Strong foundation in algorithms, data structures, and system design. I’m passionate about building impactful software and continuously learning to solve problems. I’m actively seeking opportunities in software engineering, AI, data analysis, and IT-related fields. I hope to use my knowledge and skills to create technology that meaningfully contributes to society.
                </p>
                <div className="mt-5 flex flex-wrap items-center gap-3">
                  <span className={chip}>
                    <MapPin className="-mt-0.5 mr-1 h-3.5 w-3.5" /> {SITE.location}
                  </span>
                  <a href={SITE.links.github} className={cn(chip, "hover:shadow")}> <Github className="h-4 w-4 mr-1"/> GitHub</a>
                  <a href={SITE.links.linkedin} className={cn(chip, "hover:shadow")}> <Linkedin className="h-4 w-4 mr-1"/> LinkedIn</a>
                  <a href={`mailto:${SITE.links.email}`} className={cn(chip, "hover:shadow")}><Mail className="h-4 w-4 mr-1"/> Email</a>
                </div>
              </div>

              <div className="relative">
                {/* headshot */}
                <Card className="p-0 overflow-hidden">
                  <img src="/me.jpg" alt="Alex Liu" className="h-[260px] w-full object-cover" />
                </Card>

                {/* quick facts */}
                <Card className="mt-4">
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2"><Calendar className="mt-0.5 h-4 w-4"/> Available: Summer 2026 internships</li>
                    <li className="flex items-start gap-2"><Globe className="mt-0.5 h-4 w-4"/> Portfolio: {SITE.links.website || "https://portfolio-six-teal-77.vercel.app"}</li>
                    <li className="flex items-start gap-2"><Phone className="mt-0.5 h-4 w-4"/> {SITE.links.phone}</li>
                  </ul>

                  {/* education */}
                  <div className="mt-5">
                    <h4 className="text-base font-semibold">Education</h4>
                    <div className="mt-3 flex items-start justify-between gap-4">
                      <div>
                        <div className="text-sm font-semibold">University of Florida</div>
                        <div className="text-sm">B.S. in Computer Science (Minor in Geography) • GPA 3.80/4.00</div>
                        <div className="text-xs text-slate-600">2024 – 2028 (expected) • Dean's List</div>
                        <div className="text-xs text-slate-600">Activities: UF SASE, UF CASA</div>
                      </div>
                      <img src="/logos/uf_logo.png" alt="UF" className="h-6 w-auto object-contain opacity-90" />
                    </div>

                    <div className="mt-6 flex items-start justify-between gap-4">
                      <div>
                        <div className="text-sm font-semibold">Buchholz High School</div>
                        <div className="text-sm">GPA 4.79</div>
                        <div className="text-xs text-slate-600">2020 – 2024</div>
                        <div className="text-xs text-slate-600">Activities: Science Team, Math Team, Quiz Bowl</div>
                      </div>
                      <img src="/logos/buchholz_logo.png" alt="Buchholz" className="h-11 w-auto object-contain opacity-90" />
                    </div>
                  </div>
                </Card>
              </div>
            </motion.div>
          </section>

          {/* PROJECTS */}
          <Section id="projects" title="Projects">
            <div className="rounded-2xl border border-slate-200/70 bg-gradient-to-b from-amber-50/60 to-white/50 p-5">
              <div className="grid gap-6 md:grid-cols-2">
                {visibleProjects.map((p) => (
                  <motion.div key={p.name} layout transition={{ duration: 0.35 }}>
                    <Card>
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h3 className="text-lg font-semibold">{p.name}</h3>
                          <p className="mt-1 text-sm text-slate-600">{p.blurb}</p>
                          <p className="mt-2 text-sm"><span className="font-medium">Impact:</span> {p.impact}</p>
                          <div className="mt-3 flex flex-wrap gap-2">
                            {p.tech.map((t: string) => (
                              <span key={t} className={chip}>{t}</span>
                            ))}
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          {p.links.demo && (
                            <a href={p.links.demo} className="text-sm underline-offset-4 hover:underline inline-flex items-center gap-1"><ExternalLink className="h-4 w-4"/> Demo</a>
                          )}
                          {p.links.code && (
                            <a href={p.links.code} className="text-sm underline-offset-4 hover:underline inline-flex items-center gap-1"><Code2 className="h-4 w-4"/> Code</a>
                          )}
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>

              <div className="mt-6 flex justify-end">
                <motion.button
                  whileTap={{ scale: 0.96 }}
                  transition={{ duration: 0.2 }}
                  onClick={() => setShowExpandedProjects((v) => !v)}
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white/80 px-4 py-2 text-sm shadow-sm transition hover:shadow-md"
                >
                  {showExpandedProjects ? (<><ChevronUp className="h-4 w-4"/> Show less</>) : (<><ChevronDown className="h-4 w-4"/> Expand more</>)}
                </motion.button>
              </div>
            </div>
          </Section>

          {/* EXPERIENCE */}
          <Section id="experience" title="Experience">
            <motion.div layout className="space-y-4">
              {EXPERIENCE.map((x, i) => (
                <motion.div key={i} layout transition={{ duration: 0.35 }}>
                  <Card>
                    <div className="flex items-start gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 text-sm text-slate-600">
                          <Briefcase className="h-4 w-4" />
                          {x.link ? (
                            <a href={x.link} target="_blank" className="underline underline-offset-2 hover:text-slate-900">{x.org}</a>
                          ) : (
                            x.org
                          )}
                        </div>
                        <h3 className="mt-1 text-lg font-semibold">{x.role}</h3>
                        <div className="mt-1 text-sm text-slate-600">{x.period} • {x.location}</div>
                        <ul className="ml-5 mt-3 list-disc space-y-1 text-sm">
                          {x.bullets.map((b, j) => <li key={j}>{b}</li>)}
                        </ul>
                      </div>
                      {x.logo && (
                        <img src={x.logo} alt={x.org} className="h-[82px] w-[82px] object-contain opacity-95" />
                      )}
                    </div>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </Section>

          {/* VOLUNTEER */}
          <Section id="volunteer" title="Volunteer">
            <motion.div layout className="space-y-4">
              {VOLUNTEER.map((x, i) => (
                <motion.div key={i} layout transition={{ duration: 0.35 }}>
                  <Card>
                    <div className="flex items-start gap-4">
                      <div className="flex-1">
                        <div className="text-sm text-slate-600">
                          {x.link ? (
                            <a href={x.link} target="_blank" className="underline underline-offset-2 hover:text-slate-900">{x.org}</a>
                          ) : (
                            x.org
                          )}
                        </div>
                        <h3 className="mt-1 text-lg font-semibold">{x.role}</h3>
                        <div className="mt-1 text-sm text-slate-600">{x.period}</div>
                        <ul className="ml-5 mt-3 list-disc space-y-1 text-sm">
                          {x.bullets.map((b, j) => <li key={j}>{b}</li>)}
                        </ul>
                      </div>
                      {x.logo && (
                        <img src={x.logo} alt={x.org} className="h-[82px] w-[82px] object-contain opacity-95" />
                      )}
                    </div>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </Section>

          {/* LEADERSHIPS */}
          <Section id="leaderships" title="Leaderships">
            <motion.div layout className="space-y-4">
              {LEADERSHIPS.map((x, i) => (
                <motion.div key={i} layout transition={{ duration: 0.35 }}>
                  <Card>
                    <div className="flex items-start gap-4">
                      <div className="flex-1">
                        <div className="text-sm text-slate-600">
                          {x.link ? (
                            <a href={x.link} target="_blank" className="underline underline-offset-2 hover:text-slate-900">{x.org}</a>
                          ) : (
                            x.org
                          )}
                        </div>
                        <h3 className="mt-1 text-lg font-semibold">{x.role}</h3>
                        <div className="mt-1 text-sm text-slate-600">{x.period}</div>
                        <ul className="ml-5 mt-3 list-disc space-y-1 text-sm">
                          {x.bullets.map((b, j) => <li key={j}>{b}</li>)}
                        </ul>
                      </div>
                      {x.logo && (
                        <img src={x.logo} alt={x.org} className="h-[82px] w-[82px] object-contain opacity-95" />
                      )}
                    </div>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </Section>

          {/* SKILLS */}
          <Section id="skills" title="Skills">
            <div className="grid gap-6 md:grid-cols-2">
              {SKILLS.map((g) => (
                <Card key={g.group}>
                  <h3 className="font-medium">{g.group}</h3>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {g.items.map((s: string) => (
                      <span key={s} className={chip}>{s}</span>
                    ))}
                  </div>
                </Card>
              ))}
            </div>
          </Section>

          {/* ABOUT */}
          <Section id="about" title="About">
            <div className="grid items-start gap-6 md:grid-cols-3">
              <div className="md:col-span-2">
                <p className="leading-relaxed text-slate-700">{ABOUT.blurb}</p>
                <ul className="ml-5 mt-4 list-disc space-y-1 text-slate-800">
                  {ABOUT.highlights.map((h, i) => (
                    <li key={i}>{h}</li>
                  ))}
                </ul>
                <div className="mt-6 flex flex-wrap gap-4 text-sm">
                  <a href={SITE.links.github} className="inline-flex items-center gap-2 underline-offset-4 hover:underline"><Github className="h-4 w-4"/> GitHub</a>
                  <a href={SITE.links.linkedin} className="inline-flex items-center gap-2 underline-offset-4 hover:underline"><Linkedin className="h-4 w-4"/> LinkedIn</a>
                  <a href={`mailto:${SITE.links.email}`} className="inline-flex items-center gap-2 underline-offset-4 hover:underline"><Mail className="h-4 w-4"/> Email</a>
                  <a href={SITE.links.resume} className="inline-flex items-center gap-2 underline-offset-4 hover:underline"><FileText className="h-4 w-4"/> Resume</a>
                </div>
              </div>
            </div>
          </Section>

          {/* CONTACT */}
          <Section id="contact" title="Contact">
            <Card>
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <h3 className="font-medium">Let’s connect</h3>
                  <p className="mt-2 text-slate-700">{CONTACT.note}</p>
                  <div className="mt-4 flex flex-wrap gap-3 text-sm">
                    <a href={`mailto:${SITE.links.email}`} className={cn(chip, "hover:shadow")}><Mail className="h-4 w-4 mr-1"/> Email me</a>
                    <a href={SITE.links.linkedin} className={cn(chip, "hover:shadow")}><Linkedin className="h-4 w-4 mr-1"/> LinkedIn</a>
                    <a href={SITE.links.github} className={cn(chip, "hover:shadow")}><Github className="h-4 w-4 mr-1"/> GitHub</a>
                  </div>
                </div>
                <div className="text-sm text-slate-600">
                  <p><span className="font-medium">Email:</span> {SITE.links.email}</p>
                  <p className="mt-1"><span className="font-medium">Location:</span> {SITE.location}</p>
                  <p className="mt-1"><span className="font-medium">GitHub:</span> {SITE.links.github}</p>
                  <p className="mt-1"><span className="font-medium">LinkedIn:</span> {SITE.links.linkedin}</p>
                  {SITE.links.website && (
                    <p className="mt-1"><span className="font-medium">Website:</span> {SITE.links.website}</p>
                  )}
                  <p className="mt-1"><span className="font-medium">Phone:</span> {SITE.links.phone}</p>
                </div>
              </div>
            </Card>
          </Section>

          {/* FOOTER */}
          <footer className="mt-10 border-t border-slate-200/70 py-10">
            <div className={cn(shell, "text-sm text-slate-500")}>
              © {new Date().getFullYear()} {SITE.name}. All rights reserved.
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
}
