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
    <div className="relative rounded-lg border border-border overflow-hidden">
      {title && (
        <div className="flex items-center justify-between px-4 py-2 border-b border-border bg-surface-muted">
          <span className="text-sm text-foreground-secondary font-mono">
            {title}
          </span>
        </div>
      )}
      <div className="relative group">
        <div className="absolute right-2 top-2 z-10">
          <CopyButton text={code.trim()} />
        </div>
        <div
          className="block dark:hidden overflow-x-auto p-4 text-sm [&_pre]:!bg-transparent [&_pre]:!m-0 [&_pre]:!p-0 [&_code]:!text-sm"
          dangerouslySetInnerHTML={{ __html: lightHtml }}
        />
        <div
          className="hidden dark:block overflow-x-auto p-4 text-sm bg-surface [&_pre]:!bg-transparent [&_pre]:!m-0 [&_pre]:!p-0 [&_code]:!text-sm"
          dangerouslySetInnerHTML={{ __html: darkHtml }}
        />
      </div>
    </div>
  )
}
