import { validateCode } from '../data/validation.js'

export function handleValidateCode(args: { code: string }) {
  return validateCode(args.code)
}
