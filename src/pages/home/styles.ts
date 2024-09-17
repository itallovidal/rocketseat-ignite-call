import { styled, Heading, Text } from '@ignite-ui/react'

export const Container = styled('div', {
  display: 'flex',
  alignItems: 'center',

  height: '100vh',
  overflow: 'hidden',
  gap: '$4',
  marginLeft: 'auto',

  '@media (min-width: 1200px)': {
    justifyContent: 'center',
  },

  '@media (max-width: 640px)': {
    flexDirection: 'column',
    justifyContent: 'center',
  },
})
export const Hero = styled('div', {
  maxWidth: '31rem',

  '@media (min-width: 640px)': {
    marginLeft: '$20',
  },

  '@media (max-width: 640px)': {
    paddingInline: '$20',
  },

  [`${Heading}`]: {
    '@media (max-width: 640px)': {
      fontSize: '$6xl',
    },
  },
  [`${Text}`]: {
    marginTop: '$2',
    color: '$gray200',
  },
})
export const Preview = styled('div', {
  '@media (max-width: 640px)': {
    display: 'none',
  },
})
