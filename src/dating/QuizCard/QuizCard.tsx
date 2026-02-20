import type { GetProps } from 'tamagui'
import { YStack, styled, withStaticProperties } from 'tamagui'

const QuizCardFrame = styled(YStack, {})

const QuizCardQuestion = styled(YStack, {})

const QuizCardOptions = styled(YStack, {})

const QuizCardResults = styled(YStack, {})

export const QuizCard = withStaticProperties(QuizCardFrame, {
  Question: QuizCardQuestion,
  Options: QuizCardOptions,
  Results: QuizCardResults,
})

export type QuizCardProps = GetProps<typeof QuizCardFrame>
