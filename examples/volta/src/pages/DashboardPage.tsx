import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Accordion,
  Breadcrumbs,
  Card,
  DataTable,
  MetricTile,
  PageHeader,
  ResizablePanel,
  Section,
  StatCard,
  Tabs,
} from '@vlting/ui/layout'
import {
  dashboardStats,
  kanbanColumns,
  metricTiles,
  mockActivity,
  mockAnnouncements,
  mockProjects,
} from '../data/mock'

// ---------------------------------------------------------------------------
// DataTable column config
// ---------------------------------------------------------------------------

const activityColumns = [
  { key: 'user',    header: 'User',    sortable: true  },
  { key: 'action',  header: 'Action',  sortable: false },
  { key: 'project', header: 'Project', sortable: true  },
  { key: 'date',    header: 'Date',    sortable: true  },
]

const priorityColor: Record<string, string> = {
  high: '#ef4444',
  medium: '#f59e0b',
  low:  '#6b7280',
}

// ---------------------------------------------------------------------------
// DashboardPage
// ---------------------------------------------------------------------------

export function DashboardPage() {
  const navigate = useNavigate()
  const [activeProject, setActiveProject] = useState(mockProjects[0])

  return (
    <>
      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[{ label: 'Home', onPress: () => navigate('/') }]}
      />

      {/* Page header */}
      <PageHeader>
        <PageHeader.Body>
          <PageHeader.Title>Dashboard</PageHeader.Title>
          <PageHeader.Subtitle>Feb 1 – Feb 20, 2026</PageHeader.Subtitle>
        </PageHeader.Body>
      </PageHeader>

      {/* ── Stat cards ──────────────────────────────────── */}
      <Section title="Overview" padding="$4" gap="$3">
        <Section.Content flexDirection="row" flexWrap="wrap" gap="$3">
          {dashboardStats.map((s) => (
            <StatCard
              key={s.label}
              label={s.label}
              value={s.value}
              trend={s.trend}
              trendUp={s.up}
              flex={1}
              minWidth={160}
            />
          ))}
        </Section.Content>
      </Section>

      {/* ── Metric tiles ────────────────────────────────── */}
      <Section padding="$4" gap="$2">
        <Section.Content flexDirection="row" flexWrap="wrap" gap="$2">
          {metricTiles.map((m) => (
            <MetricTile
              key={m.label}
              label={m.label}
              value={m.value}
              trend={m.trend}
              trendUp={m.up}
              flex={1}
              minWidth={120}
            />
          ))}
        </Section.Content>
      </Section>

      {/* ── Activity / Pipeline tabs ─────────────────────── */}
      <Section padding="$4">
        <Tabs defaultValue="activity">
          <Tabs.List>
            <Tabs.Tab value="activity">Activity</Tabs.Tab>
            <Tabs.Tab value="pipeline">Pipeline</Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="activity">
            <DataTable
              columns={activityColumns}
              data={mockActivity}
              selectable
              testID="activity-table"
            />
          </Tabs.Panel>

          <Tabs.Panel value="pipeline">
            <Section.Content flexDirection="row" gap="$3" padding="$3" flexWrap="wrap">
              {kanbanColumns.map((col) => (
                <Card key={col.id} flex={1} minWidth={220} padding="$3" gap="$2">
                  <Card.Header>
                    <Card.Title>{col.title}</Card.Title>
                  </Card.Header>
                  <Card.Content gap="$2">
                    {col.cards.map((card) => (
                      <Card
                        key={card.id}
                        padding="$2"
                        gap="$1"
                        bordered
                        borderLeftWidth={3}
                        borderLeftColor={priorityColor[card.priority]}
                      >
                        <Card.Content>
                          <Card.Title fontSize="$3">{card.title}</Card.Title>
                          <Card.Description fontSize="$2">{card.assignee}</Card.Description>
                        </Card.Content>
                      </Card>
                    ))}
                  </Card.Content>
                </Card>
              ))}
            </Section.Content>
          </Tabs.Panel>
        </Tabs>
      </Section>

      {/* ── Resizable panel — project detail ─────────────── */}
      <Section title="Projects" padding="$4">
        <ResizablePanel defaultSize={40} minSize={25} maxSize={60}>
          <ResizablePanel.First padding="$3" gap="$2">
            {mockProjects.map((p) => (
              <Card
                key={p.id}
                padding="$2"
                onPress={() => setActiveProject(p)}
                backgroundColor={activeProject.id === p.id ? '$cobalt1' : undefined}
                bordered={activeProject.id === p.id}
                borderColor={activeProject.id === p.id ? '$cobalt7' : undefined}
              >
                <Card.Content>
                  <Card.Title fontSize="$3">{p.name}</Card.Title>
                  <Card.Description fontSize="$2">{p.owner} · {p.status}</Card.Description>
                </Card.Content>
              </Card>
            ))}
          </ResizablePanel.First>
          <ResizablePanel.Second padding="$4" gap="$3">
            <Card.Title fontSize="$5">{activeProject.name}</Card.Title>
            <Card.Description>Owner: {activeProject.owner}</Card.Description>
            <Card.Description>Due: {activeProject.dueDate}</Card.Description>
            <Card.Description>Progress: {activeProject.progress}%</Card.Description>
            <Card.Description>Status: {activeProject.status}</Card.Description>
          </ResizablePanel.Second>
        </ResizablePanel>
      </Section>

      {/* ── Announcements accordion ──────────────────────── */}
      <Section title="Announcements" padding="$4">
        <Accordion>
          {mockAnnouncements.slice(0, 3).map((ann) => (
            <Accordion.Item key={ann.id} value={ann.id}>
              <Accordion.Trigger>
                <Accordion.Title>{ann.title}</Accordion.Title>
                <Accordion.Subtitle>{ann.author} · {ann.date}</Accordion.Subtitle>
              </Accordion.Trigger>
              <Accordion.Content>
                <Accordion.Description>{ann.body}</Accordion.Description>
              </Accordion.Content>
            </Accordion.Item>
          ))}
        </Accordion>
      </Section>
    </>
  )
}
