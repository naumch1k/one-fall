/** @type {import('next').NextConfig} */
const nextConfig = {
  // images: {
  //   formats: ['image/avif', 'image/webp'],
  //   remotePatterns: [
  //     {
  //       protocol: 'https',
  //       hostname: 'raw.githubusercontent.com',
  //       port: '',
  //       pathname: '/naumch1k/misc/main/images/one-fall/**',
  //     },
  //   ],
  // },
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
