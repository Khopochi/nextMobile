"use client"
import React, { useEffect, useState } from 'react'
import './cartview.scss'
import axios from 'axios'

import { BeatLoader } from 'react-spinners'
import { useParams } from 'next/navigation'
import DataTable from '../detailsproduct/ListTable'



const CaryView = () => {

    // import ReactGA from 'react-ga';
    const [data,setDat] = useState()
    const {id} = useParams()
    const [load,setLoad] = useState(true)
    const getData = async () => {
        try{
            const res = await axios.get("https://api.jiabaili.shop/api/ordersubmitted/getsingleorder/"+id)
            setDat(res.data)
            setLoad(false)
        }catch(err){

        }
    }
    useEffect(()=>{
        getData()
    },[])
    const formatNumberWithCommas = (value) => {
        return value.toLocaleString('en-US');
      };

  return (
    <div className='caryview'> 
        {load && <div className="loader">
            <BeatLoader color="hsla(351, 84%, 49%, 1)" size={8} />
        </div>}
        <div className="cartContainer">
            <div className="holder">
                <div className="top">
                    <div className="id">
                        <span className="hdr">
                            <span className="1st">Oder ID</span>
                            <span className="2st">Payment ID</span>
                        </span>
                        {data && <span className="numberaid">
                            <span>{data.order.orderId}</span>
                            <span>{data.order.paymentId}</span>
                        </span>}
                    </div>
                    <div className="totalcary">
                        <span className="hdr">
                            <span className="1st">Status</span>
                            <span className="2st">Total</span>
                            <span className="2st">Destination</span>
                        </span>
                        {data && <span className="numberaid">
                            <span>{data.order.status}</span>
                            <span>MWK {formatNumberWithCommas(data.order.amount)}</span>
                            <span>{data.order.location}</span>
                        </span>}
                    </div>
                </div>
                
                <div className="middle">
                    <div className="title">Product Images</div>
                    {data && <div className="vcimages">
                        {
                            data.newCart.map((img,index)=>(
                                <img key={index} src={"https://api.jiabaili.shop/api/photos/"+img.productPhoto} />
                            ))
                        }
                       
                    </div>}
                </div>

                <div className="down">
                    <div className="title">Products details</div>
                    <div className="looper">
                        {data && <DataTable rowss={data.newCart}/>}
                    </div>
                </div>

            </div>
        </div>
    </div>
  )
}

export default CaryView
