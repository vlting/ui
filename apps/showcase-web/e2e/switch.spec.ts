import { componentTests } from './helpers'

componentTests('Switch', {
  route: '/components/switch',
  sections: {
    'default switch': 'switch-default',
    'switch states': 'switch-states',
  },
})
