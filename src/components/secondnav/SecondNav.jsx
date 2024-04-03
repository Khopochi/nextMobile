"use client"
import Image from 'next/image'
import './secondnav.scss'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'

const SecondNav = () => {
  const router = useRouter()


  const [user, setUser] = useState()


    useEffect(() => {
      // Check if user is authenticated by accessing user information from local storage
      const storedUser = localStorage.getItem('jiabailikho');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      } else {
        // Redirect to login page if user is not authenticated
        // router.push('/login');
      }
    }, []);

    const [count,setCount] = useState(0)
    const getCount = async () => {
        try{
            const res = await axios.get("https://api.jiabaili.shop/api/user/countitems/"+user._id)
            setCount(res.data.numberOfItemsInCart)
        }catch(err){

        }
    }
    useEffect(()=>{
      if(user){
        getCount()
      }
    },[user])
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
                <Image onClick={()=>router.push("/")} className="ourlogo" height="100" width="100" src="/image/logo.png"  alt='jia bai li logo'/>
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
            <div className="secoandnavcart">
                {user &&  <Image onClick={()=>router.push("/cart")}  className="ourlogo" height="100" width="100" src="/image/anaothercart.svg"  alt='cart'/>}
                {!user &&  <Image onClick={()=>router.push("/login")}  className="ourlogo" height="100" width="100" src="/image/anaothercart.svg" alt='cart'/>}
                {(user && (count != 0)) &&  <div onClick={()=>router.push("/cart")} className="countmain">{count}</div>}
                 {/* {!user && <div onClick={()=>router.push("/login")} className="countmain">{count}</div>} */}

            </div>
      </div>
    </div>
  )
}

export default SecondNav
