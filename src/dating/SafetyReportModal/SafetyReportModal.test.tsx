import { fireEvent, render, screen } from '../../__test-utils__/render'
import { SafetyReportModal } from './SafetyReportModal'

describe('SafetyReportModal', () => {
  describe('rendering', () => {
    it('renders without crashing when open', () => {
      render(
        <SafetyReportModal
          open={true}
          onSubmit={() => {}}
          onCancel={() => {}}
          testID="report"
        />,
      )
      expect(screen.getByTestId('report')).toBeTruthy()
    })

    it('renders nothing when closed', () => {
      render(
        <SafetyReportModal
          open={false}
          onSubmit={() => {}}
          onCancel={() => {}}
          testID="report"
        />,
      )
      expect(screen.queryByTestId('report')).toBeNull()
    })

    it('displays "Report User" when no userName is given', () => {
      render(
        <SafetyReportModal
          open={true}
          onSubmit={() => {}}
          onCancel={() => {}}
          testID="report"
        />,
      )
      expect(screen.getByText('Report User')).toBeTruthy()
    })

    it('displays "Report {userName}" when userName is given', () => {
      render(
        <SafetyReportModal
          open={true}
          onSubmit={() => {}}
          onCancel={() => {}}
          userName="Jane"
          testID="report"
        />,
      )
      expect(screen.getByText('Report Jane')).toBeTruthy()
    })

    it('renders default report reasons', () => {
      render(
        <SafetyReportModal
          open={true}
          onSubmit={() => {}}
          onCancel={() => {}}
          testID="report"
        />,
      )
      expect(screen.getByText('Inappropriate messages')).toBeTruthy()
      expect(screen.getByText('Fake profile')).toBeTruthy()
      expect(screen.getByText('Harassment')).toBeTruthy()
      expect(screen.getByText('Spam')).toBeTruthy()
      expect(screen.getByText('Other')).toBeTruthy()
    })

    it('renders custom report reasons', () => {
      render(
        <SafetyReportModal
          open={true}
          onSubmit={() => {}}
          onCancel={() => {}}
          reportReasons={['Reason A', 'Reason B']}
          testID="report"
        />,
      )
      expect(screen.getByText('Reason A')).toBeTruthy()
      expect(screen.getByText('Reason B')).toBeTruthy()
      expect(screen.queryByText('Inappropriate messages')).toBeNull()
    })

    it('shows Submit and Cancel buttons', () => {
      render(
        <SafetyReportModal
          open={true}
          onSubmit={() => {}}
          onCancel={() => {}}
          testID="report"
        />,
      )
      expect(screen.getByText('Submit')).toBeTruthy()
      expect(screen.getByText('Cancel')).toBeTruthy()
    })
  })

  describe('controlled state', () => {
    it('calls onCancel when Cancel is pressed', () => {
      const onCancel = jest.fn()
      render(
        <SafetyReportModal
          open={true}
          onSubmit={() => {}}
          onCancel={onCancel}
          testID="report"
        />,
      )
      fireEvent.click(screen.getByTestId('report-cancel'))
      expect(onCancel).toHaveBeenCalledTimes(1)
    })

    it('submit is disabled until a reason is selected', () => {
      const onSubmit = jest.fn()
      render(
        <SafetyReportModal
          open={true}
          onSubmit={onSubmit}
          onCancel={() => {}}
          testID="report"
        />,
      )
      fireEvent.click(screen.getByTestId('report-submit'))
      expect(onSubmit).not.toHaveBeenCalled()
    })

    it('calls onSubmit with reason when reason is selected and Submit pressed', () => {
      const onSubmit = jest.fn()
      render(
        <SafetyReportModal
          open={true}
          onSubmit={onSubmit}
          onCancel={() => {}}
          testID="report"
        />,
      )
      fireEvent.click(screen.getByText('Harassment'))
      fireEvent.click(screen.getByTestId('report-submit'))
      expect(onSubmit).toHaveBeenCalledWith('Harassment', undefined)
    })

    it('shows details textarea after selecting a reason', () => {
      render(
        <SafetyReportModal
          open={true}
          onSubmit={() => {}}
          onCancel={() => {}}
          testID="report"
        />,
      )
      // Before selecting a reason, no details section
      expect(screen.queryByText('Additional details (optional)')).toBeNull()

      // Select a reason
      fireEvent.click(screen.getByText('Spam'))

      // Now details section should appear
      expect(screen.getByText('Additional details (optional)')).toBeTruthy()
    })

    it('shows loading spinner when isLoading', () => {
      render(
        <SafetyReportModal
          open={true}
          onSubmit={() => {}}
          onCancel={() => {}}
          isLoading={true}
          testID="report"
        />,
      )
      // Submit button should still render but be disabled
      const submitBtn = screen.getByTestId('report-submit')
      expect(submitBtn.getAttribute?.('aria-disabled')).toBe('true')
    })
  })

  describe('accessibility', () => {
    it('has role="dialog" on the container', () => {
      render(
        <SafetyReportModal
          open={true}
          onSubmit={() => {}}
          onCancel={() => {}}
          testID="report"
        />,
      )
      const el = screen.getByTestId('report')
      expect(el.getAttribute?.('role')).toBe('dialog')
    })

    it('has aria-modal="true"', () => {
      render(
        <SafetyReportModal
          open={true}
          onSubmit={() => {}}
          onCancel={() => {}}
          testID="report"
        />,
      )
      const el = screen.getByTestId('report')
      expect(el.getAttribute?.('aria-modal')).toBe('true')
    })

    it('has aria-label with the title', () => {
      render(
        <SafetyReportModal
          open={true}
          onSubmit={() => {}}
          onCancel={() => {}}
          userName="Alex"
          testID="report"
        />,
      )
      const el = screen.getByTestId('report')
      expect(el.getAttribute?.('aria-label')).toBe('Report Alex')
    })

    it('reason options have role="radio"', () => {
      render(
        <SafetyReportModal
          open={true}
          onSubmit={() => {}}
          onCancel={() => {}}
          testID="report"
        />,
      )
      const radios = screen.getAllByRole('radio')
      expect(radios.length).toBe(5)
    })

    it('selected reason has aria-checked="true"', () => {
      render(
        <SafetyReportModal
          open={true}
          onSubmit={() => {}}
          onCancel={() => {}}
          testID="report"
        />,
      )
      fireEvent.click(screen.getByText('Harassment'))
      const harassmentRadio = screen.getByLabelText('Harassment')
      expect(harassmentRadio.getAttribute?.('aria-checked')).toBe('true')
    })

    it('unselected reasons have aria-checked="false"', () => {
      render(
        <SafetyReportModal
          open={true}
          onSubmit={() => {}}
          onCancel={() => {}}
          testID="report"
        />,
      )
      fireEvent.click(screen.getByText('Harassment'))
      const spamRadio = screen.getByLabelText('Spam')
      expect(spamRadio.getAttribute?.('aria-checked')).toBe('false')
    })
  })

  describe('keyboard interaction', () => {
    it('calls onCancel when Escape key is pressed', () => {
      const onCancel = jest.fn()
      render(
        <SafetyReportModal
          open={true}
          onSubmit={() => {}}
          onCancel={onCancel}
          testID="report"
        />,
      )
      // Simulate Escape key
      const event = new KeyboardEvent('keydown', { key: 'Escape' })
      window.dispatchEvent(event)
      expect(onCancel).toHaveBeenCalledTimes(1)
    })
  })
})
