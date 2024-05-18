/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    })
  
    return config
  },
  output: 'export',
  // TODO: remove it later
  images: { unoptimized: true },
}

export default nextConfig
