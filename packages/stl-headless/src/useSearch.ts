import type { ChangeEvent } from 'react'
import { useCallback, useMemo, useState } from 'react'

export interface UseSearchProps<T> {
  items: T[]
  filterFn: (item: T, query: string) => boolean
}

export interface UseSearchReturn<T> {
  query: string
  setQuery: (q: string) => void
  filtered: T[]
  inputProps: {
    value: string
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
  }
}

export function useSearch<T>(props: UseSearchProps<T>): UseSearchReturn<T> {
  const { items, filterFn } = props
  const [query, setQuery] = useState('')

  const filtered = useMemo(
    () => (query ? items.filter((item) => filterFn(item, query)) : items),
    [items, filterFn, query],
  )

  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setQuery(e.target.value)
    },
    [],
  )

  const inputProps = useMemo(
    () => ({
      value: query,
      onChange,
    }),
    [query, onChange],
  )

  return { query, setQuery, filtered, inputProps }
}
