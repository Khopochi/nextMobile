"use client"
import React, { useContext, useState } from 'react'
import './cart.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from '@fortawesome/free-regular-svg-icons'
import axios from 'axios'
import { BeatLoader } from 'react-spinners';
import Link from 'next/link'


export const SingleCart = ({user, data, onDeleteItem}) => {
    const formatNumberWithCommas = (value) => {
        return value.toLocaleString('en-US');
      };
      const nextpage = () => {
        navigate("/viewproduct/"+data._id)
      }

      const [loader,setLoader] = useState(false)
      const [deleting, setDeleting] = useState(false)
    //   const user = {
    //     _id: "65bba67908bbe58ec8a7f1e1"
    //   }
      const onDelete = async () => {
        setDeleting(true)
        console.log(user._id)
        try{
            const res = await axios.put("https://api.jiabaili.shop/api/user/removeitem/"+user._id+"/"+data.cartid, {cache:"no-store"})
            onDeleteItem(data.cartid)
            setDeleting(false)
            setLoader(false)
        }catch(err){

        }
      }
  return (
    <>
    <div className="singleitem">
        {loader && <div className="loaderbb">
            {!deleting && <><div className="title">Remove Item?</div>
            <div className="buttonsarea">
                <button onClick={()=>onDelete()} className="left12">Confirm</button>
                <button onClick={()=>setLoader(false)} className="right12">Cancel</button>
            </div></>}
            {deleting && <div className="divload">
                <div className="divicon"><BeatLoader color="hsla(351, 84%, 49%, 1)" /></div>
                <div className="title">Removing...</div>
            </div>}



    </div>}
    <div className="leftt">
        <img src={"https://api.jiabaili.shop/api/photos/"+data.productimg} alt="" />
    </div>
    <div className="middlet">
        <Link href={"/viewproduct/"+data._id} prefetch={false}> <div className="titlee">{data.productname}</div></Link>
        <div className="detailsmore">
            <div className="detailsleft">
                <div className="priced">Item price</div>
                { !(data.ship === 0) && <div className="Shipd">Delivary fee</div>}
                <div className="total">Total</div>
            </div>
            <div className="detailsright">
                <div className="drprice"><span className="mwk">MWK</span>  {formatNumberWithCommas(data.price)}</div>
                { !(data.ship === 0) && <div className="drship"><span className="mwk">MWK</span>  {formatNumberWithCommas(data.ship)}</div>}
                <div className="drprice"><span className="mwk">MWK</span>  {formatNumberWithCommas(data.cartTotal)}</div>

            </div>
        </div>
    </div>
    <div className="rightt">
        <div className="topDelete"><FontAwesomeIcon onClick={()=>setLoader(true)} className='icon' icon={faTrashCan} /></div>
        <div className="changequantity">
        <div className="quantity">
            <span className="title">Quantity: {data.quantity}</span>
        </div>
        </div>
    </div>
</div>
<div className="homeseperator"></div>
</>

  )
}
