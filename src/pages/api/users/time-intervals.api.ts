import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/pages/api/auth/[...nextauth].api'
import { z } from 'zod'

const timeIntervalsBodySchema = z.object({
  intervals: z.array(
    z.object({
      weekDay: z.number(),
      startTimeInMinutes: z.number(),
      endTimeInMinutes: z.number(),
    }),
  ),
})

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') return res.status(405).end()

  const session = await getServerSession(req, res, authOptions(req, res))

  if (!session) return res.status(401).end()

  const result = timeIntervalsBodySchema.safeParse(req.body)

  if (!result.success) return res.status(400).end()

  const {
    data: { intervals },
  } = result

  await Promise.all(
    intervals.map(async (interval) => {
      await prisma.userTimeInterval.create({
        data: {
          time_end_in_minutes: interval.endTimeInMinutes,
          time_start_in_minutes: interval.startTimeInMinutes,
          user_id: session.user.id,
          week_day: interval.weekDay,
        },
      })
    }),
  )

  return res.status(201).end()
}
