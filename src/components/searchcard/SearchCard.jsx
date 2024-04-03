import Link from 'next/link';
import './searchcard.scss'

const formatNumberWithCommas = (value) => {
    return value.toLocaleString('en-US');
};
const calculateDiscountedPrice = (price,discount) => {
    if(!discount)
        return formatNumberWithCommas(price)
        

    const discountAmount = (price * discount) / 100;
    const discountedPrice = price - discountAmount;

    return formatNumberWithCommas(discountedPrice)
};


const SearchCard = ({data}) => {
  return (
    <div className='searchcard'>
      <Link href={"/viewproduct/"+data._id} prefetch={false}>
      <div className="imagearea">
        <div className="image" style={{ backgroundImage: 'url(/image/image.svg)' }}><img src={"https://api.jiabaili.shop/api/photos/"+data.photos[0]} alt="" /></div>
        <div className="quality">
          <div className="text10">-{data?.discount}%</div>
        </div>
        <div className="lowerstock">
            {data.quantity} | Stock
          </div>
        <div className="discountimage"></div>
      </div>
      <div className="detailsarea">
        <div className="itemname">
          {data.name}
        </div>
        <div className="lebal">
          Top quality
        </div>
        <div className="priceandquantity">
           <span className="price">
              <span className="mwk">MWK<span className='amountfiguret'>{calculateDiscountedPrice(data.price,data.discount)}</span></span>
              <span className="amountfiguret">{}</span>
           </span>
           <span className="quantity">MWK {formatNumberWithCommas(data.price)}</span>
        </div>
      </div>
      <div className="rating">
          <span>Rating | 4.5 |</span>
          {/* <FontAwesomeIcon className='rated' icon={faStar} />
          <FontAwesomeIcon className='rated' icon={faStar} />
          <FontAwesomeIcon className='rated' icon={faStar} />
          <FontAwesomeIcon className='rated' icon={faStar} />
          <FontAwesomeIcon icon={faStar} /> */}
      </div>
      </Link>
      
    </div>
  )
}

export default SearchCard
