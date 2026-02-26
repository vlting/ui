import { styledHtml } from '@tamagui/web'
import type { ComponentType } from 'react'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Text, View } from 'tamagui'

type AnyFC = ComponentType<Record<string, unknown>>
const ViewJsx = View as AnyFC
const TextJsx = Text as AnyFC

const CarouselBtn = styledHtml('button', {
  display: 'inline-flex',
  flexDirection: 'row',
  boxSizing: 'border-box',
  appearance: 'none',
  border: 'none',
  background: 'none',
  padding: 0,
  margin: 0,
  fontFamily: 'inherit',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  focusVisibleStyle: {
    outlineWidth: 2,
    outlineOffset: 2,
    outlineColor: '$outlineColor',
    outlineStyle: 'solid',
  },
} as any)
const CarouselBtnJsx = CarouselBtn as AnyFC

const DotBtn = styledHtml('button', {
  display: 'inline-flex',
  boxSizing: 'border-box',
  appearance: 'none',
  border: 'none',
  background: 'none',
  padding: 0,
  margin: 0,
  cursor: 'pointer',
  borderRadius: 9999,
  focusVisibleStyle: {
    outlineWidth: 2,
    outlineOffset: 2,
    outlineColor: '$outlineColor',
    outlineStyle: 'solid',
  },
} as any)
const DotBtnJsx = DotBtn as AnyFC

export interface CarouselRootProps {
  children: React.ReactNode
  orientation?: 'horizontal' | 'vertical'
  loop?: boolean
  autoplay?: boolean
  autoplayInterval?: number
}

export interface CarouselItemProps {
  children: React.ReactNode
  index?: number
}

const CarouselContext = React.createContext<{
  activeIndex: number
  totalItems: number
  goTo: (index: number) => void
  next: () => void
  prev: () => void
  orientation: 'horizontal' | 'vertical'
}>({
  activeIndex: 0,
  totalItems: 0,
  goTo: () => {},
  next: () => {},
  prev: () => {},
  orientation: 'horizontal',
})

function Root({
  children,
  orientation = 'horizontal',
  loop = false,
  autoplay = false,
  autoplayInterval = 5000,
}: CarouselRootProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [totalItems, setTotalItems] = useState(0)
  const contentRef = useRef<HTMLDivElement>(null)

  const goTo = useCallback(
    (index: number) => {
      let target = index
      if (loop) {
        target = ((index % totalItems) + totalItems) % totalItems
      } else {
        target = Math.max(0, Math.min(index, totalItems - 1))
      }
      setActiveIndex(target)
    },
    [totalItems, loop],
  )

  const next = useCallback(() => goTo(activeIndex + 1), [activeIndex, goTo])
  const prev = useCallback(() => goTo(activeIndex - 1), [activeIndex, goTo])

  useEffect(() => {
    if (!autoplay || totalItems <= 1) return
    const timer = setInterval(next, autoplayInterval)
    return () => clearInterval(timer)
  }, [autoplay, autoplayInterval, next, totalItems])

  // Count children to know total
  useEffect(() => {
    const el = contentRef.current
    if (el) {
      setTotalItems(el.children.length)
    }
  })

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      const isH = orientation === 'horizontal'
      if ((isH && e.key === 'ArrowRight') || (!isH && e.key === 'ArrowDown')) {
        e.preventDefault()
        next()
      } else if ((isH && e.key === 'ArrowLeft') || (!isH && e.key === 'ArrowUp')) {
        e.preventDefault()
        prev()
      }
    },
    [orientation, next, prev],
  )

  return (
    <CarouselContext.Provider
      value={{ activeIndex, totalItems, goTo, next, prev, orientation }}
    >
      <ViewJsx
        position="relative"
        overflow="hidden"
        role="region"
        aria-roledescription="carousel"
        aria-label="Carousel"
        tabIndex={0}
        onKeyDown={handleKeyDown}
        focusVisibleStyle={{
          outlineWidth: 2,
          outlineOffset: 2,
          outlineColor: '$outlineColor',
          outlineStyle: 'solid',
        }}
      >
        {children}
      </ViewJsx>
    </CarouselContext.Provider>
  )
}

function CarouselContent({ children }: { children: React.ReactNode }) {
  const { activeIndex, orientation } = React.useContext(CarouselContext)
  const isH = orientation === 'horizontal'
  const offset = activeIndex * -100

  return (
    <ViewJsx
      flexDirection={isH ? 'row' : 'column'}
      style={{
        transform: isH ? `translateX(${offset}%)` : `translateY(${offset}%)`,
        transition: 'transform 300ms ease-in-out',
      }}
    >
      {children}
    </ViewJsx>
  )
}

function CarouselItem({ children }: CarouselItemProps) {
  return (
    <ViewJsx
      flexShrink={0}
      width="100%"
      height="100%"
      role="group"
      aria-roledescription="slide"
    >
      {children}
    </ViewJsx>
  )
}

function Previous({ children }: { children?: React.ReactNode }) {
  const { prev, activeIndex } = React.useContext(CarouselContext)

  return (
    <CarouselBtnJsx
      type="button"
      position="absolute"
      left={8}
      top="50%"
      style={{ transform: 'translateY(-50%)' }}
      zIndex={10}
      width={32}
      height={32}
      borderRadius={9999}
      backgroundColor="$background"
      borderWidth={1}
      borderColor="$borderColor"
      opacity={activeIndex === 0 ? 0.5 : 1}
      hoverStyle={{ backgroundColor: '$color2' }}
      onClick={prev}
      aria-label="Previous slide"
    >
      {children ?? (
        <TextJsx fontSize={14} color="$color">
          {'<'}
        </TextJsx>
      )}
    </CarouselBtnJsx>
  )
}

function Next({ children }: { children?: React.ReactNode }) {
  const { next, activeIndex, totalItems } = React.useContext(CarouselContext)

  return (
    <CarouselBtnJsx
      type="button"
      position="absolute"
      right={8}
      top="50%"
      style={{ transform: 'translateY(-50%)' }}
      zIndex={10}
      width={32}
      height={32}
      borderRadius={9999}
      backgroundColor="$background"
      borderWidth={1}
      borderColor="$borderColor"
      opacity={activeIndex === totalItems - 1 ? 0.5 : 1}
      hoverStyle={{ backgroundColor: '$color2' }}
      onClick={next}
      aria-label="Next slide"
    >
      {children ?? (
        <TextJsx fontSize={14} color="$color">
          {'>'}
        </TextJsx>
      )}
    </CarouselBtnJsx>
  )
}

function Dots() {
  const { activeIndex, totalItems, goTo } = React.useContext(CarouselContext)

  return (
    <ViewJsx
      flexDirection="row"
      alignItems="center"
      justifyContent="center"
      gap={6}
      paddingTop={8}
    >
      {Array.from({ length: totalItems }, (_, i) => (
        <DotBtnJsx
          key={i}
          type="button"
          width={8}
          height={8}
          backgroundColor={i === activeIndex ? '$color10' : '$color4'}
          onClick={() => goTo(i)}
          aria-label={`Go to slide ${i + 1}`}
          aria-current={i === activeIndex ? 'true' : undefined}
        />
      ))}
    </ViewJsx>
  )
}

export const Carousel = {
  Root,
  Content: CarouselContent,
  Item: CarouselItem,
  Previous,
  Next,
  Dots,
}
