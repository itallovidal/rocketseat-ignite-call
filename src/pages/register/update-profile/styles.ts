import { Box, styled, Text } from '@ignite-ui/react'

export const ProfileBox = styled(Box, {
  marginTop: '$2',
  flexDirection: 'column',
  display: 'flex',
  gap: '$4',

  label: {
    display: 'flex',
    flexDirection: 'column',
    gap: '$2',
  },
})

export const FormAnnotation = styled(Text, {
  color: '$gray200',
})
