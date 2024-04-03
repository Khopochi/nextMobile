"use client"
import React, { useContext, useEffect, useRef, useState } from 'react'
import './Productsearch.scss'
import axios from 'axios'
import InfiniteScroll from 'react-infinite-scroll-component'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping, faFile, faHouse, faList, faMagnifyingGlass, faUser } from '@fortawesome/free-solid-svg-icons';
import { BeatLoader, FadeLoader } from 'react-spinners'
import SearchCard from '@/components/searchcard/SearchCard'
import { useParams } from 'next/navigation'
import SecondNav from '@/components/secondnav/SecondNav'




const Productsearch = () => {

    // import ReactGA from 'react-ga';
    const {slug} = useParams()

    //console.log(slug)
    const {name} = useParams()
    const [data,setData] = useState()
    const [products, setProducts] = useState()
    const [ids, setIds] = useState()
    const getProducts = async () => {
        setLoader(true)
        try{
            const res = await axios.get("https://api.jiabaili.shop/api/product/searchproduct/"+slug)
            setProducts(res.data.products)
            if(res.data.products.length < 12){
                sethasmore(false)
            }
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
        if(slug.length >= 1){
            getProducts()
        }
    },[slug])
    const [load,setLoader] = useState(true)

    //fetch again
    const [hasmore, sethasmore] = useState(true)
    const fetchmore = async () => {
        //console.log("Reached")
        try{
            const res = await axios.get("https://api.jiabaili.shop/api/product/searchproducts/"+ids+"/"+slug)
            setProducts(products.concat(res.data))
            if(res.data.length < 12){
                sethasmore(false)
            }
            //console.log(res.data)
            let idss = []
            res.data.forEach((bits) => {
              idss.push(bits._id);
            });
            setIds(ids.concat(idss))
            

          }catch(err){

          }
    }
    const itemsBodyRef = useRef(null);




    //search staff
    // const [load,setLoader] = useState(true)
    
   


      const [searchWord, setSearchWord] = useState()
     
  
  
      //
      const handleInputChange = (e) => {
          setSearchWord(e.target.value);
        };
      
      //const move to the other page
      const NavigateTo = () => {
          if(credentials.searchTerm){
              navigate("/search/"+credentials.searchTerm)
              setClick(false)
              setCredentials({
                ...credentials,
                searchTerm: ""
              });
  
  
          }
      }
  
      const handleKeyDown = (e) => {
          if (e.key === 'Enter') {
            NavigateTo();
          }
        };
  
      //search item
    
  
      

  return (
    <div className='productseaerch'>
        <div className="staticnavbar">
            <SecondNav/>
      </div>
        {load && <div className="loader">
            {/* <BeatLoader color="hsla(351, 84%, 49%, 1)" /> */}
            <BeatLoader color="#E3242B" size={8} />
            loading items...
        </div>}

        {products && <InfiniteScroll dataLength={products?.length} next={fetchmore} hasMore={hasmore} loader={<p style={{ textAlign: 'center', marginTop: '10px', color: '#E3242B' }}>
                        Loading...
                        </p>} scrollableTarget="window">
                        <div  id="products" className="itemsbody">
                                {
                                    products.map((item,index)=>(
                                        <SearchCard data={item} key={index} />
                                    ))
                                }
                        </div>
        </InfiniteScroll> } 
    </div>
  )
}

export default Productsearch
