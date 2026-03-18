import { getListStyles, getListVariants } from '..'
import { styled } from '../../config'

export const OList = styled('ol', getListStyles(), { name: 'OList', variants: getListVariants() })
