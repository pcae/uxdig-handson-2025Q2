import path from 'path'
import { NextConfig } from 'next'

console.log('TARGET_ENVIRONMENT_STATUS >>>>> ' + process.env.TARGET)

const { PHASE_DEVELOPMENT_SERVER } = require('next/constants')
const nextCommonConfig = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT' },
          {
            key: 'Access-Control-Allow-Headers',
            value:
              'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
          },
        ],
      },
    ]
  },
}
const nextDevConfig = {}
const nextConfig = {}

const config = (phase: string, { defaultConfig }: { defaultConfig: any }): NextConfig => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return { ...nextCommonConfig, ...nextDevConfig }
  }
  return { ...nextCommonConfig, ...nextConfig }
}

export default config
