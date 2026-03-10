import { Route, Routes } from 'react-router-dom'
import { ShowcaseLayout } from './layouts/ShowcaseLayout'
import { HomePage } from './pages/HomePage'
import { StylingPage } from './pages/StylingPage'
import { PrimitivesPage } from './pages/PrimitivesPage'
import { ComponentsPage } from './pages/ComponentsPage'
import { FormsPage } from './pages/FormsPage'
import { OverlaysPage } from './pages/OverlaysPage'
import { DataDisplayPage } from './pages/DataDisplayPage'
import { NavigationPage } from './pages/NavigationPage'
import { ChartsPage } from './pages/ChartsPage'
import { HooksPage } from './pages/HooksPage'
import { UtilsPage } from './pages/UtilsPage'
import { BlocksPage } from './pages/BlocksPage'
import { IconsPage } from './pages/IconsPage'
import { AccordionPage } from './pages/components/AccordionPage'
import { AlertPage } from './pages/components/AlertPage'
import { AvatarPage } from './pages/components/AvatarPage'
import { BadgePage } from './pages/components/BadgePage'
import { ButtonPage } from './pages/components/ButtonPage'
import { CardPage } from './pages/components/CardPage'
import { CheckboxPage } from './pages/components/CheckboxPage'
import { DialogPage } from './pages/components/DialogPage'
import { InputPage } from './pages/components/InputPage'
import { ProgressPage } from './pages/components/ProgressPage'
import { SelectPage } from './pages/components/SelectPage'
import { SwitchPage } from './pages/components/SwitchPage'
import { TablePage } from './pages/components/TablePage'
import { TabsPage } from './pages/components/TabsPage'

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
        <Route path="charts" element={<ChartsPage />} />
        <Route path="hooks" element={<HooksPage />} />
        <Route path="utils" element={<UtilsPage />} />
        <Route path="blocks" element={<BlocksPage />} />
        <Route path="icons" element={<IconsPage />} />
        <Route path="components/accordion" element={<AccordionPage />} />
        <Route path="components/alert" element={<AlertPage />} />
        <Route path="components/avatar" element={<AvatarPage />} />
        <Route path="components/badge" element={<BadgePage />} />
        <Route path="components/button" element={<ButtonPage />} />
        <Route path="components/card" element={<CardPage />} />
        <Route path="components/checkbox" element={<CheckboxPage />} />
        <Route path="components/dialog" element={<DialogPage />} />
        <Route path="components/input" element={<InputPage />} />
        <Route path="components/progress" element={<ProgressPage />} />
        <Route path="components/select" element={<SelectPage />} />
        <Route path="components/switch" element={<SwitchPage />} />
        <Route path="components/table" element={<TablePage />} />
        <Route path="components/tabs" element={<TabsPage />} />
      </Route>
    </Routes>
  )
}
