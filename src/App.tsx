import React, { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
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
  Phone,
  ChevronLeft,
  Sparkles,
  LayoutTemplate,
  Grid,
  User,
  GraduationCap,
  Heart,
  Camera,
  Cpu,
  Terminal,
  X,
  Zap,
  Layers,
  ArrowUpRight,
  ChevronRight,
  Star,
  BookOpen,
  Send,
  Loader2,
  Globe,
  ChevronDown,
  ChevronUp,
  Film,
  Coffee,
  Download,
  Instagram, // Added Instagram Icon
} from "lucide-react";

// -----------------------------
// 0) CONFIG
// -----------------------------
const FORM_ENDPOINT = "https://public.herotofu.com/v1/YOUR-FORM-ID";

// -----------------------------
// 1) DATA
// -----------------------------
const SITE = {
  name: "Alex Liu",
  headline: "Alex Liu",
  tagline: "CS @ University of Florida · Geography Minor · Full-Stack + GIS",
  location: "Gainesville, FL",
  latlong: "29.6516° N, 82.3248° W",
  availability: "Summer 2026 Internship",
  links: {
    github: "https://github.com/heimweh17",
    linkedin: "https://www.linkedin.com/in/alex-liu7/",
    // Updated Instagram Link
    instagram: "https://www.instagram.com/alexliu1700/",
    email: "haozhouliu17@gmail.com",
    resume: "/resume.pdf",
    phone: "+1 (352) 328-4805",
    map: "https://www.google.com/maps/place/Gainesville,+FL",
    osm: "https://www.openstreetmap.org/",
    website: "https://aliu.me",
    zh: "/zh",
  },
};

const ABOUT = {
  p1: "I’m a Computer Science student at the University of Florida exploring the intersection of code, data, and the physical world. I specialize in building systems that transform messy real-time data into intuitive, actionable tools.",
  p2: "Whether it's creating interactive maps, optimizing backend algorithms, or designing accessible interfaces, I love solving problems that have a tangible impact. I am currently authorized to work in the U.S. and do not require sponsorship.",
  highlights: [
    "Focus: Data Structures & Algorithms · Systems · Full-Stack",
    "Geospatial: OpenStreetMap mapping + GIS analytics + visualization",
    "Stack: C++ · Python · TypeScript/React · FastAPI/Flask · SQL · Docker · CI/CD",
    "Interests: HCI & Accessibility · Data Viz · Mapping · Clean UI engineering",
  ],
  quickFacts: [
    { k: "Status", v: "UF CS (Class of 2028)" },
    { k: "Location", v: "Gainesville, FL" },
    { k: "Open to", v: "Summer 2026 internships" },
    { k: "Fun", v: "Road trips + photo walks + audiobooks" },
  ],
};

const UPDATES = [
  {
    category: "Tech",
    title: "New project!",
    date: "01-27-2026",
    icon: Cpu,
    desc: "I made a new project called SwampGuard! It's an AI-powered insurance claims assistant that analyzes damage photos and policy documents to generate itemized estimates and statute-grounded guidance. Check it out in my Projects section! Come and check it out!",
    accent: { hue: 30, sat: 90, light: 60 }
  },
  {
    category: "Life",
    title: "Happy New Year",
    date: "01-01-2026",
    icon: Cpu,
    desc: "Happy New Year everyone!",
    accent: { hue: 30, sat: 90, light: 60 }
  },

  {
    category: "Tech",
    title: "GIS",
    date: "12-24-2025",
    icon: Cpu,
    desc: "Trying to learn more about GIS concepts and tools beyond just OpenStreetMap. Currently trying to learn them from online courses.",
    accent: { hue: 30, sat: 90, light: 60 }
  },
  {
    category: "Tech",
    title: "Refining GeoDashboard",
    date: "12-20-2025",
    icon: Terminal,
    desc: "Currently optimizing the DBSCAN clustering algorithm to handle larger datasets in real-time. Also experimenting with WebGPU for smoother client-side map rendering.",
    accent: { hue: 210, sat: 90, light: 60 }
  },
  {
    category: "Tech",
    title: "Rust & Systems",
    date: "12-15-2025",
    icon: Cpu,
    desc: "Dipping my toes into Rust to understand memory safety without garbage collection. Rewriting some of my C++ bin-packing algorithms to compare performance.",
    accent: { hue: 30, sat: 90, light: 60 }
  },
  {
    category: "Life",
    title: "ZOOTOPIA",
    date: "12-01-2025",
    icon: Film,
    desc: "I really want to watch thsi movie. I heared its good.",
    accent: { hue: 340, sat: 80, light: 60 }
  },
  {
    category: "Life",
    title: "Interstellar",
    date: "10-30-2025",
    icon: Film,
    desc: "Rewatched Interstellar. Such a good movie!",
    accent: { hue: 340, sat: 80, light: 60 }
  }
];

type ItemContent = {
  type: "project" | "experience";
  name: string;
  subtitle: string;
  date?: string;
  blurb: string;
  tags: string[];
  links?: { demo?: string; code?: string; website?: string };
  highlights?: string[];
  longDescription?: React.ReactNode;
  accent?: { hue: number; sat: number; light: number };
  screenshots?: string[];
  logo?: string; // Used for Experience/Org logos
  flagship?: boolean;
  categories?: string[];
};

const PROJECTS: ItemContent[] = [
  {
    type: "project",
    name: "GeoDashboard",
    flagship: true,
    subtitle: "Distributed Geospatial Analytics Platform",
    blurb: "Cloud-native geospatial platform utilizing distributed microservices to couple deterministic GIS processing with cost-aware AI inference, featuring end-to-end system observability.",
    highlights: [

        "Architected a decoupled microservices system on AWS with end-to-end distributed tracing (X-Request-ID) for cross-service observability.",

        "Systematized automated deployment via GitHub Actions (CI/CD) and Docker to ensure consistent configuration across hybrid cloud environments.",

        "Engineered a high-performance spatial engine (DBSCAN) augmented by rate-limited Generative AI to transform raw data into city-scale insights.",
    ],
    longDescription: (
        <div className="space-y-4 text-sm text-white/80 leading-relaxed">
            <p>
               
                GeoDashboard is an interactive analytics platform designed to bridge the gap between raw data and actionable insights. It enables users to easily ingest high-density spatial datasets (CSV/GeoJSON) to visualize spatial distributions, perform rigorous DBSCAN clustering, and receive <strong>plain-language AI summaries</strong> that explain complex urban patterns instantly.
            </p>
            <p>
              
                <strong>Distributed Architecture:</strong> The system utilizes a decoupled microservices design to ensure scalability. The <em>Core Spatial Engine</em> (FastAPI/PostGIS on Railway) handles low-latency deterministic computation, while the <em>AI Inference Service</em> operates as an isolated microservice on <strong>AWS ECS</strong>. Crucially, the platform implements <strong>end-to-end request tracing</strong> (via X-Request-ID propagation), enabling precise debugging and observability across distributed service boundaries without compromising the interactive map experience.
            </p>
            <p>
                
                <strong>Engineering Philosophy:</strong> Built with a "production-first" mindset, GeoDashboard integrates automated <strong>CI/CD pipelines</strong> via GitHub Actions for reliable containerized deployment. It features strict database-backed rate limiting to manage AI costs, simulating a robust, commercially viable enterprise environment.
            </p>
        </div>
    ),
    tags: ["React", "TypeScript", "FastAPI", "AWS ECS", "PostGIS", "Docker", "CI/CD"],
    links: {
        demo: "https://thegeodashboard.vercel.app/",
        code: "https://github.com/heimweh17/Geo-Dashboard",
    },
    accent: { hue: 205, sat: 95, light: 60 },
    screenshots: ["/screenshots/gdb1.png", "/screenshots/geodashboard-2.png","/screenshots/gdb2.png","/screenshots/gdb3.png"],
    categories: ["Geospatial & Maps", "Web & Data"],
},
  {
    type: "project",
    name: "UF Health SmartScribe",
    flagship: true,
    subtitle: "Real-Time AI Clinical Documentation", // 升级 Subtitle
    blurb: "High-velocity Hackathon prototype engineered in 24 hours: transforms patient conversations into structured medical records via streaming AI pipelines.",
    highlights: [
      "Engineered a real-time transcription pipeline utilizing Deepgram streams and Gemini AI for <5s latency.", // 强调延迟数据
      "Architected a speaker-aware SOAP note generation engine, reducing clinical documentation time by ~60%.", // 强调效率提升
      "Integrated secure patient data handling with Supabase (PostgreSQL) backend.",
    ],
    longDescription: (
        <div className="space-y-4 text-sm text-white/80 leading-relaxed">
            <p>
                Built during the UF Dream Team’s 24-hour DESIGNATHON, SmartScribe addresses physician burnout by automating the Electronic Health Record (EHR) entry process.
            </p>
            <p>
                <strong>Technical Implementation:</strong> 
                <ol className="list-decimal pl-5 space-y-1 mt-2">
                    <li><strong>Real-Time Ingestion:</strong> Captures audio streams via browser APIs and processes them through Deepgram for instant diarized transcription.</li>
                    <li><strong>Clinical Intelligence:</strong> A specialized Gemini AI prompt chain extracts medical facts and structures them into industry-standard SOAP formats (Subjective, Objective, Assessment, Plan).</li>
                    <li><strong>Data Persistence:</strong> Securely stores patient encounters in a Supabase relational database for historical retrieval.</li>
                </ol>
            </p>
        </div>
    ),
    tags: ["Node.js", "Supabase", "Gemini AI", "Deepgram", "Real-time Systems"], // 增加 Real-time Systems
    links: { code: "https://github.com/heimweh17/SmartScribe" },
    accent: { hue: 160, sat: 80, light: 55 },
    screenshots: ["/screenshots/smartscribe-1.png", "/screenshots/smartscribe-2.png"],
    categories: ["Health & Accessibility", "Web & Data"],
  },
  
{
  type: "project",
  name: "SwampGuard",
  flagship: true,
  subtitle: "Policy-Aware AI Claims Intelligence Platform",
  blurb:
    "Hackathon-built claims assistant that turns damage photos + uploaded policy docs into structured claim insights, itemized estimates, and statute-grounded guidance.",
  highlights: [
    "Designed a multimodal claim workflow that combines damage photo analysis with user-uploaded policy data to generate policy-adjusted cost projections.",
    "Engineered multi-image upload and result aggregation pipelines to improve cross-view assessment consistency and user feedback responsiveness.",
    "Integrated receipt/policy extraction + statute-grounded legal Q&A (RAG) to deliver explainable claim guidance and deductible interpretation.",
  ],
  longDescription: (
    <div className="space-y-4 text-sm text-white/80 leading-relaxed">
      <p>
        SwampGuard is a full-stack prototype built to reduce information asymmetry in property insurance claims.
        Users upload multiple damage photos and (optionally) an insurance policy document; the system returns
        structured damage outputs, itemized estimates, and explainable claim guidance.
      </p>

      <p>
        <strong>Backend services:</strong> FastAPI endpoints handle async image analysis and structured document extraction
        (policy + receipt parsing) with strict JSON-shaped responses validated by <strong>Pydantic</strong>. Policy uploads
        feed into deductible/coverage-aware calculations for more personalized estimates.
      </p>

      <p>
        <strong>Claim estimation:</strong> Generates an <em>Xactimate-style</em> line-item breakdown and computes net claim
        projections using deductible and depreciation logic. A statute-grounded legal assistant provides explainable
        next steps and compliance guidance.
      </p>

      <p className="text-xs text-white/60">
        Note: A local CLIP pre-classification path exists in the codebase but was disabled for faster startup in the
        hackathon build.
      </p>
    </div>
  ),
  tags: [
    "React",
    "FastAPI",
    "Python",
    "Gemini Vision",
    "Pydantic",
    "RAG",
    "TailwindCSS",
    "jsPDF",
  ],
  links: {
    // demo: "https://...", // optional
    code: "https://github.com/heimweh17/SwampGuard", // adjust if different
  },
  accent: { hue: 120, sat: 80, light: 55 },
  screenshots: [
    "/screenshots/swampguard-1.jpg",
    "/screenshots/swampguard-2.jpg",
    "/screenshots/swampguard-3.jpg",
    "/screenshots/swampguard-4.jpg",
    "/screenshots/swampguard-5.jpg",
  ],
  categories: ["Web & Data", "AI Systems"],
},


  {
    type: "project",
    name: "Grade Track",
    flagship: true,
    subtitle: "Data-Driven Academic Analytics Platform", // 升级 Subtitle
    blurb: "Full-stack analytics dashboard orchestrating automated data ingestion and statistical visualization for academic performance tracking.",
    highlights: [
      "Engineered a robust CSV ingestion pipeline to transform raw gradebook exports into interactive insights.",
      "Orchestrated containerized deployment via Docker Compose, reducing environment setup time by 85%.", // 强调 DevOps 价值
      "Implemented automated statistical analysis (standard deviation, pass rates) across course datasets.",
    ],
    longDescription: (
        <div className="space-y-4 text-sm text-white/80 leading-relaxed">
            <p>
                Grade Track is more than a grade calculator; it's a data visualization platform designed to reveal performance trends across large academic datasets.
            </p>
            <p>
                <strong>Architecture Deep Dive:</strong>
                <ul className="list-disc pl-5 space-y-1 mt-2">
                    <li><strong>Backend Services:</strong> Python Flask REST API utilizing SQLAlchemy for efficient ORM queries and data aggregation.</li>
                    <li><strong>Data Visualization:</strong> React frontend leveraging Recharts to render dynamic histograms and trend lines from JSON payloads.</li>
                    <li><strong>DevOps:</strong> Fully containerized architecture ensures consistent runtime environments across development and production.</li>
                </ul>
            </p>
        </div>
    ),
    tags: ["Flask", "React", "Docker", "PostgreSQL", "Data Visualization"], // 增加 Data Vis
    links: { code: "https://github.com/heimweh17/Grade-Track" },
    screenshots: ["/screenshots/gradetrack-1.png"],
    accent: { hue: 25, sat: 95, light: 60 },
    categories: ["Web & Data"],
  },
  {
    type: "project",
    name: "Ability Bridge",
    flagship: true,
    subtitle: "Computer Vision Accessibility Interface", // 升级 Subtitle
    blurb: "Hands-free HCI system converting 14,000+ facial landmarks/sec into precise cursor control and Morse code input.", // 强调吞吐量
    highlights: [
      "Engineered a real-time signal processing pipeline using OpenCV & MediaPipe (30 FPS @ <100ms latency).", // 强调性能指标
      "Implemented exponential smoothing and hysteresis filtering to eliminate cursor jitter and false clicks.", // 强调算法细节
      "Designed a multi-modal input system supporting head pose navigation and Morse-code mouth typing.", // 强调交互模式
    ],
    longDescription: (
        <div className="space-y-4 text-sm text-white/80 leading-relaxed">
            <p>
                Ability Bridge lowers the barrier to digital access by transforming a standard webcam into a high-precision input device for users with limited mobility.
            </p>
            <p>
                <strong>Algorithmic Core:</strong>
                <ul className="list-disc pl-5 space-y-1 mt-2">
                    <li><strong>Signal Stabilization:</strong> Applies custom exponential smoothing algorithms to raw facial coordinates, filtering out micro-tremors while maintaining responsiveness.</li>
                    <li><strong>Robust Interaction:</strong> Features a hysteresis-based blink detection system to distinguish intentional commands from involuntary movements.</li>
                    <li><strong>Morse Decoding:</strong> Real-time state machine that translates mouth aspect ratios (MAR) into text input.</li>
                </ul>
            </p>
        </div>
    ),
    tags: ["Python", "OpenCV", "MediaPipe", "PyAutoGUI", "NumPy"], // 增加 NumPy
    links: { code: "https://github.com/heimweh17/Ability-Bridge" },
    accent: { hue: 260, sat: 85, light: 62 },
    categories: ["Health & Accessibility", "Algorithms"], 
    // screenshots: ["/screenshots/ability-bridge.png"], 
  },
  {
    type: "project",
    name: "Minesweeper (SFML)",
    subtitle: "Event-Driven Game Engine", // 升级 Subtitle
    blurb: "Full-featured C++ implementation of the classic puzzle game, featuring recursive tile clearing and persistent leaderboard systems.",
    highlights: [
      "Engineered an object-oriented tile system handling recursive flood-fill algorithms for zero-tile reveals.", // 强调递归算法
      "Implemented a custom file I/O parser to manage persistent leaderboards and player rankings.", // 强调文件处理
      "Optimized event-loop rendering logic using SFML to ensure smooth 60 FPS gameplay.", // 强调性能
    ],
    tags: ["C++", "SFML", "Object-Oriented Design", "File I/O"],
    links: { code: "https://github.com/heimweh17/Minesweeper-game" },
    accent: { hue: 220, sat: 10, light: 75 },
    categories: ["C++ / Algorithms"],
  },
  {
    type: "project",
    name: "Bin Packing Analysis",
    subtitle: "Heuristic Algorithm Research", // 升级 Subtitle
    blurb: "Performance benchmarking study comparing 'Best-Fit' vs 'First-Fit' memory allocation strategies on large-scale datasets.",
    highlights: [
      "Simulated memory allocation scenarios by processing 100,000+ dynamic inputs to quantify space efficiency.", // 引用简历中的数据
      "Analyzed time-complexity trade-offs between linear scan strategies and optimized placement logic.", // 强调复杂度分析
    ],
    tags: ["C++", "Algorithms", "Performance Profiling"],
    links: { code: "https://github.com/heimweh17/best-fit-fitst-fit" },
    accent: { hue: 230, sat: 35, light: 65 },
    categories: ["C++ / Algorithms"],
  },
  {
    type: "project",
    name: "Gator AVL Tree",
    subtitle: "Self-Balancing Data Structure", // 升级 Subtitle
    blurb: "High-performance implementation of an AVL Tree for O(log n) search, insertion, and deletion operations.",
    highlights: [
      "Implemented complex tree rotation logic (LL, RR, LR, RL) to maintain automatic height balancing.", // 强调底层逻辑
      "Engineered rigorous unit tests to validate edge cases, ensuring stability under large-scale node deletions.", // 强调测试覆盖率
    ],
    tags: ["C++", "Data Structures", "Unit Testing"],
    links: { code: "https://github.com/heimweh17/AVL-TREE" },
    accent: { hue: 140, sat: 55, light: 60 },
    categories: ["C++ / Algorithms"],
  },
  {
    type: "project",
    name: "Sudoku Engine",
    subtitle: "Recursive Backtracking Solver", // 升级 Subtitle
    blurb: "Interactive Sudoku platform featuring a recursive backtracking agent capable of generating and solving puzzles in milliseconds.",
    highlights: [
      "Implemented a recursive backtracking algorithm to autonomously solve complex grid states.", // 强调核心算法
      "Designed a responsive GUI with real-time constraint validation (row/col/box rules).",
    ],
    tags: ["Python", "Pygame", "Backtracking", "Recursion"],
    links: { code: "https://github.com/heimweh17/suduku-project" },
    accent: { hue: 45, sat: 90, light: 60 },
    categories: ["Algorithms", "Python"],
  },
];

const WORK_EXPERIENCE: ItemContent[] = [
  {
    type: "experience",
    name: "Instructor / TA",
    subtitle: "Logic Lab (Math & Chess)",
    date: "Jun 2022 – Jul 2022",
    blurb: "Mentored 30+ students in competitive chess and mathematics, translating complex logic into digestible lessons.",
    highlights: [
      "Designed and delivered interactive curriculum for a class of 30+ students, adapting instructional strategies to accommodate diverse learning styles.",
      "Collaborated with the teaching team to evaluate student performance metrics, iteratively refining lesson plans to maximize comprehension.",
      "Managed classroom dynamics to foster a supportive learning environment, developing strong conflict resolution and leadership skills.",
    ],
    tags: ["Public Speaking", "Education", "Leadership"],
    links: { website: "http://www.logiclabgainesville.com/" },
    accent: { hue: 25, sat: 90, light: 60 },
    // logo: "/logos/logiclab.png", 
  },
  {
    type: "experience",
    name: "Cultural Performer",
    subtitle: "JiaTing Lion & Dragon",
    date: "Jan 2025 – May 2025",
    blurb: "Executed high-energy traditional choreography requiring precise team synchronization and physical discipline.",
    highlights: [
      "Orchestrated intricate Lion and Dragon dance performances for audiences of 300+, directly contributing to cultural visibility at major university events.",
      "Mastered complex choreography requiring non-verbal communication and split-second synchronization with teammates under high-pressure conditions.",
      "Demonstrated physical discipline through rigorous practice schedules to ensure safety and precision during acrobatic routines.",
    ],
    tags: ["Team Coordination", "Performance", "Culture"],
    links: { website: "https://jiatingliondragon.com/" },
    accent: { hue: 0, sat: 80, light: 60 },
    logo: "/logos/jiating_logo.jpg",
  }
]

const LEADERSHIP_EXPERIENCE: ItemContent[] = [
  {
    type: "experience",
    name: "SASE Intern",
    subtitle: "UF Society of Asian Scientists & Engineers",
    date: "Aug 2024 – Present",
    blurb: "Facilitating professional development and technical networking for a 100+ member engineering body.",
    highlights: [
      "Collaborated with the executive board to execute professional and cultural events for 100+ members, managing end-to-end logistics.", // 结合了旧简历的 "100+ members" 和 "logistics" 
      "Engaged in board presentations and shadowing sessions to analyze the operational structure of a national student organization.", // 这是一个非常好的细节，展示了你对组织架构的理解 
      "Facilitated professional development workshops and networking sessions to strengthen career readiness for the engineering community.",
    ],
    tags: ["Event Operations", "Public Speaking", "Professional Development"],
    links: { website: "https://www.saseconnect.org/" },
    accent: { hue: 210, sat: 80, light: 60 },
    logo: "/logos/sase_logo.jpg",
  },
  {
    type: "experience",
    name: "Event Committee Member",
    subtitle: "UF Chinese American Student Association",
    date: "Oct 2024 – Present",
    blurb: "Executing large-scale cultural programming and community engagement initiatives.",
    highlights: [
      "Orchestrated a flagship cultural festival for 100+ attendees, dedicating 30+ hours to strategic planning and program coordination.", // 恢复了具体的 "30+ hours" 数据，体现投入度 
      "Authored scripts and curated musical playlists to authentically showcase Chinese traditions and elevate the cultural experience.", // 恢复了 "Authored scripts" 和 "curated music" 细节，体现软技能 
      "Managed event logistics and prepared immersive cultural activities to foster cross-cultural understanding and community engagement.", // 结合了 "Managed logistics" 
    ],
    tags: ["Project Management", "Content Creation", "Community Outreach"],
    links: { website: "https://ufcasa.com/" },
    accent: { hue: 340, sat: 80, light: 60 },
    logo: "/logos/casa_logo.jpg",
  },
];

const VOLUNTEER_EXPERIENCE: ItemContent[] = [
  {
    type: "experience",
    name: "Volunteer Mapper",
    subtitle: "OpenStreetMap",
    date: "Sep 2020 – Present",
    blurb: "Maintained map data for roads and POIs; validated with imagery.",
    highlights: [
      "Maintained map data for roads, POIs, and land use across various regions.",
      "Cross-referenced satellite imagery, street view, and local knowledge to validate geometry and tags.",
      "Contributed to the open-source data ecosystem used by downstream navigation and humanitarian applications.",
    ],
    tags: ["GIS", "Open Source", "Data"],
    links: { website: "https://www.openstreetmap.org/" },
    accent: { hue: 120, sat: 70, light: 40 },
    logo: "/logos/osm_logo.svg",
  },
  {
    type: "experience",
    name: "Instructor / Mentor",
    subtitle: "Buchholz Math Team",
    date: "Summer 2022 & 2023",
    blurb: "Tutored students in competitive mathematics and logic.",
    highlights: [
      "Tutored elementary and middle school students in competitive mathematics and logic.",
      "Created handouts and graded practice sets, focusing on guiding students to debug their own thought processes.",
    ],
    tags: ["Mentorship", "Math", "Education"],
    links: { website: "https://buchholzmathteam.org/" },
    accent: { hue: 45, sat: 90, light: 50 },
    logo: "/logos/bhs_logo.png",
  },
];

const EDUCATION = [
  {
    school: "University of Florida",
    period: "2024 – 2028",
    degree: "B.S. Computer Science · Minor in Geography",
    gpa: "GPA: 3.80 / 4.00",
    honors: "Dean’s List",
    activities: "SASE · CASA",
    logo: "/logos/uf_logo.png",
    coursework: "Data Structures & Algorithms, Computer Organization, Linear Algebra, Discrete Structures, Calculus 3",
  },
  {
    school: "Buchholz High School",
    period: "2020 – 2024",
    degree: "High School Diploma",
    gpa: "GPA: 4.79",
    honors: "Math Team (State & National titles)",
    activities: "Science Team · Quiz Bowl",
    logo: "/logos/bhs_logo.png",
  },
];

type SkillItem = {
  name: string;
  blurb: string;
  usedIn?: string[];
  level?: "Daily" | "Often" | "Comfortable" | "Learning";
};

const SKILL_GROUPS: Array<{
  group: string;
  icon: any;
  items: SkillItem[];
}> = [
  {
    group: "Languages",
    icon: Terminal,
    items: [
      { 
        name: "Python", 
        blurb: "Core language for asynchronous backend systems, AI inference pipelines, and data science.", 
        usedIn: ["Ability Bridge", "GeoDashboard"], 
        level: "Daily" // 原 Native -> 映射为 Daily
      },
      { 
        name: "C++", 
        blurb: "Systems programming focusing on memory management and algorithmic optimization.", 
        usedIn: ["Minesweeper", "Bin Packing"], 
        level: "Daily" // 原 Advanced -> 映射为 Daily
      },
      { 
        name: "TypeScript", 
        blurb: "Strictly typed full-stack development for scalable, maintainable codebases.", 
        usedIn: ["GeoDashboard", "Portfolio"], 
        level: "Daily" 
      },
      { 
        name: "SQL", 
        blurb: "Complex relational modeling, indexing strategies, and performance tuning.", 
        usedIn: ["PostgreSQL"], 
        level: "Often" // 原 Proficient -> 映射为 Often
      },
      { 
        name: "Go", 
        blurb: "Building high-concurrency microservices and distributed systems.", 
        level: "Comfortable" // 原 Competent -> 映射为 Comfortable
      },
      { 
        name: "RISC-V", 
        blurb: "Low-level computer architecture and assembly instruction sets.", 
        level: "Learning" // 原 Academic -> 映射为 Learning
      },
    ],
  },
  {
    group: "Frameworks & Libraries",
    icon: Code2,
    items: [
      { 
        name: "React", 
        blurb: "Modern component architecture using Hooks, Context API, and Framer Motion.", 
        usedIn: ["GeoDashboard"], 
        level: "Daily" 
      },
      { 
        name: "FastAPI", 
        blurb: "High-performance, async Python REST APIs with Pydantic validation.", 
        usedIn: ["GeoDashboard"], 
        level: "Daily" // 原 Production -> 映射为 Daily (核心后端，配得上Daily)
      },
      { 
        name: "OpenCV", 
        blurb: "Real-time computer vision pipelines and image manipulation.", 
        usedIn: ["Ability Bridge"], 
        level: "Often" // 原 Advanced -> 映射为 Often
      },
      { 
        name: "MediaPipe", 
        blurb: "ML solutions for high-fidelity face tracking and pose estimation.", 
        usedIn: ["Ability Bridge"], 
        level: "Often" // 原 Advanced -> 映射为 Often
      },
      { 
        name: "SQLAlchemy", 
        blurb: "Enterprise-grade ORM for managing complex database transactions.", 
        usedIn: ["GeoDashboard", "Grade Track"], 
        level: "Often" // 原 Proficient -> 映射为 Often
      },
      { 
        name: "Node.js", 
        blurb: "Server-side runtime for scalable network applications.", 
        usedIn: ["SmartScribe"], 
        level: "Often" // 原 Proficient -> 映射为 Often
      },
      { 
        name: "Pandas", 
        blurb: "High-performance data manipulation for structured datasets.", 
        level: "Often" // 原 Proficient -> 映射为 Often
      },
      { 
        name: "NumPy", 
        blurb: "High-dimensional array computing and linear algebra operations.", 
        level: "Often" // 原 Proficient -> 映射为 Often
      },
    ],
  },
  {
    group: "Cloud & Infrastructure",
    icon: Cpu,
    items: [
      { 
        name: "AWS", 
        blurb: "Cloud-native architecture utilizing Lambda, ECS, S3, and RDS.", 
        usedIn: ["GeoDashboard"], 
        level: "Often" // 原 Production -> 映射为 Often (Daily对于云架构可能太夸张，Often很合适)
      },
      { 
        name: "Docker", 
        blurb: "Containerization for consistent, reproducible microservices deployment.", 
        usedIn: ["GeoDashboard", "Grade Track"], 
        level: "Daily" 
      },
      { 
        name: "PostgreSQL", 
        blurb: "Advanced relational database modeling and ACID transaction management.", 
        usedIn: ["GeoDashboard", "Grade Track"], 
        level: "Often" // 原 Advanced -> 映射为 Often
      },
      { 
        name: "PostGIS", 
        blurb: "Geospatial database extension for spatial indexing and geographic queries.", 
        usedIn: ["GeoDashboard"], 
        level: "Often" // 原 Advanced -> 映射为 Often
      },
      { 
        name: "GitHub Actions", 
        blurb: "Automating testing, build, and deployment workflows (CI/CD).", 
        usedIn: ["GeoDashboard"], 
        level: "Often" // 原 Proficient -> 映射为 Often
      },
      { 
        name: "Linux", 
        blurb: "Server environment management and permission configuration.", 
        level: "Daily" 
      },
      { 
        name: "Bash", 
        blurb: "Shell scripting for automation and system administration tasks.", 
        level: "Daily" 
      },
      { 
        name: "Supabase", 
        blurb: "Backend-as-a-Service for rapid real-time application prototyping.", 
        usedIn: ["SmartScribe"], 
        level: "Often" // 原 Proficient -> 映射为 Often
      },
    ],
  },
];
const HOBBIES = [
  { name: "Badminton", emoji: "🏸", blurb: "Doubles strategy + footwork" },
  { name: "Pickleball", emoji: "🥒", blurb: "Kitchen line battles & social games" },
  { name: "Photo Walks", emoji: "📷", blurb: "Urban exploring + OSM edits" },
  { name: "Road Trips", emoji: "🚗", blurb: "Scenic detours + podcasts" },
  { name: "Audiobooks", emoji: "🎧", blurb: "I just like it" },
];

const GALLERY = [
  { src: "/photos/photo1.jpg", alt: "Photo 1" },
  { src: "/photos/photo2.jpg", alt: "Photo 2" },
];

// -----------------------------
// 2) UTILS
// -----------------------------
function cn(...classes: Array<string | false | undefined | null>) {
  return classes.filter(Boolean).join(" ");
}
function hsl(a: { hue: number; sat: number; light: number } | undefined, alpha = 1) {
  if (!a) return `hsla(0, 0%, 100%, ${alpha})`;
  return `hsl(${a.hue} ${a.sat}% ${a.light}% / ${alpha})`;
}

const sectionIds = ["top", "about", "projects", "experience", "education", "skills", "gallery", "hobbies", "updates", "contact"] as const;
type SectionId = typeof sectionIds[number];

// -----------------------------
// 3) BACKGROUND
// -----------------------------
const SpatialBackground = () => {
  const bg =
    "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=2400&auto=format&fit=crop";

  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.2 }} className="absolute inset-0">
        <img
          src={bg}
          className="absolute inset-0 h-full w-full object-cover opacity-[0.86] scale-[1.05] blur-[1.2px]"
          alt="Environment"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(255,255,255,0.26),rgba(0,0,0,0.58))]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_10%,rgba(255,255,255,0.22),rgba(255,255,255,0)_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_15%,rgba(255,255,255,0.14),rgba(255,255,255,0)_60%)]" />
        <div className="absolute inset-0 bg-black/12" />
        <div className="absolute inset-0 opacity-[0.10] mix-blend-overlay bg-[url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22200%22 height=%22200%22%3E%3Cfilter id=%22n%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22200%22 height=%22200%22 filter=%22url(%23n)%22 opacity=%220.35%22/%3E%3C/svg%3E')]" />
      </motion.div>
    </div>
  );
};

// -----------------------------
// 4) MODE TOGGLE
// -----------------------------
const ViewToggle = ({
  mode,
  setMode,
}: {
  mode: "traditional" | "immersive";
  setMode: (m: "traditional" | "immersive") => void;
}) => {
  return (
    <motion.div
      className="fixed top-4 right-4 sm:top-15 sm:right-6 z-50 flex items-center gap-1 p-1.5 rounded-full border border-white/20 bg-white/[0.14] backdrop-blur-3xl shadow-[0_16px_60px_rgba(0,0,0,0.32)]"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.35 }}
    >
      <button
        onClick={() => setMode("traditional")}
        className={cn(
          "flex items-center gap-2 px-3 py-2 sm:px-4 rounded-full text-[10px] sm:text-[12px] font-semibold transition-all duration-300",
          mode === "traditional"
            ? "bg-white/30 text-white shadow-inner"
            : "text-white/75 hover:text-white hover:bg-white/12"
        )}
      >
        <LayoutTemplate className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
        <span className="hidden sm:inline">Scroll</span>
      </button>
      <button
        onClick={() => setMode("immersive")}
        className={cn(
          "flex items-center gap-2 px-3 py-2 sm:px-4 rounded-full text-[10px] sm:text-[12px] font-semibold transition-all duration-300",
          mode === "immersive"
            ? "bg-white/30 text-white shadow-inner"
            : "text-white/75 hover:text-white hover:bg-white/12"
        )}
      >
        <Grid className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
        <span className="hidden sm:inline">Spatial</span>
      </button>
    </motion.div>
  );
};

// -----------------------------
// 5) GLASS PRIMITIVES
// -----------------------------
const Glass = ({ className, children }: { className?: string; children: React.ReactNode }) => (
  <div
    className={cn(
      "rounded-[28px] border border-white/18 bg-white/[0.14] backdrop-blur-3xl shadow-[0_22px_80px_rgba(0,0,0,0.22)]",
      "relative overflow-hidden",
      className
    )}
  >
    <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.18),rgba(255,255,255,0.06)_40%,rgba(0,0,0,0.16))]" />
    <div className="pointer-events-none absolute inset-0 opacity-70 bg-[radial-gradient(circle_at_25%_10%,rgba(255,255,255,0.26),rgba(255,255,255,0)_55%)]" />
    <div className="relative">{children}</div>
  </div>
);

const SoftSurface = ({ className, children }: { className?: string; children: React.ReactNode }) => (
  <div
    className={cn(
      "rounded-[26px] border border-white/14 bg-white/[0.12] backdrop-blur-2xl",
      "shadow-[0_18px_60px_rgba(0,0,0,0.18)]",
      "relative overflow-hidden",
      className
    )}
  >
    <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.14),rgba(0,0,0,0.16))]" />
    <div className="relative">{children}</div>
  </div>
);

const Pill = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <span className={cn("px-2.5 py-1 rounded-full bg-white/[0.12] border border-white/16 text-xs text-white/80", className)}>
    {children}
  </span>
);

// -----------------------------
// 6) SKILL PILL
// -----------------------------
const SkillPill = ({ item }: { item: SkillItem }) => {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ top: 0, left: 0 });

  const handleEnter = () => {
    if (triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      setCoords({
        top: rect.top + rect.height / 2,
        left: rect.right + 10,
      });
    }
    setOpen(true);
  };

  return (
    <>
      <div
        ref={triggerRef}
        className="relative z-10"
        onMouseEnter={handleEnter}
        onMouseLeave={() => setOpen(false)}
        onFocus={handleEnter}
        onBlur={() => setOpen(false)}
        tabIndex={0}
      >
        <div className="px-4 py-3 rounded-2xl bg-white/[0.10] border border-white/14 backdrop-blur-2xl text-sm font-medium text-white/90 hover:bg-white/[0.16] transition cursor-default whitespace-nowrap">
          {item.name}
        </div>
      </div>

      {typeof document !== "undefined" &&
        createPortal(
          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ opacity: 0, x: -8, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -4, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                className="fixed z-[9999] w-[260px] pointer-events-none -translate-y-1/2"
                style={{ top: coords.top, left: coords.left }}
              >
                <Glass className="p-3 bg-black/60 backdrop-blur-2xl border border-white/15 shadow-2xl">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="text-xs font-bold text-white">{item.name}</div>
                      <div className="text-[10px] text-white/60 mt-0.5 uppercase tracking-wider">
                        {item.level ?? "Comfortable"}
                      </div>
                    </div>
                    <Zap className="w-3 h-3 text-yellow-300/80" />
                  </div>

                  <div className="text-xs text-white/80 leading-relaxed mt-2 border-t border-white/10 pt-2">
                    {item.blurb}
                  </div>

                  {item.usedIn?.length ? (
                    <div className="mt-2">
                      <div className="flex flex-wrap gap-1.5">
                        {item.usedIn.slice(0, 6).map((u) => (
                          <span
                            key={u}
                            className="px-1.5 py-0.5 rounded-md bg-white/10 border border-white/5 text-[10px] text-white/70"
                          >
                            {u}
                          </span>
                        ))}
                      </div>
                    </div>
                  ) : null}
                </Glass>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </>
  );
};

// -----------------------------
// 7) MESSAGE FORM
// -----------------------------
function MessageForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
    <Glass className="p-6 mt-6 w-full max-w-lg mx-auto md:mx-0">
      <div className="mb-5">
        <h3 className="text-base font-bold text-white mb-1 flex items-center gap-2">
          <Send className="w-4 h-4 text-sky-300" /> Send me a message
        </h3>
        <p className="text-xs text-white/70 leading-relaxed">
          Feel free to reach out about projects, maps, opportunities, or just to say hi.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-[11px] font-medium text-white/80 mb-1.5 uppercase tracking-wider">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full rounded-xl bg-white/[0.08] border border-white/10 px-3 py-2 text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-sky-400/50 focus:border-transparent transition-all"
              placeholder="Your name"
            />
          </div>
          <div>
            <label className="block text-[11px] font-medium text-white/80 mb-1.5 uppercase tracking-wider">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full rounded-xl bg-white/[0.08] border border-white/10 px-3 py-2 text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-sky-400/50 focus:border-transparent transition-all"
              placeholder="you@example.com"
            />
          </div>
        </div>

        <div>
          <label className="block text-[11px] font-medium text-white/80 mb-1.5 uppercase tracking-wider">
            Message <span className="text-sky-400">*</span>
          </label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            className="w-full min-h-[100px] rounded-xl bg-white/[0.08] border border-white/10 px-3 py-2 text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-sky-400/50 focus:border-transparent resize-y transition-all"
            placeholder="What's on your mind?"
          />
        </div>

        <div className="flex items-center justify-between mt-2">
          <motion.button
            type="submit"
            disabled={status === "submitting"}
            className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-white text-black text-sm font-bold tracking-wide hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed transition-all"
            whileHover={status !== "submitting" ? { scale: 1.02 } : {}}
            whileTap={status !== "submitting" ? { scale: 0.98 } : {}}
          >
            {status === "submitting" ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" /> Sending...
              </>
            ) : (
              "Send Message"
            )}
          </motion.button>
            
          <div className="flex-1 text-right">
             {status === "success" && (
            <motion.div
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-xs text-emerald-300 font-medium inline-block"
            >
                Message received!
            </motion.div>
            )}
            {status === "error" && error && (
            <motion.div
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-xs text-rose-300 font-medium inline-block"
            >
                {error}
            </motion.div>
            )}
          </div>
        </div>
      </form>
    </Glass>
  );
}

// -----------------------------
// 8) SHARED MODAL (For Projects & Experience)
// -----------------------------
const SharedModal = ({
  item,
  onClose,
}: {
  item: ItemContent;
  onClose: () => void;
}) => {
  const [imgIndex, setImgIndex] = useState(0);
  const shots = item.screenshots ?? [];

  useEffect(() => setImgIndex(0), [item.name]);

  return (
    <motion.div
      className="fixed inset-0 z-[80] flex items-center justify-center p-4 md:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/50 backdrop-blur-md" />

      <motion.div
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, y: 14, scale: 0.985, filter: "blur(12px)" }}
        animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
        exit={{ opacity: 0, y: 10, scale: 0.985, filter: "blur(12px)" }}
        transition={{ type: "spring", stiffness: 260, damping: 26 }}
        className="relative w-full max-w-5xl h-[86vh] rounded-[34px] border border-white/18 bg-white/[0.14] backdrop-blur-3xl shadow-[0_70px_140px_rgba(0,0,0,0.55)] overflow-hidden flex flex-col"
        style={{
          boxShadow: `0 0 0 1px rgba(255,255,255,0.14), 0 24px 90px ${hsl(item.accent, 0.22)}`,
        }}
      >
        <motion.div
          className="absolute inset-0 z-[9999]"
          initial={{ pointerEvents: "none" }}
          animate={{ pointerEvents: "none" }}
          exit={{ pointerEvents: "auto" }}
        />

        {/* Top bar */}
        <div className="h-16 px-6 flex items-center justify-between border-b border-white/12 bg-white/[0.10]">
          <div className="flex items-center gap-3 min-w-0">
            <div
              className="w-9 h-9 rounded-2xl border border-white/16 bg-white/[0.14] backdrop-blur-2xl grid place-items-center"
              style={{ boxShadow: `0 14px 40px ${hsl(item.accent, 0.22)}` }}
            >
              {item.type === "project" ? (
                  <Star className="w-4 h-4 text-white/80" />
              ) : (
                  <Briefcase className="w-4 h-4 text-white/80" />
              )}
            </div>
            <div className="min-w-0">
              <div className="font-semibold text-white truncate">{item.name}</div>
              <div className="text-xs text-white/70 truncate">{item.subtitle}</div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/12 transition text-white/75 hover:text-white"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8 custom-scrollbar relative">
          <div className="grid lg:grid-cols-[1.25fr_1fr] gap-6">
            {/* Left */}
            <div className="space-y-4">
              <Glass className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-sm font-semibold text-white/90">
                      {item.type === "project" ? "Overview" : "Role Details"}
                  </div>
                  {item.flagship && (
                    <Pill className="bg-yellow-400/18 border-yellow-300/30 text-yellow-100">
                      FLAGSHIP
                    </Pill>
                  )}
                  {item.date && <Pill>{item.date}</Pill>}
                </div>

                {shots.length > 0 && (
                    <div className="relative rounded-2xl overflow-hidden border border-white/12 bg-white/[0.10] mb-6">
                    <div className="aspect-[16/9] grid place-items-center">
                        <img src={shots[Math.min(imgIndex, shots.length - 1)]} alt="screenshot" className="w-full h-full object-cover" />
                    </div>
                    {shots.length > 1 && (
                        <div className="p-3 flex items-center justify-between border-t border-white/12 bg-white/[0.08]">
                        <div className="text-xs text-white/70">
                            {imgIndex + 1} / {shots.length}
                        </div>
                        <div className="flex gap-2">
                            <button
                            onClick={() => setImgIndex((v) => (v - 1 + shots.length) % shots.length)}
                            className="px-3 py-1.5 rounded-full bg-white/[0.12] border border-white/12 text-xs text-white/90 hover:bg-white/[0.18] transition"
                            >
                            Prev
                            </button>
                            <button
                            onClick={() => setImgIndex((v) => (v + 1) % shots.length)}
                            className="px-3 py-1.5 rounded-full bg-white/[0.12] border border-white/12 text-xs text-white/90 hover:bg-white/[0.18] transition"
                            >
                            Next
                            </button>
                        </div>
                        </div>
                    )}
                    </div>
                )}

                {item.longDescription ? (
                    <div className="mb-6">{item.longDescription}</div>
                ) : (
                    <p className="text-sm text-white/80 leading-relaxed mb-6">{item.blurb}</p>
                )}

                <div className="flex flex-wrap gap-2">
                  {item.tags.map((t) => (
                    <span key={t} className="px-2.5 py-1 rounded-full bg-white/[0.12] border border-white/12 text-xs font-mono text-white/80">
                      {t}
                    </span>
                  ))}
                </div>
              </Glass>
            </div>

            {/* Right */}
            <div className="space-y-4">
              <Glass className="p-5">
                <div className="flex items-center gap-2 text-white/90 font-semibold">
                  <Sparkles className="w-4 h-4 text-white/70" />
                  Highlights
                </div>
                <ul className="mt-3 space-y-2">
                  {(item.highlights ?? []).map((h, idx) => (
                    <li key={idx} className="flex gap-3 text-sm text-white/90 leading-relaxed">
                      <span className="mt-2 w-1.5 h-1.5 rounded-full bg-white/60 shrink-0" />
                      {h}
                    </li>
                  ))}
                </ul>
              </Glass>

              {item.links && (
                  <Glass className="p-5">
                    <div className="flex items-center justify-between">
                    <div className="text-white/90 font-semibold">Links</div>
                    <ArrowUpRight className="w-4 h-4 text-white/70" />
                    </div>
                    <div className="mt-3 grid grid-cols-1 gap-3">
                    {item.links.demo && (
                        <a
                        href={item.links.demo}
                        target="_blank"
                        rel="noreferrer"
                        className="px-4 py-3 rounded-2xl bg-white text-black font-semibold text-sm flex items-center justify-between hover:opacity-95 transition"
                        >
                        Live Demo <ExternalLink className="w-4 h-4" />
                        </a>
                    )}
                    {item.links.code && (
                        <a
                        href={item.links.code}
                        target="_blank"
                        rel="noreferrer"
                        className="px-4 py-3 rounded-2xl bg-white/[0.12] border border-white/12 text-white font-semibold text-sm flex items-center justify-between hover:bg-white/[0.18] transition"
                        >
                        Source Code <Github className="w-4 h-4" />
                        </a>
                    )}
                    {item.links.website && (
                        <a
                        href={item.links.website}
                        target="_blank"
                        rel="noreferrer"
                        className="px-4 py-3 rounded-2xl bg-white/[0.12] border border-white/12 text-white font-semibold text-sm flex items-center justify-between hover:bg-white/[0.18] transition"
                        >
                        Website <ExternalLink className="w-4 h-4" />
                        </a>
                    )}
                    </div>
                </Glass>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// -----------------------------
// 9) TRADITIONAL (Scroll Mode)
// -----------------------------
const TraditionalSection = ({
  title,
  icon: Icon,
  children,
  id,
  subtitle,
}: {
  title: string;
  icon?: any;
  children: React.ReactNode;
  id: SectionId;
  subtitle?: string;
}) => (
  <section id={id} className="max-w-6xl mx-auto px-6 py-16 scroll-mt-28">
    <div className="flex items-end justify-between gap-4 mb-8">
      <div className="flex items-center gap-3">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/18 bg-white/[0.14] backdrop-blur-3xl px-4 py-2 shadow-sm">
          {Icon ? <Icon className="w-4 h-4 text-white/80" /> : null}
          <span className="text-[11px] font-semibold tracking-widest text-white/80 uppercase">{title}</span>
        </div>
        {subtitle ? <div className="text-sm text-white/75">{subtitle}</div> : null}
      </div>
    </div>
    {children}
  </section>
);

const TradCard = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <SoftSurface className={cn("p-6", className)}>
    {children}
  </SoftSurface>
);

// -----------------------------
// *FIXED* useActiveSection
// -----------------------------
const useActiveSection = (containerRef: React.RefObject<HTMLElement>) => {
  const [active, setActive] = useState<SectionId>("about");

  useEffect(() => {
    const root = containerRef.current;
    if (!root) return;

    // 1. Manual check for bottom of page (forces Contact active)
    const handleScroll = () => {
        if (root.scrollTop + root.clientHeight >= root.scrollHeight - 50) {
            setActive("contact"); 
        }
    };
    root.addEventListener("scroll", handleScroll);

    const els = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0))[0];

        if (visible?.target?.id) {
            const id = visible.target.id;
            
            // 2. Mapping logic for sections without nav items
            if (id === 'top' || id === 'about') setActive('about');
            else if (id === 'projects') setActive('projects');
            // Education is technically under Experience for nav purposes
            else if (id === 'experience' || id === 'education') setActive('experience');
            // Gallery often visually grouped with Skills or just separate
            else if (id === 'skills' || id === 'gallery') setActive('skills');
            // Updates has its own nav now, so no mapping needed
            // Hobbies has no nav item, mapping to Updates or Contact based on preference, let's map to Contact
            else if (id === 'hobbies' || id === 'contact') setActive('contact');
            else setActive(id as SectionId);
        }
      },
      {
        root,
        // 3. Relaxed margin to detect sections earlier/longer
        rootMargin: "-20% 0px -50% 0px", 
        threshold: [0, 0.1, 0.5],
      }
    );

    els.forEach((el) => io.observe(el));
    
    return () => {
        io.disconnect();
        root.removeEventListener("scroll", handleScroll);
    };
  }, [containerRef]);

  return active;
};

const ScrollHeader = ({
  active,
  onNav,
  progress,
}: {
  active: SectionId;
  onNav: (id: SectionId) => void;
  progress: number;
}) => {
  const nav = useMemo(
    () => [
      { id: "about" as const, label: "About" },
      { id: "projects" as const, label: "Projects" },
      { id: "experience" as const, label: "Experience" },
      { id: "skills" as const, label: "Skills" },
      // Added Updates to navigation
      { id: "updates" as const, label: "Updates" },
      { id: "contact" as const, label: "Contact" },
    ],
    []
  );

  return (
    <header className="sticky top-0 z-50">
      <div className="h-[2px] bg-white/12">
        <div className="h-full bg-white/80" style={{ width: `${Math.round(progress * 100)}%` }} />
      </div>

      <div className="border-b border-white/14 bg-white/[0.14] backdrop-blur-3xl">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between gap-4">
          <button
            onClick={() => onNav("top")}
            className="flex items-center gap-3 group"
            aria-label="Go to top"
          >
            
            <div className="min-w-0 text-left">
              <div className="font-semibold text-white leading-tight">{SITE.name}</div>
              <div className="text-xs text-white/75 leading-tight">{SITE.availability}</div>
            </div>
          </button>

          <nav className="hidden md:flex items-center gap-2">
            {nav.map((n) => {
              const isActive = active === n.id;
              return (
                <button
                  key={n.id}
                  onClick={() => onNav(n.id)}
                  className={cn(
                    "px-3 py-1.5 rounded-full text-sm font-medium transition",
                    isActive ? "bg-white/28 text-white" : "text-white/80 hover:text-white hover:bg-white/14"
                  )}
                >
                  {n.label}
                </button>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={SITE.links.zh}
              className="hidden sm:inline-flex items-center gap-2 px-3 py-2 rounded-full bg-white/[0.12] border border-white/14 text-white font-semibold text-sm hover:bg-white/[0.18] transition"
            >
              中文
            </a>

            <a
              href={SITE.links.github}
              target="_blank"
              rel="noreferrer"
              className="p-2.5 rounded-full bg-white/[0.12] border border-white/12 hover:bg-white/[0.18] transition"
            >
              <Github className="w-4.5 h-4.5" />
            </a>
            <a
              href={SITE.links.instagram}
              target="_blank"
              rel="noreferrer"
              className="p-2.5 rounded-full bg-white/[0.12] border border-white/12 hover:bg-white/[0.18] transition"
            >
              <Instagram className="w-4.5 h-4.5" />
            </a>
            <a
              href={SITE.links.linkedin}
              target="_blank"
              rel="noreferrer"
              className="p-2.5 rounded-full bg-white/[0.12] border border-white/12 hover:bg-white/[0.18] transition"
            >
              <Linkedin className="w-4.5 h-4.5" />
            </a>
            <a
              href={SITE.links.resume}
              className="hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-full bg-white text-black font-semibold text-sm hover:opacity-95 transition"
            >
              <FileText className="w-4 h-4" />
              Resume
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

const TraditionalLayout = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const active = useActiveSection(containerRef);
  const [updateFilter, setUpdateFilter] = useState<"All" | "Tech" | "Life">("All");

  const filteredUpdates = useMemo(() => {
    if (updateFilter === "All") return UPDATES;
    return UPDATES.filter((u) => u.category === updateFilter);
  }, [updateFilter]);
  const { scrollYProgress } = useScroll({ container: containerRef });
  const smooth = useSpring(scrollYProgress, { stiffness: 280, damping: 30, mass: 0.6 });
  const [progress, setProgress] = useState(0);
  useEffect(() => smooth.on("change", (v) => setProgress(v)), [smooth]);

  // Project Filtering Logic
  const [projectFilter, setProjectFilter] = useState<string>("All");
  const [showAllProjects, setShowAllProjects] = useState(false); // New state for collapse/expand

  const categories = useMemo(() => {
    const set = new Set<string>();
    PROJECTS.forEach((p) => (p.categories ?? []).forEach((c) => set.add(c)));
    return ["All", ...Array.from(set).sort()];
  }, []);

  const filteredProjects = useMemo(() => {
    if (projectFilter === "All") return PROJECTS;
    return PROJECTS.filter((p) => (p.categories ?? []).includes(projectFilter));
  }, [projectFilter]);

  // Sliced projects based on "Show More" toggle
  const visibleProjects = showAllProjects ? filteredProjects : filteredProjects.slice(0, 4);

  const [activeItem, setActiveItem] = useState<ItemContent | null>(null);

  const scrollTo = (id: SectionId) => {
    const root = containerRef.current;
    if (!root) return;
    if (id === "top") {
      root.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <motion.div
      key="traditional"
      initial={{ opacity: 0, y: 14, scale: 0.99 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 14, scale: 0.99 }}
      transition={{ duration: 0.35 }}
      className="absolute inset-0 z-10"
    >
      <div ref={containerRef} className="absolute inset-0 overflow-y-auto scroll-smooth custom-scrollbar">
        <ScrollHeader active={active} onNav={scrollTo} progress={progress} />

        {/* Hero */}
        <section id="top" className="max-w-6xl mx-auto px-6 pt-16 pb-10">
          <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-8 items-center">
            <div>
              <motion.h1
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 }}
                className="text-4xl md:text-7xl font-semibold tracking-tight text-white drop-shadow-[0_18px_60px_rgba(0,0,0,0.35)]"
              >
                {SITE.headline}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.12 }}
                className="mt-4 text-lg md:text-xl text-white/85 max-w-2xl leading-relaxed"
              >
                {SITE.tagline}
              </motion.p>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <a
                  href={`mailto:${SITE.links.email}`}
                  className="px-5 py-3 rounded-full bg-white text-black font-semibold hover:opacity-95 transition flex items-center gap-2"
                >
                  <Mail className="w-4 h-4" />
                  Email
                </a>
                <a
                  href={SITE.links.website}
                  target="_blank"
                  rel="noreferrer"
                  className="px-5 py-3 rounded-full bg-white/[0.14] border border-white/18 text-white font-semibold hover:bg-white/[0.20] transition flex items-center gap-2"
                >
                  <Globe className="w-4 h-4" />
                  Website
                </a>
                <a
                  href={SITE.links.map}
                  target="_blank"
                  rel="noreferrer"
                  className="px-5 py-3 rounded-full bg-white/[0.14] border border-white/18 text-white font-semibold hover:bg-white/[0.20] transition flex items-center gap-2"
                >
                  <MapPin className="w-4 h-4" />
                  {SITE.location}
                </a>
              </div>
            </div>

            <Glass className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full border border-white/20 overflow-hidden bg-white/[0.10] shrink-0">
                  <img src="/me.jpg" alt="Alex" className="w-full h-full object-cover" />
                </div>
                <div className="min-w-0">
                  <div className="text-white font-semibold">{SITE.name}</div>
                  <div className="text-white/75 text-sm">{SITE.location}</div>
                  <div className="text-white/75 text-sm mt-1">{SITE.availability}</div>
                </div>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-3">
                <a
                  href={SITE.links.github}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-3 rounded-2xl bg-white/[0.12] border border-white/12 hover:bg-white/[0.18] transition flex items-center justify-between"
                >
                  <span className="text-sm font-semibold text-white">GitHub</span>
                  <Github className="w-4 h-4 text-white/80" />
                </a>
                <a
                  href={SITE.links.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-3 rounded-2xl bg-white/[0.12] border border-white/12 hover:bg-white/[0.18] transition flex items-center justify-between"
                >
                  <span className="text-sm font-semibold text-white">LinkedIn</span>
                  <Linkedin className="w-4 h-4 text-white/80" />
                </a>
                 <a
                  href={SITE.links.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-3 rounded-2xl bg-white/[0.12] border border-white/12 hover:bg-white/[0.18] transition flex items-center justify-between col-span-2"
                >
                  <span className="text-sm font-semibold text-white">Instagram</span>
                  <Instagram className="w-4 h-4 text-white/80" />
                </a>
                <a
                  href={SITE.links.resume}
                  className="px-4 py-3 rounded-2xl bg-white text-black hover:opacity-95 transition flex items-center justify-between col-span-2"
                >
                  <span className="text-sm font-semibold">Resume</span>
                  <FileText className="w-4 h-4" />
                </a>
              </div>
            </Glass>
          </div>
        </section>

        <TraditionalSection id="about" title="About" icon={User} >
          <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-6">
            <TradCard>
              <p className="text-white/90 leading-relaxed">{ABOUT.p1}</p>
              <p className="text-white/90 leading-relaxed mt-4">{ABOUT.p2}</p>

              <div className="mt-6 flex flex-wrap gap-2">
                {ABOUT.highlights.map((h) => (
                  <Pill key={h}>{h}</Pill>
                ))}
              </div>
            </TradCard>

            <TradCard>
              <div className="flex items-center gap-2 text-white/90 font-semibold">
                <BookOpen className="w-4 h-4 text-white/75" />
                Quick Facts
              </div>
              <div className="mt-4 space-y-3">
                {ABOUT.quickFacts.map((q) => (
                  <div key={q.k} className="flex items-start justify-between gap-4">
                    <div className="text-sm text-white/75">{q.k}</div>
                    <div className="text-sm text-white text-right">{q.v}</div>
                  </div>
                ))}
              </div>
            </TradCard>
          </div>
        </TraditionalSection>

        <TraditionalSection id="projects" title="Projects" icon={Code2} subtitle="Click a project for detailed breakdown.">
          <div className="flex items-center justify-between gap-3 mb-6">
            <div className="text-sm text-white/75">Filter</div>
            <div className="flex flex-wrap gap-2 justify-end">
              {categories.map((c) => (
                <button
                  key={c}
                  onClick={() => {
                      setProjectFilter(c);
                      setShowAllProjects(false); 
                  }}
                  className={cn(
                    "px-3 py-1.5 rounded-full text-xs font-semibold border transition",
                    projectFilter === c
                      ? "bg-white/30 border-white/20 text-white"
                      : "bg-white/[0.12] border-white/14 text-white/80 hover:text-white hover:bg-white/[0.18]"
                  )}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            {visibleProjects.map((p) => (
              <button key={p.name} onClick={() => setActiveItem(p)} className="text-left group w-full">
                <TradCard className="relative overflow-hidden hover:bg-white/[0.16] transition duration-300 !p-0">
                    {/* WeChat Style: Top Banner Image */}
                    <div className="h-32 relative overflow-hidden bg-black/20">
                         {p.screenshots?.[0] ? (
                            <img 
                                src={p.screenshots[0]} 
                                alt={p.name} 
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                            />
                         ) : (
                             // Fallback gradient if no screenshot
                             <div 
                                className="w-full h-full"
                                style={{ background: `linear-gradient(135deg, ${hsl(p.accent, 0.4)}, rgba(0,0,0,0.5))` }} 
                             />
                         )}
                         {p.flagship && (
                            <div className="absolute top-3 right-3">
                                <Pill className="bg-yellow-400/20 border-yellow-300/40 text-yellow-100 backdrop-blur-md">
                                FLAGSHIP
                                </Pill>
                            </div>
                        )}
                    </div>
                  
                  {/* Bottom Text Content */}
                  <div className="p-5 relative">
                    {/* Optional: subtle blur blob behind text */}
                    <div
                      className="absolute -top-10 -right-10 w-40 h-40 rounded-full blur-3xl opacity-20 pointer-events-none"
                      style={{ background: hsl(p.accent, 0.35) }}
                    />
                    
                    <div className="relative">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <div className="text-xl font-semibold text-white truncate">{p.name}</div>
                          </div>
                          <div className="text-sm text-white/85 mt-1 leading-relaxed line-clamp-2">{p.blurb}</div>
                        </div>
                        <div className="shrink-0 text-white/70 group-hover:text-white transition mt-1">
                          <ChevronRight className="w-5 h-5" />
                        </div>
                      </div>

                      <div className="mt-4 flex flex-wrap gap-2">
                        {p.tags.slice(0, 5).map((t) => (
                          <span
                            key={t}
                            className="px-2.5 py-1 rounded-full bg-white/[0.12] border border-white/12 text-xs font-mono text-white/80"
                          >
                            {t}
                          </span>
                        ))}
                        {p.tags.length > 5 ? <Pill>+{p.tags.length - 5}</Pill> : null}
                      </div>
                    </div>
                  </div>
                </TradCard>
              </button>
            ))}
          </div>

          {filteredProjects.length > 4 && (
            <div className="mt-8 flex justify-center">
                <button
                    onClick={() => setShowAllProjects(!showAllProjects)}
                    className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-white/[0.12] border border-white/14 text-sm font-semibold text-white hover:bg-white/[0.18] transition"
                >
                    {showAllProjects ? (
                        <>
                            Show Less <ChevronUp className="w-4 h-4" />
                        </>
                    ) : (
                        <>
                            Show More <ChevronDown className="w-4 h-4" />
                        </>
                    )}
                </button>
            </div>
          )}
        </TraditionalSection>

         <TraditionalSection id="experience" title="Experience" icon={Briefcase} subtitle="Work, Leadership & Volunteering.">
          <div className="space-y-12">
              {[
                { title: "Work History", data: WORK_EXPERIENCE },
                { title: "Leadership & Involvement", data: LEADERSHIP_EXPERIENCE },
                { title: "Volunteering", data: VOLUNTEER_EXPERIENCE }
              ].map((section) => (
                 <div key={section.title}>
                  <h3 className="text-sm font-bold text-white/60 uppercase tracking-widest mb-6 border-b border-white/10 pb-2">{section.title}</h3>
                  <div className="grid lg:grid-cols-2 gap-5">
                    {section.data.map((e) => (
                    <button key={e.name} onClick={() => setActiveItem(e)} className="text-left w-full group">
                        <TradCard className="hover:bg-white/[0.16] transition duration-300">
                            <div className="flex gap-4">
                                {/* LOGO LOGIC: Show image if present, else fallback icon */}
                                {e.logo ? (
                                    <div className="shrink-0 w-12 h-12 rounded-xl bg-white/10 overflow-hidden border border-white/10">
                                        <img src={e.logo} alt={e.name} className="w-full h-full object-cover" />
                                    </div>
                                ) : (
                                     <div className="shrink-0 w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                                        <Briefcase className="w-6 h-6 text-white/40" />
                                     </div>
                                )}

                                <div className="flex-1 min-w-0">
                                    <div className="flex items-start justify-between gap-2">
                                        <div>
                                            <div className="text-lg font-semibold text-white">{e.name}</div>
                                            <div className="text-sm text-emerald-200/90 font-semibold mt-0.5">{e.subtitle}</div>
                                        </div>
                                        {/* Date Pill moved here or kept on right */}
                                    </div>
                                    
                                    <div className="mt-2 flex items-center gap-2">
                                         <Pill className="py-0.5 px-2 text-[10px]">
                                            <Calendar className="w-3 h-3 inline-block mr-1" />
                                            {e.date}
                                        </Pill>
                                    </div>

                                    <div className="text-sm text-white/85 mt-3 line-clamp-2">{e.blurb}</div>
                                    <div className="mt-3 flex items-center text-xs text-white/50 font-medium group-hover:text-white transition-colors">
                                        View Details <ArrowUpRight className="w-3 h-3 ml-1" />
                                    </div>
                                </div>
                            </div>
                        </TradCard>
                    </button>
                    ))}
                  </div>
              </div>
              ))}
          </div>
        </TraditionalSection>

        <TraditionalSection id="education" title="Education" icon={GraduationCap}>
          <div className="grid lg:grid-cols-2 gap-5">
            {EDUCATION.map((ed) => (
              <TradCard key={ed.school} className="flex gap-5 items-start">
                <div className="w-14 h-14 rounded-2xl border border-white/16 bg-white/[0.12] overflow-hidden shrink-0 grid place-items-center">
                  {ed.logo ? (
                    <img src={ed.logo} alt={ed.school} className="w-full h-full object-cover" />
                  ) : (
                    <GraduationCap className="w-6 h-6 text-white/80" />
                  )}
                </div>
                <div className="min-w-0">
                  <div className="flex items-center justify-between gap-3">
                    <div className="text-lg font-semibold text-white truncate">{ed.school}</div>
                    <Pill>{ed.period}</Pill>
                  </div>
                  <div className="text-sm text-white/85 mt-1">{ed.degree}</div>
                  
                  {ed.coursework && (
                    <div className="text-xs text-white/60 mt-1.5 leading-relaxed">
                      <span className="font-semibold text-white/70">Coursework:</span> {ed.coursework}
                    </div>
                  )}

                  <div className="mt-3 flex flex-wrap gap-2">
                    <Pill>{ed.gpa}</Pill>
                    {ed.honors ? <Pill>{ed.honors}</Pill> : null}
                    {ed.activities ? <Pill>{ed.activities}</Pill> : null}
                  </div>
                </div>
              </TradCard>
            ))}
          </div>
        </TraditionalSection>

        <TraditionalSection id="skills" title="Skills" icon={Cpu} subtitle="Hover a skill to see details.">
          <div className="grid gap-6 relative isolate">
            {SKILL_GROUPS.map((grp) => (
              <TradCard key={grp.group}>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-9 h-9 rounded-2xl border border-white/16 bg-white/[0.12] grid place-items-center">
                    <grp.icon className="w-4 h-4 text-white/80" />
                  </div>
                  <div className="text-white font-semibold">{grp.group}</div>
                </div>

                <div className="flex flex-wrap gap-3 relative">
                  {grp.items.map((it) => (
                    <SkillPill key={it.name} item={it} />
                  ))}
                </div>
              </TradCard>
            ))}
          </div>
        </TraditionalSection>
        
        <TraditionalSection id="gallery" title="Gallery" icon={Camera} >
             <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {GALLERY.map((g, i) => (
                <div
                    key={i}
                    className="relative rounded-3xl overflow-hidden border border-white/16 bg-white/[0.12] aspect-square"
                >
                    <img
                    src={g.src}
                    alt={g.alt}
                    className="w-full h-full object-cover opacity-95 hover:opacity-100 transition"
                    onError={(e) => {
                        (e.currentTarget as HTMLImageElement).style.display = "none";
                    }}
                    />
                    <div className="absolute inset-0 grid place-items-center text-white/45 pointer-events-none">
                    <Camera className="w-9 h-9" />
                    </div>
                </div>
                ))}
            </div>
        </TraditionalSection>

         <TraditionalSection id="hobbies" title="Hobbies" icon={Heart} >
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {HOBBIES.map((h) => (
              <TradCard key={h.name} className="p-5">
                <div className="flex items-center justify-between">
                  <div className="text-lg font-semibold text-white">{h.name}</div>
                  <div className="text-2xl">{h.emoji}</div>
                </div>
                <div className="text-sm text-white/85 mt-2">{h.blurb}</div>
              </TradCard>
            ))}
          </div>
        </TraditionalSection>

        {/* UPDATES SECTION */}
        <TraditionalSection id="updates" title="Latest Updates" icon={Zap} subtitle="Scroll inside to view details.">
           <Glass className="overflow-hidden">
              <div className="px-6 py-4 border-b border-white/10 bg-white/[0.05] flex flex-wrap items-center justify-between gap-4 sticky top-0 z-20 backdrop-blur-xl">
                 <div className="flex items-center bg-black/40 rounded-full p-1 border border-white/10">
                    {(["All", "Tech", "Life"] as const).map((tab) => {
                        const isActive = updateFilter === tab;
                        return (
                            <button
                                key={tab}
                                onClick={() => setUpdateFilter(tab)}
                                className={cn(
                                    "px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-300",
                                    isActive && tab === "All" && "bg-white text-black shadow-sm",
                                    isActive && tab === "Tech" && "bg-sky-500/80 text-white shadow-[0_0_15px_rgba(14,165,233,0.4)]",
                                    isActive && tab === "Life" && "bg-rose-500/80 text-white shadow-[0_0_15px_rgba(244,63,94,0.4)]",
                                    !isActive && "text-white/60 hover:text-white"
                                )}
                            >
                                {tab}
                            </button>
                        );
                    })}
                 </div>
              </div>

              <div className="h-[500px] overflow-y-auto custom-scrollbar p-6 bg-black/20">
                 <motion.div layout className="grid md:grid-cols-2 gap-5">
                    <AnimatePresence mode="popLayout">
                        {filteredUpdates.map((update) => (
                            <motion.div
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                                transition={{ duration: 0.3 }}
                                key={update.title} 
                                className="p-5 rounded-[22px] bg-white/[0.08] border border-white/10 relative overflow-hidden group hover:bg-white/[0.12] transition shrink-0"
                            >
                                 <div className="absolute top-0 right-0 w-24 h-24 rounded-full blur-2xl opacity-20 pointer-events-none" style={{ background: hsl(update.accent, 0.5) }} />
                                 <div className="relative z-10">
                                    <div className="flex items-center justify-between mb-3">
                                        <div className={cn(
                                            "flex items-center gap-2 px-2.5 py-1 rounded-full w-fit",
                                            update.category === "Life" ? "bg-rose-500/20 border border-rose-500/30" : "bg-sky-500/20 border border-sky-500/30"
                                        )}>
                                            <update.icon className="w-3.5 h-3.5 text-white/90" />
                                            <span className="text-xs font-semibold text-white/90">{update.category}</span>
                                        </div>
                                        <div className="text-xs text-white/60 font-mono">{update.date}</div>
                                    </div>
                                    <h3 className="text-base font-bold text-white mb-2">{update.title}</h3>
                                    <p className="text-sm text-white/80 leading-relaxed">{update.desc}</p>
                                 </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                 </motion.div>
                 
                 {filteredUpdates.length === 0 && (
                     <div className="h-full flex flex-col items-center justify-center text-white/40 pb-20">
                         <div className="text-4xl mb-2">📭</div>
                         <div className="text-sm">No updates in this category yet.</div>
                     </div>
                 )}

                 <div className="h-8" />
              </div>
           </Glass>
        </TraditionalSection>

        <TraditionalSection id="contact" title="Contact" icon={Mail}>
          <div className="grid lg:grid-cols-[1fr_0.9fr] gap-6 items-start">
            <div>
                 <TradCard className="p-7">
                <div className="text-2xl font-semibold text-white">Let’s Connect</div>
                <p className="mt-3 text-white/85 leading-relaxed">
                    I’m open to {SITE.availability} opportunities — especially roles involving product engineering,
                    geospatial work, systems, or data visualization.
                </p>

                <div className="mt-6 grid sm:grid-cols-2 gap-3">
                    <a
                    href={`mailto:${SITE.links.email}`}
                    className="px-5 py-3 rounded-2xl bg-white text-black font-semibold flex items-center justify-between hover:opacity-95 transition"
                    >
                    Email <Mail className="w-4 h-4" />
                    </a>
                    <a
                    href={SITE.links.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="px-5 py-3 rounded-2xl bg-white/[0.14] border border-white/14 text-white font-semibold flex items-center justify-between hover:bg-white/[0.20] transition"
                    >
                    LinkedIn <Linkedin className="w-4 h-4" />
                    </a>
                    <a
                    href={SITE.links.github}
                    target="_blank"
                    rel="noreferrer"
                    className="px-5 py-3 rounded-2xl bg-white/[0.14] border border-white/14 text-white font-semibold flex items-center justify-between hover:bg-white/[0.20] transition"
                    >
                    GitHub <Github className="w-4 h-4" />
                    </a>
                     <a
                    href={SITE.links.instagram}
                    target="_blank"
                    rel="noreferrer"
                    className="px-5 py-3 rounded-2xl bg-white/[0.14] border border-white/14 text-white font-semibold flex items-center justify-between hover:bg-white/[0.20] transition"
                    >
                    Instagram <Instagram className="w-4 h-4" />
                    </a>
                    <a
                    href={SITE.links.resume}
                    className="px-5 py-3 rounded-2xl bg-white/[0.14] border border-white/14 text-white font-semibold flex items-center justify-between hover:bg-white/[0.20] transition col-span-2"
                    >
                    Resume <FileText className="w-4 h-4" />
                    </a>
                </div>
                </TradCard>
                <div className="mt-6">
                    <MessageForm />
                </div>
            </div>

            <TradCard className="p-7">
              <div className="text-sm font-semibold text-white/90">Details</div>
              <div className="mt-4 space-y-3 text-sm">
                <div className="flex items-center justify-between gap-3">
                  <div className="text-white/75 flex items-center gap-2">
                    <Phone className="w-4 h-4" /> Phone
                  </div>
                  <div className="text-white">{SITE.links.phone}</div>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <div className="text-white/75 flex items-center gap-2">
                    <Mail className="w-4 h-4" /> Email
                  </div>
                  <div className="text-white">{SITE.links.email}</div>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <div className="text-white/75 flex items-center gap-2">
                    <MapPin className="w-4 h-4" /> Based in
                  </div>
                  <div className="text-white">{SITE.location}</div>
                </div>
                <a
                  href={SITE.links.map}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-white/90 hover:text-white transition"
                >
                  Open in Maps <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </TradCard>
          </div>

          <footer className="mt-16 pb-24 text-center text-white/65 text-sm">
            © {new Date().getFullYear()} {SITE.name}. Built with React + Motion.
          </footer>
        </TraditionalSection>
      </div>

      <AnimatePresence>
        {activeItem ? <SharedModal item={activeItem} onClose={() => setActiveItem(null)} /> : null}
      </AnimatePresence>
    </motion.div>
  );
};

// -----------------------------
// 10) IMMERSIVE MODE - UPDATED APPS
// -----------------------------
const APPS = [
  { id: "about", label: "About", icon: User, accent: { hue: 210, sat: 90, light: 60 } },
  { id: "projects", label: "Projects", icon: Code2, accent: { hue: 255, sat: 85, light: 63 } },
  { id: "experience", label: "Experience", icon: Briefcase, accent: { hue: 25, sat: 90, light: 60 } },
  { id: "education", label: "Education", icon: GraduationCap, accent: { hue: 140, sat: 60, light: 58 } },
  { id: "skills", label: "Skills", icon: Cpu, accent: { hue: 190, sat: 75, light: 58 } },
  { id: "photos", label: "Gallery", icon: Camera, accent: { hue: 55, sat: 90, light: 60 } },
  { id: "hobbies", label: "Hobbies", icon: Heart, accent: { hue: 330, sat: 75, light: 62 } },
  { id: "updates", label: "Updates", icon: Zap, accent: { hue: 45, sat: 90, light: 60 } }, 
  { id: "resume", label: "Resume", icon: FileText, accent: { hue: 0, sat: 0, light: 80 } }, 
  { id: "contact", label: "Contact", icon: Mail, accent: { hue: 0, sat: 75, light: 60 } },
] as const;

// -----------------------------
// VisionIcon: 3D Parallax & Breathing
// -----------------------------
const VisionIcon = ({
  app,
  index,
  onOpen,
}: {
  app: (typeof APPS)[number];
  index: number;
  onOpen: () => void;
}) => {
  // Use springs for smooth following
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-0.5, 0.5], [15, -15]);
  const rotateY = useTransform(x, [-0.5, 0.5], [-15, 15]);

  // Sheen effect position
  const sheenX = useTransform(x, [-0.5, 0.5], ["0%", "200%"]);
  const sheenY = useTransform(y, [-0.5, 0.5], ["0%", "200%"]);

  // Inner icon parallax
  const iconX = useTransform(x, [-0.5, 0.5], [-8, 8]);
  const iconY = useTransform(y, [-0.5, 0.5], [-8, 8]);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      onClick={onOpen}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial="initial"
      animate="animate"
      whileHover="hover"
      whileTap={{ scale: 0.95 }}
      variants={{
        initial: { opacity: 0, scale: 0.8, y: 20 },
        animate: { 
            opacity: 1, 
            scale: 1, 
            y: 0,
            transition: { 
                type: "spring", 
                stiffness: 300, 
                damping: 20,
                // Staggered entrance delay
                delay: index * 0.05 
            }
        },
      }}
      className="flex flex-col items-center gap-3 group select-none relative"
      style={{ perspective: 1000 }} // Enable 3D space
    >
      {/* BREATHING CONTAINER 
          This wraps the 3D card so the card rotates while the whole thing floats
      */}
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          // Random delay so they don't breathe in unison
          delay: Math.random() * 2, 
        }}
        // Stop breathing on hover
        whileHover={{ y: 0, transition: { duration: 0.2 } }}
        className="relative"
      >
        <motion.div
            className="relative w-[80px] h-[80px] sm:w-[96px] sm:h-[96px] rounded-[24px] sm:rounded-[28px] overflow-hidden border border-white/20 bg-white/[0.15] backdrop-blur-3xl shadow-[0_18px_40px_rgba(0,0,0,0.35)]"
            style={{ 
                rotateX, 
                rotateY,
                transformStyle: "preserve-3d", // Crucial for inner layers
                boxShadow: `0 20px 40px -10px ${hsl(app.accent, 0.4)}` // Colored glow
            }}
        >
            {/* Background Gradient Layer */}
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.2),rgba(255,255,255,0.05)_50%,rgba(0,0,0,0.1))]" />

            {/* Dynamic Sheen/Highlight */}
            <motion.div 
                className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.6)_0%,transparent_60%)] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ 
                    x: sheenX, // Moves opposite to mouse to simulate light reflection
                    y: sheenY,
                    mixBlendMode: "overlay"
                }}
            />

            {/* Parallax Icon Layer */}
            <motion.div 
                className="absolute inset-0 grid place-items-center z-10"
                style={{ x: iconX, y: iconY, z: 20 }}
            >
                <app.icon 
                    className="w-9 h-9 sm:w-10 sm:h-10 drop-shadow-[0_8px_16px_rgba(0,0,0,0.4)]" 
                    style={{ color: hsl(app.accent) }} 
                />
            </motion.div>
            
            {/* Border Highlight on Hover */}
            <div className="absolute inset-0 rounded-[28px] border border-white/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

        </motion.div>
      </motion.div>
      
      <span className="text-[11px] sm:text-sm font-medium text-white drop-shadow-md tracking-wide">
          {app.label}
      </span>
    </motion.button>
  );
};

const VisionWindow = ({
  app,
  onClose,
  children,
}: {
  app: (typeof APPS)[number];
  onClose: () => void;
  children: React.ReactNode;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92, filter: "blur(12px)" }}
      animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
      exit={{ opacity: 0, scale: 0.95, filter: "blur(12px)" }}
      transition={{ type: "spring", bounce: 0.24, duration: 0.52 }}
      className="fixed inset-0 z-40 flex items-center justify-center p-4 md:p-8"
      onClick={onClose}
    >
      {/* dim + blur behind */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-md" />

      {/* window: NOT transparent, more “material” */}
      <motion.div
        className="relative w-full max-w-5xl h-[85vh] rounded-[36px] border border-white/18 shadow-[0_70px_140px_rgba(0,0,0,0.55)] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
        style={{
          boxShadow: `0 0 0 1px rgba(255,255,255,0.14), 0 26px 110px ${hsl(app.accent, 0.22)}`,
        }}
      >
        <div className="absolute inset-0 bg-white/[0.20] backdrop-blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.32),rgba(255,255,255,0.12)_55%,rgba(0,0,0,0.22))]" />
        <div className="absolute inset-0 opacity-60 bg-[linear-gradient(180deg,rgba(255,255,255,0.12),rgba(0,0,0,0.18))]" />

        <motion.div
          className="absolute inset-0 z-[9999]"
          initial={{ pointerEvents: "none" }}
          animate={{ pointerEvents: "none" }}
          exit={{ pointerEvents: "auto" }}
        />

        <div className="relative flex flex-col h-full">
          <div className="flex items-center justify-between px-6 h-16 border-b border-white/14 bg-white/[0.14] backdrop-blur-3xl shrink-0">
            <button
              onClick={onClose}
              className="flex items-center gap-2 text-white/85 hover:text-white px-3 py-1.5 rounded-full hover:bg-white/14 transition"
            >
              <ChevronLeft className="w-5 h-5" />
              <span className="text-sm font-medium">Home</span>
            </button>

            <div className="font-semibold text-lg flex items-center gap-2 text-white">
              <app.icon className="w-5 h-5" style={{ color: hsl(app.accent) }} />
              {app.label}
            </div>

            <div className="w-[96px] flex justify-end">
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-white/14 transition text-white/85"
                aria-label="Close"
                title="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-6 md:p-8 custom-scrollbar relative">
            <div className="rounded-[28px] border border-white/14 bg-black/18 backdrop-blur-2xl p-5 md:p-7 shadow-[0_30px_90px_rgba(0,0,0,0.28)] min-h-full">
              {children}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const ImmersiveContent = ({
  id,
  onOpenProject,
}: {
  id: string;
  onOpenProject: (item: ItemContent) => void;
}) => {
  // Projects Filter Logic
  const [projectFilter, setProjectFilter] = useState<string>("All");
  
  // Updates Filter Logic (NEW)
  const [updateFilter, setUpdateFilter] = useState<"All" | "Tech" | "Life">("All");

  const categories = useMemo(() => {
    const set = new Set<string>();
    PROJECTS.forEach((p) => (p.categories ?? []).forEach((c) => set.add(c)));
    return ["All", ...Array.from(set).sort()];
  }, []);

  const filteredProjects = useMemo(() => {
    if (projectFilter === "All") return PROJECTS;
    return PROJECTS.filter((p) => (p.categories ?? []).includes(projectFilter));
  }, [projectFilter]);

  // Filter Updates Logic
  const filteredUpdates = useMemo(() => {
    if (updateFilter === "All") return UPDATES;
    return UPDATES.filter((u) => u.category === updateFilter);
  }, [updateFilter]);

  switch (id) {
    case "about":
      return (
        <div className="grid md:grid-cols-[320px_1fr] gap-8">
          <div className="space-y-6">
            <div className="rounded-[26px] overflow-hidden border border-white/16 shadow-[0_22px_70px_rgba(0,0,0,0.30)] aspect-[3/4] bg-white/[0.10]">
              <img src="/me.jpg" alt="Alex" className="w-full h-full object-cover" />
            </div>
            <div className="p-6 rounded-[26px] bg-white/[0.12] border border-white/14 text-center">
              <h2 className="text-xl font-semibold text-white">{SITE.name}</h2>
              <div className="text-white/80 text-sm mt-1">{SITE.location}</div>
              <div className="text-white/80 text-sm mt-1">{SITE.availability}</div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="p-7 md:p-8 rounded-[26px] bg-white/[0.12] border border-white/14">
              <h3 className="text-2xl font-semibold mb-4 flex items-center gap-2 text-white">
                <Sparkles className="text-white/80" /> Bio
              </h3>
              <p className="text-[17px] text-white/90 leading-relaxed mb-4">{ABOUT.p1}</p>
              <p className="text-[17px] text-white/90 leading-relaxed">{ABOUT.p2}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {ABOUT.highlights.map((h, i) => (
                <div key={i} className="p-5 rounded-[22px] bg-white/[0.12] border border-white/14 text-white/90 text-sm leading-relaxed">
                  {h}
                </div>
              ))}
            </div>
          </div>
        </div>
      );

    case "projects":
      return (
        <div className="space-y-6">
           <div className="flex items-center justify-between gap-3">
                <div className="text-sm text-white/75">Filter</div>
                <div className="flex flex-wrap gap-2 justify-end">
                {categories.map((c) => (
                    <button
                    key={c}
                    onClick={() => setProjectFilter(c)}
                    className={cn(
                        "px-3 py-1.5 rounded-full text-xs font-semibold border transition",
                        projectFilter === c
                        ? "bg-white/30 border-white/20 text-white"
                        : "bg-white/[0.12] border-white/14 text-white/80 hover:text-white hover:bg-white/[0.18]"
                    )}
                    >
                    {c}
                    </button>
                ))}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredProjects.map((p, i) => (
                <motion.button
                key={p.name}
                onClick={() => onOpenProject(p)}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                className="group relative rounded-[30px] bg-white/[0.12] border border-white/14 overflow-hidden hover:bg-white/[0.18] transition-colors text-left w-full"
                >
                {/* WeChat Style Banner */}
                <div className="h-32 relative overflow-hidden bg-black/20">
                     {p.screenshots?.[0] ? (
                        <img 
                            src={p.screenshots[0]} 
                            alt={p.name} 
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                        />
                     ) : (
                         // Fallback gradient
                         <div 
                            className="w-full h-full"
                            style={{ background: `linear-gradient(135deg, ${hsl(p.accent, 0.4)}, rgba(0,0,0,0.5))` }} 
                         />
                     )}
                     
                     {p.flagship && (
                        <div className="absolute top-3 right-3">
                            <span className="px-3 py-1 rounded-full bg-yellow-400/20 text-yellow-100 text-xs font-bold border border-yellow-300/30 backdrop-blur-md">
                            FLAGSHIP
                            </span>
                        </div>
                    )}
                </div>

                <div className="p-6">
                    <h3 className="text-2xl font-semibold text-white">{p.name}</h3>
                    <div className="text-white/85 text-sm line-clamp-1 mt-1">{p.blurb}</div>
                    
                    <div className="flex flex-wrap gap-2 mt-4">
                    {p.tags.slice(0, 4).map((t) => (
                        <span key={t} className="px-2.5 py-1 bg-white/14 border border-white/12 rounded-full text-xs text-white/85">
                        {t}
                        </span>
                    ))}
                    {p.tags.length > 4 ? (
                        <span className="px-2.5 py-1 bg-white/10 border border-white/12 rounded-full text-xs text-white/75">
                        +{p.tags.length - 4}
                        </span>
                    ) : null}
                    </div>

                    <div className="flex gap-3 mt-4">
                    {p.links?.demo ? (
                        <a
                        href={p.links.demo}
                        target="_blank"
                        rel="noreferrer"
                        className="flex-1 py-2.5 text-center rounded-xl bg-white text-black font-semibold text-sm hover:opacity-90 transition"
                        onClick={(e) => e.stopPropagation()}
                        >
                        Demo
                        </a>
                    ) : null}
                    {p.links?.code ? (
                        <a
                        href={p.links.code}
                        target="_blank"
                        rel="noreferrer"
                        className="flex-1 py-2.5 text-center rounded-xl bg-white/14 border border-white/14 text-white font-semibold text-sm hover:bg-white/20 transition"
                        onClick={(e) => e.stopPropagation()}
                        >
                        Code
                        </a>
                    ) : null}
                    </div>
                </div>
                </motion.button>
            ))}
            </div>
        </div>
      );

    case "experience":
      return (
        <div className="space-y-10">
          {[
              { title: "Work History", data: WORK_EXPERIENCE },
              { title: "Leadership & Involvement", data: LEADERSHIP_EXPERIENCE },
              { title: "Volunteering", data: VOLUNTEER_EXPERIENCE }
          ].map((section) => (
            <div key={section.title}>
                <h3 className="text-lg font-semibold mb-4 text-white/90 border-b border-white/10 pb-2">{section.title}</h3>
                <div className="grid md:grid-cols-2 gap-4">
                    {section.data.map((e) => (
                        <motion.button 
                            key={e.name}
                            onClick={() => onOpenProject(e)}
                            className="text-left w-full group"
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <div className="p-6 rounded-[26px] bg-white/[0.12] border border-white/14 h-full relative overflow-hidden flex flex-col md:flex-row gap-4">
                                <div className="absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-20 pointer-events-none" style={{ background: hsl(e.accent, 0.4) }} />
                                
                                {/* Logo Logic */}
                                {e.logo ? (
                                    <div className="shrink-0 w-12 h-12 rounded-xl bg-white/10 overflow-hidden border border-white/10 z-10">
                                        <img src={e.logo} alt={e.name} className="w-full h-full object-cover" />
                                    </div>
                                ) : (
                                     <div className="shrink-0 w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center z-10">
                                        <Briefcase className="w-6 h-6 text-white/40" />
                                     </div>
                                )}

                                <div className="relative z-10 flex-1">
                                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-1">
                                        <div>
                                            <div className="text-lg font-semibold text-white">{e.name}</div>
                                            <div className="text-white/80 text-sm font-semibold mt-0.5">{e.subtitle}</div>
                                        </div>
                                        <span className="text-xs px-2.5 py-1 rounded-full bg-white/14 border border-white/12 w-fit text-white/90 whitespace-nowrap mt-2 md:mt-0">
                                            {e.date}
                                        </span>
                                    </div>
                                    <div className="text-sm text-white/80 mt-3 line-clamp-2">{e.blurb}</div>
                                    
                                    <div className="mt-4 flex items-center text-xs text-white/50 font-medium group-hover:text-white transition-colors">
                                        View Details <ArrowUpRight className="w-3 h-3 ml-1" />
                                    </div>
                                </div>
                            </div>
                        </motion.button>
                    ))}
                </div>
            </div>
          ))}
        </div>
      );

    case "education":
      return (
        <div className="grid md:grid-cols-2 gap-6">
          {EDUCATION.map((ed) => (
            <div key={ed.school} className="p-6 rounded-[26px] bg-white/[0.12] border border-white/14 flex gap-5">
              <div className="w-14 h-14 rounded-2xl border border-white/16 bg-white/[0.12] overflow-hidden shrink-0 grid place-items-center">
                {ed.logo ? (
                  <img src={ed.logo} alt={ed.school} className="w-full h-full object-cover" />
                ) : (
                  <GraduationCap className="w-6 h-6 text-white/80" />
                )}
              </div>
              <div className="min-w-0">
                <div className="flex items-start justify-between gap-3">
                  <div className="font-semibold truncate text-white">{ed.school}</div>
                  <span className="text-xs px-2.5 py-1 rounded-full bg-white/14 border border-white/12 text-white/90">{ed.period}</span>
                </div>
                <div className="text-sm text-white/90 mt-1">{ed.degree}</div>
                
                {ed.coursework && (
                    <div className="text-xs text-white/60 mt-1.5 leading-relaxed">
                      <span className="font-semibold text-white/70">Coursework:</span> {ed.coursework}
                    </div>
                )}

                <div className="mt-3 flex flex-wrap gap-2">
                  <span className="text-xs px-2.5 py-1 rounded-full bg-white/14 border border-white/12 text-white/90">{ed.gpa}</span>
                  {ed.honors ? <span className="text-xs px-2.5 py-1 rounded-full bg-white/14 border border-white/12 text-white/90">{ed.honors}</span> : null}
                  {ed.activities ? <span className="text-xs px-2.5 py-1 rounded-full bg-white/14 border border-white/12 text-white/90">{ed.activities}</span> : null}
                </div>
              </div>
            </div>
          ))}
        </div>
      );

    case "skills":
      return (
        <div className="grid gap-8 relative isolate">
          {SKILL_GROUPS.map((grp) => (
            <div key={grp.group}>
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2 text-white">
                <grp.icon className="w-5 h-5 text-white/85" /> {grp.group}
              </h3>
              <div className="flex flex-wrap gap-3 relative">
                {grp.items.map((it) => (
                  <SkillPill key={it.name} item={it} />
                ))}
              </div>
            </div>
          ))}
        </div>
      );

    case "photos":
      return (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {GALLERY.map((g, i) => (
            <div key={i} className="relative aspect-square rounded-3xl overflow-hidden bg-white/[0.12] border border-white/14">
              <img
                src={g.src}
                alt={g.alt}
                className="w-full h-full object-cover opacity-95 hover:opacity-100 transition"
                onError={(e) => ((e.currentTarget as HTMLImageElement).style.display = "none")}
              />
              <div className="absolute inset-0 grid place-items-center text-white/45 pointer-events-none">
                <Camera className="w-8 h-8" />
              </div>
            </div>
          ))}
        </div>
      );

    case "hobbies":
      return (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {HOBBIES.map((h) => (
            <div key={h.name} className="p-6 rounded-[26px] bg-white/[0.12] border border-white/14">
              <div className="flex items-center justify-between">
                <div className="text-lg font-semibold text-white">{h.name}</div>
                <div className="text-2xl">{h.emoji}</div>
              </div>
              <div className="text-sm text-white/90 mt-2">{h.blurb}</div>
            </div>
          ))}
        </div>
      );
    
    // NEW: UPDATES APP WITH FILTER
    case "updates":
      return (
        <div className="space-y-6">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-white">Latest Updates</h2>
                
                {/* Filter Capsule */}
                <div className="flex items-center bg-black/40 rounded-full p-1 border border-white/10">
                    {(["All", "Tech", "Life"] as const).map((tab) => {
                        const isActive = updateFilter === tab;
                        return (
                            <button
                                key={tab}
                                onClick={() => setUpdateFilter(tab)}
                                className={cn(
                                    "px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-300",
                                    isActive && tab === "All" && "bg-white text-black shadow-sm",
                                    isActive && tab === "Tech" && "bg-sky-500/80 text-white shadow-[0_0_15px_rgba(14,165,233,0.4)]",
                                    isActive && tab === "Life" && "bg-rose-500/80 text-white shadow-[0_0_15px_rgba(244,63,94,0.4)]",
                                    !isActive && "text-white/60 hover:text-white"
                                )}
                            >
                                {tab}
                            </button>
                        );
                    })}
                </div>
            </div>

            <motion.div layout className="grid md:grid-cols-2 gap-5">
                <AnimatePresence mode="popLayout">
                    {filteredUpdates.map((update) => (
                        <motion.div
                            layout
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                            transition={{ duration: 0.3 }}
                            key={update.title}
                            className="p-6 rounded-[26px] bg-white/[0.12] border border-white/14 relative overflow-hidden group hover:bg-white/[0.16] transition"
                        >
                             <div className="absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-25 pointer-events-none" style={{ background: hsl(update.accent, 0.5) }} />
                             <div className="relative z-10">
                                <div className="flex items-center justify-between mb-3">
                                    <div className={cn(
                                        "flex items-center gap-2 px-2.5 py-1 rounded-full w-fit",
                                        update.category === "Life" ? "bg-rose-500/20 border border-rose-500/30" : "bg-sky-500/20 border border-sky-500/30"
                                    )}>
                                        <update.icon className="w-3.5 h-3.5 text-white/90" />
                                        <span className="text-xs font-semibold text-white/90">{update.category}</span>
                                    </div>
                                    <div className="text-xs text-white/60 font-mono">{update.date}</div>
                                </div>
                                <h3 className="text-lg font-bold text-white mb-2">{update.title}</h3>
                                <p className="text-sm text-white/80 leading-relaxed">{update.desc}</p>
                             </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </motion.div>

            {filteredUpdates.length === 0 && (
                 <div className="h-40 flex flex-col items-center justify-center text-white/40">
                     <div className="text-4xl mb-2">📭</div>
                     <div className="text-sm">No updates here yet.</div>
                 </div>
            )}
        </div>
      );
    
    case "resume":
      return (
        <div className="flex flex-col items-center justify-center min-h-[50vh] text-center space-y-6">
             <div className="w-20 h-20 rounded-3xl bg-white/[0.1] border border-white/14 flex items-center justify-center mb-2">
                 <FileText className="w-10 h-10 text-white/80" />
             </div>
             <div>
                <h2 className="text-2xl font-semibold text-white">Resume.pdf</h2>
                <p className="text-white/60 text-sm mt-2 max-w-xs mx-auto">
                    A concise overview of my experience, skills, and education. Always up to date.
                </p>
             </div>
             
             <div className="flex gap-4 mt-4">
                 <a 
                   href={SITE.links.resume} 
                   target="_blank" 
                   rel="noreferrer"
                   className="flex items-center gap-2 px-8 py-3 rounded-full bg-white text-black font-bold hover:opacity-90 transition shadow-[0_0_30px_rgba(255,255,255,0.3)]"
                 >
                     <ExternalLink className="w-4 h-4" /> View PDF
                 </a>
             </div>
        </div>
      );

    case "contact":
      return (
        <div className="flex flex-col items-center justify-center min-h-[55vh] text-center space-y-8">
          <div className="text-3xl font-semibold text-white">Let’s Connect</div>
          <p className="max-w-md text-white/90">
            Open to {SITE.availability}. If you think we’d build well together, I’d love to talk.
          </p>
            
          <div className="w-full max-w-md">
             <MessageForm />
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            <a
              href={`mailto:${SITE.links.email}`}
              className="flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black font-semibold hover:opacity-95 transition"
            >
              <Mail className="w-5 h-5" /> Email
            </a>
            <a
              href={SITE.links.linkedin}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 px-6 py-3 rounded-full bg-white/[0.14] border border-white/14 text-white font-semibold hover:bg-white/[0.20] transition"
            >
              <Linkedin className="w-5 h-5" /> LinkedIn
            </a>
            <a
              href={SITE.links.github}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 px-6 py-3 rounded-full bg-white/[0.14] border border-white/14 text-white font-semibold hover:bg-white/[0.20] transition"
            >
              <Github className="w-5 h-5" /> GitHub
            </a>
            <a
              href={SITE.links.instagram}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 px-6 py-3 rounded-full bg-white/[0.14] border border-white/14 text-white font-semibold hover:bg-white/[0.20] transition"
            >
              <Instagram className="w-5 h-5" /> Instagram
            </a>
            <a
              href={SITE.links.zh}
              className="flex items-center gap-2 px-6 py-3 rounded-full bg-white/[0.14] border border-white/14 text-white font-semibold hover:bg-white/[0.20] transition"
            >
              中文
            </a>
          </div>
        </div>
      );

    default:
      return <div className="text-center text-white/80 mt-20">Content coming soon...</div>;
  }
};

const DockButton = ({
  icon: Icon,
  label,
  href,
}: {
  icon: any;
  label: string;
  href: string;
}) => (
  <a
    href={href}
    target={href.startsWith("http") ? "_blank" : undefined}
    rel={href.startsWith("http") ? "noreferrer" : undefined}
    className="group flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.14] border border-white/14 hover:bg-white/[0.20] transition"
    aria-label={label}
    title={label}
  >
    <Icon className="w-4 h-4 text-white/90" />
    <span className="text-sm font-semibold text-white/90">{label}</span>
  </a>
);

// -----------------------------
// Immersive Layout
// -----------------------------
const ImmersiveLayout = () => {
  const [activeAppId, setActiveAppId] = useState<string | null>(null);
  const activeApp = APPS.find((a) => a.id === (activeAppId as any));
  const [activeItem, setActiveItem] = useState<ItemContent | null>(null);

  return (
    <motion.div
      key="immersive"
      initial={{ opacity: 0, scale: 1.03, filter: "blur(12px)" }}
      animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
      exit={{ opacity: 0, scale: 1.03, filter: "blur(12px)" }}
      transition={{ duration: 0.5 }}
      // Padding bottom to avoid dock overlap
      className="absolute inset-0 z-10 flex flex-col items-center justify-center overflow-hidden pb-32"
    >
      <motion.div
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.18 }}
        className="mb-8 text-center"
      >
        <div className="w-24 h-24 mx-auto rounded-full border border-white/25 shadow-[0_0_60px_rgba(255,255,255,0.16)] overflow-hidden mb-4 bg-white/[0.12] backdrop-blur-2xl">
          <img src="/me.jpg" alt="Profile" className="w-full h-full object-cover" />
        </div>
        <h1 className="text-3xl text-white mb-1 drop-shadow-md">
          Welcome to <span className="font-bold">Alex Liu</span>'s Page!
        </h1>
        <p className="text-white/85 text-sm font-medium tracking-wide">{SITE.tagline}</p>
      </motion.div>

      {/* subtle “board” behind icons */}
      <div className="relative">
        <div className="absolute -inset-6 rounded-[40px] bg-white/[0.10] border border-white/12 backdrop-blur-3xl shadow-[0_30px_110px_rgba(0,0,0,0.32)]" />
        <div className="relative px-6 py-6">
          {/* UPDATED GRID LAYOUT: sm:grid-cols-5 to achieve "5 on top, 5 on bottom" */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-x-8 gap-y-10">
            {APPS.map((app, index) => (
              <VisionIcon key={app.id} app={app} index={index} onOpen={() => setActiveAppId(app.id)} />
            ))}
          </div>
        </div>
      </div>

      {/* Dock */}
      <motion.div
        initial={{ y: 24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.28 }}
        className="fixed bottom-4 left-1/2 -translate-x-1/2 z-30"
      >
        <div className="rounded-full border border-white/18 bg-white/[0.18] backdrop-blur-3xl shadow-[0_20px_80px_rgba(0,0,0,0.40)] px-3 py-2 flex items-center gap-2">
          <DockButton icon={Mail} label="Email" href={`mailto:${SITE.links.email}`} />
          <DockButton icon={Linkedin} label="LinkedIn" href={SITE.links.linkedin} />
          <DockButton icon={Github} label="GitHub" href={SITE.links.github} />
          <DockButton icon={Instagram} label="Instagram" href={SITE.links.instagram} />
          <DockButton icon={Globe} label="中文" href={SITE.links.zh} />
        </div>
      </motion.div>

      <AnimatePresence>
        {activeApp && (
          <VisionWindow app={activeApp} onClose={() => setActiveAppId(null)}>
            <ImmersiveContent id={activeApp.id} onOpenProject={(p) => setActiveItem(p)} />
          </VisionWindow>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {activeItem ? <SharedModal item={activeItem} onClose={() => setActiveItem(null)} /> : null}
      </AnimatePresence>
    </motion.div>
  );
};

// -----------------------------
// 11) MAIN ENTRY
// -----------------------------
export default function Portfolio() {
  const [mode, setMode] = useState<"immersive" | "traditional">("immersive");

  return (
    <div className="relative w-full h-screen bg-black text-white font-sans overflow-hidden selection:bg-white/20 antialiased">
      <SpatialBackground />
      <ViewToggle mode={mode} setMode={setMode} />

      <AnimatePresence mode="wait">
        {mode === "immersive" ? <ImmersiveLayout key="immersive" /> : <TraditionalLayout key="traditional" />}
      </AnimatePresence>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 10px; height: 10px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: rgba(255,255,255,0.06); border-radius: 999px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.22); border-radius: 999px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.34); }
      `}</style>
    </div>
  );
}