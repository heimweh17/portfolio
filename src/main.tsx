import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, Navigate, Outlet, RouterProvider, ScrollRestoration } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import "./index.css";
import App from "./App";
import { BeyondWorkPage, ExperienceDetailPage, HomePage, NotFound, ProjectPage, ResumePage } from "./portfolio/Pages";

const collectAnalytics = import.meta.env.PROD && ["aliu.me", "www.aliu.me"].includes(window.location.hostname);
const visitorMapImage = "https://mapmyvisitors.com/map.png?d=zNM4cOcd5qWFePeDgnSpq0u6Nmw2W5onrCMDSEIVdhE&cl=ffffff";

const router = createBrowserRouter([
  {
    element: <><Outlet /><ScrollRestoration /></>,
    children: [
      {
        element: <App />,
        children: [
          { index: true, element: <HomePage /> },
          { path: "projects", element: <Navigate replace to="/#projects" /> },
          { path: "projects/:slug", element: <ProjectPage /> },
          { path: "experience", element: <Navigate replace to="/#experience" /> },
          { path: "experience/uf-sase", element: <Navigate replace to="/beyond-work#uf-sase" /> },
          { path: "experience/:slug", element: <ExperienceDetailPage /> },
          { path: "about", element: <Navigate replace to="/#about" /> },
          { path: "beyond-work", element: <BeyondWorkPage /> },
          { path: "resume", element: <ResumePage /> },
          { path: "*", element: <NotFound /> },
        ],
      },
      { path: "photos", lazy: async () => ({ Component: (await import("./PhotoGallery")).default }) },
      { path: "zh", lazy: async () => ({ Component: (await import("./PortfolioChinese")).default }) },
      { path: "blog", lazy: async () => ({ Component: (await import("./Blog")).default }) },
      { path: "vp", lazy: async () => ({ Component: (await import("./Apple")).default }) },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
    {collectAnalytics && <Analytics />}
    {collectAnalytics && <img src={visitorMapImage} alt="" width={1} height={1} hidden />}
  </StrictMode>,
);
