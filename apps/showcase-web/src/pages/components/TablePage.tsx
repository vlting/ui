import { Table } from '@vlting/ui/components'
import { DemoCard, Section } from '../../components/Section'

export function TablePage() {
  return (
    <div>
      <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 24 }}>Table</h1>

      <Section title="Default">
        <DemoCard label="Default table" testId="table-default">
          <Table.Root>
            <Table.Header>
              <Table.Row>
                <Table.Head>Name</Table.Head>
                <Table.Head>Status</Table.Head>
                <Table.Head>Role</Table.Head>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              <Table.Row>
                <Table.Cell>Alice</Table.Cell>
                <Table.Cell>Active</Table.Cell>
                <Table.Cell>Admin</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Bob</Table.Cell>
                <Table.Cell>Inactive</Table.Cell>
                <Table.Cell>Editor</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Carol</Table.Cell>
                <Table.Cell>Active</Table.Cell>
                <Table.Cell>Viewer</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Dave</Table.Cell>
                <Table.Cell>Active</Table.Cell>
                <Table.Cell>Editor</Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table.Root>
        </DemoCard>
      </Section>
    </div>
  )
}
