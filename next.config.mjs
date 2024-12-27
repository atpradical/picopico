/** @type {import('next').NextConfig} */
const nextConfig = {
    i18n: {
        defaultLocale: "ru",
        locales: ["en", "ru"],
    },
    images: {
        remotePatterns: [
            {
                hostname: 'staging-it-incubator.s3.eu-central-1.amazonaws.com',
                pathname: '/trainee-instagram-api/Image/**',
                port: '',
                protocol: 'https',
            },
        ],
    },
    reactStrictMode: false,
};

export default nextConfig;
