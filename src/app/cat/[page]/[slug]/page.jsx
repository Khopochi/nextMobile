import SecondNav from "@/components/secondnav/SecondNav"
import './categories.scss'
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


const getProducts = async (id, pg) => {

// console.log(pg)
  try{
        const res = await fetch(`https://api.jiabaili.shop/api/category/searchpagination/${id}/${pg}`, {cache:"no-store"})
        return res.json()
  }catch(err){

  }
}

const page = async ({params}) => {

  const {slug} = params
  const {page} = params
  const products = await getProducts(slug,page)
  const myproducts = products

  const nextNumber = parseInt(page, 10) + 1
  const prevPage = parseInt(page, 10) - 1

 

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
        <div className="prevpage">
          <div className="image"> <img src="/image/cl.svg" alt="" /> </div>
          {(prevPage <= 0) && <Link href={`/categories/${slug}`}><div className="wordleft">Prev</div></Link> }
          {(prevPage > 0) && <Link href={`/cat/${prevPage}/${slug}`} prefetch={false}><div className="wordleft">Prev</div></Link> }
        </div>
        <div className="nextpage">
        <Link href={`/cat/${nextNumber}/${slug}`} prefetch={false}><div className="wordleft">Next</div></Link>
          <div className="image"> <img src="/image/chevrons-right.svg" alt="" /> </div>
        </div>
      </div>



    </div>
  )
}

export default page
