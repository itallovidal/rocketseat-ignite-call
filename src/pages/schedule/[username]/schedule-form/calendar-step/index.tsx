import { useState } from 'react'
import {
  Container,
  TimePicker,
} from '@/pages/schedule/[username]/schedule-form/calendar-step/style'
import Calendar from '@/components/calendar/index'
import dayjs from 'dayjs'
import { useRouter } from 'next/router'
import { api } from '@/lib/axios'
import { useQuery } from '@tanstack/react-query'

interface IAvailability {
  possibleTimes: number[]
  availableTimes: number[]
}

interface ICalendarStepProps {
  onSelectDateTime: (date: Date) => void
}

function CalendarStep({ onSelectDateTime }: ICalendarStepProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const isDateSelected = !!selectedDate
  const router = useRouter()
  const username = String(router.query.username)

  const datetime = selectedDate
    ? dayjs(selectedDate).format('YYYY-MM-DD')
    : null

  const { data: availability } = useQuery<IAvailability>({
    queryKey: ['availability', datetime],
    queryFn: async () => {
      const { data } = await api.get(`/users/${username}/availability`, {
        params: {
          date: datetime,
        },
      })

      return data
    },
    enabled: isDateSelected,
  })

  function handleDateChange(date: Date): void {
    setSelectedDate(date)
  }

  const weekDay = selectedDate ? dayjs(selectedDate).format('dddd') : null
  const weekDayDescribed = selectedDate
    ? dayjs(selectedDate).format('DD[ de ]MMMM')
    : null

  function handleSelectTime(hour: number) {
    const dateTime = dayjs(selectedDate).set('hour', hour).startOf('hour')

    onSelectDateTime(dateTime.toDate())
  }
  return (
    <Container isTimePickerOpen={isDateSelected}>
      <Calendar selectedDate={selectedDate} onDateSelected={handleDateChange} />

      {isDateSelected && (
        <TimePicker.Container>
          <TimePicker.Header>
            {weekDay} <span> {weekDayDescribed}</span>
          </TimePicker.Header>
          <TimePicker.List>
            {availability?.possibleTimes.map((hour) => {
              return (
                <TimePicker.Item
                  onClick={() => handleSelectTime(hour)}
                  key={hour}
                  disabled={!availability.availableTimes.includes(hour)}
                >
                  {String(hour).padStart(2, '0')}:00h
                </TimePicker.Item>
              )
            })}
          </TimePicker.List>
        </TimePicker.Container>
      )}
    </Container>
  )
}

export default CalendarStep
