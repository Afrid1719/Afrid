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
            }
        ]
    }
}

module.exports = nextConfig
