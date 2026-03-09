import { styledHtml } from '@tamagui/web'
import type { ComponentType } from 'react'
import { Text, View, XStack, YStack } from 'tamagui'
import { Badge } from '../../primitives/Badge'
import { Button } from '../../components/Button'
import { Card } from '../../components/Card'
import { Separator } from '../../primitives/Separator'
import type { BlockProps } from '../_shared/types'

type AnyFC = ComponentType<Record<string, unknown>>
const ViewJsx = View as AnyFC
const TextJsx = Text as AnyFC
const XStackJsx = XStack as AnyFC
const YStackJsx = YStack as AnyFC
const CardJsx = Card as AnyFC
const CardHeaderJsx = Card.Header as AnyFC
const CardTitleJsx = Card.Title as AnyFC
const CardDescriptionJsx = Card.Description as AnyFC
const CardContentJsx = Card.Content as AnyFC
const CardFooterJsx = Card.Footer as AnyFC
const ButtonJsx = Button as AnyFC
const ButtonTextJsx = Button.Text as AnyFC
const SeparatorJsx = Separator as AnyFC
const BadgeJsx = Badge as AnyFC

const ToggleButton = styledHtml('button', {
  appearance: 'none',
  border: '1px solid',
  borderColor: '$borderColor',
  background: 'none',
  padding: '6px 16px',
  cursor: 'pointer',
  fontFamily: 'inherit',
  fontSize: 14,
  color: '$color',
  borderRadius: 6,
  focusVisibleStyle: {
    outlineWidth: 2,
    outlineOffset: 2,
    outlineColor: '$outlineColor',
    outlineStyle: 'solid',
  },
} as any)
const ToggleButtonJsx = ToggleButton as AnyFC

// -- Types --

export type PricingBlockVariant = 'cards' | 'comparison' | 'simple'

export interface PricingPlan {
  id: string
  name: string
  description?: string
  price: { monthly: number; yearly: number }
  currency?: string
  features: Array<{ text: string; included: boolean }>
  highlighted?: boolean
  cta?: string
}

export interface PricingBlockProps extends BlockProps {
  variant: PricingBlockVariant
  title?: string
  description?: string
  plans: PricingPlan[]
  billingPeriod?: 'monthly' | 'yearly'
  onBillingPeriodChange?: (period: 'monthly' | 'yearly') => void
  onSelectPlan?: (planId: string) => void
}

// -- Main component --

export function PricingBlock(props: PricingBlockProps) {
  const {
    variant,
    title = 'Pricing',
    description,
    billingPeriod = 'monthly',
    onBillingPeriodChange,
  } = props

  return (
    <YStackJsx alignItems="center" gap="$4" width="100%" padding="$4">
      <YStackJsx alignItems="center" gap="$1.5">
        <TextJsx fontSize="$7" fontWeight="$4" fontFamily="$heading" color="$color" textAlign="center">
          {title}
        </TextJsx>
        {description && (
          <TextJsx fontSize="$4" fontFamily="$body" color="$colorSubtle" textAlign="center">
            {description}
          </TextJsx>
        )}
      </YStackJsx>

      {onBillingPeriodChange && (
        <XStackJsx gap="$1" alignItems="center">
          <ToggleButtonJsx
            type="button"
            onClick={() => onBillingPeriodChange('monthly')}
            style={billingPeriod === 'monthly' ? { backgroundColor: 'var(--color9)' } : {}}
          >
            Monthly
          </ToggleButtonJsx>
          <ToggleButtonJsx
            type="button"
            onClick={() => onBillingPeriodChange('yearly')}
            style={billingPeriod === 'yearly' ? { backgroundColor: 'var(--color9)' } : {}}
          >
            Yearly
          </ToggleButtonJsx>
        </XStackJsx>
      )}

      {variant === 'cards' ? (
        <PricingCards {...props} />
      ) : variant === 'comparison' ? (
        <PricingComparison {...props} />
      ) : (
        <PricingSimple {...props} />
      )}
    </YStackJsx>
  )
}

// -- Cards variant --

function PricingCards({
  plans,
  billingPeriod = 'monthly',
  onSelectPlan,
}: PricingBlockProps) {
  return (
    <XStackJsx gap="$4" flexWrap="wrap" justifyContent="center" width="100%">
      {plans.map((plan) => {
        const price = billingPeriod === 'monthly' ? plan.price.monthly : plan.price.yearly
        const currency = plan.currency ?? '$'

        return (
          <CardJsx
            key={plan.id}
            flex={1}
            style={{ minWidth: 260, maxWidth: 360 }}
            borderColor={plan.highlighted ? '$color10' : '$borderColor'}
            borderWidth={plan.highlighted ? 2 : 1}
          >
            <CardHeaderJsx>
              <XStackJsx justifyContent="space-between" alignItems="center">
                <CardTitleJsx>{plan.name}</CardTitleJsx>
                {plan.highlighted && (
                  <BadgeJsx variant="secondary" size="sm">
                    <TextJsx fontSize="$1" fontFamily="$body">Popular</TextJsx>
                  </BadgeJsx>
                )}
              </XStackJsx>
              {plan.description && (
                <CardDescriptionJsx>{plan.description}</CardDescriptionJsx>
              )}
            </CardHeaderJsx>

            <CardContentJsx>
              <YStackJsx gap="$3">
                <XStackJsx alignItems="baseline" gap="$1">
                  <TextJsx fontSize="$9" fontWeight="$4" fontFamily="$heading" color="$color">
                    {currency}{price}
                  </TextJsx>
                  <TextJsx fontSize="$3" fontFamily="$body" color="$colorSubtle">
                    /{billingPeriod === 'monthly' ? 'mo' : 'yr'}
                  </TextJsx>
                </XStackJsx>

                <SeparatorJsx />

                <YStackJsx gap="$2">
                  {plan.features.map((feat, i) => (
                    <XStackJsx key={i} gap="$2" alignItems="center">
                      <TextJsx fontSize="$3" color={feat.included ? '$green10' : '$colorSubtle'}>
                        {feat.included ? '\u2713' : '\u2717'}
                      </TextJsx>
                      <TextJsx
                        fontSize="$3"
                        fontFamily="$body"
                        color={feat.included ? '$color' : '$colorSubtle'}
                      >
                        {feat.text}
                      </TextJsx>
                    </XStackJsx>
                  ))}
                </YStackJsx>
              </YStackJsx>
            </CardContentJsx>

            <CardFooterJsx>
              <ButtonJsx
                variant={plan.highlighted ? 'default' : 'outline'}
                width="100%"
                onPress={() => onSelectPlan?.(plan.id)}
              >
                <ButtonTextJsx>{plan.cta ?? 'Get started'}</ButtonTextJsx>
              </ButtonJsx>
            </CardFooterJsx>
          </CardJsx>
        )
      })}
    </XStackJsx>
  )
}

// -- Comparison variant --

const TableElement = styledHtml('table', {
  width: '100%',
  borderCollapse: 'collapse',
  fontFamily: 'inherit',
} as any)
const TableJsx = TableElement as AnyFC

const Th = styledHtml('th', {
  padding: '12px 16px',
  textAlign: 'left',
  fontWeight: 600,
  fontSize: 14,
  borderBottomWidth: 1,
  borderBottomStyle: 'solid',
  borderColor: '$borderColor',
} as any)
const ThJsx = Th as AnyFC

const Td = styledHtml('td', {
  padding: '10px 16px',
  fontSize: 14,
  borderBottomWidth: 1,
  borderBottomStyle: 'solid',
  borderColor: '$borderColor',
} as any)
const TdJsx = Td as AnyFC

function PricingComparison({
  plans,
  billingPeriod = 'monthly',
  onSelectPlan,
}: PricingBlockProps) {
  const allFeatures = Array.from(
    new Set(plans.flatMap((p) => p.features.map((f) => f.text))),
  )

  return (
    <ViewJsx width="100%" overflow="auto">
      <TableJsx>
        <thead>
          <tr>
            <ThJsx>Feature</ThJsx>
            {plans.map((plan) => (
              <ThJsx key={plan.id} style={{ textAlign: 'center' }}>
                {plan.name}
              </ThJsx>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <TdJsx>
              <TextJsx fontWeight="$3" fontFamily="$body" color="$color">Price</TextJsx>
            </TdJsx>
            {plans.map((plan) => {
              const price =
                billingPeriod === 'monthly' ? plan.price.monthly : plan.price.yearly
              const currency = plan.currency ?? '$'
              return (
                <TdJsx key={plan.id} style={{ textAlign: 'center' }}>
                  <TextJsx fontWeight="$4" fontFamily="$heading" color="$color">
                    {currency}{price}/{billingPeriod === 'monthly' ? 'mo' : 'yr'}
                  </TextJsx>
                </TdJsx>
              )
            })}
          </tr>
          {allFeatures.map((featureText) => (
            <tr key={featureText}>
              <TdJsx>{featureText}</TdJsx>
              {plans.map((plan) => {
                const feat = plan.features.find((f) => f.text === featureText)
                return (
                  <TdJsx key={plan.id} style={{ textAlign: 'center' }}>
                    <TextJsx color={feat?.included ? '$green10' : '$colorSubtle'}>
                      {feat?.included ? '\u2713' : '\u2717'}
                    </TextJsx>
                  </TdJsx>
                )
              })}
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <TdJsx />
            {plans.map((plan) => (
              <TdJsx key={plan.id} style={{ textAlign: 'center' }}>
                <ButtonJsx
                  variant={plan.highlighted ? 'default' : 'outline'}
                  size="sm"
                  onPress={() => onSelectPlan?.(plan.id)}
                >
                  <ButtonTextJsx>{plan.cta ?? 'Select'}</ButtonTextJsx>
                </ButtonJsx>
              </TdJsx>
            ))}
          </tr>
        </tfoot>
      </TableJsx>
    </ViewJsx>
  )
}

// -- Simple variant --

function PricingSimple({
  plans,
  billingPeriod = 'monthly',
  onSelectPlan,
}: PricingBlockProps) {
  const plan = plans[0]
  if (!plan) return null

  const price = billingPeriod === 'monthly' ? plan.price.monthly : plan.price.yearly
  const currency = plan.currency ?? '$'

  return (
    <CardJsx width="100%" style={{ maxWidth: 400 }} padding="$5">
      <YStackJsx alignItems="center" gap="$4">
        <TextJsx fontSize="$5" fontWeight="$4" fontFamily="$heading" color="$color">
          {plan.name}
        </TextJsx>
        {plan.description && (
          <TextJsx fontSize="$3" fontFamily="$body" color="$colorSubtle" textAlign="center">
            {plan.description}
          </TextJsx>
        )}

        <XStackJsx alignItems="baseline" gap="$1">
          <TextJsx fontSize="$9" fontWeight="$4" fontFamily="$heading" color="$color">
            {currency}{price}
          </TextJsx>
          <TextJsx fontSize="$3" fontFamily="$body" color="$colorSubtle">
            /{billingPeriod === 'monthly' ? 'mo' : 'yr'}
          </TextJsx>
        </XStackJsx>

        <SeparatorJsx width="100%" />

        <YStackJsx gap="$2" width="100%">
          {plan.features.map((feat, i) => (
            <XStackJsx key={i} gap="$2" alignItems="center">
              <TextJsx fontSize="$3" color={feat.included ? '$green10' : '$colorSubtle'}>
                {feat.included ? '\u2713' : '\u2717'}
              </TextJsx>
              <TextJsx
                fontSize="$3"
                fontFamily="$body"
                color={feat.included ? '$color' : '$colorSubtle'}
              >
                {feat.text}
              </TextJsx>
            </XStackJsx>
          ))}
        </YStackJsx>

        <ButtonJsx
          variant="default"
          width="100%"
          onPress={() => onSelectPlan?.(plan.id)}
        >
          <ButtonTextJsx>{plan.cta ?? 'Get started'}</ButtonTextJsx>
        </ButtonJsx>
      </YStackJsx>
    </CardJsx>
  )
}
