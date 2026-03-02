'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { search, type SearchItem, type SearchItemType } from '../lib/search-index'

const typeLabels: Record<SearchItemType, string> = {
  component: 'Component',
  block: 'Block',
  chart: 'Chart',
  icon: 'Icon',
  page: 'Page',
}

const typeColors: Record<SearchItemType, string> = {
  component: 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300',
  block: 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300',
  chart: 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300',
  icon: 'bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300',
  page: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300',
}

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
  }, [activeIndex])

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
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh]"
      onClick={() => setOpen(false)}
      role="presentation"
    >
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" aria-hidden="true" />
      <div
        className="relative w-full max-w-lg overflow-hidden rounded-xl border border-gray-200 bg-white shadow-2xl dark:border-gray-700 dark:bg-gray-900"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-label="Search documentation"
      >
        <div className="flex items-center border-b border-gray-200 px-4 dark:border-gray-700">
          <svg
            className="mr-2 h-4 w-4 shrink-0 text-gray-400"
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
          </svg>
          <input
            ref={inputRef}
            type="text"
            className="h-12 w-full bg-transparent text-sm text-gray-900 outline-none placeholder:text-gray-400 dark:text-gray-100"
            placeholder="Search components, blocks, charts, icons..."
            value={query}
            onChange={(e) => handleSearch(e.target.value)}
            onKeyDown={handleKeyDown}
            aria-label="Search"
            aria-activedescendant={
              results[activeIndex] ? `search-result-${results[activeIndex].id}` : undefined
            }
            role="combobox"
            aria-expanded={results.length > 0}
            aria-controls="search-results"
            aria-autocomplete="list"
          />
          <kbd className="ml-2 hidden shrink-0 rounded border border-gray-300 bg-gray-100 px-1.5 py-0.5 text-[10px] font-medium text-gray-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 sm:inline-block">
            ESC
          </kbd>
        </div>

        <div
          ref={listRef}
          id="search-results"
          role="listbox"
          className="max-h-80 overflow-y-auto overscroll-contain p-2"
        >
          {query.trim().length >= 2 && results.length === 0 && (
            <p className="px-4 py-8 text-center text-sm text-gray-500">
              No results for &quot;{query}&quot;
            </p>
          )}

          {(Object.entries(grouped) as [SearchItemType, SearchItem[]][]).map(
            ([type, items]) => (
              <div key={type}>
                <div className="px-2 pb-1 pt-2 text-xs font-semibold text-gray-500 dark:text-gray-400">
                  {typeLabels[type]}s
                </div>
                {items.map((item) => {
                  const idx = flatIndex++
                  const isActive = idx === activeIndex
                  return (
                    <button
                      key={item.id}
                      id={`search-result-${item.id}`}
                      role="option"
                      aria-selected={isActive}
                      data-active={isActive}
                      className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                        isActive
                          ? 'bg-gray-100 dark:bg-gray-800'
                          : 'hover:bg-gray-50 dark:hover:bg-gray-800/50'
                      }`}
                      onClick={() => navigate(item)}
                      onMouseEnter={() => setActiveIndex(idx)}
                    >
                      <span
                        className={`shrink-0 rounded px-1.5 py-0.5 text-[10px] font-medium ${typeColors[type]}`}
                      >
                        {typeLabels[type]}
                      </span>
                      <span className="flex-1 truncate font-medium text-gray-900 dark:text-gray-100">
                        {item.name}
                      </span>
                      {item.category && (
                        <span className="shrink-0 text-xs text-gray-400">
                          {item.category}
                        </span>
                      )}
                    </button>
                  )
                })}
              </div>
            ),
          )}
        </div>

        {results.length > 0 && (
          <div className="flex items-center justify-between border-t border-gray-200 px-4 py-2 text-xs text-gray-400 dark:border-gray-700">
            <span>{results.length} results</span>
            <div className="flex items-center gap-2">
              <kbd className="rounded border border-gray-300 bg-gray-100 px-1 py-0.5 text-[10px] dark:border-gray-600 dark:bg-gray-800">
                &uarr;&darr;
              </kbd>
              <span>navigate</span>
              <kbd className="rounded border border-gray-300 bg-gray-100 px-1 py-0.5 text-[10px] dark:border-gray-600 dark:bg-gray-800">
                &crarr;
              </kbd>
              <span>select</span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export function SearchTrigger() {
  return (
    <button
      onClick={() =>
        document.dispatchEvent(
          new KeyboardEvent('keydown', { key: 'k', metaKey: true }),
        )
      }
      className="flex h-8 items-center gap-2 rounded-md border border-gray-300 px-2 text-sm text-gray-500 transition-colors hover:bg-gray-100 dark:border-gray-600 dark:text-gray-400 dark:hover:bg-gray-800"
      aria-label="Search documentation (Ctrl+K)"
    >
      <svg
        className="h-3.5 w-3.5"
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
      </svg>
      <span className="hidden sm:inline">Search...</span>
      <kbd className="hidden rounded border border-gray-300 bg-gray-100 px-1 py-0.5 text-[10px] font-medium dark:border-gray-600 dark:bg-gray-800 sm:inline-block">
        &thinsp;&#8984;K
      </kbd>
    </button>
  )
}
