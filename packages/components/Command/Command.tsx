import { styledHtml } from '@tamagui/web'
import type { ComponentType } from 'react'
import React, { useCallback, useRef, useState } from 'react'
import { Text, View } from 'tamagui'

type AnyFC = ComponentType<Record<string, unknown>>
const ViewJsx = View as AnyFC
const TextJsx = Text as AnyFC

const SearchInput = styledHtml('input', {
  display: 'flex',
  width: '100%',
  backgroundColor: 'transparent',
  fontSize: '$4',
  fontFamily: '$body',
  color: '$color',
  outline: 'none',
  border: 'none',
  padding: 0,
} as any)

const SearchInputJsx = SearchInput as AnyFC

export interface CommandRootProps {
  children: React.ReactNode
  filter?: (value: string, search: string) => boolean
  loop?: boolean
}

export interface CommandItemProps {
  children: React.ReactNode
  value: string
  onSelect?: (value: string) => void
  disabled?: boolean
  keywords?: string[]
}

export interface CommandGroupProps {
  children: React.ReactNode
  heading?: string
}

const CommandContext = React.createContext<{
  search: string
  setSearch: (s: string) => void
  filter: (value: string, search: string) => boolean
}>({
  search: '',
  setSearch: () => {},
  filter: (v, s) => v.toLowerCase().includes(s.toLowerCase()),
})

function Root({ children, filter, loop: _loop }: CommandRootProps) {
  const [search, setSearch] = useState('')

  const defaultFilter = useCallback(
    (value: string, s: string) =>
      filter ? filter(value, s) : value.toLowerCase().includes(s.toLowerCase()),
    [filter],
  )

  return (
    <CommandContext.Provider value={{ search, setSearch, filter: defaultFilter }}>
      <ViewJsx
        backgroundColor="$background"
        borderWidth={1}
        borderColor="$borderColor"
        borderRadius="$5"
        overflow="hidden"
        role="listbox"
        aria-label="Command menu"
      >
        {children}
      </ViewJsx>
    </CommandContext.Provider>
  )
}

function Input({
  placeholder = 'Type a command or search...',
}: { placeholder?: string }) {
  const { search, setSearch } = React.useContext(CommandContext)
  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <ViewJsx
      flexDirection="row"
      alignItems="center"
      paddingLeft="$1.5"
      paddingRight="$1.5"
      height={44}
      borderBottomWidth={1}
      borderBottomColor="$borderColor"
    >
      <TextJsx fontSize="$4" color="$colorSubtitle" marginRight="$0.75">
        {'\u{1F50D}'}
      </TextJsx>
      <SearchInputJsx
        ref={inputRef}
        value={search}
        onChange={(e: any) => setSearch(e.target.value)}
        placeholder={placeholder}
        aria-label="Search commands"
      />
    </ViewJsx>
  )
}

function CommandList({ children }: { children: React.ReactNode }) {
  return (
    <ViewJsx maxHeight={300} style={{ overflowY: 'auto' }} padding="$0.5">
      {children}
    </ViewJsx>
  )
}

function Empty({ children = 'No results found.' }: { children?: React.ReactNode }) {
  const { search } = React.useContext(CommandContext)
  if (!search) return null
  return (
    <ViewJsx padding="$3.5" alignItems="center">
      <TextJsx fontSize="$4" color="$colorSubtitle" fontFamily="$body">
        {children}
      </TextJsx>
    </ViewJsx>
  )
}

function Group({ children, heading }: CommandGroupProps) {
  return (
    <ViewJsx>
      {heading && (
        <ViewJsx
          paddingLeft="$0.75"
          paddingRight="$0.75"
          paddingTop="$0.75"
          paddingBottom="$0.5"
        >
          <TextJsx
            fontSize="$2"
            fontWeight="500"
            color="$colorSubtitle"
            fontFamily="$body"
          >
            {heading}
          </TextJsx>
        </ViewJsx>
      )}
      {children}
    </ViewJsx>
  )
}

function Item({ children, value, onSelect, disabled, keywords }: CommandItemProps) {
  const { search, filter } = React.useContext(CommandContext)

  const searchableText = keywords ? [...keywords, value].join(' ') : value
  const visible = !search || filter(searchableText, search)

  if (!visible) return null

  return (
    <ViewJsx
      flexDirection="row"
      alignItems="center"
      height={36}
      paddingLeft="$0.75"
      paddingRight="$0.75"
      borderRadius="$3"
      cursor={disabled ? 'not-allowed' : 'pointer'}
      opacity={disabled ? 0.5 : 1}
      hoverStyle={disabled ? undefined : { backgroundColor: '$color2' }}
      focusVisibleStyle={{
        outlineWidth: 2,
        outlineOffset: -2,
        outlineColor: '$outlineColor',
        outlineStyle: 'solid',
      }}
      onPress={disabled ? undefined : () => onSelect?.(value)}
      role="option"
      aria-disabled={disabled}
    >
      {children}
    </ViewJsx>
  )
}

function Separator() {
  return (
    <ViewJsx
      height={1}
      backgroundColor="$borderColor"
      marginTop="$0.5"
      marginBottom="$0.5"
    />
  )
}

function Loading({ children = 'Loading...' }: { children?: React.ReactNode }) {
  return (
    <ViewJsx padding="$1.5" alignItems="center">
      <TextJsx fontSize="$4" color="$colorSubtitle" fontFamily="$body">
        {children}
      </TextJsx>
    </ViewJsx>
  )
}

export const Command = {
  Root,
  Input,
  List: CommandList,
  Empty,
  Group,
  Item,
  Separator,
  Loading,
}
