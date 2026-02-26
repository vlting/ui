import { Navigate, Route, Routes } from 'react-router-dom'
import { BrandLayout } from './layouts/BrandLayout'
import { ButtonsPage } from './pages/ButtonsPage'
import { ComposedPage } from './pages/ComposedPage'
import { DataDisplayPage } from './pages/DataDisplayPage'
import { FormsPage } from './pages/FormsPage'
import { HomePage } from './pages/HomePage'
import { HooksPage } from './pages/HooksPage'
import { MenusPage } from './pages/MenusPage'
import { OverlaysPage } from './pages/OverlaysPage'
import { PrimitivesPage } from './pages/PrimitivesPage'

export function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/default" replace />} />
      <Route path="/:brand" element={<BrandLayout />}>
        <Route index element={<HomePage />} />
        <Route path="primitives" element={<PrimitivesPage />} />
        <Route path="components/buttons" element={<ButtonsPage />} />
        <Route path="components/forms" element={<FormsPage />} />
        <Route path="components/data" element={<DataDisplayPage />} />
        <Route path="components/overlays" element={<OverlaysPage />} />
        <Route path="components/menus" element={<MenusPage />} />
        <Route path="composed" element={<ComposedPage />} />
        <Route path="hooks" element={<HooksPage />} />
      </Route>
    </Routes>
  )
}
