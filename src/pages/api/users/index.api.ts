import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '@/lib/prisma'
import { setCookie } from 'nookies'
import { IRegisterSchema } from '@/pages/register/index.page'
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') return res.status(405).end()

  const { name, username } = req.body as IRegisterSchema

  if (!name || !username) return res.status(400).end()

  const userExists = await prisma.user.findUnique({
    where: {
      username,
    },
  })

  if (userExists) {
    return res.status(400).send('User already exists.')
  }

  const user = await prisma.user.create({
    data: {
      name,
      username,
    },
  })

  setCookie(
    {
      res,
    },
    '@ignitecall:userid',
    user.id,
    {
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
    },
  )

  return res.status(200).send(user)
}
