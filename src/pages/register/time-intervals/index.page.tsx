import React from 'react'
import { Container, Header } from '@/pages/register/styles'
import {
  Button,
  Checkbox,
  Heading,
  MultiStep,
  Text,
  TextInput,
} from '@ignite-ui/react'
import {
  FormError,
  IntervalBox,
  IntervalDay,
  IntervalInputs,
  IntervalItem,
  IntervalsContainer,
} from '@/pages/register/time-intervals/style'
import { ArrowRight } from 'phosphor-react'
import { Controller, useFieldArray, useForm } from 'react-hook-form'
import { z } from 'zod'
import { getWeekDay } from '@/utils/get-week-day'
import { zodResolver } from '@hookform/resolvers/zod'
import { convertStringToMinutes } from '@/utils/convert-string-to-minutes'
import { api } from '@/lib/axios'
import { useRouter } from 'next/router'

const timeIntervalsSchema = z.object({
  intervals: z
    .array(
      z.object({
        weekDay: z.number(),
        enabled: z.boolean(),
        startTime: z.string(),
        endTime: z.string(),
      }),
    )
    .length(7)
    .transform((intervals) => intervals.filter((interval) => interval.enabled))
    .refine((intervals) => intervals.length, {
      message: 'Deve ser selecionado pelo menos 1 dia da semana.',
      path: [''],
    })
    .transform((intervals) =>
      intervals.map((interval) => {
        return {
          weekDay: interval.weekDay,
          startTimeInMinutes: convertStringToMinutes(interval.startTime),
          endTimeInMinutes: convertStringToMinutes(interval.endTime),
        }
      }),
    )
    .refine(
      (intervals) =>
        !intervals.some(
          (interval) => interval.endTimeInMinutes < interval.startTimeInMinutes,
        ),
      {
        message: 'Hora de término não pode ser menor do que a hora de início.',
        path: [''],
      },
    ),
})

interface ITimeIntevalsSchemaOutput
  extends z.output<typeof timeIntervalsSchema> {}

interface ITimeIntevalsSchemaInput
  extends z.input<typeof timeIntervalsSchema> {}

export default function TimeIntervals() {
  const {
    register,
    control,
    watch,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<ITimeIntevalsSchemaInput>({
    resolver: zodResolver(timeIntervalsSchema),
    defaultValues: {
      intervals: [
        { weekDay: 0, enabled: false, startTime: '08:00', endTime: '17:00' },
        { weekDay: 1, enabled: true, startTime: '08:00', endTime: '17:00' },
        { weekDay: 2, enabled: true, startTime: '08:00', endTime: '17:00' },
        { weekDay: 3, enabled: true, startTime: '08:00', endTime: '17:00' },
        { weekDay: 4, enabled: true, startTime: '08:00', endTime: '17:00' },
        { weekDay: 5, enabled: true, startTime: '08:00', endTime: '17:00' },
        { weekDay: 6, enabled: false, startTime: '08:00', endTime: '17:00' },
      ],
    },
  })

  console.log(errors)
  const router = useRouter()

  const { fields } = useFieldArray({
    control,
    name: 'intervals',
  })

  const intervals = watch('intervals')

  async function handleSetTimeIntervals(data: any) {
    try {
      const formData = data as ITimeIntevalsSchemaOutput
      await api.post('/users/time-intervals', formData)
      await router.push(`/register/update-profile`)
    } catch (e) {
      console.log(e)
    }
  }

  const weekDays = getWeekDay()
  return (
    <Container>
      <Header>
        <Heading as={'strong'}>Quase lá</Heading>

        <Text>
          Defina o intervalo de horários que você está disponível em cada dia da
          semana.
        </Text>

        <MultiStep size={4} currentStep={3} />
      </Header>

      <IntervalBox as={'form'} onSubmit={handleSubmit(handleSetTimeIntervals)}>
        <IntervalsContainer>
          {fields.map((field, index) => (
            <IntervalItem key={field.id}>
              <IntervalDay>
                <Controller
                  control={control}
                  render={({ field }) => (
                    <Checkbox
                      onCheckedChange={(checked) =>
                        field.onChange(checked === true)
                      }
                      checked={field.value}
                    />
                  )}
                  name={`intervals.${index}.enabled`}
                />
                <Text>{weekDays[field.weekDay]}</Text>
              </IntervalDay>
              <IntervalInputs>
                <TextInput
                  disabled={!intervals[index].enabled}
                  crossOrigin
                  size={'sm'}
                  type={'time'}
                  step={60}
                  {...register(`intervals.${index}.startTime`)}
                />
                <TextInput
                  disabled={!intervals[index].enabled}
                  crossOrigin
                  size={'sm'}
                  type={'time'}
                  step={60}
                  {...register(`intervals.${index}.endTime`)}
                />
              </IntervalInputs>
            </IntervalItem>
          ))}
        </IntervalsContainer>

        {errors.intervals && <FormError>{errors.intervals.message}</FormError>}

        <Button disabled={isSubmitting} type={'submit'}>
          Próximo passo
          <ArrowRight />
        </Button>
      </IntervalBox>
    </Container>
  )
}
