import Image from "next/image";
import styles from './home..module.scss'
import Head from "next/head";
import SingleTrend from "@/components/singletrending/SingleTrend";
import SingleCategory from "@/components/singlecategory/SingleCategory";
import CardCategory from "@/components/cardcategory/CardCategory";
import Navbar from "@/components/navbar/Navbar";
import Link from "next/link";

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
    url: 'https://jiabaili.shop',
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

const getData = async () => {
   try{
         const res = await fetch("https://api.jiabaili.shop/api/product/getshuffle", {cache:"no-store"})
         return res.json()
   }catch(err){

   }
}

const getProducts = async () => {
   try{
         const res = await fetch("https://api.jiabaili.shop/api/product/home")
         return res.json()
   }catch(err){

   }
}


export default async function Home() {
    const shuffle = await getData()
    const products = await getProducts()



  return (
    <div className={styles.mainPageDivControl}>
      <Navbar/>
      <div className={styles.shopdeeSubcategories}>

            <Link href={"/categories/657952bb37e8cd6092d11d12"} prefetch={false}>
            <div className={styles.shopdeeitem}>
               <div className={styles.shopdicon}> 
                  <Image src="/image/5988246.png" width={300}  height={200}  />
               </div>
               <div className={styles.shopdeeword}>Appliances </div>
            </div>
            </Link>

           <Link href={"/categories/6579521f37e8cd6092d11cf2"} prefetch={false}>
           <div className={styles.shopdeeitem}>
              <div className={styles.shopdicon}> 
                 <Image src="/image/kitchen.png" width={300}  height={200}  />
              </div>
              <div className={styles.shopdeeword}>Kitchen</div>
           </div>
           </Link>

           <Link href={"/categories/657951f837e8cd6092d11cee"} prefetch={false}>
           <div className={styles.shopdeeitem}>
              <div className={styles.shopdicon}> 
                 <Image src="/image/crane.png" width={300}  height={200}  />
              </div>
              <div className={styles.shopdeeword}>Tools</div>
           </div>
           </Link>

           <Link href={"/categories/657951ec37e8cd6092d11cde"} prefetch={false}>
           <div className={styles.shopdeeitem}>
              <div className={styles.shopdicon}> 
                 <Image src="/image/electronics.png" width={300}  height={200}  />
              </div>
              <div className={styles.shopdeeword}>Electronics</div>
           </div>
           </Link>

           <Link href={"/categories/6579522f37e8cd6092d11cfa"} prefetch={false}>
           <div className={styles.shopdeeitem}>
              <div className={styles.shopdicon}> 
                 <Image src="/image/rc-car.png" width={300}  height={200}  />
              </div>
              <div className={styles.shopdeeword}>Toys</div>
           </div>
           </Link>

           <Link href={"/categories/6579523937e8cd6092d11cfe"} prefetch={false}>
           <div className={styles.shopdeeitem}>
              <div className={styles.shopdicon}> 
                 <Image src="/image/brand.png" width={300}  height={200}  />
              </div>
              <div className={styles.shopdeeword}>Fashion</div>
           </div>
           </Link>

           <Link href={"/categories/657951e437e8cd6092d11cdb"} prefetch={false}>
           <div className={styles.shopdeeitem}>
              <div className={styles.shopdicon}> 
                 <Image src="/image/pipes.png" width={300}  height={200}  />
              </div>
              <div className={styles.shopdeeword}>Hardware</div>
           </div>
           </Link>

           <Link href={"/categories/6579522637e8cd6092d11cf6"} prefetch={false}>
           <div className={styles.shopdeeitem}>
              <div className={styles.shopdicon}> 
                 <Image src="/image/stationary (2).png" width={300}  height={200}  />
              </div>
              <div className={styles.shopdeeword}>Stationary</div>
           </div>
           </Link>

           <Link href={"/categories/6579524d37e8cd6092d11d02"} prefetch={false}>
           <div className={styles.shopdeeitem}>
              <div className={styles.shopdicon}> 
                 <Image src="/image/car.png" width={300}  height={200}  />
              </div>
              <div className={styles.shopdeeword}>Automobile</div>
           </div>
           </Link>

           <Link href={"/categories/657952f037e8cd6092d11d16"} prefetch={false}>
           <div className={styles.shopdeeitem}>
              <div className={styles.shopdicon}> 
                 <Image src="/image/construction.png" width={300}  height={200}  />
              </div>
              <div className={styles.shopdeeword}>Construction</div>
           </div>
           </Link>

      </div>
      <div className={styles.homeseperator}></div>
      <div className={styles.someimage}>
          <div className={styles.imageHolder}>
              <img className={styles.image} height={100}  width={100} src="/image/14.png" />
          </div>
      </div>
      <div className={styles.homeseperator}></div>  
      <div className={styles.shopediscount}>
           <div className={styles.sdiscotop}>
              <h1 className={styles.stleft}>BEST DEALS</h1>
              <div className={styles.stright}> </div>
           </div>
           <div className={styles.sdiscodown}>
               {
                   Array(6).fill().map((_,index)=>(
                        <SingleTrend key={index} data={shuffle[index]}/>  
                  ))
               }  
           </div>
        </div>  
      <div className={styles.homeseperator}></div> 
      <div className={styles.someimage}>
          <div className={styles.imageHolder}>
              <img className={styles.image} height={100}  width={100} src="/image/77.jpg" />
          </div>
      </div>
      <div className={styles.homeseperator}></div> 
      
      {/* <CardCategory  /> */}

      {/* <div className={styles.categoriesAreaList}>
         {
         products && <CardCategory  data={products?.[0]}/>
      }
      </div> */}

      {
         products.map((item,index)=>(
            <div key={index}>
            <CardCategory key={index} data={item}/>
            <div className={styles.homeseperator}></div>  
            </div>
         ))
      } 
    </div>
  );
}
