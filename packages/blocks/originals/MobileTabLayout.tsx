import type { ComponentType, ReactNode } from 'react'
import { Text, View } from 'tamagui'
import { Tabs } from '../../components/Tabs'

type AnyFC = ComponentType<Record<string, unknown>>
const ViewJsx = View as AnyFC
const TextJsx = Text as AnyFC

export interface TabItem {
  value: string
  label: string
  icon?: ReactNode
  content: ReactNode
}

export interface MobileTabLayoutProps {
  tabs: TabItem[]
  defaultTab?: string
  activeTab?: string
  onTabChange?: (value: string) => void
  children?: ReactNode
}

export function MobileTabLayout({
  tabs,
  defaultTab,
  activeTab,
  onTabChange,
  children,
}: MobileTabLayoutProps) {
  const defaultValue = defaultTab ?? tabs[0]?.value
  return (
    <ViewJsx flex={1} flexDirection="column">
      <Tabs.Root
        defaultValue={defaultValue}
        value={activeTab}
        onValueChange={onTabChange}
      >
        <ViewJsx flex={1}>
          {tabs.map((tab) => (
            <Tabs.Content key={tab.value} value={tab.value}>
              {tab.content}
            </Tabs.Content>
          ))}
          {children}
        </ViewJsx>

        <Tabs.List>
          {tabs.map((tab) => (
            <Tabs.Trigger key={tab.value} value={tab.value}>
              <ViewJsx alignItems="center" gap="$0.5">
                {tab.icon && (
                  <ViewJsx alignItems="center" justifyContent="center">
                    {tab.icon}
                  </ViewJsx>
                )}
                <TextJsx fontSize="$2" fontFamily="$body" color="$color">
                  {tab.label}
                </TextJsx>
              </ViewJsx>
            </Tabs.Trigger>
          ))}
        </Tabs.List>
      </Tabs.Root>
    </ViewJsx>
  )
}
