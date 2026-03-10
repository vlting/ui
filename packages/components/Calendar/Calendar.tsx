import type React from 'react'
import { useCallback, useMemo, useState } from 'react'
import { styled } from '../../stl-react/src/config'

function ChevronLeftSvg() {
  return (
    <svg
      width={16}
      height={16}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 18l-6-6 6-6" />
    </svg>
  )
}

function ChevronRightSvg() {
  return (
    <svg
      width={16}
      height={16}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9 18l6-6-6-6" />
    </svg>
  )
}

const CalendarFrame = styled('div', { padding: '16px', userSelect: 'none' }, 'Calendar')

const CalendarHeader = styled(
  'div',
  {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: '16px',
    borderBottomWidth: '1px',
    borderBottomStyle: 'solid',
    borderBottomColor: 'var(--borderColor)',
    marginBottom: '8px',
  },
  'CalendarHeader',
)

const NavBtn = styled(
  'button',
  {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: 'none',
    backgroundColor: 'transparent',
    cursor: 'pointer',
    padding: '8px',
    borderRadius: '6px',
    fontFamily: 'inherit',
  },
  'CalendarNavBtn',
)

const DayHeaderRow = styled(
  'div',
  { display: 'flex', flexDirection: 'row' },
  'CalendarDayHeaders',
)

const WeekRow = styled(
  'div',
  { display: 'flex', flexDirection: 'row', gap: '4px' },
  'CalendarWeekRow',
)

const DayGrid = styled(
  'div',
  { display: 'flex', flexDirection: 'column', gap: '4px' },
  'CalendarDayGrid',
)

const DayBtn = styled(
  'button',
  {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '36px',
    height: '36px',
    borderRadius: '6px',
    border: 'none',
    backgroundColor: 'transparent',
    cursor: 'pointer',
    fontFamily: 'inherit',
    padding: '0',
    margin: '0',
  },
  'CalendarDayBtn',
)

const DAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']

function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate()
}

function getFirstDayOfMonth(year: number, month: number): number {
  return new Date(year, month, 1).getDay()
}

function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  )
}

function isToday(date: Date): boolean {
  return isSameDay(date, new Date())
}

export interface CalendarRootProps {
  children?: React.ReactNode
  selected?: Date | Date[] | null
  onSelect?: (date: Date) => void
  month?: Date
  onMonthChange?: (date: Date) => void
  disabled?: boolean
  minDate?: Date
  maxDate?: Date
  mode?: 'single' | 'range' | 'multiple'
}

export interface CalendarDayProps {
  date: Date
  isSelected: boolean
  isToday: boolean
  isDisabled: boolean
  isOutsideMonth: boolean
  onSelect?: (date: Date) => void
}

function Root({
  selected,
  onSelect,
  month: controlledMonth,
  onMonthChange,
  disabled,
  minDate,
  maxDate,
  mode: _mode = 'single',
}: CalendarRootProps) {
  const [internalMonth, setInternalMonth] = useState(() =>
    (controlledMonth ?? selected instanceof Date) ? (selected as Date) : new Date(),
  )
  const currentMonth = controlledMonth ?? internalMonth

  const year = currentMonth.getFullYear()
  const monthIndex = currentMonth.getMonth()

  const goToMonth = useCallback(
    (delta: number) => {
      const next = new Date(year, monthIndex + delta, 1)
      setInternalMonth(next)
      onMonthChange?.(next)
    },
    [year, monthIndex, onMonthChange],
  )

  const isDateDisabled = useCallback(
    (date: Date): boolean => {
      if (disabled) return true
      if (minDate && date < minDate) return true
      if (maxDate && date > maxDate) return true
      return false
    },
    [disabled, minDate, maxDate],
  )

  const isDateSelected = useCallback(
    (date: Date): boolean => {
      if (!selected) return false
      if (selected instanceof Date) return isSameDay(date, selected)
      if (Array.isArray(selected)) return selected.some((s) => isSameDay(date, s))
      return false
    },
    [selected],
  )

  const daysInMonth = getDaysInMonth(year, monthIndex)
  const firstDay = getFirstDayOfMonth(year, monthIndex)

  const weeks = useMemo(() => {
    const rows: Array<Array<{ date: Date; outsideMonth: boolean }>> = []
    let currentWeek: Array<{ date: Date; outsideMonth: boolean }> = []

    const prevMonthDays = getDaysInMonth(year, monthIndex - 1)
    for (let i = firstDay - 1; i >= 0; i--) {
      currentWeek.push({
        date: new Date(year, monthIndex - 1, prevMonthDays - i),
        outsideMonth: true,
      })
    }

    for (let day = 1; day <= daysInMonth; day++) {
      currentWeek.push({ date: new Date(year, monthIndex, day), outsideMonth: false })
      if (currentWeek.length === 7) {
        rows.push(currentWeek)
        currentWeek = []
      }
    }
    if (currentWeek.length > 0) {
      let nextDay = 1
      while (currentWeek.length < 7) {
        currentWeek.push({
          date: new Date(year, monthIndex + 1, nextDay++),
          outsideMonth: true,
        })
      }
      rows.push(currentWeek)
    }
    return rows
  }, [year, monthIndex, daysInMonth, firstDay])

  const monthName = new Date(year, monthIndex).toLocaleString('default', {
    month: 'long',
  })

  return (
    <CalendarFrame>
      <CalendarHeader>
        <NavBtn type="button" onClick={() => goToMonth(-1)} aria-label="Previous month">
          <ChevronLeftSvg />
        </NavBtn>
        <span
          style={{
            fontSize: 'var(--fontSize-4, 16px)',
            fontWeight: '500',
            fontFamily: 'var(--font-body)',
            color: 'var(--color)',
          }}
        >
          {monthName} {year}
        </span>
        <NavBtn type="button" onClick={() => goToMonth(1)} aria-label="Next month">
          <ChevronRightSvg />
        </NavBtn>
      </CalendarHeader>

      <DayHeaderRow>
        {DAYS.map((d) => (
          <div
            key={d}
            style={{
              width: 36,
              height: 36,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 'var(--fontSize-2, 12px)',
              color: 'var(--colorSubtitle)',
              fontFamily: 'var(--font-body)',
            }}
          >
            {d}
          </div>
        ))}
      </DayHeaderRow>

      <DayGrid>
        {weeks.map((week, wi) => (
          <WeekRow key={wi}>
            {week.map((entry, di) => {
              const { date, outsideMonth } = entry
              const sel = isDateSelected(date)
              const todayDate = isToday(date)
              const dateDisabled = isDateDisabled(date) || outsideMonth

              return (
                <DayBtn
                  key={`${date.getMonth()}-${date.getDate()}`}
                  type="button"
                  onClick={dateDisabled ? undefined : () => onSelect?.(date)}
                  disabled={dateDisabled}
                  aria-selected={sel}
                  aria-label={date.toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                  style={{
                    cursor: dateDisabled ? 'default' : 'pointer',
                    opacity: outsideMonth ? 0.4 : dateDisabled ? 0.3 : 1,
                    backgroundColor: sel ? 'var(--color10)' : 'transparent',
                    borderWidth: todayDate && !sel ? 1 : 0,
                    borderColor: todayDate && !sel ? 'var(--color8)' : 'transparent',
                    borderStyle: 'solid',
                  }}
                >
                  <span
                    style={{
                      fontSize: 'var(--fontSize-3, 14px)',
                      fontFamily: 'var(--font-body)',
                      fontWeight: todayDate ? '600' : '400',
                      color: sel
                        ? 'var(--color1)'
                        : outsideMonth
                          ? 'var(--color5)'
                          : 'var(--color)',
                    }}
                  >
                    {date.getDate()}
                  </span>
                </DayBtn>
              )
            })}
          </WeekRow>
        ))}
      </DayGrid>
    </CalendarFrame>
  )
}

export const Calendar = { Root }
