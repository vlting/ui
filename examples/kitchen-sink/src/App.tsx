import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { BrandLayout } from './layouts/BrandLayout'
import { HomePage } from './pages/HomePage'
import { PrimitivesPage } from './pages/PrimitivesPage'
import { ComponentsPage } from './pages/ComponentsPage'
import { HeadlessPage } from './pages/HeadlessPage'
import { HooksPage } from './pages/HooksPage'
import { ComposedPage } from './pages/ComposedPage'
import { MenusPage } from './pages/MenusPage'
import { OverlaysPage } from './pages/OverlaysPage'
import { InputsPage } from './pages/InputsPage'
import { LayoutPage } from './pages/LayoutPage'
import { TypographyPage } from './pages/TypographyPage'

export function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/default" replace />} />
      <Route path="/:brand" element={<BrandLayout />}>
        <Route index element={<HomePage />} />
        <Route path="primitives" element={<PrimitivesPage />} />
        <Route path="components" element={<ComponentsPage />} />
        <Route path="components/menus" element={<MenusPage />} />
        <Route path="components/overlays" element={<OverlaysPage />} />
        <Route path="components/inputs" element={<InputsPage />} />
        <Route path="components/layout" element={<LayoutPage />} />
        <Route path="components/typography" element={<TypographyPage />} />
        <Route path="composed" element={<ComposedPage />} />
        <Route path="headless" element={<HeadlessPage />} />
        <Route path="hooks" element={<HooksPage />} />
      </Route>
    </Routes>
  )
}
