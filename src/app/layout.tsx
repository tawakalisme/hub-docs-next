import localFont from "@next/font/local";
import Navbar from "@/components/Navbar";
import "@/styles/globals.css";

const palladio = localFont({
  src: [
    {
      path: "../fonts/Palladio-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/Palladio-Italic.woff2",
      weight: "400",
      style: "italic",
    },
    {
      path: "../fonts/Palladio-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../fonts/Palladio-BoldItalic.woff2",
      weight: "700",
      style: "italic",
    },
  ],
  display: "swap",
  variable: "--font-palladio",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body className={`${palladio.variable}`}>
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
