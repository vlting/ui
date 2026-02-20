import React, { useCallback } from 'react'
import { Pressable } from 'react-native'
import { withStaticProperties } from 'tamagui'
import { Check, Text, View, XStack, YStack } from '../_jsx-compat'

// ---------------------------------------------------------------------------
// QuizCard — poll/quiz card with options and optional results
//
// Displays a question, selectable radio options, and optionally vote results
// with percentage bars. Compound component with sub-components.
// Presentation-only — no business logic or data fetching.
// ---------------------------------------------------------------------------

export type QuizOption = { id: string; label: string }
export type QuizResult = { optionId: string; count: number; percentage: number }

export type QuizCardProps = {
  question: string
  options: QuizOption[]
  selectedOption?: string
  onSelect?: (optionId: string) => void
  showResults?: boolean
  results?: QuizResult[]
  testID?: string
}

// ---------------------------------------------------------------------------
// Sub-components for composition
// ---------------------------------------------------------------------------

type QuizCardQuestionProps = {
  children: string
}

const QuizCardQuestion = React.memo(function QuizCardQuestion(
  props: QuizCardQuestionProps,
) {
  return (
    <Text
      fontSize="$5"
      fontWeight="700"
      color="$color"
      fontFamily="$body"
    >
      {props.children}
    </Text>
  )
})

type QuizOptionItemProps = {
  option: QuizOption
  isSelected: boolean
  isDisabled: boolean
  onSelect?: (optionId: string) => void
}

const QuizOptionItem = React.memo(function QuizOptionItem(
  props: QuizOptionItemProps,
) {
  const { option, isSelected, isDisabled, onSelect } = props

  const handlePress = useCallback(() => {
    if (!isDisabled && onSelect) {
      onSelect(option.id)
    }
  }, [option.id, isDisabled, onSelect])

  return (
    <Pressable
      onPress={handlePress}
      role="radio"
      aria-checked={isSelected}
      aria-label={option.label}
      accessibilityRole="radio"
      accessibilityState={{ checked: isSelected, disabled: isDisabled }}
      disabled={isDisabled}
    >
      <XStack
        padding="$3"
        borderRadius="$3"
        borderWidth={1}
        borderColor={isSelected ? '$blue10' : '$borderColor'}
        backgroundColor={isSelected ? '$blue3' : '$background'}
        alignItems="center"
        gap="$2"
        opacity={isDisabled && !isSelected ? 0.6 : 1}
      >
        {/* Radio circle */}
        <View
          width={20}
          height={20}
          borderRadius={10}
          borderWidth={2}
          borderColor={isSelected ? '$blue10' : '$gray8'}
          alignItems="center"
          justifyContent="center"
        >
          {isSelected ? (
            <View
              width={10}
              height={10}
              borderRadius={5}
              backgroundColor="$blue10"
            />
          ) : null}
        </View>

        <Text
          fontSize="$3"
          color="$color"
          fontFamily="$body"
          flex={1}
        >
          {option.label}
        </Text>

        {isSelected ? (
          <Check size={16} color="$blue10" aria-hidden />
        ) : null}
      </XStack>
    </Pressable>
  )
})

type QuizCardOptionsProps = {
  options: QuizOption[]
  selectedOption?: string
  isDisabled: boolean
  onSelect?: (optionId: string) => void
}

const QuizCardOptions = React.memo(function QuizCardOptions(
  props: QuizCardOptionsProps,
) {
  const { options, selectedOption, isDisabled, onSelect } = props

  return (
    <YStack role="radiogroup" aria-label="Quiz options" gap="$2">
      {options.map((option) => (
        <QuizOptionItem
          key={option.id}
          option={option}
          isSelected={selectedOption === option.id}
          isDisabled={isDisabled}
          onSelect={onSelect}
        />
      ))}
    </YStack>
  )
})

type ResultBarProps = {
  option: QuizOption
  result: QuizResult
  isSelected: boolean
}

const ResultBar = React.memo(function ResultBar(props: ResultBarProps) {
  const { option, result, isSelected } = props

  return (
    <YStack gap="$1">
      <XStack alignItems="center" justifyContent="space-between">
        <XStack alignItems="center" gap="$2" flex={1}>
          {isSelected ? (
            <Check size={14} color="$blue10" aria-hidden />
          ) : null}
          <Text
            fontSize="$3"
            fontWeight={isSelected ? '700' : '400'}
            color="$color"
            fontFamily="$body"
          >
            {option.label}
          </Text>
        </XStack>
        <Text
          fontSize="$2"
          color="$color2"
          fontFamily="$body"
        >
          {result.percentage}%
        </Text>
      </XStack>

      {/* Progress bar */}
      <View
        height={8}
        borderRadius="$2"
        backgroundColor="$gray4"
        overflow="hidden"
      >
        <View
          height={8}
          borderRadius="$2"
          backgroundColor={isSelected ? '$blue10' : '$gray8'}
          width={`${result.percentage}%` as unknown as number}
        />
      </View>
    </YStack>
  )
})

type QuizCardResultsProps = {
  options: QuizOption[]
  results: QuizResult[]
  selectedOption?: string
}

const QuizCardResults = React.memo(function QuizCardResults(
  props: QuizCardResultsProps,
) {
  const { options, results, selectedOption } = props

  return (
    <YStack gap="$3" aria-label="Quiz results">
      {options.map((option) => {
        const result = results.find((r) => r.optionId === option.id)
        if (!result) return null

        return (
          <ResultBar
            key={option.id}
            option={option}
            result={result}
            isSelected={selectedOption === option.id}
          />
        )
      })}
    </YStack>
  )
})

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

const QuizCardBase = React.memo(function QuizCardBase(
  props: QuizCardProps,
) {
  const {
    question,
    options,
    selectedOption,
    onSelect,
    showResults = false,
    results = [],
    testID,
  } = props

  const isDisabled = !!selectedOption || showResults

  return (
    <YStack
      testID={testID}
      backgroundColor="$background"
      borderRadius="$4"
      borderWidth={1}
      borderColor="$borderColor"
      padding="$3"
      gap="$3"
      aria-label={`Quiz: ${question}`}
    >
      {/* Question */}
      <QuizCardQuestion>{question}</QuizCardQuestion>

      {/* Options or Results */}
      {showResults && results.length > 0 ? (
        <QuizCardResults
          options={options}
          results={results}
          selectedOption={selectedOption}
        />
      ) : (
        <QuizCardOptions
          options={options}
          selectedOption={selectedOption}
          isDisabled={isDisabled}
          onSelect={onSelect}
        />
      )}
    </YStack>
  )
})

export const QuizCard = withStaticProperties(QuizCardBase, {
  Question: QuizCardQuestion,
  Options: QuizCardOptions,
  Results: QuizCardResults,
})
