import React, { useState, useRef, useEffect, useCallback } from 'react'
import { Text, XStack, YStack, View, styled } from 'tamagui'

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
    outlineOffset: 2,
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
      },
    },
    rangeStart: {
      true: {
        backgroundColor: '$color10',
        borderTopLeftRadius: '$3',
        borderBottomLeftRadius: '$3',
      },
    },
    rangeEnd: {
      true: {
        backgroundColor: '$color10',
        borderTopRightRadius: '$3',
        borderBottomRightRadius: '$3',
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
  // Range support
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
  // Pad last row
  const lastRow = weeks[weeks.length - 1]
  while (lastRow && lastRow.length < 7) lastRow.push(null)

  return (
    <YStack gap="$1.5" minWidth={260}>
      {/* Header */}
      <XStack alignItems="center" justifyContent="space-between" paddingHorizontal="$1">
        <NavButton onPress={prevMonth} accessibilityRole="button" aria-label="Previous month">
          <Text fontFamily="$body" fontSize="$4" color="$color">
            ‹
          </Text>
        </NavButton>
        <Text fontFamily="$body" fontSize="$3" fontWeight="$3" color="$color">
          {getMonthName(viewYear, viewMonth, locale)}
        </Text>
        <NavButton onPress={nextMonth} accessibilityRole="button" aria-label="Next month">
          <Text fontFamily="$body" fontSize="$4" color="$color">
            ›
          </Text>
        </NavButton>
      </XStack>

      {/* Weekday headers */}
      <XStack>
        {weekdays.map((wd, i) => (
          <View key={i} width={36} height={24} alignItems="center" justifyContent="center">
            <Text fontFamily="$body" fontSize="$1" color="$colorSubtitle" fontWeight="$3">
              {wd}
            </Text>
          </View>
        ))}
      </XStack>

      {/* Day grid */}
      {weeks.map((week, wi) => (
        <XStack key={wi}>
          {week.map((day, di) => {
            if (day === null) {
              return <View key={di} width={36} height={36} />
            }

            const date = new Date(viewYear, viewMonth, day)
            const isSelected = selectedDate ? isSameDay(date, selectedDate) : false
            const isTodayDate = isSameDay(date, today)
            const disabled = isDateDisabled(date, minDate, maxDate)

            // Range state
            const isRangeStart = rangeStart ? isSameDay(date, rangeStart) : false
            const isRangeEnd = rangeEnd ? isSameDay(date, rangeEnd) : false
            const isInRange =
              rangeStart && rangeEnd && date > rangeStart && date < rangeEnd

            const showSelected = isSelected || isRangeStart || isRangeEnd

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
                aria-selected={isSelected || undefined}
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
}: DatePickerProps) {
  const [internalValue, setInternalValue] = useState<Date | undefined>(defaultValue)
  const selectedDate = value !== undefined ? value : internalValue
  const today = new Date()

  const [open, setOpen] = useState(false)
  const [viewYear, setViewYear] = useState(
    (selectedDate ?? today).getFullYear(),
  )
  const [viewMonth, setViewMonth] = useState(
    (selectedDate ?? today).getMonth(),
  )

  const containerRef = useRef<HTMLDivElement>(null)

  const handleSelect = useCallback(
    (date: Date) => {
      if (value === undefined) setInternalValue(date)
      onValueChange?.(date)
      setOpen(false)
    },
    [value, onValueChange],
  )

  const handleMonthChange = useCallback((year: number, month: number) => {
    setViewYear(year)
    setViewMonth(month)
  }, [])

  // Close on click outside
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

  // Close on Escape
  useEffect(() => {
    if (!open) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [open])

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
          onPress={() => setOpen((o) => !o)}
          accessibilityRole="button"
          aria-label={label ?? placeholder}
          aria-expanded={open}
          tag="button"
        >
          {/* @ts-expect-error Tamagui v2 RC */}
          <TriggerText isPlaceholder={!selectedDate} size={size}>
            {selectedDate ? formatDate(selectedDate, locale) : placeholder}
          </TriggerText>
          <Text fontFamily="$body" fontSize="$3" color="$colorSubtitle">
            ▾
          </Text>
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

export const DatePicker = DatePickerRoot
