import React, { useState, useRef, useEffect, useCallback } from 'react'
import { Text, XStack, YStack, View, styled } from 'tamagui'

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
  if (minDate && date < new Date(minDate.getFullYear(), minDate.getMonth(), minDate.getDate())) {
    return true
  }
  if (maxDate && date > new Date(maxDate.getFullYear(), maxDate.getMonth(), maxDate.getDate())) {
    return true
  }
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
  const base = new Date(2024, 0, 7) // a known Sunday
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(base)
    d.setDate(base.getDate() + i)
    return new Intl.DateTimeFormat(locale, { weekday: 'narrow' }).format(d)
  })
}

// ─── Styled primitives ─────────────────────────────────────────────

// @ts-expect-error Tamagui v2 RC
const TriggerFrame = styled(XStack, {
  alignItems: 'center',
  borderWidth: 1,
  borderColor: '$borderColor',
  borderRadius: '$4',
  cursor: 'pointer',
  backgroundColor: '$background',
  gap: '$2',

  hoverStyle: {
    borderColor: '$color8',
  },

  focusStyle: {
    outlineWidth: 2,
    outlineOffset: 1,
    outlineColor: '$outlineColor',
    outlineStyle: 'solid',
  },

  variants: {
    hasError: {
      true: {
        borderColor: '$red10',
      },
    },
    isDisabled: {
      true: {
        opacity: 0.5,
        cursor: 'not-allowed',
        pointerEvents: 'none',
      },
    },
    size: {
      sm: {
        paddingVertical: '$1',
        paddingHorizontal: '$3',
        height: '$3.5',
      },
      md: {
        paddingVertical: '$2',
        paddingHorizontal: '$4',
        height: '$4',
      },
      lg: {
        paddingVertical: '$3',
        paddingHorizontal: '$5',
        height: '$4.5',
      },
    },
  } as const,

  defaultVariants: {
    size: 'md',
  },
})

// @ts-expect-error Tamagui v2 RC
const TriggerText = styled(Text, {
  fontFamily: '$body',
  flex: 1,

  variants: {
    isPlaceholder: {
      true: { color: '$colorSubtitle' },
      false: { color: '$color' },
    },
    size: {
      sm: { fontSize: '$2' },
      md: { fontSize: '$3' },
      lg: { fontSize: '$4' },
    },
  } as const,

  defaultVariants: {
    isPlaceholder: false,
    size: 'md',
  },
})

// @ts-expect-error Tamagui v2 RC
const CalendarDropdown = styled(YStack, {
  position: 'absolute',
  top: '100%',
  left: 0,
  zIndex: 100,
  marginTop: '$1',
  backgroundColor: '$background',
  borderWidth: 1,
  borderColor: '$borderColor',
  borderRadius: '$4',
  padding: '$3',
  // @ts-expect-error web shadow
  style: {
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
  },
})

// @ts-expect-error Tamagui v2 RC
const DayCell = styled(XStack, {
  alignItems: 'center',
  justifyContent: 'center',
  width: 36,
  height: 36,
  borderRadius: '$3',
  cursor: 'pointer',

  hoverStyle: {
    backgroundColor: '$backgroundHover',
  },

  variants: {
    selected: {
      true: {
        backgroundColor: '$color10',
      },
    },
    isToday: {
      true: {
        borderWidth: 1,
        borderColor: '$color8',
      },
    },
    isDisabled: {
      true: {
        opacity: 0.3,
        cursor: 'not-allowed',
        pointerEvents: 'none',
      },
    },
    inRange: {
      true: {
        backgroundColor: '$color4',
        borderRadius: 0,
      },
    },
  } as const,
})

// @ts-expect-error Tamagui v2 RC
const DayText = styled(Text, {
  fontFamily: '$body',
  fontSize: '$2',
  textAlign: 'center',

  variants: {
    selected: {
      true: { color: '$color1' },
      false: { color: '$color' },
    },
  } as const,

  defaultVariants: {
    selected: false,
  },
})

// @ts-expect-error Tamagui v2 RC
const NavButton = styled(XStack, {
  alignItems: 'center',
  justifyContent: 'center',
  width: 32,
  height: 32,
  borderRadius: '$3',
  cursor: 'pointer',

  hoverStyle: {
    backgroundColor: '$backgroundHover',
  },

  pressStyle: {
    opacity: 0.85,
  },
})

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
    <YStack gap="$1.5" minWidth={260}>
      <XStack alignItems="center" justifyContent="space-between" paddingHorizontal="$1">
        {showNav === 'left' || showNav === 'both' ? (
          <NavButton onPress={onPrev} accessibilityRole="button" aria-label="Previous month">
            <Text fontFamily="$body" fontSize="$4" color="$color">
              ‹
            </Text>
          </NavButton>
        ) : (
          <View width={32} />
        )}
        <Text fontFamily="$body" fontSize="$3" fontWeight="$3" color="$color">
          {getMonthName(viewYear, viewMonth, locale)}
        </Text>
        {showNav === 'right' || showNav === 'both' ? (
          <NavButton onPress={onNext} accessibilityRole="button" aria-label="Next month">
            <Text fontFamily="$body" fontSize="$4" color="$color">
              ›
            </Text>
          </NavButton>
        ) : (
          <View width={32} />
        )}
      </XStack>

      <XStack>
        {weekdays.map((wd, i) => (
          <View key={i} width={36} height={24} alignItems="center" justifyContent="center">
            <Text fontFamily="$body" fontSize="$1" color="$colorSubtitle" fontWeight="$3">
              {wd}
            </Text>
          </View>
        ))}
      </XStack>

      {weeks.map((week, wi) => (
        <XStack key={wi}>
          {week.map((day, di) => {
            if (day === null) {
              return <View key={di} width={36} height={36} />
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
              // @ts-expect-error Tamagui v2 RC
              <DayCell
                key={di}
                selected={showSelected}
                isToday={isTodayDate && !showSelected}
                isDisabled={disabled}
                inRange={!!isInRange && !showSelected}
                onPress={() => onSelectDate(date)}
                accessibilityRole="button"
                aria-label={`${day}`}
                aria-selected={showSelected || undefined}
              >
                {/* @ts-expect-error Tamagui v2 RC */}
                <DayText selected={showSelected}>{day}</DayText>
              </DayCell>
            )
          })}
        </XStack>
      ))}
    </YStack>
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
  const [viewYear, setViewYear] = useState(
    (selectedRange?.start ?? today).getFullYear(),
  )
  const [viewMonth, setViewMonth] = useState(
    (selectedRange?.start ?? today).getMonth(),
  )

  // Selection state: first click sets start, second click sets end
  const [pickingStart, setPickingStart] = useState<Date | undefined>(undefined)

  const containerRef = useRef<HTMLDivElement>(null)

  const handleSelect = useCallback(
    (date: Date) => {
      if (!pickingStart) {
        // First click — set start
        setPickingStart(date)
      } else {
        // Second click — set range
        let start = pickingStart
        let end = date
        if (end < start) {
          // Swap if clicked before start
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
      let newMonth = m + delta
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

  // Second month
  let secondYear = viewYear
  let secondMonth = viewMonth + 1
  if (secondMonth > 11) {
    secondYear += 1
    secondMonth = 0
  }

  // Close on click outside
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

  // Close on Escape
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
    <YStack gap="$1.5">
      {label && (
        <Text fontFamily="$body" fontSize="$2" fontWeight="$3" color="$color">
          {label}
        </Text>
      )}
      <View position="relative" ref={containerRef as React.Ref<any>}>
        {/* @ts-expect-error Tamagui v2 RC */}
        <TriggerFrame
          hasError={error}
          isDisabled={disabled}
          size={size}
          onPress={() => {
            setOpen((o) => !o)
            if (!open) setPickingStart(undefined)
          }}
          accessibilityRole="button"
          aria-label={label ?? placeholder}
          aria-expanded={open}
          tag="button"
        >
          {/* @ts-expect-error Tamagui v2 RC */}
          <TriggerText isPlaceholder={!selectedRange} size={size}>
            {triggerLabel}
          </TriggerText>
          <Text fontFamily="$body" fontSize="$3" color="$colorSubtitle">
            ▾
          </Text>
        </TriggerFrame>

        {open && (
          <CalendarDropdown>
            <XStack gap="$4" flexWrap="wrap">
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
            </XStack>
          </CalendarDropdown>
        )}
      </View>
      {error && errorMessage && (
        <Text fontFamily="$body" fontSize="$1" color="$red10">
          {errorMessage}
        </Text>
      )}
      {helperText && !error && (
        <Text fontFamily="$body" fontSize="$1" color="$colorSubtitle">
          {helperText}
        </Text>
      )}
    </YStack>
  )
}

export const DateRangePicker = DateRangePickerRoot
