import {
  type ComponentPropsWithRef,
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useId,
} from 'react'
import { useDisclosure, type UseDisclosureProps } from '../../headless/src/useDisclosure'
import { useFocusScope } from '../../headless/src/useFocusScope'
import { styled } from '../../stl-react/src/config'
import { Portal } from '../../stl-react/src/primitives/Portal/Portal'
import { mergeRefs } from '../../utils/mergeRefs'

// ─── Context ────────────────────────────────────────────────────────────────

type DrawerDirection = 'left' | 'right' | 'top' | 'bottom'

interface DrawerContextValue {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  direction: DrawerDirection
  contentId: string
  titleId: string
  descriptionId: string
}

const DrawerContext = createContext<DrawerContextValue | null>(null)

function useDrawerContext() {
  const ctx = useContext(DrawerContext)
  if (!ctx) {
    throw new Error(
      'Drawer compound components must be used within Drawer.Root',
    )
  }
  return ctx
}

// ─── Styled Elements ────────────────────────────────────────────────────────

const StyledOverlay = styled('div', {
  position: 'fixed',
  top: '0',
  right: '0',
  bottom: '0',
  left: '0',
  bg: '$overlayBackground',
  zIndex: '49',
  animation: '$fadeIn',
  lowMotion: { animationDuration: '0.01s' },
}, { name: 'DrawerOverlay' })

const StyledContent = styled('div', {
  position: 'fixed',
  bg: '$surface1',
  boxShadow: '$lg',
  zIndex: '$max',
  overflow: 'auto',
  display: 'flex',
  flexDirection: 'column',
  color: '$neutralText3',
  lowMotion: { animationDuration: '0.01s' },
}, {
  name: 'DrawerContent',
  variants: {
    direction: {
      right: {
        top: '0',
        right: '0',
        bottom: '0',
        width: '85%',
        maxWidth: '$400',
        borderTopLeftRadius: '$card',
        borderBottomLeftRadius: '$card',
        animation: '$slideInRight',
      },
      left: {
        top: '0',
        left: '0',
        bottom: '0',
        width: '85%',
        maxWidth: '$400',
        borderTopRightRadius: '$card',
        borderBottomRightRadius: '$card',
        animation: '$slideInLeft',
      },
      top: {
        top: '0',
        left: '0',
        right: '0',
        height: '85%',
        maxHeight: '$400',
        borderBottomLeftRadius: '$card',
        borderBottomRightRadius: '$card',
        animation: '$slideInTop',
      },
      bottom: {
        bottom: '0',
        left: '0',
        right: '0',
        height: '85%',
        maxHeight: '$400',
        borderTopLeftRadius: '$card',
        borderTopRightRadius: '$card',
        animation: '$slideInBottom',
      },
    },
  },
})

const StyledHeader = styled('header', {
  p: '$16',
  pb: '$8',
}, { name: 'DrawerHeader' })

const StyledTitle = styled('h2', {
  fontSize: '$heading4',
  fontWeight: '$600',
  fontFamily: '$heading',
}, { name: 'DrawerTitle' })

const StyledDescription = styled('p', {
  fontSize: '$p',
  color: '$neutralText4',
}, { name: 'DrawerDescription' })

const StyledFooter = styled('footer', {
  display: 'flex',
  flexDirection: 'row',
  gap: '$8',
  justifyContent: 'end',
  p: '$16',
  pt: '$8',
}, { name: 'DrawerFooter' })

const StyledClose = styled('button', {
  position: 'absolute',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  bg: 'transparent',
  border: 'none',
  cursor: 'pointer',
  p: '$8',
  color: '$neutralText4',
  radius: '$4',
  ':interact': { bg: '$neutralAlpha2' },
  ':focus': { outline: '$neutral', outlineOffset: '$offsetDefault' },
}, {
  name: 'DrawerClose',
  variants: {
    position: {
      topRight: { top: '$12', right: '$12' },
      topLeft: { top: '$12', left: '$12' },
    },
  },
})

const CloseIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M4 4l8 8M12 4l-8 8" />
  </svg>
)

// ─── Root ───────────────────────────────────────────────────────────────────

export interface DrawerRootProps extends UseDisclosureProps {
  children: React.ReactNode
  direction?: DrawerDirection
}

const DrawerRoot = ({
  children,
  direction = 'right',
  ...disclosureProps
}: DrawerRootProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure(disclosureProps)
  const contentId = useId()
  const titleId = useId()
  const descriptionId = useId()

  const onOpenChange = useCallback(
    (open: boolean) => {
      if (open) onOpen()
      else onClose()
    },
    [onOpen, onClose],
  )

  return (
    <DrawerContext.Provider
      value={{ isOpen, onOpenChange, direction, contentId, titleId, descriptionId }}
    >
      {children}
    </DrawerContext.Provider>
  )
}
DrawerRoot.displayName = 'Drawer.Root'

// ─── Trigger ────────────────────────────────────────────────────────────────

export interface DrawerTriggerProps
  extends ComponentPropsWithRef<'button'> {}

const DrawerTrigger = forwardRef<HTMLButtonElement, DrawerTriggerProps>(
  ({ onClick, ...rest }, ref) => {
    const { isOpen, onOpenChange } = useDrawerContext()

    const handleClick = useCallback(
      (e: React.MouseEvent<HTMLButtonElement>) => {
        onOpenChange(!isOpen)
        onClick?.(e)
      },
      [isOpen, onOpenChange, onClick],
    )

    return (
      <button
        ref={ref}
        type="button"
        aria-expanded={isOpen}
        data-state={isOpen ? 'open' : 'closed'}
        onClick={handleClick}
        {...rest}
      />
    )
  },
)
DrawerTrigger.displayName = 'Drawer.Trigger'

// ─── Overlay ────────────────────────────────────────────────────────────────

export interface DrawerOverlayProps
  extends ComponentPropsWithRef<typeof StyledOverlay> {}

const DrawerOverlay = forwardRef<HTMLDivElement, DrawerOverlayProps>(
  ({ onClick, ...rest }, ref) => {
    const { onOpenChange } = useDrawerContext()

    const handleClick = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        onOpenChange(false)
        onClick?.(e)
      },
      [onOpenChange, onClick],
    )

    return (
      <StyledOverlay
        ref={ref}
        data-state="open"
        onClick={handleClick}
        {...rest}
      />
    )
  },
)
DrawerOverlay.displayName = 'Drawer.Overlay'

// ─── Content ────────────────────────────────────────────────────────────────

export interface DrawerContentProps
  extends ComponentPropsWithRef<typeof StyledContent> {}

const DrawerContent = forwardRef<HTMLDivElement, DrawerContentProps>(
  ({ children, ...rest }, ref) => {
    const { isOpen, onOpenChange, direction, contentId, titleId, descriptionId } =
      useDrawerContext()

    const { getScopeProps } = useFocusScope({
      contain: isOpen,
      restoreFocus: true,
      autoFocus: true,
    })
    const scopeProps = getScopeProps()

    useEffect(() => {
      if (!isOpen) return
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onOpenChange(false)
      }
      document.addEventListener('keydown', handleKeyDown)
      return () => document.removeEventListener('keydown', handleKeyDown)
    }, [isOpen, onOpenChange])

    if (!isOpen) return null

    return (
      <Portal>
        <DrawerOverlay />
        <StyledContent
          ref={mergeRefs(ref, scopeProps.ref)}
          onKeyDown={scopeProps.onKeyDown}
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          aria-describedby={descriptionId}
          id={contentId}
          direction={direction}
          data-state="open"
          {...rest}
        >
          {children}
        </StyledContent>
      </Portal>
    )
  },
)
DrawerContent.displayName = 'Drawer.Content'

// ─── Header ─────────────────────────────────────────────────────────────────

export interface DrawerHeaderProps
  extends ComponentPropsWithRef<typeof StyledHeader> {}

const DrawerHeader = forwardRef<HTMLElement, DrawerHeaderProps>(
  (props, ref) => <StyledHeader ref={ref} {...props} />,
)
DrawerHeader.displayName = 'Drawer.Header'

// ─── Title ──────────────────────────────────────────────────────────────────

export interface DrawerTitleProps
  extends ComponentPropsWithRef<typeof StyledTitle> {}

const DrawerTitle = forwardRef<HTMLHeadingElement, DrawerTitleProps>(
  (props, ref) => {
    const { titleId } = useDrawerContext()
    return <StyledTitle ref={ref} id={titleId} {...props} />
  },
)
DrawerTitle.displayName = 'Drawer.Title'

// ─── Description ────────────────────────────────────────────────────────────

export interface DrawerDescriptionProps
  extends ComponentPropsWithRef<typeof StyledDescription> {}

const DrawerDescription = forwardRef<HTMLParagraphElement, DrawerDescriptionProps>(
  (props, ref) => {
    const { descriptionId } = useDrawerContext()
    return <StyledDescription ref={ref} id={descriptionId} {...props} />
  },
)
DrawerDescription.displayName = 'Drawer.Description'

// ─── Footer ─────────────────────────────────────────────────────────────────

export interface DrawerFooterProps
  extends ComponentPropsWithRef<typeof StyledFooter> {}

const DrawerFooter = forwardRef<HTMLElement, DrawerFooterProps>(
  (props, ref) => <StyledFooter ref={ref} {...props} />,
)
DrawerFooter.displayName = 'Drawer.Footer'

// ─── Close ──────────────────────────────────────────────────────────────────

export interface DrawerCloseProps
  extends ComponentPropsWithRef<typeof StyledClose> {}

const DrawerClose = forwardRef<HTMLButtonElement, DrawerCloseProps>(
  ({ children, onClick, ...rest }, ref) => {
    const { onOpenChange, direction } = useDrawerContext()

    const handleClick = useCallback(
      (e: React.MouseEvent<HTMLButtonElement>) => {
        onOpenChange(false)
        onClick?.(e)
      },
      [onOpenChange, onClick],
    )

    return (
      <StyledClose
        ref={ref}
        type="button"
        aria-label="Close drawer"
        position={direction === 'left' ? 'topRight' : 'topRight'}
        onClick={handleClick}
        {...rest}
      >
        {children ?? <CloseIcon />}
      </StyledClose>
    )
  },
)
DrawerClose.displayName = 'Drawer.Close'

// ─── Export ─────────────────────────────────────────────────────────────────

export const Drawer = Object.assign(DrawerRoot, {
  Root: DrawerRoot,
  Trigger: DrawerTrigger,
  Overlay: DrawerOverlay,
  Content: DrawerContent,
  Header: DrawerHeader,
  Title: DrawerTitle,
  Description: DrawerDescription,
  Footer: DrawerFooter,
  Close: DrawerClose,
})
