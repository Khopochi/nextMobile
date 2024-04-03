"use client"
import Image from 'next/image'
import './secondnav.scss'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { useEffect, useState } from 'react'

const NavProduct = () => {

  const router = useRouter()
   //search procedures here
          //const move to the other page
          const NavigateTo = () => {
            if(credentials.searchTerm){
                router.push("/search/"+credentials.searchTerm)
                setClick(false)
    
    
            }
        }
    
        const handleKeyDown = (e) => {
            if (e.key === 'Enter') {
              NavigateTo();
            }
          };
    
        //search item
        const [credentials,setCredentials] = useState({
            searchTerm: ""
        })
        const [searchItems,setSearchItem] = useState()
        const getSearchItem = async () => {
          console.log(credentials.searchTerm)
            try{
                const res = await axios.get("https://api.jiabaili.shop/api/product/search/"+credentials.searchTerm)
                setSearchItem(res.data)
                setClick(true)
                //console.log(res.data)
            }catch(err){
    
            }
        }
        const handleChange = (e) => {
            setCredentials((prev) => ({...prev, [e.target.id]: e.target.value}))
        }

        console.log(searchItems)
        useEffect(()=>{
          console.log(credentials.searchTerm)
            if (credentials.searchTerm != "") {
                const delayTimer = setTimeout(() => {
                  getSearchItem();
                }, 500); // Adjust the delay based on your needs (e.g., 500 milliseconds)
          
                return () => clearTimeout(delayTimer);
              }
        },[credentials.searchTerm])
    
        
        const [click,setClick] = useState(false)
        const HandleAction = (word,key) => {
            setClick(false)
            if(word === "DeepCategory"){
                setClick(false)
                router.push("/categories/"+key+"/")
            }else if(word === "Product"){
                router.push("/viewproduct/"+key+"/")
            }else if(word === "Subcategory"){
                router.push("/subcategories/"+key+"/")
            }else if(word === "Category"){
                router.push("/categories/"+key+"/")
            }
        }
  
        useEffect(()=>{
          if(credentials.searchTerm.length <= 0){
              setClick(false)
          }
        },[credentials.searchTerm])
  
  return (
    <div className="secondnav">
      <div className="seconfnavcontainer">
            <div className="secondnavlogo">
                <Image onClick={()=>router.push("/")} className="ourlogo" height="100" width="100" src="/image/logo.png" />
            </div>
            <div className="secondnavsearch">
                <div className="secondnavicon">
                <img src='/image/search.svg'/>
                </div>
                <div className="secondnavsearchinput">
                    <input type="text" id='searchTerm' onKeyDown={handleKeyDown} onChange={handleChange} placeholder="search item..." />
                    {click && <div className="searchresults">
                        { searchItems?.map((item,index)=>(
                            <div key={index} onClick={()=>HandleAction(item.key,item._id)} className="single">
                                <div className="leftsingle">{item.term}</div>
                                <div className="rightsingle">{item.key}</div>
                            </div>
                        ))}
                </div>  }
                </div>
            </div>
      </div>
    </div>
  )
}

export default NavProduct
