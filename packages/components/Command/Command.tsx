import {
  type ComponentPropsWithRef,
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { styled } from '../../stl-react/src/config'

// ─── Context ────────────────────────────────────────────────────────────────

interface CommandContextValue {
  search: string
  setSearch: (v: string) => void
  activeIndex: number
  setActiveIndex: (i: number) => void
  registerItem: (label: string, group: string, disabled?: boolean) => number
  itemCount: number
  filter?: (label: string, search: string) => boolean
  onItemSelect: (index: number) => void
  itemCallbacks: React.MutableRefObject<Map<number, () => void>>
}

const CommandContext = createContext<CommandContextValue | null>(null)

function useCommandContext() {
  const ctx = useContext(CommandContext)
  if (!ctx) throw new Error('Command compound components must be used within Command.Root')
  return ctx
}

// ─── Styled Elements ────────────────────────────────────────────────────────

const StyledRoot = styled('div', {
  bg: '$surface1',
  radius: '$card',
  boxShadow: '$lg',
  border: '$neutralMin',
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column',
  color: '$neutralText3',
}, { name: 'CommandRoot' })

const StyledInputWrapper = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: '$8',
  px: '$12',
  borderBottom: '$neutralMin',
}, { name: 'CommandInputWrapper' })

const StyledInput = styled('input', {
  flex: '1',
  border: 'none',
  bg: 'transparent',
  py: '$12',
  fontSize: '$p',
  fontFamily: '$body',
  color: 'inherit',
  outline: 'none',
}, { name: 'CommandInput' })

const StyledList = styled('div', {
  overflow: 'auto',
  maxHeight: '300px',
  p: '$4',
}, { name: 'CommandList' })

const StyledItem = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: '$8',
  px: '$8',
  py: '$8',
  radius: '$2',
  cursor: 'pointer',
  fontSize: '$p',
  fontFamily: '$body',
  outline: 'none',
  color: 'inherit',
  ':interact': { bg: '$neutral4' },
  ':focus': { bg: '$neutral4' },
}, {
  name: 'CommandItem',
  variants: {
    disabled: {
      true: { opacity: '$disabledOpacity', cursor: 'not-allowed', pointerEvents: 'none' },
    },
  },
})

const StyledGroupHeading = styled('div', {
  px: '$8',
  py: '$4',
  fontSize: '$small',
  fontWeight: '$500',
  fontFamily: '$body',
  color: '$neutralText4',
}, { name: 'CommandGroupHeading' })

const StyledEmpty = styled('div', {
  px: '$8',
  py: '$24',
  textAlign: 'center',
  color: '$neutralText4',
  fontSize: '$p',
  fontFamily: '$body',
}, { name: 'CommandEmpty' })

const StyledSeparator = styled('div', {
  height: '1px',
  bg: '$neutralAlpha5',
  my: '$4',
}, { name: 'CommandSeparator' })

// ─── Icons ──────────────────────────────────────────────────────────────────

const StyledSearchIcon = styled('svg', {
  opacity: '0.5',
  flexShrink: '0',
}, { name: 'CommandSearchIcon' })

const SearchIcon = () => (
  <StyledSearchIcon width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="7" cy="7" r="4.5" />
    <path d="M10.5 10.5L14 14" />
  </StyledSearchIcon>
)

// ─── Root ───────────────────────────────────────────────────────────────────

export interface CommandRootProps extends ComponentPropsWithRef<typeof StyledRoot> {
  filter?: (label: string, search: string) => boolean
}

const CommandRoot = forwardRef<HTMLDivElement, CommandRootProps>(
  ({ children, filter, onKeyDown, ...rest }, ref) => {
    const [search, setSearch] = useState('')
    const [activeIndex, setActiveIndex] = useState(0)
    const itemsRef = useRef<{ label: string; group: string; disabled: boolean }[]>([])
    const [itemCount, setItemCount] = useState(0)
    const indexCounterRef = useRef(0)
    const itemCallbacks = useRef(new Map<number, () => void>())

    const activeIndexRef = useRef(activeIndex)
    activeIndexRef.current = activeIndex

    const registerItem = useCallback((label: string, group: string, disabled = false) => {
      const idx = indexCounterRef.current++
      itemsRef.current[idx] = { label, group, disabled }
      setItemCount(indexCounterRef.current)
      return idx
    }, [])

    // Reset registration on mount
    useEffect(() => {
      indexCounterRef.current = 0
      itemsRef.current = []
    }, [])

    const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        setActiveIndex((prev) => {
          let next = prev + 1
          const count = indexCounterRef.current
          while (next < count && itemsRef.current[next]?.disabled) next++
          const result = next < count ? next : prev
          activeIndexRef.current = result
          return result
        })
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        setActiveIndex((prev) => {
          let next = prev - 1
          while (next >= 0 && itemsRef.current[next]?.disabled) next--
          const result = next >= 0 ? next : prev
          activeIndexRef.current = result
          return result
        })
      } else if (e.key === 'Enter') {
        e.preventDefault()
        const idx = activeIndexRef.current
        const item = itemsRef.current[idx]
        if (item && !item.disabled) {
          const cb = itemCallbacks.current.get(idx)
          cb?.()
        }
      }
      onKeyDown?.(e)
    }, [onKeyDown])

    const ctx = useMemo(() => ({
      search,
      setSearch,
      activeIndex,
      setActiveIndex,
      registerItem,
      itemCount,
      filter,
      onItemSelect: (index: number) => { itemCallbacks.current.get(index)?.() },
      itemCallbacks,
    }), [search, activeIndex, registerItem, itemCount, filter])

    return (
      <CommandContext.Provider value={ctx}>
        <StyledRoot ref={ref} onKeyDown={handleKeyDown} {...rest}>
          {children}
        </StyledRoot>
      </CommandContext.Provider>
    )
  },
)
CommandRoot.displayName = 'Command.Root'

// ─── Input ──────────────────────────────────────────────────────────────────

export interface CommandInputProps extends ComponentPropsWithRef<typeof StyledInput> {}

const CommandInput = forwardRef<HTMLInputElement, CommandInputProps>(
  ({ onChange, ...rest }, ref) => {
    const ctx = useCommandContext()

    return (
      <StyledInputWrapper>
        <SearchIcon />
        <StyledInput
          ref={ref}
          type="text"
          value={ctx.search}
          onChange={(e) => {
            ctx.setSearch(e.target.value)
            ctx.setActiveIndex(0)
            onChange?.(e)
          }}
          autoComplete="off"
          {...rest}
        />
      </StyledInputWrapper>
    )
  },
)
CommandInput.displayName = 'Command.Input'

// ─── List ───────────────────────────────────────────────────────────────────

const CommandList = forwardRef<HTMLDivElement, ComponentPropsWithRef<typeof StyledList>>(
  (props, ref) => <StyledList ref={ref} role="listbox" {...props} />,
)
CommandList.displayName = 'Command.List'

// ─── Item ───────────────────────────────────────────────────────────────────

export interface CommandItemProps extends ComponentPropsWithRef<typeof StyledItem> {
  disabled?: boolean
  onSelect?: () => void
  /** Value used for filtering; defaults to text content */
  value?: string
}

const CommandItem = forwardRef<HTMLDivElement, CommandItemProps>(
  ({ children, disabled = false, onSelect, value, onClick, ...rest }, ref) => {
    const ctx = useCommandContext()
    const indexRef = useRef(-1)
    const label = value ?? (typeof children === 'string' ? children : '')

    if (indexRef.current === -1) {
      indexRef.current = ctx.registerItem(label, '', disabled)
    }

    // Register callback synchronously so it's available immediately
    if (onSelect) {
      ctx.itemCallbacks.current.set(indexRef.current, onSelect)
    }

    // Filter
    const matchesFn = ctx.filter ?? ((l: string, s: string) => l.toLowerCase().includes(s.toLowerCase()))
    const matches = !ctx.search || matchesFn(label, ctx.search)
    if (!matches) return null

    const isActive = indexRef.current === ctx.activeIndex

    return (
      <StyledItem
        ref={ref}
        role="option"
        aria-selected={isActive}
        aria-disabled={disabled || undefined}
        disabled={disabled}
        tabIndex={-1}
        data-roving-item=""
        stl={isActive ? { bg: '$neutral4' } : undefined}
        onMouseEnter={() => ctx.setActiveIndex(indexRef.current)}
        onClick={(e) => {
          if (disabled) return
          onSelect?.()
          onClick?.(e)
        }}
        {...rest}
      >
        {children}
      </StyledItem>
    )
  },
)
CommandItem.displayName = 'Command.Item'

// ─── Group ──────────────────────────────────────────────────────────────────

export interface CommandGroupProps extends ComponentPropsWithRef<'div'> {
  heading?: string
}

const CommandGroup = forwardRef<HTMLDivElement, CommandGroupProps>(
  ({ heading, children, ...rest }, ref) => (
    <div ref={ref} role="group" {...rest}>
      {heading && <StyledGroupHeading>{heading}</StyledGroupHeading>}
      {children}
    </div>
  ),
)
CommandGroup.displayName = 'Command.Group'

// ─── Empty ──────────────────────────────────────────────────────────────────

const CommandEmpty = forwardRef<HTMLDivElement, ComponentPropsWithRef<typeof StyledEmpty>>(
  ({ children, ...rest }, ref) => (
    <StyledEmpty ref={ref} role="presentation" {...rest}>
      {children ?? 'No results found'}
    </StyledEmpty>
  ),
)
CommandEmpty.displayName = 'Command.Empty'

// ─── Separator ──────────────────────────────────────────────────────────────

const CommandSeparator = forwardRef<HTMLDivElement, ComponentPropsWithRef<typeof StyledSeparator>>(
  (props, ref) => <StyledSeparator ref={ref} role="separator" aria-orientation="horizontal" {...props} />,
)
CommandSeparator.displayName = 'Command.Separator'

// ─── Loading ────────────────────────────────────────────────────────────────

const CommandLoading = forwardRef<HTMLDivElement, ComponentPropsWithRef<typeof StyledEmpty>>(
  ({ children, ...rest }, ref) => (
    <StyledEmpty ref={ref} role="presentation" {...rest}>
      {children ?? 'Loading...'}
    </StyledEmpty>
  ),
)
CommandLoading.displayName = 'Command.Loading'

// ─── Export ─────────────────────────────────────────────────────────────────

export const Command = {
  Root: CommandRoot,
  Input: CommandInput,
  List: CommandList,
  Empty: CommandEmpty,
  Group: CommandGroup,
  Item: CommandItem,
  Separator: CommandSeparator,
  Loading: CommandLoading,
}
