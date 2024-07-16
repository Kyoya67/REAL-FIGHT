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
        url: "/ogp.png",
        width: 1200,
        height: 630,
        alt: "OGP Image",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@tyooooooya",
    title: "REAL FIGHT",
    description: "いざ、止まらん",
    images: [
      {
        url: "/ogp.png",
        alt: "OGP Image",
      },
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="ja">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
