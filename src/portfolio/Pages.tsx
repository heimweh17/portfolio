import { ArrowLeft, ArrowUpRight, ChevronLeft, ChevronRight, Github, Linkedin, Mail } from "lucide-react";
import { useState, type ReactNode } from "react";
import { Link, useParams } from "react-router-dom";
import ContactForm from "./ContactForm";
import { experience, projects, site, skillGroups, type Project, type ProjectLinks } from "./content";

function Title({ children }: { children: ReactNode }) {
  return <h1 tabIndex={-1}>{children}</h1>;
}

function Back({ to, children }: { to: string; children: ReactNode }) {
  return <Link className="folio-back" to={to}><ArrowLeft size={17} aria-hidden="true" />{children}</Link>;
}

function Tags({ items }: { items: string[] }) {
  return <ul className="folio-tags" aria-label="Technologies">{items.map((item) => <li key={item}>{item}</li>)}</ul>;
}

function ProjectActions({ links }: { links: ProjectLinks }) {
  return (
    <div className="folio-actions">
      {links.demo && <a className="folio-button" href={links.demo} target="_blank" rel="noreferrer">Live demo <ArrowUpRight size={18} aria-hidden="true" /></a>}
      {links.code && <a className="folio-button folio-secondary" href={links.code} target="_blank" rel="noreferrer"><Github size={18} aria-hidden="true" /> Source code <ArrowUpRight size={16} aria-hidden="true" /></a>}
    </div>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const image = project.screenshots?.[0];
  return (
    <article className={`folio-card ${image ? "" : "folio-card-text"}`}>
      <Link className="folio-project-link" to={`/projects/${project.slug}`} aria-label={`View project: ${project.name}`}>
        {image && <div className={`folio-card-media folio-media-${project.slug}`}><img src={image} alt="" loading="lazy" /></div>}
        <div className="folio-card-copy">
          <div><p className="folio-project-type">{project.subtitle}</p><h3>{project.name}</h3></div>
          <span className="folio-card-arrow"><ArrowUpRight size={23} aria-hidden="true" /></span>
          <p className="folio-card-summary">{project.summary}</p>
        </div>
      </Link>
    </article>
  );
}

const campusRole = experience.find((item) => item.slug === "uf-sase");

function WorkList() {
  return (
    <div className="folio-work-list">
      {experience.filter((item) => item !== campusRole).map((item) => (
        <Link className="folio-work-row" key={item.slug} to={`/experience/${item.slug}`}>
          {item.logo && <img src={item.logo} alt="" loading="lazy" />}
          <div><h3>{item.organization}</h3><p className="folio-role">{item.role}</p><p className="folio-work-summary">{item.description}</p></div>
          <span>{item.period}</span>
          <ArrowUpRight size={22} aria-hidden="true" />
        </Link>
      ))}
    </div>
  );
}

function Contact() {
  return (
    <section id="contact" tabIndex={-1} className="folio-contact" aria-labelledby="contact-title">
      <div className="folio-wrap folio-contact-grid">
        <div>
          <h2 id="contact-title">Contact</h2>
          <p>I’m looking for a 2027 internship in software, data, infrastructure, or GIS.</p>
          <div className="folio-social">
            <a className="folio-email" href={`mailto:${site.email}`}><Mail size={18} aria-hidden="true" /> {site.email}</a>
            <a href={site.linkedin} target="_blank" rel="noreferrer"><Linkedin size={18} aria-hidden="true" /> LinkedIn</a>
            <a href={site.github} target="_blank" rel="noreferrer"><Github size={18} aria-hidden="true" /> GitHub</a>
          </div>
        </div>
        <ContactForm />
      </div>
    </section>
  );
}

export function HomePage() {
  return (
    <>
      <section id="overview" tabIndex={-1} className="folio-wrap folio-hero" aria-labelledby="hero-name">
        <div className="folio-hero-copy">
          <h1 id="hero-name" tabIndex={-1}>Alex Liu</h1>
          <p className="folio-lead">I’m Alex, a computer science student at the University of Florida, where I also study GIS. I’ve been editing OpenStreetMap since high school, and I still catch myself looking up new places on a map after a trip. At UF’s GeoPlan Center, I review Florida crash records and write tools to help with that work.</p>
          <p className="folio-lead">I spent a summer in Kansas City setting up and repairing servers. I follow college football closely enough that I ended up building my own rankings site. I also like getting away from my desk to take photos or play a few games of badminton or pickleball.</p>
        </div>
        <img className="folio-portrait" src="/me.jpg" alt="Alex Liu outdoors by the water" fetchPriority="high" />
      </section>

      <section id="experience" tabIndex={-1} className="folio-wrap folio-section" aria-labelledby="home-work">
        <span id="work" className="folio-anchor-alias" aria-hidden="true" />
        <h2 id="home-work">Experience</h2>
        <WorkList />
      </section>

      <section id="projects" tabIndex={-1} className="folio-wrap folio-section" aria-labelledby="home-projects">
        <h2 id="home-projects">Projects</h2>
        <div className="folio-feature-grid">{projects.slice(0, 2).map((project) => <ProjectCard project={project} key={project.slug} />)}</div>
        <div className="folio-project-grid">{projects.slice(2).map((project) => <ProjectCard project={project} key={project.slug} />)}</div>
      </section>

      <About />
      <Education />
      <Skills />
      <Contact />
    </>
  );
}

function Gallery({ title, images }: { title: string; images: string[] }) {
  const [index, setIndex] = useState(0);
  const count = images.length;
  return (
    <figure className="folio-gallery">
      <a className="folio-gallery-image" href={images[index]} target="_blank" rel="noreferrer" aria-label={`Open ${title} screenshot ${index + 1} at full size`}>
        <img key={images[index]} src={images[index]} alt={`${title} screenshot ${index + 1} of ${count}`} />
      </a>
      <figcaption>
        <span aria-live="polite">Screenshot {index + 1} of {count}</span>
        {count > 1 && <div>
          <button type="button" aria-label="Previous screenshot" onClick={() => setIndex((index - 1 + count) % count)}><ChevronLeft aria-hidden="true" size={23} /></button>
          <button type="button" aria-label="Next screenshot" onClick={() => setIndex((index + 1) % count)}><ChevronRight aria-hidden="true" size={23} /></button>
        </div>}
      </figcaption>
    </figure>
  );
}

export function ProjectPage() {
  const { slug } = useParams();
  const project = projects.find((item) => item.slug === slug);
  if (!project) return <NotFound back="/#projects" label="All projects" />;

  return (
    <article className="folio-wrap folio-page folio-detail">
      <Back to="/#projects">All projects</Back>
      <header className="folio-page-head">
        <Title>{project.name}</Title>
        <p className="folio-lead">{project.summary}</p>
        <ProjectActions links={project.links} />
      </header>
      {project.screenshots?.length ? <Gallery key={project.slug} title={project.name} images={project.screenshots} /> : null}
      <div className="folio-detail-grid">
        <section aria-labelledby="project-notes">
          <h2 id="project-notes">{project.smallProjects ? "Projects in this collection" : "Technical highlights"}</h2>
          {project.highlights.length > 0 && <ul className="folio-detail-list">{project.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}</ul>}
          {project.smallProjects?.map((item) => (
            <article className="folio-small-project" key={item.name}>
              <h3>{item.name}</h3><p>{item.summary}</p><Tags items={item.stack} /><ProjectActions links={item.links} />
            </article>
          ))}
        </section>
        <aside><h2>Stack</h2><Tags items={project.stack} /></aside>
      </div>
    </article>
  );
}

export function ExperienceDetailPage() {
  const { slug } = useParams();
  const item = experience.find((entry) => entry.slug === slug);
  if (!item) return <NotFound back="/#experience" label="All experience" />;

  return (
    <article className="folio-wrap folio-page folio-detail">
      <Back to="/#experience">Experience</Back>
      <header className="folio-page-head">
        {item.logo && <img className="folio-detail-logo" src={item.logo} alt="" />}
        <p className="folio-project-type">{item.role}</p>
        <Title>{item.organization}</Title>
        <p className="folio-meta">{item.period} · {item.location}</p>
        <p className="folio-lead">{item.description}</p>
      </header>
      <div className="folio-detail-grid">
        <section><h2>What I worked on</h2><ul className="folio-detail-list">{item.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul></section>
        <aside><h2>Skills</h2><Tags items={item.tags} /></aside>
      </div>
    </article>
  );
}

function About() {
  return (
    <section id="about" tabIndex={-1} className="folio-wrap folio-section folio-about" aria-labelledby="about-title">
      <img src="/photos/photo2.jpg" alt="West Lake in Hangzhou" loading="lazy" />
      <div>
        <h2 id="about-title">Beyond work</h2>
        <p>In high school, I taught math at summer camp. At UF, I’ve helped put on campus events and performed lion and dragon dance. I still make time for maps, road trips, badminton, and pickleball.</p>
        <Link className="folio-more" to="/beyond-work">More about my life outside work <ArrowUpRight size={16} aria-hidden="true" /></Link>
      </div>
    </section>
  );
}

export function BeyondWorkPage() {
  return (
    <article className="folio-wrap folio-page folio-beyond">
      <Back to="/#about">Home</Back>
      <header className="folio-page-head"><Title>Beyond work</Title></header>
      <div className="folio-activities">
        <section>
          <h2>OpenStreetMap</h2>
          <p>I’ve been a volunteer mapper since 2020. Before adding a road or changing how a place is tagged, I compare satellite images and street-level photos with what I know about the area. Sometimes a road trip gives me a stretch of map to revisit when I get home.</p>
        </section>
        <section>
          <h2>Buchholz Math Team</h2>
          <p>I volunteered at the team’s summer camps in 2022 and 2023, teaching math to elementary and middle school students. If someone got stuck, I liked asking them to walk me through the step where they got lost.</p>
        </section>
        <section id="uf-sase" tabIndex={-1}>
          <h2>Campus events</h2>
          <p>With UF SASE, I help set up career and technical events and coordinate things on the day. I’ve also helped put on cultural events with the Chinese American Student Association.</p>
        </section>
        <section>
          <h2>Lion and dragon dance</h2>
          <p>I performed with JiaTing at campus and community events. Rehearsals taught me to pay attention to cues and keep time with the rest of the group.</p>
        </section>
        <section>
          <h2>Badminton</h2>
          <p>I usually play doubles. I like the quick rallies and how much good positioning depends on knowing where your partner is.</p>
        </section>
        <section>
          <h2>Pickleball</h2>
          <p>I play casual games and still get a little too interested in where a shot lands. It’s also a good way to meet people outside my classes.</p>
        </section>
        <section>
          <h2>Family, photography, and road trips</h2>
          <p>I like spending time with family. On road trips, I usually have an audiobook on and stop for photos when a place catches my eye.</p>
        </section>
      </div>
    </article>
  );
}

const coursework = [
  "Operating Systems", "Data Structures & Algorithms", "Software Engineering",
  "Information & Database Systems", "Engineering Statistics", "Foundations of GIS",
  "Digital Image Processing & Remote Sensing", "Physical Geography",
];

function Education() {
  return (
    <section id="education" tabIndex={-1} className="folio-wrap folio-section folio-education" aria-labelledby="education-title">
      <div>
        <h2 id="education-title">Education</h2>
        <h3>University of Florida</h3>
        <p>B.S. in Computer Science<br />Certificate in Geospatial Information Analysis</p>
        <p className="folio-education-meta">Expected May 2028 <span aria-hidden="true">·</span> GPA 3.78</p>
      </div>
      <div className="folio-coursework">
        <h3>Relevant coursework</h3>
        <ul>{coursework.map((course) => <li key={course}>{course}</li>)}</ul>
      </div>
      <img src="/logos/uf_logo.png" alt="Florida Gators" width={82} height={82} loading="lazy" />
    </section>
  );
}

function Skills() {
  return (
    <section id="skills" tabIndex={-1} className="folio-wrap folio-section folio-tools" aria-labelledby="skills-title">
      <h2 id="skills-title">Skills</h2>
      <dl className="folio-skills">{skillGroups.map(([title, ...skills]) => <div key={title}><dt>{title}</dt><dd>{skills.join(" · ")}</dd></div>)}</dl>
    </section>
  );
}

export function ResumePage() {
  return (
    <div className="folio-wrap folio-page">
      <header className="folio-page-head"><Title>Résumé</Title><div className="folio-actions"><a className="folio-button" href={site.resume} target="_blank" rel="noreferrer">Open PDF <ArrowUpRight aria-hidden="true" size={18} /></a></div></header>
      <iframe className="folio-resume-frame" src={`${site.resume}#view=FitH`} title="Alex Liu résumé" />
    </div>
  );
}

export function NotFound({ back = "/", label = "Back to home" }: { back?: string; label?: string }) {
  return <div className="folio-wrap folio-page"><header className="folio-page-head"><Title>Page not found</Title><Back to={back}>{label}</Back></header></div>;
}
