import { Box, styled } from '@ignite-ui/react'

export const Form = styled(Box, {
  display: 'flex',
  gap: '$2',
  width: '100%',
  marginTop: '$4',

  '> div': {
    flex: 1,
  },

  '@media (max-width: 640px)': {
    flexDirection: 'column',
  },
})

export const FormAnnotation = styled('div', {
  marginTop: '$2',
})
