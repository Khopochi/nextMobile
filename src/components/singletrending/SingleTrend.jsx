import Image from 'next/image'
import styles from './singletrend.module.scss'
import Link from 'next/link';


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

const SingleTrend = ({data}) => {
  return (
    <div className={styles.discountshope}>
    <Link href={"/viewproduct/"+data._id} prefetch={false} >
    <div className={styles.shimage} style={{ backgroundImage: 'url(/image/image.svg)' }}>
        <Image src={"https://api.jiabaili.shop/api/photos/"+data.photos[0]} width="100" height="100" alt="" />
        {/* <img src="/image/image.svg" width="100" height="100" alt="" /> */}
        <div className={styles.disfigure}>-{data.discount}%</div>
        <div className={styles.quantitysh}>{data.quantity} Qty</div>
    </div>
    <div className={styles.shopdetails}>
        <div className={styles.priceshope}>
            <spam className={styles.mkwkw}>MWK</spam>  <span className={styles.fgure}>{calculateDiscountedPrice(data.price,data.discount)}</span>
        </div>
        <div className={styles.nameshope}>
            {data.name}
        </div>
    </div>
    </Link>
    
</div>
  )
}

export default SingleTrend
