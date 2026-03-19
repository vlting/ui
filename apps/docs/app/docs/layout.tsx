'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { styled } from '../../../../packages/stl-react/src'
import { DocsSidebar } from '@/components/docs-sidebar'
import { TableOfContents } from '@/components/table-of-contents'

const LayoutContainer = styled('div', {
  display: 'flex',
  minHeight: 'calc(100vh - 56px)',
})

const MobileMenuButton = styled('button', {
  position: 'fixed',
  bottom: 16,
  right: 16,
  zIndex: '$5',
  display: 'flex',
  width: 40,
  height: 40,
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '$12',
  bg: '$neutral12',
  color: '$min',
  border: 'none',
  cursor: 'pointer',
  boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
  gtMd: { display: 'none' },
})

const Overlay = styled('div', {
  position: 'fixed',
  inset: 0,
  zIndex: '$6',
  gtMd: { display: 'none' },
})

const OverlayBackdrop = styled('div', {
  position: 'fixed',
  inset: 0,
  background: 'rgba(0,0,0,0.5)',
})

const MobileSidebar = styled('div', {
  position: 'fixed',
  top: 0,
  bottom: 0,
  left: 0,
  width: 288,
  bg: '$min',
  boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
})

const MobileSidebarHeader = styled('div', {
  display: 'flex',
  height: 56,
  alignItems: 'center',
  justifyContent: 'space-between',
  borderBottom: '$neutralMin',
  px: '$3.5',
})

const CloseButton = styled('button', {
  display: 'flex',
  width: 32,
  height: 32,
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '$4',
  background: 'transparent',
  border: 'none',
  cursor: 'pointer',
  ':hover': { background: '$background2' },
})

const DesktopSidebar = styled('div', {
  display: 'none',
  width: 256,
  flexShrink: 0,
  borderRight: '$neutralMin',
  position: 'sticky',
  top: 56,
  height: 'calc(100vh - 56px)',
  gtMd: { display: 'block' },
})

const MainContent = styled('div', {
  flex: 1,
  minWidth: 0,
  overflow: 'auto',
  px: '$5',
  py: '$6',
})

const TocSidebar = styled('div', {
  display: 'none',
  width: 208,
  flexShrink: 0,
  position: 'sticky',
  top: 56,
  height: 'calc(100vh - 56px)',
  overflowY: 'auto',
  borderLeft: '$neutralMin',
  py: '$6',
  px: '$3.5',
  gtXl: { display: 'block' },
})

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const _pathname = usePathname()

  useEffect(() => {
    setSidebarOpen(false)
  }, [])

  return (
    <LayoutContainer>
      <MobileMenuButton
        onClick={() => setSidebarOpen(true)}
        aria-label="Open navigation"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden="true"
        >
          <path d="M3 12h18M3 6h18M3 18h18" />
        </svg>
      </MobileMenuButton>

      {sidebarOpen && (
        <Overlay
          role="presentation"
          onClick={() => setSidebarOpen(false)}
        >
          <OverlayBackdrop aria-hidden="true" />
          <MobileSidebar onClick={(e: React.MouseEvent) => e.stopPropagation()}>
            <MobileSidebarHeader>
              <span style={{ fontSize: 14, fontWeight: 600 }}>Navigation</span>
              <CloseButton
                onClick={() => setSidebarOpen(false)}
                aria-label="Close navigation"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden="true"
                >
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </CloseButton>
            </MobileSidebarHeader>
            <DocsSidebar />
          </MobileSidebar>
        </Overlay>
      )}

      <DesktopSidebar>
        <DocsSidebar />
      </DesktopSidebar>

      <MainContent data-content>
        {children}
      </MainContent>

      <TocSidebar>
        <TableOfContents />
      </TocSidebar>
    </LayoutContainer>
  )
}
