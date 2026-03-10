import type { ComponentType } from 'react'
import { styled } from '../../stl-react/src/config'
import { Badge } from '../../primitives/Badge'
import { Button } from '../../components/Button'
import { Card } from '../../components/Card'
import { Separator } from '../../primitives/Separator'
import type { BlockProps } from '../_shared/types'

type AnyFC = ComponentType<Record<string, unknown>>
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

const ToggleButton = styled(
  'button',
  {
    appearance: 'none',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: '$borderColor',
    background: 'none',
    padding: '6px 16px',
    cursor: 'pointer',
    fontFamily: 'inherit',
    fontSize: '$14',
    color: '$color',
    borderRadius: '6px',
  },
  'PricingToggle',
)

const PricingTable = styled(
  'table',
  { width: '100%', borderCollapse: 'collapse', fontFamily: 'inherit' },
  'PricingTable',
)

const Th = styled(
  'th',
  {
    padding: '12px 16px',
    textAlign: 'left',
    fontWeight: '600',
    fontSize: '$14',
    borderBottomWidth: '1px',
    borderBottomStyle: 'solid',
    borderColor: '$borderColor',
  },
  'PricingTh',
)

const Td = styled(
  'td',
  {
    padding: '10px 16px',
    fontSize: '$14',
    borderBottomWidth: '1px',
    borderBottomStyle: 'solid',
    borderColor: '$borderColor',
  },
  'PricingTd',
)

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
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 16,
        width: '100%',
        padding: 16,
      }}
    >
      <div
        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}
      >
        <h2
          style={{
            fontSize: 24,
            fontWeight: 600,
            fontFamily: 'var(--font-heading)',
            color: 'var(--color)',
            textAlign: 'center',
            margin: 0,
          }}
        >
          {title}
        </h2>
        {description && (
          <span
            style={{
              fontSize: 16,
              fontFamily: 'var(--font-body)',
              color: 'var(--secondaryText12)',
              textAlign: 'center',
            }}
          >
            {description}
          </span>
        )}
      </div>

      {onBillingPeriodChange && (
        <div
          style={{ display: 'flex', flexDirection: 'row', gap: 4, alignItems: 'center' }}
        >
          <ToggleButton
            type="button"
            onClick={() => onBillingPeriodChange('monthly')}
            style={
              billingPeriod === 'monthly' ? { backgroundColor: 'var(--surface2)' } : {}
            }
          >
            Monthly
          </ToggleButton>
          <ToggleButton
            type="button"
            onClick={() => onBillingPeriodChange('yearly')}
            style={
              billingPeriod === 'yearly' ? { backgroundColor: 'var(--surface2)' } : {}
            }
          >
            Yearly
          </ToggleButton>
        </div>
      )}

      {variant === 'cards' ? (
        <PricingCards {...props} />
      ) : variant === 'comparison' ? (
        <PricingComparison {...props} />
      ) : (
        <PricingSimple {...props} />
      )}
    </div>
  )
}

// -- Cards variant --

function PricingCards({
  plans,
  billingPeriod = 'monthly',
  onSelectPlan,
}: PricingBlockProps) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        gap: 16,
        flexWrap: 'wrap',
        justifyContent: 'center',
        width: '100%',
      }}
    >
      {plans.map((plan) => {
        const price = billingPeriod === 'monthly' ? plan.price.monthly : plan.price.yearly
        const currency = plan.currency ?? '$'

        return (
          <CardJsx
            key={plan.id}
            style={{
              flex: 1,
              minWidth: 260,
              maxWidth: 360,
              borderColor: plan.highlighted ? 'var(--primary10)' : undefined,
              borderWidth: plan.highlighted ? 2 : undefined,
            }}
          >
            <CardHeaderJsx>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <CardTitleJsx>{plan.name}</CardTitleJsx>
                {plan.highlighted && (
                  <BadgeJsx variant="secondary" size="sm">
                    <span style={{ fontSize: 12, fontFamily: 'var(--font-body)' }}>
                      Popular
                    </span>
                  </BadgeJsx>
                )}
              </div>
              {plan.description && (
                <CardDescriptionJsx>{plan.description}</CardDescriptionJsx>
              )}
            </CardHeaderJsx>

            <CardContentJsx>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
                  <span
                    style={{
                      fontSize: 36,
                      fontWeight: 600,
                      fontFamily: 'var(--font-heading)',
                      color: 'var(--color)',
                    }}
                  >
                    {currency}
                    {price}
                  </span>
                  <span
                    style={{
                      fontSize: 14,
                      fontFamily: 'var(--font-body)',
                      color: 'var(--secondaryText12)',
                    }}
                  >
                    /{billingPeriod === 'monthly' ? 'mo' : 'yr'}
                  </span>
                </div>

                <SeparatorJsx />

                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {plan.features.map((feat, i) => (
                    <div
                      key={i}
                      style={{ display: 'flex', gap: 8, alignItems: 'center' }}
                    >
                      <span
                        style={{
                          fontSize: 14,
                          color: feat.included
                            ? 'var(--green10)'
                            : 'var(--secondaryText12)',
                        }}
                      >
                        {feat.included ? '\u2713' : '\u2717'}
                      </span>
                      <span
                        style={{
                          fontSize: 14,
                          fontFamily: 'var(--font-body)',
                          color: feat.included
                            ? 'var(--color)'
                            : 'var(--secondaryText12)',
                        }}
                      >
                        {feat.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
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
    </div>
  )
}

// -- Comparison variant --

function PricingComparison({
  plans,
  billingPeriod = 'monthly',
  onSelectPlan,
}: PricingBlockProps) {
  const allFeatures = Array.from(
    new Set(plans.flatMap((p) => p.features.map((f) => f.text))),
  )

  return (
    <div style={{ width: '100%', overflow: 'auto' }}>
      <PricingTable>
        <thead>
          <tr>
            <Th>Feature</Th>
            {plans.map((plan) => (
              <Th key={plan.id} style={{ textAlign: 'center' }}>
                {plan.name}
              </Th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <Td>
              <span
                style={{
                  fontWeight: 500,
                  fontFamily: 'var(--font-body)',
                  color: 'var(--color)',
                }}
              >
                Price
              </span>
            </Td>
            {plans.map((plan) => {
              const price =
                billingPeriod === 'monthly' ? plan.price.monthly : plan.price.yearly
              const currency = plan.currency ?? '$'
              return (
                <Td key={plan.id} style={{ textAlign: 'center' }}>
                  <span
                    style={{
                      fontWeight: 600,
                      fontFamily: 'var(--font-heading)',
                      color: 'var(--color)',
                    }}
                  >
                    {currency}
                    {price}/{billingPeriod === 'monthly' ? 'mo' : 'yr'}
                  </span>
                </Td>
              )
            })}
          </tr>
          {allFeatures.map((featureText) => (
            <tr key={featureText}>
              <Td>{featureText}</Td>
              {plans.map((plan) => {
                const feat = plan.features.find((f) => f.text === featureText)
                return (
                  <Td key={plan.id} style={{ textAlign: 'center' }}>
                    <span
                      style={{
                        color: feat?.included
                          ? 'var(--green10)'
                          : 'var(--secondaryText12)',
                      }}
                    >
                      {feat?.included ? '\u2713' : '\u2717'}
                    </span>
                  </Td>
                )
              })}
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <Td />
            {plans.map((plan) => (
              <Td key={plan.id} style={{ textAlign: 'center' }}>
                <ButtonJsx
                  variant={plan.highlighted ? 'default' : 'outline'}
                  size="sm"
                  onPress={() => onSelectPlan?.(plan.id)}
                >
                  <ButtonTextJsx>{plan.cta ?? 'Select'}</ButtonTextJsx>
                </ButtonJsx>
              </Td>
            ))}
          </tr>
        </tfoot>
      </PricingTable>
    </div>
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
    <CardJsx style={{ width: '100%', maxWidth: 400, padding: 20 }}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 16,
        }}
      >
        <span
          style={{
            fontSize: 18,
            fontWeight: 600,
            fontFamily: 'var(--font-heading)',
            color: 'var(--color)',
          }}
        >
          {plan.name}
        </span>
        {plan.description && (
          <span
            style={{
              fontSize: 14,
              fontFamily: 'var(--font-body)',
              color: 'var(--secondaryText12)',
              textAlign: 'center',
            }}
          >
            {plan.description}
          </span>
        )}

        <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
          <span
            style={{
              fontSize: 36,
              fontWeight: 600,
              fontFamily: 'var(--font-heading)',
              color: 'var(--color)',
            }}
          >
            {currency}
            {price}
          </span>
          <span
            style={{
              fontSize: 14,
              fontFamily: 'var(--font-body)',
              color: 'var(--secondaryText12)',
            }}
          >
            /{billingPeriod === 'monthly' ? 'mo' : 'yr'}
          </span>
        </div>

        <SeparatorJsx style={{ width: '100%' }} />

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, width: '100%' }}>
          {plan.features.map((feat, i) => (
            <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <span
                style={{
                  fontSize: 14,
                  color: feat.included ? 'var(--green10)' : 'var(--secondaryText12)',
                }}
              >
                {feat.included ? '\u2713' : '\u2717'}
              </span>
              <span
                style={{
                  fontSize: 14,
                  fontFamily: 'var(--font-body)',
                  color: feat.included ? 'var(--color)' : 'var(--secondaryText12)',
                }}
              >
                {feat.text}
              </span>
            </div>
          ))}
        </div>

        <ButtonJsx variant="default" width="100%" onPress={() => onSelectPlan?.(plan.id)}>
          <ButtonTextJsx>{plan.cta ?? 'Get started'}</ButtonTextJsx>
        </ButtonJsx>
      </div>
    </CardJsx>
  )
}
