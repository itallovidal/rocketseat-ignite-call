import React, { useState } from 'react'
import CalendarStep from '@/pages/schedule/[username]/schedule-form/calendar-step'
import { ConfirmStep } from '@/pages/schedule/[username]/schedule-form/confirm-step'

function ScheduleForm() {
  const [selectedDateTime, setSelectedDateTime] = useState<Date | null>()

  function handleSelectTime(date: Date | null) {
    setSelectedDateTime(date)
  }

  if (selectedDateTime) {
    return (
      <ConfirmStep
        schedulingDate={selectedDateTime}
        handleGoBack={() => handleSelectTime(null)}
      />
    )
  }

  return <CalendarStep onSelectDateTime={handleSelectTime} />
}

export default ScheduleForm
