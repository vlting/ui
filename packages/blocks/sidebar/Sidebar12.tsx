import type { ComponentType } from 'react'
import React from 'react'
import { View } from 'tamagui'
import { Calendar } from '../../components/Calendar'
import { Sidebar } from '../../components/Sidebar'
import type { SidebarBlockProps } from './_shared'
import { SidebarNavGroup } from './_shared'

type AnyFC = ComponentType<Record<string, unknown>>
const ViewJsx = View as AnyFC

export interface Sidebar12Props extends SidebarBlockProps {
  selectedDate?: Date
  onDateSelect?: (date: Date) => void
  calendarPosition?: 'top' | 'bottom'
}

export function Sidebar12({
  groups,
  header,
  footer,
  selectedDate,
  onDateSelect,
  calendarPosition = 'top',
  collapsible = 'offcanvas',
  side = 'left',
  variant = 'sidebar',
  defaultOpen = true,
  open,
  onOpenChange,
  width,
  collapsedWidth,
}: Sidebar12Props) {
  const calendarSection = (
    <ViewJsx padding="$2">
      <Calendar.Root mode="single" selected={selectedDate} onSelect={onDateSelect} />
    </ViewJsx>
  )

  const navSection = groups.map((group, i) => (
    <React.Fragment key={`group-${group.label ?? i}`}>
      {i > 0 && <Sidebar.Separator />}
      <SidebarNavGroup group={group} />
    </React.Fragment>
  ))

  return (
    <Sidebar.Root
      collapsible={collapsible}
      side={side}
      variant={variant}
      defaultOpen={defaultOpen}
      open={open}
      onOpenChange={onOpenChange}
      width={width}
      collapsedWidth={collapsedWidth}
    >
      {header && <Sidebar.Header>{header}</Sidebar.Header>}
      <Sidebar.Content>
        {calendarPosition === 'top' ? (
          <>
            {calendarSection}
            <Sidebar.Separator />
            {navSection}
          </>
        ) : (
          <>
            {navSection}
            <Sidebar.Separator />
            {calendarSection}
          </>
        )}
      </Sidebar.Content>
      {footer && <Sidebar.Footer>{footer}</Sidebar.Footer>}
    </Sidebar.Root>
  )
}
