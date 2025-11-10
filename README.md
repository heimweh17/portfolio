
# Alex Liu – Personal Portfolio Website

A fully custom personal portfolio built with **React + TypeScript + Vite**, styled with **TailwindCSS**, animated with **Framer Motion**, and deployed via **Vercel**.

This site is my live professional identity — showcasing my engineering projects, experience, leadership, community work, and contact info in an interactive, expandable card-based UI.

### Live Site  
https://aliu.me

---

## ✨ Features

- Responsive, mobile-friendly layout with modern theming
- Project cards w/ expand / collapse animations (Framer Motion)
- Modular UI primitives built from scratch (Cards, Sections, Badge, LinkIcon, etc.)
- Dynamic filtering + show-more behavior for both projects & experience
- Smart resume linking + outbound profile linking (GitHub / LinkedIn / Email)
- Tailwind utility-driven styling for speed + consistency
- TypeScript type-safe structured content (Experience / Leadership / Projects)

---

## 🔥 Tech Stack

| Category | Tech |
|----------|------|
| Frontend Framework | React (TypeScript) |
| Build System | Vite |
| Styling | Tailwind CSS |
| Motion / Interactivity | Framer Motion |
| Icons | Lucide React |
| Deployment | Vercel |
| Language | TypeScript |

---

## Folder Structure

```
src/
 ├─ App.tsx        # main website page + layout logic
 ├─ assets/        # images, logos, headshot
 ├─ styles/        # global tailwind index.css
public/
 ├─ logos/
 ├─ me.jpg
 └─ resume.pdf
```

---

## Local Development

```bash
git clone https://github.com/heimweh17/portfolio
cd portfolio
npm install
npm run dev
```

---

## Deployment

This project deploys automatically via Vercel:  
`git push` → triggers auto build + deploy → updates in production instantly.

---

## Why I built this

I wanted a portfolio that actually **felt engineered**, not a template.  
I built this from scratch to practice:

- component abstraction  
- design decision making  
- animation ergonomics  
- visual communication  
- fast iteration / deployment pipelines

This is what I will continue improving as I grow as an engineer.

---

## Next Iterations (Roadmap)

- Light/Dark mode switch  
- Embedded live demos (WebAssembly + GIF previews)  
- Project metric badges (LOC, stars, performance)  
- Internationalization toggle (EN / CN)  

---

## License

MIT License — free to reference / fork / modify.
