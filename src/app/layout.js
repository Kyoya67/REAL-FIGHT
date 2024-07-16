import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "REAL FIGHT",
  description: "いざ、止まらん",
  icons: {
    icon: "/icon.png",
  },
  openGraph: {
    title: "REAL FIGHT",
    description: "いざ、止まらん",
    type: "website",
    url: "https://real-fight-tau.vercel.app",
    images: [
      {
        url: "https://real-fight-tau.vercel.app/ogp.png",
        width: 1200,
        height: 630,
        alt: "OGP Image",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "REAL FIGHT",
    description: "いざ、止まらん",
    images: [
      {
        url: "https://real-fight-tau.vercel.app/ogp.png",
        width: 1200,
        height: 630,
        alt: "OGP Image",
      },
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="ja">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>REAL FIGHT</title>
        <meta name="description" content="いざ、止まらん" />
        <link rel="icon" href="/icon.png" />
        <meta property="og:title" content="REAL FIGHT" />
        <meta property="og:description" content="いざ、止まらん" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://real-fight-tau.vercel.app" />
        <meta
          property="og:image"
          content="https://real-fight-tau.vercel.app/ogp.png"
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@tyooooooya" />
        <meta name="twitter:title" content="REAL FIGHT" />
        <meta name="twitter:description" content="いざ、止まらん" />
        <meta
          name="twitter:image"
          content="https://real-fight-tau.vercel.app/ogp.png"
        />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
