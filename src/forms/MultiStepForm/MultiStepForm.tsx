import React, { useCallback, useId, useState } from 'react'
import { Text, View, XStack, YStack } from '../_jsx-compat'

export type MultiStepFormStep = {
  title: string
  description?: string
  content: React.ReactNode
}

export type MultiStepFormProps = {
  steps: MultiStepFormStep[]
  currentStep?: number
  onStepChange?: (step: number) => void
  onSubmit?: () => void
  isValid?: boolean
  testID?: string
}

export function MultiStepForm({
  steps = [],
  currentStep: controlledStep,
  onStepChange,
  onSubmit,
  isValid = true,
  testID,
}: MultiStepFormProps) {
  const [internalStep, setInternalStep] = useState(0)
  const titleId = useId()

  const isControlled = controlledStep !== undefined
  const step = isControlled ? controlledStep : internalStep
  const total = steps.length
  const isFirst = step === 0
  const isLast = step === total - 1
  const currentStepData = steps[step]

  const goTo = useCallback(
    (next: number) => {
      if (!isControlled) setInternalStep(next)
      onStepChange?.(next)
    },
    [isControlled, onStepChange],
  )

  const handleNext = useCallback(() => {
    if (!isValid) return
    if (isLast) {
      onSubmit?.()
    } else {
      goTo(step + 1)
    }
  }, [isValid, isLast, onSubmit, step, goTo])

  const handleBack = useCallback(() => {
    if (!isFirst) goTo(step - 1)
  }, [isFirst, step, goTo])

  if (!currentStepData) {
    return <YStack testID={testID} />
  }

  return (
    <YStack gap="$4" testID={testID}>
      {/* Step indicator */}
      <XStack alignItems="center" gap="$1">
        {steps.map((s, i) => {
          const status = i < step ? 'completed' : i === step ? 'active' : 'pending'
          const dotBg =
            status === 'active' ? '$blue10' : status === 'completed' ? '$green10' : '$color4'
          const connectorBg = i < step ? '$green10' : '$color4'
          return (
            <React.Fragment key={i}>
              <YStack alignItems="center" gap="$1">
                <View
                  width={28}
                  height={28}
                  borderRadius={14}
                  alignItems="center"
                  justifyContent="center"
                  backgroundColor={dotBg}
                  aria-current={i === step ? 'step' : undefined}
                  aria-label={`Step ${i + 1}: ${s.title}${i < step ? ' (completed)' : i === step ? ' (current)' : ''}`}
                >
                  <Text
                    fontSize="$3"
                    fontWeight="600"
                    color={status === 'pending' ? '$color2' : '$color1'}
                  >
                    {i + 1}
                  </Text>
                </View>
              </YStack>
              {i < steps.length - 1 && (
                <View flex={1} height={2} backgroundColor={connectorBg} />
              )}
            </React.Fragment>
          )
        })}
      </XStack>

      {/* Live region for step announcement */}
      <Text aria-live="polite" position="absolute" width={1} height={1} overflow="hidden">
        {`Step ${step + 1} of ${total}: ${currentStepData.title}`}
      </Text>

      {/* Step content */}
      <YStack gap="$2" role="group" aria-labelledby={titleId}>
        <Text id={titleId} fontSize="$6" fontWeight="700" color="$color" tabIndex={-1}>
          {currentStepData.title}
        </Text>
        {currentStepData.description ? (
          <Text fontSize="$3" color="$color2">
            {currentStepData.description}
          </Text>
        ) : null}
        <YStack gap="$3" marginTop="$2">
          {currentStepData.content}
        </YStack>
      </YStack>

      {/* Navigation */}
      <XStack justifyContent="space-between" alignItems="center" gap="$3">
        {!isFirst ? (
          <View
            paddingHorizontal="$4"
            paddingVertical="$2"
            borderRadius="$3"
            borderWidth={1}
            borderColor="$borderColor"
            backgroundColor="$background"
            alignItems="center"
            justifyContent="center"
            minHeight="$4"
            cursor="pointer"
            onPress={handleBack}
            aria-label="Go to previous step"
          >
            <Text fontSize="$4" color="$color">
              Back
            </Text>
          </View>
        ) : (
          <View />
        )}
        <View
          paddingHorizontal="$4"
          paddingVertical="$2"
          borderRadius="$3"
          backgroundColor="$blue10"
          alignItems="center"
          justifyContent="center"
          minHeight="$4"
          cursor="pointer"
          opacity={isValid ? 1 : 0.5}
          onPress={handleNext}
          aria-label={isLast ? 'Submit form' : 'Go to next step'}
          aria-disabled={!isValid}
        >
          <Text fontSize="$4" color="white" fontWeight="600">
            {isLast ? 'Submit' : 'Next'}
          </Text>
        </View>
      </XStack>
    </YStack>
  )
}
