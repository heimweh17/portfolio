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
  logo?: string;
};

type ProjectLinks = { code?: string; demo?: string };

type SmallProject = {
  name: string;
  summary: string;
  stack: string[];
  links: ProjectLinks;
};

type Project = {
  name: string;
  subtitle: string;
  summary: string;
  highlights: string[];
  stack: string[];
  screenshots?: string[];
  links: ProjectLinks;
  smallProjects?: SmallProject[];
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
      "Worked in a production hosting environment across the physical server lifecycle: provisioning customer-configured machines, preparing systems for deployment, troubleshooting failures, and automating repetitive firmware maintenance.",
    bullets: [
      "Server provisioning: Provisioned and deployed approximately 60-70 bare-metal servers to customer specifications. Configured storage devices, network connectivity, and IPMI/BMC out-of-band management, then checked system health and readiness before handoff.",
      "Operational troubleshooting: Completed more than 300 service and maintenance requests involving server boot issues, storage/RAID problems, connectivity failures, thermal alerts, component replacements, and hardware upgrades. Worked from reported symptoms through diagnosis, repair, and post-maintenance verification.",
      "Firmware automation: Developed a FreeDOS-based BIOS update workflow for roughly 30 Supermicro motherboard models. Used DOS Batch, PowerShell, and DMI/SMBIOS information to detect the motherboard, identify installed firmware, and match it with a validated update package and target version.",
      "Fail-safe design: Designed the automation to stop rather than guess when hardware identification or firmware mapping was uncertain, and to skip unnecessary updates when the installed version was already current. The workflow called the original vendor flashing utilities; it did not replace or rewrite the firmware-writing tools.",
      "Testing and reliability: Performed hardware stress tests, BMC-based health checks, and post-repair diagnostics to detect instability and confirm that systems were ready to return to service. The experience reinforced the importance of repeatable operational procedures, evidence-based troubleshooting, and validation after a change.",
    ],
    tags: [
      "Infrastructure Operations",
      "Automation",
      "Bare-Metal Servers",
      "IPMI/BMC",
      "Firmware",
    ],
    logo: "/logos/database-mart.png",
  },
  {
    role: "Research Assistant",
    organization: "UF GeoPlan Center",
    period: "Apr 2026 - Present",
    location: "Gainesville, Florida",
    description:
      "Work with Florida traffic crash records and roadway data, combining geocoding and classification review with internally developed automation tools that make an evidence-heavy workflow faster and easier to verify.",
    bullets: [
      "Transportation-data review: Review crash reports, police narratives, diagrams, and geographic context to validate crash locations, roadway classifications, and related records used in transportation-safety analysis. This work begins with imperfect real-world data, not pre-cleaned demonstration datasets.",
      "Workflow automation: Built an internal Chrome extension and local Node.js backend that extract relevant text and images from crash-report PDFs, send appropriate inputs to AI services, and return structured classification recommendations within the review workflow.",
      "Measured impact: Reduced average processing time in the assisted review workflow by approximately 75% while keeping the reviewer responsible for interpreting evidence, verifying recommendations, and entering final values. The tool assists human decisions; it does not automatically finalize or submit records.",
      "Independent QA tooling: Built a separate diagram quality-assurance tool to compare crash diagrams with police narratives and vehicle information, highlighting potential contradictions for human review. Structured outputs and explicit checks make uncertain results easier to investigate.",
      "Integration debugging: Diagnosed failures across PDF preprocessing, the Node.js service, and third-party vision-model APIs. When an upstream model stopped accepting the expected image inputs, isolated the API compatibility issue, selected a compatible approach, and adapted preprocessing to changed image-request limits.",
      "Engineering approach: Prefer deterministic extraction when information can be read directly, and reserve AI interpretation for ambiguous content. Expose evidence and independent checks instead of treating model output as authoritative; this design choice improves both reviewer trust and operational reliability.",
    ],
    tags: [
      "Internal Tooling",
      "Node.js",
      "Data Quality",
      "Applied AI",
      "GIS",
    ],
    logo: "/logos/uf-geoplan-center.png",
  },
  {
    role: "Event Committee Member",
    organization: "UF Society of Asian Scientists & Engineers",
    period: "Aug 2025 - Present",
    location: "Gainesville, Florida",
    description:
      "Help organize technical community events, professional development programming, and member-facing activities at the University of Florida.",
    bullets: [
      "Coordinated event logistics and member communications for professional and community programs, including events attended by more than 100 participants.",
      "Collaborated with fellow student organizers to prepare activities, support on-site execution, and make events welcoming and useful for attendees.",
    ],
    tags: [
      "Student Leadership",
      "Teamwork",
      "Event Operations",
    ],
    logo: "/logos/sase_logo.jpg",
  },
];

const projects: Project[] = [
  {
    name: "Saturday Lab",
    subtitle: "College Football Analytics, Data Pipelines & CI/CD",
    summary:
      "A college-football analytics platform combining opponent-adjusted forecasts and interactive team/game reports with automated data ingestion, validation, and publishing. Frequent live-score updates run separately from formal weekly rankings.",
    highlights: [
      "Application: Built a Next.js and TypeScript site with searchable FBS rankings, game centers, team-season reports, historical snapshots, matchup exploration, and model documentation. The static build generates more than 9,000 pages, preserving navigable game and ranking history.",
      "Data and modeling: Developed Python analytics over nine seasons, more than 7,500 historical games, and 138 FBS teams. The opponent-adjusted model produces win probabilities and rankings, with time-ordered retrospective evaluation rather than training on information from future games.",
      "Evaluation and transparency: Preserved historical pregame predictions and made model audits, calibration results, and research outputs available for inspection. Historical 2023-2025 evaluation is approximately 72% accurate in retrospective backtesting, not a guarantee of future accuracy or a pristine unseen holdout.",
      "CI/CD: Built GitHub Actions workflows that acquire data, verify source completeness, run Python tests and TypeScript/Python consistency checks, lint, build the Next.js static export, and publish validated artifacts to GitHub Pages.",
      "Scheduling: Integrated an independent QStash refresh clock with GitHub Actions, with slower native GitHub schedules as a fallback. Formal model and ranking snapshots follow a separate weekly publication cycle.",
      "Reliability: Added retries for transient refresh failures, shared concurrency controls to prevent conflicting data writes, protection against duplicate weekly releases, and readiness checks that defer a publication when upstream game data is incomplete.",
      "System boundaries: Kept frequently changing scores and game status in a lightweight feed that can update without rebuilding the complete static archive. Browser reads fall back to the data bundled with the last published site if the newer remote feed is unavailable.",
    ],
    stack: [
      "Next.js",
      "TypeScript",
      "Python",
      "GitHub Actions",
      "QStash",
      "GitHub Pages",
    ],
    screenshots: ["/screenshots/saturday-lab-rankings.png", "/screenshots/saturday-lab-matchup.png"],
    links: { demo: "https://heimweh17.github.io/saturday-lab/", code: "https://github.com/heimweh17/saturday-lab" },
  },
  {
    name: "Geography Dashboard",
    subtitle: "Geospatial Data Platform & Distributed Web Services",
    summary:
      "A full-stack geospatial application that explores OpenStreetMap data and analyzes user-uploaded CSV/GeoJSON datasets. It combines interactive maps, spatial statistics, authenticated workflows, a PostgreSQL database, and separately deployed services.",
    highlights: [
      "Geospatial application: Built a React/TypeScript interface with Leaflet for city search, amenity discovery, map filters, side-by-side city comparisons, and routing. Integrated OpenStreetMap-related services including Nominatim, Overpass, and OSRM.",
      "Backend and data: Built a Python/FastAPI API that parses uploaded CSV and GeoJSON point datasets, validates coordinates, computes bounding boxes and density grids, applies scikit-learn DBSCAN clustering, and stores user data and analysis runs in PostgreSQL.",
      "Microservices and distributed deployment: Separated the web frontend, the main GIS/backend API, the hosted database, and an optional Gemini-powered AI interpretation service. The frontend runs on Vercel, the API on Render, and PostgreSQL on Neon. A separate AI service was previously deployed on AWS and is currently paused to control costs.",
      "Containerization and configuration: Containerized the main FastAPI backend with Docker, using environment variables for service endpoints, database connectivity, API credentials, and CORS origins. The optional AI service is decoupled so the core spatial-analysis workflow still functions without it.",
      "Security and request debugging: Implemented JWT-protected application routes, user-scoped data access, per-user controls on AI requests, and request-ID propagation to correlate calls between services.",
      "External-service resilience: Used bounded requests, retry/fallback behavior, and clear service boundaries when integrating public geospatial APIs and optional AI inference. Deterministic spatial analysis remains separate from AI-generated narrative interpretation.",
    ],
    stack: [
      "React",
      "TypeScript",
      "FastAPI",
      "PostgreSQL",
      "Docker",
      "AWS",
      "Leaflet",
    ],
    screenshots: ["/screenshots/gdb1.png", "/screenshots/geodashboard-2.png", "/screenshots/gdb2.png", "/screenshots/gdb3.png"],
    links: { demo: "https://thegeodashboard.vercel.app/", code: "https://github.com/heimweh17/Geo-Dashboard" },
  },
  {
    name: "ScamShield Hub",
    subtitle: "Full-Stack Cybersecurity Learning Platform",
    summary:
      "A four-person software engineering team project that turns phishing and scam awareness into interactive practice. Learners classify realistic cases, receive feedback, track progress, and use optional social features in a deployed React/Express application.",
    highlights: [
      "Team and scope: Led a four-person development team building an end-to-end learning platform, helping coordinate frontend, backend, data models, and release work.",
      "Learning experience: Implemented case browsing and filtering, classification of suspicious emails/messages/websites, feedback on decisions, completed-case review, learning progress, badges, and leaderboards.",
      "Backend design: Built Express REST endpoints and MongoDB/Mongoose data models for users, cases, votes, comments, messages, groups, and user activity, with clear separation between route handlers, models, and authentication middleware.",
      "Accounts and permissions: Added JWT-based sessions, bcrypt password hashing, role-based authorization, and Resend email verification. Temporary pending-signup records avoid permanently creating accounts before verification is completed.",
      "Deployment: Deployed the React frontend on Vercel and the Node.js API on Render, with MongoDB Atlas for persistence and Resend for transactional verification email. Considered CORS, environment configuration, API availability, and end-to-end testing across services.",
      "Data integrity lesson: Identified that an original database seed process could delete manually created cases and invalidate related votes. Guarded destructive seeding behind an explicit opt-in flag and disabled accidental invocation in normal development workflows.",
    ],
    stack: [
      "React",
      "Node.js",
      "Express",
      "MongoDB",
      "Mongoose",
      "JWT",
      "Resend",
    ],
    screenshots: ["/screenshots/scamshield-home.png", "/screenshots/scamshield-admin.png", "/screenshots/scamshield-cases.png"],
    links: { demo: "https://scamshieldhub.vercel.app/", code: "https://github.com/heimweh17/ScamShield-Hub" },
  },
  {
    name: "SwampGuard",
    subtitle: "AI-Assisted Insurance Claims Prototype",
    summary:
      "A prototype that combines photos, uploaded documents, and structured estimation logic to help users understand potential damage claims and policy considerations. It explores how AI interpretation can support human review of source material.",
    highlights: [
      "Built a prototype workflow for submitting damage images and supporting documents, producing structured summaries and preliminary itemized estimates rather than an official insurance adjustment.",
      "Used FastAPI image-processing endpoints, document extraction, Pydantic request models, and JSON-formatted AI responses to organize inputs and outputs for review in the UI.",
      "Explored policy-aware estimate logic and Gemini-based questions about insurance topics; treated model-generated explanations and calculations as reviewable guidance, not verified legal, financial, or insurance advice.",
    ],
    stack: [
      "React",
      "FastAPI",
      "Python",
      "Pydantic",
    ],
    screenshots: ["/screenshots/swampguard-1.jpg", "/screenshots/swampguard-2.jpg", "/screenshots/swampguard-3.jpg", "/screenshots/swampguard-4.jpg", "/screenshots/swampguard-5.jpg"],
    links: { code: "https://github.com/heimweh17/SwampGuard" },
  },
  {
    name: "UF Health SmartScribe",
    subtitle: "Real-Time Clinical Documentation Prototype",
    summary:
      "A hackathon prototype that converts a clinician-patient conversation into an editable SOAP-style note using speech transcription and AI-assisted structuring.",
    highlights: [
      "Built a browser audio workflow using streaming transcription and speaker diarization to distinguish conversational turns and prepare text for note generation.",
      "Integrated Deepgram for transcription and a Gemini-based processing stage to extract key information and draft structured SOAP-style notes, with human review and editing before use.",
      "Used Supabase authentication and persistent storage to demonstrate how generated notes could be organized and retrieved as part of a larger application workflow.",
    ],
    stack: [
      "Node.js",
      "Supabase",
      "Deepgram",
      "Gemini API",
    ],
    screenshots: ["/screenshots/smartscribe-1.png", "/screenshots/smartscribe-2.png"],
    links: { code: "https://github.com/heimweh17/SmartScribe" },
  },
  {
    name: "Ability Bridge",
    subtitle: "Computer-Vision Accessibility Interface",
    summary: "A hands-free desktop-control prototype that translates webcam-based facial movement into cursor actions and Morse-code-style input, exploring how computer vision can make interaction more accessible.",
    highlights: [
      "Used Python, OpenCV, and MediaPipe face landmarks to interpret head movement and facial gestures as input signals without requiring specialized hardware.",
      "Combined head-pose estimation with smoothing, hysteresis, and debouncing to reduce cursor jitter and accidental gestures in a real-time interaction loop.",
      "Connected recognized signals to desktop actions through PyAutoGUI, including cursor control, gesture-based clicks, and Morse-code-style typing.",
    ],
    stack: [
      "Python",
      "OpenCV",
      "MediaPipe",
      "PyAutoGUI",
    ],
    links: { code: "https://github.com/heimweh17/Ability-Bridge" },
  },
  {
    name: "Grade Track",
    subtitle: "Student Data Analytics Dashboard",
    summary: "A full-stack dashboard that turns exported course-grade CSV files into interactive summaries, distributions, and trends, with a Flask API and a containerized local development setup.",
    highlights: [
      "Implemented CSV ingestion and data transformation for course, assignment, and student-level grade records, exposing analysis results through Flask REST endpoints.",
      "Built a React-based interface with charts for grade distributions, class averages, medians, and trends, helping users explore patterns that are difficult to see in raw exports.",
      "Used SQLAlchemy with PostgreSQL for the application and SQLite for test fixtures, plus Docker Compose for a repeatable local environment with separate frontend and backend services.",
    ],
    stack: [
      "Flask",
      "React",
      "SQLAlchemy",
      "PostgreSQL",
      "Docker Compose",
    ],
    screenshots: ["/screenshots/gradetrack-1.png"],
    links: { code: "https://github.com/heimweh17/Grade-Track" },
  },
  {
    name: "Other Projects",
    subtitle: "Algorithms, Systems Programming & Small Builds",
    summary: "Smaller projects and coursework that strengthened my understanding of algorithms, low-level programming, data structures, testing, and interactive application logic.",
    highlights: [],
    stack: ["C++", "Python", "SFML", "Algorithms"],
    links: {},
    smallProjects: [
      {
        name: "Minesweeper (SFML)",
        summary: "A C++ desktop Minesweeper game with recursive tile clearing, flagging, pause/debug controls, a timer, and a persistent leaderboard. Focused on event handling, state transitions, and file I/O.",
        stack: ["C++", "SFML", "File I/O"],
        links: { code: "https://github.com/heimweh17/Minesweeper-game" },
      },
      {
        name: "Bin Packing: Best-Fit vs First-Fit",
        summary: "A C++ experiment comparing heuristic packing strategies on large rectangle datasets, examining runtime and packing-quality tradeoffs rather than assuming one heuristic wins on every input.",
        stack: ["C++", "Algorithms", "Analysis"],
        links: { code: "https://github.com/heimweh17/best-fit-fitst-fit" },
      },
      {
        name: "AVL Tree Data Structure",
        summary: "A C++ implementation of an AVL tree supporting insert, delete, search, and rebalancing rotations, with tests covering structural correctness and edge cases.",
        stack: ["C++", "Data Structures", "Testing"],
        links: { code: "https://github.com/heimweh17/AVL-TREE" },
      },
      {
        name: "Sudoku Game",
        summary: "A Python Sudoku application with multiple difficulty levels, input validation, reset behavior, and clear game-state/error feedback.",
        stack: ["Python", "Game Logic", "UI State"],
        links: { code: "https://github.com/heimweh17/suduku-project" },
      },
    ],
  },
];

const skillGroups = [
  ["Languages & Scripting","Python","C/C++","Java","JavaScript / TypeScript","SQL","Bash","PowerShell","DOS Batch"],
  ["Software & Backend","React","Next.js","Node.js","Express","FastAPI","Flask","REST APIs","SQLAlchemy"],
  ["Data, AI & GIS","Pandas","NumPy","SciPy","scikit-learn","OpenCV","MediaPipe","Leaflet","ArcGIS Pro","Google Earth Engine"],
  ["Databases","PostgreSQL","MongoDB","MySQL / MariaDB","SQLite"],
  ["Cloud & Automation","Docker","AWS","Vercel","Render","Git","GitHub Actions","QStash","Linux / Unix"],
  ["Systems & Infrastructure","Bare-Metal Provisioning","IPMI / BMC","BIOS / UEFI","RAID","TCP/IP","POSIX / IPC","Make","Valgrind"],
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
            <div className="detail-heading">{overlay.item.logo ? <img className="detail-logo" src={overlay.item.logo} alt={`${overlay.item.organization} logo`} /> : null}<div><p className="detail-kicker">{overlay.item.organization}</p><h2>{overlay.item.role}</h2><p className="detail-meta">{overlay.item.period} / {overlay.item.location}</p></div></div>
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
            {overlay.item.highlights.length ? <><h3>Project notes</h3><ul className="detail-list">{overlay.item.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}</ul></> : null}
            {overlay.item.smallProjects?.length ? <><h3>Projects in this collection</h3><div className="small-project-grid">{overlay.item.smallProjects.map((project) => <article className="small-project-card" key={project.name}><h4>{project.name}</h4><p>{project.summary}</p><div className="stack-list">{project.stack.map((tech) => <span key={tech}>{tech}</span>)}</div><div className="detail-links">{project.links.demo ? <External href={project.links.demo}>Live demo</External> : null}{project.links.code ? <External href={project.links.code}>Source code</External> : null}</div></article>)}</div></> : null}
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
  const [beyondWorkOpen, setBeyondWorkOpen] = useState(false);

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
            <div><h1 id="intro-title">Alex Liu</h1><p className="hero-title">Building software, data systems, and reliable infrastructure.</p></div>
            <div className="hero-profile">
              <img src="/me.jpg" alt="Alex Liu" />
              <div><p>I'm a Computer Science student at the University of Florida with hands-on experience in full-stack development, data engineering, infrastructure operations, and automation. I enjoy building useful applications and understanding the systems that power them.</p><div className="hero-actions"><a className="text-link" href="#work">Experience <ArrowUpRight aria-hidden="true" size={15} /></a><button type="button" className="text-link" onClick={() => setOverlay({ type: "resume" })}>View resume <ArrowUpRight aria-hidden="true" size={15} /></button></div></div>
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
            <p>I'm a junior studying Computer Science at the University of Florida, pursuing a certificate in Geospatial Information Analysis. My interests span software engineering, data systems, and infrastructure, particularly where these areas come together to solve real-world problems.</p>
            <p>My professional experience has given me the opportunity to work on both sides of engineering. At Database Mart, I worked directly with production bare-metal servers, handling hardware provisioning, networking, troubleshooting, and firmware automation. At UF's GeoPlan Center, I work with transportation-safety data and have developed internal software tools that automate repetitive review tasks, integrate AI services, and improve data validation.</p>
            <p>Outside of work, I build software projects that connect these interests. Saturday Lab combines statistical modeling with a web application and automated publishing pipelines. Geography Dashboard brings together geospatial data processing, backend development, databases, and cloud deployment. Other projects have given me experience in cybersecurity, computer vision, and collaborative software development.</p>
            <p>What I find most rewarding is understanding how different parts of a system fit together. I care about more than getting an application to run: I want to understand how it is built, how it handles failures, how it can be maintained, and whether it genuinely helps the people using it.</p>
          </div>
        </section>

        <section id="work" className="work-section" aria-labelledby="work-title">
          <div className="section-intro"><p className="section-index">Experience</p><div><h2 id="work-title">Professional work</h2><p>From production data-center operations to internal software tools and transportation-data quality, I've worked on both the infrastructure that runs systems and the workflows people depend on.</p></div></div>
          <div className="experience-list">{experience.map((item) => <article className="experience-row" key={`${item.organization}-${item.role}`}><div className="experience-dates"><span>{item.period}</span><span>{item.location}</span></div><div className="experience-body"><h3>{item.role}</h3><p className="organization">{item.organization}</p><p className="experience-summary">{item.description}</p><button type="button" className="detail-trigger" onClick={() => setOverlay({ type: "experience", item })}>Read experience <ArrowUpRight size={15} /></button></div><div className="tag-list" aria-label={`${item.organization} skills`}>{item.tags.map((tag) => <span key={tag}>{tag}</span>)}</div></article>)}</div>
        </section>

        <section id="projects" className="projects-section" aria-labelledby="projects-title">
          <div className="projects-heading"><div><p className="section-index">Projects</p><h2 id="projects-title">Selected projects</h2></div><p>Selected work spanning full-stack applications, data and AI systems, infrastructure automation, and practical experiments. Open a project for the technical decisions and challenges behind it.</p></div>
          <div className="project-grid">{projects.map((project, index) => <article className={`project-card project-card-${index + 1}`} key={project.name}><div className="project-number">0{index + 1}</div><div><p className="project-subtitle">{project.subtitle}</p><h3>{project.name}</h3></div><p className="project-summary">{project.summary}</p>{project.screenshots?.[0] ? <img className="project-preview" src={project.screenshots[0]} alt="" /> : null}<div className="project-bottom"><div className="stack-list">{project.stack.map((tech) => <span key={tech}>{tech}</span>)}</div><button type="button" className="detail-trigger" onClick={() => setOverlay({ type: "project", item: project })}>View project <ArrowUpRight size={15} /></button></div></article>)}</div>
        </section>

        <section id="about" className="about-section" aria-labelledby="about-title">
          <div className="about-copy"><p className="section-index">About</p><h2 id="about-title">A practical technical perspective.</h2><p>I study Computer Science at the University of Florida and am pursuing a certificate in Geospatial Information Analysis. My experiences have taken me from physical servers in a data center to backend APIs, geospatial analytics, internal automation tools, and independent software projects. I enjoy crossing those boundaries because it helps me understand how individual technical decisions affect the larger system.</p><p>I value careful troubleshooting, clear interfaces, verifiable results, and tools that are useful outside a demo. Whether I'm reviewing imperfect transportation data, improving a firmware workflow, or maintaining an automated publishing pipeline, I try to identify the real problem first and make the solution easier to understand, test, and maintain.</p></div>
          <aside className="profile-panel"><dl><div><dt>Education</dt><dd>B.S. Computer Science, expected May 2028<br />Geospatial Information Analysis Certificate / University of Florida</dd></div><div><dt>GPA</dt><dd>3.78 / 4.00</dd></div><div><dt>Focus</dt><dd>Software Engineering / Data & Applied AI / DevOps & Infrastructure</dd></div><div><dt>Outside work</dt><dd>OpenStreetMap volunteer since 2020; photography, badminton, and pickleball</dd></div></dl></aside>
        </section>

        <section className="skills-section" aria-labelledby="skills-title"><div><p className="section-index">Skills</p><h2 id="skills-title">Tools I use</h2></div><div className="skills-list">{skillGroups.map(([title, ...skills]) => <div className="skill-row" key={title}><h3>{title}</h3><p>{skills.join(" / ")}</p></div>)}</div></section>
        <section className="beyond-work-section" aria-labelledby="beyond-work-title">
          <div className="beyond-work-heading"><p className="section-index">Beyond work</p><h2 id="beyond-work-title">The context behind the work.</h2></div>
          <div className="beyond-work-content">
            <p className="beyond-work-intro">Outside of engineering projects, I keep up with mapping, teaching, community events, photography, and racket sports. Those interests have taught me to pay attention to details, collaborate with different people, and stay curious about the places and systems around me.</p>
            <div className="beyond-work-glimpse" aria-label="Beyond work highlights"><span>OpenStreetMap contributor since 2020</span><span>Mentoring and campus community</span><span>Lion and dragon performance</span><span>Photo walks and racket sports</span></div>
            <button type="button" className="beyond-work-toggle" aria-expanded={beyondWorkOpen} aria-controls="beyond-work-details" onClick={() => setBeyondWorkOpen((isOpen) => !isOpen)}>{beyondWorkOpen ? "Show less" : "Read beyond work"} <span aria-hidden="true">{beyondWorkOpen ? "−" : "+"}</span></button>
            {beyondWorkOpen ? (
              <div id="beyond-work-details" className="beyond-work-details">
                <article><div className="beyond-work-item-heading"><img src="/logos/osm_logo.svg" alt="OpenStreetMap logo" /><h3>OpenStreetMap</h3></div><p>I've contributed to OpenStreetMap since 2020, editing roads, places, and land-use information using imagery, local context, and careful tagging. Long-term mapping has made me appreciate the importance of good source data: small corrections can improve navigation, analysis, and tools used by people I may never meet.</p><External href="https://www.openstreetmap.org/">Explore OpenStreetMap</External></article>
                <article><div className="beyond-work-item-heading"><img src="/logos/casa_logo.jpg" alt="UF CASA logo" /><h3>Mentoring and community</h3></div><p>I've taught mathematics and logic to younger students and enjoy making unfamiliar ideas easier to approach. At UF, I also contribute to student organizations that create professional, cultural, and social spaces where people can learn and connect.</p><External href="https://orgs.studentinvolvement.ufl.edu/Organization/Chinese-American-Student-Association">UF CASA</External></article>
                <article><div className="beyond-work-item-heading"><img src="/logos/jiating_logo.jpg" alt="JiaTing Lion and Dragon logo" /><h3>Cultural performance</h3></div><p>Performing lion and dragon dance taught me a different kind of teamwork: timing, nonverbal communication, preparation, and trusting other people to do their part. It was a welcome challenge outside a computer screen.</p><External href="https://jiatingliondragon.com/">JiaTing Lion & Dragon</External></article>
                <article><h3>Photography and exploration</h3><p>Photography walks and road trips make me more observant about places, roads, signs, and everyday public spaces. That curiosity overlaps naturally with my interest in geography and OpenStreetMap.</p></article>
                <article><h3>Off the clock</h3><p>I play badminton and pickleball, and I enjoy the balance of movement, strategy, and friendly competition. I also listen to audiobooks while traveling.</p></article>
              </div>
            ) : null}
          </div>
        </section>
        <section className="contact-section" aria-labelledby="contact-title"><p className="section-index">Contact</p><h2 id="contact-title">Let's build something useful.</h2><p>I'm interested in 2027 internships and opportunities across software engineering, data and applied AI, and DevOps/infrastructure. If my work overlaps with something your team is building, I'd be glad to connect.</p><div className="contact-links"><a href={`mailto:${site.email}`}><Mail size={17} />Email</a><a href={site.linkedin} target="_blank" rel="noreferrer"><Linkedin size={17} />LinkedIn</a><a href={site.github} target="_blank" rel="noreferrer"><Github size={17} />GitHub</a><a href="/zh"><MapPin size={17} />Chinese site</a></div></section>
      </main>

      <footer className="site-footer"><p>Thoughtful systems, built for the real world.</p><div><span>Alex Liu</span><span>2026</span></div></footer>
      <DetailOverlay overlay={overlay} onClose={() => setOverlay(null)} />
    </div>
  );
}
