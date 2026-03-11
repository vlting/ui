'use client'

import { type ReactNode, useState } from 'react'
import { CopyButton } from './copy-button'

interface ComponentPreviewProps {
  children: ReactNode
  code?: string
  codeHtml?: { light: string; dark: string }
  title?: string
}

export function ComponentPreview({
  children,
  code,
  codeHtml,
  title,
}: ComponentPreviewProps) {
  const [showCode, setShowCode] = useState(false)

  const hasCode = code || codeHtml

  return (
    <div
      style={{
        margin: '24px 0',
        border: '1px solid var(--stl-borderColor)',
        borderRadius: 8,
      }}
    >
      {title && (
        <div
          style={{
            padding: '8px 16px',
            borderBottom: '1px solid var(--stl-borderColor)',
            background: 'var(--stl-surface1)',
            overflow: 'hidden',
            borderRadius: '8px 8px 0 0',
          }}
        >
          <span style={{ fontSize: 14, fontWeight: 500 }}>{title}</span>
        </div>
      )}
      <div
        style={{
          padding: 32,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'var(--stl-background)',
          backgroundImage:
            'radial-gradient(circle, var(--stl-borderColor) 1px, transparent 1px)',
          backgroundSize: '16px 16px',
        }}
      >
        <div style={{ width: '100%', maxWidth: 512 }}>{children}</div>
      </div>
      {hasCode && (
        <>
          <div style={{ borderTop: '1px solid var(--stl-borderColor)' }}>
            <button
              onClick={() => setShowCode(!showCode)}
              style={{
                width: '100%',
                padding: '8px 16px',
                textAlign: 'left',
                fontSize: 14,
                color: 'var(--stl-colorSubtitle)',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
              }}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{
                  transition: 'transform 0.2s',
                  transform: showCode ? 'rotate(90deg)' : 'none',
                }}
              >
                <polyline points="9 18 15 12 9 6" />
              </svg>
              {showCode ? 'Hide code' : 'Show code'}
            </button>
          </div>
          {showCode && (
            <div
              style={{
                borderTop: '1px solid var(--stl-borderColor)',
                borderRadius: '0 0 8px 8px',
                position: 'relative',
              }}
            >
              {code && (
                <div style={{ position: 'absolute', right: 8, top: 8, zIndex: 10 }}>
                  <CopyButton text={code} />
                </div>
              )}
              {codeHtml ? (
                <>
                  <div
                    className="code-light"
                    style={{ overflowX: 'auto', padding: '16px 48px 16px 16px', fontSize: 14 }}
                    dangerouslySetInnerHTML={{ __html: codeHtml.light }}
                  />
                  <div
                    className="code-dark"
                    style={{
                      overflowX: 'auto',
                      padding: '16px 48px 16px 16px',
                      fontSize: 14,
                      background: 'var(--stl-surface)',
                    }}
                    dangerouslySetInnerHTML={{ __html: codeHtml.dark }}
                  />
                  <style>{`
                    [data-color-mode="light"] .code-dark,
                    :root:not([data-color-mode]) .code-dark { display: none; }
                    [data-color-mode="dark"] .code-light { display: none; }
                    .code-light pre, .code-dark pre { background: transparent !important; margin: 0 !important; padding: 0 !important; }
                    .code-light code, .code-dark code { font-size: 14px !important; }
                  `}</style>
                </>
              ) : (
                <div style={{ overflowX: 'auto', padding: '16px 48px 16px 16px', background: 'var(--stl-surface1)' }}>
                  <pre style={{ fontSize: 14, fontFamily: 'monospace', whiteSpace: 'pre-wrap' }}>{code}</pre>
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  )
}
