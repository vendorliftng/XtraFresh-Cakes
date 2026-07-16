/** @type {import('next').NextConfig} */
const isGithubActions = process.env.GITHUB_ACTIONS || false;
let repo = 'XtraFresh-Cakes';

const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  basePath: isGithubActions ? `/${repo}` : '',
};

export default nextConfig;
