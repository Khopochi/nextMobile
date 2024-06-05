"use client"
import SecondNav from '@/components/secondnav/SecondNav'
import React from 'react'
import './allproducts.scss'
import { useParams } from 'next/navigation'

const page = () => {
    const {slug} = useParams()
    console.log(slug)
  return (
    <div>
        <div className="staticnavbar">
            <SecondNav/>
      </div>
      <div className="locationn">
        Home - Kitchen - {slug}
      </div>

      
    </div>
  )
}

export default page
