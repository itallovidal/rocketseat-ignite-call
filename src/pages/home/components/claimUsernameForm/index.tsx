import React from 'react'
import { TextInput, Button, Text } from '@ignite-ui/react'
import { ArrowRight } from 'phosphor-react'
import {
  Form,
  FormAnnotation,
} from '@/pages/home/components/claimUsernameForm/styles'
import { useForm } from 'react-hook-form'
import z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/router'

const claimUserNameSchema = z.object({
  username: z
    .string()
    .min(4, {
      message: 'Username deve ter mais de 4 caracteres.',
    })
    .regex(/^([a-z\\\\-]+)$/i, {
      message: 'Username deve ter apenas hífens e letras.',
    })
    .transform((value) => value.toLowerCase()),
})

interface IClaimUserName extends z.infer<typeof claimUserNameSchema> {}

function ClaimUserNameForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IClaimUserName>({
    resolver: zodResolver(claimUserNameSchema),
  })

  const router = useRouter()
  async function handleClaimUsername(data: IClaimUserName) {
    await router.push(`/register?username=${data.username}`)

    console.log(data)
  }

  return (
    <>
      <Form as="form" onSubmit={handleSubmit(handleClaimUsername)}>
        <TextInput
          size="sm"
          prefix="ignite.com/"
          placeholder="seu-usuário"
          crossOrigin=""
          {...register('username')}
        />
        <Button size="sm" type="submit">
          Reservar
          <ArrowRight />
        </Button>
      </Form>

      <FormAnnotation>
        <Text>
          {errors.username?.message
            ? errors.username?.message
            : 'Digite seu username.'}
        </Text>
      </FormAnnotation>
    </>
  )
}

export default ClaimUserNameForm
