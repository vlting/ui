import React, { useCallback, useEffect, useRef, useState } from 'react'
import { styled } from '../../stl-react/src/config'
import { useReducedMotion } from '../../hooks/useReducedMotion'

const NavButton = styled(
  'button',
  {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: '50%',
    zIndex: '1',
    width: '32px',
    height: '32px',
    borderRadius: '9999px',
    backgroundColor: '$background',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: '$borderColor',
    cursor: 'pointer',
    outline: 'none',
  },
  'CarouselNavButton',
)

const DotButton = styled(
  'button',
  {
    display: 'inline-flex',
    width: '8px',
    height: '8px',
    borderRadius: '9999px',
    border: 'none',
    cursor: 'pointer',
    padding: '0',
    outline: 'none',
  },
  'CarouselDot',
)

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
  reducedMotion: boolean
}>({
  activeIndex: 0,
  totalItems: 0,
  goTo: () => {},
  next: () => {},
  prev: () => {},
  orientation: 'horizontal',
  reducedMotion: false,
})

function Root({
  children,
  orientation = 'horizontal',
  loop = false,
  autoplay = false,
  autoplayInterval = 5000,
}: CarouselRootProps) {
  const reducedMotion = useReducedMotion()
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
    if (!autoplay || reducedMotion || totalItems <= 1) return
    const timer = setInterval(next, autoplayInterval)
    return () => clearInterval(timer)
  }, [autoplay, autoplayInterval, next, totalItems, reducedMotion])

  useEffect(() => {
    const el = contentRef.current
    if (el) setTotalItems(el.children.length)
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
      value={{ activeIndex, totalItems, goTo, next, prev, orientation, reducedMotion }}
    >
      <div
        style={{ position: 'relative', overflow: 'hidden', outline: 'none' }}
        role="region"
        aria-roledescription="carousel"
        aria-label="Carousel"
        tabIndex={0}
        onKeyDown={handleKeyDown}
      >
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child) && (child.type as any) === CarouselContent) {
            return React.cloneElement(
              child as React.ReactElement<{ ref?: React.Ref<HTMLDivElement> }>,
              { ref: contentRef },
            )
          }
          return child
        })}
      </div>
    </CarouselContext.Provider>
  )
}

const CarouselContent = React.forwardRef<HTMLDivElement, { children: React.ReactNode }>(
  function CarouselContent({ children }, ref) {
    const { activeIndex, orientation, reducedMotion } = React.useContext(CarouselContext)
    const isH = orientation === 'horizontal'
    const offset = activeIndex * -100

    return (
      <div
        ref={ref}
        aria-live="polite"
        style={{
          display: 'flex',
          flexDirection: isH ? 'row' : 'column',
          transform: isH ? `translateX(${offset}%)` : `translateY(${offset}%)`,
          transition: reducedMotion ? 'none' : 'transform 300ms ease-in-out',
        }}
      >
        {children}
      </div>
    )
  },
)

function CarouselItem({ children, index }: CarouselItemProps) {
  const { totalItems } = React.useContext(CarouselContext)
  return (
    <div
      style={{ flexShrink: 0, width: '100%', height: '100%' }}
      role="group"
      aria-roledescription="slide"
      aria-label={index != null ? `Slide ${index + 1} of ${totalItems}` : undefined}
    >
      {children}
    </div>
  )
}

function Previous({ children }: { children?: React.ReactNode }) {
  const { prev, activeIndex } = React.useContext(CarouselContext)

  return (
    <NavButton
      type="button"
      onClick={prev}
      aria-label="Previous slide"
      style={{
        left: '8px',
        transform: 'translateY(-50%)',
        opacity: activeIndex === 0 ? 0.5 : 1,
      }}
    >
      {children ?? '<'}
    </NavButton>
  )
}

function Next({ children }: { children?: React.ReactNode }) {
  const { next, activeIndex, totalItems } = React.useContext(CarouselContext)

  return (
    <NavButton
      type="button"
      onClick={next}
      aria-label="Next slide"
      style={{
        right: '8px',
        transform: 'translateY(-50%)',
        opacity: activeIndex === totalItems - 1 ? 0.5 : 1,
      }}
    >
      {children ?? '>'}
    </NavButton>
  )
}

function Dots() {
  const { activeIndex, totalItems, goTo } = React.useContext(CarouselContext)

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '6px',
        paddingTop: '8px',
      }}
    >
      {Array.from({ length: totalItems }, (_, i) => (
        <DotButton
          key={i}
          type="button"
          onClick={() => goTo(i)}
          aria-label={`Go to slide ${i + 1}`}
          aria-current={i === activeIndex ? 'true' : undefined}
          style={{
            backgroundColor:
              i === activeIndex ? 'var(--color10, #0066ff)' : 'var(--surface3, #d1d5db)',
          }}
        />
      ))}
    </div>
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
