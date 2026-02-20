import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card } from '@vlting/ui/layout'
import { Button } from '@vlting/ui/primitives'
import { Text, XStack, YStack } from 'tamagui'

import {
  ArrowLeft as _ArrowLeft,
  ArrowRight as _ArrowRight,
  Camera as _Camera,
  Check as _Check,
  Heart as _Heart,
  Plus as _Plus,
  Sparkles as _Sparkles,
} from '@tamagui/lucide-icons'

import { INTEREST_POOL, PROMPT_OPTIONS } from '../data/mock'

// ---------------------------------------------------------------------------
// Icon casts — Tamagui v2 RC size-prop workaround
// ---------------------------------------------------------------------------

type IconFC = React.ComponentType<{ size?: number; color?: string; 'aria-hidden'?: boolean }>

const ArrowLeft  = _ArrowLeft as IconFC
const ArrowRight = _ArrowRight as IconFC
const Camera     = _Camera as IconFC
const Check      = _Check as IconFC
const Heart      = _Heart as IconFC
const Plus       = _Plus as IconFC
const Sparkles   = _Sparkles as IconFC

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const TOTAL_STEPS = 7

const GENDER_IDENTITY_OPTIONS = ['Woman', 'Man', 'Non-binary', 'Prefer not to say']

// ---------------------------------------------------------------------------
// OnboardingPage
// ---------------------------------------------------------------------------

export function OnboardingPage() {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)

  // Step 2: Basic info
  const [name, setName]       = useState('')
  const [birthday, setBirthday] = useState('')
  const [gender, setGender]   = useState('')
  const [location, setLocation] = useState('')

  // Step 4: Interests
  const [selectedInterests, setSelectedInterests] = useState<Set<string>>(() => new Set())

  // Step 5: Prompts
  const [selectedPrompts, setSelectedPrompts] = useState<string[]>([])
  const [promptAnswers, setPromptAnswers] = useState<Record<string, string>>({})

  // Step 6: Preferences
  const [prefAgeMin, setPrefAgeMin] = useState(21)
  const [prefAgeMax, setPrefAgeMax] = useState(35)
  const [prefDistance, setPrefDistance] = useState(25)

  const nextStep = () => setStep((s) => Math.min(s + 1, TOTAL_STEPS))
  const prevStep = () => setStep((s) => Math.max(s - 1, 1))

  const toggleInterest = (interest: string) => {
    setSelectedInterests((prev) => {
      const next = new Set(prev)
      if (next.has(interest)) next.delete(interest)
      else next.add(interest)
      return next
    })
  }

  const togglePrompt = (prompt: string) => {
    setSelectedPrompts((prev) => {
      if (prev.includes(prompt)) return prev.filter((p) => p !== prompt)
      if (prev.length >= 3) return prev
      return [...prev, prompt]
    })
  }

  const progressPct = Math.round((step / TOTAL_STEPS) * 100)

  // ---------------------------------------------------------------------------
  // Shared layout wrapper (not AppShell)
  // ---------------------------------------------------------------------------

  const renderWrapper = (children: React.ReactNode) => (
    <YStack
      flex={1}
      minHeight="100vh"
      backgroundColor="$background"
      alignItems="center"
    >
      <YStack width="100%" maxWidth={520} padding="$4" gap="$4" flex={1}>
        {/* Progress bar */}
        {step > 1 && step < TOTAL_STEPS && (
          <YStack gap="$2">
            <Text fontSize="$1" color="$gray9" textAlign="center">
              Step {step} of {TOTAL_STEPS}
            </Text>
            <YStack height={4} borderRadius="$10" backgroundColor="$gray4" overflow="hidden">
              <YStack
                height={4}
                borderRadius="$10"
                backgroundColor="$purple9"
                width={`${progressPct}%` as unknown as number}
              />
            </YStack>
          </YStack>
        )}

        {children}

        {/* Navigation buttons */}
        {step > 1 && step < TOTAL_STEPS && (
          <XStack gap="$3" marginTop="$4">
            <Button variant="secondary" flex={1} onPress={prevStep} aria-label="Back">
              <Button.Icon><ArrowLeft size={16} aria-hidden /></Button.Icon>
              <Button.Text variant="secondary">Back</Button.Text>
            </Button>
            <Button flex={1} onPress={nextStep} aria-label="Next">
              <Button.Text>Next</Button.Text>
              <Button.Icon><ArrowRight size={16} aria-hidden /></Button.Icon>
            </Button>
          </XStack>
        )}
      </YStack>
    </YStack>
  )

  // ---------------------------------------------------------------------------
  // Step 1: Welcome
  // ---------------------------------------------------------------------------

  if (step === 1) {
    return renderWrapper(
      <YStack flex={1} alignItems="center" justifyContent="center" gap="$5" minHeight={400}>
        {/* Purple circle with heart */}
        <YStack
          width={100}
          height={100}
          borderRadius={50}
          backgroundColor="$purple2"
          borderWidth={3}
          borderColor="$purple5"
          alignItems="center"
          justifyContent="center"
        >
          <Heart size={48} color="#7c3aed" aria-hidden />
        </YStack>

        <YStack alignItems="center" gap="$2">
          <Text fontSize="$8" fontWeight="800" color="$purple11" textAlign="center">
            Welcome to Crushd
          </Text>
          <Text fontSize="$4" color="$gray9" textAlign="center" lineHeight="$4">
            Slow dating, real connections. You will be placed in a small pod of people
            each week. Get to know them through prompts, quizzes, and conversation.
          </Text>
        </YStack>

        <Button onPress={nextStep} aria-label="Get started">
          <Button.Icon><Sparkles size={16} aria-hidden /></Button.Icon>
          <Button.Text>Get Started</Button.Text>
        </Button>
      </YStack>,
    )
  }

  // ---------------------------------------------------------------------------
  // Step 2: Basic Info
  // ---------------------------------------------------------------------------

  if (step === 2) {
    return renderWrapper(
      <YStack gap="$4">
        <YStack gap="$1">
          <Text fontSize="$6" fontWeight="700" color="$gray12">
            The basics
          </Text>
          <Text fontSize="$3" color="$gray9">
            Tell us a bit about yourself
          </Text>
        </YStack>

        <Card padding="$3" bordered gap="$3">
          <Card.Content gap="$4">
            {/* Name */}
            <YStack gap="$1">
              <Text fontSize="$2" color="$gray9" fontWeight="500">First Name</Text>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Jamie"
                aria-label="First name"
                style={inputStyle}
              />
            </YStack>

            {/* Birthday */}
            <YStack gap="$1">
              <Text fontSize="$2" color="$gray9" fontWeight="500">Birthday</Text>
              <input
                type="date"
                value={birthday}
                onChange={(e) => setBirthday(e.target.value)}
                aria-label="Birthday"
                style={inputStyle}
              />
            </YStack>

            {/* Gender identity */}
            <YStack gap="$1">
              <Text fontSize="$2" color="$gray9" fontWeight="500">Gender Identity</Text>
              <YStack gap="$2">
                {GENDER_IDENTITY_OPTIONS.map((opt) => {
                  const isSelected = gender === opt
                  return (
                    <XStack
                      key={opt}
                      alignItems="center"
                      gap="$3"
                      paddingVertical="$1"
                      paddingHorizontal="$2"
                      borderRadius="$3"
                      backgroundColor={isSelected ? '$purple1' : undefined}
                      onPress={() => setGender(opt)}
                      pressStyle={{ opacity: 0.8 }}
                      accessible
                      role="radio"
                      aria-checked={isSelected}
                      cursor="pointer"
                    >
                      <YStack
                        width={20}
                        height={20}
                        borderRadius={10}
                        borderWidth={2}
                        borderColor={isSelected ? '$purple9' : '$gray6'}
                        alignItems="center"
                        justifyContent="center"
                      >
                        {isSelected && (
                          <YStack width={10} height={10} borderRadius={5} backgroundColor="$purple9" />
                        )}
                      </YStack>
                      <Text
                        fontSize="$3"
                        fontWeight={isSelected ? '600' : '400'}
                        color={isSelected ? '$purple11' : '$gray12'}
                      >
                        {opt}
                      </Text>
                    </XStack>
                  )
                })}
              </YStack>
            </YStack>

            {/* Location */}
            <YStack gap="$1">
              <Text fontSize="$2" color="$gray9" fontWeight="500">Location</Text>
              <input
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Brooklyn, NY"
                aria-label="Location"
                style={inputStyle}
              />
            </YStack>
          </Card.Content>
        </Card>
      </YStack>,
    )
  }

  // ---------------------------------------------------------------------------
  // Step 3: Photos
  // ---------------------------------------------------------------------------

  if (step === 3) {
    return renderWrapper(
      <YStack gap="$4">
        <YStack gap="$1">
          <Text fontSize="$6" fontWeight="700" color="$gray12">
            Add photos
          </Text>
          <Text fontSize="$3" color="$gray9">
            Upload at least 2 photos so your pod can see who you are
          </Text>
        </YStack>

        <XStack flexWrap="wrap" gap="$3" justifyContent="center">
          {Array.from({ length: 6 }).map((_, idx) => (
            <YStack
              key={idx}
              width={140}
              height={180}
              borderRadius="$4"
              backgroundColor="$gray2"
              borderWidth={2}
              borderColor="$gray5"
              borderStyle={'dashed' as any}
              alignItems="center"
              justifyContent="center"
              gap="$2"
              accessible
              role="button"
              aria-label={`Add photo ${idx + 1}`}
            >
              {idx === 0 ? (
                <Camera size={28} color="$purple9" aria-hidden />
              ) : (
                <Plus size={24} color="$gray8" aria-hidden />
              )}
              <Text fontSize="$2" color="$gray8" fontWeight="500">
                {idx === 0 ? 'Main photo' : 'Tap to add'}
              </Text>
            </YStack>
          ))}
        </XStack>
      </YStack>,
    )
  }

  // ---------------------------------------------------------------------------
  // Step 4: Interests
  // ---------------------------------------------------------------------------

  if (step === 4) {
    return renderWrapper(
      <YStack gap="$4">
        <YStack gap="$1">
          <Text fontSize="$6" fontWeight="700" color="$gray12">
            Your interests
          </Text>
          <Text fontSize="$3" color="$gray9">
            Select 5 or more to help us match you with compatible people
          </Text>
        </YStack>

        <Text
          fontSize="$2"
          fontWeight="600"
          color={selectedInterests.size >= 5 ? '$green9' : '$orange9'}
        >
          {selectedInterests.size} selected{selectedInterests.size < 5 ? ` (need ${5 - selectedInterests.size} more)` : ' — looking good!'}
        </Text>

        <XStack flexWrap="wrap" gap="$2">
          {INTEREST_POOL.map((interest) => {
            const isSelected = selectedInterests.has(interest)
            return (
              <XStack
                key={interest}
                paddingHorizontal="$3"
                paddingVertical="$2"
                borderRadius="$10"
                backgroundColor={isSelected ? '$purple2' : '$gray2'}
                borderWidth={1}
                borderColor={isSelected ? '$purple7' : '$gray5'}
                onPress={() => toggleInterest(interest)}
                pressStyle={{ scale: 0.96, opacity: 0.9 }}
                accessible
                role="checkbox"
                aria-checked={isSelected}
                aria-label={interest}
                cursor="pointer"
                gap="$1"
              >
                {isSelected && <Check size={14} color="$purple9" aria-hidden />}
                <Text
                  fontSize="$3"
                  fontWeight={isSelected ? '600' : '400'}
                  color={isSelected ? '$purple11' : '$gray10'}
                >
                  {interest}
                </Text>
              </XStack>
            )
          })}
        </XStack>
      </YStack>,
    )
  }

  // ---------------------------------------------------------------------------
  // Step 5: Prompts
  // ---------------------------------------------------------------------------

  if (step === 5) {
    return renderWrapper(
      <YStack gap="$4">
        <YStack gap="$1">
          <Text fontSize="$6" fontWeight="700" color="$gray12">
            Answer some prompts
          </Text>
          <Text fontSize="$3" color="$gray9">
            Choose 3 prompts and write your answers. These help your pod get to know you.
          </Text>
        </YStack>

        <Text fontSize="$2" fontWeight="600" color={selectedPrompts.length >= 3 ? '$green9' : '$orange9'}>
          {selectedPrompts.length} of 3 selected
        </Text>

        <YStack gap="$3">
          {PROMPT_OPTIONS.map((prompt) => {
            const isSelected = selectedPrompts.includes(prompt)
            const canSelect = selectedPrompts.length < 3 || isSelected
            return (
              <Card
                key={prompt}
                padding="$3"
                bordered
                borderColor={isSelected ? '$purple7' : '$gray5'}
                borderWidth={isSelected ? 2 : 1}
                backgroundColor={isSelected ? '$purple1' : undefined}
                gap="$2"
              >
                <Card.Content gap="$2">
                  <XStack
                    alignItems="center"
                    gap="$2"
                    onPress={() => togglePrompt(prompt)}
                    pressStyle={{ opacity: 0.8 }}
                    accessible
                    role="checkbox"
                    aria-checked={isSelected}
                    cursor="pointer"
                    opacity={canSelect ? 1 : 0.5}
                  >
                    <YStack
                      width={22}
                      height={22}
                      borderRadius={11}
                      borderWidth={2}
                      borderColor={isSelected ? '$purple9' : '$gray6'}
                      backgroundColor={isSelected ? '$purple9' : 'transparent'}
                      alignItems="center"
                      justifyContent="center"
                    >
                      {isSelected && <Check size={14} color="white" aria-hidden />}
                    </YStack>
                    <Text
                      fontSize="$3"
                      fontWeight={isSelected ? '600' : '400'}
                      color={isSelected ? '$purple11' : '$gray11'}
                      flex={1}
                    >
                      {prompt}
                    </Text>
                  </XStack>

                  {isSelected && (
                    <textarea
                      value={promptAnswers[prompt] || ''}
                      onChange={(e) =>
                        setPromptAnswers((prev) => ({ ...prev, [prompt]: e.target.value }))
                      }
                      placeholder="Write your answer..."
                      rows={2}
                      aria-label={`Your answer for: ${prompt}`}
                      style={{
                        padding: '10px 14px',
                        borderRadius: 10,
                        border: '1px solid var(--gray6, #d2d8e6)',
                        fontSize: 14,
                        fontFamily: 'inherit',
                        width: '100%',
                        resize: 'vertical',
                        background: 'transparent',
                        color: 'inherit',
                        minHeight: 50,
                      }}
                    />
                  )}
                </Card.Content>
              </Card>
            )
          })}
        </YStack>
      </YStack>,
    )
  }

  // ---------------------------------------------------------------------------
  // Step 6: Preferences
  // ---------------------------------------------------------------------------

  if (step === 6) {
    return renderWrapper(
      <YStack gap="$4">
        <YStack gap="$1">
          <Text fontSize="$6" fontWeight="700" color="$gray12">
            Matching preferences
          </Text>
          <Text fontSize="$3" color="$gray9">
            You can always change these later in Settings
          </Text>
        </YStack>

        <Card padding="$3" bordered gap="$4">
          <Card.Content gap="$4">
            {/* Age range */}
            <YStack gap="$2">
              <Text fontSize="$3" fontWeight="600" color="$gray12">Age Range</Text>
              <Text fontSize="$4" fontWeight="600" color="$purple11" textAlign="center">
                {prefAgeMin} – {prefAgeMax}
              </Text>
              <XStack gap="$3" justifyContent="center" alignItems="center">
                <YStack alignItems="center" gap="$1">
                  <Text fontSize="$1" color="$gray9">Min</Text>
                  <input
                    type="number"
                    value={prefAgeMin}
                    onChange={(e) => {
                      const v = Number(e.target.value)
                      if (v >= 18 && v <= prefAgeMax) setPrefAgeMin(v)
                    }}
                    min={18}
                    max={prefAgeMax}
                    aria-label="Minimum age"
                    style={{ ...inputStyle, width: 70, textAlign: 'center' }}
                  />
                </YStack>
                <Text fontSize="$4" color="$gray8" marginTop="$3">–</Text>
                <YStack alignItems="center" gap="$1">
                  <Text fontSize="$1" color="$gray9">Max</Text>
                  <input
                    type="number"
                    value={prefAgeMax}
                    onChange={(e) => {
                      const v = Number(e.target.value)
                      if (v >= prefAgeMin && v <= 99) setPrefAgeMax(v)
                    }}
                    min={prefAgeMin}
                    max={99}
                    aria-label="Maximum age"
                    style={{ ...inputStyle, width: 70, textAlign: 'center' }}
                  />
                </YStack>
              </XStack>
            </YStack>

            {/* Distance */}
            <YStack gap="$2">
              <Text fontSize="$3" fontWeight="600" color="$gray12">
                Maximum Distance
              </Text>
              <Text fontSize="$4" fontWeight="600" color="$purple11" textAlign="center">
                {prefDistance} km
              </Text>
              <input
                type="range"
                min={1}
                max={100}
                value={prefDistance}
                onChange={(e) => setPrefDistance(Number(e.target.value))}
                aria-label="Maximum distance"
                style={{ width: '100%', accentColor: '#7c3aed' }}
              />
              <XStack justifyContent="space-between">
                <Text fontSize="$1" color="$gray8">1 km</Text>
                <Text fontSize="$1" color="$gray8">100 km</Text>
              </XStack>
            </YStack>
          </Card.Content>
        </Card>
      </YStack>,
    )
  }

  // ---------------------------------------------------------------------------
  // Step 7: Done
  // ---------------------------------------------------------------------------

  return renderWrapper(
    <YStack flex={1} alignItems="center" justifyContent="center" gap="$5" minHeight={400}>
      {/* Celebration icon */}
      <YStack
        width={100}
        height={100}
        borderRadius={50}
        backgroundColor="$green2"
        borderWidth={3}
        borderColor="$green5"
        alignItems="center"
        justifyContent="center"
      >
        <Check size={48} color="$green9" aria-hidden />
      </YStack>

      <YStack alignItems="center" gap="$2">
        <Text fontSize="$8" fontWeight="800" color="$purple11" textAlign="center">
          You're all set!
        </Text>
        <Text fontSize="$4" color="$gray9" textAlign="center" lineHeight="$4">
          Your first pod starts Monday. You will be matched with 6-8 people
          who share your interests. Get ready to connect!
        </Text>
      </YStack>

      <XStack alignItems="center" gap="$2">
        <Sparkles size={16} color="$purple7" aria-hidden />
        <Text fontSize="$2" color="$purple9" fontWeight="500">
          Slow dating, real connections
        </Text>
        <Sparkles size={16} color="$purple7" aria-hidden />
      </XStack>

      <Button onPress={() => navigate('/')} aria-label="Enter Crushd">
        <Button.Icon><Heart size={16} aria-hidden /></Button.Icon>
        <Button.Text>Enter Crushd</Button.Text>
      </Button>
    </YStack>,
  )
}

// ---------------------------------------------------------------------------
// Shared input style
// ---------------------------------------------------------------------------

const inputStyle: React.CSSProperties = {
  padding: '10px 14px',
  borderRadius: 10,
  border: '1px solid var(--gray6, #d2d8e6)',
  fontSize: 14,
  fontFamily: 'inherit',
  width: '100%',
  background: 'transparent',
  color: 'inherit',
}
