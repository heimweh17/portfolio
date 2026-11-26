export type Experience = {
  slug: string;
  role: string;
  organization: string;
  period: string;
  location: string;
  description: string;
  bullets: string[];
  tags: string[];
  logo?: string;
};

export type ProjectLinks = { code?: string; demo?: string };

type SmallProject = {
  name: string;
  summary: string;
  stack: string[];
  links: ProjectLinks;
};

export type Project = {
  slug: string;
  name: string;
  subtitle: string;
  summary: string;
  highlights: string[];
  stack: string[];
  screenshots?: string[];
  links: ProjectLinks;
  smallProjects?: SmallProject[];
};

export const site = {
  email: "haozhouliu17@gmail.com",
  github: "https://github.com/heimweh17",
  linkedin: "https://www.linkedin.com/in/alex-liu7/",
  resume: "/resume.pdf",
};

export const experience: Experience[] = [
  {
    role: "Operational Engineering Intern",
    slug: "database-mart",
    organization: "Database Mart",
    period: "May 2026 - Jul 2026",
    location: "Kansas City, Missouri",
    description:
      "I set up bare-metal servers for hosting customers, handled hardware repairs, and built a tool that checks the motherboard before updating its BIOS.",
    bullets: [
      "Provisioned and deployed approximately 60-70 bare-metal servers to customer specifications. Configured storage devices, network connectivity, and IPMI/BMC out-of-band management, then checked system health and readiness before handoff.",
      "Completed more than 300 service and maintenance requests involving server boot issues, storage/RAID problems, connectivity failures, thermal alerts, component replacements, and hardware upgrades. Worked from reported symptoms through diagnosis, repair, and post-maintenance verification.",
      "Developed a FreeDOS-based BIOS update workflow for roughly 30 Supermicro motherboard models. Used DOS Batch, PowerShell, and DMI/SMBIOS information to detect the motherboard, identify installed firmware, and match it with a validated update package and target version.",
      "Designed the automation to stop rather than guess when hardware identification or firmware mapping was uncertain, and to skip unnecessary updates when the installed version was already current. The workflow calls the vendor’s flashing utilities.",
      "Performed hardware stress tests, BMC-based health checks, and post-repair diagnostics to detect instability and confirm that systems were ready to return to service.",
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
    slug: "uf-geoplan-center",
    organization: "UF GeoPlan Center",
    period: "Apr 2026 - Present",
    location: "Gainesville, Florida",
    description:
      "I check where Florida crashes happened and how they’re classified. I also built review tools that cut average processing time by about 75% in the assisted workflow.",
    bullets: [
      "Review crash reports, police narratives, diagrams, and geographic context to validate crash locations, roadway classifications, and related records used in transportation-safety analysis.",
      "Built an internal Chrome extension and local Node.js backend that extract relevant text and images from crash-report PDFs, send appropriate inputs to AI services, and return structured classification recommendations within the review workflow.",
      "Reduced average processing time in the assisted review workflow by approximately 75% while keeping the reviewer responsible for interpreting evidence, verifying recommendations, and entering final values.",
      "Built a separate diagram quality-assurance tool to compare crash diagrams with police narratives and vehicle information, highlighting potential contradictions for human review. Structured outputs and explicit checks make uncertain results easier to investigate.",
      "Diagnosed failures across PDF preprocessing, the Node.js service, and third-party vision-model APIs. When an upstream model stopped accepting the expected image inputs, isolated the API compatibility issue, selected a compatible approach, and adapted preprocessing to changed image-request limits.",
      "Prefer deterministic extraction when information can be read directly, and reserve AI interpretation for ambiguous content. Expose evidence and independent checks instead of treating model output as authoritative; this design choice improves both reviewer trust and operational reliability.",
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
    slug: "uf-sase",
    organization: "UF Society of Asian Scientists & Engineers",
    period: "Aug 2025 - Present",
    location: "Gainesville, Florida",
    description:
      "I help organize professional and social events for UF SASE.",
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

export const projects: Project[] = [
  {
    slug: "saturday-lab",
    name: "Saturday Lab",
    subtitle: "College football rankings & forecasts",
    summary:
      "I built a site for comparing college football teams and following the season. Live scores update separately from the weekly rankings.",
    highlights: [
      "Built a Next.js and TypeScript site with searchable FBS rankings, game centers, team-season reports, historical snapshots, matchup exploration, and model documentation. The static build generates more than 9,000 pages, preserving navigable game and ranking history.",
      "Developed Python analytics over nine seasons, more than 7,500 historical games, and 138 FBS teams. The opponent-adjusted model produces win probabilities and rankings, with time-ordered retrospective evaluation using only information available before each evaluated game.",
      "Preserved historical pregame predictions and made model audits, calibration results, and research outputs available for inspection. The model picked the winner about 72% of the time in retrospective tests on 2023–2025 games. Those seasons were part of model development.",
      "Built GitHub Actions workflows that acquire data, verify source completeness, run Python tests and TypeScript/Python consistency checks, lint, build the Next.js static export, and publish validated artifacts to GitHub Pages.",
      "Integrated an independent QStash refresh clock with GitHub Actions, with slower native GitHub schedules as a fallback. Formal model and ranking snapshots follow a separate weekly publication cycle.",
      "Added retries for transient refresh failures, shared concurrency controls to prevent conflicting data writes, protection against duplicate weekly releases, and readiness checks that defer a publication when upstream game data is incomplete.",
      "Kept frequently changing scores and game status in a lightweight feed that can update without rebuilding the complete static archive. Browser reads fall back to the data bundled with the last published site if the newer remote feed is unavailable.",
    ],
    stack: [
      "Next.js",
      "TypeScript",
      "Python",
      "GitHub Actions",
      "QStash",
      "GitHub Pages",
    ],
    screenshots: ["/screenshots/saturday-lab-desktop-rankings.jpg", "/screenshots/saturday-lab-desktop-matchup.jpg", "/screenshots/saturday-lab-desktop-trends.jpg", "/screenshots/saturday-lab-matchup.png"],
    links: { demo: "https://heimweh17.github.io/saturday-lab/", code: "https://github.com/heimweh17/saturday-lab" },
  },
  {
    slug: "geography-dashboard",
    name: "Geography Dashboard",
    subtitle: "Interactive mapping & spatial analysis",
    summary:
      "Upload a CSV or GeoJSON file to see where points cluster, or explore a city using OpenStreetMap data. I also built a local Kubernetes setup for the app.",
    highlights: [
      "Built a React/TypeScript and FastAPI application integrating OpenStreetMap services, CSV/GeoJSON uploads, PostgreSQL, DBSCAN clustering, density analysis, and interactive Leaflet visualizations.",
      "Independently deployed the frontend, GIS backend, and database across Vercel, Render, and Neon, separating deterministic spatial analysis from optional Gemini-powered AI inference. The AI service was previously deployed on AWS and is currently paused.",
      "Deployed containerized React, FastAPI, and PostgreSQL services on a local Kubernetes (kind) cluster, configuring Deployments, StatefulSets, persistent storage, health probes, resource limits, and rolling updates.",
      "Integrated Prometheus and Grafana to track API availability, request throughput, p95 latency, and error rates. Defined alert rules and implemented structured JSON logging and cross-service request correlation.",
      "Built GitHub Actions pipelines for automated linting, tests, Docker builds, and infrastructure validation, including Kubernetes Kustomize manifests and backend health checks.",
      "Developed and validated Terraform configurations for AWS ECR with immutable image tags, image scanning, lifecycle policies, and resource tagging. I stopped at validation.",
      "Implemented database-aware readiness checks, Alembic migration Jobs, JWT authentication, and an optional AI service overlay, keeping core GIS functionality available independently of AI inference.",
    ],
    stack: [
      "React",
      "TypeScript",
      "Python",
      "FastAPI",
      "PostgreSQL",
      "Leaflet",
      "Docker",
      "Kubernetes",
      "AWS",
      "Terraform",
      "Prometheus",
      "Grafana",
      "GitHub Actions",
    ],
    screenshots: ["/screenshots/gdb1.png", "/screenshots/geodashboard-2.png", "/screenshots/gdb2.png", "/screenshots/gdb3.png"],
    links: { demo: "https://thegeodashboard.vercel.app/", code: "https://github.com/heimweh17/Geo-Dashboard" },
  },
  {
    slug: "scamshield-hub",
    name: "ScamShield Hub",
    subtitle: "Full-Stack Cybersecurity Learning Platform",
    summary:
      "Practice spotting phishing in sample emails, texts, and websites. Each answer comes with feedback, and the app saves your progress.",
    highlights: [
      "Led a four-person development team building an end-to-end learning platform, helping coordinate frontend, backend, data models, and release work.",
      "Implemented case browsing and filtering, classification of suspicious emails/messages/websites, feedback on decisions, completed-case review, learning progress, badges, and leaderboards.",
      "Built Express REST endpoints and MongoDB/Mongoose data models for users, cases, votes, comments, messages, groups, and user activity, with clear separation between route handlers, models, and authentication middleware.",
      "Added JWT-based sessions, bcrypt password hashing, role-based authorization, and Resend email verification. Temporary pending-signup records avoid permanently creating accounts before verification is completed.",
      "Deployed the React frontend on Vercel and the Node.js API on Render, with MongoDB Atlas for persistence and Resend for transactional verification email. Considered CORS, environment configuration, API availability, and end-to-end testing across services.",
      "Identified that an original database seed process could delete manually created cases and invalidate related votes. Guarded destructive seeding behind an explicit opt-in flag and disabled accidental invocation in normal development workflows.",
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
    slug: "swampguard",
    name: "SwampGuard",
    subtitle: "AI-Assisted Insurance Claims Prototype",
    summary:
      "A prototype that drafts a repair estimate from damage photos and insurance documents for someone to review.",
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
    slug: "smart-scribe",
    name: "UF Health SmartScribe",
    subtitle: "Real-Time Clinical Documentation Prototype",
    summary:
      "A hackathon prototype that transcribes a clinician-patient conversation and drafts an editable SOAP note.",
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
    slug: "ability-bridge",
    name: "Ability Bridge",
    subtitle: "Computer-Vision Accessibility Interface",
    summary: "Control a cursor and type in Morse code using facial movements tracked by a webcam.",
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
    slug: "grade-track",
    name: "Grade Track",
    subtitle: "Student Data Analytics Dashboard",
    summary: "A dashboard for exploring grade distributions, class averages, and trends from course CSV exports.",
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
    slug: "other-projects",
    name: "Other Projects",
    subtitle: "Algorithms, Systems Programming & Small Builds",
    summary: "Coursework and small builds, including an AVL tree, a bin-packing comparison, Minesweeper, and Sudoku.",
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

export const skillGroups = [
  ["Languages & Scripting","Python","C/C++","Java","JavaScript / TypeScript","SQL","Bash","PowerShell","DOS Batch"],
  ["Software & Backend","React","Next.js","Node.js","Express","FastAPI","Flask","REST APIs","SQLAlchemy"],
  ["Data, AI & GIS","Pandas","NumPy","SciPy","scikit-learn","OpenCV","MediaPipe","Leaflet","ArcGIS Pro","Google Earth Engine","Streamlit"],
  ["Databases","PostgreSQL","MongoDB","MySQL / MariaDB","SQLite","Snowflake"],
  ["Cloud & Automation","Docker","AWS","Vercel","Render","Git","GitHub Actions","QStash","Linux / Unix","Kubernetes","Terraform","Prometheus","Grafana"],
  ["Systems & Infrastructure","Bare-Metal Provisioning","IPMI / BMC","BIOS / UEFI","RAID","TCP/IP","POSIX / IPC","Make","Valgrind"],
];
