import React from 'react'
import { Container, Header } from '@/pages/register/styles'
import {
  Avatar,
  Button,
  Heading,
  MultiStep,
  Text,
  TextArea,
} from '@ignite-ui/react'
import { ArrowRight } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import Head from 'next/head'
import {
  FormAnnotation,
  ProfileBox,
} from '@/pages/register/update-profile/styles'
import { GetServerSideProps } from 'next'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/pages/api/auth/[...nextauth].api'
import { useSession } from 'next-auth/react'
import { api } from '@/lib/axios'
import { useRouter } from 'next/router'

const updateUserFormSchema = z.object({
  bio: z.string(),
})

export interface IUpdateUserSchema
  extends z.infer<typeof updateUserFormSchema> {}

function Register() {
  const {
    handleSubmit,
    register,
    formState: { isSubmitting },
  } = useForm<IUpdateUserSchema>({
    resolver: zodResolver(updateUserFormSchema),
  })

  const session = useSession()
  const router = useRouter()
  console.log(session)

  async function handleUpdateUser(data: IUpdateUserSchema) {
    try {
      await api.put('/users/update-profile', {
        bio: data.bio,
      })
      await router.push(`/schedule/${session.data?.user.username}`)
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <>
      <Head>
        <title> Ignite Call | Registro </title>
      </Head>

      <Container>
        <Header>
          <Heading as={'strong'}>Bem Vindo ao Ignite Call</Heading>

          <Text>
            Conecte o seu calendário para verificar automaticamente as horas
            ocupadas e os novos eventos à medida em que são agendados.
          </Text>

          <MultiStep size={4} currentStep={4} />
        </Header>

        <ProfileBox as={'form'} onSubmit={handleSubmit(handleUpdateUser)}>
          <label>
            <Text size={'sm'}>Foto de perfil</Text>
            <Avatar src={session.data?.user.avatar_url} />
          </label>

          <label>
            <Text size={'sm'}>Sobre você</Text>
            <TextArea {...register('bio')} placeholder="seu nome" />
            <FormAnnotation size={'sm'}>
              Fale um pouco sobre você. Isto será exibido em sua página pessoal.
            </FormAnnotation>
          </label>

          <Button disabled={isSubmitting} size="sm" type="submit">
            Finalizar
            <ArrowRight />
          </Button>
        </ProfileBox>
      </Container>
    </>
  )
}

export default Register

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getServerSession(req, res, authOptions(req, res))

  return {
    props: {
      session,
    },
  }
}
