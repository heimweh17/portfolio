import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import "./index.css";
import App from './App.tsx'
import PhotoGallery from './PhotoGallery.tsx'
import PortfolioChinese from './PortfolioChinese.tsx'
import Blog from './Blog.tsx'
import Apple from './Apple.tsx'
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/photos" element={<PhotoGallery />} />
        <Route path="/zh" element={<PortfolioChinese />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/vp" element={<Apple />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
