import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, PageHeader, Section } from '@vlting/ui/layout'
import { Button } from '@vlting/ui/primitives'
import { Text, XStack, YStack } from 'tamagui'

import {
  ArrowLeft as _ArrowLeft,
  BarChart3 as _BarChart3,
  Check as _Check,
  Users as _Users,
} from '@tamagui/lucide-icons'

import { QUIZZES } from '../data/mock'

// ---------------------------------------------------------------------------
// Icon casts — Tamagui v2 RC size-prop workaround
// ---------------------------------------------------------------------------

type IconFC = React.ComponentType<{ size?: number; color?: string; 'aria-hidden'?: boolean }>

const ArrowLeft  = _ArrowLeft as IconFC
const BarChart3  = _BarChart3 as IconFC
const Check      = _Check as IconFC
const Users      = _Users as IconFC

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function getCurrentDay(): number {
  const start = new Date('2026-02-16')
  const now   = new Date('2026-02-20')
  return Math.ceil((now.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1
}

function getVoteCountForOption(quiz: typeof QUIZZES[0], optionId: string): number {
  return quiz.votes.filter((v) => v.optionId === optionId).length
}

function getVotePercentage(quiz: typeof QUIZZES[0], optionId: string): number {
  const total = quiz.votes.length + 1 // +1 for user's vote
  const count = getVoteCountForOption(quiz, optionId)
  return Math.round((count / total) * 100)
}

function getVotePercentageWithUser(
  quiz: typeof QUIZZES[0],
  optionId: string,
  selectedId: string,
): number {
  const total = quiz.votes.length + 1 // +1 for user's vote
  let count = getVoteCountForOption(quiz, optionId)
  if (optionId === selectedId) count += 1
  return Math.round((count / total) * 100)
}

// ---------------------------------------------------------------------------
// Option bar colors (cycle for visual variety)
// ---------------------------------------------------------------------------

const OPTION_COLORS = ['$purple9', '$pink9', '$orange9', '$green9']

// ---------------------------------------------------------------------------
// QuizPage
// ---------------------------------------------------------------------------

export function QuizPage() {
  const navigate = useNavigate()
  const currentDay = getCurrentDay()
  const todayQuiz = QUIZZES.find((q) => q.day === currentDay)

  const [selectedOption, setSelectedOption] = useState<string | null>(null)

  if (!todayQuiz) {
    return (
      <>
        <PageHeader>
          <PageHeader.Body>
            <PageHeader.Title>No Quiz Today</PageHeader.Title>
            <PageHeader.Subtitle>Check back tomorrow!</PageHeader.Subtitle>
          </PageHeader.Body>
        </PageHeader>
        <YStack padding="$4">
          <Button variant="secondary" onPress={() => navigate('/')}>
            <Button.Icon><ArrowLeft size={16} aria-hidden /></Button.Icon>
            <Button.Text variant="secondary">Back to Home</Button.Text>
          </Button>
        </YStack>
      </>
    )
  }

  const hasVoted = selectedOption !== null

  return (
    <>
      {/* Back button */}
      <YStack padding="$3">
        <Button
          variant="tertiary"
          size="sm"
          onPress={() => navigate('/')}
          alignSelf="flex-start"
          aria-label="Back to home"
        >
          <Button.Icon><ArrowLeft size={16} aria-hidden /></Button.Icon>
          <Button.Text variant="tertiary">Back</Button.Text>
        </Button>
      </YStack>

      {/* Page header */}
      <PageHeader>
        <PageHeader.Leading>
          <BarChart3 size={20} color="$purple9" aria-hidden />
        </PageHeader.Leading>
        <PageHeader.Body>
          <PageHeader.Title>Day {currentDay} Quiz</PageHeader.Title>
          <PageHeader.Subtitle>
            {todayQuiz.votes.length} pod members have voted
          </PageHeader.Subtitle>
        </PageHeader.Body>
      </PageHeader>

      {/* ── Question card ─────────────────────────────── */}
      <Section padding="$4" gap="$3">
        <Card
          padding="$5"
          backgroundColor="$purple2"
          bordered
          borderColor="$purple5"
          alignItems="center"
          gap="$2"
        >
          <Card.Content alignItems="center" gap="$2">
            <Text
              fontSize="$6"
              fontWeight="700"
              textAlign="center"
              color="$purple11"
            >
              {todayQuiz.question}
            </Text>
            <XStack alignItems="center" gap="$1">
              <Users size={14} color="$gray9" aria-hidden />
              <Text fontSize="$2" color="$gray9">
                {todayQuiz.votes.length}{hasVoted ? ' + 1' : ''} votes
              </Text>
            </XStack>
          </Card.Content>
        </Card>
      </Section>

      {/* ── Options ───────────────────────────────────── */}
      <Section padding="$4" gap="$3">
        <Section.Content gap="$3">
          {todayQuiz.options.map((option, index) => {
            const isSelected = selectedOption === option.id
            const pct = hasVoted
              ? getVotePercentageWithUser(todayQuiz, option.id, selectedOption!)
              : 0
            const barColor = OPTION_COLORS[index % OPTION_COLORS.length]

            if (!hasVoted) {
              // Voting mode — clickable option buttons
              return (
                <Button
                  key={option.id}
                  variant="secondary"
                  size="lg"
                  onPress={() => setSelectedOption(option.id)}
                  aria-label={`Vote for: ${option.text}`}
                  style={{ justifyContent: 'flex-start' }}
                >
                  <Button.Text variant="secondary" style={{ textAlign: 'left' }}>
                    {option.text}
                  </Button.Text>
                </Button>
              )
            }

            // Results mode — show percentage bars
            return (
              <Card
                key={option.id}
                padding="$3"
                bordered
                borderColor={isSelected ? '$purple7' : '$gray5'}
                backgroundColor={isSelected ? '$purple1' : undefined}
                gap="$2"
              >
                <Card.Content gap="$2">
                  <XStack alignItems="center" justifyContent="space-between">
                    <XStack alignItems="center" gap="$2" flex={1}>
                      {isSelected && <Check size={14} color="$purple9" aria-hidden />}
                      <Text
                        fontSize="$3"
                        fontWeight={isSelected ? '700' : '500'}
                        color={isSelected ? '$purple11' : '$gray12'}
                        flex={1}
                      >
                        {option.text}
                      </Text>
                    </XStack>
                    <Text fontSize="$3" fontWeight="700" color="$gray11">
                      {pct}%
                    </Text>
                  </XStack>

                  {/* Percentage bar */}
                  <YStack
                    height={8}
                    borderRadius="$10"
                    backgroundColor="$gray4"
                    overflow="hidden"
                  >
                    <YStack
                      height={8}
                      borderRadius="$10"
                      backgroundColor={isSelected ? '$purple9' : barColor}
                      width={`${pct}%` as unknown as number}
                      opacity={isSelected ? 1 : 0.6}
                    />
                  </YStack>
                </Card.Content>
              </Card>
            )
          })}
        </Section.Content>
      </Section>

      {/* ── Post-vote feedback ────────────────────────── */}
      {hasVoted && (
        <YStack padding="$4" alignItems="center" gap="$2">
          <Text fontSize="$3" color="$green9" fontWeight="600">
            Vote recorded! Here are your pod's results.
          </Text>
          <Text fontSize="$2" color="$gray9">
            {todayQuiz.votes.length + 1} total votes
          </Text>
        </YStack>
      )}
    </>
  )
}
