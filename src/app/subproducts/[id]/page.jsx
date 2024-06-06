"use client"
import React, { useEffect, useState } from 'react'
// import './product.scss'
import { BeatLoader } from 'react-spinners'
import InfiniteScroll from 'react-infinite-scroll-component'
import SecondNav from '@/components/secondnav/SecondNav'
import axios from 'axios'
import { useParams } from 'next/navigation'
import SearchCard from '@/components/searchcard/SearchCard'
import "./subproducts.scss"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleRight, faHome } from '@fortawesome/free-solid-svg-icons'

const Page = () => {
  const {id} = useParams()
    const [data,setData] = useState()
    const [products, setProducts] = useState()
    const [ids, setIds] = useState()



    const [names, setNames] = useState()



    const getLocation =  async() => {
        try{
            const res = await axios.get("https://api.jiabaili.shop/api/product/getcategoryandsubcategoryforlocationy/"+id, {cache: "no-cache"})
            setNames(res.data)


        }catch(err){

        }
    }


 
    const getProducts = async () => {
        setLoader(true)
        try{
            const res = await axios.get("https://api.jiabaili.shop/api/product/subcategories/"+id, {cache: "no-cache"})
            if(res.data.products.length < 12){
                sethasmore(false)
            }
            setData(res.data)
            setProducts(res.data.products)
            let idss = []
              res.data.products.forEach((bits) => {
                idss.push(bits._id);
              });
            setIds(idss)
            setLoader(false)
        }catch(err){

        }
    }
    useEffect(()=>{
            getProducts()
            getLocation()
    },[])
    const [load,setLoader] = useState(true)

    //fetch again
    const [hasmore, sethasmore] = useState(true)
    const fetchmore = async () => {
        try{
            const res = await axios.get("https://api.jiabaili.shop/api/product/searchproductsub/"+ids+"/"+id)
            if(res.data.length < 12){
                sethasmore(false)
            }
            setProducts(products.concat(res.data))
            console.log(res.data)
            let idss = []
            res.data.forEach((bits) => {
              idss.push(bits._id);
            });
            setIds(ids.concat(idss))
            

          }catch(err){

          }
    }

    
  return (
    <div>
      {load && <div className="loader">
            <BeatLoader color="#E3242B" size={8} />

        </div>}
        <div className="staticnavbar">
            <SecondNav/>
            <div className="locationn">
              {names && <div><FontAwesomeIcon icon={faHome} /> - {names.categoryName} <FontAwesomeIcon icon={faAngleRight}/>  {names.subcategoryName} </div>}
            </div>
        </div>
        {data && <div className="itemhbvhbhj">
                    <InfiniteScroll dataLength={products?.length} next={fetchmore} hasMore={hasmore} loader={<p style={{ textAlign: 'center', marginTop: '10px', color: '#E3242B' }}>
                        Loading...
                        </p>} scrollableTarget="window">
                        <div  id="products" className="itemsbody0y0">
                                {
                                    products.map((item,index)=>(
                                        <SearchCard data={item} key={index} />
                                    ))
                                }
                        </div>
                    </InfiniteScroll>
        </div>}
    </div>
  )
}

export default Page
