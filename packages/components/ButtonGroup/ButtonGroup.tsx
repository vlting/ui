import type { ComponentType } from 'react'
import type React from 'react'
import { View } from 'tamagui'

type AnyFC = ComponentType<Record<string, unknown>>
const ViewJsx = View as AnyFC

export interface ButtonGroupRootProps {
  children: React.ReactNode
  orientation?: 'horizontal' | 'vertical'
}

function Root({ children, orientation = 'horizontal' }: ButtonGroupRootProps) {
  const isHorizontal = orientation === 'horizontal'

  return (
    <ViewJsx display="inline-flex">
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
      <ViewJsx
        flexDirection={isHorizontal ? 'row' : 'column'}
        display="inline-flex"
        className={isHorizontal ? 'vlting-btn-group-h' : 'vlting-btn-group-v'}
      >
        {children}
      </ViewJsx>
    </ViewJsx>
  )
}

export const ButtonGroup = { Root }
