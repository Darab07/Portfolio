import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import ClientLayout from "./ClientLayout"

export const metadata: Metadata = {
  title: "Mohammad Darab Khan - Portfolio",
  description: "Branding and web design studio, driven by strategy & innovation",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://use.typekit.net/abc1def.css" />
        <style
          dangerouslySetInnerHTML={{
            __html: `
            @font-face {
              font-family: 'Newhouse DT Light';
              src: url('/fonts/NewhouseDT-Light.woff2') format('woff2'),
                   url('/fonts/NewhouseDT-Light.woff') format('woff');
              font-weight: 300;
              font-style: normal;
              font-display: swap;
            }
          `,
          }}
        />
      </head>
      <ClientLayout>{children}</ClientLayout>
    </html>
  )
}
