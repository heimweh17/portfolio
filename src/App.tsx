import { useEffect, useRef } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import SectionIndex from "./portfolio/SectionIndex";
import "./portfolio/portfolio.css";

export default function App() {
  const { pathname, hash } = useLocation();
  const previousLocation = useRef(pathname + hash);
  const main = useRef<HTMLElement>(null);

  useEffect(() => {
    const heading = main.current?.querySelector("h1");
    document.title = pathname === "/" ? "Alex Liu | Portfolio" : `${heading?.textContent ?? "Portfolio"} | Alex Liu`;
    const currentLocation = pathname + hash;
    if (previousLocation.current !== currentLocation) {
      const target = hash ? document.getElementById(hash.slice(1)) : heading;
      target?.focus({ preventScroll: true });
      previousLocation.current = currentLocation;
    }
  }, [pathname, hash]);

  return (
    <div className="folio">
      <a className="folio-skip" href="#main-content">Skip to content</a>
      <SectionIndex />
      <main id="main-content" ref={main} tabIndex={-1}><div className="folio-route" key={pathname}><Outlet /></div></main>
      <footer className="folio-footer">
        <div className="folio-wrap">
          <Link className="folio-brand" to="/">Alex Liu</Link>
          <nav aria-label="Footer navigation">
            <Link to="/#contact">Contact</Link>
            <Link to="/zh" lang="zh">中文</Link>
          </nav>
          <small>© {new Date().getFullYear()} Alex Liu</small>
        </div>
      </footer>
    </div>
  );
}
