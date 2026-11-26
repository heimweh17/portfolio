import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, List } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const sections = [
  { id: "overview", label: "Overview" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "about", label: "Beyond work" },
  { id: "education", label: "Education" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
];

export default function SectionIndex() {
  const { pathname } = useLocation();
  const [visibleSection, setVisibleSection] = useState("overview");
  const menu = useRef<HTMLDetailsElement>(null);
  const isHome = pathname === "/";

  useEffect(() => {
    if (!isHome) return;
    const elements = sections.map(({ id }) => document.getElementById(id));
    let frame = 0;

    function updateSection() {
      frame = 0;
      const readingLine = Math.min(220, window.innerHeight * 0.3);
      let current = "overview";
      for (const element of elements) {
        if (element && element.getBoundingClientRect().top <= readingLine) current = element.id;
      }
      const page = document.scrollingElement;
      if (page && page.scrollTop > 0 && page.scrollHeight - page.clientHeight - page.scrollTop <= 2) current = "contact";
      setVisibleSection(current);
    }

    function scheduleUpdate() {
      if (!frame) frame = window.requestAnimationFrame(updateSection);
    }

    scheduleUpdate();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
    };
  }, [isHome]);

  const currentLabel = sections.find(({ id }) => id === visibleSection)?.label;
  function closeMenu() {
    if (menu.current) menu.current.open = false;
  }

  function links(includeOverview: boolean) {
    return (
      <nav aria-label="Portfolio sections">
        {(includeOverview ? sections : sections.slice(1)).map(({ id, label }) => (
          <Link key={id} to={`/#${id}`} aria-current={isHome && visibleSection === id ? "location" : undefined} onClick={closeMenu}>{label}</Link>
        ))}
        <Link className="folio-index-resume" to="/resume" aria-current={pathname === "/resume" ? "page" : undefined} onClick={closeMenu}>Résumé <ArrowUpRight size={13} aria-hidden="true" /></Link>
      </nav>
    );
  }

  return (
    <header className="folio-header">
      <div className="folio-wrap folio-header-inner">
        <Link className="folio-header-brand" to="/" aria-current={isHome && visibleSection === "overview" ? "location" : undefined} onClick={closeMenu}>
          Alex Liu
        </Link>
        <div className="folio-index">{links(false)}</div>
        <details className="folio-index-mobile" ref={menu} onKeyDown={(event) => {
          if (event.key === "Escape" && event.currentTarget.open) {
            closeMenu();
            event.currentTarget.querySelector("summary")?.focus();
          }
        }}>
          <summary><List size={16} aria-hidden="true" /> {isHome ? currentLabel : "Sections"}</summary>
          {links(true)}
        </details>
      </div>
    </header>
  );
}
