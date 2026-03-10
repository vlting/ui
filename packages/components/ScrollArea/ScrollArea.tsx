import type React from 'react'
import { styled } from '../../stl-react/src/config'

const ScrollAreaFrame = styled(
  'div',
  { position: 'relative', overflow: 'hidden' },
  'ScrollArea',
)

const ViewportFrame = styled('div', { borderRadius: 'inherit' }, 'ScrollAreaViewport')

export interface ScrollAreaRootProps {
  children: React.ReactNode
  orientation?: 'vertical' | 'horizontal' | 'both'
  type?: 'auto' | 'always' | 'scroll' | 'hover'
}

export interface ScrollAreaViewportProps {
  children: React.ReactNode
  orientation?: 'vertical' | 'horizontal' | 'both'
}

const OVERFLOW_STYLES = {
  vertical: { overflowY: 'scroll', overflowX: 'hidden' },
  horizontal: { overflowX: 'scroll', overflowY: 'hidden' },
  both: { overflow: 'scroll' },
} as const

function Root({ children }: ScrollAreaRootProps) {
  return (
    <ScrollAreaFrame>
      {children}
      <style
        dangerouslySetInnerHTML={{
          __html: `
            .vlting-scroll-viewport::-webkit-scrollbar { width: 4px; height: 4px; }
            .vlting-scroll-viewport::-webkit-scrollbar-track { background: transparent; }
            .vlting-scroll-viewport::-webkit-scrollbar-thumb { background-color: var(--color6, rgba(0,0,0,0.3)); border-radius: 9999px; }
            .vlting-scroll-viewport::-webkit-scrollbar-thumb:hover { background-color: var(--color7, rgba(0,0,0,0.5)); }
            .vlting-scroll-viewport { scrollbar-width: thin; scrollbar-color: var(--color6, rgba(0,0,0,0.3)) transparent; }
          `,
        }}
      />
    </ScrollAreaFrame>
  )
}

function Viewport({ children, orientation = 'vertical' }: ScrollAreaViewportProps) {
  return (
    <ViewportFrame
      className="vlting-scroll-viewport"
      tabIndex={0}
      style={{ width: '100%', height: '100%', ...OVERFLOW_STYLES[orientation] }}
    >
      {children}
    </ViewportFrame>
  )
}

function Scrollbar(_props: { orientation?: 'vertical' | 'horizontal' }) {
  return null
}

function Thumb() {
  return null
}

function Corner() {
  return null
}

export const ScrollArea = { Root, Viewport, Scrollbar, Thumb, Corner }
