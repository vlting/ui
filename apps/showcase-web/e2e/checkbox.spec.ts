import { componentTests } from './helpers'

componentTests('Checkbox', {
  route: '/components/checkbox',
  sections: {
    'default checkbox': 'checkbox-default',
    'checkbox states': 'checkbox-states',
  },
})
