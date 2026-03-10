import type React from 'react'
import { styled } from '../../stl-react/src/config'

const ButtonGroupOuter = styled('div', { display: 'inline-flex' }, 'ButtonGroup')

const ButtonGroupInner = styled('div', { display: 'inline-flex' }, 'ButtonGroupInner')

export interface ButtonGroupRootProps {
  children: React.ReactNode
  orientation?: 'horizontal' | 'vertical'
  'aria-label'?: string
}

function Root({
  children,
  orientation = 'horizontal',
  'aria-label': ariaLabel,
}: ButtonGroupRootProps) {
  const isHorizontal = orientation === 'horizontal'

  return (
    <ButtonGroupOuter>
      <style
        dangerouslySetInnerHTML={{
          __html: isHorizontal
            ? `
              .vlting-btn-group-h > *:not(:first-child):not(:last-child) { border-radius: 0; }
              .vlting-btn-group-h > *:first-child { border-top-right-radius: 0; border-bottom-right-radius: 0; }
              .vlting-btn-group-h > *:last-child { border-top-left-radius: 0; border-bottom-left-radius: 0; }
              .vlting-btn-group-h > *:not(:first-child) { margin-left: -1px; }
            `
            : `
              .vlting-btn-group-v > *:not(:first-child):not(:last-child) { border-radius: 0; }
              .vlting-btn-group-v > *:first-child { border-bottom-left-radius: 0; border-bottom-right-radius: 0; }
              .vlting-btn-group-v > *:last-child { border-top-left-radius: 0; border-top-right-radius: 0; }
              .vlting-btn-group-v > *:not(:first-child) { margin-top: -1px; }
            `,
        }}
      />
      <ButtonGroupInner
        role="group"
        aria-label={ariaLabel}
        style={{ flexDirection: isHorizontal ? 'row' : 'column' }}
        className={isHorizontal ? 'vlting-btn-group-h' : 'vlting-btn-group-v'}
      >
        {children}
      </ButtonGroupInner>
    </ButtonGroupOuter>
  )
}

export const ButtonGroup = { Root }
