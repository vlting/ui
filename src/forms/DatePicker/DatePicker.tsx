import React, { useCallback, useMemo, useState } from 'react'
import { ChevronLeft, ChevronRight, Text, View, XStack, YStack } from '../_jsx-compat'

// ---------------------------------------------------------------------------
// Shared calendar helpers
// ---------------------------------------------------------------------------

export function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
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

function startOfMonth(year: number, month: number): Date {
  return new Date(year, month, 1)
}

function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate()
}

const WEEKDAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']
export const MONTH_NAMES = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

// ---------------------------------------------------------------------------
// Calendar grid
// ---------------------------------------------------------------------------

type DayCell = { date: Date; outOfMonth: boolean; disabled: boolean }

function buildCalendar(
  year: number,
  month: number,
  minDate?: Date,
  maxDate?: Date,
): DayCell[][] {
  const first = startOfMonth(year, month)
  const startDow = first.getDay() // 0=Sun
  const daysInMonth = getDaysInMonth(year, month)
  const prevMonthDays = getDaysInMonth(year, month - 1 < 0 ? 11 : month - 1)

  const cells: DayCell[] = []

  // Previous month tail
  for (let i = startDow - 1; i >= 0; i--) {
    const d = new Date(year, month - 1, prevMonthDays - i)
    cells.push({ date: d, outOfMonth: true, disabled: true })
  }

  // Current month
  for (let d = 1; d <= daysInMonth; d++) {
    const date = new Date(year, month, d)
    const disabled =
      (minDate !== undefined && date < minDate) ||
      (maxDate !== undefined && date > maxDate)
    cells.push({ date, outOfMonth: false, disabled })
  }

  // Next month filler to complete rows
  const remaining = 42 - cells.length
  for (let d = 1; d <= remaining; d++) {
    const date = new Date(year, month + 1, d)
    cells.push({ date, outOfMonth: true, disabled: true })
  }

  // Split into 6 rows of 7
  const rows: DayCell[][] = []
  for (let r = 0; r < 6; r++) {
    rows.push(cells.slice(r * 7, r * 7 + 7))
  }
  return rows
}

// ---------------------------------------------------------------------------
// Shared CalendarGrid sub-component
// ---------------------------------------------------------------------------

export type CalendarGridProps = {
  year: number
  month: number
  selected?: Date
  minDate?: Date
  maxDate?: Date
  onSelectDate: (date: Date) => void
  // Optional range highlight
  rangeStart?: Date
  rangeEnd?: Date
}

export function CalendarGrid({
  year,
  month,
  selected,
  minDate,
  maxDate,
  onSelectDate,
  rangeStart,
  rangeEnd,
}: CalendarGridProps) {
  const rows = useMemo(
    () => buildCalendar(year, month, minDate, maxDate),
    [year, month, minDate, maxDate],
  )

  function isInRange(date: Date): boolean {
    if (!rangeStart || !rangeEnd) return false
    const t = date.getTime()
    return t > rangeStart.getTime() && t < rangeEnd.getTime()
  }

  return (
    <YStack gap="$1">
      {/* Weekday headers */}
      <XStack>
        {WEEKDAYS.map((d) => (
          <View key={d} width={32} height={28} alignItems="center" justifyContent="center">
            <Text fontSize="$2" color="$color2" fontWeight="600">
              {d}
            </Text>
          </View>
        ))}
      </XStack>
      {/* Day rows */}
      {rows.map((row, ri) => (
        <XStack key={ri}>
          {row.map((cell, ci) => {
            const sel = selected ? isSameDay(cell.date, selected) : false
            const today = isToday(cell.date)
            const inRange = isInRange(cell.date)
            const bg = sel ? '$color10' : inRange ? '$backgroundHover' : undefined
            return (
              <View
                key={ci}
                width={32}
                height={32}
                borderRadius={16}
                alignItems="center"
                justifyContent="center"
                backgroundColor={bg}
                borderWidth={!sel && today ? 1 : 0}
                borderColor={!sel && today ? '$borderColor' : undefined}
                opacity={cell.disabled ? 0.4 : 1}
                onPress={!cell.disabled ? () => onSelectDate(cell.date) : undefined}
                role="gridcell"
                aria-selected={sel}
                aria-current={today ? 'date' : undefined}
              >
                <Text
                  fontSize="$3"
                  color={
                    sel
                      ? '$color1'
                      : cell.outOfMonth || cell.disabled
                        ? '$color3'
                        : '$color'
                  }
                >
                  {cell.date.getDate()}
                </Text>
              </View>
            )
          })}
        </XStack>
      ))}
    </YStack>
  )
}

// ---------------------------------------------------------------------------
// DatePicker
// ---------------------------------------------------------------------------

export type DatePickerProps = {
  value?: Date
  onChange?: (date: Date) => void
  minDate?: Date
  maxDate?: Date
  disabled?: boolean
  placeholder?: string
  testID?: string
}

export function DatePicker({
  value,
  onChange,
  minDate,
  maxDate,
  disabled = false,
  placeholder = 'Select date…',
  testID,
}: DatePickerProps) {
  const today = new Date()
  const [open, setOpen] = useState(false)
  const [viewYear, setViewYear] = useState(value?.getFullYear() ?? today.getFullYear())
  const [viewMonth, setViewMonth] = useState(value?.getMonth() ?? today.getMonth())

  const prevMonth = useCallback(() => {
    setViewMonth((m) => {
      if (m === 0) {
        setViewYear((y) => y - 1)
        return 11
      }
      return m - 1
    })
  }, [])

  const nextMonth = useCallback(() => {
    setViewMonth((m) => {
      if (m === 11) {
        setViewYear((y) => y + 1)
        return 0
      }
      return m + 1
    })
  }, [])

  const handleSelect = useCallback(
    (date: Date) => {
      onChange?.(date)
      setOpen(false)
    },
    [onChange],
  )

  const label = value ? formatDate(value) : placeholder

  return (
    <YStack testID={testID}>
      <View
        paddingHorizontal="$3"
        paddingVertical="$2"
        borderRadius="$3"
        borderWidth={1}
        borderColor="$borderColor"
        backgroundColor="$background"
        minHeight="$4"
        alignItems="center"
        flexDirection="row"
        opacity={disabled ? 0.5 : 1}
        onPress={() => !disabled && setOpen((o) => !o)}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-disabled={disabled}
      >
        <Text fontSize="$4" color={value ? '$color' : '$placeholderColor'} flex={1}>
          {label}
        </Text>
      </View>

      {open && (
        <YStack
          marginTop="$1"
          padding="$3"
          backgroundColor="$background"
          borderWidth={1}
          borderColor="$borderColor"
          borderRadius="$3"
          role="dialog"
          aria-label="Choose date"
          zIndex={100}
          position="absolute"
          top="$8"
          left={0}
          right={0}
        >
          {/* Month navigation header */}
          <XStack alignItems="center" justifyContent="space-between" marginBottom="$2">
            <View onPress={prevMonth}>
              <ChevronLeft size={20} color="$color" />
            </View>
            <Text fontSize="$4" fontWeight="600" color="$color">
              {MONTH_NAMES[viewMonth]} {viewYear}
            </Text>
            <View onPress={nextMonth}>
              <ChevronRight size={20} color="$color" />
            </View>
          </XStack>

          <CalendarGrid
            year={viewYear}
            month={viewMonth}
            selected={value}
            minDate={minDate}
            maxDate={maxDate}
            onSelectDate={handleSelect}
          />
        </YStack>
      )}
    </YStack>
  )
}
