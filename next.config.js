/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  // env: {
  //   urlSearch: 'hml-reversamkt-lb-1609041014.us-east-2.elb.amazonaws.com',
  //   urlSearchPort: '8080'
  // },
  async rewrites() {
    return [
      {
        source: '/api/painel/:path*',
        destination: 'http://localhost:8000/:path*',
      },
      {
        source: '/api/financeiro/:path*',
        destination: 'http://prd-financeiro-lb-275065823.us-east-1.elb.amazonaws.com:8080/:path*',
      },
    ]
  },
  webpack: (config, {dev, isServer}) => {
    if (!dev && !isServer) {
      Object.assign(config.resolve.alias, {
        'react': 'preact/compat',
        'react-dom/test-utils': 'preact/test-utils',
        'react-dom': 'preact/compat',
      });
    }
    return config;
  },
}
