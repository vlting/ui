import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@vlting/ui/primitives'
import {
  Checkbox,
  FieldWrapper,
  FormContainer,
  HelperText,
  InlineError,
  Label,
  MultiStepForm,
  OTPInput,
  PasswordStrengthMeter,
  RadioGroup,
  Select,
  ValidationMessage,
} from '@vlting/ui/forms'

import type { MultiStepFormStep } from '@vlting/ui/forms'

const ROLES = ['Engineer', 'Designer', 'Product', 'Marketing', 'Sales', 'Finance', 'Other']
const TEAM_SIZES = ['Just me', '2–10', '11–50', '51–200', '200+']

export function OnboardingPage() {
  const navigate = useNavigate()

  // Step 1 — Welcome
  const [firstName, setFirstName] = useState('')
  const [email, setEmail]         = useState('')
  const [agreed, setAgreed]       = useState(false)

  // Step 2 — Password
  const [password, setPassword]   = useState('')
  const [confirm, setConfirm]     = useState('')

  // Step 3 — OTP
  const [otp, setOtp]             = useState('')

  // Step 4 — Role
  const [role, setRole]           = useState('')
  const [teamSize, setTeamSize]   = useState('')

  // Validation errors
  const [errors, setErrors]       = useState<Record<string, string>>({})
  const [step, setStep]           = useState(0)

  const pwMismatch = confirm.length > 0 && password !== confirm

  function validateStep(s: number): boolean {
    const errs: Record<string, string> = {}
    if (s === 0) {
      if (!firstName.trim()) errs.firstName = 'Name is required.'
      if (!email.trim())     errs.email     = 'Email is required.'
      if (!agreed)           errs.agreed    = 'You must accept the terms.'
    }
    if (s === 1) {
      if (password.length < 8) errs.password = 'Password must be at least 8 characters.'
      if (password !== confirm) errs.confirm  = 'Passwords do not match.'
    }
    if (s === 2) {
      if (otp.length < 6) errs.otp = 'Enter the 6-digit code.'
    }
    if (s === 3) {
      if (!role)     errs.role     = 'Please select a role.'
      if (!teamSize) errs.teamSize = 'Please select a team size.'
    }
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const steps: MultiStepFormStep[] = [
    {
      id: 'welcome',
      title: 'Welcome to Volta',
      description: 'Move at the speed of your team. Let's get you set up.',
      content: (
        <FormContainer gap="$3">
          <FieldWrapper>
            <Label htmlFor="ob-name">Your Name</Label>
            <input
              id="ob-name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="Jane Smith"
              style={{ padding: '8px 12px', borderRadius: 6, border: '1px solid #d2d8e6', fontSize: 14, width: '100%' }}
            />
            {errors.firstName && <InlineError>{errors.firstName}</InlineError>}
          </FieldWrapper>

          <FieldWrapper>
            <Label htmlFor="ob-email">Work Email</Label>
            <input
              id="ob-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="jane@company.com"
              style={{ padding: '8px 12px', borderRadius: 6, border: '1px solid #d2d8e6', fontSize: 14, width: '100%' }}
            />
            {errors.email && <InlineError>{errors.email}</InlineError>}
          </FieldWrapper>

          <Checkbox
            checked={agreed}
            onCheckedChange={(v) => setAgreed(Boolean(v))}
            label="I agree to the Terms of Service and Privacy Policy"
          />
          {errors.agreed && <InlineError>{errors.agreed}</InlineError>}
        </FormContainer>
      ),
    },
    {
      id: 'password',
      title: 'Create a Password',
      description: 'Choose a strong password to protect your account.',
      content: (
        <FormContainer gap="$3">
          <FieldWrapper>
            <Label htmlFor="ob-pw">Password</Label>
            <input
              id="ob-pw"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ padding: '8px 12px', borderRadius: 6, border: '1px solid #d2d8e6', fontSize: 14, width: '100%' }}
            />
            <PasswordStrengthMeter password={password} />
            <HelperText>At least 8 characters with a mix of letters and numbers.</HelperText>
            {errors.password && <InlineError>{errors.password}</InlineError>}
          </FieldWrapper>

          <FieldWrapper>
            <Label htmlFor="ob-confirm">Confirm Password</Label>
            <input
              id="ob-confirm"
              type="password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              style={{ padding: '8px 12px', borderRadius: 6, border: '1px solid #d2d8e6', fontSize: 14, width: '100%' }}
            />
            {(pwMismatch || errors.confirm) && (
              <InlineError>{errors.confirm || 'Passwords do not match.'}</InlineError>
            )}
          </FieldWrapper>
        </FormContainer>
      ),
    },
    {
      id: 'verify',
      title: 'Verify Your Email',
      description: `We sent a 6-digit code to ${email || 'your email'}. Enter it below.`,
      content: (
        <FormContainer gap="$3" alignItems="center">
          <OTPInput
            length={6}
            value={otp}
            onValueChange={setOtp}
            aria-label="Email verification code"
          />
          {errors.otp && <InlineError>{errors.otp}</InlineError>}
          <Button variant="tertiary" size="sm">
            <Button.Text variant="tertiary">Resend code</Button.Text>
          </Button>
        </FormContainer>
      ),
    },
    {
      id: 'role',
      title: 'Tell Us About Yourself',
      description: 'Help us tailor Volta to your needs.',
      content: (
        <FormContainer gap="$4">
          <FieldWrapper>
            <Label htmlFor="ob-role">Your Role</Label>
            <Select id="ob-role" value={role} onValueChange={setRole}>
              {ROLES.map((r) => (
                <Select.Item key={r} value={r}>{r}</Select.Item>
              ))}
            </Select>
            {errors.role && <InlineError>{errors.role}</InlineError>}
          </FieldWrapper>

          <FieldWrapper>
            <Label>Team Size</Label>
            <RadioGroup value={teamSize} onValueChange={setTeamSize}>
              {TEAM_SIZES.map((s) => (
                <RadioGroup.Item key={s} value={s}>{s}</RadioGroup.Item>
              ))}
            </RadioGroup>
            {errors.teamSize && <InlineError>{errors.teamSize}</InlineError>}
          </FieldWrapper>
        </FormContainer>
      ),
    },
    {
      id: 'done',
      title: "You're all set! 🎉",
      description: `Welcome to Volta, ${firstName || 'there'}! Your workspace is ready.`,
      content: (
        <FormContainer gap="$4" alignItems="center">
          <ValidationMessage variant="success">
            Account created successfully. Welcome aboard!
          </ValidationMessage>
          <Button onPress={() => navigate('/')}>
            <Button.Text>Go to Dashboard</Button.Text>
          </Button>
        </FormContainer>
      ),
    },
  ]

  return (
    <MultiStepForm
      steps={steps}
      currentStep={step}
      onStepChange={(s) => {
        if (s > step && !validateStep(step)) return
        setStep(s)
      }}
      onComplete={() => setStep(steps.length - 1)}
      style={{ minHeight: '100vh', padding: 24 }}
    />
  )
}
