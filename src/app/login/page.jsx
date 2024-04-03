import { MyLogin } from "@/components/login/Login"
import './loginpage.scss'
import Link from "next/link"

export const metadata = {
  title: "Login - Jia Bai Li Supermarket",
  description: "Login to Experience Excellence: Your Ultimate Destination for Online Shopping!,",
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
    url: 'https://mobile.jiabaili.shop',
    siteName: 'Jia Bai Li Supermarket',
    images: [
      {
        url: '/image/logo.png', // Must be an absolute URL
        width: 800,
        height: 600,
      },
      {
        url: '/image/logo.png', // Must be an absolute URL
        width: 1800,
        height: 1600,
        alt: 'My custom alt',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
}

const Login = () => {
  return (
    <div className="loginPagee">
      <MyLogin />
    </div>
  )
}

export default Login
