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
            <a href={`mailto:${site.email}`}><Mail size={18} aria-hidden="true" /> Email</a>
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
      <section className="folio-wrap folio-hero" aria-labelledby="hero-name">
        <div className="folio-hero-copy">
          <h1 id="hero-name" tabIndex={-1}>Alex Liu</h1>
          <p className="folio-lead">I study computer science and GIS at the University of Florida. At work, I review traffic crash data and write tools to help with that review. On my own, I build things around maps and college football.</p>
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
      <Contact />
    </>
  );
}

function Gallery({ title, images }: { title: string; images: string[] }) {
  const [index, setIndex] = useState(0);
  const count = images.length;
  return (
    <figure className="folio-gallery">
      <img key={images[index]} src={images[index]} alt={`${title} screenshot ${index + 1} of ${count}`} />
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
      <Back to={item === campusRole ? "/#about" : "/#experience"}>{item === campusRole ? "Beyond work" : "Experience"}</Back>
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
    <>
      <section id="about" tabIndex={-1} className="folio-wrap folio-section folio-about" aria-labelledby="about-title">
        <img src="/photos/photo2.jpg" alt="West Lake in Hangzhou" loading="lazy" />
        <div>
          <h2 id="about-title">Beyond work</h2>
          <p>I’ve edited roads and places on OpenStreetMap since 2020. I also take photos on road trips, play badminton and pickleball, and have performed lion and dragon dance with JiaTing.</p>
          <p>At UF, I’ve helped run campus events with SASE and taken part in UF CASA. I’ve also taught math and logic to younger students.</p>
          {campusRole && <Link className="folio-more" to={`/experience/${campusRole.slug}`}>UF SASE <ArrowUpRight size={16} aria-hidden="true" /></Link>}
        </div>
      </section>
      <section id="skills" tabIndex={-1} className="folio-wrap folio-section folio-tools" aria-labelledby="skills-title">
        <div><h2 id="skills-title">Skills</h2><p>B.S. Computer Science and a Geospatial Information Analysis certificate at UF. Expected graduation May 2028. GPA 3.78.</p></div>
        <dl className="folio-skills">{skillGroups.map(([title, ...skills]) => <div key={title}><dt>{title}</dt><dd>{skills.join(" · ")}</dd></div>)}</dl>
      </section>
    </>
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
