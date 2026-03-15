import { createStub } from '../_stub'

export type CommandRootProps = Record<string, any>
export type CommandItemProps = Record<string, any>
export type CommandGroupProps = Record<string, any>

export const Command = {
  Root: createStub('Command.Root', 'div'),
  Input: createStub('Command.Input', 'input'),
  List: createStub('Command.List', 'div'),
  Empty: createStub('Command.Empty', 'div'),
  Group: createStub('Command.Group', 'div'),
  Item: createStub('Command.Item', 'div'),
  Separator: createStub('Command.Separator', 'div'),
  Loading: createStub('Command.Loading', 'div'),
}
