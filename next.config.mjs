import withPlaiceholder from '@plaiceholder/next';
import analyzer from "@next/bundle-analyzer"    

const withBundleAnalyzer = analyzer({
    enabled: process.env.ANALYZE === 'true'
})


/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "lh3.googleusercontent.com"
            },
            {
                protocol: "https",
                hostname: "img.icons8.com"
            },
            {
                protocol: "https",
                hostname: "avatar.iran.liara.run"
            },
            {
                protocol: "https",
                hostname: "via.placeholder.com"
            },
            {
                protocol: "https",
                hostname: "*"
            }
        ]
    }
}

export default withBundleAnalyzer(withPlaiceholder(nextConfig));
