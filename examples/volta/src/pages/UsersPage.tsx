import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Breadcrumbs,
  DataGrid,
  PageHeader,
  Pagination,
  Section,
  VirtualizedList,
} from '@vlting/ui/layout'
import {
  Avatar,
  Button,
  Dialog,
  Switch,
  Tooltip,
} from '@vlting/ui/primitives'
import { Combobox, FieldWrapper, FormContainer, Label, Select } from '@vlting/ui/forms'
import { mockActivity, mockUsers } from '../data/mock'

const PAGE_SIZE = 10

const ROLE_OPTIONS = [
  { value: '', label: 'All roles' },
  { value: 'Admin', label: 'Admin' },
  { value: 'Engineer', label: 'Engineer' },
  { value: 'Designer', label: 'Designer' },
  { value: 'Product', label: 'Product' },
  { value: 'Marketing', label: 'Marketing' },
  { value: 'Sales', label: 'Sales' },
  { value: 'Finance', label: 'Finance' },
  { value: 'Legal', label: 'Legal' },
  { value: 'Support', label: 'Support' },
]

// Generate 100 activity entries for VirtualizedList demo
const feedEntries = Array.from({ length: 100 }, (_, i) => {
  const a = mockActivity[i % mockActivity.length]!
  return { id: `feed-${i}`, label: `${a.user} — ${a.action}`, sub: `${a.project} · ${a.date}` }
})

// ---------------------------------------------------------------------------
// UsersPage
// ---------------------------------------------------------------------------

export function UsersPage() {
  const navigate = useNavigate()
  const [page, setPage] = useState(1)
  const [roleFilter, setRoleFilter] = useState('')
  const [search, setSearch] = useState('')
  const [inviteOpen, setInviteOpen] = useState(false)

  // Filter users
  const filtered = mockUsers.filter((u) => {
    const matchRole = !roleFilter || u.role === roleFilter
    const matchSearch = !search || u.name.toLowerCase().includes(search.toLowerCase())
    return matchRole && matchSearch
  })

  const pageUsers = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  const gridColumns = [
    {
      key: 'name',
      header: 'Name',
      render: (row: typeof mockUsers[0]) => ({
        type: 'custom' as const,
        content: (
          <Avatar name={row.name} size="sm" />
        ),
        label: row.name,
      }),
    },
    { key: 'role',       header: 'Role'        },
    { key: 'status',     header: 'Status'      },
    { key: 'lastActive', header: 'Last Active' },
  ]

  return (
    <>
      <Breadcrumbs
        items={[
          { label: 'Home',  onPress: () => navigate('/') },
          { label: 'Users', onPress: () => navigate('/users') },
        ]}
      />

      <PageHeader>
        <PageHeader.Body>
          <PageHeader.Title>Team Members</PageHeader.Title>
          <PageHeader.Subtitle>{filtered.length} members</PageHeader.Subtitle>
        </PageHeader.Body>
        <PageHeader.Trailing>
          <Button onPress={() => setInviteOpen(true)}>
            <Button.Text>Invite Member</Button.Text>
          </Button>
        </PageHeader.Trailing>
      </PageHeader>

      {/* Filter bar */}
      <Section padding="$4">
        <Section.Content flexDirection="row" gap="$2" flexWrap="wrap" alignItems="flex-end">
          <Combobox
            label="Role"
            options={ROLE_OPTIONS.map((r) => ({ value: r.value, label: r.label }))}
            value={roleFilter}
            onValueChange={(v) => { setRoleFilter(v); setPage(1) }}
            placeholder="Filter by role"
            style={{ minWidth: 160 }}
          />
          <input
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1) }}
            placeholder="Search by name…"
            aria-label="Search users by name"
            style={{ padding: '8px 12px', borderRadius: 6, border: '1px solid #d2d8e6', fontSize: 14 }}
          />
          <Button
            variant="secondary"
            size="sm"
            onPress={() => { setRoleFilter(''); setSearch(''); setPage(1) }}
          >
            <Button.Text variant="secondary">Clear</Button.Text>
          </Button>
        </Section.Content>
      </Section>

      {/* Data grid */}
      <Section padding="$4">
        <DataGrid
          columns={gridColumns}
          data={pageUsers}
          onRowPress={(row) => navigate(`/users/${row.id}`)}
          rowActions={(row) => (
            <>
              <Tooltip>
                <Tooltip.Trigger>
                  <Button
                    variant="tertiary"
                    size="sm"
                    aria-label={`Edit ${row.name}`}
                    onPress={() => navigate(`/users/${row.id}`)}
                  >
                    <Button.Text variant="tertiary">Edit</Button.Text>
                  </Button>
                </Tooltip.Trigger>
                <Tooltip.Content>Edit profile</Tooltip.Content>
              </Tooltip>
              <Tooltip>
                <Tooltip.Trigger>
                  <Button
                    variant="destructive"
                    size="sm"
                    aria-label={`Remove ${row.name}`}
                  >
                    <Button.Text>Remove</Button.Text>
                  </Button>
                </Tooltip.Trigger>
                <Tooltip.Content>Remove member</Tooltip.Content>
              </Tooltip>
              <Switch
                checked={row.status === 'active'}
                aria-label={`${row.name} active status`}
              >
                <Switch.Thumb />
              </Switch>
            </>
          )}
        />
        <Pagination
          page={page}
          totalPages={Math.ceil(filtered.length / PAGE_SIZE)}
          onPageChange={setPage}
          totalItems={filtered.length}
          pageSize={PAGE_SIZE}
        />
      </Section>

      {/* VirtualizedList demo */}
      <Section title="Activity Feed" padding="$4">
        <VirtualizedList
          data={feedEntries}
          estimatedItemHeight={48}
          containerHeight={320}
          renderItem={(item) => (
            <Section.Content key={item.id} padding="$2" borderBottomWidth={1} borderBottomColor="$borderColor">
              <Section.Title fontSize="$3">{item.label}</Section.Title>
              <Section.Description fontSize="$2">{item.sub}</Section.Description>
            </Section.Content>
          )}
          keyExtractor={(item) => item.id}
        />
      </Section>

      {/* Invite Dialog */}
      <Dialog open={inviteOpen} onOpenChange={setInviteOpen}>
        <Dialog.Portal>
          <Dialog.Overlay />
          <Dialog.Content>
            <Dialog.Title>Invite Team Member</Dialog.Title>
            <FormContainer gap="$3" padding="$2">
              <FieldWrapper>
                <Label htmlFor="invite-name">Full Name</Label>
                <input
                  id="invite-name"
                  placeholder="Jane Smith"
                  style={{ padding: '8px 12px', borderRadius: 6, border: '1px solid #d2d8e6', fontSize: 14, width: '100%' }}
                />
              </FieldWrapper>
              <FieldWrapper>
                <Label htmlFor="invite-email">Email</Label>
                <input
                  id="invite-email"
                  type="email"
                  placeholder="jane@volta.dev"
                  style={{ padding: '8px 12px', borderRadius: 6, border: '1px solid #d2d8e6', fontSize: 14, width: '100%' }}
                />
              </FieldWrapper>
              <FieldWrapper>
                <Label htmlFor="invite-role">Role</Label>
                <Select id="invite-role" defaultValue="Engineer">
                  {ROLE_OPTIONS.slice(1).map((r) => (
                    <Select.Item key={r.value} value={r.value}>
                      {r.label}
                    </Select.Item>
                  ))}
                </Select>
              </FieldWrapper>
              <Section.Content flexDirection="row" gap="$2" justifyContent="flex-end">
                <Button variant="secondary" onPress={() => setInviteOpen(false)}>
                  <Button.Text variant="secondary">Cancel</Button.Text>
                </Button>
                <Button onPress={() => setInviteOpen(false)}>
                  <Button.Text>Send Invite</Button.Text>
                </Button>
              </Section.Content>
            </FormContainer>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog>
    </>
  )
}
