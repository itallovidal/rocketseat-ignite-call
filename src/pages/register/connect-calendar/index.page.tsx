import React from 'react'
import { Container, Header } from '@/pages/register/styles'
import { Button, Heading, MultiStep, Text } from '@ignite-ui/react'
import { ArrowRight, CheckCircle } from 'phosphor-react'
import {
  ConnectBox,
  ConnectItem,
} from '@/pages/register/connect-calendar/styles'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'

function Register() {
  const { data, status } = useSession()
  const router = useRouter()
  const hasPermissionError = !!router.query.error
  const isSignedIn = status === 'authenticated'

  return (
    <Container>
      <Header>
        <Heading as={'strong'}>Conecte sua agenda</Heading>

        <Text>
          Conecte o seu calendário para verificar automaticamente as horas
          ocupadas e os novos eventos à medida em que são agendados.
        </Text>

        <MultiStep size={4} currentStep={2} />
      </Header>

      <ConnectBox>
        <ConnectItem>
          <Text>Google Calendar</Text>
          <Button
            disabled={!!data?.user?.email}
            variant={data?.user ? 'primary' : 'secondary'}
            size={'sm'}
            onClick={() => signIn('google')}
          >
            {data?.user ? 'conectado' : 'conectar'}
            {data?.user ? <CheckCircle /> : <ArrowRight />}
          </Button>
        </ConnectItem>

        {hasPermissionError && (
          <Text as={`span`}>Permissão ao calendário não autorizada.</Text>
        )}
        <Button
          disabled={!isSignedIn || hasPermissionError}
          onClick={async () => await router.push(`/register/time-intervals`)}
          size="sm"
          type="submit"
        >
          Próximo
          <ArrowRight />
        </Button>
      </ConnectBox>
    </Container>
  )
}

export default Register
