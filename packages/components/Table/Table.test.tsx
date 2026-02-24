import React from 'react'
import { render, screen } from '../../../src/__test-utils__/render'
import { Table } from './Table'

describe('Table', () => {
  it('renders a native table element', () => {
    const { container } = render(
      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.Head>Name</Table.Head>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <Table.Row>
            <Table.Cell>Alice</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table.Root>
    )
    expect(container.querySelector('table')).toBeTruthy()
  })

  it('renders thead, tbody, tr, th, td elements', () => {
    const { container } = render(
      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.Head>Col 1</Table.Head>
            <Table.Head>Col 2</Table.Head>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <Table.Row>
            <Table.Cell>A</Table.Cell>
            <Table.Cell>B</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table.Root>
    )
    expect(container.querySelector('thead')).toBeTruthy()
    expect(container.querySelector('tbody')).toBeTruthy()
    expect(container.querySelectorAll('tr').length).toBe(2)
    expect(container.querySelectorAll('th').length).toBe(2)
    expect(container.querySelectorAll('td').length).toBe(2)
  })

  it('renders caption', () => {
    render(
      <Table.Root>
        <Table.Caption>User list</Table.Caption>
        <Table.Body>
          <Table.Row>
            <Table.Cell>Data</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table.Root>
    )
    expect(screen.getByText('User list')).toBeTruthy()
  })

  it('renders tfoot via Footer', () => {
    const { container } = render(
      <Table.Root>
        <Table.Body>
          <Table.Row>
            <Table.Cell>Data</Table.Cell>
          </Table.Row>
        </Table.Body>
        <Table.Footer>
          <Table.Row>
            <Table.Cell>Total</Table.Cell>
          </Table.Row>
        </Table.Footer>
      </Table.Root>
    )
    expect(container.querySelector('tfoot')).toBeTruthy()
  })

  it('renders cell content correctly', () => {
    render(
      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.Head>Name</Table.Head>
            <Table.Head>Age</Table.Head>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <Table.Row>
            <Table.Cell>Alice</Table.Cell>
            <Table.Cell>30</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Bob</Table.Cell>
            <Table.Cell>25</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table.Root>
    )
    expect(screen.getByText('Alice')).toBeTruthy()
    expect(screen.getByText('Bob')).toBeTruthy()
    expect(screen.getByText('30')).toBeTruthy()
  })
})
