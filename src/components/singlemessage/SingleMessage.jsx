"use client"
import React, {useEffect, useState } from 'react'
import './singlemessage.scss'
import { format } from 'timeago.js'
import axios from 'axios'

export const SingleMessage = ({user,body,selected}) => {
  const [userInfo, setUserInfo] = useState()
  const array = body.members


  const removeItem = (name)  => {
    const filteredArray = array.filter((item) => item !== name);
    return filteredArray;
  };

  const newArray = removeItem(user?._id)

  //fetch user name
  useEffect(()=>{
    const fetchname = async () => {
      const res = await axios.get(`https://api.jiabaili.shop/api/user/useronload/${newArray[0]}`, {cache:"no-store"})
      setUserInfo(res.data)
    }
    fetchname()
  },[newArray[0]])

  // console.log(newArray[0])
  return (
    <>
    { userInfo && <div className={(selected === body._id) ? 'singlemessage selectedmessage' : 'singlemessage'}>
            <div className="profilePhoto">
                {userInfo && <img  src="/image/logo.png" alt="" className="profilephotoimg" />}
            </div>
            <div className="nameMessage">
                <div className="nametime">
                    <span className='name'>Jia Bai Li Supermarket</span>
                    <span className='time'>{format(body.updatedAt)}</span>
                </div>
                <div className="message">{body.message}</div>
            </div>
    </div>}
    {
      !userInfo && <div className='singlemessage'>
        Loading...
      </div>
    }
    </>
  )
}
