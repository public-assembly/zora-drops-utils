/** @type {import('next').NextConfig} */

const withPreconstruct = require("@preconstruct/next");

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    externalDir: true,
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(md|mdx)?$/,
      use: [
        {
          loader: '@mdx-js/loader',
          /** @type {import('@mdx-js/loader').Options} */
          options: {},
        },
      ],
    })
    return config
  },
}

module.exports = withPreconstruct({ ...nextConfig });