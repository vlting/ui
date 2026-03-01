import { Dialog as TamaguiDialog } from '@tamagui/dialog'
import { styledHtml } from '@tamagui/web'
import type { ComponentType } from 'react'
import React from 'react'
import { View, styled } from 'tamagui'

type AnyFC = ComponentType<Record<string, unknown>>

// Cast for JSX usage — v2 RC GetFinalProps bug
const DialogRoot = TamaguiDialog as AnyFC
const DialogTrigger = TamaguiDialog.Trigger as AnyFC
const DialogPortal = TamaguiDialog.Portal as AnyFC
const DialogOverlay = TamaguiDialog.Overlay as AnyFC
const DialogContent = TamaguiDialog.Content as AnyFC
const DialogTitle = TamaguiDialog.Title as AnyFC
const DialogDescription = TamaguiDialog.Description as AnyFC
const DialogClose = TamaguiDialog.Close as AnyFC
const ViewJsx = View as AnyFC

// @ts-expect-error Tamagui v2 RC
const HandleBar = styled(View, {
  width: '$4.5',
  height: '$0.5',
  backgroundColor: '$color6',
  borderRadius: '$full',
  alignSelf: 'center',
  marginTop: '$0.75',
  marginBottom: '$0.75',
})

// @ts-expect-error Tamagui v2 RC
const DrawerHeaderFrame = styled(View, {
  paddingLeft: '$3.5',
  paddingRight: '$3.5',
  paddingTop: '$2',
  paddingBottom: '$2',
})

// @ts-expect-error Tamagui v2 RC
const DrawerFooterFrame = styled(View, {
  paddingLeft: '$3.5',
  paddingRight: '$3.5',
  paddingTop: '$2',
  paddingBottom: '$3.5',
  flexDirection: 'row',
  justifyContent: 'flex-end',
  gap: '$1.5',
})

const HandleBarJsx = HandleBar as AnyFC
const DrawerHeaderJsx = DrawerHeaderFrame as AnyFC
const DrawerFooterJsx = DrawerFooterFrame as AnyFC

const DIRECTION_STYLES = {
  bottom: {
    position: 'fixed' as const,
    bottom: 0,
    left: 0,
    right: 0,
    maxHeight: '90vh',
  },
  top: {
    position: 'fixed' as const,
    top: 0,
    left: 0,
    right: 0,
    maxHeight: '90vh',
  },
  left: {
    position: 'fixed' as const,
    top: 0,
    left: 0,
    bottom: 0,
    maxWidth: '90vw',
    width: 360, // $drawer token value
  },
  right: {
    position: 'fixed' as const,
    top: 0,
    right: 0,
    bottom: 0,
    maxWidth: '90vw',
    width: 360, // $drawer token value
  },
}

const DIRECTION_RADII = {
  bottom: { borderTopLeftRadius: '$5', borderTopRightRadius: '$5' },
  top: { borderBottomLeftRadius: '$5', borderBottomRightRadius: '$5' },
  left: { borderTopRightRadius: '$5', borderBottomRightRadius: '$5' },
  right: { borderTopLeftRadius: '$5', borderBottomLeftRadius: '$5' },
} as const

export interface DrawerRootProps {
  children: React.ReactNode
  open?: boolean
  onOpenChange?: (open: boolean) => void
  direction?: 'bottom' | 'top' | 'left' | 'right'
}

export interface DrawerContentProps {
  children: React.ReactNode
  direction?: 'bottom' | 'top' | 'left' | 'right'
  showHandle?: boolean
}

const DrawerContext = React.createContext<{
  direction: 'bottom' | 'top' | 'left' | 'right'
}>({
  direction: 'bottom',
})

function Root({ children, open, onOpenChange, direction = 'bottom' }: DrawerRootProps) {
  return (
    <DrawerContext.Provider value={{ direction }}>
      <DialogRoot open={open} onOpenChange={onOpenChange} modal>
        {children}
      </DialogRoot>
    </DrawerContext.Provider>
  )
}

function Trigger({ children }: { children: React.ReactNode }) {
  return <DialogTrigger asChild>{children}</DialogTrigger>
}

function useIsTouchDevice() {
  const [isTouch, setIsTouch] = React.useState(false)
  React.useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      setIsTouch(window.matchMedia('(pointer: coarse)').matches)
    }
  }, [])
  return isTouch
}

function Content({ children, direction: directionProp, showHandle }: DrawerContentProps) {
  const ctx = React.useContext(DrawerContext)
  const direction = directionProp ?? ctx.direction
  const isVertical = direction === 'bottom' || direction === 'top'
  const isTouch = useIsTouchDevice()
  const shouldShowHandle = showHandle ?? (isVertical && isTouch)

  return (
    <DialogPortal>
      <DialogOverlay
        backgroundColor="$overlayBackground"
        animation="medium"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
      />
      <DialogContent
        backgroundColor="$background"
        borderWidth={1}
        borderColor="$borderColor"
        animation="medium"
        aria-describedby={undefined}
        {...DIRECTION_RADII[direction]}
        style={{ boxShadow: 'var(--shadowLg)', ...DIRECTION_STYLES[direction] }}
      >
        {shouldShowHandle && <HandleBarJsx />}
        {children}
      </DialogContent>
    </DialogPortal>
  )
}

function Header({ children }: { children: React.ReactNode }) {
  return <DrawerHeaderJsx>{children}</DrawerHeaderJsx>
}

function Footer({ children }: { children: React.ReactNode }) {
  return <DrawerFooterJsx>{children}</DrawerFooterJsx>
}

const DrawerTitleH2 = styledHtml('h2', {
  fontSize: '$7',
  fontWeight: '$4',
  fontFamily: '$heading',
  color: '$color',
  margin: 0,
} as any) as AnyFC

function Title({ children }: { children: React.ReactNode }) {
  return (
    <DialogTitle>
      <DrawerTitleH2>{children}</DrawerTitleH2>
    </DialogTitle>
  )
}

function Description({ children }: { children: React.ReactNode }) {
  return (
    <DialogDescription>
      <ViewJsx fontSize="$3" color="$colorSubtitle" fontFamily="$body">
        {children}
      </ViewJsx>
    </DialogDescription>
  )
}

function Close({ children }: { children: React.ReactNode }) {
  return <DialogClose asChild>{children}</DialogClose>
}

export const Drawer = {
  Root,
  Trigger,
  Content,
  Header,
  Footer,
  Title,
  Description,
  Close,
}
