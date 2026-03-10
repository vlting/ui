import { Navigate, Route, Routes } from 'react-router-dom'
import { ShowcaseLayout } from './layouts/ShowcaseLayout'
import { HomePage } from './pages/HomePage'
import { StylingPage } from './pages/StylingPage'
import { PrimitivesPage } from './pages/PrimitivesPage'
import { ComponentsPage } from './pages/ComponentsPage'
import { FormsPage } from './pages/FormsPage'
import { OverlaysPage } from './pages/OverlaysPage'
import { DataDisplayPage } from './pages/DataDisplayPage'
import { NavigationPage } from './pages/NavigationPage'
import { HooksPage } from './pages/HooksPage'
import { BlocksPage } from './pages/BlocksPage'
import { IconsPage } from './pages/IconsPage'
import { ButtonPage } from './pages/components/ButtonPage'

export function App() {
  return (
    <Routes>
      <Route path="/" element={<ShowcaseLayout />}>
        <Route index element={<HomePage />} />
        <Route path="styling" element={<StylingPage />} />
        <Route path="primitives" element={<PrimitivesPage />} />
        <Route path="components" element={<ComponentsPage />} />
        <Route path="forms" element={<FormsPage />} />
        <Route path="overlays" element={<OverlaysPage />} />
        <Route path="data-display" element={<DataDisplayPage />} />
        <Route path="navigation" element={<NavigationPage />} />
        <Route path="hooks" element={<HooksPage />} />
        <Route path="blocks" element={<BlocksPage />} />
        <Route path="icons" element={<IconsPage />} />
        <Route path="components/button" element={<ButtonPage />} />
      </Route>
    </Routes>
  )
}
