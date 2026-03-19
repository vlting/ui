'use client'

import type { PropDef } from '@/lib/api-mapping'
import { styled } from '../../../packages/stl-react/src'

const Wrapper = styled('div', { stl: {
  my: '$3.5',
}})

const Title = styled('h4', { stl: {
  fontSize: '$p',
  fontWeight: '$600',
  mb: '$2',
  fontFamily: '$mono',
}})

const TableContainer = styled('div', { stl: {
  overflowX: 'auto',
  border: '$neutralMin',
  borderRadius: '$4',
}})

const Table = styled('table', { stl: {
  width: '100%',
  fontSize: '$p',
  borderCollapse: 'collapse',
}})

const Thead = styled('thead', { stl: {} })

const TheadRow = styled('tr', { stl: {
  borderBottom: '$neutralMin',
  background: '$background1',
}})

const Th = styled('th', { stl: {
  textAlign: 'left',
  py: '$1',
  px: '$2.5',
  fontWeight: '$500',
}})

const Td = styled('td', { stl: {
  py: '$1',
  px: '$2.5',
}})

const TdMono = styled('td', { stl: {
  py: '$1',
  px: '$2.5',
  fontFamily: '$mono',
  fontSize: '$p',
}})

const TdMonoMuted = styled('td', { stl: {
  py: '$1',
  px: '$2.5',
  fontFamily: '$mono',
  fontSize: '$small',
  color: '$colorSubtitle',
}})

const TdSubtitle = styled('td', { stl: {
  py: '$1',
  px: '$2.5',
  color: '$colorSubtitle',
}})

const MonoSmall = styled('span', { stl: {
  fontFamily: '$mono',
  fontSize: '$small',
}})

const MonoSmallSubtitle = styled('span', { stl: {
  fontFamily: '$mono',
  fontSize: '$small',
  color: '$colorSubtitle',
}})

const RequiredMark = styled('span', { stl: {
  color: '$danger9',
  ml: 2,
}})

interface PropTableProps {
  props: Record<string, PropDef>
  title?: string
}

export function PropTable({ props, title }: PropTableProps) {
  const entries = Object.entries(props)
  if (entries.length === 0) return null

  return (
    <Wrapper>
      {title && <Title>{title}</Title>}
      <TableContainer>
        <Table>
          <Thead>
            <TheadRow>
              <Th>Prop</Th>
              <Th>Type</Th>
              <Th>Default</Th>
              <Th>Description</Th>
            </TheadRow>
          </Thead>
          <tbody>
            {entries.map(([name, def]) => (
              <tr
                key={name}
                style={{
                  borderBottom: 'var(--stl-borderThin, 1px) solid var(--stl-borderColorMuted, #eee)',
                }}
              >
                <TdMono>
                  {name}
                  {def.required && (
                    <RequiredMark
                      title="Required"
                      aria-label="required"
                    >
                      *
                    </RequiredMark>
                  )}
                </TdMono>
                <Td>
                  {def.values && def.values.length > 0 ? (
                    <MonoSmall>
                      {def.values.map((v) => `"${v}"`).join(' | ')}
                    </MonoSmall>
                  ) : (
                    <MonoSmallSubtitle>
                      {def.type}
                    </MonoSmallSubtitle>
                  )}
                </Td>
                <TdMonoMuted>
                  {def.default || '—'}
                </TdMonoMuted>
                <TdSubtitle>
                  {def.description || '—'}
                </TdSubtitle>
              </tr>
            ))}
          </tbody>
        </Table>
      </TableContainer>
    </Wrapper>
  )
}

interface CompoundPropTablesProps {
  propsMap: Map<string, Record<string, PropDef>>
}

export function CompoundPropTables({ propsMap }: CompoundPropTablesProps) {
  const entries = Array.from(propsMap.entries())
  if (entries.length === 0) return null

  return (
    <div>
      {entries.map(([subComponent, props]) => (
        <PropTable key={subComponent} title={subComponent} props={props} />
      ))}
    </div>
  )
}
