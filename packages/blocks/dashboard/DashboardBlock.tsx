import type { ColumnDef } from '@tanstack/react-table'
import type { ReactNode } from 'react'
import React from 'react'
import { Card } from '../../components/Card'
import type { ChartConfig } from '../../components/Chart'
import { BarChart, Chart } from '../../components/Chart'
import { DataTable } from '../../components/DataTable'
import { Sidebar } from '../../components/Sidebar'
import type { NavGroup } from '../sidebar/_shared'
import { SidebarNavGroup } from '../sidebar/_shared'

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

const col = { display: 'flex', flexDirection: 'column' as const }
const row = { display: 'flex', flexDirection: 'row' as const }

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
    <div style={{ ...col, flex: 1, padding: '16px', gap: '16px' }}>
      <div style={{ ...col, gap: '4px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 600, margin: 0 }}>{title}</h1>
        {description && (
          <p style={{ fontSize: '16px', opacity: 0.6, margin: 0 }}>{description}</p>
        )}
      </div>
      {variant === 'analytics' ? (
        <AnalyticsContent {...props} />
      ) : (
        <OverviewContent {...props} />
      )}
      {children}
    </div>
  )

  if (sidebarGroups && sidebarGroups.length > 0) {
    return (
      <div style={{ ...row, flex: 1, minHeight: '100vh' }}>
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
      </div>
    )
  }

  return content
}

// -- Analytics variant --

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
        <Card>
          <Card.Header>
            <Card.Title>Overview</Card.Title>
          </Card.Header>
          <Card.Content>
            <Chart config={chartConfig}>
              <BarChart data={chartData} xAxisKey={chartXAxisKey} />
            </Chart>
          </Card.Content>
        </Card>
      )}
      {tableData && tableColumns && (
        <Card>
          <Card.Header>
            <Card.Title>Recent Activity</Card.Title>
          </Card.Header>
          <Card.Content>
            <DataTable data={tableData} columns={tableColumns} />
          </Card.Content>
        </Card>
      )}
    </>
  )
}

// -- Overview variant --

function OverviewContent({ metrics }: DashboardBlockProps) {
  if (!metrics || metrics.length === 0) return null
  return <MetricsGrid metrics={metrics} />
}

// -- Metrics grid --

function MetricsGrid({ metrics }: { metrics: MetricCard[] }) {
  return (
    <div style={{ ...row, flexWrap: 'wrap', gap: '12px', width: '100%' }}>
      {metrics.map((metric, i) => (
        <Card key={`metric-${i}`} style={{ flex: 1, minWidth: 200, padding: '16px' }}>
          <div style={{ ...row, alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '14px', opacity: 0.6 }}>{metric.title}</span>
            {metric.icon}
          </div>
          <span
            style={{
              fontSize: '28px',
              fontWeight: 600,
              paddingTop: '4px',
              display: 'block',
            }}
          >
            {metric.value}
          </span>
          {metric.change && (
            <span
              style={{
                fontSize: '12px',
                paddingTop: '2px',
                display: 'block',
                color:
                  metric.trend === 'up'
                    ? 'green'
                    : metric.trend === 'down'
                      ? 'red'
                      : undefined,
                opacity: metric.trend === 'neutral' ? 0.6 : 1,
              }}
            >
              {metric.change}
            </span>
          )}
        </Card>
      ))}
    </div>
  )
}
