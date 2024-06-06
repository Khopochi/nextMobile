"use client"
import SecondNav from '@/components/secondnav/SecondNav'
import React, { useEffect, useState } from 'react'
import './allproducts.scss'
import { useParams } from 'next/navigation'
import InfiniteScroll from 'react-infinite-scroll-component'
import SearchCard from '@/components/searchcard/SearchCard'
import axios from 'axios'
import { BeatLoader } from 'react-spinners'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDoubleRight, faAngleRight, faHome } from '@fortawesome/free-solid-svg-icons'

const Page = () => {
    const {slug} = useParams()
    console.log(slug)

    const [products, setProducts] = useState()
    const [ids, setIds] = useState()
    const [load,setLoader] = useState(true)
    const [names, setNames] = useState()

    const getLocation =  async() => {

        try{
            const res = await axios.get("https://api.jiabaili.shop/api/product/getcategoryandsubcategoryforlocation/"+slug, {cache: "no-cache"})
            setNames(res.data)
        }catch(err){

        }
    }


    const getProducts = async () => {
        setLoader(true)
        try{
            const res = await axios.get("https://api.jiabaili.shop/api/product/getbydeeepid/"+slug, {cache: "no-cache"})
            setProducts(res.data)
            if(res.data.length < 12){
                sethasmore(false)
            }
            let idss = []
              res.data.forEach((bits) => {
                idss.push(bits._id);
              });
            setIds(idss)
            setLoader(false)
        }catch(err){

        }
    }
    useEffect(()=>{
        console.log("hie")
            getLocation()
            getProducts()
    },[])


    // console.log(names)
    const [hasmore, sethasmore] = useState(true)
    const fetchmore = async () => {
        console.log("Reached")
        try{
            const res = await axios.get("https://api.jiabaili.shop/api/product/searchproductscategory/"+ids+"/"+slug)
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
            {/* <BeatLoader color="hsla(351, 84%, 49%, 1)" /> */}
            <BeatLoader color="#E3242B" size={8} />
        </div>}
        <div className="staticnavbar">
            <SecondNav/>
            <div className="locationn">
              {names && <div><FontAwesomeIcon icon={faHome} /> - {names.categoryName} <FontAwesomeIcon icon={faAngleRight}/>  {names.subcategoryName} <FontAwesomeIcon icon={faAngleRight}/>  {names.deepcategoryname}</div>}
            </div>
      </div>
      
      <div className="itemsjjbody">
      {products && 
        <InfiniteScroll dataLength={products?.length} next={fetchmore} hasMore={hasmore} loader={<p style={{ textAlign: 'center', marginTop: '10px', color: '#E3242B' }}>
                       
                        </p>} scrollableTarget="window">
                        <div  id="products" className="itemsbody00">
                                {
                                    products.map((item,index)=>(
                                        <SearchCard data={item} key={index} />
                                    ))
                                }
                        </div>
        </InfiniteScroll> } 
      </div>
      


      
    </div>
  )
}

export default Page
