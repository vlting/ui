import type { ComponentType, ReactNode } from 'react'
import { Button } from '../../components/Button'
import { Card } from '../../components/Card'
import { Progress } from '../../components/Progress'
import type { BlockProps } from '../_shared/types'

type AnyFC = ComponentType<Record<string, unknown>>
const ButtonJsx = Button as AnyFC
const CardJsx = Card as AnyFC
const ProgressJsx = Progress as AnyFC

// -- Types --

export type OnboardingWizardBlockVariant = 'stepper' | 'cards' | 'minimal'

export interface OnboardingStep {
  id: string
  title: string
  description?: string
  icon?: ReactNode
  content?: ReactNode
  optional?: boolean
}

export interface OnboardingWizardBlockProps extends BlockProps {
  variant: OnboardingWizardBlockVariant
  steps: OnboardingStep[]
  currentStep: number
  title?: string
  onNext?: () => void
  onPrevious?: () => void
  onSkip?: () => void
  onComplete?: () => void
}

const col = { display: 'flex', flexDirection: 'column' as const }
const row = { display: 'flex', flexDirection: 'row' as const }

// -- Main component --

export function OnboardingWizardBlock(props: OnboardingWizardBlockProps) {
  switch (props.variant) {
    case 'stepper':
      return <StepperWizard {...props} />
    case 'cards':
      return <CardsWizard {...props} />
    case 'minimal':
      return <MinimalWizard {...props} />
  }
}

// -- Stepper variant --

function StepperWizard({
  steps,
  currentStep,
  title,
  onNext,
  onPrevious,
  onSkip,
  onComplete,
}: OnboardingWizardBlockProps) {
  const progress = ((currentStep + 1) / steps.length) * 100
  const isLast = currentStep === steps.length - 1
  const step = steps[currentStep]

  return (
    <CardJsx style={{ width: '100%', maxWidth: 700, padding: 24 }}>
      <div style={{ ...col, gap: 24 }}>
        {title && (
          <span
            style={{ fontSize: 20, fontWeight: 600, fontFamily: 'var(--font-heading)' }}
          >
            {title}
          </span>
        )}
        {/* Progress bar */}
        <div style={{ ...col, gap: 8 }}>
          <div style={{ ...row, justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 13, opacity: 0.6, fontFamily: 'var(--font-body)' }}>
              Step {currentStep + 1} of {steps.length}
            </span>
            <span style={{ fontSize: 13, opacity: 0.6, fontFamily: 'var(--font-body)' }}>
              {Math.round(progress)}%
            </span>
          </div>
          <ProgressJsx
            value={progress}
            aria-label={`Step ${currentStep + 1} of ${steps.length}`}
          />
        </div>
        {/* Step indicators */}
        <div
          style={{ ...row, gap: 4, justifyContent: 'center' }}
          role="list"
          aria-label="Onboarding steps"
        >
          {steps.map((s, i) => (
            <div
              key={s.id}
              role="listitem"
              aria-current={i === currentStep ? 'step' : undefined}
              style={{
                ...col,
                alignItems: 'center',
                gap: 6,
                flex: 1,
              }}
            >
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 14,
                  fontWeight: 500,
                  backgroundColor:
                    i <= currentStep
                      ? 'var(--color10)'
                      : 'var(--background2)',
                  color:
                    i <= currentStep
                      ? 'var(--colorOnAccent)'
                      : 'var(--color)',
                }}
              >
                {i < currentStep ? '✓' : i + 1}
              </div>
              <span
                style={{
                  fontSize: 12,
                  fontFamily: 'var(--font-body)',
                  opacity: i === currentStep ? 1 : 0.5,
                  textAlign: 'center',
                }}
              >
                {s.title}
              </span>
            </div>
          ))}
        </div>
        {/* Step content */}
        {step && (
          <div style={{ ...col, gap: 12, padding: 16 }}>
            <span
              style={{ fontSize: 18, fontWeight: 500, fontFamily: 'var(--font-heading)' }}
            >
              {step.title}
            </span>
            {step.description && (
              <span
                style={{ fontSize: 14, opacity: 0.7, fontFamily: 'var(--font-body)' }}
              >
                {step.description}
              </span>
            )}
            {step.content}
          </div>
        )}
        {/* Navigation */}
        <div style={{ ...row, justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ ...row, gap: 8 }}>
            {currentStep > 0 && (
              <ButtonJsx
                variant="outline"
                onPress={onPrevious}
                aria-label="Previous step"
              >
                Back
              </ButtonJsx>
            )}
            {step?.optional && onSkip && (
              <ButtonJsx variant="ghost" onPress={onSkip} aria-label="Skip this step">
                Skip
              </ButtonJsx>
            )}
          </div>
          <ButtonJsx
            variant="default"
            onPress={isLast ? onComplete : onNext}
            aria-label={isLast ? 'Complete onboarding' : 'Next step'}
          >
            {isLast ? 'Complete' : 'Continue'}
          </ButtonJsx>
        </div>
      </div>
    </CardJsx>
  )
}

// -- Cards variant --

function CardsWizard({
  steps,
  currentStep,
  title,
  onNext,
  onPrevious,
  onComplete,
}: OnboardingWizardBlockProps) {
  const isLast = currentStep === steps.length - 1
  const step = steps[currentStep]

  return (
    <div style={{ ...col, gap: 24, width: '100%', maxWidth: 600, alignItems: 'center' }}>
      {title && (
        <span
          style={{ fontSize: 24, fontWeight: 600, fontFamily: 'var(--font-heading)' }}
        >
          {title}
        </span>
      )}
      {step && (
        <CardJsx style={{ width: '100%', padding: 32 }}>
          <div style={{ ...col, gap: 16, alignItems: 'center', textAlign: 'center' }}>
            {step.icon && <div style={{ fontSize: 48 }}>{step.icon}</div>}
            <span
              style={{ fontSize: 22, fontWeight: 600, fontFamily: 'var(--font-heading)' }}
            >
              {step.title}
            </span>
            {step.description && (
              <span
                style={{
                  fontSize: 15,
                  opacity: 0.7,
                  fontFamily: 'var(--font-body)',
                  maxWidth: 400,
                }}
              >
                {step.description}
              </span>
            )}
            {step.content}
          </div>
        </CardJsx>
      )}
      {/* Dots */}
      <div
        style={{ ...row, gap: 8, justifyContent: 'center' }}
        role="list"
        aria-label="Progress"
      >
        {steps.map((s, i) => (
          <div
            key={s.id}
            role="listitem"
            aria-current={i === currentStep ? 'step' : undefined}
            aria-label={s.title}
            style={{
              width: i === currentStep ? 24 : 8,
              height: 8,
              borderRadius: 4,
              backgroundColor:
                i === currentStep
                  ? 'var(--color10)'
                  : 'var(--borderColor)',
              transition: 'width 0.2s',
            }}
          />
        ))}
      </div>
      {/* Navigation */}
      <div style={{ ...row, gap: 12 }}>
        {currentStep > 0 && (
          <ButtonJsx variant="outline" onPress={onPrevious} aria-label="Previous step">
            Back
          </ButtonJsx>
        )}
        <ButtonJsx
          variant="default"
          onPress={isLast ? onComplete : onNext}
          aria-label={isLast ? 'Complete' : 'Next'}
        >
          {isLast ? 'Get Started' : 'Next'}
        </ButtonJsx>
      </div>
    </div>
  )
}

// -- Minimal variant --

function MinimalWizard({
  steps,
  currentStep,
  onNext,
  onPrevious,
  onComplete,
}: OnboardingWizardBlockProps) {
  const isLast = currentStep === steps.length - 1
  const step = steps[currentStep]
  const progress = ((currentStep + 1) / steps.length) * 100

  return (
    <div style={{ ...col, gap: 32, width: '100%', maxWidth: 500 }}>
      <ProgressJsx
        value={progress}
        aria-label={`Step ${currentStep + 1} of ${steps.length}`}
      />
      {step && (
        <div style={{ ...col, gap: 12 }}>
          <span
            style={{ fontSize: 24, fontWeight: 600, fontFamily: 'var(--font-heading)' }}
          >
            {step.title}
          </span>
          {step.description && (
            <span style={{ fontSize: 15, opacity: 0.7, fontFamily: 'var(--font-body)' }}>
              {step.description}
            </span>
          )}
          {step.content}
        </div>
      )}
      <div style={{ ...row, justifyContent: 'space-between' }}>
        {currentStep > 0 ? (
          <ButtonJsx variant="ghost" onPress={onPrevious} aria-label="Previous step">
            Back
          </ButtonJsx>
        ) : (
          <div />
        )}
        <ButtonJsx
          variant="default"
          onPress={isLast ? onComplete : onNext}
          aria-label={isLast ? 'Complete' : 'Continue'}
        >
          {isLast ? 'Done' : 'Continue'}
        </ButtonJsx>
      </div>
    </div>
  )
}
