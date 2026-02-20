import React, { useCallback, useMemo, useState } from 'react'
import { ScrollView, Text, View, XStack, YStack } from '../_jsx-compat'

function pad(n: number): string {
  return String(n).padStart(2, '0')
}

function parseTime(value: string): { hours: number; minutes: number } {
  const [h = '0', m = '0'] = value.split(':')
  return { hours: parseInt(h, 10), minutes: parseInt(m, 10) }
}

export type TimePickerProps = {
  value?: string
  onChange?: (time: string) => void
  use24Hour?: boolean
  minuteStep?: number
  disabled?: boolean
  testID?: string
}

export function TimePicker({
  value = '00:00',
  onChange,
  use24Hour = true,
  minuteStep = 1,
  disabled = false,
  testID,
}: TimePickerProps) {
  const [open, setOpen] = useState(false)
  const { hours, minutes } = parseTime(value)
  const isPM = hours >= 12

  const displayHour = use24Hour ? hours : hours % 12 || 12
  const displayMinute = minutes

  const hourOptions = useMemo(
    () =>
      use24Hour
        ? Array.from({ length: 24 }, (_, i) => i)
        : Array.from({ length: 12 }, (_, i) => i + 1),
    [use24Hour],
  )

  const minuteOptions = useMemo(
    () => Array.from({ length: Math.ceil(60 / minuteStep) }, (_, i) => i * minuteStep),
    [minuteStep],
  )

  const setHour = useCallback(
    (h: number) => {
      let actualHour = h
      if (!use24Hour) {
        // Convert 12h display to 24h
        if (isPM) actualHour = h === 12 ? 12 : h + 12
        else actualHour = h === 12 ? 0 : h
      }
      onChange?.(`${pad(actualHour)}:${pad(minutes)}`)
    },
    [use24Hour, isPM, minutes, onChange],
  )

  const setMinute = useCallback(
    (m: number) => {
      onChange?.(`${pad(hours)}:${pad(m)}`)
    },
    [hours, onChange],
  )

  const toggleAmPm = useCallback(
    (pm: boolean) => {
      if (pm && hours < 12) onChange?.(`${pad(hours + 12)}:${pad(minutes)}`)
      else if (!pm && hours >= 12) onChange?.(`${pad(hours - 12)}:${pad(minutes)}`)
    },
    [hours, minutes, onChange],
  )

  const displayLabel = use24Hour
    ? `${pad(hours)}:${pad(minutes)}`
    : `${displayHour}:${pad(displayMinute)} ${isPM ? 'PM' : 'AM'}`

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
        <Text fontSize="$4" color="$color" flex={1}>
          {displayLabel}
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
          zIndex={100}
          position="absolute"
          top="$8"
          left={0}
        >
          <XStack gap="$2">
            {/* Hours column */}
            <YStack>
              <Text fontSize="$2" color="$color2" textAlign="center" marginBottom="$1">
                HH
              </Text>
              <ScrollView height={160} showsVerticalScrollIndicator={false}>
                {hourOptions.map((h) => {
                  const sel = use24Hour ? h === hours : h === displayHour
                  return (
                    <View
                      key={h}
                      paddingHorizontal="$3"
                      paddingVertical="$2"
                      alignItems="center"
                      backgroundColor={sel ? '$blue10' : undefined}
                      borderRadius={sel ? '$2' : undefined}
                      onPress={() => setHour(h)}
                    >
                      <Text fontSize="$4" color={sel ? '$color1' : '$color'}>
                        {pad(h)}
                      </Text>
                    </View>
                  )
                })}
              </ScrollView>
            </YStack>

            {/* Minutes column */}
            <YStack>
              <Text fontSize="$2" color="$color2" textAlign="center" marginBottom="$1">
                MM
              </Text>
              <ScrollView height={160} showsVerticalScrollIndicator={false}>
                {minuteOptions.map((m) => {
                  const sel = m === minutes
                  return (
                    <View
                      key={m}
                      paddingHorizontal="$3"
                      paddingVertical="$2"
                      alignItems="center"
                      backgroundColor={sel ? '$blue10' : undefined}
                      borderRadius={sel ? '$2' : undefined}
                      onPress={() => setMinute(m)}
                    >
                      <Text fontSize="$4" color={sel ? '$color1' : '$color'}>
                        {pad(m)}
                      </Text>
                    </View>
                  )
                })}
              </ScrollView>
            </YStack>

            {/* AM/PM toggle */}
            {!use24Hour && (
              <YStack gap="$1" justifyContent="center">
                <View
                  flex={1}
                  paddingVertical="$2"
                  alignItems="center"
                  justifyContent="center"
                  borderRadius="$2"
                  backgroundColor={!isPM ? '$blue10' : '$color3'}
                  onPress={() => toggleAmPm(false)}
                >
                  <Text fontSize="$3" color={!isPM ? '$color1' : '$color'} fontWeight="600">
                    AM
                  </Text>
                </View>
                <View
                  flex={1}
                  paddingVertical="$2"
                  alignItems="center"
                  justifyContent="center"
                  borderRadius="$2"
                  backgroundColor={isPM ? '$blue10' : '$color3'}
                  onPress={() => toggleAmPm(true)}
                >
                  <Text fontSize="$3" color={isPM ? '$color1' : '$color'} fontWeight="600">
                    PM
                  </Text>
                </View>
              </YStack>
            )}
          </XStack>

          <View marginTop="$2" alignSelf="flex-end" onPress={() => setOpen(false)}>
            <Text fontSize="$3" color="$blue10" fontWeight="600">
              Done
            </Text>
          </View>
        </YStack>
      )}
    </YStack>
  )
}
