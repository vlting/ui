interface BlockPreviewProps {
  name: string
  description?: string
}

export function BlockPreview({ name, description }: BlockPreviewProps) {
  return (
    <div className="border border-border rounded-lg overflow-hidden">
      <div className="bg-surface-muted p-8 flex flex-col items-center justify-center min-h-[300px] gap-4">
        <div className="w-16 h-16 rounded-lg bg-muted flex items-center justify-center">
          <svg
            className="w-8 h-8 text-muted-foreground"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 7.125C2.25 6.504 2.754 6 3.375 6h6c.621 0 1.125.504 1.125 1.125v3.75c0 .621-.504 1.125-1.125 1.125h-6a1.125 1.125 0 0 1-1.125-1.125v-3.75ZM14.25 8.625c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v8.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 0 1-1.125-1.125v-8.25ZM3.75 16.125c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 0 1-1.125-1.125v-2.25Z"
            />
          </svg>
        </div>
        <div className="text-center">
          <p className="text-sm font-medium text-foreground-secondary">
            {name}
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Live preview available when block components are shipped
          </p>
        </div>
        {description && (
          <p className="text-xs text-muted-foreground max-w-sm text-center">
            {description}
          </p>
        )}
      </div>
    </div>
  )
}
