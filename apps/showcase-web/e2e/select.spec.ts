import { componentTests } from './helpers'

componentTests('Select', {
  route: '/components/select',
  sections: {
    'default select': 'select-default',
    'disabled select': 'select-disabled',
  },
})
