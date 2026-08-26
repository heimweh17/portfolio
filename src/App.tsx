import { motion } from "framer-motion";
import {
  ArrowRight,
  Briefcase,
  Camera,
  Code2,
  ExternalLink,
  FileText,
  Github,
  Globe,
  GraduationCap,
  Heart,
  Linkedin,
  Mail,
  MapPin,
  Server,
  ShieldCheck,
  Wrench,
} from "lucide-react";

type Project = {
  name: string;
  subtitle: string;
  summary: string;
  highlights: string[];
  stack: string[];
  links: {
    code?: string;
    demo?: string;
  };
};

type Experience = {
  role: string;
  organization: string;
  period: string;
  location: string;
  description: string;
  bullets: string[];
  tags: string[];
};

type SectionLink = {
  label: string;
  href: string;
};

const site = {
  name: "Alex Liu",
  title: "Computer Science Student",
  subtitle:
    "University of Florida student focused on software engineering, data systems, and geospatial problem-solving.",
  location: "Gainesville, Florida",
  availability: "Open to internship, research, and engineering opportunities.",
  resume: "/resume.pdf",
  github: "https://github.com/heimweh17",
  linkedin: "https://www.linkedin.com/in/alex-liu7/",
  email: "haozhouliu17@gmail.com",
  chinese: "/zh",
  photos: "/photos",
};

const sectionLinks: SectionLink[] = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

const highlights = [
  "Building full-stack tools that turn messy data into usable interfaces",
  "Combining GIS, analytics, and systems thinking in real-world contexts",
  "Comfortable moving between product-facing code and operational workflows",
];

const experience: Experience[] = [
  {
    role: "Operational Engineering Intern",
    organization: "Database Mart",
    period: "May 2026 - Jul 2026",
    location: "Kansas City, Missouri",
    description:
      "Worked across the physical server lifecycle in a production hosting environment, supporting bare-metal provisioning, hardware maintenance, and data-center deployment.",
    bullets: [
      "Assembled, configured, and provisioned custom bare-metal servers for customer workloads, including GPU and storage-heavy systems.",
      "Handled ongoing maintenance requests on production machines, including hardware swaps, boot and BIOS issues, thermal checks, and connectivity troubleshooting.",
      "Supported data-center rack deployment, cabling, IPMI/BMC configuration, and post-build validation before customer handoff.",
      "Built a FreeDOS-based BIOS update workflow for Supermicro systems with hardware detection, firmware mapping, version checks, and safe-skip logic.",
    ],
    tags: ["Server Operations", "Hardware", "Data Center", "IPMI/BMC"],
  },
  {
    role: "Research Assistant",
    organization: "UF GeoPlan Center",
    period: "Apr 2026 - May 2026; Aug 2026 - Present",
    location: "Gainesville, Florida",
    description:
      "Contribute to transportation-safety data work involving crash-record review, geocoding, roadway classification, and quality control in a real public-safety data environment.",
    bullets: [
      "Reviewed Florida traffic crash records by combining narrative, diagram, and map context to assign accurate location and roadway classifications.",
      "Performed geocoding, roadway-system tagging, and QA/QC for structured crash datasets used in transportation analysis workflows.",
      "Developed lightweight internal tooling and automation-assisted validation workflows to streamline repetitive review steps and improve consistency.",
    ],
    tags: ["GIS", "Data Quality", "Geocoding", "Transportation Safety"],
  },
  {
    role: "SASE Intern",
    organization: "UF Society of Asian Scientists & Engineers",
    period: "Aug 2025 - Present",
    location: "Gainesville, Florida",
    description:
      "Help organize professional programming and member-facing events for a growing technical student community.",
    bullets: [
      "Supported event logistics and member communication for professional development events serving 100+ attendees.",
      "Worked with student leaders to improve the quality and consistency of chapter programming.",
    ],
    tags: ["Student Leadership", "Operations"],
  },
];

const projects: Project[] = [
  {
    name: "GeoDashboard",
    subtitle: "Distributed Geospatial Analytics Platform",
    summary:
      "A full-stack geospatial platform that combines interactive mapping, deterministic spatial processing, and AI-assisted interpretation.",
    highlights: [
      "Designed a multi-service architecture separating core GIS computation from AI inference for cleaner scaling and deployment.",
      "Implemented DBSCAN-based spatial analysis and interactive visualization for city-scale datasets.",
      "Added request tracing, containerized deployment, and CI/CD workflows to support production-style iteration.",
    ],
    stack: ["React", "TypeScript", "FastAPI", "PostGIS", "Docker", "AWS"],
    links: {
      demo: "https://thegeodashboard.vercel.app/",
      code: "https://github.com/heimweh17/Geo-Dashboard",
    },
  },
  {
    name: "SwampGuard",
    subtitle: "Policy-Aware Claims Intelligence Prototype",
    summary:
      "An AI-assisted claims workflow that analyzes damage photos and uploaded documents to produce structured claim guidance and cost estimates.",
    highlights: [
      "Built a multimodal pipeline for combining photo analysis, document extraction, and structured outputs.",
      "Generated itemized estimates and explainable claim guidance with policy-aware calculations.",
      "Focused on making results understandable rather than treating AI output as a black box.",
    ],
    stack: ["React", "FastAPI", "Python", "Pydantic", "RAG"],
    links: {
      code: "https://github.com/heimweh17/SwampGuard",
    },
  },
  {
    name: "UF Health SmartScribe",
    subtitle: "Real-Time Clinical Documentation Prototype",
    summary:
      "Hackathon project for turning patient conversations into structured SOAP-style medical notes through a streaming pipeline.",
    highlights: [
      "Connected live transcription, speaker separation, and structured note generation into one workflow.",
      "Built for fast turnaround and practical usability under hackathon constraints.",
      "Stored encounter data with a relational backend to support retrieval and iteration.",
    ],
    stack: ["Node.js", "Supabase", "Deepgram", "Gemini API"],
    links: {
      code: "https://github.com/heimweh17/SmartScribe",
    },
  },
  {
    name: "Ability Bridge",
    subtitle: "Hands-Free Accessibility Interface",
    summary:
      "Computer-vision accessibility tool that uses facial movement and gesture signals as an input system.",
    highlights: [
      "Translated head pose, blink behavior, and mouth movement into cursor and text-entry controls.",
      "Applied smoothing and filtering to reduce jitter and improve stability during real-time use.",
      "Explored HCI and accessibility through a concrete, testable interaction model.",
    ],
    stack: ["Python", "OpenCV", "MediaPipe"],
    links: {
      code: "https://github.com/heimweh17/Ability-Bridge",
    },
  },
  {
    name: "Grade Track",
    subtitle: "Academic Analytics Dashboard",
    summary:
      "A full-stack dashboard for turning exported grade data into clear statistical views and class-level trends.",
    highlights: [
      "Built a backend ingestion flow for transforming raw CSV exports into structured analysis.",
      "Created interactive charts for distribution and performance review.",
      "Used containerization to simplify setup and keep environments consistent.",
    ],
    stack: ["Flask", "React", "PostgreSQL", "Docker"],
    links: {
      code: "https://github.com/heimweh17/Grade-Track",
    },
  },
  {
    name: "Selected C++ Coursework Projects",
    subtitle: "Algorithms and Data Structures",
    summary:
      "A set of smaller systems and algorithm projects including AVL trees, bin-packing analysis, and an SFML-based Minesweeper implementation.",
    highlights: [
      "Practiced building data structures from scratch and reasoning about runtime tradeoffs.",
      "Used course projects as a place to strengthen implementation discipline and testing habits.",
    ],
    stack: ["C++", "SFML", "Algorithms", "Data Structures"],
    links: {
      code: "https://github.com/heimweh17",
    },
  },
];

const skillGroups = [
  {
    title: "Languages",
    items: ["C++", "Python", "TypeScript", "SQL", "Java"],
  },
  {
    title: "Frameworks & Libraries",
    items: ["React", "FastAPI", "Flask", "Node.js", "Tailwind CSS"],
  },
  {
    title: "Data, Cloud & Tooling",
    items: ["PostgreSQL", "Docker", "GitHub Actions", "AWS", "GIS / OpenStreetMap"],
  },
];

const additional = [
  "Volunteer mapper for OpenStreetMap since September 2020",
  "Event committee member for UF Chinese American Student Association",
  "Personal interests include photography, mapping, and sports like badminton and pickleball",
];

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function Section({
  id,
  eyebrow,
  title,
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-28">
      <div className="mb-8">
        <div className="text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-sky-700/80">
          {eyebrow}
        </div>
        <h2 className="mt-3 font-['Georgia','Times_New_Roman',serif] text-3xl text-slate-900 md:text-4xl">
          {title}
        </h2>
      </div>
      {children}
    </section>
  );
}

function Surface({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "rounded-[28px] border border-sky-100 bg-white/78 shadow-[0_24px_60px_rgba(43,74,110,0.08)] backdrop-blur",
        className,
      )}
    >
      {children}
    </div>
  );
}

function LinkPill({
  href,
  label,
  primary = false,
  icon: Icon,
}: {
  href: string;
  label: string;
  primary?: boolean;
  icon?: typeof Mail;
}) {
  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noreferrer" : undefined}
      className={cn(
        "inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm transition",
        primary
          ? "bg-slate-900 text-white hover:bg-slate-800"
          : "border border-sky-200 bg-white/80 text-slate-700 hover:border-sky-300 hover:text-slate-900",
      )}
    >
      {Icon ? <Icon className="h-4 w-4" /> : null}
      <span>{label}</span>
    </a>
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-[#f8f5ed] text-slate-800 selection:bg-sky-100">
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(218,234,248,0.95),transparent_40%),radial-gradient(circle_at_top_right,rgba(194,220,243,0.7),transparent_30%),linear-gradient(180deg,#fbfaf5_0%,#f4f0e6_100%)]" />
        <div className="absolute left-[8%] top-24 h-72 w-72 rounded-full bg-sky-100/60 blur-3xl" />
        <div className="absolute right-[10%] top-[18rem] h-80 w-80 rounded-full bg-blue-100/50 blur-3xl" />
      </div>

      <header className="sticky top-0 z-30 border-b border-sky-100/80 bg-[#f8f5ed]/88 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <a href="/" className="font-['Georgia','Times_New_Roman',serif] text-xl text-slate-900">
            Alex Liu
          </a>
          <nav className="hidden items-center gap-6 md:flex">
            {sectionLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-sm text-slate-600 transition hover:text-slate-900"
              >
                {item.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <a
              href={site.github}
              target="_blank"
              rel="noreferrer"
              className="hidden text-slate-600 transition hover:text-slate-900 sm:block"
              aria-label="GitHub"
            >
              <Github className="h-5 w-5" />
            </a>
            <a
              href={site.linkedin}
              target="_blank"
              rel="noreferrer"
              className="hidden text-slate-600 transition hover:text-slate-900 sm:block"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-5 w-5" />
            </a>
            <LinkPill href={site.resume} label="Resume" primary icon={FileText} />
          </div>
        </div>
      </header>

      <main className="mx-auto flex max-w-6xl flex-col gap-24 px-6 pb-20 pt-12 md:pt-20">
        <section className="grid gap-10 lg:grid-cols-[1.4fr_0.9fr] lg:items-start">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
          >
            <div className="mb-5 inline-flex items-center rounded-full border border-sky-200 bg-white/70 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.22em] text-sky-800">
              English Portfolio
            </div>
            <h1 className="max-w-3xl font-['Georgia','Times_New_Roman',serif] text-5xl leading-[1.05] text-slate-900 md:text-7xl">
              Clean software, grounded projects, and real-world technical work.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
              {site.subtitle}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <LinkPill href="#experience" label="View Experience" primary icon={Briefcase} />
              <LinkPill href={site.resume} label="Open Resume" icon={FileText} />
              <LinkPill href={site.chinese} label="中文页面" icon={Globe} />
            </div>
            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {highlights.map((item) => (
                <Surface key={item} className="p-5">
                  <p className="text-sm leading-6 text-slate-700">{item}</p>
                </Surface>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08, duration: 0.55 }}
            className="lg:sticky lg:top-28"
          >
            <Surface className="overflow-hidden">
              <div className="border-b border-sky-100 p-7">
                <img
                  src="/me.jpg"
                  alt="Alex Liu"
                  className="h-24 w-24 rounded-3xl object-cover"
                />
                <h2 className="mt-5 text-2xl font-semibold text-slate-900">{site.name}</h2>
                <p className="mt-2 text-sm leading-6 text-slate-600">{site.title}</p>
              </div>
              <div className="space-y-4 p-7 text-sm text-slate-700">
                <div className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-4 w-4 text-sky-800" />
                  <span>{site.location}</span>
                </div>
                <div className="flex items-start gap-3">
                  <ShieldCheck className="mt-0.5 h-4 w-4 text-sky-800" />
                  <span>{site.availability}</span>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="mt-0.5 h-4 w-4 text-sky-800" />
                  <a href={`mailto:${site.email}`} className="hover:text-slate-900">
                    {site.email}
                  </a>
                </div>
              </div>
            </Surface>
          </motion.div>
        </section>

        <Section id="about" eyebrow="About" title="A more focused overview">
          <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
            <Surface className="p-7 md:p-8">
              <div className="space-y-5 text-[1.02rem] leading-8 text-slate-700">
                <p>
                  I am a Computer Science student at the University of Florida with a strong interest in
                  software engineering, geospatial systems, and practical tools that make complex data easier
                  to use.
                </p>
                <p>
                  The projects I care about most usually sit between code and context: mapping platforms,
                  analytics dashboards, internal workflows, and interfaces that help people make sense of
                  messy information.
                </p>
                <p>
                  I am especially drawn to work that feels real outside the classroom, whether that means
                  supporting production infrastructure, working with public-safety data, or building products
                  with clear user impact.
                </p>
              </div>
            </Surface>

            <Surface className="p-7 md:p-8">
              <div className="flex items-center gap-3 text-slate-900">
                <GraduationCap className="h-5 w-5 text-sky-800" />
                <h3 className="text-lg font-semibold">Education</h3>
              </div>
              <div className="mt-5 space-y-5">
                <div>
                  <div className="text-base font-semibold text-slate-900">University of Florida</div>
                  <div className="mt-1 text-sm text-slate-600">
                    B.S. in Computer Science, expected 2028
                  </div>
                  <div className="mt-2 text-sm text-slate-600">Geography minor with GIS-focused coursework</div>
                </div>
                <div className="rounded-2xl bg-sky-50/70 p-4 text-sm leading-6 text-slate-700">
                  Areas I keep returning to: systems, backend logic, geospatial workflows, data quality, and
                  clean frontend presentation.
                </div>
              </div>
            </Surface>
          </div>
        </Section>

        <Section id="experience" eyebrow="Experience" title="Work that feels real">
          <div className="space-y-6">
            {experience.map((item, index) => (
              <motion.div
                key={`${item.organization}-${item.role}`}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: index * 0.08, duration: 0.45 }}
              >
                <Surface className="p-7 md:p-8">
                  <div className="flex flex-col gap-5 lg:flex-row lg:justify-between">
                    <div className="max-w-3xl">
                      <div className="flex items-center gap-3">
                        <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-sky-100 text-sky-900">
                          {index === 0 ? (
                            <Server className="h-5 w-5" />
                          ) : index === 1 ? (
                            <MapPin className="h-5 w-5" />
                          ) : (
                            <Heart className="h-5 w-5" />
                          )}
                        </span>
                        <div>
                          <h3 className="text-xl font-semibold text-slate-900">{item.role}</h3>
                          <p className="text-sm text-slate-600">{item.organization}</p>
                        </div>
                      </div>
                      <p className="mt-5 text-base leading-7 text-slate-700">{item.description}</p>
                      <ul className="mt-5 space-y-3 text-sm leading-7 text-slate-700">
                        {item.bullets.map((bullet) => (
                          <li key={bullet} className="flex gap-3">
                            <span className="mt-3 h-1.5 w-1.5 rounded-full bg-sky-700" />
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="lg:w-56">
                      <div className="text-sm font-medium text-slate-900">{item.period}</div>
                      <div className="mt-1 text-sm text-slate-600">{item.location}</div>
                      <div className="mt-5 flex flex-wrap gap-2">
                        {item.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full bg-sky-50 px-3 py-1 text-xs font-medium text-sky-900"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </Surface>
              </motion.div>
            ))}
          </div>
        </Section>

        <Section id="projects" eyebrow="Projects" title="Selected technical projects">
          <div className="grid gap-6 lg:grid-cols-2">
            {projects.map((project, index) => (
              <motion.div
                key={project.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: index * 0.05, duration: 0.4 }}
              >
                <Surface className="flex h-full flex-col p-7">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-xl font-semibold text-slate-900">{project.name}</h3>
                      <p className="mt-1 text-sm text-sky-800">{project.subtitle}</p>
                    </div>
                    <Code2 className="mt-1 h-5 w-5 shrink-0 text-sky-700" />
                  </div>

                  <p className="mt-5 text-sm leading-7 text-slate-700">{project.summary}</p>

                  <ul className="mt-5 space-y-3 text-sm leading-7 text-slate-700">
                    {project.highlights.map((highlight) => (
                      <li key={highlight} className="flex gap-3">
                        <span className="mt-3 h-1.5 w-1.5 rounded-full bg-sky-700" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {project.stack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full border border-sky-100 bg-sky-50/70 px-3 py-1 text-xs font-medium text-slate-700"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="mt-6 flex flex-wrap gap-3">
                    {project.links.demo ? (
                      <LinkPill href={project.links.demo} label="Live Demo" icon={ExternalLink} />
                    ) : null}
                    {project.links.code ? (
                      <LinkPill href={project.links.code} label="Source Code" icon={Github} />
                    ) : null}
                  </div>
                </Surface>
              </motion.div>
            ))}
          </div>
        </Section>

        <Section id="skills" eyebrow="Skills" title="What I work with">
          <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
            <div className="grid gap-6 md:grid-cols-3">
              {skillGroups.map((group) => (
                <Surface key={group.title} className="p-7">
                  <div className="mb-5 flex items-center gap-3">
                    <Wrench className="h-4 w-4 text-sky-800" />
                    <h3 className="text-base font-semibold text-slate-900">{group.title}</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-sky-100 bg-white px-3 py-1.5 text-sm text-slate-700"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </Surface>
              ))}
            </div>

            <Surface className="p-7 md:p-8">
              <div className="flex items-center gap-3">
                <Camera className="h-5 w-5 text-sky-800" />
                <h3 className="text-lg font-semibold text-slate-900">Also worth knowing</h3>
              </div>
              <ul className="mt-5 space-y-4 text-sm leading-7 text-slate-700">
                {additional.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-3 h-1.5 w-1.5 rounded-full bg-sky-700" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex flex-wrap gap-3">
                <LinkPill href={site.photos} label="View Photos" icon={ArrowRight} />
                <LinkPill href={site.chinese} label="Visit Chinese Site" icon={Globe} />
              </div>
            </Surface>
          </div>
        </Section>

        <Section id="contact" eyebrow="Contact" title="Reach out">
          <Surface className="p-7 md:p-10">
            <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
              <div>
                <p className="max-w-2xl text-lg leading-8 text-slate-700">
                  If you are reaching out about an internship, research opportunity, or a project that sits
                  somewhere between software, data, and the physical world, I would be happy to connect.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <LinkPill href={`mailto:${site.email}`} label="Email Me" primary icon={Mail} />
                  <LinkPill href={site.linkedin} label="LinkedIn" icon={Linkedin} />
                  <LinkPill href={site.github} label="GitHub" icon={Github} />
                </div>
              </div>

              <div className="rounded-[24px] bg-sky-50/65 p-6">
                <div className="text-sm uppercase tracking-[0.18em] text-sky-800">Quick Links</div>
                <div className="mt-5 space-y-4">
                  <a
                    href={site.resume}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-between rounded-2xl bg-white px-4 py-4 text-sm text-slate-700 transition hover:text-slate-900"
                  >
                    <span className="flex items-center gap-3">
                      <FileText className="h-4 w-4 text-sky-800" />
                      Resume
                    </span>
                    <ExternalLink className="h-4 w-4" />
                  </a>
                  <a
                    href={site.chinese}
                    className="flex items-center justify-between rounded-2xl bg-white px-4 py-4 text-sm text-slate-700 transition hover:text-slate-900"
                  >
                    <span className="flex items-center gap-3">
                      <Globe className="h-4 w-4 text-sky-800" />
                      Chinese site
                    </span>
                    <ArrowRight className="h-4 w-4" />
                  </a>
                  <a
                    href={site.photos}
                    className="flex items-center justify-between rounded-2xl bg-white px-4 py-4 text-sm text-slate-700 transition hover:text-slate-900"
                  >
                    <span className="flex items-center gap-3">
                      <Camera className="h-4 w-4 text-sky-800" />
                      Photo gallery
                    </span>
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>
          </Surface>
        </Section>
      </main>
    </div>
  );
}
