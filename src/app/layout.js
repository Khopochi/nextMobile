import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar/Navbar";
import GoogleAnalytics from "@bradgarropy/next-google-analytics"

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Jia Bai Li Supermarket",
  description: "Experience Excellence: Your Ultimate Destination for Online Shopping!,",
  keywords: "Jiabaili, electronics, hardware, toys, construction, home appliances, fashion, automobile, tools, stationary, online shoping, ",
  icons: {
    icon: '/image/logo.png',
    shortcut: '/image/car.png',
    apple: '/image/logo.png',
    other: {
      rel: 'apple-touch-icon-precomposed',
      url: '/image/logo.png',
    },
  },
  openGraph: {
    title: 'Jia Bai Li Supermarket',
    description: 'Experience Excellence: Your Ultimate Destination for Online Shopping!',
    url: 'https://m.jiabaili.shop',
    siteName: 'Jia Bai Li Supermarket',
    images: [
      {
        url: 'https://m.jiabaili.shop/image/logo.png', // Must be an absolute URL
        width: 800,
        height: 600,
      },
      {
        url: 'https://m.jiabaili.shop/image/logo.png', // Must be an absolute URL
        width: 1800,
        height: 1600,
        alt: 'My custom alt',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
}

export default function RootLayout({ children,}) {
  return (
    <html lang="en">

      <body className={inter.className}>
        {children}</body>
        <GoogleAnalytics measurementId="G-MK0VGHSKB3" />
        
    </html>
  );
}
