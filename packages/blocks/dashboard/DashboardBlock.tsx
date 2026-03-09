import type { ColumnDef } from '@tanstack/react-table'
import type { ComponentType, ReactNode } from 'react'
import React from 'react'
import { Text, View } from 'tamagui'
import { Card } from '../../components/Card'
import { Chart } from '../../components/Chart'
import type { ChartConfig } from '../../components/Chart'
import { BarChart } from '../../components/Chart'
import { DataTable } from '../../components/DataTable'
import { Sidebar } from '../../components/Sidebar'
import type { NavGroup } from '../sidebar/_shared'
import { SidebarNavGroup } from '../sidebar/_shared'

type AnyFC = ComponentType<Record<string, unknown>>
const ViewJsx = View as AnyFC
const TextJsx = Text as AnyFC
const CardJsx = Card as AnyFC
const CardHeaderJsx = Card.Header as AnyFC
const CardTitleJsx = Card.Title as AnyFC
const CardContentJsx = Card.Content as AnyFC
const ChartJsx = Chart as unknown as AnyFC
const BarChartJsx = BarChart as unknown as AnyFC
const DataTableJsx = DataTable as unknown as AnyFC

// -- Types --

export type DashboardBlockVariant = 'analytics' | 'overview'

export interface MetricCard {
  title: string
  value: string | number
  change?: string
  trend?: 'up' | 'down' | 'neutral'
  icon?: ReactNode
}

export interface DashboardBlockProps {
  variant: DashboardBlockVariant
  title?: string
  description?: string
  metrics?: MetricCard[]
  chartConfig?: ChartConfig
  chartData?: Record<string, unknown>[]
  chartXAxisKey?: string
  tableData?: Record<string, unknown>[]
  tableColumns?: ColumnDef<Record<string, unknown>, unknown>[]
  sidebarGroups?: NavGroup[]
  sidebarHeader?: ReactNode
  sidebarFooter?: ReactNode
  children?: ReactNode
}

// -- Main component --

export function DashboardBlock(props: DashboardBlockProps) {
  const {
    variant,
    title = 'Dashboard',
    description,
    sidebarGroups,
    sidebarHeader,
    sidebarFooter,
    children,
  } = props

  const content = (
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

      {variant === 'analytics' ? (
        <AnalyticsContent {...props} />
      ) : (
        <OverviewContent {...props} />
      )}

      {children}
    </ViewJsx>
  )

  if (sidebarGroups && sidebarGroups.length > 0) {
    return (
      <ViewJsx flexDirection="row" flex={1} minHeight="100vh">
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
        {content}
      </ViewJsx>
    )
  }

  return content
}

// -- Analytics variant: metrics + chart + table --

function AnalyticsContent({
  metrics,
  chartConfig,
  chartData,
  chartXAxisKey = 'name',
  tableData,
  tableColumns,
}: DashboardBlockProps) {
  return (
    <>
      {metrics && metrics.length > 0 && <MetricsGrid metrics={metrics} />}

      {chartConfig && chartData && (
        <CardJsx>
          <CardHeaderJsx>
            <CardTitleJsx>Overview</CardTitleJsx>
          </CardHeaderJsx>
          <CardContentJsx>
            <ChartJsx config={chartConfig}>
              <BarChartJsx data={chartData} xAxisKey={chartXAxisKey} />
            </ChartJsx>
          </CardContentJsx>
        </CardJsx>
      )}

      {tableData && tableColumns && (
        <CardJsx>
          <CardHeaderJsx>
            <CardTitleJsx>Recent Activity</CardTitleJsx>
          </CardHeaderJsx>
          <CardContentJsx>
            <DataTableJsx data={tableData} columns={tableColumns} />
          </CardContentJsx>
        </CardJsx>
      )}
    </>
  )
}

// -- Overview variant: metric cards grid --

function OverviewContent({ metrics }: DashboardBlockProps) {
  if (!metrics || metrics.length === 0) return null
  return <MetricsGrid metrics={metrics} />
}

// -- Metrics grid --

function MetricsGrid({ metrics }: { metrics: MetricCard[] }) {
  return (
    <ViewJsx
      flexDirection="row"
      flexWrap="wrap"
      gap="$3"
      width="100%"
    >
      {metrics.map((metric, i) => (
        <CardJsx
          key={`metric-${i}`}
          flex={1}
          style={{ minWidth: 200 }}
          padding="$4"
        >
          <ViewJsx flexDirection="row" alignItems="center" justifyContent="space-between">
            <TextJsx fontSize="$3" fontFamily="$body" color="$colorSubtle">
              {metric.title}
            </TextJsx>
            {metric.icon}
          </ViewJsx>
          <TextJsx
            fontSize="$8"
            fontWeight="$4"
            fontFamily="$heading"
            color="$color"
            paddingTop="$1"
          >
            {metric.value}
          </TextJsx>
          {metric.change && (
            <TextJsx
              fontSize="$2"
              fontFamily="$body"
              color={
                metric.trend === 'up'
                  ? '$green10'
                  : metric.trend === 'down'
                    ? '$red10'
                    : '$colorSubtle'
              }
              paddingTop="$0.5"
            >
              {metric.change}
            </TextJsx>
          )}
        </CardJsx>
      ))}
    </ViewJsx>
  )
}
