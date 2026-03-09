import React, { useCallback, useRef, useState } from 'react'
import { styled } from '../../stl-react/src/config'

const PanelGroupFrame = styled("div", { display: "flex", width: "100%", height: "100%", overflow: "hidden" }, "ResizablePanelGroup")

const PanelFrame = styled("div", { overflow: "hidden" }, "ResizablePanel")

const HandleFrame = styled(
  "div",
  {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "var(--borderColor)",
    flexShrink: 0,
  },
  "ResizableHandle"
)

const HandleDot = styled(
  "div",
  { borderRadius: "9999px", backgroundColor: "var(--color6)" },
  "ResizableHandleDot"
)

export interface ResizablePanelGroupProps {
  children: React.ReactNode
  direction?: 'horizontal' | 'vertical'
  onLayout?: (sizes: number[]) => void
}

export interface ResizablePanelProps {
  children: React.ReactNode
  defaultSize?: number
  minSize?: number
  maxSize?: number
  collapsible?: boolean
}

export interface ResizableHandleProps {
  withHandle?: boolean
}

const ResizableContext = React.createContext<{
  direction: 'horizontal' | 'vertical'
  registerPanel: (index: number, defaultSize: number) => void
  sizes: number[]
  onResize: (handleIndex: number, delta: number) => void
  nextPanelIndex: () => number
}>({
  direction: 'horizontal',
  registerPanel: () => {},
  sizes: [],
  onResize: () => {},
  nextPanelIndex: () => 0,
})

function PanelGroup({
  children,
  direction = 'horizontal',
  onLayout,
}: ResizablePanelGroupProps) {
  const [sizes, setSizes] = useState<number[]>([])
  const panelCount = React.Children.count(children)
  const panelIndexRef = useRef(0)

  panelIndexRef.current = 0

  const nextPanelIndex = useCallback(() => {
    return panelIndexRef.current++
  }, [])

  const registerPanel = useCallback((index: number, defaultSize: number) => {
    setSizes((prev) => {
      const next = [...prev]
      next[index] = defaultSize
      return next
    })
  }, [])

  const onResize = useCallback(
    (handleIndex: number, delta: number) => {
      setSizes((prev) => {
        const next = [...prev]
        const a = handleIndex
        const b = handleIndex + 1
        if (next[a] === undefined || next[b] === undefined) return prev
        const newA = Math.max(5, next[a] + delta)
        const newB = Math.max(5, next[b] - delta)
        next[a] = newA
        next[b] = newB
        onLayout?.(next)
        return next
      })
    },
    [onLayout],
  )

  if (sizes.length === 0 && panelCount > 0) {
    const equalSize = 100 / panelCount
    const initial = Array.from({ length: panelCount }, () => equalSize)
    setSizes(initial)
  }

  return (
    <ResizableContext.Provider
      value={{ direction, registerPanel, sizes, onResize, nextPanelIndex }}
    >
      <PanelGroupFrame
        style={{ flexDirection: direction === 'horizontal' ? 'row' : 'column' }}
      >
        {children}
      </PanelGroupFrame>
    </ResizableContext.Provider>
  )
}

function Panel({
  children,
  defaultSize,
  minSize: _minSize = 0,
  maxSize: _maxSize = 100,
  collapsible: _collapsible,
}: ResizablePanelProps) {
  const { nextPanelIndex, direction, sizes } = React.useContext(ResizableContext)
  const [index] = useState(() => nextPanelIndex())
  const size = sizes[index] ?? defaultSize ?? 50
  const isH = direction === 'horizontal'

  return (
    <PanelFrame
      style={{
        [isH ? 'width' : 'height']: `${size}%`,
        [isH ? 'height' : 'width']: '100%',
        flexShrink: 0,
      }}
    >
      {children}
    </PanelFrame>
  )
}

function Handle({ withHandle = true }: ResizableHandleProps) {
  const { direction, onResize, nextPanelIndex } = React.useContext(ResizableContext)
  const [handleIdx] = useState(() => nextPanelIndex() - 1)
  const isH = direction === 'horizontal'
  const isDragging = useRef(false)
  const startPos = useRef(0)

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault()
      isDragging.current = true
      startPos.current = isH ? e.clientX : e.clientY

      const handleMouseMove = (ev: MouseEvent) => {
        if (!isDragging.current) return
        const currentPos = isH ? ev.clientX : ev.clientY
        const delta = ((currentPos - startPos.current) / window.innerWidth) * 100
        startPos.current = currentPos
        onResize(handleIdx, delta)
      }

      const handleMouseUp = () => {
        isDragging.current = false
        document.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('mouseup', handleMouseUp)
      }

      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
    },
    [isH, onResize, handleIdx],
  )

  return (
    <HandleFrame
      onMouseDown={handleMouseDown}
      role="separator"
      aria-orientation={isH ? 'vertical' : 'horizontal'}
      tabIndex={0}
      style={{
        [isH ? 'width' : 'height']: 4,
        [isH ? 'height' : 'width']: '100%',
        cursor: isH ? 'col-resize' : 'row-resize',
      }}
    >
      {withHandle && (
        <HandleDot
          style={{
            width: isH ? 4 : 16,
            height: isH ? 16 : 4,
          }}
        />
      )}
    </HandleFrame>
  )
}

export const Resizable = { PanelGroup, Panel, Handle }
