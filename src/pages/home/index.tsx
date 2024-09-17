import { Container, Hero, Preview } from '@/pages/home/styles'
import { Heading, Text } from '@ignite-ui/react'
import Image from 'next/image'
import PreviewImage from '../../assets/app-preview.png'
import ClaimUserNameForm from '@/pages/home/components/claimUsernameForm'
import Head from 'next/head'

function Home() {
  return (
    <>
      <Head>
        <title>Ignite Call | Home</title>
      </Head>

      <Container>
        <Hero>
          <Heading size={'4xl'}>Agendamento descomplicado.</Heading>
          <Text size={'xl'}>
            Conecte-se seu calendário e permita que as pessoas marquem
            agendamentos no seu tempo livre.
          </Text>
          <ClaimUserNameForm />
        </Hero>
        <Preview>
          <Image
            src={PreviewImage}
            alt={'Preview'}
            priority
            height={400}
            quality={100}
          />
        </Preview>
      </Container>
    </>
  )
}

export default Home
