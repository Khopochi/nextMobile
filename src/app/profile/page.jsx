"use client"
import React, { useEffect, useState } from 'react';
import './profile.scss'
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
const Page = () => {
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


    const [unseenmessages, setUnSeenMessages] = useState(0)
    const countUnseen = async () => {
        try{
          const res = await axios.get("http://192.168.1.169:8080/api/message/countunseen/"+user._id)
          setUnSeenMessages(res.data)
        }catch(err){

        }
    }

    useEffect(()=>{
        if(user){
          countUnseen()
        }
    },[user])

    const router = useRouter()
  return (
    <div className="profile-page">
    <div className="profile-header">
        <h1>You</h1>
        <div onClick={()=>router.push("/chat")} className="messages">
            <span> <img src="/image/chat.svg" alt="" /></span>
            {(unseenmessages != 0) && <span className="count">{(unseenmessages != 0) ? unseenmessages : ""}</span>}
            <i className="fas fa-comments"></i>
        </div>
    </div>
    <div className="profile-content">
        <div className="section orders">
        <Link href="/order"><h2><img src="/image/file-text.svg" alt="" /> Orders</h2> </Link>
        </div>
        <div onClick={()=>router.push("/about")} className="section about">
            <h2><img src="/image/shopping-bag.svg" alt="" /> About Jia Bai Li Supermarket</h2>

        </div>
        <div className="section facebook">
            <Link href="https://facebook.com/jiabailishop"> <h2><img src="/image/facebook.svg" alt="" /> Facebook Page</h2></Link>

        </div>
    </div>
</div>


  )
}

export default Page
