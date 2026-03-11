import { codeToHtml } from 'shiki'
import { CopyButton } from './copy-button'

interface CodeBlockProps {
  code: string
  language?: string
  showLineNumbers?: boolean
  title?: string
}

export async function CodeBlock({
  code,
  language = 'tsx',
  showLineNumbers = false,
  title,
}: CodeBlockProps) {
  const lightHtml = await codeToHtml(code.trim(), {
    lang: language,
    theme: 'github-light-default',
  })

  const darkHtml = await codeToHtml(code.trim(), {
    lang: language,
    theme: 'github-dark',
  })

  return (
    <div
      style={{
        position: 'relative',
        borderRadius: 8,
        border: '1px solid var(--stl-borderColor)',
        overflow: 'hidden',
      }}
    >
      {title && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '8px 16px',
            borderBottom: '1px solid var(--stl-borderColor)',
            background: 'var(--stl-surface1)',
          }}
        >
          <span
            style={{
              fontSize: 14,
              color: 'var(--stl-colorSubtitle)',
              fontFamily: 'var(--stl-fontFamily-mono, monospace)',
            }}
          >
            {title}
          </span>
        </div>
      )}
      <div style={{ position: 'relative' }}>
        <div style={{ position: 'absolute', right: 8, top: 8, zIndex: 10 }}>
          <CopyButton text={code.trim()} />
        </div>
        <div
          className="code-light"
          style={{ overflowX: 'auto', padding: '16px 48px 16px 16px', fontSize: 14 }}
          dangerouslySetInnerHTML={{ __html: lightHtml }}
        />
        <div
          className="code-dark"
          style={{
            overflowX: 'auto',
            padding: '16px 48px 16px 16px',
            fontSize: 14,
            background: 'var(--stl-surface)',
          }}
          dangerouslySetInnerHTML={{ __html: darkHtml }}
        />
      </div>
      <style>{`
        [data-color-mode="light"] .code-dark,
        :root:not([data-color-mode]) .code-dark { display: none; }
        [data-color-mode="dark"] .code-light { display: none; }
        .code-light pre, .code-dark pre { background: transparent !important; margin: 0 !important; padding: 0 !important; }
        .code-light code, .code-dark code { font-size: 14px !important; }
      `}</style>
    </div>
  )
}
