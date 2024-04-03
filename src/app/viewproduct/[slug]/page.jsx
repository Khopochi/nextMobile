import ViewProduct from "@/components/viewproduct/ViewProduct"


const formatNumberWithCommas = (value) => {
  return value.toLocaleString('en-US');
};
const calculateDiscountedPrice = (price,discount) => {
  if(!discount)
      return formatNumberWithCommas(price)
      

  const discountAmount = (price * discount) / 100;
  const discountedPrice = price - discountAmount;

  

  return formatNumberWithCommas(discountedPrice)
};

export async function generateMetadata({params}, parent) {
  // read route params
  const {slug} = params
 
  // fetch data
  const product = await fetch(`https://api.jiabaili.shop/api/product/getsingleproduct/${slug}`).then((res) => res.json())
  return {
    title: product.name,
    description: product.details,
    keywords: `${product.name}, durable, cheap, jia bai li, jiabaili, online shopping, malawi, ecommerce in malawi`,
    url: `https://mobile.jiabaili.shop/viewproduct/${slug}`,
    openGraph: {
        title: `${product.name}: Jia Bai Li Supermarket`,
        description: `MK ${calculateDiscountedPrice(product.price, product.discount)} - ${product.name} at Jia Bai Li Supermarket, unbeatable prices!`,
        url: `https://jiabaili.shop/viewproduct/${slug}`,
        siteName: 'Jia Bai Li Supermarket',
        images: [
          {
            url: `https://api.jiabaili.shop/api/photos/${product.photos[0]}`, // Must be an absolute URL
            width: 800,
            height: 600,
          },
          {
            url: `https://api.jiabaili.shop/api/photos/${product.photos[0]}`, // Must be an absolute URL
            width: 1800,
            height: 1600,
            alt: 'My custom alt',
          },
        ],
        locale: 'en_US',
        type: 'website',
    },
    icons: {
      icon: '/image/logo.png',
      shortcut: '/image/car.png',
      apple: '/image/logo.png',
      other: {
        rel: 'apple-touch-icon-precomposed',
        url: '/image/logo.png',
      },
    },
  }
}
const page = () => {
  return (
    <div>
      <ViewProduct />
    </div>
  )
}

export default page
