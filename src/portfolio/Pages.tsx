import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, ChevronLeft, ChevronRight, Github, Linkedin, Mail } from "lucide-react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { Link, useParams } from "react-router-dom";
import ContactForm from "./ContactForm";
import { experience, projects, site, skillGroups, type Project, type ProjectLinks } from "./content";

function Title({ children }: { children: ReactNode }) {
  return <h1 tabIndex={-1}>{children}</h1>;
}

function More({ to, children }: { to: string; children: ReactNode }) {
  return <Link className="folio-more" to={to}>{children}<ArrowRight size={19} aria-hidden="true" /></Link>;
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

function WorkList() {
  return (
    <div className="folio-work-list">
      {experience.map((item) => (
        <Link className="folio-work-row" key={item.slug} to={`/experience/${item.slug}`}>
          {item.logo && <img src={item.logo} alt="" loading="lazy" />}
          <div><strong>{item.organization}</strong><p>{item.role}</p></div>
          <span>{item.period}</span>
          <ArrowUpRight size={22} aria-hidden="true" />
        </Link>
      ))}
    </div>
  );
}

function Contact() {
  return (
    <section id="contact" className="folio-contact" aria-labelledby="contact-title">
      <div className="folio-wrap folio-contact-grid">
        <div>
          <h2 id="contact-title">Let’s get in touch.</h2>
          <p>I’m interested in 2027 internships in software engineering, data, infrastructure, and geospatial technology. I’m also happy to talk about maps or a project you’re working on.</p>
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
  const chapter = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = chapter.current;
    if (!element || !("IntersectionObserver" in window) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        element.classList.add("folio-chapter-arrived");
        observer.disconnect();
      }
    }, { threshold: 0.14 });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <section className="folio-wrap folio-hero" aria-labelledby="hero-name">
        <div className="folio-hero-copy">
          <h1 id="hero-name" tabIndex={-1}>Alex Liu</h1>
          <p className="folio-hero-line">I build software and the systems behind it.</p>
          <p className="folio-lead">I study Computer Science and geospatial information at the University of Florida. My work spans web applications, data pipelines, spatial analysis, and the servers that keep them running.</p>
          <div className="folio-actions">
            <a className="folio-button" href="#projects">Explore my work <ArrowDown size={19} aria-hidden="true" /></a>
            <Link className="folio-button folio-secondary" to="/resume">View résumé</Link>
          </div>
        </div>
        <div className="folio-portrait">
          <img src="/me.jpg" alt="Alex Liu outdoors by the water" fetchPriority="high" />
          <p>University of Florida <span>Gainesville, FL</span></p>
        </div>
      </section>

      <section id="projects" className="folio-project-chapter" ref={chapter} aria-labelledby="home-projects">
        <div className="folio-wrap folio-section">
          <div className="folio-section-head">
            <h2 id="home-projects">Selected projects</h2>
            <More to="/projects">All projects</More>
          </div>
          <div className="folio-feature-grid">{projects.slice(0, 2).map((project) => <ProjectCard project={project} key={project.slug} />)}</div>
        </div>
      </section>

      <section id="work" className="folio-wrap folio-section folio-home-work" aria-labelledby="home-work">
        <div>
          <h2 id="home-work">Experience</h2>
          <p className="folio-lead">From provisioning bare-metal servers to building tools for transportation-data review, I’ve worked across infrastructure and the software people use every day.</p>
          <More to="/experience">Explore experience</More>
        </div>
        <WorkList />
      </section>

      <section id="about" className="folio-about-band" aria-labelledby="home-about">
        <div className="folio-wrap folio-about-teaser">
          <img src="/photos/photo2.jpg" alt="West Lake in Hangzhou" loading="lazy" />
          <div>
            <h2 id="home-about">Beyond work</h2>
            <p className="folio-lead">I’ve contributed to OpenStreetMap since 2020. Away from a screen, I enjoy photography, road trips, and racket sports. At UF, I’ve also helped organize campus events and performed lion and dragon dance.</p>
            <More to="/about">More about me</More>
          </div>
        </div>
      </section>
      <Contact />
    </>
  );
}

export function ProjectsPage() {
  return (
    <div className="folio-wrap folio-page">
      <header className="folio-page-head">
        <Title>Projects</Title>
        <p className="folio-lead">Applications, data pipelines, and engineering experiments I’ve built on my own and in teams.</p>
      </header>
      <div className="folio-project-grid">{projects.map((project) => <ProjectCard project={project} key={project.slug} />)}</div>
    </div>
  );
}

function Gallery({ title, images }: { title: string; images: string[] }) {
  const [index, setIndex] = useState(0);
  const count = images.length;
  return (
    <figure className="folio-gallery">
      <img src={images[index]} alt={`${title} screenshot ${index + 1} of ${count}`} />
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
  if (!project) return <NotFound back="/projects" label="All projects" />;

  return (
    <article className="folio-wrap folio-page folio-detail">
      <Back to="/projects">All projects</Back>
      <header className="folio-page-head">
        <p className="folio-project-type">{project.subtitle}</p>
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

export function ExperiencePage() {
  return (
    <div className="folio-wrap folio-page">
      <header className="folio-page-head"><Title>Experience</Title><p className="folio-lead">Data center operations, transportation research, and campus community work.</p></header>
      <WorkList />
    </div>
  );
}

export function ExperienceDetailPage() {
  const { slug } = useParams();
  const item = experience.find((entry) => entry.slug === slug);
  if (!item) return <NotFound back="/experience" label="All experience" />;

  return (
    <article className="folio-wrap folio-page folio-detail">
      <Back to="/experience">All experience</Back>
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

export function AboutPage() {
  return (
    <div className="folio-wrap folio-page">
      <header className="folio-page-head">
        <Title>About me</Title>
        <p className="folio-lead">I’m Alex, a Computer Science student at the University of Florida pursuing a certificate in Geospatial Information Analysis.</p>
      </header>
      <div className="folio-profile">
        <img src="/me.jpg" alt="Alex Liu" />
        <div>
          <h2>Engineering across the stack</h2>
          <p>At Database Mart I provisioned and troubleshot bare-metal servers and automated firmware updates. At UF’s GeoPlan Center, I’ve built internal tools that speed up transportation-data review while keeping the final decisions with reviewers.</p>
          <p>Saturday Lab brings my interest in college football together with modeling and automated publishing. Geography Dashboard combines spatial analysis with backend APIs, cloud deployment, and local infrastructure. I like understanding how these pieces fit together and how to keep them reliable over time.</p>
          <dl><div><dt>Graduation</dt><dd>May 2028 (expected)</dd></div><div><dt>GPA</dt><dd>3.78 / 4.00</dd></div></dl>
        </div>
      </div>
      <section className="folio-about-section">
        <h2>Tools I use</h2>
        <dl className="folio-skills">{skillGroups.map(([title, ...skills]) => <div key={title}><dt>{title}</dt><dd>{skills.join(" · ")}</dd></div>)}</dl>
      </section>
      <section className="folio-about-section">
        <h2>Beyond work</h2>
        <div className="folio-interests">
          <article><h3>OpenStreetMap</h3><p>I’ve edited roads, places, and land use since 2020. It’s an ongoing way to learn how people build and maintain the maps others rely on.</p><a href="https://www.openstreetmap.org/" target="_blank" rel="noreferrer">OpenStreetMap <ArrowUpRight size={16} aria-hidden="true" /></a></article>
          <article><h3>Campus and community</h3><p>I’ve taught mathematics and logic to younger students, helped organize events through UF SASE, and taken part in UF CASA and JiaTing Lion &amp; Dragon.</p><a href="https://orgs.studentinvolvement.ufl.edu/Organization/Chinese-American-Student-Association" target="_blank" rel="noreferrer">UF CASA <ArrowUpRight size={16} aria-hidden="true" /></a> <a href="https://jiatingliondragon.com/" target="_blank" rel="noreferrer">JiaTing <ArrowUpRight size={16} aria-hidden="true" /></a></article>
          <article><h3>Off the clock</h3><p>I take photos on walks and road trips, listen to audiobooks while traveling, and play badminton and pickleball.</p><More to="/photos">Photo gallery</More></article>
        </div>
      </section>
    </div>
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
  return <div className="folio-wrap folio-page"><header className="folio-page-head"><Title>Page not found</Title><p className="folio-lead">This address may have changed.</p><More to={back}>{label}</More></header></div>;
}
