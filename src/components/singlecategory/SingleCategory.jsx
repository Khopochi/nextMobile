import Image from 'next/image';
import styles from './singlecategory.module.scss'
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
const SingleCategory = ({data}) => {
  return (
    <div  className={styles.discountshope + " " + styles.addition}>
    <Link href={"/viewproduct/"+data._id} prefetch={false} >
    <div className={styles.shimage} style={{ backgroundImage: 'url(/image/image.svg)' }}>
        <Image src={"https://api.jiabaili.shop/api/photos/"+data.photos[0]} fill alt="love" />
        <div className={styles.disfigure}>-{data.discount}%</div>
        <div className={styles.quantityshd}>{data.quantity} Qty</div>
    </div>
    <div className={styles.shopdetails}>
        <div className={styles.priceshope}>
            <spam className={styles.mkwkw}>MWK</spam>  <span className={styles.fgure}>{calculateDiscountedPrice(data.price,data.discount)}</span>
        </div>
        
        <div className={styles.nameshope}>
            {data.name}
        </div>
        <div className={styles.typicalshopeprice}>
            <span className={styles.mkwkw}>MWK {formatNumberWithCommas(data.price)}</span>
        </div>
    </div>
    </Link>
</div>
  )
}

export default SingleCategory
