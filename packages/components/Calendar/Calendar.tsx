import { styledHtml } from '@tamagui/web'
import type { ComponentType } from 'react'
import type React from 'react'
import { useCallback, useMemo, useState } from 'react'
import { Text, View } from 'tamagui'

type AnyFC = ComponentType<Record<string, unknown>>
const ViewJsx = View as AnyFC
const TextJsx = Text as AnyFC

const NavBtn = styledHtml('button', {
  display: 'inline-flex',
  flexDirection: 'row',
  boxSizing: 'border-box',
  appearance: 'none',
  border: 'none',
  background: 'none',
  padding: 0,
  margin: 0,
  fontFamily: 'inherit',
  cursor: 'pointer',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '$3',
  hoverStyle: {
    backgroundColor: '$color2',
  },
  focusVisibleStyle: {
    outlineWidth: 2,
    outlineOffset: 2,
    outlineColor: '$outlineColor',
    outlineStyle: 'solid',
  },
} as any)
const NavBtnJsx = NavBtn as AnyFC

const DayBtn = styledHtml('button', {
  display: 'inline-flex',
  flexDirection: 'row',
  boxSizing: 'border-box',
  appearance: 'none',
  border: 'none',
  background: 'none',
  padding: 0,
  margin: 0,
  fontFamily: 'inherit',
  alignItems: 'center',
  justifyContent: 'center',
  width: '$3',
  height: '$3',
  borderRadius: '$3',
  focusVisibleStyle: {
    outlineWidth: 2,
    outlineOffset: 2,
    outlineColor: '$outlineColor',
    outlineStyle: 'solid',
  },
} as any)
const DayBtnJsx = DayBtn as AnyFC

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
    const rows: Array<Array<Date | null>> = []
    let currentWeek: Array<Date | null> = new Array(firstDay).fill(null)

    for (let day = 1; day <= daysInMonth; day++) {
      currentWeek.push(new Date(year, monthIndex, day))
      if (currentWeek.length === 7) {
        rows.push(currentWeek)
        currentWeek = []
      }
    }
    if (currentWeek.length > 0) {
      while (currentWeek.length < 7) currentWeek.push(null)
      rows.push(currentWeek)
    }
    return rows
  }, [year, monthIndex, daysInMonth, firstDay])

  const monthName = new Date(year, monthIndex).toLocaleString('default', {
    month: 'long',
  })

  return (
    <ViewJsx padding="$2" userSelect="none">
      {/* Header */}
      <ViewJsx
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        paddingBottom="$2"
      >
        <NavBtnJsx
          type="button"
          padding="$1"
          onClick={() => goToMonth(-1)}
          aria-label="Previous month"
        >
          <TextJsx fontSize="$4" color="$color">
            {'<'}
          </TextJsx>
        </NavBtnJsx>
        <TextJsx fontSize="$4" fontWeight="500" fontFamily="$body" color="$color">
          {monthName} {year}
        </TextJsx>
        <NavBtnJsx
          type="button"
          padding="$1"
          onClick={() => goToMonth(1)}
          aria-label="Next month"
        >
          <TextJsx fontSize="$4" color="$color">
            {'>'}
          </TextJsx>
        </NavBtnJsx>
      </ViewJsx>

      {/* Day headers */}
      <ViewJsx flexDirection="row">
        {DAYS.map((d) => (
          <ViewJsx
            key={d}
            width="$3"
            height="$3"
            alignItems="center"
            justifyContent="center"
          >
            <TextJsx fontSize="$2" color="$colorSubtitle" fontFamily="$body">
              {d}
            </TextJsx>
          </ViewJsx>
        ))}
      </ViewJsx>

      {/* Grid */}
      {weeks.map((week, wi) => (
        <ViewJsx key={wi} flexDirection="row">
          {week.map((date, di) => {
            if (!date) {
              return <ViewJsx key={`empty-${di}`} width="$3" height="$3" />
            }
            const selected = isDateSelected(date)
            const today = isToday(date)
            const dateDisabled = isDateDisabled(date)

            return (
              <DayBtnJsx
                key={date.getDate()}
                type="button"
                cursor={dateDisabled ? 'default' : 'pointer'}
                opacity={dateDisabled ? 0.3 : 1}
                backgroundColor={selected ? '$color10' : 'transparent'}
                hoverStyle={
                  dateDisabled
                    ? undefined
                    : { backgroundColor: selected ? '$color10' : '$color2' }
                }
                onClick={dateDisabled ? undefined : () => onSelect?.(date)}
                disabled={dateDisabled}
                aria-selected={selected}
                aria-label={date.toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                })}
              >
                <TextJsx
                  fontSize="$4"
                  fontFamily="$body"
                  fontWeight={today ? '600' : '400'}
                  color={selected ? '$color1' : '$color'}
                >
                  {date.getDate()}
                </TextJsx>
              </DayBtnJsx>
            )
          })}
        </ViewJsx>
      ))}
    </ViewJsx>
  )
}

export const Calendar = { Root }
