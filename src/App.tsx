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
      "Assembled and provisioned 5-10 customer-specified bare-metal servers weekly, configuring GPU, memory, and storage hardware and performing validation and stress testing before deployment.",
      "Handled 20-30 production server service and maintenance requests weekly, completing hardware upgrades and replacements while troubleshooting boot, BIOS, thermal, and connectivity issues.",
      "Racked and deployed servers in the data center, configured host networking and IPMI/BMC management, and validated connectivity, hardware health, and system readiness.",
      "Developed and deployed a FreeDOS-based BIOS update automation system supporting about 30 Supermicro motherboard models, automatically matching firmware so teammates could update outdated BIOS versions safely.",
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
      "Reviewed and processed Florida traffic crash records in Signal Four Analytics, using police narratives, diagrams, and map context to geocode crashes and validate roadway and location classifications.",
      "Performed structured data review and QA/QC for transportation-safety records used in downstream analysis workflows.",
      "Developed internal automation-assisted processing and validation workflows to streamline crash-record review and improve classification consistency.",
    ],
    tags: ["GIS", "Data Quality", "Geocoding", "Transportation Safety"],
  },
  {
    role: "Event Committee Member",
    organization: "UF Society of Asian Scientists & Engineers",
    period: "Aug 2025 - Present",
    location: "Gainesville, Florida",
    description:
      "Help organize professional programming and member-facing events for a growing technical student organization.",
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
      "Built a full-stack geospatial analytics platform that ingests user-uploaded CSV and GeoJSON datasets, generates DBSCAN clusters and density grids, and supports interactive city-scale analysis with OpenStreetMap data.",
    highlights: [
      "Designed independently deployable GIS analytics and AI inference services: FastAPI and PostgreSQL handle authenticated spatial workflows, while a containerized Gemini insight service provides optional narrative interpretation (previously deployed on AWS; currently paused for cost control).",
      "Implemented JWT-protected user workflows, persisted datasets and analysis results, per-user rolling GenAI rate limits, and cross-service request correlation through X-Request-ID propagation with structured logging.",
      "Integrated Nominatim, Overpass, and OSRM for city search, amenity discovery, and routing; added bounded timeouts and retry handling for resilient third-party geospatial API usage.",
      "Automated containerized deployments with Docker and GitHub Actions, supporting independent service releases and clearer operational boundaries.",
    ],
    stack: ["React", "TypeScript", "FastAPI", "PostGIS", "Docker", "AWS"],
    screenshots: ["/screenshots/gdb1.png", "/screenshots/geodashboard-2.png", "/screenshots/gdb2.png", "/screenshots/gdb3.png"],
    links: { demo: "https://thegeodashboard.vercel.app/", code: "https://github.com/heimweh17/Geo-Dashboard" },
  },
  {
    name: "ScamShield Hub",
    subtitle: "Interactive Cybersecurity Learning Platform",
    summary:
      "A full-stack cybersecurity learning platform where users practice recognizing phishing attempts, scam messages, and suspicious websites through interactive case studies and immediate feedback.",
    highlights: [
      "Built a searchable case feed with safe, scam, and unsure classification, reviewable completed cases, progress tracking, badges, leaderboards, and social features including profiles, friend requests, groups, and private messages.",
      "Implemented role-based administration for case publishing, user and comment moderation, platform statistics, and protected destructive actions, with administrator privileges controlled through backend tooling.",
      "Developed protected React routes and role-aware client state alongside Node.js and Express REST APIs for authentication, cases, profiles, friendships, messages, leaderboards, and health checks.",
      "Designed MongoDB and Mongoose data models for users, cases, votes, comments, messages, groups, and pending signups; added JWT sessions, bcrypt password hashing, and a Resend email-verification flow that avoids reserving incomplete registrations.",
      "Deployed the React frontend on Vercel with an Express backend on Render, MongoDB Atlas persistence, and Resend transactional email, with production checks, documentation, and safeguards for shared seed data.",
    ],
    stack: ["React", "Node.js", "Express", "MongoDB", "JWT", "Resend"],
    links: {},
  },
  {
    name: "SwampGuard",
    subtitle: "Policy-Aware Claims Intelligence Prototype",
    summary:
      "An AI-assisted claims workflow that analyzes damage photos and uploaded documents to produce structured claim guidance and cost estimates.",
    highlights: [
      "Designed an end-to-end claim intelligence workflow that combines damage-photo analysis, uploaded policy data, and itemized estimation logic to produce structured severity outputs and policy-adjusted repair projections.",
      "Engineered asynchronous FastAPI image-analysis endpoints and document extraction for receipts and insurance policies, using JSON prompting and Pydantic validation for consistent pipeline outputs.",
      "Developed policy-aware claim calculations using Xactimate-style pricing, deductible and coverage logic tied to user policies, plus statute-grounded RAG Q&A for clearer estimate interpretation and claim readiness.",
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
      "Built an AI medical scribe prototype in a 24-hour designathon that converts clinician-patient audio into SOAP notes.",
      "Implemented a real-time streaming pipeline using browser audio capture and Deepgram diarization, followed by a Gemini prompt chain that extracts clinical facts and generates speaker-aware SOAP drafts in about five seconds.",
      "Integrated Supabase authentication and PostgreSQL persistence for secure encounter storage and retrieval, with human-in-the-loop editing designed to reduce documentation time.",
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
      "Built a webcam-only assistive input system using MediaPipe FaceMesh with 468 landmarks per frame for hands-free cursor control and Morse-code typing.",
      "Stabilized real-time control with solvePnP head-pose tracking, EMA smoothing, hysteresis thresholds, and debouncing to reduce jitter and false triggers.",
      "Implemented eyebrow-click and long-blink commands through PyAutoGUI, connecting computer-vision signals to usable desktop controls.",
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
  ["Languages", "Python", "C++", "Java", "JavaScript / TypeScript", "SQL", "Bash"],
  ["Software & Web", "React", "FastAPI", "Flask", "Node.js", "PostgreSQL", "REST APIs", "SQLAlchemy"],
  ["Systems & Infrastructure", "Data Center Operations", "Server Hardware", "IPMI / BMC", "BIOS / UEFI", "FreeDOS", "TCP/IP"],
  ["Cloud & DevOps", "AWS", "Docker", "Git", "GitHub Actions", "Linux / Unix"],
  ["Data, CV & GIS", "Pandas", "NumPy", "OpenCV", "MediaPipe", "Leaflet", "ArcGIS Pro", "GIS"],
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
            <div><h1 id="intro-title">Alex Liu</h1><p className="hero-title">Full-stack software, hardware, and infrastructure</p></div>
            <div className="hero-profile">
              <img src="/me.jpg" alt="Alex Liu" />
              <div><p>I am a Computer Science student with a GIS certificate, building full-stack software while working hands-on with server hardware, data-center infrastructure, backend services, and technical products.</p><div className="hero-actions"><a className="text-link" href="#work">Experience <ArrowUpRight aria-hidden="true" size={15} /></a><button type="button" className="text-link" onClick={() => setOverlay({ type: "resume" })}>View resume <ArrowUpRight aria-hidden="true" size={15} /></button></div></div>
            </div>
          </div>
          <div className="hero-rule" />
        </section>

        <section className="introduction-section" aria-labelledby="introduction-title">
          <div>
            <p className="section-index">Introduction</p>
            <h2 id="introduction-title">Engineering across the stack.</h2>
          </div>
          <div className="introduction-copy">
            <p>
              Hi, I am Alex Liu, a junior studying Computer Science at the University of Florida. I am interested in
              hardware, systems, infrastructure, software, and data.
            </p>
            <p>
              I have worked on both full-stack software and hardware projects. On the software side, I have built
              full-stack and AI applications. On the hardware and infrastructure side, I have worked with bare-metal
              servers, GPUs, networking, BIOS and firmware, and data-center equipment.
            </p>
            <p>
              I like learning how different parts of technology fit together, from hardware and operating systems to
              backend services and user-facing applications. I am looking for opportunities to keep growing as an
              engineer, work on real technical problems, and build systems that are reliable and useful.
            </p>
            <p>
              My GIS background also informs how I approach spatial data, mapping workflows, and transportation-safety
              data work alongside my broader software and systems interests.
            </p>
          </div>
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
          <aside className="profile-panel"><dl><div><dt>Education</dt><dd>B.S. Computer Science, expected 2028<br />GIS Certificate / University of Florida</dd></div><div><dt>GPA</dt><dd>3.78 / 4.00</dd></div><div><dt>Focus</dt><dd>Full-stack engineering, server hardware, infrastructure, GIS, and data quality</dd></div><div><dt>Outside work</dt><dd>OpenStreetMap volunteer since 2020; photography, badminton, and pickleball</dd></div></dl></aside>
        </section>

        <section className="skills-section" aria-labelledby="skills-title"><div><p className="section-index">Skills</p><h2 id="skills-title">Tools I use</h2></div><div className="skills-list">{skillGroups.map(([title, ...skills]) => <div className="skill-row" key={title}><h3>{title}</h3><p>{skills.join(" / ")}</p></div>)}</div></section>
        <section className="contact-section" aria-labelledby="contact-title"><p className="section-index">Contact</p><h2 id="contact-title">Let's make something useful.</h2><p>I am open to internship, research, and engineering opportunities.</p><div className="contact-links"><a href={`mailto:${site.email}`}><Mail size={17} />Email</a><a href={site.linkedin} target="_blank" rel="noreferrer"><Linkedin size={17} />LinkedIn</a><a href={site.github} target="_blank" rel="noreferrer"><Github size={17} />GitHub</a><a href="/zh"><MapPin size={17} />Chinese site</a></div></section>
      </main>

      <footer className="site-footer"><p>Thoughtful systems, built for the real world.</p><div><span>Alex Liu</span><span>2026</span></div></footer>
      <DetailOverlay overlay={overlay} onClose={() => setOverlay(null)} />
    </div>
  );
}
