import type { ColumnDef } from '@tanstack/react-table'
import type { ComponentType, ReactNode } from 'react'
import React from 'react'
import { Text, View } from 'tamagui'
import { Card } from '../../components/Card'
import { Chart, type ChartConfig } from '../../components/Chart'
import { BarChart } from '../../components/Chart'
import { DataTable } from '../../components/DataTable'
import { Sidebar } from '../../components/Sidebar'
import type { NavGroup } from '../sidebar/_shared'
import { SidebarNavGroup } from '../sidebar/_shared'

type AnyFC = ComponentType<Record<string, unknown>>
const ViewJsx = View as AnyFC
const TextJsx = Text as AnyFC

export interface Dashboard01Props {
  sidebarGroups: NavGroup[]
  sidebarHeader?: ReactNode
  sidebarFooter?: ReactNode
  title?: string
  description?: string
  chartConfig?: ChartConfig
  chartData?: Record<string, unknown>[]
  chartXAxisKey?: string
  tableData?: Record<string, unknown>[]
  tableColumns?: ColumnDef<Record<string, unknown>, unknown>[]
  children?: ReactNode
}

export function Dashboard01({
  sidebarGroups,
  sidebarHeader,
  sidebarFooter,
  title = 'Dashboard',
  description,
  chartConfig,
  chartData,
  chartXAxisKey = 'month',
  tableData,
  tableColumns,
  children,
}: Dashboard01Props) {
  return (
    <ViewJsx flexDirection="row" flex={1}>
      <Sidebar.Root collapsible="offcanvas" side="left" variant="sidebar" defaultOpen>
        {sidebarHeader && <Sidebar.Header>{sidebarHeader}</Sidebar.Header>}
        <Sidebar.Content>
          {sidebarGroups.map((group, i) => (
            <React.Fragment key={`group-${group.label ?? i}`}>
              {i > 0 && <Sidebar.Separator />}
              <SidebarNavGroup group={group} />
            </React.Fragment>
          ))}
        </Sidebar.Content>
        {sidebarFooter && <Sidebar.Footer>{sidebarFooter}</Sidebar.Footer>}
      </Sidebar.Root>

      <ViewJsx flex={1} padding="$4" gap="$4">
        <ViewJsx gap="$1">
          <TextJsx fontSize="$7" fontWeight="$4" fontFamily="$heading" color="$color">
            {title}
          </TextJsx>
          {description && (
            <TextJsx fontSize="$4" fontFamily="$body" color="$colorSubtle">
              {description}
            </TextJsx>
          )}
        </ViewJsx>

        {chartConfig && chartData && (
          <Card>
            <Card.Header>
              <Card.Title>Overview</Card.Title>
            </Card.Header>
            <Card.Content>
              <Chart
                config={chartConfig}
                data={chartData}
                xAxisKey={chartXAxisKey}
                accessibilityLabel={`${title} chart`}
              >
                <BarChart
                  data={chartData}
                  xAxisKey={chartXAxisKey}
                  showGrid
                  showTooltip
                  showXAxis
                  showYAxis
                />
              </Chart>
            </Card.Content>
          </Card>
        )}

        {tableData && tableColumns && (
          <Card>
            <Card.Header>
              <Card.Title>Recent Data</Card.Title>
            </Card.Header>
            <Card.Content>
              <DataTable data={tableData} columns={tableColumns} enablePagination />
            </Card.Content>
          </Card>
        )}

        {children}
      </ViewJsx>
    </ViewJsx>
  )
}
