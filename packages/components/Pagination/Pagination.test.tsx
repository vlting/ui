import { fireEvent, render, screen } from '../../../src/__test-utils__/render'
import { Pagination } from './Pagination'

describe('Pagination', () => {
  it('renders page items', () => {
    render(
      <Pagination.Root defaultPage={1}>
        <Pagination.Content>
          <Pagination.Item value={1} />
          <Pagination.Item value={2} />
          <Pagination.Item value={3} />
        </Pagination.Content>
      </Pagination.Root>,
    )
    expect(screen.getByText('1')).toBeTruthy()
    expect(screen.getByText('2')).toBeTruthy()
    expect(screen.getByText('3')).toBeTruthy()
  })

  it('renders nav with aria-label', () => {
    const { container } = render(
      <Pagination.Root defaultPage={1}>
        <Pagination.Content>
          <Pagination.Item value={1} />
        </Pagination.Content>
      </Pagination.Root>,
    )
    const nav = container.querySelector('nav')
    expect(nav).toBeTruthy()
    expect(nav!.getAttribute('aria-label')).toBe('Pagination')
  })

  it('marks active page with aria-current', () => {
    const { container } = render(
      <Pagination.Root defaultPage={2}>
        <Pagination.Content>
          <Pagination.Item value={1} />
          <Pagination.Item value={2} />
          <Pagination.Item value={3} />
        </Pagination.Content>
      </Pagination.Root>,
    )
    const active = container.querySelector('[aria-current="page"]')
    expect(active).toBeTruthy()
    expect(active!.textContent).toBe('2')
  })

  it('clicking page item changes active page', () => {
    const onChange = jest.fn()
    render(
      <Pagination.Root defaultPage={1} onPageChange={onChange}>
        <Pagination.Content>
          <Pagination.Item value={1} />
          <Pagination.Item value={2} />
          <Pagination.Item value={3} />
        </Pagination.Content>
      </Pagination.Root>,
    )
    fireEvent.click(screen.getByText('3'))
    expect(onChange).toHaveBeenCalledWith(3)
  })

  it('previous button decrements page', () => {
    const onChange = jest.fn()
    render(
      <Pagination.Root defaultPage={3} onPageChange={onChange}>
        <Pagination.Content>
          <Pagination.Previous />
          <Pagination.Item value={1} />
          <Pagination.Item value={2} />
          <Pagination.Item value={3} />
        </Pagination.Content>
      </Pagination.Root>,
    )
    fireEvent.click(screen.getByLabelText('Previous page'))
    expect(onChange).toHaveBeenCalledWith(2)
  })

  it('next button increments page', () => {
    const onChange = jest.fn()
    render(
      <Pagination.Root defaultPage={1} onPageChange={onChange}>
        <Pagination.Content>
          <Pagination.Item value={1} />
          <Pagination.Item value={2} />
          <Pagination.Next />
        </Pagination.Content>
      </Pagination.Root>,
    )
    fireEvent.click(screen.getByLabelText('Next page'))
    expect(onChange).toHaveBeenCalledWith(2)
  })

  it('renders ellipsis', () => {
    render(
      <Pagination.Root defaultPage={5}>
        <Pagination.Content>
          <Pagination.Item value={1} />
          <Pagination.Ellipsis />
          <Pagination.Item value={5} />
          <Pagination.Ellipsis />
          <Pagination.Item value={10} />
        </Pagination.Content>
      </Pagination.Root>,
    )
    const ellipses = screen.getAllByText('\u2026')
    expect(ellipses).toHaveLength(2)
  })

  it('supports controlled page prop', () => {
    const onChange = jest.fn()
    render(
      <Pagination.Root page={2} onPageChange={onChange}>
        <Pagination.Content>
          <Pagination.Item value={1} />
          <Pagination.Item value={2} />
          <Pagination.Item value={3} />
        </Pagination.Content>
      </Pagination.Root>,
    )
    fireEvent.click(screen.getByText('3'))
    expect(onChange).toHaveBeenCalledWith(3)
  })

  it('disabled previous button is not clickable', () => {
    const onChange = jest.fn()
    render(
      <Pagination.Root defaultPage={1} onPageChange={onChange}>
        <Pagination.Content>
          <Pagination.Previous disabled />
          <Pagination.Item value={1} />
        </Pagination.Content>
      </Pagination.Root>,
    )
    fireEvent.click(screen.getByLabelText('Previous page'))
    expect(onChange).not.toHaveBeenCalled()
  })

  it('page items have aria-label', () => {
    render(
      <Pagination.Root defaultPage={1}>
        <Pagination.Content>
          <Pagination.Item value={1} />
          <Pagination.Item value={2} />
        </Pagination.Content>
      </Pagination.Root>,
    )
    expect(screen.getByLabelText('Page 1')).toBeTruthy()
    expect(screen.getByLabelText('Page 2')).toBeTruthy()
  })

  it('auto-disables previous at page 1', () => {
    const { container } = render(
      <Pagination.Root defaultPage={1}>
        <Pagination.Content>
          <Pagination.Previous />
          <Pagination.Item value={1} />
          <Pagination.Item value={2} />
        </Pagination.Content>
      </Pagination.Root>,
    )
    const prev = screen.getByLabelText('Previous page')
    expect(prev.hasAttribute('disabled')).toBe(true)
  })

  it('auto-disables next at totalPages', () => {
    render(
      <Pagination.Root defaultPage={3} totalPages={3}>
        <Pagination.Content>
          <Pagination.Item value={1} />
          <Pagination.Item value={2} />
          <Pagination.Item value={3} />
          <Pagination.Next />
        </Pagination.Content>
      </Pagination.Root>,
    )
    const next = screen.getByLabelText('Next page')
    expect(next.hasAttribute('disabled')).toBe(true)
  })

  it('next does not exceed totalPages', () => {
    const onChange = jest.fn()
    render(
      <Pagination.Root defaultPage={3} totalPages={3} onPageChange={onChange}>
        <Pagination.Content>
          <Pagination.Item value={1} />
          <Pagination.Item value={2} />
          <Pagination.Item value={3} />
          <Pagination.Next />
        </Pagination.Content>
      </Pagination.Root>,
    )
    fireEvent.click(screen.getByLabelText('Next page'))
    expect(onChange).not.toHaveBeenCalled()
  })
})
