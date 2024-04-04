"use client"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck } from '@fortawesome/free-regular-svg-icons'
import './completed.scss'


// export const metadata = {
//     title: "Payment successful",
//     description: "Experience Excellence: Your Ultimate Destination for Online Shopping!,",
//     keywords: "Jiabaili, electronics, hardware, toys, construction, home appliances, fashion, automobile, tools, stationary, online shoping, ",
//     icons: {
//       icon: '/image/logo.png',
//       shortcut: '/image/car.png',
//       apple: '/image/logo.png',
//       other: {
//         rel: 'apple-touch-icon-precomposed',
//         url: '/image/logo.png',
//       },
//     },
//     openGraph: {
//       title: 'Payment successful',
//       description: 'Experience Excellence: Your Ultimate Destination for Online Shopping!',
//       url: 'https://jiabaili.shop',
//       siteName: 'Jia Bai Li Supermarket',
//       images: [
//         {
//           url: 'https://m.jiabaili.shop/image/logo.png', // Must be an absolute URL
//           width: 800,
//           height: 600,
//         },
//         {
//           url: 'https://m.jiabaili.shop/image/logo.png', // Must be an absolute URL
//           width: 1800,
//           height: 1600,
//           alt: 'My custom alt',
//         },
//       ],
//       locale: 'en_US',
//       type: 'website',
//     },
//   }
const Completed = () => {

  return (
    <div>
        <div className="containerpay">
            <div className="icon"><FontAwesomeIcon icon={faCircleCheck} /></div>
            <div className="worder">Payment Successful</div>
            <div className="worder">go to orders</div>
        </div>
      
    </div>
  )
}

export default Completed
