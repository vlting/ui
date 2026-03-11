'use client'

import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useRef, useState } from 'react'
import { styled } from '../../../packages/stl-react/src'
import { type SearchItem, type SearchItemType, search } from '../lib/search-index'

const typeLabels: Record<SearchItemType, string> = {
  component: 'Component',
  block: 'Block',
  chart: 'Chart',
  icon: 'Icon',
  page: 'Page',
}

const typeColorStyles: Record<SearchItemType, { background: string; color: string; darkBackground: string; darkColor: string }> = {
  component: { background: '#dbeafe', color: '#1d4ed8', darkBackground: '#1e3a5f', darkColor: '#93c5fd' },
  block: { background: '#f3e8ff', color: '#7e22ce', darkBackground: '#3b1f5e', darkColor: '#d8b4fe' },
  chart: { background: '#dcfce7', color: '#15803d', darkBackground: '#14532d', darkColor: '#86efac' },
  icon: { background: '#ffedd5', color: '#c2410c', darkBackground: '#431407', darkColor: '#fdba74' },
  page: { background: '#f3f4f6', color: '#374151', darkBackground: '#1f2937', darkColor: '#d1d5db' },
}

const Overlay = styled('div', {
  position: 'fixed',
  inset: 0,
  zIndex: '$10',
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'center',
  paddingTop: '15vh',
})

const Backdrop = styled('div', {
  position: 'fixed',
  inset: 0,
  background: 'rgba(0,0,0,0.5)',
  backdropFilter: 'blur(4px)',
})

const DialogBox = styled('div', {
  position: 'relative',
  width: '100%',
  maxWidth: 512,
  overflow: 'hidden',
  borderRadius: '$5',
  border: '$thin $borderColor',
  background: '$background',
  boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)',
})

const SearchBar = styled('div', {
  display: 'flex',
  alignItems: 'center',
  borderBottom: '$thin $borderColor',
  px: '$2.5',
})

const SearchIcon = styled('svg', {
  mr: '$1',
  width: 16,
  height: 16,
  flexShrink: 0,
  color: '$colorSubtitle',
})

const SearchInput = styled('input', {
  height: 48,
  width: '100%',
  background: 'transparent',
  fontSize: '$p',
  color: '$color',
  outline: 'none',
  border: 'none',
  '::placeholder': { color: '$colorSubtitle' },
})

const EscKbd = styled('kbd', {
  ml: '$1',
  display: 'none',
  flexShrink: 0,
  borderRadius: '$3',
  border: '$thin $borderColor',
  background: '$tertiary2',
  px: 6,
  py: 2,
  fontSize: 10,
  fontWeight: '$500',
  color: '$colorSubtitle',
  gtSm: { display: 'inline-block' },
})

const ResultsList = styled('div', {
  maxHeight: 320,
  overflowY: 'auto',
  overscrollBehavior: 'contain',
  padding: '$1',
})

const NoResults = styled('p', {
  px: '$2.5',
  py: '$4',
  textAlign: 'center',
  fontSize: '$p',
  color: '$colorSubtitle',
})

const GroupLabel = styled('div', {
  px: '$1',
  pb: 4,
  pt: '$1',
  fontSize: '$small',
  fontWeight: '$600',
  color: '$colorSubtitle',
})

const ResultButton = styled('button', {
  display: 'flex',
  width: '100%',
  alignItems: 'center',
  gap: '$1.5',
  borderRadius: '$4',
  px: '$1.5',
  py: '$1',
  textAlign: 'left',
  fontSize: '$p',
  transition: 'background 150ms',
  border: 'none',
  cursor: 'pointer',
  background: 'transparent',
  ':hover': { background: '$tertiary2' },
})

const TypeBadge = styled('span', {
  flexShrink: 0,
  borderRadius: '$2',
  px: 6,
  py: 2,
  fontSize: 10,
  fontWeight: '$500',
})

const ResultName = styled('span', {
  flex: 1,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  fontWeight: '$500',
  color: '$color',
})

const ResultCategory = styled('span', {
  flexShrink: 0,
  fontSize: '$small',
  color: '$colorSubtitle',
})

const FooterBar = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  borderTop: '$thin $borderColor',
  px: '$2.5',
  py: '$1',
  fontSize: '$small',
  color: '$colorSubtitle',
})

const FooterActions = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: '$1',
})

const FooterKbd = styled('kbd', {
  borderRadius: '$3',
  border: '$thin $borderColor',
  background: '$tertiary2',
  px: 4,
  py: 2,
  fontSize: 10,
})

// SearchTrigger styled components
const TriggerButton = styled('button', {
  display: 'flex',
  height: 32,
  alignItems: 'center',
  gap: '$1',
  borderRadius: '$3',
  border: '$thin $borderColor',
  px: '$1',
  fontSize: '$p',
  color: '$colorSubtitle',
  background: 'transparent',
  cursor: 'pointer',
  transition: 'background 150ms',
  ':hover': { background: '$tertiary2' },
})

const TriggerIcon = styled('svg', {
  width: 14,
  height: 14,
})

const TriggerLabel = styled('span', {
  display: 'none',
  gtSm: { display: 'inline' },
})

const TriggerKbd = styled('kbd', {
  display: 'none',
  borderRadius: '$3',
  border: '$thin $borderColor',
  background: '$tertiary2',
  px: 4,
  py: 2,
  fontSize: 10,
  fontWeight: '$500',
  gtSm: { display: 'inline-block' },
})

export function SearchDialog() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchItem[]>([])
  const [activeIndex, setActiveIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setOpen((prev) => !prev)
      }
      if (e.key === 'Escape') {
        setOpen(false)
      }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [])

  useEffect(() => {
    if (open) {
      setQuery('')
      setResults([])
      setActiveIndex(0)
      requestAnimationFrame(() => inputRef.current?.focus())
    }
  }, [open])

  const handleSearch = useCallback((value: string) => {
    setQuery(value)
    setActiveIndex(0)
    if (value.trim().length < 2) {
      setResults([])
      return
    }
    setResults(search(value, 20))
  }, [])

  const navigate = useCallback(
    (item: SearchItem) => {
      setOpen(false)
      router.push(item.href)
    },
    [router],
  )

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        setActiveIndex((prev) => Math.min(prev + 1, results.length - 1))
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        setActiveIndex((prev) => Math.max(prev - 1, 0))
      } else if (e.key === 'Enter' && results[activeIndex]) {
        e.preventDefault()
        navigate(results[activeIndex])
      }
    },
    [results, activeIndex, navigate],
  )

  useEffect(() => {
    const activeEl = listRef.current?.querySelector('[data-active="true"]')
    activeEl?.scrollIntoView({ block: 'nearest' })
  }, [])

  if (!open) return null

  // Group results by type
  const grouped = results.reduce<Record<SearchItemType, SearchItem[]>>(
    (acc, item) => {
      if (!acc[item.type]) acc[item.type] = []
      acc[item.type].push(item)
      return acc
    },
    {} as Record<SearchItemType, SearchItem[]>,
  )

  let flatIndex = 0

  return (
    <Overlay
      onClick={() => setOpen(false)}
      role="presentation"
    >
      <Backdrop aria-hidden="true" />
      <DialogBox
        onClick={(e: React.MouseEvent) => e.stopPropagation()}
        role="dialog"
        aria-label="Search documentation"
      >
        <SearchBar>
          <SearchIcon
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </SearchIcon>
          <SearchInput
            ref={inputRef}
            type="text"
            placeholder="Search components, blocks, charts, icons..."
            value={query}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleSearch(e.target.value)}
            onKeyDown={handleKeyDown}
            aria-label="Search"
            aria-activedescendant={
              results[activeIndex]
                ? `search-result-${results[activeIndex].id}`
                : undefined
            }
            role="combobox"
            aria-expanded={results.length > 0}
            aria-controls="search-results"
            aria-autocomplete="list"
          />
          <EscKbd>
            ESC
          </EscKbd>
        </SearchBar>

        <ResultsList
          ref={listRef}
          id="search-results"
          role="listbox"
        >
          {query.trim().length >= 2 && results.length === 0 && (
            <NoResults>
              No results for &quot;{query}&quot;
            </NoResults>
          )}

          {(Object.entries(grouped) as [SearchItemType, SearchItem[]][]).map(
            ([type, items]) => (
              <div key={type}>
                <GroupLabel>
                  {typeLabels[type]}s
                </GroupLabel>
                {items.map((item) => {
                  const idx = flatIndex++
                  const isActive = idx === activeIndex
                  const colors = typeColorStyles[type]
                  return (
                    <ResultButton
                      key={item.id}
                      id={`search-result-${item.id}`}
                      role="option"
                      aria-selected={isActive}
                      data-active={isActive}
                      onClick={() => navigate(item)}
                      onMouseEnter={() => setActiveIndex(idx)}
                      style={{
                        background: isActive ? 'var(--stl-tertiary2, #f0f0f0)' : undefined,
                      }}
                    >
                      <TypeBadge
                        style={{
                          background: colors.background,
                          color: colors.color,
                        }}
                      >
                        {typeLabels[type]}
                      </TypeBadge>
                      <ResultName>
                        {item.name}
                      </ResultName>
                      {item.category && (
                        <ResultCategory>
                          {item.category}
                        </ResultCategory>
                      )}
                    </ResultButton>
                  )
                })}
              </div>
            ),
          )}
        </ResultsList>

        {results.length > 0 && (
          <FooterBar>
            <span>{results.length} results</span>
            <FooterActions>
              <FooterKbd>
                &uarr;&darr;
              </FooterKbd>
              <span>navigate</span>
              <FooterKbd>
                &crarr;
              </FooterKbd>
              <span>select</span>
            </FooterActions>
          </FooterBar>
        )}
      </DialogBox>
    </Overlay>
  )
}

export function SearchTrigger() {
  return (
    <TriggerButton
      onClick={() =>
        document.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', metaKey: true }))
      }
      aria-label="Search documentation (Ctrl+K)"
    >
      <TriggerIcon
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </TriggerIcon>
      <TriggerLabel>Search...</TriggerLabel>
      <TriggerKbd>
        &thinsp;&#8984;K
      </TriggerKbd>
    </TriggerButton>
  )
}
