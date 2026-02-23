import type { ComponentType } from 'react'
import React from 'react'
import { View, styled } from 'tamagui'

type AnyFC = ComponentType<Record<string, unknown>>

// @ts-expect-error Tamagui v2 RC
const ScrollAreaFrame = styled(View, {
  position: 'relative',
  overflow: 'hidden',
})

const ScrollAreaFrameJsx = ScrollAreaFrame as AnyFC
const ViewJsx = View as AnyFC

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
    <ScrollAreaFrameJsx>
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
    </ScrollAreaFrameJsx>
  )
}

function Viewport({ children, orientation = 'vertical' }: ScrollAreaViewportProps) {
  return (
    <ViewJsx
      width="100%"
      height="100%"
      borderRadius="inherit"
      className="vlting-scroll-viewport"
      style={OVERFLOW_STYLES[orientation]}
    >
      {children}
    </ViewJsx>
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
