import { createStub } from '../_stub'

export type AlertProps = Record<string, any>

export const Alert = {
  Root: createStub('Alert.Root', 'div'),
  Title: createStub('Alert.Title', 'h5'),
  Description: createStub('Alert.Description', 'p'),
  Icon: createStub('Alert.Icon', 'span'),
}
