import { useEffect, useState } from "react";
import { ArrowUpRight, ChevronLeft, ChevronRight, Github, Linkedin, Mail, MapPin, X } from "lucide-react";

type Experience = {
  role: string;
  organization: string;
  period: string;
  location: string;
  description: string;
  bullets: string[];
  tags: string[];
};

type Project = {
  name: string;
  subtitle: string;
  summary: string;
  highlights: string[];
  stack: string[];
  screenshots?: string[];
  links: { code?: string; demo?: string };
};

type Overlay =
  | { type: "resume" }
  | { type: "experience"; item: Experience }
  | { type: "project"; item: Project }
  | null;

const site = {
  email: "haozhouliu17@gmail.com",
  github: "https://github.com/heimweh17",
  linkedin: "https://www.linkedin.com/in/alex-liu7/",
  resume: "/resume.pdf",
};

const experience: Experience[] = [
  {
    role: "Operational Engineering Intern",
    organization: "Database Mart",
    period: "May 2026 - Jul 2026",
    location: "Kansas City, Missouri",
    description:
      "Supported the physical server lifecycle in a production hosting environment, from bare-metal provisioning through data-center deployment and maintenance.",
    bullets: [
      "Assembled, configured, and provisioned custom bare-metal servers for customer workloads, including GPU and storage-heavy systems.",
      "Handled maintenance requests involving hardware swaps, boot and BIOS issues, thermal checks, and connectivity troubleshooting.",
      "Supported rack deployment, cabling, IPMI/BMC configuration, and post-build validation before customer handoff.",
      "Built a FreeDOS-based BIOS update workflow for Supermicro systems with hardware detection, firmware mapping, version checks, and safe-skip logic.",
    ],
    tags: ["Server Operations", "Hardware", "Data Center", "IPMI/BMC"],
  },
  {
    role: "Research Assistant",
    organization: "UF GeoPlan Center",
    period: "Apr 2026 - Present",
    location: "Gainesville, Florida",
    description:
      "Hold an ongoing research appointment supporting transportation-safety data work involving crash-record review, geocoding, roadway classification, and quality control.",
    bullets: [
      "Reviewed Florida traffic crash records by combining narrative, diagram, and map context to assign accurate location and roadway classifications.",
      "Performed geocoding, roadway-system tagging, and QA/QC for structured datasets used in transportation analysis workflows.",
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
      "Separated core GIS computation from AI inference in a multi-service architecture.",
      "Implemented DBSCAN-based spatial analysis and interactive visualization for city-scale datasets.",
      "Added request tracing, containerized deployment, and CI/CD workflows for production-style iteration.",
    ],
    stack: ["React", "TypeScript", "FastAPI", "PostGIS", "Docker", "AWS"],
    screenshots: ["/screenshots/gdb1.png", "/screenshots/geodashboard-2.png", "/screenshots/gdb2.png", "/screenshots/gdb3.png"],
    links: { demo: "https://thegeodashboard.vercel.app/", code: "https://github.com/heimweh17/Geo-Dashboard" },
  },
  {
    name: "SwampGuard",
    subtitle: "Policy-Aware Claims Intelligence Prototype",
    summary:
      "An AI-assisted claims workflow that analyzes damage photos and uploaded documents to produce structured claim guidance and cost estimates.",
    highlights: [
      "Built a multimodal pipeline for photo analysis, document extraction, and structured outputs.",
      "Generated itemized estimates and explainable claim guidance with policy-aware calculations.",
      "Focused on understandable results rather than treating model output as a black box.",
    ],
    stack: ["React", "FastAPI", "Python", "Pydantic", "RAG"],
    screenshots: ["/screenshots/swampguard-1.jpg", "/screenshots/swampguard-2.jpg", "/screenshots/swampguard-3.jpg", "/screenshots/swampguard-4.jpg", "/screenshots/swampguard-5.jpg"],
    links: { code: "https://github.com/heimweh17/SwampGuard" },
  },
  {
    name: "UF Health SmartScribe",
    subtitle: "Real-Time Clinical Documentation Prototype",
    summary:
      "Hackathon project for turning patient conversations into structured SOAP-style medical notes through a streaming pipeline.",
    highlights: [
      "Connected live transcription, speaker separation, and structured note generation in one workflow.",
      "Stored encounter data with a relational backend to support retrieval and iteration.",
    ],
    stack: ["Node.js", "Supabase", "Deepgram", "Gemini API"],
    screenshots: ["/screenshots/smartscribe-1.png", "/screenshots/smartscribe-2.png"],
    links: { code: "https://github.com/heimweh17/SmartScribe" },
  },
  {
    name: "Ability Bridge",
    subtitle: "Hands-Free Accessibility Interface",
    summary: "Computer-vision accessibility tool that uses facial movement and gesture signals as an input system.",
    highlights: [
      "Translated head pose, blink behavior, and mouth movement into cursor and text-entry controls.",
      "Applied smoothing and filtering to improve stability during real-time use.",
    ],
    stack: ["Python", "OpenCV", "MediaPipe"],
    links: { code: "https://github.com/heimweh17/Ability-Bridge" },
  },
  {
    name: "Grade Track",
    subtitle: "Academic Analytics Dashboard",
    summary: "A full-stack dashboard for turning exported grade data into clear statistical views and class-level trends.",
    highlights: [
      "Built an ingestion flow for transforming raw CSV exports into structured analysis.",
      "Created interactive charts for distribution and performance review.",
    ],
    stack: ["Flask", "React", "PostgreSQL", "Docker"],
    screenshots: ["/screenshots/gradetrack-1.png"],
    links: { code: "https://github.com/heimweh17/Grade-Track" },
  },
  {
    name: "Selected C++ Coursework",
    subtitle: "Algorithms and Data Structures",
    summary: "A set of smaller systems and algorithm projects including AVL trees, bin-packing analysis, and an SFML-based Minesweeper implementation.",
    highlights: [
      "Built data structures from scratch and reasoned about runtime tradeoffs.",
      "Used course projects to strengthen implementation discipline and testing habits.",
    ],
    stack: ["C++", "SFML", "Algorithms", "Data Structures"],
    links: { code: "https://github.com/heimweh17" },
  },
];

const skillGroups = [
  ["Languages", "C++", "Python", "TypeScript", "SQL", "Java"],
  ["Frameworks", "React", "FastAPI", "Flask", "Node.js", "Tailwind CSS"],
  ["Data & Tools", "PostgreSQL", "Docker", "GitHub Actions", "AWS", "GIS / OpenStreetMap"],
];

function External({ href, children }: { href: string; children: React.ReactNode }) {
  return <a href={href} target="_blank" rel="noreferrer" className="text-link">{children} <ArrowUpRight aria-hidden="true" size={15} strokeWidth={1.8} /></a>;
}

function DetailOverlay({ overlay, onClose }: { overlay: Overlay; onClose: () => void }) {
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    if (!overlay) return;
    const onKeyDown = (event: KeyboardEvent) => event.key === "Escape" && onClose();
    window.addEventListener("keydown", onKeyDown);
    document.body.classList.add("has-overlay");
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.classList.remove("has-overlay");
    };
  }, [overlay, onClose]);

  useEffect(() => setActiveImage(0), [overlay]);

  if (!overlay) return null;

  const title = overlay.type === "resume" ? "Resume" : overlay.type === "project" ? overlay.item.name : overlay.item.role;
  const images = overlay.type === "project" ? overlay.item.screenshots ?? [] : [];
  const previousImage = () => setActiveImage((index) => (index - 1 + images.length) % images.length);
  const nextImage = () => setActiveImage((index) => (index + 1) % images.length);

  return (
    <div className="detail-overlay" role="presentation" onMouseDown={onClose}>
      <section className={`detail-dialog detail-dialog-${overlay.type}`} role="dialog" aria-modal="true" aria-label={title} onMouseDown={(event) => event.stopPropagation()}>
        <div className="dialog-topline"><span>{overlay.type === "resume" ? "Document viewer" : "Portfolio detail"}</span><button type="button" className="close-button" onClick={onClose} aria-label="Close detail"><X size={19} /></button></div>
        {overlay.type === "resume" ? (
          <iframe className="resume-frame" src={`${site.resume}#view=FitH`} title="Alex Liu resume" />
        ) : null}
        {overlay.type === "experience" ? (
          <div className="detail-content">
            <p className="detail-kicker">{overlay.item.organization}</p>
            <h2>{overlay.item.role}</h2>
            <p className="detail-meta">{overlay.item.period} / {overlay.item.location}</p>
            <p className="detail-intro">{overlay.item.description}</p>
            <h3>What I worked on</h3>
            <ul className="detail-list">{overlay.item.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>
            <div className="stack-list detail-tags">{overlay.item.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
          </div>
        ) : null}
        {overlay.type === "project" ? (
          <div className="detail-content">
            <p className="detail-kicker">{overlay.item.subtitle}</p>
            <h2>{overlay.item.name}</h2>
            <p className="detail-intro">{overlay.item.summary}</p>
            {images.length ? (
              <figure className="project-gallery">
                <img src={images[activeImage]} alt={`${overlay.item.name} project screenshot ${activeImage + 1}`} />
                {images.length > 1 ? <><button type="button" className="gallery-button gallery-previous" onClick={previousImage} aria-label="Previous screenshot"><ChevronLeft size={20} /></button><button type="button" className="gallery-button gallery-next" onClick={nextImage} aria-label="Next screenshot"><ChevronRight size={20} /></button></> : null}
                <figcaption>{activeImage + 1} / {images.length} project screenshots</figcaption>
              </figure>
            ) : null}
            <h3>Project notes</h3>
            <ul className="detail-list">{overlay.item.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}</ul>
            <div className="stack-list detail-tags">{overlay.item.stack.map((tech) => <span key={tech}>{tech}</span>)}</div>
            <div className="detail-links">{overlay.item.links.demo ? <External href={overlay.item.links.demo}>Live demo</External> : null}{overlay.item.links.code ? <External href={overlay.item.links.code}>Source code</External> : null}</div>
          </div>
        ) : null}
      </section>
    </div>
  );
}

export default function App() {
  const [overlay, setOverlay] = useState<Overlay>(null);

  return (
    <div className="portfolio-shell">
      <header className="site-header">
        <a className="wordmark" href="/">Alex Liu</a>
        <nav aria-label="Primary navigation" className="site-nav"><a href="#work">Work</a><a href="#projects">Projects</a><a href="#about">About</a></nav>
        <button type="button" className="resume-link" onClick={() => setOverlay({ type: "resume" })}>Resume <ArrowUpRight size={15} /></button>
      </header>

      <main>
        <section className="hero" aria-labelledby="intro-title">
          <div className="hero-meta"><span>Computer Science</span><span>University of Florida</span><span>Gainesville, FL</span></div>
          <div className="hero-grid">
            <div><h1 id="intro-title">Alex Liu</h1><p className="hero-title">Software engineering / data systems / geospatial work</p></div>
            <div className="hero-profile">
              <img src="/me.jpg" alt="Alex Liu" />
              <div><p>I am a Computer Science student building reliable software and data tools for real-world use.</p><div className="hero-actions"><a className="text-link" href="#projects">Selected projects <ArrowUpRight aria-hidden="true" size={15} /></a><button type="button" className="text-link" onClick={() => setOverlay({ type: "resume" })}>View resume <ArrowUpRight aria-hidden="true" size={15} /></button></div></div>
            </div>
          </div>
          <div className="hero-rule" />
        </section>

        <section id="work" className="work-section" aria-labelledby="work-title">
          <div className="section-intro"><p className="section-index">Experience</p><div><h2 id="work-title">Professional work</h2><p>Technical experience across operations, public-safety data, and student engineering communities.</p></div></div>
          <div className="experience-list">{experience.map((item) => <article className="experience-row" key={`${item.organization}-${item.role}`}><div className="experience-dates"><span>{item.period}</span><span>{item.location}</span></div><div className="experience-body"><h3>{item.role}</h3><p className="organization">{item.organization}</p><p className="experience-summary">{item.description}</p><button type="button" className="detail-trigger" onClick={() => setOverlay({ type: "experience", item })}>Read experience <ArrowUpRight size={15} /></button></div><div className="tag-list" aria-label={`${item.organization} skills`}>{item.tags.map((tag) => <span key={tag}>{tag}</span>)}</div></article>)}</div>
        </section>

        <section id="projects" className="projects-section" aria-labelledby="projects-title">
          <div className="projects-heading"><div><p className="section-index">Projects</p><h2 id="projects-title">Selected projects</h2></div><p>Full-stack tools, technical prototypes, and course work that gave me room to build from first principles.</p></div>
          <div className="project-grid">{projects.map((project, index) => <article className={`project-card project-card-${index + 1}`} key={project.name}><div className="project-number">0{index + 1}</div><div><p className="project-subtitle">{project.subtitle}</p><h3>{project.name}</h3></div><p className="project-summary">{project.summary}</p>{project.screenshots?.[0] ? <img className="project-preview" src={project.screenshots[0]} alt="" /> : null}<div className="project-bottom"><div className="stack-list">{project.stack.map((tech) => <span key={tech}>{tech}</span>)}</div><button type="button" className="detail-trigger" onClick={() => setOverlay({ type: "project", item: project })}>View project <ArrowUpRight size={15} /></button></div></article>)}</div>
        </section>

        <section id="about" className="about-section" aria-labelledby="about-title">
          <div className="about-copy"><p className="section-index">About</p><h2 id="about-title">A practical technical perspective.</h2><p>I am a Computer Science student at the University of Florida. The work I return to most often sits between code and context: mapping platforms, analytics dashboards, internal workflows, and systems that need to work outside a classroom demo.</p><p>I am especially interested in software engineering, geospatial workflows, data quality, and the operational details behind a reliable product.</p></div>
          <aside className="profile-panel"><dl><div><dt>Education</dt><dd>B.S. Computer Science, expected 2028<br />University of Florida</dd></div><div><dt>Focus</dt><dd>Systems, backend logic, GIS, and data quality</dd></div><div><dt>Outside work</dt><dd>OpenStreetMap volunteer since 2020; photography, badminton, and pickleball</dd></div></dl></aside>
        </section>

        <section className="skills-section" aria-labelledby="skills-title"><div><p className="section-index">Skills</p><h2 id="skills-title">Tools I use</h2></div><div className="skills-list">{skillGroups.map(([title, ...skills]) => <div className="skill-row" key={title}><h3>{title}</h3><p>{skills.join(" / ")}</p></div>)}</div></section>
        <section className="contact-section" aria-labelledby="contact-title"><p className="section-index">Contact</p><h2 id="contact-title">Let's make something useful.</h2><p>I am open to internship, research, and engineering opportunities.</p><div className="contact-links"><a href={`mailto:${site.email}`}><Mail size={17} />Email</a><a href={site.linkedin} target="_blank" rel="noreferrer"><Linkedin size={17} />LinkedIn</a><a href={site.github} target="_blank" rel="noreferrer"><Github size={17} />GitHub</a><a href="/zh"><MapPin size={17} />Chinese site</a></div></section>
      </main>

      <footer className="site-footer"><p>Thoughtful systems, built for the real world.</p><div><span>Alex Liu</span><span>2026</span></div></footer>
      <DetailOverlay overlay={overlay} onClose={() => setOverlay(null)} />
    </div>
  );
}
