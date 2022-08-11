/** @type {import('next').NextConfig} */
const LiveReloadPlugin = require('webpack-livereload-plugin')
const ESLintPlugin = require('eslint-webpack-plugin')
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})
require('dotenv').config()

const env = {
  NEXT_PUBLIC_API_MURAL_URL: process.env.NEXT_PUBLIC_API_MURAL_URL
}

const nextConfig = {
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    if (dev) config.plugins.push(
      new ESLintPlugin({
        extensions: ['ts', 'tsx'],
        failOnError: true
      })
    )
    return config
  },
  env,
  reactStrictMode: false,
  compiler: {
    // ssr and displayName are configured by default
    styledComponents: true,
  },
  swcMinify: false,
}

module.exports = withBundleAnalyzer(nextConfig)
