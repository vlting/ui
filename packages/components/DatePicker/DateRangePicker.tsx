import type React from 'react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { styled } from '../../stl-react/src/config'

// ─── Calendar utilities (shared with DatePicker) ────────────────────

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
    borderRadius: '8px',
    cursor: 'pointer',
    backgroundColor: 'var(--stl-background, #fff)',
    gap: '8px',
    fontFamily: 'inherit',
    margin: '0',
  },
  {
    size: {
      sm: {
        paddingTop: '4px',
        paddingBottom: '4px',
        paddingLeft: '12px',
        paddingRight: '12px',
        height: '28px',
      },
      md: {
        paddingTop: '8px',
        paddingBottom: '8px',
        paddingLeft: '16px',
        paddingRight: '16px',
        height: '36px',
      },
      lg: {
        paddingTop: '12px',
        paddingBottom: '12px',
        paddingLeft: '20px',
        paddingRight: '20px',
        height: '40px',
      },
    },
    hasError: {
      true: { borderColor: 'var(--red10)' },
    },
    isDisabled: {
      true: { opacity: '0.5', cursor: 'not-allowed', pointerEvents: 'none' },
    },
  },
  'DateRangePickerTrigger',
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
  'DateRangePickerTriggerText',
)

const CalendarDropdown = styled(
  'div',
  {
    position: 'absolute',
    top: '100%',
    left: '0',
    zIndex: '10',
    marginTop: '4px',
    backgroundColor: 'var(--stl-background, #fff)',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'var(--borderColor)',
    borderRadius: '8px',
    padding: '12px',
    boxShadow: 'var(--stl-shadow-md, 0 4px 6px -1px rgba(0,0,0,0.1))',
  },
  'DateRangePickerDropdown',
)

const DayCell = styled(
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
  'DateRangePickerDayCell',
)

const NavButton = styled(
  'button',
  {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '28px',
    height: '28px',
    borderRadius: '6px',
    border: 'none',
    backgroundColor: 'transparent',
    cursor: 'pointer',
    fontFamily: 'inherit',
    padding: '0',
    margin: '0',
  },
  'DateRangePickerNavButton',
)

// ─── Month Calendar ─────────────────────────────────────────────────

interface MonthCalendarProps {
  viewYear: number
  viewMonth: number
  selectedStart?: Date
  selectedEnd?: Date
  onSelectDate: (date: Date) => void
  minDate?: Date
  maxDate?: Date
  locale?: string
  today: Date
  showNav?: 'left' | 'right' | 'both'
  onPrev?: () => void
  onNext?: () => void
}

function MonthCalendar({
  viewYear,
  viewMonth,
  selectedStart,
  selectedEnd,
  onSelectDate,
  minDate,
  maxDate,
  locale = 'en-US',
  today,
  showNav = 'both',
  onPrev,
  onNext,
}: MonthCalendarProps) {
  const weekdays = getWeekdayNames(locale)
  const daysInMonth = getDaysInMonth(viewYear, viewMonth)
  const firstDay = getFirstDayOfWeek(viewYear, viewMonth)

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
        {showNav === 'left' || showNav === 'both' ? (
          <NavButton type="button" onClick={onPrev} aria-label="Previous month">
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
        ) : (
          <div style={{ width: 28 }} />
        )}
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
        {showNav === 'right' || showNav === 'both' ? (
          <NavButton type="button" onClick={onNext} aria-label="Next month">
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
        ) : (
          <div style={{ width: 28 }} />
        )}
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
            const disabled = isDateDisabled(date, minDate, maxDate)
            const isTodayDate = isSameDay(date, today)

            const isStart = selectedStart ? isSameDay(date, selectedStart) : false
            const isEnd = selectedEnd ? isSameDay(date, selectedEnd) : false
            const isInRange =
              selectedStart && selectedEnd && date > selectedStart && date < selectedEnd

            const showSelected = isStart || isEnd

            return (
              <DayCell
                key={di}
                type="button"
                onClick={() => onSelectDate(date)}
                aria-label={`${day}`}
                aria-selected={showSelected || undefined}
                style={{
                  backgroundColor: showSelected
                    ? 'var(--color10)'
                    : isInRange
                      ? 'var(--color4)'
                      : 'transparent',
                  borderRadius: isInRange && !showSelected ? 0 : 6,
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

// ─── DateRangePicker ────────────────────────────────────────────────

export interface DateRangePickerProps {
  value?: { start: Date; end: Date } | undefined
  defaultValue?: { start: Date; end: Date }
  onValueChange?: (range: { start: Date; end: Date } | undefined) => void
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
}

function DateRangePickerRoot({
  value,
  defaultValue,
  onValueChange,
  placeholder = 'Select date range...',
  label,
  helperText,
  error,
  errorMessage,
  disabled,
  size = 'md',
  minDate,
  maxDate,
  locale = 'en-US',
}: DateRangePickerProps) {
  const [internalValue, setInternalValue] = useState<
    { start: Date; end: Date } | undefined
  >(defaultValue)
  const selectedRange = value !== undefined ? value : internalValue
  const today = new Date()

  const [open, setOpen] = useState(false)
  const [viewYear, setViewYear] = useState((selectedRange?.start ?? today).getFullYear())
  const [viewMonth, setViewMonth] = useState((selectedRange?.start ?? today).getMonth())

  const [pickingStart, setPickingStart] = useState<Date | undefined>(undefined)

  const containerRef = useRef<HTMLDivElement>(null)

  const handleSelect = useCallback(
    (date: Date) => {
      if (!pickingStart) {
        setPickingStart(date)
      } else {
        let start = pickingStart
        let end = date
        if (end < start) {
          ;[start, end] = [end, start]
        }
        const range = { start, end }
        if (value === undefined) setInternalValue(range)
        onValueChange?.(range)
        setPickingStart(undefined)
      }
    },
    [pickingStart, value, onValueChange],
  )

  const handleMonthChange = useCallback((delta: number) => {
    setViewMonth((m) => {
      const newMonth = m + delta
      if (newMonth < 0) {
        setViewYear((y) => y - 1)
        return 11
      }
      if (newMonth > 11) {
        setViewYear((y) => y + 1)
        return 0
      }
      return newMonth
    })
  }, [])

  let secondYear = viewYear
  let secondMonth = viewMonth + 1
  if (secondMonth > 11) {
    secondYear += 1
    secondMonth = 0
  }

  useEffect(() => {
    if (!open) return
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false)
        setPickingStart(undefined)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [open])

  useEffect(() => {
    if (!open) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        setPickingStart(undefined)
      }
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [open])

  const displayStart = pickingStart ?? selectedRange?.start
  const displayEnd = pickingStart ? undefined : selectedRange?.end

  const triggerLabel = selectedRange
    ? `${formatDate(selectedRange.start, locale)} – ${formatDate(selectedRange.end, locale)}`
    : placeholder

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
          onClick={() => {
            setOpen((o) => !o)
            if (!open) setPickingStart(undefined)
          }}
          aria-label={label ?? placeholder}
          aria-expanded={open}
        >
          <TriggerText isPlaceholder={!selectedRange} size={size}>
            {triggerLabel}
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
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              <MonthCalendar
                viewYear={viewYear}
                viewMonth={viewMonth}
                selectedStart={displayStart}
                selectedEnd={displayEnd}
                onSelectDate={handleSelect}
                minDate={minDate}
                maxDate={maxDate}
                locale={locale}
                today={today}
                showNav="left"
                onPrev={() => handleMonthChange(-1)}
              />
              <MonthCalendar
                viewYear={secondYear}
                viewMonth={secondMonth}
                selectedStart={displayStart}
                selectedEnd={displayEnd}
                onSelectDate={handleSelect}
                minDate={minDate}
                maxDate={maxDate}
                locale={locale}
                today={today}
                showNav="right"
                onNext={() => handleMonthChange(1)}
              />
            </div>
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

export const DateRangePicker = DateRangePickerRoot
