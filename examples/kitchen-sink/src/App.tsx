import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { BrandLayout } from './layouts/BrandLayout'
import { HomePage } from './pages/HomePage'
import { PrimitivesPage } from './pages/PrimitivesPage'
import { ComponentsPage } from './pages/ComponentsPage'
import { HeadlessPage } from './pages/HeadlessPage'
import { HooksPage } from './pages/HooksPage'
import { ComposedPage } from './pages/ComposedPage'

export function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/default" replace />} />
      <Route path="/:brand" element={<BrandLayout />}>
        <Route index element={<HomePage />} />
        <Route path="primitives" element={<PrimitivesPage />} />
        <Route path="components" element={<ComponentsPage />} />
        <Route path="composed" element={<ComposedPage />} />
        <Route path="headless" element={<HeadlessPage />} />
        <Route path="hooks" element={<HooksPage />} />
      </Route>
    </Routes>
  )
}
