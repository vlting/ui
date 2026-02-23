import type { ComponentType } from 'react'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Text, View } from 'tamagui'

type AnyFC = ComponentType<Record<string, unknown>>
const ViewJsx = View as AnyFC
const TextJsx = Text as AnyFC

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
    <CarouselContext.Provider value={{ activeIndex, totalItems, goTo, next, prev, orientation }}>
      <ViewJsx
        position="relative"
        overflow="hidden"
        role="region"
        aria-roledescription="carousel"
        aria-label="Carousel"
        tabIndex={0}
        onKeyDown={handleKeyDown}
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
    <ViewJsx
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
      alignItems="center"
      justifyContent="center"
      cursor="pointer"
      opacity={activeIndex === 0 ? 0.5 : 1}
      hoverStyle={{ backgroundColor: '$color2' }}
      onPress={prev}
      role="button"
      aria-label="Previous slide"
    >
      {children ?? <TextJsx fontSize={14} color="$color">{'<'}</TextJsx>}
    </ViewJsx>
  )
}

function Next({ children }: { children?: React.ReactNode }) {
  const { next, activeIndex, totalItems } = React.useContext(CarouselContext)

  return (
    <ViewJsx
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
      alignItems="center"
      justifyContent="center"
      cursor="pointer"
      opacity={activeIndex === totalItems - 1 ? 0.5 : 1}
      hoverStyle={{ backgroundColor: '$color2' }}
      onPress={next}
      role="button"
      aria-label="Next slide"
    >
      {children ?? <TextJsx fontSize={14} color="$color">{'>'}</TextJsx>}
    </ViewJsx>
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
        <ViewJsx
          key={i}
          width={8}
          height={8}
          borderRadius={9999}
          backgroundColor={i === activeIndex ? '$color10' : '$color4'}
          cursor="pointer"
          onPress={() => goTo(i)}
          role="button"
          aria-label={`Go to slide ${i + 1}`}
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
