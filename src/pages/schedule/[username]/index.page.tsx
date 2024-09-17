import { UserHeader, Container } from '@/pages/schedule/[username]/style'
import { Avatar, Heading, Text } from '@ignite-ui/react'
import { GetStaticPaths, GetStaticProps } from 'next'
import { prisma } from '@/lib/prisma'
import ScheduleForm from '@/pages/schedule/[username]/schedule-form/schedule-form'

interface ScheduleProps {
  user: {
    name: string
    bio: string
    avatarUrl: string
  }
}

export default function Schedule({
  user: { avatarUrl, name, bio },
}: ScheduleProps) {
  return (
    <Container>
      <UserHeader>
        <Avatar src={avatarUrl} />
        <Heading> {name}</Heading>
        <Text>{bio}</Text>
      </UserHeader>

      <ScheduleForm />
    </Container>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const username = String(params?.username)

  const user = await prisma.user.findUnique({
    where: {
      username,
    },
  })

  if (!user)
    return {
      notFound: true,
    }

  return {
    props: {
      user: {
        name: user.name,
        bio: user.bio,
        avatarUrl: user.avatar_url,
      },
    },
    revalidate: 60 * 60 * 24, // 1 dia
  }
}
