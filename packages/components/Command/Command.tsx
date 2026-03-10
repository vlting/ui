import React, { useCallback, useRef, useState } from 'react'
import { styled } from '../../stl-react/src/config'

const CommandRoot = styled(
  "div",
  {
    backgroundColor: "var(--stl-background, #fff)",
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: "var(--borderColor)",
    borderRadius: "var(--stl-radius4, 10px)",
    overflow: "hidden",
  },
  "Command"
)

const CommandInputFrame = styled(
  "div",
  {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: "var(--stl-space5, 12px)",
    paddingRight: "var(--stl-space5, 12px)",
    height: "var(--stl-space14, 48px)",
    borderBottomWidth: "1px",
    borderBottomStyle: "solid",
    borderBottomColor: "var(--borderColor)",
  },
  "CommandInput"
)

const CommandSearchIcon = styled(
  "span",
  {
    fontSize: "var(--fontSize-4, 16px)",
    color: "var(--colorSubtitle)",
    marginRight: "var(--stl-space3, 6px)",
  },
  "CommandSearchIcon"
)

const CommandListFrame = styled(
  "div",
  { maxHeight: "var(--stl-space-xl, 320px)", overflowY: "auto", padding: "var(--stl-space2, 4px)" },
  "CommandList"
)

const CommandEmptyFrame = styled(
  "div",
  { padding: "var(--stl-space10, 28px)", display: "flex", alignItems: "center", justifyContent: "center" },
  "CommandEmpty"
)

const CommandItemFrame = styled(
  "div",
  {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    height: "var(--stl-space12, 36px)",
    paddingLeft: "var(--stl-space3, 6px)",
    paddingRight: "var(--stl-space3, 6px)",
    borderRadius: "var(--stl-radius2, 6px)",
    cursor: "pointer",
  },
  "CommandItem"
)

const CommandSeparator = styled(
  "div",
  {
    height: "1px", // separator height — allowed
    backgroundColor: "var(--borderColor)",
    marginTop: "var(--stl-space2, 4px)",
    marginBottom: "var(--stl-space2, 4px)",
  },
  "CommandSeparator"
)

const CommandGroupHeader = styled(
  "span",
  {
    fontSize: "var(--fontSize-2, 12px)",
    fontWeight: "500",
    color: "var(--colorSubtitle)",
    fontFamily: "var(--font-body)",
  },
  "CommandGroupHeader"
)

const CommandLoadingFrame = styled(
  "div",
  { padding: "var(--stl-space5, 12px)", display: "flex", alignItems: "center", justifyContent: "center" },
  "CommandLoading"
)

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
      <CommandRoot role="listbox" aria-label="Command menu">
        {children}
      </CommandRoot>
    </CommandContext.Provider>
  )
}

function Input({
  placeholder = 'Type a command or search...',
}: { placeholder?: string }) {
  const { search, setSearch } = React.useContext(CommandContext)
  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <CommandInputFrame>
      <CommandSearchIcon>{'\u{1F50D}'}</CommandSearchIcon>
      <input
        ref={inputRef}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder={placeholder}
        aria-label="Search commands"
        style={{
          display: 'flex',
          width: '100%',
          backgroundColor: 'transparent',
          fontSize: 'var(--fontSize-4, 16px)',
          fontFamily: 'var(--font-body)',
          color: 'var(--color)',
          outline: 'none',
          border: 'none',
          padding: 0,
        }}
      />
    </CommandInputFrame>
  )
}

function CommandList({ children }: { children: React.ReactNode }) {
  return <CommandListFrame>{children}</CommandListFrame>
}

function Empty({ children = 'No results found.' }: { children?: React.ReactNode }) {
  const { search } = React.useContext(CommandContext)
  if (!search) return null
  return (
    <CommandEmptyFrame>
      <span style={{ fontSize: 'var(--fontSize-4, 16px)', color: 'var(--colorSubtitle)', fontFamily: 'var(--font-body)' }}>
        {children}
      </span>
    </CommandEmptyFrame>
  )
}

function Group({ children, heading }: CommandGroupProps) {
  return (
    <div>
      {heading && (
        <div style={{ paddingLeft: 6, paddingRight: 6, paddingTop: 6, paddingBottom: 4 }}>
          <CommandGroupHeader>{heading}</CommandGroupHeader>
        </div>
      )}
      {children}
    </div>
  )
}

function Item({ children, value, onSelect, disabled, keywords }: CommandItemProps) {
  const { search, filter } = React.useContext(CommandContext)

  const searchableText = keywords ? [...keywords, value].join(' ') : value
  const visible = !search || filter(searchableText, search)

  if (!visible) return null

  return (
    <CommandItemFrame
      onClick={disabled ? undefined : () => onSelect?.(value)}
      role="option"
      aria-disabled={disabled}
      style={{
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.5 : 1,
      }}
    >
      {children}
    </CommandItemFrame>
  )
}

function Separator() {
  return <CommandSeparator />
}

function Loading({ children = 'Loading...' }: { children?: React.ReactNode }) {
  return (
    <CommandLoadingFrame>
      <span style={{ fontSize: 'var(--fontSize-4, 16px)', color: 'var(--colorSubtitle)', fontFamily: 'var(--font-body)' }}>
        {children}
      </span>
    </CommandLoadingFrame>
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
