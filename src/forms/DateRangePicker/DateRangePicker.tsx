import React, { useCallback, useState } from 'react'
import { ChevronLeft, ChevronRight, Text, View, XStack, YStack } from '../_jsx-compat'
import { CalendarGrid, MONTH_NAMES, formatDate } from '../DatePicker/DatePicker'

export type DateRange = {
  start: Date
  end: Date
}

export type DateRangePickerProps = {
  startDate?: Date
  endDate?: Date
  onChange?: (range: DateRange) => void
  minDate?: Date
  maxDate?: Date
  disabled?: boolean
  testID?: string
}

export function DateRangePicker({
  startDate,
  endDate,
  onChange,
  minDate,
  maxDate,
  disabled = false,
  testID,
}: DateRangePickerProps) {
  const today = new Date()
  const [open, setOpen] = useState(false)
  const [selecting, setSelecting] = useState<'start' | 'end'>('start')
  const [pendingStart, setPendingStart] = useState<Date | undefined>(startDate)
  const [pendingEnd, setPendingEnd] = useState<Date | undefined>(endDate)

  // Left calendar: current month, right: next month
  const [leftYear, setLeftYear] = useState(startDate?.getFullYear() ?? today.getFullYear())
  const [leftMonth, setLeftMonth] = useState(startDate?.getMonth() ?? today.getMonth())

  const rightMonth = leftMonth === 11 ? 0 : leftMonth + 1
  const rightYear = leftMonth === 11 ? leftYear + 1 : leftYear

  const prevLeft = useCallback(() => {
    setLeftMonth((m) => {
      if (m === 0) {
        setLeftYear((y) => y - 1)
        return 11
      }
      return m - 1
    })
  }, [])

  const nextLeft = useCallback(() => {
    setLeftMonth((m) => {
      if (m === 11) {
        setLeftYear((y) => y + 1)
        return 0
      }
      return m + 1
    })
  }, [])

  const handleSelect = useCallback(
    (date: Date) => {
      if (selecting === 'start') {
        setPendingStart(date)
        setPendingEnd(undefined)
        setSelecting('end')
      } else {
        // If end < start, reset to new start
        if (pendingStart && date < pendingStart) {
          setPendingStart(date)
          setPendingEnd(undefined)
          setSelecting('end')
        } else {
          setPendingEnd(date)
          setSelecting('start')
          if (pendingStart) {
            onChange?.({ start: pendingStart, end: date })
            setOpen(false)
          }
        }
      }
    },
    [selecting, pendingStart, onChange],
  )

  const startLabel = pendingStart ? formatDate(pendingStart) : 'Start date'
  const endLabel = pendingEnd ? formatDate(pendingEnd) : 'End date'

  return (
    <YStack testID={testID}>
      <XStack gap="$2">
        <View
          flex={1}
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
          onPress={() => !disabled && (setOpen(true), setSelecting('start'))}
        >
          <Text fontSize="$4" color={pendingStart ? '$color' : '$placeholderColor'} flex={1}>
            {startLabel}
          </Text>
        </View>
        <View
          flex={1}
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
          onPress={() => !disabled && (setOpen(true), setSelecting('end'))}
        >
          <Text fontSize="$4" color={pendingEnd ? '$color' : '$placeholderColor'} flex={1}>
            {endLabel}
          </Text>
        </View>
      </XStack>

      {open && (
        <YStack
          marginTop="$1"
          padding="$3"
          backgroundColor="$background"
          borderWidth={1}
          borderColor="$borderColor"
          borderRadius="$3"
          zIndex={100}
          position="absolute"
          top="$10"
          left={0}
        >
          {/* Navigation bar spanning both calendars */}
          <XStack alignItems="center" justifyContent="space-between" marginBottom="$2">
            <View onPress={prevLeft}>
              <ChevronLeft size={20} color="$color" />
            </View>
            <Text fontSize="$4" fontWeight="600" color="$color">
              {MONTH_NAMES[leftMonth]} {leftYear}
            </Text>
            <Text fontSize="$4" fontWeight="600" color="$color">
              {MONTH_NAMES[rightMonth]} {rightYear}
            </Text>
            <View onPress={nextLeft}>
              <ChevronRight size={20} color="$color" />
            </View>
          </XStack>

          <XStack gap="$4">
            <CalendarGrid
              year={leftYear}
              month={leftMonth}
              selected={pendingStart}
              minDate={minDate}
              maxDate={maxDate}
              onSelectDate={handleSelect}
              rangeStart={pendingStart}
              rangeEnd={pendingEnd}
            />
            <CalendarGrid
              year={rightYear}
              month={rightMonth}
              selected={pendingEnd}
              minDate={minDate}
              maxDate={maxDate}
              onSelectDate={handleSelect}
              rangeStart={pendingStart}
              rangeEnd={pendingEnd}
            />
          </XStack>

          <Text fontSize="$3" color="$color2" marginTop="$2">
            {selecting === 'start' ? 'Select start date' : 'Select end date'}
          </Text>
        </YStack>
      )}
    </YStack>
  )
}
