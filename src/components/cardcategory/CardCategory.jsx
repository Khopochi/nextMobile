import Link from "next/link"
import SingleCategory from "../singlecategory/SingleCategory"
import './cardcategory.scss'

const CardCategory = ({data}) => {
  return (
    <div className='cardcategoryt'>
      <div className="cctop">
        <Link href={"/categories/"+data.category._id}><h1 className="cctopleft">{data.category.name}</h1></Link>
        <Link href={"/categories/"+data.category._id}><div className="cctopright"><span>View more</span><div className="ccicon"><img src="/image/chevron-right.svg" /></div></div></Link>
      </div>
      <div className="ccnegotiator">
        <div className="itemccn">
            <div className="ccicon"><img src="/image/credit-card.svg" /></div>
            <div className="ccitemword">Secure payments</div>
        </div>
        <div className="itemccn">
            <div className="ccicon"><img src="/image/truck.svg" /></div>
            <div className="ccitemword">Safe delivery</div>
        </div>
        <div className="itemccn">
            <div className="ccicon"><img src="/image/shield.svg" /></div>
            <div className="ccitemword">Customer protection</div>
        </div>
      </div>
      <div className="cccover loading">
            <div className="cccoverinside" style={{ backgroundImage: `url(https://api.jiabaili.shop/api/photos/`+data.category._id+`.jpg)` }}>
                
            </div>
        </div>
        <div className="imageproductsarae">
          {
            data.products.map((item,index)=>(
                <SingleCategory key={index} data={item}/>
            ))
          }
        </div>
    </div>
  )
}

export default CardCategory
