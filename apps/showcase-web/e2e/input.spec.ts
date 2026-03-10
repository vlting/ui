import { componentTests } from './helpers'

componentTests('Input', {
  route: '/components/input',
  sections: {
    'default input': 'input-default',
    'input states': 'input-states',
  },
})
