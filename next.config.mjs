/** @type {import('next').NextConfig} */
import { PrismaPlugin } from '@prisma/nextjs-monorepo-workaround-plugin'

const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ['page.tsx', 'api.ts', 'api.tsx'],
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.plugins = [...config.plugins, new PrismaPlugin()]
    }

    return config
  },
}

export default nextConfig
