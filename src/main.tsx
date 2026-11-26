import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, Outlet, RouterProvider, ScrollRestoration } from "react-router-dom";
import "./index.css";
import App from "./App";
import { AboutPage, ExperienceDetailPage, ExperiencePage, HomePage, NotFound, ProjectPage, ProjectsPage, ResumePage } from "./portfolio/Pages";

const router = createBrowserRouter([
  {
    element: <><Outlet /><ScrollRestoration /></>,
    children: [
      {
        element: <App />,
        children: [
          { index: true, element: <HomePage /> },
          { path: "projects", element: <ProjectsPage /> },
          { path: "projects/:slug", element: <ProjectPage /> },
          { path: "experience", element: <ExperiencePage /> },
          { path: "experience/:slug", element: <ExperienceDetailPage /> },
          { path: "about", element: <AboutPage /> },
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
  <StrictMode><RouterProvider router={router} /></StrictMode>,
);
