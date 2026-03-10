import { componentTests } from './helpers'

componentTests('Alert', {
  route: '/components/alert',
  sections: {
    'default alert': 'alert-default',
    'destructive alert': 'alert-destructive',
  },
})
