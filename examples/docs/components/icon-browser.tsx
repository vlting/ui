'use client'

import { useState, useMemo, useCallback } from 'react'
import { searchIcons, categories, iconCount, type IconEntry } from '../lib/icon-data'

function CategoryButton({
  label,
  active,
  onClick,
}: {
  label: string
  active: boolean
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: '4px 12px',
        borderRadius: 9999,
        border: '1px solid',
        borderColor: active ? 'var(--color-foreground)' : 'var(--color-border)',
        backgroundColor: active ? 'var(--color-foreground)' : 'transparent',
        color: active ? 'var(--color-background)' : 'var(--color-muted-foreground)',
        fontSize: 13,
        cursor: 'pointer',
        whiteSpace: 'nowrap',
        transition: 'all 0.15s',
      }}
    >
      {label}
    </button>
  )
}

function IconCell({
  icon,
  variant,
  onCopy,
  copied,
}: {
  icon: IconEntry
  variant: 'line' | 'fill'
  onCopy: (text: string, name: string) => void
  copied: string | null
}) {
  const componentName = icon.components[variant] || icon.components.line
  const importText = `import { ${componentName} } from '@vlting/ui'`
  const isCopied = copied === componentName

  return (
    <button
      onClick={() => onCopy(importText, componentName)}
      title={`${componentName}\nClick to copy import`}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 6,
        padding: '12px 4px',
        borderRadius: 8,
        border: '1px solid transparent',
        backgroundColor: isCopied ? 'var(--color-accent)' : 'transparent',
        cursor: 'pointer',
        transition: 'all 0.15s',
        minWidth: 0,
      }}
      onMouseEnter={(e) => {
        if (!isCopied) e.currentTarget.style.backgroundColor = 'var(--color-accent)'
      }}
      onMouseLeave={(e) => {
        if (!isCopied) e.currentTarget.style.backgroundColor = 'transparent'
      }}
    >
      <span
        style={{
          fontSize: 24,
          lineHeight: 1,
          color: 'var(--color-foreground)',
          fontFamily: 'monospace',
        }}
      >
        {variant === 'fill' ? '\u25A0' : '\u25A1'}
      </span>
      <span
        style={{
          fontSize: 10,
          color: isCopied ? 'var(--color-foreground)' : 'var(--color-muted-foreground)',
          textAlign: 'center',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          width: '100%',
          fontWeight: isCopied ? 600 : 400,
        }}
      >
        {isCopied ? 'Copied!' : icon.name}
      </span>
    </button>
  )
}

export function IconBrowser() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState<string>('all')
  const [variant, setVariant] = useState<'line' | 'fill'>('line')
  const [copied, setCopied] = useState<string | null>(null)

  const filteredIcons = useMemo(() => searchIcons(query, category), [query, category])

  const handleCopy = useCallback((text: string, name: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(name)
      setTimeout(() => setCopied(null), 2000)
    })
  }, [])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {/* Search */}
      <input
        type="text"
        placeholder={`Search ${iconCount.toLocaleString()} icons...`}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{
          width: '100%',
          padding: '10px 14px',
          borderRadius: 8,
          border: '1px solid var(--color-border)',
          backgroundColor: 'var(--color-background)',
          color: 'var(--color-foreground)',
          fontSize: 14,
          outline: 'none',
        }}
      />

      {/* Filters row */}
      <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
        {/* Variant toggle */}
        <div
          style={{
            display: 'flex',
            borderRadius: 8,
            border: '1px solid var(--color-border)',
            overflow: 'hidden',
          }}
        >
          {(['line', 'fill'] as const).map((v) => (
            <button
              key={v}
              onClick={() => setVariant(v)}
              style={{
                padding: '4px 12px',
                fontSize: 13,
                border: 'none',
                cursor: 'pointer',
                backgroundColor: variant === v ? 'var(--color-foreground)' : 'transparent',
                color: variant === v ? 'var(--color-background)' : 'var(--color-muted-foreground)',
                transition: 'all 0.15s',
                textTransform: 'capitalize',
              }}
            >
              {v}
            </button>
          ))}
        </div>

        {/* Count */}
        <span style={{ fontSize: 13, color: 'var(--color-muted-foreground)' }}>
          {filteredIcons.length === 1689
            ? `${iconCount.toLocaleString()} icons`
            : `${filteredIcons.length.toLocaleString()} of ${iconCount.toLocaleString()} icons`}
        </span>
      </div>

      {/* Category chips */}
      <div
        style={{
          display: 'flex',
          gap: 6,
          flexWrap: 'wrap',
        }}
      >
        <CategoryButton label="All" active={category === 'all'} onClick={() => setCategory('all')} />
        {categories.map((cat) => (
          <CategoryButton
            key={cat}
            label={cat.replace(/-/g, ' ')}
            active={category === cat}
            onClick={() => setCategory(cat)}
          />
        ))}
      </div>

      {/* Icon grid */}
      {filteredIcons.length === 0 ? (
        <div
          style={{
            padding: 40,
            textAlign: 'center',
            color: 'var(--color-muted-foreground)',
            fontSize: 14,
          }}
        >
          No icons found for &ldquo;{query}&rdquo;
          {category !== 'all' ? ` in ${category}` : ''}
        </div>
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(80px, 1fr))',
            gap: 2,
            contentVisibility: 'auto',
            containIntrinsicSize: 'auto 500px',
          }}
        >
          {filteredIcons.map((icon) => (
            <IconCell
              key={icon.name}
              icon={icon}
              variant={variant}
              onCopy={handleCopy}
              copied={copied}
            />
          ))}
        </div>
      )}
    </div>
  )
}
