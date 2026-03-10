import { componentTests } from './helpers'

componentTests('Card', {
  route: '/components/card',
  sections: {
    'default card': 'card-default',
    'card with footer': 'card-with-footer',
  },
})
