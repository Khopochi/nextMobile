import SecondNav from "@/components/secondnav/SecondNav"
import './category.scss'
import CardSubList from "@/components/cardsublist/CardSubList"
import SearchCard from "@/components/searchcard/SearchCard"
import Link from "next/link"



export async function generateMetadata({params}, parent) {
  // read route params
  const {slug} = params
 
  // fetch data
  const product = await fetch(`https://api.jiabaili.shop/api/product/categories/${slug}`).then((res) => res.json())
  return {
    title: product.categories[0].name,
    description: `Purchase the best ${product.categories[0].name} at Jia Bai Li Supermarket, unbeatable prices!`,
    keywords: `${product.categories[0].name}, durable, cheap, jia bai li, jiabaili, online shopping, malawi`,
    url: `https://mobile.jiabaili.shop/categories/${slug}`,
    openGraph: {
        title: `${product.categories[0].name}: Jia Bai Li Supermarket`,
        description: `Purchase the best ${product.categories[0].name} at Jia Bai Li Supermarket, unbeatable prices!`,
        url: `https://mobile.jiabaili.shop/categories/${slug}`,
        siteName: 'Jia Bai Li Supermarket',
        images: [
          {
            url: `https://api.jiabaili.shop/api/photos/${slug}.jpg`, // Must be an absolute URL
            width: 800,
            height: 600,
          },
          {
            url: `https://api.jiabaili.shop/api/photos/${slug}.jpg`, // Must be an absolute URL
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


const getProducts = async (id) => {
   

  try{
        const res = await fetch("https://api.jiabaili.shop/api/product/categories/"+id, {cache:"no-store"})
        return res.json()
  }catch(err){

  }
}

const Category = async ({params}) => {
  const {slug} = params
  const products = await getProducts(slug)
  const myproducts = products.products
  console.log(slug)
  return (
    <div>
      <div className="staticnavbar">
        <SecondNav/>
      </div>
      <div className="categoryimage" style={{ backgroundImage: `url(https://api.jiabaili.shop/api/photos/${slug}.jpg)` }}>
         <img src="" alt="" />
      </div>
      <div className="homeseperator"></div>
      {/* <CardSubList name={products.categories[0].name}/> */}
      <div className="homeseperator"></div>
      <div className="itemsbody">
        {
          myproducts.map((item,index)=>(
              <SearchCard key={index} data={item}/>
          ))
        }
      </div>
      <div className="homeseperator"></div>
      <div className="pagenation">
        <div className="prevpagee">
          <div className="image"> <img src="/image/chevrons-left.svg" alt="" /> </div>
          <div className="wordleft">Prev</div>
        </div>
        <div className="nextpage">
          <Link href={`/cat/${2}/${slug}`} prefetch={false}><div className="wordleft">Next</div></Link>
          <div className="image"> <img src="/image/chevrons-right.svg" alt="" /> </div>
        </div>
      </div>



    </div>
  )
}

export default Category
