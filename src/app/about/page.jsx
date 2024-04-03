import './terms.scss';

export const metadata = {
    title: "About Jia Bai Li Supermarket",
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
      title: 'About Jia Bai Li Supermarket',
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
const page = () => {
  return (
    <div className="container1">
    <header>
        <h1>Welcome to Jia Bai Li Supermarket</h1>
        <p>Providing Quality Products at Great Prices</p>
    </header>
    <div className="homeseperator"></div>
    <main>
        <h2>About Jia Bai Li Supermarket</h2>
        <p>Jia Bai Li Supermarket is your one-stop online platform for all your shopping needs. We offer a wide range of products at affordable prices, ranging from groceries and household items to electronics and fashion accessories.</p>
        <p>Our mission is to provide our customers with the best shopping experience possible, offering high-quality products, excellent customer service, and fast delivery.</p>
    <div className="homeseperator"></div>

        <h3>Membership Benefits</h3>
        <p>Join Jia Bai Li Supermarket today to enjoy exclusive membership benefits, including:</p>
        <ul>
            <li>Access to a vast selection of products</li>
            <li>Special discounts and promotions</li>
            <li>Fast and reliable delivery</li>
            <li>Easy returns and exchanges</li>
        </ul>
    <div className="homeseperator"></div>

        <h3>Our Commitment</h3>
        <p>At Jia Bai Li Supermarket, we are committed to providing our customers with top-notch products at competitive prices. We source our products from trusted suppliers to ensure quality and reliability.</p>
        <p>Customer satisfaction is our priority, and we strive to exceed your expectations with every purchase.</p>
    </main>
    <div className="homeseperator"></div>

    <footer>
        <p>Contact Information:</p>
        <p>Address: Jia Bai Li Supermarket, PO Box 1606, Lilongwe</p>
        <p>Phone Numbers: +265991281977 or +265886356724</p>
    </footer>
</div>

  )
}

export default page
