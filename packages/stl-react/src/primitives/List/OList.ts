import { getListStyles, getListVariants } from '..'
import { styled } from '../../config'

export const OList = styled('ol', { stl: getListStyles(), variants: getListVariants(), styleName: 'OList' })
