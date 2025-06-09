import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  // Add this if your repo isn't at the root domain
  basePath: process.env.NODE_ENV === 'production' ? '/stevenjhomem.github.io' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/stevenjhomem.github.io/' : '',
}

export default nextConfig