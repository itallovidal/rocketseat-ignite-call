import React from 'react'
import { Container, Form, FormError, Header } from '@/pages/register/styles'
import { Button, Heading, MultiStep, Text, TextInput } from '@ignite-ui/react'
import { ArrowRight } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/router'
import { api } from '@/lib/axios'
import Head from 'next/head'

const registerFormSchema = z.object({
  username: z
    .string()
    .min(4, {
      message: 'Username deve ter mais de 4 caracteres.',
    })
    .regex(/^([a-z\\\\-]+)$/i, {
      message: 'Username deve ter apenas hífens e letras.',
    })
    .transform((value) => value.toLowerCase()),
  name: z.string().min(2, {
    message: 'O nome deve ter mais de 2 caracteres.',
  }),
})

export interface IRegisterSchema extends z.infer<typeof registerFormSchema> {}

function Register() {
  const {
    handleSubmit,
    register,
    setValue,
    formState: { isSubmitting, errors },
  } = useForm<IRegisterSchema>({
    resolver: zodResolver(registerFormSchema),
  })

  async function handleRegisterUser(data: IRegisterSchema) {
    try {
      const response = await api.post('/users', data)

      if (response.status !== 200) {
        alert(response.data)
      }

      await router.push('/register/connect-calendar')
    } catch (e) {
      console.log(e)
    }
  }

  const router = useRouter()

  React.useEffect(() => {
    if (router.query.username) {
      setValue('username', String(router.query.username))
    }
  }, [setValue, router.query.username])

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

        <Form as={'form'} onSubmit={handleSubmit(handleRegisterUser)}>
          <label>
            <Text size={'sm'}>Nome de usuário</Text>
            <TextInput
              size="sm"
              prefix="ignite.com/"
              placeholder="seu-usuário"
              crossOrigin=""
              {...register('username')}
            />

            {errors.username && (
              <FormError>{errors.username.message}</FormError>
            )}
          </label>

          <label>
            <Text size={'sm'}>Nome completo</Text>
            <TextInput
              {...register('name')}
              size="sm"
              placeholder="seu nome"
              crossOrigin=""
            />

            {errors.name && <FormError>{errors.name.message}</FormError>}
          </label>

          <Button disabled={isSubmitting} size="sm" type="submit">
            Próximo
            <ArrowRight />
          </Button>
        </Form>
      </Container>
    </>
  )
}

export default Register
