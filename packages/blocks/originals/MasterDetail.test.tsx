import { render, screen } from '../../../src/__test-utils__/render'
import { MasterDetail } from './MasterDetail'

describe('MasterDetail', () => {
  it('renders without crashing', () => {
    expect(() => render(<MasterDetail masterContent={<span>List</span>} />)).not.toThrow()
  })

  it('renders master content', () => {
    render(<MasterDetail masterContent={<span>Item List</span>} />)
    expect(screen.getByText('Item List')).toBeDefined()
  })

  it('renders detail content', () => {
    render(
      <MasterDetail
        masterContent={<span>List</span>}
        detailContent={<span>Detail View</span>}
      />,
    )
    expect(screen.getByText('Detail View')).toBeDefined()
  })

  it('renders master header when provided', () => {
    render(
      <MasterDetail
        masterContent={<span>List</span>}
        masterHeader={<span>Inbox</span>}
      />,
    )
    expect(screen.getByText('Inbox')).toBeDefined()
  })

  it('renders detail header when provided', () => {
    render(
      <MasterDetail
        masterContent={<span>List</span>}
        detailContent={<span>Detail</span>}
        detailHeader={<span>Message</span>}
      />,
    )
    expect(screen.getByText('Message')).toBeDefined()
  })

  it('renders back button when showDetail and onBack provided', () => {
    render(
      <MasterDetail
        masterContent={<span>List</span>}
        detailContent={<span>Detail</span>}
        showDetail
        onBack={jest.fn()}
      />,
    )
    expect(screen.getByText('← Back')).toBeDefined()
  })

  it('renders detail content when showDetail is true', () => {
    render(
      <MasterDetail
        masterContent={<span>List</span>}
        detailContent={<span>Detail Panel</span>}
        showDetail
      />,
    )
    expect(screen.getByText('Detail Panel')).toBeDefined()
  })

  it('renders master content when showDetail is false', () => {
    render(
      <MasterDetail
        masterContent={<span>Master List</span>}
        detailContent={<span>Detail</span>}
        showDetail={false}
      />,
    )
    expect(screen.getByText('Master List')).toBeDefined()
  })
})
