import { render, screen } from '../../__test-utils__/render'
import { ReminderItem } from './ReminderItem'

describe('ReminderItem', () => {
  it('renders without crashing', () => {
    render(<ReminderItem testID="reminderitem" />)
    expect(screen.getByTestId('reminderitem')).toBeTruthy()
  })
})
