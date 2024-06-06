"use client";
import React, { useEffect, useState } from 'react'
import styles from "./navbar.module.scss"
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Link from 'next/link';
// import image1 from '@/image/1.png'
// import image2 from '@/image/2.png'
// import image3 from '@/image/3.png'
// import image4 from '../../image/1'

const Navbar = () => {
    const [currentSlide, setCurrentSlide] = useState(1);
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

    useEffect(() => {
      const interval = setInterval(() => {
        setCurrentSlide((prevSlide) => (prevSlide % 3) + 1); // Loop through slides
      }, 4000); // Change slide every 3 seconds
  
      return () => clearInterval(interval); // Clear interval on component unmount
    }, []);

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
    <div className={styles.navbar}>
        <div className={styles.containeer}>
                <div className={styles.top}>
                    <div className={styles.logo}>
                        <Image className={styles.ourlogo} height="100" width="100" src="/image/logo.png" />
                    </div>
                    <div className={styles.search}>
                        <input className={styles.input} id='searchTerm' onKeyDown={handleKeyDown} onChange={handleChange} placeholder='Search item' type="text" />
                        <div className={styles.searchIcon}><img onClick={()=>router.push("/search/"+credentials.searchTerm)} src='/image/search.svg'/></div>
                        {click && <div className={styles.searchresults}>
                        { searchItems?.map((item,index)=>(
                            <div key={index} onClick={()=>HandleAction(item.key,item._id)} className={styles.single}>
                                <div className={styles.leftsingle}>{item.term}</div>
                                <div className={styles.rightsingle}>{item.key}</div>
                            </div>
                        ))}
                </div>  }
                    </div>
                    <div className={styles.cart}>
                        {user && <Image onClick={()=>router.push("/cart")} className={styles.ourlogo} height="100" width="100" src="/image/shopping-cart.svg" />}
                        {!user && <Image onClick={()=>router.push("/login")} className={styles.ourlogo} height="100" width="100" src="/image/shopping-cart.svg" />}
                        {(user && (count != 0)) &&  <div onClick={()=>router.push("/cart")} className={styles.countmain}>{count}</div>}
                        {/* {!user && <div onClick={()=>router.push("/login")} className={styles.countmain}>{count}</div>} */}
                    </div>
                    <div className={styles.user}>
                        {user && <Link href={"/profile"}><Image className={styles.ourlogo} height="100" width="100" src="/image/user.svg" /></Link>}
                        {!user && <Link href={"/login"}><Image onClick={()=>router.push("/login")} className={styles.ourlogo} height="100" width="100" src="/image/user.svg" /></Link>}
                    </div>
                </div>
        </div>
        <div className={styles.courasel}>
        <img src="/image/1jia.jpg" alt="Image 1" className={`${styles.slide} ${currentSlide === 1 ? styles.active : ''}`} />
        <img src="/image/2jia.jpg" alt="Image 2" className={`${styles.slide} ${currentSlide === 2 ? styles.active : ''}`} />
        <img src="/image/3jia.jpg" alt="Image 3" className={`${styles.slide} ${currentSlide === 3 ? styles.active : ''}`} />
    </div>
    </div>
  )
}

export default Navbar
