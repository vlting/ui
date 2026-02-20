import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, PageHeader, Section } from '@vlting/ui/layout'
import { Avatar, Button } from '@vlting/ui/primitives'
import { Text, XStack, YStack } from 'tamagui'

import {
  Camera as _Camera,
  MapPin as _MapPin,
  Plus as _Plus,
  Save as _Save,
  User as _User,
} from '@tamagui/lucide-icons'

import { PROMPT_OPTIONS } from '../data/mock'

// ---------------------------------------------------------------------------
// Icon casts — Tamagui v2 RC size-prop workaround
// ---------------------------------------------------------------------------

type IconFC = React.ComponentType<{ size?: number; color?: string; 'aria-hidden'?: boolean }>

const Camera = _Camera as IconFC
const MapPin = _MapPin as IconFC
const Plus   = _Plus as IconFC
const Save   = _Save as IconFC
const User   = _User as IconFC

// ---------------------------------------------------------------------------
// Initial data (simulating "my" profile)
// ---------------------------------------------------------------------------

const MY_PHOTOS = [
  'https://i.pravatar.cc/400?u=me-a',
  'https://i.pravatar.cc/400?u=me-b',
  'https://i.pravatar.cc/400?u=me-c',
]

const MY_INTERESTS = [
  'Photography', 'Cooking', 'Rock Climbing', 'Vinyl Records', 'Live Music', 'Coffee',
]

const INITIAL_PROMPTS = [
  { question: 'The way to win me over is', answer: 'Show up with a genuine curiosity about the world and a good book recommendation.' },
  { question: 'I geek out on', answer: 'Vintage synthesizers, pour-over coffee ratios, and the architecture of old train stations.' },
  { question: 'Together, we could', answer: 'Start a rooftop herb garden and argue about the best way to make pesto.' },
]

// ---------------------------------------------------------------------------
// ProfilePage
// ---------------------------------------------------------------------------

export function ProfilePage() {
  const navigate = useNavigate()

  const [bio, setBio] = useState(
    'Design engineer who moonlights as an amateur chef. I collect records, strong opinions, and houseplants I probably over-water.',
  )
  const [prompts, setPrompts] = useState(INITIAL_PROMPTS)
  const [saved, setSaved] = useState(false)

  const handlePromptChange = (idx: number, value: string) => {
    setPrompts((prev) => prev.map((p, i) => (i === idx ? { ...p, answer: value } : p)))
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
          <User size={20} color="$purple9" aria-hidden />
        </PageHeader.Leading>
        <PageHeader.Body>
          <PageHeader.Title>Your Profile</PageHeader.Title>
          <PageHeader.Subtitle>Edit your dating profile</PageHeader.Subtitle>
        </PageHeader.Body>
      </PageHeader>

      {/* ── Photo grid ───────────────────────────────────── */}
      <Section title="Photos" padding="$4" gap="$3">
        <XStack flexWrap="wrap" gap="$3">
          {Array.from({ length: 6 }).map((_, idx) => {
            const hasPhoto = idx < MY_PHOTOS.length
            return (
              <YStack
                key={idx}
                width={100}
                height={130}
                borderRadius="$4"
                backgroundColor={hasPhoto ? '$gray4' : '$gray2'}
                borderWidth={hasPhoto ? 0 : 2}
                borderColor="$gray5"
                borderStyle={hasPhoto ? undefined : 'dashed' as any}
                alignItems="center"
                justifyContent="center"
                overflow="hidden"
                accessible
                role="button"
                aria-label={hasPhoto ? `Photo ${idx + 1}` : `Add photo ${idx + 1}`}
              >
                {hasPhoto ? (
                  <YStack width={100} height={130} alignItems="center" justifyContent="center">
                    <Avatar name={`Photo ${idx + 1}`} size="lg" />
                    <YStack
                      position="absolute"
                      bottom={0}
                      left={0}
                      right={0}
                      backgroundColor="rgba(0,0,0,0.4)"
                      padding="$1"
                      alignItems="center"
                    >
                      <Camera size={14} color="white" aria-hidden />
                    </YStack>
                  </YStack>
                ) : (
                  <YStack alignItems="center" gap="$1">
                    <Plus size={20} color="$gray8" aria-hidden />
                    <Text fontSize="$1" color="$gray8">Add</Text>
                  </YStack>
                )}
              </YStack>
            )
          })}
        </XStack>
      </Section>

      {/* ── Profile info card ────────────────────────────── */}
      <Section title="Basic Info" padding="$4" gap="$3">
        <Card padding="$3" bordered gap="$2">
          <Card.Content gap="$2">
            <XStack alignItems="center" gap="$3">
              <Avatar name="Jamie Rivera" size="lg" />
              <YStack gap="$1">
                <Text fontSize="$5" fontWeight="700" color="$gray12">
                  Jamie Rivera
                </Text>
                <Text fontSize="$3" color="$gray9">Age 26</Text>
                <XStack alignItems="center" gap="$1">
                  <MapPin size={14} color="$gray9" aria-hidden />
                  <Text fontSize="$3" color="$gray9">Brooklyn, NY</Text>
                </XStack>
              </YStack>
            </XStack>
          </Card.Content>
        </Card>
      </Section>

      {/* ── Bio section ──────────────────────────────────── */}
      <Section title="About You" padding="$4" gap="$3">
        <Card padding="$3" bordered gap="$2">
          <Card.Content gap="$2">
            <Text fontSize="$2" color="$gray9" fontWeight="500">Bio</Text>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows={4}
              aria-label="Your bio"
              style={{
                padding: '10px 14px',
                borderRadius: 12,
                border: '1px solid var(--gray6, #d2d8e6)',
                fontSize: 14,
                fontFamily: 'inherit',
                width: '100%',
                resize: 'vertical',
                background: 'transparent',
                color: 'inherit',
                minHeight: 80,
              }}
            />
            <Text fontSize="$1" color="$gray8" textAlign="right">
              {bio.length} / 300
            </Text>
          </Card.Content>
        </Card>
      </Section>

      {/* ── Prompt answers ───────────────────────────────── */}
      <Section title="Prompts" padding="$4" gap="$3">
        <Section.Content gap="$3">
          {prompts.map((prompt, idx) => (
            <Card key={idx} padding="$3" bordered gap="$2">
              <Card.Header>
                <Card.Title fontSize="$2" color="$purple9">
                  {prompt.question}
                </Card.Title>
              </Card.Header>
              <Card.Content gap="$1">
                <textarea
                  value={prompt.answer}
                  onChange={(e) => handlePromptChange(idx, e.target.value)}
                  rows={3}
                  aria-label={`Answer for: ${prompt.question}`}
                  style={{
                    padding: '10px 14px',
                    borderRadius: 12,
                    border: '1px solid var(--gray6, #d2d8e6)',
                    fontSize: 14,
                    fontFamily: 'inherit',
                    width: '100%',
                    resize: 'vertical',
                    background: 'transparent',
                    color: 'inherit',
                    minHeight: 60,
                  }}
                />
                <Text fontSize="$1" color="$gray8" textAlign="right">
                  {prompt.answer.length} / 200
                </Text>
              </Card.Content>
            </Card>
          ))}
        </Section.Content>
      </Section>

      {/* ── Interests ────────────────────────────────────── */}
      <Section title="Interests" padding="$4" gap="$3">
        <XStack flexWrap="wrap" gap="$2">
          {MY_INTERESTS.map((interest) => (
            <XStack
              key={interest}
              paddingHorizontal="$3"
              paddingVertical="$1"
              borderRadius="$10"
              backgroundColor="$purple2"
              borderWidth={1}
              borderColor="$purple5"
            >
              <Text fontSize="$2" fontWeight="500" color="$purple11">
                {interest}
              </Text>
            </XStack>
          ))}
        </XStack>
        <Text fontSize="$1" color="$gray8" marginTop="$1">
          Edit interests in Preferences
        </Text>
      </Section>

      {/* ── Stats card ───────────────────────────────────── */}
      <Section padding="$4" gap="$3">
        <Card padding="$3" bordered backgroundColor="$purple1" borderColor="$purple5">
          <Card.Content>
            <Text fontSize="$3" color="$purple11" textAlign="center" fontWeight="500">
              12 likes received  ·  3 mutual matches  ·  Profile 85% complete
            </Text>
          </Card.Content>
        </Card>
      </Section>

      {/* ── Save button ──────────────────────────────────── */}
      <YStack padding="$4" paddingBottom="$6" gap="$3">
        {saved && (
          <Card padding="$3" backgroundColor="$green2" bordered borderColor="$green5">
            <Card.Content>
              <Text fontSize="$3" color="$green9" fontWeight="600" textAlign="center">
                Profile saved successfully!
              </Text>
            </Card.Content>
          </Card>
        )}
        <Button onPress={handleSave} aria-label="Save profile">
          <Button.Icon>
            <Save size={16} aria-hidden />
          </Button.Icon>
          <Button.Text>Save Profile</Button.Text>
        </Button>
      </YStack>
    </>
  )
}
