import type React from 'react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { styled } from '../../stl-react/src/config'

// ─── Calendar utilities (no external deps) ─────────────────────────

function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate()
}

function getFirstDayOfWeek(year: number, month: number): number {
  return new Date(year, month, 1).getDay()
}

function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  )
}

function isDateDisabled(date: Date, minDate?: Date, maxDate?: Date): boolean {
  if (
    minDate &&
    date < new Date(minDate.getFullYear(), minDate.getMonth(), minDate.getDate())
  )
    return true
  if (
    maxDate &&
    date > new Date(maxDate.getFullYear(), maxDate.getMonth(), maxDate.getDate())
  )
    return true
  return false
}

function formatDate(date: Date, locale = 'en-US'): string {
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(date)
}

function getMonthName(year: number, month: number, locale = 'en-US'): string {
  return new Intl.DateTimeFormat(locale, { month: 'long', year: 'numeric' }).format(
    new Date(year, month, 1),
  )
}

function getWeekdayNames(locale = 'en-US'): string[] {
  const base = new Date(2024, 0, 7)
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(base)
    d.setDate(base.getDate() + i)
    return new Intl.DateTimeFormat(locale, { weekday: 'narrow' }).format(d)
  })
}

// ─── Styled primitives ─────────────────────────────────────────────

const TriggerFrame = styled(
  'button',
  {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'var(--borderColor)',
    borderRadius: 'var(--stl-radius3, 8px)',
    cursor: 'pointer',
    backgroundColor: 'var(--stl-background, #fff)',
    gap: 'var(--stl-space4, 8px)',
    fontFamily: 'inherit',
    margin: '0',
  },
  {
    size: {
      sm: {
        paddingTop: 'var(--stl-space2, 4px)',
        paddingBottom: 'var(--stl-space2, 4px)',
        paddingLeft: 'var(--stl-space5, 12px)',
        paddingRight: 'var(--stl-space5, 12px)',
        height: 'var(--stl-space10, 28px)',
      },
      md: {
        paddingTop: 'var(--stl-space4, 8px)',
        paddingBottom: 'var(--stl-space4, 8px)',
        paddingLeft: 'var(--stl-space7, 16px)',
        paddingRight: 'var(--stl-space7, 16px)',
        height: 'var(--stl-space12, 36px)',
      },
      lg: {
        paddingTop: 'var(--stl-space5, 12px)',
        paddingBottom: 'var(--stl-space5, 12px)',
        paddingLeft: 'var(--stl-space8, 20px)',
        paddingRight: 'var(--stl-space8, 20px)',
        height: 'var(--stl-space13, 40px)',
      },
    },
    hasError: {
      true: { borderColor: 'var(--red10)' },
    },
    isDisabled: {
      true: { opacity: '0.5', cursor: 'not-allowed', pointerEvents: 'none' },
    },
  },
  'DatePickerTrigger',
)

const TriggerText = styled(
  'span',
  {
    fontFamily: 'var(--font-body)',
    flex: '1',
  },
  {
    isPlaceholder: {
      true: { color: 'var(--colorSubtitle)' },
      false: { color: 'var(--color)' },
    },
    size: {
      sm: { fontSize: 'var(--fontSize-2, 12px)' },
      md: { fontSize: 'var(--fontSize-3, 14px)' },
      lg: { fontSize: 'var(--fontSize-4, 16px)' },
    },
  },
  'DatePickerTriggerText',
)

const CalendarDropdown = styled(
  'div',
  {
    position: 'absolute',
    top: '100%',
    left: '0',
    zIndex: '10',
    marginTop: 'var(--stl-space2, 4px)',
    backgroundColor: 'var(--stl-background, #fff)',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'var(--borderColor)',
    borderRadius: 'var(--stl-radius3, 8px)',
    padding: 'var(--stl-space5, 12px)',
    boxShadow: 'var(--stl-shadow-md, 0 4px 6px -1px rgba(0,0,0,0.1))',
  },
  'DatePickerDropdown',
)

const DayCell = styled(
  'button',
  {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 'var(--stl-space12, 36px)',
    height: 'var(--stl-space12, 36px)',
    borderRadius: 'var(--stl-radius2, 6px)',
    border: 'none',
    backgroundColor: 'transparent',
    cursor: 'pointer',
    fontFamily: 'inherit',
    padding: '0',
    margin: '0',
  },
  'DatePickerDayCell',
)

const NavButton = styled(
  'button',
  {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 'var(--stl-space10, 28px)',
    height: 'var(--stl-space10, 28px)',
    borderRadius: 'var(--stl-radius2, 6px)',
    border: 'none',
    backgroundColor: 'transparent',
    cursor: 'pointer',
    fontFamily: 'inherit',
    padding: '0',
    margin: '0',
  },
  'DatePickerNavButton',
)

// ─── Calendar Component ─────────────────────────────────────────────

interface CalendarProps {
  viewYear: number
  viewMonth: number
  onMonthChange: (year: number, month: number) => void
  selectedDate?: Date
  onSelectDate: (date: Date) => void
  minDate?: Date
  maxDate?: Date
  locale?: string
  today: Date
  rangeStart?: Date
  rangeEnd?: Date
}

function Calendar({
  viewYear,
  viewMonth,
  onMonthChange,
  selectedDate,
  onSelectDate,
  minDate,
  maxDate,
  locale = 'en-US',
  today,
  rangeStart,
  rangeEnd,
}: CalendarProps) {
  const weekdays = getWeekdayNames(locale)
  const daysInMonth = getDaysInMonth(viewYear, viewMonth)
  const firstDay = getFirstDayOfWeek(viewYear, viewMonth)

  const prevMonth = () => {
    if (viewMonth === 0) onMonthChange(viewYear - 1, 11)
    else onMonthChange(viewYear, viewMonth - 1)
  }

  const nextMonth = () => {
    if (viewMonth === 11) onMonthChange(viewYear + 1, 0)
    else onMonthChange(viewYear, viewMonth + 1)
  }

  const days: (number | null)[] = []
  for (let i = 0; i < firstDay; i++) days.push(null)
  for (let d = 1; d <= daysInMonth; d++) days.push(d)

  const weeks: (number | null)[][] = []
  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7))
  }
  const lastRow = weeks[weeks.length - 1]
  while (lastRow && lastRow.length < 7) lastRow.push(null)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6, minWidth: 260 }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 4px',
        }}
      >
        <NavButton type="button" onClick={prevMonth} aria-label="Previous month">
          <span
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--fontSize-4, 16px)',
              color: 'var(--color)',
            }}
          >
            ‹
          </span>
        </NavButton>
        <span
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--fontSize-3, 14px)',
            fontWeight: '500',
            color: 'var(--color)',
          }}
        >
          {getMonthName(viewYear, viewMonth, locale)}
        </span>
        <NavButton type="button" onClick={nextMonth} aria-label="Next month">
          <span
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--fontSize-4, 16px)',
              color: 'var(--color)',
            }}
          >
            ›
          </span>
        </NavButton>
      </div>

      <div style={{ display: 'flex' }}>
        {weekdays.map((wd, i) => (
          <div
            key={i}
            style={{
              width: 36,
              height: 24,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--fontSize-1, 11px)',
                color: 'var(--colorSubtitle)',
                fontWeight: '500',
              }}
            >
              {wd}
            </span>
          </div>
        ))}
      </div>

      {weeks.map((week, wi) => (
        <div key={wi} style={{ display: 'flex' }}>
          {week.map((day, di) => {
            if (day === null) {
              return <div key={di} style={{ width: 36, height: 36 }} />
            }

            const date = new Date(viewYear, viewMonth, day)
            const isSelected = selectedDate ? isSameDay(date, selectedDate) : false
            const isTodayDate = isSameDay(date, today)
            const disabled = isDateDisabled(date, minDate, maxDate)

            const isRangeStart = rangeStart ? isSameDay(date, rangeStart) : false
            const isRangeEnd = rangeEnd ? isSameDay(date, rangeEnd) : false
            const isInRange =
              rangeStart && rangeEnd && date > rangeStart && date < rangeEnd

            const showSelected = isSelected || isRangeStart || isRangeEnd

            return (
              <DayCell
                key={di}
                type="button"
                onClick={() => onSelectDate(date)}
                aria-label={`${day}`}
                aria-selected={isSelected || undefined}
                style={{
                  backgroundColor: showSelected
                    ? 'var(--color10)'
                    : isInRange
                      ? 'var(--color4)'
                      : 'transparent',
                  borderWidth: isTodayDate && !showSelected ? 1 : 0,
                  borderColor:
                    isTodayDate && !showSelected ? 'var(--color8)' : 'transparent',
                  borderStyle: 'solid',
                  opacity: disabled ? 0.3 : 1,
                  cursor: disabled ? 'not-allowed' : 'pointer',
                  pointerEvents: disabled ? 'none' : undefined,
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--fontSize-2, 12px)',
                    color: showSelected ? 'var(--color1)' : 'var(--color)',
                  }}
                >
                  {day}
                </span>
              </DayCell>
            )
          })}
        </div>
      ))}
    </div>
  )
}

// ─── DatePicker ─────────────────────────────────────────────────────

export interface DatePickerProps {
  value?: Date
  defaultValue?: Date
  onValueChange?: (date: Date | undefined) => void
  placeholder?: string
  label?: string
  helperText?: string
  error?: boolean
  errorMessage?: string
  disabled?: boolean
  size?: 'sm' | 'md' | 'lg'
  minDate?: Date
  maxDate?: Date
  locale?: string
  closeOnSelect?: boolean
}

function DatePickerRoot({
  value,
  defaultValue,
  onValueChange,
  placeholder = 'Select date...',
  label,
  helperText,
  error,
  errorMessage,
  disabled,
  size = 'md',
  minDate,
  maxDate,
  locale = 'en-US',
  closeOnSelect = false,
}: DatePickerProps) {
  const [internalValue, setInternalValue] = useState<Date | undefined>(defaultValue)
  const selectedDate = value !== undefined ? value : internalValue
  const today = new Date()

  const [open, setOpen] = useState(false)
  const [viewYear, setViewYear] = useState((selectedDate ?? today).getFullYear())
  const [viewMonth, setViewMonth] = useState((selectedDate ?? today).getMonth())

  const containerRef = useRef<HTMLDivElement>(null)

  const handleSelect = useCallback(
    (date: Date) => {
      if (value === undefined) setInternalValue(date)
      onValueChange?.(date)
      if (closeOnSelect) setOpen(false)
    },
    [value, onValueChange, closeOnSelect],
  )

  const handleMonthChange = useCallback((year: number, month: number) => {
    setViewYear(year)
    setViewMonth(month)
  }, [])

  useEffect(() => {
    if (!open) return
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [open])

  useEffect(() => {
    if (!open) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [open])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      {label && (
        <span
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--fontSize-2, 12px)',
            fontWeight: '500',
            color: 'var(--color)',
          }}
        >
          {label}
        </span>
      )}
      <div style={{ position: 'relative' }} ref={containerRef}>
        <TriggerFrame
          type="button"
          hasError={error ? true : undefined}
          isDisabled={disabled ? true : undefined}
          size={size}
          onClick={() => setOpen((o) => !o)}
          aria-label={label ?? placeholder}
          aria-expanded={open}
        >
          <TriggerText isPlaceholder={!selectedDate} size={size}>
            {selectedDate ? formatDate(selectedDate, locale) : placeholder}
          </TriggerText>
          <span
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--fontSize-3, 14px)',
              color: 'var(--colorSubtitle)',
            }}
          >
            ▾
          </span>
        </TriggerFrame>

        {open && (
          <CalendarDropdown>
            <Calendar
              viewYear={viewYear}
              viewMonth={viewMonth}
              onMonthChange={handleMonthChange}
              selectedDate={selectedDate}
              onSelectDate={handleSelect}
              minDate={minDate}
              maxDate={maxDate}
              locale={locale}
              today={today}
            />
          </CalendarDropdown>
        )}
      </div>
      {error && errorMessage && (
        <span
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--fontSize-1, 11px)',
            color: 'var(--red10)',
          }}
        >
          {errorMessage}
        </span>
      )}
      {helperText && !error && (
        <span
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--fontSize-1, 11px)',
            color: 'var(--colorSubtitle)',
          }}
        >
          {helperText}
        </span>
      )}
    </div>
  )
}

export const DatePicker = DatePickerRoot
