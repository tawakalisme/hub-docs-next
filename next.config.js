/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    fontLoaders: [
      { loader: "@next/font/google", options: { subsets: ["latin"] } },
      {
        loader: "@next/font/local",
        options: {
          src: [
            {
              path: "./src/fonts/Palladio-Regular.woff2",
              weight: "400",
              style: "normal",
            },
            {
              path: "./src/fonts/Palladio-Italic.woff2",
              weight: "400",
              style: "italic",
            },
            {
              path: "./src/fonts/Palladio-Bold.woff2",
              weight: "700",
              style: "normal",
            },
            {
              path: "./src/fonts/Palladio-BoldItalic.woff2",
              weight: "700",
              style: "italic",
            },
          ],
          display: "swap",
          variable: "--font-palladio",
        },
      },
    ],
  },
};

module.exports = nextConfig;
