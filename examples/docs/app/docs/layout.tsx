import { DocsSidebar } from '@/components/docs-sidebar'

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-[calc(100vh-3.5rem)]">
      <div className="hidden w-64 shrink-0 border-r border-gray-200 dark:border-gray-800 md:block">
        <DocsSidebar />
      </div>
      <div className="flex-1 overflow-auto px-6 py-8 lg:px-8">{children}</div>
    </div>
  )
}
