import React from 'react'
import { render, screen } from '../../../src/__test-utils__/render'
import { Pagination } from './Pagination'

describe('Pagination', () => {
  it('renders without crashing', () => {
    expect(() =>
      render(
        <Pagination.Root currentPage={1} totalPages={5} onPageChange={() => {}}>
          <Pagination.Previous />
          <Pagination.Item page={1} />
          <Pagination.Item page={2} />
          <Pagination.Next />
        </Pagination.Root>
      )
    ).not.toThrow()
  })

  it('renders page items', () => {
    render(
      <Pagination.Root currentPage={1} totalPages={3} onPageChange={() => {}}>
        <Pagination.Item page={1}>1</Pagination.Item>
        <Pagination.Item page={2}>2</Pagination.Item>
        <Pagination.Item page={3}>3</Pagination.Item>
      </Pagination.Root>
    )
    expect(screen.getByText('1')).toBeTruthy()
    expect(screen.getByText('2')).toBeTruthy()
    expect(screen.getByText('3')).toBeTruthy()
  })

  it('renders ellipsis', () => {
    expect(() =>
      render(
        <Pagination.Root currentPage={5} totalPages={10} onPageChange={() => {}}>
          <Pagination.Item page={1}>1</Pagination.Item>
          <Pagination.Ellipsis />
          <Pagination.Item page={5}>5</Pagination.Item>
          <Pagination.Ellipsis />
          <Pagination.Item page={10}>10</Pagination.Item>
        </Pagination.Root>
      )
    ).not.toThrow()
  })

  it('renders previous and next navigation', () => {
    expect(() =>
      render(
        <Pagination.Root currentPage={2} totalPages={5} onPageChange={() => {}}>
          <Pagination.Previous />
          <Pagination.Item page={1}>1</Pagination.Item>
          <Pagination.Item page={2}>2</Pagination.Item>
          <Pagination.Next />
        </Pagination.Root>
      )
    ).not.toThrow()
  })

  it('renders size variants', () => {
    const sizes = ['sm', 'md', 'lg'] as const
    for (const size of sizes) {
      const { unmount } = render(
        <Pagination.Root currentPage={1} totalPages={3} onPageChange={() => {}} size={size}>
          <Pagination.Item page={1}>1</Pagination.Item>
        </Pagination.Root>
      )
      unmount()
    }
  })
})
