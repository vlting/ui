import React, { memo, useCallback, useEffect, useId, useRef, useState } from 'react'
import { Text, XStack, YStack, styled } from 'tamagui'

// ─── Overlay/Scrim ────────────────────────────────────────────────────────────

const Scrim = styled(YStack, {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0,0,0,0.5)',
  alignItems: 'center',
  justifyContent: 'flex-start',
  paddingTop: '10%',
  zIndex: 200,
})

// ─── Palette container ────────────────────────────────────────────────────────

const PaletteContainer = styled(YStack, {
  backgroundColor: '$background',
  borderWidth: 1,
  borderColor: '$borderColor',
  borderRadius: '$4',
  width: '100%',
  maxWidth: 640,
  maxHeight: 480,
  overflow: 'hidden',
  shadowColor: '$shadowColor',
  shadowOffset: { width: 0, height: 8 },
  shadowOpacity: 0.15,
  shadowRadius: 24,
})

// ─── Input ────────────────────────────────────────────────────────────────────

const SearchInputFrame = styled(XStack, {
  paddingHorizontal: '$3',
  paddingVertical: '$2',
  borderBottomWidth: 1,
  borderBottomColor: '$borderColor',
  alignItems: 'center',
})

// ─── Results list ─────────────────────────────────────────────────────────────

const ResultsList = styled(YStack, {
  flex: 1,
  overflow: 'hidden',
  paddingVertical: '$1',
})

const ResultItem = styled(XStack, {
  paddingHorizontal: '$3',
  paddingVertical: '$2',
  alignItems: 'center',
  gap: '$2',
  cursor: 'pointer',

  variants: {
    focused: {
      true: {
        backgroundColor: '$backgroundHover',
      },
    },
  } as const,
})

// ─── Types ────────────────────────────────────────────────────────────────────

export type CommandPaletteItem = {
  id: string
  label: string
  description?: string
  icon?: React.ReactNode
  shortcut?: string
}

export type CommandPaletteProps = {
  /** Whether the palette is open */
  open?: boolean
  /** Default open state for uncontrolled */
  defaultOpen?: boolean
  /** Callback when open state should change */
  onOpenChange?: (open: boolean) => void
  /** The list of result items to display */
  items?: CommandPaletteItem[]
  /** Callback when a result item is selected */
  onSelect?: (item: CommandPaletteItem) => void
  /** Controlled query value */
  query?: string
  /** Default query for uncontrolled */
  defaultQuery?: string
  /** Callback when query changes */
  onQueryChange?: (query: string) => void
  /** Whether results are loading */
  loading?: boolean
  /** Placeholder for the search input */
  placeholder?: string
  /** Empty state label */
  emptyLabel?: string
  testID?: string
}

// ─── Root Component ───────────────────────────────────────────────────────────

export const CommandPalette = memo(function CommandPalette({
  open: openProp,
  defaultOpen = false,
  onOpenChange,
  items = [],
  onSelect,
  query: queryProp,
  defaultQuery = '',
  onQueryChange,
  loading = false,
  placeholder = 'Search commands...',
  emptyLabel = 'No results found.',
  testID,
}: CommandPaletteProps) {
  const isOpenControlled = openProp !== undefined
  const [internalOpen, setInternalOpen] = useState(defaultOpen)
  const isOpen = isOpenControlled ? openProp : internalOpen

  const isQueryControlled = queryProp !== undefined
  const [internalQuery, setInternalQuery] = useState(defaultQuery)
  const query = isQueryControlled ? queryProp : internalQuery

  const [focusedIndex, setFocusedIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const listId = useId()
  const inputId = useId()

  const handleClose = useCallback(() => {
    if (!isOpenControlled) setInternalOpen(false)
    onOpenChange?.(false)
  }, [isOpenControlled, onOpenChange])

  const handleQueryChange = useCallback(
    (text: string) => {
      if (!isQueryControlled) setInternalQuery(text)
      onQueryChange?.(text)
      setFocusedIndex(0)
    },
    [isQueryControlled, onQueryChange],
  )

  const handleSelect = useCallback(
    (item: CommandPaletteItem) => {
      onSelect?.(item)
      handleClose()
    },
    [onSelect, handleClose],
  )

  // Focus input on open
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  // Escape to close
  useEffect(() => {
    if (!isOpen) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose()
    }
    if (typeof document !== 'undefined') {
      document.addEventListener('keydown', handleKeyDown)
      return () => document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, handleClose])

  const handleInputKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        setFocusedIndex((i) => Math.min(i + 1, items.length - 1))
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        setFocusedIndex((i) => Math.max(i - 1, 0))
      } else if (e.key === 'Enter') {
        e.preventDefault()
        if (items[focusedIndex]) handleSelect(items[focusedIndex])
      }
    },
    [items, focusedIndex, handleSelect],
  )

  if (!isOpen) return null

  const activeDescendant = items[focusedIndex] ? `option-${items[focusedIndex].id}` : undefined

  return (
    <Scrim onPress={handleClose} testID="command-palette-scrim">
      <PaletteContainer
        accessible
        role="dialog"
        aria-modal="true"
        aria-label="Command palette"
        onPress={(e: React.SyntheticEvent) => e.stopPropagation()}
        testID={testID}
      >
        <SearchInputFrame>
          <input
            ref={inputRef}
            id={inputId}
            role="combobox"
            aria-expanded="true"
            aria-controls={listId}
            aria-activedescendant={activeDescendant}
            aria-label="Search commands"
            placeholder={placeholder}
            value={query}
            onChange={(e) => handleQueryChange(e.target.value)}
            onKeyDown={handleInputKeyDown}
            style={{
              flex: 1,
              background: 'transparent',
              border: 'none',
              outline: 'none',
              fontSize: 16,
              width: '100%',
            }}
          />
        </SearchInputFrame>

        <ResultsList
          id={listId}
          accessible
          role="listbox"
          aria-label="Search results"
        >
          {loading ? (
            <Text padding="$3" color="$colorSubtitle">Loading...</Text>
          ) : items.length === 0 ? (
            <Text padding="$3" color="$colorSubtitle" testID="command-palette-empty">
              {emptyLabel}
            </Text>
          ) : (
            items.map((item, index) => (
              <ResultItem
                key={item.id}
                id={`option-${item.id}`}
                accessible
                role="option"
                aria-selected={index === focusedIndex}
                focused={index === focusedIndex}
                onPress={() => handleSelect(item)}
                testID={`result-${item.id}`}
              >
                {item.icon && <YStack aria-hidden="true">{item.icon}</YStack>}
                <YStack flex={1}>
                  <Text fontSize="$3" color="$color">{item.label}</Text>
                  {item.description && (
                    <Text fontSize="$1" color="$colorSubtitle">{item.description}</Text>
                  )}
                </YStack>
                {item.shortcut && (
                  <Text fontSize="$1" color="$colorSubtitle" aria-label={`Shortcut: ${item.shortcut}`}>
                    {item.shortcut}
                  </Text>
                )}
              </ResultItem>
            ))
          )}
        </ResultsList>

        {/* Live region for result count changes */}
        <div
          role="status"
          aria-live="polite"
          aria-atomic="true"
          style={{ position: 'absolute', left: -9999, width: 1, height: 1, overflow: 'hidden' }}
        >
          {items.length} result{items.length !== 1 ? 's' : ''}
        </div>
      </PaletteContainer>
    </Scrim>
  )
})
