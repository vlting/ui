import { useState } from 'react'
import { Button, Card, Toast, Toaster, ToggleGroup, toast } from '@vlting/ui'

import {
  ControlRow,
  StackY,
  type SectionProps,
} from './shared'

const POSITIONS = [
  'top-left', 'top-center', 'top-right',
  'bottom-left', 'bottom-center', 'bottom-right',
] as const

type Position = typeof POSITIONS[number]

export function ToastSection({ sectionRef }: SectionProps) {
  const [position, setPosition] = useState<Position>('bottom-right')

  return (
    <>
      <Card ref={sectionRef} data-section="Toast">
        <Card.Header stl={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Card.Title>Toast</Card.Title>
          <ControlRow>
            <ToggleGroup
              type="exclusive"
              value={[position]}
              onValueChange={v => v[0] && setPosition(v[0] as Position)}
              aria-label="Position"
            >
              {POSITIONS.map(p => (
                <Button key={p} value={p} size="md" variant="outline" theme="neutral">{p}</Button>
              ))}
            </ToggleGroup>
          </ControlRow>
        </Card.Header>
        <Card.Content>
          <StackY>
            {/* Theme triggers */}
            <ControlRow>
              <Button
                theme="neutral"
                variant="outline"
                onClick={() => toast({ title: 'Neutral', description: 'A neutral notification.' })}
              >
                Neutral
              </Button>
              <Button
                theme="primary"
                variant="outline"
                onClick={() => toast.success({ title: 'Success', description: 'Operation completed.' })}
              >
                Success
              </Button>
              <Button
                theme="destructive"
                variant="outline"
                onClick={() => toast.error({ title: 'Error', description: 'Something went wrong.' })}
              >
                Error
              </Button>
              <Button
                theme="secondary"
                variant="outline"
                onClick={() => toast.warning({ title: 'Warning', description: 'Proceed with caution.' })}
              >
                Warning
              </Button>
              <Button
                theme="neutral"
                variant="subtle"
                onClick={() => toast.info({ title: 'Info', description: 'Here is some information.' })}
              >
                Info
              </Button>
            </ControlRow>

            {/* Special cases */}
            <ControlRow>
              <Button
                theme="neutral"
                variant="outline"
                onClick={() => toast({
                  title: 'Item deleted',
                  description: 'The item was moved to trash.',
                  action: { label: 'Undo', onClick: () => toast.success('Restored!') },
                })}
              >
                With action
              </Button>
              <Button
                theme="neutral"
                variant="outline"
                onClick={() => toast({ title: 'Quick toast', duration: 2000 })}
              >
                2s duration
              </Button>
              <Button
                theme="neutral"
                variant="outline"
                onClick={() => toast.promise(
                  new Promise(r => setTimeout(r, 2000)),
                  { loading: 'Saving...', success: 'Saved!', error: 'Failed' },
                )}
              >
                Promise toast
              </Button>
            </ControlRow>

            {/* Static preview */}
            <StackY>
              <Toast.Root theme="success">
                <div stl={{ display: 'flex', flexDirection: 'column', flex: '1', minWidth: '0' }}>
                  <Toast.Title>Changes saved</Toast.Title>
                  <Toast.Description>Your profile has been updated.</Toast.Description>
                </div>
                <Toast.Close onClose={() => {}} />
              </Toast.Root>

              <Toast.Root theme="error">
                <div stl={{ display: 'flex', flexDirection: 'column', flex: '1', minWidth: '0' }}>
                  <Toast.Title>Upload failed</Toast.Title>
                  <Toast.Description>File exceeds the 10MB limit.</Toast.Description>
                </div>
                <Toast.Close onClose={() => {}} />
              </Toast.Root>
            </StackY>
          </StackY>
        </Card.Content>
      </Card>
      <Toaster position={position} />
    </>
  )
}
