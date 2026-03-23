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

interface SheetContextValue {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  contentId: string
  titleId: string
  descriptionId: string
}

const SheetContext = createContext<SheetContextValue | null>(null)

function useSheetContext() {
  const ctx = useContext(SheetContext)
  if (!ctx) {
    throw new Error(
      'Sheet compound components must be used within Sheet.Root',
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
}, { name: 'SheetOverlay' })

const StyledContent = styled('div', {
  position: 'fixed',
  bottom: '0',
  left: '0',
  right: '0',
  bg: '$surface1',
  borderTopLeftRadius: '$6',
  borderTopRightRadius: '$6',
  boxShadow: '$lg',
  maxHeight: '85%',
  width: '100%',
  overflow: 'auto',
  zIndex: '$max',
  animation: '$slideInBottom',
  lowMotion: { animationDuration: '0.01s' },
}, { name: 'SheetContent' })

const StyledHandle = styled('div', {
  display: 'flex',
  justifyContent: 'center',
  py: '$8',
}, { name: 'SheetHandle' })

const StyledHandleBar = styled('div', {
  width: '36px',
  height: '4px',
  bg: '$neutral5',
  radius: '$full',
}, { name: 'SheetHandleBar' })

const StyledHeader = styled('header', {
  p: '$16',
  pb: '$8',
}, { name: 'SheetHeader' })

const StyledTitle = styled('h2', {
  fontSize: '$heading4',
  fontWeight: '$600',
  fontFamily: '$heading',
}, { name: 'SheetTitle' })

const StyledDescription = styled('p', {
  fontSize: '$p',
  color: '$neutral9',
}, { name: 'SheetDescription' })

const StyledFooter = styled('footer', {
  display: 'flex',
  flexDirection: 'row',
  gap: '$8',
  justifyContent: 'end',
  p: '$16',
  pt: '$8',
}, { name: 'SheetFooter' })

// ─── Root ───────────────────────────────────────────────────────────────────

export interface SheetRootProps extends UseDisclosureProps {
  children: React.ReactNode
}

const SheetRoot = ({ children, ...disclosureProps }: SheetRootProps) => {
  const { isOpen, onOpen, onClose, onToggle } = useDisclosure(disclosureProps)
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
    <SheetContext.Provider
      value={{ isOpen, onOpenChange, contentId, titleId, descriptionId }}
    >
      {children}
    </SheetContext.Provider>
  )
}
SheetRoot.displayName = 'Sheet.Root'

// ─── Trigger ────────────────────────────────────────────────────────────────

export interface SheetTriggerProps
  extends ComponentPropsWithRef<'button'> {}

const SheetTrigger = forwardRef<HTMLButtonElement, SheetTriggerProps>(
  ({ onClick, ...rest }, ref) => {
    const { isOpen, onOpenChange } = useSheetContext()

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
SheetTrigger.displayName = 'Sheet.Trigger'

// ─── Overlay ────────────────────────────────────────────────────────────────

export interface SheetOverlayProps
  extends ComponentPropsWithRef<typeof StyledOverlay> {}

const SheetOverlay = forwardRef<HTMLDivElement, SheetOverlayProps>(
  ({ onClick, ...rest }, ref) => {
    const { onOpenChange } = useSheetContext()

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
SheetOverlay.displayName = 'Sheet.Overlay'

// ─── Content ────────────────────────────────────────────────────────────────

export interface SheetContentProps
  extends ComponentPropsWithRef<typeof StyledContent> {}

const SheetContent = forwardRef<HTMLDivElement, SheetContentProps>(
  ({ children, ...rest }, ref) => {
    const { isOpen, onOpenChange, contentId, titleId, descriptionId } =
      useSheetContext()

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
        <SheetOverlay />
        <StyledContent
          ref={mergeRefs(ref, scopeProps.ref)}
          onKeyDown={scopeProps.onKeyDown}
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          aria-describedby={descriptionId}
          id={contentId}
          data-state="open"
          {...rest}
        >
          {children}
        </StyledContent>
      </Portal>
    )
  },
)
SheetContent.displayName = 'Sheet.Content'

// ─── Handle ─────────────────────────────────────────────────────────────────

export interface SheetHandleProps
  extends ComponentPropsWithRef<typeof StyledHandle> {}

const SheetHandle = forwardRef<HTMLDivElement, SheetHandleProps>(
  (props, ref) => (
    <StyledHandle ref={ref} {...props}>
      <StyledHandleBar aria-hidden="true" />
    </StyledHandle>
  ),
)
SheetHandle.displayName = 'Sheet.Handle'

// ─── Header ─────────────────────────────────────────────────────────────────

export interface SheetHeaderProps
  extends ComponentPropsWithRef<typeof StyledHeader> {}

const SheetHeader = forwardRef<HTMLElement, SheetHeaderProps>(
  (props, ref) => <StyledHeader ref={ref} {...props} />,
)
SheetHeader.displayName = 'Sheet.Header'

// ─── Title ──────────────────────────────────────────────────────────────────

export interface SheetTitleProps
  extends ComponentPropsWithRef<typeof StyledTitle> {}

const SheetTitle = forwardRef<HTMLHeadingElement, SheetTitleProps>(
  (props, ref) => {
    const { titleId } = useSheetContext()
    return <StyledTitle ref={ref} id={titleId} {...props} />
  },
)
SheetTitle.displayName = 'Sheet.Title'

// ─── Description ────────────────────────────────────────────────────────────

export interface SheetDescriptionProps
  extends ComponentPropsWithRef<typeof StyledDescription> {}

const SheetDescription = forwardRef<HTMLParagraphElement, SheetDescriptionProps>(
  (props, ref) => {
    const { descriptionId } = useSheetContext()
    return <StyledDescription ref={ref} id={descriptionId} {...props} />
  },
)
SheetDescription.displayName = 'Sheet.Description'

// ─── Footer ─────────────────────────────────────────────────────────────────

export interface SheetFooterProps
  extends ComponentPropsWithRef<typeof StyledFooter> {}

const SheetFooter = forwardRef<HTMLElement, SheetFooterProps>(
  (props, ref) => <StyledFooter ref={ref} {...props} />,
)
SheetFooter.displayName = 'Sheet.Footer'

// ─── Export ─────────────────────────────────────────────────────────────────

export const Sheet = Object.assign(SheetRoot, {
  Root: SheetRoot,
  Trigger: SheetTrigger,
  Overlay: SheetOverlay,
  Content: SheetContent,
  Handle: SheetHandle,
  Header: SheetHeader,
  Title: SheetTitle,
  Description: SheetDescription,
  Footer: SheetFooter,
})
