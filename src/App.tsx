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
  GraduationCap,
  Globe,
  Phone,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

// ====== DATA ======
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
    //tech: ["Coordination"],
    logo: "/logos/jiating_logo.jpg", 
    link:"https://jiatingliondragon.com/"
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
    //tech: ["Teaching, Curriculum"],
    link: "http://www.logiclabgainesville.com/"
  },
];

const PROJECTS = [
  {
    name: "Grade Track",
    blurb: "Full-stack web app to visualize student performance with interactive charts.",
    impact:
      "Dockerized dev makes setup 85% faster; processes CSVs to surface trends in seconds.",
    tech: ["Flask, React, SQLAlchem, PostgreSQL, Docker"],
    links: { demo: "", code: "https://github.com/heimweh17/Grade-Track" },
  },
  {
    name: "Ability Bridge",
    blurb:
      "Assistive tech toolkit: head-pose cursor, mouth-Morse typing, blink/eyebrow clicks.",
    impact:
      "Real-time CV at ~30 FPS with <100ms latency; improves accessibility for hands-free use.",
    tech: ["Python, OpenCV, MediaPipe, PyAutoGUI"],
    links: { demo: "", code: "https://github.com/heimweh17/Ability-Bridge" },
  },
  {
    name: "Minesweeper (SFML)",
    blurb:
      "Interactive C++ Minesweeper with recursive reveal, flags, pause/debug, timer, leaderboard.",
    impact: "350+ tiles; persistent top-5 scores via file I/O; modular OOP design.",
    tech: ["C++, SFML"],
    links: { demo: "", code: "https://github.com/heimweh17/Minesweeper-game" },
  },
  {
    name: "Bin Packing: Best-Fit vs First-Fit",
    blurb:
      "Algorithmic comparison processing 100k+ rectangles to quantify runtime and space trade-offs.",
    impact:
      "Object-oriented placement framework streamlines experimentation and metrics.",
    tech: ["C++"],
    links: { demo: "", code: "https://github.com/heimweh17/best-fit-fitst-fit" },
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
const Section = ({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) => (
  <section id={id} className="max-w-5xl mx-auto px-4 sm:px-6 md:px-8 py-16">
    <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-8">
      {title}
    </h2>
    {children}
  </section>
);

const Card = ({ children }: { children: React.ReactNode }) => (
  <div className="rounded-2xl shadow-sm border border-gray-200 p-5 hover:shadow-md transition">
    {children}
  </div>
);

const Badge = ({ children }: { children: React.ReactNode }) => (
  <span className="text-sm px-2 py-1 rounded-full border border-gray-300">
    {children}
  </span>
);

const LinkIcon = ({
  href,
  label,
  Icon,
}: {
  href: string;
  label: string;
  Icon: React.ElementType;
}) => (
  <a
    href={href}
    className="inline-flex items-center gap-2 text-sm underline-offset-4 hover:underline"
    aria-label={label}
  >
    <Icon className="w-4 h-4" />
    <span className="hidden sm:inline">{label}</span>
  </a>
);

// ====== PAGE ======
export default function Portfolio() {
  const [showExpandedProjects, setShowExpandedProjects] = useState(false);
  const [showAllExperience, setShowAllExperience] = useState(false);

  const visibleProjects = showExpandedProjects
    ? PROJECTS.slice(0, 4)
    : PROJECTS.slice(0, 3);
  const visibleExperience = showAllExperience
    ? EXPERIENCE
    : EXPERIENCE.slice(0, 2);

  return (
    <>
      <div className="font-sans antialiased">
        {/* NAVBAR */}
        <header className="sticky top-0 z-30 backdrop-blur bg-white/70 border-b border-gray-100">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-8 h-14 flex items-center justify-between">
            <a href="#home" className="font-semibold">
              {SITE.name}
            </a>
            <nav className="hidden md:flex items-center gap-6 text-sm">
              <a href="#about" className="hover:underline">
                About
              </a>
              <a href="#projects" className="hover:underline">
                Projects
              </a>
              <a href="#experience" className="hover:underline">
                Experience
              </a>
              <a href="#skills" className="hover:underline">
                Skills
              </a>
              
              <a href="#contact" className="hover:underline">
                Contact
              </a>
            </nav>
            <div className="flex items-center gap-3">
              <a
                href={SITE.links.resume}
                className="text-sm inline-flex items-center gap-2 border rounded-xl px-3 py-1.5 hover:shadow-sm"
              >
                <FileText className="w-4 h-4" /> Resume
              </a>
            </div>
          </div>
        </header>

        {/* HERO */}
        <section
          id="home"
          className="max-w-5xl mx-auto px-4 sm:px-6 md:px-8 py-16 md:py-24"
        >
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="grid md:grid-cols-2 gap-8 items-center"
          >
            <div>
              <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
                {SITE.headline}
              </h1>
              <p className="text-gray-600 mb-6">{SITE.tagline}</p>
              <p className="text-gray-800 mt-4 leading-relaxed text-[25px] md:text-[25px]">
  Computer Science student at the University of Florida with experience in C++, Python, Java, and JavaScript. Strong foundation in algorithms, data structures, and system design. I’m passionate about building impactful software and continuously learning to solve problems. I’m actively seeking opportunities in software engineering, AI, data analysis, and IT-related fields. I hope to use my knowledge and skills to create technology that meaningfully contributes to society.
</p>

              <div className="flex flex-wrap items-center gap-4">
                <Badge>
                  <MapPin className="w-3.5 h-3.5 inline -mt-1 mr-1" />{" "}
                  {SITE.location}
                </Badge>
                <a
                  href={SITE.links.github}
                  className="inline-flex items-center gap-2 border rounded-xl px-3 py-1.5 text-sm"
                >
                  <Github className="w-4 h-4" /> GitHub
                </a>
                <a
                  href={SITE.links.linkedin}
                  className="inline-flex items-center gap-2 border rounded-xl px-3 py-1.5 text-sm"
                >
                  <Linkedin className="w-4 h-4" /> LinkedIn
                </a>
                <a
                  href={`mailto:${SITE.links.email}`}
                  className="inline-flex items-center gap-2 border rounded-xl px-3 py-1.5 text-sm"
                >
                  <Mail className="w-4 h-4" /> Email
                </a>
              </div>
            </div>
            <div className="border rounded-2xl p-6">
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-3">
                  <Calendar className="w-4 h-4 mt-0.5" /> Available: Summer 2026
                  internships
                </li>
                <li className="flex items-start gap-3">
                  <Globe className="w-4 h-4 mt-0.5" /> Portfolio:{" "}
                  {SITE.links.website || "(add a domain)"}
                </li>
                <li className="flex items-start gap-3">
                  <Phone className="w-4 h-4 mt-0.5" /> {SITE.links.phone}
                </li>
                
              </ul>
              <div className="border rounded-2xl p-5">
  <div className="text-sm text-gray-600">
    <h4
    className="mr-1 text-base leading-none font-[700] inline-block"
    style={{ fontWeight: 700 }}
  >
    Education
  </h4>
  </div>

  <div className="flex items-start justify-between mt-1">
    <div className="font-medium">
      <div className="flex items-center gap-2">
        <strong
    className="mr-1 text-base leading-none font-[700] inline-block"
    style={{ fontWeight: 700 }}
  >
    University of Florida
  </strong>
      </div>
      <div className="text-sm mt-1">B.S. in Computer Science (Minor in Geography) • GPA 3.80/4.00</div>
      <div className="text-sm text-gray-600">2024 – 2028 (expected) • Dean's List</div>
    </div>
    <img
      src="/logos/uf_logo.png"
      alt="UF"
      className="w-8 h-8 object-contain opacity-90"
      
    />
  </div>
</div>
</div>
          </motion.div>
        </section>

        {/* PROJECTS */}
<Section id="projects" title="Projects">
  <div className="grid md:grid-cols-2 gap-6">
    {visibleProjects.map((p) => (
      <motion.div key={p.name} layout transition={{ duration: 0.35 }}>
        <Card>
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-lg font-semibold">{p.name}</h3>
              <p className="text-sm text-gray-600 mt-1">{p.blurb}</p>
              <p className="text-sm mt-2"><span className="font-medium">Impact:</span> {p.impact}</p>
              <div className="mt-3 flex flex-wrap items-center gap-2">
  <strong
    className="mr-1 text-base leading-none font-[700] inline-block"
    style={{ fontWeight: 700 }}
  >
    Skills:
  </strong>
  {p.tech}
</div>

            </div>
            <div className="flex flex-col items-end gap-2">
              {p.links.demo && (
                <a href={p.links.demo} className="inline-flex items-center gap-2 text-sm underline-offset-4 hover:underline"><ExternalLink className="w-4 h-4"/> Demo</a>
              )}
              {p.links.code && (
                <a href={p.links.code} className="inline-flex items-center gap-2 text-sm underline-offset-4 hover:underline"><Code2 className="w-4 h-4"/> Code</a>
              )}
            </div>
          </div>
        </Card>
      </motion.div>
    ))}
  </div>

  <div className="mt-6 flex justify-end">
    <motion.button
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.25 }}
      onClick={() => setShowExpandedProjects(v => !v)}
      className="text-sm border rounded-xl px-4 py-2 hover:shadow-sm inline-flex items-center gap-2"
    >
      {showExpandedProjects ? (<><ChevronUp className="w-4 h-4"/> Show less</>) : (<><ChevronDown className="w-4 h-4"/> Expand more</>)}
    </motion.button>
  </div>
</Section>


        {/* EXPERIENCE */}
<Section id="experience" title="Experience">
  <motion.div layout className="space-y-4">
    {EXPERIENCE.map((x, i) => (
      <motion.div key={i} layout transition={{ duration: 0.35 }}>
        <Card>
          <div className="flex items-start gap-3">
            <div className="flex-1">
              <div className="flex items-center gap-2 text-sm text-gray-600">
  <Briefcase className="w-4 h-4"/>
  {x.link ? (
    <a href={x.link} target="_blank" className="underline underline-offset-2 hover:text-gray-900">
      {x.org}
    </a>
  ) : (
    x.org
  )}
</div>
              <h3 className="text-lg font-semibold mt-1">{x.role}</h3>
              <div className="text-sm text-gray-600 mt-1">{x.period} • {x.location}</div>
              <ul className="list-disc ml-5 mt-3 space-y-1 text-sm">
                {x.bullets.map((b, j) => <li key={j}>{b}</li>)}
              </ul>
              
            </div>
              {x.logo && (
              <img
              src={x.logo}
            alt={x.org}
            className="object-contain opacity-120"
            style={{ width: "167px", height: "167px" }}
            />
          )}
          </div>
        </Card>
      </motion.div>
    ))}
  </motion.div>
</Section>


        {/* SKILLS */}
        <Section id="skills" title="Skills">
          <div className="grid md:grid-cols-2 gap-6">
            {SKILLS.map((g) => (
              <Card key={g.group}>
                <h3 className="font-medium">{g.group}</h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {g.items.map((s: string) => (
                    <Badge key={s}>{s}</Badge>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </Section>

        {/* ABOUT */}
        <Section id="about" title="About">
          <div className="grid md:grid-cols-3 gap-6 items-start">
            <div className="md:col-span-2">
              <p className="text-gray-700 leading-relaxed">{ABOUT.blurb}</p>
              <ul className="list-disc ml-5 mt-4 space-y-1 text-gray-800">
                {ABOUT.highlights.map((h, i) => (
                  <li key={i}>{h}</li>
                ))}
              </ul>
              <div className="mt-6 flex flex-wrap gap-4">
                <LinkIcon href={SITE.links.github} label="GitHub" Icon={Github} />
                <LinkIcon href={SITE.links.linkedin} label="LinkedIn" Icon={Linkedin} />
                <LinkIcon href={`mailto:${SITE.links.email}`} label="Email" Icon={Mail} />
                <LinkIcon href={SITE.links.resume} label="Resume" Icon={FileText} />
              </div>
            </div>
            
          </div>
        </Section>

        {/* CONTACT */}
        <Section id="contact" title="Contact">
          <Card>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium">Let’s connect</h3>
                <p className="text-gray-700 mt-2">{CONTACT.note}</p>
                <div className="mt-4 flex flex-wrap gap-3">
                  <a
                    href={`mailto:${SITE.links.email}`}
                    className="inline-flex items-center gap-2 border rounded-xl px-3 py-1.5 text-sm"
                  >
                    <Mail className="w-4 h-4" /> Email me
                  </a>
                  <a
                    href={SITE.links.linkedin}
                    className="inline-flex items-center gap-2 border rounded-xl px-3 py-1.5 text-sm"
                  >
                    <Linkedin className="w-4 h-4" /> LinkedIn
                  </a>
                  <a
                    href={SITE.links.github}
                    className="inline-flex items-center gap-2 border rounded-xl px-3 py-1.5 text-sm"
                  >
                    <Github className="w-4 h-4" /> GitHub
                  </a>
                </div>
              </div>
              <div className="text-sm text-gray-600">
                <p>
                  <span className="font-medium">Email:</span> {SITE.links.email}
                </p>
                <p className="mt-1">
                  <span className="font-medium">Location:</span> {SITE.location}
                </p>
                <p className="mt-1">
                  <span className="font-medium">GitHub:</span> {SITE.links.github}
                </p>
                <p className="mt-1">
                  <span className="font-medium">LinkedIn:</span> {SITE.links.linkedin}
                </p>
                {SITE.links.website && (
                  <p className="mt-1">
                    <span className="font-medium">Website:</span> {SITE.links.website}
                  </p>
                )}
                <p className="mt-1">
                  <span className="font-medium">Phone:</span> {SITE.links.phone}
                </p>
              </div>
            </div>
          </Card>
        </Section>

        {/* FOOTER */}
        <footer className="py-12 border-t border-gray-100">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-8 text-sm text-gray-500">
            © {new Date().getFullYear()} {SITE.name}. All rights reserved.
          </div>
        </footer>
      </div>
    </>
  );
}
