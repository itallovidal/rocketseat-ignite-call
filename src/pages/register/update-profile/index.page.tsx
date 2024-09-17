import React from 'react'
import { Container, Header } from '@/pages/register/styles'
import { Button, Heading, MultiStep, Text, TextArea } from '@ignite-ui/react'
import { ArrowRight } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import Head from 'next/head'
import { FormAnnotation, ProfileBox } from '@/pages/update-profile/styles'

const updateUserFormSchema = z.object({
  bio: z.string(),
})

export interface IUpdateUserSchema
  extends z.infer<typeof updateUserFormSchema> {}

function Register() {
  const { handleSubmit, register } = useForm<IUpdateUserSchema>({
    resolver: zodResolver(updateUserFormSchema),
  })

  async function handleUpdateUser(data: IUpdateUserSchema) {
    try {
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

          <MultiStep size={4} currentStep={1} />
        </Header>

        <ProfileBox as={'form'} onSubmit={handleSubmit(handleUpdateUser)}>
          <label>
            <Text size={'sm'}>Foto de perfil</Text>
          </label>

          <label>
            <Text size={'sm'}>Sobre você</Text>
            <TextArea
              {...register('bio')}
              size="sm"
              placeholder="seu nome"
              crossOrigin=""
            />
            <FormAnnotation size={'small'}>
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
