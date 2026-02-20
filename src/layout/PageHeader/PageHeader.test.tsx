import { render, screen } from '../../__test-utils__/render'
import { PageHeader } from './PageHeader'

describe('PageHeader', () => {
  it('renders without crashing', () => {
    render(<PageHeader testID="pageheader" />)
    expect(screen.getByTestId('pageheader')).toBeTruthy()
  })

  it('renders title text correctly', () => {
    render(
      <PageHeader testID="pageheader">
        <PageHeader.Body>
          <PageHeader.Title testID="title">Dashboard</PageHeader.Title>
        </PageHeader.Body>
      </PageHeader>,
    )
    expect(screen.getByTestId('title')).toBeTruthy()
    expect(screen.getByText('Dashboard')).toBeTruthy()
  })

  it('renders subtitle when provided', () => {
    render(
      <PageHeader testID="pageheader">
        <PageHeader.Body>
          <PageHeader.Title>Dashboard</PageHeader.Title>
          <PageHeader.Subtitle testID="subtitle">Overview of your data</PageHeader.Subtitle>
        </PageHeader.Body>
      </PageHeader>,
    )
    expect(screen.getByTestId('subtitle')).toBeTruthy()
  })

  it('does not render subtitle region when omitted', () => {
    render(
      <PageHeader testID="pageheader">
        <PageHeader.Body>
          <PageHeader.Title>Dashboard</PageHeader.Title>
        </PageHeader.Body>
      </PageHeader>,
    )
    expect(screen.queryByTestId('subtitle')).toBeNull()
  })

  it('renders Leading slot', () => {
    render(
      <PageHeader testID="pageheader">
        <PageHeader.Leading testID="leading">Back</PageHeader.Leading>
        <PageHeader.Body>
          <PageHeader.Title>Dashboard</PageHeader.Title>
        </PageHeader.Body>
      </PageHeader>,
    )
    expect(screen.getByTestId('leading')).toBeTruthy()
  })

  it('renders Trailing slot', () => {
    render(
      <PageHeader testID="pageheader">
        <PageHeader.Body>
          <PageHeader.Title>Dashboard</PageHeader.Title>
        </PageHeader.Body>
        <PageHeader.Trailing testID="trailing">
          <span>Action</span>
        </PageHeader.Trailing>
      </PageHeader>,
    )
    expect(screen.getByTestId('trailing')).toBeTruthy()
  })

  it('does not throw when all optional slots are omitted', () => {
    expect(() => render(<PageHeader testID="pageheader" />)).not.toThrow()
  })

  it('renders in dark theme without errors', () => {
    render(<PageHeader testID="pageheader-dark" />)
    expect(screen.getByTestId('pageheader-dark')).toBeTruthy()
  })
})
