import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/pages/api/auth/[...nextauth].api'
import { z } from 'zod'

const updateProfileBodySchema = z.object({
  bio: z.string(),
})

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'PUT') return res.status(405).end()

  const session = await getServerSession(req, res, authOptions(req, res))

  if (!session) return res.status(401).end()

  const result = updateProfileBodySchema.safeParse(req.body)

  if (!result.success) return res.status(400).end()

  const {
    data: { bio },
  } = result

  await prisma.user.update({
    where: {
      id: session.user.id,
    },
    data: { bio },
  })

  return res.status(204).end()
}
