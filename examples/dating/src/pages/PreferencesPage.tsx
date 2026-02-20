import React, { useState } from 'react'
import { Card, PageHeader, Section } from '@vlting/ui/layout'
import { Button, Switch } from '@vlting/ui/primitives'
import { Text, XStack, YStack } from 'tamagui'

import {
  Check as _Check,
  MapPin as _MapPin,
  Save as _Save,
  SlidersHorizontal as _SlidersHorizontal,
} from '@tamagui/lucide-icons'

import { INTEREST_POOL, DEAL_BREAKER_OPTIONS } from '../data/mock'

// ---------------------------------------------------------------------------
// Icon casts — Tamagui v2 RC size-prop workaround
// ---------------------------------------------------------------------------

type IconFC = React.ComponentType<{ size?: number; color?: string; 'aria-hidden'?: boolean }>

const Check              = _Check as IconFC
const MapPin             = _MapPin as IconFC
const Save               = _Save as IconFC
const SlidersHorizontal  = _SlidersHorizontal as IconFC

// ---------------------------------------------------------------------------
// Gender options
// ---------------------------------------------------------------------------

const GENDER_OPTIONS = ['Women', 'Men', 'Everyone'] as const

// ---------------------------------------------------------------------------
// PreferencesPage
// ---------------------------------------------------------------------------

export function PreferencesPage() {
  const [ageMin, setAgeMin]           = useState(21)
  const [ageMax, setAgeMax]           = useState(35)
  const [distance, setDistance]       = useState(25)
  const [selectedInterests, setSelectedInterests] = useState<Set<string>>(
    () => new Set(['Photography', 'Cooking', 'Rock Climbing', 'Live Music', 'Coffee', 'Vinyl Records']),
  )
  const [dealBreakers, setDealBreakers] = useState<Set<string>>(
    () => new Set(['db-05', 'db-09', 'db-10']),
  )
  const [genderPref, setGenderPref]   = useState<string>('Everyone')
  const [saved, setSaved]             = useState(false)

  const toggleInterest = (interest: string) => {
    setSelectedInterests((prev) => {
      const next = new Set(prev)
      if (next.has(interest)) {
        next.delete(interest)
      } else {
        next.add(interest)
      }
      return next
    })
  }

  const toggleDealBreaker = (id: string) => {
    setDealBreakers((prev) => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <>
      {/* Page header */}
      <PageHeader>
        <PageHeader.Leading>
          <SlidersHorizontal size={20} color="$purple9" aria-hidden />
        </PageHeader.Leading>
        <PageHeader.Body>
          <PageHeader.Title>Preferences</PageHeader.Title>
          <PageHeader.Subtitle>Fine-tune who you see</PageHeader.Subtitle>
        </PageHeader.Body>
      </PageHeader>

      {/* ── Age range ────────────────────────────────────── */}
      <Section title="Age Range" padding="$4" gap="$3">
        <Card padding="$3" bordered gap="$3">
          <Card.Content gap="$3">
            <Text fontSize="$4" fontWeight="600" color="$gray12" textAlign="center">
              {ageMin} – {ageMax}
            </Text>
            <XStack gap="$3" alignItems="center" justifyContent="center">
              <YStack alignItems="center" gap="$1">
                <Text fontSize="$1" color="$gray9" fontWeight="500">Min</Text>
                <input
                  type="number"
                  value={ageMin}
                  onChange={(e) => {
                    const v = Number(e.target.value)
                    if (v >= 18 && v <= ageMax) setAgeMin(v)
                  }}
                  min={18}
                  max={ageMax}
                  aria-label="Minimum age"
                  style={{
                    width: 70,
                    padding: '8px 12px',
                    borderRadius: 10,
                    border: '1px solid var(--gray6, #d2d8e6)',
                    fontSize: 16,
                    fontFamily: 'inherit',
                    textAlign: 'center',
                    background: 'transparent',
                    color: 'inherit',
                  }}
                />
              </YStack>
              <Text fontSize="$4" color="$gray8" marginTop="$3">–</Text>
              <YStack alignItems="center" gap="$1">
                <Text fontSize="$1" color="$gray9" fontWeight="500">Max</Text>
                <input
                  type="number"
                  value={ageMax}
                  onChange={(e) => {
                    const v = Number(e.target.value)
                    if (v >= ageMin && v <= 99) setAgeMax(v)
                  }}
                  min={ageMin}
                  max={99}
                  aria-label="Maximum age"
                  style={{
                    width: 70,
                    padding: '8px 12px',
                    borderRadius: 10,
                    border: '1px solid var(--gray6, #d2d8e6)',
                    fontSize: 16,
                    fontFamily: 'inherit',
                    textAlign: 'center',
                    background: 'transparent',
                    color: 'inherit',
                  }}
                />
              </YStack>
            </XStack>
          </Card.Content>
        </Card>
      </Section>

      {/* ── Distance ─────────────────────────────────────── */}
      <Section title="Distance" padding="$4" gap="$3">
        <Card padding="$3" bordered gap="$2">
          <Card.Content gap="$3">
            <XStack alignItems="center" gap="$2">
              <MapPin size={16} color="$purple9" aria-hidden />
              <Text fontSize="$4" fontWeight="600" color="$gray12">
                Within {distance} km
              </Text>
            </XStack>
            {/* Slider-like visual using range input */}
            <input
              type="range"
              min={1}
              max={100}
              value={distance}
              onChange={(e) => setDistance(Number(e.target.value))}
              aria-label="Maximum distance in kilometers"
              style={{
                width: '100%',
                accentColor: '#7c3aed',
                height: 6,
              }}
            />
            <XStack justifyContent="space-between">
              <Text fontSize="$1" color="$gray8">1 km</Text>
              <Text fontSize="$1" color="$gray8">100 km</Text>
            </XStack>
          </Card.Content>
        </Card>
      </Section>

      {/* ── Interests ────────────────────────────────────── */}
      <Section title="Interests" padding="$4" gap="$3">
        <Text fontSize="$2" color="$gray9">
          Select interests you care about in a match ({selectedInterests.size} selected)
        </Text>
        <XStack flexWrap="wrap" gap="$2">
          {INTEREST_POOL.map((interest) => {
            const isSelected = selectedInterests.has(interest)
            return (
              <XStack
                key={interest}
                paddingHorizontal="$3"
                paddingVertical="$1"
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
              >
                {isSelected && <Check size={12} color="$purple9" aria-hidden />}
                <Text
                  fontSize="$2"
                  fontWeight={isSelected ? '600' : '400'}
                  color={isSelected ? '$purple11' : '$gray10'}
                  marginLeft={isSelected ? 4 : 0}
                >
                  {interest}
                </Text>
              </XStack>
            )
          })}
        </XStack>
      </Section>

      {/* ── Deal-breakers ────────────────────────────────── */}
      <Section title="Deal-Breakers" padding="$4" gap="$3">
        <Text fontSize="$2" color="$gray9">
          We will avoid showing you people with these traits
        </Text>
        <Section.Content gap="$2">
          {DEAL_BREAKER_OPTIONS.map((option) => {
            const isChecked = dealBreakers.has(option.id)
            return (
              <XStack
                key={option.id}
                alignItems="center"
                gap="$3"
                paddingVertical="$2"
                paddingHorizontal="$3"
                borderRadius="$3"
                backgroundColor={isChecked ? '$red1' : undefined}
                onPress={() => toggleDealBreaker(option.id)}
                pressStyle={{ opacity: 0.8 }}
                accessible
                role="checkbox"
                aria-checked={isChecked}
                aria-label={option.label}
                cursor="pointer"
              >
                {/* Custom checkbox */}
                <YStack
                  width={22}
                  height={22}
                  borderRadius="$2"
                  borderWidth={2}
                  borderColor={isChecked ? '$red9' : '$gray6'}
                  backgroundColor={isChecked ? '$red9' : 'transparent'}
                  alignItems="center"
                  justifyContent="center"
                >
                  {isChecked && <Check size={14} color="white" aria-hidden />}
                </YStack>
                <YStack flex={1}>
                  <Text
                    fontSize="$3"
                    fontWeight={isChecked ? '600' : '400'}
                    color={isChecked ? '$red11' : '$gray12'}
                  >
                    {option.label}
                  </Text>
                  <Text fontSize="$1" color="$gray8">{option.category}</Text>
                </YStack>
              </XStack>
            )
          })}
        </Section.Content>
      </Section>

      {/* ── Gender preference ────────────────────────────── */}
      <Section title="Show Me" padding="$4" gap="$3">
        <Card padding="$3" bordered gap="$3">
          <Card.Content gap="$2">
            {GENDER_OPTIONS.map((option) => {
              const isSelected = genderPref === option
              return (
                <XStack
                  key={option}
                  alignItems="center"
                  gap="$3"
                  paddingVertical="$2"
                  paddingHorizontal="$3"
                  borderRadius="$3"
                  backgroundColor={isSelected ? '$purple1' : undefined}
                  onPress={() => setGenderPref(option)}
                  pressStyle={{ opacity: 0.8 }}
                  accessible
                  role="radio"
                  aria-checked={isSelected}
                  aria-label={option}
                  cursor="pointer"
                >
                  {/* Custom radio */}
                  <YStack
                    width={22}
                    height={22}
                    borderRadius={11}
                    borderWidth={2}
                    borderColor={isSelected ? '$purple9' : '$gray6'}
                    alignItems="center"
                    justifyContent="center"
                  >
                    {isSelected && (
                      <YStack
                        width={12}
                        height={12}
                        borderRadius={6}
                        backgroundColor="$purple9"
                      />
                    )}
                  </YStack>
                  <Text
                    fontSize="$3"
                    fontWeight={isSelected ? '600' : '400'}
                    color={isSelected ? '$purple11' : '$gray12'}
                  >
                    {option}
                  </Text>
                </XStack>
              )
            })}
          </Card.Content>
        </Card>
      </Section>

      {/* ── Save button ──────────────────────────────────── */}
      <YStack padding="$4" paddingBottom="$6" gap="$3">
        {saved && (
          <Card padding="$3" backgroundColor="$green2" bordered borderColor="$green5">
            <Card.Content>
              <Text fontSize="$3" color="$green9" fontWeight="600" textAlign="center">
                Preferences saved!
              </Text>
            </Card.Content>
          </Card>
        )}
        <Button onPress={handleSave} aria-label="Save preferences">
          <Button.Icon>
            <Save size={16} aria-hidden />
          </Button.Icon>
          <Button.Text>Save Preferences</Button.Text>
        </Button>
      </YStack>
    </>
  )
}
