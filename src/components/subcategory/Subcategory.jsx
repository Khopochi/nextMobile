"use client"

import React from 'react'
import './subcategory.scss'
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';

const Subcategory = ({subdata,twindeep,deepdata}) => {
    const filteredData = deepdata?.filter(item => item.subcategoryid === subdata._id);
    const getNameById = (id) => {
        const foundItem = twindeep.find(item => item._id === id);
    
        // If an item with the given _id is found, return its name
        // Otherwise, return a default value or handle it accordingly
        return foundItem ? foundItem.photos[0] : 'Item not found';
      };
    //   const navigate = useNavigate()
  return (
    <div className='subcategory'>
      <div className="uppersubcat">
        <div className="uppercatleft">
            <span className="title">{subdata.name}</span>
            <span className="descri">More categories on {subdata.name}</span>
           
        </div>
        <div className="uppercatright">
            view products <FontAwesomeIcon icon={faAngleRight} />
        </div>
      </div>
      <div  className="lowercat">
       {filteredData && <>
        {
                filteredData.map((item,index)=>(
                   <Link href={"/allproducts/"+item._id}> <div key={index} className="lowercatholder">
                        <div className="imagesub">
                            <img src={"https://api.jiabaili.shop/api/photos/"+getNameById(item._id)} alt="" />
                        </div>
                        <div className="subdeepcat">
                            {item.name}
                        </div>
                    </div>
                </Link>
                ))
            } 
        </>}
        {!filteredData && <>
                    <div  className="lowercatholder">
                        <div className="imagesub">
                            
                        </div>
                        <div className="subdeepcat">
                            loading..
                        </div>
                    </div>
                    <div  className="lowercatholder">
                        <div className="imagesub">
                            
                        </div>
                        <div className="subdeepcat">
                            loading..
                        </div>
                    </div>
                    <div  className="lowercatholder">
                        <div className="imagesub">
                            
                        </div>
                        <div className="subdeepcat">
                            loading..
                        </div>
                    </div>
        </>}
                    
      </div>
    </div>
  )
}

export default Subcategory
