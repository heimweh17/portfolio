import React from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, ExternalLink, FileText, MapPin, Calendar, Code2, Briefcase, GraduationCap, Globe, Phone } from "lucide-react";

// --- QUICK START ---
// 1) Replace the data in SITE, ABOUT, EXPERIENCE, PROJECTS, SKILLS, CONTACT.
// 2) Export and deploy with Vercel/Netlify (or integrate into a Next.js app).
// 3) Optional: hook the contact button to an email service/form backend.

// ====== DATA ======
const SITE = {
  name: "Alex Liu",
  tagline: "Software Engineer • Data • Maps",
  location: "Gainesville, FL",
  headline: "I build fast, reliable software and human-centered tools.",
  links: {
    github: "https://github.com/heimweh17",
    linkedin: "https://www.linkedin.com/in/alex-liu7",
    email: "haozhouliu17@gmail.com",
    resume: "/resume.pdf",
    phone: "+1 (352) 283-4500",
    website: "https://yourdomain.com"
  }
};

const ABOUT = {
  blurb:
    "CS student at the University of Florida focusing on full‑stack engineering, data systems, and geospatial tech. I enjoy shipping polished features end‑to‑end and learning from real users.",
  highlights: [
    "Shipped 10+ projects used by classmates and clubs",
    "Comfortable with C++, Python, SQL, and React",
    "Experience across data pipelines, APIs, and UI polish"
  ],
};

const EXPERIENCE = [
  {
    role: "Software Engineering Intern",
    org: "Company / Lab",
    period: "May 2025 – Aug 2025",
    location: "Remote",
    bullets: [
      "Built a data API that cut dashboard load times by 40%.",
      "Wrote CI tests and monitoring for reliability and speed.",
      "Collaborated with designers to refine UX for search filters."
    ],
    tech: ["Python", "FastAPI", "PostgreSQL", "Docker", "Grafana"],
  },
  {
    role: "Engineering Team Member",
    org: "UF Club / SASE Engineering Team",
    period: "Jan 2025 – Present",
    location: "Gainesville, FL",
    bullets: [
      "Designed firmware and telemetry for a small robotics project.",
      "Co-led code reviews; reduced PR cycle time by 25%."
    ],
    tech: ["C++", "Embedded", "CAN", "Git"],
  },
];

const PROJECTS = [
  {
    name: "RescueGator",
    blurb: "Search-and-rescue prototype with path planning and live telemetry UI.",
    impact: "Planned 120+ routes across 4 maps; reduced operator actions by 30%.",
    tech: ["React", "TypeScript", "Vite", "WebSocket", "Leaflet"],
    links: { demo: "#", code: "#" }
  },
  {
    name: "GatorGrades+",
    blurb: "Full‑stack app to analyze course scores and trends with CSV/DB import.",
    impact: "Processes 10k+ records in seconds; exports charts and reports.",
    tech: ["Flask", "SQLAlchemy", "React", "Docker"],
    links: { demo: "#", code: "#" }
  },
  {
    name: "Face‑Control Toolkit",
    blurb: "Accessibility tools using OpenCV/MediaPipe for cursor and typing.",
    impact: "Hands‑free Chrome Dino and basic desktop control.",
    tech: ["Python", "OpenCV", "MediaPipe", "PyAutoGUI"],
    links: { demo: "#", code: "#" }
  },
];

const SKILLS = [
  { group: "Languages", items: ["C++", "Python", "Java", "TypeScript", "SQL", "RISC‑V"] },
  { group: "Frameworks", items: ["React", "Flask", "FastAPI", "Node", "Vite", "Tailwind"] },
  { group: "Data & Infra", items: ["PostgreSQL", "SQLite", "Docker", "Git", "CI", "Grafana"] },
  { group: "Domains", items: ["Algorithms", "Data Structures", "Geospatial (GIS)", "Computer Vision"] },
];

const CONTACT = {
  note: "Open to internships for Summer 2026. Happy to chat about data systems, geospatial, and accessible UI.",
};

// ====== UI PRIMITIVES ======
const Section = ({ id, title, children }: { id: string; title: string; children: React.ReactNode }) => (
  <section id={id} className="max-w-5xl mx-auto px-4 sm:px-6 md:px-8 py-16">
    <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-8">{title}</h2>
    {children}
  </section>
);

const Card = ({ children }: { children: React.ReactNode }) => (
  <div className="rounded-2xl shadow-sm border border-gray-200 p-5 hover:shadow-md transition">
    {children}
  </div>
);

const Badge = ({ children }: { children: React.ReactNode }) => (
  <span className="text-sm px-2 py-1 rounded-full border border-gray-300">{children}</span>
);

const LinkIcon = ({ href, label, Icon }: { href: string; label: string; Icon: any }) => (
  <a href={href} className="inline-flex items-center gap-2 text-sm underline-offset-4 hover:underline" aria-label={label}>
    <Icon className="w-4 h-4" />
    <span className="hidden sm:inline">{label}</span>
  </a>
);

// ====== PAGE ======
export default function Portfolio() {
  return (
    <div className="font-sans antialiased">
      {/* NAVBAR */}
      <header className="sticky top-0 z-30 backdrop-blur bg-white/70 border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-8 h-14 flex items-center justify-between">
          <a href="#home" className="font-semibold">{SITE.name}</a>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <a href="#projects" className="hover:underline">Projects</a>
            <a href="#experience" className="hover:underline">Experience</a>
            <a href="#skills" className="hover:underline">Skills</a>
            <a href="#about" className="hover:underline">About</a>
            <a href="#contact" className="hover:underline">Contact</a>
          </nav>
          <div className="flex items-center gap-3">
            <a href={SITE.links.resume} className="text-sm inline-flex items-center gap-2 border rounded-xl px-3 py-1.5 hover:shadow-sm">
              <FileText className="w-4 h-4" /> Resume
            </a>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section id="home" className="max-w-5xl mx-auto px-4 sm:px-6 md:px-8 py-16 md:py-24">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">{SITE.headline}</h1>
            <p className="text-gray-600 mb-6">{SITE.tagline}</p>
            <div className="flex flex-wrap items-center gap-4">
              <Badge>
                <MapPin className="w-3.5 h-3.5 inline -mt-1 mr-1" /> {SITE.location}
              </Badge>
              <a href={SITE.links.github} className="inline-flex items-center gap-2 border rounded-xl px-3 py-1.5 text-sm">
                <Github className="w-4 h-4" /> GitHub
              </a>
              <a href={SITE.links.linkedin} className="inline-flex items-center gap-2 border rounded-xl px-3 py-1.5 text-sm">
                <Linkedin className="w-4 h-4" /> LinkedIn
              </a>
              <a href={`mailto:${SITE.links.email}`} className="inline-flex items-center gap-2 border rounded-xl px-3 py-1.5 text-sm">
                <Mail className="w-4 h-4" /> Email
              </a>
            </div>
          </div>
          <div className="border rounded-2xl p-6">
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3"><Calendar className="w-4 h-4 mt-0.5" /> Available: Summer 2026 internships</li>
              <li className="flex items-start gap-3"><Code2 className="w-4 h-4 mt-0.5" /> Recent: Shipping a full‑stack analytics tool</li>
              <li className="flex items-start gap-3"><Globe className="w-4 h-4 mt-0.5" /> Portfolio: {SITE.links.website}</li>
              <li className="flex items-start gap-3"><Phone className="w-4 h-4 mt-0.5" /> {SITE.links.phone}</li>
            </ul>
          </div>
        </motion.div>
      </section>

      {/* PROJECTS */}
      <Section id="projects" title="Projects">
        <div className="grid md:grid-cols-2 gap-6">
          {PROJECTS.map((p) => (
            <Card key={p.name}>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-lg font-semibold">{p.name}</h3>
                  <p className="text-sm text-gray-600 mt-1">{p.blurb}</p>
                  <p className="text-sm mt-2"><span className="font-medium">Impact:</span> {p.impact}</p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {p.tech.map((t) => (
                      <Badge key={t}>{t}</Badge>
                    ))}
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
          ))}
        </div>
      </Section>

      {/* EXPERIENCE */}
      <Section id="experience" title="Experience">
        <div className="space-y-4">
          {EXPERIENCE.map((x, i) => (
            <Card key={i}>
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2 text-sm text-gray-600"><Briefcase className="w-4 h-4"/> {x.org}</div>
                  <h3 className="text-lg font-semibold mt-1">{x.role}</h3>
                  <div className="text-sm text-gray-600 mt-1">{x.period} • {x.location}</div>
                  <ul className="list-disc ml-5 mt-3 space-y-1 text-sm">
                    {x.bullets.map((b, j) => <li key={j}>{b}</li>)}
                  </ul>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {x.tech.map((t) => <Badge key={t}>{t}</Badge>)}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      {/* SKILLS */}
      <Section id="skills" title="Skills">
        <div className="grid md:grid-cols-2 gap-6">
          {SKILLS.map((g) => (
            <Card key={g.group}>
              <h3 className="font-medium">{g.group}</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {g.items.map((s: string) => <Badge key={s}>{s}</Badge>)}
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
              {ABOUT.highlights.map((h, i) => <li key={i}>{h}</li>)}
            </ul>
            <div className="mt-6 flex flex-wrap gap-4">
              <LinkIcon href={SITE.links.github} label="GitHub" Icon={Github} />
              <LinkIcon href={SITE.links.linkedin} label="LinkedIn" Icon={Linkedin} />
              <LinkIcon href={`mailto:${SITE.links.email}`} label="Email" Icon={Mail} />
              <LinkIcon href={SITE.links.resume} label="Resume" Icon={FileText} />
            </div>
          </div>
          <div className="border rounded-2xl p-5">
            <div className="text-sm text-gray-600">Education</div>
            <div className="mt-1 font-medium flex items-center gap-2"><GraduationCap className="w-4 h-4"/> University of Florida</div>
            <div className="text-sm">B.S. in Computer Science</div>
            <div className="text-sm text-gray-600">2024 – 2028 (expected)</div>
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
                <a href={`mailto:${SITE.links.email}`} className="inline-flex items-center gap-2 border rounded-xl px-3 py-1.5 text-sm">
                  <Mail className="w-4 h-4"/> Email me
                </a>
                <a href={SITE.links.linkedin} className="inline-flex items-center gap-2 border rounded-xl px-3 py-1.5 text-sm">
                  <Linkedin className="w-4 h-4"/> LinkedIn
                </a>
                <a href={SITE.links.github} className="inline-flex items-center gap-2 border rounded-xl px-3 py-1.5 text-sm">
                  <Github className="w-4 h-4"/> GitHub
                </a>
              </div>
            </div>
            <div className="text-sm text-gray-600">
              <p><span className="font-medium">Email:</span> {SITE.links.email}</p>
              <p className="mt-1"><span className="font-medium">Location:</span> {SITE.location}</p>
              <p className="mt-1"><span className="font-medium">Website:</span> {SITE.links.website}</p>
              <p className="mt-1"><span className="font-medium">Phone:</span> {SITE.links.phone}</p>
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
  );
}
