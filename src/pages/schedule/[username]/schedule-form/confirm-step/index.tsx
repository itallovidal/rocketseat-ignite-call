import React from 'react'
import { Form } from '@/pages/schedule/[username]/schedule-form/confirm-step/style'
import { Button, Text, TextArea, TextInput } from '@ignite-ui/react'
import { CalendarBlank, Clock } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import dayjs from 'dayjs'
import { api } from '@/lib/axios'
import { useRouter } from 'next/router'

const confirmFormSchema = z.object({
  name: z.string().min(3, { message: 'O nome precisa no mínimo 3 caracteres' }),
  email: z.string().email({ message: 'Digite um e-mail válido' }),
  observations: z.string().nullable(),
})

type ConfirmFormData = z.infer<typeof confirmFormSchema>

interface IConfirmStepProps {
  schedulingDate: Date
  handleGoBack: () => void
}

export function ConfirmStep({
  schedulingDate,
  handleGoBack,
}: IConfirmStepProps) {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<ConfirmFormData>({
    resolver: zodResolver(confirmFormSchema),
  })

  const router = useRouter()
  const username = String(router.query.username)

  async function handleConfirmScheduling(data: ConfirmFormData) {
    const { name, email, observations } = data
    await api.post(`/users/${username}/schedule`, {
      name,
      email,
      observations,
      date: schedulingDate,
    })

    handleGoBack()
  }

  const formattedDate = dayjs(schedulingDate).format('DD[ de ]MMMM[ de ]YYYY')
  const formattedHours = dayjs(schedulingDate).format('HH:mm[h]')

  return (
    <Form.Confirm as="form" onSubmit={handleSubmit(handleConfirmScheduling)}>
      <Form.Header>
        <Text>
          <CalendarBlank />
          {formattedDate}
        </Text>
        <Text>
          <Clock />
          {formattedHours}
        </Text>
      </Form.Header>

      <label>
        <Text size={`sm`}> Nome completo </Text>
        <TextInput crossOrigin placeholder={`Seu nome`} {...register('name')} />
        {errors.name && (
          <Form.Error size="sm">{errors.name.message}</Form.Error>
        )}
      </label>

      <label>
        <Text size={`sm`}> Email </Text>
        <TextInput
          crossOrigin
          type="email"
          placeholder="johndoe@example.com"
          {...register('email')}
        />
        {errors.email && (
          <Form.Error size="sm">{errors.email.message}</Form.Error>
        )}
      </label>

      <label>
        <Text size="sm">Observações</Text>
        <TextArea {...register('observations')} />
      </label>

      <Form.Actions>
        <Button type="button" variant="tertiary" onClick={handleGoBack}>
          Cancelar
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          Confirmar
        </Button>
      </Form.Actions>
    </Form.Confirm>
  )
}
